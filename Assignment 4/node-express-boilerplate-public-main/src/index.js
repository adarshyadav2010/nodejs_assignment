const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)

app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


// your code goes here
app.get('/', (req, res)=>{
    res.send('Hello world!')
})


// add
app.post('/add', (req, res)=>{
    
    let num1=Number(req.body.num1)
    let num2=Number(req.body.num2)

    let sum=num1+num2;

    if(typeof num1!=='number' || typeof num2!=='number'){
        return res.status(400).send({
            status:'error',
            message:"Invalid data types"
        })
    }
    
    if(sum<-100000){
        return res.status(400).send({
            status:'error',
            message:'Underflow'
        })
    }
    if(sum>100000){
        return res.status(400).send({
            status:'error',
            message:'Overflow'
        })
    }
    res.status(200).send({status:'sucess', message:'the sum of given two numbers', sum: num1+num2})
})


// substract


app.post('/sub', (req, res)=>{

    let num1=Number(req.body.num1)
    let num2=Number(req.body.num2)


    let difference=num1-num2;

    if(typeof num1!=='number' || typeof num2!=='number'){
        return res.status(400).send({
            status:'error',
            message:"Invalid data types"
        })
    }

    if(difference<-100000){
        return res.status(400).send({
            status:'error',
            message:'Underflow'
        })
    }
    if(difference>100000){
        return res.status(400).send({
            status:'error',
            message:'Overflow'
        })
    }
    res.send({status:'sucess', message:'the difference of given two numbers', difference: num1-num2})
})


// multiply 

app.post('/multiply', (req, res)=>{

    let num1=Number(req.body.num1)
    let num2=Number(req.body.num2)


    let result=num1*num2;

    if(typeof num1!=='number' || typeof num2!=='number'){
        return res.status(400).send({
            status:'error',
            message:"Invalid data types"
        })
    }

    if(result<-100000){
        return res.status(400).send({
            status:'error',
            message:'Underflow'
        })
    }
    if(result>100000){
        return res.status(400).send({
            status:'error',
            message:'Overflow'
        })
    }
    res.status(200).send({status:'sucess', message:'the product of given two numbers', result: num1*num2})
})


// divide 

app.post('/divide', (req, res)=>{
    
    let num1=Number(req.body.num1)
    let num2=Number(req.body.num2)


    let result=num1/num2;

    if(typeof num1!=='number' || typeof num2!=='number'){
        return res.status(400).send({
            status:'error',
            message:"Invalid data types"
        })
    }
    if(num2===0){
        result=num1/num2
        return res.status(400).send({
            status:'error',
            message:'Cannot divide by zero'
        })
    } 
    if(result<-100000){
        return res.status(400).send({
            status:'error',
            message:'Underflow'
        })
    }
    if(result>100000){
        return res.status(400).send({
            status:'error',
            message:'Overflow'
        })
    }
    res.status(200).send({status:'sucess', message:'The division of given numbers', result: num1/num2})
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

// module.exports = app;