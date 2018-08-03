const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: { // 登录用户名
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: { // 密码
    type: String,
    required: true
  },
  nickname: { // 显示名称，昵称
    type: String,
    unique: true,
    required: true
  },
  meta: { // meta信息
    age: {
      type: Number
    },
    sex: {
      type: String,
      enum: ['male', 'female']
    }
  }
})

UserSchema.set('toObject', {
  transform(doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.password
    delete ret.__v
  }
})

// 添加用户保存时中间件对password进行bcrypt加密,这样保证用户密码只有用户本人知道
UserSchema.pre('save', function(next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})
// 校验用户输入密码是否正确
UserSchema.methods.comparePassword = function(passw, cb) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      cb && cb(err || null, isMatch)
      if (err) {
        reject(new Error('password did not match'))
      }
      resolve()
    })
  })
}

UserSchema.statics.getUserInfoByUsername = async function(username) {
  const [user] = await this.find({ username })
  if (user && user.username) {
    return user
  }
  return null
}

UserSchema.statics.createUser = async function({
  username,
  phone,
  email,
  password,
  nickname,
  meta
}) {
  const [userExist] = await this.find({ $or: [
    { username },
    { phone },
    { email }
  ] })
  if (userExist && userExist.username === username) {
    throw Error('duplicate username')
  }
  if (userExist && userExist.phone === phone) {
    throw Error('duplicate phone')
  }
  if (userExist && userExist.email === email) {
    throw Error('duplicate email')
  }
  if (!password) {
    throw Error('need password')
  }
  const user = new this({
    username,
    phone,
    email,
    password,
    nickname,
    meta
  })
  const userDoc = await user.save()
  return userDoc
}

module.exports = mongoose.model('User', UserSchema)
