const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const DeviceAsking = require('./deviceAsking.model')

/**
 * Load device asking and append to req.
 */
function load(req, res, next, id) {
    DeviceAsking.get(id)
        .then((deviceAsking) => {
            req.deviceAsking = deviceAsking; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get device asking
 * @returns {DeviceAsking}
 */
function get(req, res) {
    return res.json(req.deviceAsking);
}

/**
 * Get device asking list
 * @property {number} req.query.skip - Number of asking to be skipped.
 * @property {number} req.query.limit - Limit number of asking to be returned.
 * @returns {DeviceAsking[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    DeviceAsking.list({ limit, skip })
        .then(deviceAskings => res.json(deviceAskings))
        .catch(e => next(e));
}

/**
 * Create new device asking
 * @property {Date} req.body.askingDate - Date of asking
 * @property {string} req.body.askingName - People who make the asking
 * @property {Array} req.body.askingItems - Array of asking item objects {itemName, itemUnit, itemAmount, itemPrice, ?itemNote}
 * @returns {DeviceAsking}
 */
function createAsking(req, res, next) {
    const deviceAsking = new DeviceAsking({
        askingDate: req.body.askingDate,
        askingName: req.body.askingName,
        askingItems: req.body.askingItems
    })

    deviceAsking.save()
        .then(savedDeviceAsking => res.json(savedDeviceAsking))
        .catch(e => next(e));
}

/**
 * Delete device asking.
 * @returns {DeviceAsking}
 */
function removeAsking(req, res, next) {
    const deviceAsking = req.deviceAsking;
    deviceAsking.remove()
      .then(deletedDeviceAsking => res.json(deletedDeviceAsking))
      .catch(e => next(e));
  }

module.exports = { load, get, list, createAsking, removeAsking };