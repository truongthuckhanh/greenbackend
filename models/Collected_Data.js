const mongoose = require("mongoose");
const Devices = require("../models/Device");
const casual = require("casual");

const Schema = mongoose.Schema;

const Collected_DataSchema = new Schema({
    deviceID: {type: String},
    created_at: {type: Date, default: "2019-05-16T21:00:52.000Z"},
    callback: {type: String, default: "http://backend-preprod.humm-box.com/data/uplink?device=2084D4&data=109c011163&time=1558040452&key=1aef640e33ec760b5032ed72dfb5c586"},
    message_code: {type: Number, default: 10.0000000001},
    h2s_raw: {type: Number, default: 412.0000000001},
    alert_h2s_raw: {type: Boolean, default: false},
    error_communication_error: [],
    error_out_of_range: [],
    temperature_air_td1208: {type: Number, default: 17.0000000001},
    alert_temperature_air_td1208: {type: Boolean, default: false},
    battery_carte: {type: Number, default: 99.0000000001},
    alert_battery_carte: {type: Boolean, default: false},
    gain_sensor_correction_factor: {type: Number, default: 0.99225},
    alert_gain_sensor_correction_factor: {type: Boolean, default: false},
    gain_sensor_corrected: {type: Number, default: 1.71262},
    alert_gain_sensor_corrected: {type: Boolean, default: false},
    bias_point_correction_factor: {type: Number, default: 7.16108},
    alert_bias_point_correction_factor: {type: Boolean, default: false},
    bias_point_sensor_corrected: {type: Number, default: 322.16108},
    alert_bias_point_sensor_corrected: {type: Boolean, default: false},
    a: {type: Number, default: 583.90069},
    alert_a: {type: Boolean, default: false},
    b: {type: Number, default: -188.11008},
    alert_b: {type: Boolean, default: false},
    h2s_ppb: {type: Number, default: 52.457},
    alert_h2s_ppb: {type: Boolean, default: false},
    alert_data_array_1week: {type: Boolean, default: false},
    max_h2s_ppb_1week: {type: Number, default: 119.23037},
    alert_max_h2s_ppb_1week: {type: Boolean, default: false},
    ranking_h2s_ppb: {type: Number, default: 2.0000000001},
    alert_ranking_h2s_ppb: {type: Boolean, default: false},
    average_h2s_ppb_1week: {type: Number, default: 46.31335},
    alert_average_h2s_ppb_1week: {type: Boolean, default: false},
    ranking_max_h2s_ppb_1week: {type: Number, default: 2.0000000001},
    alert_ranking_max_h2s_ppb_1week: {type: Boolean, default: false},
    min_h2s_ppb_1week: {type: Number, default: 14.70869},
    alert_min_h2s_ppb_1week: {type: Boolean, default: false},
    pressure: {type: Number, default: 1010.0000000001},
    alert_pressure: {type: Boolean, default: false},
    precipitation_last_9_hours: {type: Number, default: 1e-10},
    alert_precipitation_last_9_hours: {type: Boolean, default: false},
    wind_speed: {type: Number, default: 3.95},
    alert_wind_speed: {type: Boolean, default: false},
    pluvio_instant: {type: Number, default: 15.4},
    alert_pluvio_instant: {type: Boolean, default: false},
    ranking_wind_speed: {type: Number, default: 1e-10},
    alert_ranking_wind_speed: {type: Boolean, default: false},
    wind_speed_gust: {type: Number, default: 13.03},
    alert_wind_speed_gust: {type: Boolean, default: false},
    wind_direction: {type: Number, default: 2.0000000001},
    alert_wind_direction: {type: Boolean, default: false},
    ranking_wind_gust: {type: Number, default: 1.0000000001},
    alert_ranking_wind_gust: {type: Boolean, default: false},
    pluvio_24h: {type: Number, default: 389.6},
    alert_pluvio_24h: {type: Boolean, default: false},
    null_fields: [],
    msid: {type: String, default: "7c9956d98ecb105637ebe60261809770"},
    deviceType: {type: String, default: "66_H2S_ppb"},
    firmwareVersion: {type: String, default: "51.10"},
});

Collected_DataSchema.index({deviceID: 1});

const CollectedData = mongoose.model("CollectedData", Collected_DataSchema);

CollectedData.populateDeviceWithDummyData = function (numberOfCollectedData) {
    (async () => {
        const devices = await Devices.find()
            .lean()
            .select({deviceID: 1});
        console.log(devices);
        if (devices < 1) {
            console.log("No devices in database");
        } else {
            for (let i = 0; i < devices.length; i++) {
                const docs = [...new Array(numberOfCollectedData)].map(_ => ({
                    deviceID: devices[i].deviceID,
                    created_at: Date.now(),
                    message_code: casual.double(10, 1000),
                    h2s_raw: casual.double(10, 1000),
                    alert_h2s_raw: casual.boolean,
                    temperature_air_td1208: casual.double(10, 1000),
                    alert_temperature_air_td1208: casual.boolean,
                    battery_carte: casual.double(10, 1000),
                    alert_battery_carte: casual.boolean,
                    gain_sensor_correction_factor: casual.double(10, 1000),
                    alert_gain_sensor_correction_factor: casual.boolean,
                    gain_sensor_corrected: casual.double(10, 1000),
                    alert_gain_sensor_corrected: casual.boolean,
                    bias_point_correction_factor: casual.double(10, 1000),
                    alert_bias_point_correction_factor: casual.boolean,
                    bias_point_sensor_corrected: casual.double(10, 1000),
                    alert_bias_point_sensor_corrected: casual.boolean,
                    a: casual.double(10, 1000),
                    alert_a: casual.boolean,
                    b: casual.double(10, 1000),
                    alert_b: casual.boolean,
                    h2s_ppb: casual.double(10, 1000),
                    alert_h2s_ppb: casual.boolean,
                    alert_data_array_1week: casual.boolean,
                    max_h2s_ppb_1week: casual.double(10, 1000),
                    alert_max_h2s_ppb_1week: casual.boolean,
                    ranking_h2s_ppb: casual.double(10, 1000),
                    alert_ranking_h2s_ppb: casual.boolean,
                    average_h2s_ppb_1week: casual.double(10, 1000),
                    alert_average_h2s_ppb_1week: casual.boolean,
                    ranking_max_h2s_ppb_1week: casual.double(10, 1000),
                    alert_ranking_max_h2s_ppb_1week: casual.boolean,
                    min_h2s_ppb_1week: casual.double(10, 1000),
                    alert_min_h2s_ppb_1week: casual.boolean,
                    pressure: casual.double(10, 1000),
                    alert_pressure: casual.boolean,
                    alert_precipitation_last_9_hours: casual.boolean,
                    wind_speed: casual.double(10, 1000),
                    alert_wind_speed: casual.boolean,
                    pluvio_instant: casual.double(10, 1000),
                    alert_pluvio_instant: casual.boolean,
                    alert_ranking_wind_speed: casual.boolean,
                    wind_speed_gust: casual.double(10, 1000),
                    alert_wind_speed_gust: casual.boolean,
                    wind_direction: casual.double(10, 1000),
                    alert_wind_direction: casual.boolean,
                    ranking_wind_gust: casual.double(10, 1000),
                    alert_ranking_wind_gust: casual.boolean,
                    pluvio_24h: casual.double(10, 1000),
                    alert_pluvio_24h: casual.boolean
                }));
                await Promise.all([CollectedData.insertMany(docs)]);
            }
        }
    })();
};

module.exports = CollectedData;