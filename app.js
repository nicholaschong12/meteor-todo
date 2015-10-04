Todos = new Meteor.Collection("todos");
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
	})
}
if(Meteor.isServer){
	
}

