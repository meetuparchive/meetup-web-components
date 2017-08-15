import { propMapper } from './RadioButtonGroup';

describe('redux-form RadioButtonGroup', () => {
	describe('propMapper', () => {
		it('should map the props as expected', () => {
			const input = {
				value: 'test-value',
				onChange: 'onChange',
				onBlur: 'onBlur',
				name: 'test-name',
				onFocus: 'onFocus',
			};
			const meta = {
				error: 'error',
			};
			expect(
				propMapper({
					input,
					meta,
					otherProp: 'otherProp',
				})
			).toMatchSnapshot();
		});
	});
});
