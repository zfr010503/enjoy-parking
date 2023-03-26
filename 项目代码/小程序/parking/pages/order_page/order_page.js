// pages/order_page/order_page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order:[
            {
                "state":"待停车",
                "free_text":"03 : 12",
                "parkinglot":"深圳大学沧海校区停车场",
                "parkingid":"P9-102-012",
                "order_time":"2022.6.3 15:30"
            },
            {
                "state":"待支付",
                "free_text":"28.00",
                "parkinglot":"腾讯大楼停车场",
                "parkingid":"P3-132-412",
                "order_time":"2022.5.23 14:30"
            },
            {
                "state":"已完成",
                "free_text":"点评一下停车感受吧",
                "parkinglot":"深圳大学沧海校区停车场",
                "parkingid":"P9-102-324",
                "order_time":"2022.5.21 11:35"
            },
            {
                "state":"已完成",
                "free_text":"点评一下停车感受吧",
                "parkinglot":"深圳大学停车场",
                "parkingid":"P9-152-512",
                "order_time":"2022.4.3 15:30"
            },
            {
                "state":"已完成",
                "free_text":"点评一下停车感受吧",
                "parkinglot":"深圳大学沧海校区停车场",
                "parkingid":"D9-112-012",
                "order_time":"2022.3.3 15:30"
            },
        ],
        active: 0,
    },

    tab_Change(event) {
        // console.log(event.detail);
        this.setData({
            active:event.detail.index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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