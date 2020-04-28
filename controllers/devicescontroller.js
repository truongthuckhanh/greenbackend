const Device = require("../models/Device");
const collectedData = require("../models/Collected_Data");

module.exports = {
    getDevices: async (req, res, next) => {
        try {
            const devices = await Device.find()
                    .lean()
                    .sort({deviceName: 1})
                    .select({_id: 1, deviceID: 1, deviceName: 1, sensors: 1});
                if (devices < 1) {
                    return res.status(200).json({
                        message: "No devices created in database"
                    });
                } else {
                    return res.status(200).json({
                        message: "Getting list of devices: ",
                        numberOfDevices: devices.length,
                        devices: devices
                    });
                }
        } catch (err) {
            console.log("Error " + err);
            res.status(400).json({
                message: err
            });
        }
    },

    postDevice: async (req, res, next) => {
        try {
            // async function init() {
            //     console.log("Cleaning DB");
            //     await Promise.all([Device.deleteMany(), collectedData.deleteMany()]);
            //     console.log("DB cleaned");
            //
            //     const numberOfDevices = 50;
            //     console.log(`Adding ${numberOfDevices} devices to DB`);
            //     await Device.populateDBWithDummyData(numberOfDevices);
            //     console.log(`Finished populating the DB with ${numberOfDevices} devices`);
            //
            //     return true;
            // }
            // await init();
            //
            // async function dataInit() {
            //     const numberOfCollectedData = 10;
            //     console.log(`Adding ${numberOfCollectedData} data field to each device`);
            //     await collectedData.populateDeviceWithDummyData(numberOfCollectedData);
            //     console.log(`Finished populating each device with ${numberOfCollectedData} data field`);
            // }
            //
            // await dataInit();
            Device.findOne({deviceID: req.body.deviceID})
                .then(async (device) => {
                    if (device) {
                        return res.status(200).json({
                            type: "1",
                            message: 'One device has that ID, please change your ID'
                        });
                    } else {
                        const newDevice = new Device({
                            deviceID: req.body.deviceID,
                            deviceName: req.body.deviceName
                        });
                        for (let i = 0; i < req.body.sensorCount; i++) {
                            newDevice.sensors[i] = req.body.sensors[i];
                        }
                        const dataAttached = new collectedData({deviceID: req.body.deviceID});
                        await Promise.all([dataAttached.save(), newDevice.save()]);
                        return res.status(200).json({
                            type: "1",
                            message: 'Device and data created successfully'
                        });
                    }
                });
        } catch (err) {
            console.log("Error " + err);
            res.status(400).json({
                message: err
            });
        }
    },

    getOneDevice: async (req, res, next) => {
        try {
            const getOneDevice = await Device.find({deviceID: req.params.deviceID})
                .lean()
                .then(result => {
                    res.status(200).json({
                        type: 1,
                        device: result
                    });
                });
        } catch (err) {
            console.log("Error " + err);
            res.status(400).json({
                message: err
            });
        }
    },

    deleteOneDevice: async (req, res, next) => {
        try {
            await Promise.all([Device.deleteOne({deviceID: req.params.deviceID}), collectedData.deleteMany({deviceID: req.params.deviceID})]);
            res.status(200).json({
                type: "success",
                message: `Successfully delete device with ID ${req.params.deviceID} and data attached`
            });
        } catch (err) {
            console.log("Error " + err);
            res.status(400).json({
                message: err
            });
        }
    },

    updateOneDevice: async (req, res, next) => {
        try {
            await Promise.all([Device.updateOne(
                {deviceID: req.params.deviceID},
                { $set: req.body }
            )]);
            res.status(200).json({
                type: '1',
                message: `Successfully update device with ID ${req.params.deviceID}`
            });
        } catch (err) {
            console.log("Error " + err);
            res.status(400).json({
                message: err
            });
        }
    }
};