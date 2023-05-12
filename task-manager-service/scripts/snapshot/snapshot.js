const fetch = require('node-fetch');

async function getActivePropId(project, metamaskWallet) {

    const response = await fetch('https://hub.snapshot.org/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `
                        query {
                            proposals (
                              where: {
                                space_in: ["${project}"],
                                state: "active"
                              }
                            ) {
                              id, choices
                            }}`
        })
    });

    const props = await response.json();

    const response2 = await fetch('https://hub.snapshot.org/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "operationName": "Votes",
            "variables": {
                "voter": metamaskWallet,
                "proposals": props.data.proposals.map(p => p.id),
            },
            "query": "query Votes($voter: String!, $proposals: [String]!) {\n  votes(where: {voter: $voter, proposal_in: $proposals}) {\n    proposal {\n      id\n    }\n  }\n}"
        })
    });

    const votedProps = await response2.json();

    const votedIds = votedProps.data.votes.map(v => v.proposal.id);

    const freeProps = props.data.proposals.filter(item => !votedIds.find(v => v === item.id));

    return freeProps.length ? [freeProps[0].id, freeProps[0].choices.length - 1] : undefined;
}

module.exports = getActivePropId;
