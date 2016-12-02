
import React from 'react';
import PageHead from './PageHead';
import PageTitle from './PageTitle';
import PageActions from './PageActions';
import PageAction from './PageAction';
import PageActionButton from './PageActionButton';
import Tabs from './Tabs';
import { storiesOf } from '@kadira/storybook';

storiesOf('PageHead', module)
	.add('default', () => (
		<PageHead>
			<PageTitle title='Page title' />
			<PageActions>
				<PageAction>
					<PageActionButton icon='magnifying-glass' label='Search' />
				</PageAction>
			</PageActions>
		</PageHead>
	))
	.add('has tabs', () => (
		<PageHead>
			<PageTitle title='Page title' />
			<PageActions>
				<PageAction>
					<PageActionButton icon='magnifying-glass' label='Search' />
				</PageAction>
			</PageActions>
			<Tabs
				tabList={[
					{ id: 'members', name: 'All members', url: '/hq-faff/members' },
					{ id: 'organizers', name: 'Organizers', url: '/hq-faff/members/organizers' },
					{ id: 'pending', name: 'Pending', url: '/hq-faff/members/pending' }
				]}
				activeTab='members'
			/>
		</PageHead>
	));
