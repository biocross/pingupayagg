Meteor.publish('customersInStore', function(store){
	return CustomersInStore.find({
		'store': store
	});
});

Meteor.publish('ordersForMe', function(customer){
	return Orders.find({
		'customer': customer,
		sort: {
			'time': -1
		}
	});
});