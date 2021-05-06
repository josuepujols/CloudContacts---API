//Nos conectamos a la base de datos 
const mysql = require('mysql');

const mysql_connection = mysql.createConnection({
    host: 'bnfpayi8vvn02a7cj72k-mysql.services.clever-cloud.com',
    database: 'bnfpayi8vvn02a7cj72k',
    user: 'uu4pjkvqjqkmlyhh',
    password: 'zIrr4EW7pT0GbbAmzK9M'
});


mysql_connection.connect((error) => {
    if (error) {
        console.log(error);
    }
    else{
        console.log("Conexion a la base de datos exitosa.");
    }
});

module.exports = mysql_connection;

