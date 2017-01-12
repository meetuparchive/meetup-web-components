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

	it(`check that default component has '${STRIPE_CLASS}' class`, function() {
		const stripe = TestUtils.renderIntoDocument(<Stripe />);
		const stripeNode = ReactDOM.findDOMNode(stripe);

		expect(stripeNode.classList).toContain(STRIPE_CLASS);
	});

	describe('collection', () => {
		let stripeCollection,
			stripeNode;
		beforeEach(() => {
			stripeCollection = TestUtils.renderIntoDocument(<Stripe collection/>);
			stripeNode = ReactDOM.findDOMNode(stripeCollection);
		});
		afterEach(() => {
			stripeCollection = null;
			stripeNode = null;
		});
		it(`check that the component has '${STRIPE_CLASS}' class`, function() {
			expect(stripeNode.classList).toContain(STRIPE_CLASS);
		});
		it(`check that default component has '${STRIPE_COLLECTION_CLASS}' class`, function() {
			expect(stripeNode.classList).toContain(STRIPE_COLLECTION_CLASS);
		});
	});

	describe('inverted', () => {
		let stripeInverted,
			stripeNode;
		beforeEach(() => {
			stripeInverted = TestUtils.renderIntoDocument(<Stripe inverted/>);
			stripeNode = ReactDOM.findDOMNode(stripeInverted);
		});
		afterEach(() => {
			stripeInverted = null;
			stripeNode = null;
		});
		it(`check that the component has '${STRIPE_CLASS}' class`, function() {
			expect(stripeNode.classList).toContain(STRIPE_CLASS);
		});
		it(`check that default component has '${STRIPE_INVERTED_CLASS}' class`, function() {
			const stripeNode = ReactDOM.findDOMNode(stripeInverted);

			expect(stripeNode.classList).toContain(STRIPE_INVERTED_CLASS);
		});
	});

	describe('hero', () => {
		let stripeHero,
			stripeNode;
		beforeEach(() => {
			stripeHero = TestUtils.renderIntoDocument(<Stripe hero/>);
			stripeNode = ReactDOM.findDOMNode(stripeHero);
		});
		afterEach(() => {
			stripeHero = null;
			stripeNode = null;
		});
		it(`check that the component has '${STRIPE_CLASS}' class`, function() {
			expect(stripeNode.classList).toContain(STRIPE_CLASS);
		});
		it(`check that component has '${STRIPE_HERO_CLASS}' class`, function() {
			expect(stripeNode.classList).toContain(STRIPE_HERO_CLASS);
		});
		it('should render a `Bounds` component', () => {
			const boundComponent = findComponentsWithType(stripeHero, 'Bounds');
			expect(boundComponent.length).toBe(1);
		});
	});

	describe('backgroundImage', () => {
		const src = 'https://placekitten.com/g/200/300';
		let stripeImg,
			stripeNode;
		beforeEach(() => {
			stripeImg = TestUtils.renderIntoDocument(<Stripe backgroundImage={src} />);
			stripeNode = ReactDOM.findDOMNode(stripeImg);
		});
		afterEach(() => {
			stripeImg = null;
			stripeNode = null;
		});
		it(`check that the component has '${STRIPE_CLASS}' class`, function() {
			expect(stripeNode.classList).toContain(STRIPE_CLASS);
		});
		it(`check that component has '${STRIPE_HERO_CLASS}' class`, function() {
			expect(stripeNode.classList).toContain(STRIPE_HERO_CLASS);
		});
		it('should set backgroundImage style', () => {
			expect(stripeNode.style.backgroundImage).toEqual(`url(${src})`);
		});
	});
});
