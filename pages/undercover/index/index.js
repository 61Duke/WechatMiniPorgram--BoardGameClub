
var app = getApp();
var localdata = [];
Page({
  data: {
    imagewidth: 0,
    imageheight: 0,
    headcount: 4,
    civilian: 3,
    undercover: 1,
    blank: false,
    words: [],
  },
  //事件处理函数
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '谁是卧底', // 分享标题
      desc: '让你的聚会更加精彩', // 分享描述
      path: 'path' // 分享路径
    }
  },
  //获取设备宽高
  onLoad: function (e) {
    // var imageSize = imageUtil.imageUtil(e) 
    var windowWidth;
    var windowHeight;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      }
    })
    this.setData({
      imagewidth: windowWidth,
      imageheight: windowHeight
    })
    try {
      var value = wx.getStorageSync('1')
      if (value) {
        localdata = value.split(',')
        // console.log(localdata)
      }
    } catch (e) {
      // console.log("数据提取异常：" + e)
    }
  },

  //开始游戏前，将数据处理好，传递给下个页面一个数组
  startGame: function () {
    var str = this.data.words
    str.splice(0, str.length);  //每次加载清空数组
    var headcount = this.data.headcount;
    var undercover = this.data.undercover;
    var civilian = this.data.civilian;
    var blank = this.data.blank;


    // console.log("游戏人数：" + headcount)
    // console.log("卧底人数：" + undercover)
    // console.log("平民人数：" + civilian)
    // console.log("白板：" + blank)


    var str1 = [];
    var str2 = [];
    for (var i = 0; i < localdata.length; i += 2) {
      str1.push(localdata.slice(i, i + 2))
    }
    // console.log(str1)
    for (var i = 0; i < headcount; i++) {
      str1.sort(function () { return 0.5 - Math.random() });
    }
    str2 = str1.pop();
    // console.log(str2)

    if (blank == true) {
      // console.log("blank:" + blank)
      str.push("" + ".undercover")
      headcount = headcount - 1
    }
    for (var i = 0; i < undercover; i++) {
      str.push(str2[0] + ".undercover")
    }
    for (var i = 0; i < headcount - undercover; i++) {
      str.push(str2[1] + ".civilian")
    }
    // console.log(str)
    for (var i = 0; i < headcount; i++) {
      str.sort(function () { return 0.5 - Math.random() });
    }
    // console.log("打乱后：" + this.data.words)
    // console.log("打乱后：" + str)
    wx.navigateTo({
      url: "../start/start?words=" + this.data.words
    })
  },


  //是否选用白板
  //用户选中白板时，卧底-1，反之+1，且用户人数小于6时，限制用户不得选中
  switchChange: function (e) {
    var that = this

    that.setData({
      blank: !this.data.blank
    })

    if (that.data.headcount < 6) {
      that.setData({
        blank: false
      })
      wx.showModal({
        title: '提示',
        content: '游戏玩家太少了，不能设置白版了哦',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    } else if (that.data.blank == true) {
      that.setData({
        undercover: that.data.undercover - 1
      })
    } else {
      that.setData({
        undercover: that.data.undercover + 1
      })
    }
    // console.log('switch 发生 change 事件，携带值为', e.detail.value)
  },

  //设置总人数
  //用户设置总人数时，卧底人数将发生适当改变，且用户人数小于6时，将自动取消白板选中状态
  sliderChange: function (e) {
    var that = this
    // console.log('sliderchange发生change事件，携带值为', e.detail.value),
    that.setData({
      headcount: e.detail.value
    });
    if (that.data.headcount < 6) {
      that.setData({
        blank: false
      })

    }
    if (that.data.headcount > 13 && that.data.blank == true) {
      that.setData({
        undercover: 3,
        civilian: that.data.headcount - 4
      })
    }
    else if (that.data.headcount > 13 && that.data.blank == false) {
      that.setData({
        undercover: 4,
        civilian: that.data.headcount - 4
      })
    }
    else if (that.data.headcount > 9 && that.data.blank == true) {
      that.setData({
        undercover: 2,
        civilian: that.data.headcount - 3
      })
    }
    else if (that.data.headcount > 9 && that.data.blank == false) {
      that.setData({
        undercover: 3,
        civilian: that.data.headcount - 3
      })
    }
    else if (that.data.headcount >= 6 && that.data.blank == true) {
      that.setData({
        undercover: 1,
        civilian: that.data.headcount - 2
      })
    }
    else if (that.data.headcount >= 6 && that.data.blank == false) {
      that.setData({
        undercover: 2,
        civilian: that.data.headcount - 2
      })
    }
    else if (that.data.headcount < 6 && that.data.blank == false) {
      that.setData({
        undercover: 1,
        civilian: that.data.headcount - 1
      })
    }
    else if (that.data.headcount < 6 && that.data.blank == true) {
      that.setData({
        undercover: 1,
        civilian: that.data.headcount - 1
      })
    }
  }

})
