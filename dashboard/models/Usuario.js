import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const login = connection.define('login', {
    usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo: {
            type: Sequelize.BOOLEAN,
            allowNull: false
    }
});

//login.sync({force: false});

export default login;