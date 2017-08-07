// pages/roulette-caicaicai/roulette-caicaicai.js
var app = getApp();

Page({
  data: {
    gragons: 0,
    phoenix: 0,
  },
  onHomePageTap: function () {
    wx.showModal({
      title: '您确定要返回主页？',
      content: '返回主页累计分数将全部失效',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../home/home',
          })
        }
      }
    })

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onDragonTap: function (event) {
    app.globalData.judge_dragon = true;
    app.globalData.judge_phoenix = false;
    var that = this;
    wx.navigateTo({
      url: 'roulette/roulette?gragons=' + that.data.gragons
    })
  },
  onPhoenixTap: function () {
    app.globalData.judge_dragon = false;
    app.globalData.judge_phoenix = true;
    var that = this;
    wx.navigateTo({
      url: 'roulette/roulette?phoenix=' + that.data.phoenix,
    })
  }
})