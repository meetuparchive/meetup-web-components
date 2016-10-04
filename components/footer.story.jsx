import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Annotate } from './util/storyComponents';
import Footer from './Footer';

storiesOf('Footer', module)
	.add('Default', () => (
		<Annotate
			notes='The Footer provides minimally-styled wrapper for other content'
			style={{ width: '100%' }}>
			<Footer>Footer content</Footer>
		</Annotate>
	));

