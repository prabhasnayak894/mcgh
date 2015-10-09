/* ========================================================================
 * CuntentFomatEnum: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to hold applicable content type
 * ======================================================================== */

var ContentFormatEnum = function(options){ 
	this.ALPHANUMERIC=new Formatter(options);
	this.NUMBER=new NumberFormatter(options);
	this.CURRENCY=new CurrencyFormatter(options);
	this.PERCENTAGE=new PercentageFormatter(options);
	this.DATE=new DateFormatter(options);
	this.TIME=new TimeFormatter(options);
};

