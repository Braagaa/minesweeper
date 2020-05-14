import styled from 'styled-components';
import {Wrapper as W} from '../Board/styles';
import baseStyles from '../../baseStyles/';

export const Wrapper = styled(W)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const H1 = styled.h1`
	color: ${baseStyles.colors.black.light};
	padding: 10px;
`;

export const Img = styled.img`
	width: 25px;
	height: 25px;
	margin-bottom: 10px;
`;
