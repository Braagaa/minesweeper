import React from 'react';

import {GlobalStyle} from '../styles';
import {Wrapper} from './styles';
import Header from './Header/';
import Board from './Board/';
import Footer from './Footer/';

const App = function() {
	return (
		<Wrapper>
			<GlobalStyle/>
			<Header/>
			<Board/>
			<Footer/>
		</Wrapper>
	);
}

export default App;
