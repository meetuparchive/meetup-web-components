import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

/* meetup web components */
import Modal from './interactive/Modal';
import Chunk from './layout/Chunk';
import Flex from './layout/Flex';
import FlexItem from './layout/FlexItem';
import Icon from './media/Icon';

import googleLogo from '../assets/svg/logo_google.svg';

import { C_MEDIUMGRAY } from 'swarm-constants/dist/js/colorConstants';

/* consts */
export const SIGNUP_MODAL_CLASS = 'meetup-signupModal';
export const SIGNUP_MODAL_OR_CLASS = `${SIGNUP_MODAL_CLASS}-or`;
export const SIGNUP_MODAL_WRAPPER_CLASS = `${SIGNUP_MODAL_CLASS}-wrapper`;
export const SIGNUP_MODAL_FACEBOOK_CLASS = `${SIGNUP_MODAL_CLASS}-facebook`;
export const SIGNUP_MODAL_GOOGLE_CLASS = `${SIGNUP_MODAL_CLASS}-google`;
export const SIGNUP_MODAL_EMAIL_CLASS = `${SIGNUP_MODAL_CLASS}-email`;

/**
 * @param {Object} props component properties
 * @returns {React.element} SignupModal
 */
export const SignupModal = ({ onDismiss, signupOptions }) => {
	const { google, facebook, email, login, title, orLabel } = signupOptions;
	return (
		<Modal className={SIGNUP_MODAL_CLASS} onDismiss={onDismiss} fixed>
			<div className={SIGNUP_MODAL_WRAPPER_CLASS}>
				<Chunk>
					<h1 className="text--big">{title}</h1>
				</Chunk>
				<Chunk>
					<div className="text--secondary display--inlineBlock marginHalf--right">
						{login.text}
					</div>
					<a href={login.link} className="link display--inlineBlock">
						{login.label}
					</a>
				</Chunk>
				<Chunk className="margin--top">
					<a
						href={facebook.link}
						className={cx(
							SIGNUP_MODAL_FACEBOOK_CLASS,
							'button button--fullWidth button--hasHoverShadow paddingHalf--left text--bold text--white'
						)}
					>
						<Flex>
							<FlexItem shrink className="inverted">
								<Icon
									shape="external-facebook"
									size="xs"
									className="align--left"
								/>
							</FlexItem>
							<FlexItem>{facebook.label}</FlexItem>
						</Flex>
					</a>
				</Chunk>
				<Chunk>
					<a
						href={google.link}
						className={cx(
							SIGNUP_MODAL_GOOGLE_CLASS,
							'button button--bordered button--fullWidth paddingHalf--left text--bold'
						)}
					>
						<Flex>
							<FlexItem shrink>
								<img src={googleLogo} className="align--left" />
							</FlexItem>
							<FlexItem>{google.label}</FlexItem>
						</Flex>
					</a>
				</Chunk>
				<div
					className={cx(
						SIGNUP_MODAL_OR_CLASS,
						'margin--bottom align--center text--labelSecondary text--normal'
					)}
				>
					{orLabel}
				</div>
				<Chunk>
					<a
						href={email.link}
						className={cx(
							SIGNUP_MODAL_EMAIL_CLASS,
							'button button--bordered button--fullWidth paddingHalf--left text--bold'
						)}
					>
						<Flex>
							<FlexItem shrink>
								<Icon
									shape="mail"
									size="xs"
									className="align--left"
									color={C_MEDIUMGRAY}
								/>
							</FlexItem>
							<FlexItem>{email.label}</FlexItem>
						</Flex>
					</a>
				</Chunk>
			</div>
		</Modal>
	);
};

SignupModal.propTypes = {
	onDismiss: PropTypes.func,
	signupOptions: PropTypes.object,
};

export default SignupModal;
