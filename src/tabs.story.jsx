import React from 'react';
import Tabs from './Tabs';
import { storiesOf } from '@kadira/storybook';
import { locale } from './utils/decorators';

storiesOf('Tabs', module)
	.addDecorator(locale)
	.add('default', () => {
		const tabsList = [
			{ name: 'Other page', url: '/dogs' },
			{ name: 'Current page', url: '/' },
		];
		return (
			<Tabs tabList={tabsList} />
		);
	});
