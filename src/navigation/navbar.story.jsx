import React from 'react';
import { storiesOf } from '@storybook/react';
import {
	decorateWithLocale,
	decorateWithInfo,
} from '../utils/decorators';

import NavBar from './NavBar';

storiesOf('NavBar', module)
	.addDecorator(decorateWithLocale)
	.addDecorator(decorateWithInfo)
	.add('Default', () => (
		<NavBar />
	)
	);
