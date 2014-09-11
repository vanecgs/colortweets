$(function() {
	var Tweet = Backbone.Model.extend({
		defaults: function() {
			return {
				text: 'empty tweet'
			};
	    }
	});

	var TweetList = Backbone.Collection.extend({
		model : Tweet,
		localStorage: new Backbone.LocalStorage('tweets-backbone'),
	});

	var Tweets = new TweetList;

	var TweetView = Backbone.View.extend({
		tagName:  'div',
		template: _.template($('#item-template').html()),
		events: {},
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
	    },
	    render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
	});

	var AppView = Backbone.View.extend({
		el: $("#colortweets"),
		events: {},
		initialize: function() {
			this.listenTo(Tweets, 'add', this.addOne);

			Tweets.create({text: 'test'});
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
});