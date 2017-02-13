import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import Chunk from './Chunk';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Icon from './Icon';

/**
 * @module AccordionPanel
 */
class AccordionPanel extends React.Component {
	/**
	 * Document this for PR
	 */
	constructor(props){
		super(props);
		this.state = {
			open: this.props.isOpen
		};

		this._handleToggle = this._handleToggle.bind(this);
		this._updateHeight = this._updateHeight.bind(this);
	}

	/**
	 * Document this for PR
	 */
	_handleToggle(event){
		this.setState({
			open: !this.state.open
		});
	}

	_updateHeight() {
		const content = ReactDOM.findDOMNode(this.content);
		const animator = ReactDOM.findDOMNode(this.animator);
		const height = this.props.isOpen ? content.clientHeight : 0;
		const cssHeight = `${height}px`;

		if (animator.style.height === cssHeight) {
			return;
		}

		animator.style.height = cssHeight;
	}

	componentDidMount() {
		this._updateHeight();
	}

	componentDidUpdate() {
		this._updateHeight();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen !== this.state.open) {
			this.setState({ open: nextProps.isOpen });
		}
	}

	render() {
		const {
			isOpen, // eslint-disable-line no-unused-vars
			name,
			onTriggerClick,
			panelContent,
			triggerIconShape,
			triggerIconShapeActive,
			triggerIconSize,
			triggerIconAlign,
			triggerLabel,
			animated,
			classNamesActive,
			className,
			...other
		} = this.props;

		const classNames = {
			accordionPanel: cx(
				'accordionPanel',
				{
					'accordionPanel--active': this.state.open,
					[classNamesActive]: this.state.open && classNamesActive
				},
				className
			),
			content: cx(
				{
					'accordionPanel-animator': animated,
					'accordionPanel-animator--collapse': !this.state.open,
					'visibility--a11yHide': !animated && !this.state.open
				}
			)
		};

		console.log(onTriggerClick);

		return(
			<Flex
				className={classNames.accordionPanel}
				rowReverse={triggerIconAlign == 'left' ? 'atAll' : null}
				{...other}>

				<FlexItem>
					<Chunk>
						<button
							role='tab'
							id={`label-${name}`}
							aria-controls={`panel-${name}`}
							aria-expanded={this.state.open}
							aria-selected={this.state.open}
							className='accordionPanel-label display--block span--100'
							onClick={onTriggerClick}>
								{triggerLabel}
						</button>
					</Chunk>

					<Chunk
						role='tabpanel'
						aria-labelledby={`label-${name}`}
						aria-hidden={!this.state.open}
						className={classNames.content}
						ref={(el) => { this.animator = el; }}>
						<div
							className='accordionPanel-content'
							ref={(div) => { this.content = div; }}>
							{panelContent}
						</div>
					</Chunk>
				</FlexItem>

				{triggerIconShape &&
					<FlexItem
						className='accordionPanel-icon'
						onClick={onTriggerClick}
						shrink>
							{this.state.open && triggerIconShapeActive ?
								<Icon
									shape={triggerIconShapeActive}
									size={triggerIconSize} /> :
								<Icon
									shape={triggerIconShape}
									size={triggerIconSize} />
								}
					</FlexItem>
				}

			</Flex>
		);
	}
}

AccordionPanel.defaultProps = {
	triggerIconAlign: 'right',
	triggerIconShape: 'chevron-down',
	triggerIconSize: 'xs',
	isOpen: false
};

AccordionPanel.propTypes = {
	isOpen: React.PropTypes.bool,
	triggerIconAlign: React.PropTypes.string,
	triggerIconShape: React.PropTypes.string,
	triggerIconSize: React.React.PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
};

export default AccordionPanel;
