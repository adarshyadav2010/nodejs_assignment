const fs=require('fs')
const data='<h1> Hello World </h1>    <p> This is {Your Name}... </p>'

const http=require('http')

const server=http.createServer((req, res)=>{
    fs.writeFile('index.html', data, (err)=>{
        try{
            console.log('file is created')
        }catch(err){
            console.log(err)
        }
    })

    fs.readFile('index.html', (err)=>{
        if(err){
            res.end('file not found')
        }
        res.end(data)
    })
})

server.listen(5000, ()=>{
    console.log('server is running')
})
