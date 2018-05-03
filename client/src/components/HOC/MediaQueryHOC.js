import React, { Component } from 'react';

// https://medium.com/@renatorib/tackling-responsive-elements-in-react-and-why-ive-created-react-sizes-f7c87e3f9e64

const MediaQueryHOC = (WrappedComponent) => (
	class MediaQueryHOC extends Component {
		state = { windowSize: window.innerWidth }
		handleWindowResize = () => {
			this.setState({ windowSize: window.innerWidth });
		}

		componentDidMount() {
			window.addEventListener('resize', this.handleWindowResize);
		}

		componentWillUnmount() {
			window.removeEventListener('resize', this.handleWindowResize);
		}

		render() {
			return <WrappedComponent { ...this.props } { ...this.state } />
		}
	}
);

export default MediaQueryHOC;