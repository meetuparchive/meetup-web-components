export const getSocialLinks = locale => {
	const socialLinks = {
		twitter: 'https://twitter.com/Meetup/',
		facebook: 'https://www.facebook.com/meetup/',
		youtube: 'https://www.youtube.com/meetup',
		googlePlus: 'https://plus.google.com/+Meetup',
		instagram: 'https://www.instagram.com/meetup/',
		medium: 'https://medium.com/meetup',
	};

	switch (locale) {
		case 'fr-FR':
			socialLinks.facebook = 'https://www.facebook.com/MeetupFR/';
			socialLinks.twitter = 'https://twitter.com/MeetupFR/';
			break;
		case 'de-DE':
			socialLinks.facebook = 'https://www.facebook.com/meetupDE/';
			socialLinks.twitter = 'https://twitter.com/MeetupDE/';
			break;
		case 'ja-JP':
			socialLinks.facebook = 'https://www.facebook.com/meetupjp/';
			socialLinks.twitter = 'https://twitter.com/MeetupJP/';
			break;
		case 'es':
			socialLinks.twitter = 'https://twitter.com/MeetupES/';
			break;
		case 'es-ES':
			socialLinks.twitter = 'https://twitter.com/MeetupES/';
			break;
		case 'it-IT':
			socialLinks.twitter = 'https://twitter.com/MeetupIT/';
			break;
		case 'pt-BR':
			socialLinks.twitter = 'https://twitter.com/MeetupBR/';
			break;
		default:
			break;
	}
	return socialLinks;
};
