var Comments = new Meteor.Collection('comments');

if ( Meteor.is_server ) {
    Meteor.publish('comments', function(){
        return Comments.find();
    });

    Meteor.methods({
        'insertComment': function(string) {
            Comments.insert({text:string});
        }
    });
}

if ( Meteor.is_client ) {

    Meteor.subscribe('comments', function(error) {
        if ( error )
            console.log('error');
        else
            console.log('success');
    });

    Template.commentList.commentCount = function() {
        return Comments.find().count();
    }

    Template.commentList.hasComment = function() {
        return Comments.find().count() > 0;
    }

    Template.commentList.comment = function(){
        return Comments.find().fetch();
    }

    Template.addComment.events = {
        'click #submit': function(e) {
            e.preventDefault();

            var form = $(e.delegateTarget);
            var text = form.find('textarea').val();

            Meteor.call('insertComment', text, function(error, result){
                if ( error ) {
                    console.log(error);
                } else {
                    console.log(result);
                }
            });
        }
    }
}

