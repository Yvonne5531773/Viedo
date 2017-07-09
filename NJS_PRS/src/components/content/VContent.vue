<template>
	<div class="content">
		<div class="container-top-wrapper">
			<div class="container-top">
				<div class="b-l">
					<!--<Banner></Banner>-->
				</div>
				<div class="b-r">
					<!--<ContentTop></ContentTop>-->
				</div>
			</div>
		</div>

		<div class="container-row">
			<!--<Promote></Promote>-->
		</div>

		<div class="container-row">
			<!--<Live></Live>-->
		</div>
		<!-- 各分类具体内容 -->
		<div class="container-row"  v-for="(row, index) in rows" :id="row.b_id" v-if='rows'> 
			<ContentRow :category="row.category" :categoryId="row.categoryId" :row="row.item"></ContentRow>
		</div>
	</div>
</template>

<script>
import Banner from 'components/banner/Banner'
import ContentTop from 'components/contentTop/ContentTop'
import Promote from 'components/promote/Promote'
import Live from 'components/live/Live'
import ContentRow from 'components/contentRow/ContentRow'

import { mapGetters } from 'vuex'
export default {
	props: {
		rows: {
			type: Array
		}
	},
	components: {
		Banner,
		ContentTop,
		Promote,
		Live,
		ContentRow
	}
}
</script>

<style lang="stylus" scoped>
	.content
		zoom 1
		.container-top-wrapper
			&:after
				content ''
				display block
				visibility hidden
				height 0
				clear both
				font-size 0
		.container-top
			padding 0
			margin 0 auto
			margin-bottom 20px
			zoom 1
			width 980px
			&:after
				content ''
				display block
				visibility hidden
				height 0
				clear both
				font-size 0
			.b-l
				float left
				width 440px
			.b-r
				float right
				width 540px
				height auto
		.container-row
			margin 0 auto
			zoom 1
			width 1200px
			&:after
				content ''
				display block
				visibility hidden
				height 0
				clear both
				font-size 0
</style>