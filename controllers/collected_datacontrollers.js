const collectedData = require("../models/Collected_Data");

module.exports = {
    getCollectedData: async (req, res, next) => {
        try {
            const {page, limit} = req.query;
            const options = {
                lean: true,
                sort: {created_at: -1},
                page: parseInt(page),
                limit: parseInt(limit)
            };
            const getcollected_Data = await collectedData.paginate({deviceID: req.params.deviceID}, options);
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

    TTNPostData: async (req, res, next) => {

    },

    deleteData: async (req, res, next) => {
        try {
            console.log(req.body);
            for (let i = 0; i < req.body.dataDeleteID.length; i++) {
                console.log(req.body.dataDeleteID[i]);
                await Promise.all([collectedData.deleteOne({
                    deviceID: req.params.deviceID,
                    _id: req.body.dataDeleteID[i]
                })]);
            }
            console.log("code is here");
            return res.status(200).json({
                type: '1',
                message: 'Data deleted'
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                type: '0',
                error: err
            });
        }
    }
};
