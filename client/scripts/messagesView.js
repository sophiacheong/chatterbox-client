var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    MessagesView.$chats.on('click', '.username', MessagesView.handleClick);
  },

  render: function() {
    MessagesView.$chats.html('');
    Messages.items().each(message => MessagesView.renderMessage(message));
  },

  renderMessage: function(message) {
    var $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  },

  handleClick: function(e) {
    var username = $(e.target).data('username');
    if (username === undefined) {
      return;
    }
  }

};