const getNodeColor = (d) => {
    switch (d.label_id) {
        case 1: return '#8EA4D2'; // EXPLORATIVE
        case 2: return '#8CB369'; // OBJECTIVE
        case 3: return '#F2C078'; // ACTION
        case 4: return '#75485E'; // START
        default: return '#504746'; // OBJECTIVE
    }
};

module.exports.getNodeColor = getNodeColor;