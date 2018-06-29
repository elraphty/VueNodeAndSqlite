import rp from 'request-promise'

/* eslint-disable */

export default {
  index (userId,songId) {
    return rp ({
     method: 'GET',
     uri: 'http://localhost:8081/bookmarks',
     json: true,
      qs: {
      userId: userId,
      songId: songId
       }
    })
  },
  post (data) {
    return rp ({
        method: 'POST',
        uri: 'http://localhost:8081/bookmarks',
        json: true,
         body:data
       })
  },
  delete (id) {
    return rp ({
        method: 'DELETE',
        uri: `http://localhost:8081/bookmarks/${id}`,
        json: true
       })
  }
}
