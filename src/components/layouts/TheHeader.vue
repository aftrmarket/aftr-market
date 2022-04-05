<template>
    <div class="bg-aftrDarkGrey pb-32">
      <nav class="bg-aftrDarkGrey">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="border-b border-aftrYellow">
            <div class="flex items-center justify-between h-16 px-4 sm:px-0">
              <div class="flex items-center">
                <div class="flex-shrink-0 flex items-center space-x-2">
                    <img class="w-10" src="../../assets/aftr-market-logo.png" alt="Logo">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-aftrDarkGrey-light text-aftrYellow">
                        alpha
                    </span>
                </div>
                <div class="hidden md:block">
                  <div class="ml-10 flex items-baseline space-x-4">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="#" @click="goTo('overview')" :class="homeClass">Welcome</a>

                    <a v-if="siteMode === 'PROD'" href="#" @click="goTo('vehicles')" :class="vehiclesClass">Vehicles</a>

                    <!--<a href="#" class="text-gray-300 hover:bg-aftrYellow hover:text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium">About</a>-->
                  </div>
                </div>
              </div>

                <!-- Network Selection Begin -->
                <div class="flex items-center space-x-2">
                    <div v-if="siteMode === 'DEV'" class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#FFFC79">
                            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div v-else-if="siteMode === 'TEST'" class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="#FFFC79">
                            <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div v-else-if="siteMode === 'PROD'" class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="lightgreen">
                            <path fill-rule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <select v-if="devMode" v-model="siteMode" @change="switchMode" id="selectedSiteMode" name="selectedSiteMode" class="mt-1 text-white border-gray-300 bg-aftrDarkGrey focus:outline-none focus:ring-aftrYellow focus:border-aftrYellow sm:text-sm rounded-md">
                        <option value="" selected disabled>{{ showSiteMode }}</option>
                        <option v-show="siteMode !== 'PROD'" value="PROD">MAINNET</option>
                        <option v-show="siteMode !== 'TEST'" value="TEST">TESTNET</option>
                        <option v-show="siteMode !== 'DEV'" value="DEV">DEVNET</option>
                    </select>
                    <select v-else v-model="siteMode" @change="switchMode" id="selectedSiteMode" name="selectedSiteMode" class="mt-1 text-white border-gray-300 bg-aftrDarkGrey focus:outline-none focus:ring-aftrYellow focus:border-aftrYellow sm:text-sm rounded-md">
                        <option value="" selected disabled>{{ showSiteMode }}</option>
                        <option v-show="siteMode !== 'PROD'" value="PROD">MAINNET</option>
                        <option v-show="siteMode !== 'TEST'" value="TEST">TESTNET</option>
                    </select>
                </div>
                <!-- Network Selection End -->

              <!-- ArConnect Begin -->
              <div>
                <div v-if="!$store.getters.arConnected" class="flex items-center">
                    <div class="text-aftrDarkGrey-light text-sm font-light">
                        No Wallet Connected
                    </div>
                    <button @click.prevent="arConnect" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                        <img src="../../assets/arconnect-logo.png" alt="Login to ArConnect" width="24" />
                    </button>
                </div>
                <div v-else class="flex items-center">
                    <div class="text-aftrGo text-sm font-light">
                    <input v-if="siteMode==='DEV'" type="file" ref="doc" @change="readFile()" />
                  {{ walletAddressSubstr }}
                </div>
                <div>
                        <button @click.prevent="arDisconnect" type="submit" class="inline-flex items-center p-1 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aftrRed">
                            <img src="../../assets/arconnect-on-logo.png" alt="Login to ArConnect" width="24" />
                        </button>
                    </div>
                </div>
              </div>
              <!-- ArConnect End -->
            </div>
          </div>
        </div>
      </nav>
      <header class="py-2">
        <div class="grid grid-cols-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="py-8">
                <img src="../../assets/aftr-market-text.svg" width="500" />
            </div>
            <div v-if="!launchSetupCorrect" class="py-1 text-right text-5xl animate-pulse">👆</div>
        </div>
      </header>
    </div>
</template>
<script>

export default {
  data() {
    return {
      arConnected: false,
      profileDropdown: false,
      psts: [],
      devMode: import.meta.env.VITE_ENV,
      siteMode: import.meta.env.VITE_ENV,
      file: null, 
      content: {}
    };
  },
  computed: {
    homeClass() {
      if (this.$route.path === '/' ||  this.$route.path === '/overview') {
        return "bg-aftrYellow text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium"
      } else {
        return "text-gray-300 hover:bg-aftrYellow hover:text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium"
      }
    },
    vehiclesClass() {
      if (this.$route.path === '/vehicles') {
        return "bg-aftrYellow text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium"
      } else {
        return "text-gray-300 hover:bg-aftrYellow hover:text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium"
      }
    },
    showSiteMode() {
        if (this.siteMode === 'PROD') {
            return "MAINNET";
        } else if (this.siteMode === 'TEST') {
            return "TESTNET";
        } else {
            return "DEVNET";
        }
    },
    walletAddressSubstr() {
        return this.$store.getters.getActiveAddress.substr(0, 10) + '...';
    },
    launchSetupCorrect() {
        return this.$store.getters.getTestLaunchConfigState;
    },
  },
  methods: {
    goHome() {
        this.$router.push("../vehicles");
    },
    goMyPortfolio() {
      if(!this.$store.getters.arConnected){
        // alert("Please login to Aftr-Market")
        this.$swal({
            icon: 'error',
            html: "Please login to Aftr-Market",
        })
      } else {
        this.$router.push("../MyPortfolio");
      }
    },
    goTo(route) {
        let url = "../" + route;
        this.$router.push(url);
    },
    toggleProfileMenu() {
      this.profileDropdown = !this.profileDropdown;
    },
    arConnect() {
        this.$store.dispatch('arConnect');
    },
    arDisconnect() {
      this.$store.dispatch("arDisconnect");
    },
    switchMode() {
        let url = "";
        if (this.siteMode === 'PROD') {
            url = import.meta.env.VITE_AFTR_PROD;
        } else if (this.siteMode === 'TEST') {
            url = import.meta.env.VITE_AFTR_TEST;
        } else {
            url = import.meta.env.VITE_AFTR_DEV;
        }
        window.location.href = url;
    },
    readFile() {
      this.file = this.$refs.doc.files[0];
      const reader = new FileReader();
        this.content = "check the console for file output";
        reader.onload = (res) => {
          this.$log.info("TheHeader : readFile :: ", res.target.result);
          this.content = res.target.result
          this.$store.commit("addKeyFile", this.content);
        };
        reader.onerror = (err) => this.$log.error("TheHeader : readFile :: ", err);
        reader.readAsText(this.file);
    },
  },
};
</script>
