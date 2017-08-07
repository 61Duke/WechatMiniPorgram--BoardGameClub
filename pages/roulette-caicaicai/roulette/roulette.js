var app = getApp();

Page({
  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    gragons: 0,
    phoenix: 0,
    judge_dragon: false
  },

  getLottery: function () {
    var that = this
    var awardIndex = Math.random() * 6 >>> 0;

    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
      runNum = 8
    if (awardIndex < 2) awardsConfig.chance = false
    // console.log(awardIndex)

    // 旋转抽奖
    app.runDegs = app.runDegs || 0
    // console.log('deg', app.runDegs)
    app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
    // console.log('deg', app.runDegs)

    var animationRun = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(app.runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })

    // 记录奖品
    var winAwards = wx.getStorageSync('winAwards') || { data: [] }
    winAwards.data.push(awardsConfig.awards[awardIndex].name)
    wx.setStorageSync('winAwards', winAwards)

    // 中奖提示
    setTimeout(function () {
      var judge_dragon = that.data.judge_dragon;
      if (judge_dragon == true) {
        wx.navigateTo({
          url: '../guess/guess?gragons=' + that.data.gragons,
        });
      } else {
        wx.navigateTo({
          url: '../guess/guess?phoenix=' + that.data.phoenix,
        });
      }
      if (awardsConfig.chance) {
        that.setData({
          btnDisabled: ''
        })
      }
    }, 2800);
  },
  onLoad: function (options) {
    var that = this;
    var judge_dragon = app.globalData.judge_dragon;
    that.setData({
      judge_dragon: judge_dragon
    })
    // console.log(judge_dragon)
    if (judge_dragon == true) {
      that.setData({
        gragons: options.gragons
      })
    } else {
      that.setData({
        phoenix: options.phoenix
      })
    }
  },
  onReady: function (e) {

    var that = this;

    // getAwardsConfig
    app.awardsConfig = {
      chance: true,
      awards: [
        { 'index': 0, 'name': '画画' },
        { 'index': 1, 'name': '唇语' },
        { 'index': 2, 'name': '语言' },
        { 'index': 3, 'name': '动作' },
        { 'index': 4, 'name': '抢答(语言)' },
        { 'index': 5, 'name': '抢答(唇语)' },
      ]
    }
    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
      len = awardsConfig.length,
      rotateDeg = 360 / len / 2 + 90,
      html = [],
      turnNum = 1 / len  // 文字旋转 turn 值
    that.setData({
      btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
    })
    var ctx = wx.createContext()
    for (var i = 0; i < len; i++) {
      // 保存当前状态
      ctx.save();
      // 开始一条新路径
      ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      ctx.translate(150, 150);
      // 从(0, 0)坐标开始定义一条新的子路径
      ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false);

      // 颜色间隔
      if (i % 2 == 0) {
        ctx.setFillStyle('rgba(255,184,32,.1)');
      } else {
        ctx.setFillStyle('rgba(255,203,63,.1)');
      }

      // 填充扇形
      ctx.fill();
      // 绘制边框
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('rgba(228,55,14,.1)');
      ctx.stroke();

      // 恢复前一个状态
      ctx.restore();

      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
    }
    that.setData({
      awardsList: html
    });
  }
})
