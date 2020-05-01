import React from 'react';

import {GlobalStyle} from '../styles';
import {Wrapper} from './styles';
import Header from './Header/';
import Footer from './Footer/';

const App = function() {
	return (
		<Wrapper>
			<GlobalStyle/>
			<Header/>
			<Footer/>
		</Wrapper>
	);
}

export default App;
