const {Bookmark,Song,User} = require('../models')
const _= require('lodash')
/* eslint-disable */
module.exports = {
  async index (req, res) {

    //const userId=req.user.id
    const {songId,userId}=req.query

    if(songId)
    {
    try {
      
      const bookmark = await Bookmark.findAll({
          where:{
              UserId:userId,
              SongId:songId
          }
      })
  res.send(bookmark)    
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch songs',
        res:err.toString()
      })
    }

  }
  else{

    try {
      
     const bookmark = await Bookmark.findAll({
          where:{
              UserId:userId
          },
          include: [{
            model:Song
          }]
        /*  .map(bookmark => bookmark )
          .map(bookmark => _.extend({
            bookmarkId:bookmark.id
          }, bookmark))
          */
      })
        //res.send(bookmark) 
        
        const song=await Song.findAll({
        where:{
          id:1
        }  
        })

        res.send(song) 
        
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch songs',
        res:err.toString()
      })
    }
  }
  
  },
  async post (req, res){
   
    try {

    
      let {songId, userId}= req.body; 
    
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }

    const insertBookmark = await Bookmark.create({
      SongId: songId,
      UserId: userId
    })
    res.send(insertBookmark)    
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured Create bookmark',
        res:err.toString()
      })
    }

  },

  async delete (req, res){
    try {
      const bookmarkId= req.params.bookmarkId;
      console.log('BoormarkId',bookmarkId)
      //res.send(bookmarkId)  
      const bookmark = await Bookmark.findById(
        bookmarkId
      ).then((book)=>{
        res.send(book) 
      }).catch((e)=>{
        res.send(e.toString)
      })
      
   
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured Deleting bookmark',
        res:err.toString()
      })
    }
  }

}
