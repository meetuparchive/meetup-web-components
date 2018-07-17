import React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateWithInfo } from '../utils/decorators';

import Bounds from './Bounds';
import Chunk from './Chunk';
import FormSection from './FormSection';
import TextInput from '../forms/TextInput';

storiesOf('FormSection', module)
	.addDecorator(decorateWithInfo)
	.add('default', () => (
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
	))
	.add('isLoading', () => (
		<Bounds>
			<FormSection isLoading>
				<Chunk>
					<h2 className="text--sectionTitle">Loading form section</h2>
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
	))
	.add('isLoading with loadingProps', () => (
		<Bounds>
			<FormSection
				isLoading
				loadingProps={{
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '64px',
				}}
			>
				<Chunk>
					<h2 className="text--sectionTitle">Loading form section</h2>
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
