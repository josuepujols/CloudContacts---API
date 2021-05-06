//Importamos la conexion a la base de datos
const mysql_connection = require('../database');


const express = require ('express');
const router = express.Router();


//Creamos las rutas

//Ruta para obtener los contactos
router.get('/contacts', (req, res) => {
    mysql_connection.query('SELECT * FROM contactos', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        }
        else {
            console.log(error);
        } 
    });
});

//Ruta para obtener contacto por busqueda 
router.get('/search/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    console.log("'%" + nombre + "%'");
    mysql_connection.query("SELECT * FROM contactos WHERE NOMBRE LIKE ?", ["%" + nombre + "%"],(error, rows, fields) => {
        if (!error) {
            res.json(rows);
        }
        else {
            console.log(error);
        } 
    });
});

//Ruta para crear un contacto 
router.post('/new-contact', (req, res) => {
    const { nombre, apellido, telefono, email } = req.body;

    mysql_connection.query("INSERT INTO contactos (NOMBRE, APELLIDO, TELEFONO, EMAIL) VALUES (?, ?, ?, ?)", [nombre, apellido, telefono, email], (error, rows, fields) => {
        if (!error) {
            res.json({
                "Status": 'Contacto agregado'
            });
        }   
        else {
            console.log(error);
        }
    });

});

//Ruta para actualizar un contacto 
router.put('/update-contact/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, telefono, email } = req.body;
    //Creo la consulta 
    const consulta = "UPDATE contactos SET NOMBRE = ?, APELLIDO = ?, TELEFONO = ?, EMAIL = ? WHERE ID = ?";

    mysql_connection.query(consulta, [nombre, apellido, telefono, email, id], (error, rows, fields) => {
        if (!error) {
            res.json({"Status": "Se ha actualizado el contacto correctamente."});   
        }
        else {
            console.log(error);
        }
    });

});

//Ruta para borrar un contacto
router.delete('/delete-contact/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM contactos WHERE ID = ?";

    mysql_connection.query(query, [id], (error, rows, fileds)   => {
        if (!error) {
            
        }
        else {
            res.json({"Status": "Se ha borrado el contacto correctamente."});
        }
    });    

});


module.exports = router;
