const run = require('./run');


const core = require('@actions/core')
const request = require('request');

const mocha = require('mocha');

const sinon = require('sinon');
const { expect } = require('chai');
const sandbox = sinon.createSandbox();
const fs = require('fs');

let getInput = null;

describe('Run', () => {
    afterEach(() => {
        console.log('after each');
        sandbox.restore();
    })

    const setup = () => {
        console.log('in setup');
        getInput = sandbox.stub(core, 'getInput');
        getInput.withArgs('github-token').returns('v1.asdf');

        process.env.GITHUB_RUN_ID = "1234567"
        process.env.GITHUB_SHA = "asdfasdf"
        process.env.GITHUB_REF = "master"
        process.env.GITHUB_EVENT_NAME = "pull_request"

        const eventPath = "../test/sample.json"
        process.env.GITHUB_EVENT_PATH = eventPath

        // set PR number:
        const readFileSync = sandbox.stub(fs,'readFileSync')
        readFileSync.withArgs(eventPath, 'utf8').returns(
            JSON.stringify({ number: 1 })
        )
    }

    it('should get the pr', function() {
        setup();

        sandbox.stub(request, 'post');

        run().then(
            (result) => {
                expect(result).to.equal(0);
            }
        )
    });
});