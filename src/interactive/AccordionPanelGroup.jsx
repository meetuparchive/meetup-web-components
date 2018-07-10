import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

export const ACCORDIONPANELGROUP_CLASS = 'accordionPanelGroup';

/**
 * @description takes AccordionPanelGroup and AccordionPanel data and returns an array of new panel `isOpen` states
 * @param {Boolean} isMultiselect
 * @param {Array} statesList
 * @param {Object} clickedPanelData
 * @returns {Function} a Promise that maps statesList to an array of each panel's `isOpen` prop value
 */
export const getNewPanelState = (isMultiselect, statesList, clickedPanelData) =>
	statesList.map((panelState, i) => {
		const defaultState = isMultiselect ? panelState : false;

		// not the panel that was clicked
		if (clickedPanelData.panelIndex !== i) {
			return defaultState;
		}

		return clickedPanelData.isOpen;
	});

/**
 * @module AccordionPanelGroup
 */
class AccordionPanelGroup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			panelStatesList: props.accordionPanels.map(
				panel => panel.props.isOpen || false
			),
		};

		this.handlePanelClick = this.handlePanelClick.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { accordionPanels } = nextProps;

		const { panelStatesList } = prevState;

		const cache = { valueChanged: false, updatedPanelIndex: null, newValue: null };

		for (let i = 0; i < accordionPanels.length; i++) {
			const panel = accordionPanels[i];
			const { props: panelProps } = panel;

			if (panelProps.isOpen !== panelStatesList[i]) {
				cache.valueChanged = true;
				cache.updatedPanelIndex = i;
				cache.newValue = panelProps.isOpen;
				break;
			}
		}

		if (cache.valueChanged) {
			const newPanelStatesList = panelStatesList.slice();
			newPanelStatesList[cache.updatedPanelIndex] = cache.newValue;
			return { panelStatesList: newPanelStatesList };
		}

		return prevState;
	}

	/**
	 * @param {Object} e
	 * @param {Object} panelData
	 * @returns undefined
	 */
	handlePanelClick(e, panelData) {
		const { multiSelectable } = this.props;

		this.setState(prevState => {
			const { panelStatesList } = prevState;
			const newPanelState = getNewPanelState(
				multiSelectable,
				panelStatesList,
				panelData
			);

			return { panelStatesList: newPanelState };
		});
	}

	render() {
		const {
			accordionPanels,
			panelContent, // eslint-disable-line no-unused-vars
			indicatorAlign,
			indicatorIcon,
			indicatorIconActive,
			indicatorIconSize, // eslint-disable-line no-unused-vars
			indicatorSwitch,
			multiSelectable,
			className,
			...other
		} = this.props;

		const classNames = cx(ACCORDIONPANELGROUP_CLASS, 'list', className);

		return (
			<ul
				role="tabList"
				aria-multiselectable={multiSelectable}
				className={classNames}
				{...other}
			>
				{accordionPanels.map((panel, i) => (
					<li key={i} className="list-item flush--top">
						{React.cloneElement(
							panel,
							{
								...panel.props,
								panelIndex: i,
								setClickedPanel: this.handlePanelClick,
								isOpen: this.state.panelStatesList[i],
								indicatorAlign,
								indicatorIcon,
								indicatorIconActive,
								indicatorSwitch,
							},
							panel.props.children
						)}
					</li>
				))}
			</ul>
		);
	}
}

AccordionPanelGroup.defaultProps = {
	indicatorAlign: 'right',
	indicatorIcon: 'chevron-down',
	multiSelectable: true,
	indicatorIconSize: 'xs',
};

AccordionPanelGroup.propTypes = {
	accordionPanels: PropTypes.arrayOf(PropTypes.element).isRequired,
	multiSelectable: PropTypes.bool,
	indicatorAlign: PropTypes.string,
	indicatorIcon: PropTypes.string,
	indicatorIconActive: PropTypes.string,
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	indicatorSwitch: PropTypes.bool,
};

export default AccordionPanelGroup;
