import React from 'react';
import baseStyles from '../../baseStyles/';
import {tupleMap} from '../../utils/func';

import {Wrapper, SocialMedias, A, P} from './styles';
import HeartSVG from '../../images/heart.svg';
import FacebookSVG from '../../images/facebook.svg';
import GitHubSVG from '../../images/github.svg';
import LinkedInSVG from '../../images/linkedin.svg';

interface SocialMediaProps {
	readonly width: string;
	readonly height: string;
	readonly cursor: string;
	readonly fill: string;
}
type SocialTuple = [React.ComponentType<SocialMediaProps>, string];

const createSocialMedia = function([Component, href]: SocialTuple) {
	return (
		<A key={Component.name} href={href} target="_blank">
			<Component
				width="20px"
				height="20px"
				cursor="pointer"
				fill={baseStyles.colors.gray.dark}
			/>
		</A>
	);
};

const socialMedias: SocialTuple[] = [
	[FacebookSVG, 'https://www.facebook.com/michael.j.braga.3'],
	[GitHubSVG, 'https://github.com/Braagaa'],
	[LinkedInSVG, 'https://www.linkedin.com/in/michael-braga-20b95b148/']
];

const Footer = function() {
	return (
		<Wrapper>
			<P>Made with <span>
				<HeartSVG
					width="20px"
					height="20px"
					fill={baseStyles.colors.gray.dark}
				/>
			</span> by Michael Braga</P>
			<SocialMedias>
				{
					tupleMap(createSocialMedia)(socialMedias)
				}
			</SocialMedias>
		</Wrapper>
	);
};

export default Footer;
