
const express = require('express');
const app = express();
const pgp = require("pg-promise")(/*options*/);
// const db = pgp("postgres://remote_admin:1@localhost:5432/postgres");
const db_host = process.env.DB_HOST || 'localhost';
const db_user = process.env.DB_USER || 'remote_admin';
const db_password = process.env.DB_PASSWORD || 1;
const db_port = process.env.DB_PORT || 5432;
const db = pgp(`postgres://${db_user}:${db_password}@${db_host}:${db_port}/postgres`);

const port = 8080;
const host = '0.0.0.0';

app.use('/', express.static(__dirname + '/public'));
app.use('/api', express.json());

app.get('/api/product', function (req, res) {
  db.query("SELECT * FROM product")
    .then(function (data) {
      // console.log("DATA:", JSON.stringify(data));
      console.log("DATA:", JSON.stringify(data));
      res.send(`{data: ${JSON.stringify(data)}}`);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      res.send(`{data: ${error}}`);
    });
});

app.post('/api/product', function (req, res) {
  const newProduct = req.body;
  console.log(`{data: ${JSON.stringify(newProduct)}}`);
  db.none(`INSERT INTO product (title, description, price, quantity) VALUES ('${newProduct.title}', '${newProduct.description}', '${newProduct.price}', '${newProduct.quantity}')`)
    .then(function (data) {
      res.status(201).json({'message': 'a new product was created'});
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      res.status(500).json({'error': error});
    });
});

app.listen(port, host, function () {
  console.log(`running on http://${host}:${port}`);
});