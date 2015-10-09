/* ========================================================================
 * Message: Object Declaration
 * @author: Irfan Tamboli
 * ========================================================================
 * Purpose of this object to have all messages  
 * to show for form-tool are at one place
 * ======================================================================== */

var Messages = function(options){
	this.checkAllThatApplyHeading = "Check Box Component";
	this.checkAllThatApplyMsg = "This componet is check all that apply.";
	this.requiredQuetionHeader = "Required/Optional";
	this.requiredQuetionMsg = "This is required/optional question in student view to progress.";
	this.charLimitHeader="character Limit ";
	this.charLimitMsg="character Limit";
	this.insertHyperlinkHeader="Insert Hyperlink";
	this.insertHyperlinkMsg="Insert Hyperlink";
	this.entryTypeHeader="Entry Type ";
	this.entryTypeMsg="This is student/Author as entry type"; 
	
	this.multipleChoiceCompHeading="Multiple Choice Component";
	this.multipleChoiceCompMsg="This is Multiple Choice Component";
	this.answerTypeHeader="Answer Type";
	this.answerTypeMsg="This is Accept Any Answer/Point Based Response as answer type";
	
	this.scaleCompHeading="Scale Component";
	this.scaleCompMsg="This is Scale Component";
	
	this.inputFieldCompHeading="Input and Labels Component";
	this.inputFieldCompMsg="This is Input and Labels Component";
	
	this.partHeading="Parts";
	this.partMessage="Parts Info";
	this.compTypeHeading="Component Type";
	this.compTypeMessage="Drag component type to canvas to create specific component";
	this.sizeHeading="Size";
	this.sizeMessage="Display current height and width of canvas";
};
Messages.prototype = {
	/**
	 * gets checkAllThatApply info message body content.
	 * @returns {String} checkAllThatApplyMsg
	 */	
	getCheckAllThatApplyMsg : function(){
		return this.checkAllThatApplyMsg;
	},
	/**
	 * gets checkAllThatApply info message heading.
	 * @returns {String} checkAllThatApplyHeading
	 */
	getCheckAllThatApplyHeading : function(){
		return this.checkAllThatApplyHeading;
	},
	/**
	 * gets required question info message heading.
	 * @returns {String} requiredQuetionHeader
	 */
	getrequiredQuetionHeader : function(){
		return this.requiredQuetionHeader;
	},
	/**
	 * gets required question info message body content.
	 * @returns {String} requiredQuetionMsg
	 */
	getrequiredQuetionMsg : function(){
		return this.requiredQuetionMsg;
	},
	/**
	 * gets character limit info message heading.
	 * @returns {String} charLimitHeader
	 */
	getcharLimitHeader : function(){
		return this.charLimitHeader;
	},
	/**
	 * gets character limit info message  body content.
	 * @returns {String} charLimitMsg
	 */
	getcharLimitMsg : function(){
		return this.charLimitMsg;
	},
	/**
	 * gets insert hyper link info message  heading.
	 * @returns {String} insertHyperlinkHeader
	 */
	getinsertHyperlinkHeader : function(){
		return this.insertHyperlinkHeader;
	},
	/**
	 * gets insert hyper link info message body content.
	 * @returns {String} insertHyperlinkMsg
	 */
	getinsertHyperlinkMsg : function(){
		return this.insertHyperlinkMsg;
	},
	/**
	 * get entry type info message heading.
	 * @returns {String} entryTypeHeader
	 */
	getentryTypeHeader : function(){
		return this.entryTypeHeader;
	},
	/**
	 * get entry type info message body content.
	 * @returns {String} entryTypeMsg
	 */
	getentryTypeMsg : function(){
		return this.entryTypeMsg;
	},
	/**
	 * get answer type heading
	 * @returns {String}
	 */
	getanswerTypeHeader : function(){
		return this.answerTypeHeader;
	},
	/**
	 * get answer type message
	 * @returns {String}
	 */
	getanswerTypeMsg : function(){
		return this.answerTypeMsg;
	},
	/**
	 * get multiple choice component heading
	 * @returns {String}
	 */
	getmultipleChoiceCompHeading : function(){
		return this.multipleChoiceCompHeading;
	},
	/**
	 * get multiple choice component message
	 * @returns {String}
	 */
	getmultipleChoiceCompMsg : function(){
		return this.multipleChoiceCompMsg;
	},
	/**
	 * get Scale component heading
	 * @returns {String}
	 */
	getScaleCompHeading : function(){
		return this.scaleCompHeading;
	},
	/**
	 * get scale component messgae
	 * @returns {String}
	 */
	getScaleCompMsg : function(){
		return this.scaleCompMsg;
	},
	/**
	 * get input Field component heading
	 * @returns {String}
	 */
	getInputFieldCompHeading : function(){
		return this.inputFieldCompHeading;
	},
	/**
	 * get input Field messgae
	 * @returns {String}
	 */
	getInputFieldCompMsg : function(){
		return this.inputFieldCompMsg;
	},
	/**
	 * get part heading
	 * @returns {String}
	 */
	getPartHeading : function(){
		return this.partHeading;
	},
	/**
	 * get part messgae
	 * @returns {String}
	 */
	getPartMsg : function(){
		return this.partMessage;
	},
	/**
	 * get size heading
	 * @returns {String}
	 */
	getSizeHeading : function(){
		return this.sizeHeading;
	},
	/**
	 * get size messgae
	 * @returns {String}
	 */
	getSizeMsg : function(){
		return this.sizeMessage;
	},
	/**
	 * get comp type heading
	 * @returns {String}
	 */
	getCompTypeHeading : function(){
		return this.compTypeHeading;
	},
	/**
	 * get comp type messgae
	 * @returns {String}
	 */
	getCompTypeMsg : function(){
		return this.compTypeMessage;
	}
	
};