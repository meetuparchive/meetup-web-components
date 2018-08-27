import React from 'react';
import { mount } from 'enzyme';
import { Portal } from 'react-portal';

import FloatingPosition, {
	getAdjustedAlignment,
	calculateContentPosition,
} from './FloatingPosition';

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

		const { noPortal } = this.props;

		return (
			<div>
				<div ref={el => (this.triggerRef = el)}>Trigger</div>
				<FloatingPosition
					offset={{ top: 8, left: 16 }}
					getTrigger={getTrigger}
					getContent={getContent}
					noPortal={noPortal}
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

describe('FloatingPosition', () => {
	const renderComponent = props => mount(<TestComponent {...props} />);

	it('should render children with a Portal if noPortal is false', () => {
		const floatingPostion = renderComponent({ noPortal: false });
		expect(floatingPostion.find(Portal).exists()).toBeTruthy();
	});

	it('should render children without a Portal if noPortal is true', () => {
		const floatingPostion = renderComponent({ noPortal: true });
		expect(floatingPostion.find(Portal).exists()).toBeFalsy();
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

	describe('the calculateContentPosition function', () => {
		const triggerWithoutOffsetParent = () => ({
			getBoundingClientRect: () => ({ height: 50 }),
		});
		it('should return undefined early if trigger is provided and content is not', () => {
			const params = {
				trigger: triggerWithoutOffsetParent,
				content: null
			};
			expect(calculateContentPosition(triggerWithoutOffsetParent, null)).toEqual(undefined);
		});
		it('should return undefined early if content is provided trigger is not', () => {
			expect(calculateContentPosition(null, <div />)).toEqual(undefined);
		});
		it('should return content position if trigger and content are both provided', () => {
			expect(calculateContentPosition(triggerWithoutOffsetParent, <div />)).toEqual({
				left: 0,
				top: 0,
			});
		});
		describe('when not adding a portal', () => {
			it('should return a left position of undefined', () => {
				expect(calculateContentPosition(triggerWithoutOffsetParent, <div />, false, 0, 'top')).toEqual({
					left: undefined,
					top: 0,
				});
			});
			describe('when the direction is top', () => {
				it('should return a top position of the negative contentHeight', () => {
					expect(
						calculateContentPosition(triggerWithoutOffsetParent, <div />, false, 3, 'top')
					).toEqual({ left: undefined, top: -3 });
				});
			});
			describe('when the direction is not top', () => {
				describe('when offset is undefined and the trigger does not have an offset parent', () => {
					it('should return a top position equal to the height of the trigger', () => {
						expect(
							calculateContentPosition(triggerWithoutOffsetParent, <div></div>, false, 3, 'fakeDirection')
						).toEqual({ top: 50, left: undefined });
					});
				});
			});
		});
	});
});
