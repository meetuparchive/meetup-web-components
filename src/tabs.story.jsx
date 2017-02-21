import React from 'react';
import { Link } from 'react-router';
import { storiesOf } from '@kadira/storybook';
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
				<Tabs
					tabs={[
						<TabsTab><Link>First tab</Link></TabsTab>,
						<TabsTab isSelected><Link>Second tab</Link></TabsTab>,
						<TabsTab><Link>Third tab</Link></TabsTab>,
					]}
				/>
			</InfoWrapper>
		)
	)
	.addWithInfo('Bordered tabs', () => {
		return (
			<InfoWrapper>
				<Tabs
					bordered
					tabs={[
						<TabsTab isSelected><Link>First tab</Link></TabsTab>,
						<TabsTab><Link>Second tab</Link></TabsTab>,
						<TabsTab><Link>Third tab</Link></TabsTab>,
					]}
				/>
			</InfoWrapper>
		);
	})
	.addWithInfo('Full width tabs', () => {
		return (
			<InfoWrapper>
				<Tabs
					full
					tabs={[
						<TabsTab><Link>First tab</Link></TabsTab>,
						<TabsTab><Link>Second tab</Link></TabsTab>,
						<TabsTab isSelected><Link>Third tab</Link></TabsTab>,
					]}
				/>
			</InfoWrapper>
		);
	});
