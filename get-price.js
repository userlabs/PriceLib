'use strict;'
/**
 * 
 */

const provinceData = require('./config').provinceData;
const discounts = require('./config').discounts;

const getDiscountRate = function () {

	// cache the orderVal keys in reverse order 10000, 7000 etc.
	var orderVals = Object.keys(discounts);
	// convert them to numbers - not doing this caused the matching below to give weird behavior
	for(i=0; i < orderVals.length; i++) {
		orderVals[i] = parseInt(orderVals[i])
	}
	// number matching when sorting
	orderVals.sort(function(a,b) {
		return a - b;
	}).reverse();

	// use a closure to return discount rates
	return function(orderValue) {
		for(i=0; i < orderVals.length; i++) {
			if(orderValue >= orderVals[i]){
				return discounts[orderVals[i]];
			}
		}
		return 0;
	}
}();



const inputValidations = {
	quantity: function ( quantity ) {
		if(!isNaN(quantity)) {
			return quantity;
			quantity = parseInt(quantity)
			if(!isNaN(quantity)) {
				return quantity;
			}
		}
		return false;
	},
	
	price: function ( price ) {
		var p = parseInt(price);
		if(!isNaN(price)) {
			return price;
			price = parseInt(price);
			if(!isNaN(price)) {
				return price;
			}
		}
		return false;
	},
	
	provinceCode: function (provinceCode) {
		if(provinceData[provinceCode] === undefined) {
			return false;
		}
		return true;
	}
	
}

module.exports = function getPrice( quantity, price, provinceCode) {

	var quantityVal = inputValidations.quantity(quantity);
	if(false === quantityVal) {
		throw new Error("Invalid quantity: usage[quantity should be a number]");
	}
	var priceVal = inputValidations.price(price);
	if(false === priceVal) {
		throw new Error("Invalid price: usage[price should be a number]");
	}
	if(!inputValidations.provinceCode(provinceCode)) {
		throw new Error("Invalid provinceCode: usage[provinceCode should be "+Object.keys(provinceData).join()+" ]");
	}
	console.log('input: ', quantityVal+' items,', '$'+priceVal+' per item,', provinceData[provinceCode].name);

	var taxRate = provinceData[provinceCode].taxRate;
	var totalCost = quantityVal * priceVal;
	var discountRate = getDiscountRate(totalCost);
	var totalCostDiscounted = totalCost - ((totalCost*discountRate)/100);
	var totalCostTaxed = totalCostDiscounted + ((totalCostDiscounted*taxRate)/100);
	totalCostTaxed = totalCostTaxed.toFixed(2); // resolved to 2 decimals

	console.log('output:', '$'+totalCostTaxed);
//	console.log('output:', '$'+totalCostTaxed, ', discount',discountRate, '%, tax', taxRate, '%');
	return totalCostTaxed;
	
}