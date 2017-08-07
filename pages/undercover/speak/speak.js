// pages/speak/speak.js
function ButtonTap(index, that) {
  var arr_r = that.data.arr_r
  var arr = that.data.arr
  // console.log(arr_r)
  var userName_list = that.data.userName_list;
  // console.log(userName_list)
  wx.showActionSheet({
    itemList: ['本轮出局', '查看词语'],
    success: function (res) {
      if (!res.cancel) {
        if (res.tapIndex == 0) {
          wx.showModal({
            title: '提示',
            content: '你确定要出局 ' + userName_list[index] + ' 玩家吗？',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                arr_r.splice(index, 1);
                userName_list.splice(index, 1)
                that.setData({
                  userName_list: userName_list
                })
                // console.log(arr_r);
                if (equals(arr_r) == true && arr_r[0] == "civilian") {
                  var title = '游戏结束，平民胜利';
                  showToast(title)
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '../punish/punish',
                    })
                  }, 2000)
                }
                else if (equals(arr_r) == true && arr_r[0] == "undercover") {
                  var title = '游戏结束，卧底胜利';
                  showToast(title)
                  showToast(title)
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '../punish/punish',
                    })
                  }, 2000)
                }
                else if (equals(arr_r) == false && arr_r.length == 2) {
                  var title = '游戏结束，卧底胜利';
                  showToast(title)
                  showToast(title)
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '../punish/punish',
                    })
                  }, 2000)
                }
                else {
                  var title = '游戏继续';
                  showToast(title);
                }
              }
            }
          })

        } else if (res.tapIndex == 1) {
          wx.showModal({
            title: '您的词汇是：',
            content: arr[index],
          })
        } else {
          var title = '该玩家已经被干掉了！不能再次踢出游戏！';
          showToast(title);
        }
      }
    }
  })

};
function equals(arr) {
  var bool = true;
  for (var i = 1, len = arr.length; i < len; i++) {
    if (arr[i] !== arr[0]) { bool = false }
  }
  return bool
};
function showToast(title) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: 10000
  })
  setTimeout(function () {
    wx.hideToast()
  }, 2000)
};

Page({
  data: {
    arr: [],
    arr_r: [],
    userName_list: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      words: options.words.split(",")
    })

    this.setData({
      userName_lists: options.userName_lists.split(",")
    })

    var userName_list = []
    for (var i = 0; i < this.data.userName_lists.length; i++) {
      userName_list.push(this.data.userName_lists[i])
    }
    var arr = [];
    var arr_r = [];
    for (var i = 0; i < this.data.words.length; i++) {
      arr.push(this.data.words[i].split(".")[0])
    }
    for (var i = 0; i < this.data.words.length; i++) {
      arr_r.push(this.data.words[i].split(".")[1])
    }
    // console.log("arr:" + arr)

    this.setData({
      arr: arr,
      arr_r: arr_r,
      userName_list: userName_list
    })
  },

  onButtonTap0: function (event) {

    var that = this;
    var index = 0;
    ButtonTap(index, that);

  },
  onButtonTap1: function (event) {
    var that = this;
    var index = 1;
    ButtonTap(index, that);
  },
  onButtonTap2: function (event) {

    var that = this;
    var index = 2;
    ButtonTap(index, that);
  },
  onButtonTap3: function (event) {

    var that = this;
    var index = 3;
    ButtonTap(index, that);
  },
  onButtonTap4: function (event) {

    var that = this;
    var index = 4;
    ButtonTap(index, that);
  },
  onButtonTap5: function (event) {

    var that = this;
    var index = 5;
    ButtonTap(index, that);
  },
  onButtonTap6: function (event) {

    var that = this;
    var index = 6;
    ButtonTap(index, that);
  },
  onButtonTap7: function (event) {

    var that = this;
    var index = 7;
    ButtonTap(index, that);
  },
  onButtonTap8: function (event) {
    ;
    var that = this;
    var index = 8;
    ButtonTap(index, that);
  },
  onButtonTap9: function (event) {

    var that = this;
    var index = 9;
    ButtonTap(index, that);
  },
  onButtonTap10: function (event) {

    var that = this;
    var index = 10;
    ButtonTap(index, that);
  },
  onButtonTap11: function (event) {

    var that = this;
    var index = 11;
    ButtonTap(index, that);
  },
  onButtonTap12: function (event) {

    var that = this;
    var index = 12;
    ButtonTap(index, that);
  },
  onButtonTap13: function (event) {

    var that = this;
    var index = 13;
    ButtonTap(index, that);
  },
  onButtonTap14: function (event) {

    var that = this;
    var index = 14;
    ButtonTap(index, that);
  },
  onButtonTap15: function (event) {
    var that = this;
    var index = 15;
    ButtonTap(index, that);
  },
})