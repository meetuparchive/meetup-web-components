import React from 'react';
import { storiesOf } from '@storybook/react';

import withMatchMedia from './withMatchMedia';

import Stripe from '../../layout/Stripe';
import Bounds from '../../layout/Bounds';
import Section from '../../layout/Section';

/**
 * @class TestComponent
 */
class TestComponent extends React.Component {
	render() {
		const { media } = this.props;

		const stripeStyle = {
			height: '100%',
		};

		return (
			<Stripe inverted style={stripeStyle}>
				<Bounds className="padding--left padding--right">
					<Section className="runningText">
						<h1 className="text--display1">Viewport-aware props</h1>
						<p>
							By wrapping <code>TestComponent</code> with{' '}
							<code className="text--red">withMatchMedia</code>, we can use
							the breakpoint props it provides to conditionally render
							elements based on viewport size.
						</p>
						<p>
							Note: Consider using{' '}
							<code className="text--red">connectWithMatchMedia</code> from{' '}
							<code>mwp-app-render</code> instead, which uses the user agent
							string to detect the device and smartly set a default media on
							initial render, before we detect the media from the viewport.
						</p>
						<p className="text--bold">
							Resize your browser to see it in action.
						</p>
					</Section>
					<Section className="runningText border--none">
						<h1 className="text--display3 text--secondary">
							<code>True</code> props:
						</h1>
						<ul className="text--big text--mono">
							{media.isAtSmallUp && (
								<li className="text--teal">media.isAtSmallUp</li>
							)}
							{media.isAtMediumUp && (
								<li className="text--yellow">media.isAtMediumUp</li>
							)}
							{media.isAtLargeUp && (
								<li className="text--pink">media.isAtLargeUp</li>
							)}
							{media.isAtHugeUp && (
								<li className="text--red">media.isAtHugeUp</li>
							)}
						</ul>
					</Section>
				</Bounds>
			</Stripe>
		);
	}
}
const TestComponentWithMatchMedia = withMatchMedia(TestComponent);

storiesOf('Uncategorized/withMatchMedia', module).add(
	'Test component using provided media props',
	() => <TestComponentWithMatchMedia />,
	{ info: { text: 'Basic example of match media component usage.' } }
);
