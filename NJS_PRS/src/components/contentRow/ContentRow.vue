<template>
	<div class="b-section-body">
		<div class="b-l">
			<RowHead :category="category" :row="row"></RowHead>
			<!--<RowBody :row="row"></RowBody>-->
		</div>
		<div class="b-r">
			<!--<RowRank :category="category" :categoryId="categoryId"></RowRank>-->
		</div>
	</div>
</template>

<script>
import RowHead from 'components/contentRow/RowHead'
//import RowBody from 'components/contentRow/RowBody'
import RowRank from 'components/contentRow/RowRank'
import { mapGetters } from 'vuex'
export default {
	props: {
		category: {
			type: String
		},
		row: {
			type: Array
		},
		categoryId: {
			type: Number
		}
	},
	computed: {
		...mapGetters([
			'requesting',
			'error',
			'ranks',
			'rank'
		])
	},
	mounted() {
		// console.log(this.categoryId)
		// this.$store.dispatch('getContentRank', this.categoryId)
	},
	components: {
		RowHead,
//		RowBody,
		RowRank
	}
}
</script>

<style lang="stylus" scoped>
	.b-section-body
		zoom 1
		.b-l
			float left
			width 700px
			margin-bottom 250px
		.b-r
			float right 
			width 260px
			min-height 360px
			height 360px
			margin-bottom 250px
</style>