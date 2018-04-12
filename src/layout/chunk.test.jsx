import React from 'react';
import { shallow } from 'enzyme';

import { Chunk } from './Chunk';

describe('Chunk', function() {
	const chunk = shallow(<Chunk />);

	it('exists', function() {
		expect(chunk).toMatchSnapshot();
	});
});
