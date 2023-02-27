import React from 'react';

import { storiesOf } from '@storybook/react';
import { decorateWithBasics, decorateWithInfo } from './utils/decorators';
import ContactCSModal from './ContactCSModal';

const modalItems = {
	title: 'Want to add a group?',
	subText: 'Talk to a community expert about the best way to grow your network.',
	buttonText: 'Schedule a Call',
	link:
		'meetup.com/lp/meetup-pro/?fromUpgrade=true&utm_medium=display&utm_source=meetup&utm_content=lp_pro&utm_campaign=meetup_orgeng_c2p_pro',
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
