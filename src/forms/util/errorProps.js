/**
 * @function getErrorId
 * returns an id with which we can set ARIA
 * relationships between errors and form fields
 *
 * @param {string} id - the id of the form field
 * @returns {string} id for error list
 */
const getErrorId = (id) => id && `${id}-error`;

/**
 * @function getFieldErrorProps
 * returns an object of ARIA attributes to assign
 * to a form field with an error
 *
 * @param {string} id - the id of the form field
 * @param {boolean} hasError - pass `true` if field has an error
 * @returns {object} props object to apply to field
 */
export const getFieldErrorProps = (id, hasError) => {
	const ariaProps = {
		'aria-invalid': !!hasError,
	};

	if (id) {
		ariaProps['aria-describedby'] = getErrorId(id);
	}

	return ariaProps;
};

/**
 * @function getErrorListProps
 * returns props to pass for an ErrorList related
 * to a form field
 *
 * @param {string} id - the id of the form field
 * @param {string|array} errors - single or multiple error messages
 * @returns {object} props object to apply to ErrorList
 */
export const getErrorListProps = (id, errors) => {
	const props = { errors };

	if (id) {
		props['errorId'] = getErrorId(id);
	}

	return props;
};
