// @flow
// $FlowFixMe
import React, { useState, useCallback } from 'react';
import { Search } from '@meetup/swarm-icons/lib/components/solid';
import TextInput from '../../../forms/TextInput';

type Props = {
	onSearchCallback: (value: string) => void,
	isNewNavActive?: boolean,
};

export const NAVBAR_SEARCH_INPUT_ID = 'navbar_search_input_id';

export const NavbarSearchComponent = ({
	onSearchCallback,
	isNewNavActive,
	...other
}: Props) => {
	const [value, setValue] = useState('');

	const onSearch = useCallback(
		(e: SyntheticInputEvent<EventTarget>): void => {
			const inputValue = e.target.value;
			// $FlowFixMe
			if (e.keyCode === 13 && inputValue) {
				onSearchCallback(inputValue);
			}
		},
		[onSearchCallback]
	);

	const onChange = useCallback((e: SyntheticInputEvent<EventTarget>): void => {
		setValue(e.target.value);
	}, []);

	const onClick = useCallback(
		() => {
			onSearchCallback(value);
		},
		[value, onSearchCallback]
	);

	const newSearchBar = (
		<div className="navbar-search">
			<div className="navbar-search-input">
				<TextInput
					id={NAVBAR_SEARCH_INPUT_ID}
					name="navbar_search"
					isSearch
					onKeyDown={onSearch}
					onChange={onChange}
					value={value}
					{...other}
				/>
			</div>
			<button
				className="navbar-search-btn"
				onClick={onClick}
				aria-label="search"
				role="presentation"
				title="search"
			>
				<Search style={{ fill: 'white', height: '30px' }} />
			</button>
		</div>
	);

	const oldSearchBar = (
		<TextInput
			id={NAVBAR_SEARCH_INPUT_ID}
			name="navbar_search"
			iconShape="search"
			isSearch
			onKeyDown={onSearch}
			onChange={onChange}
			value={value}
			{...other}
		/>
	);

	return isNewNavActive ? newSearchBar : oldSearchBar;
};

export default NavbarSearchComponent;
