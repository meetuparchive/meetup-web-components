import React from 'react';
import { storiesOf } from '@storybook/react';
import Section from './Section';
import Flex from './Flex';
import FlexItem from './FlexItem';
import { decorateWithInfo } from '../utils/decorators';

const shadingStyles = {
	backgroundColor: 'rgba(220, 192, 255, 0.45)',
	backgroundClip: 'content-box',
	outline: '1px dotted red',
};

storiesOf('Section', module)
	.addDecorator(decorateWithInfo)
	.add(
		'default',
		() => (
			<div style={{ height: '100vh', width: '100%', marginBottom: '20px' }}>
				<div style={{ maxWidth: '850px', margin: 'auto', marginTop: '15px' }}>
					<Section style={shadingStyles}>
						<div className="chunk">
							<h2 className="text--sectionTitle">About us</h2>
							<div className="runningText">
								<p>
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry. Lorem Ipsum has been the
									industry's standard dummy text ever since the 1500s,
									when an unknown printer took a galley of type and
									scrambled it to make a type specimen book. It has
									survived not only five centuries, but also the leap
									into electronic typesetting, remaining essentially
									unchanged. It was popularised in the 1960s with the
									release of Letraset sheets containing Lorem Ipsum
									passages, and more recently with desktop publishing
									software like Aldus PageMaker including versions of
									Lorem Ipsum.
								</p>
								<p>
									It is a long established fact that a reader will be
									distracted by the readable content of a page when
									looking at its layout. The point of using Lorem Ipsum
									is that it has a more-or-less normal distribution of
									letters, as opposed to using 'Content here, content
									here', making it look like readable English. Many
									desktop publishing packages and web page editors now
									use Lorem Ipsum as their default model text, and a
									search for 'lorem ipsum' will uncover many web sites
									still in their infancy. Various versions have evolved
									over the years, sometimes by accident, sometimes on
									purpose (injected humour and the like).
								</p>
							</div>
							<ul className="inlineblockList">
								<li>
									<a
										className="token token--link"
										href="/topics/91146/tech-talks"
									>
										Tech Talks
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/10209/web"
									>
										Web Technology
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/16216/mobile-technology"
									>
										Mobile Technology
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/3833/softwaredev"
									>
										Software Development
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/48471/computer-programming"
									>
										Computer programming
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/127567/ios-development"
									>
										iOS Development
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/20346/android-developers"
									>
										Android Development
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/1040/ruby"
									>
										Ruby
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/563/opensource"
									>
										Open Source
									</a>
								</li>
								<li>
									<a
										className="token token--link"
										href="/topics/189/java"
									>
										Java
									</a>
								</li>
							</ul>
						</div>
					</Section>

					<Section style={shadingStyles}>
						<div className="chunk">
							<h2 className="text--sectionTitle">Organized by</h2>
							<ul className="inlineblockList inlineblockList--bulleted">
								<li>Ana</li>
								<li>Maria</li>
								<li>Helen Ford</li>
								<li>K Rattan</li>
								<li>Jenn</li>
								<li>Michael Colby</li>
								<li>Sarah Hall</li>
								<li>Viki</li>
							</ul>
						</div>
					</Section>
				</div>
			</div>
		),
		{ info: { text: 'This is the basic usage with the component.' } }
	)
	.add('hasSeparator', () => (
		<div style={{ width: '100%' }}>
			<div style={{ maxWidth: '850px', margin: 'auto' }}>
				<Section hasSeparator style={shadingStyles}>
					<div className="chunk">
						<h2 className="text--sectionTitle">
							These sections always get separators
						</h2>
						<p className="text--bold text--secondary">
							Separators can contain bottom padding and a bottom border
						</p>
						<p>
							Lorem Ipsum was popularised in the 1960s with the release of
							Letraset sheets containing Lorem Ipsum passages, and more
							recently with desktop publishing software like Aldus PageMaker
							including versions of Lorem Ipsum.
						</p>
					</div>
				</Section>
				<Section hasSeparator style={shadingStyles}>
					<div className="chunk">
						<p className="text--bold">123 attending</p>
						<p>Hosted by Amy, Rick, Mike, Natalie</p>
					</div>
				</Section>
				<Section hasSeparator style={shadingStyles}>
					<div className="chunk">
						<div className="runningText">
							<p>
								Lorem Ipsum is simply dummy text of the printing and
								typesetting industry. Lorem Ipsum has been the industry's
								standard dummy text ever since the 1500s, when an unknown
								printer took a galley of type and scrambled it to make a
								type specimen book. It has survived not only five
								centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged.
							</p>
						</div>
					</div>
				</Section>
			</div>
		</div>
	))
	.add('Conditionally flush left and right (at medium breakpoint)', () => (
		<div style={{ width: '100%', border: '1px dotted orange' }}>
			<Section flushUntil="medium" style={shadingStyles}>
				<div className="chunk">
					<p className="text--bold">
						This section flushes to the left and right of the viewport until
						the `medium` breakpoint
					</p>
				</div>
			</Section>
			<Section flushUntil="medium" style={shadingStyles}>
				<div className="chunk">
					<p className="text--bold">
						This section has the same flushing behavior
					</p>
				</div>
			</Section>
		</div>
	))
	.add('hasSeparatorUntil (large breakpoint)', () => (
		<div style={{ width: '100%' }}>
			<Flex direction="column" switchDirection="large">
				<FlexItem>
					<div style={{ maxWidth: '850px', margin: 'auto' }}>
						<Section style={shadingStyles}>
							<div className="chunk">
								<p>NEVER gets separator</p>
							</div>
						</Section>
						<Section style={shadingStyles}>
							<div className="chunk">
								<p>NEVER gets separator</p>
							</div>
						</Section>
						<Section hasSeparatorUntil="large" style={shadingStyles}>
							<div className="chunk">
								<p className="text--bold">
									Gets separator, removes at "large" breakpoint
								</p>
							</div>
						</Section>
					</div>
				</FlexItem>

				<FlexItem>
					<div style={{ maxWidth: '850px', margin: 'auto' }}>
						<Section style={shadingStyles}>
							<div className="chunk">
								<p>NEVER gets separator</p>
							</div>
						</Section>
						<Section style={shadingStyles}>
							<div className="chunk">
								<p>NEVER gets separator</p>
							</div>
						</Section>
						<Section style={shadingStyles}>
							<div className="chunk">
								<p>NEVER gets separator</p>
							</div>
						</Section>
					</div>
				</FlexItem>
			</Flex>
		</div>
	))
	.add('isLoading', () => (
		<div style={{ height: '100vh', width: '100%', marginBottom: '20px' }}>
			<div style={{ maxWidth: '850px', margin: 'auto', marginTop: '15px' }}>
				<Section isLoading style={shadingStyles}>
					<div className="chunk">
						<h2 className="text--sectionTitle">About us</h2>
						<div className="runningText">
							<p>
								Lorem Ipsum is simply dummy text of the printing and
								typesetting industry. Lorem Ipsum has been the industry's
								standard dummy text ever since the 1500s, when an unknown
								printer took a galley of type and scrambled it to make a
								type specimen book. It has survived not only five
								centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged. It was popularised in the
								1960s with the release of Letraset sheets containing Lorem
								Ipsum passages, and more recently with desktop publishing
								software like Aldus PageMaker including versions of Lorem
								Ipsum.
							</p>
							<p>
								It is a long established fact that a reader will be
								distracted by the readable content of a page when looking
								at its layout. The point of using Lorem Ipsum is that it
								has a more-or-less normal distribution of letters, as
								opposed to using 'Content here, content here', making it
								look like readable English. Many desktop publishing
								packages and web page editors now use Lorem Ipsum as their
								default model text, and a search for 'lorem ipsum' will
								uncover many web sites still in their infancy. Various
								versions have evolved over the years, sometimes by
								accident, sometimes on purpose (injected humour and the
								like).
							</p>
						</div>
						<ul className="inlineblockList">
							<li>
								<a
									className="token token--link"
									href="/topics/91146/tech-talks"
								>
									Tech Talks
								</a>
							</li>
							<li>
								<a className="token token--link" href="/topics/10209/web">
									Web Technology
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/16216/mobile-technology"
								>
									Mobile Technology
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/3833/softwaredev"
								>
									Software Development
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/48471/computer-programming"
								>
									Computer programming
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/127567/ios-development"
								>
									iOS Development
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/20346/android-developers"
								>
									Android Development
								</a>
							</li>
							<li>
								<a className="token token--link" href="/topics/1040/ruby">
									Ruby
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/563/opensource"
								>
									Open Source
								</a>
							</li>
							<li>
								<a className="token token--link" href="/topics/189/java">
									Java
								</a>
							</li>
						</ul>
					</div>
				</Section>
			</div>
		</div>
	))
	.add('isLoading with loadingProps', () => (
		<div style={{ height: '100vh', width: '100%', marginBottom: '20px' }}>
			<div style={{ maxWidth: '850px', margin: 'auto', marginTop: '15px' }}>
				<Section
					isLoading
					loadingProps={{
						color: 'red',
						scrimColor: 'rgba(250, 250, 255, 0.8)',
						size: '96px',
					}}
					style={shadingStyles}
				>
					<div className="chunk">
						<h2 className="text--sectionTitle">About us</h2>
						<div className="runningText">
							<p>
								Lorem Ipsum is simply dummy text of the printing and
								typesetting industry. Lorem Ipsum has been the industry's
								standard dummy text ever since the 1500s, when an unknown
								printer took a galley of type and scrambled it to make a
								type specimen book. It has survived not only five
								centuries, but also the leap into electronic typesetting,
								remaining essentially unchanged. It was popularised in the
								1960s with the release of Letraset sheets containing Lorem
								Ipsum passages, and more recently with desktop publishing
								software like Aldus PageMaker including versions of Lorem
								Ipsum.
							</p>
							<p>
								It is a long established fact that a reader will be
								distracted by the readable content of a page when looking
								at its layout. The point of using Lorem Ipsum is that it
								has a more-or-less normal distribution of letters, as
								opposed to using 'Content here, content here', making it
								look like readable English. Many desktop publishing
								packages and web page editors now use Lorem Ipsum as their
								default model text, and a search for 'lorem ipsum' will
								uncover many web sites still in their infancy. Various
								versions have evolved over the years, sometimes by
								accident, sometimes on purpose (injected humour and the
								like).
							</p>
						</div>
						<ul className="inlineblockList">
							<li>
								<a
									className="token token--link"
									href="/topics/91146/tech-talks"
								>
									Tech Talks
								</a>
							</li>
							<li>
								<a className="token token--link" href="/topics/10209/web">
									Web Technology
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/16216/mobile-technology"
								>
									Mobile Technology
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/3833/softwaredev"
								>
									Software Development
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/48471/computer-programming"
								>
									Computer programming
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/127567/ios-development"
								>
									iOS Development
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/20346/android-developers"
								>
									Android Development
								</a>
							</li>
							<li>
								<a className="token token--link" href="/topics/1040/ruby">
									Ruby
								</a>
							</li>
							<li>
								<a
									className="token token--link"
									href="/topics/563/opensource"
								>
									Open Source
								</a>
							</li>
							<li>
								<a className="token token--link" href="/topics/189/java">
									Java
								</a>
							</li>
						</ul>
					</div>
				</Section>
			</div>
		</div>
	));
