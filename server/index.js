const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const messages = require('./db/messages')

const app = express();

app.use(morgan('tiny'));
app.use(cors())

//THE FORM MAKES A POST REQUEST(HAS DATA WHICH THE SERVER NEEDS TO RECIVE) TO THE SERVER
//THIS LOOKS AT THE DATA AND TURNS INTO A JSON OBJECT, SO IT CAN BE INSERT INTO THE DB
app.use(bodyParser.json())

//CREATING A BASIC GET ROUTE TO SEE IF THE SERVERS ARE WORKING
//WHEN A RESQUEST COME TO THE APP THIS FUNCTION RUNS E SEND BACK A JSON RESPONSE
app.get('/',(req, res) =>{
    res.json({
        message: 'Full stack message board!'
    })
});


//WHEN A GET REQUEST COME TO THE SERVER ON '/MESSAGES' IT WILL GO TO THE GETALL() WHICH TALKS TO THE DB AND GET ALL THE MESSAGES THERE
//IT WILL SEND BACK AN ARRAY OF MESSAGES AND THE RESPONSE WILL BE THE JSON WITH THOSE MESSAGES
app.get('/messages',(req, res) =>{
    messages.getAll().then((messages) => {
        res.json(messages)
    })
})

//WHEN A POST REQUEST IS RECEIVED ON '/MESSAGES' THE BODY OG THE REQUEST IS TAKEN AND INSERT INTO THE DB, IF FAILD, AND ERROR WILL BE SHOWN
app.post('/messages',(req, res) =>{
    console.log(req.body);
    messages.insert(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    })
})

//STARTING THE SERVER ON A SPECIFIC PORT
const port = process.env.PORT || 1234
app.listen(port, () => {
    console.log(`listening on ${port}`)
})