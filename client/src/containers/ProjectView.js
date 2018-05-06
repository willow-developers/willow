import React, {Component} from 'react';
import axios from 'axios';

import styles from '../assets/sass/Dashboard.module.scss';
import RenderedDoc from '../components/RenderedDoc';
import WillowCore from '../components/WillowCore';

class ProjectView extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  bool: false,
		  render: false,
		  data: {nodes:[], links:[]},
		  selectedData: {},
		}
	  }

	  componentDidMount() {
		axios.get('/api/data').then(result => {
			this.setState({
				render: true,
				data: result.data
			})
		})
	  }

	  clickFunction(data) {
		this.setState({
		  bool: true,
		  selectedData: data
		})
	  }
	
	  render() {
		return (
		  <div className={ styles.col_12_of_12 }>
			<h1> Project View </h1>
			{this.state.render && <WillowCore clickFunction={this.clickFunction.bind(this)} data={this.state.data}/>}
			{this.state.bool && <RenderedDoc docInfo={this.state.selectedData}/>}
		  </div>
		);
	  }	


}

export default ProjectView;