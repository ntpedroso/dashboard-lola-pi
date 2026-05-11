//importanto a ORM Sequelize
import Sequelize from "sequelize";

//definindo os dados de conexão com o banco de dados - uma instância
const connection = new Sequelize({
    //tipo do banco
    dialect: 'mysql',
    //endereço do banco
    host: 'localhost',
    //nome do usuário do banco
    username: 'root',
    //senha
    password: '',
    //fuso-horário
    timezone: '-03:00',
    //nome do banco usado na aplicação
    database: 'lola_pi'
});

//exportando o módulo
export default connection;