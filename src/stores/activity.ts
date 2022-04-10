import { defineStore } from "pinia";
import {
    collection,
    query,
    getFirestore,
    getDocs,
    where,
    setDoc,
    doc,
    getDoc,
    addDoc,
    deleteDoc,
    orderBy,
    limit,
} from "firebase/firestore";

export type Activity = {
    id: string;
    name: string;
    tasks: ActivityTask[];
    userId: string;
};

export type ActivityTask = {
    label: string;
    cost: number;
    isCheck: boolean;
};

const ACTIVITY_COL_NAME = "activities";

export const useActivityStore = defineStore({
    id: "activity",

    state: () => {
        return {
            activitiesByUserId: [] as Activity[],
            activityById: {} as Activity,
        };
    },

    actions: {
        async fetchAllByUserId(userId: string) {
            const activities: any = [];

            const q = query(
                collection(getFirestore(), ACTIVITY_COL_NAME),
                where("userId", "==", userId),
                orderBy("name", "asc")
            );

            const activitiesQuerySnapshots = await getDocs(q);

            activitiesQuerySnapshots.forEach((doc) => {
                activities.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });

            this.activitiesByUserId = activities;
        },

        async fetchById(id: string) {},

        async add(name: string, userId: string) {
            const q = query(
                collection(getFirestore(), ACTIVITY_COL_NAME),
                where("userId", "==", userId),
                where("name", "==", name),
                limit(1)
            );

            const checkNameExist = await getDocs(q);

            if (checkNameExist.size > 0) throw "Name Exist";
            else
                await addDoc(collection(getFirestore(), ACTIVITY_COL_NAME), {
                    name,
                    tasks: [],
                    userId,
                });
        },

        async update(id: string, name: string) {},

        async addTask(id: string, label: string, cost: string) {},

        async toggleCheck(id: string, isCheck: boolean, label: string) {},

        async delete(id: string) {
            await deleteDoc(doc(getFirestore(), ACTIVITY_COL_NAME, id));
        },

        async deleteTask(id: string, label: string) {},
    },
});
