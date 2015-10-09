var Branch = function(options){
	this.id = null;			  //branch id
	this.idPrefix = "B";
	this.cId = null;		  //component id for which branching is required
	this.sectionId = null;  //section id for which branching is required
	this.cId_2 = null;		  //component id of second component used in multibranching for which branching is required
	this.sectionId_2 = null;  //section id of second component used in multibranching for which branching is required
	this.firstCompType = "";
	this.secCompType = "";
	this.firstCompObj={};
	this.secCompObj={};
	this.pageId = null;			//Active page id from which source components are used
	this.pathName = null;
	this.criteria = "single";			 		//by default single criteria will be selected
	this.mappingIndicator = 0;		//or scoreRange will be option by default answer option will be branching base
	this.mappingIndicator_2 = 0;		//or scoreRange will be option by default answer option will be branching base
	this.pathMaps = [];
	this.isScoreRange=false;
	//this.destinations = [];	
	
	//store destination paths 
	this.cataAnswerOption = false;		//flag to check selected component is CATA
	this.activePageComp = null;	
	$.extend(this,options);
	this.editor = new Editor({id:this.idPrefix+this.id});
	this._createPathMap = Branch.BindAsEventListener(this,this.createPathMap);
	this._updateComponentList = Branch.BindAsEventListener(this,this.updateComponentList);
	this._updateSectionList = Branch.BindAsEventListener(this,this.updateSectionList);
	this._saveBranch = Branch.BindAsEventListener(this,this.saveBranch);
	this._addNewRange = Branch.BindAsEventListener(this,this.addNewRange);
	this._update = Branch.BindAsEventListener(this,this.update);
	this._editBranch = Question.BindAsEventListener(this, this.editBranch);
	this._cancelCreatePath = Question.BindAsEventListener(this, this.cancelCreatePath);
	this._selectCriteria = Question.BindAsEventListener(this, this.selectCriteria);
};

Branch.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
Branch.addEvent1 = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).one(sEventType,args,fnHandler);
};
//add event helper method by class name
Branch.addEventByClassName = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
Branch.BindAsEventListener = function(object, fun) {
    return function(event) {
	    if(event.target.nodeName=='div'||event.target.nodeName=='DIV') {    
	    	event.stopImmediatePropagation();
	    }
        return fun.call(object, (event || window.event));
    };
};

Branch.prototype = {
	/** Get and set the current id of componet for which we are creating brancging **/
	getCid: function(){
		return this.cId;
	},
	setCid: function (id) {
		this.cId = id;
	},
	/** Get and set the current id of componet for which we are creating brancging **/
	getCid_2: function(){
		return this.cId_2;
	},
	setCid_2: function (id) {
		this.cId_2 = id;
	},
	/** create and set new path id for created branch **/
	getId: function(){
		return this.id;
	},
	setId: function(pathid){
		this.id = pathid;
	},
	/** Get and set name of the branching **/
	getPathName: function(){
		return pathName;
	},
	setPathName: function(pathname){
		this.pathName = pathname;
	},
	/** single or multi criteria **/
	getCriteria: function(){
		return this.criteria;
	},
	setCriteria: function(criteria){
		this.criteria = criteria;
	},
	/*branching base either answer option or range base mapping*/
	getMappaingIndicator_1: function(){
		return this.mappingIndicator;
	},
	setMappaingIndicator_1: function(indicator){
		this.mappingIndicator = indicator;
	},
	/* branching base either answer option or range base mapping*/
	getMappaingIndicator_2: function(){
		return this.mappingIndicator_2;
	},
	setMappaingIndicator_2: function(indicator){
		this.mappingIndicator_2 = indicator;
	},
	/** Get and set name of the branching **/
	getPathMaps: function(){
		return pathMaps;
	},
	setPathMaps: function(pathMaps){
		this.pathMaps = pathMaps;
	},
	
	update : function(){
		this.editor.update();
	},
	/* Function to create  branch Layout for author in design mode. */
	layout: function(){
		var oldBranch = this;
		if($("#branchEdit").val() != ""){
			oldBranch = this.getBranchFromLocalStorage();
		}
		var html = "";
		var isFrequency = false;
		var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
		html += '<div class="modal-dialog customModalWidth">';
		html +=		'<div class="modal-content">';
      	html +=			'<div class="" style="border-right:1px solid #000;height:100%;width:1px;position:absolute;left:14%;"></div>';
		html +=			'<div class="modal-body" style="padding-left:0px;">';
		html +='			<div style="padding: 7px 0; text-align:center; background:#ccc;">Path Logic</div>';
		html +=				'<button type="button" id="closeModal" class="close buttonClose" data-dismiss=""><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
		html +=     		'<div class="container" style="padding-left:0px;">';
        html +=					'<div class="col-sm-2 scroll-col-2">';
		html +=						'<p><strong>Existing paths:</strong></p>';
		html +=						'<div id="branchList">';
		if(question.branches.length > 0){
        	var k=0;
        	for( k in question.branches){
        		html += '				<button id="edit'+question.branches[k].id+'" type="button" class="btn btn-link btnBorder editBranch">'+question.branches[k].pathName+'</button>';
        	}
        }else{
        	html += "No existing paths";
        }
		html +='					</div>';
		html +='				</div>';
		html +='				<div class="col-sm-9 customCol9">';
		html +='					<div class="row" style="padding-top: 15px;">';
		html +='						<div class="col-sm-8 no-rightMargin">';
		html +='							<div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" class="form-control full-width "  '+dataDivAttr+' id="'+this.editor.id+'" data-placeholder="New path name">'+this.editor.text+'</div>';
		html +='						</div>';
		html +='						<div class="col-sm-4 no-leftMargin">';
		html +='							<div class="checkbox no-topMargin adjustRadio">';
		html +='								<label><input type="radio" class="my-modal-radio" id="single_'+this.id+'" name="criteria" value="single">&nbsp;&nbsp;Single Criteria</label>';
		html +='							</div>';
		
		/*to enable/disable multicriteria radio button*/
		var activePageCompLength = question.activePage.components.length;
		
		
		var isEnabled=false;
		if(question.activePage.components.length==1 && question.activePage.components[0].type!="table" && question.activePage.components[0].type!="scale"){
			isEnabled=(question.activePage.components[0].sections.length>1)?true:false;
		}
		var enableDisableAttr = (activePageCompLength==1 && !isEnabled)?"disabled='disabled'":"";
		
		html +='							<div class="checkbox adjustRadio">';
		html +='								<label><input type="radio" class="my-modal-radio" id ="multi_'+this.id+'" name="criteria" value="multi" '+enableDisableAttr+' >&nbsp;&nbsp;Multi Criteria </label>';
		html +='							</div>';
		html +='						</div>';
		var  index = 0;
		
		var criteriaCnt = this.criteria == "multi" ? 2 : 1;
		
		for(index = 1; index <= criteriaCnt; index++){
			html +='						<div class="col-sm-6 ">';
			html +='							<select id="selectComponent_'+index+'" class="form-control modalSelect">';
			html +='								<option value="0" type="">Select Component/Section</option>';
			
			var i =0;
			// in edit mode check for page from which branched component belongs
			if(this.pageId != null){
				//console.log("setActivePage");
				for(var j in question.pages){
					if(question.pages[j].id == this.pageId){
						//console.log("setActivePage"+j);
						this.activePageComp = question.pages[j].components;
					}
				}
			}
			else{
				//console.log("setActivePage else");
				this.activePageComp = question.activePage.components;
			}
			//set all components from active page to src component dropdown
			for( i in this.activePageComp){
				if(this.activePageComp[i].subType != 'label' || this.activePageComp[i].type == "table"){
					var compType=this.activePageComp[i].type=='checkbox'?"Check All That Apply":this.activePageComp[i].type=='multiplechoice'?"Multiple Choice":this.activePageComp[i].type=='scale'?"Scales":this.activePageComp[i].type=='table'?"Table":"Input and Labels";
					if(this.activePageComp[i].type=='multiplechoice')
						compType = this.activePageComp[i].subType=="dropdown" ? " Dropdown" : this.activePageComp[i].subType=="radio" ? " Radio button" : "";
					var compId = this.activePageComp[i].pageIdPrefix
								+ this.activePageComp[i].pageId
								+ this.activePageComp[i].idPrefix 
								+ this.activePageComp[i].id;
					if(this.cId == compId && this.activePageComp[i].feedbackScoringType == 'frequency'){
						isFrequency = true;
					}
					try{
						//check if more than one sections the display sections else only component name into src dropdown
						if(this.activePageComp[i].sections.length > 1){
								var isValidComp = ((compId == this.cId || compId == oldBranch.cId) 
   								|| (compId == this.cId_2 || compId == oldBranch.cId_2)
   								|| (!this.activePageComp[i].isBranched));
				 				var checkCondition=(this.criteria=="multi")?true:isValidComp;
				 				var isRangeBased=(this.activePageComp[i].feedbackType == 'rangedBased')?true:false;
				 				if(checkCondition){
				 					html +=	'			<option type="'+compType+'" value="'+compId+'_'+0+'" ><label style="float:left">'+compType+'</label><label style="float:right">&nbsp;&nbsp;&nbsp;ID# '+compId+'</label></option>';
				 				}
						}
				 	
			    	   	if(this.activePageComp[i].sections.length > 1){
			    	   		var j = 0;
			    	   		for(j in this.activePageComp[i].sections){
			    	   			var section = this.activePageComp[i].sections[j];
			    	   			var isEdit=false;
								
								for(var k in question.branches){
									if(this.id== question.branches[k].id){
										isEdit=true;
										}	
									}
			    	   			//display all components which are not already branched and component used in currrent branch
			    	   			var isValidComp = (((compId == this.cId || compId == oldBranch.cId) 
			    	   					&& (section.id == this.sectionId || section.id == oldBranch.sectionId) )
			    	   					|| ((compId == this.cId_2 || compId == oldBranch.cId_2) 
					    	   					&& (section.id == this.sectionId_2 || section.id == oldBranch.sectionId_2)))
			    	   					|| (!section.isBranched) ||  (!this.activePageComp[i].isBranched);
			    	   			var checkCondition=(this.criteria=="multi")?true:(isValidComp &&  (!this.activePageComp[i].isBranched) &&(!isEdit));
			    	   			checkCondition=(isEdit || checkCondition)?true:false;
			    	   			if(checkCondition){
									html +=	'		<option type="'+compType+'" value="'+compId+'_'+this.activePageComp[i].sections[j].id+'"><label style="float:left">'+compType+'</label><label style="float:right">&nbsp;&nbsp;&nbsp;ID# '+compId+this.activePageComp[i].sections[j].idPrefix+this.activePageComp[i].sections[j].id+'</label></option>';
			    	   			}
			    	   		}
			    	   	} else{
			    	   		var isValidComp = ((compId == this.cId || compId == oldBranch.cId) 
			    	   								|| (compId == this.cId_2 || compId == oldBranch.cId_2)
			    	   								|| (!this.activePageComp[i].isBranched));
			    	   		var checkCondition=(this.criteria=="multi")?true:isValidComp;
							if(checkCondition){
								html +=	'			<option type="'+compType+'" value="'+compId+'_1" ><label style="float:left">'+compType+'</label><label style="float:right">&nbsp;&nbsp;&nbsp;ID# '+compId+'</label></option>';
		    	   			}
			    	   	}
			    	} catch(e){
			    		var isValidComp = ((compId == this.cId || compId == oldBranch.cId) 
   								|| (compId == this.cId_2 || compId == oldBranch.cId_2)
   								|| (!this.activePageComp[i].isBranched));
			    		var checkCondition=(this.criteria=="multi")?true:isValidComp;
			    		if(checkCondition){
			    			html +=	'				<option type="'+compType+'" value="'+compId+'_1" ><label style="float:left">'+compType+'</label><label style="float:right">&nbsp;&nbsp;&nbsp;ID# '+compId+'</label></option>';
		   				}
			    	}
				}
			}
			
			html +=	'							</select>';
			html +=	'						</div>';
			html +=	'						<div class="col-sm-6">';
			html +=	'							<select id="pathMap_'+index+'" class="form-control  modalSelect" disabled>';
			html +=	'								<option value="0">Select path mapping indicator</option>';
			html +=	'								<option value="answerOption">Answer options</option>';
			html +=	'								<option value="scoreRange" disabled>Score range</option>';
			html +=	'							</select>';
			html +=	'							<div id="scoreRangeText_'+index+'" style="display:none;">Selected component score range: <span id="rangeLimits_'+index+'"></span> .</div>';
			html +=	'						</div>';
	
		}
		html +=	'						</div>';
		
		if(this.pathMaps.length>0){
			var pathMpngHtml = '';
			pathMpngHtml +=	'					<div class="row">';
			pathMpngHtml +=	'						<div class="panel panel-primary customPanel">';
			pathMpngHtml +=	'							<div class="panel-heading blueBg">Path Mapping</div>';
			pathMpngHtml +=	'							<div class="" style="height: 100%; width: 1px; position: absolute; left: 20%; border-right: 1px solid rgb(238, 238, 238);"></div>';
			
			var hideIt = (this.firstCompType == "inputField" || this.secCompType == "inputField" || this.firstCompType == "table" || this.secCompType == "table" || this.criteria=="multi")?' ':' display:none;';
			var marginIt = (this.firstCompType == "inputField" || this.secCompType == "inputField" || this.firstCompType == "table" || this.secCompType == "table" || this.criteria=="multi")?'':'marginIt';
			var display=(this.criteria=="multi")?' visibility:hidden;':' display:none;';
			var hideAuthor=((this.firstCompType == "inputField" || this.secCompType == "inputField" || this.firstCompType == "table" || this.secCompType == "table") && this.criteria=="multi")?' ':((this.firstCompType == "inputField" || this.firstCompType == "table") && this.criteria!="multi")?' ':display;
			pathMpngHtml +=	'							<div class="headingRow">';
			pathMpngHtml +=	'								<div id="MappingIndicator" class="col-sm-4 right-border smallFont no-bottom-border">Answer Options</div>';
			pathMpngHtml +=	'								<div id="conditionText" style="margin-left: 8px;  width: 80px !important; '+hideIt+'" class="col-sm-4 right-border smallFont no-bottom-border ">Condition</div>';
			pathMpngHtml +=	'								<div id="authorEntryText" class="col-sm-4 right-border smallFont1 no-bottom-border" style=" '+hideAuthor+'">Author entry</div>';
			pathMpngHtml +=	'								<div class="col-sm-4 smallFont1 no-bottom-border '+marginIt+'">Select Part</div>';
			pathMpngHtml +=	'								<div class="col-sm-4 smallFont2 no-bottom-border">Select Component</div>';
			pathMpngHtml +=	'								<div class="col-sm-4 smallFont no-bottom-border">Select Section</div>';
			pathMpngHtml +=	'							</div>';
			pathMpngHtml +=	'						</div>';
			pathMpngHtml +=	'					</div>';
							
			html += pathMpngHtml;
			var k =0;
			html += '	<div id="mappingContainer" class="">';
			if(this.mappingIndicator == "answerOption" || isFrequency){
				html += this.getOptionText();
				html += '</div>';
			} else{
				for(;k<this.pathMaps.length;k++){
					if(k < 3 || isFrequency){
						html += this.pathMaps[k].layout(this.mappingIndicator,this.mappingIndicator_2, false, this.criteria, "", "", this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
					}
					else{
						html += this.pathMaps[k].layout(this.mappingIndicator,this.mappingIndicator_2, true, this.criteria, "", "", this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
					}
				}
				html += '					</div>';
				if(this.criteria!="multi"){
					html +=	'					<div id="rowAddRange" class="row rowCustom">';
					html +=	'						<div class="col-sm-4" style="padding-left: 20px;vertical-align: middle;">';
					html +=	'							<span style="padding-left: 0px;" class="glyphicon glyphicon-plus-sign customColor"></span>';
					html +=	'							<button id="addRange" data-PathCount="1" class="btn btn-link smallFont btnwidth" type="button">Add ScoreRange</button>';
					html +=	'						</div>';
					html +=	'					</div>';
				}
			}
			html +=	'						<button id="branchSave" class="btn btn-primary pull-right footer-buttons controlButtons saveButton" type="button">save</button>';
			html += '				</div>';
		}
		html += '	</div>';
		$("#myModal").html(html);
	},
	/**
	 * adds events to Branch object after the design layout
	 */
	afterLayout:function(){
		this.populateComp();
		Branch.addEvent( "pathMap_1", "change", this._createPathMap);
		this.criteria=="multi"?Branch.addEvent( "pathMap_2", "change", this._createPathMap):"";
		Branch.addEvent( "selectComponent_1", "change", this._createPathMap);
		this.criteria=="multi"?Branch.addEvent( "selectComponent_2", "change", this._createPathMap):"";
		
		Branch.addEvent( "closeModal", "click", this._cancelCreatePath);
		
		Branch.addEvent( this.editor.id, "blur", this._update);
		 for(var k in this.pathMaps){
			this.pathMaps[k].afterLayout(this.mappingIndicator, this.criteria,this.firstCompObj,this.secCompObj);
		 }
		 if(this.mappingIndicator == "scoreRange"){
		 	$("#MappingIndicator").text("Score range");
			 Branch.addEvent( "addRange", "click", this._addNewRange);
		 }
		
		Branch.addEvent1( "branchSave", "click", this._saveBranch);
		Branch.addEventByClassName("editBranch", "click", this._editBranch);
		Branch.addEvent( "single_"+this.id, "click", this._selectCriteria);
		Branch.addEvent( "multi_"+this.id, "click", this._selectCriteria);
	},
	 /**
     * populate Branch properties and current states
     */
	populateComp:function(){  
		var cntBranchableComp = 0;
		if(this.cId != null){
			$("#selectComponent_1").val(this.cId+"_"+this.sectionId);
			$("#pathMap_1").removeAttr("disabled");
		}
		if(this.cId_2 != null){
			$("#selectComponent_2").val(this.cId_2+"_"+this.sectionId_2);
			$("#pathMap_2").removeAttr("disabled");
		}
		if(this.criteria=="single"){
			$("#single_"+this.id).prop("checked",true);

		}else{
			$("#multi_"+this.id).prop("checked",true);
		}
	
		for( i in this.activePageComp){
			if(this.activePageComp[i].subType != 'label' || this.activePageComp[i].type == "table"){
				cntBranchableComp++;
			}
			var component = this.activePageComp[i];
			var cmpId = component.pageIdPrefix + component.pageId + component.idPrefix + component.id;
			var index = 0;
			criteriaCnt = this.criteria == "multi" ? 2 : 1;
			var val="";
			var val2="";
			var compo1="";
			var compo2="";
			var disabled=((this.mappingIndicator=="scoreRange" || this.mappingIndicator_2=="scoreRange")&& (this.activePageComp[i].type=="scale" ||this.activePageComp[i].feedbackType != "standard" && this.activePageComp[i].feedbackType != undefined))?"disabled":"";
			
			for(index = 1; index <= criteriaCnt; index++){
				if(cmpId == this.cId || cmpId == this.cId_2){
					if(cmpId == this.cId){
						this.firstCompType = this.activePageComp[i].type;
						this.firstCompObj=this.activePageComp[i];
						val=this.cId+"_"+this.sectionId;
						compo1=$("#selectComponent_"+1+" option[value='"+val+"']").text().split("#")[1].trim().split("G")[1];
						//this.firstCompObj.feedbackScoringType=this.activePageComp[i].feedbackScoringType;
					}
					if(cmpId == this.cId_2){
						this.secCompType = this.activePageComp[i].type;
						this.secCompObj=this.activePageComp[i];
						val2=this.cId_2+"_"+this.sectionId_2;
						compo2=$("#selectComponent_"+2+" option[value='"+val2+"']").text().split("#")[1].trim().split("G")[1];
						//this.secCompObj.feedbackScoringType=this.activePageComp[i].feedbackScoringType;
					}
					var currentIndex = 0;
					if(cmpId == this.cId){
						currentIndex = 1;
					}else{
						currentIndex = 2;
					}
					
					if(this.cId==this.cId_2){
						if(this.sectionId == null ||  this.sectionId != null && this.sectionId == this.sectionId_2){
							var dat=this;
							var closeActionFunction = function(){
								if(dat.cId==dat.cId_2){
									console.log("close action;"+dat.cId+""+dat.cId_2);
									$("#selectComponent_"+dat.currentCriteria).val(0);
									return false;	
								}
							};
							question.displayMessageModal("Validation Error", "Same component cannot be used ", closeActionFunction);
						}else if(this.sectionId == null ||  this.sectionId != null &&(this.sectionId ==0 || this.sectionId_2==0)){
							var dat=this;
							var closeActionFunction = function(){
								if(dat.cId==dat.cId_2){
									console.log("close action;"+dat.cId+""+dat.cId_2);
									$("#selectComponent_"+dat.currentCriteria).val(0);
									return false;	
								}
							};
							question.displayMessageModal("Validation Error", "Same component cannot be used ", closeActionFunction);
						}
					}
					//Smita :Author changes
					if(this.firstCompObj.sections != undefined)
					{
						if(compo1==undefined &&  this.firstCompObj.type!="scale" && this.firstCompObj.sections.length>1 ){
							$("#pathMap_"+1+" option[value='answerOption']").prop('disabled','disabled');
						}else if(this.secCompObj.sections != undefined)
								{							
									if( compo2==undefined  &&  this.firstCompObj.type!="scale" && this.secCompObj.sections.length>1){
									$("#pathMap_"+2+" option[value='answerOption']").prop('disabled','disabled');
								}
						}
						if(this.firstCompObj.type=="inputField" && compo1==undefined && this.firstCompObj.sections.length>1){
							$("#pathMap_"+1+" option[value='answerOption']").prop('disabled','disabled');
						}
						if(this.secCompObj.sections != undefined)
						{	
						if(this.secCompObj.type=="inputField" && compo2==undefined && this.secCompObj.sections.length>1){
						  $("#pathMap_"+2+" option[value='answerOption']").prop('disabled','disabled');	
						}
						}
					}
					
					if(component.type=="scale"){
						if(this.firstCompType=="scale" && this.mappingIndicator=="scoreRange"){
							//$("#selectComponent_"+1+" option").removeAttr('disabled');
							//$("#selectComponent_"+2+" option[type='Scales']").prop('disabled','disabled');	
						}
						if(this.secCompType=="scale" && this.mappingIndicator_2=="scoreRange"){
							//$("#selectComponent_"+2+" option").removeAttr('disabled');
							//$("#selectComponent_"+1+" option[type='Scales']").prop('disabled','disabled');
						}
						
						$("#pathMap_"+currentIndex+" option[value='answerOption']").prop('disabled','disabled');
						if((this.secCompType=="scale" && this.mappingIndicator=="scoreRange")||(this.firstCompType=="scale" && this.mappingIndicator_2=="scoreRange") ){
							$("#pathMap_"+currentIndex+" option[value='scoreRange']").prop('disabled','disabled');	
						}else{
							$("#pathMap_"+currentIndex+" option[value='scoreRange']").removeAttr('disabled');
						}
						
					}else if((component.type=="multiplechoice" || component.type=="checkbox")){
						if(this.firstCompObj.feedbackType != "standard" && !disabled && this.firstCompObj.feedbackType != undefined){//this.firstCompObj.feedbackType
							$("#pathMap_"+1+" option[value='scoreRange']").removeAttr('disabled');
							
						} if(this.secCompObj.feedbackType != "standard" && !disabled &&  this.secCompObj.feedbackType != undefined){
							$("#pathMap_"+2+" option[value='scoreRange']").removeAttr('disabled');
						}
					
					}
					if(component.type=="checkbox" && this.mappingIndicator=="answerOption"){
						this.cataAnswerOption = true;
					 }else{
						 this.cataAnswerOption = false;
					 }
	 			 	if(this.mappingIndicator == "scoreRange"){
						currentIndex = 1;
					}else if(this.mappingIndicator_2 == "scoreRange"){
						currentIndex = 2;
					}else{
						currentIndex = 0;
					}
	    			 if(currentIndex != 0){
	    				 if((currentIndex == 1 && this.cId == cmpId) || (currentIndex == 2 && this.cId_2 == cmpId) && (compo1==undefined || compo1=="") && (compo2==undefined || compo2=="")){
	    					 $("#scoreRangeText_"+currentIndex).show();
		    				 $("#MappingIndicator_"+currentIndex).text("Score range");
		    				 var rangeLimits = component.minPoint+"-"+component.maxPoint;
		    				 $("#rangeLimits_"+currentIndex).text(rangeLimits);
	    				 }
	    				 
	    		 		 if(currentIndex == 1 && this.cId == cmpId){
	    					 if(this.firstCompObj.sections!=undefined && this.firstCompObj.sections.length>1 && compo1!=undefined){
	    						 $("#scoreRangeText_"+currentIndex).show();
			    				 $("#MappingIndicator_"+currentIndex).text("Score range");
			    				 var sectionId=compo1;//parseInt(compo1.split("G")[1]);
			    				 var score=this.displaySectionScore(sectionId,this.firstCompObj);
			    				 var rangeLimits = score.minPoint+"-"+score.maxPoint;
			    				 $("#rangeLimits_"+currentIndex).text(rangeLimits);
			    				 $("#scoreRangeText_"+currentIndex).text("Selected section score range: "+rangeLimits);
	    					 }
	    					 
	    				 } 
						 if(currentIndex == 2 && this.cId_2 == cmpId){
	    					 if(this.secCompObj.sections!=undefined && this.secCompObj.sections.length>1 && compo2!=undefined){
	    						 $("#scoreRangeText_"+currentIndex).show();
			    				 $("#MappingIndicator_"+currentIndex).text("Score range");
			    				 var sectionId=compo2;//parseInt(compo1.split("G")[1]);
			    				 var score=this.displaySectionScore(sectionId,this.secCompObj);
			    				 var rangeLimits = score.minPoint+"-"+score.maxPoint;
			    				 $("#rangeLimits_"+currentIndex).text(rangeLimits);
			    				 $("#scoreRangeText_"+currentIndex).text("Selected section score range: "+rangeLimits);
	    					 }
	    					 
	    				 } 
	    			 }
	    			 if(component.feedbackScoringType == "frequency"){
	    				 $("#rowAddRange").hide();
	    			 	 $("#scoreRangeText_"+currentIndex).hide();
	    			 }
	    		 }
			}
			if(this.mappingIndicator != 0){
		 		$("#pathMap_1").val(this.mappingIndicator);
		 	 }
			 if(this.mappingIndicator_2 != 0){
		 		$("#pathMap_2").val(this.mappingIndicator_2);
		 	 }
		 }
		if(cntBranchableComp < 1){
			$("#multi_"+this.id).attr('disabled', "disabled");
		}
    },
    displaySectionScore:function(sectionId,comp){
    	for(s in comp.sections){
    		if(comp.sections[s].id==sectionId){
    			return comp.calculateMinMaxFrSection(comp.sections[s]);
    		}
    	}
    },
    //update the component type and 1st and 2nd component for branch editmode
    updateCompoObj:function(){
		    for (i in this.activePageComp) {
		    var component = this.activePageComp[i];
			var cmpId = component.pageIdPrefix + component.pageId
					+ component.idPrefix + component.id;
			if (cmpId == this.cId) {
				this.firstCompType = this.activePageComp[i].type;
				this.firstCompObj = this.activePageComp[i];

			}
			if (cmpId == this.cId_2) {
				this.secCompType = this.activePageComp[i].type;
				this.secCompObj = this.activePageComp[i];
			}
		}

    },
    updatePathMapOnDelete:function(){
    	
    },
    // set comp Id, mapping indicator and create pathmap
	createPathMap : function(e){
		var criteriaIndex = (e.currentTarget.id).split("_")[1];
		/* compoent section id selected here*/
		this.currentCriteria=criteriaIndex;
		var selectedOption = $("#selectComponent_"+criteriaIndex).val();
		if(e.currentTarget.id == "selectComponent_"+criteriaIndex){
			$("#pathMap_"+criteriaIndex).val(0);
			this.pathMaps = [];
			if(criteriaIndex == 1){
				if(selectedOption != 0){
					var iDs = selectedOption.split('_');
					this.cId = iDs[0];
					if(iDs[1]){
						this.sectionId = iDs[1];
					}/* else{
						this.sectionId = 1;
					} */
				}
				else{
					this.cId = null;
					this.sectionId = null;			
				}
				
			}else{
				if(selectedOption != 0){
					var iDs = selectedOption.split('_');
					this.cId_2 = iDs[0];
					if(iDs[1]){
						this.sectionId_2 = iDs[1];
					}/* else{
						this.sectionId_2 = 1;
					} */
				}
				else{
					this.cId_2 = null;
					this.sectionId_2 = null;			
				}
			}
			$("#pathMap_"+criteriaIndex).trigger("change");
		}
		else{
			if(criteriaIndex == 1){
				this.mappingIndicator = $("#pathMap_"+criteriaIndex).val();
			}else{
				this.mappingIndicator_2 = $( "#pathMap_"+criteriaIndex).val();
			}
			if(this.mappingIndicator == 0 || this.mappingIndicator_2 == 0){
				this.pathMaps = [];
			}
		}
		if(selectedOption == 0){
			$("#pathMap_"+criteriaIndex).prop('disabled', 'disabled');
		} else{
			$("#pathMap_"+criteriaIndex).removeAttr("disabled");
		}
		for( i in this.activePageComp){
			var cmpId = this.activePageComp[i].pageIdPrefix
						+ this.activePageComp[i].pageId
						+ this.activePageComp[i].idPrefix
						+ this.activePageComp[i].id;
			var index = 0;
			var criteriaCnt = this.criteria == "multi" ? 2 : 1;
			for(index = 1; index <= criteriaCnt; index++){
				if(cmpId == this.cId || cmpId == this.cId_2){
					if(cmpId == this.cId){
						this.firstCompType = this.activePageComp[i].type;
		    		} 
		    		if(cmpId == this.cId_2){
		    			 this.secCompType = this.activePageComp[i].type;
		    		}
				 	var component = this.activePageComp[i];
				 	if(component.type=="scale"){
				 		$("#pathMap_"+criteriaCnt+" option[value='answerOption']").prop('disabled','disabled');
				 	}else if(component.type == "multiplechoice" || component.type == "checkbox"){
				 		$("#pathMap_"+criteriaCnt+" option[value='scoreRange']").prop('disabled','disabled');
					 	if(component.feedbackType != "standard"){
					 		$("#pathMap_"+criteriaCnt+" option[value='scoreRange']").removeAttr('disabled');
					 	}
					}
					if(component.type == "checkbox" && this.mappingIndicator == "answerOption"){
						this.cataAnswerOption = true;
					}else{
						this.cataAnswerOption = false;
					}
				}
			}
	    }
		if(this.criteria == "single"){
			$("#mappingContainer").html(this.singleCriteriaPathLayout());
			this.isScoreRange = this.mappingIndicator=="scoreRange" ? true : false;
		}else{
			/* validation for same component/section id in both dropdown*/
		/*	var otherSelectedOption = 0;
			if(criteriaIndex == 1){
				otherSelectedOption = $("#selectComponent_2").val();
			}else{
				otherSelectedOption = $("#selectComponent_1").val();
			}
			 check for selected components 
			if(selectedOption!=0 || otherSelectedOption!=0){
				if(selectedOption == otherSelectedOption){
					var closeActionFunction = function(){
						$("#selectComponent_"+criteriaIndex).val(0);
					};
					question.displayMessageModal("Validation Error", "Same component cannot be used ", closeActionFunction);
				}
			}*/
			$("#mappingContainer").html(this.multiCriteriaPathLayout());
		}
	},
	//get pathmap Object for singleCriteria answerOption
	getPathmapObjSingleAnsOpt : function(options){
		 var pathMaps = new Array();
		 for(var k in options){
		 	 var optionLabelText = "";
			 var optionId = options[k].id,
			 	 compOptionId = null,
			 	 cellId = null;

		 	if(this.firstCompType == "inputField"){
		 		optionLabelText = "Input ID #"+options[k].editor.id;
		 		labelEditorId=options[k].editor.id;
		 		compOptionId = options[k].editor.id;
		 	} else if(this.firstCompType == "table"){
		 		optionId = (parseInt(k)+1);
		 		if(options[k].type=="Label"){
		 			optionLabelText = "Cell ID #"+options[k].cellId+"<br> <br> Formula result cell";
		 			labelEditorId=options[k].cellId;
		 		}else{
		 			optionLabelText = "Cell ID #"+options[k].cellId;
		 			labelEditorId=options[k].cellId;
		 		}
		 		compOptionId = options[k].cellId;
		 		cellId = options[k].cellId;

		 	}else{
		 		optionLabelText = options[k].editor.text;
		 		labelEditorId=options[k].editor.id;
		 	}

		 	var pathMapConfig = {
					id : optionId,
					compOptionId : compOptionId,
					cellId : cellId,
					branchId : this.id,
					optionLabel : optionLabelText,
					//labelEditorId:labelEditorId.slice(0)
			};
			var pathMap = new PathMap(pathMapConfig);
			pathMap.labelEditorId.push(labelEditorId);
			if(this.cataAnswerOption == true){
				pathMap.labelOptionsObject = options;
			}
			var conditionId = null;
			if(this.firstCompType == "inputField" || this.firstCompType == "table"){
				obj = {
						id: 1, 
						selectConditionVal: 1, 
						authorEntryVal: ''
					  };
				var condition = [];
				condition.push(obj);
		    	pathMap.setCondition(condition);
		    	conditionId = 1;
			}
	    	var pathConfig = {
					id : 1,
					branchId : this.id,
					pathMapId : pathMap.id,
					conditionId : conditionId
			};
	    	var path = new Path(pathConfig);
	    	var paths = [];
	    	paths.push(path);
	    	if(this.firstCompType == "checkbox"){
	    		pathMap.idRange.push(optionId);
	    	}
	    	pathMap.setPaths(paths);
	    	pathMaps.push(pathMap);	
		 }
		 this.setPathMaps(pathMaps);
		 this.pathMaps = pathMaps;	
	},
	//get pathmap Object for singleCriteria answerOption
	getPathmapObjSingleScoreRange : function(comp){
		 var pathMaps = new Array();
	 	 $("#MappingIndicator_1").text("Score range");
	 	 if(comp.feedbackScoringType == 'frequency'){
		 	if(comp.type == "scale"){
		 		for(var k = 1; k <= comp.criterias.length; k++){
			 		var pathMapConfig = {
	    				id : k,
	    				branchId : this.id,
	    				optionLabel :comp.markers[k-1]
	    			};
	    			var pathConfig = {
						id : 1,
						branchId : this.id,
						pathMapId : k,
    				};
			    	var path = new Path(pathConfig);
			    	var paths = [];
			    	paths.push(path);
			    	var pathMap = new PathMap(pathMapConfig);
			    	pathMap.setPaths(paths);
			    	
			    	pathMaps.push(pathMap);
			 	}
			 } else{
				 /*check for more than one sections in mchoice/check all that apply components to show appropriate frequency based layout */
				 var cntLength = comp.ranges.length;
				 var cmpSections = comp.sections;
				 if(cmpSections!=undefined){
					 if(cmpSections.length>1){
						 /*loop through each section*/
						 var kt=0;
						 for(kt in cmpSections){
							 if(cmpSections[kt].id == this.sectionId){
								 /*extract matched section's options length*/
								 cntLength = cmpSections[kt].options.length;
							 }
						 }
					 }
				 }
				for(var k=1;k<=cntLength;k++){
				 	var pathMapConfig = {
	    				id : k,
	    				branchId : this.id,
	    				optionLabel : comp.sections[0].markers[k-1]
	    			};

			    	var pathConfig = {
    						id : 1,
    						branchId : this.id,
    						pathMapId : k,
    				};
			    	var path = new Path(pathConfig);
			    	var paths = [];
			    	paths.push(path);
			    	var pathMap = new PathMap(pathMapConfig);
			    	pathMap.setPaths(paths);
			    	pathMaps.push(pathMap);
			    }
			}
		 }
		 else{
			 for (var k=1;k<=3;k++){
				 var pathMapConfig = {
    						id : k,
    						branchId : this.id,
    						optionLabel : ""
    				};
			    	
			    	var pathConfig = {
    						id : 1,
    						branchId : this.id,
    						pathMapId : k,
    				};
			    	var path = new Path(pathConfig);
			    	var paths = [];
			    	paths.push(path);
			    	var pathMap = new PathMap(pathMapConfig);
			    	pathMap.setPaths(paths);
			    	var rangeConfig = {
						id:pathMap.id,
						componentId :pathMap.branchId,
						componentIdPrefix : this.idPrefix
					};
			    	pathMap.range.push(new BranchRange(rangeConfig));
			    	pathMaps.push(pathMap);
    		 } 
		 }
		 this.setPathMaps(pathMaps);
		 this.pathMaps = pathMaps;
	},
	//createLayout for single criteria
	singleCriteriaPathLayout : function(){
		
		if(this.sectionId != null  && this.mappingIndicator != 0){
			var i = 0;
			for( i in this.activePageComp){
				var cmpId = this.activePageComp[i].pageIdPrefix
							+ this.activePageComp[i].pageId
							+ this.activePageComp[i].idPrefix
							+ this.activePageComp[i].id;
	    		 if(cmpId == this.cId){
	    			 if(this.mappingIndicator == "answerOption"){
	    			 	var options = this.getComponentOptions(this.cId, this.sectionId, this.mappingIndicator);
	    			 	this.getPathmapObjSingleAnsOpt(options);
	    			 }
	    			 else if(this.mappingIndicator == "scoreRange"){
	    				 this.getPathmapObjSingleScoreRange(this.activePageComp[i]);
    				 }
	    		 }
			 }	
		 }
		this.layout();
		this.afterLayout();
	},
	//createLayout for multi criteria
	multiCriteriaPathLayout : function(){
	
		if(this.sectionId != null && this.sectionId_2 != null   && this.mappingIndicator != 0 && this.mappingIndicator_2 != 0){
			var comp1_options = [];
			var comp2_options = [];
			
			comp1_options = this.getComponentOptions(this.cId, this.sectionId, this.mappingIndicator);
			comp2_options = this.getComponentOptions(this.cId_2, this.sectionId_2, this.mappingIndicator_2);
			switch(this.mappingIndicator+"-"+this.mappingIndicator_2){
				case "answerOption-answerOption" :
					this.getPathMapObj(comp1_options, comp2_options, false);
					this.isScoreRange=false;
					break;
				case "answerOption-scoreRange" :
					this.getPathMapObj(comp1_options, comp2_options, true);
					this.isScoreRange=true;
					break;
			
				case "scoreRange-answerOption" :
					this.getPathMapObj(comp2_options, comp1_options, true);
					this.isScoreRange=true;
					break;
				case "scoreRange-scoreRange" :
					//showWarningPopUp()
					break;
			}
		}
		this.layout();
		this.afterLayout();
	},
	//create pathMapObjects 
	getPathMapObj : function(options, dropDownOptions, isScoreRange){
		 var pathMaps = new Array();
		 for(var k in options){
		 	 var optionLabelText = "";
		 	 var labelEditorId=null;
			 var optionId = options[k].id,
			 	 compOptionId = null,
			 	 cellId = null;

		 	if(this.firstCompType == "inputField"){
		 		optionLabelText = "Input ID #"+options[k].editor.id;
		 		labelEditorId=options[k].editor.id;
		 		compOptionId = options[k].editor.id;
		 	} else if(this.firstCompType == "table"){
		 		optionId = (parseInt(k)+1);
		 		if(options[k].type=="Label"){
		 			optionLabelText = "Cell ID #"+options[k].cellId+"<br> <br>Formula result cell";
		 			labelEditorId=options[k].cellId;
		 		}else{
		 			optionLabelText = "Cell ID #"+options[k].cellId;
		 			labelEditorId=options[k].cellId;
		 		}
		 		compOptionId = options[k].cellId;
		 		cellId = options[k].cellId;

		 	}else{
		 		if(isScoreRange && (this.secCompType=="inputField" || this.secCompType=="table")){
		 			if(this.secCompType=="inputField"){
		 				optionLabelText = "Input ID #"+options[k].editor.id;
		 				labelEditorId=options[k].editor.id;
		 			}else if(this.secCompType == "table"){
		 				optionId = (parseInt(k)+1);
		 				optionLabelText = "Cell ID #" + options[k].editor.id;
		 				labelEditorId=options[k].editor.id;
		 			}
		 			//for scale and tbale case
		 			compOptionId = options[k].cellId;
			 		cellId = options[k].cellId;
		 		}else{
		 			optionLabelText = options[k].editor.text;
		 			labelEditorId=options[k].editor.id;
		 		}
		 	}
		 	var pathMapConfig = {
					id : optionId,
					compOptionId : compOptionId,
					cellId : cellId,
					branchId : this.id,
					optionLabel : optionLabelText,
					//labelEditorId:labelEditorId.slice(0)
			};
			var pathMap = new PathMap(pathMapConfig);
			pathMap.labelEditorId.push(labelEditorId);
			//set dropDown options
			var rangeId = null;
			if(!isScoreRange){
				//idCriteria2 default value
				pathMap.idCriteria2  = 1;
				//pathMap.drpDwnEditorId=dropDownOptions[0].editor.id;
				pathMap.drpDwnEditorId.push(dropDownOptions[0].editor.id);
				//Amruta : fix for case of idRange[1,1] on add option of 2nd pathmap
				if(this.firstCompType == 'checkbox'){
					pathMap.idRange.push(options[k].id);
				}else if(this.secCompType == 'checkbox' && this.firstCompType!='checkbox'){
					pathMap.idRange.push(dropDownOptions[0].id);
				}
				if(this.secCompType == 'checkbox' && this.firstCompType=='checkbox'){
				    pathMap.idRangeCata2.push(dropDownOptions[0].id);
				}
				pathMap.labelOptionsObject = dropDownOptions;
				pathMap.drpDwnOptionsObject= dropDownOptions;
				if(this.firstCompType == 'checkbox'){
					pathMap.cataOptions=options;
				}
			}else{
				if(this.firstCompType == 'checkbox' && this.secCompObj.feedbackScoringType!="frequency"){
					pathMap.idRange.push(options[k].id);
					pathMap.labelOptionsObject = options;
					pathMap.drpDwnOptionsObject= options;
				}else{
					//var freqComp=(this.firstCompObj.feedbackScoringType=="frequency")?this.firstCompObj:this.secCompObj;
					var freqComp=(this.firstCompObj.feedbackScoringType=="frequency")?this.firstCompObj:(this.secCompObj.feedbackScoringType=="frequency")?this.secCompObj:null;
					var freqMappingIndicator=(this.firstCompObj.feedbackScoringType=="frequency")?this.mappingIndicator:(this.secCompObj.feedbackScoringType=="frequency")?this.mappingIndicator_2:null;
					if((this.firstCompObj.feedbackScoringType!="frequency" && this.secCompObj.feedbackScoringType!="frequency") && !isScoreRange){
						pathMap.idRange.push(options[0].id);
						pathMap.labelOptionsObject = options;
						pathMap.drpDwnOptionsObject= options;
							
					}else{
						isScale=(this.firstCompObj.type=="scale"||this.secCompObj.type=="scale")?true:false;
						if(!isScale && freqComp!=null){
							
							secId=(this.firstCompObj.feedbackScoringType=="frequency")?this.sectionId:this.sectionId_2;
							 var cntLength=freqComp.ranges.length;
							 var cmpSections = freqComp.sections;
							 if(cmpSections!=undefined){
								 if(cmpSections.length>1){
									 /*loop through each section*/
									 var kt=0;
									 for(kt in cmpSections){
										 if(cmpSections[kt].id == secId){
											 /*extract matched section's options length*/
											 cntLength = cmpSections[kt].options.length;
										 }
									 }
								 }
							 }
							 var markers=[];
							 for(var mk=1;mk<=cntLength;mk++){
								 markers.push(freqComp.sections[0].markers[mk-1]);
							 }
							 var optionsFrq=null;
							 for(sec in freqComp.sections){
								 if(freqComp.sections[sec].id==this.sectionId_2){
									 optionsFrq= freqComp.sections[sec].options;
								 }
							 }
							 //fix : if CATA is ans opt then in idrange push respective option id
							 if((this.firstCompType == 'checkbox' && this.mappingIndicator == "answerOption") || (this.secCompType == 'checkbox' && this.mappingIndicator_2 == "answerOption")){
								 pathMap.cataOptions=options;
 								pathMap.idRange.push(options[k].id);
							 }else if(this.firstCompType == 'checkbox' ||this.secCompType=='checkbox'){
								pathMap.cataOptions=options;
 								pathMap.idRange.push(options[0].id);
							 }
							pathMap.labelOptionsObject=markers;
							pathMap.drpDwnOptionsObject = optionsFrq;
						}else{
							if(freqMappingIndicator!="answerOption" && freqMappingIndicator!=null){
								if(freqComp!=null && this.pathMaps.length < freqComp.criterias.length ){
	    				 			var cntNewCriteria = freqComp.criterias.length - this.pathMaps.length;
	    				 			var startIndex =  (freqComp.criterias.length + 1) - cntNewCriteria;
	    				 			var freMarkers=[];
	    				 			for(var k=startIndex;k<=freqComp.criterias.length;k++){
	    				 				freMarkers.push(freqComp.markers[k-1]);
		    					 	}
	    				 			//pathMap.idRange.push(options[0].id);
	    							//pathMap.labelOptionsObject = options;
	    				 			if(this.firstCompType == 'checkbox' ||this.secCompType=='checkbox'){
	    								pathMap.cataOptions=options;
	    								pathMap.idRange.push(options[0].id);
	    							}
	    				 			pathMap.labelOptionsObject=freMarkers;
	    				 			 var optionsFrqScale=null;
	    							 for(sec in freqComp.criterias){
	    								 optionsFrqScale= freqComp.criterias;
	    							 }
	    				 			pathMap.drpDwnOptionsObject = optionsFrqScale;
	    				 		}
	    				 		else if(freqComp!=null && this.pathMaps.length > freqComp.criterias.length){
	    				 			var diff = this.pathMaps.length - freqComp.criterias.length;
	    				 			var cnt = 0;
	    				 			for(cnt;cnt<diff;cnt++){
	    				 				this.pathMaps.pop();
	    				 			}
	    				 			
	    				 		}
							}else if(isScoreRange && this.secCompType == 'checkbox'){
								pathMap.labelOptionsObject = options;
								pathMap.drpDwnOptionsObject= options;
								pathMap.idRange.push(options[0].id);
							}
						
						}
						
					}
					
				}
				
			}
			var conditionId = null;
			var secConditionId = null;
		if(this.firstCompType == "inputField" || this.firstCompType == "table" || this.secCompType == "inputField" || this.secCompType == "table"){
			var obj = {
					id: 1, 
					selectConditionVal: 1, 
					authorEntryVal: ''
				  };
			var condition = [];
			condition.push(obj);
	    	
	    	if((this.firstCompType == "inputField" || this.firstCompType == "table") && (this.secCompType == "inputField" || this.secCompType == "table")){
	    		var obj = {
						id: 2, 
						selectConditionVal: 1, 
						authorEntryVal: ''
					  };
				condition.push(obj);
	    	}
	    	pathMap.setCondition(condition);
	    	conditionId = 1;
	    	secConditionId = 2;
		}
			if(isScoreRange){
	    		var rangeConfig = {
		    			id:1,
						pathMapId:pathMap.id,
						componentId :pathMap.branchId,
						componentIdPrefix : this.idPrefix
					};
	    		pathMap.range.push(new BranchRange(rangeConfig));	
	    		rangeId = 1;
	    	}
	    	var pathConfig = {
					id : 1,
					branchId : this.id,
					pathMapId : pathMap.id,
					conditionId : conditionId,
					secConditionId : secConditionId,
					rangeId : rangeId
			};
	    	var path = new Path(pathConfig);
	    	var paths = [];
	    	paths.push(path);
	    	pathMap.setPaths(paths);
	    	pathMaps.push(pathMap);	
		 }
		 this.setPathMaps(pathMaps);
		 this.pathMaps = pathMaps;
	},
	//getOPtions of component
	getComponentOptions : function(compId, sectionId, mappingIndicator){
		if(sectionId==0){
		sectionId=1;	
		}
		var options = [];
		for( i in this.activePageComp){
			var cmpId = this.activePageComp[i].pageIdPrefix
						+ this.activePageComp[i].pageId
						+ this.activePageComp[i].idPrefix
						+ this.activePageComp[i].id;
			
    		 if(cmpId == compId){
    			 if(mappingIndicator == "answerOption"){
    			 	 if(this.activePageComp[i].sections!= undefined && this.activePageComp[i].sections.length > 0){
	    				 for( j in this.activePageComp[i].sections){
	    					 if((sectionId == this.activePageComp[i].sections[j].id && this.cId == compId) || (sectionId == this.activePageComp[i].sections[j].id && this.cId_2 == compId)){
	    					 	if(this.activePageComp[i].type == "inputField"){
	    					 		for(s in this.activePageComp[i].sections[j].studentEntries){
			    			 			var contentType = this.activePageComp[i].sections[j].studentEntries[s].contentFormat.type;
			    			 			if(contentType == "number" || contentType == "currency" || contentType == "percentage"){
			    			 				options.push(this.activePageComp[i].sections[j].studentEntries[s]);
			    			 			}
			    			 		}
	    					 	}else{
	    							options = this.activePageComp[i].sections[j].options;
	    						}
	    					 }
		    			 }
	    			 }
	    			 else{
	    			 	if(this.activePageComp[i].type == "table"){
					 		 var comp = this.activePageComp[i];
   					 		 for(cellIndex  in comp.cellComponentCollection){
   				        		 var cellComponent = comp.cellComponentCollection[cellIndex].component;
   				        		 if(cellComponent != ""){
   				                     if(cellComponent.type == "Input field"){
   				                    	 var contentType = cellComponent.contentFormat.type;
   				                    	 if(contentType == "number" || contentType == "currency" || contentType == "percentage"){
				    			 			 options.push(cellComponent);
				    			 		 }
   				                     }else if(cellComponent.type == "Label"){
   				                    	 for(var index = 0 ; index < question.formulas.length; index++){
   				                    		 var cellId = comp.getFullComponentId() + cellComponent.cellId;
   				                    		 if($.inArray(cellId, question.formulas[index].destinations) != -1){
   				                    			 options.push(cellComponent);
   				                    		 }
   				                    	 }
   				                     }
   				        		 }
   				        	 }
					 	}else{
	    					options = this.activePageComp[i].sections.options;
	    				}
	    			 }
    			 }
    		 }
		 }
		return options;
	},
	//while creating layout check for new options added 
	getOptionText: function(cond){
		//console.log("get option text");
   		var i = 0;
   		var html = '';
   		this.updateCompoObj();
   		for( i in this.activePageComp){
			var cmpId = this.activePageComp[i].pageIdPrefix
			+ this.activePageComp[i].pageId + this.activePageComp[i].idPrefix + this.activePageComp[i].id;
	    	if(cmpId == this.cId || cmpId == this.cId_2){
	    		var loopCndtnSingle = (this.criteria == "single" && this.mappingIndicator == "answerOption") ? true : false;
	    		var loopCndtnMulti = (this.criteria == "multi" && this.mappingIndicator == "answerOption" && this.mappingIndicator_2 == "answerOption") ? true : false;
                                                                                                                                                                                                                                                                                                                                                                                                                                                 	    		
	    		if(loopCndtnSingle || loopCndtnMulti){
	    			var options = null;
	    			var comp2_options = null;
	    			if(cmpId == this.cId){
	    				options = this.getComponentOptions(this.cId, this.sectionId, this.mappingIndicator);
		    			comp2_options = this.getComponentOptions(this.cId_2, this.sectionId_2, this.mappingIndicator_2);
	    			}

	    			var k = 0;
    				var pathmapIndex = 0;
					for(k in options){
						var conditionToCheck=(this.activePageComp[i].type != "table")?(this.pathMaps[k] != undefined && this.pathMaps[k].id == options[k].id):(this.pathMaps[k] != undefined && this.pathMaps[k].cellId == options[k].cellId);
    					if(this.activePageComp[i].type == "table" ){
							existingPathMap = [];
							try{
								existingPathMap = this.pathMaps.filter(function(e){
	        	        	  		return e.cellId == options[k].cellId;
	        	        	  	});
	        	            }catch(err){
	        	            	existingPathMap = [];
	        	            }
	        	            conditionToCheck = existingPathMap.length >= 1 ? true : false;
    					}else{
    						existingPathMap = [];
							try{
								existingPathMap = this.pathMaps.filter(function(e){
	        	        	  		return e.id == options[k].id;
	        	        	  	});
	        	            }catch(err){
	        	            	existingPathMap = [];
	        	            }
	        	            conditionToCheck = existingPathMap.length >= 1 ? true : false;
    					}
    					if(conditionToCheck){
	    					pathmapIndex = this.pathMaps.indexOf(existingPathMap[0]);
	    					var optionId = this.pathMaps[pathmapIndex].id;
	    					
	    					if(this.pathMaps[pathmapIndex].compOptionId != null && this.activePageComp[i].type != "inputField"){
	    						optionId = this.pathMaps[k].compOptionId;
	    					}
	    					if(optionId == options[k].id || this.pathMaps[pathmapIndex].cellId == options[k].cellId){
	    						var isvisibleCondition = false;
	    						if(this.activePageComp[i].type == "inputField"){
	    							isvisibleCondition = true;
		    						this.pathMaps[pathmapIndex].optionLabel = "Input ID #"+options[k].editor.id;
		    						//this.pathMaps[pathmapIndex].labelEditorId=options[k].editor.id;
		    						if(jQuery.inArray( options[k].editor.id,this.pathMaps[pathmapIndex].labelEditorId ) == -1 ){
		    							this.pathMaps[pathmapIndex].labelEditorId.push(options[k].editor.id);
    								}
		    						
		    						
		    					} else if(this.activePageComp[i].type == "table"){
	    							isvisibleCondition = true;
	    							if(options[k].type=="Label"){
	    								this.pathMaps[pathmapIndex].optionLabel = "Cell ID #"+cmpId+options[k].cellId+"<br> <br>Formula result cell";
	    								//this.pathMaps[pathmapIndex].labelEditorId=options[k].cellId;
	    								if(jQuery.inArray( options[k].cellId,this.pathMaps[pathmapIndex].labelEditorId ) == -1 ){
	    									this.pathMaps[pathmapIndex].labelEditorId.push(options[k].cellId);
	    								}
	    								
			    			 		}else{
			    			 			this.pathMaps[pathmapIndex].optionLabel = "Cell ID #"+cmpId+options[k].cellId;
			    			 			//this.pathMaps[pathmapIndex].labelEditorId=options[k].cellId;
			    			 			if(jQuery.inArray( options[k].cellId,this.pathMaps[pathmapIndex].labelEditorId ) == -1 ){
	    									this.pathMaps[pathmapIndex].labelEditorId.push(options[k].cellId);
	    								}
			    			 		
			    			 		}
		    					} else{
									this.pathMaps[pathmapIndex].optionLabel = options[k].editor.text;
									//this.pathMaps[pathmapIndex].labelEditorId=options[k].editor.id;
									if(jQuery.inArray( options[k].editor.id,this.pathMaps[pathmapIndex].labelEditorId ) == -1 ){
    									//this.pathMaps[pathmapIndex].labelEditorId.push(options[k].editor.id);
    								}
									//this.pathMaps[pathmapIndex].labelEditorId.push(options[k].editor.id);
								}
	    						if(this.criteria == 'multi' && !this.isScoreRange){
	    							this.pathMaps[pathmapIndex].labelOptionsObject = comp2_options;
	    							this.pathMaps[pathmapIndex].drpDwnOptionsObject=comp2_options;
	    							//Amruta : fixes for  - when CATA is second component idRange content [1,1]
	        						/*if(this.secCompType == 'checkbox'){
	        							this.pathMaps[k].idRange.push(comp2_options[0].id);
	        						}*/
	        					}else{
        							//var freqComp=(this.firstCompObj.feedbackScoringType=="frequency")?this.firstCompObj:this.secCompObj;
	        						var freqComp=(this.firstCompObj.feedbackScoringType=="frequency")?this.firstCompObj:(this.secCompObj.feedbackScoringType=="frequency")?this.secCompObj:null;
	        						var freqMappingIndicator=(this.firstCompObj.feedbackScoringType=="frequency")?this.mappingIndicator:(this.secCompObj.feedbackScoringType=="frequency")?this.mappingIndicator_2:null;
        							var secId=(this.firstCompObj.feedbackScoringType=="frequency")?this.sectionId:this.sectionId_2;
        							var isScale=(this.firstCompObj.type=="scale" ||this.secCompObj.type=="scale")?true:false;
        								
	        						if(freqComp!=null && freqComp!=undefined && !isScale){
	        							 var cntLength=freqComp.ranges.length;
	            						 var cmpSections =freqComp.sections;
	            						 if(cmpSections!=undefined){
	            							 if(cmpSections.length>1){
	            								 /*loop through each section*/
	            								 var kt=0;
	            								 for(kt in cmpSections){
	            									 if(cmpSections[kt].id == secId){
	            										 /*extract matched section's options length*/
	            										 cntLength = cmpSections[kt].options.length;
	            									 }
	            								 }
	            							 }
	            						 }
		           						 if(this.criteria=="multi"){
		        							 var markers=[];
		        							 for(var m=1;m<=cntLength;m++){
		        								 markers.push(this.activePageComp[i].sections[0].markers[m-1]);
		        							 }
		        							 this.pathMaps[pathmapIndex].labelOptionsObject=markers;
		        							 var optionsFrq=null;
		        							 for(sec in freqComp.sections){
		        								 if(freqComp.sections[sec].id==this.sectionId_2){
		        									 optionsFrq= freqComp.sections[sec].options;
		        								 }
		        							 }
		        							 this.pathMaps[pathmapIndex].drpDwnOptionsObject=optionsFrq;
		        						 }	
	        						}else{
	        							if(isScale){
	        								if(freqMappingIndicator!="answerOption" && freqMappingIndicator!=null){
	        									if(this.pathMaps.length < freqComp.criterias.length){
		        	    				 			var cntNewCriteria = freqComp.criterias.length - this.pathMaps.length;
		        	    				 			var startIndex =  (freqComp.criterias.length + 1) - cntNewCriteria;
		        	    				 			var freMarkers=[];
		        	    				 			for(var k=startIndex;k<=freqComp.criterias.length;k++){
		        	    				 				freMarkers.push(freqComp.markers[k-1]);
		        		    					 	}
		        	    				 			var optionsFrqScale=null;
		        	    				 			 for(sec in freqComp.criterias){
		        	    								 optionsFrqScale= freqComp.criterias;
		        	    							 }
		        	    				 			this.pathMaps[pathmapIndex].drpDwnOptionsObject = optionsFrqScale;
		        	    				 			this.pathMaps[pathmapIndex].labelOptionsObject=freMarkers;
		        	    				 		}
		        	    				 		else if(this.pathMaps.length > freqComp.criterias.length){
		        	    				 			var diff = this.pathMaps.length - freqComp.criterias.length;
		        	    				 			var cnt = 0;
		        	    				 			for(cnt;cnt<diff;cnt++){
		        	    				 				this.pathMaps.pop();
		        	    				 			}
		        	    				 			
		        	    				 		}
	        								}
	        						
	        							}else{
	        								this.pathMaps[pathmapIndex].labelOptionsObject = options;
	        								this.pathMaps[pathmapIndex].drpDwnOptionsObject=options;
	        								
	        							}
	        						}
	        					}
	    						pathmapIndex++;
							}
						} else{
							if(options[k]){
								var optionId = options[k].id;
								var cellId = null;
								var compOptionId = null;
								var labelEditorId=null;
								var optLabel="";
								if(this.activePageComp[i].type == "table"){
									optionId = this.pathMaps[this.pathMaps.length-1].id + 1;
					    			cellId = options[k].cellId;
					    			compOptionId = options[k].cellId;
					    		}
								if(this.activePageComp[i].type == "inputField"){
									optLabel = "Input ID #"+options[k].editor.id;
									compOptionId = options[k].editor.id;
									labelEditorId=options[k].editor.id;
								}else{
									if(this.activePageComp[i].type!="table"){
										optLabel = options[k].editor.text;	
										labelEditorId=options[k].editor.id;
									}else{
										if(options[k].type=="Label"){
											optLabel = "Cell ID #"+options[k].cellId+"<br> <br>Formula result cell";
											labelEditorId=options[k].cellId;
				    			 		}else{
				    			 			optLabel = "Cell ID 555 #"+options[k].cellId;
				    			 			labelEditorId=options[k].cellId;
				    			 		}
									}
								}
								var pathMapConfig = {
			    						id : optionId,
			    						branchId : this.id,
			    						cellId : cellId,
			    						optionLabel : optLabel,
			    						compOptionId : compOptionId,
			    						//labelEditorId:labelEditorId.slice(0)
			    				};
			    				var pathMap = new PathMap(pathMapConfig);
			    				pathMap.labelEditorId.push(labelEditorId);
			    				if(this.cataAnswerOption == true){
			    					pathMap.labelOptionsObject = options;
			    					pathMap.drpDwnOptionsObject = options;
			    					
			    				}
			    				if(this.firstCompType == 'checkbox'){
		    						pathMap.labelOptionsObject = options;
		    						pathMap.drpDwnOptionsObject = options;
		    					}
			    				var conditionId = null;
		    					if(this.activePageComp[i].type == "inputField" || this.activePageComp[i].type == "table"){
		    						obj = {
		    							id: 1, 
		    							selectConditionVal: 1, 
		    							authorEntryVal: ''
		    						  };
		    						var condition = [];
		    						condition.push(obj);
						    		pathMap.setCondition(condition);
						    		conditionId = 1;
		    					}
						    	var pathConfig = {
			    						id : 1,
			    						branchId : this.id,
			    						pathMapId : pathMap.id,
			    						conditionId : conditionId,
			    						secConditionId : 2
			    				};
						    	var path = new Path(pathConfig);
						    	var paths = [];
						    	paths.push(path);
						    	if(this.criteria == 'multi'){
						    		pathMap.labelOptionsObject = comp2_options;
						    		pathMap.drpDwnOptionsObject = comp2_options;
						    		pathMap.idCriteria2  = 1;
						    		if(comp2_options.length>0){
						    			//pathMap.drpDwnEditorId=comp2_options[0].editor.id;
						    			pathMap.drpDwnEditorId.push(comp2_options[0].editor.id);
						    		}
		    						if(this.secCompType == 'checkbox'){
		    							pathMap.idRange.push(comp2_options[0].id);
		    						}
		    					}
						    	pathMap.setPaths(paths);
						    	this.pathMaps.push(pathMap);
						    	//html += this.pathMaps[k].layout(this.mappingIndicator, this.mappingIndicator_2,false,this.criteria, this.cataAnswerOption, isvisibleCondition, this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
						    }
		    			}
					}
					//fix for legacy content (pathmap with same index)
    				k = 0;
    				for(k in options){
    					var existingPathMap = [];
    					if(this.activePageComp[i].type == "table" ){
							
							try{
								existingPathMap = this.pathMaps.filter(function(e){
	        	        	  		return e.cellId == options[k].cellId;
	        	        	  	});
	        	            }catch(err){
	        	            	existingPathMap = [];
	        	            }
	        	            existingPathMap[0].id =  this.pathMaps.indexOf(existingPathMap[0]) + 1;
	    					var index = 0;
	    					for(index in existingPathMap[0].paths){
	    						existingPathMap[0].paths[index].pathMapId = existingPathMap[0].id;
	    					}
    					}
    					
    				}
    				// code to update pathmaps on delete options for AnsOpt case
    				if(options!=null){
    	    			if(this.pathMaps.length>options.length){
    	    				var diff = this.pathMaps.length - options.length;
    			 			var cnt = 0;
    			 			var validPath=[];
    			 			for(cnt;cnt<diff;cnt++){
    			 				validPath = this.pathMaps.filter(function(e){
            	        	  		return e.id == options[cnt].id;
            	        	  	});
    			 				var p=0;
    			 				for(p in this.pathMaps){
    			 					if(this.pathMaps[p]!=validPath){
    			 						this.pathMaps.splice(p, 1);
    			 						break;
    			 					}
    			 				}
    			 			}
    	    			}
    				}

    				var pIndex = 0;
    				for(pIndex in this.pathMaps){
    					if(this.pathMaps[pIndex].layout(this.mappingIndicator, false, this.cataAnswerOption) != undefined){
							//html += this.pathMaps[pIndex].layout(this.mappingIndicator, false, this.cataAnswerOption, isvisibleCondition);
							html += this.pathMaps[pIndex].layout(this.mappingIndicator, this.mappingIndicator_2,false,this.criteria, this.cataAnswerOption, isvisibleCondition, this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
    					}
    				}
					
	    		}else{
    				 if(cond == "showhideCondition"){
			 			return false;
			 			break;
			 		 }
    				// var freqComp=(this.firstCompObj.feedbackScoringType=="frequency")?this.firstCompObj:this.secCompObj;
    				 var freqComp=(this.firstCompObj.feedbackScoringType=="frequency")?this.firstCompObj:(this.secCompObj.feedbackScoringType=="frequency")?this.secCompObj:null;
					 var freqMappingIndicator=(this.firstCompObj.feedbackScoringType=="frequency")?this.mappingIndicator:(this.secCompObj.feedbackScoringType=="frequency")?this.mappingIndicator_2:null;
					 var secId=(this.firstCompObj.feedbackScoringType=="frequency")?this.sectionId:this.sectionId_2;
					 var isScale=(this.firstCompObj.type=="scale" ||this.secCompObj.type=="scale")?true:false;
					 var markers=[];
						if(freqComp!=null && freqComp!=undefined && !isScale){
							 var cntLength=freqComp.ranges.length;
    						 var cmpSections = freqComp.sections;
    						 if(cmpSections!=undefined){
    							 if(cmpSections.length>1){
    								 /*loop through each section*/
    								 var kt=0;
    								 for(kt in cmpSections){
    									 if(cmpSections[kt].id == secId){
    										 /*extract matched section's options length*/
    										 cntLength = cmpSections[kt].options.length;
    									 }
    								 }
    							 }
    						 }
    						 if(this.criteria=="multi"){
    							 for(var k=1;k<=cntLength;k++){
    								 markers.push(freqComp.sections[0].markers[k-1]);
    							 }
    							//pathMap.labelOptionsObject=markers;
    							 
    						 }
    						 if(this.pathMaps.length < cntLength && this. criteria!="multi"){
	    				 			var cntNewCriteria = cntLength - this.pathMaps.length;
	    				 			var startIndex =  (cntLength + 1) - cntNewCriteria;
	    				 			for(var k=startIndex;k<=cntLength;k++){
	    				 				var pathMapConfig = {
	    	    			    				id : k,
	    	    			    				branchId : this.id,
	    	    			    				optionLabel :freqComp.sections[0].markers[k-1]
	    	    			    			};

	    	    					    	var pathConfig = {
	    	    		    						id : 1,
	    	    		    						branchId : this.id,
	    	    		    						pathMapId : k,
	    	    		    				};
	    	    					    	var path = new Path(pathConfig);
	    	    					    	var paths = [];
	    	    					    	paths.push(path);
	    	    					    	var pathMap = new PathMap(pathMapConfig);
	    	    					    	pathMap.setPaths(paths);
	    	    					    	this.pathMaps.push(pathMap);
								    }
    						 }
    						 else if(this.pathMaps.length > cntLength && this.criteria!="multi"){
    							 /*remove unmatched index matched pathmap*/
 							 	var compIdExtracts = freqComp.ranges;
 							 	
 							 	/*for sections*/
 							 	if(freqComp.isSectionBranch){
 							 		var currSection = null;
 							 		var k=0;
 							 		for(k in freqComp.sections){
 							 			if(freqComp.sections[k].isBranched && freqComp.sections[k].id == secId){
 							 				currSection = freqComp.sections[k];
 							 				break;
 							 			}
 							 		}
 							 		
 							 		if(currSection!=null){
 							 			compIdExtracts = currSection.options;
 							 		}
 							 	}
 							 	this.pathMaps = this.pathMaps.filter(function(x) {
	    				 			     return compIdExtracts.some(function(y) {
	    				 			          return x.id == y.id;
	    				 			     });
	    				 			});
 							 	/*update option label*/
 							 	var m;
 							 	for(m=0;m<this.pathMaps.length;m++){
 							 		this.pathMaps[m].optionLabel = freqComp.sections[0].markers[m];
 							 		if(this.criteria=="multi"){
 							 			this.pathMaps[m].labelOptionsObject=markers;
 							 		}
 							 	}
	    				 	}
	
						}else{
							if(isScale){
								if(freqMappingIndicator!="answerOption" && freqMappingIndicator!=null){
									if(this.criteria!="multi"){
										if(this.pathMaps.length <freqComp.criterias.length){
			    				 			var cntNewCriteria = freqComp.criterias.length - this.pathMaps.length;
			    				 			var startIndex =  (freqComp.criterias.length + 1) - cntNewCriteria;
			    				 			for(var k=startIndex;k<=freqComp.criterias.length;k++){
			    				 				var pathMapConfig = {
			    	    			    				id : k,
			    	    			    				branchId : this.id,
			    	    			    				optionLabel :freqComp.markers[k-1],
			    	    			    				compOptionId :freqComp.criterias[k-1].id
			    	    			    				
			    	    			    			};
			    	    			    			var pathConfig = {
			    	    								id : 1,
			    	    								branchId : this.id,
			    	    								pathMapId : k,
			    	    		    				};
			    	    					    	var path = new Path(pathConfig);
			    	    					    	var paths = [];
			    	    					    	paths.push(path);
			    	    					    	var pathMap = new PathMap(pathMapConfig);
			    	    					    	pathMap.setPaths(paths);
										    	    this.pathMaps.push(pathMap);
				    					 	}
			    				 		}
			    				 		else if(this.pathMaps.length > freqComp.criterias.length && this.criteria!="multi"){
			    				 			var diff = this.pathMaps.length -freqComp.criterias.length;
			    				 			var cnt = 0;
			    				 			for(cnt;cnt<diff;cnt++){
			    				 				this.pathMaps.pop();
			    				 			}
			    				 			
			    				 		}
									}
								}

							}
						}
						 var pathmapIndex = 0;
	    				 for(pathmapIndex in this.pathMaps){
    						 html += this.pathMaps[pathmapIndex].layout( this.mappingIndicator,this.mappingIndicator_2, false, this.criteria,this.cataAnswerOption, isvisibleCondition, this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
    					 }
    				/* if(this.activePageComp[i].feedbackScoringType == 'frequency'){
	    	
	    				 var pathmapIndex = 0;
	    				 for(pathmapIndex in this.pathMaps){
    						 html += this.pathMaps[pathmapIndex].layout(this.mappingIndicator, false, this.cataAnswerOption, isvisibleCondition);
    					 }
	    			}*/
    			}
	    		return html;
			}
   		}
   		
   	},
	
	/* save branch object*/
	saveBranch : function(e){
		
		
		//(e.currentTarget).unbind("click");
		//$(".loadingImg").show();
		
		var i = 0;
		var comp = null;
		var comp2=null;
		for( i in this.activePageComp){
			var cmpId = this.activePageComp[i].pageIdPrefix
						+ this.activePageComp[i].pageId
						+ this.activePageComp[i].idPrefix
						+ this.activePageComp[i].id;
    		 if(cmpId == this.cId){
    			 comp  = this.activePageComp[i];
    		 }
    		 if(this.criteria=="multi" && this.cId_2 != undefined){
    			 if(cmpId == this.cId_2){
    				 comp2  = this.activePageComp[i];
        		 }
    		 }
		}
		
		newPathName = this.editor.text;
		if(newPathName == "" || newPathName == undefined){
			var closeActionFunction = function(){
				$('#BB1').trigger("focus");
			}; 
			question.displayMessageModal("Validation Error", "Enter path name", closeActionFunction);
			Branch.addEvent1( "branchSave", "click", this._saveBranch);
			return false;
		} else{
			this.pathName = newPathName;
		}
		 var validRange =true;
		 if(this.criteria=="multi" && this.cId_2 != undefined){
		   this.validateBranch();
		 }
		var checkComp = comp;
		/*for multicriteria second component score range*/
		if(this.isScoreRange && this.mappingIndicator_2=="scoreRange"){
			checkComp = comp2;
		}
		if(this.isScoreRange && (checkComp.feedbackScoringType != undefined && checkComp.feedbackScoringType != 'frequency')){
			 var rangeError={};
			 var j = 0;
			 for(j in this.pathMaps){
				 for(var r = 0; r < this.pathMaps[j].range.length; r++){
					 var validatorObj = this.pathMaps[j].range[r].validateRange();
				     validRange = validRange && validatorObj.status;
					 if(!validRange && validatorObj.message != undefined){
						rangeError.message = validatorObj.message;
						rangeError.field = validatorObj.field;	
						break;
					 }	 
				 }
   	       }
			if(!validRange){
						var closeActionEventFunction = rangeError.field!=undefined?function(){
								$('#'+rangeError.field).trigger("focus");
						}:null; 
						question.displayMessageModal("Validation Error", rangeError.message, closeActionEventFunction);
			}
		}
		
		/*validate author entry for inputfield/table */
		var isAuthorEntryValid=true;
		var conditionToCheck=(comp2!=null)?((comp.type=="inputField" || comp.type=="table" || comp2.type=="inputField" || comp2.type=="table")):(comp.type=="inputField" || comp.type=="table");
		if(conditionToCheck){
			var authorEntryError={};
			 var j = 0;
			 for(j in this.pathMaps){
	     	     var validatorObj=this.pathMaps[j].validateAuthorEntry();
	     	    isAuthorEntryValid=isAuthorEntryValid && validatorObj.status;
				 if(!isAuthorEntryValid && validatorObj.message != undefined){
					authorEntryError.message=validatorObj.message;
						authorEntryError.field=validatorObj.field;	
						break;
				 }				
	         }
			 if(!isAuthorEntryValid){
				new Modal(
			   	       {
			   	         id : 1,headingText : "Validation Error",
			   	         containtText : authorEntryError.message,
			   	         closeActionEvent:function(){
			   	           	$('#'+authorEntryError.field).trigger("focus");
			   	           	$('#'+authorEntryError.field).val(""); /* removes characters other than numeric*/
			   	          	authorEntryError.field = ""; /*reset id to avoid id stacking causes event bubbling*/
			   	         }
			   	       }).getWarningModal();
				Branch.addEvent1( "branchSave", "click", this._saveBranch);
			 }
		}
		
		var isOptionAnswersValid = true;
		if(comp.type == 'checkbox' && !this.isScoreRange){
			isOptionAnswersValid = this.checkOptionAnswersValid();
		}
		var isChildBranched  = this.checkIsChildBranched();
		if(!isOptionAnswersValid){
			 new Modal(
	   	              {
	   	                  id : 1,headingText : "Validation Error",
	   	                  containtText : "Answer options are identical.",
	   	                  closeActionEvent:function(){
	   	                	
	   	                  }
	   	              }).getWarningModal();
			 Branch.addEvent1( "branchSave", "click", this._saveBranch);
		}else{
			if(isChildBranched){
				 new Modal(
	   	              {
	   	                  id : 1,headingText : "Validation Error",
	   	                  containtText : "Path is Invalid. It's partial part is already covered",
	   	                  closeActionEvent:function(){
	   	                	
	   	                  }
	   	              }).getWarningModal();
				 Branch.addEvent1( "branchSave", "click", this._saveBranch);
			}
			else{
				var isOnlySelfPart = this.isOnlySelfPartBranched();
				if(isOnlySelfPart.inValid){
					new Modal(
			   	         {
			   	             id : 1,headingText : "Validation Error",
			   	             containtText : isOnlySelfPart.message+" Path you are trying to create is generating cycle",
			   	             closeActionEvent:function(){
		   	                 }
			   	         }).getWarningModal();
					Branch.addEvent1( "branchSave", "click", this._saveBranch);
				}else{
					if(!($(".reveal-modal").css('visibility') == 'visible') && isAuthorEntryValid ){
						if(validRange){
							if($("#branchEdit").val() == ""){
								question.branches.push(this);
								question.tempBranch = null;
								this.pageId = question.activePage.id;
							}
							
							//set flag isBranchedDest for all destinations
							if($("#branchEdit").val() != ""){
								var newBranch = this.getBranchFromLocalStorage();
								if(newBranch != null){
									this.setResetFlag(newBranch, false);	
								}
							}
							this.setResetFlag(this, true);
							//this.pageId = question.activePage.id;
							$("#branchEdit").val('');
							question.layout();
							$("#myModal").modal('hide');
							//$(".loadingImg").hide();
						}
					}
				}
			}
		}
		return false;

	},

	//set/reset flags of comp, sections or part
	setResetFlag : function(newBranch, flag){
		var branchId = this.id;
		//set flag isBranched
		var i = 0;
		for( i in this.activePageComp){
			var cmpId = this.activePageComp[i].pageIdPrefix
						+ this.activePageComp[i].pageId
						+ this.activePageComp[i].idPrefix
						+ this.activePageComp[i].id;
    	 	 if((cmpId == newBranch.cId)  && !flag){
    		 	if(this.activePageComp[i].sections != undefined){
	    			if(this.activePageComp[i].sections.length > 0){
	    				for( j in this.activePageComp[i].sections){
	    					if(this.sectionId == this.activePageComp[i].sections[j].id ){
	    						this.activePageComp[i].sections[j].isBranched = flag;
	    						this.activePageComp[i].isBranched = flag;
	    						this.activePageComp[i].isSectionBranch = flag;
	    						if(this.activePageComp[i].sections.length == 1){
	    							this.activePageComp[i].isBranched = flag;
	    					 	}
	    					}
	    				}
	    			}
	    		}else{
	    			this.activePageComp[i].isBranched = flag;
	    		}
    		 	if(this.sectionId==0 && cmpId == newBranch.cId){
    		 		this.activePageComp[i].isBranched = flag;
    		 	}else if(this.sectionId_2==0 && cmpId == newBranch.cId_2){
    		 		this.activePageComp[i].isBranched = flag;
    		 	}
    		} 
    	 	 if(( cmpId == newBranch.cId_2)  && !flag){
     		 	if(this.activePageComp[i].sections != undefined){
 	    			if(this.activePageComp[i].sections.length > 0){
 	    				for( j in this.activePageComp[i].sections){
 	    					if( this.sectionId_2 == this.activePageComp[i].sections[j].id){
 	    						this.activePageComp[i].sections[j].isBranched = flag;
 	    						this.activePageComp[i].isBranched = flag;
 	    						this.activePageComp[i].isSectionBranch = flag;
 	    						if(this.activePageComp[i].sections.length == 1){
 	    							this.activePageComp[i].isBranched = flag;
 	    					 	}
 	    					}
 	    				}
 	    			}
 	    		}else{
 	    			this.activePageComp[i].isBranched = flag;
 	    		}
     		 	if(this.sectionId==0 && cmpId == newBranch.cId){
     		 		this.activePageComp[i].isBranched = flag;
     		 	}else if(this.sectionId_2==0 && cmpId == newBranch.cId_2){
     		 		this.activePageComp[i].isBranched = flag;
     		 	}
     		}
			if(cmpId==newBranch.cId && flag){
				 	if(this.activePageComp[i].sections != undefined){
	    			if(this.activePageComp[i].sections.length > 0){
	    				for( j in this.activePageComp[i].sections){
	    					if(this.sectionId == this.activePageComp[i].sections[j].id ){
	    						this.activePageComp[i].sections[j].isBranched = flag;
	    						this.activePageComp[i].isSectionBranch = flag;
	    						if(this.activePageComp[i].sections.length == 1){
	    							this.activePageComp[i].isBranched = flag;
	    					 	}
	    					}
	    				}
	    			}
	    		}else{
					this.activePageComp[i].isBranched = flag;
				}
			}else if(cmpId == newBranch.cId_2 && flag){
					if(this.activePageComp[i].sections != undefined){
	    			if(this.activePageComp[i].sections.length > 0){
	    				for( j in this.activePageComp[i].sections){
	    					if(this.sectionId_2 == this.activePageComp[i].sections[j].id){
	    						this.activePageComp[i].sections[j].isBranched = flag;
	    						this.activePageComp[i].isSectionBranch = flag;
	    						if(this.activePageComp[i].sections.length == 1){
	    							this.activePageComp[i].isBranched = flag;
	    					 	}
	    					}
	    				}
	    			}
	    		}else{
	    			this.activePageComp[i].isBranched = flag;
	    		}
			}
			if(this.sectionId==0 && cmpId == newBranch.cId){
    		 		this.activePageComp[i].isBranched = flag;
    		 	}else if(this.sectionId_2==0 && cmpId == newBranch.cId_2){
    		 		this.activePageComp[i].isBranched = flag;
    		 	}
			
		}
		for(var i in newBranch.pathMaps){
			for(var j in newBranch.pathMaps[i].paths){
				var sectionId = newBranch.pathMaps[i].paths[j].sectionId;
				var partId = newBranch.pathMaps[i].paths[j].partId;
				var compId = newBranch.pathMaps[i].paths[j].compId;
				var isSubCategory=(sectionId!=null)?(sectionId.split("_")[0]=="s")?true:false:false;
				if(newBranch.pathMaps[i].paths[j].sectionId != null){
					for(var index1 in question.pages){
						if(partId == question.pages[index1].id){
							for(var index2 in question.pages[index1].components){
								var comp = question.pages[index1].components[index2];
								if(compId == comp.id){
									if(comp.sections != undefined && !isSubCategory){
										for(var index3 in comp.sections){
											if(comp.sections[index3].id == sectionId){
												comp.sections[index3].destBranchId = branchId;
												comp.sections[index3].isBranchDest = flag;
												comp.isSectionBranchDest = flag;
												comp.sections[index3].showToStud = !flag;
												comp.isBranchDest = false;
												comp.showToStud = true;
												question.pages[index1].isBranchDest = false;
												question.pages[index1].showToStud = true;
												
											}
										}
									}else{
											for(var index3 in comp.sections){
											var secId=sectionId.split("_")[1];
											if(comp.sections[index3].subCategoryId == secId && comp.type!="scale"){
												comp.sections[index3].destBranchId = branchId;
												comp.sections[index3].isBranchDest = flag;
												comp.isSectionBranchDest = flag;
												comp.sections[index3].showToStud = !flag;
												comp.isBranchDest = false;
												comp.showToStud = true;
												question.pages[index1].isBranchDest = false;
												question.pages[index1].showToStud = true;
												
											}
										}
									}
								}
							}
						}
					}
				}
				else if(newBranch.pathMaps[i].paths[j].compId != null){
					for(var index1 in question.pages){
						if(partId == question.pages[index1].id){
							for(var index2 in question.pages[index1].components){
								var comp = question.pages[index1].components[index2];
								if(compId == comp.id){
									comp.isBranchDest = flag;
									comp.showToStud = !flag;
									comp.destBranchId = branchId;
									question.pages[index1].isBranchDest = false;
									question.pages[index1].showToStud = true;
									if(comp.sections != undefined){
										for(var index3 in comp.sections){
											comp.sections[index3].isBranchDest = false;
											comp.sections[index3].showToStud = true;
										}
									}
								}
							}
						}
					}
				}
				else if(newBranch.pathMaps[i].paths[j].partId != null){
					for(var index1 in question.pages){
						if(partId == question.pages[index1].id){
							question.pages[index1].isBranchDest = flag;
							question.pages[index1].showToStud = !flag;
							question.pages[index1].destBranchId = branchId;
							for(var index2 in question.pages[index1].components){
								var comp = question.pages[index1].components[index2];
								comp.isBranchDest = false;
								comp.showToStud = true;
								if(comp.sections != undefined){
									for(var index3 in comp.sections){
										comp.sections[index3].isBranchDest = false;
										comp.sections[index3].showToStud = true;
									}
								}
							}
						}
					}
				}
			}
		}
	},
	
	checkIsChildBranched : function(){
		var isChildBranched = false;
		var newBranch = this;
		for ( var i in newBranch.pathMaps) {
			for ( var j in newBranch.pathMaps[i].paths) {
				var partId = newBranch.pathMaps[i].paths[j].partId;
				var compId = newBranch.pathMaps[i].paths[j].compId;
				var sectionId = newBranch.pathMaps[i].paths[j].sectionId;
				if (sectionId == null) {
					if (compId != null) {
						for ( var index1 in question.pages) {
							if (partId == question.pages[index1].id) {
								for ( var index2 in question.pages[index1].components) {
									var comp = question.pages[index1].components[index2];
									if (compId == comp.id
											&& comp.sections != undefined) {
										for ( var index3 in comp.sections) {
											if (comp.sections[index3].isBranchDest
													&& this.id != comp.sections[index3].destBranchId) {
												return true;
											}
										}
									}
								}
							}
						}
					} else if (partId != null) {
						for ( var index1 in question.pages) {
							if (partId == question.pages[index1].id) {
								for ( var index2 in question.pages[index1].components) {
									var comp = question.pages[index1].components[index2];
									if (comp.isBranchDest
											&& this.id != comp.destBranchId) {
										return true;
									} else {
										if (comp.sections != undefined) {
											for ( var index3 in comp.sections) {
												if (comp.sections[index3].isBranchDest
														&& this.id != comp.sections[index3].destBranchId) {
													return true;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return isChildBranched;
	},
	isOnlySelfPartBranched : function(){
		var itsObj = {
			inValid : false,
			message : ""
		};
		var newBranch = this;
		
		for(var i in newBranch.pathMaps){
			for(var j in newBranch.pathMaps[i].paths){
				var partId = newBranch.pathMaps[i].paths[j].partId;
				var compId = newBranch.pathMaps[i].paths[j].compId;	
				var secId = newBranch.pathMaps[i].paths[j].sectionId;
				//var conditionToCheck=(this.criteria=="multi")?(partId == this.activePageComp[0].pageId || partId ==this.):;
				if(partId == this.activePageComp[0].pageId ){
					if(compId == null){
						itsObj.inValid = true;
						itsObj.message = "Please select valid component.";
					}else{
						var currentComponent = null;
						var x=0;
						for(x in question.activePage.components){
							if(question.activePage.components[x].id == compId){
								currentComponent = question.activePage.components[x]; 
							}
						}
						var fullCompId = "";
						if(currentComponent != null){
							fullCompId = currentComponent.pageIdPrefix + currentComponent.pageId + currentComponent.idPrefix + currentComponent.id;
							var conditionTocheck=(this.criteria=="multi")?(this.cId==fullCompId || this.cId_2==fullCompId):(this.cId==fullCompId);
							if(conditionTocheck){
								if(currentComponent.sections != undefined){
									if(secId==null){
										itsObj.inValid = true;
										itsObj.message = "Please select valid section.";
									}
								}
							}
						}
					}
				}
			}
		}
		return itsObj;
	},
	/*check for option answers combinations in case of check all that apply, are they valid*/
	checkOptionAnswersValid : function(){
		var len = this.pathMaps.length;
		for(var i = 0; i < len; i++){
			if(i != (len-1)){
				for(var j = i+1; j < len; j++){
					var rangeArr1 = this.pathMaps[i].idRange.slice(0);
					//rangeArr1.push(this.pathMaps[i].id);
					var rangeArr2 = this.pathMaps[j].idRange.slice(0);
					//rangeArr2.push(this.pathMaps[j].id);
					if(JSON.stringify(rangeArr1.sort()) === JSON.stringify(rangeArr2.sort())){
						return false;
					}
				}
			}
		}
		return true;
	},
	addNewRange : function(){
		 var html = "";
		 var rangeConfig = null;
		 var pathMap = null;
		for( i in this.activePageComp){
			var cmpId = this.activePageComp[i].pageIdPrefix
						+ this.activePageComp[i].pageId
						+ this.activePageComp[i].idPrefix
						+ this.activePageComp[i].id;
    		 if(cmpId == this.cId){
    			 if(this.activePageComp[i].feedbackScoringType == 'frequency'){
						 var pathMapConfig = {
		    						id : k,
		    						branchId : this.id,
		    						optionLabel :this.activePageComp[i].sections[0].markers[this.pathMaps.length]
		    				};
					    	
					    	var pathConfig = {
		    						id : 1,
		    						branchId : this.id,
		    						pathMapId : k,
		    				};
					    	var path = new Path(pathConfig);
					    	var paths = [];
					    	paths.push(path);
					    	pathMap = new PathMap(pathMapConfig);
					    	pathMap.setPaths(paths);
					    	rangeConfig = {
								id:pathMap.id,
								componentId :pathMap.branchId,
								componentIdPrefix : this.idPrefix
							};
				 }
				 else{
					 var pathMapConfig = {
								id : this.pathMaps.length+1,
								branchId : this.id,
								optionLabel : ""
						};
					    pathMap = new PathMap(pathMapConfig);
						var pathConfig = {
								id : 1,
								branchId : this.id,
								pathMapId : pathMap.id,
						};
						var path = new Path(pathConfig);
						var paths = [];
						paths.push(path);
						
						pathMap.setPaths(paths);
						rangeConfig = {
							id:pathMap.id,
							componentId :pathMap.branchId,
							componentIdPrefix : this.idPrefix
						};
				 }
    			 pathMap.range.push(new BranchRange(rangeConfig));
				 this.pathMaps.push(pathMap);	
    		 }
        }
		 html += pathMap.layout(this.mappingIndicator,this.mappingIndicator_2, true, this.criteria, "", "", this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
		 $("#mappingContainer").append(html);
		 pathMap.afterLayout(this.mappingIndicator, this.criteria,this.firstCompObj,this.secCompObj);
	},
	removePathMap : function(pathMaps){
		var j=0;
	   	for(j in this.pathMaps){
			if(this.pathMaps[j].id == pathMaps.id){
				this.pathMaps.splice(j, 1);
			}
	   	}
	},
	editBranch : function(e){
		//console.log("edit branch");
		question.editBranch(e);
  	},
  	cancelCreatePath : function(){
  		var that = this;
  		new Modal({id : 1,
  			headingText : "Are you sure?",
  			containtText : "Are you sure you want to close? Doing so will discard all changes in this branch.",
  			okActionEvent : function(){
  				var branchId = $("#branchEdit").val();
  				for(i in  question.branches){
  					if(question.branches[i].id == branchId){
  						var newBranch = that.getBranchFromLocalStorage();
  						if(newBranch != null){
  							question.branches[i] = newBranch;	
  						}
  					}
  				}
  				$("#myModal").modal('hide');
		    	localStorage['tempBranch'] = '';
		    	$("#branchEdit").val('');
  			}
  		}).getConfirmationModal('closeBranch');
  	},
  
	/**
	 * constructs the branch component from json object
	 * 
	 * @param jsonObj
	 * @returns {MultipleChoiceComponent}
	 */
    deserialize:function(jsonObj){
    	//console.log("deserialise branch");
    	try
    	{
 		var newBranch = new Branch(jsonObj);
 		newBranch.editor.text = newBranch.pathName;
 
 		var k = 0;
 		for (k in newBranch.pathMaps){
 			newBranch.pathMaps[k] = new PathMap(newBranch.pathMaps[k]);
 			if(newBranch.pathMaps[k].range instanceof Array==false){
			var rangeN=newBranch.pathMaps[k].range;
			if(rangeN!=null)
			{
	    		newBranch.pathMaps[k].range=[];
	    		newBranch.pathMaps[k].range.push(rangeN);
			}
			}
 			if(newBranch.pathMaps[k].labelEditorId instanceof Array==false){
 				var drpId=newBranch.pathMaps[k].drpDwnEditorId;
	    		var lblId=newBranch.pathMaps[k].labelEditorId;
	    		newBranch.pathMaps[k].drpDwnEditorId=[];
	    		newBranch.pathMaps[k].labelEditorId=[];
	    		newBranch.pathMaps[k].labelEditorId.push(lblId);
	    		newBranch.pathMaps[k].drpDwnEditorId.push(drpId);
     			
 			}
 			
 			if((newBranch.mappingIndicator == "scoreRange" || newBranch.criteria=="multi") && newBranch.pathMaps[k].range != null && newBranch.pathMaps[k].range.length != 0){
 				var rIndex = 0;
	    		for (rIndex in newBranch.pathMaps[k].range){
	    			if(newBranch.pathMaps[k].range[rIndex] != null)
	    			{
		    			var minRangeEditor = new NumericEditor(newBranch.pathMaps[k].range[rIndex].minRangeEditor);
			    		var maxRangeEditor = new NumericEditor(newBranch.pathMaps[k].range[rIndex].maxRangeEditor);
		    			newBranch.pathMaps[k].range[rIndex] =  new BranchRange(newBranch.pathMaps[k].range[rIndex]);
		    			newBranch.pathMaps[k].range[rIndex].setMinRangeEditor(minRangeEditor);
			    		newBranch.pathMaps[k].range[rIndex].setMaxRangeEditor(maxRangeEditor);
	    			}
	    		}
	    	}
 			var j = 0;
 			for (j in newBranch.pathMaps[k].paths){
 				newBranch.pathMaps[k].paths[j] = new Path(newBranch.pathMaps[k].paths[j]);
 			}
 		}
 		return newBranch;
    	}
    	catch(ex)
    	{
    		console.log(ex);
    	}
    },

   	getBranchFromLocalStorage : function(){
   		var newBranch = this;
   		if(question.tempEditBranch != null){
   			var tempVar = (question.tempEditBranch);
   			
   			newBranch = new Branch(JSON.parse(tempVar));
   	 		newBranch.editor.text = newBranch.pathName;
   	 		var k = 0;
   	 		for (k in newBranch.pathMaps){
   	 			newBranch.pathMaps[k] = new PathMap(newBranch.pathMaps[k]);
   	 			if((newBranch.mappingIndicator == "scoreRange" || newBranch.criteria=="multi") && newBranch.pathMaps[k].range != null && newBranch.pathMaps[k].range.length != 0){
	   	 			var rIndex = 0;
		    		for (rIndex in newBranch.pathMaps[k].range){		    			
		    			if(newBranch.pathMaps[k].range[rIndex] != null)
		    			{
			    			var minRangeEditor = new NumericEditor(newBranch.pathMaps[k].range[rIndex].minRangeEditor);
				    		var maxRangeEditor = new NumericEditor(newBranch.pathMaps[k].range[rIndex].maxRangeEditor);
			    			newBranch.pathMaps[k].range[rIndex] =  new BranchRange(newBranch.pathMaps[k].range[rIndex]);
			    			newBranch.pathMaps[k].range[rIndex].setMinRangeEditor(minRangeEditor);
				    		newBranch.pathMaps[k].range[rIndex].setMaxRangeEditor(maxRangeEditor);
		    			}
		    		}
   		    	}
   	 			var j = 0;
   	 			for (j in newBranch.pathMaps[k].paths){
   	 				newBranch.pathMaps[k].paths[j] = new Path(newBranch.pathMaps[k].paths[j]);
   	 			}
   	 		}
   		}
 		return newBranch;
   	},
   	// to set criteria of branch
   	selectCriteria : function(e){
   		this.criteria=e.currentTarget.value;
   		if(this.criteria == "single"){
   			this.cId_2 = null;
   			this.sectionId_2 =null;
   			this.mappingIndicator_2 = 0;
   			this.secCompType = "";
   			this.pathMaps = [];
   			$("#pathMap_1").trigger("change");
   		}else{
   			this.pathMaps = [];
   		}
   		this.layout();
   		this.afterLayout();
   	},
   	pathLayout : function(){
   		var html = "";
   		var isFrequency = false;
   		if(this.mappingIndicator == "answerOption"){
			html += this.getOptionText();
			html += '	</div>';
		} else{
			var k = 0;
			for(;k<this.pathMaps.length;k++){
				if(k < 3 || isFrequency){
					html += this.pathMaps[k].layout(this.mappingIndicator,this.mappingIndicator_2, false, this.criteria, "", "", this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
				}
				else{
					html += this.pathMaps[k].layout(this.mappingIndicator,this.mappingIndicator_2, true, this.criteria, "", "", this.firstCompType, this.secCompType,this.isScoreRange,this.firstCompObj,this.secCompObj);
				}
			}
			html += '	</div>';
			
		}
   		$("#mappingContainer").html(html);
   		this.afterLayout();
   	},
   	validateBranch:function(){
   			var isvalidPathMap=true;
   			var j=0;
   			var currentComb=[];
   			var pathCombiArr=[];
			for(j in this.pathMaps){
				isvalidPathMap=(!this.isScoreRange)?(isvalidPathMap && this.pathMaps[j].isCombinationExist2(this.firstCompObj,this.secCompObj,this.pathMaps[j],this.isScoreRange)):true;
				currentComb=(this.pathMaps[j].labelEditorId).concat(this.pathMaps[j].drpDwnEditorId);
				pathCombiArr.push(currentComb);
			}	
	
		    for(var i = 0; i <= pathCombiArr.length; i++) {
		        for(var j = i; j <= pathCombiArr.length-1; j++) {
		        	
		            if(i != j && this.isArrayMatched(pathCombiArr[i], pathCombiArr[j])) {
		    		 new Modal(
   		  	              {
   		  	                  id : 1,headingText : "Combination error",
   		  	                  containtText : "same combination can not be used.",
   		  	                  closeActionEvent:function(){
   		  	                	
   		  	                  }
   		  	              }).getWarningModal();
		            	break;
		            }
		        }
		    }			
	   					
			if(!isvalidPathMap && isvalidPathMap!=undefined ){
				new Modal(
	  	              {
	  	            	  
	  	                  id : 1,headingText : "Combination error",
	  	                  containtText : "This combination is already used in another branch.",
	  	                  closeActionEvent:function(){
	  	                	
	  	                  }
	  	              }).getWarningModal();
	   		}
  	
   	},
   	isArrayMatched:function(comb1,comb2){
   		var isMatched=true;
		if(comb1.length==comb2.length){
			var m=0;
			for(m in comb1){
				if(jQuery.inArray(comb1[m],comb2 ) !=-1 ){
					isMatched= isMatched && true;	
				}else{
					isMatched=false;
				}
			}
			
		}else{
			isMatched=false;
		}
   		return isMatched;
   	}
};