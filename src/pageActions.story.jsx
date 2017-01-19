import React from 'react';
import PageActionButton from './PageActionButton';
import PageAction from './PageAction';
import PageActions from './PageActions';
import { storiesOf } from '@kadira/storybook';

/*
 * -- Inline SVG icon sprite --
 *
 * raw SVG sprite from `swarm-icons`
 */
const iconSpriteStyle = { display: 'none' };
const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');

storiesOf('PageActions', module)
	.add('Row (default)', () => (
		<div style={{width: '100%', padding: '16px'}}>
			<PageActions>
				<PageAction>
					<PageActionButton icon='search' label='Search' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='edit' label='Edit' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='export' label='Share' />
				</PageAction>
			</PageActions>
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('Column', () => (
		<div style={{width: '100%'}}>
			<PageActions direction='column'>
				<PageAction>
					<PageActionButton icon='search' label='Search' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='edit' label='Edit' />
				</PageAction>
				<PageAction>
					<PageActionButton icon='export' label='Share' />
				</PageAction>
			</PageActions>
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	));
