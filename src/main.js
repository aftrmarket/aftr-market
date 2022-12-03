import VueLogger from 'vuejs3-logger';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
//import { uuid } from 'vue-uuid';
import numeral from 'numeral';
import './index.css';

import App from './App.vue';
import store from './store.js';
import RepoList from './components/RepoList.vue';
import CreateRepo from './components/CreateRepo.vue';
import Repo from './components/Repo.vue';
import UiTest from './components/UiTest.vue';
import ContractRead from './components/ContractRead.vue';
import Overview from './components/Overview.vue';
import MyPortfolio from './components/MyPortfolio.vue';
import AftrContractSource from './components/AftrContractSource.vue'
import Chat from './components/utils/Chat.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
//import { readContract } from 'smartweave';
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'


let logLevel = "";
if (import.meta.env.VITE_ENV === 'PROD') {
    logLevel = "fatal";
} else if (import.meta.env.VITE_ENV === 'TEST') {
    logLevel = "info";
} else {
    logLevel = "debug";
}
const options = {
    isEnabled: true,
    logLevel: logLevel,
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true,
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'repos', path: '/repos', component: RepoList },
        { name: 'myPortfolio', path: '/MyPortfolio', component: MyPortfolio },
        { name: 'repo', path: '/repos/:repoId', component: Repo, props: true },
        { name: 'create', path: '/create', component: CreateRepo },
        { name: 'ui-test', path: '/ui-test', component: UiTest },
        { name: 'read', path: '/read/:contractId', component: ContractRead, props: true },
        { name: 'overview', path: '/overview', component: Overview, props: true, alias: '/' },
        { name: 'latest-contract-source', path: '/latest-contract-source', component: AftrContractSource },
        // {
        //     path: '/latest-contract-src',
        //     beforeEnter(to, from, next) {
        //         window.location.href = 'https://github.com/aftrmarket/aftr-contracts/blob/main/contract/vehicle/contract.ts'
        //     }
        // },
        // { 
        //     path: '/chat',
        //     component: Chat,
        //     beforeEnter(to, from, next) {
        //         window.location.href = 'https://discord.gg/YEy8VpuNXR'
        //     }
        // },
        { path: '/:notFound(.*)', redirect: '/' }
    ],
    linkActiveClass: 'active'
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueLogger, options);
app.use(VueSweetalert2);
app.use(PerfectScrollbar)
app.use(VueClipboard)
//app.use(uuid);

app.mount('#app');
