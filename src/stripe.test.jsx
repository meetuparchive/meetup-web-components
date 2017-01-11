import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { findComponentsWithType } from 'meetup-web-mocks/lib/testUtils';

import Stripe, {
	STRIPE_CLASS,
	STRIPE_COLLECTION_CLASS,
	STRIPE_INVERTED_CLASS,
	STRIPE_HERO_CLASS,
} from './Stripe';

describe('Stripe', function() {

	it('exists', function() {
		const stripe = TestUtils.renderIntoDocument(<Stripe />);
		const stripeNode = ReactDOM.findDOMNode(stripe);

		expect(stripeNode).not.toBeNull();
	});

	it(`check that default component has \'${STRIPE_CLASS}\' class`, function() {
		const stripe = TestUtils.renderIntoDocument(<Stripe />);
		const stripeNode = ReactDOM.findDOMNode(stripe);

		expect(stripeNode.classList).toContain(STRIPE_CLASS);
	});

	describe('collection', () => {
		let stripeCollection;
		beforeEach(() => {
			stripeCollection = TestUtils.renderIntoDocument(<Stripe collection/>);
		});
		afterEach(() => {
			stripeCollection = null;
		});
		it(`check that default component has \'${STRIPE_COLLECTION_CLASS}\' class`, function() {
			const stripeNode = ReactDOM.findDOMNode(stripeCollection);

			expect(stripeNode.classList).toContain(STRIPE_COLLECTION_CLASS);
		});
	});

	describe('inverted', () => {
		let stripeInverted;
		beforeEach(() => {
			stripeInverted = TestUtils.renderIntoDocument(<Stripe inverted/>);
		});
		afterEach(() => {
			stripeInverted = null;
		});
		it(`check that default component has \'${STRIPE_INVERTED_CLASS}\' class`, function() {
			const stripeNode = ReactDOM.findDOMNode(stripeInverted);

			expect(stripeNode.classList).toContain(STRIPE_INVERTED_CLASS);
		});
	});


	describe('hero', () => {
		let stripeHero;
		beforeEach(() => {
			stripeHero = TestUtils.renderIntoDocument(<Stripe hero/>);
		});
		afterEach(() => {
			stripeHero = null;
		});
		it(`check that component has \'${STRIPE_CLASS}\' class`, function() {
			const stripeNode = ReactDOM.findDOMNode(stripeHero);

			expect(stripeNode.classList).toContain(STRIPE_HERO_CLASS);
		});
		it('should render a `Bounds` component', () => {
			const boundComponent = findComponentsWithType(stripeHero, 'Bounds');
			expect(boundComponent.length).toBe(1);
		});
		describe('backgroundImage', () => {
			const src = 'https://placekitten.com/g/200/300';
			beforeEach(() => {
				stripeHero = TestUtils.renderIntoDocument(<Stripe backgroundImage={src} />);
			});
			afterEach(() => {
				stripeHero = null;
			});
			it(`check that component has \'${STRIPE_CLASS}\' class`, function() {
				const stripeNode = ReactDOM.findDOMNode(stripeHero);
				expect(stripeNode.classList).toContain(STRIPE_HERO_CLASS);
			});
			it('should set backgroundImage style', () => {
				const stripeNode = ReactDOM.findDOMNode(stripeHero);
				expect(stripeNode.style.backgroundImage.indexOf(src)).not.toBe(-1);
			});
			it('should NOT render a hero component if `backgroundImage` provided but no `hero` flag', () => {
				const boundComponent = findComponentsWithType(stripeHero, 'Bounds');
				expect(boundComponent.length).toBe(0);
			});
		});
	});
});
