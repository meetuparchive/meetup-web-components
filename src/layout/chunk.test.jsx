import React from 'react';
import { shallow } from 'enzyme';

import { ChunkComponent } from './Chunk';

describe('Chunk', function() {
	const chunk = shallow(<ChunkComponent />);

	it('exists', function() {
		expect(chunk).toMatchSnapshot();
	});
});
