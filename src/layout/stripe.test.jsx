import React from 'react';
import { shallow } from 'enzyme';

import {
	Stripe,
	STRIPE_CLASS,
	STRIPE_COLLECTION_CLASS,
	STRIPE_INVERTED_CLASS,
	STRIPE_HERO_CLASS,
	STRIPE_NOSCRIM_CLASS,
} from './Stripe';

describe('Stripe', function() {
	const stripe = shallow(<Stripe />);

	it('exists', function() {
		expect(stripe).toMatchSnapshot();
	});

	describe('collection', () => {
		let stripeCollection;
		beforeEach(() => {
			stripeCollection = shallow(<Stripe collection />);
		});
		afterEach(() => {
			stripeCollection = null;
		});
		it(`check that the component has '${STRIPE_CLASS}' class`, function() {
			expect(stripeCollection.hasClass(STRIPE_CLASS)).toBe(true);
		});
		it(`check that default component has '${STRIPE_COLLECTION_CLASS}' class`, function() {
			expect(stripeCollection.hasClass(STRIPE_COLLECTION_CLASS)).toBe(true);
		});
	});

	describe('inverted', () => {
		let stripeInverted;
		beforeEach(() => {
			stripeInverted = shallow(<Stripe inverted />);
		});
		afterEach(() => {
			stripeInverted = null;
		});
		it(`check that the component has '${STRIPE_CLASS}' class`, function() {
			expect(stripeInverted.hasClass(STRIPE_CLASS)).toBe(true);
		});
		it(`check that default component has '${STRIPE_INVERTED_CLASS}' class`, function() {
			expect(stripeInverted.hasClass(STRIPE_INVERTED_CLASS)).toBe(true);
		});
	});

	describe('backgroundImage', () => {
		const src = 'https://placekitten.com/g/200/300';
		let stripeImg;
		beforeEach(() => {
			stripeImg = shallow(<Stripe hideScrim backgroundImage={src} />);
		});
		afterEach(() => {
			stripeImg = null;
		});
		it(`check that the component has '${STRIPE_CLASS}' class`, function() {
			expect(stripeImg.hasClass(STRIPE_CLASS)).toBe(true);
		});
		it(`check that component has '${STRIPE_HERO_CLASS}' class`, function() {
			expect(stripeImg.hasClass(STRIPE_HERO_CLASS)).toBe(true);
		});
		it('should set backgroundImage style', () => {
			expect(stripeImg.prop('style').backgroundImage).toEqual(`url(${src})`);
		});
		it('should hide text protection scrim when specified', () => {
			expect(stripeImg.hasClass(STRIPE_NOSCRIM_CLASS)).toBe(true);
		});
	});
});
