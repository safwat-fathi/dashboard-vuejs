import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Style from "@/views/Style.vue";
import Home from "@/views/Home.vue";
import { useStore } from "vuex";
import store from "@/store";

const routes = [
  {
    meta: {
      title: "Home",
      requiresAuth: true,
    },
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "tables" */ "@/views/Home.vue"),
  },

  {
    meta: {
      title: "Tables",
      requiresAuth: true,
    },
    path: "/tables",
    name: "tables",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "tables" */ "@/views/Tables.vue"),
  },
  // {
  //   meta: {
  //     title: "Forms",
  //   },
  //   path: "/forms",
  //   name: "forms",
  //   component: () =>
  //     import(/* webpackChunkName: "forms" */ "@/views/Forms.vue"),
  // },
  // {
  //   meta: {
  //     title: "Profile",
  //   },
  //   path: "/profile",
  //   name: "profile",
  //   component: () =>
  //     import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
  // },
  // {
  //   meta: {
  //     title: "Ui",
  //     requiresAuth: true,
  //   },
  //   path: "/ui",
  //   name: "ui",
  //   component: () => import(/* webpackChunkName: "ui" */ "@/views/Ui.vue"),
  // },
  // {
  //   meta: {
  //     title: "Responsive layout",
  //   },
  //   path: "/responsive",
  //   name: "responsive",
  //   component: () =>
  //     import(/* webpackChunkName: "responsive" */ "@/views/Responsive.vue"),
  // },
  {
    meta: {
      title: "Login",
      fullScreen: true,
    },
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
  },
  {
    meta: {
      title: "Register",
      fullScreen: true,
    },
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
  },
  {
    meta: {
      title: "Error",
      fullScreen: true,
    },
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "@/views/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   return savedPosition || { top: 0 };
  // },
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // store access token
  // check if access token is stored
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("user is not authenticated");
      next("/login");
    }

    console.log("user is authenticated");
  }
  // if (to.fullPath === '/tables') {
  // 	next('/login')
  // }

  next();
});

export default router;
