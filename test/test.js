/**
 * Test Using Mocha Test Runner & Chai Assertion Lib.
 * Mocha Documentation: https://mochajs.org/
 * Chai Documentation: https://www.chaijs.com/api/
 */

const _ = require('assert');
const { assert, expect, should } = require('chai');

/** Example Test */
describe("Example Test Group 1", () => {
    describe("Example Test 1", () => {

        // Describe what the test should do
        it("should test that the testing framework is setup correctly",

            // This function is executed to run the test
            () => {

                let works = true;

                // use chai to make an assertion.
                expect(works).to.be.true;

            });

    });
});