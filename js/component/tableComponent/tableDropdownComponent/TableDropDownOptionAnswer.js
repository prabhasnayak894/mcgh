/* ========================================================================
 * TableDropDownOptionAnswer : Object Declaration
 * ========================================================================
 * Purpose of this object to have all multiple choice option specific answer
 * properties 
 * ======================================================================== */
var TableDropDownOptionAnswer = function(options){
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
	this.studentResponse=null;
	this.right=true;
	this.pointsValuePrefix = "C";
	$.extend(this, options);
	this.feedback = new Editor({id:this.optionIdPrefix+this.optionId+this.feedbackIdPrefix+this.id});
	this.pointsValueEditor = new NumericEditor({id:this.optionIdPrefix+this.optionId+this.pointsValuePrefix+this.id,placeholder:"Point value"});
	this._hideFeedback = TableDropDownOptionAnswer.BindAsEventListener( this, this.hideFeedback );
	this._update=TableDropDownOptionAnswer.BindAsEventListener( this, this.update );
	this._filter =TableDropDownOptionAnswer.BindAsEventListener( this, this.filter );
	this._updateStudentResponse = TableDropDownOptionAnswer.BindAsEventListener( this, this.updateStudentResponse );
	this._populateFeedbackEditorProperties = TableDropDownOptionAnswer.BindAsEventListener( this, this.populateFeedbackEditorProperties );
	this._updateFeedBackEditor= TableDropDownOptionAnswer.BindAsEventListener( this, this.updateFeedBackEditor );
};
//add event helper method
TableDropDownOptionAnswer.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
TableDropDownOptionAnswer.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableDropDownOptionAnswer.prototype = { 
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
			if(question.activePage.components[i].id==this.componentId && question.activePage.components[i].pointBasedResponse){
				question.activePage.components[i].updateMinMaxPoint();
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
      layoutPoint:function(pointBasedResponse){   
    	  var css='style="display:none;"';
    	  if(pointBasedResponse){
    		  css='style="display:block;"';
    	  }
    	  var htmlelement="";      	  
    	  htmlelement+='<div  class="colPageSection ">';
     	  htmlelement+='<div class="form-group ptsValue-1" id="Point'+this.pointsValueEditor.id+'" '+css+' >';
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
      },
      /**
 	  * adds events for html elements of current option feedback editor property pane
 	  */
      afterEditorFeedbackPropertyLayout:function(){
    	  TableDropDownOptionAnswer.addEvent( "insertHelp"+this.feedback.id,"click",this._openHelpModalForInsertHyperlink);			
    	  TableDropDownOptionAnswer.addEvent( "insert_"+this.feedback.id, "click", this._updateFeedBackEditor);
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
  	 * adds events for html elements related to current option
  	 */
      afterFeedbackLayout : function(){
    	  TableDropDownOptionAnswer.addEvent("hide"+this.feedback.id, "click", this._hideFeedback ); 
    	  TableDropDownOptionAnswer.addEvent(this.feedback.id, "click", this._populateFeedbackEditorProperties );
    	  TableDropDownOptionAnswer.addEvent(this.feedback.id, "blur", this._update ); 
    	  TableDropDownOptionAnswer.addEvent(this.feedback.id, "paste", this._filter );
    	  this.feedback.afterEditorlayout();
      },
      /**
       * adds events for html elements related to point base response
       */
      afterPointLayout:function(){    	 
    	  TableDropDownOptionAnswer.addEvent(this.pointsValueEditor.id, "blur", this._update );
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
     studentLayout:function(binaryAnswer){
     	var htmlelement='';
     	var radioName='TableDropDownAnwer_';
     	if(binaryAnswer){
     		radioName += this.componentId + '_' + this.componentIdPrefix + '_' + this.sectionId + '_' + this.optionId;
     	}else{
     		radioName += this.componentId + '_' + this.componentIdPrefix + '_'  + this.sectionId;
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
    	 TableDropDownOptionAnswer.addEvent('option_'+this.feedback.id, "change", this._updateStudentResponse );
    	 $('.stdQueLabel').each(function (){
 			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
         });
     },
     updateStudentResponse: function(){
    	 this.resetStudentResponse();
    	 var isChecked =$('#option_'+this.feedback.id).prop("checked");
    	 this.studentResponse = ( isChecked ) ? true : null;
   		 question.updateProgressBar();
    	
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
  	  	    					currenrtSection.options[x].answers[0].studentResponse=null;
  	  	    					currenrtSection.options[x].answers[1].studentResponse=null;
  	  	    				}
  	    				}else{
  	    					currenrtSection.options[x].answers[0].studentResponse=null;
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