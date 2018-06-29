const {Song} = require('../models')
/* eslint-disable */
module.exports = {
  async index (req, res) {
    try {
      let song=null
      const search=req.query.search
      if(search)
      {
        //searching for songs with sequlite you need to learn javascript array map
        song= await Song.findAll(
          {
       where:{
         $or:['title', 'album', 'artist', 'genre'].map(key=> ({
           [key] : {
             $like : `%${search}%`
            }
         }))
       }
        
        })
      
      }
      else{
        song= await Song.findAll(
          {
          limit : 10
        }
        )
      }
         
  res.send(song)
          
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch songs',
        res:err.toString()
      })
    }
  },
  async show (req, res) {
    try {
      const songId=req.params.songId;
          const song= await Song.findById(songId)
          res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch songs'
      })
    }
  },
  async post (req, res) {
    try {
          const song= await Song.create(req.body)
          res.send(song)
          
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to insert songs'
      })
    }
  },
  async edit (req, res) {
    try {
      const songId=req.params.songId;
          const song= await Song.update(req.body,{
            where:{
              id:songId
            }
          })
          res.send(req.body)
          
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to Update the songs'
      })
    }
  }


}
