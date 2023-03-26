// pages/navigate_page/navigate_page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Lock_data: [
            {
                'name': 'Lock_01',
                'rssi': 0,
                'distance': 0
            },
            {
                'name': 'Lock_02',
                'rssi': 0,
                'distance': 0
            },
            {
                'name': 'Lock_03',
                'rssi': 0,
                'distance': 0
            }
        ],
        Lock_name: [
            'Lock_01','Lock_02','Lock_03'
        ],
        txPower: 85,
        distance: 0,
        timer: '',
        my_x: 0,
        my_y: 0,
        my_ly: 0,
        D1: 0,
        D2: 0,
        D3: 0,
        uuids: [
            '17320508-0756-8877-2935-274463415059',
        ],
        beacons_dis: 1,
        rssi:0,
        lrssi:0,
        i:0,
        second:0
    },

    findBeacon(){
        var that=this;
        // wx.startBluetoothDevicesDiscovery({
        //     complete: function (params) {
        //         //console.log(params)
        //     }
        // });
        // for(var n=0;n<5;n++)
        // {
        //     wx.getBluetoothDevices({
        //         success: function name(res) {
        //             //console.log(res);
        //             res.devices.forEach(function (device) {
        //                 //console.log(device);
        //                 // console.log(that.data.Lock_name);
        //                 var i=that.data.Lock_name.indexOf(device.name);
        //                 if(i>-1)
        //                 {
        //                     //console.log("------");
        //                     that.data.Lock_data[i].rssi=device.RSSI;
        //                     //console.log(that.data.Lock_data[i].rssi);
        //                     //console.log("------");
        //                     var distance=Math.pow(10, (Math.abs(device.RSSI)-75 )/ (10 * 4.0));
        //                     that.data.Lock_data[i].distance+=distance;
        //                 }
        //             })
        //         }
        //     });
        // };
        // for(var i=0;i<3;i++)
        // {
        //     that.data.Lock_data[i].distance=that.data.Lock_data[i].distance/5;
        // }
        // var x=0;
        // var y=0;
        // var d1=that.data.Lock_data[0].distance;
        // var d2=that.data.Lock_data[1].distance;
        // var d3=that.data.Lock_data[2].distance;
        // x=(1+Math.pow(d1,2)-Math.pow(d2,2))/2;
        // y=(4+Math.pow(d3,2)-Math.pow(d2,2))/4;
        // that.setData({
        //     distance: that.data.Lock_data[0].distance,
        //     my_y: y,
        //     my_x: x,
        //     D1: d1,
        //     D2: d2,
        //     D3: d3,

        // }) ;
        // console.log(that.data.Lock_data[0].distance)

        wx.startBeaconDiscovery({
          uuids: that.data.uuids,
          complete: function (params) {
              //console.log(params);
          }
        })
        wx.getBeacons({
          success: (result) => {
              console.log(result);
              for(var i=0;i<2;i++)
            {
                //console.log(result.beacons[i].minor)
                if(result.beacons[i].minor==18403)
                {
                    var distance=Math.pow(10, (Math.abs(result.beacons[i].rssi)-55 )/ (10 * 2.0));
                    that.setData({
                    rssi:result.beacons[i].rssi,
                    D1:distance,
                    my_y:distance,
                    });
                }
                else if(result.beacons[i].minor==18404)
                {
                    var distance=Math.pow(10, (Math.abs(result.beacons[i].rssi)-55 )/ (10 * 2.0));
                    that.setData({
                    D2:distance,
                    });
                }
            };
            var cos1 = (Math.pow(that.data.D2,2)+Math.pow(that.data.beacons_dis,2)-Math.pow(that.data.D1,2))/(2*that.data.D2*that.data.beacons_dis);
            var sin1 = Math.pow((1-Math.pow(cos1,2)),0.5);
            var cos2 = (Math.pow(that.data.D1,2)+Math.pow(that.data.beacons_dis,2)-Math.pow(that.data.D2,2))/(2*that.data.D1*that.data.beacons_dis);
            var sin2 = Math.pow((1-Math.pow(cos2,2)),0.5);
            var x=(that.data.D1*sin1+that.data.beacons_dis-that.data.D2*sin2)/2;
            var y=(that.data.D1*cos1+that.data.D2*cos2)/2;
            // this.setData({
            //     my_x: x,
            //     my_y: y
            // })
          },
        })

    },
    /**
   * 启动定时器
   */
  startTimer(){
    var that = this;
    var newtimer = setInterval(
        function () {
            that.setData({
                timer: newtimer
            });
            // 无限循环执行的任务
            that.findBeacon();
            that.draw();
            that.setData({
                i: that.data.i+0.5,
                second: that.data.second+1
            });
            if(that.data.second%10===0)
            {
                that.draw_second();
            }
        }, 100);    
  },
  draw_second(){
    var that=this;
    const query = wx.createSelectorQuery();
    query.select('#indoor_map').fields({ node: true, size: true }).exec((res) =>{
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        ctx.beginPath(); 
        ctx.moveTo((that.data.i-1), 0);
        ctx.lineTo(that.data.i, 400);
        ctx.strokeStyle='#1d78fa';
        ctx.stroke();
        ctx.closePath();
    })
  },
  draw(){
    var that=this;
    const query = wx.createSelectorQuery();
    query.select('#indoor_map').fields({ node: true, size: true }).exec((res) =>{
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        ctx.beginPath(); 
        ctx.moveTo((that.data.i-1), that.data.my_ly*80);
        ctx.lineTo(that.data.i, that.data.my_y*80);
        ctx.strokeStyle='white';
        ctx.stroke();
        ctx.closePath();
        that.data.my_ly=that.data.my_y;
        ctx.beginPath(); 
        ctx.moveTo((that.data.i-1), -that.data.lrssi*5);
        ctx.lineTo(that.data.i, -that.data.rssi*5);
        ctx.strokeStyle='red';
        ctx.stroke();
        ctx.closePath();
        that.data.lrssi=that.data.rssi;
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.openBluetoothAdapter({
            complete: function (e) {
                console.log(e)
            }
        });
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    //     const query = wx.createSelectorQuery()
    //     query.select('#myCanvas')
    //   .fields({ node: true, size: true })
    //   .exec((res) => {
    //     const canvas = res[0].node
    //     const ctx = canvas.getContext('2d')

    //     const dpr = wx.getSystemInfoSync().pixelRatio
    //     canvas.width = res[0].width * dpr
    //     canvas.height = res[0].height * dpr
    //     ctx.scale(dpr, dpr)

    //     ctx.fillRect(0, 0, 100, 100)
    //   })
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().setData({
            active: 1
        });
        this.startTimer();
        var that=this;
    const query = wx.createSelectorQuery();
    query.select('#indoor_map').fields({ node: true, size: true }).exec((res) =>{
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        canvas.width = 300
        canvas.height = 400
        ctx.beginPath();
        ctx.fillStyle ="#226bf3";
        ctx.fillRect(0, 0, 300, 400) 
        ctx.closePath();
       })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        clearInterval(this.data.timer);
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