import React from 'react';

const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');
const iconSpriteStyle = { display: 'none' };

export const iconSpriteJSX = (
	<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
);
