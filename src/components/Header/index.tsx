import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {AppState} from '../../rootReducer';
import {createGame, CreateGameAction} from '../Board/actions';

import {Wrapper, InputWrapper, Title, Button} from './styles';
import Input from '../Input/';
import MineInput from '../MineInput/';

import data, {GameProps} from '../../data/';

const mapStateToProps = (state: AppState) => ({
	inputs: state.inputs
});
const mapDispatchToProps = {createGame};

interface Props {
	createGame: typeof createGame;
	inputs: {[key: string]: string};
}

const Header: React.FC<Props> = function({createGame, inputs}: Props) {
	const width = parseInt(inputs.width);
	const height = parseInt(inputs.height);
	const mines = parseInt(inputs.mines);

	const onClickButton = (): void => {
		createGame(width, height, mines);
	};

	return (
		<Wrapper>
			<Title>MineSweeper</Title>
			<InputWrapper>
				<Input 
					text="width" 
					min={data.width.min}
					max={data.width.max}
					defaultValue={data.width.initial}
					value={width}
				/>
				<Input 
					text="height" 
					min={data.height.min}
					max={data.height.max}
					defaultValue={data.height.initial}
					value={height}
				/>
				<MineInput width={width} height={height} mines={mines}/>
			</InputWrapper>
			<Button onClick={onClickButton}>New game</Button>
		</Wrapper>
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
