import React from 'react';
import { shallow } from 'enzyme';

import FloatingPosition, { getAdjustedAlignment } from './FloatingPosition';

/**
 * @module TestComponent
 */
class TestComponent extends React.PureComponent {
	render() {
		const getTrigger = () => {
			return this.triggerRef;
		};

		const getContent = () => {
			return this.contentRef;
		};

		return (
			<div>
				<div ref={el => (this.triggerRef = el)}>Trigger</div>
				<FloatingPosition
					offset={{ top: 8, left: 16 }}
					getTrigger={getTrigger}
					getContent={getContent}
					noPortal={false}
					align="right"
				>
					{({ top, left }) => (
						<div ref={el => (this.contentRef = el)}>
							<p>top: {top}</p>
							<p>left: {left}</p>
						</div>
					)}
				</FloatingPosition>
			</div>
		);
	}
}

describe('FloatingPosition', function() {
	const floatingPosition = shallow(<TestComponent />);

	it('matches snapshot', () => {
		expect(floatingPosition).toMatchSnapshot();
	});

	it('adjusts popup content position if it overflows the viewport', () => {
		const MOCK_POSITION_DATA = { left: 0, width: 70 };
		const expected = 'left';
		const actual = getAdjustedAlignment('right', MOCK_POSITION_DATA, 384, 1000);

		expect(actual).toBe(expected);
	});

	it('does not adjust popup content position if it fits in the viewport', () => {
		const MOCK_POSITION_DATA = { left: 500, width: 70 };
		const expected = 'right';
		const actual = getAdjustedAlignment('right', MOCK_POSITION_DATA, 384, 1000);

		expect(actual).toBe(expected);
	});
});
