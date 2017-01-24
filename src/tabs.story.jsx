import React from 'react';
import { Link } from 'react-router';
import { storiesOf } from '@kadira/storybook';
import { Annotate, InfoWrapper } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import Tabs from './Tabs';

storiesOf('Tabs', module)
	.addDecorator(decorateWithLocale)
	.addWithInfo(
		'default',
		'This is the basic usage with the component.',
		() => (
			<InfoWrapper>
				<Tabs
					tabs={[
						<Link>First tab</Link>,
						<Link isSelected>Second tab</Link>,
						<Link>Third tab</Link>,
					]}
				/>
			</InfoWrapper>
		)
	)
	.add('Bordered tabs', () => {
		return (
			<Annotate notes='For bordered tabs, add the boolean prop `bordered` to `Tabs`'>
				<Tabs
					bordered
					tabs={[
						<Link isSelected>First tab</Link>,
						<Link>Second tab</Link>,
						<Link>Third tab</Link>,
					]}
				/>
			</Annotate>
		);
	})
	.add('Full width tabs', () => {
		return (
			<Annotate notes='For full-width tabs, add the boolean prop `full` to `Tabs`'>
				<Tabs
					full
					tabs={[
						<Link>First tab</Link>,
						<Link>Second tab</Link>,
						<Link isSelected>Third tab</Link>,
					]}
				/>
			</Annotate>
		);
	});
