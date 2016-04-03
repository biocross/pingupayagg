Meteor.methods({
	'updateCustomersInStore': function(store, customers) {
			
		console.log("store:" + store);
		console.log("customers: " + customers);

		CustomersInStore.remove({
			'store': store
		});


		customers.forEach(function(element){
			CustomersInStore.insert({
				'store': store,
				'customer': element
			});
		});
	},

	'raiseInvoice': function(customer, amount){
		console.log("entering " + customer + " with amount " + amount);
		Orders.insert({
			'customer': customer,
			'amount': amount,
			'time': Date.now(),
			'approved': false
		});
		console.log('order inserted');
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