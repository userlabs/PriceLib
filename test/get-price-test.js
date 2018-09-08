'use strict;'

const getPrice = require('../get-price');
const assert = require('assert');

describe( 'Test suite', function( done) {
	
	it('quantity and price values as numbers', function(done) {
		getPrice(10, 20, 'ON');
		done();
	});
	
	it('quantity and price values as strings', function(done) {
		getPrice('10', '20', 'ON');
		done();
	});

	it('quantity value is invalid', function(done) {
		assert.throws(function() {
			getPrice('i', 20, 'ON');
		}, Error('Invalid quantity: usage[quantity should be a number]'));
		done();
	});
	
	it('price value is invalid', function(done) {
		assert.throws(function() {
			getPrice(10, 'i', 'ON');
		}, Error('Invalid price: usage[price should be a number]'));
		done();
	});

	it('province code is invalid', function(done) {
		assert.throws(function() {
			getPrice(10, 20, 'FL');
		}, Error);
		done();
	});
	
});
