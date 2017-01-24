
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
			<PageHead title='Page title' subtitle='I am a subtitle' />

			<PageHead title='Page title' subtitle={subtitleWithLink} />
		</div>
	))
	.add('With title and actions', () => (
		<div style={{width: '100%'}}>
			<PageHead title='Page title'>
				<PageActions>
					<PageAction>
						<PageActionButton icon='search' label='Search' />
					</PageAction>
					<PageAction>
						<PageActionButton icon='edit' label='Edit' />
					</PageAction>
				</PageActions>
			</PageHead>
		</div>
	))
	.add('With title and more than 3 actions', () => (
		<div style={{width: '100%'}}>
			<PageHead title='Page title'>
				<PageActions>
					<PageAction>
						<PageActionButton icon='search' label='Search' />
					</PageAction>
					<PageAction>
						<PageActionButton icon='edit' label='Edit' />
					</PageAction>
				</PageActions>
			</PageHead>
		</div>
	))
	.add('With title, actions, and tabs', () => (
		<div>Waiting until Tabs component gets merged to finish this</div>
	));
