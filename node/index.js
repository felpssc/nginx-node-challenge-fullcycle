const express = require('express');
const mysql = require('mysql');
const { faker } = require('@faker-js/faker');

const app = express();

const port = 3001;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'app'
};

const connection = mysql.createConnection(config);

const createTableSql = `CREATE TABLE if not exists people (id int auto_increment primary key, name VARCHAR(50));`;

connection.query(createTableSql);

const insertSql = `INSERT INTO people (name) values ('${faker.person.firstName()}');`;

connection.query(insertSql);

const selectSql = "SELECT * FROM people;";

app.get('/', (req, res) => {

  connection.query(selectSql, function (error, results, fields) {
    if (error) throw error;
    
    let list = '<ul>';

    for (let people of results) {
      list += `<li>${people.id} - ${people.name}</li>`
    }

    list += '</ul>';
    
    res.send('<h1>Full Cycle Rocks!</h1>' + list);
  });

});

app.listen(port, () => {
  console.log(`🔥 Server is running on ${port}`)
});