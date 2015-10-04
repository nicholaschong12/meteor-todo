Todos = new Meteor.Collection("todos");
Lists = new Meteor.Collection("lists");
if(Meteor.isClient){
	Template.todos.helpers({
		"todo":function(){
			return Todos.find({} , {sort:{dateCreated: -1}});
		}
	});
	
	Template.addTodo.events({
		"submit form": function(e){
			e.preventDefault();
			var todoName = $("[name=todoName]");
			if(!!todoName.val()){
				Todos.insert({
					name: todoName.val(),
					completed: false,
					dateCreated: new Date()
				});
				todoName.val("");
			}
		}
	});
	
	Template.todoItem.events({
		"click .delete-todo":function(e){
			e.preventDefault();
			if(confirm("Delete ? ")){
			var documentId = this._id;
			
			Todos.remove({_id: documentId});
			}
		},
		
		"keyup [name=todoItem]":function(e){
			if(event.which == 13 || event.which == 27)
			{$(event.target).blur();}
			else{
			var documentId = this._id;
			var todoItem = $(event.target).val();
			Todos.update({_id: documentId}, {$set:{name: todoItem}});
			//console.log("updated to "+todoItem);
			}
		},
		
		"change [type=checkbox]":function(e){
			var documentId = this._id;
			var isCompleted = this.completed;
			if(isCompleted)
			{
				Todos.update({_id:documentId},{
					$set:{completed:false}
				});
				console.log("Task marked as incomplete.");
			}
			else
			{
				Todos.update({ _id: documentId }, {$set: { completed: true }});
				console.log("Task marked as complete.");
			}
		}
	});
	Template.todoItem.helpers({
		'checked':function(){
			var isCompleted = this.completed;
			if(isCompleted){
				return "checked";
			}
			else{
				return "";
			}
		}
	});
	Template.todosCount.helpers({
		totalTodos:function(){
			return Todos.find().count();
		},
		completedTodos:function(){
			return Todos.find({completed: true}).count();
		}
	});
	
	Template.addList.events({
		"submit form":function(e){
			e.preventDefault();
			
			
			var listName = $("[name=listName]");
			if(!!listName.val()){
				Lists.insert({
					name: listName.val()
				});
				listName.val("");
			}
		}
	});
	
	Template.lists.helpers({
		"list":function(){
			return Lists.find({},{sort:{name:1}});
		}
	})
}
if(Meteor.isServer){
	
}


Router.route('/register',{
	name: "register"
});
Router.route('/login');
Router.route("/",{
	name: "home",
	template: "home"
});
Router.configure({
	layoutTemplate:"main"
})
Router.route("/list/:_id",{
	template: "listPage",
	data: function(){
		var currentList = this.params._id;
		return(Lists.findOne({_id:currentList}));
	}
});