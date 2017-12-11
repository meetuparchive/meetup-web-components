import React from 'react';
import ErrorList from './ErrorList';
import Bounds from '../layout/Bounds';
import { decorateWithInfo } from '../utils/decorators';
import { storiesOf } from '@storybook/react';
import {
	WithNotes,
	withKnobs,
	array,
} from '@storybook/addon-knobs';

storiesOf('ErrorList', module)
	.addDecorator(decorateWithInfo)
	.addDecorator(withKnobs)
	.add('Single Error', () => (
		<WithNotes notes="Do not conditionally render ErrorList - an empty error list is important for establishing an ARIA live region.">
			<Bounds>
				<ErrorList errors="There is one error" />
			</Bounds>
		</WithNotes>
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
