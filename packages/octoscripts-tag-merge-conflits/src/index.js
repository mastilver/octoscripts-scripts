'use strict';
module.exports = async ({isInit, isGithubWebhook, eventType, event, repository}) => {
    if (isInit) {
        await createLabel(repository);
    }

    if (!isGithubWebhook) {
        return;
    }

    if (eventType === 'push' && event.ref === `refs/heads/${event.repository.default_branch}`) {
        // if pushing to the master branch

        const prs = await repository.getPullRequests({
            state: 'open'
        });

        await Promise.all(prs.map(async pr => {
            await checkPullRequest(pr.number, repository);
        }));
    } else if (eventType === 'pull_request' && event.action === 'synchronize') {
        // if a pull request is updated

        await checkPullRequest(event.pull_request.number, repository);
    }
};

async function createLabel(repository) {
    try {
        await repository.getLabel('merge conflict');
    } catch (err) {
        await repository.createLabel({
            name: 'merge conflict',
            color: 'ff6347'
        });
    }
}

async function checkPullRequest(pullRequestNumber, repository) {
    const pr = await repository.getPullRequest(pullRequestNumber);

    if (pr.mergeable == null) {
        await checkPullRequest(pullRequestNumber, repository);
        return;
    }

    let {labels} = await repository.getIssue(pullRequestNumber);
    labels = labels.map(x => x.name);

    if (pr.mergeable) {
        labels = labels.filter(x => x !== 'merge conflict');
    } else {
        labels = labels.concat('merge conflict');
    }

    await repository.updateIssue(pullRequestNumber, {
        labels
    });
}
