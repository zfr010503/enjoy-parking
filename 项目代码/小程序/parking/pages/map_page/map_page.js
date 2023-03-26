// pages/map_page/map_page.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: 0,
        width: 0,
        show: false,
        focus: false,
        subkey:'Y7XBZ-ZH6CD-PEN4V-HUXY3-PBEKH-V6BFF',
        latitude: 39.916527,
        longitude: 116.397128,
        scale:18,
        suggestion:{},
    },

    showPopup() {
        this.setData({
            show: true
        });
        this.setData({
            focus: true
        });
    },
    onClose() {
        this.setData({
            show: false
        });
        this.setData({
            focus: false
        });
    },

    //将地图中心设置为我的位置
    get_myLocation() {
        var that=this;
        const map = wx.createMapContext('map');//创建map对象
        map.moveToLocation();//将地图中心移置当前定位点
        //获取我的定位坐标
        wx.getLocation({
            type: 'gcj02',
            success(e){
                that.setData({
                    latitude: e.latitude,
                    longitude: e.longitude
                })
            }
        })
    },

    //触发关键词输入提示事件
    getsuggest: function(e) {
        var that = this;

        if(e.detail.value!='')//判断输入框不为空
        {
            //调用关键词提示接口
            qqmapsdk.getSuggestion({
                //获取输入框值并设置keyword参数
                keyword: e.detail.value, //用户输入的关键词
                //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
                success: function(res) {//搜索成功后的回调
                    console.log(res);
                    var sug = [];
                    for (var i = 0; i < res.data.length; i++) {
                    sug.push({ // 获取返回结果，放到sug数组中
                        title: res.data[i].title,
                        id: res.data[i].id,
                        addr: res.data[i].address,
                        city: res.data[i].city,
                        district: res.data[i].district,
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng
                    });
                    }
                    that.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
                        suggestion: sug
                    });
                },
                fail: function(error) {
                    console.error(error);
                },
                complete: function(res) {
                    console.log(res);
                }
            });
        }
    },

    //地图中心移动到点击的地址
    backfill: function (e) {
        this.setData({
            show: false
        })
        var id = e.currentTarget.id;
        this.setData({
              latitude: this.data.suggestion[id].latitude,
              longitude: this.data.suggestion[id].longitude,
        });//改变地图中心点参数
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.get_myLocation();
        qqmapsdk = new QQMapWX({
            key: 'FR3BZ-6TBRJ-AXKFN-KHW54-CNJSE-H7FDZ'
        });//初始化腾讯地图sdk
        this.setData({
            height: wx.getSystemInfoSync().windowHeight,
            width: wx.getSystemInfoSync().windowWidth,

        })//获取屏幕高度和宽度
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})