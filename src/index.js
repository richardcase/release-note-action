const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const client = new github.GitHub(process.env.GITHUB_TOKEN)
        const contextPullRequest = github.context.payload.pull_request;
        if (!contextPullRequest) {
            throw new Error(
                "This action can only be invoked in `pull_request` events. Otherwise the pull request can't be inferred."
            );
        }
        console.log(`The event payload: ${contextPullRequest}`);

    } catch (error) {
        core.setFailed(error.message);
    }
};

run().catch(console.error);