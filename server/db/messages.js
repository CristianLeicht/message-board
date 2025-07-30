//WRITING METHODS FOR INSERTING DB AND READING FROM DE DB 
const db = require('./connection') //REQUIRING IN THE CONECTION TO THE DB
const Joi = require('joi');


const messages = db.get('messages')

//RULES OF VALIDATION
const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
         /https?/

        ]
    })
})

function getAll(){
    return messages.find();
}
// BASIC VALIDATION WITH JOI FOR WHAT THE USER IS SENDING TO THE DB
function insert(message){

    if(!message.username) message.username = 'Anonymous';
    
//    const result = Joi.validate(message, schema);
    const { error } = schema.validate(message);

    if(error == null){
        message.created = new Date();
    return messages.insert(message);
    }else {
        return Promise.reject(error)
    }
}

module.exports = {
    getAll,
    insert
};