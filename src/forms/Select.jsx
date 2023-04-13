// @flow
import * as React from 'react';

import { FieldHelper, FieldLabel } from '@meetup/swarm-components';

import Icon from '../media/Icon';
import withErrorList from '../utils/components/withErrorList';
import a11yPassThrough from '../utils/a11yPassThrough';
import DeprecationWarning from '../utils/components/DeprecationWarning';

type Props = React.ElementConfig<HTMLSelectElement> & {
	/** Optional `id` attribute for the input, and associates it with the `<label />` */
	id?: string,

	/** The `name` attribute for the input, and associates it with the `<label />` */
	name: string, // required - will be used as 'id' as well if `id` attribute is not provied

	/** Required - this component is stateless. A callback that happens when the input changes */
	onChange: (e: SyntheticInputEvent<*>) => void,

	/** Supplied by withErrorList */
	error?: React.Node,

	/** An additional piece of helpful info rendered with the field */
	helperText?: string,

	/** What we render into the input's `<label />` */
	label?: string,

	/** What to render in order to indicate the field is required. Supply a string for a custom error message */
	required?: boolean | string,

	/** Disabled input status */
	disabled?: boolean | string,

	/** DEPRECATED */
	labelClassName?: string,
};

/*
 * MWC custom <select> component
 */
export class SelectInput extends React.PureComponent<Props> {
	componentDidCatch(error: any, info: any) {
		console.log(`${error}: \n ${info.componentStack}`);
	}

	render() {
		const {
			labelClassName,
			id,
			label,
			name,
			error,
			helperText, // eslint-disable-line no-unused-vars
			required,
			disabled,
			...other
		} = this.props;

		const requiredProps = required
			? { required: typeof required === 'string' ? required : '*' }
			: {};

		const fieldId = id || name;
		const selectState = disabled ? 'disabled' : error ? 'error' : 'default';

		return (
			<React.Fragment>
				{label && (
					<FieldLabel
						htmlFor={fieldId}
						className={a11yPassThrough(labelClassName)}
					>
						{label}
					</FieldLabel>
				)}
				{helperText && <FieldHelper>{helperText}</FieldHelper>}
				<div data-swarm-select={selectState}>
					<div data-swarm-select-wrapper>
						<select
							name={name}
							id={id || name}
							disabled={disabled}
							{...requiredProps}
							{...other}
						/>
						<span data-swarm-select-arrow="arrow-down">
							<Icon shape="chevron-down" ariaLabel="Open select" />
						</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const SelectWithErrors = withErrorList(DeprecationWarning(SelectInput));
SelectWithErrors.displayName = 'Select';

export default SelectWithErrors;
