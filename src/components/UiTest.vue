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
            <form action="#" method="POST">
                <div class="pt-2 grid grid-cols-2 gap-4">
                    <label for="vehicleName" class="block text-sm font-medium text-gray-700">Vehicle Name</label>
                    <label for="vehicleTicker" class="block text-sm font-medium text-gray-700">Ticker</label>
                </div>
                <div class="pt-2 grid grid-cols-2 gap-4">
                    <input type="text" name="vehicleName" ref="vehicleName">
                    <input type="text" name="vehicleTicker" ref="vehicleTicker" />
                </div>
                <div>
                    <label for="vehicleDesc" class="pt-2 block text-sm font-medium text-gray-700">Description</label>
                    <div class="mt-1">
                        <textarea id="vehicleDesc" name="vehicleDesc" rows="3" class="shadow-sm focus:ring-aftrBlue focus:border-aftrBlue mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Describe your fund"></textarea>
                    </div>
                </div>
                <div>
                    <label for="vehicleLogo" class="py-2 block text-sm font-medium text-gray-700">Logo</label>
                    <div class="mt-2 sm:mt-0 sm:col-span-2">
                        <div class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div class="space-y-1 text-center">
                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="flex text-sm text-gray-600">
                                    <label for="vehicleLogo" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="vehicleLogo" name="vehicleLogo" type="file" class="sr-only" />
                                    </label>
                                    <p class="pl-1"> or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">16 x 16 PNG, JPG, or GIF</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="mt-2 pt-2 border-t border-gray-200">
                <div class="px-4 py-3 sm:px-6 flex items-center justify-between">
                    <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="pl-2">Cancel</span>
                    </button>
                    <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                        </svg>
                        <span class="pl-2">Create Vehicle</span>
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