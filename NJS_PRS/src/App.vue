<template>
  <div id="app">
    <!--<TopContainer></TopContainer>-->
    <VHeader></VHeader>
    <!--<div class="fillcontain">-->
      <!--<el-row style="height: 100%;">-->
        <!--<el-col :span="3"  style="min-height: 100%; background-color: #324057;">-->
          <!--<el-menu style="min-height: 100%;" theme="dark" router>-->
            <!--<el-menu-item index="1"><i class="el-icon-menu"></i>首页</el-menu-item>-->
            <!--<el-menu-item index="2"><i class="el-icon-menu"></i>首页</el-menu-item>-->
            <!--<el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>-->
            <!--<el-menu-item index="4"><i class="el-icon-menu"></i>首页</el-menu-item>-->
            <!--<el-menu-item index="5"><i class="el-icon-menu"></i>首页</el-menu-item>-->
          <!--</el-menu>-->
        <!--</el-col>-->
        <!--<el-col :span="21" style="height: 100%;overflow: auto;">-->
          <!--<VContent :rows="rows"></VContent>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->
    <VContent :rows="rows"></VContent>
    <NavSide :options="options" v-on:change="isShowMask"></NavSide>
    <div class="wnd-mask" ref="mask" v-show="showMask"></div>
  </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import VHeader from 'components/common/VHeader.vue'
import VContent from 'components/content/VContent.vue'
import NavSide from 'components/nav/NavSide'

import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    TopContainer,
    VHeader,
    VContent,
    NavSide
  },
  mounted() {
    this.$store.dispatch('getContentRows')  //get content rows data
  },
  data() {
    return {
      showMask: false
    }
  },
  watch: {
    options() {
      console.log('options 变化了')
    },
    items() {
      console.log('items 变化了')
    }
  },
  computed: {
    ...mapGetters([
      'requesting',
      'error',
      'rows'
    ]),
    options() {
      let options = {
        offset: 100, //偏移的距离
        items: this.rows,
        offsetTop: 0 //距离顶部距离
      }
      return options
    }
  },
  methods: {
    isShowMask() {
      this.showMask = !this.showMask
    }
  }
}
</script>

<style lang="stylus">
  #app 
    font-family "Microsoft YaHei",Arial,Helvetica,sans-serif
    -webkit-font-smoothing antialiased
    font-size 12px
    margin 0
    padding 0
    background #fff
    color #222
    min-width 990px
    tap-highlight-color transparent
    -webkit-tap-highlight-color transparent
    .fillcontain
      height 100%
      width 100%
      position fixed
    .wnd-mask
      position fixed
      width 100%
      height 150%
      background-color #000
      opacity .5!important
      z-index 1000
      top 0px
      left 0px
      transition .2s
</style>
