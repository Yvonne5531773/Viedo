(function(){
    var Y={
        //上报 数字id, 数字type, '&value='+数字value+&value2='+数字value2
        Report:function(id,type,value,value2){
            if(!window.external.lego){
                return;
            }
            var r= window.external.lego.Common && window.external.lego.Common.Report ? window.external.lego.Common.Report:window.external.lego.Report;
            r(id,type,'&value='+value+'&value2='+value2);
        },
        SetButtonVisible:function(str){
            var r= external.lego.browser && external.lego.browser.SetButtonVisible ? external.lego.browser.SetButtonVisible:external.lego.Browser.SetButtonVisible;
            r(str);
        },
        Popup:function(str){
            var r=(external.lego.Browser && external.lego.Browser.HoldPopup)?external.lego.Browser.HoldPopup:external.lego.browser.Popup;
            r(str);
        },
        GetButtonVisible:function(fun){
            var r= external.lego.browser && external.lego.browser.GetButtonVisibleEx ? external.lego.browser.GetButtonVisibleEx:external.lego.browser.GetButtonVisible;
            return r(fun);
        },
        ExistsSameValues : function(a1, a2) {
            var exists = false;
            if(a1 instanceof Array && a2 instanceof Array)
            {
                for (var i=0,iLen=a1.length; i<iLen; i++)
                {
                    for (var j=0,jLen=a2.length; j<jLen; j++)
                    {
                        if (a1[i]===a2[j] && a1[i]!="其他")
                        {
                            return [true,a1[i]];
                        }
                    }
                }
            }
            return [exists,""];
        }
    };
    Y.Report(125,941,3,2);
    var href=window.location.href;
    var width = 675;
    var height =585;
    var gameUrl = chrome.runtime.getURL('index.html');
    var windowId;
    function createTab(){
        var w = screen.availWidth;
        var h = screen.availHeight;
        chrome.windows.create({
            url: gameUrl,
            type: 'popup',
            left: Math.floor((w - width)/2),
            top: Math.floor((h - height)/2),
            width: width,
            height: height
        }, function(win){
            if(win){
                windowId = win.id;
            }
        });
    }
    function Init(){
        chrome.tabs.query({}, function(a){
            try{
                for(var i=0;i<a.length;i++){
                    if(a[i].url=="chrome-extension://ombhgaiafibpphidclebhekcepalbfpk/index.html" || a[i].url=="chrome-extension://ombhgaiafibpphidclebhekcepalbfpk/web_app.html"){
                        //ombhgaiafibpphidclebhekcepalbfpk   jaggmlbbnfecccmjinedkcnbaofocfcn
                        chrome.windows.remove(a[i].windowId, function(){})
                    }
                }
                setTimeout(function(){
                    createTab();
                },200);
            }catch(err){
                createTab();
            }
        });
    }

    chrome.tabs.onActiveChanged.addListener(function(a,b){
        console.log(a,b)
        chrome.tabs.getAllInWindow(b.windowId, function(d){
            if(d && d.length && window.localStorage.getItem("tabs_pop_cont")){
                var tabs_pop_cont=window.localStorage.getItem("tabs_pop_cont");
                tabs_pop_cont=JSON.parse(tabs_pop_cont);
                for(var i=0;i<d.length;i++){
                    //console.log("tabs_pop_cont[d[i].url]:",d[i].active,tabs_pop_cont[d[i].url])
                    if(d[i].active && tabs_pop_cont[d[i].url]){
                        var tv_info=tabs_pop_cont[d[i].url].tv_info;
                        var is_added=tabs_pop_cont[d[i].url].is_added;
                        var is_accessed=tabs_pop_cont[d[i].url].is_accessed;
                        window.external.lego.tvtrack.GetConfigInfo("config_tip_popup",function(flag){
                            if(flag){
                                //alert(flag+"--"+tv_info+"--"+is_added+"--"+is_accessed);
                                //弹出加入追剧泡泡
                                if(tv_info && !is_added && !is_accessed){
                                    //getFileSystemReadFile();
                                    window.localStorage.setItem("page_tvpopup",tv_info);
                                    chrome.browserAction.setPopup({popup: "tvpopup.html"});
                                    if(external.lego.Common && external.lego.Common.GetInfo){
                                        external.lego.Common.GetInfo('{"version":""}',function(d){
                                            var version=JSON.parse(d).version.slice(4,6),i=0;
                                            if(version>=50) i=1;
                                            Y.Popup('{"popup":"'+i+'"}');
                                            //弹出后清除
                                            chrome.browserAction.setPopup({popup: ''});
                                        })
                                    }else{
                                        Y.Popup('{"popup":"0"}');
                                        //弹出后清除
                                        chrome.browserAction.setPopup({popup: ''});
                                    }
                                }
                            }
                        });
                        break;
                    }
                }
            }
        })
    })
    chrome.webRequest.onBeforeRequest.addListener(function(){
        Init();
    },{
        urls:[
            'chrome-extension://ombhgaiafibpphidclebhekcepalbfpk/newtab_click.txt'
        ]
    });

    //当地址栏图标被点击时触发
    chrome.browserAction.onClicked.addListener(Init);
    if(external.lego && external.lego.tvtrack.ExtensionStateChanged) external.lego.tvtrack.ExtensionStateChanged(0);
    var http_request;
    function send(url,callback){
        http_request = new XMLHttpRequest();
        http_request.onreadystatechange = callback;//指定请求返回时的回调函数
        http_request.open("GET", url,true);
        http_request.send();
    }
    function ajax_call_id(){
        //readyState共有5中状态，0未初始化，1已初始化，2发送请求，3开始接收结果，4接收结果完毕。
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                var str = JSON.parse(http_request.responseText);
                var area=str.data.area;
                TJTvtrack.cate=str.data.cate;
                send("http://tv.duba.com/liebaoapi_gettop.html?page=1&perpage=50&area="+area+"&state=0&random="+Math.random(),ajax_call_back);
            }else{
                console.log("Ajax请求失败，错误状态为："+http_request.status);
            }
        }
    }
    function ajax_call_back(){
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                var str = JSON.parse(http_request.responseText);
                TJTvtrack.topRecommendedCallback(str.data.list);
            }else{
                console.log("Ajax请求失败，错误状态为："+http_request.status);
            }
        }
    }
    function ajax_call_AllTV_Error(){

        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                var _d=JSON.parse(http_request.responseText);
                _d=_d.data;
                window.external.lego.tvtrack.RemoveTVByID("198884");
                Y.Report(125,45,"3","");
                window.external.lego.tvtrack.AddTVByJson(JSON.stringify(_d),function(){});
            }else{
                console.log("Ajax请求失败，错误状态为："+http_request.status);
            }
        }
    }
    var TJTvtrack={
        cate:[],
        type:0,
        id:0,
        tj:{},
        myAllTV:null,
        //取出所有追剧数据
        GetAllTV:function(){
            window.external.lego.tvtrack.GetAllTV(TJTvtrack.GetAllTVCallback);
        },
        GetAllTVCallback:function(d,str){
            var data=JSON.parse(str);
            var arrName=[];
            TJTvtrack.myAllTV=data;
            for(var i=0;i<data.length;i++){
                if(data[i].id=="198884" && data[i].current>50){
                    Y.Report(125,45,"1","");
                    send("http://tv.duba.com/liebaoapi_idsearch.html?id=233034&action=true&random="+Math.random(),ajax_call_AllTV_Error);
                }
                //上报合成一条上报
                if(!data[i].complete){
                    arrName.push(encodeURIComponent(data[i].name)+":"+data[i].current);
                    //Y.Report(125,46, data[i].name, data[i].current);
                }
            }
            if(arrName.length>0){
                Y.Report(125,46, JSON.stringify(arrName) , "");
            }
            if(data.length>0){
                var state=TJTvtrack.tjStateStorage();
                //state=true;
                if(state){
                    TJTvtrack.type=TJTvtrack.myAllTV[0].type;
                    TJTvtrack.id=TJTvtrack.myAllTV[0].id;
                    send("http://tv.duba.com/liebaoapi_idsearch.html?id="+TJTvtrack.id+"&action=true&random="+Math.random(),ajax_call_id);
                }
            }
        },
        tjStateStorage:function(){
            var data=TJTvtrack.myAllTV;
            var state=true;
            for(var i=0;i<data.length;i++){
                if(data[i].complete==false){
                    state=false;
                    break;
                }
            }
            var tj={
                num:0,
                date:TJTvtrack.date()
            }
            if(state){
                var tj_state=window.localStorage.getItem("tj_state");
                if(tj_state){
                    var dt=JSON.parse(tj_state);
                    if(tj_state && tj.date!=dt.date){
                        tj.num=parseInt(dt.num)+1;
                    }else{
                        tj.num=dt.num;
                        state=false;
                    }
                }else{
                    tj.num=1;
                }
                if(!(tj.num==2 || tj.num ==5 || tj.num ==10)){
                    state=false;
                }
            }
            TJTvtrack.tj=tj;
            window.localStorage.setItem("tj_state",JSON.stringify(tj));
            if(window.localStorage.getItem("tj_state_tj")) state=true;
            return state;
        },
        topRecommendedCallback:function(d){
            if(d){
                var tvFlag=false;
                var arr={
                    json:"",
                    type:""
                }
                for(var j=0;j<d.length;j++){
                    var flag=Y.ExistsSameValues(TJTvtrack.cate,d[j].cate);
                    if(flag[0]){
                        tvFlag=true;
                        arr.json=d[j];
                        arr.type=flag[1];
                        window.localStorage.setItem("tj_RecommendInfo",JSON.stringify(arr));
                        break;
                    }
                }
                //tvFlag=false;
                if(!tvFlag){
                    arr.json=d[0];
                    window.localStorage.setItem("tj_RecommendInfo",JSON.stringify(arr));
                    tvFlag=true;
                }
                if(tvFlag){
                    var tvTabsonRemoved=false;
                    chrome.tabs.onRemoved.addListener(function(windowId) {
                        if(tvTabsonRemoved) return false;
                        chrome.browserAction.setPopup({popup: "tuijian.html"});
                        if(external.lego.Common && external.lego.Common.GetInfo){
                            external.lego.Common.GetInfo('{"version":""}',function(d){
                                var version=JSON.parse(d).version.slice(4,6),i=0;
                                if(version>=50) i=1;
                                Y.Popup('{"popup":"'+i+'"}');
                                //弹出后清除
                                chrome.browserAction.setPopup({popup: ''});
                            })
                        }else{
                            Y.Popup('{"popup":"0"}');
                            //弹出后清除
                            chrome.browserAction.setPopup({popup: ''});
                        }
                        window.localStorage.setItem("tj_state_tj",JSON.stringify(TJTvtrack.tj));
                        tvTabsonRemoved=true;
                    });
                }else{
                    console.log("没有匹配上数据");
                }
            }
        },
        date:function(){
            var myDate = new Date();
            myDate=myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDate();
            return myDate;
        }
    }
    setTimeout(function(){
        TJTvtrack.GetAllTV();
    },5000);

    let getOperationTime = (date) => {
        var updateDate = new Date(date);
        if (!updateDate) {
            return '';
        }
        var month = updateDate.getMonth() < 10 ? '0' + updateDate.getMonth() : updateDate.getMonth();
        month ++;
        var day = updateDate.getDate() < 10 ? '0' + updateDate.getDate() : updateDate.getDate();
        var hour = updateDate.getHours() < 10 ? '0' + updateDate.getHours() : updateDate.getHours();
        return time = '' + updateDate.getFullYear() +  month + day + hour;
    }

    function getFileSystemReadFile(){
        external.lego.FileSystem.ReadFile("useridletime",1000000, function(base64String){
            var dates=new Date(new Date().getTime()+900000);
            var time=dates.getHours();
            var day = getOperationTime(dates);
            var timeArr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            timeArr[time]=timeArr[time]+1;
            var str='{"useridletime_time":'+JSON.stringify(timeArr)+',"useridletime_day":'+day+'}';
            var useridletime=JSON.parse(base64String);
            useridletime=useridletime.data;
            if(useridletime){
                try{
                    var object=atob(useridletime).replace(/\0+$/,'');
                    object=JSON.parse(object);
                    var timeArrOld=object.useridletime_time;
                    if(object.useridletime_day==day) return false;
                    if(timeArrOld){
                        timeArrOld[time]=timeArrOld[time]+1;
                    }
                    str='{"useridletime_time":'+JSON.stringify(timeArrOld)+',"useridletime_day":'+day+'}';

                    setFileSystemReadFile(str,2);
                }catch(e){
                    setFileSystemReadFile(str,3);
                }

            }else{
                setFileSystemReadFile(str,1);
            }
            Y.Report(125,41,time,"");
        });
    }
    function setFileSystemReadFile(str,index){
        external.lego.FileSystem.WriteFile("useridletime", btoa(str), function(id){})
    }
    function OnVisitTVPageFunction(url,tab_id,is_added,is_accessed,tv_info){
        window.external.lego.tvtrack.GetConfigInfo("config_tip_popup",function(flag){
            var _json=JSON.parse(tv_info);
            if(flag && _json["class"] != "1"  && !is_accessed){
                var tj_state_tj={},new_tj_state_tj={};
                tj_state_tj[url]={
                    "tab_id":tab_id,
                    "is_added":is_added,
                    "is_accessed":is_accessed,
                    "tv_info":tv_info
                };
                if(!window.localStorage.getItem("tabs_pop_cont")){
                    window.localStorage.setItem("tabs_pop_cont",JSON.stringify(tj_state_tj));
                }else{
                    new_tj_state_tj=window.localStorage.getItem("tabs_pop_cont");
                    new_tj_state_tj=JSON.parse(new_tj_state_tj);
                    new_tj_state_tj[url]=tj_state_tj[url];
                    window.localStorage.setItem("tabs_pop_cont",JSON.stringify(new_tj_state_tj));
                }
                chrome.tabs.query({},function(d){
                    var tabFlag=false;
                    if(d){
                        for(var i=0;i<d.length;i++){
                            if(d[i].active){
                                if(d[i].url==url){
                                    tabFlag=true;
                                    //alert(tabFlag+"--"+d[i].url+"----"+url);
                                    //弹出加入追剧泡泡
                                    if(tv_info && !is_added){
                                        getFileSystemReadFile();
                                        window.localStorage.setItem("page_tvpopup",tv_info);
                                        chrome.browserAction.setPopup({popup: "tvpopup.html"});
                                        if(external.lego.Common && external.lego.Common.GetInfo){
                                            external.lego.Common.GetInfo('{"version":""}',function(d){
                                                var version=JSON.parse(d).version.slice(4,6),i=0;
                                                if(version>=50) i=1;
                                                Y.Popup('{"popup":"'+i+'"}');
                                                //弹出后清除
                                                chrome.browserAction.setPopup({popup: ''});
                                            })
                                        }else{
                                            Y.Popup('{"popup":"0"}');
                                            //弹出后清除
                                            chrome.browserAction.setPopup({popup: ''});
                                        }
                                    }
                                    //去掉new图标
                                    if(tv_info && is_added){
                                        var _json=JSON.parse(tv_info);
                                        window.external.lego.tvtrack.GetAllTV(function(d,str){
                                            var data=JSON.parse(str);
                                            if(data && data.length){
                                                var is_new=false;
                                                for(var i=0;i<data.length;i++){
                                                    if(is_new) break;
                                                    if((data[i].id==_json.id) && data[i].updated){
                                                        for(var k=data[i].updated.length-1;k>=0;k--){
                                                            if(data[i].updated[k].is_new){
                                                                is_new=true;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                                if(is_new){
                                                    Y.Report(125,40,"3",window.referrer);
                                                    window.external.lego.tvtrack.VisitTV(String(_json.id),"");
                                                }
                                            }
                                        });
                                    }
                                }
                                break;
                            }
                        }
                    }
                })
                return false;
            }
        });

    }
    chrome.lego && chrome.lego.Events.addEventListener('TVTrack.OnVisitTVPage', OnVisitTVPageFunction);
    window.localStorage.removeItem("tabs_pop_cont");

    function ajax_call_AllTV_duba(){
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                var _d=JSON.parse(http_request.responseText);
                window.external.lego.tvtrack.AddTVByJson(JSON.stringify(_d.data),function(d){});
            }else{
                console.log("Ajax请求失败，错误状态为："+http_request.status);
            }
        }
    }
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        var liebao_backtotop=window.localStorage.getItem("liebao_backtotop");
        if(request.greeting == "liebao_backtotop_1"){
            var url="http://tv.duba.com/liebaoapi_idsearch.html?id="+request.data+"&action=true&random="+Math.random();
            send(url,ajax_call_AllTV_duba);
        }
        if(request.greeting == "liebao_backtotop_2"){
            window.external.lego.tvtrack.GetAllTV(function(d,str){
                var data=JSON.parse(str);
                var flagduba=false;
                for(var i=0;i<data.length;i++){
                    if(data[i].id==request.vid){
                        flagduba=true;
                    }
                }
                sendResponse(flagduba);
            });
            return true;
        }
    });
})();
