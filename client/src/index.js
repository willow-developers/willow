import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';

import 'normalize.css'
import './assets/sass/index.scss';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<App />
		</AppContainer>,
		document.getElementById('root')
	);
};

registerServiceWorker();

render(App);

if (module.hot) {
	module.hot.accept('./containers/App', () => {
		render(App);
	});
}