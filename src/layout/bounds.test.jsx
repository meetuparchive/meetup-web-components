import React from 'react';
import { shallow } from 'enzyme';

import { Bounds } from './Bounds';

const WIDE_CLASS = 'bounds--wide';

describe('Bounds', function() {
	const bounds = shallow(<Bounds />);

	it('exists', function() {
		expect(bounds).toMatchSnapshot();
	});
	it(`check that default component has '${WIDE_CLASS}' class`, function() {
		expect(bounds.find(`.${WIDE_CLASS}`).length).not.toBe(0);
	});
	it("check that narrow component does not have the 'bounds--wide' class", function() {
		const boundsNarrow = shallow(<Bounds narrow />);
		expect(boundsNarrow.find(`.${WIDE_CLASS}`).length).toBe(0);
	});
});
