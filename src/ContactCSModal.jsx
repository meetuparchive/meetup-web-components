import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import MLFace from '../assets/svg/MLFace.svg';

import Modal from './interactive/Modal';

export const CONTACT_CS_MODAL_CLASS = 'meetup-signupModal';
export const CONTACT_CS_MODAL_WRAPPER_CLASS = `${CONTACT_CS_MODAL_CLASS}-wrapper`;

/**
 * @param {Object} props component properties
 * @returns {React.element} ContactCSModal
 */

export const ContactCSModal = ({ onDismiss, modalItems }) => {
	const btnClassName =
		'tw-font-medium tw-text-white tw-text-sm tw-box-border tw-border tw-bg-viridian tw-border-solid tw-p-4 tw-mb-4 tw-rounded-2xl tw-flex tw-flex-row';
	return (
		<Modal fixed onDismiss={onDismiss} className={cx(CONTACT_CS_MODAL_CLASS)}>
			<div className={cx(CONTACT_CS_MODAL_WRAPPER_CLASS)}>
				<img src={MLFace} className="tw-rounded-full tw-mb-4" />
				<h1 className="tw-font-medium tw-mb-2 tw-text-sm">{modalItems.title}</h1>
				<p className="tw-text-sm tw-mb-4">{modalItems.subText}</p>
				<a className={btnClassName} href="" onClick={modalItems.onClick}>
					<div>{modalItems.buttonText}</div>
				</a>
			</div>
		</Modal>
	);
};

ContactCSModal.propTypes = {
	/** Callback that happens when a user dismisses the modal */
	onDismiss: PropTypes.func,
	// Different items to populate the modal
	modalItems: PropTypes.object,
};
export default ContactCSModal;
