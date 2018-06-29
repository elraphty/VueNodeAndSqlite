/* eslint-disable */
//const Sequelize=require('sequelize')
//const Promise = require('bluebird')
//const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

const bcrypt=require('bcryptjs')

function hashPassword (user, options) {
   // salt factor
   // const SALT_FACTOR = 8
  // check if user password has changed
    if (!user.changed('password')) {
      return
    }
  
    return bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.setDataValue('password', hash)
      });
    });
    //if password changed hash password
    /*return bcrypt
    //generate salt
      .genSaltAsync(SALT_FACTOR)
      .then(salt => bcrypt.hashAsync(user.password, salt, null))
      .then(hash => {
          // set value to hash
        user.setDataValue('password', hash)
      })
    */

 
      
  }

module.exports = (sequelize, DataTypes) =>
{
const User=sequelize.define('User',{
email:{
    type: DataTypes.STRING,
    unique:true
},
password:DataTypes.CHAR
}, {
    hooks: {
      beforeCreate:  function hashPassword (user, options) {
        bcrypt.genSalt(8, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
           user.setDataValue('password', hash)
          });
        });
      },
      beforeUpdate: hashPassword,
      beforeSave: function hashPassword (user, options) {
        bcrypt.genSalt(8, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            user.setDataValue('password', hash)
          });
        });
      }
    }
  }
)



//Extending user functions for comparing
User.prototype.comparePassword = function (password) {
    //return bcrypt.compareAsync(password, this.password)
  console.log("pass",password)
      return bcrypt.compare(password,this.password)
  }
  return User
}
