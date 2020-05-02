import React from 'react';

import {GlobalStyle} from '../styles';
import {Wrapper} from './styles';
import Header from './Header/';
import Grid from './Grid/';
import Footer from './Footer/';

const App = function() {
	return (
		<Wrapper>
			<GlobalStyle/>
			<Header/>
			<Grid/>
			<Footer/>
		</Wrapper>
	);
}

export default App;
