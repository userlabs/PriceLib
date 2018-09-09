'use strict;'

const getPrice = require('../get-price');
const assert = require('assert');

describe( 'Validation tests', function( done) {
	
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


describe( 'Costing tests for ON (Exhaustive includes boundary conditions for discount rates)', function( done) {

	var addTax = 1.13;
	
	it('totalCost q=10,p=0,pr=ON', function(done) {
		assert.equal(getPrice(10, 0, 'ON'),0);
		done();
	});
	it('totalCost q=0,p=20,pr=ON', function(done) {
		assert.equal(getPrice(0, 20, 'ON'),0);
		done();
	});
	it('totalCost q=1,p=20,pr=ON', function(done) {
		assert.equal(getPrice(1, 20, 'ON'),(1*20*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=49,p=20,pr=ON', function(done) {
		assert.equal(getPrice(49, 20, 'ON'),(49*20*(addTax)).toFixed(2));
		done();
	});

	it('totalCost q=50,p=20,pr=ON', function(done) {
		assert.equal(getPrice(50, 20, 'ON'),(50*20*(0.97)*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=50,p=20.02,pr=ON', function(done) {
		assert.equal(getPrice(50, 20.02, 'ON'),(50*20.02*(0.97)*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=250,p=19.99,pr=ON', function(done) {
		assert.equal(getPrice(250, 19.99, 'ON'),(250*19.99*(0.97)*(addTax)).toFixed(2));
		done();
	});

	it('totalCost q=250,p=20,pr=ON', function(done) {
		assert.equal(getPrice(250, 20, 'ON'),(250*20*(0.95)*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=250,p=20.01,pr=ON', function(done) {
		assert.equal(getPrice(250, 20.01, 'ON'),(250*20.01*(0.95)*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=350,p=19.99,pr=ON', function(done) {
		assert.equal(getPrice(350, 19.99, 'ON'),(350*19.99*(0.95)*(addTax)).toFixed(2));
		done();
	});

	it('totalCost q=350,p=20,pr=ON', function(done) {
		assert.equal(getPrice(350, 20, 'ON'),(350*20*(0.93)*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=350,p=20.01,pr=ON', function(done) {
		assert.equal(getPrice(350, 20.01, 'ON'),(350*20.01*(0.93)*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=500,p=19.99,pr=ON', function(done) {
		assert.equal(getPrice(500, 19.99, 'ON'),(500*19.99*(0.93)*(addTax)).toFixed(2));
		done();
	});

	it('totalCost q=500,p=20,pr=ON', function(done) {
		assert.equal(getPrice(500, 20, 'ON'),(500*20*(0.9)*(addTax)).toFixed(2));
		done();
	});
	it('totalCost q=500,p=20.01,pr=ON', function(done) {
		assert.equal(getPrice(500, 20.01, 'ON'),(500*20.01*(0.9)*(addTax)).toFixed(2));
		done();
	});
	
});


describe( 'Costing tests for MI tax rate', function( done) {

	it('totalCost q=3600,p=2.25,pr=MI', function(done) {
		assert.equal(getPrice(3600, 2.25, 'MI'),(3600*2.25*(0.93)*(1.06)).toFixed(2));
		done();
	});
	
});

describe( 'Costing tests for AB tax rate', function( done) {

	it('totalCost q=3600,p=2.25,pr=AB', function(done) {
		assert.equal(getPrice(3600, 2.25, 'AB'),(3600*2.25*(0.93)*(1.05)).toFixed(2));
		done();
	});
	
});

describe( 'Costing tests for QC tax rate', function( done) {

	it('totalCost q=3600,p=2.25,pr=QC', function(done) {
		assert.equal(getPrice(3600, 2.25, 'QC'),(3600*2.25*(0.93)*(1.14975)).toFixed(2));
		done();
	});
	
});

describe( 'Costing tests for DE tax rate', function( done) {

	it('totalCost q=3600,p=2.25,pr=DE', function(done) {
		assert.equal(getPrice(3600, 2.25, 'DE'),(3600*2.25*(0.93)*(1)).toFixed(2));
		done();
	});
	
});
