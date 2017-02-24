import React from 'react';
import { Link } from 'react-router';
import { storiesOf } from '@kadira/storybook';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { InfoWrapper } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import { Tabs, TabsTab } from './Tabs';

storiesOf('Tabs', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Tabs>
					<TabsTab><Link>First tab</Link></TabsTab>
					<TabsTab isSelected><Link>Second tab</Link></TabsTab>
					<TabsTab><Link>Third tab</Link></TabsTab>
				</Tabs>
			</InfoWrapper>
		)
	)
	.add('Bordered tabs', () => {
		return (
			<WithNotes notes='For bordered tabs, add the boolean prop `bordered` to `Tabs`'>
				<Tabs bordered>
					<TabsTab isSelected><Link>First tab</Link></TabsTab>
					<TabsTab><Link>Second tab</Link></TabsTab>
					<TabsTab><Link>Third tab</Link></TabsTab>
				</Tabs>
			</WithNotes>
		);
	})
	.add('Full width tabs', () => {
		return (
			<WithNotes notes='For full-width tabs, add the boolean prop `full` to `Tabs`'>
				<Tabs full>
					<TabsTab><Link>First tab</Link></TabsTab>
					<TabsTab><Link>Second tab</Link></TabsTab>
					<TabsTab isSelected><Link>Third tab</Link></TabsTab>
				</Tabs>
			</WithNotes>
		);
	});
