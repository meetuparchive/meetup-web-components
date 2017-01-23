
import React from 'react';
import PageHead from './PageHead';
import PageTitle from './PageTitle';
import PageActions from './PageActions';
import PageAction from './PageAction';
import PageActionButton from './PageActionButton';
import { storiesOf } from '@kadira/storybook';

const subtitleWithLink = (
	<span>I am a subtitle with a <a href='#' className='link'>link</a></span>
);

/*
 * -- Inline SVG icon sprite --
 *
 * raw SVG sprite from `swarm-icons`
 */
const iconSpriteStyle = { display: 'none' };
const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');

storiesOf('PageHead', module)
	.add('With title', () => (
		<div style={{width: '100%'}}>
			<PageHead>
				<PageTitle title='Page title' />
			</PageHead>
		</div>
	))
	.add('With title and subtitle', () => (
		<div style={{width: '100%'}}>
			<PageHead>
				<PageTitle title='Page title' subtitle='I am a subtitle' />
			</PageHead>

			<PageHead>
				<PageTitle title='Page title' subtitle={subtitleWithLink} />
			</PageHead>
		</div>
	))
	.add('With title and actions', () => (
		<div style={{width: '100%'}}>
			<PageHead>
				<PageTitle title='Page title'>
					<PageActions>
						<PageAction>
							<PageActionButton icon='search' label='Search' />
						</PageAction>
						<PageAction>
							<PageActionButton icon='edit' label='Edit' />
						</PageAction>
					</PageActions>
				</PageTitle>
			</PageHead>
			<div style={iconSpriteStyle} dangerouslySetInnerHTML={{__html: iconSprite}} />
		</div>
	))
	.add('With title, actions, and tabs', () => (
		<div>Waiting until Tabs component gets merged to finish this</div>
	));
