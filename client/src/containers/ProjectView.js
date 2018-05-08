import React, {Component} from 'react';
import axios from 'axios';

import styles from '../assets/sass/Dashboard.module.scss';
import RenderedDoc from '../components/RenderedDoc';
import WillowCore from '../components/WillowCore';

class ProjectView extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  data: {nodes:[], links:[]},
		  selectedData: {},
		};
	}

	componentDidMount() {
		// TO GO TO DUMMY DATA:
		// axios.get('/api/data').then(result => {
		// 	this.setState({
		// 		data: result.data
		// 	});
		// });

		// TO GO TO DATABASE:
		axios.get('/api/projectData', { params: { id: 1 } }).then(result => {
			console.log(result);
			this.setState({data: result.data})
		});
	}

	clickFunction(data) {
		this.setState({
			selectedData: data
		});
	}

	createNode() {
		const newNode = {
			id: this.state.data.nodes.length + 1,
			data: "this should work please"
		};

		const newData = Object.create(this.state.data);
		newData.nodes.push(newNode);
		this.setState({data: newData});
	}

	render() {
		return (
			<div className={ styles.col_12_of_12 }>
				<h1> Project View </h1>
				<WillowCore createNode={this.createNode.bind(this)} clickFunction={this.clickFunction.bind(this)} data={this.state.data}/>
				<RenderedDoc docInfo={this.state.selectedData}/>
			</div>
		);
	}
}

export default ProjectView;