import express from 'express'

const app = express()

const port = 3000;
app.use(express.json());

let teadData = []
let nextId = 1

//add a new tea

app.post('/teas',(req,res)=>{
    const {name ,price} = req.body
    const newTea = { id:nextId ++,name ,price}

    teadData.push(newTea)
    res.status(201).send(newTea)
})

// get tea wth id
app.get('/teas/:id',(req,res)=>{
  const tea =   teadData.find(t=>t.id === parseInt(req.params.id))
  if(!tea){
    return res.status(404).send("tea not found")
  }
  res.status(200).send(tea)

})

///update tea

app.put('/teas/:id',(req,res)=>{
   const tea = teadData.find(t => t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send('tea not found')
    }

    const {name , price}= req.body
    tea.name = name
    tea.price = price

    res.status(200).send(tea)

})

//delete
app.delete('/teas/:id',(req,res)=>{
   const index = teadData.findIndex(t => t.id === parseInt(req.params.id))
   if(index === -1){
    return res.status(404).send('tead not found')
   }
   teadData.splice(index,1)
   return res.status(204).send('deleeted ') 

})

app.get('/',(req,res)=>[
    res.send('helo from vinay ')
])

app.get('/ice',(req,res)=>[
    res.send("what ice tea  you prefer??")
])

app.listen(port ,()=>{
    console.log(`server is running at port ${port}`)
})