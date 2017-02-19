'use strict';
module.exports = async ({isGithubWebhook, eventType, event, repository}) => {
    if (!isGithubWebhook && eventType !== 'status') {
        return;
    }

    const {branches} = event;
    const branche = branches.find(x => x.name.startsWith('greenkeeper/'));

    if (branche == null) {
        return;
    }

    const pr = (await repository.getPullRequests({
        head: branche.name,
        state: 'open'
    }))[0];

    if (pr == null) {
        return;
    }

    try {
        await repository.getLabel('greenkeeper');
    } catch (err) {
        return;
    }

    const status = await repository.getStatus(branche.commit.sha);

    if (status.state !== 'success') {
        return;
    }

    await repository.mergePullRequest(pr.number);
};
