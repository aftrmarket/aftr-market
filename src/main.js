import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
//import { uuid } from 'vue-uuid'; 
import './index.css';

import App from './App.vue';
import VehicleList from './components/VehicleList.vue';
import CreateVehicle from './components/CreateVehicle.vue';
import VehicleInfo from './components/VehicleInfo.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //{ path: '/', redirect: '/vehicles'},
        { name: 'vehicles', path: '/vehicles', component: VehicleList, alias: '/', },
        { name: 'vehicle-info', path: '/vehicles/:vehicleId', component: VehicleInfo, props: true },
        { name: 'create', path: '/create', component: CreateVehicle },
        { path: '/:notFound(.*)', redirect: '/' }
    ],
    linkActiveClass: 'active'
});

const app = createApp(App);
app.use(router);
//app.use(uuid);

app.mount('#app');
