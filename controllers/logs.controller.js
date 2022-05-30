'use strict';

const Log = require('../models/logs.models');

class LogController {

	async all(req, res, next) {
		const allLogs = await Log.find({application_id: req.aplicationId});
		if (!allLogs.length) return res.status(200).json({ message: "logs empty."});
		res.status(200).json({ message: allLogs });
	}

	async create(req, res, next) {
        const { type, priority, path, message, request, response } = req.body;
        await new Log({
			application_id: req.aplicationId,
			type,
			priority,
			path,
			message,
			request,
			response
        }).save();

		res.status(201).json({ message: 'Log created.' });
	}

	async info(req, res, next) {
		const log = await Log.findById(req.paramsId);
		res.status(200).json({ message: log});
	}

	async update(req, res, next) {
		const { type, priority, path, message, request, response } = req.body;
        await Log.findByIdAndUpdate(req.paramsId, {
            type,
			priority,
			path,
			message,
			request,
			response
        });
		res.status(200).json({ message: 'Log updated'});
	}

	async delete(req, res, next) {
		await Log.findByIdAndDelete(req.paramsId);
		res.status(200).json({ message: 'Log deleted'});
	}
}

module.exports = new LogController();