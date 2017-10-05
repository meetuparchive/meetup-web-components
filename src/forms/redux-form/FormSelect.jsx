import React from 'react';
import FormSelect from '../FormSelect';

/**
 * This component wraps the standard FormSelect component for use with redux-form.
 * It deconstructs props that redux-form sets and re-sets them on FormSelect.
 * @param {object} props React component props
 * @return {React.Component} FormSelect
 */
const ReduxFormSelect = props => {
	const { meta, validateAfterTouched, ...other } = props;

	const error = (!validateAfterTouched || meta.touched) ? meta.error : null;

	return <FormSelect error={error} {...other} />;
};

ReduxFormSelect.displayName = 'ReduxFormSelect';

export default ReduxFormSelect;

