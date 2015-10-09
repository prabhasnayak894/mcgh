/* ========================================================================
 * MultipleChoiceOptionAnswer : Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all multiple choice option specific answer
 * properties 
 * ======================================================================== */
var MultipleChoiceOptionAnswer = function(options){
	this.id = null;
	this.optionId = null;
	this.optionIdPrefix = null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.sectionId = null;
	this.sectionIdPrefix = null;
	this.feedback =null;
	this.feedbackIdPrefix = "F";
	this.pointsValueEditor = null;
	this.label = null;
	this.studentResponse=false;
	this.right=true;
	this.pointsValuePrefix = "C";
	$.extend(this, options);
	this.feedback = new Editor({id:this.optionIdPrefix+this.optionId+this.feedbackIdPrefix+this.id});
	this.pointsValueEditor = new NumericEditor({id:this.optionIdPrefix+this.optionId+this.pointsValuePrefix+this.id,placeholder:"Point value",allowNegative:true});
	this._hideFeedback = MultipleChoiceOptionAnswer.BindAsEventListener( this, this.hideFeedback );
	this._update=MultipleChoiceOptionAnswer.BindAsEventListener( this, this.update );
	this._filter =MultipleChoiceOptionAnswer.BindAsEventListener( this, this.filter );
	this._updateStudentResponse = MultipleChoiceOptionAnswer.BindAsEventListener( this, this.updateStudentResponse );
	this._populateFeedbackEditorProperties = MultipleChoiceOptionAnswer.BindAsEventListener( this, this.populateFeedbackEditorProperties );
	this._updateFeedBackEditor= MultipleChoiceOptionAnswer.BindAsEventListener( this, this.updateFeedBackEditor );
	
};
//add event helper method
MultipleChoiceOptionAnswer.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
MultipleChoiceOptionAnswer.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
MultipleChoiceOptionAnswer.prototype = { 
	/**
	 * gets id of Multiple Choice option
	 * @returns  id
	 */
		getId : function(){
		return this.id;
	},
	/**
     * sets id of Multiple Choice Option
     * @param id
     */
	setId : function(id){
		this.id = id;
	},
	
	/**
	 * gets optionId of Multiple Choice option
	 * @returns  sectionId
	 */
	getOptionId : function(){
		return this.optionId;
	},
	/**
     * sets optionId of Multiple Choice Option
     * @param optionId
     */
	setOptionId : function(optionId){
		this.optionId = optionId;
	},
	/**
	 * gets optionIdPrefix of Multiple Choice option
	 * @returns  optionIdPrefix
	 */
	getOptionIdPrefix : function(){
		return this.optionIdPrefix;
	},
	/**
     * sets optionIdPrefix of Multiple Choice Option
     * @param optionIdPrefix
     */
	setOptionIdPrefix : function(optionIdPrefix){
		this.optionIdPrefix = optionIdPrefix;
	},
	
	/**
	 * gets feedback of Multiple Choice option
	 * @returns  feedback
	 */
	getFeedback : function(){
		return this.feedback;
	},
	/**
     * sets feedback of Multiple Choice Option
     * @param feedback
     */
	setFeedback : function(feedback){
		this.feedback = feedback;
	},
	/**
	 * gets feedbackIdPrefix of Multiple Choice option
	 * @returns  feedbackIdPrefix
	 */
	getFeedbackIdPrefix : function(){
		return this.feedbackIdPrefix;
	},
	/**
     * sets feedbackIdPrefix of Multiple Choice Option
     * @param feedbackIdPrefix
     */
	setFeedbackIdPrefix : function(feedbackIdPrefix){
		this.feedbackIdPrefix = feedbackIdPrefix;
	},
	/**
	 * gets pointsValueEditor of Multiple Choice option
	 * @returns  pointsValueEditor
	 */
	getPointsValueEditor : function(){
		return this.pointsValueEditor;
	},
	/**
     * sets pointsValueEditor of Multiple Choice Option
     * @param pointsValueEditor
     */
	setPointsValueEditor : function(pointsValueEditor){
		this.pointsValueEditor = pointsValueEditor;
	},
	/**
	 * gets pointsValuePrefix of Multiple Choice option
	 * @returns  pointsValuePrefix
	 */
	getPointsValuePrefix : function(){
		return this.pointsValuePrefix;
	},
	/**
     * sets pointsValueEditor of Multiple Choice Option
     * @param pointsValuePrefix
     */
	setPointsValuePrefix : function(pointsValuePrefix){
		this.pointsValuePrefix = pointsValuePrefix;
	},
	/**
	 * gets label of Multiple Choice option Answer
	 * @returns  label
	 */
	getLabel: function(){
		return this.label;
	},
	/**
     * sets label of Multiple Choice Option Answer
     * @param label
     */
	setLabel : function(label){
		this.label = label;
	},
	/**
	 * gets studentResponse of Multiple Choice option Answer
	 * @returns  studentResponse
	 */
	isStudentResponse: function(){
		return this.studentResponse;
	},
	/**
     * sets studentResponse of Multiple Choice Option Answer
     * @param studentResponse
     */
	setStudentResponse : function(studentResponse){
		this.studentResponse = studentResponse;
	},
	/**
     * updates editor text
     */
    update: function(){
  	  this.pointsValueEditor.updateVal();
  	  this.feedback.update();
  	  var i=0;
 	  
	  for(i in question.activePage.components){
			if(question.activePage.components[i].id==this.componentId && (question.activePage.components[i].feedbackType == 'rangedBased' || question.activePage.components[i].feedbackType == 'rangedBasedSubcategories')){
				question.activePage.components[i].updateMinMaxPoint();
				if(question.activePage.components[i].subCategoryRanges != null){
				 $.each(question.activePage.components[i].subCategoryRanges ,function(index,subCategoryRange){
						subCategoryRange.update();	
				 });
				}
       			break;
			}
     }
  	  
    },
   /**
    * layouts option feedback editor in design mode
    * @returns {String}
    */
    layoutFeedback:function(){
     	 var htmlelement="";
     	 var dataDivAttr = this.feedback.text !='' ? 'data-div-placeholder-content' : '';
     	 htmlelement+='  <div class="rowPagesection" id="feedback'+this.feedback.id+'">';
     	 htmlelement+='       <div class="colPageSection">';
     	 htmlelement+='         <div class="eachCol firstColPic"></div>';
     	 htmlelement+='     </div>';
     	 htmlelement+='     <div class="colPageSection secondColPic">';
     	 htmlelement+='     <div>';
     	 htmlelement+='            <div class="editableDivTitle">';
     	 htmlelement+='                 <h6 class="pull-right font10">ID# '+this.feedback.id+' | <a  id="hide'+this.feedback.id+'" >Collapse feedback</a></h6>';
     	 htmlelement+='            </div>';
     	 htmlelement+='             <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text" data-maxlength="'+this.feedback.maxLength+'" id="'+this.feedback.id+'" class="inputDummy feedbackInputBaground" '+dataDivAttr+'>'+this.feedback.text+'</div>';
     	 htmlelement+='         </div>';
     	 htmlelement+='      </div>';
     	 htmlelement+='     <div class="colPageSection invisible">';
     	 htmlelement+='         <div class="eachCol">';
     	 htmlelement+='             <a>';
     	 htmlelement+='                  <img src="img/getPicture.png">';
     	 htmlelement+='              </a>';
     	 htmlelement+='          </div>';
     	 htmlelement+='          <div></div>';
     	 htmlelement+='      </div>';
     	 htmlelement+='  </div>';
	     return htmlelement;
      },
      
      /**
       * Point based layout
       */
      layoutPoint:function(feedbackType, feedbackScoringType){   
    	  var css='style="display:none;"';
    	  if(feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories'){
    		  css='style="display:block;"';
    	  }
    	  var htmlelement="";      	  
    	  htmlelement+='<div  class="colPageSection ">';
     	  htmlelement+='<div class="form-group ptsValue-1" id="Point'+this.pointsValueEditor.id+'" '+css+' >';
     	
     	  if(feedbackScoringType === 'frequency'){
	       		this.pointsValueEditor.contenteditable = false;
	       		this.pointsValueEditor.text="";
	       		this.pointsValueEditor.extraClasses="disabledField";
	      }else{
	       		this.pointsValueEditor.contenteditable = true;
	       		this.pointsValueEditor.extraClasses="";
	      }
     	  htmlelement+=this.pointsValueEditor.layout();
    	  htmlelement+='</div>';      	 
    	  htmlelement+='</div>';
    	 return htmlelement;
      },
      
      editorFeedbackPropertyLayout:function(){
    	  var htmlelement="";        	
        	 var elementType ="Element: Feedback";
        	 htmlelement+='    <div class="tabContent tabProContent">';
    	   	 htmlelement+='        <p>Component: Multiple Choice</p>';
    	   	 htmlelement+='        <p>'+elementType+'</p>';
    	   	 htmlelement+='        <p id="elementid">ID# '+this.feedback.id+'</p>';
    	   	 htmlelement+='    </div>';
    	   	 htmlelement+='    <div class="clear"></div>';
    	   	 htmlelement+='    <div class="gap10"></div>';
    	   	
    	   	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
    	   	 htmlelement+='        <a id="insertHelp'+this.feedback.id+'" class="info-icon"></a>Insert a hyperlink:';
    	   	 htmlelement+='    </div>';
    	   	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
    	   	 htmlelement+='        <div class="form-group">';
    	   	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
    	   	 htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+this.feedback.id+'">';
    	   	 htmlelement+='        </div>';
    	   	 htmlelement+='        <div class="form-group">';
    	   	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
    	   	 htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+this.feedback.id+'">';    	   	 
    	   	 htmlelement+='        </div>';
    	   	 htmlelement+='        <button id="insert_'+this.feedback.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
    	   	 htmlelement+='        <div class="clear"></div>';
    	   	 htmlelement+='    </div>';
    	   	 htmlelement+='    <div class="clear"></div>';

        	return htmlelement;
      },
      /**
       * populate option feedback text editor properties
       */
      populateFeedbackEditorProperties:function(){
      	$("#elementProperties").html(this.editorFeedbackPropertyLayout());
      			$("#elementProperties").show();
       			$("#properties").hide();
       			this.afterEditorFeedbackPropertyLayout();

            /*Need to put here code of MEDIA*/
            //console.log(this.feedback.id);
            var newMedia = new Media({id:this.feedback.id});
            $("#mediaProperties").html(newMedia.layout());
            $("#mediaProperties").show();
            newMedia.afterLayout();
            util.checkMediaInEditMode();
      },
      /**
 	  * adds events for html elements of current option feedback editor property pane
 	  */
      afterEditorFeedbackPropertyLayout:function(){
    	  MultipleChoiceOptionAnswer.addEvent( "insertHelp"+this.feedback.id,"click",this._openHelpModalForInsertHyperlink);			
    	  MultipleChoiceOptionAnswer.addEvent( "insert_"+this.feedback.id, "click", this._updateFeedBackEditor);
 	 },
 	/**
      * updates feedback editor properties
      */
 	updateFeedBackEditor:function(){		
		var linkText=$("#linkText_"+this.feedback.id).val();
		var url=$("#linkAddress_"+this.feedback.id).val();	 		
 		
 		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
			if(linkText != ""){
				if(url.slice(-1)==="/")
		 		{
		 			url=url.substring(0,url.length-1);
		 		}
		 		var linkAddress=url; 		
		 		util.evaluateUrl(linkAddress, linkText, this.feedback.id);
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
	     * opens modal popup for Insert hyperlink
	     */
	    openHelpModalForInsertHyperlink:function(event){
	   	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
	    },
      
      /**
  	 * adds events for html elements related to current option
  	 */
      afterFeedbackLayout : function(){
    	  MultipleChoiceOptionAnswer.addEvent("hide"+this.feedback.id, "click", this._hideFeedback ); 
    	  MultipleChoiceOptionAnswer.addEvent(this.feedback.id, "click", this._populateFeedbackEditorProperties );
    	  MultipleChoiceOptionAnswer.addEvent(this.feedback.id, "blur", this._update );
    	  MultipleChoiceOptionAnswer.addEvent(this.feedback.id, "paste", this._filter );
    	  this.feedback.afterEditorlayout();
      },
      /**
       * adds events for html elements related to point base response
       */
      afterPointLayout:function(){    	 
    	  MultipleChoiceOptionAnswer.addEvent(this.pointsValueEditor.id, "blur", this._update );
    	  this.pointsValueEditor.afterNumericEditorlayout();
      },
      
      /**
    	 * hide feedback for current option
    	 */
      hideFeedback:function(){ 
    	 	$("#editfb_"+this.optionIdPrefix+this.optionId).show("slow");
    	 	$("#feedback_"+this.optionIdPrefix+this.optionId).hide("slow");		
     },
     /**
      * hide and show points
      */
     togglePonits:function(flag){ 
    	if(flag==true){
    		 $("#Point"+this.pointsValueEditor.id).show("slow");    		    
    	 }else{
    		 $("#Point"+this.pointsValueEditor.id).hide("slow");
    	 }
    	 	 
      },
      /**
       * check if ponit editor is filled
       */
    isPointValueFilled:function(){
    	$("#htmlToTextConvertor").html(this.pointsValueEditor.text);
		var optionText = $("#htmlToTextConvertor").text();
		if(optionText.length<=0) {
		    return false; 
		  }else{
		    return true;
	  }	
     },
     /**
      * layouts in student test mode
      * @returns {String}
      */
     studentLayout:function(binaryAnswer,sectionId, isNotApplicable){
     	var htmlelement='';
     	var radioName='multipleChoiceOptionAnwer_';
     	if(binaryAnswer){
     		radioName += this.componentId + '_' + this.componentIdPrefix + '_' + sectionId + '_' + this.optionId;
     	}else{
     		radioName += this.componentId + '_' + this.componentIdPrefix + '_'  + sectionId;
     	}
     	var binaryOptionGap=(binaryAnswer)?"minColPic":"";
     	var isChecked = (this.studentResponse) ? 'checked' : '';
     	htmlelement +='<div class="colPageSection '+binaryOptionGap+'" ><input '+isChecked+' id="option_'+this.feedback.id+'" name="'+radioName+'" type="radio"></div>';
 		return htmlelement;
     },
     /**
      * add event handers to html elements after the layout done in student test mode
      * @returns {String}
      */
     afterStudentLayout:function(){  
    	 MultipleChoiceOptionAnswer.addEvent('option_'+this.feedback.id, "change", this._updateStudentResponse );
		 $('.stdQueLabel').each(function (){
 			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
         });
     },
     updateStudentResponse: function(){
    	 this.resetStudentResponse();
    	 var isChecked =$('#option_'+this.feedback.id).prop("checked");    	 
    	 this.studentResponse = (isChecked) ? true : false;
    	 var sectionBranchedlen=0;
   		 //question.updateProgressBar();
    	 /*changes for branching based on responses*/
   		 var currentComponent = null;
		 for (i in question.activePage.components) {
			if (question.activePage.components[i].id == this.componentId) {
				currentComponent = question.activePage.components[i];
			}
		 }
		 
		 var fullCmpId = currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix+currentComponent.id; 
		 /*go for compoenet branching check */
		 var isFrequency = false; 
		 if(currentComponent.feedbackScoringType == "frequency"){
			 isFrequency = true; 
		 }
		 //check if component is branched
		 var selectedOpt = null;
		 var isCompBranched = false;
		 var isSectionBrnched=false;
		 var isComBranched=false;
		 var sectionScore = 0;
		 var visibleSection=0;
		 var validflag=0;
			for( i in currentComponent.sections){
					if(currentComponent.sections[i].showToStud || currentComponent.sections[i].showToStud==undefined){
						validflag =( currentComponent.sections[i].isStudentAnswered(currentComponent.binaryAnswer))?(validflag+1):validflag;
						visibleSection=visibleSection+1;
	  			}
			}
		 if(currentComponent.isBranched && currentComponent.sections.length==1){
			 sectionBranchedlen=1;
			 for(j in currentComponent.sections){	    		
    			var currenrtSection  = currentComponent.sections[0];
    			var x = 0; 
    			for( x in currenrtSection.options) {
    				if(currentComponent.binaryAnswer){
    					/*if any of choice selected for binary set showStud true*/
	    				var optAnswer = null;
	    				if(currenrtSection.options[x].answers[0].studentResponse){
	    					optAnswer = currenrtSection.options[x].answers[0];
	    				}else if(currenrtSection.options[x].answers[1].studentResponse){
	    					optAnswer = currenrtSection.options[x].answers[1];
	    				}
	    				if(optAnswer != null){
	    					
	    					this.setMappedEntities(fullCmpId, false, currenrtSection.options[x].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency);
  	         				var maxCounter = 0;
  	         				sectionScore = sectionScore + parseFloat(optAnswer.pointsValueEditor.text);
  	     		       		for(key in currentComponent.sections){    		       	     
  	     		       	    	maxCounter += currentComponent.sections[key].options.length;
  	     		       	    }
  	     		       		if(maxCounter !=0 ){
  	     		       		sectionScore = sectionScore/maxCounter;	
  	     		       		}
	    					
	    				} 	  	    				
	    			}else{
	    				var optAnswer = currenrtSection.options[x].answers[0];
	    				if(optAnswer.studentResponse){
	    					selectedOpt = currenrtSection.options[x];
	    				}
	    				
	    				this.setMappedEntities(fullCmpId, optAnswer.studentResponse,currenrtSection.options[x].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency);
	    			}
    			}
    			if(!currentComponent.binaryAnswer){
    				if(selectedOpt!=null){
    					
        				this.setMappedEntities(fullCmpId, true,selectedOpt.id, parseFloat(selectedOpt.answers[0].pointsValueEditor.text), isFrequency);	
        			}
    			}else{
    			
    				if(currentComponent.isStudentAnswered()){
    					
    					this.setMappedEntities(fullCmpId, true,"", sectionScore, isFrequency);	
    				}
    			}
    			
    			
			 }
			 isCompBranched = true;
			 isComBranched=true;
		 }
		 else{//else section is branched
			 if(!currentComponent.isBranched){
					var j=0;
		  	    	for(j in currentComponent.sections){
		  	    		sectionBranchedlen=(currentComponent.sections[j].isBranched)?sectionBranchedlen+1:sectionBranchedlen;  	    		
		  	    		if(currentComponent.sections[j].id==this.sectionId){
		  	    			if(currentComponent.sections[j].isBranched){
		  	    				var currenrtSection  = currentComponent.sections[j];
		  	  	    			var x = 0; 
		  	  	    			for( x in currenrtSection.options ) {
		  	  	    				if(currentComponent.binaryAnswer){
		  	  	    				    /*if any of choice selected for binary set showStud true*/
			  	  	    				var optAnswer = null;
			  		    				if(currenrtSection.options[x].answers[0].studentResponse){
			  		    					optAnswer = currenrtSection.options[x].answers[0];
			  		    				}else if(currenrtSection.options[x].answers[1].studentResponse){
			  		    					optAnswer = currenrtSection.options[x].answers[1];
			  		    				}
			  		    				if(optAnswer != null){
			  		    					this.setMappedEntities(fullCmpId, false, currenrtSection.options[x].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency);
			  		    					sectionScore = sectionScore + parseFloat(optAnswer.pointsValueEditor.text);
			  		    				} 	  	  	  	    					
		  	  	    				}else{
		  	  	    					var optAnswer = currenrtSection.options[x].answers[0];
			  	  	    				if(optAnswer.studentResponse){
			  		    					selectedOpt = currenrtSection.options[x];
			  		    				}
		  	  	    					this.setMappedEntities(fullCmpId, optAnswer.studentResponse,currenrtSection.options[x].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency, currenrtSection.id,currenrtSection);
		  	  	    				}  	  	    				
		  	  	    			}
				  	  	    		if(!currentComponent.binaryAnswer){
					  	  	    		if(selectedOpt!=null){		  	  	    		
					  	  	    			this.setMappedEntities(fullCmpId, true,selectedOpt.id, parseFloat(selectedOpt.answers[0].pointsValueEditor.text), isFrequency, currenrtSection.id,currenrtSection);			  	  	    			
					  	  	    		}
				  	    			}else{
				  	    				if(currentComponent.isStudentAnswered()){
				  	    					this.setMappedEntities(fullCmpId, true,"", sectionScore, isFrequency);	
				  	    				}
				  	    			}
					  	  	    	isCompBranched = true;
					  	  	    	isSectionBrnched=true;
			  	    			}   	    			
		  	    		}
		  	    		
		  	    	} 
			 }
	
		 }		 
		if(currentComponent.isBranched && currentComponent.sections.length>1){
			 sectionBranchedlen=1;
			 var scoreComp=0;
			 for(var index in question.branches){
				 var branch = question.branches[index]; 
				// this.setResetFlag(branch, false);// Issue id 1457// commented for issue 1457
				 
			 }
	    		
			 if(currentComponent.feedbackScoringType == "frequency"){
				 isFrequency = true; 
			 } 
			
			 for(j in currentComponent.sections){
				// this.setMappedEntities(fullCmpId, false,null,scoreComp, isFrequency);
    			var currenrtSection  = currentComponent.sections[j];
    			var x = 0; 
    			
    			for( x in currenrtSection.options) {
    				if(currentComponent.binaryAnswer){
    					/*if any of choice selected for binary set showStud true*/
	    				var optAnswer = null;
	    				if(currenrtSection.options[x].answers[0].studentResponse){
	    					optAnswer = currenrtSection.options[x].answers[0];
	    				}else if(currenrtSection.options[x].answers[1].studentResponse){
	    					optAnswer = currenrtSection.options[x].answers[1];
	    				}
	    				if(optAnswer != null){	    				
	    					sectionScore = sectionScore + parseFloat(optAnswer.pointsValueEditor.text);
	    					//sectionScore = sectionScore + parseFloat(optAnswer.pointsValueEditor.text);
	    					var maxCounter = 0;
  	     		       		for(key in currentComponent.sections){    		       	     
  	     		       	    	maxCounter += currentComponent.sections[key].options.length;
  	     		       	    }
  	     		       		if(maxCounter !=0 ){
  	     		       		sectionScore = sectionScore/maxCounter;	
  	     		       		}
	    					if(currentComponent.isStudentAnswered()){
	    						this.setMappedEntities(fullCmpId, false, currenrtSection.options[x].id, sectionScore, isFrequency);	
	  	    				}
	    					
	    				} 	  	    				
	    			}else{
	    				
	    				var optAnswer = currenrtSection.options[x].answers[0];
	    				// this.setMappedEntities(fullCmpId, false,currenrtSection.options[x].id,scoreComp, isFrequency);
	    				if(optAnswer.studentResponse){
	    					selectedOpt = currenrtSection.options[x];
	    					scoreComp += parseFloat(optAnswer.pointsValueEditor.text);
	    					if(currentComponent.feedbackScoringType=="average"){
	    						scoreComp=scoreComp/currentComponent.sections.length;
	    					}
	    					if(currentComponent.isStudentAnswered()){
	    						this.setMappedEntities(fullCmpId, optAnswer.studentResponse,currenrtSection.options[x].id,scoreComp, isFrequency);
	  	    				}
	    					
	    					//console.log(scoreComp)
	    				}
	    			}
    			}
    			
			 }
			// this.setMappedEntities(fullCmpId, true,currenrtSection.options[x].id,scoreComp, isFrequency);
			 isCompBranched = true;
			 isComBranched=true;
		}
		  //for multiCriteria branching
		 var bId = 0;
		 for(bId in question.branches){
			 if(question.branches[bId].criteria == "multi" && (question.branches[bId].cId == fullCmpId || question.branches[bId].cId_2 == fullCmpId)){
				 util.checkMultiCriteriaMapping(question.branches[bId]);
				 isCompBranched = true; 
			 }
		 }
		if(currentComponent.isBranched){
			isComBranched=true;
			isSectionBrnched=false;
		}
	
	/*	if(validflag==visibleSection){
			question.actvPageShowHide(true);
		}else{
			question.actvPageShowHide(false);
		}*/
		
		if(currentComponent.isStudentAnswered()){
			question.actvPageShowHide(true);
		}else{
			if(visibleSection==validflag){
				question.actvPageShowHide(true);	
			}else{
				question.actvPageShowHide(false);
			}
			
		}
		//question.actvPageShowHide(); 
		 if(isCompBranched){
		  question.updatePages();
		 }
		 if(currentComponent.binaryAnswer){
			 //console.log("calculate score");
			 //this.displayScoreForStudent(currentComponent);  
		 }
		 if(sectionBranchedlen>0 && currentComponent.feedbackType!="standard"){
			 if(isComBranched ){
			this.displayScoreForStudent(currentComponent); 
			 }
	    	
	   	 var j = 0;
			for (j in currentComponent.sections) {
				var secId= currentComponent.sections[j].componentIdPrefix+currentComponent.sections[j].componentId+currentComponent.sections[j].idPrefix+currentComponent.sections[j].id;
				var score=this.calculateSectionScore(currentComponent,currentComponent.sections[j]);
				if (currentComponent.sections[j].id == this.sectionId) {
					if (currentComponent.sections[j].isBranched) {
						var oldSection = currentComponent.sections[j];
						
		   				var scoreDiv='<div>'+score+'</div>';
		   				if(score == 0)
		   				{
		   					$("#sectionDivScore_"+secId).text("");
		   				}	
		   				else
		   				{	
		   				
		   		    	  if(isSectionBrnched)
		   				  {
		   		    		for(var index in question.branches){
			   					var branch = question.branches[index];
			   					if (branch.mappingIndicator == "answerOption")
			   						{
			   							$("#sectionDivScore_"+secId).text("");
			   						}
			   					else
			   						{
			   							$("#sectionDivScore_"+secId).text("Section Score: "+score+" pts.");
			   							$("#sectionDivScore_"+secId).css("float","left")
			   						}
			   					}
		   				  }
		   				}
		   				 
		   				if(oldSection.isStudentAnswered()){
							
							//$("#"+fullCmpId).find(".secScore").css("display","block");
		   					$("#sectionDivScore_"+secId).css("display","block");	
		   				}else{
		   					//$("#"+fullCmpId).find(".secScore").css("display","none");
		   					$("#sectionDivScore_"+secId).css("display","none");
		   				}
					}
				}
				else
				{						
					if(score==0)
					$("#sectionDivScore_"+secId).css("display","none");
				}
				
			}
	     }
		 question.updateProgressBar();
		 var myHeight= 1000;
		 var ht = 0;
		 if(question.mode==MODE_TEST)
		 {
			 ht = $("#formToolStudentId").height();
		 }
		 if(question.mode==MODE_PREVIEW)
		 {
			 ht = $("#formToolInstructorId").height();
		 }
		 if(question.mode==MODE_POST_TEST)
		 {
			 ht = $("#formToolPostSubmissionId").height();
		 }
			
			
			if(ht>900)
			{
			 myHeight = ht+150;
			}				
			
			EZ.resize(1125,myHeight);
     },
     displayScoreForStudent:function(currentComponent){
    	 var score =currentComponent.calculateScore(); 
    	 var stdScoreTypeTextElem = $("#stdSideScore_"+currentComponent.id).find('.stdScoreTypeText');
		 var stdScorePointTextElem = $("#stdSideScore_"+currentComponent.id).find('.stdScorePointText');
		 var stdScoreTypeText = "";
		 var stdScorePointText = "";
    	 var score=0;
    	 var totalPoints=0;
    	 var totalFreqency = currentComponent.calculateTotalFrequency();
    	 var rangeCount=0;
    	 var isSectionBrnched;
    	
	     for(var index in question.branches)
 	     {
	    	var branch = question.branches[index];
			if (branch.mappingIndicator == "answerOption")
			{
				$(".stdScoreTypeText").hide();
				$(".stdScorePointText").hide();
			}		
		 }
		
    	 
  		for (j in currentComponent.sections)
  		{
			var score=this.calculateSectionScore(currentComponent,currentComponent.sections[j]);
			var secId= currentComponent.sections[j].componentIdPrefix+currentComponent.sections[j].componentId+currentComponent.sections[j].idPrefix+currentComponent.sections[j].id;
			if(score == 0)
			{
				//$("#sectionDivScore_"+secId).text("");
			}
			else
			{
				 for(var index in question.branches){
	   		    	  var branch = question.branches[index];
	   		    	 
	   		    	  if(branch.criteria == "single")
	   		    	  {
	   		    		$("#sectionDivScore_"+secId).text("");
	   		    	  }
	   		    	  else if(isSectionBrnched)
	   				  {
	   		    		for(var index in question.branches){
		   					var branch = question.branches[index];
		   					if (branch.mappingIndicator == "answerOption")
		   						{
		   							$("#sectionDivScore_"+secId).text("");
		   						}
		   					else
		   						{
		   							$("#sectionDivScore_"+secId).text("Section Score: "+score+" pts.");
		   							$("#sectionDivScore_"+secId).css("float","left");
		   						}
		   					}
	   				  }
	   				 }
			}	
  		}
				
  		 
  		for( i in currentComponent.sections){
					totalPoints += currentComponent.sections[i].calculatePoints();
			}
  		
  		if(currentComponent.feedbackType != 'rangedBasedSubcategories'){
  			//for( i in currentComponent.sections){
  				if(currentComponent.feedbackScoringType == "sum"){
  					stdScoreTypeText = " Total Score: ";
  					score=totalPoints;
  					stdScorePointText=score+" pts.";
  					
  					//console.log("-----------"+stdScorePointText)
  					
  				}else{
  					if(currentComponent.feedbackScoringType == "average"){
  						if(currentComponent.binaryAnswer &&( currentComponent.feedbackType == 'rangedBasedSubcategories' || currentComponent.feedbackType =='rangedBased' )){
  	         				var maxCounter = 0;
  	     		       		for(key in currentComponent.sections){    		       	     
  	     		       	    	maxCounter += currentComponent.sections[key].options.length;
  	     		       	    }
  	     		       		if(maxCounter !=0 ){
  	     		       			totalPoints = totalPoints/maxCounter;	
  	     		       		}    		       		
  	     		       	}else{
  	     		       		totalPoints = totalPoints/currentComponent.sections.length;
  	     		       	}
  						var multiplier = Math.pow(10, 2);
  						totalPoints = Math.round(totalPoints * multiplier) / multiplier;
  						stdScoreTypeText = " Total Score: ";
  						score=totalPoints;
  						stdScorePointText=score+" pts.";
  						
  					}else{
  					  	stdScoreTypeText = " Frequency Score: ";
  		   		    	mostFrequentOptId = [];
  		   		  
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
		     			if(mostFrequentOptId.length != 0){
		 					if(currentComponent.binaryAnswer){
		 						 var marker = [];
		 						 if(mostFrequentOptId.length > 1){
		 							for(var index in mostFrequentOptId){
	  			 						var selecteOpt = (parseInt(mostFrequentOptId[index])+1);
	  			 						var choiceOptionVal = currentComponent["choiceOptionVal" + selecteOpt];
	  				        	        marker.push(choiceOptionVal);
	  				        	       
	  			 					}
		 							stdScorePointText = "You selected "+ marker +" an equal number of times.";
		 						 }else{
		 							var selecteOpt = (parseInt(mostFrequentOptId)+1);
	 		 						var marker = currentComponent["choiceOptionVal" + selecteOpt];
	 		 						stdScorePointText ='You selected mostly "'+ marker+'"';
		 						 }
		 						
		 					}else{
		 						if(mostFrequentOptId.length > 1){
		 							var marker = [];
		 							for(var index in mostFrequentOptId){
		 			        	        marker.push(currentComponent.sections[0].markers[mostFrequentOptId[index] - 1]);
		 			        	       stdScorePointText = "You selected "+ marker +" an equal number of times.";
		 			        	   
		 		 					}
		 						}else{
		 							stdScorePointText ='You selected mostly "'+ currentComponent.sections[0].markers[mostFrequentOptId -1]+'"';
		 						}
		 					}
		     			}
  					}
  				}
  				
  			//}
  			
  		}else{
  			stdScoreTypeText = "Score: ";
  			for(subCatLength in currentComponent.subCategories){
  				var subCatTotalPoints = 0;
 				var subCatPoints = 0;
 				var noOfSections = 0;
 				var totalOptInSection = 0;
 				var totalFreqencySubCat =[];
 				if(currentComponent.binaryAnswer){
     				for( i in currentComponent.sections){
     					noOfSections++;
     					
     					for( y in currentComponent.sections[i].options){
     						if(currentComponent.sections[i].options[y].subCategoryId == currentComponent.subCategories[subCatLength].id) {
     							
     							if(currentComponent.sections[i].options[y].notApplicableBinaryOption){
     								totalOptInSection = currentComponent.subCategories[subCatLength].optionIds.length;
     								subCatPoints = currentComponent.sections[i].options[y].calculatePoints();
	     							subCatTotalPoints += subCatPoints;
	    	     					totalPoints += subCatPoints;
    		     				}else{
    		     					subCatPoints = currentComponent.sections[i].options[y].calculatePoints();
	     							subCatTotalPoints += subCatPoints;
	    	     					totalPoints += subCatPoints;
	    	     					totalOptInSection++;
	     							var x = 0;
	        				   		for( x in currentComponent.sections[i].options[y].answers){
	        				   			if(currentComponent.sections[i].options[y].answers[x].studentResponse ){
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
 	 				for ( var i in currentComponent.sections) {
						if (currentComponent.sections[i].subCategoryId == currentComponent.subCategories[subCatLength].id) {
							noOfSections++;
							totalOptInSection += currentComponent.sections[i].options.length;
							if (currentComponent.subCategories[subCatLength].notApplicableStudentResponse) {
								if (this.subCategories[subCatLength].awardMaximum) {
									subCatTotalPoints = currentComponent.subCategories[subCatLength].maxPoint;
								} else {
									subCatTotalPoints = currentComponent.subCategories[subCatLength].minPoint;
								}

								totalPoints += subCatTotalPoints;
							} else {
								subCatPoints = currentComponent.sections[i]
										.calculatePoints();
								subCatTotalPoints += subCatPoints;
								totalPoints += subCatPoints;
								for ( var y in currentComponent.sections[i].options) {
									var x = 0;
									for (x in currentComponent.sections[i].options[y].answers) {
										if (currentComponent.sections[i].options[y].answers[x].studentResponse) {
											totalFreqency[currentComponent.sections[i].options[y].id] = totalFreqency[currentComponent.sections[i].options[y].id] ? totalFreqency[currentComponent.sections[i].options[y].id] + 1
													: 1;
											totalFreqencySubCat[currentComponent.sections[i].options[y].id] = totalFreqencySubCat[currentComponent.sections[i].options[y].id] ? totalFreqencySubCat[currentComponent.sections[i].options[y].id] + 1
													: 1;
										}
									}
								}
							}
						}
					}
 					}
 				if (currentComponent.feedbackScoringType === "average") {
					if (currentComponent.binaryAnswer) {
						if (totalOptInSection != 0) {
							subCatTotalPoints = subCatTotalPoints
									/ totalOptInSection;
						}
					} else {
						if (noOfSections != 0) {
							subCatTotalPoints = subCatTotalPoints
									/ noOfSections;
						}
					}
				}	
 				var multiplier = Math.pow(10, 2);
   				subCatTotalPoints = Math.round(subCatTotalPoints * multiplier) / multiplier;
   				if(currentComponent.feedbackScoringType != 'frequency'){
   					var totalPointsSub=0;
   			  		for( k in currentComponent.sections){
   								totalPointsSub += currentComponent.sections[k].calculatePoints();
   						}
   					if(currentComponent.binaryAnswer){
   						if(currentComponent.subCategories[subCatLength].optionIds.length>0){
   							score=totalPointsSub;
   							stdScorePointText =score;
   						}
   						
   					}else{
   						if(currentComponent.subCategories[subCatLength].sectionIds.length>0){
   							score=totalPointsSub;
   							stdScorePointText =score;
   						}
   					}
   					
   				}else{
   					stdScoreTypeText = " Frequency Score: ";
		   		    	mostFrequentOptId = [];
		   		  
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
			     			if(mostFrequentOptId.length != 0){
			 					if(currentComponent.binaryAnswer){
			 						 var marker = [];
			 						 if(mostFrequentOptId.length > 1){
			 							for(var index in mostFrequentOptId){
		  			 						var selecteOpt = (parseInt(mostFrequentOptId[index])+1);
		  			 						var choiceOptionVal = currentComponent["choiceOptionVal" + selecteOpt];
		  				        	        marker.push(choiceOptionVal);
		  				        	       
		  			 					}
			 							stdScorePointText = "You selected "+ marker +" an equal number of times.";
			 						 }else{
			 							var selecteOpt = (parseInt(mostFrequentOptId)+1);
		 		 						var marker = currentComponent["choiceOptionVal" + selecteOpt];
		 		 						stdScorePointText ='You selected mostly "'+ marker+'"';
			 						 }
			 						
			 					}else{
			 						if(mostFrequentOptId.length > 1){
			 							var marker = [];
			 							for(var index in mostFrequentOptId){
			 			        	        marker.push(currentComponent.sections[0].markers[mostFrequentOptId[index] - 1]);
			 			        	       stdScorePointText = "You selected "+ marker +" an equal number of times.";
			 			        	   
			 		 					}
			 						}else{
			 							stdScorePointText ='You selected mostly "'+ currentComponent.sections[0].markers[mostFrequentOptId -1]+'"';
			 						}
			 					}
			     			}

   				}
  			}
 	  			
 	  	}
  		/*check for sections showToStud*/
  		var isSectionShowtoStud = false;
  		var cc = 0;
  		for(cc in currentComponent.sections){
  			if(currentComponent.sections[cc].showToStud){
  				isSectionShowtoStud=true;
  			}
  		}
  		if(currentComponent.isStudentAnswered() && (currentComponent.showToStud || isSectionShowtoStud) && currentComponent.feedbackType!="standard" && currentComponent.isBranched){
  			stdScoreTypeTextElem.text(stdScoreTypeText);
  		 	stdScorePointTextElem.text(stdScorePointText);
  		}else{
  			if(currentComponent.binaryAnswer){
  				stdScoreTypeTextElem.text(stdScoreTypeText);
  	  		 	stdScorePointTextElem.text(stdScorePointText);
  			}else{
  				stdScoreTypeTextElem.text("");
  	  		 	stdScorePointTextElem.text("");
  			}
  			
  		}
  		
     },
 	calculateSectionScore:function(currentComponent,section){
		var totalPoints = 0;
		var NAflag=false;
			if(currentComponent.notApplicableStudentResponse){     					    					
				totalPoints=currentComponent.awardMaximum?currentComponent.maxPoint :currentComponent.minPoint;		   						
			NAflag=true;
		}
			if(!NAflag){
				totalPoints += section.calculatePoints(currentComponent.feedBackScoringSelectionType);	
			}
				
			var multiplier = Math.pow(10, 2);
			totalPoints = Math.round(totalPoints * multiplier) / multiplier;
			return totalPoints;
	},
	displaySectionScore:function(currentComponent){
		for (j in currentComponent.sections)
			{
			var score=this.calculateSectionScore(currentComponent,currentComponent.sections[j]);
			var secId= currentComponent.sections[j].componentIdPrefix+currentComponent.sections[j].componentId+currentComponent.sections[j].idPrefix+currentComponent.sections[j].id;
			if(score == 0)
			{
				$("#sectionDivScore_"+secId).text("");
			}
			else
			{
				if(currentComponent.sections[j].isBranched){
					for(var index in question.branches){
	   					var branch = question.branches[index];
	   					if (branch.mappingIndicator == "answerOption")
	   						{
	   							$("#sectionDivScore_"+secId).text("");
	   						}
	   					else
	   						{
	   							$("#sectionDivScore_"+secId).text("Section Score: "+score+" pts.");
	   							$("#sectionDivScore_"+secId).css("float","left");
	   						}
	   					}
				}
			}	
		}
},
	
     setMappedEntities:function(cId, flag, optId, pointVal, isFrequency, sectionId,section){
    	console.log("setMappedEntities flag"+flag+"cId"+cId) ;
    	 for(var index in question.branches){
    		 var branch = question.branches[index];
    		 /*if(branch.cId==cId && branch.criteria == "single"){
    			 this.setResetFlag(branch, false); 
    		 }*/
    		 
    		 if(branch.criteria == "single"){
    		 	var secId = question.branches[index].sectionId;
    		 	var compId = question.branches[index].cId;
    		 	var isEleBranched = compId == cId ? sectionId != undefined ? secId == sectionId ? true : false : true : false;
    		 	if(secId==0 && compId == cId){
    		 		isEleBranched=true;	
    		 		this.setResetFlag(branch, false); 
    		 	
    		 	}
    		 	if(isEleBranched){
					//console.log("isEleBranched"+isEleBranched);
		    	   //first reset all flags and then set flags of comp related to satisfied condition
		    	   if(branch.mappingIndicator == "answerOption" || isFrequency){
		    		   for(var i in branch.pathMaps){
		  	  	    	 if(branch.pathMaps[i].id == optId){
		  	  	    		this.setResetFlag(branch, flag, i);
		  	  	    	 }
		  			   } 
		  	       }else{ /*for score range*/
			  	    	 for(var i in branch.pathMaps){
			  	    		 var minVal = parseFloat(branch.pathMaps[i].range[0].minRangeEditor.text);
			  	    		 var maxVal = parseFloat(branch.pathMaps[i].range[0].maxRangeEditor.text);
			  	  	    	 if(pointVal >= minVal && pointVal <= maxVal){			  	  	    		
			  	  	    		this.setResetFlag(branch, flag, i);
			  	  	    	 }				  	  	    	
			  			 }
			  	    	
			  	    	 //CTFT-1460
			  	    	//question.actvPageShowHide(true);
			  	    	
		  	       }
	    	    } 
    		 }
	  	 }
    	 
     },
   
     setResetFlag : function(branch, flag, index){
		//console.log("setreset"+flag+"index"+index);
    	 for ( var i in branch.pathMaps) {
			var loopCondition  =  (!flag) ? true : (flag && i == index)? true : false; 
			if(loopCondition){
			//	console.log("setreset loop"+flag+"index"+index);
				for(var j in branch.pathMaps[i].paths){
					var partId, compId, secId,isSubCategory;
					partId = branch.pathMaps[i].paths[j].partId;
					compId = branch.pathMaps[i].paths[j].compId;
					secId  = branch.pathMaps[i].paths[j].sectionId;
					isSubCategory=(secId!=null)?(secId.split("_")[0]=="s")?true:false:false;
					
					
					/* loop from pages to compoenents to sections */
					if(partId != null){
						for(var index1 in question.pages){
							if(partId == question.pages[index1].id){
								if(question.pages[index1].isBranchDest){
									question.pages[index1].showToStud = flag;										
								} else{
									for(var index2 in question.pages[index1].components){
										var comp = question.pages[index1].components[index2];
										if(compId == comp.id){
											if(comp.isBranchDest){
												comp.showToStud = flag;	
												if(comp.id==5)
													question.actvPageShowHide(true);  //CTFT-1460
												
											} else{
												if(comp.sections != undefined && !isSubCategory){
													for(var index3 in comp.sections){
														if(comp.sections[index3].id == secId){
															
															if(comp.sections[index3].isBranchDest){
																//console.log("111111111111111--"+comp.id)
																comp.sections[index3].showToStud = flag;
															}
														}
													}
												}else{
													if(comp.sections != undefined){
															for(var index3 in comp.sections){
																var subCat=secId.split("_")[1]
															if(comp.sections[index3].subCategoryId == subCat){
																
																if(comp.sections[index3].isBranchDest){
																	//console.log("subcat"+flag+"i"+i+"ind"+index)
																	comp.sections[index3].showToStud = flag;
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
				}
			}
    	 }
     },
     resetStudentResponse: function(){
    	 var i=0;
	    for( i in question.activePage.components){
	    	if(this.componentId==question.activePage.components[i].id){
	  	    	var j=0;
	  	    	for(j in question.activePage.components[i].sections){	    		
	  	    		if(question.activePage.components[i].sections[j].id==this.sectionId){
	  	    			var currenrtSection  = question.activePage.components[i].sections[j];
	  	    			var x = 0; 
	  	    			for( x in currenrtSection.options ) {
	  	    				if(question.activePage.components[i].binaryAnswer){
	  	    					if( currenrtSection.options[x].id == this.optionId ) {
	  	  	    					currenrtSection.options[x].answers[0].studentResponse=false;
	  	  	    					currenrtSection.options[x].answers[1].studentResponse=false;
	  	  	    				}
	  	    				}else{
	  	    					currenrtSection.options[x].answers[0].studentResponse=false;
	  	    				}
	  	    				
	  	    			}
	  	    			question.activePage.components[i].sections[j]=currenrtSection;
	  	    		}
	  	    	}
	    	}
	    } 
     },
     filter:function(event){
 		util.removePasteImage(event.originalEvent.clipboardData,event);
 		}
};