export const createNewNode = (newNodeMode, projectData, userStatus) => {
    let labelID = (label) => {
        switch(label) {
            case 'explorative':     return 1;
            case 'startAction':     return 2;
            case 'nextAction':      return 3;
            case 'oneTimeObjective':return 4;
            default:                return 5;
        }
    };

    let dataObject = {
        owner_id: projectData.project.owner_id,
        project_id: projectData.project.id, 
        label_id: labelID(newNodeMode), 
        node_description: 'New Node',
        status: 'new',
        hash_id: `${userStatus.google_id}-${projectData.project.id}-${Date.now()}`,
        x: 0,
        y: 0,
    }

    // console.log('New Node Data: ', dataObject);
    return dataObject;
}
