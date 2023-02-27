import React from 'react';

import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from './utils/decorators';
import ContactCSModal from './ContactCSModal';

const modalItems = {
	title: 'Want to add a group?',
	subText: 'Talk to a community expert about the best way to grow your network.',
	buttonText: 'Schedule a Call',
	onclick: () => {},
};

storiesOf('Uncategorized/ContactCSModal', module)
	.addDecorator(decorateWithBasics)
	.addDecorator(decorateWithInfo)
	.add('default', () => (
		<ContactCSModal
			onDismiss={() => {}}
			focusTrapActive={false}
			modalItems={modalItems}
		/>
	));
