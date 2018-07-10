// common module with most / all api requests which identifies allowable actions
declare type Self = {|
	id: string,
	name?: string,
	email?: string,
	status?: string,
	joined?: number,
	city?: string,
	country?: string,
	localized_country_name?: string,
	state?: string,
	lat?: number,
	lon?: number,
	actions: Array<string>,
	role?: string,
	rsvp?: {
		response: string,
		guests: number,
		answers: Array<RsvpSurveyAnswers>,
	},
	common?: {
		groups: Array<string>,
	},
	canLike?: boolean,
	canUnlike?: boolean,
|};

// https://www.meetup.com/meetup_api/docs/:urlname/ [category]
declare type Category = {
	id: number,
	name: string,
	shortname: string,
	sort_name: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/ [contributions]
declare type Contributions = {
	enabled: boolean,
	potential: boolean,
	reason: string,
	thanks: string,
};

declare type SocialService = {
	identifier: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/ [other_services]
declare type GroupSocialServices = {
	facebook?: SocialService,
	twitter?: SocialService,
	tumbler?: SocialService,
	other?: SocialService,
};

// https://www.meetup.com/meetup_api/docs/:urlname/photo_albums/
declare type PhotoAlbum = {
	id: number,
	created: number,
	updated: number,
	utc_offset: number,
	link: string,
	album_photo: {
		id: number,
		base_url: string,
		highres_link: string,
		photo_link: string,
		thumb_link: string,
		type: string,
	},
	event?: {
		id: number,
		name: string,
		no_rsvp_count: number,
		time: number,
		utc_offset: number,
		waitlist_count: number,
		yes_rsvp_count: number,
	},
	photo_sample: Array<Photo>,
};

declare type Topic = {
	id: number,
	name: string,
	urlkey: string,
	lang: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/ [self.profile]
declare type SelfGroupProfile = {
	id: number,
	created: number,
	updated: number,
	joined: number,
	name: string,
	bio?: string,
	status: string,
	localized_country_name: string,
	city: string,
	state?: string,
	country: string,
	lat: number,
	lon: number,
	group_profile: GroupProfileMeta,
	photo?: Photo,
	topics: Array<Topic>,
};

// https://www.meetup.com/meetup_api/docs/:urlname/discussions/:conversation_id/ [group_profile]
declare type GroupProfileMeta = {
	id: number,
	created: number,
	updated: number,
	utc_offset: number,
	answer: Array<string>,
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
	intro: string,
	link: string,
	status: string,
	title: string,
	role: string,
	visited: number,
};

// https://www.meetup.com/meetup_api/docs/:urlname/members/
declare type MemberProfile = {
	id: number,
	name: string,
	created: number,
	joined: number,
	bio: string,
	birthday?: string,
	lat: number,
	lon: number,
	state?: string,
	city: string,
	country: string,
	email?: string,
	gender?: string,
	group_profile?: GroupProfileMeta,
	localized_country_name: string,
	messaging_pref: string,
	other_services: GroupSocialServices,
	photo: Photo,
	privacy?: string,
	self?: Self,
	status: string,
	event_context: {
		host: boolean,
	},
	title?: string,
	role?: string,
	web_actions?: {
		group_profile_link: string,
	},
};

// https://www.meetup.com/meetup_api/docs/:urlname/discussions/:conversation_id/
declare type Discussion = {
	id: string,
	created: number,
	updated: number,
	utc_offset: number,
	description: string,
	creator: MemberProfile,
	num_comments: number,
	num_followers: number,
	like_count: number,
	self?: Self,
	report_link: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/events/:event_id/photos/:photoId
declare type Photo = {
	id: number,
	base_url: string,
	caption: string,
	comment_count?: string,
	created: number,
	updated: number,
	utc_offset: number,
	link: string,
	member: MemberProfile,
	photo_album: PhotoAlbum,
	self?: Self,
	highres_link: string,
	photo_link: string,
	thumb_link: string,
	short_link?: string,
	type: string,
	base_url: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/events/:id/ [venue]
declare type Venue = {
	id: number,
	name: string,
	lat: number,
	lon: number,
	repinned?: boolean,
	address_1: string,
	address_2?: string,
	address_3?: string,
	city: string,
	country: string,
	localized_country_name: string,
	location_map_url: string,
	location_map_img_url: string,
	zip: string,
	state: string,
	visibility: 'private' | 'public',
};

// https://www.meetup.com/meetup_api/docs/:urlname/events/:id/ [fee]
declare type PaymentType = 'cash' | 'paypal' | 'wepay' | 'none';
declare type Fee = {
	accepts: PaymentType,
	amount: number,
	currency: string,
	description: string,
	label: string,
	required: boolean,
	paypal?: {
		email: string,
	},
};
declare type SupportedCurrency = string; // currency code, lowercase
declare type SupportedCurrencyLabel = string; // currency code, uppercase, for display
declare type CurrencyObject = {
	code: SupportedCurrency,
	default: boolean,
};
// https://www.meetup.com/meetup_api/docs/:urlname/events/:id/ [fee_options]
declare type FeeOption = {
	currencies: Array<CurrencyObject>,
	is_setup: boolean,
	setup_link?: string,
	type: PaymentType,
};
declare type FeeOptions = Array<FeeOption>;

declare type EventSeries = {
	description: string,
	start_date: number, // ms since epoch
	end_date: number, // ms since epoch
	id: number,
	monthly?: {
		day_of_week: number, // [1-7]
		interval: number,
		week_of_month: number, // [1-5]
	},
	weekly?: {
		days_of_week: string, // CSV [1-7] (Monday-Sunday)
		interval: number,
	},
	template_event_id: string,
};

declare type RefundPolicy = {
	days: number,
	notes: string,
	policies: Array<string>,
};

declare type RsvpSurveyQuestion = {
	id: number,
	question: string,
};
declare type RsvpSurveyAnswers = {
	answer: string,
	question: string,
	question_id: string,
	updated: number,
};

// https://www.meetup.com/meetup_api/docs/:urlname/events/:eventId [rsvp_rules]
declare type RsvpRules = {
	close_time: number,
	closed: boolean,
	guest_limit: number,
	open_time: number,
	refund_policy?: RefundPolicy,
	waitlisting: string,
};

declare type EventWebLinks = {
	calendar_export_google: string,
	calendar_export_ical: string,
	calendar_export_outlook: string,
	calendar_export_yahoo: string,
	invite: string,
	copy: string,
	edit: string,
	email_attendees: string,
	attendee_list: string,
	attendance_taker: string,
	ticket_payment?: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/events/:eventId [rsvp_sample]
declare type RsvpMemberSample = {
	member: {
		id: number,
		name: string,
		photo: Photo,
		role?: string,
		self?: Self,
		event_context: {
			host: boolean,
		},
	},
};

declare type GroupEventHost = MemberProfile & {
	host_count: number,
	join_date: number,
};

declare type GroupEventStatus = 'upcoming' | 'past' | 'proposed' | 'draft' | 'cancelled';
// https://www.meetup.com/meetup_api/docs/:urlname/events/:eventId
declare type GroupEvent = {
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
	comment_count: number,
	event_hosts: Array<GroupEventHost>,
	featured_photo: Photo,
	updated: number,
	utc_offset: number,
	waitlist_count?: number,
	yes_rsvp_count: number,
	venue?: Venue,
	venue_visibility: string,
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
	rsvp_sample: Array<RsvpMemberSample>,
	rsvp_open_offset?: string, // ISO 8601 Duration (e.g. 'P4DT12H30M5S')
	rsvp_close_offset?: string,
	rsvp_rules: RsvpRules,
	rsvpable: boolean,
	rsvpable_after_join?: boolean,
	survey_questions?: Array<RsvpSurveyQuestion>,
	pro_is_email_shared?: boolean,
	self?: Object,
	web_actions?: EventWebLinks,
	plain_text_description?: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/events/:event_id/rsvps/
declare type RsvpResponse = {
	created: number,
	updated: number,
	response: string,
	guests: number,
	event: GroupEvent,
	group: Group,
	member: MemberProfile,
	venue: Venue,
};

// https://www.meetup.com/meetup_api/docs/:urlname/ [photo_gradient]
declare type PhotoGradient = {
	id: number,
	composite_color: string,
	dark_color: string,
	light_color: string,
};

declare type ProNetwork = {
	name: string,
	urlname: string,
	number_of_groups: number,
	network_url: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/
declare type Group = {
	id: number,
	approved: boolean,
	city: string,
	city_link?: string,
	created: number,
	category?: Category,
	contributions?: Contributions,
	country: string,
	description: string,
	discussion_count?: number,
	discussion_sample?: Array<Discussion>,
	event_sample?: Array<GetEventType>,
	highlight: string,
	join_mode?: string,
	lat: number,
	localized_country_name: string,
	lon: number,
	leads: number,
	members: number,
	name: string,
	other_services: GroupSocialServices,
	organizer: MemberProfile,
	plain_text_description: string,
	plain_text_no_images_description: string,
	photo_gradient?: PhotoGradient,
	pro_network?: ProNetwork,
	past_event_count?: number,
	self?: Self,
	state?: string,
	status: string,
	timezone: string,
	topics?: ?Array<Topic>,
	visibility?: string,
	urlname: string,
	who: string,
	timezone: string,
	duotoneUrl: Object,
	key_photo: Object,
	group_photo: Object,
	link: string,
	localized_location: string,
};

declare type GlobalSelf = {
	city: string,
	country: string,
	email: string,
	id: string | number,
	joined: number,
	lang: string,
	lat: number,
	localized_country_name: string,
	lon: number,
	name: string,
	photo: Photo,
	state: string,
	status: string,
	urlkey: string,
};

declare type Sponsor = {
	logo: string,
	name: string,
	offering: string,
	url?: string,
};

// https://www.meetup.com/meetup_api/docs/:urlname/events/:event_id/comments/
declare type CommentSelf = {
	actions: Array<string>,
	canDelete: boolean,
	canLike: boolean,
	canReport: boolean,
	liked: boolean,
	notifications: 'on' | 'off',
};

declare type Comment = {
	id: number,
	self: CommentSelf,
	comment: string,
	member: MemberProfile,
	web_actions: {
		report_abuse: string,
	},
	report_link: string,
	created: number,
	like_count: number,
	replies?: Array<Reply>,
};

declare type Reply = {
	in_reply_to: number,
	id: number,
	self: CommentSelf,
	like_count: number,
	created: number,
	comment: string,
	member: MemberProfile,
	report_link: string,
	web_actions: {
		report_abuse: string,
	},
};

declare type DiscussionGroupPreferencesType = {
	preferences: {
		any_member_can_post: boolean,
	},
	self: {
		permissions: Array<string>,
	},
};

declare type Flags = {
	[string]: boolean,
};
