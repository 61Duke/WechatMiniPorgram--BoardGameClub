//start.js
//获取应用实例
var app = getApp();
var i = 1;
var userName_list = []
Page({
  data: {
    imagewidth: 0,
    imageheight: 0,
    words: [],
    no: 0,
    arr: [],
    tip: '',
    userName: '',
    userName_lists: []
  },
  formBindsubmit: function (e) {
    if (e.detail.value.userName.length == 0) {
      this.setData({
        tip: '提示：您的昵称不能啥也不写吧',
        userName: '',
      })
    } else {

      this.setData({

        tip: '',
        userName: e.detail.value.userName,
      })
      this.setData({
        userName_lists: userName_list.push(e.detail.value.userName)
      })
      // console.log('123'+userName_list)
    }
  },
  formReset: function () {
    this.setData({
      tip: '',
      userName: '',
    })
  },
  seeWord: function () {
    var word = this.data.words
    var arr = this.data.arr
    var userName = this.data.userName
    // console.log("hah"+userName_list)
    if (i <= word.length && userName != "") {
      var title = "请 " + userName + " 玩家记住你的词语"
      var content = arr[i - 1]
      // console.log("..."+content)
      // console.log(title)
      wx.showModal({
        title: title,
        content: content,
        showCancel: false,
        confirmText: "我记住了",
        success: function (res) {
          if (res.confirm) {
            i++;
            if (i == word.length + 1) {

              wx.navigateTo({
                url: '../speak/speak?words=' + word + '&userName_lists=' + userName_list
              })
              userName_list = []
            }
          }
        }
      })
      this.setData({
        no: i,
        userName: '',

      })

    }
  },
  onShow: function () {
    i = 1
  },


  onLoad: function (options) {

    this.setData({
      words: options.words.split(",")
    })

    // console.log("shuju:" + this.data.words)



    var arr = []
    for (var i = 0; i < this.data.words.length; i++) {
      arr.push(this.data.words[i].split(".")[0])
    }
    // console.log("arr:" + arr)
    this.setData({
      arr: arr
    })
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
    wx.showModal({
      title: '开始游戏',
      content: '',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {

        }
      }
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
})