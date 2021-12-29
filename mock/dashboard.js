const data = require('./dashboard.json')

module.exports = [
  {
    url: '/dashboard/list',
    type: 'get',
    response: () => ({ code: 20000, data })
  }
]
