import React, { Component } from 'react';
import styles from '../../assets/sass/Loading.module.scss';

const isEmpty = (prop) => (
	prop === null ||
	prop === undefined ||
	(prop.hasOwnProperty('length') && prop.length === 0) ||
	(prop.constructor === Object && Object.keys(prop).length === 0)
);

const LoadingHOC = (loadingProp) => (WrappedComponent) => (
	class LoadingHOC extends Component {
		render() {
			return isEmpty(this.props[loadingProp]) ? <div className={ styles.loader } /> : <WrappedComponent { ...this.props } />
		}
	}
);


export default LoadingHOC;