import React from 'react';
import { storiesOf } from '@storybook/react';

import AccentHeader from './AccentHeader';

storiesOf('AccentHeader', module)
	.add('default', () => (
		<div>
			<AccentHeader>I have something to say</AccentHeader>
			<p>This text is evenly spaced from the border</p>
		</div>
	))
	.add('right-aligned', () =>
		<AccentHeader align='right'>I have something to say</AccentHeader>
	)
	.add('center-aligned', () =>
		<AccentHeader align='center'>I have something to say</AccentHeader>
	)
	.add('custom heading tag', () =>
		<AccentHeader headingTag='h1'>I'm wrapped in h1</AccentHeader>
	);
