import PropTypes from 'prop-types';

/**
 * @module TypeaheadItem
 */
const TypeaheadItem = ({value, className, children}) => children;

export default TypeaheadItem;

TypeaheadItem.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.object
	]).isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
};
