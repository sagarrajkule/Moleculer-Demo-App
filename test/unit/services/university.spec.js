"use strict";

const { ServiceBroker } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/university.service");

describe("Test 'university' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'university.list' action", () => {

		it("should return with valid data'", async () => {
			const res = await broker.call("university.list");
			expect(res.universities).toBe([]);
		});

		it("should reject an ValidationError", async () => {
			expect.assertions(1);
			try {
				await broker.call("university.list", { state: "" });
			} catch(err) {
				expect(err).toBeInstanceOf(ValidationError);
			}
		});

	});
});

