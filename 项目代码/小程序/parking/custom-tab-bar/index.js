// custom-tab-bar/index.js

Page({
    /**
     * 页面的初始数据
     */
    data: {
       show_TabBar: true,
        active: 0,
        list: [
          {
            "pagePath": "/pages/home_page/home_page",
            "text": "首页",
            "iconPath": "image/home.png",
            "selectedIconPath": "image/home_selected_new.png"
          },
          {
            "pagePath": "/pages/navigate_page/navigate_page",
            "text": "停车",
            "iconPath": "image/navigate.png",
            "selectedIconPath": "image/navigate_selected.png"
          },
          {
            "pagePath": "/pages/order_page/order_page",
            "text": "订单",
            "iconPath": "image/service.png",
            "selectedIconPath": "image/service_selected.png"
          },
          {
            "pagePath": "/pages/account_page/account_page",
            "text": "我的",
            "iconPath": "image/account.png",
            "selectedIconPath": "image/account_selected.png"
          }]
    },
    onChange(e) {
        // event.detail 的值为当前选中项的索引
        this.setData({ active: e.detail });
        wx.switchTab({
          url: this.data.list[e.detail].pagePath,
        })
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