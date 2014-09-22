$(function() {
	var Tweet = Backbone.Model.extend({
		defaults: function() {
			return {
				text: 'empty tweet',
				coloredText: {}
			};
	    },
	    generateColoredText: function() {
	    	var that = this,
	    		tweetText = _.map(this.get('text').toLowerCase().split(''), function(letter, key) {
	    		var hex = that.textColorMap[letter] ? that.textColorMap[letter] : '#000';

	    		return hex;
	    	});

	    	this.set('coloredText', tweetText);

	    },
	    textColorMap: {
	    	'@' : '#F1FF19', //Primary
	    	'e' : '#FF0C00',
	    	'a' : '#1476CC',
	    	'o' : '#6000B2', //Complementary from primary
	    	's' : '#00B243',
	    	'r' : '#7F4E00',
	    	'n' : '#47FF0C', // Analogus from primary and complementary
	    	'i' : '#FFD20C',
	    	'd' : '#FF5F0D',
	    	'l' : '#FF0DD8',
	    	't' : '#0A0CD9',
	    	'c' : '#0AD9CC',
	    	'm' : '#BF0AA3',
	    	'u' : '#0A0BBF',
	    	'p' : '#0ABFB4',
	    	'b' : '#34BF0A',
	    	'g' : '#8C7307',
	    	'v' : '#8C3407',
	    	'y' : '#5F994C', //Compound from primary and complementary
	    	'q' : '#8559FF',
	    	'ó' : '#995C3D',
	    	'í' : '#40FF51',
	    	'h' : '#333366',
	    	'f' : '#D28B49',
	    	'z' : '#4C1E45',
	    	'á' : '#BCB02F',
	    	'j' : '#1E4C49',
	    	'é' : '#BC2F5E',
	    	'ñ' : '#E5CC5C',
	    	'x' : '#23768C',
	    	'ú' : '#2A4C1E', // Complementary from compound
	    	'w' : '#994C8E',
	    	'ü' : '#502CB2',
	    	'k' : '#FFF159',
	    	' ' : '#3D9993'
	    }
	});

	var TweetList = Backbone.Collection.extend({
		model : Tweet,
		url: 'api/tweets.php'
	});

	var Tweets = new TweetList;

	var TweetView = Backbone.View.extend({
		tagName:  'div',
		attributes: {
			'class' : 'tweet'
		},
		template: _.template($('#item-template').html()),
		events: {},
		initialize: function() {
			this.model.generateColoredText();
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
	    },
	    render: function() {
			this.$el.html(this.createColoredText());  	
			return this;
		},
		createColoredText: function() {
			var tweetText = this.model.get('text').split(''),
				tweetColors = this.model.get('coloredText'),
				tweetHtml = $('<div/>'),
				numberOfLetters = tweetText.length;


			tweetText.forEach(function(element, index) {
				var container = $('<div class="letter"/>').css({'width': 100 / numberOfLetters + '%'});

				container.html(element).css('background-color', tweetColors[index]);
				tweetHtml.append(container);
			});


			return tweetHtml.html();
		}
	});

	var AppView = Backbone.View.extend({
		el: $("#colortweets"),
		events: {},
		initialize: function() {
			this.listenTo(Tweets, 'add', this.addOne);

			Tweets.fetch();
		},
		render: function() {
		},
		addOne: function(tweet) {
			var view = new TweetView({model: tweet});
			this.$("#tweet-list").append(view.render().el);
	    },
		addAll: function() {
	    	Tweets.each(this.addOne, this);
	    },
	});

	var App = new AppView;

	setInterval(function() {
	  	Tweets.fetch();
	}, 30000);

});