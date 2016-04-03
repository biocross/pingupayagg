Meteor.publish('customersInStore', function(store){
	return CustomersInStore.find({
		//'store': store
	});
});

Meteor.publish('ordersForMe', function(customer){
	console.log("received sub request from: " +  customer);
	return Orders.find({

	},
		//'customer': customer,
	{
				sort: {
				'time': -1
			}
	});
});

Meteor.publish('allOrders', function(){
	return Orders.find({}, {
		sort: {
			'time': -1
		}
	});
});