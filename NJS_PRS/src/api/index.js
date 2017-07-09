import * as url from './url'
import axios from 'axios'
import jsonp from 'jsonp'

//获取轮播图
export const bannerApi = {
	list() {
		return axios.get(url.banner).then((response) => {
			return response.data
		})
	}
}

// 排行榜
export const rankApi = {
	ranking3() {
		return axios.get(url.ranking3).then((response) => {
			return response.data
		})
	}
}

// 推广
export const promoteApi = {
	promote() {
		return axios.get(url.promote).then((response) => {
			return response.data
		})
	}
}

// 直播
export const liveApi = {
	live() {
		return axios.get(url.live).then((response) => {
			return response.data
		})
	}
}

// 具体内容
export const contentApi = {
    content() {
        return new Promise(function (resolve, reject) {
            jsonp(url.content, function (err, data) {
            	console.log('in contentApi', data)
                if (err) {
                    return reject(err)
                } else {
                    return resolve(data)
                }
            })
        }).then((response) => {
            return response.data
        })
    }
}

// 各个分类的具体数据
export const dataApi = {
    data(api) {
        return new Promise(function (resolve, reject) {
            jsonp(api, function (err, data) {
                console.log('in dataApi', data)
                if (err) {
                    return reject(err)
                } else {
                    return resolve(data)
                }
            })
        }).then((response) => {
            return response.data
        })
    }
}

// 具体内容的三日排行榜信息
export const contentrankApi = {
	contentrank(param) {
		return axios.post(url.contentrank, param).then((response) => {
			return response.data
		})
	},
	contentrankweek(param) {
		return axios.post(url.contentrankweek, param).then((response) => {
			return response.data
		})
	}
}
