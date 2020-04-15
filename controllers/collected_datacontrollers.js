const collectedData = require("../models/Collected_Data");

module.exports = {
    getCollectedData: async (req, res, next) => {
        try {
            const getcollected_Data = await collectedData.find({deviceID: req.params.deviceID});
            if (getcollected_Data < 1) {
                return res.status(200).json({
                    message: "Data cannot be collected from this device"
                });
            } else {
                return res.status(200).json({
                    message: "Getting data from device: ",
                    numberOfData: getcollected_Data.length,
                    data: getcollected_Data
                });
            }
        } catch (err) {
            console.log("Error " + err);
            res.status(400).json({
                message: err
            });
        }
    },

    // createCollectedData: async (req, res, next) => {
    //     try {
    //         const newDataCollected = new collectedData({
    //             deviceID: req.params.deviceID
    //         });
    //         newDataCollected.save();
    //     } catch (err) {
    //         console.log('Error' + err);
    //         res.status(400).json({
    //             message: err
    //         });
    //     }
    // }
};