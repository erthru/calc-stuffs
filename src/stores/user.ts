import { defineStore } from "pinia";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

export type User = {
    id: string;
    email: string;
};

export const useUserStore = defineStore({
    id: "user",

    state: () => {
        return {
            isLoggedIn: false,
            user: null as User | null,
        };
    },

    actions: {
        async fetchProfile() {
            const user = await new Promise<User | null>((resolve) => {
                onAuthStateChanged(getAuth(), (user) => {
                    if (user) {
                        resolve({
                            id: user.uid,
                            email: user.email!!,
                        });
                    } else resolve(null);
                });
            });

            if (user) {
                this.isLoggedIn = true;
                this.user = user;
            } else {
                this.isLoggedIn = false;
                this.user = null;
            }
        },

        async login(email: string, password: string) {
            const auth = await signInWithEmailAndPassword(
                getAuth(),
                email,
                password
            );

            this.isLoggedIn = true;

            this.user = {
                id: auth.user.uid,
                email: auth.user.email!!,
            };
        },

        async register(email: string, password: string) {
            const auth = await createUserWithEmailAndPassword(
                getAuth(),
                email,
                password
            );

            this.isLoggedIn = true;

            this.user = {
                id: auth.user.uid,
                email: auth.user.email!!,
            };
        },

        async logout() {
            await signOut(getAuth());
        },
    },
});
