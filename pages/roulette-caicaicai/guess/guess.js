//index.js
//获取应用实例
var app = getApp();

function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      second: "时间到"
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
};
function sendScore(that) {
  var pages = getCurrentPages();
  var currPage = pages[pages.length - 1];   //当前页面
  var prevPage = pages[pages.length - 2];  //上一个页面
  var judge_dragon = that.data.judge_dragon;
  if (judge_dragon == true) {
    var gragons = parseInt(that.data.gragons);
    gragons += 1;
    that.setData({
      gragons: gragons,
    })
    prevPage.setData({
      gragons: gragons
    })
  } else {
    var phoenix = parseInt(that.data.phoenix);
    phoenix += 1;
    that.setData({
      phoenix: phoenix
    })
    prevPage.setData({
      phoenix: phoenix
    })
  }
};
Page({
  data: {
    awardsList_last: '',
    isPopping: false,//是否已经弹出  
    animPlus: {},//旋转动画  
    animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度
    gragons: 0,
    phoenix: 0,
    second: 60,
    guess_word: '',
    judge_dragon: false,
  },
  onLoad: function (options) {

    var that = this
    var words_library = app.globalData.words_library;
    // console.log(words_library);
    var index = parseInt(Math.random() * words_library.length, 10)
    var guess_word = words_library[index]
    that.setData({
      guess_word: guess_word
    })
    var judge_dragon = app.globalData.judge_dragon;
    this.setData({
      judge_dragon: judge_dragon
    })
    if (judge_dragon == true) {
      that.setData({
        gragons: options.gragons
      })
    } else {
      that.setData({
        phoenix: options.phoenix
      })
    }
    var list = wx.getStorageSync('winAwards') || { data: [] }

    if (list && list.data && list.data.length > 0) {
      list = list.data

    } else {
      list = []
    }
    //更新数据
    that.setData({
      awardsList_last: list[list.length - 1]
    })
  },
  //点击弹出  
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画  
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画  
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },

  onContinueTap: function (event) {
    var that = this;
    sendScore(that);
    wx.navigateBack({
      delta: 1
    })
  },
  onFailTap: function () {
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevprevPage = pages[pages.length - 3];  //上上一个页面
    var judge_dragon = that.data.judge_dragon;
    if (judge_dragon == true) {
      prevprevPage.setData({
        gragons: that.data.gragons
      })
    } else {
      prevprevPage.setData({
        phoenix: that.data.phoenix
      })
    }
    wx.navigateBack({
      delta: 2
    })
  },
  transpond: function () {
    var that = this;
    countdown(that)
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
    })
  },
  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(180).step();
    animationcollect.translate(-100, -100).rotateZ(360).opacity(1).step();
    animationTranspond.translate(-140, 0).rotateZ(360).opacity(1).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
    })
  },
  //收回动画  
  takeback: function () {
    //plus逆时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(0).step();
    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
    })
  },
})
