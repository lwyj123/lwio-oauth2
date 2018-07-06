
// const path = require('path')
const BaseController = require('./prototype/BaseController')
// const ArticleModal = require('../models/article')
// const pagination = require('../helpers/page')

class Api extends BaseController {
  async GetUserInfo (ctx) {
    // const query = ctx.query
    // const searchQuery = {}
    // if (false) {
    //   searchQuery.$and = []
    // }
    // if (false) {
    //   searchQuery.$or = []
    // }
    // const list = await ArticleModal
    //   .find(searchQuery)
    //   .sort({ updated_at: -1 })

    // const data = pagination.getCurrentPageDataWithPagination(
    //   list.map(item => item.toObject()),
    //   query.offset + 1,
    //   query.limit
    // )
    ctx.body = {
      'test': 'worinima'
    }
  }
}

module.exports = new Api()