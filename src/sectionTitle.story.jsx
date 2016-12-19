
import React from 'react';
import Bounds from './Bounds';
import Section from './Section';
import SectionTitle from './SectionTitle';
import { storiesOf } from '@kadira/storybook';

storiesOf('SectionTitle', module)
	.add('Default', () => (
		<div style={{height: '100vh', width: '100%'}}>
			<Bounds>
				<Section>
					<SectionTitle>Section One</SectionTitle>
					<div className='runningText'>
						<p>Section content goes here. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					</div>
				</Section>
				<Section>
					<SectionTitle>Section Two</SectionTitle>
					<div className='runningText'>
						<p>More section content goes here. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
					</div>
				</Section>
			</Bounds>
		</div>
	))
	.add('With see all link', () => ( // Waiting to pull Rick's changes
		<div style={{height: '100vh', width: '100%'}}>
			<Bounds>
				<Section>
					<SectionTitle>Section One</SectionTitle>
					<div className='runningText'>
						<p>Section content goes here. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
					</div>
				</Section>
				<Section>
					<SectionTitle>Section Two</SectionTitle>
					<div className='runningText'>
						<p>More section content goes here. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
					</div>
				</Section>
			</Bounds>
		</div>
	));
