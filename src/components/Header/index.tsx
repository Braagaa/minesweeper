import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {AppState} from '../../rootReducer';
import {createGame, CreateGameAction} from '../Board/actions';

import {Wrapper, InputWrapper, Title, Button} from './styles';
import Input from '../Input/';

import data from '../../data/';

const mapStateToProps = () => ({});
const mapDispatchToProps = {createGame};

interface Props {
	createGame: typeof createGame;
}

const Header: React.FC<Props> = function({createGame}: Props) {
	console.log(createGame);
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
