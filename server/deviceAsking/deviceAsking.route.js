const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const deviceAskingCtrl = require('./deviceAsking.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/device-askings - get list of device askings */
    .get(deviceAskingCtrl.list)

    /** POST /api/device-askings - create new device asking */
    .post(validate(paramValidation.createDeviceAsking), deviceAskingCtrl.createAsking);

router.route('/:askingId')

/** DELETE /api/device-askings/:askingId - Delete device asking */
.delete(deviceAskingCtrl.removeAsking)

/** Load device asking when API with askingId route parameter is hit */
router.param('askingId', deviceAskingCtrl.load);

module.exports = router;