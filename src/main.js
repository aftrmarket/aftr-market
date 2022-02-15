import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
//import { uuid } from 'vue-uuid';
import numeral from 'numeral';
import './index.css';

import App from './App.vue';
import store from './store.js';
import VehicleList from './components/VehicleList.vue';
import CreateVehicle from './components/CreateVehicle.vue';
import Vehicle from './components/Vehicle.vue';
import UiTest from './components/UiTest.vue';
import Overview from './components/Overview.vue';
import MyPortfolio from './components/MyPortfolio.vue';
import Chat from './components/utils/Chat.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //{ path: '/', redirect: '/vehicles'},
        { name: 'vehicles', path: '/vehicles', component: VehicleList },
        { name: 'myPortfolio', path: '/MyPortfolio', component: MyPortfolio},
        //{ name: 'vehicle-info', path: '/vehicles/:vehicleId', component: VehicleInfo, props: true },
        // { 
        //     name: 'vehicle', 
        //     path: '/vehicles/:vehicleId', 
        //     component: Vehicle, 
        //     props: (route) => ({
        //         vehicle: vehicle,
        //         ...route.params
        //     })
        // },
        { name: 'vehicle', path: '/vehicles/:vehicleId', component: Vehicle, props: true },
        { name: 'create', path: '/create', component: CreateVehicle },
        { name: 'ui-test', path: '/ui-test', component: UiTest },
        { name: 'overview', path: '/overview', component: Overview, props: true, alias: '/' },
        { 
            path: '/chat',
            component: Chat,
            beforeEnter(to, from, next) {
                window.location.href = 'https://discord.gg/YEy8VpuNXR'
            }
        },
        { path: '/:notFound(.*)', redirect: '/' }
    ],
    linkActiveClass: 'active'
});

const app = createApp(App);
app.use(store);
app.use(router);
//app.use(uuid);

app.mount('#app');
