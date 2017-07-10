<template>
	<div class="content" style="padding:50px;">
		<div class="h-center">
			<search class="msearch"></search>
			<el-dropdown menu-align='start' style="position: absolute;top:73px;left:1110px;">
				<img src="../../assets/images/other.png" style="width:45px"></img>
				<el-dropdown-menu slot="dropdown">
					<div style="padding: 9px;">
						<span>自动加入追剧</span><el-switch style="margin-left: 30px;" v-model="value2" on-color="#13ce66" off-color="#ff4949"></el-switch>
					</div>
					<div style="padding: 9px;">
						<span>新剧提醒</span><el-switch style="margin-left: 62px;" v-model="value2" on-color="#13ce66" off-color="#ff4949"></el-switch>
					</div>
				</el-dropdown-menu>
			</el-dropdown>
		</div>

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
import Search from 'components/common/Search'
import Banner from 'components/banner/Banner'
import ContentTop from 'components/contentTop/ContentTop'
import Promote from 'components/promote/Promote'
import Live from 'components/live/Live'
import ContentRow from 'components/contentRow/ContentRow'

import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            value1: true,
            value2: true
        }
    },
	props: {
		rows: {
			type: Array
		}
	},
	components: {
        Search,
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
		.h-center
			width 1110px
			margin 0 auto
			position relative
			height 118px
			transition .2s height
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
			width 1300px
			&:after
				content ''
				display block
				visibility hidden
				height 0
				clear both
				font-size 0
</style>