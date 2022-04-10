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

        fetchById(id: string) {},
    },
});
