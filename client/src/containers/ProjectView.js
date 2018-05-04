import React, {Component} from 'react';
import * as d3 from 'd3';
import axios from 'axios';

import styles from '../assets/sass/Dashboard.module.scss';
import RenderedDoc from '../components/RenderedDoc';
import WillowCore from '../components/WillowCore';

class ProjectView extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  bool: false,
		  data: {},
		  selectedData: {},
		}
	  }

	  componentDidMount() {
		axios.get('/api/data').then(result => {
			this.setState({
				data: result,
			})
		})
	  }

	  clickFunction(data) {
		console.log("hello data: ", data);
		this.setState({
		  bool: true,
		  selectedData: data
		})
	  }
	
	  render() {
		return (
		  <div className={ styles.col_12_of_12 }>
			<h1> Project View </h1>
			<WillowCore clickFunction={this.clickFunction.bind(this)}/>
			{this.state.bool && <RenderedDoc docInfo={this.state.selectedData}/>}
		  </div>
		);
	  }	


}

export default ProjectView;