/* ========================================================================
 * CheckBoxComponent: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * accepts any answer, graded, mandatory. holds the componnet text editor
 * general feed back editor, overall feedback editor.and all options for
 * this component
 * ======================================================================== */
var CheckBoxComponent = function(options){
	this.sections=[];
	
	this.answerOptionOrientation=1;
	this.feedbackType = 'standard';
	this.feedbackScoringType = 'sum';
	this.feedBackScoringSelectionType = "allSelection";
	this.showPointsToStudents=false;
	this.notApplicable=false;
	this.hideSubCategoryToStudent = false;
	this.awardMaximum=true;
	this.awardMinimum=false;
	this.ranges=null;
	this.minPoint=0;
	this.maxPoint=0;
	this.subCategories=null;
	this.subCategoryRanges=null;
	this.notApplicableStudentResponse=false;
	$.extend(CheckBoxComponent.prototype, new Component(options));
	$.extend(this, options);
	this.editor = new Editor({id:this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.textBoxIdPrefix});
	this._toggleFeedback = CheckBoxComponent.BindAsEventListener( this, this.toggleFeedback );
	this._populateEditorProperties = CheckBoxComponent.BindAsEventListener( this, this.populateEditorProperties );
	this._populateGFEditorProperties = CheckBoxComponent.BindAsEventListener( this, this.populateGFEditorProperties );
	this._populateOFEditorProperties = CheckBoxComponent.BindAsEventListener( this, this.populateOFEditorProperties );
	this._update = CheckBoxComponent.BindAsEventListener( this, this.update );
	this._populateComp = CheckBoxComponent.BindAsEventListener( this, this.populateComp );
	this._addCheckBoxComponent=CheckBoxComponent.BindAsEventListener( this, this.addCheckBoxComponent );
	this._copyCheckBoxComponent=CheckBoxComponent.BindAsEventListener( this, this.copyCheckBoxComponent );
	this._removeComponent=CheckBoxComponent.BindAsEventListener( this, this.removeComponent );
	this._acceptAnyAnswer = CheckBoxComponent.BindAsEventListener( this, this.acptAnyAnswer );
	this._markGraded = CheckBoxComponent.BindAsEventListener( this, this.markGraded );
	this._markMandatory = CheckBoxComponent.BindAsEventListener( this, this.markMandatory );
	this._feedBackScoringSelection = CheckBoxComponent.BindAsEventListener( this, this.feedBackScoringSelection);
	this._notApplicableOption=CheckBoxComponent.BindAsEventListener( this, this.notApplicableOption);
	this._showPointToStudent=CheckBoxComponent.BindAsEventListener( this, this.showPointToStudent );	
	this._showSubCatToStudent=CheckBoxComponent.BindAsEventListener( this, this.showSubCatToStudent );
	this._notApplicableOptionValue=CheckBoxComponent.BindAsEventListener( this, this.notApplicableOptionValue );
	this._openHelpModalForCheckBoxComponent = CheckBoxComponent.BindAsEventListener(this,this.openHelpModalForCheckBoxComponent);
	this._openHelpModalForCharLimit = CheckBoxComponent.BindAsEventListener(this,this.openHelpModalForCharLimit);
	this._openHelpModalForInsertHyperlink = CheckBoxComponent.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);

	this._updateEditor = CheckBoxComponent.BindAsEventListener( this, this.updateEditor );
	this._updateGeneralFeedbackEditor= CheckBoxComponent.BindAsEventListener( this, this.updateGeneralFeedBackEditor );
	this._updateOverallFeedBackEditor= CheckBoxComponent.BindAsEventListener( this, this.updateOverallFeedBackEditor );
	this._openHelpModalForRequiredQuestionSelector = CheckBoxComponent.BindAsEventListener(this,this.openHelpModalForRequiredQuestionSelector);
	this._filter =CheckBoxComponent.BindAsEventListener( this, this.filter );
	this._collapseComponent = CheckBoxComponent.BindAsEventListener( this, this.collapseComponent );
	this._changeOptionOrientation = CheckBoxComponent.BindAsEventListener(this, this.changeOptionOrientation);
	this._changeFeedbackType = CheckBoxComponent.BindAsEventListener( this, this.changeFeedbackType );
	this._changeFeedbackScoringType = CheckBoxComponent.BindAsEventListener( this, this.changeFeedbackScoringType );
	this._collapseRangedBasedFeedback = CheckBoxComponent.BindAsEventListener( this, this.toggleRangedBasedFeedback);
	this._updateStudentResponse = CheckBoxComponent.BindAsEventListener( this, this.updateStudentResponse );
};

//add event helper method
CheckBoxComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};

//add event helper method on element class
CheckBoxComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
CheckBoxComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
CheckBoxComponent.prototype = { 
		
        /**
         * gets component text editor
         */
        getEditor:function(){
       	 this.editor;
        },
        /**
         * sets component text editor
         * @param editor
         */
        setEditor:function(editor){
       	 this.editor=editor;
        },
        /**
		 * gets sections for checkbox component
		 * 
		 * @returns sections
		 */
         getSections: function(){
                 return this.sections;  
         },
         /**
		 * sets sections for checkbox choice component
		 * 
		 * @returns sections
		 */
	     setSections: function(sections ){
	    	 this.sections=sections;  
	     },
         /**
          * gets options for check box component
          * @returns options
          *//*
         getOptions: function( ){
        	 return this.options;  
         },
         *//**
          * sets options for check box component
          * @param options
          *//*
         setOptions: function(  options ){
             this.options =  options;
         },
         *//**
          * adds option for check box component
          * @param option
          *//*
         addOption:function(  option ){
             this.options.push(option);
         },
         *//**
          * removes option from check box component
          * @param option
          *//*
         removeOption:function(option){
        	 var j=0;
        	 for(j in this.options){
	    			if(this.options[j].getId()==option.getId()){
	    				this.options.splice(j, 1);
	    			}
	    		}
 		    
         },*/
         /**
 		  * gets subCategories for checkBox component
 		  * 
 		  * @returns subCategories
 		  */
          getSubCategories: function( ){
                  return this.subCategories;  
          },
          /**
		   * sets subCategories for checkBox component
		   * 
		   * @param subCategories
	   	   */
          setSubCategories: function(subCategories){
              this.subCategories =  subCategories;
          },
          /**
  		   * adds subCategory for checkBox component
  		   * 
  		   * @param subCategory
  		   */
           addSubCategory:function(subCategory){
           	this.subCategories.push(subCategory);
           },
           /**
  		    * removes subCategory for checkBox component
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
            /**
             * gets subCategory ranges for checkBox component
             * 
             * @returns subCategories
             */
            getSubCategoryRanges: function( ){
            	return this.subCategoryRanges;  
            },
            /**
             * sets subCategory ranges for check box component
             * 
             * @param subCategories
             */
            setSubCategoryRanges: function(subCategoryRanges){
            	this.subCategoryRanges =  subCategoryRanges;
            },
         /**
		 * gets ranges for check box component
		 * 
		 * @returns ranges
		 */
         getRanges: function(){
        	 return this.ranges;  
         },
         /**
		 * sets ranges for check box component
		 * 
		 * @returns ranges
		 */
	     setRanges: function(ranges ){
	    	 this.ranges=ranges;  
	     },
	     /**
		 * adds range for check box component
		 * 
		 * @param range
		 */
	     addRange:function(range ){
	    	 this.ranges.push(range);
	     },
         /**
		 * remove range for check box component
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
	     /**
		 * Function to add new section to checkBox question
		 */
        addSection : function(newSection){
      	  this.sections.push(newSection);
        },
         /**
          * updates text of content editable divs to the object's editor text
          */
         update:function(e){
        	 	this.generalFeedback.update();
        		this.overallFeedback.update();
        		this.editor.update();
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
        		/*
        		Commented As per request from client
        		if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
           		 	question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
           	 	}*/
        		
        		var j=0;
        		for( j in this.ranges){
        			this.ranges[j].update();
        		}
                this.updateMinMaxPoint();
         },
         /**
         *  Update range on points changes
         *
         */
         updateMinMaxPoint:function(){
            if(this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories') {
                var minPoint=0;
                var maxPoint=0;
                var i=0;
                for( i in this.sections){
                    var points=[];
                    var points1=[];
                    var sum = 0;
                    var j=0;
                    for( j in this.sections[i].options){
                        var k=0;
                        var optionPoints=[];
                        for( k in this.sections[i].options[j].pointsValueEditor){
                            var pointsVal = this.sections[i].options[j].pointsValueEditor.text!=""?parseFloat(this.sections[i].options[j].pointsValueEditor.text):0;
                            // if(this.sections[i].options[j].answers[k].pointsValueEditor.text!=''){
                                optionPoints.push(pointsVal);
                            // }
                        }
                        if(optionPoints.length>0){
                            points.push(optionPoints[0]);
                        }
                    }
                    /*if(points.length>0){
                        points=points.sort(function (a, b) {
                               return a > b ? 1 : a < b ? -1 : 0;
                        }); 
                        minPoint+=points[0];
                        maxPoint+=points[points.length-1];
                    }*/
                    if(this.feedBackScoringSelectionType == "highestSelection"){
                        points = points.sort(function (a, b) {
                            return a > b ? 1 : a < b ? -1 : 0;
                        });
                        minPoint += points[0];
                        maxPoint += points[points.length-1];
                    } else if(this.feedBackScoringSelectionType == "allSelection"){
                        if(points.length>0){
                            points1=points.sort(function (a, b) {
                                   return a > b ? 1 : a < b ? -1 : 0;
                            });
                            $.each(points,function(){sum+=parseFloat(this) || 0;});
                            minPoint += points[0];
                            maxPoint += sum;
                        }
                    }
                }
                /*if(points.length>0){
                    points1=points.sort(function (a, b) {
                           return a > b ? 1 : a < b ? -1 : 0;
                    }); 
                    minPoint = points1[0];
                    maxPoint = points1[points.length-1];
                }*/
                if(this.feedbackScoringType === 'average'){ 
                    minPoint = minPoint / this.sections.length; 
                    maxPoint = maxPoint / this.sections.length;
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
         calculateMinMaxFrSection:function(section){
        	 var minPoint=0;
             var maxPoint=0; 
             var obj={};
                 var points=[];
                 var points1=[];
                 var sum = 0;
                 var j=0;
                 for( j in section.options){
                     var k=0;
                     var optionPoints=[];
                     for( k in section.options[j].pointsValueEditor){
                         var pointsVal = section.options[j].pointsValueEditor.text!=""?parseFloat(section.options[j].pointsValueEditor.text):0;
                         // if(this.sections[i].options[j].answers[k].pointsValueEditor.text!=''){
                             optionPoints.push(pointsVal);
                         // }
                     }
                     if(optionPoints.length>0){
                         points.push(optionPoints[0]);
                     }
                 }
                
                 if(this.feedBackScoringSelectionType == "highestSelection"){
                     points = points.sort(function (a, b) {
                         return a > b ? 1 : a < b ? -1 : 0;
                     });
                     minPoint += points[0];
                     maxPoint += points[points.length-1];
                 } else if(this.feedBackScoringSelectionType == "allSelection"){
                     if(points.length>0){
                         points1=points.sort(function (a, b) {
                                return a > b ? 1 : a < b ? -1 : 0;
                         });
                         $.each(points,function(){sum+=parseFloat(this) || 0;});
                         minPoint += points[0];
                         maxPoint += sum;
                     }
                 }
                 var multiplier = Math.pow(10, 2);
                 minPoint = Math.round(minPoint * multiplier) / multiplier;
                 maxPoint = Math.round(maxPoint * multiplier) / multiplier;

                 obj.minPoint=minPoint;
                 obj.maxPoint=maxPoint;
                 return obj;
             
         },
         updateMinMaxForSubCat:function(){        	 
  	    	if(this.subCategoryRanges!=null){
  	    		$.each(this.subCategoryRanges ,function(index,subCategoryRange){
  					subCategoryRange.update();	
  				});
  	    	}
  	    	
  	    },
         /**
          * layouts in design mode
          * @returns {String}
          */
         layout:function(){
             var htmlelement="";
        	 htmlelement+='<div class="pageSection" id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" ><span class="compMove_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"></span>';
        	 htmlelement+='		<div class="pageInnerSection">';
        	 htmlelement+='			<div class="pageSectionHeader"><p></p><span id="componetCollapseSpan_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> <img src="img/comp-minus.png"> </span><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead invisible" style="padding-left: 260px">Component : Check all that apply</span><h6 class="pull-right font10" >ID #'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'</h6><p></p></div>';
        	 htmlelement+='			<h2 class="tophead">Component : Check all that apply</h2>';
        	 htmlelement+='			<div id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="pageSectionBody">';
        	 // Sub category
        	 if(this.feedbackType == 'rangedBasedSubcategories') {
        		 htmlelement+= this.subCategoryLayout();
        	 }
           /* check for show/hide first section id */
           var isSectionMore = (this.sections.length > 1)?true:false;
           var i=0;
         	 for( i in this.sections){
         		 if(i == 0){
         			 htmlelement+=  this.sections[i].layout(true,this.feedbackType, this.feedbackScoringType, isSectionMore);
         		 }
         		 else{
         			 htmlelement+=  this.sections[i].layout(false,this.feedbackType, this.feedbackScoringType, isSectionMore);
         		 }
         	 }
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='<div class="pageSectionFooter">';
         	 
         	if(this.feedbackType == 'standard'){
         		htmlelement+= this.standardFeedbackLayout();
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
			 * sub category layout
			 */
      subCategoryLayout:function(){
      	var htmlelement="";
     	 htmlelement+='<h2 class="tophead2">Subcategories</h2>';
     	 htmlelement+='<div class="CheckBoxComponent">';
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
          * feedback layout for standard type
          * @returns {String} html element
          * */
         standardFeedbackLayout:function(){
        	var htmlelement='';
        	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+=' <div class="editGenFeed"><a id="genFbTxt'+this.idPrefix+this.id+'">Expand general feedback</a>';
         	 htmlelement+=' </div>';
         	 htmlelement+='<div class="generalFeedback" id="genFb'+this.idPrefix+this.id+'" style="display: none;">';
         	 htmlelement+='   <div class="rowPagesection">';
         	 
         	 htmlelement+= this.generalfeedbackLayout();
         	 
         	 htmlelement+='   </div>';
         	 htmlelement+='   <div class="rowPagesection">';
         	 
         	 htmlelement+= this.overallfeedbackLayout();
         	
         	 htmlelement+='   </div>';
         	 htmlelement+='</div>';
         	return htmlelement;
         },
         
         /**
          * feedback layout for rangebased and rangebased Subcategories type
          * @returns {String} html element
		 */
         rangeFeedbackLayout:function(){
        	 var htmlelement='<div id="rangeFeedback'+this.idPrefix+this.id+'">';
        	 htmlelement+= '<div class="pageSectionBody range-feedback">'; 
        	 htmlelement+= '<div class="headSection">';
        	 htmlelement+= '<h6 class="pull-left font14 inputhead">Feedback | </h6>';
        	 htmlelement+= '<h6 class="font14 tagtext"><a id="rangeCollapse_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Collapse range feedback</a></h6>';
        	 htmlelement+=' <div class="clear"></div>';
        	 htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Scoring: '+ this.feedbackScoringType +  ' </h6>';
        	 htmlelement+= '</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div id="rangeFeedback_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
   			 var showMinus=true;
	       	 if(this.ranges.length==1){
	       		showMinus=false; 
	       	 }
	       	 htmlelement+='<div  style="float: left; margin-top: -17px;"><span class="rangeFeedbackVales"> Min. points: </span><span id="min_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> '+this.minPoint+' </span> <span class="rangeFeedbackVales"> Max. points: </span><span id="max_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> '+this.maxPoint+' </span></div>';
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
        	 CheckBoxComponent.addEvent( "rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseRangedBasedFeedback );
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
         /**
          * Layouts component text editor in design mode
          * @returns {String} html element
          */
         editorLayout:function(){        	
        	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
        	 var htmlelement="";
        	 htmlelement+='<div class="rowPagesection firstRowPageSection">';
        	 htmlelement+='   <div class="colPageSection">';
        	 htmlelement+='       <div class="eachCol">';
        	 htmlelement+='           <a class="invisible">';
        	 htmlelement+='               <img src="img/getPicture.png" >';
        	 htmlelement+='            </a>';
        	 htmlelement+='       </div>';
        	 htmlelement+='  </div>';
        	 htmlelement+='   <div class="colPageSection">';
        	 htmlelement+='       <div>';
        	 htmlelement+='           <div class="editableDivTitle">';
        	 htmlelement+='               <h6 class="pull-right font10">ID# '+this.editor.id+'</h6>';
        	 htmlelement+='            </div>';
        	 htmlelement+='           <div contenteditable="true" data-placeholder="Enter text" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" id="'+(this.editor.id)+'"  data-maxlength="'+this.editor.maxLength+'" class="inputDummy inputDummyMaxWidth inputDummyQuestionStem " '+dataDivAttr+'>'+this.editor.text+'</div>';
        	 htmlelement+='       </div>';
        	 htmlelement+='   </div>';
        	 htmlelement+='</div>';
        	 
        	 return htmlelement;
         },
        
         /**
          * layouts component property pane in design mode
          * @returns {String}
          */
         propertyLayout:function(){
	    	 var htmlelement="";
	    	// htmlelement+='   Check Box Section';
	    	 htmlelement+='   <div class="head-info">';
	    	 htmlelement+='       <a id="checkBoxComponentHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon" ></a>Component: Check All That Apply';
	    	 htmlelement+='   </div>';
	    	 htmlelement+='   <div class="clear"></div>';
	    	 htmlelement+='   <div class="tabContent tabProContent">';
	    	 htmlelement+='	  		<label id="checkboxID"> ID# '+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'</label>';
	    	 htmlelement+='       	<div class="grid grid-2">';
	    	 htmlelement+='				<input type="checkbox" id="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+='				<label for="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Graded object</label>';          
        	 htmlelement+='			</div>';
        	 htmlelement+='			<div class="clear"></div>';
        	 htmlelement+='	  </div>';
        	 htmlelement+='  <div id="rbtnLabel" class="grid grid-2"> '; 
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
        	 htmlelement+='     <div class="componentTytle" id="isBranchedLabel_'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">'+isBranchedLbl+'</div>';
        	 htmlelement+='		<div class="componentTytle">';
        	 htmlelement+='			<a class="info-icon" id="answerTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" ></a>Answer type:';
        	 htmlelement+='		</div>';
        	 htmlelement+='	 </div>';
        	 htmlelement+='	 <div class="data_component">';
        	
        	 htmlelement+='			<span>';
        	 htmlelement+='				<input type="checkbox" id="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+='				<label for="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Accept any answer</label>'; 
        	 htmlelement+='			</span>';
	    	
	    	 htmlelement+='   			<div id="feedbackType'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';
	    	 htmlelement+='       	    <div class="head-info typeInput">';
	    	 htmlelement+='             	<a id="feedbackTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon"></a>Feedback Type:';
	    	 htmlelement+='        		</div>';
	    	 htmlelement+='       		<div class="tabContent tabProContent">';
	    	 htmlelement+='           		<div class="btn-group customDropdown" style="margin-bottom: 10px;">';
	    	 htmlelement+='                		<button data-toggle="dropdown" id="selectedFeedbackType" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	    	 htmlelement+='                  	  Standard<span class="caret caretDrop"></span>';
	    	 htmlelement+='                		</button>';
	    	 htmlelement+='                		<ul class="dropdown-menu">';
	    	 htmlelement+='                  	  <li id="standard'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Standard</a></li>';
	    	 htmlelement+='                  	  <li class="divider"></li>';
	    	 htmlelement+='                  	  <li id="rangedBased'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Ranged-based</a></li>';
	    	 htmlelement+='                  	  <li class="divider"></li>';
	    	 htmlelement+='                  	  <li id="rangedBasedSubcategories'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Ranged-based Subcategories</a></li>';
	    	 htmlelement+='                		</ul>';
	    	 htmlelement+='            		</div>';
	    	 htmlelement+='       		</div>';
	    	 htmlelement+='    		</div>';
	    	 htmlelement+='    <div class="clear"></div>';
	    	 
	    	 htmlelement+='   <div id="feedbackScoringType'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" >';
	    	 htmlelement+='        <div class="head-info typeInput">';
	    	 htmlelement+='            <a id="feedbackScoringTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon"></a>Feedback scoring:';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='       <div class="tabContent tabProContent">';
	    	 htmlelement+='      	<div class="radio">';
	    	 htmlelement+='           <input type="radio" value="allSelection" id="allSelection'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="allSelection">';
	    	 htmlelement+='           <label for="allSelection'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>All student-selection point values</label>';
	    	 htmlelement+='       	</div>';
	    	 htmlelement+='      	<div class="radio">';
	    	 htmlelement+='           <input type="radio" value="highestSelection" id="highestSelection'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="highestSelection">';
	    	 htmlelement+='           <label for="highestSelection'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span> Highest student-selection point value</label>';
	    	 htmlelement+='       	</div>';
	    	 htmlelement+='         <div class="btn-group customDropdown" style="margin-bottom: 10px;">';
	    	 htmlelement+='                <button data-toggle="dropdown" id="selectedFeedbackScoringType" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	    	 htmlelement+='                    Sum<span class="caret caretDrop"></span>';
	    	 htmlelement+='                </button>';
	    	 htmlelement+='                <ul class="dropdown-menu">';
	    	 htmlelement+='                    <li id="sumFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Sum</a></li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="averageFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Average</a></li>';
	    	 htmlelement+='                </ul>';
	    	 htmlelement+='         </div>';
	    	 htmlelement+='       </div>';
	    	 htmlelement+='   </div>';
	    	 htmlelement+='   <div id="studentOpts'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" class="studOptGrid">';
	    	 htmlelement+='  	<span id="">';
        	 htmlelement+=' 		<input type="checkbox" id="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+=' 		<label for="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Show points to students</label>'; 
        	 htmlelement+='		</span>';
        	 htmlelement+='  	<span id="showSubCHK'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';
        	 htmlelement+=' 		<input type="checkbox" id="showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+=' 		<label for="showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Hide subcategory properties from students</label>'; 
        	 htmlelement+='		</span>';
        	 htmlelement+='  	<span id="notApplicableOptionId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';
        	 htmlelement+=' 		<input type="checkbox" id="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+='			<label for="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Not applicable option<br><i style="font-size: 11px; margin-left: 15px;">Exempts remainder of subcategory</i></label>'; 
        	 htmlelement+='		</span>';
        	 htmlelement+='		<div id="awardMinMaxDiv'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	 htmlelement+='  		<span id="awardMaxSpan'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	 htmlelement+='   			<input type="radio"  value="awardMax" id="awardMax'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="awardMaxMin">';
        	 htmlelement+='   			<label for="awardMax'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award maximum points</label> <input type="radio" id="Radio2" name="displayBranchingMode">';        	 
        	 htmlelement+='			</span>';
        	 htmlelement+='  		<span id="awardMinSpan'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	 htmlelement+='   			<input type="radio" value="awardMin" id="awardMin'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="awardMaxMin">';
        	 htmlelement+='     		<label for="awardMin'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award minimum points</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
        	 htmlelement+='			</span>';
        	 htmlelement+='		</div>';
        	 htmlelement+='   </div>';
        	 
	    	 htmlelement+='    <div class="clear"></div>';
	    	 htmlelement+='   </div>';
	    	 htmlelement+='    <div class="head-info">';
	    	 htmlelement+='       <a  id="requiredQuestionId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon" ></a>Pre-requisite';
	    	 htmlelement+='   </div>';
	    	 htmlelement+='   <div class="clear"></div>';
	    	 htmlelement+='   <div class="tabContent tabProContent">';
	    	 htmlelement+='       <p>In order to move forward,\n student responses are:</p>';
	    	 htmlelement+='      <div class="radio">';
	    	 htmlelement+='              <input type="radio" value="Required" id="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
	    	 htmlelement+='           <label for="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span> Required</label>';
	    	 htmlelement+='       </div>';
	    	 htmlelement+='      <div class="radio">';
	    	 htmlelement+='               <input type="radio" value="Optional" id="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
	    	 htmlelement+='           <label for="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span> Optional</label>';
	    	 htmlelement+='       </div>';
	    	 htmlelement+='   </div>';

         	return htmlelement;
	     },
	     /**
	      * adds event hadlers for elements present in component property pane
	      */
	     afterPropertyLayout:function(){
	    	 CheckBoxComponent.addEvent( this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._populateComp );
	    	 CheckBoxComponent.addEvent( "checkBoxComponentHelpId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._openHelpModalForCheckBoxComponent);
	    	 CheckBoxComponent.addEvent( "requiredQuestionId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id,"click",this._openHelpModalForRequiredQuestionSelector);
	    	 CheckBoxComponent.addEvent("acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._acceptAnyAnswer);
     		 CheckBoxComponent.addEvent("gradadedObjectBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markGraded);
     		 CheckBoxComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
     		 CheckBoxComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
     		 CheckBoxComponent.addEvent("allSelection"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._feedBackScoringSelection);
    		 CheckBoxComponent.addEvent("highestSelection"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._feedBackScoringSelection);
     		 CheckBoxComponent.addEvent("standard"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._changeFeedbackType,{"feedbackType" : "standard"});
     		 CheckBoxComponent.addEvent( "rangedBased"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackType,{"feedbackType":"rangedBased"});
     		 CheckBoxComponent.addEvent( "rangedBasedSubcategories"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackType,{"feedbackType":"rangedBasedSubcategories"});
     		 CheckBoxComponent.addEvent( "sumFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"sum"});
     		 CheckBoxComponent.addEvent( "averageFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"average"});
     		 CheckBoxComponent.addEvent("notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOption); 
     		 CheckBoxComponent.addEvent("showPntToStud"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._showPointToStudent);
     		 CheckBoxComponent.addEvent("showSubToStud"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._showSubCatToStudent);
     		 CheckBoxComponent.addEvent("awardMax"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOptionValue);
     		 CheckBoxComponent.addEvent("awardMin"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOptionValue);
	     },
	     /**
	      * adds event hadlers for elements present in component editor property pane
	      */
	     afterEditorPropertyLayout:function(){
	    	 CheckBoxComponent.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
	    	 CheckBoxComponent.addEvent("insert_"+this.editor.id, "click", this._updateEditor );
	     },
	    
 	    /**
	      * layouts the editor property pane
	      */
	     editorPropertyLayout:function(prefix){
	    	
	    	 var editor = null;
	    	 switch(prefix){
		    	 case "E":
	    			editor=this.editor;
	    			break;
	    	 }
	    	// alert("this.editor.id : "+this.editor.id);
	    	 var htmlelement="";
	    	 htmlelement+='    <div class="tabContent tabProContent">';
	    	 htmlelement+='        <p>Component: Checkbox</p>';
	    	 htmlelement+='        <p id="elementid">ID# '+editor.id+'</p>';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="clear"></div>';
	    	 htmlelement+='    <div class="gap10"></div>';
	    	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
	    	 htmlelement+='        <a id="insertHelp'+editor.id+'"  class="info-icon" ></a>Insert a hyperlink:';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
	    	 htmlelement+='        <div class="form-group">';
	    	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
	    	 htmlelement+='            <input type="Text" placeholder="Enter Display Text"  id="linkText_'+editor.id+'">';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='        <div class="form-group">';
	    	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
	    	 htmlelement+='            <input type="Text" placeholder="Enter Link"  id="linkAddress_'+editor.id+'">';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='        <button id="insert_'+editor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
	    	 htmlelement+='        <div class="clear"></div>';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="clear"></div>';

         	return htmlelement;

	     },
	    
         /**
          * populate component text editor properties
          */
         populateEditorProperties:function(){	
        	$("#elementProperties").html(this.editorPropertyLayout(this.textBoxIdPrefix));
        	this.afterEditorPropertyLayout();
			
            $("#elementProperties").show();
			$("#properties").hide();
			$("#entryType").show();
			$("#activeHyperlink").text("");

            /*Need to put here code of MEDIA*/
            var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'E';
            var newMedia = new Media({id:compId});
            $("#mediaProperties").html(newMedia.layout());
            $("#mediaProperties").show();
            newMedia.afterLayout();
            util.checkMediaInEditMode();
        },
       
        /**
         * populate component properties
         */
        populateComp:function(){
        	
         	$("#properties").html(this.propertyLayout());
        	this.afterPropertyLayout();
        	$("#elementProperties").hide();
        	$("#properties").show();
            $("#mediaProperties").hide();
            $("#feedbackType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        	$("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        	$("#studentOpts").hide();
        	this.updateMinMaxForSubCat();
			if(this.graded==true){
				//$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger('click');
				$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
			}
			else{
				$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', false);
			}
			if(this.acceptAnyAnswer==true){
				$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger('click');
				$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);				
			}
			else{
				$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', false);
			}
			if(this.feedbackType == "standard"){
				$("#studentOpts"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
        		$("#selectedFeedbackType").html("Standard <span class='caret caretDrop'></span>");
        	}
        	else if(this.feedbackType == "rangedBased"){
        		$("#studentOpts"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
        		//$("#showPntToStud"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		$("#showSubCHK"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
        		$("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		
        		$("#selectedFeedbackType").html("Ranged-based <span class='caret caretDrop'></span>");
        	}else{
        		$("#studentOpts"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
        		//$("#showPntToStud"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		$("#showSubCHK"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
        		$("#notApplicableOptionId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
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
			
			if(this.mandatory==true){
				$('#optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
				}
			else{
				$('#optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
			}
			
			if(this.feedBackScoringSelectionType=="allSelection"){
				$('#allSelection'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
			}
			else{
				$('#highestSelection'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
			}
			
			if(this.showPointsToStudents==true){
				$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
			}
        	else{
        		$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	}
			if(this.hideSubCategoryToStudent==true){
        		$('#showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	}
        	else{
        		$('#showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	}
        	
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
        	
			$("#optionDropDownId").show();
        	if($("#optionDropDownId").parent().hasClass("open")){
        		$("#optionDropDownId").trigger("click");
        	}	
        	
			$("#componentOptionDropDownId").html(this.optionOrientationLayout());
			this.afterOptionOrientationLayout();
			this.populateAnswerOrientation();
				
        },
        /**
         * Function to check multiple choice option object
         * optionOrientation and set checked accordingly.
         * */
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
         * add check box component to page
         */
        addCheckBoxComponent:function(){
        	page.addCheckBoxComponent();
        },
        /**
         * creates copy of the current checkbox component
         * @param event
         */
        copyCheckBoxComponent : function(event){
            var	id = event.data.id;
            page.copyComponent(id);
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
         * @returns {CheckBoxComponent}
         */
        deserialize:function(jsonObj){
        	var subCategories=[];
        	var subCategoryRanges=[];
        	if(jsonObj.feedbackType =='rangedBasedSubcategories'){
    			var cnt = 0;
    			for (cnt in jsonObj.subCategories) {
    				var subCatObj = new CheckBoxSubCategory(jsonObj.subCategories[cnt]);
    				var editor = new Editor(jsonObj.subCategories[cnt].editor);
    				subCatObj.setEditor(editor);
    				subCategories.push(subCatObj);
    			}
    			var rcnt=0;
			    for(rcnt in jsonObj.subCategoryRanges){
				 var subCatRange = new CheckBoxSubCategoryRange(jsonObj.subCategoryRanges[rcnt]);
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
        	var sections = [];
         	 for( i in jsonObj.sections){
  	    		var sectionObj =new CheckboxComponentSection(jsonObj.sections[i]);
  	    		var editor = new Editor(jsonObj.sections[i].editor);
  	    		sectionObj.setEditor(editor);
  	    		sectionObj.setShowSectionLabels(jsonObj.sections[i].showSectionLabels);
  	    	 	var options =[];
  	        	var j=0;
  	        	 for( j in jsonObj.sections[i].options){
  	 	  	    	var optionObj =new Option(jsonObj.sections[i].options[j]);
  	 	  	    		var editor = new OptionEditor(jsonObj.sections[i].options[j].editor);
  	 	  	    		if(optionObj.type=='stud'){
  	 	  	    			var studentEditor = new Editor(jsonObj.sections[i].options[j].studentEditor);
  	 	  	    			optionObj.setStudentEditor(studentEditor);
  	 	  	    		}
  	 	  	    		var feedback = new Editor(jsonObj.sections[i].options[j].feedback);
  	 	  	    	    var pointsValueEditor=new NumericEditor(jsonObj.sections[i].options[j].pointsValueEditor);
  	 	  	    	    optionObj.setPointsValueEditor(pointsValueEditor);
  	 	  	    		optionObj.setEditor(editor);
  	 	  	    		optionObj.setFeedback(feedback);
  	 	  	    		
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
         	 
        	var compObj= new CheckBoxComponent(jsonObj);
        	compObj.setSections(sections);
        	compObj.setSubCategories(subCategories);
        	compObj.setSubCategoryRanges(subCategoryRanges);
        	
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
         * marks component to accept any answer
         * @param event
         */
	       acptAnyAnswer:function(){	   
	    	   var selectordiv=$('#'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).find('.tickCheck');
	    	   var  length = selectordiv.length;
	    	   if($("#acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){	    		    		    		
	    		   for( var i=0;i<=length;i++){
	   			   		$("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','hidden');
	   			   }
	    		   this.acceptAnyAnswer =true;
	    		   $("#feedbackType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
	    	   }else{
	    			 for( var i=0;i<=length;i++){
	    				 $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','visible');
	    			 }
	    			this.acceptAnyAnswer =false;
	    			$("#feedbackType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
	    			$("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
	    			$("#studentOpts"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
	    			$("#standard"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
	    			$("#sumFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
          			
	    	   }
	    	   var i=0;
	    	   for(i in this.sections){
	    		   var j=0;
	  	    	 	for(j in this.sections[i].options){
	  	    			this.sections[i].options[j].setRight(true);
	  	    			$("#wrong_"+this.sections[i].options[j].sectionId+this.sections[i].options[j].id).removeClass("active");
	  	    			$("#right_"+this.sections[i].options[j].sectionId+this.sections[i].options[j].id).addClass("active");
	  	    		}
	    	   }
	     },
	     /**
	      * updates editor properties
	      */
	     updateEditor:function(){	
	 		this.editor.linkText=$("#linkText_"+this.editor.id).val();	 		
	 		var url=$("#linkAddress_"+this.editor.id).val();	 		
	 		
			//validate URL with format like: "http://www.google.com/";
			if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
				if($("#linkText_"+this.editor.id).val() != ""){
					if(url.slice(-1)==="/")
		 			{
		 			url=url.substring(0,url.length-1);
		 			}
					this.editor.linkAddress=url;
					util.evaluateUrl(this.editor.linkAddress, this.editor.linkText, this.editor.id);
				}
				else{
					var currentEditor = ("linkText_"+this.editor.id);
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Please enter display text",
		  	   			    	  closeActionEvent:function(){
		  	   			    		  $('#'+currentEditor).trigger("focus");
		  	   			    		  $('#'+currentEditor).text("");
		  	   			    	  }
		  	   			      }).getWarningModal();
				}
				
			} else {
				var currentEditor = ("linkAddress_"+this.editor.id);
				new Modal(
	  	   			      {
	  	   			    	  id : 1,headingText : "Validation Error",
	  	   			    	  containtText : "Please enter valid Url",
	  	   			    	  closeActionEvent:function(){
	  	   			    		  $('#'+currentEditor).trigger("focus");
	  	   			    		  $('#'+currentEditor).text("");
	  	   			    	  }
	  	   			      }).getWarningModal();
			}
	 	},
		
	     /**
	      * opens help modal popup for check box component
	      * @param event
	      */
	     openHelpModalForCheckBoxComponent : function(event){
	    	 new Modal({id : 1,headingText : message.getCheckAllThatApplyHeading(),containtText : message.getCheckAllThatApplyMsg()}).openHelpModal();
	     },
	     
	     /**
	      * opens help modal popup for Character Limit
	      * @param event
	      */
	     openHelpModalForCharLimit:function(event){
	    	 new Modal({id : 1,headingText : message.getcharLimitHeader(),containtText : message.getcharLimitHeader()}).openHelpModal(); 
	     },
	    
	     /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
         afterLayout:function(){
        	    $("#properties").html(this.propertyLayout());
        	    this.afterRangeFeedbackLayout();
                this.updateMinMaxPoint();
        		this.populateComp();    
        		CheckBoxComponent.addEvent( "genFbTxt"+this.idPrefix+this.id, "click", this._toggleFeedback );
        		CheckBoxComponent.addEvent( this.editor.id, "click", this._populateEditorProperties );
        		this.editor.afterEditorlayout();
        		CheckBoxComponent.addEvent( this.generalFeedback.id, "click", this._populateGFEditorProperties );
        		CheckBoxComponent.addEvent( this.overallFeedback.id, "click", this._populateOFEditorProperties );
        		CheckBoxComponent.addEvent( this.editor.id, "blur", this._update );
        		CheckBoxComponent.addEvent( this.generalFeedback.id, "blur", this._update );
        		CheckBoxComponent.addEvent( this.overallFeedback.id, "blur", this._update );
        		
        		//CheckBoxComponent.addEvent( "quest_plus_"+this.id, "click", this._addCheckBoxComponent);
        		CheckBoxComponent.addEvent( "quest_plus_"+this.id, "click", this._copyCheckBoxComponent,{id : this.id});
        		CheckBoxComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        		
        		CheckBoxComponent.addEvent("acptAnyAnsBtnId", "click", this._acceptAnyAnswer);
        		CheckBoxComponent.addEvent("gradadedObjectBtnId", "click", this._markGraded);
        		CheckBoxComponent.addEvent("", "click", this._markMandatory);
        		CheckBoxComponent.addEvent("optionsRadios2", "click", this._markMandatory);
        		CheckBoxComponent.addEvent( this.editor.id, "paste", this._filter);
        		CheckBoxComponent.addEvent( this.generalFeedback.id, "paste", this._filter );
        		CheckBoxComponent.addEvent( this.overallFeedback.id, "paste", this._filter );
        		CheckBoxComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseComponent);
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
        		 if(this.state=="collapse"){
            		 this.collapseComponent();
            	 }
        		 
        		 var j=0;
       		  	 for( j in this.ranges){
            		 this.ranges[j].afterLayout();
            	 }
        		 
        		/* if(this.options.length==1){
        			 var $options = $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).find(".pageInnerSection").find(".pageSectionBody").find(".tickCheck").last();
        			 $options.find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
        		 }*/
                 $('#formToolCanvasId').sortable({
                    items: '.pageSection',
                    handle: '.dragComp'
                });
         },
         /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLayout:function(){
        	this.showPointsToStudents=true;
        	 
        	var htmlelement='';
           
            var overallFeedback = util.getImageLayout(this.overallFeedback.text);
            overallFeedback = util.getVideoLayout(overallFeedback);

            var generalFeedback = util.getImageLayout(this.generalFeedback.text);
            generalFeedback = util.getVideoLayout(generalFeedback);

       		var hidden = (overallFeedback =='' || overallFeedback =='&nbsp;') && (generalFeedback=='' || generalFeedback=='&nbsp;') ?'invisible' : '';
       		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection">';
       		
       	 
       		if(this.feedbackType == 'rangedBasedSubcategories'){
       			if(this.acceptAnyAnswer){
	    			htmlelement+='<div  class="acceptAnyAnsBanner acceptAnyAnsBannerInstructor prevQuestInstructor" style="margin-left:50px;">This question accepts all answers.</div>';
	    		}
       			var k = 0;
	       		for(k in this.subCategories){
					htmlelement += this.instructorSectionLayout(this.subCategories[k]);					
	       		}
         	}
       		else{
       			if(this.acceptAnyAnswer){
	    			htmlelement+='<div  class="acceptAnyAnsBanner acceptAnyAnsBannerInstructor prevQuestInstructor" style="margin-left:50px;">This question accepts all answers.</div>';
	    		}
       			if(this.notApplicable){
	   				htmlelement +='<div class="prevQuest instructcheckNA prevQuestInstructor"><input type="checkbox" class="css-checkbox" disabled id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
	   			}
	       		var i=0;
	       		for(i in this.sections){
	       			htmlelement +=this.sections[i].instructorLayout(this.graded,this.answerOptionOrientation,this.acceptAnyAnswer, this.feedbackType, this.feedbackScoringType, this.showPointsToStudents);
	           	}
       		}
       		htmlelement +='</div>';
    		if( this.feedbackType == 'standard') {
    			htmlelement +='<div class="overallFeedOpen '+hidden+'  overallFeedOpenAlign">';

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
    	   			subCategoryRangeLayout +=this.subCategoryRanges[y].instructorLayout(this.feedbackScoringType);
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
       		//TODO:[debasmita] Media ?
       		return htmlelement.replace(/&nbsp;/gi,'');
         },
         instructorSectionLayout:function(subCategory){
          	var sectionLayout='';      	
          	if(subCategory != null)	{	
      			if(subCategory.sectionIds.length>0){
 					sectionLayout +='<div action="#" class="headTxt answerTick correct-2"><b>'+subCategory.editor.text+'</b> </div>';
 					if(subCategory.notApplicable){
 						sectionLayout +='<div class="prevQuest prevQuestInstructor instructcheckNA"><input type="checkbox" class="css-checkbox" disabled id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
 						sectionLayout +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
 						
 		   			}
      			}
      		}
 	   		var k=0;
 	   		for(k in this.sections){
 	   			sectionLayoutForMode = this.sections[k].instructorLayout(this.graded,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType,this.feedbackScoringType,this.showPointsToStudents);
 	   			if(subCategory != null)	{	
    					if(this.sections[k].subCategoryId == subCategory.id) {
 		   				sectionLayout +='<div class="col-lg-10" >';
 		   				sectionLayout +='<div class="table-responsive tbl_scroll tbl-style">';
 		   				sectionLayout += sectionLayoutForMode;
 		   				sectionLayout +='</div>';
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
	   			rangeFeedbackOuterHtml +='	<div><strong>Range-based feedback: </strong></div><br>';
	   			rangeFeedbackOuterHtml +='	<div style="padding-left:20px;"><i> Feedback is calculated by the '+ this.feedbackScoringType+' of all selections.</i></div><br>';
	       		var indx=0;
	       		var rangeCount = 0;
	       		for( indx in this.ranges){        			
	       			this.ranges[indx].rangeFeedbackEditor.text = util.getImageLayout(this.ranges[indx].rangeFeedbackEditor.text);
	                this.ranges[indx].rangeFeedbackEditor.text = util.getVideoLayout(this.ranges[indx].rangeFeedbackEditor.text);
	            	 if( this.ranges[indx].minRangeEditor.text != '' && this.ranges[indx].maxRangeEditor.text != '' && this.ranges[indx].rangeFeedbackEditor.text != '' ) {
	            		 rangeFeedbackHtml += '<div class="rowPagesection">';
	            		 rangeFeedbackHtml += '	<div class="colPageSection boldclass minColPic2">'+this.ranges[indx].minRangeEditor.text+' - '+this.ranges[indx].maxRangeEditor.text+' pts.</div>';
	            		 rangeFeedbackHtml += '	<div class="colPageSection secondColPic"><strong>Feedback: </strong>'+this.ranges[indx].rangeFeedbackEditor.text+'</div>';
	            		 rangeFeedbackHtml += '</div>';
	            		 rangeFeedbackHtml += '<div class="clear"></div>';
	             	 } 
	       			 rangeCount++;
	           	}
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
          * @returns {String}
          */
	      studentLayout:function(){
	        	var htmlelement='';
	        	/* check for branching to show/hide */
	        	var attachClass = ''; 	        	
	        	var orientationClass=(this.answerOptionOrientation==3)?"":"rowPagesectionStudent";
	        	if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
	        		attachClass = 'hideElement';
	        	}else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
	        		attachClass = 'hideElement';
	        	}	        	
	     		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="mainQuestionSection  '+attachClass+'" >';
	     		var i=0;
	     		
	     		if( this.feedbackType == 'rangedBasedSubcategories') {
     				for(k in this.subCategories){
		     			if(this.subCategories[k].sectionIds.length>0){
		     				if(!this.hideSubCategoryToStudent){
		     				  htmlelement +='<div class="prevQuest" >';
		     				  htmlelement +='<div action="#" class="stdQueLabel" id="subCatLabel'+this.subCategories[k].editor.id+'"><b>'+this.subCategories[k].editor.text+'</b> </div>';
		     				  htmlelement +='</div>';
		   					  htmlelement +='<div class="clear"></div>';		
		     				}
		     				if(this.subCategories[k].notApplicable){		 
		     					 var checkproperty=this.subCategories[k].notApplicableStudentResponse? "checked='checked'":"";
		     					htmlelement +='<div class="prevQuest instructcheckNA" ><input '+checkproperty+' type="checkbox" class="css-checkbox"  value = "'+this.subCategories[k].id+'" id="notApplicableSubcategory_'+this.subCategories[k].editor.id+'" />';
		    		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="notApplicableSubcategory_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
		 		   			}
    		   			}
		     			for( i in this.sections){
	    		   			if(this.sections[i].subCategoryId == this.subCategories[k].id) {
	    		   				htmlelement +=this.sections[i].studentLayout(this.graded,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, this.showPointsToStudents, this.feedbackScoringType, this.hideSubCategoryToStudent,this.subCategories[k].notApplicableStudentResponse);
	    	   				}
		     			}
		  	   		}
		     	}
		 		else {	
		 			if(this.feedbackType == 'rangedBased'){
		 				 var checkproperty=this.notApplicableStudentResponse? "checked='checked'":"";
		 				if(this.notApplicable){
	     					htmlelement +='<div class="prevQuest instructcheckNA" ><input type="checkbox" '+checkproperty+' class="css-checkbox"    id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
	    		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
	 		   			}
		 			}
		 			for( i in this.sections){
		 				htmlelement +=this.sections[i].studentLayout(this.graded,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, this.showPointsToStudents, this.feedbackScoringType, this.hideSubCategoryToStudent, this.notApplicableStudentResponse);
		 			}
				}

	 			 htmlelement +='</div>';
	 			 
	 			 htmlelement +='<div class="clear"></div>';
	 			 
	 			/*display total score in student side start */
			   	htmlelement +='<div id="stdSideCheckallScore_'+this.id+'" class="container">';
			   	htmlelement +='  <div class="row" style="padding-top:10px;">';
			   	htmlelement +='     <div><strong class="stdScoreTypeText"></strong></div>';
			   	htmlelement +='     <div class="clear"></div>';
			   	htmlelement +='     <div class="stdScorePointText"></div>';
			   	htmlelement +='  </div>';	   		
			   	htmlelement +='</div>';
			   	/*display total score in student side end */
	         	  		
	     		htmlelement+='</div>';
	     		htmlelement+='</div>';
	     		return htmlelement;
	      },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterStudentLayout:function(){
			var sectionBranchedlen=0;
        	 CheckBoxComponent.addEvent("demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "change", this._updateStudentResponse,{elementId:"demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id});
        	 var i=0;
        	 if(this.feedbackType == "standard" || this.feedbackType == "rangedBased"){
        		 /*if(this.notApplicableStudentResponse){
        			$("#demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        		 }*/
        		 
        		 
	    		 for( i in this.sections){
					  if(this.sections[i].isBranched){
	       			   sectionBranchedlen++;
	       			 }
	          		this.sections[i].afterStudentLayout(this.notApplicableStudentResponse);
	          	 } 
         	 }
        	 else{
	      		for(k in this.subCategories){
	    			CheckBoxComponent.addEvent("notApplicableSubcategory_"+this.subCategories[k].editor.id, "change", this._updateStudentResponse,{scaleType:'M',elementId:"notApplicableSubcategory_"+this.subCategories[k].editor.id,subCategoryId:this.subCategories[k].id});
	   				var j=0;
	   				for(j in this.sections){
						 if(this.sections[i].isBranched){
	       			   sectionBranchedlen++;
	       			 }
		       			if(this.sections[j].subCategoryId == this.subCategories[k].id){
		       				this.sections[j].afterStudentLayout(this.subCategories[k].notApplicableStudentResponse);
		       			}
		   			}
	   			 }
	      	}
        	//Points are not displayed if student navigates to another part
 			if(this.isBranched){
 				if(this.sections.length>0 && this.isStudentAnswered()){
 					this.sections[0].options[0].displayTotalScoreStudentSide(this);
 				}	
    		}
 			else
 			{
 				if(sectionBranchedlen>0 && this.feedbackType!="standard"){
					this.sections[0].options[0].displaySectionScore(this);
     			 }
 			}	
         },
         /**
          * update student Response
          */
           updateStudentResponse:function(event){
        	 console.log("check mapping update response cta compo");
         	  var checkBoxElement=$("#"+event.data.elementId);
         	  if (this.feedbackType === 'rangedBased'){
 	       		   if(checkBoxElement.prop("checked") == true || checkBoxElement.prop("checked") == 'true'){
 	       			 this.notApplicableStudentResponse=true;
 	       		   }else{
 	       			 this.notApplicableStudentResponse=false;
 	       		   }
 	       		   var i=0;
 	       		   for(i in this.sections){
	 	        		this.sections[i].disableStudentSelection(this.notApplicableStudentResponse);
		 	       		if(this.isBranched || this.sections[i].isBranched){
		 	       			this.sections[i].options[0].checkMapping(this, this.notApplicableStudentResponse);
		 	       		}
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
      					this.subCategories[i].updateStudentResponse(flag);
  						var k=0;
      		       		for(k in this.sections){
      		       			if(this.sections[k].subCategoryId == subCatId){
      		       				this.sections[k].disableStudentSelection(flag);
	      		       			if(this.isBranched || this.sections[k].isBranched){
	    		 	       			this.sections[k].options[0].checkMapping(this, flag);
	    		 	       		}
      		       			}
      		   			}
      					break;
      				  }
      			   }
      			   
 	       	   }
         	  
         	 if(this.isBranched){
  				if(this.sections.length>0 && this.isStudentAnswered()){
  					this.sections[0].options[0].displayTotalScoreStudentSide(this);
  				}
  				
     		}
 	       	   question.updateProgressBar();
          },
         /**
          * layouts in check my work status mode
          * @returns {String}
          */
         checkMyWorkLayout:function(){        	
        	 var cssclass=this.mandatory?"compulsry":"notcompulsry";
        	 var htmlelement='';  
        	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
        	 	htmlelement +=' <div class="mainQuestionSection">';
        		htmlelement +=' <div class="prevQuest"><span class="'+cssclass+'">*</span><div class="stdQueLabel">'+this.editor.text+'</div></div>';
        		htmlelement +='<div class="prevQuestOpt">';
        		var i=0;
        		for( i in this.options){
        			htmlelement +=this.options[i].CheckMyWorkLayout();
            	}
        		htmlelement +='</div></div></div> ';
        	return htmlelement;
         },
         /**
          * builds the layout for post Submission Review mode
          * @returns {String} html element
          */
         postSubmissionReviewLayout:function(){
				var htmlelement = '';
				/* check for branching to show/hide */
	        	var attachClass = '';        	
	        	if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
	        		attachClass = 'hideElement';
	        	}else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
	        		attachClass = 'hideElement';
	        	}
				var totalPoints = 0;
				var totalPointsSubcat = 0;
				var subCatScoreHtml = '';
				var scoreHtm = '';
				var rangeBasedNACheck = false;  // range base NA check for avoiding avg calculation as we directly catch min/max
				var rangeSubCatFeedbackHtml = '';
	     		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="mainQuestionSection rowPagesectionStudent '+attachClass+'  " >';
	     		htmlelement+='';
	     		var i=0;
	     		if( this.feedbackType == 'rangedBasedSubcategories') {
     				for(k in this.subCategories){
     					totalPointsSubcat = 0;
     					var NAflag=false;
		     			if(this.subCategories[k].sectionIds.length>0){
		     				if(!this.hideSubCategoryToStudent){
		     					htmlelement +='<div class="prevQuest" >';
		   					    htmlelement +='<div action="#" class="stdQueLabel correct-2"><b>'+this.subCategories[k].editor.text+'</b> </div>';
		   					    htmlelement +='</div>';
		   					    htmlelement +='<div class="clear"></div>';		
		     				}
		     				if(this.subCategories[k].notApplicable){
		     					if(this.subCategories[k].notApplicableStudentResponse)		     					
		     						htmlelement +='<div class="prevQuest instructcheckNA" ><input checked disabled type="checkbox" class="css-checkbox "   value = "'+this.subCategories[k].id+'" id="notApplicableSubcategory_'+this.subCategories[k].editor.id+'">';
		     					else
		     						htmlelement +='<div class="prevQuest instructcheckNA" style=""><input disabled type="checkbox" class="css-checkbox "   value = "'+this.subCategories[k].id+'" id="notApplicableSubcategory_'+this.subCategories[k].editor.id+'">';
		    		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="notApplicableSubcategory_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
		 		   			}
		     				if(this.subCategories[k].notApplicableStudentResponse)
	     					{
		     					var z=0;
		     					for (z in this.subCategoryRanges){
				   					if (this.subCategories[k].id == this.subCategoryRanges[z].subCategoryId){
				   							totalPointsSubcat=this.subCategories[k].awardPoints=='Max'?this.subCategoryRanges[z].maxPoint :this.subCategoryRanges[z].minPoint;
				   						}
				   					}
		     					NAflag=true;
	     					}
		     				for( i in this.sections){
		    		   			if(this.sections[i].subCategoryId == this.subCategories[k].id) {
		    		   				htmlelement +=this.sections[i].studentLayout(this.graded,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, this.showPointsToStudents, this.feedbackScoringType, this.hideSubCategoryToStudent, this.subCategories[k].notApplicableStudentResponse);
		    		   				if(!NAflag)
		    		   					totalPointsSubcat += this.sections[i].calculatePoints(this.feedBackScoringSelectionType);
		    		   			}
			     			}
			     			totalPoints += totalPointsSubcat;
			     			if(this.feedbackScoringType == "average" && !NAflag){
			     				totalPointsSubcat = totalPointsSubcat / this.subCategories[k].sectionIds.length;
				   				var multiplier = Math.pow(10, 2);
				   				totalPointsSubcat = Math.round(totalPointsSubcat * multiplier) / multiplier;
				 			}
			     			else
			     			{
			     				var multiplier = Math.pow(10, 2);
				   				totalPointsSubcat = Math.round(totalPointsSubcat * multiplier) / multiplier;
			     			}
			     			this.subCategories[k].score = totalPointsSubcat;
			     			scoreHtm='';
			     			scoreHtm ='<div class="container">';
			     			scoreHtm +='<div class="row" style="padding-top:10px;">';
			     			scoreHtm +='<div class="feedbackTxt">';
			     			scoreHtm +='<strong>'+this.subCategories[k].editor.text+'</strong>';
			     			scoreHtm +='</div>';
			     			//scoreHtm +='<div><strong>  </strong></div>';
			     			scoreHtm +='<div class="clear"></div>';
			     			scoreHtm +='<div> Total Score : '+ totalPointsSubcat +' pts.</div>';
			     			scoreHtm +='</div>';
			     			scoreHtm +='</div>';
					   		
			     			htmlelement+='</div>';
			     			rangeSubCatFeedbackHtml='';
			     			rangeSubCatFeedbackHtml += scoreHtm;
					   		rangeSubCatFeedbackHtml +='<div class="clear"></div>';
					   		rangeSubCatFeedbackHtml +='<div class="container">';
					   		rangeSubCatFeedbackHtml +='<div class="row">';
					   		rangeSubCatFeedbackHtml +='<div class="rangeFeedOpen rangeFeedScalePost">';
					   		rangeSubCatFeedbackHtml +='	</br><div><strong>Range-based feedback: </strong></div>';
					   		rangeSubCatFeedbackHtml +='	</br><div style="padding-left:20px;"><i>Feedback is calculated by the '+ this.feedbackScoringType +'  of all selections.</i></div></br>';
				     		var j=0;
				     		var subCatRangeCount = 0;
				     		for (l in this.subCategoryRanges){
			   					if (this.subCategories[k].id == this.subCategoryRanges[l].subCategoryId){
				   					for (j in this.subCategoryRanges[l].ranges){
				   						if(this.subCategoryRanges[l].ranges[j].minRangeEditor.text != '' && this.subCategoryRanges[l].ranges[j].maxRangeEditor.text != '' && this.subCategoryRanges[l].ranges[j].rangeFeedbackEditor.text != '' ) {
						     				var showFlag=(totalPointsSubcat >= parseFloat(this.subCategoryRanges[l].ranges[j].minRangeEditor.text) && totalPointsSubcat <=this.subCategoryRanges[l].ranges[j].maxRangeEditor.text);
						     				if(showFlag){
						     					rangeSubCatFeedbackHtml +='<div>';
						     					rangeSubCatFeedbackHtml +='	<div class="colPageSection minColPic1">'+this.subCategoryRanges[l].ranges[j].minRangeEditor.text+ '  -  ' +this.subCategoryRanges[l].ranges[j].maxRangeEditor.text+' pts.</div>';
					
					                            var rangeFeedbackText = util.getImageLayout(this.subCategoryRanges[l].ranges[j].rangeFeedbackEditor.text);
					                                rangeFeedbackText = util.getVideoLayout(rangeFeedbackText);
					
				                                rangeSubCatFeedbackHtml +='	<div class="colPageSection secondColPic feedbackTxt"><strong>Feedback: </strong>'+rangeFeedbackText+'</div>';
				                                rangeSubCatFeedbackHtml +='</div>';
				                                rangeSubCatFeedbackHtml +='<div class="clear"></div>';
						     					subCatRangeCount++;
						     				}
						     			}
				   					}
			   					}
				     		}
			
				     		rangeSubCatFeedbackHtml +='</div>';
				     		rangeSubCatFeedbackHtml +='</div>';
				     		rangeSubCatFeedbackHtml +='</div>';
				     		
				     		if(subCatRangeCount != 0){
			     				subCatScoreHtml += rangeSubCatFeedbackHtml;
			     			}
    		   			}
		  	   		}
		     	}
		 		else {	
		 			if(this.feedbackType == 'rangedBased'){
		 				var checkproperty=this.notApplicableStudentResponse? "checked='checked'":"";
		 				if(this.notApplicable){
	     					htmlelement +='<div class="prevQuest instructcheckNA"><input disabled '+checkproperty+' type="checkbox" class="css-checkbox"    id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
	    		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
	 		   			}
		 			}
		 			var NAflag=false;
		 			if(this.notApplicableStudentResponse)
 					{     					    					
		 				totalPoints=this.awardMaximum?this.maxPoint :this.minPoint;		   						
     					NAflag=true;
     					rangeBasedNACheck = true;
 					}
		 			for( i in this.sections){
		 				htmlelement +=this.sections[i].studentLayout(this.graded,this.answerOptionOrientation,this.acceptAnyAnswer,this.feedbackType, this.showPointsToStudents, this.feedbackScoringType, this.hideSubCategoryToStudent, this.notApplicableStudentResponse);
		 				if(!NAflag)
		 					totalPoints += this.sections[i].calculatePoints(this.feedBackScoringSelectionType);
		 			}
		 			
		 			
		 			//add code for sectionwise feedback 
				}
	     		if(this.feedbackScoringType == "average" && !rangeBasedNACheck){
	 				totalPoints = totalPoints / this.sections.length;
	   				var multiplier = Math.pow(10, 2);
	   				totalPoints = Math.round(totalPoints * multiplier) / multiplier;
	 			}
	     		else
	     		{
	     			var multiplier = Math.pow(10, 2);
	   				totalPoints = Math.round(totalPoints * multiplier) / multiplier;
	     		}
	 			 htmlelement +='</div>';
	 			 
	 			 htmlelement +='<div class="clear"></div>';
	         	  		
	     		htmlelement+='</div>';
	     		//subcategory feedback display
	     		if(subCatScoreHtml != ""){
	     			htmlelement += subCatScoreHtml;
	     		}
	     		if(this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories'){
		     		//Total score display
	     			var totalScoreHtml = '';
	     			totalScoreHtml +='<div class="container">';
	     			totalScoreHtml +='<div class="row" style="padding-top:10px;">';
	     			totalScoreHtml +='<div><strong> Overall Range-based feedback: </strong></div> <br>';	     			
	     			totalScoreHtml +='<div class="clear"></div>';
	     			totalScoreHtml +='<div> Total Score : '+ totalPoints +' pts.</div>';
	     			totalScoreHtml +='	</br><div style="padding-left:20px;"><i>Feedback is calculated by the '+ this.feedbackScoringType +'  of all selections.</i></div></br>';
	     			totalScoreHtml +='</div>';
	     			totalScoreHtml +='</div>';
			   		
		     		//htmlelement+='</div>';
		     		
			   		var rangeFeedbackHtml = '';
		 			rangeFeedbackHtml +='<div class="clear"></div>';
		 			rangeFeedbackHtml +='<div class="container">';
		 			rangeFeedbackHtml +='<div class="row">';
		 			rangeFeedbackHtml +='<div class="rangeFeedOpen rangeFeedScalePost">';
		 			//rangeFeedbackHtml +='	</br><div><strong>Range-based feedback: </strong></div>';
		     		var j=0;
		     		var rangeCount = 0;
		     		for( j in this.ranges){
		     			if( this.ranges[j].minRangeEditor.text != '' && this.ranges[j].maxRangeEditor.text != '' && this.ranges[j].rangeFeedbackEditor.text != '' ) {
		     				var showFlag=(totalPoints >= parseFloat(this.ranges[j].minRangeEditor.text) && totalPoints <=this.ranges[j].maxRangeEditor.text);
		     				if(showFlag){
		     					rangeFeedbackHtml +='<div>';
			     				rangeFeedbackHtml +='	<div class="colPageSection minColPic1">'+this.ranges[j].minRangeEditor.text+ '  -  ' +this.ranges[j].maxRangeEditor.text+' pts.</div>';
	
	                            var rangeFeedbackText = util.getImageLayout(this.ranges[j].rangeFeedbackEditor.text);
	                                rangeFeedbackText = util.getVideoLayout(rangeFeedbackText);
	
			     				rangeFeedbackHtml +='	<div class="colPageSection secondColPic feedbackTxt"><strong>Feedback: </strong>'+rangeFeedbackText+'</div>';
			     				rangeFeedbackHtml +='</div>';
			     				rangeFeedbackHtml +='<div class="clear"></div>';
		     					rangeCount++;
		     				}
		     			}
		         	}
		     		rangeFeedbackHtml +='</div>';
		     		rangeFeedbackHtml +='</div>';
		     		rangeFeedbackHtml +='</div>';
		     		if( rangeCount > 0 ) {
		     			htmlelement += totalScoreHtml;
		     			htmlelement += rangeFeedbackHtml; 
		     		}
	     		}
	   				     		
				if(POLICY_FEEDBACK == 'feedback')
				{
					var feedback = '<div>'+this.overallFeedback.text+this.generalFeedback.text+'</div>';
					var hidden = $(feedback).text().trim().length==0 ?'invisible' : '';
					htmlelement += '<div class="overallFeedOpen '+hidden+' overallFeedOpenAlign">';

					/*var overallFeedback = this.overallFeedback.text;*/
                    var overallFeedback = util.getImageLayout(this.overallFeedback.text);
                        overallFeedback = util.getVideoLayout(overallFeedback);
                        overallFeedback = overallFeedback.replace(/\Â/g, " ");

                    /*var generalFeedback = this.generalFeedback.text;*/
                    var generalFeedback = util.getImageLayout(this.generalFeedback.text);
                        generalFeedback = util.getVideoLayout(generalFeedback);
					    generalFeedback = generalFeedback.replace(/\Â/g, " ");

					htmlelement += ' <strong>Overall feedback:</strong>'
							+ overallFeedback + '</br>' + generalFeedback + '</div>';
					htmlelement += '</div>';
				}
				// TODO:[debasmita] Media ?
				return htmlelement.replace(/&nbsp;/gi,'');
          },
          /**
			 * show correct/wrong answers marked by author in design mode
			 */
         showCorrectAnswers:function(){
          var i=0;
       	  for( i in this.options){    		
          		 this.options[i].showCorrectAnswers();
          		} 
         },
         /**
          * show correct/wrong answers marked by student in test mode
          */
         showAnswers:function(){
        	 var i=0;
       	  for( i in this.options){    		
           		 this.options[i].showAnswers();
           		};
         },
         /**
          * calculates Total Score
          */
         calculateScore1:function(){
        	 var totalCorrectAnswers=0;
    		 var i=0;
    		 for( i in this.options){    		
    			 totalCorrectAnswers +=this.options[i].isRight()?1:0;
           	 };
           	 var weightage = 1/totalCorrectAnswers;
           	 var totalCrctAnsrGvnByStdnt =0;
           	 var j=0;
           	 for( j in this.options){    		
           		if(this.options[j].isRight() && this.options[j].isStudentResponse())
           			totalCrctAnsrGvnByStdnt++;
          	 };
          	 var totalWrngAnsrGvnByStdnt=0;
          	 var k=0;
          	 for( k in this.options){    		
          		if(!this.options[k].isRight() && this.options[k].isStudentResponse())
          			totalWrngAnsrGvnByStdnt++;
         	 };
        	 if(this.acceptAnyAnswer && this.graded){
        		 if(totalCrctAnsrGvnByStdnt>0){
        			 return 1;
        		 }else{
        			 return 0;
        		 }
        		
        	 }else if(!this.acceptAnyAnswer && !this.graded){
        		 //No scoring
        	 }else if(this.acceptAnyAnswer && !this.graded){
        		 // No Scoring
        	 }else if(!this.acceptAnyAnswer && this.graded){
        		
              	 var totalScore=(totalCrctAnsrGvnByStdnt*weightage) -(totalWrngAnsrGvnByStdnt*weightage);
              	 if(isNaN(totalScore) || totalScore<0 ){
          			totalScore=0;
          		 }
        		return totalScore;
        	 }
         },
         calculateScore:function(){
        	 var totalCorrectAnswers=0;
        	 var i=0;
    		 for( i in this.sections){
    			 var j=0;
    			 for( j in this.sections[i].options){
    				 totalCorrectAnswers +=this.sections[i].options[j].isRight()?1:0;
    			 }
           	 }
    		 var weightage = 1/totalCorrectAnswers;
           	 var totalCrctAnsrGvnByStdnt =0;
           	var totalWrngAnsrGvnByStdnt=0;
           	 var k=0;
           	 var sectionResponses=0;
           	var totalScore=0;
            var visibleSections=0;
           	for( k in this.sections){  
           		var l=0; var count=0;
           		for( l in this.sections[k].options){
           		if(this.sections[k].options[l].isRight() && this.sections[k].options[l].isStudentResponse()){
           			totalCrctAnsrGvnByStdnt++;    
           			if(count==0)
           				count++;
           		}
           		
           		if(!this.sections[k].options[l].isRight() && this.sections[k].options[l].isStudentResponse())
           			totalWrngAnsrGvnByStdnt++;
           		}
           		if(this.sections.length>1 && (!this.acceptAnyAnswer && this.graded))
       			{       
           			var totalSecScore=0;
           			 var n=0;
           			
           			
           			totalCorrectAnswers=0;
           			 for( n in this.sections[k].options){
           				 totalCorrectAnswers +=this.sections[k].options[n].isRight()?1:0;
           			 }
           			weightage = (1/this.sections.length)/totalCorrectAnswers;
           			totalSecScore=(totalCrctAnsrGvnByStdnt*weightage) -(totalWrngAnsrGvnByStdnt*weightage);
           			if(totalWrngAnsrGvnByStdnt>=totalCrctAnsrGvnByStdnt)
           				totalSecScore=0;
           			totalScore = parseFloat(totalScore)+parseFloat(totalSecScore);
           			totalCrctAnsrGvnByStdnt=0;
           			totalWrngAnsrGvnByStdnt=0;
           			
       			}
           		
           		sectionResponses=sectionResponses+count;
           		count=0;
           		
           	 if(this.sections[k].showToStud){
    				visibleSections++;
    			 }
          	 }
          	
           	if(this.acceptAnyAnswer && this.graded){
	       		 if(totalCrctAnsrGvnByStdnt>0 && sectionResponses==this.sections.length){       			
	       			 return 1;
	       		 }else{ 
	       			 if(sectionResponses==visibleSections){
	       				 return 1; 
	       			 }else{
	       				 return sectionResponses/this.sections.length;
	       			 }
	       			
	       		 }
           	}else if(!this.acceptAnyAnswer && this.graded){
	        	if(totalScore==0) 
	        		totalScore=(totalCrctAnsrGvnByStdnt*weightage) -(totalWrngAnsrGvnByStdnt*weightage);
	          	 if(isNaN(totalScore) || totalScore<0 ){
	      			totalScore=0;
	      		 }
	          	 
	    		return totalScore;
	    	}         	
         	
        	 
         },
         /**
          * validate if component is filled
          */

         validateComponent:function(object){
		        var i = 0;
				var isComplete = true;
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
				if (!isComplete) {
					object.flag = true;
					object.completeFlag = true;
					object.errorMsg += "<br> On Part : " + this.pageIdPrefix
							+ this.pageId + " Component : " + this.idPrefix + this.id;
				}
				
				var rightAnswerSelected=true;
                if(!validRange){
	   				 object.flag = true;
	   				 object.rangeflag = true;
	   				 object.errorMsg+=(isComplete && rightAnswerSelected)?"<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id:"";
	   				 object.errorMsg+="<br> "+rangeError.message;
	   				 object.field=rangeError.field;
	   		    }
				return object;
            },
            /**
			 * check if question is answered
			 */

            validateStudentQuestionLayout:function(){
	             var j=0;
	             var validflag=true;
	             if(this.isMandatory()){
		   			 for( j in this.sections){
		   				 if(this.sections[j].showToStud || this.sections[j].showToStud==undefined){
		   					validflag = validflag && this.sections[j].isStudentAnswered(this.sections[j]);
			   			 }
		   				if(!validflag){
		   					break;
		   				}
		   			 }
	             }else{
	            	 validflag= true;
	             }
				return validflag;
		},
		filter:function(event){
		util.removePasteImage(event.originalEvent.clipboardData,event);
		},
		collapseComponent : function(){
	        	var $snap = $("#componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);   	
	        	var $comp = $("#compBody_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);
	        	if($comp.is(":visible")){
	        		$comp.hide('slow');
	        		$comp.prev().hide();
	        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("invisible");
	        		$snap.find("img").attr("src","img/comp-plus.png");
	        		this.state="collapse";
                    $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("dragComp");
	        	}else{
	        		$comp.show('slow');
	        		$comp.prev().show();
	        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
	        		$snap.find("img").attr("src","img/comp-minus.png");
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
                if(!flag){
                    $comp.hide('slow');
                    $comp.prev().hide();
                    $("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("invisible");
                    $snap.find("img").attr("src","img/comp-plus.png");
                    this.state="collapse";
                    $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("dragComp");
                }else{
                    $comp.show('slow');
                    $comp.prev().show();
                    $("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
                    $snap.find("img").attr("src","img/comp-minus.png");
                    this.state="expand";
                    $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("dragComp");
            }
        },
	    /**
	     * check if student had given answer
	     */
	    isStudentAnswered:function(){
	    	return this.validateStudentQuestionLayout();
	    },
	    
	    optionOrientationLayout : function(){
        	var htmlelement = '';
        	htmlelement += '<div class="componentTytle title-head  ">';
        	htmlelement += '		<a class="info-icon"></a>Answer display:';
        	htmlelement += '</div>';
        	htmlelement += '<div class="displayAnswerDiv">';
        	htmlelement += '		<span class="title-head-1"></span>';
        	htmlelement += '		<li>';
        	htmlelement += '			<div class="article-col">';
        	htmlelement += '				<input type="radio" id="radioOptionHorizontal'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="radioclick" value="2"/>';
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
        	htmlelement += '				<input type="radio" id="radioOptionTwo-column'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionOrientation'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="radioclick" value="3"/>';
        	htmlelement += '					<label class="radioclick" for="radioOptionTwo-column'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Two-column</label>';
        	htmlelement += '			</div>';
        	htmlelement += '		</li>';       	
        	htmlelement += '</div>';
        	return htmlelement;
        },
        afterOptionOrientationLayout : function(){
        	CheckBoxComponent.addEventOnClass("radioclick","click",this._changeOptionOrientation);
        },
        changeOptionOrientation : function(e){
        	var selected = $("input[type='radio'][name='optionOrientation"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+"']:checked");
        	var selectedVal = selected.val();
        	this.answerOptionOrientation = parseInt(selectedVal);
        	 e.stopPropagation();
        },
        /**
		 * 
		 */
        changeFeedbackType:function(event){         	 
          //  var pointFlag = false;
    	  if (typeof event.data === 'undefined') {
    		  this.feedbackType = 'standard';
    	  }
    	  else{
    		  this.feedbackType = event.data.feedbackType;
          	  if (this.feedbackType === 'standard') {
          			 $("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).hide();
          			$("#selectedFeedbackType").html("Standard <span class='caret caretDrop'></span>");
          			$("#sumFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
          			this.showPointsToStudents=false;
        		    this.hideSubCategoryToStudent=false;
        		    this.notApplicable=false;
        		    this.feedBackScoringSelectionType = 'allSelection';
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
          		 $("#feedbackScoringType"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).show();
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
          			this.hideSubCategoryToStudent = false;
          		 }
          		 else{
          			this.notApplicable = false;
          			$("#selectedFeedbackType").html("Ranged-based Subcategories <span class='caret caretDrop'></span>");
          			this.createSubcategories();
          		 }
          	  }
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
					} 
					 if(this.feedbackType === 'rangedBasedSubcategories'){
						$.each(this.subCategoryRanges ,function(index,subCategoryRange){
							subCategoryRange.update();	
						});
					 }
				}
			},
			feedBackScoringSelection : function(event){
				this.feedBackScoringSelectionType = event.currentTarget.value;
				question.activePage.doLayout();
	        	this.populateComp();
			},
			showPointToStudent:function(){	    	
		    	 if($('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
		    		 this.showPointsToStudents=true;
		    	 }
		    	 else{
		    		 this.showPointsToStudents=false; 	    	
		    	 }
		     },
		     /*
		     * function to save show Subcategory to student checkbox value
		     */
		    showSubCatToStudent:function(){	    	
		    	 if($('#showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
		    		 this.hideSubCategoryToStudent=true;	    	
		    		// $('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", true);
		    		// $('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked", false);
		    		// $('#notApplicableOptionId').addClass("disabledText");
		    		// this.notApplicable = false;
		    	 }
		    	 else{
		    		 this.hideSubCategoryToStudent=false; 
		    	 }
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
				
			createRangeBasedFeedback:function(){
	        	if(this.feedbackType == 'rangedBased' || this.feedbackType == 'rangedBasedSubcategories'){
		        	var range=new Array();
					var rangeConfig = {
							componentId :this.id,
							componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix
						};
					for (var i=1; i<=3; i++){
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
					subCategories.push(new CheckBoxSubCategory(categoryConfig));
				}
				this.setSubCategories(subCategories);
				this.subCategoryRanges=[];
				// this.createSubCategoryRangeFeedback();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
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
				var subCategoryRange = new CheckBoxSubCategoryRange(subCatRangeConfig);
				var range=new Array();
				var rangeConfig = {
						componentId : this.id,
						componentIdPrefix :  this.pageIdPrefix+this.pageId+this.idPrefix+this.id+subCategoryRange.idPrefix,
						parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
						allowNegative:true
					};
				for (var i=1;i<=3;i++){
					rangeConfig.id=i;
					range.push(new Range(rangeConfig));	
				}
				subCategoryRange.setRanges(range);
				this.subCategoryRanges.push(subCategoryRange);
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
					section.afterLayout();
					if(isBinaryAnswer){
					 for(opt in section.options){
					  section.options[opt].setdropDownOptions(subCatList);
					 }
					}
				});
		    },
		    resetComp : function(){
		   	var eSec=0;
        		for(eSec in this.sections){
        			
            		var fullCmpId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
            		var isFrequency=false;
            		this.notApplicableStudentResponse=false;
            		if(this.feedbackScoringType == 'frequency'){
            			isFrequency=true;
            		}
            		var flag;
            		if(question.pages[parseInt(this.pageId)-1]==undefined){
            			flag=question.pages[parseInt(this.pageId)-util.checkIfPageDelete(this.pageId)-1].showToStud;
            		}else{
            			flag=question.pages[parseInt(this.pageId)-1].showToStud;
            		}
        			if((this.showToStud!=undefined && question.activePage.showToStud!=undefined && (!flag || !this.showToStud))){
        				this.resetStudentResponsesforBranching(fullCmpId, this.sections[eSec], isFrequency, this.binaryAnswer);
        				$("#stdSideCheckallScore_"+this.id).css("display","none");
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
	 	    		$("#demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
	 	    	 }
	     		 for(key in currentSection.options){
	    			var optAnswer = currentSection.options[key];
	    			optAnswer.studentResponse=false;
	    			var sectionId = currentSection.componentIdPrefix+currentSection.componentId+currentSection.idPrefix+currentSection.id;
	    			$('#sectionDiv_'+sectionId+' input[type="checkbox"]:checked').each(function(){
	    				$(this).prop('checked', false); 
	    			});
	    			if(currentSection.isBranched){
	    				optAnswer.setMappedEntities(fullCmpId, optAnswer.studentResponse,currentSection.options[key].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency,currentSection);
	    			}
	     		 }
	         },
	      
	};  