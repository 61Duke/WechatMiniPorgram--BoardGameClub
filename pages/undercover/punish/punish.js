function showModal(self, content) {
  wx.showModal({
    title: '惩罚！！惩罚',
    content: content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        self.setData({
          isRunning: false,
        })
      }
    }
  })
};

Page({
  data: {
    pointList: [],
    prizeList: [],
    color1: '#BA52ED',
    color2: '#3FC1C9',
    prizeSelectColor: 'orange',
    prizeDefaultColor: 'white',
    prizeIndex: 0,
    isRunning: false,
    prizeImgs: [
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg',
      '../../../image/punish-logo.jpg'
    ]
  },
  onHomePage: function (event) {
    wx.navigateBack({
      delta: 4, // 回退前 delta(默认为1) 页面

    })
  },
  onPlayAgain: function (event) {
    wx.navigateBack({
      delta: 3, // 回退前 delta(默认为1) 页面
    })

  },
  onLoad: function () {
    //points
    let self = this,
      leftPoint = 7.5,
      topPoint = 7.5,
      pointList = []

    for (let i = 0; i < 24; i++) {
      if (i === 0) {
        topPoint = 15
        leftPoint = 15
      } else if (i < 6) {
        topPoint = 7.5
        leftPoint = leftPoint + 102.5
      } else if (i == 6) {
        topPoint = 15
        leftPoint = 620
      } else if (i < 12) {
        topPoint = topPoint + 94
        leftPoint = 620
      } else if (i == 12) {
        topPoint = 565
        leftPoint = 620
      } else if (i < 18) {
        topPoint = 570
        leftPoint = leftPoint - 102.5
      } else if (i == 18) {
        topPoint = 565
        leftPoint = 15
      } else if (i < 24) {
        topPoint = topPoint - 94
        leftPoint = 7.5
      } else {
        return
      }
      pointList.push({ topPoint: topPoint, leftPoint: leftPoint })
    }

    this.setData({
      pointList: pointList
    })

    setInterval(function () {
      if (self.data.color1 === '#BA52ED') {
        self.setData({
          color1: '#3FC1C9',
          color2: '#BA52ED'
        })
      } else {
        self.setData({
          color1: '#BA52ED',
          color2: '#3FC1C9'
        })
      }
    }, 100)
    //prizes
    const prizeList = []
    let topPrize = 30,
      leftPrize = 46
    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        topPrize = 30
        leftPrize = 30
      } else if (i < 3) {
        topPrize = topPrize
        leftPrize = leftPrize + 166.666 + 20
      } else if (i < 5) {
        leftPrize = leftPrize
        topPrize = topPrize + 150 + 15
      } else if (i < 7) {
        leftPrize = leftPrize - 166.666 - 20
        topPrize = topPrize
      } else if (i < 8) {
        leftPrize = leftPrize
        topPrize = topPrize - 150 - 20
      }
      let prizeImg = self.data.prizeImgs[i]
      prizeList.push({ topPrize: topPrize, leftPrize: leftPrize, prizeImg: prizeImg })
    }
    self.setData({
      prizeList: prizeList
    })
  },
  startGame() {
    if (this.data.isRunning === true) return
    this.setData({
      isRunning: true
    })
    const self = this
    let prizeIndex = parseInt(Math.random() * 8, 10)
    let i = 0
    const timer = setInterval(function () {
      prizeIndex++
      i += 30
      prizeIndex = prizeIndex % 8
      if (i >= 900) {
        clearInterval(timer)
        if (prizeIndex == 0) {
          var content = '与左边的异性，十指相扣，对视10秒（如果左边是同性，继续向右边寻找）';
          showModal(self, content);
        }
        if (prizeIndex == 1) {
          var content = '做自己最性感、最妩媚的表情或动作';
          showModal(self, content);
        }
        if (prizeIndex == 2) {
          var content = '模仿古代特殊职业女子拉客';
          showModal(self, content);

        }
        if (prizeIndex == 3) {
          var content = '对陌生人美眉或帅哥说：“你好漂亮或你好帅”';
          showModal(self, content);

        }
        if (prizeIndex == 4) {
          var content = '对外大喊 我是猪';
          showModal(self, content);
        }
        if (prizeIndex == 5) {
          var content = '女生版：选一个男生 一边捶他的胸一边说： 你好讨厌哦    男生版：选一个女生 一边戳她的头一边说： 你好讨厌哦';
          showModal(self, content);
        }
        if (prizeIndex == 6) {
          var content = '选择一位异性（以就近为先）逼到角落，用"调情式"一手撑墙，两人深情对视10秒';
          showModal(self, content);
        }

        if (prizeIndex == 7) {
          var content = '对窗外喊 “我好寂寞啊”';
          showModal(self, content);
        }
      }

      self.setData({
        prizeIndex: prizeIndex
      })
      // console.log(prizeIndex)
    }, (100 + i))

  },

})
