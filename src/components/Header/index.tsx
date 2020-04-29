import React from 'react';
import styled from 'styled-components';

import {Wrapper, InputWrapper, Title, Button} from './styles';
import Input from '../Input/';

//Use redux here for later instead of this
import data from '../../data/';

const Header = function() {
	return (
		<Wrapper>
			<Title>MineSweeper</Title>
			<InputWrapper>
				<Input 
					text="width" 
					value={data.initalGameState.width}
				/>
				<Input 
					text="height" 
					value={data.initalGameState.height}
				/>
				<Input 
					text="mines" 
					value={data.initalGameState.mines}
				/>
			</InputWrapper>
			<Button>New game</Button>
		</Wrapper>
	);
};

export default Header;
