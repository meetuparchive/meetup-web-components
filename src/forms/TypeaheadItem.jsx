import PropTypes from 'prop-types';

/**
 * @module TypeaheadItem
 */
const TypeaheadItem = ({value, className, children}) => children;

export default TypeaheadItem;

TypeaheadItem.propTypes = {
	value: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
};
