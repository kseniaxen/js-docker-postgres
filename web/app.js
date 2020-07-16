/* логика веб-сервера на платформе Node.js, соединяющего веб-клиента с БД через СУБД postgres*/
// подключение библиотеки для упрощения написания роутов -
// сопоставлений "адрес-действие"
const express = require('express');
const app = express();
// подключение библиотеки для взаимодействия с СУБД postgres
const pgp = require("pg-promise")(/*options*/);
// составная строка соединения с БД:
// если приложение запускается на отладочном сервере -
// выбираются значения, заданные статически,
// а если при помощи docker-compose - то из переменных файла docker-compose.yml
const db_host = process.env.DB_HOST || 'localhost';
const db_user = process.env.DB_USER || 'remote_admin';
const db_password = process.env.DB_PASSWORD || 1;
const db_port = process.env.DB_PORT || 5432;
const db = pgp(`postgres://${db_user}:${db_password}@${db_host}:${db_port}/postgres`);
// параметры для запуска веб-сервера express
const port = process.env.WEB_PORT || 4000;
const host = process.env.WEB_HOST || 'localhost';
// перехватчик веб-запросов к корневому адресу сайта:
// возвращать статические файлы из каталога public
app.use('/', express.static(__dirname + '/public'));
// перехватчик веб-запросов к корневому адресу api сайта:
// возвращать данные, преобразованные в формат json
app.use('/api', express.json({'limit':'10mb'}));
// обработчик веб-запросов на получение списка описаний всех товаров
/* app.get('/api/product', function (req, res) {
  // sql-запрос на получение списка описаний всех товаров из БД
  db.query("SELECT * FROM product ORDER BY id DESC")
    .then(function (data) {
      // вывод рзультатов к консоль сервера и отправка веб-клиенту
      console.log("DATA:", JSON.stringify(data));
      res.send(`{"data": ${JSON.stringify(data)}}`);
    })
    .catch(function (error) {
      // вывод ошибки к консоль сервера и отправка веб-клиенту
      console.log("ERROR:", error);
      res.send(`{"data": ${error}}`);
    });
});
// обработчик веб-запросов на добавление описания товара
app.post('/api/product', function (req, res) {
  // извлечение объекта описания нового товара из тела веб-запроса
  const newProduct = req.body;
  console.log(`{data: ${JSON.stringify(newProduct)}}`);
  // sql-запрос на добавление описания товара в БД
  db.none(`INSERT INTO product (title, description, price, quantity, image) VALUES ('${newProduct.title}', '${newProduct.description}', '${newProduct.price == 0 ? 0.00 : newProduct.price}', '${newProduct.quantity == 0 ? 0 : newProduct.quantity}', '${newProduct.image}')`)
    .then(function (data) {
      // отправка веб-клиенту статуса "создано" и сообщения об этом в теле ответа
      res.status(201).json({"message": "a new product was created"});
    })
    .catch(function (error) {
      console.log("ERROR:", error);
      // отправка веб-клиенту статуса "ошибка на сервере" и сообщения об этом в теле ответа
      res.status(500).json({"error": error});
    });
}); */
app.route('/api/product')
  .get(function (req, res) {
    // sql-запрос на получение списка описаний всех товаров из БД
    db.query("SELECT * FROM product ORDER BY id DESC")
      .then(function (data) {
        // вывод рзультатов к консоль сервера и отправка веб-клиенту
        console.log("DATA:", JSON.stringify(data));
        res.send(`{"data": ${JSON.stringify(data)}}`);
      })
      .catch(function (error) {
        // вывод ошибки к консоль сервера и отправка веб-клиенту
        console.log("ERROR:", error);
        res.send(`{"data": ${error}}`);
      });
  })
  .post(function (req, res) {
    // извлечение объекта описания нового товара из тела веб-запроса
    const newProduct = req.body;
    console.log(`{data: ${JSON.stringify(newProduct)}}`);
    // sql-запрос на добавление описания товара в БД
    db.none(`INSERT INTO product (title, description, price, quantity, image) VALUES ('${newProduct.title}', '${newProduct.description}', '${newProduct.price == 0 ? 0.00 : newProduct.price}', '${newProduct.quantity == 0 ? 0 : newProduct.quantity}', '${newProduct.image}')`)
      .then(function (data) {
        // отправка веб-клиенту статуса "создано" и сообщения об этом в теле ответа
        res.status(201).json({"message": "a new product was created"});
      })
      .catch(function (error) {
        console.log("ERROR:", error);
        // отправка веб-клиенту статуса "ошибка на сервере" и сообщения об этом в теле ответа
        res.status(500).json({"error": error});
      });
  })
// запуск прослушивания веб-запросов настроенным выше экземпляром веб-сервера
app.listen(port, host, function () {
  console.log(`running on http://${host}:${port}`);
});