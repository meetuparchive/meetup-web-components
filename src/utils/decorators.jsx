import React from 'react';
import { withInfo } from '@storybook/addon-info';

export const decorateWithBasics = story => {
	/*
	 * -- Inline SVG icon sprite --
	 *
	 * raw SVG sprite from `swarm-icons`
	 */
	const iconSpriteStyle = { display: 'none' };
	const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');
	const styles = {
		display:'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%'
	};

	return (
		<div style={styles}>
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
			{story()}
		</div>
	);
};

export const decorateWithInfo = (story, context) => withInfo(`${context.story} ${context.kind}`)(story)(context);
