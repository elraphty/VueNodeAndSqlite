
let registerOptions = {
  method: 'POST',
  uri: 'http://localhost:8081/register',
  json: true,
  body: {
    email: '',
    password: ''
  }
}

let loginOptions = {
  method: 'POST',
  uri: 'http://localhost:8081/login',
  json: true,
  body: {
    email: '',
    password: ''
  }
}

let songOptions = {
  method: 'POST',
  uri: 'http://localhost:8081/songs',
  json: true,
  body: {
    title: null,
    artist: null,
    genre: null,
    album: null,
    albumImageUrl: null,
    youtubeId: null,
    lyrics: null,
    tab: null
  }
}

export default {
  register () {
    return registerOptions
  },
  login () {
    return loginOptions
  },
  postSong () {
    return songOptions
  },
  editSong (id) {
    let editOptions = {
      method: 'PUT',
      uri: `http://localhost:8081/songs/${id}`,
      json: true,
      body: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      }
    }
    return editOptions
  }
}
