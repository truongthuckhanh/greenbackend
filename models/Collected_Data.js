const mongoose = require("mongoose");
const Devices = require("../models/Device");
const casual = require("casual");

const Schema = mongoose.Schema;

const Collected_DataSchema = new Schema({
    deviceID: {type: String},
    callback: {type: String, default: "http://backend-preprod.humm-box.com/data/uplink?device=2084D4&data=109c011163&time=1558040452&key=1aef640e33ec760b5032ed72dfb5c586"},
    message_code: {type: Number, default: 10.0000000001},
    error_communication_error: [],
    error_out_of_range: [],
    null_fields: [],
    created_at: {type: Date, default: Date.now()},
    msid: {type: String, default: "7c9956d98ecb105637ebe60261809770"},
    deviceType: {type: String, default: "66_H2S_ppb"},
    firmwareVersion: {type: String, default: "51.10"},
}, {
    strict: false
});

Collected_DataSchema.index({deviceID: 1});

const CollectedData = mongoose.model("CollectedData", Collected_DataSchema);

CollectedData.populateDeviceWithDummyData = function (numberOfCollectedData) {
    (async (req, res, next) => {

    })();
};

module.exports = CollectedData;
