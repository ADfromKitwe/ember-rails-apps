var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000'
});

App.Router.map(function() {
  this.route('index', { path: '/'});
  this.resource('about');
  this.resource('services');
  this.resource('reviews');
  this.resource('projects', function() {
    this.resource('project', { path: ':project_id'});
    this.resource('new');
  });
  this.route('projects.completed', {path: '/complete'});
});

/* bit of testing, don't know how models/arrays work */
App.Project = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  customer: DS.attr('string'),
  isComplete: DS.attr('boolean')
});

App.Review = DS.Model.extend({
  review: DS.attr('string'),
  reviewer: DS.attr('string')
});

App.ReviewsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('review');
  }
}); 

App.ProjectsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('project');
  }
});

App.ProjectsController = Ember.ArrayController.extend({
  seeCompleted: false,
  seeInProgress: false,
  
  numTotal: function() {
    return this.get('length');
  }.property('@each'),
  
  completedProjects: function() {
    return this.filterProperty('isComplete', true);
  }.property('@each.isComplete'),
  
  numCompleted: function() {
    return this.filterBy('isComplete', true).get('length');
  }.property('@each.isComplete'),
  
  inProgressProjects: function() {
    return this.filterProperty('isComplete', false);
  }.property('@each.isComplete'),
  
  numInProgress: function() {
    return this.filterBy('isComplete', false).get('length');
  }.property('@each.isComplete'),
  
  actions: {
    viewAll: function() {
      this.set('seeAll', true);
      this.set('seeCompleted', false);
      this.set('seeInProgress', false);
      this.transitionToRoute('projects');
    },
    viewCompleted: function() {
      this.set('seeCompleted', true); 
      this.set('seeInProgress', false);
      this.set('seeAll', false);
      this.transitionToRoute('projects');
    },
    viewInProgress: function() {
      this.set('seeInProgress', true);
      this.set('seeCompleted', false);
      this.set('seeAll', false);
      this.transitionToRoute('projects');
  
    }
  }
});

App.NewController = Ember.ObjectController.extend({
  actions: {
    createProject: function() {
        var newProject = this.store.createRecord('project', {
          title: this.get('title'),
          price: this.get('price'),
          description: this.get('description'),
          customer: this.get('customer'),
          isComplete: false
        });
                
        newProject.save();
        this.transitionToRoute('project', newProject);
    }
  }
});

App.ProjectRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('project', params.project_id);
  }
});

App.ProjectController = Ember.ObjectController.extend({
  isEditing: false,
  
  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    doneEditing: function() {
      this.set('isEditing', false);
      this.get('model').save();
    },
    removeProject: function() {
      var project = this.get('model');
      project.deleteRecord();
      project.save();
      this.transitionToRoute('projects.index');
    }
  },
    
  choices: [
    {choiceLabel: "Complete", choiceValue: true },
    {choiceLabel: "In Progress", choiceValue: false}
  ]
  
});
