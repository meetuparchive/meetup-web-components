import React from 'react';
import NumberInput from './NumberInput';
import { storiesOf } from '@kadira/storybook';

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
			label='Are you bringing any guests?'
			id='guestCount'
			name='guests'
			value='0' />

		<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
	</div>);

