const app = require('./config/express')();
const port = app.get('port');

global.__basedir = __dirname;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});