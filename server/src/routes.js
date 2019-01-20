const { Router } = require('express');
const Controller = require('./controller');

const router = Router();

router.get('/:code', factory('index'));
router.post('/', factory('create'));

function factory(methodName){
  const controller = new Controller();
  return controller[methodName].bind(controller);
}

module.exports = router;