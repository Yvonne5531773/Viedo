import * as url from './url'
import jsonp from 'jsonp'
import _ from 'lodash'

var safeJSONP = (function(){
    var workerArr = [];
    var callbacks = Object.create(null);
    var i = 1;
    var reg = /=\?(?=&|$)/;
    // var objectURL;
    var scriptFile = '../../static/work.js';
    function popWorker(){
        return workerArr.pop() || new Worker(scriptFile);
    }
    function clearWorkers(){
        for(var i=workerArr.length-1;i>-1;--i){
            var worker = workerArr[i];
            worker.terminate();
        }
        workerArr.length = 0;
    }
    var to;
    function pushWorker(worker){
        workerArr.push(worker);
        clearTimeout(to);
        to = setTimeout(clearWorkers, 10 * 1000);
    }
    return function(option, fn){
        var id = i;
        ++i;
        if(i === id){
            i = 1;
        }
        var url = option.url;
        var found = false;
        var callback = option.callback || ( 'callback' + id );
        var callback = "callback";
        url = url.replace(reg, function(){
            found = true;
            return '=' + callback;
        });
        if(!found){
            url = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + callback;
        }
        var worker = popWorker();
        worker.onmessage = function(e){
            var msg = e.data;
            if(msg && msg.i ){
                worker.onmessage = null;
                pushWorker(worker);
                var id = msg.i;
                var fn = callbacks[id];
                if(fn){
                    delete callbacks[id];
                    fn(msg.s, msg.r);
                }
            }
        };
        callbacks[id] = fn;
        worker.postMessage({
            u: url,
            i: id,
            r: callback
        });
    };
})();

// 具体内容 saveJsonp
export const contentApi = {
    content() {
        return new Promise(function (resolve, reject) {
            safeJSONP({url:url.content}, function (success, data) {
                console.log('in contentApi', data)
                if(data){
                    resolve(data)
                }else{
                    reject({})
                }
            })
        }).then((response) => {
            return response.data
        })
    }
}
// export const contentApi = {
//     content() {
//         return new Promise(function (resolve, reject) {
//             jsonp(url.content, function (err, data) {
//             	console.log('in contentApi', data)
//                 if (err) {
//                     return reject(err)
//                 } else {
//                     return resolve(data)
//                 }
//             })
//         }).then((response) => {
//             return response.data
//         })
//     }
// }

// 各个分类的具体数据 saveJsonp
export const dataApi = {
    data(api) {
        return new Promise(function (resolve, reject) {
            safeJSONP({url:api}, function (success, data) {
                console.log('in dataApi', data)
                if (data) {
                    return resolve(data)
                } else {
                    return reject({})
                }
            })
        }).then((response) => {
            return response.data
        })
    }
}
// export const dataApi = {
//     data(api) {
//         return new Promise(function (resolve, reject) {
//             jsonp(api, function (err, data) {
//                 console.log('in dataApi', data)
//                 if (err) {
//                     return reject(err)
//                 } else {
//                     return resolve(data)
//                 }
//             })
//         }).then((response) => {
//             return response.data
//         })
//     }
// }

//我的追剧数据
export const myTvApi = {
    getMyTv() {
        return new Promise(function (resolve, reject) {
            console.log('myTvApi')
            if(window.external.lego && window.external.lego.tvtrack.GetAllTV){
                window.external.lego.tvtrack.GetAllTV(function(data, str){
                    if(!_.isEmpty(str)){
                        return resolve(JSON.parse(str))
                    }else{
                        return reject('err')
                    }
                })
            }else return reject({})
        }).then((response) => {
            return response
        })
    }
}

