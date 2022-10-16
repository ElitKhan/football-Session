const axios = require('axios');

const key = 'arsenal';

async function getMatches() {
    const url = `https://s3.eu-west-1.amazonaws.com/hackajob-assets1.p.hackajob/challenges/football_session/football.json`
    const {data} = await axios.get(url);
    return data
}


async function run(teamKey) {
    const data = await getMatches();
    const scores = checkData(data.rounds, teamKey)
    console.log(scores)
}

run(key)

function checkData(data, teamKey) {
    const _data = []
    for (let days of data) {
        for (let matches of days.matches) {
            if (matches['team1']['key'] === teamKey) {
                _data.push(matches['score1'])
            }
            if (matches['team2']['key'] === teamKey) {
                _data.push(matches['score2'])
            }
        }
    }
    return _data.reduce((a, b) => a + b, 0)
}



