//const core = require('@actions/core')
//const request = require('request');

const mocha = require('mocha');

//const sinon = require('sinon');
const { expect } = require('chai');
//const sandbox = sinon.createSandbox();
const fs = require('fs');
const path = require('path');

//let getInput = null;

describe('Run', () => {
    afterEach(() => {
        console.log('after each');
        //sandbox.restore();
    })

    const setup = () => {
        console.log('in setup');
        //getInput = sandbox.stub(core, 'getInput');
        //getInput.withArgs('github-token').returns('v1.asdf');

        process.env.GITHUB_RUN_ID = "1234567"
        process.env.GITHUB_SHA = "0df36e327f56c8897894b9f52734c69b56ff6e79"
        process.env.GITHUB_REF = "refs/pull/5/merge"
        process.env.GITHUB_EVENT_NAME = "pull_request"
        process.env.GITHUB_WORKFLOW = "pr_size"
        process.env.GITHUB_ACTION = "richardcaserelease-note-action"
        process.env.GITHUB_ACTOR = "actionsbot"
        process.env.GITHUB_JOB = "labeler"
        process.env.GITHUB_RUN_NUMBER = "5"
        process.env.GITHUB_RUN_ID = "982249112"
        process.env.GITHUB_REPOSITORY = "test/repo"


        const eventPath =  path.join(__dirname, "../test/sample.json");
        process.env.GITHUB_EVENT_PATH = eventPath

        // set PR number:
        //const readFileSync = sandbox.stub(fs,'readFileSync')
        //readFileSync.withArgs(eventPath, 'utf8').returns(
        //    JSON.stringify({ number: 1 })
        //)
    }

    it('should get the pr', function() {
        setup();

        const run = require('./run');

        run().then(
            (result) => {
                expect(result).to.equal(0);
            }
        )
    });
});