/* ========================================================================
 * Formatter: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to hold regular expression , symbol for respective data type
 * ======================================================================== */

var Formatter = function(options){ 
	this.type='alphanumeric';
	this.symbol=null;
	this.orientation='all';
	this.showSymbol=true;
	this.symbolAllignment="L";
	$.extend(this, options);
	this.regExp=/[\s\S]*/;
				
};

/**
 * Number Formatter
 */
var NumberFormatter = function(options){ 
	this.decimalPlaces=2;
	this.showThousandSeparator=true;
	$.extend(NumberFormatter.proptotype, new Formatter(options));
	$.extend(this, options);
	if(this.decimalPlaces==0){
		this.decimalPlaces=0;	
	}
	this.regExp =new RegExp('^-?\\d*\.?\\d{0,'+ this.decimalPlaces + '}$');
	//this.regExp= /^-?\d*\.?\d{1,2}$/;
	this.orientation='multi';
	this.type='number';
};
NumberFormatter.prototype={
		updateFormatter:function(){
			var re = new RegExp("^[.]?[0-9]+[.]?[0-9]*$");
			this.regExp = re;
		}	
	};
/**
 * PercentageFormatter
 */
var PercentageFormatter = function(options){ 
	
	this.decimalPlaces=2;
	this.showThousandSeparator=false;
	
	$.extend(PercentageFormatter.prototype, new Formatter(options));
	this.symbol='%';
	$.extend(this, options);
	if(this.decimalPlaces==0){
		this.decimalPlaces=0;	
	}
	this.regExp =new RegExp('^-?\\d*\.?\\d{0,'+ this.decimalPlaces + '}$');// ^-?\d*\.?\d{1,6}$
	this.orientation='multi';
	this.symbolAllignment="R";
	this.type='percentage';
};
PercentageFormatter.prototype={
		updateFormatter:function(){
			var re = new RegExp("^[.]?[0-9]+[.]?[0-9]*$");
			this.regExp = re;
		}	
	};
/**
 * CurrencyFormatter
 */
var CurrencyFormatter = function(options){ 
	this.currencyType='dollar';
	this.decimalPlaces=0;
	this.symbol='$';
	$.extend(CurrencyFormatter.prototype, new Formatter(options));
	$.extend(this, options);
	this.regExp=/^(\d*\.\d{1,2}|\d+)$/;
	this.orientation='multi';
	this.type='currency';
};

/**
 * DateFormatter
 */
var DateFormatter = function(options){ 
	this.dateFormat='monthDayYear';
	$.extend(DateFormatter.prototype, new Formatter(options));
	this.yearFomat=4;
	$.extend(this, options);
	this.regExp=/^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{4})$/;
	this.orientation='multi';
	this.type='date';
	
};
DateFormatter.prototype={
	updateFormatter:function(){
		if (this.dateFormat=='monthDayYear') {
			if (this.yearFomat == 2) {
				this.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{2})$/;
			} else {
				this.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{4})$/;
			}
		}else{
			if (this.yearFomat == 2) {
				this.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{2})$/;
			} else {
				this.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{4})$/;
			}
			
		}
	}	
};
/**
 * TimeFormatter
 */
var TimeFormatter = function(options){ 
	$.extend(TimeFormatter.prototype, new Formatter(options));
	$.extend(this, options);
	this.regExp=/^((0\d)|(1\d)|(2[0-3]))\:(([0-5]\d))\:(([0-5]\d))$/;
	this.orientation='multi';
	this.type='time';
	
};