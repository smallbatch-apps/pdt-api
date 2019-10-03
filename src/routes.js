
const UserController = require('./controllers/user');
// const DevappController = require('../controllers/devapp');
const AuthController = require('./controllers/auth');
const { checkToken } = require('./middleware');

module.exports = app => {


  app.get('/api/users', checkToken, UserController.index);
  app.get('/api/users/:id', checkToken, UserController.show);
  // app.get('/api/users', checkToken, UserController.show);
  app.patch('/api/users/:id', checkToken, UserController.update);

  // app.get('/api/devapps', checkToken, DevappController.index);
  // app.post('/api/devapps', checkToken, DevappController.store);
  // app.get('/api/devapps/:id', checkToken, DevappController.show);
  // app.patch('/api/devapps/:id', checkToken, DevappController.update);

  // // The following routes are not authenticated
  app.post('/api/users', UserController.store);
  app.post('/api/login', AuthController.authenticate);
}