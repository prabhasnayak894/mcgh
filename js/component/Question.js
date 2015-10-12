/* ========================================================================
 * Question: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all parts,maintaining the active page,
 * holds current mode of execution, total score of student for this
 * question object.
 * ======================================================================== */
var caretPosFormula = 0;
var Question = function(options){ 
	this.qId=null;
	this.totalScore=0;
	this.pages=[];
	this.formulas=[];
	this.activePage =null;
	this.mode = null;
	this.gradedCount = 0;
	this.markForDelete = [];
	this.progressBar=null;
	this.newFormulaFlag = false;
	this.activeScaleType="sum";
	this.branches=[];
	this.tempBranch = null;
	this.tempEditBranch = null;
	$.extend(this, options);
	this._addPage= Question.BindAsEventListener( this, this.addNewPage );
	this._removePage= Question.BindAsEventListener( this, this.removePages );
	this._showCorrectAnswers= Question.BindAsEventListener( this, this.showCorrectAnswers );
	this._showAnswers= Question.BindAsEventListener( this, this.showAnswers );
	this._displayAllTime = Question.BindAsEventListener(this,this.displayAllTime);
	this._displayOnBranching = Question.BindAsEventListener(this,this.displayOnBranching);
	this._editPartName = Question.BindAsEventListener(this,this.editPartName);
	this._savePartName = Question.BindAsEventListener(this,this.savePartName);
	this._exitPartName = Question.BindAsEventListener(this,this.exitPartName);
	this._enableSaveFormulaButton = Question.BindAsEventListener(this,this.enableSaveFormulaButton);
	this._saveFormula= Question.BindAsEventListener(this,this.saveFormula);
	this._clearFormula= Question.BindAsEventListener(this,this.clearFormula);
	this._removeFormula = Question.BindAsEventListener(this,this.removeFormula);
	this._viewFormula = Question.BindAsEventListener(this,this.viewFormula);	
	this._filter = Question.BindAsEventListener( this, this.filter );
	this._newFormulaButtonClick = Question.BindAsEventListener(this,this.newFormulaButtonClick);
    this._onClickableCellClick = Question.BindAsEventListener(this,this.onClickableCellClick);
    this._retainCaretFormula = Question.BindAsEventListener(this,this.retainCaretFormula);
	this._validateDecimalCount = Question.BindAsEventListener(this,this.validateDecimalCount);
    this._createPathClick = Question.BindAsEventListener(this, this.onCreatePathClick);
    this._deleteBranch = Question.BindAsEventListener(this, this.deleteBranch);
    this._editBranch = Question.BindAsEventListener(this, this.editBranch);
};

//add event helper method
Question.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method by class name
Question.addEventByClassName = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
Question.BindAsEventListener = function(object, fun) {
    return function(event) {
	    if(event.target.nodeName=='div'||event.target.nodeName=='DIV') {    
	    	event.stopImmediatePropagation();
	    }
        return fun.call(object, (event || window.event));
    };
};

Question.prototype = {
		/**
		 * gets parts of question
		 * @returns {Array} of parts
		 */
		 getPages: function(){
             return this.pages;
         },
         /**
          * sets parts for question
          * @param pages
          */
         setPages: function(pages){
             this.pages = pages;  
         },
         getFormulas:function(){
        	 return this.formulas;
         },
         setFormulas:function(formulas){
        	this.formulas = formulas; 
         },
         /**
          * gets current mode of execution
          * @returns mode
          */
         getMode : function(){
        	return this.mode; 
         },
         /**
          * sets mode of execution
          * @param mode
          */
         setMode : function(mode){
        	 this.mode = mode;
         },
         /**
          * gets getGradedCount
          * @returns gradedCount
          */
         getGradedCount : function() {
     		return this.gradedCount;
     	},
     	/**
         * sets gradedCount
         * @param gradedCount
         */
     	setGradedCount : function(count) {
     		this.gradedCount = count;
     	},
     	 getActiveScaleType: function(){
         return this.activeScaleType;
        },
        
        setActiveScaleType : function(activeScaleType){
         this.activeScaleType = activeScaleType;
        },
            
     	resetGradeCount:function(){
			var i = 0;
			var gradedCount = 0;
			for (i in question.pages) {
				var j = 0;
				for (j in question.pages[i].components) {
					
					if(question.pages[i].components[j].type=='scale'){
						if(question.pages[i].components[j].scaleType=='S'){
							var k=0;
							for(k in question.pages[i].components[j].statements){
								if(question.pages[i].components[j].statements[k].isGraded()==true){
									gradedCount++;
		   						}
							}
						}else{
							var k=0;
							for(k in question.pages[i].components[j].subCategories){
								var statementIDS = question.pages[i].components[j].subCategories[k].statementIds;
								if(statementIDS.length>0)
								{
									var m = 0;
									for(m in statementIDS)
									{
										if(question.pages[i].components[j].statements[m]!=undefined)
										{
											if(question.pages[i].components[j].statements[m].isGraded() ==true)
												gradedCount++;
										}
									}
								}
								//gradedCount=gradedCount+question.pages[i].components[j].subCategories[k].statementIds.length;
							}	
						}
					} else if(question.pages[i].components[j].type=='table'){
						var k=0;
							for(k in question.pages[i].components[j].cellComponentCollection){
								var component = question.pages[i].components[j].cellComponentCollection[k].component;
								if(component != "" && component.type != "Label" && component.type != undefined){
									if(component.graded){
										gradedCount++;
									}
								}
							}
					} else{
						if (question.pages[i].components[j].isGraded() == true) {
							gradedCount++;
		  	        	}
					}
				}
			}
			question.gradedCount = gradedCount;
			$("#gdObjetPcHolder").html(gradedCount);
     	},
     	getMarkForDelete : function(){
     		return this.markForDelete;
     	},
     	setMarkForDelete : function(markForDelete){
     		this.markForDelete = markForDelete;
     	},
         /**
          * gets totalScore
          * @returns totalScore
          */
         getTotalScore : function(){
        	return this.totalScore; 
         },
         /**
          * sets totalScore
          * @param totalScore
          */
         setTotalScore : function(totalScore){
        	 this.totalScore = totalScore;
         },
         /**
          * gets the active page
          * @returns activePage
          */
         getActivePage: function(){
        	 return this.activePage;
         },
         /**
          * adds new page and sets new page as the active page 
          */
         addNewPage:function(){
         	
  	    	var newId= this.pages.length>0?this.pages[this.pages.length-1].getId()+1:this.pages.length+1;
  	    	var newPage  =  new Page({id:newId, name:"Part "+newId});
  	    	this.pages.push(newPage);
  	    	if(this.pages.length>1){
         		util.reArrangeComponent(this.activePage);
         	}
  	    	this.setActivePage(newPage);
  	    	page = this.activePage;
  	    	$("#page_"+this.activePage.id).addClass("active");
  	    	$("#properties").hide(); 
  	    	$("#elementProperties").hide();
  	    	$("#expandall").text('Collapse All');
  	     },  
  	     /**
  	      * removes the active page and sets the next page as active page
  	      * if next page does not exist sets the first page as active page 
  	      * else sets the active page to null 
  	      * @param event
  	      */
  	     removePages:function(event){
  	    	var removePage = true;
  	    	$.each(question.markForDelete,function(index,removePageId){
				 var i=0;
				 for(i in question.pages){
					 if(question.pages[i].id==removePageId){
						 if(question.pages[i].isBranchDest){
							 removePage = false;
						 }else{
							 for (j in question.pages[i].components) {
									if(question.pages[i].components[j].isBranchDest || 
					  	    	 		question.pages[i].components[j].isBranched || 
					  	    	 		question.pages[i].components[j].isSectionBranchDest || 
					  	    	 		question.pages[i].components[j].isSectionBranch){
										removePage = false;
										break;
									}
								}
						 }
						 
					 }
				 }
	
  	    	});
			 if(removePage){
	  	    	 new Modal({id : 1,
	   	    		headingText : "Are you sure?",
	   				containtText : "Are you sure you want to delete this part? Doing so will delete all components in this part.",
	   	    		 okActionEvent : function(){
	 		  	     	 if(question.markForDelete.length>0){
	 		  	    			$.each(question.markForDelete,function(index,removePageId){
	 		  	    				 var i=0;
	 		  	    				 for(i in question.pages){
	 		  	    					 if(question.pages[i].id==removePageId){
	 		  	    						question.pages.splice(i, 1);
	 		  	    						if(question.activePage!=null){
	 		  	    							if(question.activePage.id == removePageId){
	 		  	    								//question.activePage = null;
	 			  	    							question.setActivePage(question.pages[0]);
	 			  	    						}
	 		  	    						}
	 		  	    					 }
	 		  	    				 }
	 		  	    			});
	 		  	    			question.markForDelete.length=0;
	 		  	    			question.resetGradeCount();
	 		  	    			 if(question.pages.length==0){
	 		  	    				question.addNewPage();
	 		  	    				/*remove all part related components and properties*/
	 		  	    				$("#formToolCanvasId").find("div.pageSection").remove();
	 		  	    			 }
	 		  	    			question.layout();			  	    			
	 		  	    		 }
	 		  	     	
	 		    	 }}).getConfirmationModal();
			 }
			 else{
				 new Modal({
					id : 1,
					headingText : "Warning ! ",
					containtText : "This Part is used in path mapping logic and cannot be deleted.",
				 }).getWarningModal();
			 }
 	     },  
 	     //
 	    setActivePageBranch : function(){
 	    	//if directly part 1 is not set as dest then check it's internal components
 	    	if(!this.pages[0].isBranchDest){
 	    		var i = 0;
 	    		for(i in this.pages[0].components){
 		    		 if(!this.pages[0].components[i].isBranchDest){
 		    			 
 		    		 }
 		    	 }
 	    	}else{
 	    		var index = 0;
 	    		for( index in this.pages){
 	    			var i = 0;
 	    			for(i in this.pages[index].components){
 	    				
 	    			}
 	    		}
 	    	}
 	    	
 	    },
 	     /**
 	      * The layout in design mode
 	      */
         layout : function(){
        	 if(this.activePage==null && this.pages.length>0){
        		 this.setActivePage(this.pages[0]);
        	 }
        	 if(this.activePage!=null){
        		// debugger;
	        	 this.activePage.doLayout();
	        	 var partName = this.activePage.name != null ? this.activePage.name : "Part "+this.activePage.id;
	        	 var disabled = this.markForDelete.length==0 ? disabled="disabled" : "";
	        	 var htmlelement='';
	        	 htmlelement +=' <div class="head-info">';
	        	 htmlelement +=' 	<a class="info-icon" href="javascript:void(0);" onclick="showHelpModal(\'part\');" id="help_'+this.activePage.id+'"></a> Parts ';
	        	 htmlelement +=' 	<button '+disabled+'  class="btn btn-grey btn-xs pull-right" id="deletePartsButtonId" title="Delete">';
	        	 htmlelement +=' 				<input type="checkbox" id="deletePartsButtonId" disabled="disabled"> <img id="imgRemovePage" src="img/recycle.png">';
	        	 htmlelement +=' 	</button>';
	        	 htmlelement +=' 	<label class="btn btn-grey btn-xs pull-right marginR5" id="addPage" title="Add part">';
	        	 htmlelement +=' 			<input type="checkbox"> <img id="imgNewPage" src="img/filePlus.png">';
	        	 htmlelement +=' 	</label>';
	        	 htmlelement +=' </div>';
	        	 htmlelement +=' <div class="clear"></div><div class="saperator"></div>';
	        	 htmlelement +='<div class="tabContent">';
	        	 var disabled = this.activePage.id==1 ? 'disabled="disabled"' : "";
	        	 var inActiveCss = this.activePage.id==1 ? "class='disable-section'" : "";
	        	 var i=0;
	        	 for( i in this.pages){
	        		 if(this.pages[i].id==this.activePage.id){
	        			 htmlelement +=this.pages[i].pageLayout(true);
	        		 }
	        		 else{
	        			 htmlelement +=this.pages[i].pageLayout(false);
	        		 }       		            	
	  	  	    	}
	  	  	     htmlelement +='<div class="clear"></div>';
	        	 htmlelement +='<div class="saperator"></div>';
	        	 htmlelement +='<div id="partNameDivId"><div class="pull-left" id="partNameOld">'+partName+'</div> <a class="editbranching" id="editPartNameId">Edit</a><div class="clear"></div></div>';
	        	 htmlelement +='<div id="showhidebox2" style="display: none;">';
	        	 htmlelement +=' 		<div contenteditable="true" class="borderdiv"  title="required field" maxlength="40"  placeholder="Part Name" id="partNameNew"> </div>';
	        	 htmlelement +='			<div class="anchorbox"><a id="savePartNameId">Save</a> |<a id="exitPartNameId"> Cancel</a></div></div>';        	 
	        	 htmlelement +='<p class="txtediting boldclass" style="margin-top : 5px">ID #'+this.activePage.idPrefix+this.activePage.id+'</p>';
	        	 htmlelement +='<p class="txtediting boldclass" style="display : none;">Display settings:</p>';
	        	 htmlelement += '<div style="display : none;">';
	        	 htmlelement += '	<input type="radio"  name="displayBranchingMode" id="displayAllTimeId"><label for="displayAllTimeId"><span></span> Always display </label>';
	             htmlelement += ' <input type="radio"  name="displayBranchingMode" id="displayOnBranchingId" '+disabled+'><label '+inActiveCss+' for="displayOnBranchingId"><span></span><div class="radioText"> Display if branching conditions are met </div></label>';
	             htmlelement += '</div>';
	             htmlelement +='<div id="branchingBoxDivId"  class="branchingbox" style="display : none;">';
	            htmlelement +='<p class="txtediting boldclass">Path conditions:</p>';
	            htmlelement +='<p class="txtediting">Displays if student submits a ';
	            htmlelement +='response to Checkbox element</p> ';
	            htmlelement +='<p>ID #13455</p> ';
				htmlelement +='</div>';
	            htmlelement +='</div>';
	        	$("#canvas_page").html(htmlelement);
	        	
	        	var formulaHtmlElement = "";
	        	 formulaHtmlElement += '<div class="componentTytle"> <a href="#" class="info-icon"></a>Formulas </div>';
	        	 formulaHtmlElement += '<ul class="nav nav-tabs">';        	 
	        	 formulaHtmlElement += '<li><a href="#home" class="Properties_MRT" data-toggle="tab">Properties</a></li>';
	        	 formulaHtmlElement += '<li><a href="#profile" data-toggle="tab">Info</a></li>';
	        	 formulaHtmlElement += ' </ul>';
	        	 formulaHtmlElement += '<div class="tab-content formula_tab_properties">';
	        	 formulaHtmlElement += '<a href="#" id="newFormula" data-toggle="tab" class="newFormula">New</a>';
	        	 formulaHtmlElement += '<div class="tab-pane fade in active" id="home">';
	        	 formulaHtmlElement += '<table class="table tblBorder">';
	        	 formulaHtmlElement += ' <tbody>';
	        	 var j=0;
	        	 for( j in this.formulas){
	        		 formulaHtmlElement += this.formulas[j].formulaPropertiesLayout();
	        	 }
	        	 formulaHtmlElement += ' </tbody>';
	        	 formulaHtmlElement += '</table>';
	        	 formulaHtmlElement += '<div id="formulaIdText" class="pull-right"><span id="formulaId">' + this.getNewFormulaId()+ '</span></div>';
	        	 formulaHtmlElement += '<input id="formulaName" type="text" placeholder="New Formula Name" disabled="true"><br/>';
	        	 formulaHtmlElement += '<div id="formulaEquation" contenteditable="false" data-placeholder="" class="equals-Symbol"></div>';
	        	 formulaHtmlElement += '<div class="checkbox formulaCheckboxDiv">';
	        	 formulaHtmlElement += '<div class="componentTytle"><a class="info-icon"></a>Decimal Places</div>';
	        	 formulaHtmlElement += '<div class="formulaDecimal form-group form-input">';
	        	 formulaHtmlElement += '<div class="formulaDecimalLabel">Decimal Places 0-6 decimal places</div>';
	        	 formulaHtmlElement += '<input type="text" id="formulaDecimalCount" placeholder="0" value="0" disabled/>';
	        	 formulaHtmlElement += '</div>';
	        	 formulaHtmlElement += '</div>	';
	        	 formulaHtmlElement += ' <div class="btn_wdth">  ';
	        	 formulaHtmlElement += '<button id="cancelFormula" type="button" class="btn btn-default btn1" disabled>cancel</button>';
	        	 formulaHtmlElement += '<button id="saveFormula" type="button" class="btn btn-default btn2" disabled>OK</button>';
	        	 formulaHtmlElement += '</div>  ';
	        	 formulaHtmlElement += '</div>';
	        	 formulaHtmlElement += '<div class="tab-pane fade" id="profile">';
	        	 formulaHtmlElement += '  <ul>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-1"><a href="#">+ Addition</a><div id="info-formula-1" class="collapse" >Syntax = ID# 1 + ID# 2</div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-2"><a href="#">- Subtraction</a><div id="info-formula-2" class="collapse">Syntax = ID# 1 - ID# 2</div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-3"><a href="#">* Multiplication</a><div id="info-formula-3" class="collapse">Syntax = ID# 1 * ID# 2</div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-4"><a href="#">/ Division</a><div id="info-formula-4" class="collapse">Syntax = ID# 1 / ID# 2</div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-5"><a href="#">() Parenthesis</a><div id="info-formula-5" class="collapse">Syntax = (ID# 1)</div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-6"><a href="#">E^2 Exponent</a><div id="info-formula-6" class="collapse">Syntax = (ID# 1)^2</div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-7"><a href="#">Count</a><div id="info-formula-7" class="collapse">Count(ID# 1, Id#2, ID#3,ID#$)</div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-8"><a href="#"><> Inserting a Calculation</a><div id="info-formula-8" class="collapse">Syntax = &lt;F1&gt; </div></li>';
	        	 formulaHtmlElement += '<li  data-toggle="collapse" data-target="#info-formula-9"><a href="#">[] Inserting a Formula</a><div id="info-formula-9" class="collapse">Syntax = [F1]</div></li>';
	        	 formulaHtmlElement += ' </ul>';
	        	 formulaHtmlElement += '</div>';
	        	 formulaHtmlElement += '</div>';
	        	 formulaHtmlElement += '';
	        	 $("#formulas_tab").html(formulaHtmlElement);

	        	 /* layout for branch listing */
	        	 //if(this.branches.length > 0){
					 var branchHtml = "";
		        	 branchHtml += '<table class="table tblBorder left-align"><tbody>';
		        	 var k=0;
		        	 if(this.branches.length>0){
		        	 	branchHtml += '<tr><td class="boldclass" style="text-align: center;" colspan="2">Existing Paths</td></tr>';
		        	 } else{
		        	 	branchHtml += '<tr><td class="boldclass" style="text-align: center;width: 200px; max-width: 200px;">No Path Exists</td></tr>';
		        	 }

		        	 for( k in this.branches){
		        	 	 branchHtml += '<tr><td style="width: 182px; max-width: 200px;"><a class="deleteBranch" id="del'+this.branches[k].id+'" href="#"><span class="glyphicon glyphicon-trash" style="font-size:11px;"></span></a>';
		        		 branchHtml += '<a class="smallFont editBranch" href="#" id="edit'+this.branches[k].id+'">'+this.branches[k].pathName+'</a></td>';
		        		 branchHtml += '<td class="boldclass">ID  #'+this.branches[k].id+'</td>';
		        		 branchHtml += '<div clas="clear"></div>'
		        	 }
		        	 branchHtml += '</tbody></table>';
		        	 $("#branch-list").html(branchHtml);

		         //} else{
		         	//$("#branch-list").html("No path exists");
		         //}
	        	 
	        	this.afterLayout();	
	   	    	var j=0;
	   	    	for( j in this.pages){
	    			this.pages[j].afterPageLayout();
		  	    }
	   	    	if(this.activePage.displaySetting){
	   	    		$("#displayAllTimeId").prop("checked",true);
	   	    	}	
	   	    	else{
	   	    		$("#displayOnBranchingId").trigger("click");
	   	    	}
	        	$("#page_"+this.activePage.id).addClass("active");
	        	
	        	if(this.activePage.name != null && this.activePage.name != ''){
	        		$("#spnCurrentPage").html(this.activePage.name);
	        	}else{
	        		$("#spnCurrentPage").html("Part " + this.activePage.getId());
	        	}
	        	$("#gdObjetPcHolder").html(question.gradedCount);
        	 }
	    },
	    /**
	     * sets the page as active Page
	     * clears the connent of previous active page if exists
	     * and sets the content of new active page
	     * @param page
	     */
	    setActivePage:function(page){	    	
	    	if(page!=null){
		    	if(page.type =='click'){
		    		page = page.data.page;
		    	}
		    	var currentActivePage=null;
		    	if(question.activePage!=null && question.activePage.id != page.id){
		    		currentActivePage= question.activePage;
		    		question.clearPage();
		    	}	
		    	var i=0;
		    	for( i in question.pages){
		    		 if(question.pages[i].id ==page.id){
		    			 question.activePage =question.pages[i];
		    		 }
		    	 }
		    	page = question.activePage;
		    	switch(question.mode){
		    	case  MODE_TEST:
		    		question.validateStudentLayout(currentActivePage,page);
		    		break;
		    	case  MODE_PREGRADE:
		    		question.checkMyWorkLayout();
		    		break;
		    	case  MODE_PREVIEW:
		    		question.instructorLayout();
		    		break;
		    	case  MODE_POST_TEST:
		    		question.postSubmissionReviewLayout();
		    		break;
		    	case  MODE_DESIGN:
		    		question.layout();
		    		break;
		    	}
	    	}
	    },
	    /**
	     * clears the content of current active page
	     */
	    clearPage:function(){
	    	for( i in question.activePage.components){
	    		 var htmlDiv =  question.activePage.idPrefix+question.activePage.id+question.activePage.components[i].idPrefix+ question.activePage.components[i].id;
	    		 $('#'+htmlDiv).remove();
	    	 }
	    },
	    /**
	     * remove unwanted property before stringfy
	     */
	    toJSON:function(){
	    	    var copy = this.copy(); 	    	    
	    	    return copy; //return the copy to be serialized
	    },
	    /**
	     * Create clone of current Object
	     */
	    copy:function () {
	    	    if (null == this || "object" != typeof this) return this;
	    	    var copy = this.constructor();
	    	    for (var attr in this) {
	    	        if (this.hasOwnProperty(attr)) copy[attr] = this[attr];
	    	    }
	    	    return copy;
	    	},
	    	
	    
	    /**
	     * gets the serialized string form of current question object
	     * @returns {String}
	     */
	    serialize : function() {
	    	$.each(this.pages,function(index,page){
	    		page.serialize();
	    	});
	    	$.each(this.formulas,function(index,formula){
	    		formula= util.flatten(formula);
	    	});
	    	
	    	/* function to skip table instance from json string to avoid cyclic data in json */
	    	function replacer(key,value){
	    	    if (key=="itsTableInstance") return undefined;	    	    
	    	    else return value;
	    	}	    	
	    	return "{\"question\":" +JSON.stringify(this.toJSON(), replacer)+ "}";
		},
		/**
		 * constructs the question object from json string
		 * @param strJson
		 */
		deserialize : function(strJson) {
			var pages = new Array();
			try{
				strJson = decodeURIComponent(escape(strJson));
			}catch(exp){
			  console.log(exp);
			}
			try{
				var jsonObj = JSON.parse(strJson);
			}catch(exp){
				  console.log(exp);
				}
			var pagesArr = jsonObj.question.pages;
			var i = 0;
			for (i in pagesArr) {
				if (pagesArr[i].idPrefix == "P") {
					var page = new Page();
					page = page.deserialize(pagesArr[i]);
					pages.push(page);
				}
			}
			var formulas=new Array();
			var jsonObjFormula=JSON.parse(strJson);
			var formulaArr = jsonObjFormula.question.formulas;
			for(i in formulaArr){
					var formula = new Formula();
					formula = formula.deserialize(formulaArr[i]);
					formulas.push(formula);
			}
			var branches=new Array();
			var brancheArr = jsonObjFormula.question.branches;
			for(var i in  brancheArr){
				var branch = new Branch();
				branch = branch.deserialize( brancheArr[i]);
				branches.push(branch);
			}
			question = new Question({
				pages : pages,
				qId : jsonObj.question.qId,
				totalScore : jsonObj.question.totalScore,
				gradedCount : jsonObj.question.gradedCount,
				activePage : jsonObj.question.activePage,
				formulas:formulas,
				branches:branches,
				
			});
		},
		/**
		 * adds events to Question object after the design layout
		 */
		afterLayout : function() {
			Question.addEvent("imgNewPage", "click", this._addPage);
			Question.addEvent("deletePartsButtonId", "click", this._removePage);
			Question.addEvent("editPartNameId", "click", this._editPartName);
			Question.addEvent("displayAllTimeId", "click", this._displayAllTime);
			Question.addEvent("displayOnBranchingId", "click", this._displayOnBranching);
			Question.addEvent("savePartNameId", "click", this._savePartName);
			Question.addEvent("exitPartNameId", "click", this._exitPartName);
			Question.addEvent("formulaName", "click", this._enableSaveFormulaButton);
			//Question.addEvent("formulaEquation", "click", this._enableSaveFormulaButton);
			Question.addEvent("saveFormula", "click", this._saveFormula);
			Question.addEvent("cancelFormula", "click", this._clearFormula);
			Question.addEventByClassName("deleteFormula", "click", this._removeFormula);			
			Question.addEventByClassName("viewFormula", "click", this._viewFormula);
			Question.addEvent( "formulaEquation", "paste", this._filter);
			Question.addEvent( "newFormula", "click", this._newFormulaButtonClick);
			Question.addEvent( "formulaDecimalCount", "blur", this._validateDecimalCount);
			Question.addEvent( "createPath", "click", this._createPathClick);
			Question.addEventByClassName("deleteBranch", "click", this._deleteBranch);
			Question.addEventByClassName("editBranch", "click", this._editBranch);
        },
		displayAllTime : function(){
			this.activePage.displaySetting = true;
			$("#branchingBoxDivId").hide("slow");
		},
		displayOnBranching : function(){
			this.activePage.displaySetting = false;
			$("#branchingBoxDivId").show("slow");
		},
		editPartName : function(){
			 var partName = this.activePage.name != null ? this.activePage.name : "Part "+this.activePage.id;
			$("#partNameDivId").hide();
			$("#showhidebox2").show();
			$("#partNameNew").html(partName);
		},
		savePartName : function(){
			
			var partName = $.trim($("#partNameNew").html());
			if(partName != ''){
				
				 this.activePage.name = partName.replace(/&nbsp;/gi,''); 
				 var partNamenew = this.activePage.name != null ? this.activePage.name : "Part "+this.activePage.id;
				 $("#partNameOld").html(partNamenew);
				 $("#showhidebox2").hide();
				 $("#partNameDivId").show();
				 $("#spnCurrentPage").html(partName);			
			}
		},
		exitPartName : function(){
			var partNamenew = this.activePage.name != null ? this.activePage.name : "Part "+this.activePage.id;
			 $("#partNameOld").html(partNamenew);
			 $("#showhidebox2").hide();
			 $("#partNameDivId").show();
		},
		/**
		 * Layout in instructor preview mode
		 */
		instructorLayout : function() {
			this.activePage.doInstructorLayout();
			this.doProgressBarLayout();
		},
		/**
		 * do ProgressBar Layout.
		 */
		doProgressBarLayout:function(){
			$("#top_paggerId").html(this.pageLayout("top"));
			$("#paggerId").html(this.pageLayout("bottom"));
			
			this.afterPageLayout();
		},
		/**
		 * Layout in student test mode
		 */
	    studentLayout:function(){
		     this.activePage.doStudentLayout();
		     this.doProgressBarLayout(); 
	   	},
	   	/**
	   	 * Layout in check my status mode after test mode
	   	 */
		checkMyWorkLayout : function() {
			 this.activePage.doCheckMyWorkLayout();
			 this.doProgressBarLayout();
		},
		/**
		 * Layout in post submission review mode
		 */
		postSubmissionReviewLayout:function(){
	         this.activePage.doPostSubmissionReviewLayout();
	         this.doProgressBarLayout();
	    	 Question.addEvent("showCorrectAnswers_review", "click",this._showCorrectAnswers);
	    	 this.calculateTotalScore();
	 	},
		/**
		 * Show the correct/wrong answers marked by author during design mode
		 */
	   	showCorrectAnswers:function(){
	   		this.activePage.showCorrectAnswers();
	   	},
	   	/**
	   	 *layouts the paging as part1, part2...
	   	 * @returns {String}
	   	 */ 
	   	pageLayout:function(idPrefix){
			
			if(this.progressBar==null){
				var config = {id:1,idPrefix:(idPrefix !=undefined)?idPrefix:"bottom"};
				this.progressBar = new ProgressBar(config);
				var partConfig={id:1,idPrefix:config.idPrefix};
				var parts=[];
				var i = 0;
				var enableFlag= true;
				for (i in this.pages) {
					var partName= this.pages[i].name==null ? 'Part ' + (parseInt(i)+1) : this.pages[i].name;
					partConfig.id=parseInt(i)+1;
					partConfig.pageId=this.pages[i].id;
					partConfig.name=partName;
					partConfig.enabled= enableFlag;
					if(this.mode==MODE_TEST){
						var cnt=this.hiddenComponentsOnPage(this.pages[i]);
						var isEqual= (cnt==this.pages[i].components.length)?true:false;
						if(!this.pages[i].isRequiredToProgressMeet() ){
							enableFlag=false;
						}
						if(isEqual){
							console.log("disable flag isequal");
							partConfig.enabled= false;
						}else if(i!=0 && !this.pages[i].isBranchDest && this.pages[0].isRequiredToProgressMeet() && this.previousPartAnswered(i)){
							partConfig.enabled= true;
						}else{
							console.log("disable flag");
							partConfig.enabled= false;
						}
					}
					//TODO: [Debasmita] Need to implement disable logic for progressbar
					if(i==0){
						partConfig.active=true;
						partConfig.enabled= true;
					}else{
						partConfig.active=false;
					}
					parts.push(new PartInfo(partConfig));
				}
				this.progressBar.setParts(parts);
			}else{
				this.progressBar.idPrefix=(idPrefix !=undefined)?idPrefix:"bottom";
				var i = 0;
				for (i in this.progressBar.parts) {
					this.progressBar.parts[i].idPrefix=this.progressBar.idPrefix;
				}
			}
			
			
			var html= this.progressBar.layout();
			
			return html;
		},
		previousPartAnswered:function(currentPart){
			var isAns=true;
			for(var i=0;i<currentPart;i++){
				isAns=isAns && this.pages[i].isRequiredToProgressMeet();
			}
			return isAns;
			
		},
		hiddenComponentsOnPage:function(page){
			var hiddenCom=0;
			for (i in page.components) {
				if(page.components[i].showToStud!=undefined && !page.components[i].showToStud){
					hiddenCom++;
				}
				
			}
			return hiddenCom;
		},
		updateProgressBar:function(){	
			console.log("update progress bar");
			if(this.progressBar !=null){
				var enableFlag=true;
				for (var i=0; i<this.pages.length;i++) {
					if(!this.pages[i].isRequiredToProgressMeet()){
						this.progressBar.parts[i].enabled=enableFlag;
						enableFlag=false;
					}else{
						//enableFlag=true;
						this.progressBar.parts[i].enabled=enableFlag;
					}
					if(this.branches.length > 0){
						if(this.pages[i].isBranchDest){
							if(!this.pages[i].showToStud){
								this.progressBar.parts[i].enabled=false;
							}
							else{
								//this.progressBar.parts[i].enabled=true;
							}
						}else{
							var countHiddenComp = 0;
							for (j in this.pages[i].components) {
								if(this.pages[i].components[j].isBranchDest){
									if(!this.pages[i].components[j].showToStud){
										countHiddenComp++;
									}
								}
								else if(this.pages[i].components[j].sections != undefined){
									var countHiddenSections = 0;
									for (k in this.pages[i].components[j].sections) {
										if(this.pages[i].components[j].sections[k].isBranchDest){
											if(!this.pages[i].components[j].sections[k].showToStud){
												countHiddenSections++;
											}
											if(k == (this.pages[i].components[j].sections.length-1) && countHiddenSections == this.pages[i].components[j].sections.length){
												countHiddenComp++;
											}
										}
									}
								}
								if(j == (this.pages[i].components.length-1) && countHiddenComp == this.pages[i].components.length){
									this.progressBar.parts[i].enabled = false;
								}else{
									//this.progressBar.parts[i].enabled = true;
								}
							}
						}
					}
				}				
				this.doProgressBarLayout();
			}
			
		},
		/**
		 * adds the click event on part to switch the page  
		 */
		afterPageLayout:function(){
			this.progressBar.afterLayout();
		},
		/**
		 * calculates score for this question
		 */
		calculateTotalScore:function(){
			var i = 0;
			var totalGradedCnt=0;
			var componentScoreSum=0;
			for (i in this.pages) {
				if(this.pages[i].showToStud == undefined || this.pages[i].showToStud){
					var j=0;
					for (j in this.pages[i].components) {
						var isCompHidden = false;
						isCompHidden = this.isVisibleGradedComponent(this.pages[i].components[j]);
						if(!isCompHidden){
							if(this.pages[i].components[j].type == "scale"){
								componentScoreSum=componentScoreSum + this.pages[i].components[j].calculateScore();
								totalGradedCnt += this.pages[i].components[j].getComponentLabelGradeCount();
								
							}else if(this.pages[i].components[j].type == "inputField"){
								if(this.pages[i].components[j].subType=='label'){
									//do nothing	
								} else if(this.pages[i].components[j].isGraded()){
									componentScoreSum=componentScoreSum + this.pages[i].components[j].calculateScore();
									totalGradedCnt++;
								}
							} else if(this.pages[i].components[j].type == "table"){
								componentScoreSum=componentScoreSum + this.pages[i].components[j].calculateScore();
								totalGradedCnt += this.pages[i].components[j].getComponentGradeCount();
							}
							else if(this.pages[i].components[j].isGraded()){
								componentScoreSum=componentScoreSum + this.pages[i].components[j].calculateScore();
								totalGradedCnt++;
							}
						}
			
					}
				}
			}
			var totalScore =(componentScoreSum/totalGradedCnt)*100;
			this.setTotalScore(totalScore);
			return totalScore;
		},
		/**
		 * check if graded component is visible 
		 */
		isVisibleGradedComponent : function(comp){
			if(this.branches.length > 0){
				var countHiddenComp = 0;
				if(comp.isBranchDest){
					if(!comp.showToStud){
						return true;
					}
				}
				else if(comp.sections != undefined){
					var countHiddenSections = 0;
					for (k in comp.sections) {
						if(comp.sections[k].isBranchDest){
							if(!comp.sections[k].showToStud){
								countHiddenSections++;
							}
							if(k == (comp.sections.length-1) && countHiddenSections == comp.sections.length){
								return true;
							}
						}
					}
				}
			}
			return false;
		},
		/**
		 * validate component is filled for question
		 */
		validateQuestion:function(){
			var i = 0;
			var validatorObj = new Object();
			validatorObj.errorMsg = "";
			for (i in this.pages) {
				var j = 0;
				//this.setActivePage(this.pages[i]);
				for (j in this.pages[i].components) {
					validatorObj = this.pages[i].components[j]
							.validateComponent(validatorObj);
				}
			}
			
			return validatorObj;			   
		},
			 
		/**
		 * validate if answered for question
		 */
			  validateStudentLayout:function(currentActivePage,page){				
					var islayoutValidated = true;
					if (currentActivePage != null) {
						if(currentActivePage.id>=page.id ){
							question.studentLayout();
						}else{
							var j = 0;
							for (j in currentActivePage.components) {
								if(currentActivePage.components[j].showToStud){
									islayoutValidated = currentActivePage.components[j]
												.validateStudentQuestionLayout();
								}
								if (!islayoutValidated) {
									break;
								}
							}
						}
					} else {
						//question.studentLayout();
						//islayoutValidated=false;
					}
					if (islayoutValidated) {
						question.studentLayout();
					} else {
						this.setActivePage(currentActivePage);
						var errorMsg = "<br> Please check any option";
						new Modal({
							id : 1,
							headingText : "Validation Error",
							containtText : errorMsg,
							closeActionEvent:function(){
								/*reset active bubbles to active page*/
								setTimeout(function(){
									$("#top"+currentActivePage.id).trigger("click");
									$("#top"+page.id).removeClass("partVisited");
									$("#bottom"+page.id).removeClass("partVisited");
									/*reset active and visited flags*/
									var i=0;
									for(i in  question.progressBar.parts){
										 if(question.progressBar.parts[i].id==page.id){
											 question.progressBar.parts[i].active=false;
											 question.progressBar.parts[i].visited=false;
										 }
									 }
									
								},200);
				   	        }
						}).getWarningModalForStudent();
						setTimeout(function(){
							$(".reveal-modal").find(".close-reveal-modal").trigger("click");
							$("#modalDivId").hide();
						},3000);
						
						$("#cancelButtonId").hide();
						$("#okButtonId").hide();
					}
			},
			/***
			 * Function to view Formula
			 * Called when Formula (from Properties Tab) is clicked
			 */
			viewFormula : function(e){
		  		var viewFormulaId = e.currentTarget.name;
		  		for( i in this.formulas){	        		 
	        		 if(this.formulas[i].id==viewFormulaId){						
	        			 $("#formulaId").text(viewFormulaId);
	        			 $("#formulaName").val(this.formulas[i].name);
	        			 $("#formulaEquation").text(this.formulas[i].equation);
	        			 $("#formulaDecimalCount").val(this.formulas[i].decimalVal);
	        			 this.enableSaveFormulaButton();
	        			 this.enableCancelFormulaButton();
	        			 
	        			 var formulaId = viewFormulaId;
	     				 var formulaName = this.formulas[i].name;
	     				 var formulaEquation = this.formulas[i].equation;				
	     				 var formula  =  new Formula({id:formulaId,name:formulaName,equation:formulaEquation});				
	     				 var validationStatus = formula.validateFormula(question);
	     				 if(validationStatus){
	     					question.formulas[i].setCautionIconStyle("none");
	     				 }
	     				 this.newFormulaButtonClick();
	     				 var studentIds = formula.getStudentEntryIds(this.formulas[i].equation);
	     				 var invalidStatus = formula.getStudentEntriesValidationStatus(this.formulas[i].equation);

	     				 var invalidIds = formula.getStudentInavalidEntries(this.formulas[i].equation);
						if(invalidStatus != "success"){	     					
	     				 	this.displayMessageModal("", '"' + invalidStatus + '"');
							
	     				 }
						
	     				
	     				 
	     				 	/*jQuery.grep(invalidIds, function(el) {
	     				 		if (jQuery.inArray(el, studentIds) == -1) usedId.push(el);
	     				 		i++;
	     				 	});
	     				 	if(usedId == "")
	     				 		usedId = invalidIds;
	     				 	for(i in usedId){
		     				 	if( $("#"+studentIds[i]).hasClass('inputDummy') ){
		     				 		$("#"+studentIds[i]).addClass("greenBorder");
		     				 	} else {
		     				 		$("#"+studentIds[i]+' div').addClass("greenBorder");
		     				 	}
		     				 }	

	     				 	return false;
	     				 }*/
	     				 
	     				 /*to reset previous green bordered ids*/
	     				 var x=0;
	     				 var allStudentIds = [];
	     				 for(x in this.formulas){
	     					/*get all studentids*/
	     					allStudentIds=formula.getStudentEntryIds(this.formulas[x].equation);	
	     					if(allStudentIds.length > 0){
		     					/*reset previous green bordered ids*/
		     					var y=0;
		     					for(y;y<allStudentIds.length;y++){
		     						var stdIdObj = $("#"+allStudentIds[y]);
		     						if( stdIdObj.hasClass('inputDummy') && stdIdObj.hasClass("greenBorder")){
		     							stdIdObj.removeClass("greenBorder");
			     				 	}
		     					}
		     				 }
	     				 }
	     				 
	     				 var i = 0,
	     				 	 j = 0;

	     				 for(i in studentIds){
	     				 	if( $("#"+studentIds[i]).hasClass('inputDummy') ){
	     				 		$("#"+studentIds[i]).addClass("greenBorder");
	     				 	} else {
	     				 		$("#"+studentIds[i]+' div').addClass("greenBorder");
	     				 	}
	     				 }
	     				 for(j in invalidIds){
	     				 	if( $("#"+invalidIds[j]).hasClass('inputDummy') ){
	     				 		$("#"+invalidIds[j]).removeClass("greenBorder");
	     				 	} else {
	     				 		$("#"+invalidIds[j]+' div').removeClass("greenBorder");
	     				 	}
	     				 }					 
						
						 break;
					 }
		  		 }
				 //console.log("EXIT");
				 //$(".overlayNewFormula").hide();
		  	},
			/***
			 * Function to save Formula in Formula List
			 * Called when save button is clicked
			 */
			saveFormula : function(){
		  		var formulaId =  $("#formulaId").text();
		  		var searchString = 'id":"' +  formulaId ;
		  		var formulasString = JSON.stringify(this.formulas);
		  		var searchIndex = formulasString.indexOf(searchString);
		  		if(searchIndex == -1){
		  			this.addFormula();
		  		}else{
		  			this.updateFormula(formulaId);
		  		}		  		
		  		$(".Properties_MRT").parent().addClass('active');
		  	},	
			/***
			 * Function to add new Formula in Formula List
			 */
			addFormula:function(){				
				var formulaId = this.getNewFormulaId();
				var formulaName = $("#formulaName").val();
				var formulaEquation = $("#formulaEquation").text().trim().replace(/\s/g,'');
				var formulaDecimal = parseInt($("#formulaDecimalCount").val());
				
				var formula  =  new Formula({id:formulaId,name:formulaName,equation:formulaEquation,decimalVal:formulaDecimal});				
				var validationStatus = formula.validateFormula(question);
				if(validationStatus == "success"){					
					this.formulas.push(formula);			  
					question.layout();
					this.refreshAllPossibleDestinations(formula);					
					this.displayMessageModal("", '"' + formulaName + '"' + " has been Saved");

					$(".clickableUi").removeClass("clickableUi cellBorder greenBorder");
					$(".overlayNewFormula").hide();
			  		this.newFormulaFlag = false;
			  		$("#newFormula").removeClass("newFormulaActive");
			  		$("#newFormula").addClass("newFormula");
			  		this.disableFormulaFields();

					setTimeout(function(){
			    		 $(".close-reveal-modal").trigger("click");
			    	}, 2000);
				}else{													
					validationStatus = validationStatus.replace(/\</g,"\&lt;");
					validationStatus = validationStatus.replace(/\>/g,"\&gt;");
					var errorMsg = validationStatus;
					var headingText = "Validation Error";
					var closeActionFunction = function(){
						$("#formulaName").trigger("focus");
	   			    }; 
					this.displayMessageModal(headingText, errorMsg, closeActionFunction);
				}
		  	 },
		  	/***
			* Function to update existing Formula
			*/ 
		  	updateFormula : function(formulaId){
				var formulaName = $("#formulaName").val();
				var formulaEquation = $("#formulaEquation").text().trim().replace(/\s/g,'');
				var formulaDecimal = parseInt($("#formulaDecimalCount").val());				
				var formula  =  new Formula({id:formulaId,name:formulaName,equation:formulaEquation,decimalVal:formulaDecimal});
				var validationStatus = formula.validateFormula(question);
		  		if(validationStatus == "success"){
		  			
		  			for( i in this.formulas){	        	
		  				question.formulas[i].setCautionIconStyle("none");
		  				if(this.formulas[i].id==formulaId){
		  					formulaName = $("#formulaName").val();
		  					this.formulas[i].name = $("#formulaName").val();
		  					this.formulas[i].equation = $("#formulaEquation").text().trim().replace(/\s/g,'');		
		  					this.formulas[i].decimalVal = formulaDecimal;
		  					this.refreshFormulaDestinations(this.formulas[i]);
		  					this.refreshAllPossibleDestinations(this.formulas[i]);
		  					break;
		  				}
		  			}		  			
		  			question.layout();
		  			this.displayMessageModal("", '"' + formulaName + '"' + " has been Saved");
		  			setTimeout(function(){
			    		 $(".close-reveal-modal").trigger("click");
			    	}, 2000);
			    	$(".clickableUi").removeClass("clickableUi cellBorder greenBorder");
			  		$(".overlayNewFormula").hide();
			  		this.newFormulaFlag = false;
			  		$("#newFormula").removeClass("newFormulaActive");
			  		$("#newFormula").addClass("newFormula");
			  		this.disableFormulaFields();
		  		}else{
		  			validationStatus = validationStatus.replace(/\</g,"\&lt;");
					validationStatus = validationStatus.replace(/\>/g,"\&gt;");
					var errorMsg = validationStatus;
					var headingText = "Validation Error";
					var closeActionFunction = function(){
						$("#formulaName").trigger("focus");
	   			    }; 
					this.displayMessageModal(headingText, errorMsg, closeActionFunction);
				}
		  	},
		  	/***
			 * Function to remove Formula from Formula List
		     */
		  	removeFormula : function(e){
		  		var that = this;
		  		new Modal({
					id : 1,
					headingText : "Warning ! ",
					containtText : "Are you sure you want to delete formula? This cannot be undone.",
					okActionEvent : function() {
				  		var removeFormulaId= e.currentTarget.name;
				  		var formulaName="",formulaDestinationsMsg="",deletionMsg = "", destinationType = "";
				  		var formulaDestinations=[];
				  		for( i in that.formulas){	        		 
			        		 if(that.formulas[i].id==removeFormulaId){
			        			 var tmpFormulaObject = JSON.parse(JSON.stringify(that.formulas[i]));
			        			 formulaName = removeFormulaId;
			        			 formulaDestinations = that.formulas[i].getDestinations();
			        			 for( j in formulaDestinations){
			        				 if (formulaDestinations[j].indexOf("F")!= -1 && (formulaDestinations[j].indexOf("G")!= -1 || formulaDestinations[j].indexOf("O")!= -1)){
			        					 destinationType = "Feedback";
			        				 }
			        				 else{
			        					 destinationType = "Label";
			        				 }
			        				 formulaDestinationsMsg += "<br> <strong>" + destinationType + ": #" + formulaDestinations[j] + "</strong>";
			        			 }
			        			 that.formulas.splice(i, 1);
			        			 that.refreshFormulaDestinations(tmpFormulaObject);
			    			 }
			        	 }
				  		question.layout();
				  		that.highlightFormulaDestinations(formulaDestinations,removeFormulaId);
				  		if(formulaDestinationsMsg == ""){
				  			deletionMsg += "Formula " + formulaName + " Deleted";
				  		}else{
				  			deletionMsg += "<br> Deleting Formula " + formulaName + " has affected the following Fields <br>" + formulaDestinationsMsg;
				  		}
				  		that.displayMessageModal("Deletion Notice",deletionMsg);
				  		$(".clickableUi").removeClass("clickableUi cellBorder greenBorder");
						$(".overlayNewFormula").hide();
						that.newFormulaFlag = false;
			  		}
				}).getConfirmationModal();
		  	 },

		  	/***
			* Function to clear Formula from active Formula Field
			*/ 
		  	clearFormula:function(){
				$("#formulaId").text(this.getNewFormulaId());
				$("#formulaName").val('');
				$("#formulaEquation").html('');	
				$("#formulaEquation").text('');
				$("#formulaDecimalCount").val(0);
				$(".clickableUi").unbind("click");
				$(".clickableUi").removeClass("clickableUi cellBorder greenBorder");
				$(".overlayNewFormula").hide();
		  		this.disableFormulaFields();
		  		this.newFormulaFlag = false;
		  		$("#newFormula").removeClass("newFormulaActive");
			  	$("#newFormula").addClass("newFormula");

		  		for(var i=0;i<this.pages.length;i++){
		  			var components = this.pages[i].components;
		  			for(var j=0;j<components.length;j++){
		  				if(components[j].type=='table'){
		  					comp = 	components[j];
		  					var compId = comp.pageIdPrefix + comp.pageId+ comp.idPrefix + comp.id;
		  					$("#SpreadsheetTable_"+compId).handsontable('render');
		  				}
		  			}
		  		}
		  		$(".clickableUi").removeClass("clickableUi cellBorder greenBorder");
		  	},
		  	/***
			* Function to get id of New Formula
			*/	  	
		  	getNewFormulaId : function(){
		  		var formulaNumber=  this.formulas.length>0?this.formulas[this.formulas.length-1].getNumber()+1:this.formulas.length+1;
		  		return Formula.idPrefix+formulaNumber;
		  	},
		  	/***
			* Function to enable Save Formula Button
			*/		  	
		  	enableSaveFormulaButton : function(){
		  		document.getElementById("saveFormula").disabled = false;
		  	},
		  	/***
			* Function to enable Save Formula Button
			*/	  	
		  	enableCancelFormulaButton : function(){
		  		document.getElementById("cancelFormula").disabled = false;
		  	},
		  	/***
			* Function to enable Formula Name field
			*/
		  	enableNewFormulaNameField : function(){
		  		document.getElementById("formulaName").disabled = false;
		  	},
		  	/***
			* Function to enable formula text box
			*/
			enableNewFormulaField: function(){
				//document.getElementById("formulaEquation").contenteditable = true;
				 $("#formulaEquation").attr("contenteditable","true");
			},
			/*
			 * Function to enable decimal value field
			 * */
			enableDecimalInputField:function(){
				$("#formulaDecimalCount").attr("disabled",false);				
			},
			/***
			* Function to disable formula fields
			*/
			disableFormulaFields: function(){
				document.getElementById("saveFormula").disabled = true;
				document.getElementById("cancelFormula").disabled = true;
				document.getElementById("formulaName").disabled = true;
				document.getElementById("formulaEquation").contenteditable = false;
				$('#formulaEquation').removeAttr('contenteditable');
				$("#formulaDecimalCount").attr("disabled",true);
			},
		  	/***
			* Function to display Message Modal
			* @param {String} headingText   Required. The headingText of Message;
			* @param {String} containtText    Required. The containtText of Message;
			* @param {function} closeActionEventFunction Optional. function to execute after closing of message;
			*/
		  	displayMessageModal : function(headingText,containtText,closeActionEventFunction){
		  		new Modal({
					id : 1,
					headingText : headingText,
					containtText : containtText,
					closeActionEvent: closeActionEventFunction
				}).getWarningModal();					
  	  			 $("#warningModalId").css('top','300px');
		  	},		  	
		  	/***
		  	 * Function to get StudentEntry Object From StudentEntry Id
		  	 * 
		  	 * @param studentEntryId  
		  	 * @returns StudentEntry Object of passed Id
		  	 * 
		  	 * NOTE : This function searches Student Entries with type number,percentage and currency only   
		  	 */
		  	getStudentEntry : function (studentEntryId){
		  		for(var i=0;i<this.pages.length;i++){
		  			var components = this.pages[i].components;
		  			for(var j=0;j<components.length;j++){
	  				thisId = components[j].pageIdPrefix+components[j].pageId+components[j].idPrefix+components[j].id;
	  				var compId = studentEntryId.substring(0, thisId.toString().length);
	  				if(thisId==compId){
		  				if(components[j].type=='inputField' && components[j].subType!='label'){	
		  					var sections = components[j].sections;
			  				for(var k=0;k<sections.length;k++){
			  					var studentEntries = sections[k].studentEntries;
				  				for(var l=0;l<studentEntries.length;l++){
				  					if(studentEntries[l].contentFormat.type == "number" || studentEntries[l].contentFormat.type == "percentage" || studentEntries[l].contentFormat.type == "currency"){
				  						if(studentEntries[l].editor.id == studentEntryId){
				  							return studentEntries[l];
				  						}
				  					}
				  				}
			  				}
		  				}
		  				else if(components[j].type=='table'){
		  					try{
		  						var cellComp = components[j].getItemValById(components[j].cellComponentCollection, studentEntryId, "component");		  					
		  	                    if(cellComp != ""){
		  	                    	if(cellComp.subType == 'inputField'){
		  	                    		var inputField = cellComp;
		  	                    		if(inputField.contentFormat.type == "number" || inputField.contentFormat.type == "percentage" || inputField.contentFormat.type == "currency"){
				  								if(inputField.editor.id == studentEntryId){
					  								return inputField.studentEntries[0];
					  							}
					  					}
		  	                    	}
				  					
		  	                    }	
		  					}catch(e){
		  						
		  					}
		  						  	              
		  				}
		  			}
		  			}
		  		}
		  		return null;
		  	},
		  	
		  	
		  	/***
		  	 * Function to get AuthorEntry  Object From authorEntryId
		  	 * @param {String} authorEntryId  
		  	 * @returns {Object} AuthorEntry Object of passed Id
		  	 * NOTE : This function searches Author Entries only    
		  	 */
		  	getAuthorEntry : function (authorEntryId){
		  		for(var i=0;i<question.pages.length;i++){
		  			var components = question.pages[i].components;
		  			for(var j=0;j<components.length;j++){
		  				if(components[j].type=='inputField' ){	
		  					var sections = components[j].sections;
			  				for(var k=0;k<sections.length;k++){
			  					var authorEntries = sections[k].authorEntries;
				  				for(var l=0;l<authorEntries.length;l++){
				  					if(authorEntries[l].editor.id == authorEntryId){
				  						return authorEntries[l];
				  					}
				  				}
			  				}
		  				}
		  				if(components[j].type=='table' ){	
		  					var compArr = components[j].cellComponentCollection;
		  	                for (var k in compArr) {
		  	                    var element = compArr[k];
		  	                    if(element.component != ""){
		  	                    	var cellComp = element.component;
		  	                    	var cellId = cellComp.pageIdPrefix+cellComp.pageId+cellComp.idPrefix+cellComp.id+cellComp.cellId;
		  	                    	if(cellComp.type == 'Label' && cellId == authorEntryId){
		  	                    		return element.component;
		  	                    	}
				  					
		  	                    }
		  	                }
		  				}		 
		  			}
		  		}
		  		return null;
		  	},
		  	/***
		  	 * Function to get StudentEntryFeedback  Object From feedbackId
		  	 * @param {String} feedbackId  = StudentEntryFeedback
		  	 * @returns {Object} StudentEntryFeedback Object of passed Id
		  	 */
		  	getStudentEntryFeedback : function (feedbackId){
		  		for(var i=0;i<this.pages.length;i++){
		  			var components = this.pages[i].components;
		  			for(var j=0;j<components.length;j++){
		  				if(components[j].type=='inputField' && components[j].subType!='label'){	
		  					var sections = components[j].sections;
		  					for(var k=0;k<sections.length;k++){
		  						var studentEntries = sections[k].studentEntries;
		  						for(var l=0;l<studentEntries.length;l++){
		  								if(studentEntries[l].feedback.id == feedbackId){
		  									return studentEntries[l].feedback;
		  								}
		  						}
		  					}
		  				}		  				
		  			}
		  		}
		  		return null;
		  	},
		  	/***
		  	 * Function to get GeneralFeedback  Object From feedbackId
		  	 * @param {String} feedbackId  = GeneralFeedback Id
		  	 * @returns {Object} GeneralFeedback Object of passed Id
		  	 */
		  	getGeneralFeedback : function (feedbackId){
		  		for(var i=0;i<this.pages.length;i++){
		  			var components = this.pages[i].components;
		  			for(var j=0;j<components.length;j++){
		  				if(components[j].type=='inputField' && components[j].subType!='label'){	
		  					var generalFeedback = components[j].generalFeedback;
		  					if(generalFeedback.id == feedbackId){
		  						return generalFeedback;
		  					}
		  				}		  				
		  			}
		  		}
		  		return null;
		  	},
		  	/***
		  	 * Function to get OverallFeedback  Object From feedbackId
		  	 * @param {String} feedbackId  = OverallFeedback Id
		  	 * @returns {Object} OverallFeedback Object of passed Id
		  	 */
		  	getOverallFeedback : function (feedbackId){
		  		for(var i=0;i<this.pages.length;i++){
		  			var components = this.pages[i].components;
		  			for(var j=0;j<components.length;j++){
		  				if((components[j].type=='inputField' && components[j].subType!='label') || components[j].type == 'table'){	
		  					var overallFeedback = components[j].overallFeedback;
		  					if(overallFeedback.id == feedbackId){
		  						return overallFeedback;
		  					}
		  				}		  				
		  			}
		  		}
		  		return null;
		  	},
		  	/***
		  	 * Function to get Corresponding Object From passed field id
		  	 * @param fieldId {String} : Id of Field 
		  	 * @returns {Object} Object of Corresponding type as per  fieldId
		  	 */
		  	getObject : function (fieldId){
		  		if(fieldId==""||fieldId==null){
		  			return null;
		  		}else if(fieldId.indexOf("OF")!= -1){
		  			return this.getOverallFeedback(fieldId); 
		  		}else if (fieldId.indexOf("GF")!= -1){
		  			return this.getGeneralFeedback(fieldId);
		  		}else if (fieldId.indexOf("F")!= -1){
		  			return this.getStudentEntryFeedback(fieldId);
		  		}else if (fieldId.indexOf("SE")!= -1){
		  			return this.getStudentEntry(fieldId);
		  		}else if (fieldId.indexOf("E")!= -1){
		  			return this.getAuthorEntry(fieldId);
		  		}
		  		return null;
		  	},
		  	
		  	/***
			* Function to show formula in instructor mode //ToDo
			*/			  	
		 	getFormulaHyperlink:function(formulaId,textId,bracketType){
	 			/*var formulaEquation="";
	 			var formulaLink = "";
		 		for( i in this.formulas){
	        		 if(this.formulas[i].id==formulaId){
	        			 formulaEquation=this.formulas[i].equation;
	        			 break;
	    			 }
	        	 }
		 		if(bracketType == "angular")
		 		{
		 		 formulaLink = "<a onclick='question.viewFormula(event);' name=" +formulaId+ ' title="Calculation = '+formulaEquation+'">' 
						+ "&lt;"+formulaId+"&gt;</a>";
		 		}
		 		else if(bracketType == "square")
	 			{
		 			formulaLink = "<a onclick='question.viewFormula(event);' name=" +formulaId+ ' title="Formula = '+formulaEquation+'">' 
					+ "["+formulaId+"]</a>";
	 			}
		 		return formulaLink;*/
		 		
		 		var formulaEquation="";
		 	     var formulaLink = "";
		 	     for( i in this.formulas){
		 	            if(this.formulas[i].id==formulaId){
		 	             formulaEquation=this.formulas[i].equation;
		 	             break;
		 	         }
		 	           }
		 	     if(bracketType == "angular")
		 	     {
		 	      formulaLink = "<a onclick='question.viewFormula(event);' name=" +formulaId+ ' title="Calculation = '+formulaEquation+'">' 
		 	      + "&lt;"+formulaId+"&gt;</a>";
		 	     }
		 	     else if(bracketType == "square")
		 	     {
		 	      formulaLink = "<a onclick='question.viewFormula(event);' name=" +formulaId+ ' title="Formula = '+formulaEquation+'">' 
		 	     + "["+formulaId+"]</a>";
		 	     }
		 	     return formulaLink;
		 	},
		 	
		 	getFormulaEquation:function(formulaId,textId){
	 			var formulaEquation="";
		 		for( i in this.formulas){
	        		 if(this.formulas[i].id==formulaId){
	        			 formulaEquation=this.formulas[i].equation;
	        			 break;
	    			 }
	        	 }
		 		return formulaEquation;
		 	},
		 	/***
			* Function to search if inserted formula exists in formula list//ToDo
			*/	
		 	IsFormulaExists:function(formulaId){
		 		var isFormula=false;
		 		for( i in this.formulas){
	        		 if(this.formulas[i].id==formulaId){
	        			 formulaName= this.formulas[i].name ;
	        			 formulaEquation=this.formulas[i].equation;
	        			 isFormula=true;
	    			 }
	        	 }
		 		return isFormula;
		 	},
		 	isFormulaAffected:function(formulaId){
		 		var isFormula=true;
		 	
		 		for( i in this.formulas){
	        		 if(this.formulas[i].id==formulaId){
	        			 if(this.formulas[i].validateFormula(question)=="success" && !this.formulas[i].isAffected){
	        				 isFormula=false;								
	 					}
	        			
	    			 }
	        	 }
		 		return isFormula;
		 	},
		 	/***
		  	 * Function to update destinations array of All Formulas
		  	 * This is called when any AuthorEntry or Feedback  is updated 
		  	 * 
		  	 * @param formulaIds {Array} : Array of formula Ids present in destination field
		  	 * @returns destinationId {String}  : Id of formula destination field 
		  	 * 
		  	 * Note : Here Destination means Author Entry where formula is used.
		  	 */
		 	updateFormulaDestinations :function(editorId,formulaIds){
		 		for(i in this.formulas){
		 			if(formulaIds.indexOf(this.formulas[i].id) != -1){
		 				this.formulas[i].addDestination(editorId);
		 			}else{
		 				this.formulas[i].removeDestination(editorId);
		 			}
		 		}
		 	},
		 	/***
		  	 * Function to refresh all entries where passed formula is used
		  	 * This is called when any Formula is updated
		  	 * @param formula {Object} : object of Formula
		  	 */
		 	refreshFormulaDestinations :function (formula){
		  		var destinations = formula.destinations;
		  		var authorEntry;
		  		var studentEntryFeedback,overallFeedback,generalFeedback;
		  		var dummyTextDiv = document.createElement("div");
		  		for(var i  =0; i < destinations.length; i++){
		  			if(destinations[i].indexOf("OF")!= -1){
		  				overallFeedback = this.getOverallFeedback(destinations[i]); 
		  				if(overallFeedback != null){
		  					if(overallFeedback.textWithoutFormatting === ""){
			  					dummyTextDiv.innerHTML = overallFeedback.text;			
			  					overallFeedback.textWithoutFormatting = dummyTextDiv.textContent;		
			  				}
			  				util.updateFormula(overallFeedback);
		  				}
		  				else{
		  					formula.removeDestination(destinations[i]);
		  					i--;
		  				}
		  			}else if (destinations[i].indexOf("GF")!= -1){
		  				generalFeedback = this.getGeneralFeedback(destinations[i]);
		  				if(generalFeedback != null){
		  					if(generalFeedback.textWithoutFormatting === ""){
			  					dummyTextDiv.innerHTML = generalFeedback.text;			
			  					generalFeedback.textWithoutFormatting = dummyTextDiv.textContent;		
			  				}
			  				util.updateFormula(generalFeedback);
		  				}
		  				else{
		  					formula.removeDestination(destinations[i]);
		  					i--;
		  				}
		  			}else if (destinations[i].indexOf("F")!= -1 && destinations[i].indexOf("G")!= -1){
		  				studentEntryFeedback = this.getStudentEntryFeedback(destinations[i]);
		  				if(studentEntryFeedback != null){
		  					if(studentEntryFeedback.textWithoutFormatting === ""){
			  					dummyTextDiv.innerHTML = studentEntryFeedback.text;			
			  					studentEntryFeedback.textWithoutFormatting = dummyTextDiv.textContent;		
			  				}
			  				util.updateFormula(studentEntryFeedback);
		  				}
		  				else{
		  					formula.removeDestination(destinations[i]);
		  					i--;
		  				}
		  			}else{
		  				authorEntry = this.getAuthorEntry(destinations[i]);
		  				if(authorEntry != null){
		  					if(authorEntry.editor.textWithoutFormatting === ""){
			  					dummyTextDiv.innerHTML = authorEntry.editor.text;			
			  					authorEntry.editor.textWithoutFormatting = dummyTextDiv.textContent;		
			  				}
			  				util.updateFormula(authorEntry.editor);
		  					if(authorEntry.cellId != undefined){
				  				for(var index=0;index<question.pages.length;index++){
						  			var components = question.pages[index].components;
						  			for(var j=0;j<components.length;j++){
						  				var cmpId = components[j].pageIdPrefix+components[j].pageId+components[j].idPrefix+components[j].id;
						  				var cmpIdAuthorEntry = authorEntry.pageIdPrefix+authorEntry.pageId+authorEntry.idPrefix+authorEntry.id;
						  				if(cmpId == cmpIdAuthorEntry){
						  					var cellId = cmpIdAuthorEntry + authorEntry.cellId;
						  					components[j].populateEditorProperties(cellId);
						  					authorEntry.editor.text = $("#tempDiv").html();
											 var updatedCellHtml = '<div data-hold="textWrapper">';
									            updatedCellHtml +=  $("#tempDiv").html();;
									            updatedCellHtml += '</div>';  
						  					components[j].changeValById(components[j].cellHTMLCollection, cellId, "itsHtml", updatedCellHtml);
						  				
						  				}
						  			}
				  				}
		  					}
		  				}
		  				else{
		  					formula.removeDestination(destinations[i]);
		  					i--;
		  				}
		  			}
		  		}
		  	},
		  	/***
		  	 * Function to highlight Formula All Destinations affected
		  	 * @param destinations {Array of String} : Array of destination Ids
		  	 * @param formulaId {String} : formulaId of deleted formula
		  	 */
		  	highlightFormulaDestinations : function (destinations,formulaId){
		  		for(i in destinations){
		  			this.highlightDestination(destinations[i]);
		  		}
		  	},
		  	/***
		  	 * Function to highlight Individual Destination
		  	 * @param destinationId {String} 
		  	 */
		  	highlightDestination : function(destinationId){
		  		if($("#"+destinationId).hasClass("tableCell")){
		  			$("#"+destinationId).addClass("redBorderCell");
		  		}else{
		  			$("#"+destinationId).css("border-color","red");
		  		}
		  		
		  	},
		  	/***
		  	 * Function to mark deleted Formulas with red font in used destination
		  	 * @param destinationId {String} 
		  	 * @param formulaId {String}
		  	 */
		  	markDeletedFormulas : function(destinationId,formulaId){
		  		// TODO : Write Code To mark deleted formula id in red(as shown in WireFrames)
		  	},
		  	
		  	filter:function(event){
				util.removePasteImage(event.originalEvent.clipboardData,event);
			},

			newFormulaButtonClick : function(){
				this.newFormulaFlag = true;
				$("#newFormula").removeClass("newFormula");
			  	$("#newFormula").addClass("newFormulaActive");
            	for (i in question.activePage.components) {
					if (question.activePage.components[i].type == "table") {
						var comp = question.activePage.components[i];
						var compId = comp.pageIdPrefix+comp.pageId+comp.idPrefix+comp.id;
						$("#SpreadsheetTable_"+compId).handsontable('render');
						/*//$("#SpreadsheetTable_"+compId).handsontable('greenRenderer');
						var ht = $("#SpreadsheetTable_"+compId).handsontable('getInstance');
						ht.updateSettings({ rneder:  greenRenderer});
						ht.render();*/
					} else if(question.activePage.components[i].type == "inputField"){
						var comp = question.activePage.components[i];
						for(i in comp.sections){
							var compSection = comp.sections[i];
							for(j in compSection.studentEntries){
								var stud = compSection.studentEntries[j];
								if(stud.contentFormat.type=="currency" || stud.contentFormat.type == "percentage" || stud.contentFormat.type == "number"){
									$("#"+stud.editor.id).addClass('cellBorder clickableUi');
								}
							}
						}
					}
				}
				$(".overlayNewFormula").height($("#formToolCanvasId").height()+50);
				$(".overlayNewFormula").show();
				Question.addEventByClassName( "clickableUi", "click", this._onClickableCellClick);
				Question.addEventByClassName( "clickableUi", "mousedown", this._retainCaretFormula);
				Question.addEvent( "formulaEquation", "blur", this._retainCaretFormula);
			
				this.enableSaveFormulaButton();
				this.enableCancelFormulaButton();
				this.enableNewFormulaNameField();
				this.enableNewFormulaField();
				this.enableDecimalInputField();				
	       	},

	       onClickableCellClick : function(e){
	       		var clickedId = e.currentTarget.id;
	       		if(clickedId == ""){
	       			clickedId = e.currentTarget.parentElement.id;	
	       		}
	       		//e.currentTarget.removeClass()
	       		//e.currentTarget.addClass("grennBorder");
	       	    var str = $("#formulaEquation").text();
	       	    str = str.substr(0,caretPosFormula) + clickedId + str.substr(caretPosFormula, str.length);
	       		$("#formulaEquation").html(str);
	       		caretPosFormula = str.length;
	       },
	       retainCaretFormula : function(event){
	    	   var sel = window.getSelection();
	    	   if(event.type === "mousedown"){
	    		   if(sel.focusNode.parentNode.id == "formulaEquation"){
			    	   caretPosFormula = sel.getRangeAt(0).startOffset;
			    	}
	    		   return false;
	    	   }else{
	    		   caretPosFormula = $("#formulaEquation").text().length;
	    	   }
	       },
	       validateDecimalCount : function(e){
	    	   var isValid = false;
	    	   //var currElementValue = e.currentTarget.value;
	    	   var currElementValue = $("#formulaDecimalCount").val();
	    	   var errmsg = "";
	    	   if(currElementValue == "" || currElementValue == null){/*check for blank or null text*/	    		   
	    		   errmsg = "Please specify decimal value for formula";
	    	   }else{
	    		   if(!util.isNumber(currElementValue)){/*check for numeric value*/	    			   
		    		   errmsg = "Please specify only Numeric value";  
	    		   }else{
	    			   currElementValue = parseInt(currElementValue);
	    			   if(currElementValue<0 || currElementValue>6){ /*check for range between 0-6*/
	    				   errmsg = "Please specify decimal value only between 0 to 6 ";
	    			   }
	    		   }
	    	   }
	    	   /*set validflag accordingly*/
	    	   if(errmsg == ""){
	    		   isValid = true;
	    	   }
	    	   
	    	   /* show validation alert */
	    	   if(!isValid){
	    		 var headingText = "Validation Error";
				 var closeActionFunction = function(){
					$("#formulaDecimalCount").trigger("focus");
	   			 };
				 this.displayMessageModal(headingText, errmsg, closeActionFunction);
			   }
	    	   
	       },
			/***
		  	 * Function to refresh All Possible Destinations of a Formula
		  	 * @param formula {Object} 
		  	 */
			refreshAllPossibleDestinations:function(formula){
				var formulaId = formula.getId();
				var angularFormula = "<"+formulaId+">";
				var squareFormula = "[" + formulaId + "]";
				for(var i=0;i<question.pages.length;i++){
		  			var components = question.pages[i].components;
		  			for(var j=0;j<components.length;j++){
		  				if(components[j].type=='inputField'){		  					
		  					var sections = components[j].sections;
			  				for(var k=0;k<sections.length;k++){
			  					var authorEntries = sections[k].authorEntries;
			  					if(authorEntries!=null){
			  						for(var l=0;l<authorEntries.length;l++){
			  							if(authorEntries[l].editor.textWithoutFormatting.indexOf(angularFormula) > -1 || authorEntries[l].editor.textWithoutFormatting.indexOf(squareFormula) > -1){
			  								formula.addDestination(authorEntries[l].editor.id);
			  								$("#"+authorEntries[l].editor.id).focus();
			  								authorEntries[l].update();
			  								util.updateFormula(authorEntries[l].editor);			  								
			  							}
			  						}
			  					}
				  				var studentEntries = sections[k].studentEntries;
				  				if(studentEntries!=null){
				  					for(var l=0;l<studentEntries.length;l++){
				  						if(studentEntries[l].feedback.textWithoutFormatting.indexOf(angularFormula) > -1 || studentEntries[l].feedback.textWithoutFormatting.indexOf(squareFormula) > -1){
				  							formula.addDestination(studentEntries[l].feedback.id);
				  							util.updateFormula(studentEntries[l].feedback);
				  						}
				  					}
				  				}
			  				}
			  				var overallFeedback = components[j].overallFeedback;
			  				if(overallFeedback!=null){
			  					if(overallFeedback.textWithoutFormatting.indexOf(angularFormula) > -1 || overallFeedback.textWithoutFormatting.indexOf(squareFormula) > -1){
			  						formula.addDestination(overallFeedback.id);
			  						//$("#"+overallFeedback.id).focus();
			  						//overallFeedback.update();
			  						util.updateFormula(overallFeedback);
			  					}
			  				}
			  				var generalFeedback = components[j].generalFeedback;
			  				if(generalFeedback!=null){
				  				if(generalFeedback.textWithoutFormatting.indexOf(angularFormula) > -1 || generalFeedback.textWithoutFormatting.indexOf(squareFormula) > -1){
				  					formula.addDestination(overallFeedback.id);
				  					util.updateFormula(generalFeedback);
				  				}
			  				}
		  				}		
		  				else{
		  					var compArr = components[j].cellComponentCollection;
		  	                for (i in compArr) {
		  	                    var element = compArr[i];
		  	                    if(element.component != ""){
		  	                    	var cellComp = element.component;
		  	                    	var cellId = cellComp.pageIdPrefix+cellComp.pageId+cellComp.idPrefix+cellComp.id+cellComp.cellId;
		  	                    	if(cellComp.type == 'Label'){
		  	                    		if(cellComp.editor.textWithoutFormatting.indexOf(angularFormula) > -1 || cellComp.editor.textWithoutFormatting.indexOf(squareFormula) > -1){
		  	                    			components[j].populateEditorProperties(cellId);
						  					$("#"+cellComp.editor.id).blur();
						  					if($("#"+cellId).hasClass("redBorderCell")){
						  						$("#"+cellId).removeClass('redBorderCell');
						  					}
						  					
			  							}
		  	                    	}
		  	                    }
		  	                }
		  	                var overallFeedback = components[j].overallFeedback;
			  				if(overallFeedback!=null){
			  					if(overallFeedback.textWithoutFormatting.indexOf(angularFormula) > -1 || overallFeedback.textWithoutFormatting.indexOf(squareFormula) > -1){
			  						formula.addDestination(overallFeedback.id);
			  						//$("#"+overallFeedback.id).focus();
			  						//overallFeedback.update();
			  						util.updateFormula(overallFeedback);
			  					}
			  				}
			  				var generalFeedback = components[j].generalFeedback;
			  				if(generalFeedback!=null){
				  				if(generalFeedback.textWithoutFormatting.indexOf(angularFormula) > -1 || generalFeedback.textWithoutFormatting.indexOf(squareFormula) > -1){
				  					formula.addDestination(overallFeedback.id);
				  					util.updateFormula(generalFeedback);
				  				}
			  				}
		  				}
		  			}
		  		}
			},

			/* branching code starts here */
			onCreatePathClick : function(){
				$("#myModal").html("");
				var activePageComp = question.activePage.components;
				if(activePageComp.length>0){
					var isValid = this.validateQuestion();
					if(isValid.errorMsg == ""){
						var branch = new Branch();
						var bId = this.getNewBranchId(branch.idPrefix);
						var newBranch = new Branch({id:bId});
						newBranch.layout();
						newBranch.afterLayout();
						this.tempBranch = newBranch;
					}else{
						var headingText = "Validation Error";
						var closeActionFunction = function(){
							$("#myModal").modal('hide');
		   				};
						this.displayMessageModal(headingText, isValid.errorMsg+"<br/>All fields must contain valid text.", closeActionFunction);
					}
				} else{
					var headingText = "Warning ! ";
						var closeActionFunction = function(){
						$("#myModal").modal('hide');
	   				};
					this.displayMessageModal(headingText, "No components selected.", closeActionFunction);
				}
			},

			/* Create Branch Id */
			getNewBranchId : function(prefix){
				var branchNumber = 1;
				if(this.branches.length > 0){
					branchNumber = parseInt(this.branches[this.branches.length-1].id.replace(this.branches[this.branches.length-1].idPrefix,'')) + 1;
				}
		  		return prefix+branchNumber;
		  	},
		  	deleteBranch : function(e){
		  		var branchId = e.currentTarget.id.substring(e.currentTarget.id.length-2);
		  		var that = this;
	  	    	 new Modal({id : 1,
	  	    		headingText : "Are you sure?",
	  				containtText : "Are you sure you want to delete this Branch?",
	  	    		 okActionEvent : function(){
	  	    			 var branch = null;
	  	    			 try{
		  	  		   		 	branch = that.branches.filter(function(e){
		  	  	        	  		return e.id == branchId;
		  	  	        	  	});
			  	           }catch(err){
			  	          	 branch = null;
			  	         }
			  	           //reset flag of src component
			  	         if(branch != null && branch.length != 0){
			  	        	for(var index in that.pages){
			  	        		for(var i in question.pages[index].components){
			  	        			var comp = question.pages[index].components[i];
				  	  				var cmpId = comp.pageIdPrefix + comp.pageId
				  	  							+ comp.idPrefix + comp.id;
				  	  	    		 if(cmpId == branch[0].cId || cmpId == branch[0].cId_2){
				  	  	    			 comp.isBranched = false;
				  	  	    			 try{
					  	  	    			 if(comp.sections.length > 0){
					  	  	    				for(var j in comp.sections){
					  	  	    					if(branch[0].sectionId == comp.sections[j].id || branch[0].sectionId_2 == comp.sections[j].id){
					  	  	    						comp.sections[j].isBranched = false;
					  	  	    						comp.isSectionBranch = false;
					  	  	    					}
					  	  	    				}
					  	  	    			 }
					  	  	    		 } catch(e){
					  	  	    		 	
					  	  	    		 }
				  	  
				  	  	    		 }
			  	  	    		 }
			  	        	}
			  	         }
			  	         //reset flag of dest component
			  	       if(branch != null && branch.length != 0){
			  	    	   var branch = branch[0];
			  	  	       for(var i in branch.pathMaps){
								for(var j in branch.pathMaps[i].paths){
									var sectionId = branch.pathMaps[i].paths[j].sectionId;
									var partId = branch.pathMaps[i].paths[j].partId;
									var compId = branch.pathMaps[i].paths[j].compId;
									if(branch.pathMaps[i].paths[j].partId != null){
										for(var index1 in that.pages){
											if(partId == that.pages[index1].id){
												if(that.pages[index1].isBranchDest){
													that.pages[index1].isBranchDest = false;
													//that.pages[index1].isSectionBranch = false;
													that.pages[index1].showToStud = true;
													that.pages[index1].destBranchId = null;
												} else{
													for(var index2 in that.pages[index1].components){
														var comp = that.pages[index1].components[index2];
														if(compId == comp.id){
															if(comp.isBranchDest){
																comp.isBranchDest = false;
																comp.showToStud = true;
																comp.destBranchId = null;
															} else{
																if(comp.sections != undefined){
																	var isOtherSectionsBranched = false;
																	for(var index3 in comp.sections){
																		if(comp.sections[index3].id == sectionId){
																			if(comp.sections[index3].isBranchDest){
																				comp.sections[index3].isBranchDest = false;
																				
																				comp.sections[index3].showToStud = true;
																				comp.sections[index3].destBranchId = null;
																				comp.isSectionBranchDest = false;
																			}
																		}
																		else{
																			if(comp.sections[index3].isBranchDest){
																				isOtherSectionsBranched = true;
																			}
																		}
																	}
																	//if other branch include sections of current component
																	if(isOtherSectionsBranched){
																		comp.isSectionBranchDest = true;
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
			  	       }
			
	  	    			
	  			  		that.branches = that.branches.filter(function(el){
	  			  			return el.id != branchId;
	  			  		});
	  			  		that.layout();
			    	 }}).getConfirmationModal();
		  		
		  	},
		  	editBranch : function(e){
		  		var that = this;
		  		if(e.target.tagName == "BUTTON"){
			  		new Modal({id : 1,
						headingText : "Are you sure?",
						containtText : "Are you sure you want to close? Doing so will discard all changes in this branch.",
			 			okActionEvent : function(){
			 				that.editBranchConfrim(e);
			 			},
			 			cancelActionEvent : function(){
			 				return false;
			 			}
			 		}).getConfirmationModal('closeBranch');
			 	} else{
			 		this.editBranchConfrim(e);
			  	}
		  	},
		  	updatePages:function(){
		  		for(var i in this.pages){
		  			 for(index in this.pages[i].components){
		  				 if(this.pages[i].components[index].type == "multiplechoice" || this.pages[i].components[index].type == "checkbox" || this.pages[i].components[index].type == "scale" || this.pages[i].components[index].type == "inputField" || this.pages[i].components[index].type == "table" ){
		  					this.pages[i].components[index].resetComp();
		  				 }
		  			 }
		  		}
		  	},

		  	editBranchConfrim : function(e){
		  		var branchId = $("#branchEdit").val();
				if(branchId != ''){
			     	for(var i in  question.branches){
				     	if(question.branches[i].id == branchId){
				     		if(this.tempEditBranch != null){
				     			var tempVar = (question.tempEditBranch);
				     			newBranch = new Branch(JSON.parse(tempVar));
					     		newBranch.editor.text = newBranch.pathName;
					     		//fix for legacy content
					     		if(newBranch.cId_2 == null || newBranch.cId_2 == undefined){
					     			newBranch.criteria = "single";
					     		}
					     		var k = 0;
					     		for (k in newBranch.pathMaps){
					     			// fix for old json 
					     			if(!newBranch.pathMaps[k].labelEditorId instanceof Array){
					     				var drpId=newBranch.pathMaps[k].drpDwnEditorId;
							    		var lblId=newBranch.pathMaps[k].labelEditorId;
							    		newBranch.pathMaps[k].drpDwnEditorId=[];
							    		newBranch.pathMaps[k].labelEditorId=[];
							    		newBranch.pathMaps[k].labelEditorId.push(lblId);
							    		newBranch.pathMaps[k].drpDwnEditorId.push(drpId);
						     			
					     			}
					     			newBranch.pathMaps[k] = new PathMap(newBranch.pathMaps[k]);
					     			if((newBranch.mappingIndicator == "scoreRange" && newBranch.pathMaps[k].range != null) || newBranch.criteria=="multi" ){
							    		var rIndex = 0;
							    		for (rIndex in newBranch.pathMaps[k].range){
							    			var minRangeEditor = new NumericEditor(newBranch.pathMaps[k].range[rIndex].minRangeEditor);
								    		var maxRangeEditor = new NumericEditor(newBranch.pathMaps[k].range[rIndex].maxRangeEditor);
							    			newBranch.pathMaps[k].range[rIndex] =  new BranchRange(newBranch.pathMaps[k].range[rIndex]);
							    			newBranch.pathMaps[k].range[rIndex].setMinRangeEditor(minRangeEditor);
								    		newBranch.pathMaps[k].range[rIndex].setMaxRangeEditor(maxRangeEditor);
							    		}
							    	}
					     			var j = 0;
					     			for (j in newBranch.pathMaps[k].paths){
					     				newBranch.pathMaps[k].paths[j] = new Path(newBranch.pathMaps[k].paths[j]);
					     			}
					     		}
					     		newBranch.layout();
					  			$("#myModal").modal('show');
					     		newBranch.afterLayout();
					     		question.branches[i] = newBranch;
				     		}
				     	}
				    }
				}

		  		var branchId = e.currentTarget.id.substring(e.currentTarget.id.length-2);
		  		$("#branchEdit").val(branchId);
		  		for(i in  this.branches){
		  			if(this.branches[i].id == branchId){
		  				this.tempEditBranch = JSON.stringify(this.branches[i], function(key,value){
		  		    	    if (key=="itsTableInstance") return undefined;	    	    
		  		    	    else return value;
		  		    	});
		  			   //fix for legacy content
			     		if(this.branches[i].cId_2 == null || this.branches[i].cId_2 == undefined){
			     			this.branches[i].criteria = "single";
			     		}
			     		// legacy content fix; for editorvar to editorId array
			     		var k = 0;
			     		for (k in this.branches[i].pathMaps){
			     			if(this.branches[i].pathMaps[k].labelEditorId instanceof Array==false){
			     				var drpId=this.branches[i].pathMaps[k].drpDwnEditorId;
					    		var lblId=this.branches[i].pathMaps[k].labelEditorId;
					    		this.branches[i].pathMaps[k].drpDwnEditorId=[];
					    		this.branches[i].pathMaps[k].labelEditorId=[];
					    		this.branches[i].pathMaps[k].labelEditorId.push(lblId);
					    		this.branches[i].pathMaps[k].drpDwnEditorId.push(drpId);
					    		
			     			}
			     			this.branches[i].pathMaps[k] = new PathMap(this.branches[i].pathMaps[k]);
			     		}
		  				this.branches[i].layout();
			  			$("#myModal").modal('show');
		  				this.branches[i].afterLayout();
		  			}
		  		}
		  	},
		  	actvPageShowHide : function(flag){
		    	  var index = 0;
		    	  for(index in question.activePage.components){
		    		  var component = question.activePage.components[index];
		    		  var compId = component.pageIdPrefix+component.pageId+component.idPrefix+component.id;
		    		  if(component.showToStud!=undefined && !component.showToStud){ /* component related check */
		    			  $("#"+compId).addClass("hideElement");
		  	          }else{
		  	        	  if(flag || flag==undefined){
		  	        		 $("#"+compId).removeClass("hideElement"); 
		  	        	  }
		  	        	 
		  	        	  if(component.sections != undefined){
		  	        		  var i=0;
		  	        		  for(i in component.sections){
		  	        			  var sectionDivId = "sectionDiv_"+component.sections[i].componentIdPrefix+component.sections[i].componentId+component.sections[i].idPrefix+component.sections[i].id;
		  	        			  if(!component.sections[i].showToStud && component.sections[i].showToStud!=undefined){
		  	        				  /* section related check */
		  	  	        			  $("#"+sectionDivId).addClass("hideElement");
		  	  	  	        	  }else{
		  	  	  	        		  //remove class of section
		  	  	  	        		  if(flag || flag==undefined){
		  	  	  	        			  $("#"+sectionDivId).removeClass("hideElement");  
		  	  	  	        		  }
		  	  	  	        	  }
		  	        		  }
		  	        	  }
		  	          }
		    	  }
		      }
		};