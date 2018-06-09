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
		"type `chuck` or `yomama` or `random` to see a joke",
		params
	);
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', data => {
	if(data.type != 'message')  {
		return;
	}

	handleMessage(data.text);
});

// Respond to Data
function handleMessage(message) {
	console.log("handleMessage message", message);
	if(message.match(/^chuck/)) {
		chuckJoke();
	} else if(message.match(/^yomama/)) {
		yoMommaJoke();
	} else if(message.match(/^random/)) {
		randomJoke();
	}
}

// Tell a Chuck Norris joke
function chuckJoke() {
	axios.get('http://api.icndb.com/jokes/random')
		.then(res => {
			const joke = res.data.value.joke;

			const params = {
				icon_emoji: ':laughing:'
			};
			
			bot.postMessageToChannel(
				'general',
				`Chuck Norris: ${joke}`,
				params
			);
		});
}

// Tell a Yo Mama Joke
function yoMommaJoke() {
	axios.get('http://api.yomomma.info/')
		.then(res => {
			console.log("res", res);
			const joke = res.data.joke;

			const params = {
				icon_emoji: ':laughing:'
			};
			
			bot.postMessageToChannel(
				'general',
				`Yo Momma: ${joke}`,
				params
			);
		});
}

// Tell a Random Joke
function randomJoke() {
	const rand = Math.floor(Math.random() * 2) + 1;

	if(rand == 1) {
		chuckJoke();
	} else {
		yoMommaJoke();
	}
}
