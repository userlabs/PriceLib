'use strict;'
/**
 * 
 */

const provinceTax = {
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

module.exports = function getPrice( quantity, price, province) {
	console.log('input:', quantity+' items', ',$'+price+'per item', province);
}