import App from "./App.vue";
import { createApp } from "vue";

import '../node_modules/ag-grid-community/styles/ag-grid.css'
import '../node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import VueSweetalert2 from 'vue-sweetalert2'
import "@/assets/style/_sweetaleart.scss";
import vuetify from "@/plugins/vuetify";
import 'sweetalert2/dist/sweetalert2.min.css'
import VueSelect from "@/components/common/vueSelect/VueSelect.vue";

import "@/assets/css/default.css";

import router from "./router";
import global from "./plugins/global";

import 'animate.css'
/** css파일 */

// import "@/assets/scss/_Sweetalert.scss";

import { createPinia } from 'pinia'

const app = createApp(App);
import { i18n } from '@/plugins/i18n'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { createPersistedState } from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(createPersistedState());
app.use(pinia)
app.use(i18n)
app.component('QuillEditor', QuillEditor)
app.use(vuetify);
app.use(router);
app.use(global);
app.use(VueSweetalert2)
app.component("VueSelect", VueSelect);
app.mount("#app");
