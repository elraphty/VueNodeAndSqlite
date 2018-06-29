/* eslint-disable */
const Joi=require('joi')

module.exports={
    register (req,res,next){
        const schema={
          email:Joi.string().email(),
          password:Joi.string().regex(
              new RegExp('^[a-zA-Z0-9-W]{7,100}$')
          )
        }

        const {error,value}=Joi.validate(req.body,schema)
        if(error){
            switch(error.details[0].context.key)
            {
                case 'email':
                res.status(400).send({error:'You must provide a valid email'})
                break;
                case 'password':
                res.status(400)
                .send({
                    error:'The password provided failed to match the following rules<br> 1. It must contain only the following characters lowercase, uppercase and numbers <br> 2. It must be at least 8 character in length and not greater than 32 characters'
                })
                break;
                default:
                res.status(400).send({
                    error: 'Invalid registration details'
                })
                break;
            }
        }
        else{
        next()
        }
    }
}