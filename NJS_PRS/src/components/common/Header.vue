<template>
  <div class="header" style="background-image: url('');background-color: #eff2f7">
  	<div class="header-layer"></div>
  	<div class="h-center">
        <el-dropdown menu-align='start' style="position: absolute;top:65px;left: 817px;padding: 6px 10px;background-color: rgb(239, 242, 247);color: #1f2d3d;border-radius: 4px;font-size:20px;">
            <i class="el-icon-menu"></i>
            <el-dropdown-menu slot="dropdown">
                <div style="padding: 9px;">
                    <span>自动加入追剧</span><el-switch style="margin-left: 30px;" v-model="value2" on-color="#13ce66" off-color="#ff4949"></el-switch>
                </div>
                <div style="padding: 9px;">
                    <span>新剧提醒</span><el-switch style="margin-left: 62px;" v-model="value2" on-color="#13ce66" off-color="#ff4949"></el-switch>
                </div>
                <!--<el-dropdown-item style="cursor: auto;">-->
                    <!--<span>自动加入追剧</span><el-switch style="margin-left: 30px;" v-model="value2" on-color="#13ce66" off-color="#ff4949">-->
                <!--</el-switch></el-dropdown-item>-->
                <!--<el-dropdown-item style="cursor: auto;">-->
                    <!--<span>新剧提醒</span><el-switch style="margin-left: 62px;" v-model="value2" on-color="#13ce66" off-color="#ff4949">-->
                <!--</el-switch></el-dropdown-item>-->
            </el-dropdown-menu>
        </el-dropdown>
      <search class="msearch"></search>
  	</div>
    <!--<Menu></Menu>-->
  </div>
</template>

<script>
import Search from 'components/common/Search'
import Menu from 'components/common/Menu'
export default {

    data() {
        return {
            value1: true,
            value2: true
        }
    },

  components: {
    Search,
    Menu
  }
}
</script>

<style lang="stylus">
 .header
    background transparent no-repeat center -10px
    position relative
    margin -42px auto 0
    .header-layer
    	height 170px
      position absolute
      top 0px
      left 0px
      width 100%
      z-index 10
    .header-link
    	position absolute
    	top 0px
    	left 0px
    	width 100%
    	height 170px
    	z-index 10
    .h-center
    	width 1110px
    	margin 0 auto
    	position relative
    	height 118px
    	transition .2s height
    	.logo
    		position absolute
    		width 220px
    		height 105px
    		left 24px
    		top 55px
    		background transparent no-repeat left center
    		z-index 100
    	.banner-title
    		position absolute
    		top 114px
    		left 255px
    		line-height 20px
    		padding 6px 10px
    		background-color rgba(0, 0, 0, 0.68)
    		color #fff
    		border-radius 4px
    		font-size 14px
    		max-width 350px
    		transition .2s
</style>
