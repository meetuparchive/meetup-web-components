import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { decorateWithInfo } from '../utils/decorators';
import Button from '../forms/Button';
import Modal from './Modal';
import Section from '../layout/Section';
import Stripe from '../layout/Stripe';
import Chunk from '../layout/Chunk';

/*
 * -- Inline SVG icon sprite --
 *
 * raw SVG sprite from `swarm-icons`
 */
const iconSpriteStyle = { display: 'none' };
const iconSprite = require('raw-loader!swarm-icons/dist/sprite/sprite.inc');

const onDismiss = e => {
	action('Dismissing modal')(e);
};

const content = (
	<Stripe>
		<Section hasSeparator className="border--none">
			<h2 className="align--center">This is a modal!</h2>
			<Chunk>
				<span>It even has some </span>
				<a href="#" className="link" id="firstFocus">
					examples of{' '}
				</a>
				<Button small>focusable</Button>
				<a href="#" className="link">
					{' '}
					content
				</a>.
			</Chunk>
			<div className="row align--center margin--top">
				<div className="row-item">
					<Button onClick={onDismiss} fullWidth>
						Cancel
					</Button>
				</div>
				<div className="row-item">
					<Button onClick={action('Confirmed!')} primary fullWidth>
						Confirm
					</Button>
				</div>
			</div>
		</Section>
	</Stripe>
);
const largeContent = (
	<Stripe className="border--none">
		<Section hasSeparator className="border--none">
			<h2 className="align--center">This is a modal!</h2>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<Chunk>Item</Chunk>
			<div className="row align--center margin--top">
				<div className="row-item">
					<Button onClick={onDismiss} fullWidth>
						Cancel
					</Button>
				</div>
				<div className="row-item">
					<Button onClick={action('Confirmed!')} primary fullWidth>
						Confirm
					</Button>
				</div>
			</div>
		</Section>
	</Stripe>
);

const wrapperStyle = {
	height: '100vh',
	position: 'relative',
};

storiesOf('Modal', module)
	.addDecorator(decorateWithInfo)
	.add(
		'default',
		() => (
			<div style={wrapperStyle}>
				<Modal onDismiss={onDismiss} initialFocus="#firstFocus">
					{content}
				</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{ info: { text: 'This is the basic usage with the component.' } }
	)
	.add(
		'stickyCloseArea',
		() => (
			<div style={wrapperStyle}>
				<Modal fixed stickyCloseArea>
					{largeContent}
				</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{
			info: {
				text:
					'The close area will be sticky at the top of the modal when the content is long enough to scroll',
			},
		}
	)
	.add(
		'fixed',
		() => (
			<div style={wrapperStyle}>
				<div className="padding--all">
					<p>
						Throw down all the stuff in the kitchen i cry and cry and cry
						unless you pet me, and then maybe i cry just for fun. Ask for
						petting curl into a furry donut lick butt, or plan steps for world
						domination instantly break out into full speed gallop across the
						house for no reason pee in the shoe. Throw down all the stuff in
						the kitchen jump on human and sleep on her all night long be long
						in the bed, purr in the morning and then give a bite to every
						human around for not waking up request food, purr loud scratch the
						walls, the floor, the windows, the humans so meow and wack the
						mini furry mouse or plop down in the middle where everybody walks
						annoy owner until he gives you food say meow repeatedly until
						belly rubs, feels good poop in a handbag look delicious and drink
						the soapy mopping up water then puke giant foamy fur-balls. Sun
						bathe kitty kitty. Demand to be let outside at once, and expect
						owner to wait for me as i think about it spot something, big eyes,
						big eyes, crouch, shake butt, prepare to pounce favor packaging
						over toy and ask to go outside and ask to come inside and ask to
						go outside and ask to come inside, cereal boxes make for five star
						accommodation and mrow. Caticus cuteicus. Leave dead animals as
						gifts. I could pee on this if i had the energy stare at the wall,
						play with food and get confused by dust lick butt and make a weird
						face kick up litter so step on your keyboard while you're gaming
						and then turn in a circle yet the dog smells bad but roll over and
						sun my belly. Sit on human pose purrfectly to show my beauty.
						Always hungry small kitty warm kitty little balls of fur spot
						something, big eyes, big eyes, crouch, shake butt, prepare to
						pounce. Who's the baby pee in the shoe. Jump around on couch, meow
						constantly until given food, . Kitty ipsum dolor sit amet, shed
						everywhere shed everywhere stretching attack your ankles chase the
						red dot, hairball run catnip eat the grass sniff missing until
						dinner time, and sleep nap and find a way to fit in tiny box.
					</p>
					<p>
						I just saw other cats inside the house and nobody ask me before
						using my litter box massacre a bird in the living room and then
						look like the cutest and most innocent animal on the planet for
						curl up and sleep on the freshly laundered towels. Cough hairball
						on conveniently placed pants chase imaginary bugs. Stares at human
						while pushing stuff off a table instead of drinking water from the
						cat bowl, make sure to steal water from the toilet so groom
						yourself 4 hours - checked, have your beauty sleep 18 hours -
						checked, be fabulous for the rest of the day - checked stare at
						ceiling make meme, make cute face. Who's the baby be a nyan cat,
						feel great about it, be annoying 24/7 poop rainbows in litter box
						all day, flop over, and eat plants, meow, and throw up because i
						ate plants poop on grasses. Licks your face meow go back to sleep
						owner brings food and water tries to pet on head, so scratch get
						sprayed by water because bad cat leave fur on owners clothes and
						show belly or jump five feet high and sideways when a shadow moves
						and mice. Hide when guests come over find empty spot in cupboard
						and sleep all day cough hairball on conveniently placed pants yet
						fall over dead (not really but gets sypathy). Chase the pig around
						the house.
					</p>
					<p>
						Scratch at the door then walk away be a nyan cat, feel great about
						it, be annoying 24/7 poop rainbows in litter box all day or use
						lap as chair, so you call this cat food, or friends are not food.
						Kitty power. Lie on your belly and purr when you are asleep wake
						up wander around the house making large amounts of noise jump on
						top of your human's bed and fall asleep again slap kitten brother
						with paw lick face hiss at owner, pee a lot, and meow repeatedly
						scratch at fence purrrrrr eat muffins and poutine until owner
						comes back yet chirp at birds lies down . Steal the warm chair
						right after you get up. Plan steps for world domination hide at
						bottom of staircase to trip human, but stand in front of the
						computer screen cough furball. See owner, run in terror roll on
						the floor purring your whiskers off eat owner's food stare out the
						window. Have a lot of grump in yourself because you can't forget
						to be grumpy and not be like king grumpy cat throw down all the
						stuff in the kitchen lick plastic bags mesmerizing birds massacre
						a bird in the living room and then look like the cutest and most
						innocent animal on the planet but run outside as soon as door open
						so make meme, make cute face. Curl up and sleep on the freshly
						laundered towels gnaw the corn cob or kick up litter but make
						meme, make cute face eat plants, meow, and throw up because i ate
						plants for scratch the postman wake up lick paw wake up owner meow
						meow or run outside as soon as door open.
					</p>
				</div>
				<Modal onDismiss={onDismiss} fixed>
					<Stripe>
						<Section hasSeparator className="border--none">
							<Chunk className="align--center">
								<h2>This is a modal!</h2>
								<p>I'm some copy</p>
							</Chunk>
							<div className="row align--center margin--top">
								<div className="row-item">
									<Button onClick={onDismiss} fullWidth>
										Cancel
									</Button>
								</div>
								<div className="row-item">
									<Button
										onClick={action('Confirmed!')}
										primary
										fullWidth
									>
										Confirm
									</Button>
								</div>
							</div>
						</Section>
					</Stripe>
				</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{ info: { text: 'This is the basic usage with fixed position content.' } }
	)
	.add(
		'fixed - long content',
		() => (
			<div style={wrapperStyle}>
				<Modal fixed>{largeContent}</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{
			info: {
				text:
					'Modals with content larger than the screens theyre in will scroll the content',
			},
		}
	)
	.add(
		'has hero - color',
		() => (
			<div style={wrapperStyle}>
				<Modal
					onDismiss={onDismiss}
					inverted
					heroBgColor="rgb(55,30,172)"
					heroContent={
						<Section hasSeparator className="border--none">
							<Chunk>
								<h1 className="text--display align--center">
									I can be your hero
								</h1>
							</Chunk>
						</Section>
					}
				>
					<Stripe>
						<Section hasSeparator className="border--none">
							<Chunk>
								<h2 className="align--center">This is a modal!</h2>
							</Chunk>
							<div className="row align--center margin--top">
								<div className="row-item">
									<Button onClick={onDismiss} fullWidth>
										Cancel
									</Button>
								</div>
								<div className="row-item">
									<Button
										onClick={action('Confirmed!')}
										primary
										fullWidth
									>
										Confirm
									</Button>
								</div>
							</div>
						</Section>
					</Stripe>
				</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{ info: { text: 'This is the component with an extended header.' } }
	)
	.add(
		'has hero - image',
		() => (
			<div style={wrapperStyle}>
				<Modal
					onDismiss={onDismiss}
					inverted
					heroBgImage="http://www.cheatsheet.com/wp-content/uploads/2016/09/Homemade-Meat-Gyro-with-French-Fries.jpg"
					heroContent={
						<Section hasSeparator className="border--none">
							<Chunk>
								<h1 className="text--display align--center">
									I can be your hero
								</h1>
							</Chunk>
						</Section>
					}
				>
					<Stripe>
						<Section hasSeparator className="border--none">
							<Chunk>
								<h2 className="align--center">This is a modal!</h2>
							</Chunk>
							<div className="row align--center margin--top">
								<div className="row-item">
									<Button onClick={onDismiss} fullWidth>
										Cancel
									</Button>
								</div>
								<div className="row-item">
									<Button
										onClick={action('Confirmed!')}
										primary
										fullWidth
									>
										Confirm
									</Button>
								</div>
							</div>
						</Section>
					</Stripe>
				</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{ info: { text: 'This is the component with an extended header.' } }
	)
	.add(
		'has hero - image (no scrim)',
		() => (
			<div style={wrapperStyle}>
				<Modal
					hideHeroScrim
					onDismiss={onDismiss}
					heroBgImage="http://cds.arbys.com/images/menu/1024x557_RoastBeefGyro_silo_tan.jpg"
					heroContent={
						<Section hasSeparator className="border--none">
							<Chunk>
								<h1 className="text--display align--center">
									I can be your hero
								</h1>
							</Chunk>
						</Section>
					}
				>
					<Stripe>
						<Section hasSeparator className="border--none">
							<Chunk>
								<h2 className="align--center">This is a modal!</h2>
							</Chunk>
							<div className="row align--center margin--top">
								<div className="row-item">
									<Button onClick={onDismiss} fullWidth>
										Cancel
									</Button>
								</div>
								<div className="row-item">
									<Button
										onClick={action('Confirmed!')}
										primary
										fullWidth
									>
										Confirm
									</Button>
								</div>
							</div>
						</Section>
					</Stripe>
				</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{
			info: {
				text:
					'This is the component with an extended header and no text-protection scrim.',
			},
		}
	)
	.add(
		'fullscreen',
		() => (
			<div style={wrapperStyle}>
				<Modal onDismiss={onDismiss} initialFocus="#firstFocus" fullscreen>
					{content}
				</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{
			info: {
				text: 'Full screen modals are set with the `fullscreen` boolean prop',
			},
		}
	)
	.add(
		'No close area',
		() => (
			<div style={wrapperStyle}>
				<Modal closeArea={false}>{content}</Modal>
				<div
					style={iconSpriteStyle}
					dangerouslySetInnerHTML={{ __html: iconSprite }}
				/>
			</div>
		),
		{
			info: {
				text:
					'Modals with no close area are set with the `closeArea` boolean prop',
			},
		}
	)
	.add('isLoading', () => (
		<div style={wrapperStyle}>
			<Modal isLoading onDismiss={onDismiss} initialFocus="#firstFocus">
				{content}
			</Modal>
			<div
				style={iconSpriteStyle}
				dangerouslySetInnerHTML={{ __html: iconSprite }}
			/>
		</div>
	))
	.add('isLoading with loadingProps', () => (
		<div style={wrapperStyle}>
			<Modal
				isLoading
				loadingProps={{
					color: 'red',
					scrimColor: 'rgba(250, 250, 255, 0.8)',
					size: '96px',
				}}
				onDismiss={onDismiss}
				initialFocus="#firstFocus"
			>
				{content}
			</Modal>
			<div
				style={iconSpriteStyle}
				dangerouslySetInnerHTML={{ __html: iconSprite }}
			/>
		</div>
	));
