import React from 'react';
import { IntlProvider } from 'react-intl';

export const decorateWithLocale = story => {
	const locale = 'en-US';

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
		<IntlProvider locale={locale}>
			<div style={styles}>
				<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
				{story()}
			</div>
		</IntlProvider>
	);
};
