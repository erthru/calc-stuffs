import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "virtual:windi.css";
import { useUserStore } from "./stores/user";
import "./configs/db";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("./masters/index.vue"),
            children: [
                {
                    path: "/",
                    component: () => import("./views/Home.vue"),
                },
            ],
            meta: { auth: true },
        },
        {
            path: "/login",
            component: () => import("./views/Login.vue"),
            meta: { auth: false },
        },
        {
            path: "/register",
            component: () => import("./views/Register.vue"),
            meta: { auth: false },
        },
        {
            path: "/about",
            component: () => import("./views/About.vue"),
            meta: { auth: "guest" },
        },
    ],
});

router.beforeEach(async (to, from) => {
    const userStore = useUserStore();
    await userStore.fetchProfile();

    if (to.meta.auth && !userStore.isLoggedIn && to.meta.auth !== "guest") {
        return {
            path: "/login",
        };
    } else if (
        !to.meta.auth &&
        userStore.isLoggedIn &&
        to.meta.auth !== "guest"
    ) {
        return {
            path: "/",
        };
    }
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
