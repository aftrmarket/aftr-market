<template>
  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      auto-reopen="true"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="open = false"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
        width="1000"
        height="404"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              sm:my-8 sm:align-middle
              xl:max-w-lg xl:w-full
            "
          >
            <perfect-scrollbar>
              <div class="bg-white px-1 pt-5 pb-8 col-lg-12">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="
                        text-lg
                        leading-6
                        font-medium
                        text-gray-900
                        break-all
                      "
                    >
                      Voting Simulator
                    </DialogTitle>
                    <div>
                      <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                        <div class="text-gray-500">Voting System</div>
                      </div>
                      <div>
                        <input
                          type="radio"
                          v-model="selectedVoteCategory"
                          value="Distributed"
                          class="form-radio text-aftrBlue"
                          @change="changeVoteCategory"
                        /><label class="px-2 text-sm text-gray-700"
                          >Distributed Evenly</label
                        >
                        <input
                          type="radio"
                          v-model="selectedVoteCategory"
                          value="Weighted"
                          class="form-radio text-aftrBlue"
                          @change="changeVoteCategory"
                        /><label class="px-2 text-sm text-gray-700"
                          >Weighted</label
                        >
                      </div>
                      <div class="mt-4 mb-4 grid grid-cols-3 gap-x-4">
                        <div class="text-gray-500">Settings</div>
                      </div>
                      <div>
                        <label class="px-2 text-sm text-gray-700">Quorum</label>
                        <input
                          @change="formDirty"
                          class="w-1/4"
                          type="number"
                          name="newQuorum"
                          :class="inputBox(true)"
                          v-model="selectedQuormValue"
                        />

                        <label class="px-2 text-sm text-gray-700"
                          >Support</label
                        >
                        <input
                          @change="formDirty"
                          class="w-1/4"
                          type="number"
                          name="newQuorum"
                          :class="inputBox(true)"
                          v-model="selectedSupportValue"
                        />
                      </div>
                    </div>
                    <div
                      class="
                        mt-4
                        shadow
                        overflow-hidden
                        border-b border-gray-200
                        sm:rounded-lg
                      "
                    >
                      <table class="w-full text-xs divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              class="
                                flex
                                px-6
                                py-3
                                text-left
                                font-medium
                                text-gray-500
                                uppercase
                                tracking-wider
                              "
                            >
                              <span class="py-2">Member</span>
                              <button
                                @click.prevent="addMemberRow"
                                type="button"
                                class="
                                  px-2
                                  border border-transparent
                                  shadow-sm
                                  text-sm
                                  font-medium
                                  rounded-md
                                  text-aftrBlue
                                  bg-white
                                  hover:bg-aftrBlue hover:text-white
                                  focus:outline-none
                                "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                                  />
                                </svg>
                              </button>
                            </th>
                            <th
                              scope="col"
                              class="
                                px-6
                                py-3
                                text-left
                                font-medium
                                text-gray-500
                                uppercase
                                tracking-wider
                              "
                            >
                              Tokens
                            </th>
                            <th
                              scope="col"
                              class="
                                px-6
                                py-3
                                text-right
                                font-medium
                                text-gray-500
                                uppercase
                                tracking-wider
                              "
                            >
                              Voting Cast
                            </th>
                            <th
                              scope="col"
                              class="
                                px-6
                                py-3
                                text-right
                                font-medium
                                text-gray-500
                                uppercase
                                tracking-wider
                              "
                            >
                              Voting Power
                            </th>
                          </tr>
                          <tr
                            v-show="addRow"
                            class="text-xs text-gray-500 hover:bg-gray-50"
                          >
                            <td class="text-left px-2 py-2">
                              <input
                                type="text"
                                v-model="newMember"
                                class="
                                  mt-1
                                  mb-1
                                  w-3/4
                                  text-xs
                                  focus:ring-aftrBlue focus:border-aftrBlue
                                  shadow-sm
                                  border-gray-300
                                  rounded-md
                                "
                              />
                            </td>
                            <td class="text-right px-4 py-2">
                              <input
                                type="number"
                                v-model="newQty"
                                @blur="onDirty"
                                class="
                                  mt-1
                                  mb-1
                                  mr-4
                                  w-3/4
                                  text-xs text-right
                                  focus:ring-aftrBlue focus:border-aftrBlue
                                  shadow-sm
                                  border-gray-300
                                  rounded-md
                                "
                              />
                            </td>
                            <td class="text-right px-4 py-2">
                              <input
                                type="radio"
                                value="yay"
                                v-model="selectedCastCategory"
                              /><label class="px-2 text-sm text-gray-700"
                                >Yay</label
                              >
                              <input
                                type="radio"
                                value="nay"
                                v-model="selectedCastCategory"
                              /><label class="text-sm text-gray-700">Nay</label>
                            </td>

                            <td class="text-center px-4 py-2">
                              <button
                                @click.prevent="addMember"
                                type="button"
                                class="
                                  inline-flex
                                  items-center
                                  px-1
                                  py-1
                                  border border-transparent
                                  shadow-sm
                                  text-sm
                                  font-medium
                                  rounded-md
                                  text-aftrBlue
                                  bg-white
                                  hover:bg-aftrBlue hover:text-white
                                  focus:outline-none
                                "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr
                            v-for="(value, index) in memberData"
                            :key="value.member"
                            class="hover:bg-gray-50"
                          >
                            <td class="text-center px-6 py-3 text-gray-500">
                              {{ value.member }}
                            </td>
                            <td class="text-center px-1 py-3 text-gray-500">
                              <input
                                type="number"
                                v-model="value.token"
                                @change="tokenValue(value, index)"
                                class="
                                  w-3/4
                                  mt-1
                                  mb-1
                                  mr-4
                                  w-36
                                  text-xs text-right
                                  focus:ring-aftrBlue focus:border-aftrBlue
                                  shadow-sm
                                  border-gray-300
                                  rounded-md
                                "
                              />
                            </td>
                            <td class="text-center px-1 py-6 text-gray-500">
                              <input
                                type="radio"
                                v-model="value.voteCast"
                                value="yay"
                                @change="tokenValue(value, index)"
                              /><label class="px-1 text-sm text-gray-700"
                                >Yay</label
                              >
                              <input
                                type="radio"
                                v-model="value.voteCast"
                                value="nay"
                                @change="tokenValue(value, index)"
                              /><label class="px-1 text-sm text-gray-700"
                                >Nay</label
                              >
                            </td>
                            <td class="text-center px-4 py-3 text-gray-500">
                              {{ value.token }}
                            </td>
                          </tr>
                          <tr>
                            <td class="text-center px-6 py-3 text-gray-500">
                              Total : {{ memberData.length }}
                            </td>
                            <td class="text-center px-6 py-3 text-gray-500">
                              {{ this.tokenTotal }}
                            </td>
                            <td class="text-center px-6 py-3 text-gray-500">
                              {{ this.totalVoteCast }}
                            </td>
                            <td class="text-center px-6 py-3 text-gray-500">
                              {{ this.votingPowerTotal }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="mt-4">
                      <h3
                        class="icon text-lg leading-6 font-medium text-gray-900"
                      >
                        Vote Result <span>&#8505;</span>
                      </h3>
                      <div class="info">
                        Red color for negative result and Green color for
                        positive color.
                      </div>
                      <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div v-bind:class="inputClass('distrubutedQuorem')">
                          <dt
                            class="text-sm font-medium text-gray-500 truncate"
                          >
                            Quorum
                          </dt>
                          <dd class="mt-1 text-2xl font-semibold text-gray-600">
                            {{ distrubutedQuorem }}%
                          </dd>
                        </div>
                        <div v-bind:class="inputClass('distrubutedSupport')">
                          <dt
                            class="text-sm font-medium text-gray-500 truncate"
                          >
                            Support
                          </dt>
                          <dd class="mt-1 text-2xl font-semibold text-gray-600">
                            {{ distrubutedSupport }}%
                          </dd>
                        </div>
                        <div v-bind:class="inputClass('distrubutedSupport')">
                          <dt
                            class="text-sm font-medium text-gray-500 truncate"
                          >
                            Total Support
                          </dt>
                          <dd class="mt-1 text-2xl font-semibold text-gray-600">
                            {{ distrubutedTotalSupport }}%
                          </dd>
                        </div>
                        <div
                          v-bind:class="
                            inputClass('distrubutedTotalOpposition')
                          "
                        >
                          <dt
                            class="text-sm font-medium text-gray-500 truncate"
                          >
                            Total Opposition
                          </dt>
                          <dd class="mt-1 text-2xl font-semibold text-gray-600">
                            {{ distrubutedTotalOpposition }}%
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </perfect-scrollbar>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationIcon } from "@heroicons/vue/outline";

export default {
  props: ["vehicle"],
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
  },
  data() {
    return {
      memberData: [],
      tokenTotal: 0,
      voteCastTotal: 0,
      totalVoteCast: 0,
      voteNayCastTotal: 0,
      votingPowerTotal: 0,
      selectedVoteCategory: "Distributed",
      selectedCastCategory: "yay",
      addRow: false,
      newMember: "",
      newQty: 0,
      selectedQuormValue: 50,
      selectedSupportValue: 50,
      distrubutedQuorem: 0,
      distrubutedSupport: 0,
      distrubutedTotalSupport: 0,
      distrubutedTotalOpposition: 0,
      voteCastYay: [],
      voteCastNay: [],
    };
  },

  mounted() {
    // console.log(
    //   "vehicle",
    //   this.vehicle,
    //   JSON.parse(JSON.stringify(this.vehicle))
    // );

    let myVehicle = JSON.parse(JSON.stringify(this.vehicle));

    const objEntries = Object.entries(myVehicle);
    let test = Object.fromEntries(objEntries);

    console.log(
      Object.entries(test.balances).map((item) =>
        this.memberData.push({
          member: this.idSubstr(item[0]),
          token: item[1],
          voteCast: "",
        })
      )
    );

    this.changeVoteCategory();
  },

  methods: {
    idSubstr(addr, chars = 10) {
      if (typeof addr === "string") {
        let len = parseInt(chars / 2);
        return addr.substr(0, len) + "..." + addr.substr(-len);
      } else {
        return "";
      }
    },
    formDirty() {
      if (!this.selectedQuormValue || this.selectedQuormValue === "") {
        // Quorum needs to be in the following range:  0.01 - 0.99
        this.selectedQuormValue = this.selectedQuormValue;
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
        key == "distrubutedSupport" &&
        this.distrubutedTotalSupport >= this.selectedSupportValue
      ) {
        return "px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 bg-green-100";
      } else if (key == "distrubutedTotalOpposition") {
        return "px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 bg-red-100";
      } else if (
        key == "distrubutedQuorem" &&
        this.distrubutedQuorem >= this.selectedQuormValue
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

      let val = this.memberData.filter(
        (object) => object.voteCast == "yay" || object.voteCast == "nay"
      );
      this.totalVoteCast = val.length;

      let result = this.memberData.filter((object) => object.voteCast == "yay");
      this.voteCastTotal = result.length;

      let result1 = this.memberData.filter(
        (object) => object.voteCast == "nay"
      );
      this.voteNayCastTotal = result1.length;
    },

    tokenValue(value, index) {
      this.changeVoteCategory();
    },

    async quorumCalculation() {
      let data;

      if (this.selectedVoteCategory == "Distributed") {
        data =
          ((this.voteCastTotal + this.voteNayCastTotal) /
            this.memberData.length) *
          100;
        this.distrubutedQuorem = data.toFixed(2);
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
        this.distrubutedQuorem = data.toFixed(2);
      }
    },

    async supportCalculation() {
      let data;

      if (this.selectedVoteCategory == "Distributed") {
        let result1 = this.memberData.filter(
          (object) => object.voteCast == "nay" || object.voteCast == ""
        );
        data =
          (this.voteCastTotal / (this.voteCastTotal + result1.length)) * 100;
        this.distrubutedSupport = data ? data.toFixed(2) : Number(0).toFixed(2);
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
        this.distrubutedSupport = data ? data.toFixed(2) : Number(0).toFixed(2);
      }
    },

    async totalSupportCalculation() {
      let data;

      if (this.selectedVoteCategory == "Distributed") {
        data = (this.voteCastTotal / this.memberData.length) * 100;
        this.distrubutedTotalSupport = data.toFixed(2);
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
        this.distrubutedTotalSupport = data
          ? data.toFixed(2)
          : Number(0).toFixed(2);
      }
    },

    async totalOppositionCalculation() {
      let data;

      if (this.selectedVoteCategory == "Distributed") {
        data = (this.voteNayCastTotal / this.memberData.length) * 100;
        this.distrubutedTotalOpposition = data.toFixed(2);
      } else {
        let nayTotal = this.memberData
          .filter((object) => object.voteCast == "nay")
          .reduce((accumulator, object) => {
            return accumulator + object.token;
          }, 0);

        data = (nayTotal / this.tokenTotal) * 100;
        this.distrubutedTotalOpposition = data.toFixed(2);
      }
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
    changeVoteCategory() {
      this.total();
      this.quorumCalculation();
      this.supportCalculation();
      this.totalSupportCalculation();
      this.totalOppositionCalculation();
    },
  },
  setup() {
    const open = ref(true);
    return {
      open,
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
.icon:hover ~ .info {
  display: block;
}
span {
  content: "\2139";
}
</style>
