"use strict";

const {isEmpty} = require("lodash");
const axios = require("axios");

module.exports = {
	name: "university",

	/**
	 * Actions
	 */
	actions: {
		list: {
			rest: {
				method: "GET",
				path: "/universities"
			},
			// params: {
			// 	page: { type: "number", min: 1 },
			// 	pageSize: { type: "number", min: 10, max: 25 },
			// 	state: { type: "string", optional: true },
			// },
			async handler(ctx) {
				try {
					const { state, page, pageSize } = ctx.params;

					// Check if mandatory query parameters are provided
					if (isEmpty(page) || isEmpty(pageSize)) {
						// throw new Error("Missing mandatory query parameters: page, pageSize");
					}

					const country = "Australia";
					let universities = await this.getUniversities(country);

					// Filter by state if provided
					if (!isEmpty(state)) {
						universities = universities.filter(u => u["state-province"] === state);
					}

					// Pagination
					return this.paginate(universities, page, pageSize);
				} catch (error) {
					return error.response.data;
				}
			}
		}
	},

	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		async getUniversities(country) {
			try {
				// Retrieve universities from API
				const ApiUrl = `http://universities.hipolabs.com/search?country=${country}`;
				
				// Fetch universities
				const response = await axios.get(ApiUrl);
		
				return response.data || [];
			} catch (error) {
				throw new Error("Failed to fetch universities.");
			}
		},

		paginate(items, page = 1, pageSize = 10) {
			const startIndex = (page - 1) * pageSize;
			const endIndex = page * pageSize;

			// Moleculer built-in pagination
			return this.Promise.resolve({
				universities: items.slice(startIndex, endIndex),
				total: items.length,
			});
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
