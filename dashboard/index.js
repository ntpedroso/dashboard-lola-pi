//importando o módulo do express
import express from "express";

import connection from "./config/sequelize-config.js";

import PacienteController from "./controllers/PacienteController.js";
import RelatorioController from "./controllers/RelatorioController.js";
import AtividadeController from "./controllers/AtividadeController.js";
import UsuarioController from "./controllers/UsuarioController.js";

//importando os Models
import Paciente from "./models/Paciente.js";
import Fonoaudiologo from "./models/Fonoaudiologo.js";
import Usuario from "./models/Usuario.js";

import associations from "./config/associations.js";

//criando uma instância do express
const app = express();

//definindo a pasta "public" como diretório para arquivos estáticos
app.use(express.static('public'));

connection
  .query("CREATE DATABASE IF NOT EXISTS lola_pi;")
  .then(() => {
    console.log("O banco de dados está criado!");
  })
  .catch((error) => {
    console.log(`Ocorreu um erro ao criar o banco de dados. Erro ${error}`);
  });

//realizando a conexão com o banco de dados
//retorna uma promessa - then (sucesso) - catch (falha)
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch((error) => {
    console.log(`Ocorreu um erro ao se conectar ao banco. ${error}`);
  });
  
// invocando a função que cria as associações
associations();

Usuario.sync({ force: false })
  .then(() => {
    return Fonoaudiologo.sync({ force: false });
  })
  .then(() => {
    return Paciente.sync({ force: false });
  })
  .then(() => {
    console.log("Entidades criadas e relacionadas com sucesso!");
  })
  .catch((error) => {
    console.log("Ocorreu um erro ao sincronizar os Models: " + error);
  });


//configurando o EJS - o set serve para configurar algo
app.set('view engine', 'ejs');
app.set('views', './views'); // Indica a pasta onde estão seus arquivos .ejs


// configurando o express para aceitar dados vindos do formulário
app.use(express.urlencoded({ extended: false }));

app.use("/", PacienteController);
app.use("/", RelatorioController);
app.use("/", AtividadeController);
app.use("/", UsuarioController);

//rota principal
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/home", function(req,res) {
    res.render("home");
});

//iniciando o servidor na porta 8080
const port = 8080;
//precisa de uma porta e uma função pra tratar o erro (avisar caso o servidor não funcione)
app.listen(port, (error) => {
  if (error) {
    console.log("Ocorreu um erro ao iniciar o servidor!" + error);
  } else {
    console.log(`Servidor iniciado com sucesso no endereço http://localhost:${port}`);
  }
});