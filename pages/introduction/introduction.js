// pages/test/test.js
/// <summary>  
/// 初始化DropDownMenu  
/// 1.一级目录 initSubMenuDisplay ：['hidden']  
/// 2.二级目录 initSubMenuHighLight ：[['',''],['','','','']]]  
/// </summary>  
function loadDropDownMenu() {
  for (var i = 0; i < ReportDataSync.length; i++) {
    //一级目录  
    initSubMenuDisplay.push('hidden')
    //二级目录  
    var report = []
    for (var j = 0; j < ReportDataSync[i].chilItem.length; j++) {
      report.push([''])
    }
    initSubMenuHighLight.push(report)
    //动画  
    initAnimationData.push("")
  }
};
var ReportDataSync = [
  {
    reportType: "什么是聚乐会",
    chilItem: [
      { ID: 1, Name: "聚乐会是一款专注于聚会游戏的微信小程序，帮助用户解决聚会不知道玩什么的问题。包含了多款轻松简单的聚会游戏，如谁是卧底、轮盘猜猜猜等，其他小程序有待继续开发。应用画面精美，词库丰富，易于上手，适合多人聚会娱乐。", Type: 1 }]
  },
  {
    reportType: "谁是卧底规则",
    chilItem: [
      { ID: 1, Name: "1、游戏人数：要求4人以上，有3种基本身份，平民、卧底、白板，其中可以选择是否在游戏中加入白板。\n\n2、身份词：所有平民获得相同词语；卧底获得与平民相似但不同的词语（如卧底多于1人，则所有卧底词相同）；白板则不获得任何词语。\n\n3、发言：所有玩家轮流发言，描述自己的词语，既不能让卧底察觉，也要给同伴暗示。如有玩家出局则从下一位开始发言。\n\n4、投票：每轮描述完毕，所有玩家投票选出怀疑的人，得票最多者出局。如果有多人得票相同，则他们重新描述进行PK，并由剩余的人对他们进行投票。\n\n5、胜利条件：如所有卧底及白板出局，则平民获胜；当＜6人游戏时，如卧底在还剩2人时存活即获胜，当≥6人游戏时，如卧底在还剩3人时存活即获胜；如所有卧底出局且白板存活，则白板获胜。\n\n操作提示：\n\n1、游戏开局：选择喜欢的词库及参与游戏人数，即可开始游戏。\n\n2、发言顺序：每一局系统会随机一名玩家率先发言，其他玩家按顺序轮流发言。\n\n3、投票：游戏投票阶段请通过长按头像进行投票。\n\n4、忘词：如果忘记自己的词，须先点击”忘词了“后，再点击自己的头像查看。已经出局的玩家也可通过此方法查看每个人的词。\n\n5、我的词库：玩家可添加词语，游戏开局时选择”我的词库“即可与朋友们玩自定义词库。", Type: 1 },
    ]
  },
  {
    reportType: "轮盘游戏规则",
    chilItem: [
      { ID: 1, Name: "1、游戏人数：4人以上，分为人数相等或相近的两队进行PK。\n\n2、游戏玩法：游戏开始两队猜拳决定答题先后顺序，若答题正确则积分加1并继续，答错则换另一支队，以此类推。率先达到16分的队获得最终的胜利。\n\n3、答题方式：答题前，转动转盘，指针会指向动作、语言、画画、唇语4种表达方式中的一种，这时队内可自由选出一名擅长该表达方式的队员，查看词语并用对应方式表达，由队内其他成员猜，在60秒内猜对即为答题正确。\n\n4、抢答环节：每当任一队积分达到5、10、15，该轮为抢答环节，另一队可进行抢答，抢答正确可抢得答题权。此外，转动转盘也有概率产生抢答环节。\n\n5、词语表达：词语表达是最有趣的环节。动作—用肢体语言对词语进行表达；语言—用说法的方式表达，但不可说到词语中包含的任意字和对应的谐音；画画—准备好纸笔，用图案表达需描述的词语；唇语—你可以尽情蠕动嘴唇，但切记不可发出声音\n\n6、分数调整：如游戏中不小心按错了答题正误，可在比分界面点击设置，对双方分数进行调整。",Type: 1 }]
  }
]

//定义字段  
var initSubMenuDisplay = []
var initSubMenuHighLight = []
var initAnimationData = []

/// 初始化DropDownMenu  
loadDropDownMenu()

Page({
  data: {
    reportData: ReportDataSync,//菜单数据  
    subMenuDisplay: initSubMenuDisplay, //一级  
    subMenuHighLight: initSubMenuHighLight, //二级  
    animationData: initAnimationData //动画  
  },

  //一级菜单点击  
  tapMainMenu: function (e) {
    //获取当前一级菜单标识  
    var index = parseInt(e.currentTarget.dataset.index);
    //改变显示状态  
    for (var i = 0; i < initSubMenuDisplay.length; i++) {
      if (i == index) {
        if (this.data.subMenuDisplay[index] == "show") {
          initSubMenuDisplay[index] = 'hidden'
        } else {
          initSubMenuDisplay[index] = 'show'
        }
      } else {
        initSubMenuDisplay[i] = 'hidden'
      }
    }
    this.setData({
      subMenuDisplay: initSubMenuDisplay
    })
    this.animation(index)
  },

  //二级菜单点击  
  tapSubMenu: function (e) {
    //隐藏所有一级菜单  
    //this.setData({  
    //subMenuDisplay: initSubMenuDisplay()  
    //});  
    // 当前二级菜单的标识  
    var indexArray = e.currentTarget.dataset.index.split('-');
    // 删除所在二级菜单样式  
    for (var i = 0; i < initSubMenuHighLight.length; i++) {
      if (indexArray[0] == i) {
        for (var j = 0; j < initSubMenuHighLight[i].length; j++) {
          initSubMenuHighLight[i][j] = '';
        }
      }
    }
    //给当前二级菜单添加样式  
    initSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    //刷新样式  
    this.setData({
      subMenuHighLight: initSubMenuHighLight
    });
    // 设置动画  
    this.animation(indexArray[0]);
  },

  //菜单动画  
  animation: function (index) {
    // 定义一个动画  
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
    })
    // 是显示还是隐藏  
    var flag = this.data.subMenuDisplay[index] == 'show' ? 1 : -1;
    // 使之Y轴平移  
    animation.translateY(flag * ((initSubMenuHighLight[index].length + 1) * 38)).step();
    // 导出到数据，绑定给view属性  
    var animationStr = animation.export();
    // 原来的数据  
    var animationData = this.data.animationData;
    animationData[index] = animationStr;
    this.setData({
      animationData: animationData
    });
  }
})