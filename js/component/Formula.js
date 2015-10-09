/* ========================================================================
 * Question: Object Declaration
 * @author: Yuvraj Patil  
 * File Role : Provide Formula Object Definition. It contains all methods and fields
 * 			   required for the Formula.
 * ======================================================================== */

var Formula = function(options){
	this.id = "";
	this.number=null;	
	this.name = null;
	this.equation = "";	
	this.displaySetting = true;
	this.cautionIconStyle="none";
	this.isAffected=false;
	this.decimalVal=null;
	this.destinations = [];
	$.extend(this,options);
	this._setActiveFormula = Formula.BindAsEventListener(this,this.setActiveFormula);	
};
Formula.idPrefix = "F";

//add event helper method
Formula.addEvent = function(oTarget, sEventType, fnHandler, args){
	$("#" + oTarget).unbind(sEventType);
	$("#" + oTarget).bind(sEventType, args, fnHandler);
};

// use call to borrow context
Formula.BindAsEventListener = function(object, fun) {
	return function(event) {
		event.stopImmediatePropagation();
		return fun.call(object, (event || window.event));
	};
};

Formula.prototype = {	
	getId : function() {
		return this.id;
	},
	setId : function(id) {
		this.id = id;
	},
	getName : function(){
		return this.name;
	},
	setName : function(name){
		this.name = name;
	},
	getDisplaySetting : function(){
		return this.displaySetting;
	},
	setDisplaySetting : function(setting){
		this.displaySetting = setting;
	},
	getEquation : function () {
		return this.equation;
	},
	setEquation : function (equation) {
		this.equation = equation;
	},
	getNumber : function() {
		return parseInt(this.id.replace(Formula.idPrefix,''));
	},
	setNumber : function(number) {
		this.number = number;
	},
	getCautionIconStyle : function() {
		return this.cautionIconStyle;
	},
	setCautionIconStyle : function(cautionIconStyle) {
		this.cautionIconStyle = cautionIconStyle;
	},
	getDestinations : function(){
		return this.destinations;
	},
	setDestinations : function(destinations) {
		this.destinations = destinations;
	},
	getdecimalVal : function(){
		return this.decimalVal;
	},
	setdecimalVal : function(decimalVal) {
		this.decimalVal = decimalVal;
	},
	
	/***
	 * Function to create  formula Properties Layout for author in design mode.
	 **/
	formulaPropertiesLayout : function() {
		var formulaHtmlElement = '<tr><td style="display: inline-flex;"><a id="del_' + this.id + '" class="deleteFormula" style="margin-right:15px;" name="' + this.id +  '" href="#">';
		formulaHtmlElement += '<span class="glyphicon glyphicon-trash"></span></a>';
		formulaHtmlElement += '<span class="glyphicon glyphicon-warning-sign" style="display:' + this.cautionIconStyle+ ';"></span>';		
		formulaHtmlElement += '<a href="#" class="viewFormula"  name="' + this.id +  '" >'+ this.name + '</a>';
		formulaHtmlElement += '</td><td>';
		formulaHtmlElement += '<span class="pull-right">ID# '+ this.id +'</span></td></tr>';
		return formulaHtmlElement;
	},
	/***
	 * Function to validate formula 
	 * @param  question object
	 * returns {String : validation Status
	 **/
	validateFormula : function(question){
		if(this.isParenthesisMissing()){
			return "Parenthesis Missing";
		}			
		if(this.isFormulaEmpty()){
			return "Formula Name or Formula Equation is Empty";
		}
		if(!this.isValidOperator()){
			return "Invalid operator";
		}
		if(!this.isValidCurrency()){
			return "Currency type mismatch.";	
		}
		return this.getStudentEntriesValidationStatus(this.equation);
	},
	/***
	 * Function to validate Student Entries in formula 
	 * @param  {String} formulaEquation
	 * returns {String} : formula Equation validation Status
	 **/
	getStudentEntriesValidationStatus : function(formulaEquation) {
		var studentEntryIds = this.getStudentEntryIds(formulaEquation);
		var studentEntry=[];
		var invalidStudentEntries = [];
		for(var i=0;i<studentEntryIds.length;i++){
			studentEntry = question.getStudentEntry(studentEntryIds[i].trim());
			if(studentEntry == null ){
				invalidStudentEntries.push(studentEntryIds[i]);
			}
		}
		if(invalidStudentEntries.length > 0){
			this.highlightInvalidEntries(invalidStudentEntries.toString());
			if(invalidStudentEntries.length > 1){				
				return invalidStudentEntries.toString() + " are invalid fields.";
			}else{
				return invalidStudentEntries.toString() + " is an invalid field.";
			}
		}
		return "success";
	},
	getStudentInavalidEntries : function(formulaEquation) {
		var studentEntryIds = this.getStudentEntryIds(formulaEquation);
		var studentEntry=[];
		var invalidStudentEntries = [];
		for(var i=0;i<studentEntryIds.length;i++){
			studentEntry = question.getStudentEntry(studentEntryIds[i].trim());
			if(studentEntry == null ){
				invalidStudentEntries.push(studentEntryIds[i]);
			}
		}
		if(invalidStudentEntries.length > 0){
			return invalidStudentEntries;
		} else{
			return;
		}
	},
	/***
	* Function to get all Student Entry Ids
	* returns {Array of String}  : Student Entry Ids
	*/
	getStudentEntryIds : function(formulaEquation){
		var studentEntryIds=[];
		var tmpArray;
		formulaEquation = formulaEquation.replace(/count/g,"");
		var operatorSeperatedStrings = formulaEquation.split(/[*\/+-]/);
	    for(var i=0;i<operatorSeperatedStrings.length;i++){
			tmpArray  = operatorSeperatedStrings[i].split(/[\(\)^,]/);
			for(var j=0;j<tmpArray.length;j++){
				var isNumber = this.isNumber(tmpArray[j]); 
				if(tmpArray[j].trim()!="" && !isNumber){
					studentEntryIds.push(tmpArray[j]);
				}
			}			   
		}
		return studentEntryIds;
	},
	/***
	 * Function to check passed parameter is number or not
	 **/
	isNumber : function (number)  {
		  return !isNaN(parseFloat(number)) && isFinite(number);
	},
	/***
	 * Function to check weather formula is empty
	 **/
	isFormulaEmpty : function(){
		if(this.name.trim()=="" || this.equation.trim()==""){
			return true;
		}
		return false;
	},
	/***
	 * Function to check weather parenthesis is missing in formula
	 **/
	isParenthesisMissing :function(){
		var equation = this.equation;
		var openingParanthesisCount = this.getCharacterCount(equation,"(");
		var closingingParanthesisCount = this.getCharacterCount(equation,")");
		if(openingParanthesisCount == closingingParanthesisCount){
			return false;
		}
		return true;
	},
	/***
	 * Function to validate arithmetic operators
	 **/
	isValidOperator :function(){
		var equation = this.equation;
		if('*\/+-^'.indexOf(equation.charAt(0)) > -1)
			return false;
			
		for (var i = 0; i<equation.length; i++){
			if('*\/+-^'.indexOf(equation.charAt(i)) > -1){
				if ('*\/+-^'.indexOf(equation.charAt(i+1)) > -1){
					return false;
				}
			}
		}
		return true;
	},
	isValidCurrency : function(){
		var studentEntryIds = this.getStudentEntryIds(this.equation);
		var returnFlag = true,
			isCurrency = false;
		var equationTypeArray = [];
		for(var i=0; i<studentEntryIds.length; i++){
			var compId;
			
			compId = studentEntryIds[i].substring(0, 4);
			var j = 0;
			var activePageComp = question.activePage.components;
			for(j in activePageComp){
				var pageCompId = activePageComp[j].pageIdPrefix+activePageComp[j].pageId+activePageComp[j].idPrefix+activePageComp[j].id;
				if(compId == pageCompId){
					var component = activePageComp[j];
					if(component.type == "table"){
						try{
							var cellComp = component.getItemValById(component.cellComponentCollection, studentEntryIds[i], "component");
							
							if(studentEntryIds[i]==cellComp.editor.id)
							{
								if(cellComp.contentFormat.type == "currency"){
									equationTypeArray.push(cellComp.contentFormat);
									isCurrency = true;
								}
							}
						}catch(e){
							
						}
						
						
						
					} else {
						var r = 0;
						var s = 0;
						for(r in component.sections){
							for(s in component.sections[r].studentEntries){								
								var elementid = pageCompId + component.sections[r].idPrefix + component.sections[r].id +component.sections[r].studentEntries[s].idPrefix+component.sections[r].studentEntries[s].id;
								if(studentEntryIds[i]==elementid)
								{
									if(component.sections[r].studentEntries[s].contentFormat.type == "currency"){
										equationTypeArray.push(component.sections[r].studentEntries[s].contentFormat);
										isCurrency = true;
									}
								}
							}
						}
					}
				}
			}
		}
			if(isCurrency){
				var f = 0;
				
				if(studentEntryIds.length==equationTypeArray.length)
				{
					for(f in equationTypeArray){
						var g = 0;
						for(g in equationTypeArray){
							if(equationTypeArray[f].type != equationTypeArray[g].type){
								returnFlag = false;
								break;
							} else if(equationTypeArray[f].currencyType != equationTypeArray[g].currencyType){
								returnFlag = false;
								break;
							}
						}
					}
				}
				else
					returnFlag=false;
			
		}
		return returnFlag;
	},
	/** Function to count the occurrences of substring in a string;
	 * @param {String} string   Required. The string;
	 * @param {String} subString    Required. The string to search for;
	 * @param {Boolean} allowOverlapping    Optional. Default: false;
	 */
	getCharacterCount : function(string, subString, allowOverlapping){
	    string+=""; subString+="";
	    if(subString.length<=0) return string.length+1;
	    var n=0, pos=0;
	    var step=(allowOverlapping)?(1):(subString.length);
	    while(true){
	        pos=string.indexOf(subString,pos);
	        if(pos>=0){ n++; pos+=step; } else break;
	    }
	    return(n);
	},
	/** 
	 * Function to add Destination (of Formula) in destination array
	 * @param : destinationElementId 
	 */
	addDestination : function (destinationElementId){
		if(this.getDestinations().indexOf(destinationElementId) != -1){
			return ;
		}
		this.getDestinations().push(destinationElementId);		
	},
	/** 
	 * Function to remove Destination (of Formula) from destination array
	 * @param : destinationElementId 
	 */
	removeDestination : function (destinationElementId){
		if(this.getDestinations().indexOf(destinationElementId) == -1){
			return ;
		}
		for( i in this.destinations){	        		 
			if(this.destinations[i]==destinationElementId){
				this.destinations.splice(i, 1);	    					
			}
   	 	}				
	},
	/**
	 * Function to deserialize javascript object into //ToDo
	 * user defined object 
	 * */
	deserialize : function(jsonObj) {
		var formula = new Formula({
			id : jsonObj.id,
			number : jsonObj.number,
			name : jsonObj.name,
			displaySetting : jsonObj.displaySetting,
			equation:jsonObj.equation,
			destinations:jsonObj.destinations,
			decimalVal:jsonObj.decimalVal,
			cautionIconStyle:jsonObj.cautionIconStyle
			
		});	
		return formula;
	},
	/***
	* Function to Highlight All Invalid Entries of Formula equation
	* @param : studentEntryId  =  entry to be highlighted
	*/
	highlightInvalidEntries : function(studentEntryIds){	
		var enteredEquation = $("#formulaEquation").text();
		enteredEquation = enteredEquation.replace(/\</g,"\&lt;");
		enteredEquation = enteredEquation.replace(/\>/g,"\&gt;");
		arrStudentEntryIds = studentEntryIds.split(",");
		$("#formulaEquation").html("");
		for(var index = 0; index < arrStudentEntryIds.length; index++){
			arrStudentEntryIds[index]  = arrStudentEntryIds[index].replace(/\</g,"\&lt;");
			arrStudentEntryIds[index] = arrStudentEntryIds[index].replace(/\>/g,"\&gt;");
			var entryStartIndex = enteredEquation.indexOf(arrStudentEntryIds[index]);
			var entryEndIndex = entryStartIndex + arrStudentEntryIds[index].length ;
			var beforeEntryHTML =   '<span class="validFormulaEntry" style="color:green;">'+enteredEquation.substring(0,entryStartIndex) +'</span>';
			var entryHTML =  '<span class="InvalidFormulaEntry" style="color:red;">'+enteredEquation.substring(entryStartIndex,entryEndIndex) +'</span>';
			var studentEntryIdsBefore = enteredEquation.substring(0,entryStartIndex);
			var studentEntryIdsEntry = enteredEquation.substring(entryStartIndex,entryEndIndex);
			enteredEquation = enteredEquation.replace(studentEntryIdsBefore,"");
			enteredEquation = enteredEquation.replace(studentEntryIdsEntry,"");
			if((arrStudentEntryIds.length) === (index+1)){
				entryHTML =   entryHTML + '<span class="validFormulaEntry" style="color:green;">'+enteredEquation+'</span>';
			}
			$("#formulaEquation").append(beforeEntryHTML + entryHTML);
		}
		
	},
};