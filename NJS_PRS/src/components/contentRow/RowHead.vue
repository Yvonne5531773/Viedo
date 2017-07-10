<template>
	<div class="b-head">
		<span class="b-head-i" :class="category"></span>
		<span class="b-head-t">
			<a href="" :title="title">
				<h2>{{title}}</h2>
			</a>
		</span>
		<ul class="b-slt-tab">
			<li :class="{on: tabCount === index}" v-for="(item, index) in row" v-if='row' @click="cutTab(index)">
				<span class="b-tab-text">{{item.area}}</span>
			</li>
		</ul>
		<div class="b-link-more" v-if='category!==`myTv`'>
			<a href="">
				更多<i class="b-icon b-icon-arrow-r"></i>
			</a>
		</div>
		<RowBody :api="api" :myTv="myTv" :isMyTv="isMyTv"></RowBody>
	</div>
</template>

<script>
import RowBody from 'components/contentRow/RowBody'
import { myTvApi } from 'api'

export default {

    data() {
        return {
            count: 0,
            tabCount: 0,
			api: this.row[0]? this.row[0].area_api:'',
            isOrigin: false,
			myTv: [],
			isMyTv: false,
        }
	},

	props: {
		category: {
			type: String
		},
        row: {
            type: Array
        },
	},
    mounted() {
        if(this.category === 'myTv'){
            this.isMyTv = true
            this.getMyTv()
		}
    },
    methods: {
        getMyTv(){
            myTvApi.getMyTv().then((response) => {
                console.log('getMyTv response', response)
                this.myTv = response;
            })
		},
        cutTab(index) {
            this.tabCount = index;
            this.api = this.row[index].area_api;
            this.isOrigin = !this.isOrigin;
//            let distance = -100 * this.tabCount
//            let left = distance + "%"
//            this.$refs.listWrapper.style.marginLeft = left
        },
    },
	computed: {
		title() {
			let title = '未知标题';
			if (this.category) {
				switch(this.category) {
                    case 'myTv':
                        title = '我的追剧'
                        break
                    case 'tv':
                        title = '热播好剧'
                        break
                    case 'movie':
                        title = '热门电影'
                        break
					case 'zy':
						title = '热门综艺'
						break
                    case 'dm':
                        title = '热门动漫'
                        break
					default:
						title ="未知标题"
				}
			}
			return title
		}
	},
    components: {
        RowBody
    }
}
</script>

<style lang="stylus" scoped>
	.b-head
		height 24px
		white-space nowrap
		position relative
		.b-head-i
			position absolute
			left 0px
			top -8px
			background url(../../assets/images/icons.png) no-repeat
			width 40px
			height 39px
			display inline-block
		.b-head-t
			float left
			margin-left 46px
			vertical-align middle
			display inline-block
			font-size 18px
			line-height 24px
			color #222
			a
				color #222
			h2
				font-size 24px!important
				line-height 24px
				font-weight bolder
				padding-bottom 5px
				/*border-bottom 3px solid*/
		.b-slt-tab
			position relative
			display inline-block
			vertical-align middle
			margin-left 20px
			margin-top 4px
			float left
			li
				float left
				height 20px
				line-height 20px
				cursor pointer
				text-align center
				transition .2s
				transition-property border, color
				padding 1px 0 2px
				position relative
				border-radius 0
				border-bottom 1px solid transparent
				margin-left 24px
				&:first-child
					margin-left 0!important
				&.on
					background-color transparent
					border-color #00a1d6
					color #00a1d6
					&:before
						content ''
						display block
						position absolute
						left 50%
						margin-left -3px
						bottom 0px
						width 0
						height 0
						border 3px dashed #00a1d6
						border-bottom-style solid
						border-top 0
						border-left-color transparent
						border-right-color transparent
		.b-link-more
			/*float right*/
			position absolute
			left 1180px
			text-align center
			margin-left 10px
			a
				display block
				width 52px
				height 22px
				line-height 22px
				background-color #fff
				border 1px solid #ccd0d7
				color #555
				border-radius 4px
				.b-icon-arrow-r
					display inline-block
					vertical-align middle
					background url(../../assets/images/icons.png) no-repeat
					width 6px
					height 12px
					margin -2px 0 0 5px
					background-position -478px -218px
		.read-push
			float right
			cursor pointer
			background-color #fff
			border 1px solid #ccd0d7
			border-radius 4px
			height 22px
			padding 0 10px
			.icon-refresh
				background url(../../assets/images/icons.png) -475px -89px no-repeat
				display inline-block
				width 12px
				height 13px
				vertical-align: top
				transition .2s
				margin-top 5px
			.info
				display inline-block
				vertical-align top
				line-height 22px
				margin-left 5px
				b
					font-weight bold
				em
					font-style normal
					font-weight normal
		.pmt-list
			display inline-block
			vertical-align bottom
			&.pmt-inline
				margin-left 40px
				margin-top 3px
				max-width 214px
				overflow hidden
				float left
			.pmt-icon
				display inline-block
				vertical-align top
				background url(../../assets/images/icons.png) -665px -1113px no-repeat
				width 14px
				height 14px
				margin-top 1px
			i
				font-style normal
				font-weight normal
			.pmt-link
				vertical-align top
				height auto
				display inline-block
				padding 0 0 0 8px
				border 0
				a
					max-width 192px
					overflow hidden
					white-space nowrap
					text-overflow ellipsis
					display block
					line-height 16px
					color #6d757a
</style>