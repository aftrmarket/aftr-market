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

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //{ path: '/', redirect: '/vehicles'},
        { name: 'vehicles', path: '/vehicles', component: VehicleList, alias: '/', },
        //{ name: 'vehicle-info', path: '/vehicles/:vehicleId', component: VehicleInfo, props: true },
        { name: 'vehicle', path: '/vehicles/:vehicleId', component: Vehicle, props: true },
        { name: 'create', path: '/create', component: CreateVehicle },
        { name: 'ui-test', path: '/ui-test', component: UiTest },
        { path: '/:notFound(.*)', redirect: '/' }
    ],
    linkActiveClass: 'active'
});

const app = createApp(App);
app.use(store);
app.use(router);
//app.use(uuid);

app.mount('#app');
