import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'
import _ from 'lodash'

const state = {
    sortKeys: ['tv', 'movie', 'zy', 'dm', 'live',],
	sortIds: [1, 2, 3, 4, 5,],
	sortValues: ['电视剧', '电影', '综艺', '动漫', '直播',],
	rows: [],
	ranks: [],
	rank: {}
}

const myTv = {
    category: 'myTv',
	// item: [{area:'全部'}, {area:'电视剧'}, {area:'电影'}, {area:'综艺'}, {area:'动漫'}, {area:'直播'},],
    item: [],
    name: '我的追剧',
    b_id: 'b_myTv',
}

const getters = {
	rows: state => state.rows,
	sortKeys: state => state.sortKeys,
	sortIds: state => state.sortIds,
	ranks: state => state.ranks,
	rank: state => state.rank,
	sortValues: state => state.sortValues
}

const actions = {
	getContentRows({commit, state, rootState}) {
		rootState.requesting = true
		commit(TYPE.CONTENT_REQUEST)
		contentApi.contentByPost().then((response) => {
			console.log('getContentRows contentByPost response ', response)
			rootState.requesting = false
			if(_.isEmpty(response.err))
				commit(TYPE.CONTENT_SUCCESS, response)
			else {
                contentApi.contentByJsonp().then((response) => {
                    console.log('getContentRows contentByJsonp response ', response)
                    rootState.requesting = false
                    if(_.isEmpty(response.err))
                        commit(TYPE.CONTENT_SUCCESS, response)
                    else {
                        rootState.requesting = false
                        commit(TYPE.CONTENT_FAILURE)
                    }
                })
            }
		})
	},
	getContentRank({commit, state, rootState}, categoryId) {
		console.log(categoryId)
		rootState.requesting = true
		commit(TYPE.CONTENT_RANK_REQUEST)
		let param = {
			categoryId: categoryId
		}
		contentrankApi.contentrank(param).then((response) => {
			rootState.requesting = false
			if (categoryId === 1) {
				console.log(response)
			}
			commit(TYPE.CONTENT_RANK_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.CONTENT_RANK_FAILURE)
		})
	}
}

const mutations = {
	[TYPE.CONTENT_REQUEST] (state) {

	},
	[TYPE.CONTENT_SUCCESS] (state, response) {
        state.rows.push(myTv)
        for (let i in response) {
            let category = i;
            let rowItem = {
                category: category,
                categoryId: response[i].pd,
                name: response[i].name,
                b_id: `b_${category}`,
                item: response[i].areatype
            }
            state.rows.push(rowItem)
        }
		console.log('mutations state.rows', state.rows)

	},
	[TYPE.CONTENT_FAILURE] (state) {

	},

	[TYPE.CONTENT_RANK_REQUEST] (state) {

	},
	[TYPE.CONTENT_RANK_SUCCESS] (state, response) {
		state.ranks.push(response)
		state.rank = response
	},
	[TYPE.CONTENT_RANK_FAILURE] (state) {

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}