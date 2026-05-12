import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const fonoaudiologo = connection.define('fonoaudiologo', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    crfa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto_perfil: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

//fonoaudiologo.sync({force:false});

export default fonoaudiologo;