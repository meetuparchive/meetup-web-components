import React from 'react';
import ErrorList from './ErrorList';
import Bounds from '../layout/Bounds';
import { decorateWithInfo } from '../utils/decorators';
import { storiesOf } from '@storybook/react';

storiesOf('ErrorList', module)
	.addDecorator(decorateWithInfo)
	.add('Single Error', () => (
		<Bounds>
			<ErrorList error="There is an error. ErrorList ensures the error container is always rendered with ARIA attributes." />
		</Bounds>
	));
