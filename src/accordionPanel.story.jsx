
import React from 'react';
import AccordionPanel from './AccordionPanel';
import { storiesOf } from '@kadira/storybook';

/*
 * -- Inline SVG icon sprite --
 *
 * raw SVG sprite from `swarm-icons`
 */
const iconSpriteStyle = { display: 'none' };
const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');

storiesOf('AccordionPanel', module)
	.add('default', () => (
		<div className='span--100 padding--all'>
			<AccordionPanel
				triggerLabel='First Section'
				panelContent={
					<div className='runningText'>
						<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
					</div>
				} />
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	));
