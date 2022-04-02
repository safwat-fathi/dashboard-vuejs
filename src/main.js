import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import { darkModeKey, styleKey } from "@/config.js";

import "./css/main.css";

/* Fetch sample data */
store.dispatch("fetch", "clients");
store.dispatch("fetch", "history");
store.dispatch("fetch", "countries");

/* App style */
store.dispatch("setStyle", localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  store.dispatch("darkMode", true);
}

/* Default title tag */
const defaultDocumentTitle = "Akila";

/* Collapse mobile aside menu on route change */
router.beforeEach((to) => {
  store.dispatch("asideMobileToggle", false);
  store.dispatch("asideLgToggle", false);
});

router.afterEach((to) => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${defaultDocumentTitle} - ${to.meta.title}`;
  } else {
    document.title = defaultDocumentTitle;
  }

  /* Full screen mode */
  store.dispatch("fullScreenToggle", !!to.meta.fullScreen);
});

createApp(App).use(store).use(router).mount("#app");
