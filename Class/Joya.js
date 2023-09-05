import {pool} from '../connection.js';
import { Sequelize, DataTypes, Op } from 'sequelize';

const sequelize = new Sequelize('gemas_preciosas', 'bastianpoloni', '', {
    dialect: 'postgres', 
    host: 'localhost',
    logging: false,
    timestamps: false});

const joyaModel = sequelize.define('joyas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING} ,
    peso: { type: DataTypes.FLOAT},
    precio: { type: DataTypes.FLOAT},
    material: { type: DataTypes.STRING}
});

sequelize.sync();

export class Joya {
    constructor(){
        this.id;
        this.nombre;
        this.peso;
        this.precio;
        this.material;
    }

    async listarJoyas(){
        const result = await joyaModel.findAll();
        return result;
    }

    async listarJoya(id){
        const result = await joyaModel.findByPk(id);
        return result;
    }

    async crearJoya(nombre, peso, precio, material){
        const result = await joyaModel.create({nombre, peso, precio, material});
        return result;
    }

    async actualizarJoya(id, nombre, peso, precio, material){
        const result = await joyaModel.update({nombre, peso, precio, material}, {where: {id} });
        return result;
    }

    async eliminarJoya(id){
        const result = await joyaModel.destroy({where: {id}});
        if (result === 0){
            return false;
        } else {
            return true;
        }
        
    }

    async listarJoyaPorNombre(nombre){
        const result = await joyaModel.findAll({where: {nombre}});
        return result;
    }
    async listarJoyaPorMaterial(material){
        const result = await joyaModel.findAll({where: {material} } );
        return result;
    }
}
