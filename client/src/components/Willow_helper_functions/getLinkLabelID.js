const getLinkLabelID = (sourceNode, targetNode) => {
    if (targetNode.label_id === 1) return 6; // Explores
    if (targetNode.label_id === 2) return 7; // Then
    if (targetNode.label_id === 3) return 8; // Do
    if (targetNode.label_id === 4) return 9; // Should
    if (targetNode.label_id === 5) {
      if (sourceNode.label_id === 1) return null;
      if (sourceNode.label_id === 2) return 11; // Completes
      if (sourceNode.label_id === 3) return 11; // Completes
      if (sourceNode.label_id === 4) return 10; // Should Have
      if (sourceNode.label_id === 5) return null;
    }
  }

module.exports.getLinkLabelID = getLinkLabelID;