import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';

import { withInfo } from '@storybook/addon-info';

import Bounds from './Bounds';
import Chunk from './Chunk';
import FormSection from './FormSection';
import TextInput from '../forms/TextInput';
import { C_COOLGRAYMEDIUM } from 'swarm-constants/dist/js/constants';
import { MEDIA_SIZES } from '../utils/designConstants';

storiesOf('Layout/FormSection', module)
	.addDecorator(withInfo)
	.addDecorator(withKnobs)
	.addParameters({ info: { propTablesExclude: [Bounds, Chunk, TextInput] } })
	.add('default', () => (
		<Bounds>
			<FormSection
				withSeparator={boolean('withSeparator', false)}
				isLoading={boolean('isLoading', false)}
				className={text('className', '')}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
			>
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
			<FormSection
				withSeparator={boolean('withSeparator', false)}
				isLoading={boolean('isLoading', true)}
				className={text('className', '')}
				loadingProps={object('loadingProps', {
					color: C_COOLGRAYMEDIUM,
					size: `${MEDIA_SIZES.l}px`,
				})}
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
	))
	.add('isLoading with loadingProps', () => (
		<Bounds>
			<FormSection
				withSeparator={boolean('withSeparator', false)}
				isLoading={boolean('isLoading', true)}
				className={text('className', '')}
				loadingProps={object('loadingProps', {
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '64px',
				})}
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
