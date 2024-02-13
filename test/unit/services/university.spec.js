"use strict";

const { ServiceBroker } = require("moleculer");
const UniversityService = require("../../../services/university.service");

describe("Test 'university' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(UniversityService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'university.list' action", () => {
		it("should return valid University data", async () => {
			// Call the 'university.list' action with page and pageSize parameters
			const res = await broker.call("university.list", { page: 1, pageSize: 10 });

			// Check if the response object has the 'universities' property
			expect(res).toHaveProperty("universities");

			// Check if 'universities' is an array and its first element has the expected keys
			expect(res.universities).toBeInstanceOf(Array);
			if (res.universities.length > 0) {
				expect(res.universities[0]).toHaveProperty("country");
				expect(res.universities[0]).toHaveProperty("name");
				expect(res.universities[0]).toHaveProperty("state-province");
			}
		});
	});
});

