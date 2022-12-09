<template>
    <main class="-mt-32 pb-10">
        <vote-simulator v-if="showVoteSimulator" @close="closeModal"></vote-simulator>
        <div class="max-w-7xl mx-auto pb-2 px-4 sm:px-6 lg:px-8">
            <!--<div class="md:grid md:grid-cols-3 md:gap-6">-->
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div
                    class="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div class="px-4 sm:px-0">
                        <h3 class="text-xl font-medium leading-6 text-white">
                            Create Your Repo
                        </h3>
                        <p class="mt-1 pb-4 text-sm text-aftrYellow">
                            You can edit this information later
                        </p>
                    </div>
                    <div class="relative pb-4">
                        <img v-if="repoLogo" class="h-16 w-16 rounded-full" :src="repoLogo" alt="" />
                        <img v-else class="h-16 w-16 rounded-full" src="../assets/logo-placeholder.png" alt="" />
                        <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <!-- Repo Info -->
            <form-container>
                <form action="#" method="POST">
                    <h3 class="text-xl font-light leading-6">Repo Information</h3>
                    <div class="bg-white sm:p-6">
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <label for="repoName" class="block text-sm font-medium text-gray-700">Repo
                                Name</label>
                            <label for="repoTicker" class="block text-sm font-medium text-gray-700">Ticker</label>
                        </div>
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <input type="text" name="repoName" v-model="repo.name" ref="repoName" @input="nameValidate"
                                :class="inputBox(nameValid)" />
                            <input type="text" name="repoTicker" v-model="repo.ticker" ref="repoTicker"
                                @input="tickerValidate" :class="inputBox(tickerValid)" />
                        </div>
                        <div class="pt-2 grid grid-cols-3 gap-4">
                            <div class="col-span-2">
                                <label for="repoDesc"
                                    class="pt-2 block text-sm font-medium text-gray-700">Description</label>
                                <div class="mt-1">
                                    <textarea id="repoDesc" name="repoDesc" v-model="repo.desc" rows="3"
                                        class="shadow-sm focus:ring-aftrBlue focus:border-aftrBlue mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Describe your fund"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="repoLogo" class="py-2 block text-sm font-medium text-gray-700">Logo</label>
                            <div class="mt-2 sm:mt-0 sm:col-span-2 pl-6">
                                <div class="flex text-sm text-gray-600">
                                    <label for="repoLogo"
                                        class="relative cursor-pointer bg-white rounded-md font-medium text-aftrBlue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input @change="onFileChange" id="repoLogo" name="repoLogo" type="file"
                                            accept="image/png, image/gif, image/jpeg" class="sr-only" />
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
                                <label for="seats" class="block text-sm font-medium text-gray-700">Number of Seats
                                    Available</label>
                                <div class="flex justify-start items-center">
                                    <input type="number" v-model="seats"
                                        class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">~<span
                                            class="text-lg text-aftrBlue">{{ displaySeats }}</span> seats will be
                                        created</label>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label for="seats" class="block text-sm font-medium text-gray-700">Repo Lock
                                    Period</label>
                                <div class="flex justify-start items-center">
                                    <input type="number" v-model="lockPeriod" @change="lockChange"
                                        class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">Months (~<span
                                            class="text-lg text-aftrBlue">{{ monthsInBlocks(lockPeriod) }}</span>
                                        Blocks)</label>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label for="seats" class="block text-sm font-medium text-gray-700">Price per
                                    Seat</label>
                                <div class="flex justify-start items-center">
                                    <input type="number" v-model="repo.seatPrice"
                                        class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">AR</label>
                                </div>
                            </div>
                            <div class="pt-2">
                                <label for="leaseLength" class="block text-sm font-medium text-gray-700">Lease
                                    Length</label>
                                <div class="flex justify-start items-center space-x-4">
                                    <input type="number" placeholder="Min" v-model="minLease"
                                        class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <input type="number" placeholder="Max" v-model="maxLease"
                                        class="mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    <label class="pl-4 block text-sm text-gray-700">
                                        Months (~<span class="text-lg text-aftrBlue">{{ monthsInBlocks(minLease)
                                        }}</span> to <span class="text-lg text-aftrBlue">{{ monthsInBlocks(maxLease)
                                            }}</span> Blocks)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">Settings</h3>
                        <span class="text-sm text-gray-500">Use the <button style="color:#6C8CFF"
                                @click.prevent="voteSimulatorTest" type="submit" :repo="repo"> Vote Simulator
                            </button> to understand how your vote settings can impact votes in your repo.</span>
                    </div>
                    <div class="bg-white sm:p-6">
                        <div class="pt-2 grid grid-cols-4 flex items-center gap-x-4">
                            <!--<label class="block text-sm font-medium text-gray-700">Repo Tokens to Mint</label>-->
                            <label class="block text-sm font-medium text-gray-700">Repo Ownership</label>
                            <label class="block text-sm font-medium text-gray-700">Voting System</label>
                            <label class="block text-sm font-medium text-gray-700">Quorum (between 0.01 - 0.99)</label>
                            <label class="block text-sm font-medium text-gray-700">Support(between 0.01 - 0.99)</label>

                            <!--<input type="number" name="repoTokens" placeholder="# of Repo Tokens" v-model="repoTokens" @input="onTokenChange" :class="inputBox(repoTokensValid)" />-->
                            <div class="">
                                <input type="radio" v-model="ownership" id="single" value="single"
                                    class="form-radio text-aftrBlue" /><label class="px-2 text-sm text-gray-700">Single
                                    Owner</label>
                                <input type="radio" v-model="ownership" id="multi" value="multi"
                                    class="form-radio text-aftrBlue" /><label
                                    class="px-2 text-sm text-gray-700">Multiple Owners</label>
                            </div>
                            <div class="">
                                <input type="radio" v-model="votingSystem" id="weighted" value="weighted"
                                    class="form-radio text-aftrBlue" /><label
                                    class="px-2 text-sm text-gray-700">Weighted</label>
                                <input type="radio" v-model="votingSystem" id="equal" value="equal"
                                    class="form-radio text-aftrBlue" /><label
                                    class="px-2 text-sm text-gray-700">Distributed Evenly</label>
                            </div>
                            <div class="">
                                <input v-model="newQuorum" name="newQuorum" type="number"
                                    :class="inputBox(quorumIsValid)" />
                            </div>
                            <div class="">
                                <input v-model="newSupport" name="newSupport" type="number"
                                    :class="inputBox(supportIsValid)" />
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
                                Owner:
                                <span class="font-bold text-aftrBlue">{{ walletAddressSubstr($store.getters.getActiveAddress) }}</span>
                            </label>
                        </div>
                        <div v-else class="pt-6 flex justify-start items-center">
                            <button @click="arConnect" type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aftrBlue hover:bg-aftrBlue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Login to ArConnect
                            </button>
                            <label class="pl-4 block text-sm text-gray-700">
                                You must provide a wallet in order to create a repo
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
                                    <span class="font-bold text-aftrBlue">{{ pstBalance }} {{ pstTicker }}</span><span> available to use in your repo.</span>
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
                        <div v-if="repoPsts.length > 0" class="pt-1">
                            <div class="pt-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Profit Sharing Token ({{ repoPsts.length }})
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
                                                <tr v-for="pst in repoPsts" :key="pst.id" class="hover:bg-gray-50">
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
                    <!-- Members -->
                    <h3 class="mt-4 border-t border-gray-200 pt-4 text-xl font-light leading-6">
                        Members
                    </h3>
                    <!-- Members -->
                    <div class="bg-white sm:p-4">
                        <div class="flex items-stretch">
                            <div class="mt-6 flow-root">
                                <input type="text" v-model="memberWallet" placeholder="Wallet Address"
                                    @input="onTokenChange" :class="inputBox(memberWalletValid)" class="w-96" />
                            </div>
                            <div class="mt-6 pl-4 flex flex-col inline-flex">
                                <input type="number" placeholder="Voting Power" v-model="memberAmount"
                                    @input="onTokenChange" :class="inputBox(memberAmountValid)" />
                            </div>
                            <div class="mt-6 pl-4 flex flex-col inline-flex">
                                <div v-if="!memberAmountValid">
                                    <label class="pl-4 flex flex-col inline-flex block text-sm text-aftrRed">
                                        The Owner is assumed be a member.
                                        <br />
                                        Be Sure to update voting power balance below.
                                    </label>
                                </div>
                                <button v-if="memberWalletValid && memberAmountValid" @click.prevent="addDaoMember"
                                    type="button"
                                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                    <span class="pl-2">Add Member</span>
                                </button>
                            </div>
                        </div>
                        <!-- Table of Members -->
                        <div v-if="daoMembers.length" class="pt-1">
                            <div class="pt-2 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Members ({{ daoMembers.length }})
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Current Voting Power
                                                    </th>
                                                    <th scope="col"
                                                        class="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Update Voting Power
                                                    </th>
                                                    <th scope="col" class="px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="(member, index) in daoMembers" :key="index"
                                                    class="hover:bg-gray-50">
                                                    <td class="text-xs px-6 py-3">
                                                        {{ walletAddressSubstr(member.wallet) }}
                                                    </td>
                                                    <td class="text-xs px-6 py-3">
                                                        {{ member.balance }}
                                                    </td>
                                                    <td class="flex content-center gap-x-2">
                                                        <input name="tokenValue" ref="tokenValue" type="number"
                                                            placeholder="New Value..." v-model="daoRowBalance[index]"
                                                            :class="inputBox(tokenValid)" />
                                                        <button @click.prevent="daoRowChange(member.wallet)"
                                                            type="submit"
                                                            class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-aftrBlue">
                                                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                                                                </path>
                                                                <path fill-rule="evenodd"
                                                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                                    clip-rule="evenodd"></path>
                                                            </svg>
                                                        </button>
                                                        <div v-if="daoBalance == 0">
                                                            <label
                                                                class="pl-4 pt-3 flex flex-col inline-flex block text-sm text-aftrRed">
                                                                You need to assign a voting power of at least 1 when
                                                                creating a repo.
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td v-if="member.wallet === $store.getters.getActiveAddress"
                                                        class="text-center px-6 py-3"></td>
                                                    <td v-else class="text-center px-6">
                                                        <button @click.prevent="removeDaoMember(member)" type="submit"
                                                            class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
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
                    <!-- End of Table -->
                    <div class="pl-6 pb-4 text-right">
                        <div class="text-right">
                            <span v-if="daoBalance" class="px-6 py-3">
                                Voting Power Balance:
                                <span
                                    class="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {{ formatNumber(daoBalance, false) }}
                                    {{ printTokens(daoBalance) }}
                                </span>
                            </span>
                        </div>
                    </div>
                    <!-- End -->

                    <!-- Button Row --->
                    <div class="px-4 py-3 bg-gray-50 sm:px-6 flex items-center justify-between">
                        <button type="submit" @click.prevent="cancelCreate"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrRed bg-white hover:bg-aftrRed hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="pl-2">Cancel</span>
                        </button>
                        <button v-if="isInputValid" type="submit" @click.prevent="createRepo"
                            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrBlue">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z">
                                </path>
                                <path
                                    d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z">
                                </path>
                            </svg>
                            <span class="pl-2">Create Repo</span>
                        </button>
                    </div>
                    <!--- End Button Row --->
                </form>
            </form-container>
            <!-- End Repo Info -->
        </div>
    </main>
</template>

<script>
import Arweave from "arweave";
import numeral from "numeral";
import numberAbbreviate from "number-abbreviate";
// import { createContractFromTx, interactWrite } from "smartweave";
import VoteSimulator from "./repo/VoteSimulator.vue";

// @ts-expect-error
import FormContainer from "./layouts/FormContainer.vue";
// @ts-expect-error
import ActionInput from "./layouts/ActionInput.vue";

import { mapGetters } from "vuex";
import { JWKInterface } from "arweave/web/lib/wallet";
import { warpCreateFromTx, upload, dispatch, post } from "./utils/warpUtils.js";
// import Aftr from "aftr-market";

// const client = new Aftr();

export default {
    components: { FormContainer, ActionInput, VoteSimulator },
    data() {
        return {
            /** Smartweave variables */
            tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
            arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
            arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
            arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
            mineUrl: import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/mine",
            arweaveMine: import.meta.env.VITE_MINE,
            /** */

            leasingEnabled: false, // Is repo leasing enabled?
            //arConnected: this.$store.getters.arConnected,   // Is user logged in through ArConnect?
            pstSelected: false, // Boolean that shows when a PST is selected
            repoTokens: 100000000, // Available tokens in repo
            repoTokensValid: true,
            //activeWallet: "",                             // Active wallet address on ArConnect
            activeWalletAmount: 0,
            activeWalletAmountValid: false,

            createInProgress: false, // Boolean to toggle wait

            selectedPstId: "", // ID of selected PST
            pstInputTokens: null, // Number of tokens of PST
            repoLogo: null, // Logo for repo
            lockPeriod: 0, // Period of time that the repo must exist
            seats: 0, // Number of seats available on repo
            minLease: 2, // Minimum seat lease length in months
            maxLease: 24, // Maximum seat lease length in months
            ownership: "single", // Type of ownership for repo (single or multi)
            votingSystem: "weighted", // Type of voting for repo (equal or weighted)
            inputValid: false, // Boolean to show when any input field is invalid
            pstInputValid: false, // Boolean to show when amount goes over tokens held
            nameValid: false, // Boolean for valid repo name
            tokenValid: false,
            tickerValid: false, // Boolean for valid ticker name
            pricePerToken: null, // Selected PST's price
            pstValue: null, // pricePerShare * inputShares
            totalValue: null, // Sum of all PST values in repo
            repoPsts: [], // Array of repo's PSTs
            repo: {}, // Created repo object
            psts: this.$store.getters.getActiveWallet.psts,
            daoMembers: [], // Array of members' wallets (to be added to balances on repo creation) and number of tokens
            daoBalance: 0,
            availableTokens: null,
            memberWallet: "", // Wallet address of member being added to repo
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
            showVoteSimulator: false,
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
                (item) => item.contractId === this.selectedPstId
            );
            this.$log.info("CreateRepo : pstBalance :: ", "currentPst Value", currentPst.fcp, currentPst.balance);
            return this.formatNumber(currentPst.balance);
        },
        pstTicker() {
            const currentPst = this.$store.getters.getActiveWallet.psts.find(
                (item) => item.contractId === this.selectedPstId
            );
            this.$log.info("CreateRepo : pstTicker :: ", "pstTicker value", currentPst);
            return currentPst.ticker;
        },
        repoTokenBox() {
            if (this.repoTokensValid) {
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
                //if (this.nameValid && this.tickerValid && this.repoTokensValid && this.memberRowValid) {
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
        ...mapGetters(["arConnected", "getAftrContractSources"]),
        // Code to handle a checkbox in the table to check/uncheck all rows.
        /******
      selectAll: {
          get(){
              return this.repoPsts ? this.checkedPsts.length == this.repoPsts.length : false;
          },
          set(value) {
              let selected = [];

              if (value) {
                  this.repoPsts.forEach(repoPst => selected.push(repoPst.id));
              }
              this.checkedPsts = selected;
          }
      }
      ******/
    },
    watch: {
        arConnected(value) {
            // Update Members with owner address if user is already ArConnected
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
        voteSimulatorTest() {
            this.showVoteSimulator = true;
        },
        closeModal() {
            this.showVoteSimulator = false;
        },
        walletAddressSubstr(addr, chars = 10) {
            if (typeof addr === 'string') {
                let len = parseInt(chars / 2);
                return addr.substring(0, len) + '...' + addr.substring(addr.length - len);
            } else {
                return '';
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
                return "";
            } else {
                return "";
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
                if (import.meta.env.VITE_ARWEAVE_PORT) {
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

            if (this.repoLogo) {
                // Release the memory of the old file
                URL.revokeObjectURL(this.repoLogo);
            }
            this.repoLogo = URL.createObjectURL(file);
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
            this.totalSize = file.size;
            this.$log.info("CreateRepo : onFileChange :: ", "totalSize", this.totalSize, this.balance);

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
            if (this.repo.name === "") {
                this.nameValid = false;
            } else {
                this.nameValid = true;
            }
        },
        tickerValidate() {
            if (this.repo.ticker === "") {
                this.tickerValid = false;
            } else {
                this.tickerValid = true;
            }
        },
        onTokenChange() {
            // Evaluate flags and calculate any changes to these values because they all work together
            const tokens = Number(this.repoTokens) ?? 0;
            const dBal = Number(this.daoBalance) ?? 0;
            const mAmount = Number(this.memberAmount) ?? 0;

            this.availableTokens = this.repoTokens - dBal - mAmount;

            // Evaluate flags
            if (tokens == 0) {
                this.repoTokensValid = false;
            } else {
                this.repoTokensValid = true;
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
            const availTokens = this.availableTokens ?? this.repoTokens;

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
                (item) => item.contractId === this.selectedPstId
            );
            this.pricePerToken = currentPst.price;
            this.pstValue = currentPst.price * this.pstInputTokens;
            this.updatePstInputValid(currentPst.balance);
        },
        // updateAvailableTokens() {
        //     if (this.daoBalance && this.activeWalletAmount) {
        //         this.availableTokens = this.repoTokens - this.daoBalance - this.activeWalletAmount;
        //     } else if (this.daoBalance) {
        //         this.availableTokens = this.repoTokens - this.daoBalance;
        //     } else {
        //         this.availableTokens = this.repoTokens;
        //     }
        // },
        updatePstInputValid(balance) {
            if (Number(this.pstInputTokens) <= balance && Number(this.pstInputTokens > 0)) {
                this.pstInputValid = true;
            } else {
                this.pstInputValid = false;
            }
        },
        updateRepoTotal() {
            this.totalValue = this.repoPsts.reduce(
                (acc, item) => acc + item.total,
                0
            );
        },
        addPst() {
            // Create temp object and add new keys
            let currentPst = this.$store.getters.getActiveWallet.psts.find(
                (item) => item.contractId === this.selectedPstId
            );
            let existingIndex = this.repoPsts.findIndex(
                (item) => item.id === this.selectedPstId
            );
            if (existingIndex === -1) {
                // Add new PST to repo
                currentPst["tokens"] = parseInt(this.pstInputTokens);
                currentPst.total = this.pstValue;
                this.repoPsts.push(currentPst);
            } else {
                // Updated existing PST in repo
                this.repoPsts[existingIndex]["tokens"] += parseInt(
                    this.pstInputTokens
                );
                this.repoPsts[existingIndex]["total"] += this.pstValue;
            }
            // Subtract tokens from wallet pst
            existingIndex = this.$store.getters.getActiveWallet.psts.findIndex(
                (item) => item.contractId === this.selectedPstId
            );

            const newBal = this.$store.getters.getActiveWallet.psts[existingIndex]["balance"] - parseInt(this.pstInputTokens);
            this.$store.commit("updateWalletPstBalance", {
                index: existingIndex,
                balance: newBal,
            });
            this.updatePstInputValid(newBal);

            /*** TODO:  SAVE WALLET UPDATES ON CREATE REPO */

            // Recalc the price
            this.updateRepoTotal();
        },
        removePst(id) {
            const deleteIndex = this.repoPsts.findIndex(
                (item) => item.id === id
            );
            const idTokens = this.repoPsts[deleteIndex].tokens;
            const existingIndex =
                this.$store.getters.getActiveWallet.psts.findIndex(
                    (item) => item.contractId === id
                );
            const newBal = this.$store.getters.getActiveWallet.psts[existingIndex].balance + idTokens;
            this.$store.commit("updateWalletPstBalance", {
                index: existingIndex,
                balance: newBal,
            });
            this.repoPsts.splice(deleteIndex, 1);
            this.updateRepoTotal();
        },
        addDaoMember() {
            const member = {};
            const foundWallet = this.daoMembers.find(x => x.wallet === this.memberWallet);

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
        // async deployFile(file, arweave, wallet) {

        //     const tx = await arweave.createTransaction({
        //         data: await this.getAsByteArray(file)
        //     }, wallet);

        //     tx.addTag("Content-Type", file.type);
        //     //tx.addTag("User-Agent", `AFTR.Market/this.version`);
        //     tx.addTag("User-Agent", "AFTR.Market")

        //     await arweave.transactions.sign(tx, wallet);
        //     await arweave.transactions.post(tx);
        //     this.communityLogoValue = tx.id;
        //     this.$log.info("CreateRepo : deployFile :: ","communityLogoValue", this.communityLogoValue);
        //     this.$log.info("CreateRepo : deployFile :: ", "txid", tx.id);
        // },

        async deployFile(file, arweave, wallet) {
            return await upload(file)
                .then((tx) => {
                    this.communityLogoValue = tx.assetId;
                    dispatch(tx)
                })
                .then((data) => {
                    post(data)
                })
        },

        async createRepo() {
            if (!this.nameValid) {
                this.$refs.repoName.focus();
                return false;
            }
            if (!this.tickerValid) {
                this.$refs.repoTicker.focus();
                return false;
            }

            if (!this.tokenValid) {
                //this.$refs.tokenValue.focus();
                return false;
            }
            this.$swal({
                icon: "info",
                html: "Please wait while your new repo is being created...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.$swal.showLoading()
                },
            });
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
                this.$log.error("CreateRepo : createRepo ::", "ERROR connecting to Arweave: " + error); // How can this ever happen? :)
                this.$swal.fire({
                    icon: "error",
                    html: "An error occurred when trying to connect to Arweave.  You can try again and/or let us know that you're having trouble.",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                }).then((result) => {
                    this.$router.push("repos");
                });
            }

            let initTags = [{ name: "Protocol", value: this.tagProtocol }];
            if (import.meta.env.VITE_ENV !== "PROD") {
                initTags.push({ name: "Aftr-Playground", value: this.repo.ticker });
            }
            this.repo.owner = this.$store.getters.getActiveAddress;
            //this.repo.seats = this.seats;  /*** NO LONGER USED */
            this.repo.lockPeriod = this.lockPeriod;
            //this.repo.minLease = this.minLease;
            //this.repo.maxLease = this.maxLease;
            //this.repo.logo = this.repoLogo;
            //this.repo.logo = "9CYPS85KChE_zQxNLi2y5r2FLG-YE6HiphYYTlgtrtg";      // TEMP LOGO
            this.repo.ownership = this.ownership;
            this.repo.votingSystem = this.votingSystem;
            this.repo.status = "started";
            this.repo.vault = {};
            this.repo.votes = [];
            this.repo.claimable = [];
            this.repo.claims = [];
            this.repo.evolve = "";

            // Default Settings
            /*** TODO: ADD LOGO (communityLogo) to settings when implemented */
            const use_wallet = "use_wallet";
            if (this.fileUpload) {
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

                if (Boolean(this.arweaveMine)) {
                    this.$log.info("CreateRepo : createRepo :: ", "mineUrl ", this.mineUrl);
                    await fetch(this.mineUrl);
                }
            }

            /***** NEED TO MAKE SURE THAT NONE OF THESE ARE MISSING */
            this.repo.settings = [
                ["quorum", this.newQuorum],
                ["support", this.newSupport],
                ["voteLength", 2160],
                ["communityDescription", this.repo.desc],
                ["communityLogo", this.communityLogoValue]
            ];
            /*************** */

            // Convert Member array to dictionary
            this.repo.balances = this.daoMembers.reduce((a, x) => ({ ...a, [x.wallet]: x.balance }), {});

            /**** REMOVED ADDING TOKENS FROM CREATE REPO PAGE */
            // const tmpPsts = this.repoPsts.map((item) => {
            //     return {
            //         id: item.id,
            //         name: item.name,
            //         ticker: item.ticker,
            //         logo: item.logo,
            //         tokens: item.tokens,
            //     };
            // });

            this.repo.tokens = [];
            let obj = this.repo.balances;

            if (this.repo.ownership == "multi") {
                this.$log.info("CreateRepo : createRepo :: ", "this.repo.ownership--length", Object.keys(obj).length, Object.keys(obj).length < 2);
                if (Object.keys(obj).length < 2) {
                    this.$swal.fire({
                        icon: 'warning',
                        html: "A Multi-owned repo requires that there are at least 2 members assigned to the repo.  Either change the repo ownership to a single owner or add another member.",
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
            //         //this.$router.push("repos");
            //         throw new Error("Please add tokens");
            //     }
            // }

            // Create SmartWeave contract

            const tags = [{ name: "Title", value: this.repo.name }];
            const csArray = this.getAftrContractSources;
            const latestAftrSourceId = csArray[csArray.length - 1];
            const txIds = await warpCreateFromTx(JSON.stringify(this.repo), latestAftrSourceId, tags, true);
            this.repo["id"] = txIds.contractTxId;

            try {
                this.$log.info("CreateRepo : createRepo :: ", "repo: " + JSON.stringify(this.repo));

                if (import.meta.env.VITE_ENV === "DEV" || import.meta.env.VITE_BUILD_PSTS) {
                    // Add to Wallet PSTs if the Verto Cache is not being used
                    let pst = {
                        contractId: this.repo["id"],
                        balance: this.repo.balances[this.repo.owner],
                        name: this.repo.name,
                        ticker: this.repo.ticker,
                        //logo: this.communityLogoValue,
                        //fcp: true
                    };
                    this.$store.commit("addWalletPst", pst);
                }

                this.$log.info("CreateRepo : createRepo :: ", "ID = " + this.repo["id"]);
                // if(Boolean(this.arweaveMine)){
                //     await fetch(this.mineUrl);
                // }

                this.$swal.fire({
                    icon: "success",
                    html: "Your repo, " + this.repo.name + ", was successfully created!  You can add assets when you're ready.",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                }).then((result) => {
                    console.log("ID: " + this.repo.id);
                    this.$router.push({
                        name: "repo",
                        params: { repoId: this.repo.id },
                    });
                });
            } catch (error) {
                this.$log.error("CreateRepo : createRepo :: ", "ERROR creating SmartWeave contract: " + error);
                this.$swal.fire({
                    icon: 'error',
                    html: "An error occurred during the creation of your repo.  You can try again and/or let us know.",
                    allowOutsideClick: false,
                }).then((result) => { return });
            }

            /*** Removing token deposits from Repo Creation for now. */
            /*** This can be risky if something fails. */
            /*** Token deposits will be handled on the tokens tab in the repo. */
            // let transferInput = {};
            // try {
            //     // Loop through repo PSTs and perform transfers
            //     for (const pst of this.repoPsts) {
            //         transferInput = {
            //             function: "transfer",
            //             target: this.repo.id,
            //             qty: pst.tokens, // PST qty
            //         };
            //         if (import.meta.env.VITE_ENV === "DEV") {
            //             let wallet = JSON.parse(this.keyFile);
            //             let txID = await interactWrite(arweave, wallet, pst.id, transferInput);
            //             this.$log.info("CreateRepo : createRepo :: ", "Transfer token = " + JSON.stringify(txID));
            //             if(Boolean(this.arweaveMine)){
            //                 await fetch(this.mineUrl);
            //             }

            //             const inputDeposit = {
            //                 function: "deposit",
            //                 tokenId: pst.id,
            //                 txID: txID,
            //             };

            //             txID = await interactWrite(arweave, wallet, this.repo.id, inputDeposit);
            //             this.$log.info("CreateRepo : createRepo :: ", txID);

            //             // if(Boolean(this.arweaveMine)){
            //             //     await fetch(this.mineUrl);
            //             // }

            //         } else {
            //             let txID = await interactWrite(arweave, "use_wallet", pst.id, transferInput);
            //             this.$log.info("CreateRepo : createRepo :: ", "Transfer tokens = " + JSON.stringify(txID));

            //             const inputDeposit = {
            //                 function: "deposit",
            //                 tokenId: pst.id,
            //                 txID: txID,
            //             };

            //             txID = await interactWrite(arweave, "use_wallet", this.repo.id, inputDeposit);
            //             this.$log.info("CreateRepo : createRepo :: ", txID);
            //         }

            //         this.$log.info("CreateRepo : createRepo :: ", "TokenId: " + pst.id + " Name: " + pst.name + " Qty: " + pst.tokens);
            //         if(Boolean(this.arweaveMine)){
            //             await fetch(this.mineUrl);
            //         }
            //     }
            // } catch (error) {
            //     this.$log.error("CreateRepo : createRepo :: ", "ERROR transferring tokens: " + error);
            //     return false;
            // }
            this.$swal.close();
        },
        cancelCreate() {
            this.$router.push("repos");
        },
    },
    created() {
        // Update Members with owner address if user is already ArConnected
        if (this.$store.getters.arConnected) {
            this.daoMembers.push({
                wallet: this.$store.getters.getActiveAddress,
                balance: 0,
            });
        }
    },
};
</script>
