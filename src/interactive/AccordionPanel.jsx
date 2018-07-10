import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Chunk from '../layout/Chunk';
import Flex from '../layout/Flex';
import FlexItem from '../layout/FlexItem';
import Icon from '../media/Icon';
import ToggleSwitch from '../forms/ToggleSwitch';

export const PANEL_CLASS = 'accordionPanel';
export const ACTIVEPANEL_CLASS = 'accordionPanel--active';
export const ACCORDION_LABEL_CLASS = 'accordionPanel-label';

/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	constructor(props) {
		super(props);
		this._handleToggle = this._handleToggle.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onToggleClick = this.onToggleClick.bind(this);
		this.onTransitionEnd = this.onTransitionEnd.bind(this);

		this.state = {
			height: props.isOpen ? 'auto' : '0px',
		};
	}

	/**
	 * @parm {Boolean} isOpen
	 * @parm {Ref} contentEl - element ref
	 * @returns {Object} inline styles
	 */
	getPanelStyle(isOpen, contentEl) {
		const style = { height: '0px' };

		// set height to 0
		if (!isOpen || !contentEl) {
			return style;
		}

		// set height to {n}px
		style.height = `${contentEl.getBoundingClientRect().height}px`;
		return style;
	}

	/**
	 *
	 * @description calls the AccordionPanelGroups's callback to toggle open state
	 * and render the `AccordionPanel` open or closed, sets height in state
	 * @param {Event} e - the event object
	 * @returns {undefined}
	 */
	_handleToggle(e) {
		e.preventDefault();

		const { isOpen, setClickedPanel, onClickCallback, panelIndex } = this.props;

		setClickedPanel &&
			setClickedPanel(e, {
				panelIndex: panelIndex,
				isOpen: !isOpen,
			});
		this.getPanelStyle(!isOpen, this.contentEl);
		onClickCallback && onClickCallback(e, !isOpen);
	}

	onToggleClick(e) {
		e.preventDefault();

		this.props.onToggleClick ? this.props.onToggleClick(e) : this._handleToggle(e);
	}

	/**
	 * @description allows the AccordionPanel content to be toggled with the "Enter" and "space" keys
	 * @returns {undefined}
	 */
	onKeyUp(e) {
		const isActivatingButton = [' ', 'Enter'].some(key => e.key === key);

		if (isActivatingButton) {
			this._handleToggle(e);
		}
	}

	/**
	 * @description forceUpdate allows us to calculate height again now that contentEl is set
	 * @returns {undefined}
	 */
	componentDidMount() {
		this.forceUpdate();
	}

	/**
	 * @description set height state when the panel receives a change
	 * @returns {undefined}
	 */
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.isOpen);
		if (nextProps.isOpen !== this.props.isOpen) {
			this.setState(
				() => this.getPanelStyle(!nextProps.isOpen, this.contentEl),
				() => {
					setTimeout(() => {
						this.setState(() =>
							this.getPanelStyle(nextProps.isOpen, this.contentEl)
						);
					}, 1);
				}
			);
		}
	}

	/**
	 * @returns {String} icon shape
	 */
	getIconShape() {
		const { indicatorIcon, indicatorIconActive } = this.props;

		return this.props.isOpen && indicatorIconActive
			? indicatorIconActive
			: indicatorIcon;
	}

	/**
	 * @returns undefined
	 */
	onTransitionEnd() {
		if (this.props.isOpen) {
			this.setState(() => ({
				height: 'auto',
			}));
		}
	}

	render() {
		const {
			panelContent,
			panelIndex,
			label,
			isOpen,
			setClickedPanel, // eslint-disable-line no-unused-vars
			onClickCallback, // eslint-disable-line no-unused-vars
			indicatorAlign, // eslint-disable-line no-unused-vars
			indicatorIcon, // eslint-disable-line no-unused-vars
			indicatorIconActive, // eslint-disable-line no-unused-vars
			indicatorIconSize,
			indicatorSwitch,
			classNamesActive,
			className,
			onToggleClick, // eslint-disable-line no-unused-vars
			...other
		} = this.props;

		const classNames = {
			accordionPanel: cx(
				'padding--bottom padding--top',
				PANEL_CLASS,
				{
					[ACTIVEPANEL_CLASS]: isOpen,
					[classNamesActive]: isOpen && classNamesActive,
				},
				className
			),
			trigger: cx(className, ACCORDION_LABEL_CLASS, 'display--block span--100'),
			content: cx('accordionPanel-animator', {
				'accordionPanel-animator--collapse': !isOpen,
			}),
			icon: cx('indicator', {
				'indicator--animateActive':
					this.getIconShape() == 'chevron-down' && isOpen,
			}),
		};

		const isLabelString = label && typeof label == 'string';
		const panelId = isLabelString
			? label.replace(/\s+/g, '').toLowerCase()
			: panelIndex;

		return (
			<div>
				<div
					role="tab"
					aria-controls={`panel-${panelId}`}
					aria-expanded={isOpen}
					aria-selected={isOpen}
					className={classNames.trigger}
					tabIndex={0}
					onKeyUp={this.onKeyUp}
					onClick={this.onToggleClick}
				>
					<Flex
						className={classNames.accordionPanel}
						rowReverse={indicatorAlign === 'left' && 'all'}
						tabIndex={-1}
						{...other}
					>
						<FlexItem id={`label-${panelId}`}>{label}</FlexItem>

						<FlexItem
							className="accordionPanel-icon"
							onClick={this.onToggleClick}
							shrink
						>
							{!indicatorSwitch && indicatorIcon ? (
								<Icon
									shape={this.getIconShape()}
									size={indicatorIconSize}
									className={classNames.icon}
								/>
							) : (
								<ToggleSwitch
									tabIndex="-1"
									isActive={isOpen}
									disabled={!!onToggleClick}
									id={`switch-${panelId}`}
									labelledBy={`label-${panelId}`}
									name={panelId}
									onClick={this.onToggleClick}
								/>
							)}
						</FlexItem>
					</Flex>
				</div>

				<Chunk
					role="tabpanel"
					id={`panel-${panelId}`}
					aria-labelledby={`label-${panelId}`}
					aria-hidden={!isOpen}
					className={classNames.content}
					style={{ height: this.state.height }}
					onTransitionEnd={this.onTransitionEnd}
				>
					<div
						className={'accordionPanel-content'}
						ref={div => {
							this.contentEl = div;
						}}
					>
						{panelContent}
					</div>
				</Chunk>
			</div>
		);
	}
}

AccordionPanel.defaultProps = {
	isOpen: false,
	indicatorAlign: 'right',
	indicatorIcon: 'chevron-down',
	indicatorIconSize: 'xs',
};

AccordionPanel.propTypes = {
	panelIndex: PropTypes.number,
	classNamesActive: PropTypes.string,
	isOpen: PropTypes.bool,
	panelContent: PropTypes.element,
	setClickedPanel: PropTypes.func,
	onClickCallback: PropTypes.func,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	className: PropTypes.string,
	indicatorAlign: PropTypes.string,
	indicatorIcon: PropTypes.string,
	indicatorIconActive: PropTypes.string,
	indicatorIconSize: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
	indicatorSwitch: PropTypes.bool,
};

export default AccordionPanel;
