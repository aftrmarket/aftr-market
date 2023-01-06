<template>
  <!-- <main class="-mt-32"> -->
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                    <button type="button" @click.prevent="sortRepo">
                      <svg v-if="sortDirection == 'DESC'" xmlns="http://www.w3.org/2000/svg" class="ml-2 h-3 w-3"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                      <svg v-if="sortDirection == 'ASC'" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 h-3 w-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ownership</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assets</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Members</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Active Votes</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Member?</th>
                </tr>
              </thead>
              <div v-if="showMessage">No repos found...</div>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="repo in filteredList()" :key="repo.id" class="hover:bg-gray-50">
                  <router-link :to="{ name: 'repo', params: { repoId: repo.id } }">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <img class="w-10 h-10 bg-gray-300 rounded-full" :src="repoLogo(repo)" alt="">
                        </div>
                        <div class="ml-4">
                          <div class="font-medium text-gray-900">{{ repo.name }}</div>
                        </div>
                      </div>
                    </td>
                  </router-link>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div class="text-gray-900">{{ repo.desc }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="repo.ownership == 'single'"
                      class="inline-flex rounded-full px-2 text-xs font-semibold leading-5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span v-if="repo.ownership == 'multi'"
                      class="inline-flex rounded-full px-2 text-xs font-semibold leading-5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ repo.tokens.length }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ Object.keys(repo.balances).length
                  }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ activeVotes(repo)
                  }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="getActiveAddress in repo.balances">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </main> -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ['repos', 'searchType', 'searchInput'],
  data() {
    return {
      logoUrl: "",
      allowEdits: false,
      sortDirection: "ASC",
      showMessage: false
    }
  },
  computed: {

    ...mapGetters(["getActiveAddress"]),
  },
  methods: {
    filteredList() {
      if (this.searchType == "Name or Ticker Symbol") {
        const repo = this.repos.filter((repo) =>
          repo.name.toLowerCase().includes(this.searchInput.toLowerCase()) || repo.ticker.toLowerCase().includes(this.searchInput.toLowerCase())
        );
        if (repo.length == 0) {
          this.showMessage = true
          return repo
        }
        this.showMessage = false
        return repo
      }
      if (this.searchType == "Wallet Address") {
        const repo = this.repos.filter(element => {
          return Object.keys(element.balances).some(key => key.toLowerCase().includes(this.searchInput.toLowerCase()));
        });

        if (repo.length == 0) {
          this.showMessage = true
          return repo
        }
        this.showMessage = false
        return repo
      }

      if (this.searchType == "Setting Key") {
        const repo = this.repos.filter((repo) => {
          return repo.settings.some((setting) => {
            return setting[0].toLowerCase().includes(this.searchInput.toLowerCase())
          });
        });

        if (repo.length == 0) {
          this.showMessage = true
          return repo
        }
        this.showMessage = false
        return repo
      }

      if (this.searchType == "Setting Value") {
        const repo = this.repos.filter((repo) => {
          return repo.settings.some((setting) => {
            return String(setting[1]).toLowerCase().includes(this.searchInput.toLowerCase())
          });
        });

        if (repo.length == 0) {
          this.showMessage = true
          return repo
        }
        this.showMessage = false
        return repo
      }

      if (this.searchType == "Asset ID") {
        const repo = this.repos.filter(element => {
          return element.tokens.some((el) => {
            return el.tokenId.toLowerCase().includes(this.searchInput.toLowerCase())
          });
        })

        if (repo.length == 0) {
          this.showMessage = true
          return repo
        }
        this.showMessage = false
        return repo
      }
    },
    repoLogo(repo) {
      let logoUrl = "";
      if (!repo.logo || repo.logo === '') {
        logoUrl = "https://avatars.dicebear.com/api/pixel-art-neutral/:" + repo.id + ".svg";
      } else {
        // logoUrl = "https://arweave.net/" + this.repo.logo;
        if (import.meta.env.VITE_ARWEAVE_PORT) {
          logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + ":" + import.meta.env.VITE_ARWEAVE_PORT + "/" + repo.logo}`;
        } else {
          logoUrl = `${import.meta.env.VITE_ARWEAVE_PROTOCOL + "://" + import.meta.env.VITE_ARWEAVE_HOST + "/" + repo.logo}`;
        }
      }

      return logoUrl;
    },
    sortRepo() {
      this.repos.sort(function (a, b) {
        if (this.sortDirection == 'ASC') {
          return ((a.name == b.name) ? 0 : ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
        }

        if (this.sortDirection == 'DESC') {
          return ((a.name == b.name) ? 0 : ((a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1));
        }
      }.bind(this));

      this.sortDirection == 'ASC' ? this.sortDirection = 'DESC' : this.sortDirection = 'ASC'
    },
    activeVotes(repo){
      let activeVoteCount = 0;
      if (typeof repo.votes !== "undefined" && repo.votes.length !== 0) {
          const activeVotes = repo.votes.filter((vote) => vote.status === "active");
          activeVoteCount = activeVotes.length;
      }
      return activeVoteCount;
    }
  }
}
</script>