Meteor.publish('customersInStore', function(store){
	return CustomersInStore.find({
		'store': store
	});
});