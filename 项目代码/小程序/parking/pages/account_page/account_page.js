// pages/account_page/account_page.js

import Toast from '@vant/weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        height: 0,
        message_on: true,
        locate_on: true,
    },

    message_switch({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ message_on: detail });
    },

    locate_switch({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ locate_on: detail });
    },
    
    login() {
        wx.getUserProfile({
          desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
              wx.login({
                success (res) {
                  if (res.code) {
                    console.log('登录成功！' + res.code);
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
            });
            Toast.success({
              message:"登录成功",
              duration:1500
            });
            //console.log(res.userInfo['nickName']);
            getApp().globalData.username = res.userInfo['nickName'];
            console.log(getApp().globalData.username);
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let screenHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
            height: screenHeight,
          });
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
        this.getTabBar().setData({
            active: 3
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