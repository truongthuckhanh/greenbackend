const express = require("express");
const router = express.Router();

const DevicesController = require("../controllers/devicescontroller");
const DataController = require("../controllers/collected_datacontrollers");
const TTNController = require("../controllers/TTNcontrollers");

const checkAuth = require("../auth/auth");

router.route("/").get(DevicesController.getDevices)
                               .post(DevicesController.postDevice);

router.route("/TTN").post(TTNController.TTNPostData);

router.route("/:deviceID").get(DevicesController.getOneDevice)
    .delete(DevicesController.deleteOneDevice)
    .put(DevicesController.updateOneDevice);

router.route("/:deviceID/sensor").put(DevicesController.updateSensorName)
    .post(DevicesController.deleteSensors);

router.route("/:deviceID/message").get(DataController.getCollectedData)
    .post(DataController.deleteData);
    // .post(DataController.createCollectedData);

module.exports = router;
