import React from 'react';
import { shallow } from 'enzyme';

import AccentHeader, { ALIGN_VALUES } from './AccentHeader';

describe('AccentHeader', () => {
	const accentHeaderComponent = shallow(<AccentHeader>Test</AccentHeader>);

	it('exists', () => {
		expect(accentHeaderComponent).toMatchSnapshot();
	});

	it('renders classname correct alignments', () => {
		it('applies correct alignment className to dropdown content', () => {
			Object.keys(ALIGN_VALUES).forEach(alignment => {
				const accentHeaderComponent = shallow(
					<AccentHeader align={alignment}>Test</AccentHeader>
				);
				expect(accentHeaderComponent)
					.prop('className')
					.toContain(`accentHeader--${alignment}`);
			});
		});
	});

	it('renders with whatever HTML tag is passed in', () => {
		const accentHeaderComponent = shallow(
			<AccentHeader headingTag={'h1'}>Test</AccentHeader>
		);
		expect(accentHeaderComponent.find('h1').length).toBe(1);
	});
});
