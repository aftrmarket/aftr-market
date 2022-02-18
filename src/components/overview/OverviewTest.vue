<template>
  <main class="-mt-32">
    <div
      class="pt-10 bg-aftrDarkGrey sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden"
    >
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div
            class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center"
          >
            <div class="lg:py-24">
              <h1
                class="mt-4 text-4xl tracking-tight font-bold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-5xl"
              >
                <span class="block">Welcome to the</span>
                <span class="block text-aftrYellow">AFTR TESTNET</span>
              </h1>
              <p
                class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
              >
                The purpose of AFTR TESTNET is to show you how to build your
                AFTR Vehicles without having to transfer your current Arweave
                assets. On the TESTNET, you'll be given Arweave assets in the
                form of Profit Sharing Tokens as well as AR (TESTNET AR, not
                real AR 🤣) so that you can create your own vehicles and see how
                to manage and govern them.
              </p>
              <p
                class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
              >
                To start, press the
                <span class="text-aftrYellow">Launch</span> button to setup your
                environment.
              </p>
              <div class="mt-10 sm:mt-12">
                <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                  <div class="sm:flex">
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        @click.prevent="init"
                        type="submit"
                        class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                      >
                        Launch
                      </button>
                    </div>
                    <div class="mt-3 sm:mt-0 sm:ml-3">
                      <button
                        @click.prevent="routeUser('PROD')"
                        type="submit"
                        class="block w-full py-3 px-4 rounded-md shadow bg-indigo-300 text-white font-medium hover:bg-aftrBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                      >
                        Back to MAINNET
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div
              class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"
            >
              <img
                class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="../../assets/overview-3d-illustration.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
        >
          For more information, see below 👇
        </div>
      </div>
    </div>

    <div class="py-6 bg-gray-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
        <div class="text-base max-w-prose mx-auto lg:max-w-none">
          <h2
            class="text-base text-aftrBlue font-semibold tracking-wide uppercase"
          >
            Instructions
          </h2>
          <p
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            What the Heck is an AFTR Vehicle?
          </p>
        </div>

        <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
          <div class="relative lg:row-start-1 lg:col-start-2">
            <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
              <img
                class="rounded-lg shadow-lg object-cover object-center"
                src="https://images.unsplash.com/photo-1546913199-55e06682967e?ixlib=rb-1.2.1&auto=format&fit=crop&crop=focalpoint&fp-x=.735&fp-y=.55&w=1184&h=1376&q=80"
                alt="Whitney leaning against a railing on a downtown street"
                width="1184"
                height="1376"
              />
            </div>
          </div>
          <div class="mt-8 lg:mt-0">
            <div class="text-base max-w-prose mx-auto lg:max-w-none">
              <p class="text-lg text-gray-500">
                AFTR Market allows you to create and group Arweave assets
                together inside of a “vehicle.” By grouping these assets
                together on-chain, you can then put governance around them to
                manage their profit streams. Furthermore, you are essentially
                fractionalizing these assets because when you setup DAO members
                on your AFTR vehicle, the profit streams will flow into the
                vehicle to those members proportionately. This is because when
                you transfer Arweave assets to an AFTR Vehicle, the AFTR Vehicle
                becomes the balance holder on the asset contract. Stated another
                way, if you create an AFTR Vehicle and put one of your Arweave
                PSTs inside of the vehicle, you transferred the asset from your
                wallet to the Permaweb for safe keeping. <br /><br />

                There are certainly more reasons to use AFTR Vehicles, every
                wallet holder containing Arweave assets such as PSTs or NFTs
                should consider securing their assets in a vehicle. Also note
                that when you create an AFTR Vehicle, you are minting a new
                asset on the Permaweb which can be traded as well.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-4 bg-gray-50 overflow-hidden lg:py-4">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div
          class="relative mt- lg:mt-2 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <div class="relative">
            <h3
              class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl"
            >
              Treasury Management
            </h3>
            <p class="mt-3 text-lg text-gray-500">
              Securely manage your Arweave assets on-chain.
            </p>

            <dl class="mt-10 space-y-10">
              <div v-for="item in tmFeatures" :key="item.id" class="relative">
                <dt>
                  <div
                    class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-aftrBlue text-white"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>
                  <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {{ item.name }}
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                  {{ item.description }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width="784"
              height="404"
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="784"
                height="404"
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
            <img
              class="relative mx-auto"
              width="490"
              src="../../assets/overview_dao_mgmt.svg"
              alt=""
            />
          </div>
        </div>

        <svg
          class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
        </svg>

        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div
            class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center"
          >
            <div class="lg:col-start-2">
              <h3
                class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl"
              >
                Direct Profit Streams
              </h3>
              <p class="mt-3 text-lg text-gray-500">
                Use an AFTR Vehicle to encapsulate your Arweave assets to direct
                your profit streams.
              </p>

              <dl class="mt-10 space-y-10">
                <div
                  v-for="item in groupingFeatures"
                  :key="item.id"
                  class="relative"
                >
                  <dt>
                    <div
                      class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-aftrBlue text-white"
                    >
                      <component
                        :is="item.icon"
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                    </div>
                    <p
                      class="ml-16 text-lg leading-6 font-medium text-gray-900"
                    >
                      {{ item.name }}
                    </p>
                  </dt>
                  <dd class="mt-2 ml-16 text-base text-gray-500">
                    {{ item.description }}
                  </dd>
                </div>
              </dl>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <svg
                class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                width="784"
                height="404"
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      class="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="784"
                  height="404"
                  fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                />
              </svg>
              <img
                class="relative mx-auto"
                width="490"
                src="../../assets/overview_profit.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center"
        >
          <div class="relative">
            <h3
              class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl"
            >
              Arweave Founders
            </h3>
            <p class="mt-3 text-lg text-gray-500">
              Create your decentratlized communities on AFTR Market.
            </p>

            <dl class="mt-10 space-y-10">
              <div
                v-for="item in founderFeatures"
                :key="item.id"
                class="relative"
              >
                <dt>
                  <div
                    class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-aftrBlue text-white"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>
                  <p class="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {{ item.name }}
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                  {{ item.description }}
                </dd>
              </div>
            </dl>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width="784"
              height="404"
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="784"
                height="404"
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
            <img
              class="relative mx-auto"
              width="490"
              src="../../assets/overview-create.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  ChartPieIcon,
  LockClosedIcon,
  SpeakerphoneIcon,
  ChartBarIcon,
  ReceiptRefundIcon,
  UserGroupIcon,
  ClipboardListIcon,
  CurrencyDollarIcon,
  TrendingUpIcon,
  GlobeAltIcon,
} from "@heroicons/vue/outline";
import vertoInitState from "./../../testnet/contracts/vertoInitState.json";
import * as vertoSource from "./../../testnet/contracts/vertoSource.js";
import arDriveInitState from "./../../testnet/contracts/arDriveInitState.json";
import * as arDriveSource from "./../../testnet/contracts/arDriveSource.js";
import Arweave from "arweave";
import { mapGetters } from "vuex";
import { createContractFromTx, createContract } from "smartweave";

const tmFeatures = [
  {
    id: 1,
    name: "Security",
    description: "Stores assets on-chain.",
    icon: LockClosedIcon,
  },
  {
    id: 2,
    name: "Multi-signature",
    description:
      "Create DAO or signally owned vehicles to manage your Arweave assets.",
    icon: UserGroupIcon,
  },
  {
    id: 3,
    name: "Built-in Governance",
    description:
      "Make changes to your vehicle and let AFTR Market determine if votes need to be cast.",
    icon: ClipboardListIcon,
  },
  {
    id: 4,
    name: "Governance Notifications (COMING SOON)",
    description:
      "Automatically notify DAO members of proposed changes to your vehicle through the ArConnect wallet.",
    icon: SpeakerphoneIcon,
  },
];
const groupingFeatures = [
  {
    id: 1,
    name: "Token Fractionalization",
    description:
      "Add members to your AFTR Vehicle to fractionalize the profit streams of your tokens.",
    icon: ChartPieIcon,
  },
  {
    id: 2,
    name: "Indexing",
    description:
      "Group tokens together to form indexes of your Arweave assets.",
    icon: ChartBarIcon,
  },
  {
    id: 3,
    name: "Loaning Assets (COMING SOON)",
    description: "Temporarily loan assets to an AFTR Vehicle.",
    icon: ReceiptRefundIcon,
  },
];
const founderFeatures = [
  {
    id: 1,
    name: "Create Your PSTs",
    description:
      "Mint your PSTs to be securely saved until you're ready to deploy your treasuries.",
    icon: CurrencyDollarIcon,
  },
  {
    id: 3,
    name: "Evolve",
    description:
      "The Evolve protocol is supported to allow your PSTs to adapt to changes in the ecosystem.",
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: "Earn AFTR Tokens (COMING SOON)",
    description:
      "Earn additional profit streams by utilizing AFTR. 10% of AFTR's token supply is dedicated to its Partner Program.  An AFTR library is on the roadmap to incentivize adoption.",
    icon: TrendingUpIcon,
  },
];

export default {
  data() {
    return {
      /** Smartweave variables */
      contractSourceId: import.meta.env.VITE_SMARTWEAVE_CONTRACT_SOURCE_ID,
      tagProtocol: import.meta.env.VITE_SMARTWEAVE_TAG_PROTOCOL,
      arweaveHost: import.meta.env.VITE_ARWEAVE_HOST,
      arweavePort: import.meta.env.VITE_ARWEAVE_PORT,
      arweaveProtocol: import.meta.env.VITE_ARWEAVE_PROTOCOL,
      /** */
    };
  },
  computed: {
    ...mapGetters(["arConnected", "keyFile"]),
  },
  methods: {
    routeUser(site) {
      if (site === "PROD") {
        window.location.href = import.meta.env.VITE_AFTR_PROD;
      }
    },
    async init() {
      let arweave = {};
      arweave = await Arweave.init({
        host: this.arweaveHost,
        port: this.arweavePort,
        protocol: this.arweaveProtocol,
        timeout: 20000,
        logging: true,
      });
      let use_wallet;
      if (import.meta.env.DEV) {
        if (this.keyFile.length) {
          use_wallet = JSON.parse(this.keyFile);
        } else {
          alert("Please attach your keyfile");
          return false;
        }
      }

      let contractVertoTxId = await createContract(
        arweave,
        use_wallet,
        new Uint8Array(vertoSource),
        new Uint8Array(vertoInitState)
      );

      let contractArdriveTxId = await createContract(
        arweave,
        use_wallet,
        new Uint8Array(arDriveSource),
        new Uint8Array(arDriveInitState)
      );

      const mineUrl =
        import.meta.env.VITE_ARWEAVE_PROTOCOL +
        "://" +
        import.meta.env.VITE_ARWEAVE_HOST +
        ":" +
        import.meta.env.VITE_ARWEAVE_PORT +
        "/mine";
      let response = await fetch(mineUrl);
      console.log("Verto Contract ID: " + contractVertoTxId , contractArdriveTxId);
      this.$router.push("vehicles");
    },
  },
  setup() {
    return {
      tmFeatures,
      groupingFeatures,
      founderFeatures,
    };
  },
};
</script>
