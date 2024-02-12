"use strict";

const ApiGateway = require("moleculer-web");

// Create API Gateway
module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		// Exposed port
		port: process.env.PORT || 3000,

		// Exposed IP
		ip: "0.0.0.0",
		
		// Global Express middlewares
		use: [],

		routes: [
			{
				path: "/api",

				aliases: {
					// Expose university service API
					"GET /universities": "university.list"
				},

				whitelist: [
					// Access calls to all the `university.*` actions
					"university.*",
				],
	
				// Route-level Express middlewares
				use: [],

				bodyParsers: {
					json: true
				},

				// Route error handler
				onError(req, res, err) {
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					res.writeHead(500);
					res.end(JSON.stringify(err));
				},
	
				// Enable/disable logging
				logging: true
			},
		]
	},
	// Global error handler
	onError(req, res, err) {
		res.setHeader("Content-Type", "text/plain");
		res.writeHead(err.code || 500);
		res.end("Global error: " + err.message);
	},
};
