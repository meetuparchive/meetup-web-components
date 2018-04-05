import React from 'react';
import { storiesOf } from '@storybook/react';

import Bounds from './Bounds';
import Chunk from './Chunk';
import FormSection from './FormSection';
import TextInput from '../forms/TextInput';

storiesOf('FormSection', module).add('default', () => (
	<Bounds>
		<FormSection>
			<Chunk>
				<h2 className="text--sectionTitle">Part one</h2>
			</Chunk>
			<Chunk>
				<TextInput
					label="Your name"
					id="fullname"
					name="name"
					placeholder="enter your name here"
				/>
			</Chunk>
		</FormSection>
		<FormSection>
			<Chunk>
				<h2 className="text--sectionTitle">Part two</h2>
			</Chunk>
			<Chunk>
				<TextInput
					label="Your name"
					id="fullname"
					name="name"
					placeholder="enter your name here"
				/>
			</Chunk>
		</FormSection>
	</Bounds>
));
