<template>
	<div id="stamp" @click.prevent="showAddStamps = true">
		<StampAdd v-if="showAddStamps" @close="showAddStamps = false" :repo="repo" />
		<StampIcon :stampColor="stampColor" :size="size" />
	</div>
</template>

<script>
import StampAdd from './StampAdd.vue';
import StampIcon from './StampIcon.vue';

export default {
	props: ['repo', 'size'],
	components: {
		StampAdd,
		StampIcon
	},
	data() {
		return {
			stampColor: 'hover:fill-aftrRed',
			showAddStamps: false
		}
	}
};
</script>