exports.updateModel = async (req, res, next) => {
  try {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ success: true, data: model })
  } catch (err) {
    next(err)
  }
}

exports.createModel = async (req, res, next) => {
  try {
    const model = await req.Model.create(req.body)
    res.status(200).json({ success: true, data: model })
  } catch (err) {
    next(err)
  }
}

exports.deleteModel = async (req, res, next) => {
  try {
    await req.Model.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, msg: '刪除成功' })
  } catch (err) {
    next(err)
  }
}

exports.getModel = async (req, res, next) => {
  try {
    const model = await req.Model.findById(req.params.id)
    res.status(200).json({ success: true, data: { data: model } })
  } catch (err) {
    next(err)
  }
}

exports.getModels = async (req, res, next) => {
  try {
    const total = await req.Model.countDocuments()
    const {
      pagenum,
      pagesize,
      query,
      order } = req.query
    const skipnum = (pagenum - 1) * pagesize

    // 搜索條件
    const reg = new RegExp(query, 'i')
    const filter = {
      name: { $regex: reg }
    }

    const model = await req.Model.find(filter).sort({ 'createdAt': order === 'ascending' ? 1 : -1 }).skip(Number.parseInt(skipnum)).limit(Number.parseInt(pagesize)).populate('categories')

    res.status(200).json({
      success: true,
      data: {
        data: model,
        total
      }
    })
  } catch (err) {
    next(err)
  }
}