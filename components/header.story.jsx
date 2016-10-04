import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './util/storyComponents';
import Header from './Header';

storiesOf('Header', module)
	.add('Default', () => (
		<Annotate
			notes='The header provides minimally-styled wrapper for other content'
			style={{ width: '100%' }}>
			<Header>Header content</Header>
		</Annotate>
	));

