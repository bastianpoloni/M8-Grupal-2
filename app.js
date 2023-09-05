import express from 'express';
import { Joya } from './Class/Joya.js';

const app = express();
const joya = new Joya();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/v1/joyas', async (req, res) => {
    try{
        res.json(await joya.listarJoyas());
    }catch(error){
        console.log(error);
    }
});

app.get('/v1/joyas/:id', async (req, res) => {
    const id = req.params.id;
    try{
        res.json(await joya.listarJoya(id));
    }catch(error){
        console.log(error);
        res.status(500).send('Error al listar');
    }
});

app.get('/v1/joyas/nombre/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    try{
        res.json(await joya.listarJoyaPorNombre(nombre));
    }catch(error){
        console.log(error);
        res.status(500).send('Error al listar');
    }
});

app.get('/v1/joyas/material/:material', async (req, res) => {
    try{
        res.json(await joya.listarJoyaPorMaterial(req.params.material));
    }catch(error){
        console.log(error);
        res.status(500).send('Error al listar');
    }
});

app.post('/v1/joyas', async (req, res) => {
    try{
      
      res.status(201).json(await joya.crearJoya(req.body.nombre, req.body.peso, req.body.precio, req.body.material));
    } catch(error){
        console.log(error);
    }
});

app.put('/v1/joyas/:id', async (req, res) => {
    try{
        await joya.actualizarJoya(req.params.id, req.body.nombre, req.body.peso, req.body.precio, req.body.material);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
    }
});

app.delete('/v1/joyas/:id', async (req, res) => {
    try{
        const result = await joya.eliminarJoya(req.params.id);
        res.status(200).send(result);
    } catch(error){
        console.log(error);
    }
});



app.listen(3000, () => {
    console.log('Listening on port 3000')
});