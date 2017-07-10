<template>
  <div class="header" style="background-image: url('');background-color:#f5f5f5;position:fixed;width:100%;box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);z-index:999;">
  	<div class="header-layer"></div>
  	<div class="h-center">
      <!--<search class="msearch"></search>-->
  	</div>
    <!--<VMenu></VMenu>-->
  </div>
</template>

<script>
import Search from 'components/common/Search'
import VMenu from 'components/common/VMenu'
export default {

    data() {
        return {
            value1: true,
            value2: true
        }
    },

  components: {
    Search,
    VMenu
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
