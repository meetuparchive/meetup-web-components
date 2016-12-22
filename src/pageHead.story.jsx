
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
							<PageActionButton icon='magnifying-glass' label='Search' />
						</PageAction>
						<PageAction>
							<PageActionButton icon='edit' label='Edit' />
						</PageAction>
						<PageAction>
							<PageActionButton icon='share' label='Share' />
						</PageAction>
					</PageActions>
				</PageTitle>
			</PageHead>
		</div>
	))
	.add('With title, actions, and tabs', () => (
		<div>Waiting until Tabs component gets merged to finish this</div>
	));
