'use strict';

const Aplication = require('../models/aplications.model');
const Authorization = require('../models/authorizations.model');
const Log = require('../models/logs.models');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../keys');

class AplicationController {

	async all(req, res, next) {
		const allAplications = await Aplication.find();
		if (!allAplications.length) return res.status(200).json({ message: "aplications empty."});
		res.status(200).json({ message: allAplications });
	}

	async create(req, res, next) {
        const { name } = req.body;
        const newAplication = await new Aplication({
            name
        }).save();
        
        const token = jwt.sign({id: newAplication._id}, secretKey);

        await new Authorization({
            application_id: newAplication._id,
            token
        }).save();

		res.status(201).json({ message: 'Aplication created.' });
	}

	async info(req, res, next) {
        const aplication = await Aplication.findById(req.paramsId);
		res.status(200).json({ message: aplication});
	}
    
	async update(req, res, next) {
        const { name } = req.body;
        await Aplication.findByIdAndUpdate(req.paramsId, {
            name
        });
		res.status(200).json({ message: 'Aplication updated'});
	}

	async delete(req, res, next) {
        await Aplication.findByIdAndDelete(req.paramsId);
		const allLogs = await Log.find({application_id: req.paramsId});
		for (let log of allLogs){
			await Log.findByIdAndDelete(log._id.toString());
		}
		res.status(200).json({ message: 'Aplication deleted'});
	}
}

module.exports = new AplicationController();