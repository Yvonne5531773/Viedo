<template>
	<li class="item-li tab-box-shadow" >
		<div class="v m300">
			<!-- 上部分 -->
			<a class="preview cover-preview" target="_blank" :href="item.coverUrl">
				<!-- 背景图片 -->
				<div class=image>
					<img class="front face" v-lazy="item.coverImage" style='background-size:cover;'/>
					<!--<div class=overlay>-->
						<!--<div class=edit>-->
							<!--<a class=edit-same target=_blank href='' style="margin-bottom: 10px">-->
								<!--&lt;!&ndash;<em class=eqf-eye style=font-size:20px></em>&ndash;&gt;-->
								<!--&lt;!&ndash;<span>加入追剧</span>&ndash;&gt;-->
								<!--<el-button type="warning" size="small">加入追剧</el-button>-->
							<!--</a>-->
						<!--</div>-->
					<!--</div>-->
				</div>

				<div class="back">
					<div>
					</div>
				</div>
				<!--<div class="fore">-->
					<!--<span data-loading="false"></span>-->
					<!--<div class="bar">-->
						<!--<div></div>-->
					<!--</div>-->
				<!--</div>-->

				<div class="x">
					<b class="x2">{{item.duration}}</b>
				</div>
			</a>
			<!-- 下部分 -->
			<div :title="item.title" target="_blank" class=project-info style="padding: 13px 0px;height:170px;opacity:0.8;">
				<p class=ellipsis>{{item.title}}</p>
			</div>
			<!--<a :title="item.title" target="_blank">-->
			<!--<div class="t">{{item.title}}</div>-->
			<!--<div class="i">-->
			<!--<span>-->
			<!--<i class="b-icon b-icon-v-play"></i>{{item.play}}-->
			<!--</span><span>-->
			<!--<i class="b-icon b-icon-v-dm"></i>-->
			<!--{{item.video_review}}-->
			<!--</span>-->
			<!--</div>-->
			<!--</a>-->
		</div>
	</li>
</template>

<script>

    export default {

        props: {
            item: {
                type: Object
            }
        }

    }
</script>

<style lang="stylus" scoped>
	.tab-box-shadow
		box-shadow 0 1px 1px rgba(0,0,0,.1)
	.item-li
		float left
		margin 0 50px 30px 0
		.v
			position relative
			width 200px
			height 380px
			font-size 12px
			overflow hidden
			transition all .3s linear
			.x
				visibility hidden
				opacity 0
			.cover-preview
				position relative
				.back
					position absolute
					top 0px
					left 0px
					width 100%
					height 100%
					opacity 0
					z-index 0
				.fore
					position absolute
					top 0px
					left 0px
					width 100%
					height 100%
					opacity 0
					z-index 0
					transition opacity .2s
					background-color rgba(0,0,0,0.2)
					.bar
						margin 5px
						height 2px
						background-color rgba(255,255,255,0.4)
						border-radius 1px
						opacity 0
						transition opacity .2s .3s
						div
							height 2px
							border-radius 1px
				.x
					position absolute
					z-index 4
					top 0px
					left 0px
					bottom 0px
					right 0px
					line-height 20px
					width 100%
					height 100%
					background rgba(0,0,0,0.2)
					overflow hidden
					transition .2s
					border-top-left-radius 4px
					.x2
						position absolute
						right 0
						bottom 0px
						margin 0 5px 0 5px
						font-weight normal
						font-family tahoma,arial,'宋体',sans-serif
						color #fff
				.medal
					opacity 1
					transition opacity .2s
				&:hover
					.medal
						opacity 0
					.fore
						opacity 1
						.bar
							opacity 1
			.preview
				display block
				overflow hidden
				text-align center
				transition .2s all linear
				box-sizing border-box
				z-index 0
				border-radius 4px
				-webkit-mask-image -webkit-radial-gradient(circle, white, black)
				.medal
					position absolute
					left 0
					top 0px
					width 40px
					height 24px
					background url(../../assets/images/icons.png) no-repeat
					z-index 5
					pointer-events none
					background-position -849px -148px
					transition opacity .2x
					opacity 1
				img
					width 100%
					height 300px
					display block
					margin 0 auto
					outline 0
			.t
				margin-bottom 8px
				padding-top 8px
				height 20px
				line-height 20px
				transition all .2s linear
				color #222
				word-wrap break-word
				word-break break-all
				overflow hidden
				text-align left
			.i
				margin 0
				font-size 12px
				line-height 12px
				span
					display inline-block
					vertical-align top
					color #99a2aa
					width 80px
					white-space nowrap
					overflow hidden
					text-overflow ellipsis
					line-height 12px
					height 14px
					.b-icon
						display inline-block
						width 12px
						height 12px
						vertical-align middle
						background url(../../assets/images/icons.png) no-repeat
						vertical-align top
						margin-right 5px
						&.b-icon-v-play
							background-position -282px -90px
						&.b-icon-v-dm
							background-position -282px -218px
			&:hover
				.t
					height 40px
					color #00a1d6
				.x
					opacity 1
					visibility visible


</style>