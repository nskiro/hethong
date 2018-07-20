const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const DeviceAskingSchema = new mongoose.Schema({
    askingDate: { type: Date, default: Date.now },
    askingName: { type: String, required: true },
    askingItems: [{
        itemName: { type: String, required: true },
        itemUnit: { type: String, required: true },
        itemAmount: { type: Number, required: true },
        itemPrice: { type: Number, required: true },
        itemNote: { type: String, default: "" },
    }],
    createdAt: { type: Date, default: Date.now }
});

DeviceAskingSchema.statics = {
    /**
     * Get Device Asking
     * @param {ObjectId} id - The objectId of Device Asking
     * @returns {Promise<DeviceAsking, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((deviceAsking) => {
                if (deviceAsking) {
                    return deviceAsking;
                }
                const err = new APIError('No such device asking exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },
    /**
     * List device asking in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of device asking to be skipped.
     * @param {number} limit - Limit number of device asking to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
}

module.exports = mongoose.model('DeviceAsking', DeviceAskingSchema);