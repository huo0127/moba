module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  // const Article = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')

  // 导入新闻数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '新聞資訊',
    })
    const cats = await Category.find()
      .where({
        parent: parent,
      })
      .lean()
    const newsTitles = [
      '《奧術》11/12~12/01 登入就送免費獎勵 !',
      '潛谷尋影，每格皆有機會中大獎！',
      '議會檔案館-入門介紹',
      '探索《奧術》活動問與答（大廳已於客戶端內上線）',
      '冬夜驚喜蛋，自選造型&精靈蛋大優惠！',
      '龍之恩賜，守護大地！',
      '10/09 系統維護 (已完成)',
      '09/02 系統維護 (已完成)',
      '07/01 系統維護 (已完成)',
      '05/27 系統緊急維護 (已完成)',
      '04/08 系統維護 (已完成)',
      '03/11 系統維護',
      '11/04《英雄聯盟》11.22 版本更新 (已完成)',
      '10/21《英雄聯盟》11.21 版本更新 (已完成)',
      '10/07《英雄聯盟》11.20 版本更新 (已完成)',
      '09/23《英雄聯盟》11.19 版本更新 (已完成)',
      '09/14《英雄聯盟》11.18 版本更新 (已完成)',
      '08/26《英雄聯盟》11.17 版本更新 (已更新)',
      '外媒透露：Nisqy直播中稱可能不參加2022年比賽',
      'Perkz離開C9戰隊',
      'G2戰隊老闆：嘗試降價租借Rekkles',
      '物理致命剎雅登頂下路',
      'LEC記者：Rekkles沒有加入任何一支LEC隊伍',
      '外媒爆料：T1下路選手Teddy準備轉會',
      'DoubleLift講述自己和TSM CEO意見不合 蛇蛇曾多次希望與他組下路',
      'G2打野Jankos自稱LPL友人，LPL緊急為他頒獎：LPL奪冠有你一份功勞！',
      '外媒爆料：G2 C9涉嫌干涉Perkz加盟FNC 官方調查后兩隊免于懲罰',
      'Doublelift直播控訴Reginald：他把很多選手罵到哭',
      'Perkz與G2老闆互動',
      'TL下路選手Tactical將轉會TSM擔任首發AD',
    ]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title,
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  // 新闻列表接口
  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    const parent = await Category.findOne({
      name: '新聞資訊',
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList',
        },
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] },
        },
      },
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '熱門',
      newsList: await Article.find()
        .where({
          categories: { $in: subCats },
        })
        .populate('categories')
        .limit(5)
        .lean(),
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '熱門' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  // 导入英雄数据
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})

    const rawData = [
      {
        name: '全部',
        heroes: [
          { name: '黑暗之女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small1000.jpg' },
          { name: '狂戰士', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small2000.jpg' },
          { name: '正義巨像', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small3000.jpg' },
          { name: '卡牌大師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small4000.jpg' },
          { name: '德邦總管', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small5000.jpg' },
          { name: '無畏戰車', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small6000.jpg' },
          { name: '詭術妖姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small7000.jpg' },
          { name: '猩紅收割者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small8000.jpg' },
          { name: '遠古恐懼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small9000.jpg' },
          { name: '正義天使', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small10000.jpg' },
          { name: '無極劍聖', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small11000.jpg' },
          { name: '牛頭酋長', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small12000.jpg' },
          { name: '符文法師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small13000.jpg' },
          { name: '亡靈戰神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small14000.jpg' },
          { name: '戰爭女神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small15000.jpg' },
          { name: '眾星之子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small16000.jpg' },
          { name: '迅捷斥候', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small17000.jpg' },
          { name: '麥林炮手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small18000.jpg' },
          { name: '祖安怒獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small19000.jpg' },
          { name: '雪原雙子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small20000.jpg' },
          { name: '賞金獵人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small21000.jpg' },
          { name: '寒冰射手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small22000.jpg' },
          { name: '蠻族之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small23000.jpg' },
          { name: '武器大師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small24000.jpg' },
          { name: '墮落天使', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small25000.jpg' },
          { name: '時光守護者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small26000.jpg' },
          { name: '煉金術士', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small27000.jpg' },
          { name: '痛苦之擁', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small28000.jpg' },
          { name: '瘟疫之源', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small29000.jpg' },
          { name: '死亡頌唱者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small30000.jpg' },
          { name: '虛空恐懼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small31000.jpg' },
          { name: '殤之木乃伊', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small32000.jpg' },
          { name: '披甲龍龜', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small33000.jpg' },
          { name: '冰晶鳳凰', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small34000.jpg' },
          { name: '惡魔小醜', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small35000.jpg' },
          { name: '祖安狂人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small36000.jpg' },
          { name: '琴瑟仙女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small37000.jpg' },
          { name: '虛空行者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small38000.jpg' },
          { name: '刀鋒舞者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small39000.jpg' },
          { name: '風暴之怒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small40000.jpg' },
          { name: '海洋之災', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small41000.jpg' },
          { name: '英勇投彈手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small42000.jpg' },
          { name: '天啟者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small43000.jpg' },
          { name: '瓦洛蘭之盾', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small44000.jpg' },
          { name: '邪惡小法師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small45000.jpg' },
          { name: '巨魔之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small48000.jpg' },
          { name: '諾克薩斯統領', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small50000.jpg' },
          { name: '皮城女警', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small51000.jpg' },
          { name: '蒸汽機器人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small53000.jpg' },
          { name: '熔巖巨獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small54000.jpg' },
          { name: '不祥之刃', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small55000.jpg' },
          { name: '永恒夢魘', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small56000.jpg' },
          { name: '扭曲樹精', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small57000.jpg' },
          { name: '荒漠屠夫', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small58000.jpg' },
          { name: '德瑪西亞皇子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small59000.jpg' },
          { name: '蜘蛛女皇', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small60000.jpg' },
          { name: '發條魔靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small61000.jpg' },
          { name: '齊天大聖', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small62000.jpg' },
          { name: '覆仇焰魂', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small63000.jpg' },
          { name: '盲僧', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small64000.jpg' },
          { name: '暗夜獵手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small67000.jpg' },
          { name: '機械公敵', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small68000.jpg' },
          { name: '魔蛇之擁', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small69000.jpg' },
          { name: '水晶先鋒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small72000.jpg' },
          { name: '大發明家', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small74000.jpg' },
          { name: '沙漠死神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small75000.jpg' },
          { name: '狂野女獵手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small76000.jpg' },
          { name: '獸靈行者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small77000.jpg' },
          { name: '聖錘之毅', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small78000.jpg' },
          { name: '酒桶', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small79000.jpg' },
          { name: '不屈之槍', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small80000.jpg' },
          { name: '探險家', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small81000.jpg' },
          { name: '鐵鎧冥魂', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small82000.jpg' },
          { name: '牧魂人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small83000.jpg' },
          { name: '離群之刺', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small84000.jpg' },
          { name: '狂暴之心', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small85000.jpg' },
          { name: '德瑪西亞之力', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small86000.jpg' },
          { name: '曙光女神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small89000.jpg' },
          { name: '虛空先知', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small90000.jpg' },
          { name: '刀鋒之影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small91000.jpg' },
          { name: '放逐之刃', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small92000.jpg' },
          { name: '深淵巨口', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small96000.jpg' },
          { name: '暮光之眼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small98000.jpg' },
          { name: '光輝女郎', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small99000.jpg' },
          { name: '遠古巫靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small101000.jpg' },
          { name: '龍血武姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small102000.jpg' },
          { name: '九尾妖狐', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small103000.jpg' },
          { name: '法外狂徒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small104000.jpg' },
          { name: '潮汐海靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small105000.jpg' },
          { name: '不滅狂雷', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small106000.jpg' },
          { name: '傲之追獵者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small107000.jpg' },
          { name: '懲戒之箭', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small110000.jpg' },
          { name: '深海泰坦', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small111000.jpg' },
          { name: '機械先驅', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small112000.jpg' },
          { name: '北地之怒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small113000.jpg' },
          { name: '無雙劍姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small114000.jpg' },
          { name: '爆破鬼才', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small115000.jpg' },
          { name: '仙靈女巫', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small117000.jpg' },
          { name: '榮耀行刑官', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small119000.jpg' },
          { name: '戰爭之影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small120000.jpg' },
          { name: '虛空掠奪者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small121000.jpg' },
          { name: '諾克薩斯之手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small122000.jpg' },
          { name: '未來守護者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small126000.jpg' },
          { name: '冰霜女巫', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small127000.jpg' },
          { name: '皎月女神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small131000.jpg' },
          { name: '德瑪西亞之翼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small133000.jpg' },
          { name: '暗黑元首', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small134000.jpg' },
          { name: '鑄星龍王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small136000.jpg' },
          { name: '影流之鐮', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small141000.jpg' },
          { name: '暮光星靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small142000.jpg' },
          { name: '荊棘之興', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small143000.jpg' },
          { name: '虛空之女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small145000.jpg' },
          { name: '星籟歌姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small147000.jpg' },
          { name: '迷失之牙', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small150000.jpg' },
          { name: '生化魔人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small154000.jpg' },
          { name: '疾風劍豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small157000.jpg' },
          { name: '虛空之眼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small161000.jpg' },
          { name: '巖雀', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small163000.jpg' },
          { name: '青鋼影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small164000.jpg' },
          { name: '影哨', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small166000.jpg' },
          { name: '弗雷爾卓德之心', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small201000.jpg' },
          { name: '戲命師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small202000.jpg' },
          { name: '永獵雙子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small203000.jpg' },
          { name: '暴走蘿莉', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small222000.jpg' },
          { name: '河流之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small223000.jpg' },
          { name: '破敗之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small234000.jpg' },
          { name: '滌魂聖槍', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small235000.jpg' },
          { name: '聖槍遊俠', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small236000.jpg' },
          { name: '影流之主', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small238000.jpg' },
          { name: '暴怒騎士', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small240000.jpg' },
          { name: '時間刺客', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small245000.jpg' },
          { name: '元素女皇', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small246000.jpg' },
          { name: '皮城執法官', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small254000.jpg' },
          { name: '暗裔劍魔', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small266000.jpg' },
          { name: '喚潮鮫姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small267000.jpg' },
          { name: '沙漠皇帝', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small268000.jpg' },
          { name: '魔法貓咪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small350000.jpg' },
          { name: '沙漠玫瑰', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small360000.jpg' },
          { name: '魂鎖典獄長', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small412000.jpg' },
          { name: '海獸祭司', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small420000.jpg' },
          { name: '虛空遁地獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small421000.jpg' },
          { name: '翠神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small427000.jpg' },
          { name: '覆仇之矛', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small429000.jpg' },
          { name: '星界遊神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small432000.jpg' },
          { name: '幻翎', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small497000.jpg' },
          { name: '逆羽', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small498000.jpg' },
          { name: '山隱之焰', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small516000.jpg' },
          { name: '解脫者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small517000.jpg' },
          { name: '萬花通靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small518000.jpg' },
          { name: '殘月之肅', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small523000.jpg' },
          { name: '镕鐵少女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small526000.jpg' },
          { name: '血港鬼影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small555000.jpg' },
          { name: '愁雲使者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small711000.jpg' },
          { name: '封魔劍魂', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small777000.jpg' },
          { name: '腕豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small875000.jpg' },
          { name: '含羞蓓蕾', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small876000.jpg' },
          { name: '靈羅娃娃', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small887000.jpg' },
        ],
      },
      {
        name: '上路',
        heroes: [
          { name: '無畏戰車', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small6000.jpg' },
          { name: '猩紅收割者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small8000.jpg' },
          { name: '正義天使', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small10000.jpg' },
          { name: '亡靈戰神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small14000.jpg' },
          { name: '迅捷斥候', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small17000.jpg' },
          { name: '祖安怒獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small19000.jpg' },
          { name: '蠻族之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small23000.jpg' },
          { name: '武器大師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small24000.jpg' },
          { name: '煉金術士', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small27000.jpg' },
          { name: '虛空恐懼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small31000.jpg' },
          { name: '刀鋒舞者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small39000.jpg' },
          { name: '海洋之災', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small41000.jpg' },
          { name: '巨魔之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small48000.jpg' },
          { name: '熔巖巨獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small54000.jpg' },
          { name: '荒漠屠夫', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small58000.jpg' },
          { name: '齊天大聖', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small62000.jpg' },
          { name: '暗夜獵手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small67000.jpg' },
          { name: '沙漠死神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small75000.jpg' },
          { name: '聖錘之毅', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small78000.jpg' },
          { name: '鐵鎧冥魂', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small82000.jpg' },
          { name: '牧魂人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small83000.jpg' },
          { name: '離群之刺', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small84000.jpg' },
          { name: '狂暴之心', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small85000.jpg' },
          { name: '德瑪西亞之力', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small86000.jpg' },
          { name: '放逐之刃', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small92000.jpg' },
          { name: '暮光之眼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small98000.jpg' },
          { name: '法外狂徒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small104000.jpg' },
          { name: '不滅狂雷', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small106000.jpg' },
          { name: '無雙劍姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small114000.jpg' },
          { name: '諾克薩斯之手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small122000.jpg' },
          { name: '未來守護者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small126000.jpg' },
          { name: '迷失之牙', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small150000.jpg' },
          { name: '疾風劍豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small157000.jpg' },
          { name: '青鋼影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small164000.jpg' },
          { name: '河流之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small223000.jpg' },
          { name: '聖槍遊俠', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small236000.jpg' },
          { name: '暴怒騎士', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small240000.jpg' },
          { name: '暗裔劍魔', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small266000.jpg' },
          { name: '海獸祭司', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small420000.jpg' },
          { name: '山隱之焰', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small516000.jpg' },
          { name: '解脫者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small517000.jpg' },
          { name: '封魔劍魂', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small777000.jpg' },
          { name: '腕豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small875000.jpg' },
          { name: '含羞蓓蕾', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small876000.jpg' },
          { name: '靈羅娃娃', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small887000.jpg' },
        ],
      },
      {
        name: '打野',
        heroes: [
          { name: '狂戰士', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small2000.jpg' },
          { name: '德邦總管', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small5000.jpg' },
          { name: '遠古恐懼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small9000.jpg' },
          { name: '無極劍聖', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small11000.jpg' },
          { name: '祖安怒獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small19000.jpg' },
          { name: '雪原雙子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small20000.jpg' },
          { name: '痛苦之擁', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small28000.jpg' },
          { name: '瘟疫之源', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small29000.jpg' },
          { name: '死亡頌唱者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small30000.jpg' },
          { name: '殤之木乃伊', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small32000.jpg' },
          { name: '惡魔小醜', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small35000.jpg' },
          { name: '巨魔之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small48000.jpg' },
          { name: '永恒夢魘', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small56000.jpg' },
          { name: '德瑪西亞皇子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small59000.jpg' },
          { name: '蜘蛛女皇', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small60000.jpg' },
          { name: '盲僧', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small64000.jpg' },
          { name: '機械公敵', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small68000.jpg' },
          { name: '狂野女獵手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small76000.jpg' },
          { name: '聖錘之毅', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small78000.jpg' },
          { name: '酒桶', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small79000.jpg' },
          { name: '刀鋒之影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small91000.jpg' },
          { name: '龍血武姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small102000.jpg' },
          { name: '法外狂徒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small104000.jpg' },
          { name: '不滅狂雷', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small106000.jpg' },
          { name: '傲之追獵者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small107000.jpg' },
          { name: '戰爭之影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small120000.jpg' },
          { name: '虛空掠奪者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small121000.jpg' },
          { name: '皎月女神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small131000.jpg' },
          { name: '影流之鐮', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small141000.jpg' },
          { name: '生化魔人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small154000.jpg' },
          { name: '巖雀', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small163000.jpg' },
          { name: '永獵雙子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small203000.jpg' },
          { name: '破敗之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small234000.jpg' },
          { name: '影流之主', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small238000.jpg' },
          { name: '時間刺客', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small245000.jpg' },
          { name: '元素女皇', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small246000.jpg' },
          { name: '皮城執法官', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small254000.jpg' },
          { name: '虛空遁地獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small421000.jpg' },
          { name: '含羞蓓蕾', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small876000.jpg' },
          { name: '靈羅娃娃', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small887000.jpg' },
        ],
      },
      {
        name: '中路',
        heroes: [
          { name: '黑暗之女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small1000.jpg' },
          { name: '正義巨像', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small3000.jpg' },
          { name: '卡牌大師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small4000.jpg' },
          { name: '詭術妖姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small7000.jpg' },
          { name: '猩紅收割者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small8000.jpg' },
          { name: '符文法師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small13000.jpg' },
          { name: '亡靈戰神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small14000.jpg' },
          { name: '蠻族之王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small23000.jpg' },
          { name: '冰晶鳳凰', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small34000.jpg' },
          { name: '虛空行者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small38000.jpg' },
          { name: '刀鋒舞者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small39000.jpg' },
          { name: '海洋之災', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small41000.jpg' },
          { name: '英勇投彈手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small42000.jpg' },
          { name: '邪惡小法師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small45000.jpg' },
          { name: '熔巖巨獸', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small54000.jpg' },
          { name: '不祥之刃', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small55000.jpg' },
          { name: '荒漠屠夫', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small58000.jpg' },
          { name: '發條魔靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small61000.jpg' },
          { name: '機械公敵', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small68000.jpg' },
          { name: '魔蛇之擁', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small69000.jpg' },
          { name: '沙漠死神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small75000.jpg' },
          { name: '不屈之槍', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small80000.jpg' },
          { name: '離群之刺', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small84000.jpg' },
          { name: '狂暴之心', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small85000.jpg' },
          { name: '德瑪西亞之力', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small86000.jpg' },
          { name: '虛空先知', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small90000.jpg' },
          { name: '刀鋒之影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small91000.jpg' },
          { name: '光輝女郎', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small99000.jpg' },
          { name: '遠古巫靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small101000.jpg' },
          { name: '九尾妖狐', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small103000.jpg' },
          { name: '法外狂徒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small104000.jpg' },
          { name: '潮汐海靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small105000.jpg' },
          { name: '機械先驅', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small112000.jpg' },
          { name: '爆破鬼才', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small115000.jpg' },
          { name: '未來守護者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small126000.jpg' },
          { name: '冰霜女巫', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small127000.jpg' },
          { name: '皎月女神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small131000.jpg' },
          { name: '暗黑元首', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small134000.jpg' },
          { name: '鑄星龍王', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small136000.jpg' },
          { name: '暮光星靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small142000.jpg' },
          { name: '疾風劍豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small157000.jpg' },
          { name: '青鋼影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small164000.jpg' },
          { name: '影哨', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small166000.jpg' },
          { name: '聖槍遊俠', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small236000.jpg' },
          { name: '影流之主', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small238000.jpg' },
          { name: '暴怒騎士', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small240000.jpg' },
          { name: '時間刺客', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small245000.jpg' },
          { name: '元素女皇', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small246000.jpg' },
          { name: '暗裔劍魔', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small266000.jpg' },
          { name: '沙漠皇帝', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small268000.jpg' },
          { name: '逆羽', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small498000.jpg' },
          { name: '解脫者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small517000.jpg' },
          { name: '萬花通靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small518000.jpg' },
          { name: '愁雲使者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small711000.jpg' },
          { name: '封魔劍魂', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small777000.jpg' },
          { name: '腕豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small875000.jpg' },
        ],
      },
      {
        name: '下路',
        heroes: [
          { name: '戰爭女神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small15000.jpg' },
          { name: '麥林炮手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small18000.jpg' },
          { name: '賞金獵人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small21000.jpg' },
          { name: '寒冰射手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small22000.jpg' },
          { name: '瘟疫之源', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small29000.jpg' },
          { name: '皮城女警', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small51000.jpg' },
          { name: '暗夜獵手', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small67000.jpg' },
          { name: '探險家', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small81000.jpg' },
          { name: '深淵巨口', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small96000.jpg' },
          { name: '懲戒之箭', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small110000.jpg' },
          { name: '爆破鬼才', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small115000.jpg' },
          { name: '榮耀行刑官', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small119000.jpg' },
          { name: '虛空之女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small145000.jpg' },
          { name: '疾風劍豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small157000.jpg' },
          { name: '戲命師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small202000.jpg' },
          { name: '暴走蘿莉', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small222000.jpg' },
          { name: '聖槍遊俠', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small236000.jpg' },
          { name: '沙漠玫瑰', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small360000.jpg' },
          { name: '覆仇之矛', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small429000.jpg' },
          { name: '逆羽', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small498000.jpg' },
          { name: '殘月之肅', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small523000.jpg' },
        ],
      },
      {
        name: '輔助',
        heroes: [
          { name: '正義巨像', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small3000.jpg' },
          { name: '詭術妖姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small7000.jpg' },
          { name: '遠古恐懼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small9000.jpg' },
          { name: '牛頭酋長', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small12000.jpg' },
          { name: '眾星之子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small16000.jpg' },
          { name: '賞金獵人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small21000.jpg' },
          { name: '墮落天使', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small25000.jpg' },
          { name: '時光守護者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small26000.jpg' },
          { name: '殤之木乃伊', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small32000.jpg' },
          { name: '冰晶鳳凰', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small34000.jpg' },
          { name: '惡魔小醜', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small35000.jpg' },
          { name: '琴瑟仙女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small37000.jpg' },
          { name: '風暴之怒', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small40000.jpg' },
          { name: '天啟者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small43000.jpg' },
          { name: '瓦洛蘭之盾', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small44000.jpg' },
          { name: '邪惡小法師', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small45000.jpg' },
          { name: '諾克薩斯統領', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small50000.jpg' },
          { name: '蒸汽機器人', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small53000.jpg' },
          { name: '扭曲樹精', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small57000.jpg' },
          { name: '德瑪西亞皇子', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small59000.jpg' },
          { name: '覆仇焰魂', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small63000.jpg' },
          { name: '不屈之槍', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small80000.jpg' },
          { name: '曙光女神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small89000.jpg' },
          { name: '光輝女郎', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small99000.jpg' },
          { name: '遠古巫靈', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small101000.jpg' },
          { name: '深海泰坦', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small111000.jpg' },
          { name: '爆破鬼才', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small115000.jpg' },
          { name: '仙靈女巫', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small117000.jpg' },
          { name: '荊棘之興', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small143000.jpg' },
          { name: '星籟歌姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small147000.jpg' },
          { name: '虛空之眼', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small161000.jpg' },
          { name: '弗雷爾卓德之心', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small201000.jpg' },
          { name: '滌魂聖槍', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small235000.jpg' },
          { name: '喚潮鮫姬', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small267000.jpg' },
          { name: '魔法貓咪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small350000.jpg' },
          { name: '魂鎖典獄長', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small412000.jpg' },
          { name: '星界遊神', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small432000.jpg' },
          { name: '幻翎', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small497000.jpg' },
          { name: '镕鐵少女', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small526000.jpg' },
          { name: '血港鬼影', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small555000.jpg' },
          { name: '愁雲使者', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small711000.jpg' },
          { name: '腕豪', avatar: 'https://game.gtimg.cn/images/lol/act/img/skin/small875000.jpg' },
        ],
      },
    ]

    // 略過繼續執行遍歷
    for (let cat of rawData) {
      if (cat.name === '全部') {
        continue
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.name,
      })
      cat.heroes = cat.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })
      // 录入英雄
      await Hero.insertMany(cat.heroes)
    }

    res.send(await Hero.find())
  })

  // 英雄列表接口
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄列表',
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'heroes',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList',
        },
      },
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '全部',
      heroList: await Hero.find()
        .where({
          categories: { $in: subCats },
        })
        .limit(100)
        .lean(),
    })
    res.send(cats)
  })

  // 文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find()
      .where({
        categories: { $in: data.categories },
      })
      .limit(2)
    res.send(data)
  })

  // 英雄詳情
  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero.findById(req.params.id).populate('categories items1 items2 partners.hero').lean()
    res.send(data)
  })

  app.use('/web/api', router)
}
