<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="bg-aftrDarkGrey">
        <div class="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span class="block">Choose the Overview site to view</span>
            </h2>
            <div class="mt-8 flex justify-center gap-4">
                <button @click.prevent="sendTo('PROD')" type="submit" class="w-32 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-aftrBlue hover:bg-indigo-300">
                    Production
                </button>
                <button @click.prevent="sendTo('TEST')" type="submit" class="w-32 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-aftrBlue hover:bg-indigo-300">
                    Test
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        sendTo(overviewSite) {
            this.$router.push({
                name: "overview",
                params: { siteMode: overviewSite },
            });
        }
    }
}
</script>
