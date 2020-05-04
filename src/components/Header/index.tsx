import React  from 'react';
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
					min={data.width.min}
					max={data.width.max}
					value={data.width.initial}
				/>
				<Input 
					text="height" 
					min={data.height.min}
					max={data.height.max}
					value={data.height.initial}
				/>
				<Input 
					text="mines" 
					min={data.mines.min}
					max={data.mines.max}
					value={data.mines.initial}
				/>
			</InputWrapper>
			<Button>New game</Button>
		</Wrapper>
	);
};

export default Header;
