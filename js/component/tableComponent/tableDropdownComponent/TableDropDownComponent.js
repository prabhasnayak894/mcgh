/* ========================================================================
 * TableDropDownComponent: Object Declaration 
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * accepts any answer, graded, mandatory. holds the componnet text editor
 * general feed back editor, overall feedback editor.and all sections/options 
 * for this component
 * ======================================================================== */
var TableDropDownComponent = function(options){ 
	this.cellId=null;
	this.subType='dropdown';
	this.type='Dropdown menu';
	//this.binaryAnswer=false;
	this.pointBasedResponse=false;
	this.answerOptionOrientation=1;
	this.showPointsToStudents=false;
	this.acceptAnyAnswer = true;
	//this.graded=true;
	this.sections=[];
	this.ranges=null;
	this.minPoint=0;
	this.maxPoint=0;
	$.extend(TableDropDownComponent.prototype, new Component(options));
	//this.mandatory=false;
	$.extend(this, options);
	//this.type='multiplechoice';
	this._saveDropdownOptions = TableDropDownComponent.BindAsEventListener( this, this.saveDropdownOptions );
	
	this._toggleFeedback = TableDropDownComponent.BindAsEventListener( this, this.toggleFeedback );
	this._populateGFEditorProperties = TableDropDownComponent.BindAsEventListener( this, this.populateGFEditorProperties );
	this._populateOFEditorProperties = TableDropDownComponent.BindAsEventListener( this, this.populateOFEditorProperties );
	this._update = TableDropDownComponent.BindAsEventListener( this, this.update );
	this._populateComp = TableDropDownComponent.BindAsEventListener( this, this.populateComp );
	//this._addTableDropDownComponent=TableDropDownComponent.BindAsEventListener( this, this.addTableDropDownComponent );
	//this._copyTableDropDownComponent=TableDropDownComponent.BindAsEventListener( this, this.copyTableDropDownComponent );
//	this._removeComponent=TableDropDownComponent.BindAsEventListener( this, this.removeComponent );
	this._acceptAnyAnswer = TableDropDownComponent.BindAsEventListener( this, this.acptAnyAnswer );
	this._markGraded = TableDropDownComponent.BindAsEventListener( this, this.markGraded );
	this._markMandatory = TableDropDownComponent.BindAsEventListener( this, this.markMandatory);
	this._pointBaseResponse = TableDropDownComponent.BindAsEventListener( this, this.pointBaseResponse );
	//this._binaryAnswer = TableDropDownComponent.BindAsEventListener( this, this.showBinaryAnswer );
	this._showPointToStudent=TableDropDownComponent.BindAsEventListener( this, this.showPointToStudent );
	this._openHelpModalForTableDropDownComponent = TableDropDownComponent.BindAsEventListener(this,this.openHelpModalForTableDropDownComponent);
	this._openHelpModalForAnswerType = TableDropDownComponent.BindAsEventListener(this,this.openHelpModalForAnswerType);
	this._openHelpModalForInsertHyperlink = TableDropDownComponent.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
	this._updateEditor = TableDropDownComponent.BindAsEventListener( this, this.updateEditor );
	this._updateGeneralFeedbackEditor= TableDropDownComponent.BindAsEventListener( this, this.updateGeneralFeedBackEditor );
	this._updateOverallFeedBackEditor= TableDropDownComponent.BindAsEventListener( this, this.updateOverallFeedBackEditor );
	this._openHelpModalForRequiredQuestionSelector = TableDropDownComponent.BindAsEventListener(this,this.openHelpModalForRequiredQuestionSelector);
	this._updateRadioChoice = TableDropDownComponent.BindAsEventListener( this, this.updateRadioChoice );
	//this._changeOptionOrientation = TableDropDownComponent.BindAsEventListener(this,this.changeOptionOrientation);
	this._addSection = TableDropDownComponent.BindAsEventListener( this, this.addSection);
	this._changeType = TableDropDownComponent.BindAsEventListener( this, this.changeType);
	this._collapseRangedBasedFeedback = TableDropDownComponent.BindAsEventListener( this, this.toggleRangedBasedFeedback);
	this._filter =TableDropDownComponent.BindAsEventListener( this, this.filter );
	this._collapseComponent = TableDropDownComponent.BindAsEventListener( this, this.collapseComponent );
	this._updateDropDown = TableDropDownComponent.BindAsEventListener( this, this.updateDropDown);
	//this._saveDropdownOptions = TableDropDownComponent.BindAsEventListener( this, this.saveDropdownOptions );	
};

//add event helper method on element id
TableDropDownComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
TableDropDownComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
TableDropDownComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableDropDownComponent.prototype = { 
		
        /**
		 * gets subType of component
		 * @returns {String} subType
		 */
		getSubType:function(){
			return this.subType;
        },
        /**
         * sets subType of component
         * @param subType
         */
        setSubType:function(subType){
       	 this.subType=subType;
        },
       
        /**
         * gets general feedback editor
         */
        getGeneralFeedback:function(){
       	 this.generalFeedback;
        },
        /**
         * sets general feedback editor
         */
        setGeneralFeedback:function(generalFeedback){
       	 this.generalFeedback=generalFeedback;
        },
        /**
         * gets overall feedback editor
         */
        getOverallFeedback:function(){
       	 this.overallFeedback;
        },
        /**
         * sets overall feedback editor
         */
        setOverallFeedback:function(overallFeedback){
       	 this.overallFeedback=overallFeedback;
        },
        /**
         * gets sections for multiple choice component
         * @returns sections
         */
         getSections: function(){
                 return this.sections;  
         },
         /**
          * sets sections for multiple choice component
          * @returns sections
          */
          setSections: function(sections ){
                 this.sections=sections;  
          },
         /**
          * gets ranges for multiple choice component
          * @returns ranges
          */
          getRanges: function(){
                   return this.ranges;  
          },
         /**
          * sets ranges for multiple choice component
          * @returns ranges
          */
          setRanges: function(ranges ){
                   this.ranges=ranges;  
          },
        
         /**
          * updates text of content editable divs to the object's editor text
          */
         update:function(){
        	 	this.generalFeedback.update();
        		this.overallFeedback.update();
        		var i=0;
        		for( i in this.sections){
        			this.sections[i].update();
        	    }
        		for( j in this.ranges){
        			this.ranges[j].update();
        		}
        		this.updateMinMaxPoint();
         },
         updateMinMaxPoint:function(){
        	if(this.pointBasedResponse) {
        		var minPoint=0;
        		var maxPoint=0;
        		var i=0;        		
        		for( i in this.sections){
        			var points=[];
        			var j=0;
            		for( j in this.sections[i].options){
            			var k=0;
            			var optionPoints=[];
                		for( k in this.sections[i].options[j].answers){
                			var pointsVal = this.sections[i].options[j].answers[k].pointsValueEditor.text!=""?parseFloat(this.sections[i].options[j].answers[k].pointsValueEditor.text):0;
                			//if(this.sections[i].options[j].answers[k].pointsValueEditor.text!=''){
                				optionPoints.push(pointsVal);
                			//}
                	    }
                		if(this.binaryAnswer ){
                			if(optionPoints.length>0){
                				optionPoints=optionPoints.sort(function (a, b) {
                    				   return a > b ? 1 : a < b ? -1 : 0;
                       			}); 
                     			minPoint+=optionPoints[0];
                         		maxPoint+=optionPoints[optionPoints.length-1];
                			}
                			
                		}else if(optionPoints.length>0){
                			points.push(optionPoints[0]);
                		}
            	    }
            		if(points.length>0){
            			points=points.sort(function (a, b) {
            				   return a > b ? 1 : a < b ? -1 : 0;
            			}); 
                		minPoint+=points[0];
                		maxPoint+=points[points.length-1];
            		}
        	    }
        		this.minPoint=minPoint;
        		this.maxPoint=maxPoint;
        		$("#min_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).text(this.minPoint);
        		$("#max_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).text(this.maxPoint);
        	}
         },
         /**
          * layouts in design mode
          * @returns {String}
          */
         layout:function(){
        	 var componentType =  "Cell Id: ";
        	 var elementType = this.subType=="dropdown" ? "Element: Dropdown" : "Element: Radio button";
             var htmlelement="";
        	 htmlelement+='<div class="pageSection cellComponent" id="cellComponent_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" >';
        	 htmlelement+='<div class="pageInnerSection">';
        	 htmlelement+='<div class="pageSectionHeader"><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="tophead invisible" style="padding-left: 260px"> '+componentType +'</span><h6 class="pull-right font10" > '+elementType+' ID #'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'</h6><p></p></div>';        	
        	 htmlelement+='<h2 id="componentType'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="tophead">'+componentType+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'</h2>';
        	 //htmlelement+='<h2 class="tophead">'+elementType+'</h2>';
        	 htmlelement+='<div id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"  class="pageSectionBody">';
        	 var i=0;
         	 for( i in this.sections){
         		 if(i==0){
         			 htmlelement+=  this.sections[i].layout(true,this.subType,this.pointBasedResponse);
         		 }
         		 else{
         			 htmlelement+=  this.sections[i].layout(false,this.subType,this.pointBasedResponse); 
         		 }
         	 }
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='<div class="pageSectionFooter">';
         	 if(this.ranges!=null && this.pointBasedResponse==true){
         		//htmlelement+= this.rangeFeedbackLayout();
         	 }
         	
         	 //htmlelement+= this.feedbackLayout();
         	 htmlelement+='<div class="eachCol">';
         	 htmlelement+='  <div style="width:446px;">';
         	 htmlelement+='    <button id="dropDownSave_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="button">Save</button>';
         	 htmlelement+='    <div class="clear"></div>';
         	 htmlelement+='  </div>';
         	 htmlelement+='</div>';
         	 
         	 htmlelement+='<div class="clear"></div>';
         	 /*htmlelement+='<div class="eachCol pull-right">';
         	 htmlelement+='   <div style="display:block" class="plusBtn">';
         	 htmlelement+='      <a title="Copy Question" id="quest_plus_'+this.id+'"><img src="img/plus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='  <div class="minusBtn">';
         	 htmlelement+='       <a title="Delete Question" id="quest_minus_'+this.id+'"><img src="img/minus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='   <div class="clear"></div>';
         	 htmlelement+='</div>';
         	 htmlelement+='</div>';
         	 htmlelement+='<div class="clear"></div>';*/	 
	       	 htmlelement+='</div></div>';	       
         	 return htmlelement;
         	 
         },
         /**
          * Range feedback
          */
         rangeFeedbackLayout:function(){
        	var htmlelement='<div id="rangeFeedback'+this.idPrefix+this.id+'">';
        	htmlelement+= '<div class="pageSectionBody range-feedback">'; 
        	htmlelement+= '<div class="headSection">';
      		htmlelement+= '<h6 class="pull-left font14 inputhead">Feedback | </h6>';
      		htmlelement+= '<h6 class="pull-left font14 tagtext"><a id="rangeCollapse_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'">Collapse range feedback</a></h6>'; 
      		htmlelement+= '</div>';
      		htmlelement+='<div class="clear"></div>';
      		htmlelement+='<div id="rangeFeedback_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'">';
      		htmlelement+='<div  style="float: left; margin-top: -17px;"><span class="rangeFeedbackVales"> Min. points: </span><span id="min_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"> '+this.minPoint+' </span> <span class="rangeFeedbackVales"> Max. points: </span><span id="max_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"> '+this.maxPoint+' </span></div>';
   //   		htmlelement+='<div id="rangeFeedbackVales" class="rageValueHeading"> <span class="rangeFeedbackVales"> Min. </span> <span class="rangeFeedbackVales"> Max. </span></div>';
      		var showMinus=true;
	       	if(this.ranges.length==1){
	       		showMinus=false; 
	       	}
      		for( j in this.ranges){
         		 if(j==this.ranges.length-1){
         			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(true,j,showMinus);
         		 }
         		 else{
         			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(false,j,showMinus); 
         		 }
         	 }
      		htmlelement+= '</div></div></div>';
      		return htmlelement;
         },
         afterRangeFeedbackLayout : function(){
        	 TableDropDownComponent.addEvent( "rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._collapseRangedBasedFeedback );
         },
         toggleRangedBasedFeedback : function(){
        	 var $divObj = $("#rangeFeedback_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId);
        	 if($divObj.is(":visible")){
        		 $("#rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).html("Expand range feedback");
        		 $divObj.hide("slow");
        	 }else{
        		 $("#rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).html("Collapse range feedback");
        		 $divObj.show("slow");
        	 }
         },
         feedbackLayout:function(){
        	 var css='';
        	 if(this.ranges!=null){
        		 css='style="display:none;"';
        	 }
        	 var htmlelement='<div id="componentFeedback'+this.idPrefix+this.id+'" '+css+'>';
        	 htmlelement+=' <div class="editGenFeed">Feedback: <a id="genFbTxt'+this.idPrefix+this.id+'">Expand general feedback</a>';
         	 htmlelement+=' </div>';
         	 htmlelement+='<div class="generalFeedback" id="genFb'+this.idPrefix+this.id+'" style="display: none;">';
         	 htmlelement+='   <div class="rowPagesection">';         	 
         	 htmlelement+= this.generalfeedbackLayout();         	 
         	 htmlelement+='   </div>';
         	 htmlelement+='   <div class="rowPagesection">';         	 
         	 htmlelement+= this.overallfeedbackLayout();
         	 htmlelement+='   </div>';
         	 htmlelement+='</div></div>';
         	return htmlelement;
         },
         /**
          * layouts component property pane in design mode
          * @returns {String}
          */
         propertyLayout:function(){
            if(this.type == ""){
                return false;
            }
        	 var binaryCss = this.subType=="dropdown" ? "class='disable-section'" : "";
        	 var disabledCheckbox =  this.subType=="dropdown" ? "disabled='disabled'" : "";
        	 var elementType = this.subType=="dropdown" ? "Element: Dropdown" : "Element: Radio button";
        	 var htmlelement='';
        	 htmlelement+='<div class="tabContent tabProContent tabProContent-2">';
        	 //htmlelement+='<div class="componentTytle">';
        	 //htmlelement+='<a class="info-icon" id="MultiChoiceComponentHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" ></a>Component: Multiple Choice';
        	 //htmlelement+='</div>';
        	 //htmlelement+='<div class="componentTytle">';
        	 //htmlelement+='<a id="MultiChoiceComponentElementId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" style="padding-left: 18px"></a>'+elementType+'';
        	 //htmlelement+='</div>';
        	 /*htmlelement+=' <div class="data_component">';
        	 htmlelement+='<p style="margin-top : 5px" class="txtediting boldclass">ID# '+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'</p>';
        	 htmlelement+='<div> <input type="radio" class="TableDropDownComponent" value="dropdown" id="dropDown'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" name="selectMultipleChoice">';
        	 htmlelement+='<label class="TableDropDownComponent" for="dropDown'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Dropdown</label>';
        	 htmlelement+='<input type="radio"  class="TableDropDownComponent"  value="redio" id="radioButton'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" name="selectMultipleChoice">';
        	 htmlelement+='<label  class="TableDropDownComponent" for="radioButton'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Radio button</label> ';
        	 htmlelement+='</div>';*/
        	 ////htmlelement+='<div class="grid grid-2">'; 
        	 ////htmlelement+='<input type="checkbox" id="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 ////htmlelement+='<label for="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Graded object</label>';          
        	 //htmlelement+='<input type="checkbox" '+disabledCheckbox+'  id="binaryAnswer'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';          
        	 //htmlelement+='<label '+binaryCss+' for="binaryAnswer'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span> Binary answer selection </label>';      
        	 ////htmlelement+='</div>';        	            
        	 //htmlelement+=' <div id="rbtnLabel" class="grid grid-3"> ';                                  
        	 //htmlelement+='<span>Radio button labels: </span>';
        	 //htmlelement+='<div class="form-group form-input">';
	       	 //htmlelement+='<input type="Text" id="Text1'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" placeholder="Choice 1">';
        	 //htmlelement+='</div>';  
        	 //htmlelement+='<div class="form-group form-input" style="margin-left:5px;">';
			// htmlelement+='<input type="Text" id="Text2'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" placeholder="Choice 2">';
        	 //htmlelement+='</div>';       
        	 //htmlelement+='</div>';
        	 htmlelement+='</div>';
             htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="tabContent tabProContent tabProContent-2">';
        	 htmlelement+='<div class="head-info">';
        	 htmlelement+='<a class="info-icon" id="answerTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+this.cellId+'" ></a>Answer type:';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="data_component">';
        	 htmlelement+='<div class="grid grid-2">'; 
        	 htmlelement+='<span>';
        	 htmlelement+='<input type="checkbox" id="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+this.cellId+'">';           
        	 htmlelement+='<label for="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+this.cellId+'"><span></span>Accept any answer</label>'; 
        	 htmlelement+='</span>';
        	 
        	 htmlelement+='<span>';
        	 htmlelement+='<input type="checkbox" id="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+this.cellId+'">';           
        	 htmlelement+='<label for="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+this.cellId+'"><span></span>Graded object</label>'; 
        	 htmlelement+='</span>';
        	 
        	 htmlelement+='<span id="pointBsdRes" class="clickrow">';
        	 //htmlelement+='<input type="checkbox" id="pointBsdRes'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 //htmlelement+='<label for="pointBsdRes'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Points-based response</label>'; 
        	 htmlelement+='</span>';
        	 htmlelement+='  <span id="showPntToStud" class="clickrow-1">';
        	 //htmlelement+=' <input type="checkbox" id="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 //htmlelement+=' <label for="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Show points to students</label>'; 
        	 htmlelement+='</span>';
        	 htmlelement+=' </div>';
        	 htmlelement+=' </div>';  
        	 htmlelement+=' </div>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="tabContent tabProContent tabProContent-2">';
        	 htmlelement+='<div class="head-info">';
        	 htmlelement+='<a class="info-icon" id="requiredQuestionId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"></a>Prerequisite:';
        	 htmlelement+='</div>';
        	 htmlelement+=' <div class="data_component">';
        	 htmlelement+='   <p style="margin-top : 5px" class="txtediting boldclass">In order to move forward,\n student responses are:</p>';
        	 htmlelement+='	<div> <input type="radio" value="Required" id="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" name="optionsRadios">';
        	 htmlelement+='   <label for="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span>Required</label> <input type="radio" id="Radio2" name="displayBranchingMode">';        	 htmlelement+='   <input type="radio" value="Optional" id="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" name="optionsRadios">';
        	 htmlelement+='     <label for="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span>Optional</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
          	 htmlelement+='  </div>';            
        	 htmlelement+=' </div>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="gap10"></div>';
			 htmlelement+='<div class="clear"></div>';		
        	 htmlelement+='</div>';
        	 return htmlelement;
	     },
	     /**
	      * adds event hadlers for elements present in component property pane
	      */
	     afterPropertyLayout:function(){
	    	 TableDropDownComponent.addEvent( this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._populateComp );
	    	 TableDropDownComponent.addEvent( "MultiChoiceComponentHelpId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._openHelpModalForTableDropDownComponent);
	    	 TableDropDownComponent.addEvent( "requiredQuestionId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._openHelpModalForRequiredQuestionSelector);
	    	 TableDropDownComponent.addEvent( "answerTypeHelpId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._openHelpModalForAnswerType);
	    	 TableDropDownComponent.addEvent("acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._acceptAnyAnswer);
     		 TableDropDownComponent.addEvent("gradadedObjectBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markGraded);
     		 TableDropDownComponent.addEvent("pointBsdRes"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._pointBaseResponse);
     		 TableDropDownComponent.addEvent("binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._binaryAnswer);
     		 TableDropDownComponent.addEvent("showPntToStud"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._showPointToStudent);
     		 TableDropDownComponent.addEvent("Text1"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "blur", this._updateRadioChoice);
     		 TableDropDownComponent.addEvent("Text2"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "blur", this._updateRadioChoice);
     		TableDropDownComponent.addEvent("dropDown"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeType);
     		TableDropDownComponent.addEvent("radioButton"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeType);
     		TableDropDownComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory);
     		TableDropDownComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory);
	     },
          /**
           * 
           */
          pointBaseResponse:function(){         	 
        	  var pointflag=null;
        	  if($("#pointBsdRes"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked")){
        		  $('#showPntToStud').show();
        		  $(".editGenFeed").hide();
        		  pointflag=true;        		
  	    	  }else{
  	    		  $('#showPntToStud').hide();
  	    		  $(".editGenFeed").show();
        		  pointflag=false;
        		  this.ranges=null;
        	  }        		  
        	  $.each(this.sections,function(i,secObj){
    			  secObj.togglePonits(pointflag);
    		  });         	  
        	  this.pointBasedResponse=pointflag;
        	  this.createRangeBasedFeedback();
 	      },
	      showBinaryAnswer:function(){
	    	 if($("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked")){	
	    		this.createBinaryResult(true);
	    		$("#rbtnLabel").show();
	    	 }
	    	 else{
	    		 this.createBinaryResult(false);
	    		 $("#rbtnLabel").hide();
	    		 this.showSolutionIndicator();
	    	 }
	      },
	      showSolutionIndicator : function(){
	    	 if(!$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked') && !$("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked')){
    			 //var selectordiv=$('#cellComponent_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).find('.tickCheck');
	    		 var selectordiv=$('#CellComponenetsWrapper_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).find(".cellComponent").last().find('.tickCheck');
    			 var length = selectordiv.length;
    			 for( var i=0;i<=length;i++){
 	  	   			    $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').find(".indt-mrgn").css('display','none');
                        if(this.acceptAnyAnswer == false){
 	  	   			     $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').find(".radioOption").css('display','inline');
                        }
 	  	   		}
    		 } 
	     },
	     showPointToStudent:function(){	    	
	    	 if($('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked')){
	    	 this.showPointsToStudents=true;
	    	 }
	    	 else{
	    	 this.showPointsToStudents=false; 	    	
	    	 }
	     },
	     createBinaryResult : function(flag){
	    	 var acceptAnyAnswer = this.acceptAnyAnswer;
	    	 $.each(this.sections,function(i,secObj){
	    		 var j=0;
	    		 for(j in secObj.options){
	    			 var optionAnswers = new Array();
	    			 var option = secObj.options[j];
	    			 var optionAnswersConfig = {
	 						id:1,
	 						optionId : option.id,	 						
	 						optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
	 						componentId : option.componentId,
							componentIdPrefix : option.componentIdPrefix,
							sectionId : option.sectionId,
	    					sectionIdPrefix : option.sectionIdPrefix,
	    					right : (!flag && !acceptAnyAnswer ) ? false : true,
	 					};
	 				optionAnswers[0]=new MultipleChoiceOptionAnswer(optionAnswersConfig);
	 				optionAnswers[0].feedback.text = option.answers[0].feedback.text;
	 				optionAnswers[0].pointsValueEditor.text=option.answers[0].pointsValueEditor.text;
	 				
	 				if(flag){
	 					var optionAnswersConfig = {
		 						id:2,
		 						optionId : option.id,		 						
		 						optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
		 						componentId : option.componentId,
								componentIdPrefix : option.componentIdPrefix,
								sectionId : option.sectionId,
		    					sectionIdPrefix : option.sectionIdPrefix,
		    					right : ( flag && acceptAnyAnswer ) ? true : false
		 					};
		 				optionAnswers[1]=new MultipleChoiceOptionAnswer(optionAnswersConfig);
		 				if(option.answers[1]!=undefined){
		 					optionAnswers[1].pointsValueEditor.text=option.answers[1].pointsValueEditor.text;
		 					optionAnswers[1].label=option.answers[1].label;
		 					optionAnswers[0].label=option.answers[0].label;
		 				}
		 				
	 				}
	 				secObj.options[j].setAnswers(optionAnswers);
	    		 }
	    	 });
	    	 	this.binaryAnswer = flag;
	    	 	if(flag){
	    	 		this.resetPointValue();
	    	 		this.updateMinMaxPoint();
	    	 	}
	    	 	
	    	 	question.activePage.doLayout();
	    	 	this.populateComp();
	     },
	     /**
	         * Update radioBtn Choices
	         */
	     updateRadioChoice:function(){
	    	 var i=0;
 			 for( i in this.sections){
 			 var j=0;
 		  	  for( j in this.sections[i].options){ 		  		 
 		  		this.sections[i].options[j].answers[0].setLabel($("#Text1"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val());
 		  		this.sections[i].options[j].answers[1].setLabel($("#Text2"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val());
 		  	  }
 		  }	    
	     },
 	   	    
        /**
         * populate component properties
         */
        populateComp:function(){  
		var isDisableoptionOrientation = false;
            if(this.type != ""){
                var htmlProp = this.propertyLayout();
                if(htmlProp != ""){
                    $("#CellComponentSpecificProperties").html(htmlProp);
                    this.afterPropertyLayout();
                }
         	}
        	$("#pointBsdRes").hide();
        	$("#showPntToStud").hide();
        	$("#rbtnLabel").hide();
        	//$("#elementProperties").hide();
        	//$("#properties").show();    
        	if(this.graded==true){
        		$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);
        	}else{
        		$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', false);
        	}
			if(this.subType=="radio"){
					$("input[name=selectMultipleChoice][value='redio']").prop('checked', true);
			}else{
					$("input[name=selectMultipleChoice][value='dropdown']").prop('checked', true);
			}			
			
			
			if(this.acceptAnyAnswer==true){
					$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).trigger('click');
					$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);				
			}else{
					$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', false);
					/*$.each(this.sections,function(i,secction){
						var i = 0;
						for(i in secction.options){
							if(secction.options[i].answers[0].right){
								$("#option_"+secction.options[i].editor.id).prop("checked",true);
							}
						}
					});*/
			}			
			if(this.mandatory==true){
				$('#optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);
			}else{
				$('#optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);
			}			
        	if(this.binaryAnswer==true){
        		isDisableoptionOrientation = true;
        		$("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",true);
        		$("#rbtnLabel").show();
        		 var i=0;
        		 var firstOption = null;
     			 for( i in this.sections){
     			  	firstOption = this.sections[i].options[0];
     		  	  }
     			 if(firstOption!=null){
     				 $("#Text1"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val(firstOption.answers[0].label);
         			 $("#Text2"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val(firstOption.answers[1].label);
     			 }
     			$("#radioOptionVertical"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",true);
     			$("#radioOptionVertical"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).trigger("click");
        	}else{
        		isDisableoptionOrientation = false;
        		$("#rbtnLabel").hide();
        	}        	
        	if(this.pointBasedResponse==true){
        		$("#showPntToStud").show();
        		$("#pointBsdRes"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",true);        		
        	}else{
        		$("#showPntToStud").hide();
        	}        	
        	$("#optionDropDownId").show();
        	if($("#optionDropDownId").parent().hasClass("open")){
        		$("#optionDropDownId").trigger("click");
        	}	
        	if(this.showPointsToStudents==true)
        		$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",true);
        	else
        		$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",false);
        	$("#componentOptionDropDownId").html(this.optionOrientationDropDownLayout(isDisableoptionOrientation));
        	this.afterOptionOrientationDropDownLayout();
        	this.populateAnswerOrientation();
        	this.showSolutionIndicator();
        },
        /**
         * Function to check multiple choice option object
         * optionOrientation and set checked accordingly.
         * */
        populateAnswerOrientation : function(){
	        	switch(this.answerOptionOrientation){
	    		case 1 :
	    			$("#radioOptionVertical"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",true);
	    			break;
	    		case 2 :
	    			$("#radioOptionHorizontal"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",true);
	    			break;
	    		case 3:
	    			$("#radioOptionTwo-column"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",true);
	    			break;
	    		default :
	    				break;
	        	}
        },
        
        /**
         * add multiple choice component to page
         */
        addTableDropDownComponent:function(){
        	page.addTableDropDownComponent();
        },
        /**
         * creates copy of the current checkbox component
         * @param event
         */
        copyTableDropDownComponent : function(event){
            var	id = event.data.id;
        	//page.copyComponent(id);
        },
        /**
         * remove the checkbox component
         * @param event
         */
        removeComponent:function(event){
        	page.deleteComponent(event.data.id);
        },
        /**
         * constructs the CheckboxComponnet from json object
         * @param jsonObj
         * @returns {TableDropDownComponent}
         */
        deserialize:function(jsonObj){
        	var sections =[];
        	var i=0;
        	 for( i in jsonObj.sections){
 	  	    		var sectionObj =new TableDropDownSection(jsonObj.sections[i]);
 	  	    		var editor = new Editor(jsonObj.sections[i].editor);
 	  	    		sectionObj.setEditor(editor);
 	  	    		var options=[];
 	  	    		var j=0;
 	  	    		for(j in jsonObj.sections[i].options){
 	  	    			var optionObj =new TableDropDownOption(jsonObj.sections[i].options[j]);
 	  	    			var optionEditor=new Editor(jsonObj.sections[i].options[j].editor);
 	  	    			optionObj.setEditor(optionEditor);
 	  	    			var answers=[];
 	  	    			var k=0;
 	 	  	    		for(k in jsonObj.sections[i].options[j].answers){
	 	 	  	    		var answerObj =new TableDropDownOptionAnswer(jsonObj.sections[i].options[j].answers[k]);
	 	  	    			var pointsValueEditor=new NumericEditor(jsonObj.sections[i].options[j].answers[k].pointsValueEditor);
	 	  	    			var feedback =new Editor(jsonObj.sections[i].options[j].answers[k].feedback);
	 	  	    			answerObj.setPointsValueEditor(pointsValueEditor);
	 	  	    			answerObj.setFeedback(feedback);
	 	  	    			answers.push(answerObj);
 	 	  	    		}
 	 	  	    		optionObj.setAnswers(answers);
 	 	  	    		options.push(optionObj);
 	  	    		}
 	  	    		sectionObj.setOptions(options);
 	  	    		sections.push(sectionObj);
 	  	    	}
        	var compObj= new TableDropDownComponent(jsonObj);
         	compObj.setSections(sections);
 	  	  	if(jsonObj.ranges!=null){
	 	  	  	 var ranges=[];
	 	  	  	 for( l in jsonObj.ranges){
	 	  	  		var rangeObj =new Range(jsonObj.ranges[l]);
		    		var minRangeEditor = new NumericEditor(jsonObj.ranges[l].minRangeEditor);
		    		var maxRangeEditor = new NumericEditor(jsonObj.ranges[l].maxRangeEditor);
		    		var rangeFeedbackEditor = new Editor(jsonObj.ranges[l].rangeFeedbackEditor);
		    		rangeObj.setMinRangeEditor(minRangeEditor);
		    		rangeObj.setMaxRangeEditor(maxRangeEditor);
		    		rangeObj.setRangeFeedbackEditor(rangeFeedbackEditor);
		    		ranges.push(rangeObj);
	 	  	  	 }
	 	  	  	 compObj.setRanges(ranges);
 	  	  	}
        	var generalFeedback = new Editor(jsonObj.generalFeedback);
        	var overallFeedback = new Editor(jsonObj.overallFeedback);
        	compObj.setGeneralFeedback(generalFeedback);
        	compObj.setOverallFeedback(overallFeedback);
        	return compObj;
        },
       
	     /**
	      * opens help modal popup for multiple choice component
	      * @param event
	      */
	     openHelpModalForTableDropDownComponent : function(event){
	    	 new Modal({id : 1,headingText : message.getmultipleChoiceCompHeading(),containtText : message.getmultipleChoiceCompMsg()}).openHelpModal();
	     },
	     /**
	      * opens help modal popup for Answer Type in multiple choice component
	      * @param event
	      */    
	     openHelpModalForAnswerType:function(event){
	    	 new Modal({id : 1,headingText : message.getanswerTypeHeader(),containtText : message.getanswerTypeMsg()}).openHelpModal(); 
	     },
	     /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
         afterLayout:function(){
                if(this.type != ""){
        	       //$("#CellComponentSpecificProperties").html(this.propertyLayout());
                   this.afterRangeFeedbackLayout();
                    this.updateMinMaxPoint();
                    this.populateComp();
                }
        	    
        		//TableDropDownComponent.addEvent( "genFbTxt"+this.idPrefix+this.id, "click", this._toggleFeedback );
        		//TableDropDownComponent.addEvent( this.generalFeedback.id, "click", this._populateGFEditorProperties );
        		//TableDropDownComponent.addEvent( this.overallFeedback.id, "click", this._populateOFEditorProperties );
        		//TableDropDownComponent.addEvent( this.generalFeedback.id, "blur", this._update );
        		//TableDropDownComponent.addEvent( this.generalFeedback.id, "paste", this._filter);
        		//TableDropDownComponent.addEvent( this.overallFeedback.id, "paste", this._filter);
        		//TableDropDownComponent.addEvent( this.overallFeedback.id, "blur", this._update );
        		//TableDropDownComponent.addEvent( "quest_plus_"+this.id, "click", this._copyTableDropDownComponent,{id : this.id});
        		//TableDropDownComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        		TableDropDownComponent.addEvent("acptAnyAnsBtnId", "click", this._acceptAnyAnswer);
        		//TableDropDownComponent.addEvent("gradadedObjectBtnId", "click", this._markGraded);
        		//TableDropDownComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory);
        		//TableDropDownComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory);
        		//TableDropDownComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._collapseComponent);
        		var i=0;
        		 for( i in this.sections){
             		 this.sections[i].afterLayout();
             	 } 
        		 //var j=0;
        		 // for( j in this.ranges){
             	//	 this.ranges[j].afterLayout();
             	 //}
        		  if(this.subType=="dropdown"){
        			  $(".displayAnswerDiv").addClass("disable-section");
                  	  $(".displayAnswerDiv").find('input[type="radio"]').attr("disabled",true);
        		  }
        		  if(this.state=="collapse"){
             		 this.collapseComponent();
             	 }
        		 TableDropDownComponent.addEvent("dropDownSave_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._saveDropdownOptions);
         },
         /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLayout:function(){
        	var htmlelement='';
    		var hidden = this.overallFeedback.text =='' && this.generalFeedback.text=='' ?'invisible' : '';
    		
    		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"  class="mainQuestionSection ">';
    		
    		
    		var i=0;
    		for( i in this.sections){
    			
    			htmlelement +=' <div class="prevQuest stdprevQuest">';
    				
    			htmlelement +=this.sections[i].instructorLayout(this.graded,this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.pointBasedResponse);
    			htmlelement +='</div>';
    			if(this.subType=='radio')
    				htmlelement +='</div>';
    			htmlelement +='<div class="clear"></div>';
        	}
    		return htmlelement;
         },
         afterInstructorLayout : function(){
        	 var j=0;
	   		 for(j in this.sections){
	   			 this.sections[j].afterStudentLayout(this.subType);
	   		 }
	   		$('.stdQueLabel').each(function (){
				$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
	        });
         },
         /**
          * layouts in student test mode
          * @returns {String}
          */
         studentLayout:function(){
        	var htmlelement='';
     		
     		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="mainQuestionSection " >';
     		var i=0;
     		for( i in this.sections){
     			htmlelement +=' <div class="prevQuest stdprevQuest">';
     		//	htmlelement +='<div class="stdQueLabel"> '+this.sections[i].editor.text+'</div>';
     		//	htmlelement +='<div class="clear"></div>';
    	   		
    	   		
     			htmlelement +=this.sections[i].studentLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.pointBasedResponse, this.showPointsToStudents);
     			htmlelement +='</div>';
     			if(this.subType=='radio')
    				htmlelement +='</div>';
     			htmlelement +='<div class="clear"></div>';
         	}     		
     		htmlelement+='</div>';
     		htmlelement+='</div>';
     		return htmlelement;
         },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterStudentLayout:function(){  
        	 var j=0;
	   		 for(j in this.sections){
	   			 this.sections[j].afterStudentLayout(this.subType);
	   		 }
	   		$('.stdQueLabel').each(function (){
				$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
	        });
         },
         /**
          * layouts in check my work status mode
          * @returns {String}
          */
         checkMyWorkLayout:function(){        	
        	 
         },
         /**
          * builds the layout for post Submission Review mode
          * @returns {String} html element
          */
         postSubmissionReviewLayout:function(showNotApplicable){
        	var htmlelement='';
     		var hidden = this.overallFeedback.text =='' && this.generalFeedback.text=='' ?'invisible' : '';
     		
     		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="mainQuestionSection rowPagesectionStudentTbl">';
     		var tickMarkDiv=(this.acceptAnyAnswer)&&this.isStudentAnswered(this.binaryAnswer)?" <div class='answerTick correct'></div>":"";
     		
     		var arrStudentAnswered = [];
     		var totalOptions = 0;
     		
     		var i=0;
     		var totalPoints=0;
     		
     		
     		for( i in this.sections){
     			var y=0;
     			var isStudentChecked = false;
     			var isAttemptQustion = false;
		   		for( y in this.sections[i].options){
		   			var x = 0;
			   		for( x in this.sections[i].options[y].answers ){
			   			if(this.sections[i].options[y].answers[x].studentResponse)
			   				isAttemptQustion = true;
			   			if( this.pointBasedResponse && this.sections[i].options[y].answers[x].studentResponse ) {
			   				arrStudentAnswered.push(this.sections[i].options[y].answers[x].studentResponse);   						   				
						}
			   		} 
			   		if( this.binaryAnswer && this.subType == 'radio' ){
				   		totalOptions++;
			   		} else {
			   			totalOptions = 1;
			   		}
		       	}
		   		if(!showNotApplicable)
		   		{
			   		if(!isAttemptQustion){
			   			$("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).addClass("incompleteCell");
			   		}		
			   		if( arrStudentAnswered.length == 0 && this.pointBasedResponse ){
			   			isStudentChecked = false;
		     			htmlelement += '<div class="inCompleteAnswerBanner" >You did not complete this question.</div>';
			   		} else {
			   			isStudentChecked = true;
			   		}
		   		}
     			htmlelement +=this.sections[i].postSubmissionReviewLayout(this.graded,this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.pointBasedResponse, isStudentChecked, this.showPointsToStudents);
     			htmlelement +='</div>';
     			if(this.subType=='radio')
    				htmlelement +='</div>';
     			if( this.pointBasedResponse ) {
     				totalPoints += this.sections[i].calculatePoints();
     			}
     			htmlelement +='<div class="clear"></div>';
         	}
     		htmlelement+='</div>';
     		return htmlelement;
         },
          /**
           * show correct/wrong answers marked by author in design mode
           */
         showCorrectAnswers:function(){
         },
         /**
          * show correct/wrong answers marked by student in test mode
          */
         showAnswers:function(){
         },
         /**
          * calculates Total Score
          */
         calculateScore:function(){
        	 var totalCorrectAnswers=0;
    		 var i=0;
    		 for( i in this.sections){  
    			 if(this.binaryAnswer){
    				 totalCorrectAnswers +=this.sections[i].options.length;
    			 }else{
    				 totalCorrectAnswers +=1;
    			 }
           	 };
           	 var weightage = 1/totalCorrectAnswers;
           	 var totalCrctAnsrGvnByStdnt =0;
           	 var j=0;
           	 for( j in this.sections){    		
           		totalCrctAnsrGvnByStdnt +=this.sections[j].calTotalCrctAnswersGivenByStudent(this.binaryAnswer);
          	 };
          	 var totalWrngAnsrGvnByStdnt=0;
          	 var k=0;
          	 for( k in this.sections){    		
          		totalWrngAnsrGvnByStdnt +=this.sections[j].calTotalWrngAnswersGivenByStudent(this.binaryAnswer);
         	 };
         	 
         	 if(this.graded)
     		 {
         		if(this.acceptAnyAnswer)
     			{
         			if(totalCrctAnsrGvnByStdnt>0){
         				var score = 0;
         				if(this.binaryAnswer)
     					{
         					score = totalCrctAnsrGvnByStdnt/totalCorrectAnswers;
     					}
         				else         					
         					score = totalCrctAnsrGvnByStdnt/this.sections.length;
         				
         				return score;
         			}
         			else{
         				return 0;
     				}
     			}
         		else
     			{
         			 var totalScore=(totalCrctAnsrGvnByStdnt*weightage);
                  	 if(isNaN(totalScore) || totalScore<0 ){
              			totalScore=0;
              		 }
            		return totalScore;
     			}
 		 
     		 }  
         },
         acptAnyAnswer:function(){	
            var selectordiv=$('#cellComponent_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).find('.tickCheck');
     		var length = selectordiv.length;
 	    	 if($("#acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked")){	
 	    		 	$("#pointBsdRes").show();
 	    		 	$("#showPntToStud").hide();
 	    		 	for( var i=0;i<=length;i++){
 	    		 		$("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','hidden');
 	   			   }
 	    	    this.acceptAnyAnswer =true;
 	    	    this.resetAnswers();
 	    		}else{
 	    				$("#pointBsdRes").hide();
 	    				$("#showPntToStud").hide();
 	    				for( var i=0;i<=length;i++){
 	  	   			    $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','visible');
 	  	   			   }
 	    			this.acceptAnyAnswer =false;
 	    			$("#pointBsdRes"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked",false);
 	    			this.resetAnswers();
 	    			//this.pointBaseResponse();
 	    			//if(this.pointBasedResponse){
 	         		 // this.resetPointValue();
 	         		 
 	         	  //}
 	    			/**
 	    			 * Reset Answers for radio
 	    			 * **/
 	    			/* if(this.subType=="radio"){
 	    			 $.each(this.sections,function(i,secObj){
	         			  var i=0;
	         			  for(i in secObj.options){
	         					secObj.options[i].resetAnswer();
	         			  }
	         		  });
 	    			 }*/
 	    			this.showSolutionIndicator();
 	    			
 	    			/*if($("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked")){	
	 	   	    		this.createBinaryResult(true);
	 	   	    	} else{
	 	   	    		this.createBinaryResult(false);
	 	   	    	}*/
 	    		}
 	    	
 	    	 
 	    	 var j=0; 	    	 
 	    	 for(j in this.options){
 	    			this.options[j].setRight(true);
 	    			$("#wrong_"+this.options[j].componentId+this.options[j].id).removeClass("active");
 	    			$("#right_"+this.options[j].componentId+this.options[j].id).addClass("active");
 	    		}
 	     },
 	     resetAnswers : function(){
 	    	 var acptAnyAns = this.acceptAnyAnswer;
 	    	 var binaryAnswer = this.binaryAnswer;
 	    	 $.each(this.sections,function(i,secObj){
     			  var i=0;
     			  for(i in secObj.options){
     					secObj.options[i].resetAnswer(acptAnyAns,binaryAnswer);
     				 }
     		  }); 
 	     },
         /**
          * validate if component is filled
          */
 	     
         validateComponent:function(object){
        	 var i=0;
             var isComplete=true;
             var validRange =true;
               for( i in this.sections){      
            	   isComplete=isComplete && this.sections[i].isSectionComplete(this.pointBasedResponse);
               }
              var rangeError={};
              var j=0;
              for( j in this.ranges){
            	   var validatorObj=this.ranges[j].validateRange();
   					validRange=validRange && validatorObj.status;
   					if(!validRange && validatorObj.message != undefined){
   						rangeError.message=validatorObj.message;
   	   					rangeError.field=validatorObj.field;	
   	   					break;
   					}
   					
              }
             
               if(!isComplete){
               object.flag = true;
               object.completeFlag = true;
               object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id + " Cell : "+this.cellId;
               }
               var rightAnswerSelected=true;
               if(!this.acceptAnyAnswer){
            	   var cnt=0;
            	   for( cnt in this.sections){      
            		   rightAnswerSelected=rightAnswerSelected && this.sections[cnt].isRightAnswerSelected(this.binaryAnswer);
                   }
            	   if(!rightAnswerSelected){
                       object.flag = true;
                       object.rightAnswerFlag = true;
                       object.errorMsg+=(isComplete)?"<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+(this.idPrefix +this.id):""; 
                       object.errorMsg+="<br> right answer not selected";
                       }
               }
               if(!validRange){
	   				 object.flag = true;
	   				 object.rangeflag = true;
	   				 object.errorMsg+=(isComplete && rightAnswerSelected)?"<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id:"";
	   				 object.errorMsg+="<br> "+rangeError.message;
	   				 object.field=rangeError.field;
	   		   }
			return object;
        },
        createRangeBasedFeedback:function(){
        	if(this.pointBasedResponse){
	        	var range=new Array();
				var rangeConfig = {
						componentId :this.id,
						componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix
					};
				for (var i=1;i<=3;i++){
					rangeConfig.id=i;
					range.push(new Range(rangeConfig));	
				}
				this.setRanges(range);
        	}else{
        		this.setRanges(null);		
        	}
        	question.activePage.doLayout();
        	this.populateComp();
        },
        optionOrientationDropDownLayout : function(isDisableoptionOrientation){
        	var addDisableproperty = "";
        	if(isDisableoptionOrientation){
        		addDisableproperty = "disabled";    
        		this.answerOptionOrientation = 1;
        	}
        	var htmlelement = '';
        	htmlelement += '<div class="componentTytle title-head  ">';
        	htmlelement += '		<a class="info-icon"></a>Answer display:';
        	htmlelement += '</div>';
        	htmlelement += '<div class="displayAnswerDiv">';
        	htmlelement += '		<span class="title-head-1"></span>';
        	htmlelement += '		<li>';
        	htmlelement += '			<div class="article-col">';        	
        	htmlelement += '				<input type="radio" id="radioOptionHorizontal'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="radioclick" value="2" ' +addDisableproperty+ '/>';
        	htmlelement += '					<label class="radioclick" for="radioOptionHorizontal'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span>Horizontal</label>';
        	htmlelement += '			</div>';
        	htmlelement += '		</li>';        	
        	htmlelement += '		<li>';
        	htmlelement += '			<div class="article-col">';
        	htmlelement += '				<input type="radio" id="radioOptionVertical'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="radioclick" value="1"/>';
        	htmlelement += '					<label class="radioclick" for="radioOptionVertical'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span>Vertical</label>';
        	htmlelement += '			</div>';
        	htmlelement += '		</li>';        	
        	htmlelement += '		<li>';
        	htmlelement += '			<div class="article-col">';
        	htmlelement += '				<input type="radio" id="radioOptionTwo-column'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="radioclick" value="3" ' +addDisableproperty+ '/>';
        	htmlelement += '					<label class="radioclick" for="radioOptionTwo-column'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span>Two-column</label>';
        	htmlelement += '			</div>';
        	htmlelement += '		</li>';       	
        	htmlelement += '</div>';
        	return htmlelement;
        },
        afterOptionOrientationDropDownLayout : function(){
        	TableDropDownComponent.addEventOnClass("radioclick","click",this._changeOptionOrientation);
        },
        changeOptionOrientation : function(e){
        	var selected = $("input[type='radio'][name='optionOrientation"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+"']:checked");
        	var selectedVal = selected.val();
        	this.answerOptionOrientation = parseInt(selectedVal);
        	 e.stopPropagation();
        },
        /**
         * Function to add new section to multiple choice question
         * */
        addSection : function(newSection){
      	  this.sections.push(newSection);
        },
        addRange:function(newRange){
        this.ranges.push(newRange);	
        },
        changeType : function(){
           if($("#dropDown"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked")){
        		$(".displayAnswerDiv").addClass("disable-section");
            	$(".displayAnswerDiv").find('input[type="radio"]').attr("disabled",true);            	           	
            	this.subType = "dropdown";
            	this.binaryAnswer = false;
            	this.createBinaryResult(this.binaryAnswer);            	   	
        	}else{
        		$(".displayAnswerDiv").removeClass("disable-section");
            	$(".displayAnswerDiv").find('input[type="radio"]').attr("disabled",false);
            	this.subType = "radio";
        	}
            this.resetAnswers();
        	question.activePage.doLayout();
        	this.showSolutionIndicator();
        	this.populateComp();
        },
        /**
         * resets points value
         */
        resetPointValue:function(){
        	this.minPoint=0;
        	this.maxPoint=0;
        	if(this.ranges!=null){
	        	$.each(this.ranges,function(i,range){
	        		range.minRangeEditor.text="";
	        		range.maxRangeEditor.text="";
	        		range.rangeFeedbackEditor.text="";
					$('#'+range.minRangeEditor.id).html="";
					$('#'+range.maxRangeEditor.id).html="";
					$('#'+range.rangeFeedbackEditor.id).html="";
					
			    });
        	}
        },
    	filter:function(event){
    		util.removePasteImage(event.originalEvent.clipboardData,event);
    	},
        // TODO : click on component optin open pallet pending
        /*clickOptionOrientation : function(){
        	$(".componentOptionAccordianPanel").trigger("click");
        }*/
        collapseComponent : function(){
        	var $snap = $("#componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId);   	
        	var $comp = $("#compBody_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId);
        	var tooltip=$snap.find("img");
        	if($comp.is(":visible")){
        		$comp.hide('slow');
        		$snap.find("img").attr("src","img/comp-plus.png");
        		tooltip.attr("title","Expand");
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).removeClass("invisible");
        		$comp.prev().hide();
        		$("#componentType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).hide();
        		this.state="collapse";
        	}else{
        		$comp.show('slow');
        		$snap.find("img").attr("src","img/comp-minus.png");
        		tooltip.attr("title","Collapse");
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).addClass("invisible");
        		$comp.prev().show();
        		$("#componentType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).show();
        		this.state="expand";
        	}
        },
        saveDropdownOptions : function(){
        	var sectionText = "";
        	var optionVals = [];
        	var x=0, y=0;

        	if(this.sections.length > 0){
        	 for(x in this.sections){
        		 sectionText = this.sections[x].editor.text;
                 if(sectionText == ""){
                        var editorId = this.sections[x].editor.id;
                        new Modal(
                          {
                              id : 1,headingText : "Validation Error",
                              containtText : "Please fill all fields",
                              closeActionEvent:function(){
                                   $("#"+editorId).focus();
                              }
                          }).getWarningModal();
                   
                    return false;
                 }
        		if(this.sections[x].options.length > 0){
                    for(y in this.sections[x].options){
        			 var optn = this.sections[x].options[y];
                        if( optn.editor.text == "" ){
                            var optEditorId = optn.editor.id;
                            new Modal(
                          {
                              id : 1,headingText : "Validation Error",
                              containtText : "Please fill all fields",
                              closeActionEvent:function(){
                                   $("#"+optEditorId).focus();
                                  
                              }
                          }).getWarningModal();
                          
                            return false;
                        }
        			    else {
                            optionVals.push({"optId":optn.editor.id, "optText":optn.editor.text});
                        }
                    }
        		}
        	  }
        	}
        	//console.log(optionVals);
        	var itsCellId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId;
        	var dropDownHtml = "";
        	var i=0;
        	
        	if(sectionText != ""){
        		dropDownHtml += '<select id="CellDropDownField_'+itsCellId+'">';
        		dropDownHtml += '<option value="0">'+sectionText+'</option>';
        	}
        	
        	if(optionVals.length > 0){
        		if(sectionText == ""){
        		  dropDownHtml += '<select id="CellDropDownField_'+itsCellId+'">';
        		}
        	}
        	for(i;i<optionVals.length; i++){
        		dropDownHtml += '<option class="tableOption" value="'+optionVals[i].optId+'">';
        		dropDownHtml += optionVals[i].optText;
        		dropDownHtml += '</option>';
        	}
        	
        	if(dropDownHtml != ""){
        		if(sectionText != ""){
        		  dropDownHtml += '</select>';
        		}
        		if(optionVals.length > 0){
        		  if(sectionText == ""){
        		   dropDownHtml += '</select>';
        		  }
        		}
        		//tableCellHTML = dropDownHtml;
        	}
        	$("#CellDropDownField_"+itsCellId).html(dropDownHtml);
        	//tableCellHTML = dropDownHtml;
        	
        	//set dropdown values
        	var componentTable = this.getItemById(question.getActivePage().getComponents(), this.id);
        	componentTable.changeValById(componentTable.cellHTMLCollection, itsCellId, "itsHtml", dropDownHtml)
        /*	$("#CellDropDownField_" + itsCellId).change(function(){
        		event.stopPropagation();

        	});*/
        	TableDropDownComponent.addEventOnClass("tableOption","click", this._updateDropDown);	
        },
        updateDropDown : function(){
        	
        },
    	 /**
		 * check if question is answered
		 */

        isStudentAnswered:function(){
             var i=0;
             var validflag=false;
  //           if(this.isMandatory()){
	   			 for( i in this.sections){
	   				validflag=this.sections[i].isStudentAnswered(this.binaryAnswer);
	   				if(validflag){
	   					break;
	   				}
	   			 }
//             }else{
//            	 validflag=true;
//             }
			return validflag;
        },
       
        /**
		 * check if question is answered
		 */

        validateStudentQuestionLayout:function(){
             var validflag=false;
             if(this.isMandatory()){
	   			 validflag =this.isStudentAnswered();
             }else{
            	 validflag= true;
             }
			return validflag;
        },
        getItemById : function(source, id){
        	for (var i = 0; i < source.length; i++) {
        	  if (source[i].id === id) {
        		 return source[i];
        	  }
            }
        	throw "Couldn't find object with id: " + id;
         }
	};  
