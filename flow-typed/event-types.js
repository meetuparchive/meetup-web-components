// event list query params from eventlistselectors
// https://github.com/meetup/mup-web/blob/master/src/app/group/event/list/eventsListSelectors.js#L61
declare type EventsListParams = {
	status: GroupEventStatus,
	desc: boolean,
	fields: string,
	page: number,
	scroll: number,
};

declare type EventHost = {
	id: number,
	name: string,
	intro: string,
	photo: Photo,
	role: string,
};

declare type ErrorTypes = {
	EVENT: string,
	ANNOUNCE: string,
	CANCEL: string,
	DELETE: string,
	HOSTS: string,
	OPEN_RSVP: string,
	CLOSE_RSVP: string,
};

declare type EventStatuses = {
	isHappeningNow: boolean,
	isUpcoming: boolean,
	isProposed: boolean,
	isDraft: boolean,
	isPast: boolean,
	isCanceled: boolean,
	isScheduled: boolean,
	isFull: boolean,
	isClosedForRsvp: boolean,
	isBeforeRsvpOpenTime: boolean,
	isAfterRsvpCloseTime: boolean,
	isAnnounced: boolean,
	isPaid: boolean,
	isSeries: boolean,
};

declare type EventActions = {|
	canUploadPhotos: boolean,
	canComment: boolean,
	canCopy: boolean,
	canEdit: boolean,
	canEditHosts: boolean,
	canMarkAsPaid: boolean,
	canRsvp: boolean,
	canCancel: boolean,
	canDelete: boolean,
	canDeleteCanceled: boolean,
	canClose: boolean,
	canOpen: boolean,
	canInvite: boolean,
	canEmailAttendees: boolean,
	canDownloadAttendees: boolean,
	canTakeAttendance: boolean,
	canAnnounce: boolean,
|};

declare type EventSelfType = {
	...Self,
	...EventActions,
	canViewFeedbackSummary: boolean,
};
declare type EventSelf = {
	self?: EventSelfType,
};

declare type EventMemberRoles = {
	isGroupMember: boolean,
	isPrimaryOrganizer: boolean,
	isOrganizer: boolean,
	isLeadershipTeam: boolean,
	isAccessForbidden: boolean,
	isEventHost: boolean,
};

// #TODO: this is temporary until we :skull: old getEvent in favor
// of new makeGetEvent
declare type GetEventType = {
	created: number,
	duration: number,
	id: string,
	name: string,
	rsvp_limit: number,
	status: GroupEventStatus,
	time: number,
	local_time: string,
	local_date: string,
	rsvp_open_offset: string,
	event_hosts: Array<GroupEventHost>,
	featured_photo: Photo,
	comment_count: number,
	updated: number,
	utc_offset: number,
	waitlist_count?: number,
	yes_rsvp_count: number,
	venue?: Venue,
	how_to_find_us?: string,
	fee?: Fee,
	fee_options?: FeeOptions,
	group: {
		id: number,
		urlname: string,
		name: string,
		status: string,
		who: string,
		members: number,
		join_mode: string,
		localized_location: string,
		group_photo: Photo,
	},
	link: string,
	description: string,
	plain_text_no_images_description: string,
	visibility?: string,
	series?: EventSeries,
	attendance_count?: number,
	attendance_sample: Array<MemberProfile>,
	rsvp_open_offset?: string, // ISO 8601 Duration (e.g. 'P4DT12H30M5S')
	rsvp_close_offset?: string,
	rsvp_sample: Array<RsvpMemberSample>,
	rsvp_rules: RsvpRules,
	rsvpable: boolean,
	rsvpable_after_join?: boolean,
	self?: EventSelfType,
	survey_questions?: Array<RsvpSurveyQuestion>,
	web_actions?: EventWebLinks,
	venue_visibility: string,
	pro_is_email_shared?: boolean,
	...$Exact<EventStatuses>,
	...$Exact<EventMemberRoles>,
	plain_text_description?: string,
};
// #TODO: this is temporary until we :skull: old getEvent in favor
// of new makeGetEvent
declare type GetEventError = {
	error?: {
		type: string,
		message: Object,
	},
};
// #TODO: temporary until we can remove GetEventType
declare type GetEventActions = {
	isAnnounced: boolean,
	isCanceled: boolean,
	isDeleted: boolean,
	event_hosts: Array<GroupEventHost>,
};

declare type RsvpInfo = {
	attendeeSample: Array<RsvpMemberSample>,
	attendeesTotal: number,
	waitlistTotal: number,
};

declare type RsvpRequirements = {
	eventId: number,
	...RsvpRules,
	response: string,
	guests: number,
	surveyQuestion?: RsvpSurveyQuestion,
	fee?: Fee,
};

declare type RsvpErrorMessages = {
	code: string,
	message: string,
};

declare type EventInfo = GroupEvent & EventSelf & EventStatuses & EventMemberRoles;

// event feedback types
declare type FeedbackInfo = {
	hasCompleted: boolean,
	completionDate: number,
};
declare type FeedbackQuestion = {
	questionId: string,
	answerId: string,
};
declare type FeedbackSummary = {
	eventId: number,
	summary: Array<FeedbackQuestion>,
};
declare type EmptyFeedbackSummary = {
	isEmpty: boolean,
};
