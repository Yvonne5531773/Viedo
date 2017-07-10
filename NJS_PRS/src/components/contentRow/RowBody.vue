<template>
	<div id="main" class="b-body">
		<div ref="listWrapper" >
			<ul class="vidbox v-list square-scene" v-if='list&&list.length!==0'>
				<RowItem :item="item" v-for="(item, index) in list" ></RowItem>
			</ul>
			<ul class="vidbox v-list square-scene" v-if='isMyTv&&myTv&&myTv.length!==0'>
				<RowItem :item="item" v-for="(item, index) in myTv"></RowItem>
			</ul>
		</div>
		<p class="noMyTvTips" v-if="isMyTv&&myTv.length===0">添加你喜欢的电视剧</p>
	</div>
</template>

<script>
import RowItem from 'components/contentRow/RowItem'
import { dataApi } from 'api'
import _ from 'lodash'

export default {
    data() {
        return {
            list: [],
        }
    },
	props: {
		api: {
			type: String
		},
		myTv: {
		    type: Array
		},
		isMyTv: {
		    type: Boolean
		}
	},
    watch: {
        api(val, oldVal) {
            if (val) {
                console.log('watch val',val)
//                this.$refs.listWrapper.style.marginLeft = '-100%'
                this.getItemData()
            } else {
//                this.$refs.listWrapper.style.marginLeft = '0%'
            }
        },
    },
    mounted() {
        this.getItemData()
    },
    methods: {
        getItemData() {
            if(!_.isEmpty(this.api)){
                dataApi.data(this.api).then((response) => {
                    console.log('getItemData response',response.list)
                    this.list = response.list;
                })
			}else{

			}
        }
    },
	components: {
		RowItem
	}
}
</script>

<style lang="stylus" scoped>
	.b-body
		margin-right -20px
		clear both
		.v-list
			height 795px
			overflow hidden
			padding-top 30px
			margin-left 45px
	.noMyTvTips
		padding 44px
		font-size 18px
		font-weight 600
</style>