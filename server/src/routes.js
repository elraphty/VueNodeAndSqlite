/* eslint-disable */
const {User} = require('./models')
const AuthenticationController= require('./controllers/AuthenticationController')
const SongsController= require('./controllers/SongsController')
const BookmarksController= require('./controllers/BookmarksController')
const AuthenticationControllerPolicy= require('./policies/AuthenticationControllerPolicy')
const isAuthenticated= require('./policies/isAuthenticated')

module.exports = (app) => {
    app.post('/register',AuthenticationControllerPolicy.register, AuthenticationController.register )
    app.post('/login', AuthenticationController.login )
    app.get('/songs', SongsController.index )
    app.get('/songs/:songId', SongsController.show)
    app.put('/songs/:songId', SongsController.edit )
    app.post('/songs', SongsController.post )
    app.put('/songs/:songId', SongsController.edit )
    app.get('/all', (req, res) => {
     
        const user =  User.findAll().then((users)=>{
            res.send(users);
            console.log(users)
        },
    (err)=>{

    })   
});
    app.get('/bookmarks', BookmarksController.index)
    app.post('/bookmarks', BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId', BookmarksController.delete)

}
