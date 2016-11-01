export default (name, iconRefs, iconStories) => `
import React from 'react';
import Icon from './Icon';
import { Annotate, Inverted } from './utils/storyComponents';
import { storiesOf, linkTo } from '@kadira/storybook';

storiesOf('${name}', module)
	.add('default', () => (
		<div style={{
			width:'640px',
			marginTop: '450px',
			marginBottom: '50px'
		}}>
			<ul className='gridList gridList--has8'>
				${iconRefs}
			</ul>
		</div>
	))
	${iconStories}
	;
`;

