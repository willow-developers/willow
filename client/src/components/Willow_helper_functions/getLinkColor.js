const getLinkColor = (d) => {
    switch (d.label_id) {
        case 6: return '#8EA4D2'; // EXPLORES
        case 7: return '#8CB369'; // THEN
        case 8: return '#E05263'; // DO
        case 9: return '#BFADA3'; // SHOULD
        case 10:return '#504746'; // SHOULD HAVE
        default:return '#504746'; // COMPLETES
    }
};

module.exports.getLinkColor = getLinkColor;