function wave_action(event, that) {
  var x = event.touches[0].pageX;
  var y = event.touches[0].pageY + 85;
  that.setData({
    rippleStyle: ''
  });
  that.setData({
    rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
  });
};

Page({
  onSwiperTap1: function (event) {
    wx.navigateTo({
      url: '../introduction/introduction',
    })
  },
  onSwiperTap2: function (event) {
    wx.navigateTo({
      url: '../author/author',
    })
  },
  onRouletteTap: function (event) {
    var that = this;
    wave_action(event, that)
    setTimeout(function () {
      wx.redirectTo({
        url: '../roulette-caicaicai/roulette-caicaicai',
      })
    }, 400);
  },
  onUndercoverTap: function (event) {
    var that = this;
    wave_action(event, that)
    setTimeout(function () {
      wx.navigateTo({
        url: '../undercover/index/index',
      })
    }, 400);

  },
  onGoBangTap: function (event) {
    var that = this;
    wave_action(event, that)
    setTimeout(function () {
      wx.navigateTo({
        url: '../gobang/gobang',
      })
    }, 400);
  },
})