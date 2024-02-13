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

				// Access allowed to all actions
				whitelist: [
					"**"
				],

				// Route-level Express middlewares
				use: [],
				mergeParams: true,
				autoAliases: true,
				aliases: {

				},
				callOptions: {},
				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},
				mappingPolicy: "all",

				// Enable/disable logging
				logging: true
			},
		],
	},
};
