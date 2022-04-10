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

        async fetchById(id: string) {
            const dr = doc(getFirestore(), ACTIVITY_COL_NAME, id);
            const activitySnapshot = await getDoc(dr);

            this.activityById = {
                ...activitySnapshot.data(),
                id: activitySnapshot.id,
            } as Activity;
        },

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

        async update(id: string, name: string, userId: string) {
            const dr = doc(getFirestore(), ACTIVITY_COL_NAME, id);
            const activitySnapshot = await getDoc(dr);

            if (name !== activitySnapshot.data()?.name) {
                const q = query(
                    collection(getFirestore(), ACTIVITY_COL_NAME),
                    where("userId", "==", userId),
                    where("name", "==", name),
                    limit(1)
                );

                const checkNameExist = await getDocs(q);

                if (checkNameExist.size > 0) throw "Name Exist";
                else
                    await setDoc(doc(getFirestore(), ACTIVITY_COL_NAME, id), {
                        name,
                        tasks: activitySnapshot.data()?.tasks,
                        userId,
                    });
            }
        },

        async addTask(id: string, label: string, cost: number) {
            const dr = doc(getFirestore(), ACTIVITY_COL_NAME, id);
            const activitySnapshot = await getDoc(dr);

            const checkTasks = activitySnapshot
                .data()
                ?.tasks.filter((task: any) => task.label === label);

            const tempTasks = [...activitySnapshot.data()?.tasks];

            if (checkTasks.length > 0) throw "Task Exist";
            else {
                tempTasks.push({
                    label,
                    cost,
                });

                await setDoc(doc(getFirestore(), ACTIVITY_COL_NAME, id), {
                    name: activitySnapshot.data()?.name,
                    tasks: tempTasks,
                    userId: activitySnapshot.data()?.userId,
                });
            }
        },

        async delete(id: string) {
            await deleteDoc(doc(getFirestore(), ACTIVITY_COL_NAME, id));
        },

        async deleteTask(id: string, label: string) {
            const dr = doc(getFirestore(), ACTIVITY_COL_NAME, id);
            const activitySnapshot = await getDoc(dr);

            const filteredTasks = [...activitySnapshot.data()?.tasks].filter(
                (task) => task.label !== label
            );

            await setDoc(doc(getFirestore(), ACTIVITY_COL_NAME, id), {
                name: activitySnapshot.data()?.name,
                tasks: filteredTasks,
                userId: activitySnapshot.data()?.userId,
            });
        },
    },
});
