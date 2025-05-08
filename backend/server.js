const express = require('express');
const  cors=require('cors');
const bodyParser = require('body-parser');
const app=express();
const PORT=3000;
app.use(cors());
app.use(bodyParser.json());
let todos=[];
//traja3li lista ta3 kol tache
app.get('/todos',(req,res)=>{res.json(todos)});
//tajouti tache jdid mel le corps (req.body) fel liste ta3 taches
app.post('/todos',(req,res)=>{
    const todo=req.body;
    todos.push(todo);
    res.json(todo);
})
//tbadeli tache mawjouda avec le meme id
app.put('/todos/:id',(req,res)=>{
    const id=req.params.id;
    const updatedTodo=req.body;
    todos=todos.map(todo=>(todo.id==id ? updatedTodo:todo));
    res.json(updateTodo);})
//supprime le todo qui a cet id
app.delete('/todos/:id',(req,res)=>{
    const id=req.params.id;
    todos=todos.filter(todo=>todo.id!=id);
    res.json({message:'Todo deleted'});

})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
