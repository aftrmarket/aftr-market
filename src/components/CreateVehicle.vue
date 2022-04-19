<template>
    <main class="-mt-32 pb-10">
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
                        <img v-else class="h-16 w-16 rounded-full" src="../assets/logo-placeholder.png" alt="" />
                        <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                    </div>
                </div>
            </div>
        </div>
        <div>
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
                            <input type="text" name="vehicleName" v-model="vehicle.name" ref="vehicleName" @input="nameValidate" :class="inputBox(nameValid)" />
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
                            <div class="mt-2 sm:mt-0 sm:col-span-2 pl-6">
                                <div class="flex text-sm text-gray-600">
                                    <label for="vehicleLogo" class="relative cursor-pointer bg-white rounded-md font-medium text-aftrBlue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input @change="onFileChange" id="vehicleLogo" name="vehicleLogo" type="file" accept="image/png, image/gif, image/jpeg" class="sr-only" />
                                    </label>
                                </div>
                                <p class="text-xs text-gray-500">200 x 200 PNG, JPG, or GIF</p>
                                <p class="text-xs text-aftrRed">
                                    {{ fileMessage }}
                                </p>
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

                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">
                        Settings
                    </h3>
                    <div class="bg-white sm:p-6">
                        <div class="pt-2 grid grid-cols-4 flex items-center gap-x-4">
                            <!--<label class="block text-sm font-medium text-gray-700">Vehicle Tokens to Mint</label>-->
                            <label class="block text-sm font-medium text-gray-700">Vehicle Ownership</label>
                            <label class="block text-sm font-medium text-gray-700">Voting System</label>
                            <label class="block text-sm font-medium text-gray-700">Quorum (between 0.01 - 0.99)</label>
                            <label class="block text-sm font-medium text-gray-700">Support(between 0.01 - 0.99)</label>

                            <!--<input type="number" name="vehicleTokens" placeholder="# of Vehicle Tokens" v-model="vehicleTokens" @input="onTokenChange" :class="inputBox(vehicleTokensValid)" />-->
                            <div class="">
                                <input type="radio" v-model="ownership" id="single" value="single" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Single Owner</label>
                                <input type="radio" v-model="ownership" id="dao" value="dao" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">DAO Owned</label>
                            </div>
                            <div class="">
                                <input type="radio" v-model="votingSystem" id="equal" value="equal" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Distributed Evenly</label>
                                <input type="radio" v-model="votingSystem" id="weighted" value="weighted" class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Weighted</label>
                            </div>
                            <div class="">
                                <input v-model="newQuorum" name="newQuorum" type="number" :class="inputBox(quorumIsValid)" />
                            </div>
                            <div class="">
                                <input v-model="newSupport" name="newSupport" type="number" :class="inputBox(supportIsValid)" />
                            </div>
                        </div>
                    </div>
<!--
                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">
                        Add Tokens
                    </h3>
                    <div class="bg-white sm:p-6">
                        <div v-if="arConnected" class="pt-6">
                            <label class="block text-sm font-medium text-gray-700">
                                Creator:
                                <span class="font-bold text-aftrBlue">{{ walletAddressSubstr($store.getters.getActiveAddress) }}</span>
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
                                <option value="" disabled selected>Select PST</option>
                                <option v-for="pst in $store.getters.getActiveWallet.psts" :key="pst.id" :value="pst.id" :disabled="!pst.fcp">
                                    {{ pst.name }} ({{ pst.id }})
                                </option>
                            </select>
                        </div>
                        <div v-if="selectedPstId !== ''">
                            <div class="pt-6 pb-4">
                                <label class="block text-sm font-medium text-gray-700">
                                    You have
                                    <span class="font-bold text-aftrBlue">{{ pstBalance }} {{ pstTicker }}</span><span> available to use in your vehicle.</span>
                                </label>
                            </div>
                            <input type="number" placeholder="Amount" v-model="pstInputTokens" @input="calcPstPrice" :class="inputBox(pstInputValid)" />
                            <span v-if="pstInputTokens && false" class="pl-4 pr-6">@ {{ formatNumber(pricePerToken, true) }} AR
                                {{ pstInputTokens ? " = " + formatNumber(pstValue, true) + " AR" : "" }}</span>
                            <div class="pt-2">
                                <button v-if="pstInputValid && pstInputTokens" @click.prevent="addPst" type="submit" class="inline-flex justify-center py-2 px-2 border border-gray shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-transparent hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="pl-2">ADD PST</span>
                                </button>
                            </div>
                        </div>
-->
                        <!-- Table of PSTs -->
<!--
                        <div v-if="vehiclePsts.length > 0" class="pt-1">
                            <div class="pt-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Profit Sharing Token ({{ vehiclePsts.length }})
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Tokens
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Value (AR)
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="pst in vehiclePsts" :key="pst.id" class="hover:bg-gray-50">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="flex items-center">
                                                            <div class="flex-shrink-0 h-10 w-10">
                                                                <img class="h-10 w-10 rounded-full" :src="pstLogo(pst.id, pst.logo)" alt="" />
                                                            </div>
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    {{ pst.name + " (" + pst.ticker + ")" }}
                                                                </div>
                                                                <div class="text-sm text-gray-500">
                                                                    {{ pst.id.substr(0, 5) + "..." }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="text-right px-6 py-3">
                                                        {{ formatNumber(pst.tokens) }}
                                                    </td>
                                                    <td class="text-right px-6 py-3">
                                                        {{ formatNumber(pst.total, true) }}
                                                    </td>
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
-->
                        <!-- End of PST Table -->
<!--
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
-->
                    <!-- DAO -->
                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">
                        DAO Members
                    </h3>
                    <!-- DAO Members -->
                    <div class="bg-white sm:p-4">
                        <div class="flex items-stretch">
                            <div class="mt-6 flow-root">
                                <input type="text" v-model="memberWallet" placeholder="Wallet Address" @input="onTokenChange" :class="inputBox(memberWalletValid)" class="w-96" />
                            </div>
                            <div class="mt-6 pl-4 flex flex-col inline-flex">
                                <input type="number" placeholder="Tokens" v-model="memberAmount" @input="onTokenChange" :class="inputBox(memberAmountValid)" />
                            </div>
                            <div class="mt-6 pl-4 flex flex-col inline-flex">
                                <div v-if="!memberAmountValid">
                                    <label class="pl-4 flex flex-col inline-flex block text-sm text-aftrRed">
                                        The Creator is assumed be a DAO member.
                                        <br />
                                        Be Sure to update token balance below.
                                    </label>
                                </div>
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
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Members ({{ daoMembers.length }})
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Current Tokens
                                                    </th>
                                                    <th scope="col" class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Update Tokens
                                                    </th>
                                                    <th scope="col" class="px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="(member, index) in daoMembers" :key="index" class="hover:bg-gray-50">
                                                    <td class="text-xs px-6 py-3">
                                                        {{ walletAddressSubstr(member.wallet) + "..." }}
                                                    </td>
                                                    <td class="text-xs px-6 py-3">
                                                        {{ member.balance }}
                                                    </td>
                                                    <td class="flex content-center gap-x-2">
                                                        <input name="tokenValue" ref="tokenValue" type="number" placeholder="New Value..." v-model="daoRowBalance[index]" :class="inputBox(tokenValid)"/>
                                                        <button @click.prevent="daoRowChange(member.wallet)" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-aftrBlue">
                                                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                                                            </svg>
                                                        </button>
                                                        <div v-if="daoBalance == 0">
                                                            <label class="pl-4 pt-3 flex flex-col inline-flex block text-sm text-aftrRed">
                                                                You need to mint at least 1 token when creating a vehicle.
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td v-if="member.wallet === $store.getters.getActiveAddress" class="text-center px-6 py-3"></td>
                                                    <td v-else class="text-center px-6">
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
                                    {{ formatNumber(daoBalance, false) }}
                                    {{ printTokens(daoBalance) }}
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
        </div>
    </main>
</template>

<script>
import Arweave from "arweave";
import numeral from "numeral";
import numberAbbreviate from "number-abbreviate";
import { createContractFromTx, interactWrite, readContract } from "smartweave";

// @ts-expect-error
import FormContainer from "./layouts/FormContainer.vue";
// @ts-expect-error
import ActionInput from "./layouts/ActionInput.vue";

import { mapGetters } from "vuex";
import { JWKInterface } from "arweave/web/lib/wallet";

export default {
    components: { FormContainer, ActionInput },
    data() {
        return {
            /** Smartweave variables */
            contractSourceId: import.meta.env.VITE_SMARTWEAVE_CONTRACT_SOURCE_ID,
            tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            mineUrl: import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine",
            arweaveMine: import.meta.env.VITE_MINE,
            /** */

            leasingEnabled: false, // Is vehicle leasing enabled?
            //arConnected: this.$store.getters.arConnected,   // Is user logged in through ArConnect?
            pstSelected: false, // Boolean that shows when a PST is selected
            vehicleTokens: 100000000, // Available tokens in vehicle
            vehicleTokensValid: true,
            //activeWallet: "",                             // Active wallet address on ArConnect
            activeWalletAmount: 0,
            activeWalletAmountValid: false,

            createInProgress: false, // Boolean to toggle wait

            selectedPstId: "", // ID of selected PST
            pstInputTokens: null, // Number of tokens of PST
            vehicleLogo: null, // Logo for vehicle
            lockPeriod: 0, // Period of time that the vehicle must exist
            seats: 0, // Number of seats available on vehicle
            minLease: 2, // Minimum seat lease length in months
            maxLease: 24, // Maximum seat lease length in months
            ownership: "single", // Type of ownership for vehicle (single or dao)
            votingSystem: "equal", // Type of voting for vehicle (equal or weighted)
            inputValid: false, // Boolean to show when any input field is invalid
            pstInputValid: false, // Boolean to show when amount goes over tokens held
            nameValid: false, // Boolean for valid vehicle name
            tokenValid: false,
            tickerValid: false, // Boolean for valid ticker name
            pricePerToken: null, // Selected PST's price
            pstValue: null, // pricePerShare * inputShares
            totalValue: null, // Sum of all PST values in vehicle
            vehiclePsts: [], // Array of vehicle's PSTs
            vehicle: {}, // Created vehicle object
            psts: this.$store.getters.getActiveWallet.psts,
            daoMembers: [], // Array of DAO member wallets (to be added to balances on vehicle creation) and number of tokens
            daoBalance: 0,
            availableTokens: null,
            memberWallet: "", // Wallet address of DAO member being added to vehicle
            memberWalletValid: false,
            memberAmount: null,
            memberAmountValid: false,
            memberRowValid: false,
            daoRowBalance: [],
            fileInfo: "",
            fileInvalid: false,
            communityLogoValue: "",
            totalSize: 0,
            fee: 0,
            address: "",
            balance: "",
            files: [],
            version: "1.0.0",
            quorumIsValid: true,
            supportIsValid: true,
            newQuorum: 0.5,
            newSupport: 0.5,
            fileUpload: false,
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
            const currentPst = this.$store.getters.getActiveWallet.psts.find(
                (item) => item.id === this.selectedPstId
            );
            this.$log.info("CreateVehicle : pstBalance :: ", "currentPst Value", currentPst.fcp, currentPst.balance);
            return this.formatNumber(currentPst.balance);
        },
        pstTicker() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find(
                (item) => item.id === this.selectedPstId
            );
            this.$log.info("CreateVehicle : pstTicker :: ","pstTicker value", currentPst);
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
            if (this.arConnected) {
            //if (this.nameValid && this.tickerValid && this.vehicleTokensValid && this.memberRowValid) {
                return true;
            } else {
                return false;
            }
        },
        fileMessage() {
            if (this.fileInvalid) {
                return "Not a valid image. Please try again."
            } else if (this.totalSize === 0) {
                return "If file size is less than 100kb, upload is free.  Overwise AR fees apply.";
            } else {
                return "File size: " + this.formatNumber(this.totalSize);
            }
        },
        ...mapGetters(["arConnected", "keyFile", "getAftrContractSrcId"]),
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
    watch: {
        arConnected(value) {
            // Update DAO Members with creator address if user is already ArConnected
            if (value) {
                this.daoMembers.push({
                    wallet: this.$store.getters.getActiveAddress,
                    balance: 0,
                });
            } else {
                this.daoMembers = [];
            }
        },
    },
    methods: {
        walletAddressSubstr(addr, chars = 10) {
            if (typeof addr === "string") {
                let len = parseInt(chars / 2);
                return addr.substr(0, len) + "..." + addr.substr(-len);
            } else {
                return "";
            }
        },
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
        pstLogo(id, logo) {
            let logoUrl = "";
            if (logo || logo != "") {
                if(import.meta.env.VITE_ARWEAVE_PORT){
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/"}`;
                } else {
                    logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST}`;
                }
                return logoUrl + logo;
            } else {
                logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + id + ".svg";
                return logoUrl;
            }
        },
        async onFileChange(e) {
            this.fileUpload = true
            const file = e.target.files[0];
            this.files = file;

            if (this.vehicleLogo) {
                // Release the memory of the old file
                URL.revokeObjectURL(this.vehicleLogo);
            }
            this.vehicleLogo = URL.createObjectURL(file);
            this.fileInfo = file.size + ", " + file.name + ", " + file.type;
            const filename = file.name.replace(/ /g, "") + file.lastModified;

            // const { data: winston } = await arweave.api.get(
            //     `price/${file.size}`
            // );
            // const ar = arweave.ar.winstonToAr(winston, {
            //     formatted: true,
            //     decimals: 5,
            //     trim: true,
            // });
            // if (import.meta.env.VITE_ENV === "DEV") {
            //     this.address = await arweave.wallets.jwkToAddress(wallet);
            // } else {
            //     this.address = await arweave.wallets.jwkToAddress("use_wallet");
            // }
            // const bal = await arweave.wallets.getBalance(this.address);
            // this.balance = arweave.ar.winstonToAr(bal);

            // Total size should be < ? so that it's a free transaction
            this.totalSize += file.size;
            this.$log.info("CreateVehicle : onFileChange :: ", "totalSize", this.totalSize, this.balance);

            /**** SHOULD THIS BE > 0? */
            if (this.totalSize != 0) {
                // const { data: winston } = await arweave.api.get(
                //     `price/${this.totalSize}`
                // );
                // this.fee = +winston * 0.1;
                // const ar = arweave.ar.winstonToAr(winston);
                // const arFee = arweave.ar.winstonToAr(this.fee.toString());
                // const total = arweave.ar.winstonToAr(
                //     (+winston + this.fee).toString()
                // );
                // this.$log.info("total", total);
                // this.totalCost = total;
                // if (total > this.balance) {
                //     return alert("You don't have enough AR to upload this file!");
                // }

                //if (import.meta.env.VITE_ENV === "DEV") {
                //    await this.deployFile(this.files, arweave, wallet);
                //} else {
                //    await this.deployFile(this.files, arweave, "use_wallet");
                //}
            }
        },
        nameValidate() {
            if (this.vehicle.name === "") {
                this.nameValid = false;
            } else {
                this.nameValid = true;
            }
        },
        tickerValidate() {
            if (this.vehicle.ticker === "") {
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
            if (
                this.memberWallet === "" ||
                !this.memberWallet ||
                this.memberWallet === this.$store.getters.getActiveAddress ||
                this.memberWallet.length != 43
            ) {
                this.memberWalletValid = false;
            } else {
                this.memberWalletValid = true;
            }
        },
        daoRowChange(wallet) {
            this.tokenValid = true
            const arrayIndex = this.daoMembers.findIndex(
                (item) => item.wallet === wallet
            );
            const oldAmount = this.daoMembers[arrayIndex].balance;
            const newAmount = parseInt(this.daoRowBalance[arrayIndex]);
            const availTokens = this.availableTokens ?? this.vehicleTokens;

            if (availTokens + oldAmount - newAmount < 0) {
                this.memberRowValid = false;
            } else {
                this.memberRowValid = true;
                this.daoMembers[arrayIndex].balance = newAmount;
                this.daoRowBalance[arrayIndex] = "";
                this.sumDaoAmounts();
                this.onTokenChange();
            }
        },
        sumDaoAmounts() {
            let bal = 0;
            let sum = 0;
            for (let dao of this.daoMembers) {
                bal = Number(dao.balance) ?? 0;
                sum += bal;
            }
            this.daoBalance = sum;
        },
        arConnect() {
            this.$store.dispatch("arConnect");
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
            const currentPst = this.$store.getters.getActiveWallet.psts.find(
                (item) => item.id === this.selectedPstId
            );
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
            if (Number(this.pstInputTokens) <= balance && Number(this.pstInputTokens > 0)) {
                this.pstInputValid = true;
            } else {
                this.pstInputValid = false;
            }
        },
        updateVehicleTotal() {
            this.totalValue = this.vehiclePsts.reduce(
                (acc, item) => acc + item.total,
                0
            );
        },
        addPst() {
            // Create temp object and add new keys
            let currentPst = this.$store.getters.getActiveWallet.psts.find(
                (item) => item.id === this.selectedPstId
            );
            let existingIndex = this.vehiclePsts.findIndex(
                (item) => item.id === this.selectedPstId
            );
            if (existingIndex === -1) {
                // Add new PST to vehicle
                currentPst["tokens"] = parseInt(this.pstInputTokens);
                currentPst.total = this.pstValue;
                this.vehiclePsts.push(currentPst);
            } else {
                // Updated existing PST in vehicle
                this.vehiclePsts[existingIndex]["tokens"] += parseInt(
                    this.pstInputTokens
                );
                this.vehiclePsts[existingIndex]["total"] += this.pstValue;
            }
            // Subtract tokens from wallet pst
            existingIndex = this.$store.getters.getActiveWallet.psts.findIndex(
                (item) => item.id === this.selectedPstId
            );

            const newBal =
                this.$store.getters.getActiveWallet.psts[existingIndex][
                    "balance"
                ] - parseInt(this.pstInputTokens);
            this.$store.commit("updateWalletPstBalance", {
                index: existingIndex,
                balance: newBal,
            });
            this.updatePstInputValid(newBal);

            /*** TODO:  SAVE WALLET UPDATES ON CREATE VEHICLE */

            // Recalc the price
            this.updateVehicleTotal();
        },
        removePst(id) {
            const deleteIndex = this.vehiclePsts.findIndex(
                (item) => item.id === id
            );
            const idTokens = this.vehiclePsts[deleteIndex].tokens;
            const existingIndex =
                this.$store.getters.getActiveWallet.psts.findIndex(
                    (item) => item.id === id
                );
            const newBal =
                this.$store.getters.getActiveWallet.psts[existingIndex]
                    .balance + idTokens;
            this.$store.commit("updateWalletPstBalance", {
                index: existingIndex,
                balance: newBal,
            });
            this.vehiclePsts.splice(deleteIndex, 1);
            this.updateVehicleTotal();
        },
        addDaoMember() {
            const member = {};
            const foundWallet = this.daoMembers.find( x => x.wallet === this.memberWallet);

            if (foundWallet) {
                foundWallet.balance += parseInt(this.memberAmount);
            } else {
                member.wallet = this.memberWallet;
                member.balance = parseInt(this.memberAmount);
                this.daoMembers.push(member);
            }
            this.sumDaoAmounts();
            this.memberWallet = "";
            this.memberAmount = null;
            this.onTokenChange();
        },
        removeDaoMember(id) {
            const arrayIndex = this.daoMembers.findIndex((item) => item === id);
            this.memberAmount = null;
            this.daoMembers.splice(arrayIndex, 1);
            this.sumDaoAmounts();
        },
        readFile(file) {
            // Thanks to https://dilshankelsen.com/convert-file-to-byte-array/
            return new Promise((resolve, reject) => {
                // Create file reader
                let reader = new FileReader();

                // Register event listeners
                reader.addEventListener("loadend", e => resolve(e.target.result));
                reader.addEventListener("error", reject);

                // Read file
                reader.readAsArrayBuffer(file);
            });
        },
        async getAsByteArray(file) {
            return new Uint8Array(await this.readFile(file));
        },
        async deployFile(file, arweave, wallet) {

            const tx = await arweave.createTransaction({
                data: await this.getAsByteArray(file)
            }, wallet);

            tx.addTag("Content-Type", file.type);
            //tx.addTag("User-Agent", `AFTR.Market/this.version`);
            tx.addTag("User-Agent", "AFTR.Market")

            await arweave.transactions.sign(tx, wallet);
            await arweave.transactions.post(tx);
            this.communityLogoValue = tx.id;
            this.$log.info("CreateVehicle : deployFile :: ","communityLogoValue", this.communityLogoValue);
            this.$log.info("CreateVehicle : deployFile :: ", "txid", tx.id);
        },
        async createVehicle() {
            if (!this.nameValid) {
                this.$refs.vehicleName.focus();
                return false;
            }
            if (!this.tickerValid) {
                this.$refs.vehicleTicker.focus();
                return false;
            }

            if (!this.tokenValid) {
                this.$refs.tokenValue.focus();
                return false;
            }

            this.$swal({
                icon: "info",
                html: "Please wait while your new vehicle is being created...",
                showConfirmButton: false,
                allowOutsideClick: false,
            });

            /***** NEED TO MAKE SURE THAT NONE OF THESE ARE NULL */
            this.vehicle.settings = [
                ["quorum", this.newQuorum],
                ["support", this.newSupport],
                ["voteLength", 2160],
                ["communityDescription", this.vehicle.desc],
                ["communityLogo", this.communityLogoValue],
            ];
            /*************** */

            let arweave = {};
            try {
                arweave = await Arweave.init({
                    host: this.arweaveHost,
                    port: this.arweavePort,
                    protocol: this.arweaveProtocol,
                    timeout: 20000,
                    logging: true,
                });
            } catch (error) {
                this.$log.error("CreateVehicle : createVehicle ::", "ERROR connecting to Arweave: " + error); // How can this ever happen? :)
                this.$swal.fire({
                    icon: "error",
                    html: "An error occurred when trying to connect to Arweave.  You can try again and/or let us know that you're having trouble.",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                }).then((result) => {
                    this.$router.push("vehicles");
                });
            }

            let initTags = [{ name: "Protocol", value: this.tagProtocol }];
            if (import.meta.env.VITE_ENV !== "PROD") {
                initTags.push({ name: "Aftr-Playground", value: this.vehicle.ticker});
            }
            this.vehicle.creator = this.$store.getters.getActiveAddress;
            //this.vehicle.seats = this.seats;  /*** NO LONGER USED */
            this.vehicle.lockPeriod = this.lockPeriod;
            //this.vehicle.minLease = this.minLease;
            //this.vehicle.maxLease = this.maxLease;
            //this.vehicle.logo = this.vehicleLogo;
            //this.vehicle.logo = "9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg";      // TEMP LOGO
            this.vehicle.ownership = this.ownership;
            this.vehicle.votingSystem = this.votingSystem;
            this.vehicle.status = "started";
            this.vehicle.vault = {};
            this.vehicle.votes = [];
            this.vehicle.tipsAr = 0;
            this.vehicle.tipsMisc = 0;
            this.vehicle.treasury = 0;
            this.vehicle.invocations = [];
            this.vehicle.foreignCalls = [];

            // Default Settings
            /*** TODO: ADD LOGO (communityLogo) to settings when implemented */
            let use_wallet;
            if (import.meta.env.VITE_ENV === "DEV") {
                if (this.keyFile.length) {
                    use_wallet = JSON.parse(this.keyFile);
                } else {
                    this.$swal({
                        icon: 'warning',
                        html: "Please attach your keyfile",
                    })
                    return false;
                }
            }
            if (this.fileUpload){
                this.$swal({
                    icon: "info",
                    html: "Uploading logo...",
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                if (import.meta.env.VITE_ENV === "DEV") {
                    await this.deployFile(this.files, arweave, use_wallet);
                } else {
                    await this.deployFile(this.files, arweave, "use_wallet");
                }

                if(Boolean(this.arweaveMine)){                        
                    this.$log.info("CreateVehicle : createVehicle :: ", "mineUrl ", this.mineUrl);    
                    await fetch(this.mineUrl);
                }
            }

            // Convert DAO Member array to dictionary
            this.vehicle.balances = this.daoMembers.reduce( (a, x) => ({ ...a, [x.wallet]: x.balance }), {} );

            const tmpPsts = this.vehiclePsts.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    ticker: item.ticker,
                    logo: item.logo,
                    tokens: item.tokens,
                };
            });

            this.vehicle.tokens = [];
            let obj = this.vehicle.balances;

            if (this.vehicle.ownership == "dao") {
                this.$log.info("CreateVehicle : createVehicle :: ", "this.vehicle.ownership--length", Object.keys(obj).length, Object.keys(obj).length < 2);
                if (Object.keys(obj).length < 2) {
                    this.$swal.fire({
                        icon: 'warning',
                        html: "A DAO Owned vehicle requires that there are at least 2 members assigned to the vehicle.  Either change the vehicle ownership to a single owner or add another member.",
                        allowOutsideClick: false,
                    }).then((result) => { return });
                }
            }

            /*** I think this is an old error checking routine. */
            // for (var key in obj) {
            //     console.log("KEY: " + key + ": " + obj[key]);
            //     if (obj[key] == 0) {
            //         // alert("Please add tokens");
            //         this.$swal({
            //             icon: 'warning',
            //             html: "Please add tokens",
            //         })
            //         //this.$router.push("vehicles");
            //         throw new Error("Please add tokens");
            //     }
            // }

            // Create SmartWeave contract
            try {
                this.$log.info("CreateVehicle : createVehicle :: ", "vehicle: " + JSON.stringify(this.vehicle));
                this.$log.info("CreateVehicle : createVehicle :: ", "tags: " + JSON.stringify(initTags));

                if (import.meta.env.VITE_ENV === "DEV") {
                    this.vehicle["id"] = await createContractFromTx(arweave, use_wallet, this.getAftrContractSrcId, JSON.stringify(this.vehicle), initTags);  
                } else {
                    this.vehicle["id"] = await createContractFromTx(arweave, "use_wallet", this.getAftrContractSrcId, JSON.stringify(this.vehicle), initTags);
                }
                this.$log.info("CreateVehicle : createVehicle :: ", "ID = " + this.vehicle["id"]);

                if(Boolean(this.arweaveMine)){
                    await fetch(this.mineUrl);
                }

                this.$swal.fire({
                    icon: "success",
                    html: "Your vehicle, " + this.vehicle.name + ", was successfully created!  You can add assets when you're ready.",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                }).then((result) => {
                    console.log("ID: " + this.vehicle.id);
                    this.$router.push({
                        name: "vehicle",
                        params: { vehicleId: this.vehicle.id },
                    });
                });
            } catch (error) {
                this.$log.error("CreateVehicle : createVehicle :: ", "ERROR creating SmartWeave contract: " + error);
                this.$swal.fire({
                    icon: 'error',
                    html: "An error occurred during the creation of your vehicle.  You can try again and/or let us know.",
                    allowOutsideClick: false,
                }).then((result) => { return });
            }

/*** Removing token deposits from Vehicle Creation for now. */
/*** This can be risky if something fails. */
/*** Token deposits will be handled on the tokens tab in the vehicle. */
            // let transferInput = {};
            // try {
            //     // Loop through vehicle PSTs and perform transfers
            //     for (const pst of this.vehiclePsts) {
            //         transferInput = {
            //             function: "transfer",
            //             target: this.vehicle.id,
            //             qty: pst.tokens, // PST qty
            //         };
            //         if (import.meta.env.VITE_ENV === "DEV") {
            //             let wallet = JSON.parse(this.keyFile);
            //             let txID = await interactWrite(arweave, wallet, pst.id, transferInput);
            //             this.$log.info("CreateVehicle : createVehicle :: ", "Transfer token = " + JSON.stringify(txID));
            //             if(Boolean(this.arweaveMine)){
            //                 await fetch(this.mineUrl);
            //             }

            //             const inputDeposit = {
            //                 function: "deposit",
            //                 tokenId: pst.id,
            //                 txID: txID,
            //             };

            //             txID = await interactWrite(arweave, wallet, this.vehicle.id, inputDeposit);
            //             this.$log.info("CreateVehicle : createVehicle :: ", txID);
                        
            //             // if(Boolean(this.arweaveMine)){
            //             //     await fetch(this.mineUrl);
            //             // }

            //         } else {
            //             let txID = await interactWrite(arweave, "use_wallet", pst.id, transferInput);
            //             this.$log.info("CreateVehicle : createVehicle :: ", "Transfer tokens = " + JSON.stringify(txID));

            //             const inputDeposit = {
            //                 function: "deposit",
            //                 tokenId: pst.id,
            //                 txID: txID,
            //             };

            //             txID = await interactWrite(arweave, "use_wallet", this.vehicle.id, inputDeposit);
            //             this.$log.info("CreateVehicle : createVehicle :: ", txID);
            //         }

            //         this.$log.info("CreateVehicle : createVehicle :: ", "TokenId: " + pst.id + " Name: " + pst.name + " Qty: " + pst.tokens);
            //         if(Boolean(this.arweaveMine)){
            //             await fetch(this.mineUrl);
            //         }
            //     }
            // } catch (error) {
            //     this.$log.error("CreateVehicle : createVehicle :: ", "ERROR transferring tokens: " + error);
            //     return false;
            // }
        },
        cancelCreate() {
            this.$router.push("vehicles");
        },
    },
    created() {
        // Update DAO Members with creator address if user is already ArConnected
        if (this.$store.getters.arConnected) {
            this.daoMembers.push({
                wallet: this.$store.getters.getActiveAddress,
                balance: 0,
            });
        }
    },
};
</script>
