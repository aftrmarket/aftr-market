<template>
    <div class="mt-2 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <!-- Form Container -->
        <div class="space-y-6 lg:col-start-1 lg:col-span-3">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="bg-white sm:p-6">
                    <slot></slot>
                </div>
            </div>
        </div>
        <!-- End Form Container -->
    </div>
</template>