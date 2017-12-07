import React from 'react';
import ErrorList from './ErrorList';
import Bounds from '../layout/Bounds';
import { decorateWithInfo } from '../utils/decorators';
import { storiesOf } from '@storybook/react';
import {
	withKnobs,
	array,
} from '@storybook/addon-knobs';

storiesOf('ErrorList', module)
	.addDecorator(decorateWithInfo)
	.addDecorator(withKnobs)
	.add('Single Error', () => (
			<Bounds>
				<ErrorList errors="There is one error" />
			</Bounds>
		)
	)
	.add('Multiple Errors', () => {
			const errorListKnob = array('Errors', [
				'You must use a special character in your name',
				'You must not use a name you have used before',
				'You must not reveal your true identity'
			]);

			return (
				<Bounds>
					<ErrorList errors={errorListKnob} />
				</Bounds>
			);
		}
	);
