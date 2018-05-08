import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';

import 'normalize.css'
import './assets/sass/index.scss';

const store = configureStore();

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={ store }>
				<App />
			</Provider>
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