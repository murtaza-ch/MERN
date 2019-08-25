const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');    

const app=express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://murtaza:murtaza123@todo-oo9wu.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('Connected to mongodb');
}).catch((err)=>{
    console.log(err);
})

//User Routes
app.use('/',require('./routes/api/signUp'));
app.use('/',require('./routes/api/data'));
app.use('/',require('./routes/api/login'));
app.use('/',require('./routes/api/image'));

app.use(express.static('uploads'));

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server Started on port ${port}`));
