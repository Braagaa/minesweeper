import React from 'react';
import {Provider} from 'react-redux';
import store from '../store/';

import {GlobalStyle} from '../styles';
import {Wrapper} from './styles';
import Header from './Header/';
import Board from './Board/';
import Footer from './Footer/';

const App = function() {
	return (
		<Provider store={store}>
			<Wrapper>
				<GlobalStyle/>
				<Header/>
				<Board/>
				<Footer/>
			</Wrapper>
		</Provider>
	);
}

export default App;
