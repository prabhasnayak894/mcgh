var Map = function(options){
	this.id = null;
	this.optionId = null;
	this.partId = null;
	this.compId = null;
	this.sectionId = null;
	$.extend(this,options);
	//this._setActiveMap = Map.BindAsEventListener(this,this.setActiveMap);
};

Map.addEvent = function(oTarget, sEventType, fnHandler,args) {
$("#"+oTarget).unbind(sEventType);
$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method by class name
Map.addEventByClassName = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
Map.BindAsEventListener = function(object, fun) {
    return function(event) {
	    if(event.target.nodeName=='div'||event.target.nodeName=='DIV') {    
	    	event.stopImmediatePropagation();
	    }
        return fun.call(object, (event || window.event));
    };
};

Map.prototype = {
	/** Get and set the current id of componet for which we are creating brancgin **/
	getId: function(){
		return this.id;
	},
	setId: function (id) {
		this.id = id;
	},
	getOptionId: function(){
		return this.optionId;
	},
	setOptionId: function (optionid) {
		this.optionId = optionid;
	},
	getPartId: function(){
		return this.partId;
	},
	setPartId: function (partid) {
		this.partId = partid;
	},
	getCompId: function(){
		return this.compId;
	},
	setCompId: function (Compid) {
		this.compId = Compid;
	},
	getSectionId: function(){
		return this.sectionId;
	},
	setSectionId: function (sectionid) {
		this.sectionId = sectionid;
	},

},