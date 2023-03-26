// pages/serve_page/serve_page.js
Page({

    
    /**
     * 页面的初始数据
     */
    data: {
        info:'helloworld',
        count:0,
        input_test:'',
        type:1,
        img_1:'https://s4.ax1x.com/2022/03/05/bwBY28.png',
        img_2:'https://s4.ax1x.com/2022/03/05/bwBJ8f.png',
        img_3:'https://s4.ax1x.com/2022/03/05/bwBJ8f.png',
        img_list:[
            'https://s4.ax1x.com/2022/03/05/bwBY28.png',
            'https://s4.ax1x.com/2022/03/05/bwBJ8f.png',
            'https://s4.ax1x.com/2022/03/05/bwBJ8f.png'
        ]
    },
    btnTapHandler(){
        this.setData({
            count:this.data.count + 1
        })
    },
    plus(e){
        this.setData({
            count:this.data.count + e.target.dataset.n
        })
        /*console.log(e)*/
    },
    inputHandler(e){
        this.setData({
            input_test:e.detail.value
        })
        /*console.log(e)*/
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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