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

	'raiseInvoice': function(customer, amount){
		Orders.insert({
			'customer': customer,
			'amount': amount,
			'time': Date.now(),
			'approved': false
		});
	},

	'paymentComplete': function(customer, amount){
		Orders.update({
			'customer': customer,
			'amount': amount
		},
		{
			$set: {
				'approved': true
			}
		});
	},

	'registerCustomer': function(customerName, customerProfilePicURL, beaconID){
		var alreadyExists = Customers.findOne({
			'beaconID': beaconID
		});

		if(alreadyExists){
			Customers.update({
				'beaconID': beaconID
			},
			{
				$set: {
					'name': customerName,
					'picURL': customerProfilePicURL
				}
			})
		}
		else {
			Customers.insert({
				'name': merchant,
				'picURL': customerProfilePicURL,
				'beaconID': beaconID
			});
		}
	},

	'registerMerchant': function(merchant, beaconID){
		
		var alreadyExists = Merchants.findOne({
			'beaconID': beaconID
		});

		if(alreadyExists){
			Merchants.update({
				'beaconID': beaconID
			},
			{
				$set: {
					'name': merchant
				}
			})
		}
		else {
			Merchants.insert({
				'name': merchant,
				'beaconID': beaconID
			});
		}
	}
});