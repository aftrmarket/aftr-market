<template>
    <div class="bg-aftrDarkGrey pb-32">
      <nav class="bg-aftrDarkGrey">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="border-b border-aftrYellow">
            <div class="flex items-center justify-between h-16 px-4 sm:px-0">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="h-20 w-20" src="../../assets/png-04.png" alt="Logo">
                </div>
                <div class="hidden md:block">
                  <div class="ml-10 flex items-baseline space-x-4">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a href="/" :class="homeClass">Home</a>

                    <a href="#" class="text-gray-300 hover:bg-aftrYellow hover:text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium">My Portfolio</a>

                    <a href="#" class="text-gray-300 hover:bg-aftrYellow hover:text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium">About</a>
                  </div>
                </div>
              </div>
              <!-- ArConnect Begin -->
              <div class="">
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
      <header class="py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-5xl font-bold text-white font-sans tracking-wider">
            AFTR Market
          </h1>
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
    };
  },
  computed: {
    homeClass() {
      if (this.$route.path === '/' ||  this.$route.path === '/vehicles') {
        return "bg-aftrYellow text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium"
      } else {
        return "text-gray-300 hover:bg-aftrYellow hover:text-aftrDarkGrey px-3 py-2 rounded-md text-sm font-medium"
      }
    },
    walletAddressSubstr() {
        return this.$store.getters.getActiveAddress.substr(0, 10) + '...';
    }
  },
  methods: {
    toggleProfileMenu() {
      this.profileDropdown = !this.profileDropdown;
    },
    arConnect() {
        this.$store.dispatch('arConnect');
    },
    arDisconnect() {
        this.$store.dispatch('arDisconnect'); 
    }
  }
}
</script>