<template>
  <Dialog :open="isOpen" class="relative z-50">
    <div class="fixed inset-0 overflow-y-auto flex items-center justify-center p-4 rounded-md shadow border-b border-gray-200">
      <DialogPanel class="w-full max-w-4xl shadow border-b border-gray-200">
        <div class="bg-white px-1 pt-5 pb-8 col-lg-12 rounded-md shadow border-b border-gray-200">
          <div class="mt-3 text-center sm:mt-0 sm:ml-2 sm:text-left">
            <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900 break-all">Voting Simulator
            </DialogTitle>
            <div>
              <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                <div class="text-gray-500">Voting System</div>
              </div>
              <div>
                <input type="radio" v-model="selectedVoteCategory" value="Weighted" class="form-radio text-aftrBlue" @change="changeVoteCategory" />
                <label class="px-2 text-sm text-gray-700">Weighted</label>
                <input type="radio" v-model="selectedVoteCategory" value="Equal" class="form-radio text-aftrBlue" @change="changeVoteCategory" />
                <label class="px-2 text-sm text-gray-700">Distributed Evenly</label>
              </div>
              <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                <div class="text-gray-500">Settings</div>
              </div>
              <div>
                <label class="px-2 text-sm text-gray-700">Quorum %</label>
                <input @change="formDirty" class="w-20" type="number" name="newQuorum" :class="inputBox(true)" v-model="selectedQuorumValue" />
                <label class="pl-10 px-2 text-sm text-gray-700">Support %</label>
                <input @change="formDirty" class="w-20" type="number" name="newSupport" :class="inputBox(true)" v-model="selectedSupportValue" />
              </div>
            </div>
            <div class="mt-4 mr-4 ml-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="w-full text-xs divide-y divide-gray-200 table-fixed">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="flex px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider w-1/4">
                      <span class="py-2">Member</span>
                      <button @click.prevent="addMemberRow" type="button"
                        class="px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                      </button>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                      Balance</th>
                    <th scope="col" class="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                      Vote Cast</th>
                    <th scope="col" class="pr-6 py-3 text-right font-medium text-gray-500 uppercase tracking-wider">
                      Voting Power</th>
                  </tr>
                  <tr v-show="addRow" class="text-xs text-gray-500 hover:bg-gray-50">
                    <td class="text-left px-2 py-2">
                      <input type="text" v-model="newMember" class="mt-1 mb-1 text-xs focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                    </td>
                    <td class="text-right px-4 py-2">
                      <input type="number" v-model="newQty" @blur="onDirty"
                        class="mt-1 mb-1 mr-4 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                    </td>
                    <td class="text-center py-2">
                      <input type="radio" value="yay" v-model="selectedCastCategory" /><label class="px-2 text-sm text-gray-700">Yay</label>
                      <input type="radio" value="nay" v-model="selectedCastCategory" /><label class="px-2 text-sm text-gray-700">Nay</label>
                    </td>

                    <td class="text-center px-4 py-2">
                      <button @click.prevent="addMember" type="button"
                        class="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-aftrBlue bg-white hover:bg-aftrBlue hover:text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clip-rule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(value, index) in memberData" :key="value.member" class="hover:bg-gray-50">
                    <td class="text-left px-6 py-3 text-gray-500">
                      {{ value.member }}
                    </td>
                    <td class="text-center px-1 py-3 text-gray-500">
                      <input type="number" v-model="value.token" @change="tokenValue(value, index)"
                        class="mt-1 mb-1 mr-4 text-xs text-right focus:ring-aftrBlue focus:border-aftrBlue shadow-sm border-gray-300 rounded-md" />
                    </td>
                    <td class="text-center text-gray-500">
                      <div class="flex justify-center items-center pl-14">
                        <input type="radio" v-model="value.voteCast" value="yay" @change="tokenValue(value, index)" /><label class="px-2 text-sm text-gray-700">Yay</label>
                        <input type="radio" v-model="value.voteCast" value="nay" @change="tokenValue(value, index)" /><label class="px-2 text-sm text-gray-700">Nay</label>
                        <button class="px-4" @click="resetInput(value, index)">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                              clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td class="text-right pr-6 py-3 text-gray-500">
                      {{ determineVotingPower(value.token) }}
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left px-6 py-3 text-gray-500">
                      Total Members: {{ memberData.length }}
                    </td>
                    <td class="text-right py-3 pr-16 text-gray-500">
                      {{ tokenTotal }}
                    </td>
                    <td class="text-center px-4 py-3 text-gray-500">
                      Yays: {{ voteCastTotal }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Nays: {{ voteNayCastTotal }}
                    </td>
                    <td class="text-right pr-6 py-3 text-gray-500">
                      {{ determineVotingPower(votingPowerTotal, true) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-4 p-4">
              <h3 class="icon text-lg leading-6 font-medium text-gray-900">
                Vote Result
              </h3>
              <dl class="mt-5 grid grid-cols-5 gap-5">
                <div class="col-span-2 text-sm text-gray-700 text-center">Vote length must expire</div>
                <div class="col-span-1"></div>
                <div class="col-span-2 text-sm text-gray-700 text-center">Voting can end as soon as either of these are
                  met</div>
                <div v-bind:class="inputClass('quorum')">
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Quorum
                  </dt>
                  <dd class="mt-1 text-2xl font-semibold text-gray-600">
                    {{ quorum }}%
                  </dd>
                </div>
                <div v-bind:class="inputClass('support')">
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Support
                  </dt>
                  <dd class="mt-1 text-2xl font-semibold text-gray-600">
                    {{ support }}%
                  </dd>
                </div>
                <div class="flex items-center place-content-center flex-shrink">OR</div>
                <div v-bind:class="inputClass('support')">
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Support
                  </dt>
                  <dd class="mt-1 text-2xl font-semibold text-gray-600">
                    {{ totalSupport }}%
                  </dd>
                </div>
                <div v-bind:class="inputClass('totalOpposition')">
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Opposition
                  </dt>
                  <dd class="mt-1 text-2xl font-semibold text-gray-600">
                    {{ totalOpposition }}%
                  </dd>
                </div>
              </dl>
              <div v-if="result">
                <div class="flex flex-row justify-center mt-5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="green">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="pt-1.5 text-green-700 font-bold text-xl">{{ resultMessage }}</span>
                </div>
                <div class="mt-2 pl-6 text-green-700 text-sm text-center">{{ reasonMessage }}</div>
              </div>
              <div v-else>
                <div class="flex flex-row justify-center mt-5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="red">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd" />
                  </svg>
                  <span class="pt-1.5 text-red-500 font-bold text-xl">{{ resultMessage }}</span>
                </div>
                <div class="mt-2 pl-6 text-red-500 text-sm text-center">{{ reasonMessage }}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';

export default {
  props: ["repo", "vote"],
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    DialogPanel,
    ExclamationCircleIcon,
  },
  data() {
    return {
      memberData: [],
      tokenTotal: 0,
      voteCastTotal: 0,
      totalVoteCast: 0,
      voteNayCastTotal: 0,
      votingPowerTotal: 0,
      selectedVoteCategory: "Weighted",
      selectedCastCategory: "yay",
      addRow: false,
      newMember: "",
      newQty: 0,
      selectedQuorumValue: 50,
      selectedSupportValue: 50,
      quorum: 0,
      support: 0,
      totalSupport: 0,
      totalOpposition: 0,
      voteCastYay: [],
      voteCastNay: [],
      resultMessage: "Proposal Not Approved",
      reasonMessage: "Quorum has not been reached.",
      result: false,
    };
  },

  mounted() {
    if (this.repo == undefined || this.repo == null) {
      this.memberData.push({
        member: "Member1",
        token: 1000,
        voteCast: ""
      });
      this.memberData.push({
        member: "Member2",
        token: 5000,
        voteCast: ""
      });
      this.memberData.push({
        member: "Member3",
        token: 3000,
        voteCast: ""
      });
    } else {
      let myRepo = JSON.parse(JSON.stringify(this.repo));

      const objEntries = Object.entries(myRepo);
      let test = Object.fromEntries(objEntries);
      let voteValue = test.votingSystem;
      this.selectedVoteCategory = voteValue.charAt(0).toUpperCase() + voteValue.slice(1);

      let val = Object.entries(test.settings).map((item) => {
        if (item[1][0] == "quorum") {
          this.selectedQuorumValue = item[1][1] * 100
        }

        if (item[1][0] == "support") {
          this.selectedSupportValue = item[1][1] * 100
        }
      });
      if (this.vote == undefined || this.vote == null) {
        for (const [key, value] of Object.entries(this.repo.balances)) {
            this.memberData.push({
                member: this.idSubstr(key),
                token: value,
                voteCast: ""
            });
        }
      } else {
        Object.entries(this.vote.votingPower).map((item) =>
            this.memberData.push({
                member: this.idSubstr(item[0]),
                token: item[1],
                voteCast: "",
            })
        );
      }
    }

    this.changeVoteCategory();
  },
  watch: {
    selectedQuorumValue() {
      this.determineMessage();
    },
    selectedSupportValue() {
      this.determineMessage();
    }
  },
  methods: {
    resetInput(value, index) {
      this.memberData.map((val, i) => {
        if (i == index) {
          val.voteCast = "";
        }
      });
      this.changeVoteCategory();
    },
    idSubstr(addr, chars = 10) {
      if (typeof addr === "string") {
        let len = parseInt(chars / 2);
        return addr.substr(0, len) + "..." + addr.substr(-len);
      } else {
        return "";
      }
    },
    formDirty() {
      if (!this.selectedQuorumValue || this.selectedQuorumValue === "") {
        // Quorum needs to be in the following range:  0.01 - 0.99
        this.selectedQuorumValue = this.selectedQuorumValue;
      }
      if (!this.selectedSupportValue || this.selectedSupportValue === "") {
        // Quorum needs to be in the following range:  0.01 - 0.99
        this.selectedSupportValue = this.selectedSupportValue;
      }
    },
    inputBox(valid) {
      if (valid) {
        return "mt-1 focus:ring-aftrBlue focus:border-aftrBlue shadow-sm sm:text-sm border-gray-300 rounded-md";
      } else {
        return "mt-1 focus:ring-aftrRed focus:border-aftrRed shadow-sm sm:text-sm border-aftrRed rounded-md";
      }
    },

    inputClass(key) {
      if (
        key == "support" &&
        this.totalSupport >= this.selectedSupportValue
      ) {
        return "px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 bg-green-100";
      } else if (key == "totalOpposition") {
        return "px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 bg-red-100";
      } else if (
        key == "quorum" &&
        this.quorum >= this.selectedQuorumValue
      ) {
        return "px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 bg-green-100";
      } else {
        return "px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 bg-red-100";
      }
    },

    total() {
      this.tokenTotal = this.memberData.reduce((accumulator, object) => {
        return accumulator + object.token;
      }, 0);

      this.votingPowerTotal = this.memberData.reduce((accumulator, object) => {
        return accumulator + object.token;
      }, 0);

      let val = this.memberData.filter((object) => object.voteCast == "yay" || object.voteCast == "nay");
      this.totalVoteCast = val.length;

      let result = this.memberData.filter((object) => object.voteCast == "yay");
      this.voteCastTotal = result.length;

      let result1 = this.memberData.filter((object) => object.voteCast == "nay");
      this.voteNayCastTotal = result1.length;
    },

    tokenValue(value, index) {
      this.changeVoteCategory();
    },

    determineVotingPower(tokenCount, aggregrate = false) {
      if (this.selectedVoteCategory == "Equal") {
        if (aggregrate) {
          return String(this.memberData.length);
        } else {
          return "1";
        }
      } else {
        return tokenCount;
      }
    },

    async quorumCalculation() {
      let data;

      if (this.selectedVoteCategory == "Equal") {
        data =
          ((this.voteCastTotal + this.voteNayCastTotal) /
            this.memberData.length) *
          100;
        this.quorum = data.toFixed(2);
      } else {
        let yayTotal = this.memberData
          .filter((object) => object.voteCast == "yay")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        let nayTotal = this.memberData
          .filter((object) => object.voteCast == "nay")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        data = ((yayTotal + nayTotal) / this.tokenTotal) * 100;
        this.quorum = data.toFixed(2);
      }
      this.determineMessage()
    },

    async supportCalculation() {
      let data;

      if (this.selectedVoteCategory == "Equal") {
        let result1 = this.memberData.filter(
          (object) => object.voteCast == "nay" || object.voteCast == ""
        );
        data =
          (this.voteCastTotal / (this.voteCastTotal + result1.length)) * 100;
        this.support = data ? data.toFixed(2) : Number(0).toFixed(2);
      } else {
        let yayTotal = this.memberData
          .filter((object) => object.voteCast == "yay")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        let nayTotal = this.memberData
          .filter((object) => object.voteCast == "nay" || object.voteCast == "")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        data = (yayTotal / (yayTotal + nayTotal)) * 100;
        this.support = data ? data.toFixed(2) : Number(0).toFixed(2);
      }
      this.determineMessage()
    },

    async totalSupportCalculation() {
      let data;

      if (this.selectedVoteCategory == "Equal") {
        data = (this.voteCastTotal / this.memberData.length) * 100;
        this.totalSupport = data.toFixed(2);
      } else {
        let yayTotal = this.memberData
          .filter((object) => object.voteCast == "yay")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        let nayTotal = this.memberData
          .filter((object) => object.voteCast == "nay" || object.voteCast == "")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        data = (yayTotal / (yayTotal + nayTotal)) * 100;
        this.totalSupport = data
          ? data.toFixed(2)
          : Number(0).toFixed(2);
      }
      this.determineMessage()
    },

    async totalOppositionCalculation() {
      let data;

      if (this.selectedVoteCategory == "Equal") {
        data = (this.voteNayCastTotal / this.memberData.length) * 100;
        this.totalOpposition = data.toFixed(2);
      } else {
        let nayTotal = this.memberData
          .filter((object) => object.voteCast == "nay")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        data = (nayTotal / this.tokenTotal) * 100;
        this.totalOpposition = data.toFixed(2);
      }
      this.determineMessage()
    },

    addMemberRow() {
      this.addRow = !this.addRow;
    },
    addMember() {
      if (
        (this.newMember != "" &&
          this.newQty != "" &&
          this.selectedCastCategory == "yay") ||
        this.selectedCastCategory == "nay"
      ) {
        this.memberData.push({
          member: this.newMember,
          token: this.newQty,
          voteCast: this.selectedCastCategory,
          // votingPower: this.newQty,
        });
        this.addRow = false;
        this.newMember = "";
        this.newQty = "";
      }
      this.changeVoteCategory();
      return;
    },
    determineMessage() {
      if (this.totalSupport >= this.selectedSupportValue) {
        this.result = true;
        this.resultMessage = "Proposal Approved";
        this.reasonMessage = "Total Support has been achieved meaning no amount of Nay votes can change the result.";
      } else if (this.totalOpposition > this.selectedSupportValue) {
        this.result = false;
        this.resultMessage = "Proposal Not Approved";
        this.reasonMessage = "Total Opposition has been achieved meaning no amount of Yay votes can change the result.";
      } else if (this.quorum >= this.selectedQuorumValue && this.support >= this.selectedSupportValue) {
        this.result = true;
        this.resultMessage = "Proposal Approved";
        this.reasonMessage = "The proposal would be approved if the vote length has ended.";
      } else {
        this.result = false;
        this.resultMessage = "Proposal Not Approved";
        if (this.quorum < this.selectedQuorumValue && this.support < this.selectedSupportValue) {
          this.reasonMessage = "Quorum and Support have not been met.";
        } else if (this.quorum < this.selectedQuorumValue) {
          this.reasonMessage = "Quorum has been achieved.";
        } else if (this.support < this.selectedSupportValue) {
          this.reasonMessage = "Not enough support to approve the proposal.";
        }
      }
    },
    changeVoteCategory() {
      this.total();
      this.quorumCalculation();
      this.supportCalculation();
      this.totalSupportCalculation();
      this.totalOppositionCalculation();
      this.determineMessage();
    },
  },
  setup() {
    const isOpen = ref(true);
    return {
      isOpen,
    };
  },
};
</script>



<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<style>
.ps {
  height: 750px;
}

.info {
  display: none;
  color: lightcoral;
}

.icon:hover~.info {
  display: block;
}

span {
  content: "\2139";
}
</style>
