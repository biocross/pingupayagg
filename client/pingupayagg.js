Tracker.autorun(function(){
	var x  = Meteor.subscribe("customersInStore");

	if(x.ready()){
		console.info('Subscription ready: customersInStore');
	}

	var y = Meteor.subscribe("allOrders");

	if(y.ready()){
		console.info('Subscription ready: allOrders');
	}
});

if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
