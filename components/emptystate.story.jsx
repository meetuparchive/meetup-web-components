
import React from 'react';
import EmptyState from './EmptyState';
import { storiesOf } from '@kadira/storybook';

storiesOf('EmptyState', module)
	.add('default', () =>
		<EmptyState
			message='Empty state message'
		/>
	)
	.add('with caption', () =>
		<EmptyState
			message='Empty state message'
			caption='A supporting caption explaining the empty state in greater detail'
		/>
	)
	.add('with icon', () =>
		<EmptyState
			icon='Search'
			message='Nothing here to see'
		/>
	)
	.add('with cta', () =>
		<EmptyState
			message='Empty state message'
			cta={{text: 'Call to action', action: () => alert('Action!') }}
		/>
	)
	.add('with icon, caption and cta', () =>
		<EmptyState
			icon='Search'
			message='Empty state message'
			caption='A supporting caption explaining the empty state in greater detail'
			cta={{text: 'Call to action', action: () => alert('Action!') }}
		/>
	);
