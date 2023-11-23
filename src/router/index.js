import { createWebHistory, createRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import HomeView from "@/views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "homeview",
        component: HomeView,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/pictures/:id",
        name: "detailsview",
        component: () => import("@/views/DetailsView.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/cart/",
        name: "cartview",
        component: () => import("@/views/CartView.vue"),
    },
    {
        path: "/register/",
        name: "register",
        component: () => import("@/views/RegisterView.vue"),
    },
    {
        path: "/feed/",
        name: "feed",
        component: () => import("@/views/FeedView.vue"),
    },
    {
        path: "/signin/",
        name: "signin",
        component: () => import("@/views/SigninView.vue"),
    },
    {
        path: "/admin/",
        name: "admin",
        component: () => import("@/views/AdminView.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: '/add/picture',
        name: 'add-picture',
        component: () => import('@/views/AddPictureView.vue'),
        props: false,
        meta: { requiresAuth: true },
    },
    {
        path: "/picture/:id",
        name: "edit-picture",
        component: () => import("@/views/EditPictureView.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const currentUser = getAuth().currentUser;
      if (currentUser && currentUser.uid === '7AhYiLP0CjfQEbuCglwd0Bag6JK2') {
        next();
      } else {
        alert("Bạn không có quyền truy cập!");
        next("/");
      }
    } else {
      next();
    }
  });

export default router;