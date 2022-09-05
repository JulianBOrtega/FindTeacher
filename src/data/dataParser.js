const fs = require('fs');
const path = require('path');

function loadData(filenameJSON)
{
    if(!filenameJSON.toLowerCase().includes('.json')) filenameJSON += '.json';

    return JSON.parse(fs.readFileSync(path.join(__dirname, filenameJSON), 'utf-8'));
}

function saveData(data, filenameJSON)
{
    if(!filenameJSON.toLowerCase().includes('.json')) filenameJSON += '.json';

    fs.writeFileSync(path.join(__dirname, filenameJSON), JSON.stringify(data, null, 3), 'utf-8');
}

module.exports = { loadData, saveData };