import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'


const state = {
    sortKeys: ['tv', 'movie', 'zy', 'dm', 'live',],
	sortIds: [1, 2, 3, 4, 5,],
	sortValues: ['电视剧', '电影', '综艺', '动漫', '直播',],
	rows: [],
	ranks: [],
	rank: {}
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
		contentApi.content().then((response) => {
			console.log('response ', response)
			rootState.requesting = false
			commit(TYPE.CONTENT_SUCCESS, response)
		}, (error) => {
			rootState.requesting = false
			commit(TYPE.CONTENT_FAILURE)
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
		// for(let key of state.sortKeys) {
		// 	// console.log(JSON.stringify(Object.values(response[key])))
		// 	let rowItem = {
		// 		categoty: 0,
		// 		key: response[key],
		// 		data: Object.values(response[key])
		// 	}
		// 	// state.rows.push(rowItem)
		// 	state.rows.push(Object.values(response[key]))
		// }
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