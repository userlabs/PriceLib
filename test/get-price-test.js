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

	it('totalCost q=10,p=0,pr=ON', function(done) {
		assert.equal(getPrice(10, 0, 'ON'),0);
		done();
	});
	it('totalCost q=0,p=20,pr=ON', function(done) {
		assert.equal(getPrice(0, 20, 'ON'),0);
		done();
	});
	it('totalCost q=1,p=20,pr=ON', function(done) {
		assert.equal(getPrice(1, 20, 'ON'),(1*20*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=999,p=20,pr=ON', function(done) {
		assert.equal(getPrice(999, 20, 'ON'),(999*20*(1.13)).toFixed(2));
		done();
	});

	it('totalCost q=1000,p=20,pr=ON', function(done) {
		assert.equal(getPrice(1000, 20, 'ON'),(1000*20*(0.97)*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=1001,p=20,pr=ON', function(done) {
		assert.equal(getPrice(1001, 20, 'ON'),(1001*20*(0.97)*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=4999,p=20,pr=ON', function(done) {
		assert.equal(getPrice(4999, 20, 'ON'),(4999*20*(0.97)*(1.13)).toFixed(2));
		done();
	});

	it('totalCost q=5000,p=20,pr=ON', function(done) {
		assert.equal(getPrice(5000, 20, 'ON'),(5000*20*(0.95)*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=5001,p=20,pr=ON', function(done) {
		assert.equal(getPrice(5001, 20, 'ON'),(5001*20*(0.95)*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=6999,p=20,pr=ON', function(done) {
		assert.equal(getPrice(6999, 20, 'ON'),(6999*20*(0.95)*(1.13)).toFixed(2));
		done();
	});

	it('totalCost q=7000,p=20,pr=ON', function(done) {
		assert.equal(getPrice(7000, 20, 'ON'),(7000*20*(0.93)*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=7001,p=20,pr=ON', function(done) {
		assert.equal(getPrice(7001, 20, 'ON'),(7001*20*(0.93)*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=9999,p=20,pr=ON', function(done) {
		assert.equal(getPrice(9999, 20, 'ON'),(9999*20*(0.93)*(1.13)).toFixed(2));
		done();
	});

	it('totalCost q=10000,p=20,pr=ON', function(done) {
		assert.equal(getPrice(10000, 20, 'ON'),(10000*20*(0.9)*(1.13)).toFixed(2));
		done();
	});
	it('totalCost q=10001,p=20,pr=ON', function(done) {
		assert.equal(getPrice(10001, 20, 'ON'),(10001*20*(0.9)*(1.13)).toFixed(2));
		done();
	});
	
});
