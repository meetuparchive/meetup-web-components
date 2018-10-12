// @flow
import * as React from 'react';
import Textarea from './Textarea';

type State = {
	value: string,
};

type Props = {
	onChange?: (e: SyntheticInputEvent<*>) => null,
	value?: string,
};

/**
 * Should override value with info from state
 * @return {Object} the new state for the component
 */
export const overrideValue = (nextProps: Props): State => ({
	value: nextProps.value || '',
});

/**
 * Deprecated - use <Textarea /> directly, supply `value` from parent
 * @module UncontrolledTextarea
 * @deprecated
 */
class UncontrolledTextarea extends React.Component<Props, State> {
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

	render() {
		return (
			<Textarea {...this.props} value={this.state.value} onChange={this.onChange} />
		);
	}
}

UncontrolledTextarea.displayName = 'Textarea';

export default UncontrolledTextarea;
