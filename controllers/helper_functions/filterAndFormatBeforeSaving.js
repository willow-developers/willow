
module.exports = filterAndFormatBeforeSaving = (nodes, links) => {
  var linksToUpdate = [];
  var nodesToUpdate = [];

  for (var j = 0; j < nodes.length; j++) {
    if (nodes[j].status === 'new' || nodes[j].status === 'updated' || nodes[j].status === 'delete') {
      // destructure node properties to match database keys:
      let { hash_id, owner_id, project_id, label_id, node_description, node_status, node_data, x, y, status } = nodes[j];
      nodesToUpdate.push({ hash_id, owner_id, project_id, label_id, node_description, node_status, x, y, node_data, status });
    }
  }

  for (var i = 0; i < links.length; i++) {
    if (links[i].status === 'new' || links[i].status === 'updated' || links[i].status === 'delete') {
      // destructure link properties to match database keys:
      let { source_id, target_id, label_id, project_id, link_data, status, hash_id } = links[i];
      linksToUpdate.push({ source_id, target_id, label_id, project_id, link_data, status, hash_id });
    }
  }

  return { nodesToUpdate, linksToUpdate };
}