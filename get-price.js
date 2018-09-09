'use strict;'
/**
 * 
 */

const provinceData = {
	AB: { name: "Alberta", taxRate: 5.0 },
	ON: { name: "Ontario", taxRate: 13.0 },
	QC: { name: "Quebec", taxRate: 14.975 },
	MI: { name: "Michigan", taxRate: 6.0 }, //todo: USD exchange rate?
	DE: { name: "Detroit", taxRate: 0.0 } // todo: USD exchange rate?
}

const discounts = {
	1000: 3.0,
	5000: 5.0,
	7000: 7.0,
	10000: 10.0
}

const getDiscountRate = function () {

	// cache the qty keys in reverse order 10000, 7000 etc.
	var qtys = Object.keys(discounts);
	// convert them to numbers - not doing this caused the matching below to give weird behavior
	for(i=0; i < qtys.length; i++) {
		qtys[i] = parseInt(qtys[i])
	}
	// number matching when sorting
	qtys.sort(function(a,b) {
		return a - b;
	}).reverse();

	// use a closure to return discount rates
	return function(quantity) {
		for(i=0; i < qtys.length; i++) {
			if(quantity >= qtys[i]){
				return discounts[qtys[i]];
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

	var discountRate = getDiscountRate(quantityVal.toString());
	var taxRate = provinceData[provinceCode].taxRate;
	var totalCost = quantityVal * priceVal;
	var totalCostDiscounted = totalCost - ((totalCost*discountRate)/100);
	var totalCostTaxed = totalCostDiscounted + ((totalCostDiscounted*taxRate)/100);
	totalCostTaxed = totalCostTaxed.toFixed(2); // resolved to 2 decimals

	console.log('output:', '$'+totalCostTaxed);
	return totalCostTaxed;
	
}