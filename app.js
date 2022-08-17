const express = require('express');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const usersRoute = require('./routes/usersRoute');
const cardsRoute = require('./routes/cardsRoute');
const nonExistRoute = require('./routes/nonExistRoute');

const app = express();
app.use(helmet());
app.use('/', usersRoute);
app.use('/', cardsRoute);
app.use('*', nonExistRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
