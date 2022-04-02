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
      title: "Select style",
    },
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "tables" */ "@/views/Home.vue"),
  },

  {
    meta: {
      title: "Tables",
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
  // {
  //   meta: {
  //     title: "Error",
  //     fullScreen: true,
  //   },
  //   path: "/error",
  //   name: "error",
  //   component: () =>
  //     import(/* webpackChunkName: "error" */ "@/views/Error.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // call fetch access token
  // store access token
  // check if access token is stored
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log(store.state.userName);
  }
  // if (to.fullPath === '/tables') {
  // 	next('/login')
  // }

  next();
});

export default router;
