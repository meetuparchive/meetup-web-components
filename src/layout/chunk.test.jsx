import React from 'react';
import { shallow } from 'enzyme';

import { Chunk } from './Chunk';

const dangerousHTML = '<div>Dangerously setting inner HTML</div>';
const makeDanger = () => ({__html: dangerousHTML});

describe('Chunk', function() {
	const chunk = shallow(<Chunk />);

	it('exists', function() {
		expect(chunk).toMatchSnapshot();
	});

	it('can handle dangerouslySetInnerHTML', function() {
		const dangerousHTMLComponent = shallow(
			<Chunk
				dangerouslySetInnerHTML={makeDanger()}
			/>
		);
		expect(dangerousHTMLComponent.html()).toContain(dangerousHTML);
	});
});
