<template>
  <div class="rounded-md bg-yellow-50 pr-4 pl-4 pt-2 pb-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationCircleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">
          Attention needed
        </h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>
            {{ this.repo }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'

export default {
  props: ["repo"],
  components: {
    ExclamationCircleIcon,
  },
}
</script>