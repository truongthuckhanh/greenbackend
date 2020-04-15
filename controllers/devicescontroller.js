const Device = require("../models/Device");
const collectedData = require("../models/Collected_Data");

module.exports = {
    getDevices: async (req, res, next) => {
        try {
            const devices = await Device.find()
                .lean()
                .sort({deviceName: 1})
                .select({_id: 1, deviceID: 1, deviceName: 1});
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
            async function init() {
                console.log("Cleaning DB");
                await Promise.all([Device.deleteMany(), collectedData.deleteMany()]);
                console.log("DB cleaned");

                const numberOfDevices = 50;
                console.log(`Adding ${numberOfDevices} devices to DB`);
                await Device.populateDBWithDummyData(numberOfDevices);
                console.log(`Finished populating the DB with ${numberOfDevices} devices`);
            }
            await init().then(async () => {
                const device = await Device.find();
            });

            async function dataInit() {
                const numberOfCollectedData = 10;
                console.log(`Adding ${numberOfCollectedData} data field to each device`);
                await collectedData.populateDeviceWithDummyData(numberOfCollectedData);
                console.log(`Finished populating each device with ${numberOfCollectedData} data field`);
            }

            await dataInit();
            return res.status(200).json({
                type: "1",
                message: 'Device and data created successfully'
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
                    console.log(result);
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
            const deleteOneDevice = await Device.remove({deviceID: req.params.deviceID});
            const deleteAttachedData = await collectedData.remove({deviceID: deleteOneDevice.deviceID})
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        type: "success",
                        message: result
                    });
                });
        } catch (err) {
            console.log("Error " + err);
            res.status(400).json({
                message: err
            });
        }
    }
};