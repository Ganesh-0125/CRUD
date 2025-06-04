import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Table from "@/pages/Table.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/table", component: Table }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;