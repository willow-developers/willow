module.exports = formatProjectData = (data) => {
  
  // format links:
  for (var link of data.links) {
    link.source = link.source_id;
    link.target = link.target_id;
    link.label = data.labels[link.label_id - 1];
    // using link.label_id - 1 here because labels array is zero-indexed
  }

  // format nodes:
  for (var node of data.nodes) {
    node.id = node.hash_id;
    node.label = data.labels[node.label_id - 1];
    node.data = node.node_description;
    // using node.label_id - 1 here because labels array is zero-indexed
  }

  return data;
};