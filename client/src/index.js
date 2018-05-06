import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';
import reducers from './reducers';

import 'normalize.css'
import './assets/sass/index.scss';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

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