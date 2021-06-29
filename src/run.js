const github = require('@actions/github');
const core = require('@actions/core');

module.exports = async function run() {
    try {
        //const token  = core.getInput('repo-token');
        //const client = new github.GitHub(process.env.GITHUB_TOKEN)
        const contextPullRequest = github.context.payload.pull_request;
        if (!contextPullRequest) {
            throw new Error(
                "This action can only be invoked in `pull_request` events. Otherwise the pull request can't be inferred."
            );
        }
        console.log(`The event payload: ${JSON.stringify(contextPullRequest, undefined, 2)}`);
        console.log(`The context: ${JSON.stringify(github.context, undefined, 2)}`);

    } catch (error) {
        core.setFailed(error.message);
    }
};