import Paciente from "../models/Paciente.js";
import Fonoaudiologo from "../models/Fonoaudiologo.js";
import Usuario from "../models/Usuario.js";

const associations = () => {
    Fonoaudiologo.hasMany(Paciente, {foreignKey: "id_fono"});
    Paciente.belongsTo(Fonoaudiologo, {foreignKey: "id_fono"});
    Usuario.hasOne(Fonoaudiologo, {foreignKey: "id_login"});
    Fonoaudiologo.belongsTo(Usuario, {foreignKey: "id_login"});
    Usuario.hasOne(Paciente, {foreignKey: "id_login"});
    Paciente.belongsTo(Usuario, {foreignKey: "id_login"});
}

export default associations;