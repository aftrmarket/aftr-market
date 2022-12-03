<template>
    <div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Page header -->
                <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="animate-pulse flex items-center space-x-5">
                        <div class="flex-shrink-0">
                            <div class="flex space-x-4">
                                <div class="rounded-full bg-gray-400 h-12 w-12"></div>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white">Loading...</h1>
                            <p class="text-sm font-medium text-aftrYellow"></p>
                        </div>
                    </div>
                </div>

                <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div class="space-y-6 lg:col-start-1 lg:col-span-3">
                        <section class="lg:col-start-3 lg:col-span-1">
                            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <div class="flex flex-row justify-center items-center space-x-4">
                                    <div style="border-top-color:transparent"
                                        class="w-10 h-10 border-4 border-aftrBlue border-solid rounded-full animate-spin">
                                    </div>
                                    <h3 class="text-xl font-light leading-6">Loading from the Permaweb</h3>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    </div>

</template>

<script>


export default {
    data() {
        return {

        };
    },
};
</script>