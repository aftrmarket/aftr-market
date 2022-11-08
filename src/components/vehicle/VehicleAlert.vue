<template>
  <div class="rounded-md bg-yellow-50 pr-4 pl-4 pt-2 pb-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">
          Attention needed
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>
            {{ this.vehicle }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationIcon } from '@heroicons/vue/solid'

export default {
props: ["vehicle"],
  components: {
    ExclamationIcon,
  },
}
</script>