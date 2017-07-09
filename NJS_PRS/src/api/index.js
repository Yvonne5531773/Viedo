import * as url from './url'
import jsonp from 'jsonp'


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

