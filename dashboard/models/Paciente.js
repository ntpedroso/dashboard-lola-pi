import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const paciente = connection.define('paciente', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    responsavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nivel_gravidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    foto_perfil: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

//paciente.sync({force: false});

export default paciente;