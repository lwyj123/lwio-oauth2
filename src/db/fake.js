const MemoryStorage = require('simple-memory-storage')

const db = new MemoryStorage()

// pre-store an user for the example
db.set('lwio', {
  id: '38jfoqu31',
  nickname: 'fucktest',
  username: 'fuckuser'
})

/**
 * we don't use real database in this example
 */
module.exports = db
