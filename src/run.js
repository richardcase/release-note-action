const github = require('@actions/github');
const core = require('@actions/core');

module.exports = async function run() {
    try {
        const ctx = github.context;
        
        if (ctx.eventName != "pull_request") {
            throw new Error(
                "This action can only be invoked in `pull_request` events."
            );
        }

        const payload = github.context.payload;
        htmlURL = payload.html_url;
        body = payload.body;

        if (body === "") {
            throw new Error("You must supply a description to the PR that includes a `release-note` code block");
        }

        const found = body.search(/(?:Release note*\*:s*(?:<!--[^<>]*-->s*)?\`\`\`(?:release-note)?|\`\`\`release-note)(.+?)\`\`\`/g);

        console.log(found);

        //console.log(`The event payload: ${JSON.stringify(payload, undefined, 2)}`);
        //console.log(`The context: ${JSON.stringify(github.context, undefined, 2)}`);

    } catch (error) {
        core.setFailed(error.message);
    }
};