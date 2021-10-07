const express = require('express');
const createError = require('http-errors');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session')
//redis
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient()
const adminRouter = require('./src/routes/admin.router');
//session config
const sessionsConf = {
  store: new RedisStore({host:'localhost', port:6379, client: redisClient }),
  key: 'sid', // ключ куки (название куки)
  secret: 'asdfghjk', // для шифрования id сессии
  resave: true, // сессия будет сохраняться заново только при изменениях
  saveUninitialized: false, // сохранение (или не сохранение) не инициализированной сессии
  httpOnly: true, // невозможно изменить куку с фронта
  cookie: { expires: 24 * 60 * 60e3 },
}

const userRouter = require('./src/routes/user.router');
//hbs settings
hbs.registerPartials(path.resolve(process.env.PWD, 'src', 'views', 'partials'));

const app = express();
const PORT = 3000;
//session middleware
app.use(session(sessionsConf));

// Сообщаем express, что в качестве шаблонизатора используется "hbs".
app.set('view engine', 'hbs');
// Сообщаем express, что шаблона шаблонизаторая (вью) находятся в папке "ПапкаПроекта/views".
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('views', path.join(process.env.PWD, 'src', 'views'));

app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use('/', indexRouter);
// app.use('/entries', entriesRouter);
app.use('/user', userRouter);

// app.use((req, res, next) => {
//   const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
//   next(error);
// });
app.use('/admin', adminRouter);


app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
})
