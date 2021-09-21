<template>
    <main class="-mt-32">
        <div class="max-w-7xl mx-auto pb-2 px-4 sm:px-6 lg:px-8">
            <!--<div class="md:grid md:grid-cols-3 md:gap-6">-->
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-xl font-medium leading-6 text-white">
                            Create Your Vehicle
                        </h3>
                        <p class="mt-1 pb-4 text-sm text-aftrYellow">
                            You can edit this information later
                        </p>
                    </div>
                    <div class="relative pb-4">
                        <img v-if="vehicleLogo" class="h-16 w-16 rounded-full" :src="vehicleLogo" alt="" />
                        <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                    </div>
                </div>
            </div>
        </div>
        <form-container>
            <div class="flex justify-between">
                <div class="mt-2 text-sm text-gray-700">Current Block: 150</div>

                <div class="">
                    <button v-if="true" @click.prevent="" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                        <span class="pl-2">PROPOSE</span>
                    </button>
                </div>
            </div>
        </form-container>
    </main>
</template>

<script>
import FormContainer from "./layouts/FormContainer.vue";

export default {
    components: {
        "form-container": FormContainer,
    },
};
</script>