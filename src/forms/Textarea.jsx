// @flow
import * as React from 'react';
import withErrorList from '../utils/components/withErrorList';
import a11yPassThrough from '../utils/a11yPassThrough';

import {
	Textarea as SwarmTextarea,
	FieldLabel,
	FieldHelper,
} from '@meetup/swarm-components';

type Props = React.Element<HTMLTextAreaElement> & {
	/** Adds an `id` attribute to the input, and associates it with the `<label />` */
	id: string,
	/** The `name` attribute for the input */
	name: string,
	/** Error content to render */
	error?: string,
	/** What we render into the input's `<label />` */
	label?: string | React.Element<*>,
	/** The smallest height the `<textarea />` can be */
	minHeight?: number,
	/** The largest height the `<textarea />` can be */
	maxHeight?: number,
	/** Callback that happens when the textarea value changes */
	onChange?: (e: Event) => void,
	/** Number of rows high the textarea is */
	rows?: number,
	/** Value of the textarea */
	value?: string,
	/** An additional piece of helpful info rendered with the field */
	helperText?: string | React.Element<*>,
	/** Whether the field is required to have a value */
	required?: boolean,
};

type State = {
	value: string,
};

/**
 * Should override value with info from state
 * @return {Object} the new state for the component
 */
export const overrideValue = (nextProps: Props): State => ({
	value: nextProps.value || '',
});

/**
 * @module Textarea
 */
export class Textarea extends React.PureComponent<Props, State> {
	static defaultProps = {
		requiredText: '*',
	};

	state = {
		value: '',
	};

	/**
	 * @param {Object} nextProps the incoming props
	 * @return {undefined} side effect only
	 */
	static getDerivedStateFromProps(nextProps: Props) {
		return overrideValue(nextProps);
	}

	/**
	 * called as user changes value, updates state with new value
	 * @param  {Object} e Event object
	 * @return {undefined}
	 */
	onChange = (e: SyntheticInputEvent<EventTarget>): void => {
		const { onChange } = this.props;
		const { value } = e.target;

		this.setState(() => ({
			value,
		}));

		if (onChange) {
			onChange(e);
		}
	};

	textarea: ?HTMLTextAreaElement;

	render() {
		const {
			name,
			value, // eslint-disable-line no-unused-vars
			label,
			labelClassName,
			rows,
			style = {},
			maxHeight,
			minHeight,
			maxLength,
			id,
			onChange, // eslint-disable-line no-unused-vars
			helperText,
			required,
			requiredText, // eslint-disable-line no-unused-vars
			disableResize,
			...other
		} = this.props;

		// Character limits should be a "soft" limit.
		// Avoid passing maxLength as an HTML attribute
		if (maxLength) delete other.maxLength;

		return (
			<div className="inputContainer">
				{label && (
					<FieldLabel htmlFor={id} className={a11yPassThrough(labelClassName)}>
						{label}
					</FieldLabel>
				)}
				{helperText && <FieldHelper>{helperText}</FieldHelper>}
				<SwarmTextarea
					type="text"
					name={name}
					required={required}
					onChange={this.onChange}
					rows={rows}
					style={{
						minHeight,
						maxHeight,
						resize: disableResize ? 'none' : 'auto',
						...style,
					}}
					id={id}
					value={this.state.value}
					{...other}
				/>
			</div>
		);
	}
}

export default withErrorList(Textarea);
