import React from 'react';
import { Link } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { InfoWrapper } from '../utils/storyComponents';
import { decorateWithLocale } from '../utils/decorators';
import { Tabs, TabsTab } from './Tabs';

storiesOf('Tabs', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo('default', 'This is the basic usage with the component.', () => (
		<InfoWrapper>
			<Tabs>
				<TabsTab>
					<Link>First tab</Link>
				</TabsTab>
				<TabsTab isSelected>
					<Link>Second tab</Link>
				</TabsTab>
				<TabsTab>
					<Link>Third tab</Link>
				</TabsTab>
			</Tabs>
		</InfoWrapper>
	))
	.addWithInfo('Tabs without btm border', () => {
		return (
			<InfoWrapper>
				<Tabs noBorder>
					<TabsTab isSelected>
						<Link>First tab</Link>
					</TabsTab>
					<TabsTab>
						<Link>Second tab</Link>
					</TabsTab>
					<TabsTab>
						<Link>Third tab</Link>
					</TabsTab>
				</Tabs>
			</InfoWrapper>
		);
	})
	.addWithInfo('Full width tabs', () => {
		return (
			<InfoWrapper>
				<Tabs full>
					<TabsTab>
						<Link>First tab</Link>
					</TabsTab>
					<TabsTab>
						<Link>Second tab</Link>
					</TabsTab>
					<TabsTab isSelected>
						<Link>Third tab</Link>
					</TabsTab>
				</Tabs>
			</InfoWrapper>
		);
	});
