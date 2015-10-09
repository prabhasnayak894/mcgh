var PathMap = function(options){
	this.branchId = null;		//component id for which branching is required
	this.id = null;
	this.compOptionId = null;
	this.range = [];//Array for  ranges in pathmaps
	this.idPrefix = "PM";
	this.optionLabel = "";// static option lable for branch
	this.optionArr = null;
	this.cataOptions=null;// object containing cata options for dropdown in cata-cata 
	this.idRange = [];			// mutiple options ids for check all that apply
	this.idRangeCata2=[];		// mutiple options ids for CATA-CATA 
	this.condition = [];		// condition for input and table
	this.labelOptionsObject = null;		// multiple option label for check all that apply
	this.mappingIndicatorPath = null;
	this.idCriteria2 = null;// option id of second component 
	this.operators = ["and"];// array of conditional operators for multicriteria 
	this.paths = [];//Array for paths in pathmaps
	this.drpDwnOptionsObject=null;
	this.labelEditorId=[];
	this.drpDwnEditorId=[];
	$.extend(this,options);
	this._setActiveBranch = PathMap.BindAsEventListener(this,this.setActiveBranch);
	//this._selectPathMap = PathMap.BindAsEventListener(this,this.selectPathMap);
	this._addOptionPath = PathMap.BindAsEventListener(this,this.addOptionPath);
	this._addCondition = PathMap.BindAsEventListener(this,this.addCondition);
	this._saveCondition = PathMap.BindAsEventListener(this,this.saveCondition);
	this._removeRange = PathMap.BindAsEventListener(this,this.removeRange);
	this._cataAnswerOptionAdd = PathMap.BindAsEventListener(this,this.cataAnswerOptionAdd);
	this._cataAnswerOptionDelete = PathMap.BindAsEventListener(this,this.cataAnswerOptionDelete);
	this._cataDropDown = PathMap.BindAsEventListener(this,this.cataDropDown);	
	this._saveCriteria = PathMap.BindAsEventListener(this,this.saveCriteria);
	this._saveOperator = PathMap.BindAsEventListener(this,this.saveOperator);
	this._addScoreRange = PathMap.BindAsEventListener(this,this.addScoreRange);
};

PathMap.addEvent = function(oTarget, sEventType, fnHandler,args) {
$("#"+oTarget).unbind(sEventType);
$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method by class name
PathMap.addEventByClassName = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
PathMap.BindAsEventListener = function(object, fun) {
    return function(event) {
	    if(event.target.nodeName=='div'||event.target.nodeName=='DIV') {    
	    	event.stopImmediatePropagation();
	    }
        return fun.call(object, (event || window.event));
    };
};

PathMap.prototype = {
	
	/** create and set new path id for created PathMap **/
	getId: function(){
		return this.id;
	},
	setId: function(pathid){
		this.id = pathid;
	},
	getCompOptionId: function(){
		return this.compOptionId;
	},
	setCompOptionId: function(compOptionId){
		this.compOptionId = compOptionId;
	},
	/** create and set new path id for created PathMap **/
	getPaths: function(){
		return this.paths;
	},
	setPaths: function(paths){
		this.paths = paths;
	},
	/** multiple ids of option for check all that apply **/
	getIdRange: function(){
		return this.idRange;
	},
	setIdRange: function(idRange){
		this.idRange = idRange;
	},
	/** create and set new condition id for created PathMap **/
	getCondition: function(){
		return this.paths;
	},
	setCondition: function(condition){
		this.condition = condition;
	},
	/**  Function to create  PathMap Layout for author in design mode. **/
	layout: function(mappingIndicator,mappingIndicator2, showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,isScoreRange,firstCompObj,secCompObj){
		this.mappingIndicatorPath = mappingIndicator;
		var html = '';
		var hideIt = "";
		if(criteria == "single"){
			hideIt = (firstCompType == "inputField" || firstCompType == "table")?'':'hideItBranch';
		}else{
			hideIt = (secCompType == "inputField" || secCompType == "table") && !isScoreRange?'':'hideItBranch'; 

		}
		if(mappingIndicator == "answerOption"  || criteria=="multi"){
			html +=	'		<div style="padding-top: 35px;" class="row rowCustom" id="row_'+this.id+'">';
			if(criteria == "multi"){
				/**  Function call to create layout for multicriteria **/
				html += this.multiCriteriaLayout(mappingIndicator,mappingIndicator2, showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,isScoreRange,firstCompObj,secCompObj);
			}else{
				/**  Function call to create layout for singleCriteria **/
				html += this.singleCriteriaAnsOptLayout(mappingIndicator, showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,firstCompObj,secCompObj);
			}
			html +=	'	<div class="row rowCustom rowBottomBorder" >';
			if(!isScoreRange && isScoreRange!=undefined){
				var marginclassFrDelete=""
				if(criteria!="multi" && firstCompType=="checkbox" ){
					 marginclassFrDelete="marginclassFrDelete";	
				}
				html +=	'					<div class="col-sm-4 right-border smallFont cellHeight '+marginclassFrDelete+'"></div>';
			}
			//if multicriteria then add code buton Add Score range for every pathmap
			var conditionMrgn="18px";
			if(this.condition.length==1 && this.paths.length==1){
				conditionMrgn="-100px";
			}
			var hideScoreRange = "";
			if(criteria == "multi"){
				if(this.range == null || this.range.length == 0){
					hideScoreRange = 'hideItBranch'; 
				}
				conditionMrgn = "18px;";
				html +=	'					<div id="rowAddScoreRange_'+ this.id+'" >';
				html +=	'						<div class="col-sm-4 '+hideScoreRange+'" style="vertical-align: middle;" >';
				html +=	'							<span style="padding-left: 0px;" class="glyphicon glyphicon-plus-sign customColor"></span>';
				html +=	'							<button id="addScoreRange_'+this.id+'" data-PathCount="1" class="btn btn-link btnwidth btnAddScoreRange" type="button">Add score range</button>';
				html +=	'						</div>';
				html +=	'					</div>';
			}
			html +=	'					<div style="margin-left: '+conditionMrgn+'" id="addConditionDiv_'+this.id+'"  data-paths="1" class="col-sm-4 '+hideIt+'">';
			html +=	'						<span class="glyphicon glyphicon-plus-sign customColor"></span>';
			html +=	'						<button style="width: 75px ! important; padding-top: 0px;" id="addCondition_'+this.id+'"  class="btn btn-link smallFont btnwidth addOptionPath" type="button">Add Condition</button>';
			html +=	'					</div>';
			html +=	'					<div  id="addPath_'+this.id+'"  data-paths="1" class="col-sm-4" style="margin-left:65px; cursor: pointer;">';
			html +=	'						<span class="glyphicon glyphicon-plus-sign customColor"></span>';
			html +=	'						<button style="width: 66px ! important; padding-top: 0px;"   class="btn btn-link smallFont btnwidth addOptionPath" type="button">Add Path</button>';
			html +=	'					</div>';
			html +=	'					<div class="col-sm-4 smallFont"></div>';
			html +=	'					<div class="col-sm-4 smallFont"></div>';
			html +=	'				</div>';
			html +=	'		</div>';

		}
		else if(mappingIndicator == "scoreRange"){
			//singleCriteria score range layout
			html += this.singleCriteriaScoreRangeLayout(mappingIndicator, showMinus, criteria, cataAnswerOption, isvisibleCondition);

		}
		return html;
	},
	//pathmap layout for single criteria answer option
	singleCriteriaAnsOptLayout : function(mappingIndicator, showMinus, criteria, cataAnswerOption, isvisibleCondition,firstCompObj,secCompObj){
		var html = '';
		var disabled = "";
		var hideIt = !isvisibleCondition?'hideItBranch':''; 
		html +=	'			<div class="col-sm-4 smallFont right-border no-bottom-border" style="height:auto; padding-left: 12px !important;" id="OptionOrRange_'+this.id+'"><span style="padding-left: 5px;">'+this.optionLabel+'</span>';
		html +=	'					<div id="addedOptionDiv_'+this.id+'" class="addedOptionDiv right-border smallFont" style="margin-top: 8px;">';
		if(cataAnswerOption){
			if(this.idRange.length>1){
				var i = 0;
				for(i in this.idRange){
					if(this.idRange[i] != undefined && i != 0)
						html += this.cataAnswerOptionLayout(this.idRange[i], i, criteria);
				}
			}
		}				
		html += '					</div>';
		if(cataAnswerOption){
			html += '					<span class="smallFont" style="padding-left: 5px;"><a id="addoption_'+this.id+'_'+1+'">Add option</a></span>';
		}
		html += '			</div>';
		if(this.condition.length>0){
			html +=	'		<div id="paths_'+this.id+'">';
			html += '			<div id="conditionPathWrapper_'+this.id+'" class="conditionWrapper">';
			for(var i in this.condition){
				html += '			<div id="conditionWrapper_'+this.id+'_'+this.condition[i].id+'" class="conditionWrapper conditions">';
				html +=	'				<div style="width:175px; margin-left: 24px;" id="condition_'+this.id+'_'+this.condition[i].id+'" class="col-sm-4 no-bottom-border '+hideIt+'">';
				html +=	'					<select style="width: 50px;" id="selectCondition_'+this.id+'_'+this.condition[i].id+'" class="condition form-control modalSelect">';
				html +=	'						<option value="1"> = </option>';
				html +=	'						<option value="2"> < </option>';
				html +=	'						<option value="3"> > </option>';
				html +=	'						<option value="4"> => </option>';
				html +=	'						<option value="5"> =< </option>';
				html +=	'					</select>';
				html +='					<input class="inputDummy .ptsValue-1 branchAuthorEntry" value="'+this.condition[i].authorEntryVal+'" id="authorEntry_'+this.id+'_'+this.condition[i].id+'" />';
				html +=	'				</div>';
				html +=	'				<div class="pathWrapper" id="pathWrapper_'+this.id+'_'+this.condition[i].id+'">';
				var k=0;
				for(k in this.paths){
					if(this.condition[i].id == this.paths[k].conditionId){
						html +=	'					<div class="Path" id="path_'+this.paths[k].id+'" style="margin-left: 74px;">';
						html += 						this.paths[k].layout(mappingIndicator, disabled);
						html +=	'					</div>';
					}
				}
				html +=	'				</div>';
				
				html += '			</div>';
				html +=	'<div class="clear"></div>';
			}
			html +=	'				</div>';
			html +=	'			</div>';//end of singleCriteria inputField and table paths div
		}else{
			html +=	'		<div id="paths_'+this.id+'">';
			html += '			<div id="conditionPathWrapper_'+this.id+'" class="conditionWrapper">';
			var margin ="180px";
			html +=	'				<div style="margin-left:'+margin+';" class="pathWrapper" id="pathWrapper_'+this.id+'">';
			for(var k in this.paths){
				html +=	'					<div class="Path" id="path_'+this.paths[k].id+'" style="margin-left: 60px;">';
				html += 						this.paths[k].layout(mappingIndicator, disabled);
				html +=	'					</div>';
			}
			html +=	'				</div>';
			html +=	'			</div>';
			html += '		</div>';
		}
		return html;
	},
	
	//pathmap layout for single criteria score range
	singleCriteriaScoreRangeLayout : function(mappingIndicator, showMinus, criteria, cataAnswerOption, isvisibleCondition){
		var html = '';
		var disabled = "";
		/*to support legacy content created in singlecriteria build*/
		if(this.range != null && this.range.length == undefined){
			var newRangeConfig = {
	    			id:1,
					pathMapId:this.id,
					componentId :this.branchId,
					componentIdPrefix :"B"
				};
			var newRange = new BranchRange(newRangeConfig);
			newRange.minRangeEditor.text = this.range.minRangeEditor.text;
			newRange.maxRangeEditor.text = this.range.maxRangeEditor.text;
			
			this.range = [newRange];
		}
		if(this.range != null && this.range.length != 0){
			disabled =  (this.range[0].minRangeEditor.text == "" || this.range[0].maxRangeEditor.text == "") ? "disabled" : "";
		}
		html +=	'<div style="padding-top: 15px;" class="row rowCustom" id="row_'+this.id+'">';
		html +=	'	<div class="col-sm-4 smallFont right-border no-bottom-border" style="margin-left: 30px;" id="OptionOrRange_'+this.id+'">';

		if(this.optionLabel != ""){
			html += this.optionLabel;
		}
		else{
			if(this.range != null && this.range.length != 0){
				html += this.range[0].rangeBasedLayout(false,this.id,false);
			}
		}
		html +=	'	</div>';
		html +=	'	<div id="paths_'+this.id+'">';
		html +=	'		<div style="margin-left:208px;" class="pathWrapper" id="pathWrapper_'+this.id+'">';
		for(var k in this.paths){
			html +=	'				<div class="Path" id="path_'+this.paths[k].id+'">';
			html += 						this.paths[k].layout('',disabled,showMinus);
			html +=	'				</div>';
		}
		html +=	'	</div>';
		html +=	'	<div class="clear"></div>';
		html +=	'	</div>';
		html +=	'	<div class="row rowCustom rowBottomBorder">';
		html +=	'		<div class="col-sm-4 right-border smallFont cellHeight"></div>';
		html +=	'		<div id="addPath_'+this.id+'"  data-paths="1" class="col-sm-4 " style="margin-left:162px; cursor: pointer;">';
		html +=	'			<span class="glyphicon glyphicon-plus-sign customColor"></span>';
		html +=	'			<button style="width: 66px ! important; padding-top: 0px;" data-PathCount="1" class="btn btn-link smallFont btnwidth addOptionPath" type="button">Add Path</button>';
		html +=	'		</div>';
		html +=	'		<div class="col-sm-4 smallFont"></div>';
		html +=	'		<div class="col-sm-4 smallFont"></div>';
		if(showMinus){
			html+='       <div class="minusBtn" style="; margin-top: 5px; float:right;">';
			html+='                <a title="Delete Range">';
			html+='                   <img id="minusRange_'+this.id+'" src="img/minus.png">';
			html+='               </a>';
			html+='       </div>';
			html +=	'	<div class="clear"></div>';
		}
		html +=	'	</div>';
		html +=	'</div>';
		return html;
	},
	/**  Function to create  PathMap Layout for multicriteria **/
	multiCriteriaLayout : function(mappingIndicator,mappingIndicator2, showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,isScoreRange,firstCompObj,secCompObj){
		var html = '';
		var hideIt = (firstCompType == "inputField" || firstCompType == "table" || secCompType == "inputField" || secCompType == "table")?'':'hideItBranch'; 
		html +=	'		<div id="paths_'+this.id+'">';
		html += '			<div  id="pathmap_'+this.id+'" class="conditionWrapper">';
		html +=	'				<div class="col-sm-4 smallFont right-border no-bottom-border" style="height:auto;  padding-left: 22px !important;">';
		html +=	'					<span style="padding-left: 5px;">'+this.optionLabel+'</span>';
		html += '				</div>';
		html +=	'			<div class="clear"></div>';
		//ans option-ans option case
		if(this.labelOptionsObject != null && !isScoreRange){
			//console.log("answer option lay");
			html +=this.answerOptionLayout(mappingIndicator,mappingIndicator2, showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,isScoreRange,hideIt,firstCompObj,secCompObj);
		}
		else{
			//console.log("answer scoreRange");
			html +=this.scoreRangeLayout(mappingIndicator,mappingIndicator2, showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,isScoreRange,hideIt,firstCompObj,secCompObj);	
		}
		html +=	'				</div>';
		html +=	'			</div>';
		return html;
	},
	/** layout for pathmap for answerOption-answerOption Case **/
	answerOptionLayout:function(mappingIndicator, mappingIndicator2,showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,isScoreRange,hideIt,firstCompObj,secCompObj){
		var html="";
		var disabled="";
		html +=	'			<div class="clear"></div>';
		html +=	'			<div class="col-sm-4 smallFont right-border no-bottom-border" style="height:auto; padding-left: 22px !important;" id="OptionOrRange_'+this.id+'">';
			//if one of selected comp is CATA
		if(firstCompType=="checkbox" || secCompType=="checkbox"){
			var rangeLength = firstCompType=="checkbox" ? 1 : 0;
				//html += '					<span class="smallFont" style="padding-left: 5px;"><a id="addoption_'+this.id+'">Add option</a></span>';
			var i = 0;
			html +=	'		<div id="addedOptionDiv_'+this.id+'"  class="addedOptionDiv right-border smallFont" >';
			if(this.idRange.length > rangeLength){
				for(i in this.idRange){
					/*display checkbox dropdown condition 
					* if idRangehave some vale and
					* if it have just one value then is it second component then display
					*/
					if(this.idRange[i] != undefined && (i != 0 || rangeLength == 0) )
						html += this.cataAnswerOptionLayout(this.idRange[i], i, criteria,firstCompType, secCompType,firstCompObj,secCompObj,1);
				}
			}
			
	
			html += '		</div>';
			//if(firstCompType=="checkbox"){
				html += '		<span class="smallFont" style="padding-right: 20px;"><a id="addoption_'+this.id+'_'+1+'">Add option </a></span>';	
			//}
			if(firstCompType=="checkbox" ){
				html += this.multiCriteriaOptionLayout(firstCompType, secCompType,firstCompObj,secCompObj,isScoreRange,mappingIndicator,mappingIndicator2);
				if(secCompType=="checkbox"){
					if(this.idRangeCata2.length > rangeLength){
						for(i in this.idRangeCata2){
							/*display checkbox dropdown condition 
							* if idRangehave some vale and
							* if it have just one value then is it second component then display
							*/
							if(this.idRangeCata2[i] != undefined && (i != 0 || rangeLength == 0) )
								html += this.cataAnswerOptionLayout(this.idRangeCata2[i], i, criteria,firstCompType, secCompType,firstCompObj,secCompObj,2);
						}
					}
					html += '					<span class="smallFontA" style="padding-left: 0px;"><a id="addoption_'+this.id+'_'+2+'">Add option</a></span>';
				}
				
				
			}
		}else{
			html += this.multiCriteriaOptionLayout(firstCompType, secCompType,firstCompObj,secCompObj,isScoreRange,mappingIndicator,mappingIndicator2);
		}
		html +=	'			</div>';
		var conditionalOperatorHtml = "";
		var conditionMarginLeft = "39px";
		if(this.condition.length>0){
				conditionMarginLeft = "0px";
				if((firstCompType!="table" && firstCompType!="inputField") && (secCompType=="table" || secCompType=="inputField")){
					conditionMarginLeft = "39px";
				}
		}
		
		conditionalOperatorHtml += '			<div id="conditionWrapper_'+this.id+'" class="conditionWrapper conditions" style="width: 215px;">';
		conditionalOperatorHtml +=	'				<div style="margin-left:'+conditionMarginLeft+'" id="conditionalOperator_'+this.id+'" class="divConditionalOperator">';
		//var andOrWidth =(isChrome)?"54px":"51px";		
		conditionalOperatorHtml +=	'					<select style="width: auto" id="selectOperator_'+this.id+'" class="condition form-control modalSelect">';
		conditionalOperatorHtml +=	'						<option value="and">AND</option>';
		conditionalOperatorHtml +=	'						<option value="or">OR</option>';
		conditionalOperatorHtml +=	'					</select>';
		conditionalOperatorHtml +=	'				</div>';
		conditionalOperatorHtml +=	'				<div class="clear"></div>';
		conditionalOperatorHtml += '			</div>';
		if(this.condition.length>0){
			var inputCndtnHtml = "";
			var paddingTop =  firstCompType == "checkbox" ? this.idRange.length * 30 - 10 : "";
			var isFirstInputComp = false;
			var marginTop = '0px';
			if(firstCompType == "inputField" || firstCompType == "table"){
				isFirstInputComp = true;
				marginTop = "-25px";
			}
			inputCndtnHtml += '			<div id="conditionPathWrapper_'+this.id+'" style=" margin-top:'+marginTop+'; padding-top:'+paddingTop+'px;" class="conditionWrapper">';
			for(var i in this.condition){
				inputCndtnHtml += '			<div id="conditionWrapper_'+this.id+'_'+this.condition[i].id+'" class="conditionWrapper conditions">';
				inputCndtnHtml +=	'				<div style="width:175px; margin-left: 24px;" id="condition_'+this.id+'_'+this.condition[i].id+'" class="col-sm-4 '+hideIt+'">';
				inputCndtnHtml +=	'					<select style="width: 50px;" id="selectCondition_'+this.id+'_'+this.condition[i].id+'" class="condition form-control modalSelect">';
				inputCndtnHtml +=	'						<option value="1"> = </option>';
				inputCndtnHtml +=	'						<option value="2"> < </option>';
				inputCndtnHtml +=	'						<option value="3"> > </option>';
				inputCndtnHtml +=	'						<option value="4"> => </option>';
				inputCndtnHtml +=	'						<option value="5"> =< </option>';
				inputCndtnHtml +=	'					</select>';
				inputCndtnHtml +='						<input class="inputDummy .ptsValue-1 branchAuthorEntry" value="'+this.condition[i].authorEntryVal+'" id="authorEntry_'+this.id+'_'+this.condition[i].id+'" />';
				//add conditional operator div in first div of input field condition div for alignment
				if(isFirstInputComp && i == 0){
					inputCndtnHtml += conditionalOperatorHtml;
				}
				inputCndtnHtml +=	'				</div>';
				inputCndtnHtml +=	'				<div class="pathWrapper" id="pathWrapper_'+this.id+'_'+this.condition[i].id+'">';
				var k=0;
				for(k in this.paths){
					if(this.condition[i].id == this.paths[k].conditionId){
						inputCndtnHtml +=	'					<div class="Path" id="path_'+this.paths[k].id+'" style="margin-left: 74px;">';
						inputCndtnHtml += 						this.paths[k].layout(mappingIndicator, disabled);
						inputCndtnHtml +=	'					</div>';
					}
				}
				inputCndtnHtml +=	'				</div>';
				inputCndtnHtml += '			</div>';
				inputCndtnHtml +=	'		<div class="clear"></div>';
			}
			inputCndtnHtml += '		</div>';
			if(!isFirstInputComp){
				html += conditionalOperatorHtml;
				html += inputCndtnHtml;
			}else{
				html += inputCndtnHtml;
			}
		}else{
			html += conditionalOperatorHtml;
			html +=	'				<div  class="pathWrapper" id="pathWrapper_'+this.id+'" style="">';
			var k=0;
			for(k in this.paths){
				html +=	'					<div class="Path" style="margin-left:60px;" id="path_'+this.paths[k].id+'">';
				html += 						this.paths[k].layout(mappingIndicator);
				html +=	'					</div>';
			}
			html +=	'				</div>';
		}
		return html;
	},
	/** layout for pathmap for score-ansOpt  Case **/
	scoreRangeLayout:function(mappingIndicator,mappingIndicator2, showMinus, criteria, cataAnswerOption, isvisibleCondition, firstCompType, secCompType,isScoreRange,hideIt,firstCompObj,secCompObj){
		var html="";
		var showMinus=true;
		if(this.range != null && this.range.length == 1){
			showMinus=false; 
		}
		var rangeIndex = 0;
		if(firstCompType=="checkbox" || secCompType=="checkbox"){
			var i = 0;
			html +=	'		<div id="addedOptionDiv_'+this.id+'" style="margin-left:20px;" class="addedOptionDiv right-border smallFont" >';
			if(this.idRange.length>1){
				for(i in this.idRange){
					if(this.idRange[i] != undefined && i != 0)
						html += this.cataAnswerOptionLayout(this.idRange[i], i, criteria,firstCompType, secCompType,firstCompObj,secCompObj,1);
				}
			}
			var rangeLength=0;
			if(this.idRangeCata2.length>0){
					for(i in this.idRangeCata2){
						if(this.idRangeCata2[i] != undefined && (i != 0 || rangeLength == 0) )
							html += this.cataAnswerOptionLayout(this.idRangeCata2[i], i, criteria,firstCompType, secCompType,firstCompObj,secCompObj,2);
					}
			}
			html += '		</div>';
			if((secCompType=="checkbox" && mappingIndicator2!="scoreRange") ||(firstCompType=="checkbox" && mappingIndicator!="scoreRange") ){
				var id=(secCompType=="checkbox" && firstCompType=="checkbox")?2:(firstCompType=="checkbox")?1:1;
				html += '		<span class="smallFont" style="padding-right: 20px;"><a id="addoption_'+this.id+'_'+id+'">Add option </a></span>';	
			}
		}
		html += '			<div id="conditionPathWrapper_'+this.id+'" class="conditionWrapper">';
		//if((firstCompType=="multiplechoice" || secCompType=="multiplechoice") && (firstCompObj.feedbackScoringType!="frequency" && secCompObj.feedbackScoringType!="frequency")){
		var rangeDivMinHeight = "55px";
		var conditionDivMarginTopStyle = '';
		
		for(rangeIndex in this.range){
			rangeDivMinHeight = "55px";
			conditionDivMarginTopStyle = '';
			if(this.condition.length>0 && rangeIndex == 0){
				//rangeDivMinHeight = "70px";
				conditionDivMarginTopStyle = 'style="margin-top:-33px"';
			}
			html += '		<div id="rangePathWrapper_'+this.range[rangeIndex].id+'" style="min-height:'+rangeDivMinHeight+'">';
			html +=	'			<div class="col-sm-4 smallFont right-border no-bottom-border" style="height:auto; padding-left: 22px !important;" id="OptionOrRange_'+this.id+'">';
			html +=	'				<div  class=" right-border smallFont" >';
			//for frequency call multi
			var mappingIndicator=(firstCompObj.feedbackScoringType=="frequency")?mappingIndicator:(secCompObj.feedbackScoringType=="frequency")?mappingIndicator2:"scoreRange";
			if((firstCompObj.feedbackScoringType=="frequency" || secCompObj.feedbackScoringType=="frequency") && mappingIndicator!="answerOption"){
				html += this.multiCriteriaOptionLayout(firstCompType, secCompType,firstCompObj,secCompObj,isScoreRange,mappingIndicator,mappingIndicator2,this.range[rangeIndex].id);
			}else{
				if(rangeIndex == this.range.length-1){
					html+=  this.range[rangeIndex].rangeBasedLayout(true, this.range[rangeIndex].id,showMinus);
				}
				else{
					html+=  this.range[rangeIndex].rangeBasedLayout(false, this.range[rangeIndex].id, showMinus); 
				}
			}
			
			html += '				</div>';
			html += '			</div>';
			html += '			<div id="conditionWrapper_'+this.range[rangeIndex].id+'" class="conditionWrapper" '+conditionDivMarginTopStyle+'>';
			if(this.condition.length>0 && rangeIndex == 0){
					html += '			<div id="conditionWrapper_'+this.id+'_'+this.condition[rangeIndex].id+'" class="conditionWrapper conditions" style="margin-left: 10px;">';
					html +=	'				<div style="width:175px; margin-left: 24px;" id="condition_'+this.id+'_'+this.condition[rangeIndex].id+'" class="col-sm-4 no-bottom-border '+hideIt+'">';
					html +=	'					<select style="width: 50px;" id="selectCondition_'+this.id+'_'+this.condition[rangeIndex].id+'" class="condition form-control modalSelect">';
					html +=	'						<option value="1"> = </option>';
					html +=	'						<option value="2"> < </option>';
					html +=	'						<option value="3"> > </option>';
					html +=	'						<option value="4"> => </option>';
					html +=	'						<option value="5"> =< </option>';
					html +=	'					</select>';
					html +='					<input class="inputDummy .ptsValue-1 branchAuthorEntry" value="'+this.condition[rangeIndex].authorEntryVal+'" id="authorEntry_'+this.id+'_'+this.condition[rangeIndex].id+'" />';
					html +=	'				</div>';
					html += '			</div>';
				html +=	'				<div class="clear"></div>';
			}
			//var andOrWidth = (isChrome)?"54px":"51px";
			html +=	'				<div style="" id="conditionalOperator_'+this.id+'_'+this.range[rangeIndex].id+'" class="divConditionalOperator">';
			html +=	'					<select style="width: auto" id="selectOperator_'+this.id+'_'+this.range[rangeIndex].id+'" class="condition form-control modalSelect">';
			html +=	'						<option value="and">AND</option>';
			html +=	'						<option value="or">OR</option>';
			html +=	'					</select>';
			html +=	'				</div>';
			html += '			</div>';
			var k =0;
			html +=	'			<div style="padding-left:50px;" class="pathWrapper" id="pathWrapper_'+this.id+'_'+this.range[rangeIndex].id+'">';
			html +=	'				<div  id="rangePaths_'+this.range[rangeIndex].id+'" >';
			for(k in this.paths){
				if(this.range[rangeIndex].id == this.paths[k].rangeId){
					var disabled = "";
					 if(((mappingIndicator == "answerOption") || (mappingIndicator == "scoreRange" && firstCompObj.feedbackScoringType != 'frequency')) && ((mappingIndicator2 == "answerOption") || (mappingIndicator2 == "scoreRange" && secCompObj.feedbackScoringType != 'frequency'))){
						disabled =  (this.range[rangeIndex].minRangeEditor.text == "" || this.range[rangeIndex].maxRangeEditor.text == "") ? "disabled" : "";
					}
					html +=	'					<div class="Path" style="" id="path_'+this.paths[k].id+'">';
					html += 						this.paths[k].layout(mappingIndicator, disabled);
					html +=	'					</div>';
				}
			}
			html +=	'				</div>';
			html +=	'			</div>';
			html += '		</div>';
		}
		html +=	'				</div>';
		return html;
	},
	/** adds events to pathMap object after the design layout **/
	afterLayout:function(mappingIndicator, criteria,frstCompObj,secCompObj){
		PathMap.addEvent( "addPath_"+this.id, "click", this._addOptionPath);
		PathMap.addEvent( "addCondition_"+this.id, "click", this._addCondition);
		PathMap.addEvent( "minusRange_"+this.id, "click", this._removeRange);
		PathMap.addEvent( "addoption_"+this.id+"_"+1, "click", this._cataAnswerOptionAdd,{"criteria":criteria,"frstCompObj":frstCompObj,"secCompObj":secCompObj});
		PathMap.addEvent( "addoption_"+this.id+"_"+2, "click", this._cataAnswerOptionAdd,{"criteria":criteria,"frstCompObj":frstCompObj,"secCompObj":secCompObj});
		for(var i=0; i<this.idRange.length; i++){
			PathMap.addEvent( 'minusOption_'+this.id+'_'+i+'_'+1, "click", this._cataAnswerOptionDelete,{"frstCompObj":frstCompObj});
			PathMap.addEvent( 'OptionOrRange_'+this.id+'_'+i+'_'+1, "change", this._cataDropDown,{"frstCompObj":frstCompObj});
		}
		for(var j=0;j<this.idRangeCata2.length;j++){
			PathMap.addEvent( 'minusOption_'+this.id+'_'+j+'_'+2, "click", this._cataAnswerOptionDelete,{"frstCompObj":frstCompObj});
			PathMap.addEvent( 'OptionOrRange_'+this.id+'_'+j+'_'+2, "change", this._cataDropDown,{"frstCompObj":frstCompObj});
		}
		for(k in this.paths){
			 this.paths[k].afterLayout();
		}
		for(i in this.condition){
			PathMap.addEvent( "selectCondition_"+this.id+"_"+this.condition[i].id, "change", this._saveCondition);
			PathMap.addEvent( "authorEntry_"+this.id+"_"+this.condition[i].id, "blur", this._saveCondition);
			$("#selectCondition_"+this.id+"_"+this.condition[i].id).val(this.condition[i].selectConditionVal);
		}
		if(this.range!= null)
		{
			var rangeIndex = 0;
			for(rangeIndex in this.range){
				//console.log(rangeIndex);
				this.range[rangeIndex].afterLayout();
				if(criteria == "multi"){
					PathMap.addEvent( "selectOperator_"+this.id+'_'+this.range[rangeIndex].id, "change", this._saveOperator);
					PathMap.addEvent( "criteriaDropDown_"+this.id+'_'+this.range[rangeIndex].id, "change", this._saveCriteria,{isFrequency:true, rangeId:this.range[rangeIndex].id});
				}
				
			}
		}
		if(criteria == "multi"){
			if(this.range == null || this.range.length == 0){
				PathMap.addEvent( "criteriaDropDown_"+this.id, "change", this._saveCriteria,{isFrequency:false});
				PathMap.addEvent( "selectOperator_"+this.id, "change", this._saveOperator);
			}
			PathMap.addEvent( "addScoreRange_"+this.id, "click", this._addScoreRange,{"fstComp":frstCompObj,"secComp":secCompObj});
		}
		var fbId = "#"+this.branchId+'RF'+this.id;
		$(fbId).remove();
		$(".editableDivTitle").remove();	
		this.populateComp(criteria);
	},
	/** Populate pathMap state  **/
	populateComp : function(criteria){
		if (criteria == 'multi'){
			var rangeIndex = 0;
			if(this.range != null && this.range.length > 0){
				for(rangeIndex in this.range){
					if(this.operators[rangeIndex] != undefined){
					  $("#selectOperator_"+this.id+"_"+this.range[rangeIndex].id).val(this.operators[rangeIndex]);
					}
				}
			}else{
				$("#selectOperator_"+this.id).val(this.operators[0]);
			}
		}		
	},
	/* Layout for list of PathMap */
	PathMapListingLayout : function(){
		var layoutHtml = '';
		layoutHtml += '<button type="button" class="btn btn-link btnBorder">'+this.pathName+'</button>';
		return layoutHtml;
	},
	/* layout to create additional path selection*/
	addOptionPath : function(e, newConditionId){
		console.log("addPath");
		/*prevent click on addPath DIV */
		if(e.target != undefined){
			if(e.target.tagName == "DIV"){
				return false;
			}
		}
		var lastPartDropdown = [];
		lastPartDropdown = $("#paths_"+this.id).find("div.Path").last().find("select.selectPart").last();
		if(lastPartDropdown.length > 0){
			var itsPartId = lastPartDropdown.val();
			if(itsPartId!=0 && itsPartId!=undefined){
				var pathId = this.paths[this.paths.length-1].getId()+1;
				if(newConditionId == undefined){
					newConditionId = this.paths[this.paths.length-1].getConditionId();
					rangeId = this.paths[this.paths.length-1].rangeId;
				}
				var pathConfig = {
						id : pathId,
						branchId : this.branchId,
						pathMapId : this.id,
						conditionId : newConditionId,
						secConditionId:2,
						rangeId : rangeId
				};
		    	var path = new Path(pathConfig);
		    	if(this.paths.length>0){
		    		this.paths.push(path);
		    	}
		    	this.setPaths(this.paths);
		    	var currentBranch = this.getCurrentBranch();
		    	currentBranch.pathLayout();
		    	path.afterLayout();
			}
		}
	},
	/* add condtion layout*/
	addCondition : function(e){
		var newConditionId = this.condition[this.condition.length-1].id + 1;
		var pathId = this.paths[this.paths.length-1].getId()+1;
		var obj = {};
		obj = {
				id: newConditionId, 
				selectConditionVal: 1, 
				authorEntryVal: ''
			  };
		this.condition.push(obj);
		var pathConfig = {
				id : pathId,
				branchId : this.branchId,
				pathMapId : this.id,
				conditionId : newConditionId
		};
    	var path = new Path(pathConfig);
    	if(this.paths.length>0){
    		this.paths.push(path);
    	}
    	this.setPaths(this.paths);
    	var currentBranch = this.getCurrentBranch();
    	currentBranch.pathLayout();
	},
	/**save the condition for inputField component in branch**/
	saveCondition : function(e){
		var conditionId = (e.currentTarget.id).split('_')[2];
		var selectConditionVal = $("#selectCondition_"+this.id+"_"+conditionId+" option:selected").val();
		var authorEntryVal = $("#authorEntry_"+this.id+"_"+conditionId).val();
		for(i in this.condition){
			if(conditionId == this.condition[i].id){
				this.condition[i].selectConditionVal = selectConditionVal;
				this.condition[i].authorEntryVal = authorEntryVal;
			}
		}
	},
	saveCriteria : function(e){
		var isFrequency=e.data.isFrequency;
		var rangeId = e.data.rangeId;
		//for scoreRange freq store 2nd criteria id into range 
		if(isFrequency){
			var rangeIndex = 0;
			for(rangeIndex in this.range){
				if(rangeId == this.range[rangeIndex].id){
					this.range[rangeIndex].idCriteriaFreq = parseInt($("#criteriaDropDown_"+this.id+"_"+rangeId+" option:selected").val());
					//this.drpDwnEditorId=this.drpDwnOptionsObject[parseInt(this.range[rangeIndex].idCriteriaFreq)-1].editor.id;
					this.drpDwnEditorId.push(this.drpDwnOptionsObject[parseInt(this.range[rangeIndex].idCriteriaFreq)-1].editor.id);
					
				}
			}
		}else{
			//in case of Table it will be cellId
			if(isNaN($("#criteriaDropDown_"+this.id+" option:selected").val())){
				this.idCriteria2 = $("#criteriaDropDown_"+this.id+" option:selected").val();
			}else{
				this.idCriteria2 = parseInt($("#criteriaDropDown_"+this.id+" option:selected").val());
			}
			
			if(this.idRangeCata2!=null && this.idRangeCata2.length>0){
				this.idRangeCata2.splice(0,1,this.idCriteria2);
				this.getDropDownLabelEditors(null, 2);
			}else{
				this.drpDwnEditorId=[];
				this.drpDwnEditorId.push(this.drpDwnOptionsObject[parseInt(this.idCriteria2)-1].editor.id);
			}
			//this.drpDwnEditorId=(this.drpDwnOptionsObject[parseInt(this.idCriteria2)-1].editor.id).slice(0);
		}
	},
	/**save the conditional operator as AND/OR in multiBranching**/
	saveOperator : function(e){
		var currentTarget = e.currentTarget.id;
		if(this.range != null && this.range.length > 0){
			var rangeIndex = currentTarget.split("_")[2];
			this.operators[rangeIndex-1] = $("#"+currentTarget+" option:selected").val();
		}else{
			this.operators[0] = $("#"+currentTarget+" option:selected").val();
		}
	},
	/**validate author entry for inputfield/table**/
	validateAuthorEntry:function(){
		var i=0;
		var validObj = {};
		validObj.status = true;
		validObj.message = "";
		for(i in this.condition){
			var authorEntryVal = this.condition[i].authorEntryVal;
			validObj.field  = "authorEntry_"+this.id+"_"+this.condition[i].id;
			/*validate author entry*/
			if(authorEntryVal==""){/*check for empty text with pathId not null */
				var k=0;
				for(k in this.paths){
					if(this.condition[i].id == this.paths[k].conditionId){
						if(this.paths[k].partId!=null || this.paths[k].compId!= null || this.paths[k].sectionId!=null){
							validObj.message = "Please enter a value for Author Entry";
							validObj.status = false;
							break;
						}
					}
				}
				if(!validObj.status){
					break;
				}
			}else{
				/*check for numeric*/
				var regePos = /^\d+(\.\d{1,6})?$/;
				if (!regePos.test(authorEntryVal)) {
					validObj.message = "Only numeric data allowed upto 6 decimals and cannot be negative";
					validObj.status = false;
					break;
				}
			}
		}
		return validObj;
	},
	/**Remove path from pathmap**/
	removePath : function(path){
		var j=0;
    	 for(j in this.paths){
			if(this.paths[j].id == path.id){
				this.paths.splice(j, 1);
			}
    	 }
	},
	/**Remove condition for input field**/
	removeCondition : function(path){
		var j=0;
	   	 for(j in this.condition){
				if(this.condition[j].id == path.conditionId){
					this.condition.splice(j, 1);
				}
	   	 }
	},
	/**Remove the current range from ranges**/
	removeRangeMulti:function(rangeId){
		var branch = null;
		var brId = this.branchId;
		 try{
		   		 branch = question.branches.filter(function(e){
	        	  		return e.id == brId;
	        	  	});
         }catch(err){
        	 branch = null;
         }
        if(branch != null && branch.length != 0){
        	var pathMapId = this.id;
        	var pathMap = null;
	        try{
		   		 pathMap = branch[0].pathMaps.filter(function(e) {
								return e.id == pathMapId;
							});
	        }catch(err){
	        	pathMap = null;
	        }
	        if(pathMap != null && pathMap.length != 0){
	        	for(var r=0;r<this.range.length;r++){
	        		if(this.range[r].id==rangeId){
	        			pathMap[0].range.splice(r,1);
	        			/*remove range wrapper os specific conditional wrapper*/
	        			var cndWrapper = $("#conditionPathWrapper_"+pathMap[0].id);
	        			if(cndWrapper.length > 0){
	        				cndWrapper.find("div#rangePathWrapper_"+rangeId ).remove();
	        			}
	    	        	//$("#rangePathWrapper_"+rangeId ).remove();
	        		}
	        	}
	        	
	        }
        }
        else{
        	if(question.tempBranch.id == brId){
        		branch = question.tempBranch;
        	}
        	if(branch != null){
        		var pathMapId = this.id;
            	var pathMap = null;
    	        try{
			   		 pathMap = branch.pathMaps.filter(function(e){
			   			 return e.id == pathMapId;
		        	 });
    	        }catch(err){
    	        	pathMap = null;
    	        }
    	        if(pathMap != null && pathMap.length != 0){
    	        	for(var r=0;r<this.range.length;r++){
    	        		if(this.range[r].id==rangeId){
    	        			pathMap[0].range.splice(r,1);
    	        			pathMap[0].operators.splice(r,1);
    	        			/*remove range wrapper os specific conditional wrapper*/
    	        			var cndWrapper = $("#conditionPathWrapper_"+pathMap[0].id);
    	        			if(cndWrapper.length > 0){
    	        				cndWrapper.find("div#rangePathWrapper_"+rangeId ).remove();
    	        			}
    	    	        	//$("#rangePathWrapper_"+rangeId ).remove();
    	        		}
    	        	}
    	        }
        	}
        }
	},
	/**Remove the current range from ranges in single criteria**/
	removeRange : function(){
		var branch = null;
		var brId = this.branchId;
		 try{
		   		 branch = question.branches.filter(function(e){
	        	  		return e.id == brId;
	        	  	});
         }catch(err){
        	 branch = null;
         }
        if(branch != null && branch.length != 0){
        	var pathMapId = this.id;
        	var pathMap = null;
	        try{
		   		 pathMap = branch[0].pathMaps.filter(function(e) {
								return e.id == pathMapId;
							});
	        }catch(err){
	        	pathMap = null;
	        }
	        if(pathMap != null && pathMap.length != 0){
	        	branch[0].removePathMap(this);
	        	$("#row_"+this.id ).remove();
	        }
        }
        else{
        	if(question.tempBranch.id == brId){
        		branch = question.tempBranch;
        	}
        	if(branch != null){
        		var pathMapId = this.id;
            	var pathMap = null;
    	        try{
			   		 pathMap = branch.pathMaps.filter(function(e){
			   			 return e.id == pathMapId;
		        	 });
    	        }catch(err){
    	        	pathMap = null;
    	        }
    	        if(pathMap != null && pathMap.length != 0){
    	        	branch.removePathMap(this);
    	        	$("#row_"+this.id ).remove();
    	        }
        	}
        	
        }
	},
	/**Add the cata answerOtion dropdown**/
	cataAnswerOptionAdd : function(event){
		var criteria=event.data.criteria;
		var compoType1=event.data.frstCompObj;
		var compoType2=event.data.secCompObj;
		var currentComp= (event.currentTarget.id.split('_'))[2];
		var optionArr=new Array();
		var compoType=(currentComp==1)?compoType1:compoType2;
		if(this.cataOptions!=null){
			optionArr=(compoType==compoType1)?this.cataOptions.slice(0):this.drpDwnOptionsObject.slice(0);
			//optionArr=this.cataOptions.slice(0);
		}else{
			optionArr=this.labelOptionsObject.slice(0);
		}
			var cataDropDownLength = (currentComp==1)?this.idRange.length:this.idRangeCata2.length;
			var conditionToCompare=(criteria=="multi")?(cataDropDownLength == optionArr.length):(cataDropDownLength == optionArr.length);
			if(conditionToCompare){
				new Modal({
                	id : 1,headingText : "Validation Error",
                  	containtText : "Can not have more options",
              	}).getWarningModal();
				return false;
			}
			var i = 0;
			for(i in optionArr){
				if(this.id != optionArr[i].id){
					if(currentComp==1){
						this.idRange.push(parseInt(optionArr[i].id));
					}else{
						this.idRangeCata2.push(parseInt(optionArr[i].id));
					}
						
						break;
				}
			}
		
			this.getDropDownLabelEditors(compoType.type,currentComp);
			var currentBranch = this.getCurrentBranch();
	    	currentBranch.pathLayout();
			this.afterLayout(this.mappingIndicatorPath,criteria,compoType1,compoType2);
	},

	/**cata answerOtion dropdown layout**/
	cataAnswerOptionLayout : function(idRangeId, id, criteria,firstCompType, secCompType,firstCompObj,secCompObj,compoType){
		var optionArr=new Array();
		var selectId=1;
		var tempId=0;
		var cmnArr=[];
		var isRepeat=false;
		var isCata=(firstCompType=="checkbox" || secCompType=="checkbox")?true:false;
		if(this.cataOptions!=null){
			optionArr=(compoType==1)?this.cataOptions.slice(0):this.drpDwnOptionsObject.slice(0);
			selectId=(compoType==1)?1:2;
			
			//optionArr=this.cataOptions.slice(0);
		}else{
			optionArr=this.labelOptionsObject.slice(0);
		}
		if(criteria!="multi"){
			compoType=1;	
		}
		
		if(idRangeId == '' ){
			return '';
		}
		var html = '';
		if(idRangeId){
			html +=	'<div class="Path" style="padding-bottom: 10px; width: 125px;" id="ans_'+this.id+'_'+id+'_'+compoType+'">';
			html += '<select id="OptionOrRange_'+this.id+'_'+id+'_'+compoType+'" style="float: left;margin-right: 5px;width: 90px" class="form-control modalSelect cataDropDown">';
			var i = 0;
			var isDisabled="";
			for(i in optionArr){
				
				if(criteria=="multi" && firstCompObj!=null &&  secCompObj!=null){
					 isDisabled=(!isCata)?(this.disableUsedOption(firstCompObj, secCompObj,i)):false;
					//isDisabled=(this.disableUsedOption(firstCompObj, secCompObj,i))?true:false;
				}
				var conditionToCheck=(firstCompType=="checkbox")?(this.id != optionArr[i].id):(this.id != optionArr[i].id || criteria=="multi");
				if(conditionToCheck){
					var selected = '';
					if(optionArr[i].id == idRangeId){
						selected = "selected";
					}
					if(!isDisabled ){
						html +='<option  value="'+optionArr[i].id+'" '+selected+'>'+optionArr[i].editor.text+'</option>';	
						//this.idCriteria2=optionArr[i].id;
						/*this.drpDwnEditorId=[];
						this.drpDwnEditorId.push(this.drpDwnOptionsObject[parseInt(this.idCriteria2)-1].editor.id);*/
					}/*else{
						html +='<option  value="'+optionArr[i].id+'" '+selected+'>'+optionArr[i].editor.text+'</option>';
					}*/
					
				}
			}
			html +='	</select>';
			/*check to display minus btn incase of second check all component */
			var isHideMinusBtn = "";
			if(secCompType == 'checkbox' && firstCompType!="checkbox" ){
				isHideMinusBtn = (this.idRange.length == 1)?"display:none":"";
			}
			html+='     <div class="minusBtn" id="del_'+this.id+'_'+id+'_'+compoType+'" style="margin-top: 3px; '+isHideMinusBtn+'">';
			html+='     	<a title="Delete option">';
			html+='         	<img class="minusBtnOption" id="minusOption_'+this.id+'_'+id+'_'+compoType+'" src="img/minus.png">';
			html+='         </a>';
			html+='     </div>';
			html +=' 	<div class="clear"></div>';
			html +='</div>';
			return html;
		}
	},

	multiCriteriaOptionLayout : function(firstCompType, secCompType,firstCompObj,secCompObj,isScoreRange,mappingIndicator,mappingIndicator_2, rangeId){
		var html ="";
		var isInputOrTable = (secCompType == "inputField" || secCompType == "table") ? true : false;
		var isCata=(firstCompType=="checkbox" || secCompType=="checkbox")?true:false;
		var paddingTop = "";
		if(isInputOrTable){
			paddingTop = "padding-top:15px;";
		}
		html +=	'<div class="colPageSectionBranch" style="padding-bottom: 10px; '+paddingTop+' width: 125px; float:left;" id="criteria2_'+this.id+'" >';
		//for frequency score range
		if((firstCompObj.feedbackScoringType=="frequency" || secCompObj.feedbackScoringType =="frequency") && isScoreRange){
			html += '<select id="criteriaDropDown_'+this.id+'_'+rangeId+'" style="float: left;margin-right: 5px;width: auto;" class="form-control modalSelect cataDropDown">';
		}else{
			html += '<select id="criteriaDropDown_'+this.id+'" style="float: left;margin-right: 5px;width: auto" class="form-control modalSelect cataDropDown">';
		}
		var i = 0;
		var value = 0;
		var tempId=0;
		var cmnArr=[];
		var isRepeat=false;
		var idCriteraArr=[];
		// fix : added isScoreRange check for mc - scoreRange(frequency) and input/table (answerOpt) 
		if(isInputOrTable && !isScoreRange){
			cmnArr=this.labelOptionsObject.slice(0);
			for(i in this.labelOptionsObject){
				var selected = '';
				tempId=this.idCriteria2;
				var isDisabled=(!isCata)?(this.disableUsedOption(firstCompObj, secCompObj,i)):false;
				isRepeat= isRepeat|| isDisabled;
				//var isDisabled=(this.disableUsedOption(firstCompObj, secCompObj,i))?true:false;
				if((parseInt(i)+1) == this.idCriteria2){
					selected = "selected";
				}
				if(!isDisabled){
					if(secCompType=="table"){
						value=parseInt(i)+1;;
						idCriteraArr.push(value);
						html +='<option value="'+value+'" '+selected+'>'+this.labelOptionsObject[i].editor.id+'</option>';
					}else{
						idCriteraArr.push(this.labelOptionsObject[i].id);
						html +='<option value="'+this.labelOptionsObject[i].id+'" '+selected+'>'+this.labelOptionsObject[i].editor.id+'</option>';
					}
				}
			}
			
			if(isRepeat && idCriteraArr.length!=0){
				this.drpDwnEditorId=[];
				this.idCriteria2=idCriteraArr[0];//tempId+1;
				this.drpDwnEditorId.push(this.drpDwnOptionsObject[parseInt(this.idCriteria2)-1].editor.id);
			}
			if(this.idCriteria2 == null){
				this.idCriteria2=idCriteraArr[0];
			}
		}else{
			var freqMappingIndicator=(firstCompObj.feedbackScoringType=="frequency")?mappingIndicator:(secCompObj.feedbackScoringType=="frequency")?mappingIndicator_2:null;
			
			for(i in this.labelOptionsObject){
				var drpDwnTxt="";
				var lableOptId=null;
				var selected = '';
				var isDisabled=(!isCata)?(this.disableUsedOption(firstCompObj, secCompObj,i)):false;
				isRepeat= isRepeat|| isDisabled;
				//var isDisabled=(this.disableUsedOption(firstCompObj, secCompObj,i))?true:false;
				if((firstCompObj.feedbackScoringType!="frequency" && secCompObj.feedbackScoringType!="frequency") && !isScoreRange){
					drpDwnTxt=this.labelOptionsObject[i].editor.text;
					lableOptId=this.labelOptionsObject[i].id;
					cmnArr=this.labelOptionsObject.slice(0);
					if(lableOptId == this.idCriteria2){
						selected = "selected";
					}
				}else{
					if(freqMappingIndicator!=null && freqMappingIndicator!="answerOption"){
						drpDwnTxt=this.labelOptionsObject[i];
						lableOptId=this.drpDwnOptionsObject[i].id;
						cmnArr=this.drpDwnOptionsObject.slice(0);
					}else{
						if(this.labelOptionsObject[i].editor == undefined){
							drpDwnTxt=this.labelOptionsObject[i];
							lableOptId=this.drpDwnOptionsObject[i].id;
							cmnArr=this.drpDwnOptionsObject.slice(0);
						}else{
							drpDwnTxt=this.labelOptionsObject[i].editor.text;
							lableOptId=this.labelOptionsObject[i].id;
							cmnArr=this.labelOptionsObject.slice(0);
						}						
					}
					if(isScoreRange){
					 if(lableOptId == this.range[rangeId -1].idCriteriaFreq){
						selected = "selected";
					 }
					}else{
						if(lableOptId == this.idCriteria2){
							selected = "selected";
						}
					}
				}
				value=parseInt(i)+1;
				if(!isDisabled){
					idCriteraArr.push(value);
					html +='<option  value="'+(value)+'" '+selected+'>'+drpDwnTxt+'</option>';
					
				}
				
			}
			if(isRepeat){
				this.drpDwnEditorId=[];
				this.idCriteria2=idCriteraArr[0];//tempId+1;
				this.drpDwnEditorId.push(this.drpDwnOptionsObject[parseInt(this.idCriteria2)-1].editor.id);
			}
			
			
		}
		html +='	</select>';
		html +=' 	<div class="clear"></div>';
		html +='</div>';
		return html;
	},
	/**Check if combination is previously used in another branch **/
	isCombinationExist2:function(firstCompObj, secCompObj,pathMap,isScoreRange){
			var mergedArr=this.labelEditorId.concat(this.drpDwnEditorId);
			currentComb=mergedArr.slice(0);
			var k=0;
				for(k in question.branches){
					var j=0;
					var fstComp=question.branches[k].firstCompObj.id;
					var secComp=question.branches[k].secCompObj.id;
					var isExist=true;
					var itsPartId="";
					var lastPartDropdownCurrent;
					var currentPartId="";
					for(j in question.branches[k].pathMaps){
						if(this.branchId!= question.branches[k].id){
							var combArr= [];
							combArr=(question.branches[k].pathMaps[j].labelEditorId).concat(question.branches[k].pathMaps[j].drpDwnEditorId);//((question.branches[k].pathMaps[j].labelEditorId).slice(0));
							//combArr.push((question.branches[k].pathMaps[j].drpDwnEditorId));
							if((firstCompObj.id==fstComp && secComp==secCompObj.id) ||(firstCompObj.id==secComp && fstComp==secCompObj.id)){
								var isMatched=true;
								if(currentComb.length==combArr.length){
									var m=0;
									for(m in currentComb){
										if(jQuery.inArray(currentComb[m],combArr ) !=-1 ){
											isMatched= isMatched && true;	
										}else{
											isMatched=false;
										}
									}
									
								}else{
									isMatched=false;
								}
								isExist= isMatched;
								lastPartDropdownCurrent= $("#paths_"+this.id).find("div.Path").last().find("select.selectPart").last();
								currentPartId = lastPartDropdownCurrent.val();
								 for(var m in question.branches[k].pathMaps[j].paths){
									 itsPartId = question.branches[k].pathMaps[j].paths[m].partId;
									 if(isExist && (itsPartId!=0 && itsPartId!="" && itsPartId!=undefined ) &&(currentPartId!=0 && currentPartId!="")){
											return false;
											break;	
										}/*else{
											isExist=false;
										}*/
								 }
								/*lastPartDropdown = $("#paths_"+question.branches[k].pathMaps[j].id).find("div.Path").last().find("select.selectPart").last();
								itsPartId = lastPartDropdown.val();
								lastPartDropdownCurrent= $("#paths_"+this.id).find("div.Path").last().find("select.selectPart").last();
								currentPartId = lastPartDropdown.val();*/
								
								/*if(isExist && (itsPartId!=0 && itsPartId!="") && (currentPartId!=0 && currentPartId!="")){
									return false;
									break;	
								}*/
							}
						
						}
					}
				
				}
				return true;
	},
	disableUsedOption:function(firstCompObj, secCompObj,i){
		//return false;
		var currentComb=[];
		var lblEditorId=(firstCompObj.type=="table")?(firstCompObj.pageIdPrefix+firstCompObj.pageId+firstCompObj.idPrefix+firstCompObj.id+this.labelEditorId[0]):this.labelEditorId[0];
		currentComb[0]=(lblEditorId);
		currentComb[1]=(this.drpDwnOptionsObject[i]!=undefined)?this.drpDwnOptionsObject[i].editor.id:null;
		var i=0;
		for(i in question.branches){
			var j=0;
			var itsPartId="";
			
			var fstComp=question.branches[i].firstCompObj.id;
			var secComp=question.branches[i].secCompObj.id;
			for(j in question.branches[i].pathMaps){
				if(this.branchId!= question.branches[i].id){
					var combArr= [];
					var isExist=false;
					if(question.branches[i].firstCompObj.type=="table"){
						var comp=question.branches[i].firstCompObj;
						combArr[0]=comp.pageIdPrefix+comp.pageId+comp.idPrefix+comp.id+(question.branches[i].pathMaps[j].labelEditorId[0]);	
					}else{
						combArr[0]=(question.branches[i].pathMaps[j].labelEditorId[0]);
					}
					//combArr[0]=(question.branches[i].pathMaps[j].labelEditorId[0]);
					combArr[1]=((question.branches[i].pathMaps[j].drpDwnEditorId[0]));
					if(firstCompObj.id==fstComp && secComp==secCompObj.id){
						isExist=(currentComb[0]==combArr[0] && currentComb[1]==combArr[1])?true:false;
						
					}else{
						if(firstCompObj.id==secComp && fstComp==secCompObj.id){
							isExist=(currentComb[0]==combArr[1] && currentComb[1]==combArr[0])?true:false;
						}
						
					}
					 for(var k in question.branches[i].pathMaps[j].paths){
						 itsPartId = question.branches[i].pathMaps[j].paths[k].partId;
						 if(isExist && (itsPartId!=0 && itsPartId!="" && itsPartId!=undefined )){
								return isExist;
								break;	
							}else{
								isExist=false;
							}
					 }
					
					
				}	
			}
				
		}
		return false;
	},
	
	cataAnswerOptionDelete: function(e){
		var rId = e.currentTarget.id.split('_');
		var fstComType=e.data.frstCompObj.type;
		var selectedVal=parseInt($("#OptionOrRange_"+rId[1]+'_'+rId[2]+'_'+rId[3]).val());
		var compoType=rId[3];
		$("#ans_"+rId[1]+'_'+rId[2]+'_'+rId[3]).remove();
		var j=0;
		if(compoType==1){
			for(j in this.idRange){
				if(this.idRange[j]==selectedVal){
					this.idRange.splice(j,1);
					break;
				}
			}	
		}else{
			for(j in this.idRangeCata2){
				if(this.idRangeCata2[j]==selectedVal){
					this.idRangeCata2.splice(j,1);
					break;
				}
			}
		}
		console.log("rId[3]"+rId[3]);
		this.getDropDownLabelEditors(null,rId[3]);
		//console,log(this.idRange.splice(indexOfDeletion,1));
		/*check to display minus btn incase of second check all component */
		if(this.idRange.length == 1 && fstComType!="checkbox"){
			var delDivCollection = $("[id^='del_"+rId[1]+"']");
			if(delDivCollection.length > 0){
				$(delDivCollection[0]).hide();
			}
		}
	},
	cataDropDown: function(e){
		var rId = e.currentTarget.id.split('_');
		var compType=rId[3];
		if(compType==1){
			this.idRange[rId[2]] = parseInt(e.currentTarget.value);	
		}else{
			this.idRangeCata2[rId[2]]=parseInt(e.currentTarget.value);	
		}
		
		var fstComType=e.data.frstCompObj.type;
		this.getDropDownLabelEditors(fstComType,compType);
	},
	/**add  the  range to ranges**/
	addScoreRange : function(e){
		var isFreq=(e.data.fstComp.feedbackScoringType == "frequency" || e.data.secComp.feedbackScoringType == "frequency")?true:false;
		
		var newConditionId = null;
		/*prevent click on addPath DIV */
		if(e.target != undefined){
			if(e.target.tagName == "DIV"){
				return false;
			}
		}
		/*check for marker length for frequency case*/
		if(this.drpDwnOptionsObject!=null){
			if(isFreq && (this.range.length >= this.drpDwnOptionsObject.length)){
				new Modal({
	            	id : 1,headingText : "Validation Error",
	              	containtText : "Can not have more score ranges",
	          	}).getWarningModal();
				return false;
			}
		}

		
		var lastPartDropdown = [];
		lastPartDropdown = $("#paths_"+this.id).find("div.Path").last().find("select.selectPart").last();
		if(lastPartDropdown.length > 0){
			var itsPartId = lastPartDropdown.val();
			//if(itsPartId!=0 && itsPartId!=undefined){
				var pathId = this.paths[this.paths.length-1].getId()+1;
				var rangeId=this.range[this.range.length-1].id + 1;
				
				var rangeConfig = {
		    			id:rangeId,
						pathMapId:this.id,
						componentId :this.branchId,
						componentIdPrefix :"B"
					};
		/*		if(this.condition.length!=0){
					var conditionId=this.condition[this.condition.length-1].id+1;
					var conditionConfig={
							id: conditionId, 
							selectConditionVal: 1, 
							authorEntryVal: ''
						
					};
					this.condition.push(conditionConfig);	
				}

			
				if(newConditionId == undefined){
					newConditionId = this.paths[this.paths.length-1].getConditionId();
				}*/
				var range = new BranchRange(rangeConfig);
				this.range.push(range);
				this.operators.push("and");
				var pathConfig = {
						id : pathId,
						branchId : this.branchId,
						pathMapId : this.id,
						//conditionId : newConditionId,
						rangeId : rangeId
				};
		    	var path = new Path(pathConfig);
		    	if(this.paths.length>0){
		    		this.paths.push(path);
		    	}
		    	this.setPaths(this.paths);
		    	var currentBranch = this.getCurrentBranch();
		    	currentBranch.pathLayout();
			//}
		}
	},
	/**Get the current branch from branches**/
	getCurrentBranch : function(){
		var currentBranch=null;
		var branch = null;
		var brId = this.branchId;
		 try{
		   		 branch = question.branches.filter(function(e){
	        	  		return e.id == brId;
	        	  	});
         }catch(err){
        	 branch = null;
         }
        if(branch != null && branch.length != 0){
        	currentBranch = branch[0];
        }
        else{
        	if(question.tempBranch.id == brId){
        		branch = question.tempBranch;
        	}
        	if(branch != null){
        		currentBranch = branch;
        	}
        }
        return currentBranch;
	},
	/**Get the array of editors for combination in branching **/
	getDropDownLabelEditors:function(compoType,cata){
		if(this.cataOptions!=null ){
			var drpDwnOpts=[];
			var i=0;
			if(cata==1){
				for(i in this.cataOptions){
					if(jQuery.inArray( this.cataOptions[i].id,this.idRange ) !=-1 ){
						drpDwnOpts.push(this.cataOptions[i].editor.id);
					}
					
				}
				this.labelEditorId=drpDwnOpts.slice(0);
			}else if(cata==2){
				var i=0;
				for(i in this.drpDwnOptionsObject){
					if(jQuery.inArray( this.drpDwnOptionsObject[i].id,this.idRangeCata2 ) !=-1 ){
						drpDwnOpts.push(this.drpDwnOptionsObject[i].editor.id);
					}
					
				}
				this.drpDwnEditorId=drpDwnOpts.slice(0);
			}
		
		/*	if(compoType=="checkbox"){
				this.labelEditorId=drpDwnOpts.slice(0);	
			}else{
				this.drpDwnEditorId=drpDwnOpts.slice(0);	
			}*/
			
		}else{
			var drpDwnOpts=[];
			var i=0;
			for(i in this.drpDwnOptionsObject){
				if(jQuery.inArray( this.drpDwnOptionsObject[i].id,this.idRange ) !=-1 ){
					drpDwnOpts.push(this.drpDwnOptionsObject[i].editor.id);
				}
				
			}
			this.drpDwnEditorId=drpDwnOpts.slice(0);
		}
	},
	validatePathMap:function() {
		var currentComb=[];
		currentComb[0]=(this.labelEditorId);
		currentComb[1]=(this.drpDwnOptionsObject[i]!=undefined)?this.drpDwnOptionsObject[i].editor.id:null;	
		if(firstCompObj.id==fstComp && secComp==secCompObj.id){
			isExist=(currentComb[0]==combArr[0] && currentComb[1]==combArr[1])?true:false;
			
		}
	}
	
};