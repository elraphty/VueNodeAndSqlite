
import rp from 'request-promise'

export default {
  index (search) {
    return rp(
      {
        method: 'GET',
        uri: 'http://localhost:8081/songs',
        json: true,
        qs: {
          search: search
        }
      }
    )
  },
  postSong (options) {
    return rp(options)
  },
  editSong (options) {
    return rp(options)
  },
  getSingleSong (songId) {
    return rp(
      {
        method: 'GET',
        uri: `http://localhost:8081/songs/${songId}`,
        json: true
      }
    )
  }
}
