//instalando programas 

const mongoose = require("mongoose");

const express = require("express");

const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const port= 3000; 

//configurando o acesso ao mongodb 

mongoose.connect('mongodb://127.0.0.1:27017/revAC2MIA',  //inserir nome do banco de dados proprio inves do revac2mia
{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 20000
});

//criando a model do seu projeto 

const PessoaSchema = new mongoose.Schema({
    nome : {type : String}, 
    email : {type : String, require : true}, 
    endereco :  {type : String},
    numero : {type : Number},
    cep : {type : String, require : true},
    nascimento : {type : Date, require : true}
});

const Pessoa = mongoose.model("Pessoa", PessoaSchema);

//configurando os roteamentos 

app.post("/cadastropessoa", async(req, res)=>{
    const nome = req.body.nome; 
    const email =  req.body.email;
    const endereco = req.body.endereco;
    const numero = req.body.numero;
    const cep = req.body.cep;
    const nascimento = req.body.nascimento 

    const pessoa = new Pessoa({
        nome : nome, 
        email : email, 
        endereco : endereco, 
        numero : numero, 
        cep : cep, 
        nascimento : nascimento
    })

    try{
        const newPessoa = await pessoa.save(); 
        res.json({error : null, msg : "Cadastro ok", pessoaId : newPessoa._id}); 
    } 
    
    catch(error){
        res.status(400).json({error}); 
    }
}); 

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html")
})

//configurando a porta 

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})