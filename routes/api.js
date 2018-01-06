'use strict';
const express = require('express');
const router = express.Router();

const os = require("os");
const uuid = require('uuid');
const processUuid = uuid.v4();

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: System Status
 */

/**
 * @swagger
 * /api/status:
 *   get:
 *     tags:
 *      - Status
 *     description: System Status
 *     responses:
 *       200:
 *         description: System Status
 */
router.get("/status", checkApiKey, function (req, res) {
    let version = "V0.1";
    console.log(JSON.stringify(req.headers));
    res.render("status", {
        version: version,
        processUuid: processUuid,
        loadAvg: os.loadavg(),
        upTime: (os.uptime() / 3600).toFixed(2),
        processUpTime: (process.uptime() / 3600).toFixed(2)
    });
});

function checkApiKey(req, res, next) {
    if (req.headers.api_key && req.headers.api_key === "123456") {
        next(); // allow the next route to run
    } else {
        res.sendStatus(404);
    }
}

module.exports = router;