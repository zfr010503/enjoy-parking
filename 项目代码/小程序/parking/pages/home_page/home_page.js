// pages/home_page/home_page.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const citys = {
    北京: ['北京'],
    广东: ['东莞','广州','中山','深圳','惠州','江门','珠海','汕头','佛山','湛江','河源','肇庆','清远','潮州','韶关','揭阳','阳江','梅州','云浮','茂名','汕尾'],
    山东: ['济南','青岛','临沂','济宁','菏泽','烟台','淄博','泰安','潍坊','日照','威海','滨州','东营','聊城','德州','莱芜','枣庄'],
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({
    
    /**
     * 页面的初始数据
     */
    
    data: {
        subkey:'Y7XBZ-ZH6CD-PEN4V-HUXY3-PBEKH-V6BFF',
        latitude: 39.916527,
        longitude: 116.397128,
        scale: 18,
        rotate: 0,
        skew: 0,
        enable3d: true,
        showcompass: false,
        showscale: false,
        enablerotate: false,
        enableoverlooking: false,
        enablerotate: true,
        enablesatellite: false,
        enabletraffic: true,
        enablepoi: true,
        enablebuilding: true,
        showlocation: true,
        markers: [
            {
                id:1,
                title: '深圳大学粤海校区停车场',
                iconPath: '/image/parkinglot_icon.png',
                width: 32,
                height: 32,
                latitude: 22.532742,
                longitude: 113.936696,
                usable_parkingspace: 200
            },
            {
                id:2,
                title: '深圳大学沧海校区停车场',
                iconPath: '/image/parkinglot_icon.png',
                width: 32,
                height: 32,
                latitude: 22.53068,
                longitude: 113.94269,
                usable_parkingspace: 300
            },
            {
                id:3,
                title: '深圳大学正门-立德门',
                iconPath: '/image/parkinglot_icon.png',
                width: 32,
                height: 32,
                latitude: 22.53294,
                longitude: 113.93275,
                usable_parkingspace: 500
            },
            {
                id:4,
                title: '丰盛苑停车场',
                iconPath: '/image/parkinglot_icon.png',
                width: 32,
                height: 32,
                latitude: 22.607763,
                longitude: 113.092078,
                usable_parkingspace: 323
            },
        ],
        search_marker: [
            {
                id:0,
                title: '',
                iconPath: '/image/locate.png',
                width: 32,
                height: 38,
                latitude: 0,
                longitude: 0
            },
        ],
        show: false,
        show_search: false,
        show_city: false,
        currentMarker: 0,
        search_value: '',
        currentCity: '江门',
        navbarheight: 30,
        city_columns: [
            {
              values: Object.keys(citys),
              className: 'column1',
            },
            {
              values: citys['北京'],
              className: 'column2',
              defaultIndex: 2,
            },
          ],
    },
    city_select(e){
        console.log(e);
        const { picker, value, index } = e.detail;
        picker.setColumnValues(1, citys[value[0]]);
        this.setData({
            currentCity:e.detail.value[1]
        })
    },
    changeCity(){
        this.setData({
            show_city: true
        })
    },
    close_changeCity(){
        this.setData({
            show_city: false
        })
    },
    onClose() {
        this.setData({ show: false });
        this.getTabBar().setData({
            show_TabBar: true,
        })
      },
    tap_search(){
        this.setData({
            show_search: true,
        });
      },
    close_search(){
        this.setData({
            show_search: false,
        });
    },
    handleMarkerTap(e){
        console.log(e);
        const marker = this.data.markers.find(item => item.id == e.markerId);
        console.log(marker);
        this.setData({
            show: true,
            currentMarker: marker
        });
        this.getTabBar().setData({
            show_TabBar: false,
        })
    },
    open_navigation(){
        const latitude = this.data.currentMarker.latitude;
        const longitude = this.data.currentMarker.longitude;
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 18
        });
    },
    get_myLocation() {
        var that=this;
        const map = wx.createMapContext('map');
        map.moveToLocation();
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
    zoom_in() {
        var that=this
        const map = wx.createMapContext('map');
        var current_scale=0;
        map.getScale({
            success:function (e) {
                current_scale=e.scale;
            }
        })
        map.getCenterLocation({
            success(e){
                console.log(e)
                that.setData({
                    latitude: e.latitude,
                    longitude: e.longitude,
                    scale: current_scale + 1
                })
            }
        })
    },
    zoom_out() {
        var that=this
        const map = wx.createMapContext('map');
        var current_scale=0;
        map.getScale({
            success:function (e) {
                current_scale=e.scale;
            }
        })
        map.getCenterLocation({
            success(e){
                console.log(e)
                that.setData({
                    latitude: e.latitude,
                    longitude: e.longitude,
                    scale: current_scale - 1
                })
            }
        })
    },
    
    //触发关键词输入提示事件
    getsuggest: function(e) {
        var _this = this;
        //调用关键词提示接口
        qqmapsdk.getSuggestion({
        //获取输入框值并设置keyword参数
        keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
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
            _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
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
        },
    backfill: function (e) {
        console.log("点击");
        this.setData({
          showview: true
        })
        var id = e.currentTarget.id;
        const map = wx.createMapContext('map');
        for (var i = 0; i < this.data.suggestion.length; i++) {
          if (i == id) {
         this.setData({
              backfill: this.data.suggestion[i].title,
              latitude: this.data.suggestion[i].latitude,
              longitude: this.data.suggestion[i].longitude,
            });
            this.close_search();
          }
        }
        
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        qqmapsdk = new QQMapWX({
            key: 'FR3BZ-6TBRJ-AXKFN-KHW54-CNJSE-H7FDZ'
        });
        wx.getSystemInfo().then(res => {
            let H= res.statusBarHeight + (48 - 32) / 2
            this.setData({
                 navbarheight: H
             })
        });
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const map = wx.createMapContext('map');
        let timeout = setTimeout(function() {
            map.moveToLocation({
                complete: function (e) {
                    console.log(e)
                }
            })
            clearTimeout(timeout)
            timeout = null
        }, 500);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().setData({
            active: 0
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})