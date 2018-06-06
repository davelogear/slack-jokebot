const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
	token: 'xoxb-338817857440-374932790976-5OenUnfGamjMUlnVTZoF80r6',
	name: 'jokebot'
});

// Start Handler
bot.on('start', () => {
	const params = {
		icon_emoji: ':smiley:'
	};
	
	bot.postMessageToChannel(
		'general',
		"JokeBot is here to make you laugh or cringe!",
		params
	);
});
