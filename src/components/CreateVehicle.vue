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
        <div v-if="pageStatus === 'in-progress'">
        <!-- ***** Alert Messages ***** -->
            <form-container>
                <div class='bg-yellow-50 border-l-4 border-yellow-400 p-4'>
                    <div class='animate-pulse flex'>
                        <div class='flex-shrink-0'>
                            <!--<ExclamationIcon class='h-5 w-5 text-yellow-400' aria-hidden='true' /> -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#E49B0F">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class='ml-3'>
                            <p class='text-sm text-aftrDarkGrey'>Your vehicle is being assembled...</p>
                        </div>
                    </div>
                </div>
            </form-container>
        </div>
        <div v-else-if="pageStatus === 'error'">
            <form-container>
                <div class='bg-red-50 border-l-4 border-red-400 p-4'>
                    <div class='animate-pulse flex'>
                        <div class='flex-shrink-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="red">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div class='ml-3'>
                            <p class='text-sm text-aftrDarkGrey'>A problem occurred while creating your vehicle.</p>
                        </div>
                    </div>
                </div>
            </form-container>
        </div>
        <div v-if="pageStatus === ''">
            <!-- Vehicle Info -->
            <form-container>
                <form action="#" method="POST">
                    <h3 class="text-xl font-light leading-6">Vehicle Information</h3>
                    <div class="bg-white sm:p-6">
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <label for="vehicleName" class="block text-sm font-medium text-gray-700">Vehicle Name</label>
                            <label for="vehicleTicker" class="block text-sm font-medium text-gray-700">Ticker</label>
                        </div>
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <input type="text" name="vehicleName" v-model="vehicle.name" ref="vehicleName" @input="nameValidate" :class="inputBox(nameValid)">
                            <input type="text" name="vehicleTicker" v-model="vehicle.ticker" ref="vehicleTicker" @input="tickerValidate" :class="inputBox(tickerValid)" />
                            
                        </div>
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <div class="col-span-2">
                                <label for="vehicleDesc" class="pt-2 block text-sm font-medium text-gray-700">Description</label>
                                <div class="mt-1">
                                    <textarea id="vehicleDesc" name="vehicleDesc" v-model="vehicle.desc" rows="3" class="shadow-sm focus:ring-aftrBlue focus:border-aftrBlue mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Describe your fund"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="vehicleLogo" class="py-2 block text-sm font-medium text-gray-700">Logo</label>
                            <div class="mt-2 sm:mt-0 sm:col-span-2">
                                <div class="
                                            max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div class="space-y-1 text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                            <label for="vehicleLogo" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input @change="onFileChange" id="vehicleLogo" name="vehicleLogo" type="file" class="sr-only" />
                                            </label>
                                            <p class="pl-1"> or drag and drop</p>
                                        </div>
                                        <p class="text-xs text-gray-500">16 x 16 PNG, JPG, or GIF</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="leasingEnabled">
                            <div class="pt-2">
                                <label for="seats" class="block text-sm font-medium text-gray-700">Number of Seats Available</label>
                                <div class="flex justify-start items-center">
                                    <input type="number" v-model="seats" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">~<span class="text-lg text-aftrBlue">{{ displaySeats }}</span> seats will be created</label>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label for="seats" class="block text-sm font-medium text-gray-700">Vehicle Lock Period</label>
                                <div class="flex justify-start items-center">
                                    <input type="number" v-model="lockPeriod" @change="lockChange" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">Months (~<span class="text-lg text-aftrBlue">{{ monthsInBlocks(lockPeriod) }}</span> Blocks)</label>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label for="seats" class="block text-sm font-medium text-gray-700">Price per Seat</label>
                                <div class="flex justify-start items-center">
                                    <input type="number" v-model="vehicle.seatPrice" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">AR</label>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label for="leaseLength" class="block text-sm font-medium text-gray-700">Lease Length</label>
                                <div class="flex justify-start items-center space-x-4">
                                    <input type="number" placeholder="Min" v-model="minLease" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <input type="number" placeholder="Max" v-model="maxLease" class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">
                                        Months (~<span class="text-lg text-aftrBlue">{{ monthsInBlocks(minLease) }}</span> to <span class="text-lg text-aftrBlue">{{ monthsInBlocks(maxLease) }}</span> Blocks)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">Settings</h3>
                    <div class="bg-white sm:p-6">
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <label class="block text-sm font-medium text-gray-700">Vehicle Tokens</label>
                            <label class="block text-sm font-medium text-gray-700">Vehicle Ownership</label>
                        </div>
                        <div class="pt-2 grid grid-cols-3 gap-4 flex items-center">
                            <input type="number" name="vehicleTokens" placeholder="# of Vehicle Tokens" v-model="vehicleTokens" @input="onTokenChange" :class="inputBox(vehicleTokensValid)" />
                            <div class="col-span-2">
                                <input type="radio" v-model="ownership" id="single" value="single" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">Single Owner</label>
                                <input type="radio" v-model="ownership" id="dao" value="dao" class="form-radio text-aftrBlue"><label class="px-2 text-sm text-gray-700">DAO Owned</label>
                            </div>
                        </div>
                    </div>

                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">Add Tokens</h3>
                    <div class="bg-white sm:p-6">
                        <div v-if="arConnected" class="pt-6">
                            <label class="block text-sm font-medium text-gray-700">
                                Creator: <span class="font-bold text-aftrBlue">{{ activeWallet }}</span>
                            </label>
                        </div>
                        <div v-else class="pt-6 flex justify-start items-center">
                            <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Login to ArConnect
                            </button>
                            <label class="pl-4 block text-sm text-gray-700">
                                You must provide a wallet in order to create a vehicle
                            </label>
                        </div>
                        <div v-if="arConnected" class="pt-6">
                            <select v-model="selectedPstId" @change="pstChange" id="selectedPstId" name="selectedPstId" class="mt-1 block w-1/2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option value="" disabled selected>
                                    Select PST
                                </option>
                                <option v-for="pst in psts" :key="pst.id" :value="pst.id">
                                    {{ pst.name }} ({{ pst.id }})
                                </option>
                            </select>
                        </div>
                        <div v-if="selectedPstId !== ''">
                            <div class="pt-6 pb-4">
                                <label class="block text-sm font-medium text-gray-700">
                                    You have <span class="font-bold text-aftrBlue">{{ pstBalance }} {{ pstTicker }}</span><span> available to use in your vehicle.</span>
                                </label>
                            </div>
                            <input type="number" placeholder="Amount" v-model="pstInputTokens" @input="calcPstPrice" :class="inputBox(pstInputValid)" />
                            <span v-if="pstInputTokens" class="pl-4 pr-6">@ {{ formatNumber( pricePerToken, true) }} AR {{ pstInputTokens ? " = " + formatNumber(pstValue, true) + " AR" : "" }}</span>
                            <div class="pt-2">
                                <button v-if="pstInputValid && pstInputTokens" @click.prevent="addPst" type="submit" class=" inline-flex justify-center py-2 px-4 border border-gray shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-transparent hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                                    <img class="-ml-1 mr-2 h-5 w-5 text-current" src="../assets/add_circle-24px.svg" /> Add PST
                                </button>
                            </div>
                        </div>
                            
                        <!-- Table of PSTs -->
                        <div v-if="vehiclePsts.length > 0" class="pt-1">
                            <div class="pt-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Sharing Token ({{ vehiclePsts.length }})</th>
                                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value (AR)</th>
                                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="pst in vehiclePsts" :key="pst.id" class="hover:bg-gray-50">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 h-10 w-10">
                                                                <img class="h-10 w-10 rounded-full" :src="`https://arweave.net/` + pst.logo" alt="" />
                                                            </div>
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900"> {{ pst.name + " (" + pst.ticker + ")" }} </div>
                                                                <div class="text-sm text-gray-500"> {{ pst.id.substr(0, 5) + "..." }}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right px-6 py-3">{{ formatNumber(pst.tokens) }}</td>
                                                    <td class="text-right px-6 py-3">{{ formatNumber(pst.total, true) }}</td>
                                                    <td class="text-center px-6 py-3">
                                                        <button @click.prevent="removePst(pst.id)" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                                                            <img src="../assets/delete-24px.svg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of PST Table -->
                    </div>
                    <div class="pl-6 pb-4 text-right">
                        <div class="text-right">
                            <span v-if="totalValue" class="px-6 py-3">
                                Total:
                                <span class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {{ formatNumber(totalValue, true) }} AR
                                </span>
                            </span>
                        </div>
                    </div>

                    <!-- DAO -->
                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">DAO Members</h3>
                    <!-- DAO Members -->
                    <div class="bg-white sm:p-4">
                        <div class="flex items-stretch">
                            <div class="mt-6 flow-root">
                                <input type="text" v-model="memberWallet" placeholder="Wallet Address" @input="onTokenChange" :class="inputBox(memberWalletValid)" class="w-96" />
                            </div>
                            <div class="mt-6 pl-4 flex flex-col inline-flex">
                                <input type="number" placeholder="Tokens" v-model="memberAmount" @input="onTokenChange" :class="inputBox(memberAmountValid)" />
                                <label class="pl-4 flex flex-col inline-flex block text-sm text-gray-700">
                                    Available Balance: {{ formatNumber(availableTokens) }}
                                </label>
                            </div>
                            <div class="mt-6 pl-4 flex flex-col inline-flex">
                                <button v-if="memberWalletValid && memberAmountValid" @click.prevent="addDaoMember" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                    <span class="pl-2">Add Member</span>
                                </button>
                            </div>
                        </div>
                        <!-- Table of DAO Members -->
                        <div v-if="daoMembers.length" class="pt-1">
                            <div class="pt-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members ({{daoMembers.length}})</th>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Tokens</th>
                                                    <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update Tokens</th>
                                                    <th scope="col" class="px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="(member, index) in daoMembers" :key="index" class="hover:bg-gray-50">
                                                    <td class="text-xs px-6 py-3">{{ member.wallet.substr(0, 10) + "..." }}</td>
                                                    <td class="text-xs px-6 py-3">
                                                        {{ member.balance }} 
                                                    </td>
                                                    <td class="">
                                                        <input type="number" placeholder="New Value..." v-model="daoRowBalance[index]" class="mt-1 mb-1 mr-4 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                        <button @click.prevent="daoRowChange(member.wallet)" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                                                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                    <td v-if="member.wallet === activeWallet" class="text-center px-6 py-3">
                                                    </td>
                                                    <td v-else class="text-center px-6 py-3">
                                                        <button @click.prevent="removeDaoMember(member)" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                                                            <img src="../assets/delete-24px.svg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End of DAO Table -->
                    <div class="pl-6 pb-4 text-right">
                        <div class="text-right">
                            <span v-if="daoBalance" class="px-6 py-3">
                                DAO Balance:
                                <span class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {{ formatNumber(daoBalance, false) }} {{ printTokens(daoBalance) }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <!-- End DAO -->

                    <!-- Button Row --->
                    <div class="px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-between">
                        <button type="submit" @click.prevent="cancelCreate" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                            </svg>
                            <span class="pl-2">Cancel</span>
                        </button>
                        <button v-if="isInputValid" type="submit" @click.prevent="createVehicle" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"></path>
                            </svg>
                            <span class="pl-2">Create Vehicle</span>
                        </button>
                    </div>
                    <!--- End Button Row --->
                </form>
            </form-container>
            <!-- End Vehicle Info -->
            {{ vehicle }} {{ vehiclePsts }} {{ daoMembers }} Member Amount: {{memberAmount}}, Available Tokens: {{availableTokens}}, DAO Balance: {{daoBalance}} <br/><br/>
            nameValid {{nameValid}} <br/>
            tickerValid {{tickerValid}} <br/>
            vehicleTokensValid {{vehicleTokensValid}} <br/>
            memberWalletValid {{memberWalletValid}} <br/>
            memberAmountValid {{memberAmountValid}} <br/>
            memberRowValid {{memberRowValid}} <br/>

        </div>
    </main>
</template>

<script>
import Arweave from "arweave";
//import NumberInput from '/utils/NumberInput.vue';
import numeral from "numeral";
import numberAbbreviate from "number-abbreviate";
import { createContractFromTx, interactWrite } from "smartweave";

// @ts-expect-error
import FormContainer from "./layouts/FormContainer.vue";
// @ts-expect-error
import ActionInput from "./layouts/ActionInput.vue";

export default {
    components: { FormContainer, ActionInput },
    data() {
        return {
            /** Smartweave variables */
            contractSourceId: "BTxbGwMEyVv94ak2CDeuCAXLWnAhwLb_hK4qw8_a-JU", // Changes with every AFTR contract update
            tagProtocol: "AFTR-Test",
            /** */

            leasingEnabled: false,          // Is vehicle leasing enabled?
            arConnected: false,             // Is user logged in through ArConnect?
            pstSelected: false,             // Boolean that shows when a PST is selected
            vehicleTokens: 100000000,       // Available tokens in vehicle
            vehicleTokensValid: true,
            activeWallet: "",               // Active wallet address on ArConnect
            activeWalletAmount: 0,
            activeWalletAmountValid: false,

            createInProgress: false,        // Boolean to toggle wait

            pageStatus: "",                 // Flag to format page based on status

            selectedPstId: "",              // ID of selected PST
            pstInputTokens: null,              // Number of tokens of PST
            vehicleLogo: null,              // Logo for vehicle
            lockPeriod: 0,                  // Period of time that the vehicle must exist
            seats: 0,                       // Number of seats available on vehicle
            minLease: 2,                    // Minimum seat lease length in months
            maxLease: 24,                   // Maximum seat lease length in months
            ownership: "dao",
            inputValid: false,              // Boolean to show when any input field is invalid
            pstInputValid: false,           // Boolean to show when amount goes over tokens held
            nameValid: false,               // Boolean for valid vehicle name
            tickerValid: false,             // Boolean for valid ticker name
            pricePerToken: null,            // Selected PST's price
            pstValue: null,                 // pricePerShare * inputShares
            totalValue: null,               // Sum of all PST values in vehicle
            vehiclePsts: [],                // Array of vehicle's PSTs
            vehicle: {},                    // Created vehicle object
            psts: [],
            daoMembers: [],                 // Array of DAO member wallets (to be added to balances on vehicle creation) and number of tokens
            daoBalance: 0,
            availableTokens: null,
            memberWallet: "",               // Wallet address of DAO member being added to vehicle
            memberWalletValid: false,
            memberAmount: null,
            memberAmountValid: false,
            memberRowValid: false,
            daoRowBalance: [],

            /****  TEST object
      psts: [
            { id: '46c0bdd1-56a9-4179-8a56-164b702a5cb8', ticker: 'AFTR', name: 'AFTR Market', price: 0.05 },
            { id: '8f1d6790-b885-4078-af9d-4e431ed74cf6', ticker: 'ARDRIVE', name: 'ArDrive', price: 0.078 },
            { id: 'c9f7418c-2587-433e-a355-03d2c5a5c5b3', ticker: 'ARVERIFY', name: 'ArVerify', price: 0.035 },
            { id: 'f9fde4f9-89ec-404b-8a0a-1bc674b39676', ticker: 'XYZ', name: 'CommunityXYZ', price: 0.098 },
            { id: 'af7997c3-36b3-42ea-b923-38c0e69c8802', ticker: 'KOI', name: 'Koi', price: 0.045 },
            { id: '919ce858-2513-424a-9fdb-de146eee1417', ticker: 'OPENBITS', name: 'OpenBits', price: 0.06 },
            { id: 'e6125855-8414-4ae1-b611-66aff71160a2', ticker: 'VRT', name: 'Verto Exchange', price: 0.1 }
      ]
      ****/
        };
    },
    computed: {
        displaySeats() {
            return numberAbbreviate(this.seats, 2);
        },
        convertToInt(value) {
            return parseInt(value);
        },
        pstBalance() {
            const currentPst = this.psts.find((item) => item.id === this.selectedPstId);
            return this.formatNumber(currentPst.balance);
        },
        pstTicker() {
            const currentPst = this.psts.find((item) => item.id === this.selectedPstId);
            return currentPst.ticker;
        },
        vehicleTokenBox() {
            if (this.vehicleTokensValid) {
                return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
            }
        },
        memberTokenBox() {
            if (this.availableTokens < 0) {
                return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            }
        },
        isInputValid() {
            if (this.nameValid && this.tickerValid && this.vehicleTokensValid && this.memberRowValid) {
                return true;
            } else {
                return false;
            }
        },
        // Code to handle a checkbox in the table to check/uncheck all rows.
        /******
      selectAll: {
          get(){
              return this.vehiclePsts ? this.checkedPsts.length == this.vehiclePsts.length : false;
          },
          set(value) {
              let selected = [];

              if (value) {
                  this.vehiclePsts.forEach(vehiclePst => selected.push(vehiclePst.id));
              }
              this.checkedPsts = selected;
          }
      }
      ******/
    },
    methods: {
        formatNumber(num, dec = false) {
            if (dec) {
                return numeral(num).format("0,0.0000");
            } else {
                return numeral(num).format("0,0");
            }
        },
        printTokens(value) {
            if (Number(value) > 1) {
                return "Tokens";
            } else {
                return "Token";
            }
        },
        inputBox(valid) {
            if (valid) {
                return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
            } else {
                return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-gray-300 rounded-md";
            }
        },
        monthsInBlocks(value) {
            // 1 block ~ 2 mins
            if (value) {
                const numBlocks = parseFloat(value) * (43800 / 2);
                return numberAbbreviate(numBlocks, 2);
            } else {
                return "0";
            }
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.vehicleLogo = URL.createObjectURL(file);
        },
        nameValidate() {
            if (this.vehicle.name === '') {
                this.nameValid = false;
            } else {
                this.nameValid = true;
            }
        },
        tickerValidate() {
            if (this.vehicle.ticker === '') {
                this.tickerValid = false;
            } else {
                this.tickerValid = true;
            }
        },
        onTokenChange() {
            // Evaluate flags and calculate any changes to these values because they all work together
            const tokens = Number(this.vehicleTokens) ?? 0;
            const dBal = Number(this.daoBalance) ?? 0;
            const mAmount = Number(this.memberAmount) ?? 0;

            this.availableTokens = this.vehicleTokens - dBal - mAmount;

            // Evaluate flags
            if (tokens == 0) {
                this.vehicleTokensValid = false;
            } else {
                this.vehicleTokensValid = true;
            }
            if (mAmount == 0 || this.availableTokens < 0) {
                this.memberAmountValid = false;
            } else {
                this.memberAmountValid = true;
            }
            if (this.memberWallet === '' || !this.memberWallet || this.memberWallet === this.activeWallet || this.memberWallet.length != 43)  {
                this.memberWalletValid = false;
            } else {
                this.memberWalletValid = true;
            }
        },
        daoRowChange(wallet) {
            const arrayIndex = this.daoMembers.findIndex((item) => item.wallet === wallet);
            const oldAmount = this.daoMembers[arrayIndex].balance;
            const newAmount = parseInt(this.daoRowBalance[arrayIndex]);
            const availTokens = this.availableTokens ?? this.vehicleTokens;

            if (availTokens + oldAmount - newAmount < 0) {
                this.memberRowValid = false;
            } else {
                this.memberRowValid = true;
                this.daoMembers[arrayIndex].balance = newAmount;
                this.daoRowBalance[arrayIndex] = '';
                this.sumDaoAmounts();
                this.onTokenChange();
            }
        },
        sumDaoAmounts() {
            let bal = 0;
            let sum = 0;
            for(let dao of this.daoMembers) {
                bal = Number(dao.balance) ?? 0;
                sum += bal;
            }
            this.daoBalance = sum;
        },
        async arConnect() {
            try {
                const promiseResult = await window.arweaveWallet.connect([
                    "ACCESS_ADDRESS",
                    "ACCESS_ALL_ADDRESSES",
                    "SIGN_TRANSACTION",
                ]);
                this.activeWallet = await window.arweaveWallet.getActiveAddress();
                this.arConnected = true;
                this.daoMembers.push({
                    wallet: this.activeWallet,
                    balance: 0
                });
            } catch (error) {
                console.log("ERROR during ArConnection: " + error);
            }

            try {
                // Now query Verto to get all PSTs contained in Wallet
                const response = await fetch(
                    "http://v2.cache.verto.exchange/balance/" +
                        this.activeWallet
                );
                this.psts = await response.json();
                /**** RESPONSE RETURNS AS AN ARRAY OF KEY/VALUE PAIRS ****
                 * [ {
                 *  id: '',
                 *  balance: '',
                 *  name: '',
                 *  ticker: '',
                 *  logo: ''
                 * } ]
                 ****/
            } catch (error) {
                console.log("ERROR while fetching Verto balances: " + error);
            }

            try {
                // Query Verto to get AR prices for each token
                for (let pst of this.psts) {
                    const response = await fetch(
                        "http://v2.cache.verto.exchange/token/" +
                            pst.id +
                            "/price"
                    );
                    const jsonRes = await response.json();
                    const i = this.psts.findIndex((item) => item.id === pst.id);
                    this.psts[i]["price"] = jsonRes.price;
                    this.psts[i]["total"] =
                        jsonRes.price * this.psts[i]["balance"];
                }
            } catch (error) {
                console.log(
                    "ERROR while fetching AR prices from Verto: " + error
                );
            }
        },
        togglePstFields() {
            this.pstSelected = !this.pstSelected;
        },
        lockChange() {
            if (this.minLease > this.lockPeriod) {
                this.minLease = this.lockPeriod;
            }
            if (this.maxLease < this.lockPeriod) {
                this.maxLease = this.lockPeriod;
            }
        },
        pstChange() {
            this.pstInputTokens = null;
            this.pricePerToken = null;
        },
        calcPstPrice() {
            const currentPst = this.psts.find((item) => item.id === this.selectedPstId);
            this.pricePerToken = currentPst.price;
            this.pstValue = currentPst.price * this.pstInputTokens;
            this.updatePstInputValid(currentPst.balance);
        },
        // updateAvailableTokens() {
        //     if (this.daoBalance && this.activeWalletAmount) {
        //         this.availableTokens = this.vehicleTokens - this.daoBalance - this.activeWalletAmount;
        //     } else if (this.daoBalance) {
        //         this.availableTokens = this.vehicleTokens - this.daoBalance;
        //     } else {
        //         this.availableTokens = this.vehicleTokens;
        //     }
        // },
        updatePstInputValid(balance) {
            if (Number(this.pstInputTokens) <= balance) {
                this.pstInputValid = true;
            } else {
                this.pstInputValid = false;
            }
        },
        updateVehicleTotal() {
            this.totalValue = this.vehiclePsts.reduce((acc, item) => acc + item.total, 0);
        },
        addPst() {
            // Create temp object and add new keys
            let currentPst = this.psts.find((item) => item.id === this.selectedPstId);
            let existingIndex = this.vehiclePsts.findIndex((item) => item.id === this.selectedPstId);
            if (existingIndex === -1) {
                // Add new PST to vehicle
                currentPst["tokens"] = parseInt(this.pstInputTokens);
                currentPst.total = this.pstValue;
                this.vehiclePsts.push(currentPst);
            } else {
                // Updated existing PST in vehicle
                this.vehiclePsts[existingIndex]["tokens"] += parseInt(this.pstInputTokens);
                this.vehiclePsts[existingIndex]["total"] += this.pstValue;
            }
            // Subtract tokens from wallet pst
            existingIndex = this.psts.findIndex((item) => item.id === this.selectedPstId);
            this.psts[existingIndex]["balance"] -= parseInt(this.pstInputTokens);
            this.updatePstInputValid(this.psts[existingIndex]["balance"]);

            /*** TODO:  SAVE WALLET UPDATES ON CREATE VEHICLE */

            // Recalc the price
            this.updateVehicleTotal();
        },
        removePst(id) {
            const deleteIndex = this.vehiclePsts.findIndex((item) => item.id === id);
            const idTokens = this.vehiclePsts[deleteIndex].tokens;
            this.psts.find((item) => item.id === id).balance += idTokens;
            this.vehiclePsts.splice(deleteIndex, 1);
            this.updateVehicleTotal();
        },
        addDaoMember() {
            const member = {};
            if (!this.daoMembers[this.memberWallet]) {
                member.wallet = this.memberWallet;
                member.balance = parseInt(this.memberAmount);
                this.daoMembers.push(member);
                this.sumDaoAmounts();
            }
            // if (this.daoBalance) {
            //     this.daoBalance += this.memberAmount;
            // } else {
            //     this.daoBalance = this.memberAmount;
            // }
            
            //this.updateAvailableTokens();
            this.memberWallet = '';
            this.memberAmount = null;
            this.onTokenChange();
        },
        removeDaoMember(id) {
            const arrayIndex = this.daoMembers.findIndex((item) => item === id);
            // this.daoBalance -= this.daoMembers[arrayIndex].balance;
            this.sumDaoAmounts();
            this.memberAmount = null;
            this.daoMembers.splice(arrayIndex, 1);
            //this.onTokenChange();
        },
        // updateDaoBalance() {
        //     //const daoBalance = Math.round(this.vehicleTokens / this.daoMembers.length);
            
        // },
        async createVehicle() {
            if (!this.nameValid) {
                this.$refs.vehicleName.focus();
                return false;
            }
            if (!this.tickerValid) {
                this.$refs.vehicleTicker.focus();
                return false;
            }
                
            this.pageStatus = "in-progress";

            let arweave = {};
            try {
                arweave = await Arweave.init({
                    host: "arweave.net",
                    port: 443,
                    protocol: "https",
                    timeout: 20000,
                    logging: true,
                });
            } catch (error) {
                console.log("ERROR connecting to Arweave: " + error); // How can this ever happen? :)
                this.pageStatus = "error";
                return false;
            }

            const initTags = [
                { name: "Protocol", value: this.tagProtocol }
            ];
            this.vehicle.creator = this.activeWallet;
            this.vehicle.seats = this.seats;
            this.vehicle.lockPeriod = this.lockPeriod;
            this.vehicle.minLease = this.minLease;
            this.vehicle.maxLease = this.maxLease;
            //this.vehicle.logo = this.vehicleLogo;
            this.vehicle.logo = "9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg";      // TEMP LOGO
            this.vehicle.ownership = this.ownership;
            this.vehicle.status = "stopped";

            // Convert DAO Member array to dictionary
            this.vehicle.balances = this.daoMembers.reduce((a, x) => ({ ...a, [x.wallet]: x.balance }), {});

            const tmpPsts = this.vehiclePsts.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    ticker: item.ticker,
                    logo: item.logo,
                    tokens: item.tokens,
                };
            });
            this.vehicle.psts = tmpPsts;
            console.log("VEHICLE: " + JSON.stringify(this.vehicle));

/****/
            const vehicleTest = {
                "name": "Test Vehicle",
                "ticker": "AFTR-Test-1",
                //"creator": "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8",
                //"seats": 0,
                //"lockPeriod": 0,
                //"minLease": 2,
                //"maxLease": 24,
                //"logo": "9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg",
                //"ownership": "dao",
                //"status": "stopped",
                "balances": {
                    "abd7DMW1A8-XiGUVn5qxHLseNhkJ5C1Cxjjbj6XC3M8": 12300,
                    "Fof_-BNkZN_nQp0VsD_A9iGb-Y4zOeFKHA8_GK2ZZ-I": 1000
                },
                //"vault" : {},
                //"votes" : [],
                //"roles" : {},
                "settings" : [
                    ["quorum", 0.5],
                    ["voteLength", 2000],
                    ["lockMinLength", 100],
                    ["lockMaxLength", 10000]
                ]
            }
 /***/

            // Create SmartWeave contract
            try {
                console.log("arweave: " + JSON.stringify(arweave)); console.log("contractSourceId: " + this.contractSourceId);
                console.log("vehicle: " + JSON.stringify(this.vehicle)); console.log("tags: " + JSON.stringify(initTags));
                this.vehicle['id'] = await createContractFromTx(arweave, "use_wallet", this.contractSourceId, JSON.stringify(vehicleTest), initTags);
                console.log("ID = " + this.vehicle['id']);
            } catch(error) {
                console.log("ERROR creating SmartWeave contract: " + error);
                this.pageStatus = "error";
                return false;
            }

            let transferInput = {};

            try {
                // Loop through vehicle PSTs and perform transfers
                for (const pst of this.vehicle.psts) {
                    transferInput = {
                        function: "transfer",
                        target: this.vehicle.id,
                        qty: pst.tokens, // PST qty
                    };

                    console.log("TokenId: " + pst.id + " Name: " + pst.name + " Qty: " + pst.tokens);
                    //SOMETHING = await interactWrite(arweave, "use_wallet", pst.id, initTags);

                    this.$router.push( { name: 'vehicle', params: { vehicleId: this.vehicle.id } });
                }
            } catch (error) {
                console.log("ERROR transferring tokens: " + error);
                this.pageStatus = "error";
                return false;
            }
            
            this.pageStatus = "";
        },
        cancelCreate() {
            this.$router.push("vehicles");
        },
    },
};
</script>
