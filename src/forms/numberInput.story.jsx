import React from 'react';
import NumberInput from './NumberInput';
import { storiesOf } from '@kadira/storybook';
import {
	IntlProvider,
	FormattedMessage,
	defineMessages,
} from 'react-intl';

/*
 * -- Inline SVG icon sprite --
 *
 * raw SVG sprite from `swarm-icons`
 */
const iconSpriteStyle = { display: 'none' };
const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');

storiesOf('NumberInput', module)
	.add('default', () => <div>
		<NumberInput
			label='How many?'
			id='amount'
			name='amount' />

		<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
	</div>)
	.add('with value', () => <div>
		<NumberInput
			label='Are you bringing any guests?'
			id='guestCount'
			name='guests'
			value='0' />

		<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
	</div>)
	.add('with error', () => <div>
		<NumberInput
			label='How many?'
			id='amount'
			name='amount'
			error='Not so fast. You have an error.' />

		<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
	</div>)
	.add('error state formatted', () => {
		const trn = defineMessages({
			error: {
				defaultMessage: 'This error is a formatted message.',
				id: 'storybook.anError',
				description: { jira: 'SDS-204' },
			}
		});
		return (
			<IntlProvider defaultLocale='en-US' locale='en-US'>
				<NumberInput
					label='How many?'
					id='amount'
					name='amount'
					error={<FormattedMessage {...trn.error} />} />
			</IntlProvider>
		);
	})
	.add('required', () =>
		<NumberInput
			label='How many?'
			id='amount'
			name='amount'
			required />
	);

