import React from 'react';
import cx from 'classnames';

import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Icon from './Icon';

export const PANEL_CLASS = 'accordionPanel';
export const ACTIVEPANEL_CLASS = 'accordionPanel--active';

/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isOpen: this.props.isOpen
		};

		this._handleToggle = this._handleToggle.bind(this);
	}

	/**
	 * @parm {Boolean} isOpen (is panel open)
	 * @returns {Number} panel height
	 */
	getHeight(isOpen) {
		return `${isOpen * this.contentEl.getBoundingClientRect().height}px`;
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	_handleToggle(){
		const newState = !this.state.isOpen;
		const { setClickedPanel } = this.props;

		if (setClickedPanel) {
			setClickedPanel(this);
		}

		this.setState({
			height: this.getHeight(newState),
			isOpen: newState
		});

	}

	/**
	 * @returns {undefined}
	 *
	 * Sets height of `AccordionPanel` to be appear open or closed when mounting
	 */
	componentDidMount() {
		this.setState({
			height: this.getHeight(this.state.isOpen)
		});
	}

	/**
	 * @returns {undefined}
	 *
	 * Updates state to toggle `AccordionPanel` open and closed
	 */
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.isOpen !== this.state.isOpen) {
			this.setState({
				isOpen: nextProps.isOpen,
				height: this.getHeight(nextProps.isOpen)
			});
		}
	}

	/**
	 * @returns {String} icon shape
	 */
	getIconShape() {
		const {
			iconShape,
			iconShapeActive
		} = this.props;

		return this.state.isOpen && iconShapeActive ?
			iconShapeActive :
			iconShape;
	}

	render() {
		const {
			panelContent,
			label,
			isOpen, // eslint-disable-line no-unused-vars
			setClickedPanel, // eslint-disable-line no-unused-vars
			iconAlign, // eslint-disable-line no-unused-vars
			iconShape, // eslint-disable-line no-unused-vars
			iconSize,  // eslint-disable-line no-unused-vars
			iconShapeActive, // eslint-disable-line no-unused-vars
			classNamesActive,
			className,
			...other
		} = this.props;

		const classNames = {
			accordionPanel: cx(
				PANEL_CLASS,
				{
					[ACTIVEPANEL_CLASS]: this.state.isOpen,
					[classNamesActive]: this.state.isOpen && classNamesActive
				},
				className
			),
			trigger: cx(
				className,
				'accordionPanel-label display--block span--100'
			),
			content: cx(
				'accordionPanel-animator',
				{
					'accordionPanel-animator--collapse': !this.state.isOpen
				}
			)
		};

		// create valid attribute name from trigger label
		const ariaId = label.replace(/\s+/g, '').toLowerCase();

		return(
			<Flex
				className={classNames.accordionPanel}
				rowReverse={iconAlign === 'left' && 'all'}
				{...other}
			>

				<FlexItem>
					<Chunk>
						<button
							role='tab'
							id={`label-${ariaId}`}
							aria-controls={`panel-${ariaId}`}
							aria-expanded={this.state.isOpen}
							aria-selected={this.state.isOpen}
							className={classNames.trigger}
							onClick={this._handleToggle}
						>
							{label}
						</button>
					</Chunk>

					<Chunk
						role='tabpanel'
						aria-labelledby={`label-${ariaId}`}
						aria-hidden={!this.state.isOpen}
						className={classNames.content}
						style={{height: this.state.height}}
					>
						<div
							className='accordionPanel-content'
							ref={(div) => { this.contentEl = div; }}
						>
							{panelContent}
						</div>
					</Chunk>
				</FlexItem>

				<FlexItem
					className='accordionPanel-icon'
					onClick={this._handleToggle}
					shrink
				>
					<Icon shape={this.getIconShape()} size={iconSize} />
				</FlexItem>

			</Flex>
		);
	}
}

AccordionPanel.defaultProps = {
	isOpen: false,
	iconAlign: 'right',
	iconShape: 'chevron-down',
	iconSize: 'xs'
};

AccordionPanel.propTypes = {
	classNamesActive: React.PropTypes.string,
	isOpen: React.PropTypes.bool,
	panelContent: React.PropTypes.element,
	onClick: React.PropTypes.func,
	label: React.PropTypes.string.isRequired,
	className: React.PropTypes.string,
	iconAlign: React.PropTypes.string,
	iconShape: React.PropTypes.string,
	iconShapeActive: React.PropTypes.string,
	iconSize: React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl'])
};

export default AccordionPanel;
