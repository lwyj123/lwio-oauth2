const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
  name: { // 名字，纯英文数字下划线，唯一ID
    type: String,
    unique: true,
    required: true
  },
  display_name: { // 显示名字
    type: String,
    required: true
  },
  client_secret: { // client secret
    type: String,
    required: true
  },
  redirect_uri: {
    type: String,
    required: true
  },
  access_token_lifetime_second: { // access token过期时间，单位秒
    type: Number,
    default: 3600
  },
  refresh_token_lifetime_second: {
    type: Number,
    default: 3600 * 24 * 30
  }
})

ClientSchema.set('toObject', {
  transform(doc, ret, options) {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

ClientSchema.statics.createClient = async function({
  name,
  display_name,
  client_secret,
  redirect_uri,
  access_token_lifetime_second = 3600,
  refresh_token_lifetime_second = 3600 * 24 * 30
}) {
  const [clientExist] = await this.find({ $or: [
    { name }
  ] })
  if (clientExist && clientExist.name === name) {
    throw Error('duplicate name')
  }
  if (!display_name) {
    throw Error('need display_name')
  }
  if (!client_secret) {
    throw Error('need client_secret')
  }
  if (!redirect_uri) {
    throw Error('need redirect_uri')
  }
  const client = new this({
    name,
    display_name,
    client_secret,
    redirect_uri,
    access_token_lifetime_second,
    refresh_token_lifetime_second
  })
  const clientDoc = await client.save()
  return clientDoc
}

ClientSchema.statics.getDocById = async function(id) {
  const [client] = await this.find({ _id: id })
  if (client) {
    return client
  }
}

module.exports = mongoose.model('Client', ClientSchema)
