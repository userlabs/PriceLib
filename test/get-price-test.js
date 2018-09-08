'use strict;'

var getPrice = require('../get-price');

describe( 'Test suite', function( done) {
	
	it('getPrice', function(done) {
		getPrice(10, 20, 'ON');
		done();
	});
});
