// pages/share_page/share_page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pick_day: false,
        pick_start_time: false,
        pick_end_time: false,
        current_id: 1,
        share_data:[
            {
                on_edit: false,
                parkinglot: '示例停车场',
                parkingid: 'A1',
                price: '4.0',
                phone: '150*****000',
                detail: '示例详细地址',
                day: ['周一','周二'],
                start_time: '00:00',
                end_time: '00:00',
            },
        ],
    },

    input_parkinglot: function (e) {
        var id = e.currentTarget.id;
        let set_parkinglot = "share_data["+id+"].parkinglot";
        this.setData({
            [set_parkinglot]:e.detail.value
        });
    },

    input_parkingid: function (e) {
        var id = e.currentTarget.id;
        let set_parkingid = "share_data["+id+"].parkingid";
        this.setData({
            [set_parkingid]:e.detail.value
        });
    },

    input_price: function (e) {
        var id = e.currentTarget.id;
        let set_price = "share_data["+id+"].price";
        this.setData({
            [set_price]:e.detail.value
        });
    },

    input_detail: function (e) {
        var id = e.currentTarget.id;
        let set_detail = "share_data["+id+"].detail";
        this.setData({
            [set_detail]:e.detail.value
        });
    },

    input_phone: function (e) {
        var id = e.currentTarget.id;
        let set_phone = "share_data["+id+"].phone";
        this.setData({
            [set_phone]:e.detail.value
        });
    },

    pop_start_time(){
        this.setData({
            pick_start_time: true
        }); 
    },

    pop_end_time(){
        this.setData({
            pick_end_time: true
        }); 
    },

    start_time_confirm(event) {
        //console.log(event.detail)
        var id = event.currentTarget.id;
        let set_start_time = "share_data["+id+"].start_time";
        this.setData({
            [set_start_time]:event.detail
        }); 
        this.onClose();
    },

    end_time_confirm(event) {
        //console.log(event.detail)
        var id = event.currentTarget.id;
        let set_end_time = "share_data["+id+"].end_time";
        this.setData({
            [set_end_time]:event.detail
        }); 
        this.onClose();
    },

    true(){

    },
    edit_current(e){
        var id = e.currentTarget.id;
        let set_on_edit = "share_data["+id+"].on_edit";
        this.setData({
            [set_on_edit]:true
        }); 
    },
    save_current(e){
        var id = e.currentTarget.id;
        let set_on_edit = "share_data["+id+"].on_edit";
        this.setData({
            [set_on_edit]:false
        }); 
    },
    delete_current(e){
        var id = e.currentTarget.id;
        var new_data=[];
        for (let i = 0, len = this.data.share_data.length; i < len; i++) {
            if (i != id) {
                new_data.push(this.data.share_data[i])
            }
        }
        this.setData({
            share_data:new_data
        }); 
    },

    pop_pickday(){
        this.setData({
            pick_day: true
        }); 
    },

    pickday_onChange(event) {
        //console.log(event)
        var id = event.currentTarget.id
        let setday = "share_data["+id+"].day";
        this.setData({
            [setday]:event.detail
        }); 
    },

    add_new(){
        var new_data=
            {
                on_edit: true,
                parkinglot: '',
                parkingid: '',
                price: '',
                phone: '',
                detail: '',
                day: ['周一'],
                start_time: '00:00',
                end_time: '00:00',
            };
        this.data.share_data.push(new_data);
        this.setData({
            share_data: this.data.share_data
        });
    },

    onClose() {
        this.setData({ 
            pick_day: false,
            pick_start_time: false,
            pick_end_time: false,
         });
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
        //wx.hideTabBar();//隐藏底部tabbar

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