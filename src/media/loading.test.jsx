import React from 'react';
import { variantTest } from '../utils/testUtils';
import { shallow } from 'enzyme';

import Loading, {
	LOADING_CLASS,
	LOADING_SHAPE_CLASS,
	LOADING_SHAPE_PATH_CLASS
} from './Loading';

const CUSTOM_COLOR = '#000';
const CUSTOM_SCRIM_COLOR = '#FFF';
const CUSTOM_SIZE = '42px';

describe('Loading', () => {
	const loadingComponent = shallow(
		<Loading
			fullCover
			color={CUSTOM_COLOR}
			scrimColor={CUSTOM_SCRIM_COLOR}
			size={CUSTOM_SIZE}
		/>
	);
	it('exists', () => {
		expect(loadingComponent).toMatchSnapshot();
	});

	it('applies variant classes for each variant prop', () => {
		const variants = [
			'fullCover',
			'partialCover'
		];

		variantTest(Loading, LOADING_CLASS, variants);
	});

	it('colors the loader', () => {
		const shapePath = loadingComponent.find(`.${LOADING_SHAPE_PATH_CLASS}`);
		expect(shapePath.prop('stroke')).toBe(CUSTOM_COLOR);
	});

	it('colors the scrim', () => {
		expect(loadingComponent.prop('style').backgroundColor).toBe(CUSTOM_SCRIM_COLOR);
	});

	it('resizes when a custom size is passed', () => {
		const shape = loadingComponent.find(`.${LOADING_SHAPE_CLASS}`);
		expect(shape.prop('style').width).toBe(CUSTOM_SIZE);
	});
});
