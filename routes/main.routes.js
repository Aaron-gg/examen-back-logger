'use strict';

const router = require('express').Router();
const prefix = 'logs';
const prefixAplication = 'aplication';

const validateData = require('../middlewares/validateData');
const aplicationValidation = require('../middlewares/schemasValidation/aplicationsValidation');
const logValidation = require('../middlewares/schemasValidation/logsValidation');

const { verifyT, verifyAplication, verifyLog } = require('../middlewares/verifyToken');

const logController = require('../controllers/logs.controller');
const aplicationController = require('../controllers/aplications.controller');

router.get(`/${prefixAplication}/`, verifyT, aplicationController.all);
router.post(`/${prefixAplication}/`, validateData(aplicationValidation), aplicationController.create);
router.get(`/${prefixAplication}/:id`, verifyAplication, aplicationController.info);
router.put(`/${prefixAplication}/:id`, [verifyAplication, validateData(aplicationValidation)], aplicationController.update);
router.delete(`/${prefixAplication}/:id`, verifyAplication, aplicationController.delete);

router.get(`/${prefix}/`, verifyT, logController.all);
router.post(`/${prefix}/`, [verifyT, validateData(logValidation)], logController.create);
router.get(`/${prefix}/:id`, verifyLog, logController.info);
router.put(`/${prefix}/:id`, [verifyLog, validateData(logValidation)], logController.update);
router.delete(`/${prefix}/:id`, verifyLog, logController.delete);

module.exports = router;