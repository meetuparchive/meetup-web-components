import React from 'react';
import { storiesOf } from '@kadira/storybook';
// import { Annotate } from './utils/storyComponents';
import { decorateWithLocale } from './utils/decorators';
import Modal from './Modal';

const content = (
	<h2>This is a modal!</h2>
);

storiesOf('Modal', module)
	.addDecorator(decorateWithLocale)
	.add('default', () => {
		return (
			<Modal
				closeUrl={'/test'} >
				{content}
			</Modal>
		);
	}).add('fullscreen', () => {
		return (
			<Modal
				closeUrl={'/test'}
				fullscreen >
				{content}
			</Modal>
		);
	});


