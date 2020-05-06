const express = require("express");
const router = express.Router();

const DevicesController = require("../controllers/devicescontroller");
const DataController = require("../controllers/collected_datacontrollers");

const checkAuth = require("../auth/auth");

router.route("/").get(DevicesController.getDevices)
                               .post(DevicesController.postDevice);

router.route("/:deviceID").get(DevicesController.getOneDevice)
    .delete(DevicesController.deleteOneDevice)
    .put(DevicesController.updateOneDevice);

router.route("/:deviceID/sensor").put(DevicesController.updateSensorName)
    .delete(DevicesController.deleteSensors);

router.route("/:deviceID/message").get(DataController.getCollectedData)
    .delete(DataController.deleteData);
    // .post(DataController.createCollectedData);

module.exports = router;
