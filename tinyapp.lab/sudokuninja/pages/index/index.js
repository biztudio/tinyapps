Page({
  data: {
    todos: [],
    editedTodo: {},
    draft: '',
    editDraft: null,
  },
  
  onReady: function() {
    console.log('page ready');
  },
  onUnload: function() {
    this.subscription.unsubscribe();
    this.unbind();
  },
});