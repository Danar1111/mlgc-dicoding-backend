const { predictHandlerReq, predictHistoriesReq } = require('../server/handler');
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: predictHandlerReq,
    options: {
      payload: {
        allow: 'multipart/form-data',
        maxBytes: 1000000,
        multipart: true
      }
    }
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: predictHistoriesReq,
  }
]
 
module.exports = routes;