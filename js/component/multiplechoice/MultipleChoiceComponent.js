/* ========================================================================
 * MultipleChoiceComponent: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * accepts any answer, graded, mandatory. holds the componnet text editor
 * general feed back editor, overall feedback editor.and all sections/options 
 * for this component
 * ======================================================================== */
var MultipleChoiceComponent = function(options){ 
	this.subType='radio';
	this.binaryAnswer=false;
	this.feedbackType = 'standard';
	this.feedbackScoringType = 'sum';
	this.pointBasedResponse=false;
	this.answerOptionOrientation=1;
	this.showPointsToStudents=false;
	this.hideSubCategoriesfromStudents=false;
	this.sections=[];
	this.subCategoryRanges=null;
	this.ranges=null;
	this.minPoint = 0;
	this.maxPoint = 0;
	this.totalPoints = 0;
	this.totalFreqency = [];
    this.notApplicable = false;	//set question as not applicable in auther mode
	this.notApplicableStudentResponse = false; //set student response for not applicable option
	this.awardMaximum = true;
	this.awardMinimum = false;
	$.extend(MultipleChoiceComponent.prototype, new Component(options));
	$.extend(this, options);
	this.type='multiplechoice';
	this.subCategories=null;
	this.choiceOptionVal1 = "";
	this.choiceOptionVal2 = "";
	
	this._toggleFeedback = MultipleChoiceComponent.BindAsEventListener(this, this.toggleFeedback );
	this._populateGFEditorProperties = MultipleChoiceComponent.BindAsEventListener( this, this.populateGFEditorProperties );
	this._populateOFEditorProperties = MultipleChoiceComponent.BindAsEventListener( this, this.populateOFEditorProperties );
	this._update = MultipleChoiceComponent.BindAsEventListener( this, this.update );
	this._populateComp = MultipleChoiceComponent.BindAsEventListener( this, this.populateComp );
	this._addMultipleChoiceComponent=MultipleChoiceComponent.BindAsEventListener( this, this.addMultipleChoiceComponent );
	this._copyMultipleChoiceComponent=MultipleChoiceComponent.BindAsEventListener( this, this.copyMultipleChoiceComponent );
	this._removeComponent=MultipleChoiceComponent.BindAsEventListener( this, this.removeComponent );
	this._acceptAnyAnswer = MultipleChoiceComponent.BindAsEventListener( this, this.acptAnyAnswer );
	this._markGraded = MultipleChoiceComponent.BindAsEventListener( this, this.markGraded );
	this._markMandatory = MultipleChoiceComponent.BindAsEventListener( this, this.markMandatory );
	this._changeFeedbackType = MultipleChoiceComponent.BindAsEventListener( this, this.changeFeedbackType );
	this._changeFeedbackScoringType = MultipleChoiceComponent.BindAsEventListener( this, this.changeFeedbackScoringType );
	this._binaryAnswer = MultipleChoiceComponent.BindAsEventListener( this, this.showBinaryAnswer );
	this._showPointToStudent=MultipleChoiceComponent.BindAsEventListener( this, this.showPointToStudent );
	this._openHelpModalForMultipleChoiceComponent = MultipleChoiceComponent.BindAsEventListener(this,this.openHelpModalForMultipleChoiceComponent);
	this._openHelpModalForAnswerType = MultipleChoiceComponent.BindAsEventListener(this,this.openHelpModalForAnswerType);
	this._openHelpModalForInsertHyperlink = MultipleChoiceComponent.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
	this._updateEditor = MultipleChoiceComponent.BindAsEventListener( this, this.updateEditor );
	this._updateGeneralFeedbackEditor= MultipleChoiceComponent.BindAsEventListener( this, this.updateGeneralFeedBackEditor );
	this._updateOverallFeedBackEditor= MultipleChoiceComponent.BindAsEventListener( this, this.updateOverallFeedBackEditor );
	this._openHelpModalForRequiredQuestionSelector = MultipleChoiceComponent.BindAsEventListener(this,this.openHelpModalForRequiredQuestionSelector);
	this._updateRadioChoice = MultipleChoiceComponent.BindAsEventListener( this, this.updateRadioChoice );
	this._changeOptionOrientation = MultipleChoiceComponent.BindAsEventListener(this,this.changeOptionOrientation);
	this._addSection = MultipleChoiceComponent.BindAsEventListener( this, this.addSection);
	this._changeType = MultipleChoiceComponent.BindAsEventListener( this, this.changeType);
	this._collapseRangedBasedFeedback = MultipleChoiceComponent.BindAsEventListener( this, this.toggleRangedBasedFeedback);
	this._filter =MultipleChoiceComponent.BindAsEventListener( this, this.filter );
	this._collapseComponent = MultipleChoiceComponent.BindAsEventListener( this, this.collapseComponent );
	this._hideSubCategoryfromStudent = MultipleChoiceComponent.BindAsEventListener( this, this.hideSubCategoryfromStudent );
	this._notApplicableOption = MultipleChoiceComponent.BindAsEventListener( this, this.notApplicableOption);
	this._notApplicableOptionValue = MultipleChoiceComponent.BindAsEventListener( this, this.notApplicableOptionValue );
	this._updateStudentResponse = MultipleChoiceComponent.BindAsEventListener( this, this.updateStudentResponse );
};

// add event helper method on element id
MultipleChoiceComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
// add event helper method on element class
MultipleChoiceComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
// use call to borrow context
MultipleChoiceComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
MultipleChoiceComponent.prototype = { 
		/**
		 * gets subCategories for multipleChoice component
		 * 
		 * @returns subCategories
		 */
         getSubCategories: function( ){
                 return this.subCategories;  
         },
         /**
			 * sets subCategories for multipleChoice component
			 * 
			 * @param subCategories
			 */
         setSubCategories: function(subCategories){
             this.subCategories =  subCategories;
         },
         /**
			 * adds subCategory for scale component
			 * 
			 * @param subCategory
			 */
         addSubCategory:function(subCategory){
         	this.subCategories.push(subCategory);
         },
         /**
			 * removes subCategory for scale component
			 * 
			 * @param subCategory
			 */
         removeSubCategory:function(subCategory){
         	 var i=0;
         	 for(i in this.subCategories){
 	    			if(this.subCategories[j].getId()==subCategory.getId()){
 	    				this.subCategories.splice(i, 1);
 	    			}
 	    	 }
         },
         /*
          * set option values, used in subcategories rangebased for binary answer
          * */
		 setChoiceOptionVals:function(optionObj, itsVal){
			 this[optionObj] = itsVal;
		 },
        /**
		 * gets subType of component
		 * 
		 * @returns {String} subType
		 */
		getSubType:function(){
			return this.subType;
        },
        /**
		 * sets subType of component
		 * 
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
		 * 
		 * @returns sections
		 */
         getSections: function(){
                 return this.sections;  
         },
         /**
			 * sets sections for multiple choice component
			 * 
			 * @returns sections
			 */
          setSections: function(sections ){
                 this.sections=sections;  
          },
          /**
			 * gets subCategories for multiple choice component
			 * 
			 * @returns subCategories
			 */
          getSubCategoryRanges: function( ){
                   return this.subCategoryRanges;  
           },
           /**
			 * sets subCategories for multiple choice component
			 * 
			 * @param subCategories
			 */
           setSubCategoryRanges: function(subCategoryRanges){
               this.subCategoryRanges =  subCategoryRanges;
           },
         /**
			 * gets ranges for multiple choice component
			 * 
			 * @returns ranges
			 */
          getRanges: function(){
                   return this.ranges;  
          },
         /**
			 * sets ranges for multiple choice component
			 * 
			 * @returns ranges
			 */
          setRanges: function(ranges ){
                   this.ranges=ranges;  
          },
          /**
			 * adds range for multiple choice component
			 * 
			 * @param range
			 */
          addRange:function(range ){
              this.ranges.push(range);
          },
          /**
			 * remove range for multiple choice component
			 * 
			 * @param range
			 */
          removeRange:function(rangeId){
        	  var j=0;
          	 for(j in this.ranges){
  	    			if(this.ranges[j].getId() == rangeId){
  	    				this.ranges.splice(j, 1);
  	    			}
  	    		}
          },
          /* branch options */
          getIsBranched:function(){
            return this.isBranched;
          },
          setIsBranched:function(isBranched){
            this.isBranched = isBranched;
          },
          getIsBranchDest:function(){
            return this.isBranchDest;
          },
          setIsBranchDest:function(isBranchDest){
            this.isBranchDest = isBranchDest;
          },
          
         /**
			 * updates text of content editable divs to the object's editor text
			 */
         update:function(){
        	 	this.generalFeedback.update();
        		this.overallFeedback.update();
        		
        		if (this.subCategories != null){
    				var subCatList=[];
    				$.each(this.subCategories ,function(index,subCategory){
    					// subCategory.update();
    					subCatList.push({subCategoryId:subCategory.id,subCategory:subCategory.editor.text});
    				});
    				$.each(this.subCategoryRanges ,function(index,subCategoryRange){
    					subCategoryRange.setSubCategories(subCatList);
    					subCategoryRange.update();	
    				});
    			}
        		
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
        	if(this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories') {
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
                			// if(this.sections[i].options[j].answers[k].pointsValueEditor.text!=''){
                				optionPoints.push(pointsVal);
                			// }
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
        		
        		if(this.feedbackScoringType === 'average'){
        			if(this.binaryAnswer){
        				var maxCounter = 0;
    		       		for(key in this.sections){    		       	     
    		       	    	maxCounter += this.sections[key].options.length;
    		       	    }
    		       		if(maxCounter !=0 ){
    		       			minPoint = minPoint / maxCounter; 
                			maxPoint = maxPoint / maxCounter;	
    		       		}    		       		
    		       	}else{
    		       		minPoint = minPoint / this.sections.length; 
            			maxPoint = maxPoint / this.sections.length;
    		       	}        			
    				
        		}
        		var multiplier = Math.pow(10, 2);
				minPoint = Math.round(minPoint * multiplier) / multiplier;
				maxPoint = Math.round(maxPoint * multiplier) / multiplier;
        		this.minPoint=minPoint;
        		this.maxPoint=maxPoint;
        		$("#min_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).text(this.minPoint);
        		$("#max_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).text(this.maxPoint);
        	}
         },
         updateMinMaxForSubCat:function(){
 	    	if(this.subCategoryRanges!=null){
 	    		$.each(this.subCategoryRanges ,function(index,subCategoryRange){
 					subCategoryRange.update();	
 				});
 	    	}
 	    	
 	    },
 	    calculateMinMaxFrSection:function(section){
	 	    	var minPoint=0;
	    		var maxPoint=0;	
	 	    	var points=[];
	 	    	var obj={};
    			var j=0;
				var i=0;
				if(this.sections!=null)
				{
        		for( j in this.sections[i].options){
        			var k=0;
        			var optionPoints=[];
            		for( k in section.options[j].answers){
            			var pointsVal = section.options[j].answers[k].pointsValueEditor.text!=""?parseFloat(section.options[j].answers[k].pointsValueEditor.text):0;
            			// if(this.sections[i].options[j].answers[k].pointsValueEditor.text!=''){
            				optionPoints.push(pointsVal);
            			// }
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
				}
        		if(points.length>0){
        			points=points.sort(function (a, b) {
        				   return a > b ? 1 : a < b ? -1 : 0;
        			}); 
            		minPoint+=points[0];
            		maxPoint+=points[points.length-1];
        		}
/*        		if(this.feedbackScoringType === 'average'){
        			if(this.binaryAnswer){
        				var maxCounter = 0;
    		       		for(key in this.sections){    		       	     
    		       	    	maxCounter += this.sections[key].options.length;
    		       	    }
    		       		if(maxCounter !=0 ){
    		       			minPoint = minPoint / maxCounter; 
                			maxPoint = maxPoint / maxCounter;	
    		       		}    		       		
    		       	}else{
    		       		minPoint = minPoint / this.sections.length; 
            			maxPoint = maxPoint / this.sections.length;
    		       	}        			
    				
        		}*/
        		var multiplier = Math.pow(10, 2);
				minPoint = Math.round(minPoint * multiplier) / multiplier;
				maxPoint = Math.round(maxPoint * multiplier) / multiplier;
				obj.minPoint=minPoint;
	            obj.maxPoint=maxPoint;
	            return obj;
    	   
 	    },
         /**
			 * layouts in design mode
			 * 
			 * @returns {String}
			 */
         layout:function(){
        	 var componentType =  "Component: Multiple Choice";
        	 var elementType = this.subType=="dropdown" ? "Element: Dropdown" : "Element: Radio button";
             var htmlelement="";
        	 htmlelement+='<div class="pageSection" id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" ><span class="compMove_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"></span>';
        	 htmlelement+='<div class="pageInnerSection">';
        	 htmlelement+='<div class="pageSectionHeader"><p></p> <span id="componetCollapseSpan_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> <img src="img/comp-minus.png" title="Collapse"> </span><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead invisible" style="padding-left: 260px"> '+componentType+'</span><h6 class="pull-right font10" >ID #'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'</h6><p></p></div>';        	
        	 htmlelement+='<h2 id="componentType'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead">'+componentType+'</h2>';
        	 htmlelement+='<h2 class="tophead">'+elementType+'</h2>';
        	 htmlelement+='<div id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"  class="pageSectionBody">';
        	 // Sub category
        	 if(this.feedbackType == 'rangedBasedSubcategories') {
        		 htmlelement+= this.subCategoryLayout();
        	 }
        	 /* check for show/hide first section id */
        	 var isSectionMore = (this.sections.length > 1)?true:false;
        	 var i=0;
         	 for( i in this.sections){
         		 if(i==0){
         			 htmlelement+=  this.sections[i].layout(true,this.subType,this.feedbackType, this.feedbackScoringType, this.binaryAnswer,isSectionMore);
         		 }
         		 else{
         			 htmlelement+=  this.sections[i].layout(false,this.subType,this.feedbackType, this.feedbackScoringType, this.binaryAnswer,isSectionMore); 
         		 }
         	 }
         	 
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='<div class="pageSectionFooter">';
         	 
         	 if(this.feedbackType == 'standard'){
         		htmlelement+= this.feedbackLayout();
         	 }else{
         		if(this.ranges!=null){
         			if(this.feedbackType == 'rangedBasedSubcategories'){
         			   // subCategory Feedback
                       htmlelement+=this.subCategoryFeedbackLayout();                 		
                	}
         			// common for both rangebased and rangebasedsubcategories
         			htmlelement+= this.rangeFeedbackLayout();
         		} 	 
         	 }    	 
         	          	 
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='<div class="eachCol pull-right">';
         	 htmlelement+='   <div style="display:block" class="plusBtn">';
         	 htmlelement+='      <a title="Copy Question" id="quest_plus_'+this.id+'"><img src="img/plus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='  <div class="minusBtn">';
         	 htmlelement+='       <a title="Delete Question" id="quest_minus_'+this.id+'"><img src="img/minus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='   <div class="clear"></div>';
         	 htmlelement+='</div>';
         	 htmlelement+='</div>';
         	 htmlelement+='<div class="clear"></div>';	 
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
      		htmlelement+= '<h6 class="font14 tagtext"><a id="rangeCollapse_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Collapse range feedback</a></h6>';
      		htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Scoring: '+ this.feedbackScoringType +  ' </h6>';
      		htmlelement+= '</div>';
      		htmlelement+='<div class="clear"></div>';
      		htmlelement+='<div id="rangeFeedback_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
      		// htmlelement+='<div style="float: left; margin-top: -17px;"><span
			// class="rangeFeedbackVales"> Min. points: </span><span
			// id="min_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">
			// '+this.minPoint+' </span> <span class="rangeFeedbackVales"> Max.
			// points: </span><span
			// id="max_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">
			// '+this.maxPoint+' </span></div>';
   
      		var showMinus=true;
	       	if(this.ranges.length==1){
	       		showMinus=false; 
	       	}
	       	if(this.feedbackScoringType === "frequency"){
	       		if((this.feedbackType == 'rangedBased' || this.feedbackType =="rangedBasedSubcategories") && this.binaryAnswer){	            	
	              var choiceVals = [this.choiceOptionVal1, this.choiceOptionVal2];	       			
	       		  for(var c=0; c<2; c++){
	      			 htmlelement +=  this.ranges[c].rangeBasedSubCategoriesBinaryLayoutFrequencyFeedback(choiceVals[c], c);
	              }
	       		  
	       		}else{
	       		  for( j in this.ranges){
         			 htmlelement+=  this.ranges[j].rangeBasedLayoutFrequencyFeedback(false,j,false,this.sections,this.sections[0].markers); 
	          	  }
	       		}	       		
	       	}else{
	       		htmlelement+='<div  style="float: left; margin-top: -17px;"><span class="rangeFeedbackVales"> Min. points: </span><span id="min_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> '+this.minPoint+' </span> <span class="rangeFeedbackVales"> Max. points: </span><span id="max_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> '+this.maxPoint+' </span></div>';
      		  for( j in this.ranges){
         		 if(j==this.ranges.length-1){
         			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(true,j,showMinus);
         		 }
         		 else{
         			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(false,j,showMinus); 
         		 }
         	   }
	       	}
      		htmlelement+= '</div></div></div>';
      		return htmlelement;
         },
         afterRangeFeedbackLayout : function(){
        	 MultipleChoiceComponent.addEvent( "rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseRangedBasedFeedback );
         },
         toggleRangedBasedFeedback : function(){
        	 var $divObj = $("#rangeFeedback_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);
        	 if($divObj.is(":visible")){
        		 $("#rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).html("Expand range feedback");
        		 $divObj.hide("slow");
        	 }else{
        		 $("#rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).html("Collapse range feedback");
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
			 * sub category layout
			 */
         subCategoryLayout:function(){
         	var htmlelement="";
        	 htmlelement+='<h2 class="tophead2">Subcategories</h2>';
        	 htmlelement+='<div class="MultipleChoiceComponent">';
        	 htmlelement+='<div class="table" id="subcategory_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	
        	 var lastSubCategory=this.subCategories[this.subCategories.length-1];
        	 var isLastSubCategory=false;
        	 $.each(this.subCategories ,function(index,subCategory){
        		 if(lastSubCategory.id==subCategory.id){
        			 isLastSubCategory=true;
        		 }
        		 htmlelement+=subCategory.layout(isLastSubCategory);
 			 });
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
     	
         	 return htmlelement;
         },
         /**
			 * update sub category drop down
			 */
         updateSubCategoryDropDown:function(){
        	var isBinaryAnswer = this.binaryAnswer;
         	var subCatList=[];
 			$.each(this.subCategories,function(index,subCategory){
 				if($("<div>"+subCategory.editor.text+"</div>").text()!=''){
 					subCatList.push({subCategoryId:subCategory.id,subCategory:subCategory.editor.text});
 				}
 			});
 			$.each(this.subCategoryRanges ,function(index,subCategoryRange){
 				subCategoryRange.setSubCategories(subCatList);
 				subCategoryRange.setdropDownOptions();
 			}); 			
 			$.each(this.sections ,function(index,section){				
 			
 				if(isBinaryAnswer){
 				 for(opt in section.options){
 				  section.options[opt].setdropDownOptions(subCatList);
 				 }
 				}
 				section.afterLayout();
			});
         },
         /**
			 * layouts component property pane in design mode
			 * 
			 * @returns {String}
			 */
         propertyLayout:function(){
        	 var binaryCss = this.subType=="dropdown" ? "class='disable-section'" : "";
        	 var disabledCheckbox =  this.subType=="dropdown" ? "disabled='disabled'" : "";
        	 var elementType = this.subType=="dropdown" ? "Element: Dropdown" : "Element: Radio button";
        	 var htmlelement='';
        	 htmlelement+='<div class="tabContent tabProContent tabProContent-2">';
        	 htmlelement+='<div class="componentTytle">';
        	 htmlelement+='<a class="info-icon" id="MultiChoiceComponentHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" ></a>Component: Multiple Choice';
        	 htmlelement+='</div>';
        	 htmlelement+='<div style="padding-left: 18px" class="componentTytle">';
        	 htmlelement+='<a id="MultiChoiceComponentElementId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" ></a>'+elementType+'';
        	 htmlelement+='<p style="margin-top : 5px" class="txtediting boldclass">ID# '+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'</p>';
        	 var isBranchedLbl = "";
        	 /*check if component is used for branching*/
        	 if(this.isBranched){
        		 isBranchedLbl="This component is branched";
        	 }else{/*check if sections used for branching*/
        		 var isSectionBranched=false;
        		 var x=0;
        		 for(x in this.sections){
        			 if(this.sections[x].isBranched){
        				 isSectionBranched=true;
        				 break;
        			 }        			 
        		 }
        		 if(isSectionBranched){
        			 isBranchedLbl="This component is branched";
        		 }
        	 }
        	 htmlelement+='<div class="componentTytle" id="isBranchedLabel_'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">'+isBranchedLbl+'</div>';
        	 htmlelement+='</div>';
        	 htmlelement+=' <div class="data_component">';
        	 htmlelement+='<div> <input type="radio" class="multipleChoiceComponent" value="dropdown" id="dropDown'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" name="selectMultipleChoice">';
        	 htmlelement+='<label class="multipleChoiceComponent" for="dropDown'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Dropdown</label>';
        	 htmlelement+='<input type="radio"  class="multipleChoiceComponent"  value="redio" id="radioButton'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" name="selectMultipleChoice">';
        	 htmlelement+='<label  class="multipleChoiceComponent" for="radioButton'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Radio button</label> ';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="grid grid-2">'; 
        	 htmlelement+='<input type="checkbox" id="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+='<label for="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Graded object</label>';          
        	 htmlelement+='<input type="checkbox" '+disabledCheckbox+'  id="binaryAnswer'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';          
        	 htmlelement+='<label '+binaryCss+' for="binaryAnswer'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span> Binary answer selection </label>';      
        	 htmlelement+='</div>';        	            
        	 htmlelement+=' <div id="rbtnLabel" class="grid grid-3"> ';                                  
        	 htmlelement+='<span>Radio button labels: </span>';
        	 htmlelement+='<div class="form-group form-input">';
	       	 htmlelement+='<input type="Text" id="Text1'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" placeholder="Choice 1">';
        	 htmlelement+='</div>';  
        	 htmlelement+='<div class="form-group form-input" style="margin-left:5px;">';
			 htmlelement+='<input type="Text" id="Text2'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" placeholder="Choice 2">';
        	 htmlelement+='</div>';       
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
             htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="tabContent tabProContent tabProContent-2">';
        	 htmlelement+='<div class="componentTytle">';
        	 htmlelement+='<a class="info-icon" id="answerTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" ></a>Answer type:';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="data_component">';
        	 htmlelement+='<div class="grid grid-2">'; 
        	 htmlelement+='<span>';
        	 htmlelement+='<input type="checkbox" id="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+='<label for="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Accept any answer</label>'; 
        	 htmlelement+='</span>';
        	 htmlelement+='   <div id="feedbackType'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
	    	 htmlelement+='        <div class="head-info typeInput">';
	    	 htmlelement+='            <a id="feedbackTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon"></a>Feedback Type:';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='       <div class="tabContent tabProContent">';
	    	 htmlelement+='           <div class="btn-group customDropdown" style="margin-bottom: 10px;">';
	    	 htmlelement+='                <button data-toggle="dropdown" id="selectedFeedbackType" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	    	 htmlelement+='                    Standard<span class="caret caretDrop"></span>';
	    	 htmlelement+='                </button>';
	    	 htmlelement+='                <ul class="dropdown-menu">';
	    	 htmlelement+='                    <li id="standard'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Standard</a></li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="rangedBased'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Ranged-based</a></li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="rangedBasedSubcategories'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Ranged-based Subcategories</a></li>';
	    	 htmlelement+='                </ul>';
	    	 htmlelement+='            </div>';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="clear"></div>';
	    	 
	    	 htmlelement+='   <div id="feedbackScoringType'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" >';
	    	 htmlelement+='        <div class="head-info typeInput">';
	    	 htmlelement+='            <a id="feedbackScoringType'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon"></a>Feedback scoring:';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='       <div class="tabContent tabProContent">';
	    	 htmlelement+='           <div class="btn-group customDropdown" style="margin-bottom: 10px;">';
	    	 htmlelement+='                <button data-toggle="dropdown" id="selectedFeedbackScoringType" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	    	 htmlelement+='                    Sum<span class="caret caretDrop"></span>';
	    	 htmlelement+='                </button>';
	    	 htmlelement+='                <ul class="dropdown-menu">';
	    	 htmlelement+='                    <li id="sumFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Sum</a></li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="averageFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Average</a></li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="frequencyFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Frequency</a></li>';
	    	 htmlelement+='                </ul>';
	    	 htmlelement+='            </div>';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="clear"></div>';
        	 
	    	 htmlelement+='<div id="studentOpts'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" class="studOptGrid">';
		    	
        	 htmlelement+='  <span id="showPntToStudSpan'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" class="clickrow-1">';
        	 htmlelement+=' 	<input type="checkbox" id="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+=' 	<label for="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Show points to students</label>'; 
        	 htmlelement+='	 </span>';
        	 htmlelement+='  <span id="showSubCHKSpan'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" class="clickrow-1">';
        	 htmlelement+=' 	<input type="checkbox" id="showSubCHK'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+=' 	<label for="showSubCHK'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Hide Subcategories from Students</label>'; 
        	 htmlelement+='	 </span>';
        	 htmlelement+='  	<span class="clickrow-1" id="notApplicableOptionId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';
        	 htmlelement+=' 		<input type="checkbox" id="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+='			<label for="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Not applicable option<br><i style="font-size: 11px; margin-left: 15px;">Exempts remainder of subcategory</i></label>'; 
        	 htmlelement+='		</span>';
        	 htmlelement+='		<div class="clickrow-1" id="awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	 htmlelement+='  		<span id="awardMaxSpan'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	 htmlelement+='   			<input type="radio"  value="awardMax" id="awardMax'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="awardMaxMin">';
        	 htmlelement+='   			<label for="awardMax'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award maximum points</label> <input type="radio" id="Radio2" name="displayBranchingMode">';        	 
        	 htmlelement+='			</span>';
        	 htmlelement+='  		<span id="awardMinSpan'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	 htmlelement+='   			<input type="radio" value="awardMin" id="awardMin'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="awardMaxMin">';
        	 htmlelement+='     		<label for="awardMin'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award minimum points</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
        	 htmlelement+='			</span>';
        	 htmlelement+='		</div>';
        	 htmlelement+=' </div>';
        	 htmlelement+=' </div>';
        	 htmlelement+=' </div>';  
        	 htmlelement+=' </div>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="tabContent tabProContent tabProContent-2">';
        	 htmlelement+='<div class="componentTytle">';
        	 htmlelement+='<a class="info-icon" id="requiredQuestionId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"></a>Prerequisite:';
        	 htmlelement+='</div>';
        	 htmlelement+=' <div class="data_component">';
        	 htmlelement+='   <p style="margin-top : 5px" class="txtediting boldclass">In order to move forward,\n student responses are:</p>';
        	 htmlelement+='	<div> <input type="radio" value="Required" id="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
        	 htmlelement+='   <label for="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Required</label> <input type="radio" id="Radio2" name="displayBranchingMode">';        	 htmlelement+='   <input type="radio" value="Optional" id="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
        	 htmlelement+='     <label for="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Optional</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
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
			 * adds event hadlers for elements present in component property
			 * pane
			 */
	     afterPropertyLayout:function(){
	    	 MultipleChoiceComponent.addEvent( this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._populateComp );
	    	 MultipleChoiceComponent.addEvent( "MultiChoiceComponentHelpId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._openHelpModalForMultipleChoiceComponent);
	    	 MultipleChoiceComponent.addEvent( "requiredQuestionId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._openHelpModalForRequiredQuestionSelector);
	    	 MultipleChoiceComponent.addEvent( "answerTypeHelpId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._openHelpModalForAnswerType);
	    	 MultipleChoiceComponent.addEvent("acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._acceptAnyAnswer);
     		 MultipleChoiceComponent.addEvent("gradadedObjectBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markGraded);
     		 MultipleChoiceComponent.addEvent("standard"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._changeFeedbackType,{"feedbackType" : "standard"});
     		 MultipleChoiceComponent.addEvent( "rangedBased"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackType,{"feedbackType":"rangedBased"});
     		 MultipleChoiceComponent.addEvent( "rangedBasedSubcategories"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackType,{"feedbackType":"rangedBasedSubcategories"});
     		 MultipleChoiceComponent.addEvent("binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._binaryAnswer);
     		 MultipleChoiceComponent.addEvent("showPntToStud"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._showPointToStudent);
     		 MultipleChoiceComponent.addEvent("Text1"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "blur", this._updateRadioChoice);
     		 MultipleChoiceComponent.addEvent("Text2"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "blur", this._updateRadioChoice);
     		 MultipleChoiceComponent.addEvent("dropDown"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeType);
     		 MultipleChoiceComponent.addEvent("radioButton"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeType);
     		 MultipleChoiceComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
     		 MultipleChoiceComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
     		 MultipleChoiceComponent.addEvent( "sumFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"sum"});
     		 MultipleChoiceComponent.addEvent( "averageFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"average"});
     		 MultipleChoiceComponent.addEvent( "frequencyFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"frequency"});
     		 MultipleChoiceComponent.addEvent("showSubCHK"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._hideSubCategoryfromStudent);
     		 MultipleChoiceComponent.addEvent("notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOption); 
    		 MultipleChoiceComponent.addEvent("awardMax"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOptionValue);
    		 MultipleChoiceComponent.addEvent("awardMin"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOptionValue);
      	
	     
	     },
          /**
			 * 
			 */
	       changeFeedbackType:function(event){         	 
        	  var pointFlag = false;
        	  if (typeof event.data === 'undefined') {
        		  this.feedbackType = 'standard';
        	  }
        	  else{
        		  this.feedbackType = event.data.feedbackType;
	          	  if (this.feedbackType === 'standard') {
	          			 $("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
	          			$("#selectedFeedbackType").html("Standard <span class='caret caretDrop'></span>");
	          			$("#sumFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
	          			this.showPointsToStudents=false;
	        		    this.hideSubCategoriesfromStudents=false;
	        		    this.notApplicable=false;
	          			if(this.subCategories != null){
	          				this.subCategories = null;
							this.subCategoryRanges = null;
							if(this.sections){
								$.each(this.sections,function(i,secObj){
									secObj.subCategoryId = null;
									 $.each(secObj.options,function(i,optionObj){
						    			  optionObj.subCategoryId = null;
						    		  });
								});
							}
	          			}
	          	  }
	          	  else{
	          		$("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
          			//$("#sumFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
	          		 pointFlag = true;
	          		 if(this.feedbackType === 'rangedBased'){
	          			$("#selectedFeedbackType").html("Ranged-based <span class='caret caretDrop'></span>");
	          			if(this.subCategories != null){
	          				this.subCategories = null;
							this.subCategoryRanges = null;
							if(this.sections){
								$.each(this.sections,function(i,secObj){
									secObj.subCategoryId = null;
									 $.each(secObj.options,function(i,optionObj){
						    			  optionObj.subCategoryId = null;
						    		  });
								});
							}
	          			}
	          		 }
	          		 else{
	          			//reset notapplicable flag of component
	          			this.notApplicable = false;
	          			this.notApplicableStudentResponse = false;
	          			$("#selectedFeedbackType").html("Ranged-based Subcategories <span class='caret caretDrop'></span>");
	          			this.createSubcategories();
	          		 }
	          	  }
	          	 /*
					 * $.each(this.sections,function(i,secObj){
					 * secObj.togglePonits(pointFlag); });
					 */
        	  }
        	  this.createRangeBasedFeedback();
        	  this.update();
 	      },
 	      
		  changeFeedbackScoringType : function(event) {
			if (typeof event.data === 'undefined') {
				this.feedbackScoringType = 'sum';
			} else {
				// this.subCategoryRanges=[];
				this.feedbackScoringType = event.data.feedbackScoringType;
				if (this.feedbackScoringType == 'sum') {
					$("#selectedFeedbackScoringType").html(
							"Sum <span class='caret caretDrop'></span>");
					question.setActiveScaleType("sum");	
					question.activePage.doLayout();
		        	this.populateComp();
				} else if (this.feedbackScoringType === 'average') {
					$("#selectedFeedbackScoringType").html(
							"Average <span class='caret caretDrop'></span>");
					question.setActiveScaleType("average");
					question.activePage.doLayout();
		        	this.populateComp();
				} else {					
					/* update option choice values for binary answers frequency */
					var choice1 = $("#Text1"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val();
	      		    var choice2 = $("#Text2"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val();	      			
	      		    this.choiceOptionVal1 = (choice1!="" && choice1 != null) ? choice1 : "";
	                this.choiceOptionVal2 = (choice2!="" && choice2 != null) ? choice2 : "";					
					this.subCategoryRanges=[];
					$("#selectedFeedbackScoringType").html(
							"Frequency <span class='caret caretDrop'></span>");
					question.setActiveScaleType("frequency");
					this.createRangeBasedFeedback();	
				}
				 if(this.feedbackType === 'rangedBasedSubcategories'){
					$.each(this.subCategoryRanges ,function(index,subCategoryRange){
						subCategoryRange.update();	
					});
				 }
			}
		},
		    /*
			 * creates subCategories;
			 */
		    createSubcategories : function(){
		    	var subCategories = [];
		    
				var categoryConfig = {
					componentId : this.id,
					componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix
				};
				for (var i=1;i<=4;i++){
					categoryConfig.id=i;
					subCategories.push(new MultipleChoiceSubCategory(categoryConfig));
				}
				
				this.setSubCategories(subCategories);
				this.subCategoryRanges=[];
				// this.createSubCategoryRangeFeedback();
		    },
	      showBinaryAnswer:function(){
	    	 if($("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){	
	    		this.createBinaryResult(true);
	    		$("#rbtnLabel").show();
	    	 }
	    	 else{
	    		 this.createBinaryResult(false);
	    		 $("#rbtnLabel").hide();
	    		 this.showSolutionIndicator();
	    	 }
	    	 if(this.feedbackType === 'rangedBasedSubcategories'){
				$.each(this.subCategoryRanges ,function(index,subCategoryRange){
					subCategoryRange.update();	
				});
			 }
	      },
	      showSolutionIndicator : function(){
	    	 if(!$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked') && !$("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
    			 var selectordiv=$('#'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).find('.tickCheck');
    			 var length = selectordiv.length;
    			 for( var i=0;i<=length;i++){
 	  	   			    $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').find(".indt-mrgn").css('display','none');
 	  	   			    $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').find(".radioOption").css('display','inline');
 	  	   		}
    		 } 
	     },
	     showPointToStudent:function(){	    	
	    	 if($('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
	    		 this.showPointsToStudents=true;
	    	 }
	    	 else{
	    		 this.showPointsToStudents=false; 	    	
	    	 }
	     },
	     hideSubCategoryfromStudent:function(){	    	
	    	 if($('#showSubCHK'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
	    	   this.hideSubCategoriesfromStudents=true;
	    	 }
	    	 else{
	    	   this.hideSubCategoriesfromStudents=false; 	    	
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
	    					right : ( !flag && !acceptAnyAnswer ) ? false : true,
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
		 					optionAnswers[1].feedback.text = option.answers[1].feedback.text;
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
 		  	  
 		  	if((this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories') && this.binaryAnswer){
 		  	    var choice1 = $("#Text1"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val();
      		    var choice2 = $("#Text2"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val();
      			
      		    this.choiceOptionVal1 = (choice1!="" && choice1 != null) ? choice1 : "";
                this.choiceOptionVal2 = (choice2!="" && choice2 != null) ? choice2 : "";
		       			
		       	if(this.feedbackScoringType != "frequency"){
 		  		  this.sections[i].updateChoiceText(this.choiceOptionVal1, this.choiceOptionVal2);
 		  		}else{		  		  
 		  		  this.ranges[i].updateRangeChoiceText(this.choiceOptionVal1, this.choiceOptionVal2);
 		  		}
 		  		//question.activePage.doLayout();
 		  	}
 		  }	    
	     },
 	   	    
        /**
		 * populate component properties
		 */
        populateComp:function(){  
			var isDisableoptionOrientation = false;
         	$("#properties").html(this.propertyLayout());
        	this.afterPropertyLayout(); 
        	$("#feedbackType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        	$("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        	//$("#pointBsdRes").hide();
        	$("#showPntToStudSpan"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        	$("#showSubCHKSpan"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        	$("#notApplicableOptionId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
      		$('#awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
            $("#mediaProperties").hide();
        	
        	$("#rbtnLabel").hide();
        	$("#elementProperties").hide();
        	$("#properties").show();    
        	this.updateMinMaxForSubCat();
        	if(this.graded==true){
        		$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
        	}else{
        		$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', false);
        	}
			if(this.subType=="radio"){
					$("input[name=selectMultipleChoice][value='redio']").prop('checked', true);
			}else{
					$("input[name=selectMultipleChoice][value='dropdown']").prop('checked', true);
			}			
			if(this.acceptAnyAnswer==true){
					$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger('click');
					$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);				
			}else{
					$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', false);
					/*
					 * $.each(this.sections,function(i,secction){ var i = 0;
					 * for(i in secction.options){
					 * if(secction.options[i].answers[0].right){
					 * $("#option_"+secction.options[i].editor.id).prop("checked",true); } }
					 * });
					 */
			}			
			if(this.mandatory==true){
				$('#optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
			}else{
				$('#optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
			}			
        	if(this.binaryAnswer==true){
				isDisableoptionOrientation = true;
        		$("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
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
     			$("#radioOptionVertical"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
     			$("#radioOptionVertical"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
        	}else{
				isDisableoptionOrientation = false;
        		$("#rbtnLabel").hide();
        		if(this.subType!="radio"){
					isDisableoptionOrientation = true;
				}
        	}        	
        	if(this.feedbackType == "standard"){
        		$("#showPntToStudSpan"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        		$("#selectedFeedbackType").html("Standard <span class='caret caretDrop'></span>");
        	}
        	else if(this.feedbackType == "rangedBased"){
        		$("#showPntToStudSpan"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        	
        		$("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		$("#selectedFeedbackType").html("Ranged-based <span class='caret caretDrop'></span>");
        		$("#notApplicableOptionId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
          		//$('#awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
        		
        	}else{
        		$("#showPntToStudSpan"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		$("#showSubCHKSpan"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		$('#awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
        		$("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		$("#selectedFeedbackType").html("Ranged-based Subcategories <span class='caret caretDrop'></span>");
        	}
        	
        	if(this.feedbackScoringType == "sum"){
        		$("#selectedFeedbackScoringType").html("Sum <span class='caret caretDrop'></span>");
        	}
        	else if(this.feedbackScoringType == "average"){
        		$("#selectedFeedbackScoringType").html("Average <span class='caret caretDrop'></span>");
        	}else{
        		$("#selectedFeedbackScoringType").html("Frequency <span class='caret caretDrop'></span>");
        	}
        	if((this.feedbackType == "rangedBased" || this.feedbackType == "rangedBasedSubcategories") && this.feedbackScoringType == "frequency"){
        		//console.log("frequency and ranged based");
        		//notApplicableOption
        		$("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).prop("disabled", true);
        		$("#showPntToStud"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).prop("disabled", true);
        		this.notApplicable=false;
        		this.showPointsToStudents=false;
        		$("#notApplicableOptionId"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).addClass("disabledText");
         		$("#showPntToStudSpan"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).addClass("disabledText");
        	}
        	
        	       	
        	$("#optionDropDownId").show();
        	$("#optionDropDownId").parent().removeClass("open");
        	if($("#selectedFeedbackType").parent().hasClass("open")){
        		$("#selectedFeedbackType").trigger("click");
        	}	
        	if($("#selectedFeedbackScoringType").parent().hasClass("open")){
        		$("#selectedFeedbackScoringType").trigger("click");
        	}	
        	
        	if(this.showPointsToStudents==true)
        		$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	else
        		$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	
        	if(this.hideSubCategoriesfromStudents==true)
        		$('#showSubCHK'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	else
        		$('#showSubCHK'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	
        	if(this.awardMaximum){
        		$("#awardMax"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	}else{
        		$("#awardMax"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	}
        	if(this.awardMinimum){
        		$("#awardMin"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	}else{
        		$("#awardMin"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	}
        	if(this.notApplicable){	
	        	  $("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked", true);
	      		  $('#awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
	    	}else{
	    		  $("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked", false);
	    		  $('#awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
	    	}
        	$("#componentOptionDropDownId").html(this.optionOrientationDropDownLayout(isDisableoptionOrientation));
        	this.afterOptionOrientationDropDownLayout();
        	this.populateAnswerOrientation();
        	this.showSolutionIndicator();
        },
        /**
		 * Function to check multiple choice option object optionOrientation and
		 * set checked accordingly.
		 */
        populateAnswerOrientation : function(){
	        	switch(this.answerOptionOrientation){
	    		case 1 :
	    			$("#radioOptionVertical"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
	    			break;
	    		case 2 :
	    			$("#radioOptionHorizontal"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
	    			break;
	    		case 3:
	    			$("#radioOptionTwo-column"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
	    			break;
	    		default :
	    				break;
	        	}
        },
        
        /**
		 * add multiple choice component to page
		 */
        addMultipleChoiceComponent:function(){
        	page.addMultipleChoiceComponent();
        },
        /**
		 * creates copy of the current checkbox component
		 * 
		 * @param event
		 */
        copyMultipleChoiceComponent : function(event){
            var	id = event.data.id;
        	page.copyComponent(id);
        },
        /**
		 * remove the checkbox component
		 * 
		 * @param event
		 */
        removeComponent:function(event){
        	page.deleteComponent(event.data.id);
        },
        /**
		 * constructs the multipleChoice component from json object
		 * 
		 * @param jsonObj
		 * @returns {MultipleChoiceComponent}
		 */
        deserialize:function(jsonObj){
        	var subCategories=null;
     	    
        	var sections =[];
        	var subCategoryRanges=null; 
        	var i=0;
        	if(jsonObj.feedbackType =='rangedBasedSubcategories'){
    	    	subCategories=[];
    			var cnt = 0;
    			for (cnt in jsonObj.subCategories) {
    				var subCatObj = new MultipleChoiceSubCategory(jsonObj.subCategories[cnt]);
    				var editor = new Editor(jsonObj.subCategories[cnt].editor);
    				subCatObj.setEditor(editor);
    				subCategories.push(subCatObj);
    			}
    			
    			subCategoryRanges=[];
			    var rcnt=0;
			    for(rcnt in jsonObj.subCategoryRanges){
				 var subCatRange = new MultipleChoiceSubCategoryRange(jsonObj.subCategoryRanges[rcnt]);
				 var m=0;
				 if (jsonObj.subCategoryRanges[rcnt].ranges != null) {
					var ranges = [];
					for (m in jsonObj.subCategoryRanges[rcnt].ranges) {
						var rangeObj = new Range(jsonObj.subCategoryRanges[rcnt].ranges[m]);
						var minRangeEditor = new NumericEditor(
								jsonObj.subCategoryRanges[rcnt].ranges[m].minRangeEditor);
						var maxRangeEditor = new NumericEditor(
								jsonObj.subCategoryRanges[rcnt].ranges[m].maxRangeEditor);
						var rangeFeedbackEditor = new Editor(
								jsonObj.subCategoryRanges[rcnt].ranges[m].rangeFeedbackEditor);
						rangeObj.setMinRangeEditor(minRangeEditor);
						rangeObj.setMaxRangeEditor(maxRangeEditor);
						rangeObj.setRangeFeedbackEditor(rangeFeedbackEditor);
						ranges.push(rangeObj);
					}
					subCatRange.setRanges(ranges);
				}
				subCategoryRanges.push(subCatRange);
			   }
    	    }
        	 for( i in jsonObj.sections){
 	  	    		var sectionObj =new MultipleChoiceSection(jsonObj.sections[i]);
 	  	    		var editor = new Editor(jsonObj.sections[i].editor);
 	  	    		sectionObj.setEditor(editor);
 	  	    		sectionObj.setShowSectionLabels(jsonObj.sections[i].showSectionLabels);
 	  	    		var options=[];
 	  	    		var j=0;
 	  	    		for(j in jsonObj.sections[i].options){
 	  	    			var optionObj =new MultipleChoiceOption(jsonObj.sections[i].options[j]);
 	  	    			var optionEditor=new Editor(jsonObj.sections[i].options[j].editor);
 	  	    			optionObj.setEditor(optionEditor);
 	  	    			var answers=[];
 	  	    			var k=0;
 	 	  	    		for(k in jsonObj.sections[i].options[j].answers){
	 	 	  	    		var answerObj =new MultipleChoiceOptionAnswer(jsonObj.sections[i].options[j].answers[k]);
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
 	  	    		
 	  	    		var sectionLabels =[];
 	  	    		var k=0;
 	  	    		for(k in jsonObj.sections[i].sectionLabels){
 	  	    			var labelObj =new SectionLabel(jsonObj.sections[i].sectionLabels[k]);
 	  	    			var labelEditor=new Editor(jsonObj.sections[i].sectionLabels[k].editor);
 	  	    			labelObj.setEditor(labelEditor);
 	  	    			sectionLabels.push(labelObj);
 	  	    		}
 	  	    		sectionObj.setSectionLabels(sectionLabels);
 	  	    		sectionObj.isBranched = jsonObj.sections[i].isBranched;
 	  	    		sectionObj.isBranchDest = jsonObj.sections[i].isBranchDest;
 	  	    		sectionObj.destBranchId = jsonObj.sections[i].destBranchId;
 	  	    		sectionObj.showToStud = jsonObj.sections[i].showToStud;
 	  	    		sections.push(sectionObj);
 	  	    	}
        	var compObj= new MultipleChoiceComponent(jsonObj);
         	compObj.setSections(sections);
         	
         	compObj.setSubCategories(subCategories);
         	compObj.setSubCategoryRanges(subCategoryRanges);
         	
         	if((jsonObj.feedbackType == 'rangedBased' || jsonObj.feedbackType =='rangedBasedSubcategories') && jsonObj.binaryAnswer){
         		var choiceVals = [jsonObj.choiceOptionVal1, jsonObj.choiceOptionVal2];
         		var ct = 0;
         		for(ct; ct<=1; ct++ ){
         			compObj.setChoiceOptionVals("choiceOptionVal"+(ct+1),choiceVals[ct]);
         		}         		
         	}
         	 
         	
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
			 * 
			 * @param event
			 */
	     openHelpModalForMultipleChoiceComponent : function(event){
	    	 new Modal({id : 1,headingText : message.getmultipleChoiceCompHeading(),containtText : message.getmultipleChoiceCompMsg()}).openHelpModal();
	     },
	     /**
			 * opens help modal popup for Answer Type in multiple choice
			 * component
			 * 
			 * @param event
			 */    
	     openHelpModalForAnswerType:function(event){
	    	 new Modal({id : 1,headingText : message.getanswerTypeHeader(),containtText : message.getanswerTypeMsg()}).openHelpModal(); 
	     },
	     /**
			 * adds event handlers for html elements after the layout done in
			 * design mode
			 */
         afterLayout:function(){
        	    $("#properties").html(this.propertyLayout());
        	    this.afterRangeFeedbackLayout();
        	    this.updateMinMaxPoint();
        		this.populateComp();
        		MultipleChoiceComponent.addEvent( "genFbTxt"+this.idPrefix+this.id, "click", this._toggleFeedback );
        		MultipleChoiceComponent.addEvent( this.generalFeedback.id, "click", this._populateGFEditorProperties );
        		MultipleChoiceComponent.addEvent( this.overallFeedback.id, "click", this._populateOFEditorProperties );
        		MultipleChoiceComponent.addEvent( this.generalFeedback.id, "blur", this._update );
        		MultipleChoiceComponent.addEvent( this.generalFeedback.id, "paste", this._filter);
        		MultipleChoiceComponent.addEvent( this.overallFeedback.id, "paste", this._filter);
        		MultipleChoiceComponent.addEvent( this.overallFeedback.id, "blur", this._update );
        		MultipleChoiceComponent.addEvent( "quest_plus_"+this.id, "click", this._copyMultipleChoiceComponent,{id : this.id});
        		MultipleChoiceComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        		MultipleChoiceComponent.addEvent("acptAnyAnsBtnId", "click", this._acceptAnyAnswer);
        		MultipleChoiceComponent.addEvent("gradadedObjectBtnId", "click", this._markGraded);
        		MultipleChoiceComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
        		MultipleChoiceComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
        		MultipleChoiceComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseComponent);
        		
        		if(this.subCategories != null){
    				$.each(this.subCategories,function(index,subCategory){
    					subCategory.afterLayout();	
    				});
    				
    				if(this.subCategories.length==1){
    					$("#minus_"+this.subCategories[0].editor.id).hide();
    				}
    				
    				$.each(this.subCategoryRanges ,function(index,subCategoryRange){
      					subCategoryRange.afterLayout();	
      				});   
      				   				
      				if(this.subCategoryRanges.length==1){
      					$("#minus_"+this.subCategoryRanges[0].componentIdPrefix+this.subCategoryRanges[0].componentId+this.subCategoryRanges[0].idPrefix+this.subCategoryRanges[0].id).hide();
      				}
    			}
        		var i=0;
        		 for( i in this.sections){
             		 this.sections[i].afterLayout();
             	 } 
        		 var j=0;
        		  for( j in this.ranges){
             		 this.ranges[j].afterLayout();
             	 }
        		  if(this.subType=="dropdown"){
        			  $(".displayAnswerDiv").addClass("disable-section");
                  	  $(".displayAnswerDiv").find('input[type="radio"]').attr("disabled",true);
        		  }
        		  if(this.state=="collapse"){
             		 this.collapseComponent();
             	 }
                
                $('#formToolCanvasId').sortable({
                    items: '.pageSection',
                    handle: '.dragComp'

                });
         },
         /**
			 * layouts in instructor mode
			 * 
			 * @returns {String}
			 */
         instructorLayout:function(){
        	var htmlelement='';
    		var hidden = this.overallFeedback.text =='' && this.generalFeedback.text=='' ?'invisible' : '';
			var markCompulsary=(this.graded)?"<span class='starHide'>*</span>":"";
    		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection">';
    		if( this.feedbackType == 'rangedBasedSubcategories') {
				var k=0;
				if(k==0){
					if(this.acceptAnyAnswer){
						htmlelement +='<div  class="acceptAnyAnsBanner acceptAnyAnsBannerInstructor prevQuestInstructor" style="margin-left:50px;">This question accepts all answers.</div>';
			      	}
				}
	    		if(this.binaryAnswer){
	    			htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="mainQuestionSection" >';
	    			for( i in this.sections){
	    				var editorText = util.getImageLayout(this.sections[i].editor.text);
	    				editorText = util.getVideoLayout(editorText);
	    				htmlelement +=' <div class="col-lg-10" >';
	    				htmlelement +='   <div class="table-responsive tbl_scroll tbl-style">';
	    				htmlelement +='     <div class="prevQuest prevQuestInstructor">';
	    				htmlelement +='       <div class="stdQueLabel"> '+editorText+'</div>';
	    				
						// display sub labels if authored
						if (this.sections[i].showSectionLabels) {
							htmlelement +='<div class="clear"></div>';
							var x = 0;
							for (x in this.sections[i].sectionLabels) {
								var edtTxt = this.sections[i].sectionLabels[x].editor.text;
	
								edtTxt = util.getImageLayout(edtTxt);
								edtTxt = util.getVideoLayout(edtTxt);
	
								if (edtTxt != "" && edtTxt != null) {
									htmlelement += '<div class="stdQueLabel inputDummyQuestionStemStudent lblMargin"> '+markCompulsary+' '+ edtTxt + '</div>';
									htmlelement +='<div class="clear"></div>';
								}
							}
						}
						// htmlelement +='<div class="clear"></div>';
						htmlelement += '</div>';
						htmlelement += this.sections[i].instructorLayout(
								this.binaryAnswer, this.subType,
								this.answerOptionOrientation, this.acceptAnyAnswer,
								this.feedbackType, this.feedbackScoringType);
						htmlelement += '</div>';
						if (this.subType == 'radio')
							htmlelement += '</div>';
						htmlelement += '</div>';
						htmlelement += '<div class="clear"></div>';
	    	          }
	    		  }
	    		  else{
	    			  for(k in this.subCategories){
			              if(!this.hideSubCategoriesfromStudents){
			              }
			              htmlelement += this.instructorSectionLayout(this.subCategories[k],this.graded);
	    		   	  }
	    		  }
    		}else{
    			var i=0;
      		  	for( i in this.sections){
	      			if(i==0){
	      				if(this.acceptAnyAnswer){
	              			htmlelement+='<div  class="acceptAnyAnsBanner acceptAnyAnsBannerInstructor prevQuestInstructor" style="margin-left:50px;">This question accepts all answers.</div>';
	              		}
	      				if(this.notApplicable){
	     					htmlelement +='<div class="prevQuest prevQuestInstructor instructcheckNA" >';
	     					htmlelement +='	<input type="checkbox"  disabled class="css-checkbox" id="notApplicableComp_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
	    		   			htmlelement +='	<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
	    		   		}
	      			}
	      			htmlelement +=' <div class="prevQuest prevQuestInstructor">';

	      			var editorText = util.getImageLayout(this.sections[i].editor.text);
	      				editorText = util.getVideoLayout(editorText);

	      			htmlelement +='<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent">'+markCompulsary+' '+editorText+'</div>';
	      			//display sub labels if authored
	      			if(this.sections[i].showSectionLabels){
	      				htmlelement +='<div class="clear"></div>';
	      				var x=0;
	      				for(x in this.sections[i].sectionLabels){
	      					var edtTxt = this.sections[i].sectionLabels[x].editor.text;
	
	                        edtTxt = util.getImageLayout(edtTxt);
	                        edtTxt = util.getVideoLayout(edtTxt);
	
	      					if(edtTxt!="" && edtTxt!=null){
	      						htmlelement +='<div class="stdQueLabel inputDummyQuestionStemStudent lblMargin">'+markCompulsary+' '+edtTxt+' </div>';
	      						htmlelement +='<div class="clear"></div>';
	      					}
	      				}
	      			}
	      			htmlelement +='<div class="clear"></div>';
      	   		
	      			htmlelement +=this.sections[i].instructorLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType,this.feedbackScoringType);
	      			htmlelement +='</div>';
	      			if(this.subType=='radio')
	      				htmlelement +='</div>';
	      			htmlelement +='<div class="clear"></div>';
      		  	}
    		}
    		htmlelement +='</div>';
    		if( this.feedbackType == 'standard') {
    			htmlelement +='<div class="overallFeedOpen '+hidden+'  ">';
                var overallFeedback = util.getImageLayout(this.overallFeedback.text);
                    overallFeedback = util.getVideoLayout(overallFeedback);

                var generalFeedback = util.getImageLayout(this.generalFeedback.text);
                    generalFeedback = util.getVideoLayout(generalFeedback);

        		htmlelement +=' <strong>Overall feedback: </strong>'+overallFeedback+'<br/>'+generalFeedback+'</div>';
    		} else if( this.feedbackType == 'rangedBased' ) {
    		    htmlelement += this.instructorOverallFeedback();
    		} else {
    			// generate subcategory ranges feedback
    			var y=0;
    	   		var subCategoryRangeLayout = '';
    	   		for(y in this.subCategoryRanges){
    	   			subCategoryRangeLayout +=this.subCategoryRanges[y].instructorLayout(this.feedbackScoringType, this.binaryAnswer);
    	   		}
    	   		
    	   		if( subCategoryRangeLayout != '' ){
    	   			htmlelement += '<div class="container">';
    	   			htmlelement += '	<div action="#" class="headTxt HeadingWidth"><b>Feedback:</b></div>';
    	   			htmlelement +='<div class="clear"></div>';
    	   			htmlelement += 		subCategoryRangeLayout;
    	   			htmlelement += '</div>';
    	   		}
    	   		// generate overall feedback
    	   		htmlelement += this.instructorOverallFeedback();
    		}
    		return htmlelement.replace(/&nbsp;/gi,'');
         },
         instructorSectionLayout:function(subCategory,graded){
         	var sectionLayout='';      	
         	var markCompulsary=(graded)?"<span class='starHide'>*</span>":"";
         	if(subCategory != null)	{	
     			if(subCategory.sectionIds.length>0){
     				if(subCategory.notApplicable){
     					sectionLayout +='<div class="prevQuest prevQuestInstructor instructcheckNA"><input type="checkbox" class="css-checkbox" disabled id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+subCategory.subCategoryIdPrefix+subCategory.id+'">';
 						sectionLayout +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+subCategory.subCategoryIdPrefix+subCategory.id+'">Not Applicable</label></div>';
     				}
     				if(!this.hideSubCategoriesfromStudents)
     					sectionLayout +='<div action="#" class="headTxt answerTick correct-2"><b>'+subCategory.editor.text+'</b> </div>';
     			}
     		}
	   		var k=0;
	   		for(k in this.sections){
	   			sectionLayoutForMode = this.sections[k].instructorLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType,this.feedbackScoringType);
	   			if(subCategory != null)	{	
   					if(this.sections[k].subCategoryId == subCategory.id) {
		   				sectionLayout +='<div class="col-lg-10" >';
		   				sectionLayout +='<div class="table-responsive tbl_scroll tbl-style">';
			   			
		   				sectionLayout +=' <div class="prevQuest prevQuestInstructor">';

                        var editorText = util.getImageLayout(this.sections[k].editor.text);
                            editorText = util.getVideoLayout(editorText);

		   				sectionLayout +='<div class="stdQueLabel inputDummyQuestionStemStudent"> '+markCompulsary+' '+editorText+'  </div>';
		   				//display sub labels if authored
		      			if(this.sections[k].showSectionLabels){
		      				sectionLayout +='<div class="clear"></div>';
		      				var x=0;
		      				for(x in this.sections[k].sectionLabels){
		      					var edtTxt = this.sections[k].sectionLabels[x].editor.text;

                                edtTxt = util.getImageLayout(edtTxt);
                                edtTxt = util.getVideoLayout(edtTxt);

		      					if(edtTxt != "" && edtTxt!=null){
		      						sectionLayout +='<div class="stdQueLabel inputDummyQuestionStemStudent">'+markCompulsary+' '+edtTxt+' </div>';
		      						sectionLayout +='<div class="clear"></div>';
		      					}
		      				}
		      			}
		   				
		   				sectionLayout +='<div class="clear"></div>';
		    	   		
		   				sectionLayout += sectionLayoutForMode;
		   				sectionLayout +='</div>';
		   				
		   				sectionLayout +='</div>';
		   				sectionLayout +='</div>';
						
		    			if(this.subType=='radio')
		    				sectionLayout +='</div>';
		    			sectionLayout +='<div class="clear"></div>';			   			
	   				}
	   			}
	   			else {		   					   			
		   			sectionLayout+= sectionLayoutForMode;	   				
	   			}
	   		}
	   		
 	   		return sectionLayout;
         },
         instructorSumAvgOverallFeedbackLayout:function(indx){            
            
            this.ranges[indx].rangeFeedbackEditor.text = util.getImageLayout(this.ranges[indx].rangeFeedbackEditor.text);
            this.ranges[indx].rangeFeedbackEditor.text = util.getVideoLayout(this.ranges[indx].rangeFeedbackEditor.text);
            
        	 if( this.ranges[indx].minRangeEditor.text != '' && this.ranges[indx].maxRangeEditor.text != '' && this.ranges[indx].rangeFeedbackEditor.text != '' ) {
         		var htmlelement='';
                htmlelement += '<div class="parent_div">';
                htmlelement += '	<div class="child_div">'+this.ranges[indx].minRangeEditor.text+' - '+this.ranges[indx].maxRangeEditor.text+' pts.</div>';
                htmlelement += '	<div><strong>FEEDBACK: </strong>'+this.ranges[indx].rangeFeedbackEditor.text+'</div>';
                htmlelement += '</div>';
                htmlelement += '<div class="clear"></div>';

                return htmlelement;
         	} else {
         		return '';
         	}
         },
         /**
			 * for instructor overall feedback layouts (common for both
			 * rangebased and rangebasedsubcategories)
			 * 
			 * @returns {String}
			 */
         instructorOverallFeedback:function(){
        	var itsHtml = "";
        	 if(this.ranges != null){
     			var rangeFeedbackHtml = '';
     			var rangeFeedbackOuterHtml = '';
     			rangeFeedbackOuterHtml +='<div class="clear"></div>';
     			rangeFeedbackOuterHtml +='<div class="rangeFeedOpen">';
     			rangeFeedbackOuterHtml +='	<div "><strong>Range-based feedback: </strong></div>';
         		var j=0;
         		var rangeCount = 0;
         		for( j in this.ranges){        			
         			if(this.feedbackScoringType === "frequency"){
         				var pointsVal = [this.choiceOptionVal1, this.choiceOptionVal2];
         				rangeFeedbackHtml += this.ranges[j].instructorFrequencyFeedbackLayout(j,this.sections[0].markers, this.binaryAnswer, pointsVal);
         				rangeCount++;
         			}else{
         				rangeFeedbackHtml += this.instructorSumAvgOverallFeedbackLayout(j);
         				rangeCount++;
         			}        			
             	}
         		//rangeFeedbackHtml +='</div>';               
               rangeFeedbackHtml = util.getImageLayout(rangeFeedbackHtml);
               rangeFeedbackHtml = util.getVideoLayout(rangeFeedbackHtml);               

         		if( rangeCount > 0 ) {
         			if(rangeFeedbackHtml != ''){
         				itsHtml += rangeFeedbackOuterHtml + rangeFeedbackHtml;
         			}         			 
         		}
         		itsHtml+='</div>';
     		   }
             return itsHtml;
         },
         /**
			 * layouts in student test mode
			 * 
			 * @returns {String}
			 */
         studentLayout:function(){
        	var htmlelement='';
     		/* check for branching to show/hide */
        	var attachClass = '';
        	if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
        		attachClass = 'hideElement';
        	}else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
        		attachClass = 'hideElement';
        	}
        	
        	/* component related check */
     		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="mainQuestionSection '+attachClass+'" >';
     		var i=0;
     		if( this.feedbackType == 'rangedBasedSubcategories') {
     			if(this.binaryAnswer){
     				for( i in this.sections){
     					/* check for branching to show/hide */
     					attachClass = ''; /*reset attachClass*/
    	 				if(!this.sections[i].showToStud && this.sections[i].showToStud!=undefined){
    	 					/* section related check */
    	 	        		attachClass = 'hideElement';
    	 	        	}
     					htmlelement +=' <div class="col-lg-10" >';
		   				htmlelement +=' 	<div class="table-responsive tbl_scroll tbl-style">';
		   				var sectionId= this.sections[i].componentIdPrefix + this.sections[i].componentId + this.sections[i].idPrefix + this.sections[i].id;
		   				htmlelement +=' 		<div  id = "sectionDiv_'+sectionId+'" class="prevQuest '+attachClass+'">';
                        var editorText = util.getImageLayout(this.sections[i].editor.text);
                            editorText = util.getVideoLayout(editorText);
		   				htmlelement +='				<div class="stdQueLabel inputDummyQuestionStemStudent"> '+editorText+'</div>';
		   				//display sub labels if authored
		   				if(this.sections[i].showSectionLabels){
		   				   htmlelement +='<div class="clear"></div>';
		   				   var x=0;
		   				   for(x in this.sections[i].sectionLabels){
		   				     var edtTxt = this.sections[i].sectionLabels[x].editor.text;

                             edtTxt = util.getImageLayout(edtTxt);
                             edtTxt = util.getVideoLayout(edtTxt);

		   				     if(edtTxt!="" && edtTxt!=null){
		   				     	htmlelement +='<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent">'+edtTxt+'</div>';
		   				     	htmlelement +='<div class="clear"></div>';
		   				     }
		   				   }
		   				}
		   				htmlelement +=' 			<div class="clear"></div>';
		    	   		
		   				htmlelement +=this.sections[i].studentLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, this.showPointsToStudents, this.feedbackScoringType, this.notApplicableStudentResponse);
		   	 			
		   				htmlelement +='</div>';
		   				htmlelement +='<div class="secScore" id="sectionDivScore_'+sectionId+'"></div>';
		   				
		   				htmlelement +='</div>';
		   				htmlelement +='</div>';
						
		    			if(this.subType=='radio')
		    				htmlelement +='</div>';
		    			htmlelement +='<div class="clear"></div>';
     				}
     			}
     			else{
     				for(k in this.subCategories){
		     			
		     			if(this.subCategories[k].sectionIds.length>0){
		     				if(this.subCategories[k].notApplicable){
		     					var checkproperty=this.subCategories[k].notApplicableStudentResponse? "checked='checked'":"";
		     					htmlelement +='<div class="prevQuest instructcheckNA"><input type="checkbox" class="css-checkbox" '+checkproperty+' id="notApplicableSubcategory_'+this.subCategories[k].editor.id+'">';
		     					htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.subCategories[k].editor.id+'">Not Applicable</label></div>';
		     				}
		     				
		     				if(!this.hideSubCategoriesfromStudents){
		   					  htmlelement +='<div action="#" class="headTxt answerTick correct-2"><b>'+this.subCategories[k].editor.text+'</b> </div>';
		     				}
    		   			}
		     			for( i in this.sections){
		     				/* check for branching to show/hide */
		     				attachClass = ''; /*reset attachClass*/
	    	 				if(!this.sections[i].showToStud && this.sections[i].showToStud!=undefined){ /* section related check */
	    	 	        		attachClass = 'hideElement';
	    	 	        	}
	    		   			if(this.sections[i].subCategoryId == this.subCategories[k].id) {
	    		   				
	    		   				htmlelement +=' <div class="col-lg-10" >';
	    		   				htmlelement +=' 	<div class="table-responsive tbl_scroll tbl-style">';
	    		   				var sectionId= this.sections[i].componentIdPrefix + this.sections[i].componentId + this.sections[i].idPrefix + this.sections[i].id;
	    		   				htmlelement +=' 		<div  id = "sectionDiv_'+sectionId+'" class="prevQuest '+attachClass+'">';

                                var editorText = util.getImageLayout(this.sections[i].editor.text);
                                    editorText = util.getVideoLayout(editorText);

	    		   				htmlelement +='				<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent"> '+editorText+'</div>';
	    		   				//display sub labels if authored
	    		   				if(this.sections[i].showSectionLabels){
	    		   					htmlelement +='<div class="clear"></div>';
	    		   				   var x=0;
	    		   				   for(x in this.sections[i].sectionLabels){
	    		   				     var edtTxt = this.sections[i].sectionLabels[x].editor.text;

                                     edtTxt = util.getImageLayout(edtTxt);
                                     edtTxt = util.getVideoLayout(edtTxt);

	    		   				     if(edtTxt!="" && edtTxt!=null){
	    		   				     	htmlelement +='<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent">'+edtTxt+'</div>';
	    		   				     	htmlelement +='<div class="clear"></div>';
	    		   				     }
	    		   				   }
	    		   				}
	    		   				htmlelement +=' 			<div class="clear"></div>';
	    		    	   		
	    		   				htmlelement +=this.sections[i].studentLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, this.showPointsToStudents, this.feedbackScoringType, this.subCategories[k].notApplicable);
	    		   	 			
	    		   				htmlelement +='</div>';
	    		   				htmlelement +='<div class="secScore" id="sectionDivScore_'+sectionId+'"></div>';
	    		   				htmlelement +='</div>';
	    		   				htmlelement +='</div>';
	    						
	    		    			if(this.subType=='radio')
	    		    			htmlelement +='</div>';
	    		    			htmlelement +='<div class="clear"></div>';			   			
	    	   				}
		     			}
		  	   		}
     			}
	     	}
	 		else {	
	 			var checkproperty=this.notApplicableStudentResponse? "checked='checked'":"";
 				if(this.notApplicable){
 					htmlelement +='<div class="prevQuest instructcheckNA" >';
 					htmlelement +='	<input type="checkbox" '+checkproperty+' class="css-checkbox" id="notApplicableComp_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
		   			htmlelement +='	<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
		   		}
 				var i = 0;
	 			for( i in this.sections){
	 				/* check for branching to show/hide */
	 				attachClass = ''; /*reset attachClass*/
	 				if(!this.sections[i].showToStud && this.sections[i].showToStud!=undefined){ /* section related check */
	 	        		attachClass = 'hideElement';
	 	        	}	 				
	 				htmlelement +=' <div class="col-lg-10" >';
	   				htmlelement +=' 	<div class="table-responsive tbl_scroll tbl-style">';
	   				var sectionId= this.sections[i].componentIdPrefix + this.sections[i].componentId + this.sections[i].idPrefix + this.sections[i].id;
	   				htmlelement +=' 		<div id = "sectionDiv_'+sectionId+'" class="prevQuest '+attachClass+'">';
	   				
                    var editorText = util.getImageLayout(this.sections[i].editor.text);
                        editorText = util.getVideoLayout(editorText);

	   				htmlelement +='				<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent"> '+editorText+'</div>';
	   				//display sub labels if authored
	   				if(this.sections[i].showSectionLabels){
	   					htmlelement +='<div class="clear"></div>';
	   				   var x=0;
	   				   for(x in this.sections[i].sectionLabels){
	   				     var edtTxt = this.sections[i].sectionLabels[x].editor.text;

                          edtTxt = util.getImageLayout(edtTxt);
                             edtTxt = util.getVideoLayout(edtTxt);

	   				     if(edtTxt!="" && edtTxt!=null){
	   				     	htmlelement +='<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent">'+edtTxt+'</div>';
	   				     	htmlelement +='<div class="clear"></div>';
	   				     }
	   				   }
	   				}
	   				htmlelement +=' 			<div class="clear"></div>';
	    	   		
	   				htmlelement +=this.sections[i].studentLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, this.showPointsToStudents, this.feedbackScoringType, this.notApplicableStudentResponse);
	   	 			
	   				htmlelement +='</div>';
	   				htmlelement +='<div class="secScore" id="sectionDivScore_'+sectionId+'"></div>';
	   				htmlelement +='</div>';
	   				htmlelement +='</div>';
					
	    			if(this.subType=='radio')
	    				htmlelement +='</div>';
	    			htmlelement +='<div class="clear"></div>';			
	 			}
			}
	   			

 			 htmlelement +='</div>';
 			 if(this.subType=='radio')
				htmlelement +='</div>';
 			/*display total score in student side start */
 	   		htmlelement +='<div id="stdSideScore_'+this.id+'" class="container">';
 	   		htmlelement +='  <div class="row" style="padding-top:10px;">';
 	   		htmlelement +='     <div><strong class="stdScoreTypeText"></strong></div>';
 	   		htmlelement +='     <div class="clear"></div>';
 	   		if(this.feedbackScoringType === "frequency")
 	   		{
 	   			htmlelement +='     <div class="stdScorePointText mcstdFreqScore"></div>';
 	   		}
 	   		else
 	   		{
 	   			htmlelement +='     <div class="stdScorePointText mcstdScore"></div>';
 	   		}
 	   		
 	   		htmlelement +='  </div>';	   		
 	   		htmlelement +='</div>';
 	   		/*display total score in student side end */
 			 htmlelement +='<div class="clear"></div>';
         	  		
     		htmlelement+='</div>';
     		htmlelement+='</div>';
     		return htmlelement;
         },
         resetComp : function(){
        	var eSec=0;
     		for(eSec in this.sections){
     			this.notApplicableStudentResponse=false;
         		var fullCmpId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
         		var isFrequency=false;
         		if(this.feedbackScoringType == 'frequency'){
         			isFrequency=true;
         		}
         		var flag;
         		$("#stdSideCheckallScore_"+this.id).css("display","none"); 
				//console.log("reset compo"+this.id);
				
				for(var index in question.branches){
			   			var branch = question.branches[index];
			   			if (branch.mappingIndicator == "answerOption")
			   				{
			   					$(".stdScoreTypeText").hide();
			   					$(".stdScorePointText").hide();
			   				}
				}
         		
        		if(question.pages[parseInt(this.pageId)-1]==undefined){
        			flag=question.pages[parseInt(this.pageId)-util.checkIfPageDelete(this.pageId)-1].showToStud;
        		}else{
        			flag=question.pages[parseInt(this.pageId)-1].showToStud;
        		}
     			if((this.showToStud!=undefined && question.activePage.showToStud!=undefined && (!flag || !this.showToStud))){
     				this.resetStudentResponsesforBranching(fullCmpId, this.sections[eSec], isFrequency, this.binaryAnswer);	
     			}else{
     				if(!this.sections[eSec].showToStud && this.sections[eSec].showToStud!=undefined){
     					this.resetStudentResponsesforBranching(fullCmpId, this.sections[eSec], isFrequency, this.binaryAnswer);
     				}
     			}
     			
     		}
         },
         
         /*
          * resets each and every options responses 
          * along with corresponding showToStud flag of page, component and sections
          * */
         resetStudentResponsesforBranching : function(fullCmpId, currentSection, isFrequency, isBinary){
        	 var key=0;
        	 if(this.notApplicableStudentResponse){
 	    		$("#notApplicableComp_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
 	    	 }
     		 for(key in currentSection.options){
     			if(!isBinary){    					
	    			var optAnswer = currentSection.options[key].answers[0];
	    			optAnswer.studentResponse=false;
	    			var sectionId = currentSection.componentIdPrefix+currentSection.componentId+currentSection.idPrefix+currentSection.id;
	    			$('#sectionDiv_'+sectionId+' input[type="radio"]:checked').each(function(){
	    				$(this).prop('checked', false); 
	    			});
	    			if(currentSection.isBranched){
	    				optAnswer.setMappedEntities(fullCmpId, optAnswer.studentResponse,currentSection.options[key].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency, currentSection.id);
	    			}
	    			
	    		}
     		 }
         },
         /**
			 * add event handers to html elements after the layout done in
			 * student test mode
			 * 
			 * @returns {String}
			 */
         afterStudentLayout:function(){  
        	 var j=0;
        	 var sectionBranchedlen=0;
	   		 if(this.feedbackType == "standard" || this.feedbackType == "rangedBased"){
	   			var awardMaxMin = this.awardMaximum ? "Max" : "Min";
	   			MultipleChoiceComponent.addEvent("notApplicableComp_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "change", this._updateStudentResponse,{elementId:"notApplicableComp_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id});
	   			for(j in this.sections){
	   				 /*check for score display according to sectiosn if branched*/
	       			 if(this.sections[j].isBranched){
	       			   sectionBranchedlen++;
	       			 }	 

		   			 this.sections[j].afterStudentLayout(this.subType, this.notApplicableStudentResponse, awardMaxMin,this.binaryAnswer,this.feedbackType);
		   		 }
        	 }
       	     else{
	      		for(var k in this.subCategories){
	      			MultipleChoiceComponent.addEvent("notApplicableSubcategory_"+this.subCategories[k].editor.id, "change", this._updateStudentResponse,{scaleType:'M',elementId:"notApplicableSubcategory_"+this.subCategories[k].editor.id,subCategoryId:this.subCategories[k].id});
	      			
	      			var awardMaxMin = this.subCategories[k].awardMaximum? "Max" : "Min";
	      			if(this.binaryAnswer){
	      				var j=0;
		   				for(j in this.sections){
		   					/*check for score display according to sectiosn if branched*/
			       			if(this.sections[j].isBranched){
			       			  sectionBranchedlen++;
			       			}
		   					for(var i in this.sections[j].options){
		   						if(this.sections[j].options[i].subCategoryId == this.subCategories[k].id){
				       				this.sections[j].afterStudentLayout(this.subType, this.sections[j].options[i].notApplicableBinaryOption,awardMaxMin,this.binaryAnswer,this.feedbackType);
				       			}
		   					}
			   			}
	      			}
	      			else{
	      				var j=0;
		   				for(j in this.sections){
		   					/*check for score display according to sectiosn if branched*/
			       			 if(this.sections[j].isBranched){
			       			   sectionBranchedlen++;
			       			 }
			       			if(this.sections[j].subCategoryId == this.subCategories[k].id){
			       				this.sections[j].afterStudentLayout(this.subType, this.subCategories[k].notApplicableStudentResponse,awardMaxMin,this.binaryAnswer,this.feedbackType);
			       			}
			   			}
	      			}
	      			
	   			 }
	      	}
	   		/*display total score once student get back to page */
        	  if(this.isBranched && this.feedbackType!="standard" && this.isStudentAnswered()){
	       		this.sections[0].options[0].answers[0].displayScoreForStudent(this);	       		
        	  }else{/*check for section branching*/
     			 if(sectionBranchedlen>0 && this.feedbackType!="standard" && this.isStudentAnswered()){
     				this.sections[0].options[0].answers[0].displayScoreForStudent(this);
     				this.sections[0].options[0].answers[0].displaySectionScore(this);
     			 }
        		  
        	  }
         },
         /**
          * update student Response
          */
           updateStudentResponse:function(event){
         	  var checkBoxElement=$("#"+event.data.elementId);
         	 var sectionBranchedlen = 0;
         	  if (this.feedbackType === 'rangedBased'){
 	       		   if(checkBoxElement.prop("checked") == true || checkBoxElement.prop("checked") == 'true'){
 	       			 this.notApplicableStudentResponse=true;
 	       		   }else{
 	       			 this.notApplicableStudentResponse=false;
 	       		   }
 	       		   var awardMaxMin = this.awardMaximum ? "Max" : "Min";
 	       		   var i=0;
 	       		   for(i in this.sections){
 	       			    /*check for score display according to sectiosn if branched*/
 	       			    if(this.sections[i].isBranched){
 	       			     sectionBranchedlen++;
 	       			    }
	 	        		this.sections[i].disableStudentSelection(this.notApplicableStudentResponse, awardMaxMin,this.binaryAnswer);
 	       		   }
 	       	   }else{
 	       		   var subCatId=event.data.subCategoryId;
 	       		 
 	       		   var flag=null;
	       		   if(checkBoxElement.prop("checked")==true || checkBoxElement.prop("checked")=="true"){
	       			   flag=true;
	       		   }
	       		   else{
	       			   flag= false;
	       		   }
 	       		   var i=0;
      			   for(i in this.subCategories){
      				  if(this.subCategories[i].id == subCatId) {
      					var awardMaxMin = this.subCategories[i].awardMaximum ? "Max" : "Min";
      					this.subCategories[i].updateStudentResponse(flag);
  						var k=0;
      		       		for(k in this.sections){
      		       			/*check for score display according to sectiosn if branched*/
     	       			    if(this.sections[k].isBranched){
     	       			     sectionBranchedlen++;
     	       			    }
      		       			if(this.sections[k].subCategoryId == subCatId){
      		       				this.sections[k].disableStudentSelection(flag,awardMaxMin, this.binaryAnswer);
      		       			}
      		   			}
      					break;
      				  }
      			   }
 	       	   }
         	 /*display total score based on NA response*/
         	  if(this.isBranched && this.isStudentAnswered()){
 	       		this.sections[0].options[0].answers[0].displayScoreForStudent(this);	       		
         	  }else{/*check for section branching*/
      			 if(sectionBranchedlen>0 && this.isStudentAnswered()){
      				this.sections[0].options[0].answers[0].displayScoreForStudent(this);	 
      			 }
         		  
         	  }
 	       	   question.updateProgressBar();
          },
         /**
			 * layouts in check my work status mode
			 * 
			 * @returns {String}
			 */
         checkMyWorkLayout:function(){        	
        	 
         },
         /**
			 * builds the layout for post Submission Review mode
			 * 
			 * @returns {String} html element
			 */
         postSubmissionReviewLayout:function(){
        	var htmlelement='';
			var markCompulsary=(this.graded)?"<span class='starHide'>*</span>":"";
			
        	
        	/* check for branching to show/hide */
        	var attachClass = '';        	
        	if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
        		attachClass = 'hideElement';
        	}else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
        		attachClass = 'hideElement';
        	}
     		
     		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent  mainQuestionSection '+attachClass+'">';
     		var tickMarkDiv = ((this.acceptAnyAnswer)&&this.isStudentAnswered(this.binaryAnswer)) || this.notApplicableStudentResponse?" <div class=' wid answerTick correct'></div>":"";
     		var arrStudentAnswered = [];
     		var totalOptions = 0;
     		var totalAttempted = 0;
     		var i=0;
     		var totalPoints=0;
     		var totalFreqency = [];
     		var visibleSections=0;
     		if(this.binaryAnswer){
					var correctAnsCnt= this.sections[i].calTotalCrctAnswersGivenByStudent(this.binaryAnswer);
 				tickMarkDiv=correctAnsCnt == this.sections[i].options.length?"<div class='wid answerTick correct'></div>":"<div class='answerTick wrong'></div>";
				}else{
					var correctAnsCnt= this.sections[i].calTotalCrctAnswersGivenByStudent(this.binaryAnswer);
 				tickMarkDiv=correctAnsCnt == 1?"<div class=' wid answerTick correct'></div>":"<div class='answerTick wrong'></div>";
				}
     		//for standard and range based section display
     		if(this.feedbackType != 'rangedBasedSubcategories'){
     			var checkproperty=this.notApplicableStudentResponse? "checked='checked'":"";
 				if(this.notApplicable){
 					htmlelement +='<div class="prevQuest instructcheckNA" >';
 					htmlelement +='	<input type="checkbox" '+checkproperty+' class="css-checkbox" disabled id="notApplicableComp_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
		   			htmlelement +='	<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
		   		}
	     		for( i in this.sections){
	     			
	     			 if(this.sections[i].showToStud){
	     				visibleSections++;
	     			 }
	     			/* check for branching to show/hide */
 					attachClass = ''; /*reset attachClass*/
	 				if(!this.sections[i].showToStud && this.sections[i].showToStud!=undefined){ /* section related check */
	 	        		attachClass = 'hideElement';
	 	        	}
	     			//if(!this.acceptAnyAnswer){
	 				
	     				
	     			//}
	     			var y=0;
	     			var isStudentChecked = false;
	     			var isAttemptQustion = this.notApplicableStudentResponse ? true :false;
	     			var totalAttemptedSection = 0;
	     			var totalOptionsSection = 0;
			   		for(y in this.sections[i].options){
			   			var x = 0;
				   		for(x in this.sections[i].options[y].answers){
				   			if(this.sections[i].options[y].answers[x].studentResponse){
				   				if(this.binaryAnswer){
					   				totalFreqency[x] = totalFreqency[x] ? totalFreqency[x] + 1 : 1;
					   				isAttemptQustion = true;
					   				totalAttempted ++;
					   				totalAttemptedSection++;
				   				}
				   				else{//???????????????????????????????
					   				isAttemptQustion = true;
					   				totalFreqency[this.sections[i].options[y].id] = totalFreqency[this.sections[i].options[y].id] ? totalFreqency[this.sections[i].options[y].id] + 1 : 1;
					   			}
				   				arrStudentAnswered.push(this.sections[i].options[y].answers[x].studentResponse); 
				   			}
				   		} 
				   		if( this.binaryAnswer && this.subType == 'radio'){
					   		totalOptions++;
					   		totalOptionsSection++;
				   		}
			       	}
                    var editorText = util.getImageLayout(this.sections[i].editor.text);
                        editorText = util.getVideoLayout(editorText);
			   		var sectionLabel = '<div class="minwid stdQueLabel1 inputDummyQuestionStemStudent lblMargin"> '+markCompulsary+' '+editorText+' </div>';
			   		//display sub labels if authored
			   		if(this.sections[i].showSectionLabels){
			   			sectionLabel +='<div class="clear"></div>';
			   		   var x=0;
			   		   for(x in this.sections[i].sectionLabels){
                        var editorText = util.getImageLayout(this.sections[i].sectionLabels[x].editor.text);
                        editorText = util.getVideoLayout(editorText);
			   		     var edtTxt = editorText;
                         if(edtTxt!="" && edtTxt!=null){
			   		    	sectionLabel +='<div class="stdQueLabel1 inputDummyQuestionStemStudent lblMargin" style="padding-left: 28px;">'+markCompulsary+' '+edtTxt+' </div>';
			   		    	sectionLabel +='<div class="clear"></div>';
			   		     }
			   		   }
			   		}
		   			sectionLabel += '<div class="clear"></div>';
		   			//check if section is attemted to show incomplete banner sectionwise
			   		if(this.binaryAnswer ){
			   			if(totalAttemptedSection != totalOptionsSection && !this.notApplicableStudentResponse){
			   					htmlelement += ' <div class="prevQuest '+attachClass+'"> <div class="answerTick wrong"></div>';
				   				htmlelement += sectionLabel;
				   				isStudentChecked = false;
				   				htmlelement += '<div class="inCompleteAnswerBanner" >You did not complete this question.</div>';
			   			}		   			
				   		else{
				   			isStudentChecked = true;
				   			htmlelement +=' <div class="prevQuest '+attachClass+'">'+tickMarkDiv+'';
				   			htmlelement +=sectionLabel;
				   		}
			   		}
			   		else{
			   			if(!isAttemptQustion){
			   				htmlelement +=' <div class="prevQuest '+attachClass+'"> <div class="wid answerTick wrong"></div>';
			   				htmlelement +=sectionLabel;
			   				isStudentChecked = false;
			     			htmlelement += '<div class="inCompleteAnswerBanner" >You did not complete this question.</div>';
			   			}   			
				   		else{
				   			isStudentChecked = true;
				   			htmlelement +=' <div class="prevQuest '+attachClass+'">'+tickMarkDiv+'';
				   			htmlelement +=sectionLabel;
				   		}
			   		}
	     			htmlelement +=this.sections[i].postSubmissionReviewLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, isStudentChecked, this.showPointsToStudents, this.feedbackScoringType, this.notApplicableStudentResponse);
	     		
	     			if(this.subType=='radio')
	    				htmlelement +='</div>';
	     			//calculate points sectionwise
	     			if(this.feedbackType == 'rangedBased') {
	     				if(this.notApplicableStudentResponse){
	     					if(this.awardMaximum){
	     						totalPoints = this.maxPoint;
	     					}
	     					else{
	     						totalPoints = this.minPoint;
	     					}
	     				}
	     				else{
	     					if(this.feedbackScoringType != 'frequency'){
		     					totalPoints += this.sections[i].calculatePoints();
		     				}
	     				}
	     			}
	     			htmlelement +='<div class="clear"></div>';
	     			htmlelement +='</div>';
	         	}//section lopp end
	     		
	     		//check if all sections are attempted to show incomplete banner for component
	     		var errOverallFeedbck = '<div class="clear"></div>';
	     		errOverallFeedbck += '<div class="inCompleteAnswerBanner-2" >You did not complete all of the questions. Your Feedback will be impacted.</div>';
    	   		if(!this.notApplicableStudentResponse){
		     		if(this.binaryAnswer){
		     			if( arrStudentAnswered.length < totalOptions && (this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories')){
		         			htmlelement +=errOverallFeedbck;
		    	   		}
		     		}else{
		     			if( arrStudentAnswered.length < visibleSections && (this.feedbackType == 'rangedBased' )){
		     				htmlelement +=errOverallFeedbck;
		     			}
		     		}
     			}
    	   		this.totalPoints = totalPoints;
    	   		this.totalFreqency = totalFreqency;
            }//standard and range base loop end
     		else{
     			//for range based subcategories
     			if(this.binaryAnswer){
	     				
	     				for(var i in this.sections){
	     					/* check for branching to show/hide */
	     					attachClass = ''; /*reset attachClass*/
	    	 				if(!this.sections[i].showToStud && this.sections[i].showToStud!=undefined){ /* section related check */
	    	 	        		attachClass = 'hideElement';
	    	 	        	}
	     					var y=0;
	    	     			var isStudentChecked = false;
	    		     		var totalAttemptedSection = 0;
	    		     		var totalOptionsSection = 0;
        	     			for(var subCatLength in this.subCategories){
        	     				for(var y in this.sections[i].options){
        	     					//in case of binary check each statemnt for subcategory
			     					if(this.sections[i].options[y].subCategoryId == this.subCategories[subCatLength].id) {
			     						isSectionSubcatNotApplicable = this.sections[i].options[y].notApplicableBinaryOption;
			     						var x = 0;
		        				   		for( x in this.sections[i].options[y].answers ){
		        				   			if(this.sections[i].options[y].answers[x].studentResponse){
	        					   				totalFreqency[x] = totalFreqency[x] ? totalFreqency[x] + 1 : 1;
	        					   				totalAttempted ++;
	        					   				totalAttemptedSection++;
		        				   				isAttemptQustion = true;
		        				   				arrStudentAnswered.push(this.sections[i].options[y].answers[x].studentResponse); 
		        				   			}
		        				   		} 
		        				   		if(this.subType == 'radio'){
		        					   		totalOptions++;
		        					   		totalOptionsSection++;
		        				   		}
			     					}
	     						}
	     					}
                            var editorText = util.getImageLayout(this.sections[i].editor.text);
                                editorText = util.getVideoLayout(editorText);
        	     			var sectionLabel = '<div class="stdQueLabel inputDummyQuestionStemStudent lblMargin">'+markCompulsary+' '+editorText+'</div>';
        	     			//display sub labels if authored
        	     			if(this.sections[i].showSectionLabels){
        	     				sectionLabel +='<div class="clear"></div>';
        	     			   var x=0;
        	     			   for(x in this.sections[i].sectionLabels){
                                var editorText = util.getImageLayout(this.sections[i].sectionLabels[x].editor.text);
                                    editorText = util.getVideoLayout(editorText);

        	     			     var edtTxt = editorText;
        	     			     if(edtTxt!="" && edtTxt!=null){
        	     			    	sectionLabel +='<div class="stdQueLabel inputDummyQuestionStemStudent lblMargin"> '+markCompulsary+' '+edtTxt+'</div>';
        	     			    	sectionLabel +='<div class="clear"></div>';
        	     			     }
        	     			   }
        	     			}
        		   			sectionLabel += '<div class="clear"></div>';
        		   		    //check if section is attemted to show incomplete banner sectionwise
    			   			if(totalAttemptedSection != totalOptionsSection && !isSectionSubcatNotApplicable){
    			   				htmlelement +=' <div class="prevQuest '+attachClass+'"> <div class="answerTick wrong"></div>';
    			   				htmlelement +=sectionLabel;
    			   				isStudentChecked = false;
    			   				htmlelement += '<div class="inCompleteAnswerBanner" >You did not complete this question.</div>';
    			   			}		   			
    				   		else{
    				   			isStudentChecked = true;
    				   			htmlelement +=' <div class="prevQuest '+attachClass+'">'+tickMarkDiv+'';
    				   			htmlelement +=sectionLabel;
    				   		}
        	     			htmlelement +=this.sections[i].postSubmissionReviewLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, isStudentChecked, this.showPointsToStudents, this.feedbackScoringType);
        	     			if(this.subType=='radio')
        	    				htmlelement +='</div>';
        	     			
        	     			htmlelement +='<div class="clear"></div>';
        	     			htmlelement +='</div>';
	     				}//section loop end
	     				//check if all sections are attempted to show incomplete banner for component
	     				var errOverallFeedbck = '<div class="clear"></div>';
	    	     		errOverallFeedbck += '<div class="inCompleteAnswerBanner-2" >You did not complete all of the questions. Your Feedback will be impacted.</div>';
	        	   		if(!isSectionSubcatNotApplicable){
	    	     			if( arrStudentAnswered.length < totalOptions){
	    	         			htmlelement +=errOverallFeedbck;
	    	    	   		}
	        	   		}
     			}//frequency rangebased subcategory loop end
     			else{
     				for(var subCatLength in this.subCategories){
         				if(this.subCategories[subCatLength].sectionIds.length > 0){
         					if(this.subCategories[subCatLength].notApplicable){
         						var checkproperty=this.subCategories[subCatLength].notApplicableStudentResponse? "checked='checked'":"";
		     					htmlelement +='<div class="prevQuest instructcheckNA"><input '+checkproperty+' disabled type="checkbox" class="css-checkbox"  id="notApplicableSubcategory_'+this.subCategories[subCatLength].editor.id+'">';
		     					htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.subCategories[subCatLength].editor.id+'">Not Applicable</label></div>';
		     				}
         					if(!this.hideSubCategoriesfromStudents){
     						   htmlelement +='<div action="#" class="headTxt answerTick correct-2"><b>'+this.subCategories[subCatLength].editor.text+'</b> </div>';
         					}
     					}
         				for(var i in this.sections){
         					/* check for branching to show/hide */
         					attachClass = ''; /*reset attachClass*/
        	 				if(!this.sections[i].showToStud && this.sections[i].showToStud!=undefined){ /* section related check */
        	 	        		attachClass = 'hideElement';
        	 	        	}
         					//var isNotApplicaleSubCat = false;
    	     				if(this.sections[i].subCategoryId == this.subCategories[subCatLength].id) {
    	        	     			var y=0;
    	        	     			var isStudentChecked = false;
    	        	     			//check notAppplicable flag of subcategory
    	        	     			var isAttemptQustion = false;
    	        	     			if(this.subCategories[subCatLength].notApplicable){
    	        	     				if(this.subCategories[subCatLength].notApplicableStudentResponse){
    	        	     					isAttemptQustion = true;
    	        	     					arrStudentAnswered.push(this.sections[i].options[0].answers[0].studentResponse);   						   				
    	        	     				}
    	        	     			}
    	        			   		for( y in this.sections[i].options){
    	        			   			var x = 0;
    	        				   		for( x in this.sections[i].options[y].answers ){
    	        				   			if(this.sections[i].options[y].answers[x].studentResponse){
    	        				   				totalFreqency[this.sections[i].options[y].id] = totalFreqency[this.sections[i].options[y].id] ? totalFreqency[this.sections[i].options[y].id] + 1 : 1;
    	        				   				isAttemptQustion = true;
    	        				   				arrStudentAnswered.push(this.sections[i].options[y].answers[x].studentResponse);
    	        				   			}
    	        				   		} 
    	        			       	}
                                    var editorText = util.getImageLayout(this.sections[i].editor.text);
                                        editorText = util.getVideoLayout(editorText);
    	        			   		var sectionLabel = '<div class="stdQueLabel inputDummyQuestionStemStudent lblMargin"> '+markCompulsary+' '+editorText+' </div>';
    	        			   		//display sub labels if authored
    	        			   		if(this.sections[i].showSectionLabels){
    	        			   			sectionLabel +='<div class="clear"></div>';
    	        			   		   var x=0;
    	        			   		   for(x in this.sections[i].sectionLabels){

                                        var editorText = util.getImageLayout(this.sections[i].sectionLabels[x].editor.text);
                                            editorText = util.getVideoLayout(editorText);

    	        			   		     var edtTxt = editorText;
    	        			   		     if(edtTxt!="" && edtTxt!=null){
    	        			   		    	sectionLabel +='<div class="stdQueLabel inputDummyQuestionStemStudent lblMargin">'+markCompulsary+' '+edtTxt+' </div>';
    	        			   		    	sectionLabel +='<div class="clear"></div>';
    	        			   		     }
    	        			   		   }
    	        			   		}
    	        		   			sectionLabel += '<div class="clear"></div>';
    	        		   		    //check if section is attemted to show incomplete banner sectionwise
	        			   			if(!isAttemptQustion){
	        			   				htmlelement +=' <div class="prevQuest '+attachClass+'"> <div class="answerTick wrong"></div>';
	        			   				htmlelement +=sectionLabel;
	        			   				isStudentChecked = false;
	        			     			htmlelement += '<div class="inCompleteAnswerBanner" >You did not complete this question.</div>';
	        			   			}   			
	        				   		else{
	        				   			isStudentChecked = true;
	        				   			htmlelement +=' <div class="prevQuest '+attachClass+'">'+tickMarkDiv+'';
	        				   			htmlelement +=sectionLabel;
	        				   		}
    	        	     			htmlelement +=this.sections[i].postSubmissionReviewLayout(this.binaryAnswer,this.subType,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, isStudentChecked, this.showPointsToStudents, this.feedbackScoringType);
    	        	     			if(this.subType=='radio')
    	        	    				htmlelement +='</div>';
    	        	     			
    	        	     			htmlelement +='<div class="clear"></div>';
    	        	     			htmlelement +='</div>';
    	         			}
         				}
         			}
     				//check if all sections are attempted to show incomplete banner for component
     				var errOverallFeedbck = '<div class="clear"></div>';
    	     		errOverallFeedbck += '<div class="inCompleteAnswerBanner-2" >You did not complete all of the questions. Your Feedback will be impacted.</div>';
	     			if(arrStudentAnswered.length < visibleSections){
	     				htmlelement +=errOverallFeedbck;
	     			}
     			}
     			htmlelement += this.subcategoryFeedbackLayoutPostSubmission();
     		}
     		htmlelement += this.overallFeedbackLayoutPostSubmission();
     		
     		htmlelement+='</div>';
     		return htmlelement.replace(/\Â/gi,'').replace(/&nbsp;/gi,'').replace(/&#160;/gi,'');
         },
         
         //calculation to show overall feedback
         overallFeedbackLayoutPostSubmission : function(){
        	 var htmlelement = "";
        	 var totalPoints = 0;
        	 var totalFreqency = [];
        	 var hidden = this.overallFeedback.text =='' && this.generalFeedback.text=='' ?'invisible' : '';
        	 var mostFrequentOptId = 0;
        	 if(this.feedbackType == 'standard') {
      			if(POLICY_FEEDBACK == 'feedback')
 				{
      				var overallFeedback = this.overallFeedback.text;
      				overallFeedback = overallFeedback.replace(/\Â/g," ");
      				overallFeedback = overallFeedback.replace("&nbsp;","");

      				var generalFeedback = this.generalFeedback.text;
      					generalFeedback = generalFeedback.replace(/\Â/g," ");
      					generalFeedback = generalFeedback.replace("&nbsp;","");
      				
      					overallFeedback = util.getImageLayout(overallFeedback);
                        overallFeedback = util.getVideoLayout(overallFeedback);

                        generalFeedback = util.getImageLayout(generalFeedback);
                        generalFeedback = util.getVideoLayout(generalFeedback);

      				if(overallFeedback != "" && generalFeedback != "")
      				{
      					htmlelement +='<div class="overallFeedOpen '+hidden+'  ">';     				
      					htmlelement +=' <strong>Overall feedback: </strong>'+overallFeedback+'<br/>'+generalFeedback+'</div>';
      				}
 				}
      		} else if( this.ranges != null) {
      		    totalPoints = this.totalPoints;
      			totalFreqency = this.totalFreqency;
      			// if sucategories then print sucategory result first
      			// total score
      			if(this.feedbackScoringType === "average")
 	   			{
      				if(this.binaryAnswer && this.feedbackType == 'rangedBasedSubcategories'){
         				var maxCounter = 0;
     		       		for(key in this.sections){    		       	     
     		       	    	maxCounter += this.sections[key].options.length;
     		       	    }
     		       		if(maxCounter !=0 ){
     		       			totalPoints = totalPoints/maxCounter;	
     		       		}    		       		
     		       	}else{
     		       		totalPoints = totalPoints/this.sections.length;
     		       	}
 	   			}	
      			var multiplier = Math.pow(10, 2);
    				totalPoints = Math.round(totalPoints * multiplier) / multiplier;
    				
      			mostFrequentOptId = [];
      			if(this.feedbackScoringType === "frequency"){
 	     			var max = 0;
 	     			for(key in totalFreqency){	     				
 						 if (totalFreqency[key] > max) {
 							 mostFrequentOptId = [];
 							 mostFrequentOptId.push(key);
 							 max = totalFreqency[key];
 						 }
 						 else if(totalFreqency[key] == max){
 							 mostFrequentOptId.push(key);
 						 }
 					 }
 	     		}
      		
	  			var rangeFeedbackHtml = '';
	     		var j=0;
	     		var rangeCount = 0;
	     		rangeFeedbackHtml +='<div class="clear"></div>';
	      		//htmlelement +='<div class="rangeFeedOpen">';
	     		rangeFeedbackHtml +='<div  style="padding-top:10px; padding-left:90px;"  class="scoreClass">';
	  			
	  			if(this.feedbackScoringType != "frequency"){
	  				rangeFeedbackHtml +='<div class="row"><strong> Total score: ';
	  				rangeFeedbackHtml +=' '+ totalPoints +' pts.</strong></div>';
	  				rangeFeedbackHtml +='</div>';
	  				rangeFeedbackHtml +='</div>';
	      			rangeFeedbackHtml +='</br>';
	      			rangeFeedbackHtml +='<div class="clear"></div>';
	      			rangeFeedbackHtml +='<div class="rangeFeedOpen" style="padding-left:72px;">';
	      			rangeFeedbackHtml +='	<div class="scoreClass row"><strong>RANGE BASED FEEDBACK: </strong></div>';
	      			
	 	 				for( j in this.ranges){
	 	     				if( this.ranges[j].minRangeEditor.text != '' && this.ranges[j].maxRangeEditor.text != '' && this.ranges[j].rangeFeedbackEditor.text != '' ) {
	 	         				var showFlag=(totalPoints>=parseFloat(this.ranges[j].minRangeEditor.text) && totalPoints <=this.ranges[j].maxRangeEditor.text);
	 	         				var showCss =showFlag? 'style="display:block;"':'style="display:none;"';
	 	         				rangeFeedbackHtml +='<div '+showCss+' class="rowPagesection" >';
	 	         				rangeFeedbackHtml +='	<div class="colPageSection minColPic1">'+this.ranges[j].minRangeEditor.text+'-'+this.ranges[j].maxRangeEditor.text+' pts.</div>';
	                             
	                             var rangeFeedbackText = util.getImageLayout(this.ranges[j].rangeFeedbackEditor.text);
	                             rangeFeedbackText = util.getVideoLayout(rangeFeedbackText);
	
	 	         				rangeFeedbackHtml +='	<div class="colPageSection secondColPic"><strong>Feedback: </strong> <span class="feedbackText">'+rangeFeedbackText+'</span></div>';
	 	         				rangeFeedbackHtml +='</div>';
	 	         				rangeFeedbackHtml +='<div class="clear"></div>';
	 	         				if(showFlag){
	 	         					rangeCount++;
	 	         				}
	 	         			}
	 	     			}
	          	}
	 			else{
	 				if(mostFrequentOptId.length != 0){
	 					if(this.binaryAnswer){
	 						
	  	 					  
	 						    var marker = [];
	  	 					    if(mostFrequentOptId.length > 1){
	  			 					rangeOverallFeedbackHtml = "";
	  			 					var rangeObj = {};
	  			 					for(var index in mostFrequentOptId){
	  			 						var selecteOpt = (parseInt(mostFrequentOptId[index])+1);
	  			 						var choiceOptionVal = this["choiceOptionVal" + selecteOpt];
	  				        	        marker.push(choiceOptionVal);
	  				        	        if( this.ranges != null) {
	  				        	        	 try{
	  					        	        	  	rangeObj = this.ranges.filter(function(e){
	  					        	        	  		return e.id == selecteOpt;
	  					        	        	  	});
	  					        	            }catch(err){
	  					        	            	rangeObj = {};
	  					        	            }
	  				        	        }
	  				        	         
	  			        	           
	 			        	            if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text != ""){
	 			        	            	rangeOverallFeedbackHtml +='<div style="display:block;" class="rowPagesection" >';
	 			        	            	rangeOverallFeedbackHtml +='	<div class="colPageSection minColPic1">'+choiceOptionVal+'</div>';
	
	                                         var rangeFbEditor = util.getImageLayout(rangeObj[0].rangeFeedbackEditor.text);
	                                             rangeFbEditor = util.getVideoLayout(rangeFbEditor);
	
	 			        	            	rangeOverallFeedbackHtml +='	<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeFbEditor+'</span></div>';
	 			        	            	rangeOverallFeedbackHtml +='</div>';
	 			        	            	rangeOverallFeedbackHtml +='<div class="clear"></div>';
	 			        	            	rangeCount++;
	 			       					}
	  			 					}
	  			 					rangeFeedbackHtml +='<div class="row"><strong> Total Frequency: ';
	  								rangeFeedbackHtml +='<div ><strong>You selected '+ marker +' an equal number of times.</strong></div>';
	  			         			rangeFeedbackHtml +='</div>';
	  			         			rangeFeedbackHtml +='</div>';
	  			         			rangeFeedbackHtml +='</br>';
	  			         			rangeFeedbackHtml +='<div class="clear"></div>';
	  			         			rangeFeedbackHtml +='<div class="rangeFeedOpen">';
	  			         			if(rangeObj[0].rangeFeedbackEditor.text != ""){
	  			         				rangeFeedbackHtml +='	<div class="scoreClass"><strong>RANGE BASED FEEDBACK: </strong></div>';
	  			         				rangeFeedbackHtml += rangeOverallFeedbackHtml;
	  			         			}
	  			 				}else{
	 		 						var selecteOpt = (parseInt(mostFrequentOptId)+1);
	 		 						var marker = this["choiceOptionVal" + selecteOpt];
	 		 						var rangeObj = {};
	 			        	        if( this.ranges != null) {
	 			        	        	 try{
	 				        	        	  	rangeObj = this.ranges.filter(function(e){
	 				        	        	  		return e.id == selecteOpt;
	 				        	        	  	});
	 				        	            }catch(err){
	 				        	            	rangeObj = {};
	 				        	            }
	 			        	        }
	  				      	           
	 			        	        
	 	   							rangeFeedbackHtml +='<div class="row"><strong> Total Frequency: ';
	 		             			rangeFeedbackHtml +='<div ><strong>You selected mostly : '+ marker +'</strong></div>';
	 		             			rangeFeedbackHtml +='</div>';
	 		             			rangeFeedbackHtml +='</div>';
	 		             			rangeFeedbackHtml +='</br>';
	 		             			rangeFeedbackHtml +='<div class="clear"></div>';
	 		             			if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text != ""){
	 		             				rangeFeedbackHtml +='<div class="rangeFeedOpen">';
	 		             				rangeFeedbackHtml +='	<div class="scoreClass"><strong>RANGE BASED FEEDBACK: </strong></div>';
	 		             				rangeFeedbackHtml +='<div style="display:block;" class="rowPagesection" >';
	 		             				rangeFeedbackHtml +='	<div class="colPageSection minColPic1">'+marker+'</div>';
	
	                                     var rangeFbEditor = util.getImageLayout(rangeObj[0].rangeFeedbackEditor.text);
	                                         rangeFbEditor = util.getVideoLayout(rangeFbEditor);
	
	 		             				rangeFeedbackHtml +='	<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeFbEditor+'<span></div>';
	 		             				rangeFeedbackHtml +='</div>';
	 		             				rangeFeedbackHtml +='<div class="clear"></div>';
	 		             			}
	 		         				rangeCount++;
	  			 				
	  	 					 }
	 					}
	 					else{
	 						if(mostFrequentOptId.length > 1){
	 		 					rangeOverallFeedbackHtml = "";
	 		 					var marker = [];
	 		 					
	 		 					var rangeObj = {};
	 		 					for(var index in mostFrequentOptId){
	 			        	        marker.push(this.sections[0].markers[mostFrequentOptId[index] - 1]);
	 			        	        if( this.ranges != null) {
	 			        	        	 try{
	 				        	        	  	
	 				        	        	  	rangeObj = this.ranges.filter(function(e){
	 				        	        	  		return e.id == mostFrequentOptId[index];
	 				        	        	  	});
	 				        	            }catch(err){
	 				        	            	rangeObj = {};
	 				        	            }
	 			        	        }
	 			        	        if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text != ""){
	 		        	            	rangeOverallFeedbackHtml +='<div style="display:block;" class="rowPagesection" >';
	 		        	            	rangeOverallFeedbackHtml +='	<div class="colPageSection minColPic1">'+this.sections[0].markers[mostFrequentOptId[index] - 1]+'</div>';
	
	                                     var rangeFbEditor = util.getImageLayout(rangeObj[0].rangeFeedbackEditor.text);
	                                         rangeFbEditor = util.getVideoLayout(rangeFbEditor);
	
	 		        	            	rangeOverallFeedbackHtml +='	<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeFbEditor+'</span></div>';
	 		        	            	rangeOverallFeedbackHtml +='</div>';
	 		        	            	rangeOverallFeedbackHtml +='<div class="clear"></div>';
	 		        	            	
	 		       					}
	 		       					rangeCount++;
	 		 					}
	 		 					rangeFeedbackHtml +='<div class="row"><strong> Total Frequency: ';
	 							rangeFeedbackHtml +='<div ><strong>You selected '+ marker +' an equal number of times.</strong></div>';
	 		         			rangeFeedbackHtml +='</div>';
	 		         			rangeFeedbackHtml +='</div>';
	 		         			rangeFeedbackHtml +='</br>';
	 		         			rangeFeedbackHtml +='<div class="clear"></div>';
	 		         			rangeFeedbackHtml +='<div class="rangeFeedOpen">';
	 		         			if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text != ""){
	 		         				rangeFeedbackHtml +='	<div class="scoreClass"><strong>RANGE BASED FEEDBACK: </strong></div>';
	 		         				rangeFeedbackHtml += rangeOverallFeedbackHtml;
	 		         			}
	 		 				}
	 		 				else{
	 		 					
	 		 						var rangeObj = {};
	 			  	      	        try{
	 			      	        	  	rangeObj = this.ranges.filter(function(e){
	 			      	        	  		return e.id == mostFrequentOptId;
	 			      	        	  	});
	 			    	            }catch(err){
	 			    	            	rangeObj = {};
	 			    	            }
	 	   							rangeFeedbackHtml +='<div class="row"><strong> Total Frequency: ';
	 		             			rangeFeedbackHtml +='<div ><strong>You selected mostly : '+this.sections[0].markers[mostFrequentOptId -1]+'</strong></div>';
	 		             			rangeFeedbackHtml +='</div>';
	 		             			rangeFeedbackHtml +='</div>';
	 		             			rangeFeedbackHtml +='</br>';
	 		             			rangeFeedbackHtml +='<div class="clear"></div>';
	 		             			if(rangeObj && rangeObj[0].rangeFeedbackEditor.text != ""){
	 		             				rangeFeedbackHtml +='<div class="rangeFeedOpen">';
	 		             				rangeFeedbackHtml +='	<div class="scoreClass"><strong>RANGE BASED FEEDBACK: </strong></div>';
	 		         					rangeFeedbackHtml +='<div style="display:block;" class="rowPagesection" >';
	 		         					rangeFeedbackHtml +='	<div class="colPageSection minColPic1">'+this.sections[0].markers[mostFrequentOptId -1]+'</div>';
	
	                                     var rangeFbEditor = util.getImageLayout(rangeObj[0].rangeFeedbackEditor.text);
	                                         rangeFbEditor = util.getVideoLayout(rangeFbEditor);
	
	 		         					rangeFeedbackHtml +='	<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeFbEditor+'<span></div>';
	 		         					rangeFeedbackHtml +='</div>';
	 		         					rangeFeedbackHtml +='<div class="clear"></div>';
	 		         				}
	 		         				rangeCount++;
	 		 				}
	 					}
	 				}
	  			}
	  			rangeFeedbackHtml +='</div>';
	      		if( rangeCount > 0 ) {
	      			htmlelement += rangeFeedbackHtml; 
	      		}
      		}
        	return htmlelement;
         },
         
        //calculation to show subcategorywise feedback
         subcategoryFeedbackLayoutPostSubmission : function(){
  			
        	var totalPoints=0;
      		var totalFreqency = [];
      		var rangeCount=0;
      		var htmlelement = "";
  			for(var subCatLength in this.subCategories){
 				var subCatTotalPoints = 0;
 				var subCatPoints = 0;
 				var noOfSections = 0;
 				var totalOptInSection = 0;
 				var totalFreqencySubCat =[];
 				
 				if(this.binaryAnswer){
     				for( i in this.sections){
     					noOfSections++;
     					
     					for( y in this.sections[i].options){
     						if(this.sections[i].options[y].subCategoryId == this.subCategories[subCatLength].id) {
     							
     							if(this.sections[i].options[y].notApplicableBinaryOption){
     								totalOptInSection = this.subCategories[subCatLength].optionIds.length;
     								subCatPoints = this.sections[i].options[y].calculatePoints();
	     							subCatTotalPoints += subCatPoints;
	    	     					totalPoints += subCatPoints;
    		     				}else{
    		     					subCatPoints = this.sections[i].options[y].calculatePoints();
	     							subCatTotalPoints += subCatPoints;
	    	     					totalPoints += subCatPoints;
	    	     					totalOptInSection++;
	     							var x = 0;
	        				   		for( x in this.sections[i].options[y].answers){
	        				   			if(this.sections[i].options[y].answers[x].studentResponse ){
	        				   				totalFreqency[x] = totalFreqency[x] ? totalFreqency[x] + 1 : 1;
		    	     						totalFreqencySubCat[x] = totalFreqencySubCat[x] ? totalFreqencySubCat[x] + 1 : 1;
		    	     					}
	        				   		}
    		     				}
     						}
     					}
 					}
 				}
	     		else{
     				for(var i in this.sections){
 	     				if(this.sections[i].subCategoryId == this.subCategories[subCatLength].id) {
 	     					noOfSections++;
 	     					totalOptInSection += this.sections[i].options.length;
 	     					if(this.subCategories[subCatLength].notApplicableStudentResponse){
 		     					if(this.subCategories[subCatLength].awardMaximum){
 		     						subCatTotalPoints = this.subCategories[subCatLength].maxPoint;
 		     					}
 		     					else{
 		     						subCatTotalPoints = this.subCategories[subCatLength].minPoint;
 		     					}
 		     					
 		     					totalPoints += subCatTotalPoints;
 		     				}
 	     					else{
     	     					subCatPoints = this.sections[i].calculatePoints();
     	     					subCatTotalPoints += subCatPoints;
     	     					totalPoints += subCatPoints;
     	     					for(var y in this.sections[i].options){
 	        			   			var x = 0;
 	        				   		for( x in this.sections[i].options[y].answers ){
 		    	     					if(this.sections[i].options[y].answers[x].studentResponse ) {
 		    	     						totalFreqency[this.sections[i].options[y].id] = totalFreqency[this.sections[i].options[y].id] ? totalFreqency[this.sections[i].options[y].id] + 1 : 1;
 		    	     						totalFreqencySubCat[this.sections[i].options[y].id] = totalFreqencySubCat[this.sections[i].options[y].id] ? totalFreqencySubCat[this.sections[i].options[y].id] + 1 : 1;
 		    	     					}
 	        				   		}
     	     					}
 	     					}
 	     				}
      				}
  				}
  					
  				if(this.feedbackScoringType === "average")
 	   			{
      				if(this.binaryAnswer){
     		       		if(totalOptInSection !=0 ){
     		       			subCatTotalPoints = subCatTotalPoints/totalOptInSection;	
     		       		}    		       		
     		       	}else{
     		       		if(noOfSections !=0 ){
     		       			subCatTotalPoints = subCatTotalPoints/noOfSections;
     		       		}
     		       	}
 	   			}	
  				var multiplier = Math.pow(10, 2);
   				subCatTotalPoints = Math.round(subCatTotalPoints * multiplier) / multiplier;
      			if(this.feedbackScoringType != 'frequency'){
      				var subCatFeedback="";
      				if(this.binaryAnswer){
      					if(this.subCategories[subCatLength].optionIds.length>0){
          					subCatFeedback +='<div class="rangeFeedOpen">';
          					subCatFeedback +='	<div class="scoreClass">';
     				   		subCatFeedback +='		<div class="row" style="padding-top:10px;">';
     		   		   		subCatFeedback +='			<div class="feedbackTxt"><strong> '+this.subCategories[subCatLength].editor.text+' </div>';
     		   		   		subCatFeedback +='			<div class="clear"></div>';
     		   		   		subCatFeedback +='			<div>Score : '+ subCatTotalPoints +' pts.</strong></div>';
     		   		   		subCatFeedback +='		<div>';
     		   		   		subCatFeedback +='	</div>';
     		   		   		subCatFeedback +='</div>';
     		   		   		subCatFeedback +='</div>';
     		   		   		var showFlag = false;
     			   		   	for( l in this.subCategoryRanges){
     				   		   	if (this.subCategories[subCatLength].id == this.subCategoryRanges[l].subCategoryId){
     			   					for (k in this.subCategoryRanges[l].ranges){
     			   						showFlag = (subCatTotalPoints>=parseFloat(this.subCategoryRanges[l].ranges[k].minRangeEditor.text) && subCatTotalPoints <=this.subCategoryRanges[l].ranges[k].maxRangeEditor.text);
     				     				if(showFlag){
     				   						feedback = this.subCategoryRanges[l].ranges[k].rangeFeedbackEditor.text;
     				   						subCatFeedback += '<div style="padding-left:100px; margin-bottom:10px;">'+this.subCategoryRanges[l].ranges[k].minRangeEditor.text+"-"+this.subCategoryRanges[l].ranges[k].maxRangeEditor.text+'<label style="padding-left:20px;"> <strong>Feedback : </strong>'+ feedback +' </label></div>';
     				     				}
     				     			}
     		         			}
     			   		   	}
     			   		   	if(showFlag){
     			   		   		htmlelement += subCatFeedback;	
     			   		   	}
     			   		   	
     			   		   	htmlelement +='</div>';
          				}
      				}
      				else{
      					if(this.subCategories[subCatLength].sectionIds.length>0){
          					subCatFeedback +='<div class="rangeFeedOpen">';
          					subCatFeedback +='	<div class="scoreClass">';
     				   		subCatFeedback +='		<div class="row" style="padding-top:10px;">';
     		   		   		subCatFeedback +='			<div class="feedbackTxt"><strong> '+this.subCategories[subCatLength].editor.text+' </div>';
     		   		   		subCatFeedback +='			<div class="clear"></div>';
     		   		   		subCatFeedback +='			<div>Score : '+ subCatTotalPoints +' pts.</strong></div>';
     		   		   		subCatFeedback +='		<div>';
     		   		   		subCatFeedback +='	</div>';
     		   		   		subCatFeedback +='</div>';
     		   		   		subCatFeedback +='</div>';
     		   		   	    var showFlag = false;
     			   		   	for( l in this.subCategoryRanges){
     				   		   	if (this.subCategories[subCatLength].id == this.subCategoryRanges[l].subCategoryId){
     			   					for (k in this.subCategoryRanges[l].ranges){
     			   					    showFlag=(subCatTotalPoints>=parseFloat(this.subCategoryRanges[l].ranges[k].minRangeEditor.text) && subCatTotalPoints <=this.subCategoryRanges[l].ranges[k].maxRangeEditor.text);
     				     				if(showFlag){
     				   						feedback = this.subCategoryRanges[l].ranges[k].rangeFeedbackEditor.text;
                                             
                                             feedback = util.getImageLayout(feedback);
                                             feedback = util.getVideoLayout(feedback);

     				   						subCatFeedback += '<div style="padding-left:100px; margin-bottom:10px;">'+this.subCategoryRanges[l].ranges[k].minRangeEditor.text+"-"+this.subCategoryRanges[l].ranges[k].maxRangeEditor.text+'<label style="padding-left:20px;"> <strong>Feedback : </strong>'+ feedback +' </label></div>';
     				   						break;
     				     				}
     				     			}
     		         			}
     			   		   	}
     			   		   	if(showFlag){
          			   		   	htmlelement += subCatFeedback;     			   		   		
     			   		   	}
     			   		   	htmlelement +='</div>';
          				}
      				}
  				}
  				else{
  					var subCatScoreHtml="";
  					var subCatFeedback = "";
	     			var max = 0;
	     			mostFrequentOptId =[];
	     			for(key in totalFreqencySubCat){	     				
						 if (totalFreqencySubCat[key] > max) {
							 mostFrequentOptId = [];
							 mostFrequentOptId.push(key);
							 max = totalFreqencySubCat[key];
						 }
						 else if(totalFreqencySubCat[key] == max){
							 mostFrequentOptId.push(key);
						 }
	     			}
	     			if(mostFrequentOptId.length != 0){
	     				var showFlag = false;
 		     			if(this.binaryAnswer){
 		     				if(mostFrequentOptId.length > 1){
 	     	 					
 	     	 					var marker = [];
 	     	 					for(var index in mostFrequentOptId){
 	     	 						var selecteOpt = (parseInt(mostFrequentOptId[index])+1);
 	     	 						var rangeObj = {};
 	     	 					    for( l in this.subCategoryRanges){
 	     	 						  	
	    				   		   		if (this.subCategories[subCatLength].id == this.subCategoryRanges[l].subCategoryId){
		 	    				   		   	 try{
		 	    				   		   		 rangeObj = this.subCategoryRanges[l].ranges.filter(function(e){
			     		        	        	  		return e.id == selecteOpt;
			     		        	        	  	});
			     	        	            }catch(err){
			     	        	            	rangeObj = {};
			     	        	            }
	    				   		   		}
	    				   		   	}
 	     	 					    var choiceOptionVal = this["choiceOptionVal" + selecteOpt];
 	     	 					    marker.push(choiceOptionVal);
 	     	 					    if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text!=""){
 	     	 					    	showFlag = true;
     		        	            	subCatFeedback +='<div style="display:block;" class="rowPagesection" >';
     		        	            	subCatFeedback +='	<div class="colPageSection minColPic1">'+marker+'</div>';
     		        	            	subCatFeedback +='	<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeObj[0].rangeFeedbackEditor.text+'</span></div>';
     		        	            	subCatFeedback +='</div>';
     		        	            	subCatFeedback +='<div class="clear"></div>';
     		        	            	rangeCount++;
     		        	            }
 	     	 					}
 	     	 					subCatScoreHtml +='<div class="rangeFeedOpen">';
 	     	 					subCatScoreHtml +='		<div  class="scoreClass"><strong>'+this.subCategories[subCatLength].editor.text+'';
 	     	 					subCatScoreHtml +='		<div ><strong>SCORE: You selected '+ marker +' an equal number of times.</div></strong></div>';
 	     	 					subCatScoreHtml +='		</br>';
 	     	 					subCatScoreHtml +='		<div class="clear"></div>';
 	     	 					subCatScoreHtml += 		subCatFeedback;
 	     	 					subCatScoreHtml +='</div>';
 	     	 				}
 	     	 				else{
 	     	 				
 	     	 					
 	     	 					  var selecteOpt = (parseInt(mostFrequentOptId)+1);
 	     	 					  var rangeObj = {};
 	     	 					  
 	     	 					  for( l in this.subCategoryRanges){
	    				   		   		if (this.subCategories[subCatLength].id == this.subCategoryRanges[l].subCategoryId){
		 	    				   		   	 try{
			     		        	        	  	
			     		        	        	  	rangeObj = this.subCategoryRanges[l].ranges.filter(function(e){
			     		        	        	  		return e.id == selecteOpt;
			     		        	        	  	});
			     	        	            }catch(err){
			     	        	            	rangeObj = {};
			     	        	            }
	    				   		   		}
	    				   		}
 	     	 					var marker = this["choiceOptionVal" + selecteOpt];
 	     	   					
 	     	   						subCatScoreHtml +='<div class="rangeFeedOpen">';
 	     	   					    subCatScoreHtml +='		<div  class="scoreClass"><strong>'+this.subCategories[subCatLength].editor.text+'';
 	     	   						subCatScoreHtml +='		<div >SCORE: You selected mostly : '+ marker +'</div></strong></div>';
 	     	   						
 	     	   						if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text != ""){
 	     	   							showFlag = true;
 	     	   						    subCatScoreHtml +='		</br>';
 	 	     	   						subCatScoreHtml +='		<div class="colPageSection minColPic1">'+marker+'</div>';

                                     var rangeFbText = util.getImageLayout(rangeObj[0].rangeFeedbackEditor.text);
                                         rangeFbText= util.getVideoLayout(rangeFbText);

 	     		         				subCatScoreHtml +='		<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeFbText+'<span></div>';
 	     		         				subCatScoreHtml +='		<div class="clear"></div>';
 	     	   						}
     		         				subCatScoreHtml +='</div>';
     		         				rangeCount++;
 	     	   					
 	     	 				}
 		     			}
 		     			else{
 		     				if(mostFrequentOptId.length > 1){
 		     					//var rangeObj = null;
 	     	 					var marker = [];
 	     	 					for(var index in mostFrequentOptId){
 	     		   					
 	     		        	        marker.push(this.sections[0].markers[mostFrequentOptId[index] - 1]);
 	     		        	        var rangeObj = {};
 	     		        	        for( l in this.subCategoryRanges){
 	    				   		   		if (this.subCategories[subCatLength].id == this.subCategoryRanges[l].subCategoryId){
		 	    				   		   	 try{
			     		        	        	    rangeObj = this.subCategoryRanges[l].ranges.filter(function(e){
			     		        	        	  		return e.id == mostFrequentOptId[index];
			     		        	        	  	});
			     	        	            }catch(err){
			     	        	            	rangeObj = {};
			     	        	            }
 	    				   		   		}
 	    				   		   	}
 	     		        	        if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text!=""){
 	     		        	        	showFlag = true;
     		        	            	subCatFeedback +='<div style="display:block;" class="rowPagesection" >';
     		        	            	subCatFeedback +='	<div class="colPageSection minColPic1">'+this.sections[0].markers[mostFrequentOptId[index] - 1]+'</div>';

                                     var rangeFbText = util.getImageLayout(rangeObj[0].rangeFeedbackEditor.text);
                                         rangeFbText= util.getVideoLayout(rangeFbText);

     		        	            	subCatFeedback +='	<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeFbText+'</span></div>';
     		        	            	subCatFeedback +='</div>';
     		        	            	subCatFeedback +='<div class="clear"></div>';
     		        	            	rangeCount++;
     		        	            }
 	     	 					}
 	     	 					subCatScoreHtml +='<div class="rangeFeedOpen">';
 	     	 					subCatScoreHtml +='		<div  class="scoreClass"><strong>'+this.subCategories[subCatLength].editor.text+'';
 	     	 					subCatScoreHtml +='		<div ><strong>SCORE: You selected '+ marker +' an equal number of times.</div></strong></div>';
 	     	 					subCatScoreHtml +='		</br>';
 	     	 					subCatScoreHtml +='		<div class="clear"></div>';
 	     	 					subCatScoreHtml += 		subCatFeedback;
 	     	 					subCatScoreHtml +='</div>';
 	     	 				}
 	     	 				else{
 	     	 					var rangeObj = {};
 	     		      	        for(var l in this.subCategoryRanges){
	    				   		   		if (this.subCategories[subCatLength].id == this.subCategoryRanges[l].subCategoryId){
		 	    				   		   	 try{
			     		        	        	  	rangeObj = this.subCategoryRanges[l].ranges.filter(function(e){
			     		        	        	  		return e.id == mostFrequentOptId;
			     		        	        	  	});
			     	        	            }catch(err){
			     	        	            	rangeObj = {};
			     	        	            }
	    				   		   		}
	    				   		   	}
 	     		      	       
 	     	   						subCatScoreHtml +='<div class="rangeFeedOpen">';
 	     	   					    subCatScoreHtml +='		<div  class="scoreClass"><strong>'+this.subCategories[subCatLength].editor.text+'';
 	     	   						subCatScoreHtml +='		<div >SCORE: You selected mostly : '+this.sections[0].markers[mostFrequentOptId - 1]+'</div></strong></div>';
 	     	   						if(rangeObj.length > 0 && rangeObj[0].rangeFeedbackEditor.text!=""){
 	     	   							showFlag = true;
 	     	   							subCatScoreHtml +='		</br>';
 	     	   							subCatScoreHtml +='		<div class="colPageSection minColPic1">'+this.sections[0].markers[mostFrequentOptId - 1]+'</div>';

                                     var rangeFbText = util.getImageLayout(rangeObj[0].rangeFeedbackEditor.text);
                                         rangeFbText= util.getVideoLayout(rangeFbText);

 	     	   							subCatScoreHtml +='		<div class="colPageSection secondColPic"><strong>Feedback: </strong><span class="feedbackText">'+rangeFbText+'<span></div>';
 	     	   							subCatScoreHtml +='		<div class="clear"></div>';
 	     	   						}
 	     		      	        subCatScoreHtml +='</div>';
 	     		      	        rangeCount++;
 	     	 				}
 		     			}
	     			}
	     			if(showFlag){
	     				htmlelement += subCatScoreHtml;
	     			}
  				}//frequency loop
      			
  			}
  			this.totalPoints = totalPoints;
	   		this.totalFreqency = totalFreqency;
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
			 var responseCount=0;
			 var totalResponseCount=0;
           	 for( j in this.sections){				 
				 if(this.sections[j].showToStud || this.sections[j].showToStud==undefined )
				 {
					responseCount = this.sections[j].calTotalCrctAnswersGivenByStudent(this.binaryAnswer,this.subCategories);			
					totalCrctAnsrGvnByStdnt += responseCount;
					responseCount=0;
				 }
					
				if(this.sections[j].showToStud || this.sections[j].showToStud==undefined)
					totalResponseCount++;
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
						{							
							if(totalResponseCount == totalCrctAnsrGvnByStdnt)
							{
								totalCrctAnsrGvnByStdnt=this.sections.length;
								score = totalCrctAnsrGvnByStdnt/this.sections.length;
							}
							else								
								score = totalCrctAnsrGvnByStdnt/totalResponseCount;
         				}
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
            var selectordiv=$('#'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).find('.tickCheck');
     		var length = selectordiv.length;
 	    	 if($("#acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){	
    		 	$("#feedbackType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
				$("#showPntToStudSpan"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
    		 	for( var i=0;i<=length;i++){
    		 		$("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','hidden');
   			   }
 	    	   this.acceptAnyAnswer =true;
 	    	   this.resetAnswers();
 	    	 }else{
    			    //$("#feedbackType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
    			    $("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
    				$("#showPntToStudSpan"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
    				for( var i=0;i<=length;i++){
  	   			    	$("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','visible');
  	   			    }
 	    			this.acceptAnyAnswer =false;
 	    			$("#standard"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
 	    			this.resetAnswers();
 	    			if(this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories'){
 	         		  this.resetPointValue();
    	         	}
 	    			/***********************************************************
					 * Reset Answers for radio
					 **********************************************************/
 	    			/*
					 * if(this.subType=="radio"){
					 * $.each(this.sections,function(i,secObj){ var i=0; for(i
					 * in secObj.options){ secObj.options[i].resetAnswer(); }
					 * }); }
					 */
 	    			this.showSolutionIndicator();
 	    			
 	    			if($("#binaryAnswer"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){	
	 	   	    		this.createBinaryResult(true);
	 	   	    	} else{
	 	   	    		this.createBinaryResult(false);
	 	   	    }
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
            	   isComplete=isComplete && this.sections[i].isSectionComplete(this.feedbackType, this.feedbackScoringType);
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
              if(this.feedbackType == 'rangedBasedSubcategories'){
            	  	var x=0;
            	  	for(x in this.subCategories){
  					  isComplete=isComplete && this.subCategories[x].isSubCategoryComplete();  					  
  				    }
            	  	
		      		var i=0;
					for( i in this.subCategoryRanges){
						if(this.subCategoryRanges[i].subCategoryId==null){
							//commented to fix issue 33403
							//this.subCategoryRanges.splice(i,1);
						}
					}
					//validate sub category ranges
					var j=0;
					for( j in this.subCategoryRanges){
						//if valid then proceed for next sub category range else break
						if(validRange){
							var k=0;
				            for( k in this.subCategoryRanges[j].ranges){
				          	   var validatorObj=this.subCategoryRanges[j].ranges[k].validateRange();
				 					validRange=validRange && validatorObj.status;
				 					if(!validRange && validatorObj.message != undefined){
				 						rangeError.message=validatorObj.message;
				 	   					rangeError.field=validatorObj.field;	
				 	   					break;
				 					}
				 					
				            }
						}else{
							break;
						}
					}
              }
             
               if(!isComplete){
               object.flag = true;
               object.completeFlag = true;
               object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id; 
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
        	if(this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories'){
	        	var range=new Array();
				var rangeConfig = {
						componentId :this.id,
						componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix
					};
				var maxCounter = 0;
				if(this.feedbackScoringType === "frequency"){
		       		for(key in this.sections){  
		       	     if(maxCounter < this.sections[key].options.length){
		       	    	maxCounter = this.sections[key].options.length; 
		       	     }
		       	    }		       	    
		       	}else{
		       		maxCounter = 3;		       		
		       	}
				for (var i=1; i<=maxCounter; i++){
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
        	htmlelement += '				<input type="radio" id="radioOptionHorizontal'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="radioclick" value="2" ' +addDisableproperty+ '/>';
        	htmlelement += '					<label class="radioclick" for="radioOptionHorizontal'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Horizontal</label>';
        	htmlelement += '			</div>';
        	htmlelement += '		</li>';        	
        	htmlelement += '		<li>';
        	htmlelement += '			<div class="article-col">';
        	htmlelement += '				<input type="radio" id="radioOptionVertical'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="radioclick" value="1"/>';
        	htmlelement += '					<label class="radioclick" for="radioOptionVertical'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Vertical</label>';
        	htmlelement += '			</div>';
        	htmlelement += '		</li>';        	
        	htmlelement += '		<li>';
        	htmlelement += '			<div class="article-col">';
        	htmlelement += '				<input type="radio" id="radioOptionTwo-column'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="radioclick" value="3" ' +addDisableproperty+ '/>';
        	htmlelement += '					<label class="radioclick" for="radioOptionTwo-column'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Two-column</label>';
        	htmlelement += '			</div>';
        	htmlelement += '		</li>';       	
        	htmlelement += '</div>';
        	return htmlelement;
        },
        afterOptionOrientationDropDownLayout : function(){
        	MultipleChoiceComponent.addEventOnClass("radioclick","click",this._changeOptionOrientation);
        },
        changeOptionOrientation : function(e){
        	var selected = $("input[type='radio'][name='optionOrientation"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+"']:checked");
        	var selectedVal = selected.val();
        	this.answerOptionOrientation = parseInt(selectedVal);
        	 e.stopPropagation();
        },
        /**
		 * Function to add new section to multiple choice question
		 */
        addSection : function(newSection){
      	  this.sections.push(newSection);
        },
		addRange:function(newRange){
        this.ranges.push(newRange);	
        },
        changeType : function(){
           if($("#dropDown"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
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
        /*
		 * clickOptionOrientation : function(){
		 * $(".componentOptionAccordianPanel").trigger("click"); }
		 */
        collapseComponent : function(){
        	var $snap = $("#componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);   	
        	var $comp = $("#compBody_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);
        	var tooltip=$snap.find("img");
        	if($comp.is(":visible")){
        		$comp.hide('slow');
        		$snap.find("img").attr("src","img/comp-plus.png");
        		tooltip.attr("title","Expand");
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("invisible");
        		$comp.prev().hide();
        		$("#componentType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
        		this.state="collapse";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("dragComp");
        	}else{
        		$comp.show('slow');
        		$snap.find("img").attr("src","img/comp-minus.png");
        		tooltip.attr("title","Collapse");
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
        		$comp.prev().show();
        		$("#componentType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
        		this.state="expand";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("dragComp");
        	}
        },
        /**
         * collapse expand all component
         */
        expandcollapseComponent : function(flag) {
            var $snap = $("#componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);    
            var $comp = $("#compBody_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);
            var tooltip=$snap.find("img");
            if(!flag){
                $comp.hide('slow');
                $snap.find("img").attr("src","img/comp-plus.png");
                tooltip.attr("title","Expand");
                $("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("invisible");
                $comp.prev().hide();
                $("#componentType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
                this.state="collapse";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("dragComp");
            }else{
                $comp.show('slow');
                $snap.find("img").attr("src","img/comp-minus.png");
                tooltip.attr("title","Collapse");
                $("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
                $comp.prev().show();
                $("#componentType"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
                this.state="expand";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("dragComp");
            }
        },
          
    	 /**
			 * check if question is answered
			 */

        isStudentAnswered:function(){
             var i=0;
             var validflag=true;  
	   			 for( i in this.sections){
	   				if(this.sections[i].showToStud || this.sections[i].showToStud==undefined){
	   					validflag = validflag && this.sections[i].isStudentAnswered(this.binaryAnswer);
		   			}
	   				if(!validflag){
	   					break;
	   				} 
	   				
	   			 }
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
        /*
		 * sub categories feedbacks layout
		 */
        subCategoryFeedbackLayout:function(){
        	var isBinaryAnswer = this.binaryAnswer;
        	var choice1 = this.choiceOptionVal1;
        	var choice2 = this.choiceOptionVal2;
        	var htmlelement = "";
			if (this.feedbackType == 'rangedBasedSubcategories') {
				var currentComponent = this;
				if(this.subCategoryRanges != null){
					if(this.subCategoryRanges.length==0){
						this.createSubCategoryRangeFeedback();
					}
					var isLastSubCatRangeFeedback = false;
					var lastSubCatRangeFeedback = this.subCategoryRanges[ this.subCategoryRanges.length-1];
					$.each(this.subCategoryRanges, function(index, subCategoryRange) {
						if (subCategoryRange.id == lastSubCatRangeFeedback.id) {
							isLastSubCatRangeFeedback = true;
						} else {
							isLastSubCatRangeFeedback = false;
						}
						if (currentComponent.feedbackScoringType === 'frequency') {
							htmlelement += subCategoryRange.frequencyLayout(isLastSubCatRangeFeedback,currentComponent.sections[0].markers, currentComponent.feedbackScoringType, isBinaryAnswer, choice1, choice2);
						}else{
							htmlelement += subCategoryRange.layout(isLastSubCatRangeFeedback,currentComponent.feedbackScoringType);	
						}					
	
					});
					htmlelement += '    <div class="clear"></div>';
				}
			}
			return htmlelement;
        },
        /*
		 * create sub category feedback ranges
		 */
        createSubCategoryRangeFeedback : function(){
	    	var subCatList=[];
	    	$.each(this.subCategories,function(index,value){
	    		subCatList.push({subCategoryId:value.id,subCategory:value.editor.text});
	    	});
			var subCatRangeConfig = {
					id : 1,
					componentId : this.id,
					componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix,
					subCategories:subCatList
				};
			var subCategoryRange = new MultipleChoiceSubCategoryRange(subCatRangeConfig);
			var range=new Array();
			var rangeConfig = {
					componentId : this.id,
					componentIdPrefix :  this.pageIdPrefix+this.pageId+this.idPrefix+this.id+subCategoryRange.idPrefix,
					parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
					allowNegative:true
				};
			// var rangesLength = 3;
			
			var maxCounter = 0;
			if(this.feedbackScoringType === "frequency"){
	       		for(key in this.sections){  
	       	     if(maxCounter < this.sections[key].options.length){
	       	    	maxCounter = this.sections[key].options.length; 
	       	     }
	       	    }		       	    
	       	}else{
	       		maxCounter = 3;		       		
	       	}
			
			/*
			 * if(this.feedbackScoringType==="frequency"){ rangesLength =
			 * this.criterias.length; }
			 */
			/*
			 * for (var i=1;i<=rangesLength;i++){ rangeConfig.id=i;
			 * range.push(new Range(rangeConfig)); }
			 */
			for (var i=1;i<=maxCounter;i++){
				rangeConfig.id=i;
				range.push(new Range(rangeConfig));	
			}
			subCategoryRange.setRanges(range);
		
			this.subCategoryRanges.push(subCategoryRange);
	    },
	    notApplicableOption:function(){  
        	//var naflag=null;
        	  if($("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){	        		 
        		  $('#awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
        		  this.notApplicable=true;  
        		  this.awardMaximum = true;
        		  this.awardMinimum = false;
        		  $("#awardMax"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        		  
  	    	  }else{
  	    		 $('#awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
        		  this.notApplicable=false;	  
        		  this.awardMaximum = false;
        		  this.awardMinimum = false;
        	  }
        },
	    /*
	     * function to save Award maximum points or Award minimum points radio button value
	     */
	    notApplicableOptionValue:function(){
	    	if($("#awardMax"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
	    		this.awardMaximum = true;
	    	}else {
	    		this.awardMaximum = false;
	    	}
	    	if($("#awardMin"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
	    		this.awardMinimum = true;
	    	}else {
	    		this.awardMinimum = false;
	    	}
	    },
	    calculateTotalFrequency:function(){
	    	var i=0;
	    	var totalFreqency = [];
	    	for( i in this.sections){
	    		
	    		   		for(y in this.sections[i].options){
	    				var x = 0;
				   		for(x in this.sections[i].options[y].answers){
				   			if(this.sections[i].options[y].answers[x].studentResponse){
				   				if(this.binaryAnswer){
					   				totalFreqency[x] = totalFreqency[x] ? totalFreqency[x] + 1 : 1;
					   				
				   				}
				   				else{
					   			    var inDx = parseInt(y)+1;
					   				//totalFreqency[this.sections[i].options[y].id] = totalFreqency[this.sections[i].options[y].id] ? totalFreqency[this.sections[i].options[y].id] + 1 : 1;
				   					totalFreqency[inDx] = totalFreqency[inDx] ? totalFreqency[inDx] + 1 : 1;
					   			}
				   			}
				   		} 
	    						   		
			       	}
				}
	    	return totalFreqency;
	    }
	    
	};  