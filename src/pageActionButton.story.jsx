import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { InfoWrapper } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import Icon from './media/Icon';
import PageActionButton from './PageActionButton';

storiesOf('PageActionButton', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper style={{border:'1px dotted red', width:'150px', margin:'auto'}}>
				<PageActionButton
					icon={<Icon shape='search' className='text--secondary' />}
					label='Search'
					onClick={action('clicked')}
				/>
			</InfoWrapper>
		)
	)
	.add('stacked icon + label', () => (
		<div style={{border:'1px dotted red', width:'150px'}}>
			<PageActionButton
				icon={<Icon shape='search' className='text--secondary' />}
				label='Find my Meetup'
				onClick={action('clicked')}
				stackVertical
			/>
		</div>
	))
	.add('horizontal at mobile, stacked at medium', () => (
		<div style={{border:'1px dotted red', width:'150px'}}>
			<PageActionButton
				icon={<Icon shape='search' className='text--secondary' />}
				label='Find my Meetup'
				onClick={action('clicked')}
				stackVerticalAtMedium
			/>
		</div>
	));
