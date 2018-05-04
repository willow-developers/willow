const fs = require('fs');
const path = require('path');

exports.test = (req, res) => {
    const dataPath = path.join(path.dirname(__dirname),'/dummy_data/graph_data.json');
    
    fs.readFile(dataPath, (err, data) => {
        if (err) console.error(err);
        res.send(JSON.parse(data));
    })
};