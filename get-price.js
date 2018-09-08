'use strict;'
/**
 * 
 */

const provinceData = {
	AB: { name: "Alberta", rate: 5 },
	ON: { name: "Ontario", rate: 13 },
	QC: { name: "Quebec", rate: 14.975 },
	MI: { name: "Michigan", rate: 6 },
	DE: { name: "Detroit", rate: 0 }
}

const orderValue = {
	"1000": 3,
	"5000": 5,
	"7000": 7,
	"10000": 10
}

const inputValidations = {
	quantity: function ( quantity ) {
		console.log('quantity', quantity);
		if(!isNaN(quantity) || !isNaN(parseInt(quantity))) {
			return true;
		}
		return false;
	},
	
	price: function ( price ) {
		var p = parseInt(price);
		if(!isNaN(p) || !isNaN(parseInt(price))) {
			return true;
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
	
	if(!inputValidations.quantity(quantity)) {
		throw new Error("Invalid quantity: usage[quantity should be a number]");
	}
	if(!inputValidations.price(price)) {
		throw new Error("Invalid price: usage[price should be a number]");
	}
	if(!inputValidations.provinceCode(provinceCode)) {
		throw new Error("Invalid provinceCode: usage[provinceCode should be "+Object.keys(provinceData).join()+" ]");
	}
	console.log('input:', quantity+' items', ',$'+price+'per item', provinceData[provinceCode].name);
	
}