import React from 'react';

import {GlobalStyle} from '../styles';
import {Wrapper} from './styles';
import Header from './Header/';

const App = function() {
	return (
		<Wrapper>
			<GlobalStyle/>
			<Header/>
		</Wrapper>
	);
}

export default App;
