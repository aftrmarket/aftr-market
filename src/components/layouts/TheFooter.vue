<template>
    <div v-if="$route.name === 'overview'" class="bg-aftrDarkGrey">
        <div class="flex justify-end py-8 px-4 text-white font-sans text-lg gap-4">
            <div>Join our community</div>
            <a href="https://twitter.com/AftrMarket" target="_blank"><img src="../../assets/Twitter-Logo-Blue.svg" width="40"></a>
            <a href="/chat" target="_blank"><img src="../../assets/Discord-Logo-White.svg" width="40"></a>
        </div>
    </div>
    <div v-else>
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div class="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left"></div>
            <div class="flex justify-end px-4 text-black font-sans text-lg gap-x-4 gap-y-0">
                <div>Join our community</div>
                <a href="https://twitter.com/AftrMarket" target="_blank"><img src="../../assets/Twitter-Logo-Blue.svg" width="40"></a>
                <a href="/chat" target="_blank"><img src="../../assets/Discord-Logo-Color.svg" width="40"></a>
            </div>
        </div>
    </div>
</template>

<script>
</script>
