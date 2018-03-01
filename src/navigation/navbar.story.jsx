import React from 'react';
import { storiesOf } from '@storybook/react';
import {
	decorateWithBasics,
	decorateWithInfo,
} from '../utils/decorators';

import NavBar from './NavBar';

storiesOf('NavBar', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('Default', () => (
		<NavBar />
	)
	);
