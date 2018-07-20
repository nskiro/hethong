const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

describe.only('## Device Asking APIs', () => {
    let deviceAsking = {
        askingDate: Date.now(),
        askingName: 'Hồ Minh Tam',
        askingItems: [
            {
                itemName: 'Bộ Máy Vi Tính',
                itemUnit: 'Bộ',
                itemAmount: 1,
                itemPrice: 9320000,
                itemNote: 'Phòng Sơ Đồ'
            }
        ]
    }

    describe('# POST /api/device-askings', () => {
        it('should create a new device asking', (done) => {
            request(app)
                .post('/api/device-askings')
                .send(deviceAsking)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.askingDate).to.be.a('string');
                    expect(res.body.askingName).to.equal(deviceAsking.askingName);
                    deviceAsking = res.body;
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /api/device-askings', () => {
        it('should delete a device asking', (done) => {
            request(app)
                .delete(`/api/device-askings/${deviceAsking._id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.askingDate).to.be.a('string');
                    expect(res.body.askingName).to.equal(deviceAsking.askingName);
                    done();
                })
                .catch(done);
        });
    });
})