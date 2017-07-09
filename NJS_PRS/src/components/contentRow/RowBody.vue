<template>
	<div id="main" class="b-body">
		<div ref="listWrapper">
			<ul class="vidbox v-list square-scene">
				<RowItem :item="item" v-for="(item, index) in list" v-if='list'></RowItem>
			</ul>
		</div>
	</div>
</template>

<script>
import RowItem from 'components/contentRow/RowItem'
import { dataApi } from 'api'

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
            dataApi.data(this.api).then((response) => {
                console.log('getItemData response',response.list)
                this.list = response.list;
            })

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
			width 125%
			height 530px
			overflow hidden
			padding-top 20px
			margin-left 45px
</style>