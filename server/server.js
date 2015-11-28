Meteor.methods({
	'currentCustomersInStore': function(store, customers) {
			
		var previous = CustomersInStore.find({'store': store}).fetch();
		var customersWhoHaveLeft = _.difference(previous, _.intersection(previous, customers));
		var customersWhoHaveEntered = _difference(customers, _.intersection(previous, customers));

		customersWhoHaveLeft.forEach(function(customer){
			CustomersInStore.remove({
				'customer': customer
			});
		});

		customersWhoHaveEntered.forEach(function(element){
			CustomersInStore.insert({
				'store': store,
				'customer': element
			});
		});
	},

	'raiseInvoice': function(customer, invoice){
		Orders.insert({
			'customer': customer,
			'invoice': invoice,
			'time': Date.now()
		});
	}
});