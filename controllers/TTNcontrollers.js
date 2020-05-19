const collectedData = require("../models/Collected_Data");
const Devices = require("../models/Device");
const moment = require('moment');
const _ = require('lodash')

module.exports = {

    TTNPostData: async (req, res, next) => {
        try {
            console.log(req.body);
            const deleteDate = await collectedData.find().select('created_at dateToExpire').sort({
                created_at: -1
            });
            for (let i = 0; i < deleteDate.length; i++) {
                deleteDate[i].dateToExpired = moment(`${deleteDate[i].created_at}`).fromNow();
                await Promise.all([deleteDate[i].save(), collectedData.deleteMany({dateToExpired: '10 days ago'})]);
            }
            if (req.body.deviceID == null) {
                console.log("Thiếu ID nên bỏ nhé");
                return res.status(400).json({
                    type: '0'
                });
            } else {
                const device = await Devices.findOne({deviceID: req.body.deviceID})
                    .lean()
                    .select("sensors");
                var idField = {
                    deviceID: req.body.deviceID,
                    created_at: Date.now(),
                    dateToExpired: moment(`${Date.now()}`).fromNow()
                };
                for (let i = 0; i < device.length; i++) {
                    var newField = {
                        [device.sensors[i].sensorName]: req.body.sensor`${i}`
                    };
                    idField = Object.assign(idField, newField);
                }
                const searchDevice = new collectedData(idField);
                await Promise.all([searchDevice.save()]);
                return res.status(200).json({
                    type: '1',
                    data: searchDevice
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: err
            });
        }
    },
};
