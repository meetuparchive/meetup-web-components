import React from 'react';
import { decorateWithInfo } from './utils/decorators';
import { storiesOf } from '@storybook/react';

import AccentHeader from './AccentHeader';

storiesOf('AccentHeader', module)
	.addDecorator(decorateWithInfo)
	.add('default', () => (
		<div>
			<AccentHeader>I have something to say</AccentHeader>
			<p>This text is evenly spaced from the border</p>
		</div>
	))
	.add('right-aligned', () => (
		<div className="align--right">
			<AccentHeader align="right">I have something to say</AccentHeader>
			<p>This text is evenly spaced from the border</p>
		</div>
	))
	.add('center-aligned', () => (
		<div className="align--center">
			<AccentHeader align="center">I have something to say</AccentHeader>
			<p>This text is evenly spaced from the border</p>
		</div>
	))
	.add('custom heading tag', () => (
		<div>
			<AccentHeader headingTag="h1">I'm wrapped in h1</AccentHeader>
			<p>This text is evenly spaced from the border</p>
		</div>
	));
