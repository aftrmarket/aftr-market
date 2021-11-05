<template>

    <div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Page header -->
                <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="flex items-center space-x-5">
                        <div class="flex-shrink-0">
                            <div class="relative"><img class="h-16 w-16 rounded-full" src="https://arweave.net/nZr8RcHYY2XXloKcxtgrbssBdpvz6C2ifM92QvkYkgg" alt=""><span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span></div>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white">Alquipa</h1>
                            <p class="text-sm font-medium text-aftrYellow">1a5vEadpcwKBL6ioGVkSFfZ17V-Ku9FB3Q3tBiMqC5I</p>
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"><button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg><span class="pl-2">Vehicle List</span></button></div>
                </div>
                <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div class="space-y-6 lg:col-start-1 lg:col-span-3">
                        <!-- Tabs -->
                        <section class="lg:col-start-3 lg:col-span-1">
                            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <div class="sm:hidden"><label for="tabs" class="sr-only">Select a tab</label><select id="tabs" name="tabs" class="block w-full focus:ring-aftrBlue focus:border-aftrBlue border-gray-300 rounded-md">
                                        <option>Info</option>
                                        <option>Members</option>
                                        <option>Tokens</option>
                                        <option>Votes</option>
                                        <option>Activity</option>
                                    </select></div>
                                <div class="hidden sm:block">
                                    <div class="border-b">
                                        <nav class="-mb-px flex" aria-label="Tabs"><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Info</a><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Members</a><a href="#" class="border-aftrBlue text-aftrBlue w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm" aria-current="page">Tokens</a><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Votes</a><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Activity</a></nav>
                                    </div>
                                </div>
                                <div class="pt-4 w-full">
                                    <!--v-if-->
                                    <!-- PSTs in Vehicle -->
                                    <div class="pt-1">
                                        <div class="my-2 overflow-x-auto sm:-mx-6 lg:-mx">
                                            <!--<div :class="varClass('py-2 align-middle inline-block sm:px-3 lg:px-6')">-->
                                            <div :class="varClass('py-2 w-3/4 align-middle inline-block sm:px-3 lg:px-6')"> 
                                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                    <table class="w-full text-xs divide-y divide-gray-200">
                                                        <thead class="bg-gray-50">
                                                            <tr>
                                                                <!--v-if-->
                                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Arweave Assets (3)</th>
                                                                <th scope="col" class="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Contributor</th>
                                                                <th scope="col" class="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                                                                <th scope="col" class="px-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Value (AR)</th>
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                            </tr>
                                                        </thead>
                                                        <tbody class="bg-white divide-y divide-gray-200">
                                                            <tr class="hover:bg-gray-50">
                                                                <!--v-if-->
                                                                <td class=" px-6 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full" src="https://arweave.net/9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg" alt=""></div>
                                                                        <div class="ml-4">
                                                                            <div class="font-medium text-gray-900">Verto (VRT)</div>
                                                                            <div class="text-gray-500">usjm4PCxUd...</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-6 py-3 text-gray-500">OI_wj-AISE...</td>
                                                                <td class="px-6 text-right py-3 text-gray-500">1,000</td>
                                                                <td class="px-6 text-right py-3 text-gray-500">20.0000</td>
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                            </tr>
                                                            <tr class="hover:bg-gray-50">
                                                                <!--v-if-->
                                                                <td class="px-1 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full" src="https://arweave.net/lhIkxHTm6H4zMyWJVugLUt3EJsQ7zeFyKMLCMToDt3s" alt=""></div>
                                                                        <div class="ml-4">
                                                                            <div class="font-medium text-gray-900">Decent Land (DLT)</div>
                                                                            <div class="text-gray-500">sew_MAXZIg...</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-1 py-3 text-gray-500">Fof_-BNkZN...</td>
                                                                <td class="text-right px-1 py-3 text-gray-500">55,000</td>
                                                                <td class="text-right pr-3 py-3 text-gray-500">183.3333</td>
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                            </tr>
                                                            <tr class="hover:bg-gray-50">
                                                                <!--v-if-->
                                                                <td class="px-1 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full" src="https://arweave.net/tN4vheZxrAIjqCfbs3MDdWTXg8a_57JUNyoqA4uwr1k" alt=""></div>
                                                                        <div class="ml-4">
                                                                            <div class="font-medium text-gray-900">ArDrive (ARDRIVE)</div>
                                                                            <div class="text-gray-500">-8A6RexFkp...</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-1 py-3 text-gray-500">CH_52MZm60...</td>
                                                                <td class="text-right px-1 py-3 text-gray-500">1,000</td>
                                                                <td class="text-right pr-3 py-3 text-gray-500">333.3333</td>
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                                <!--v-if-->
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-6 flex flex-col inline-flex">
                                        <div class="pt-6 flex justify-start items-center">
                                            <button type="button" @click.prevent="switchTable" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Switch </button>
                                        </div>
                                    </div>
                                </div>
                                <!--- Verify Proposal Start --->
                                <!--v-if-->
                                <!--- Verify Proposal End --->
                                <div class="col-span-3 text-right">
                                    <!--v-if-->
                                </div> [] Num Changes: 0<br> []
                            </div>
                        </section><!-- Tabs End -->
                    </div>
                </div>
            </div>
        </main>
    </div>
<br><br><br><br>
    <!--- 2nd TABLE -->
    <div>
        <main class="-mt-32">
            <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                <!-- Page header -->
                <div class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="flex items-center space-x-5">
                        <div class="flex-shrink-0">
                            <div class="relative"><img class="h-16 w-16 rounded-full" src="https://arweave.net/nZr8RcHYY2XXloKcxtgrbssBdpvz6C2ifM92QvkYkgg" alt=""><span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span></div>
                        </div>
                        <div>
                            <h1 class="text-2xl font-bold text-white">Alquipa</h1>
                            <p class="text-sm font-medium text-aftrYellow">1a5vEadpcwKBL6ioGVkSFfZ17V-Ku9FB3Q3tBiMqC5I</p>
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"><button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg><span class="pl-2">Vehicle List</span></button></div>
                </div>
                <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div class="space-y-6 lg:col-start-1 lg:col-span-3">
                        <!-- Tabs -->
                        <section class="lg:col-start-3 lg:col-span-1">
                            <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <div class="sm:hidden"><label for="tabs" class="sr-only">Select a tab</label><select id="tabs" name="tabs" class="block w-full focus:ring-aftrBlue focus:border-aftrBlue border-gray-300 rounded-md">
                                        <option>Info</option>
                                        <option>Members</option>
                                        <option>Tokens</option>
                                        <option>Votes</option>
                                        <option>Activity</option>
                                    </select></div>
                                <div class="hidden sm:block">
                                    <div class="border-b border-gray-200">
                                        <nav class="-mb-px flex" aria-label="Tabs"><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Info</a><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Members</a><a href="#" class="border-aftrBlue text-aftrBlue w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm" aria-current="page">Tokens</a><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Votes</a><a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm">Activity</a></nav>
                                    </div>
                                </div>
                                <div class="pt-4 w-full">
                                    <!--v-if-->
                                    <!-- PSTs in Vehicle -->
                                    <div class="pt-1">
                                        <div class="pt-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div class="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-6">
                                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                    <table class="w-full text-xs divide-y divide-gray-200">
                                                        <thead class="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" class="px-2 py-3 text-center font-medium text-gray-500 uppercase tracking-wider w-12"><input type="checkbox" class="focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded"></th>
                                                                <th scope="col" class="px-1 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Arweave Assets (3)</th>
                                                                <th scope="col" class="px-1 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Contributor</th>
                                                                <th scope="col" class="px-1 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                                                                <th scope="col" class="px-1 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Value (AR)</th>
                                                                <th scope="col" class="py-3 text-right font-medium text-gray-500 uppercase tracking-wider">Transfer Amount</th>
                                                                <th scope="col" class="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Transfer To Address</th>
                                                                <th scope="col" class="py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-16">WHE</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="bg-white divide-y divide-gray-200">
                                                            <tr class="hover:bg-gray-50">
                                                                <td class="text-center px-2 py-2"><input type="checkbox" value="tx2fasdfoijeo8547" class="focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded"></td>
                                                                <td class="px-1 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full" src="https://arweave.net/9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg" alt=""></div>
                                                                        <div class="ml-4">
                                                                            <div class="font-medium text-gray-900">Verto (VRT)</div>
                                                                            <div class="text-gray-500">usjm4PCxUd...</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-1 py-3 text-gray-500">OI_wj-AISE...</td>
                                                                <td class="text-right px-1 py-3 text-gray-500">1,000,000</td>
                                                                <td class="text-right pr-3 py-3 text-gray-500">20,000,000.0000</td>
                                                                <td class="pt-1 text-right">
                                                                    <div class="flex items-center">
                                                                        <input type="number" class="mt-1 mb-1 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md">

                                                                    </div>
                                                                </td>
                                                                <td class="pt-4 px-4 flex items-center space-x-2">
                                                                    <input type="text" class="mt-1 mb-1 w-80 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md">
                                                                    <button type="button" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                                <td class="pt-1">
                                                                    <button type="submit" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrDarkGreen bg-white hover:bg-aftrDarkGreen hover:text-white focus:outline-none">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                                                        </svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr class="hover:bg-gray-50">
                                                                <td class="text-center px-2 py-2"><input type="checkbox" value="tx3fasdfoijeo8547" class="focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded"></td>
                                                                <td class="px-1 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full" src="https://arweave.net/lhIkxHTm6H4zMyWJVugLUt3EJsQ7zeFyKMLCMToDt3s" alt=""></div>
                                                                        <div class="ml-4">
                                                                            <div class="font-medium text-gray-900">Decent Land (DLT)</div>
                                                                            <div class="text-gray-500">sew_MAXZIg...</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-1 py-3 text-gray-500">Fof_-BNkZN...</td>
                                                                <td class="text-right px-1 py-3 text-gray-500">55,000</td>
                                                                <td class="text-right pr-3 py-3 text-gray-500">183.3333</td>
                                                                <td class="pt-1"><input type="number" class="mt-1 mb-1 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md"></td>
                                                                <td class="pt-4 px-4 flex items-center space-x-2"><input type="text" class="mt-1 mb-1 w-72 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md">
                                                                    <!--v-if-->
                                                                </td>
                                                                <td class="pt-1"><button type="submit" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrDarkGreen bg-white hover:bg-aftrDarkGreen hover:text-white focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                                                        </svg></button></td>
                                                            </tr>
                                                            <tr class="hover:bg-gray-50">
                                                                <td class="text-center px-2 py-2"><input type="checkbox" value="tx6fasdfoijeo8547" class="focus:ring-aftrBlue h-4 w-4 text-aftrBlue border-gray-300 rounded"></td>
                                                                <td class="px-1 py-4 whitespace-nowrap">
                                                                    <div class="flex items-center">
                                                                        <div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full" src="https://arweave.net/tN4vheZxrAIjqCfbs3MDdWTXg8a_57JUNyoqA4uwr1k" alt=""></div>
                                                                        <div class="ml-4">
                                                                            <div class="font-medium text-gray-900">ArDrive (ARDRIVE)</div>
                                                                            <div class="text-gray-500">-8A6RexFkp...</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="px-1 py-3 text-gray-500">CH_52MZm60...</td>
                                                                <td class="text-right px-1 py-3 text-gray-500">1,000</td>
                                                                <td class="text-right pr-3 py-3 text-gray-500">333.3333</td>
                                                                <td class="pt-1"><input type="number" class="mt-1 mb-1 w-36 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md"></td>
                                                                <td class="pt-4 px-4 flex items-center space-x-2"><input type="text" class="mt-1 mb-1 w-72 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md">
                                                                    <!--v-if-->
                                                                </td>
                                                                <td class="pt-1"><button type="submit" class="p-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrDarkGreen bg-white hover:bg-aftrDarkGreen hover:text-white focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                                                        </svg></button></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-6 flex flex-col inline-flex"><button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                                            </svg><span class="pl-2">ADD TOKENS</span></button></div>
                                </div>
                                <!--- Verify Proposal Start --->
                                <!--v-if-->
                                <!--- Verify Proposal End --->
                                <div class="col-span-3 text-right">
                                    <!--v-if-->
                                </div> [] Num Changes: 0<br> []
                            </div>
                        </section><!-- Tabs End -->
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
            allowTransfer: false,
            arConnected: false,
        };
    },
    computed: {
        tableClass() {
            if (this.arConnected) {
                return "w-full text-xs divide-y divide-gray-200";
            } else {
                return "w-3/4 text-xs divide-y divide-gray-200";
            }
        },
    },
    methods: {
        switchTable() {
            this.arConnected = !this.arConnected;
        },
        varClass(classTxt) {
            if (this.arConnected) {
                return String(classTxt) + " w-full";
            } else {
                return String(classTxt) + " w-3/4";
            }
        },
    },
};
</script>