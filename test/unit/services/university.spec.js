"use strict";

const { ServiceBroker } = require("moleculer");
// const { ValidationError } = require("moleculer").Errors;
const TestService = require("../../../services/university.service");

describe("Test 'university' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(TestService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'university.list' action", () => {

		it("should return with valid data'", async () => {
			const res = await broker.call("university.list");
			expect(res.universities)
				.to.be.an.instanceof(Array)
				.and.to.have.property(0)
				.that.includes.all.keys([ "country", "name", "state-province" ]);
		});

	});
});

