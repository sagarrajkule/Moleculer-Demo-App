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
			// Check if mandatory query parameters are provided
			params: {
				page: { type: "string", optional: false },
				pageSize: { type: "string", optional: false },
				state: { type: "string", optional: true },
			},

			async handler(ctx) {
				const { state, page, pageSize } = ctx.params;
				const country = "Australia";
				
				let universities = await this.getUniversities(country);

				// Filter by state if provided
				if (!isEmpty(state)) {
					universities = universities.filter(u => u["state-province"] === state);
				}

				// Pagination
				return this.paginate(universities, page, pageSize);
			},
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
			page = page <=0 ? 1 : page;
			pageSize = pageSize <= 0 ? 1 : pageSize; 

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
