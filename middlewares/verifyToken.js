const jwt = require('jsonwebtoken');
const { secretKey } = require('../keys');

const Log = require('../models/logs.models');

const verifyT = async (req, res, next) => {
    try {
        const bearerToken = req.headers['authorization'];
        if(!bearerToken) return res.status(404).json({ message: "No token provided"});
        
        const token = bearerToken.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);
        req.aplicationId = decoded.id;

        next();
    } catch {
        return res.status(404).json({ message: "Unauthorized"});
    }
}

const verifyAplication = async (req, res, next) => {
    try {
        req.paramsId = req.params.id;
        const bearerToken = req.headers['authorization'];
        if(!bearerToken) return res.status(404).json({ message: "No token provided"});
        
        const token = bearerToken.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);
        req.aplicationId = decoded.id;
        if(req.aplicationId != req.paramsId) return res.status(404).json({ message: "Unauthorized"});
        next();
    } catch {
        return res.status(404).json({ message: "Unauthorized"});
    }
}

const verifyLog = async (req, res, next) => {
    try {
        req.paramsId = req.params.id;
        const bearerToken = req.headers['authorization'];
        if(!bearerToken) return res.status(404).json({ message: "No token provided"});
        
        const token = bearerToken.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);
        req.aplicationId = decoded.id;

        const logIdAplication = await Log.findById(req.paramsId);
        if(logIdAplication.application_id.toString() != req.aplicationId) return res.status(404).json({ message: "Unauthorized"});
        next();
    } catch {
        return res.status(404).json({ message: "Unauthorized"});
    }
}

module.exports = {
    verifyT,
    verifyAplication,
    verifyLog
}