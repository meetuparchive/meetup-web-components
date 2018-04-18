import React from 'react';
import { storiesOf } from '@storybook/react';

import Loading from './Loading';

const LoadingDecorator = (storyFn) => (
	<div
		className="stripe stripe--collection border--none"
		style={{
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			justifyContent: 'center'
		}}
	>
		<div className="bounds">
			<div className="chunk">
				<div style={{position: 'relative'}}>
					<h3>What is Lorem Ipsum?</h3>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
					{ storyFn() }
				</div>
			</div>
			<div className="chunk">
				<div style={{position: 'relative'}}>
					<h3>Where can I get some?</h3>
					<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.</p>
				</div>
			</div>
		</div>
	</div>
);

storiesOf('Loading', module)
	.addDecorator(LoadingDecorator)
	.add('default', () => (
		<Loading />)
	)
	.add('partialCover', () =>
		<Loading partialCover/>
	)
	.add('fullCover', () =>
		<Loading fullCover/>
	)
	.add('custom size', () =>
		<Loading size="96px" />
	)
	.add('custom color', () =>
		<Loading color="rgb(241, 58, 89)"/>
	)
	.add('custom scrimColor', () => (
		<Loading
			fullCover
			scrimColor="rgba(255, 153, 209, .87)"
		/>
	));
