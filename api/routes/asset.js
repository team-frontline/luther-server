const express = require('express');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// require('library/testAction');
// import { isUserExists, evaluateCert } from "library/testAction";
const testActions = require("../../library/testAction");

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET requests to /api'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST requests to /api'
    });
});

router.get('/is-user', async (req, res, next) => {
    res.status(200).json({
        message: 'User validated',
        payload: {user: await testActions.isUserExists()}
    });
});

router.get('/test-eval', async (req, res, next) => {
    res.status(200).json({
        message: 'evaluated',
        payload: {certStatus: await testActions.evaluateCert()}
    });
});

router.post('/eval', async (req, res, next) => {
    // console.log(req.body);

    // let subjectName = "hdworks.org";
    // let revokedStatus = "revoked";
    // let certInLedger = "-----BEGIN CERTIFICATE-----\nMIIDljCCAn4CCQDNFbionO/u5DANBgkqhkiG9w0BAQsFADCBiTELMAkGA1UEBhMC\nSU4xEjAQBgNVBAgMCU5ldyBEZWxoaTESMBAGA1UEBwwJTmV3IERlbGhpMQwwCgYD\nVQQKDANDQTIxDjAMBgNVBAsMBUFkbWluMRYwFAYDVQQDDA1hZG1pbi5jYTIuY29t\nMRwwGgYJKoZIhvcNAQkBFg1hZG1pbkBjYTIuY29tMB4XDTE4MDUwNzEzMzM1NloX\nDTIxMDIyNDEzMzM1NlowgY8xCzAJBgNVBAYTAklOMRIwEAYDVQQIDAlOZXcgRGVs\naGkxEjAQBgNVBAcMCU5ldyBEZWxoaTEQMA4GA1UECgwHaGR3b3JrczEOMAwGA1UE\nCwwFYWRtaW4xFDASBgNVBAMMC2hkd29ya3Mub3JnMSAwHgYJKoZIhvcNAQkBFhFh\nZG1pbkBoZHdvcmtzLm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\nAMbclB8bZBuEJpu1MVuvg939NsfI9UdhlAQVUHFj2GLn++H2tNJe8RDchav/Je6D\nmjSzLlt3SsuFjFnngiw1fQpB3FOkOvJulc+0GVJ7JKFILZXnO5TZOtI/PqwDwGGk\nswAXlT9mMy0I0pihNEhEMWXlM2EM+NEQRpgnjgJWRZ5nf8iG5qwqGCUDLcjhH+GO\nZ7POYLM0MZKw78myWsaXtCv/b9LKDjoWWbwqjYAhNWgVcta9OKSYDM6T0zopvDxc\nOD8vfIU0RY8pjDUCFLCKCfE/bdv2p955x6MpLJxJWN4Q4MmBk9YKOSGyMSVbLlkI\nzfmt21qIw6N3HpguN443rtECAwEAATANBgkqhkiG9w0BAQsFAAOCAQEANVIDuWjo\ne7YnmFV82Mn92+h7vDiro1MDXr8jS77TfhhFsuoUjUIaKWZRN7+aySJmeh6zITvo\nzdXa8nkAIBiE2DsiJpJD41yihIeQyleXJezIwEDzbwjo0SX1pkbpXeUs7uAt6GoN\n9sIEywNKuXOWdtK6C/f2/7HcRYMJZ1kWoXc1XYSFzemcgpI0HP3MSmh3KPVQTXsF\nObVPotZXatDqLdezsGZE+hp1oz0uRyO/C2wKikoDbUsKmBELPtjtm6o0znPRLtBY\nHlGhBZL95Znc1FdSzDEj0tlFqUDwYm9kW9K1OlbghXpqPF/xzj9ygG5MlhTYznNf\nXtQVg5VzWMrJ9A==\n-----END CERTIFICATE-----\n";

    let certStatus =  await testActions.evaluateCert();

    res.status(200).json({
        message: "evaluated",
        payload: {
            // req: req.body,
            subjectName: certStatus.subjectName,
            cert: certStatus.certString,
            validity: req.body.cert === certStatus.certString,
            revokeStatus: certStatus.revokeStatus
        }
    });
});


module.exports = router;

