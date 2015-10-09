/* ========================================================================
 * StudentEntry: Object Declaration
 * @author: Manali Gaikwad
 * ========================================================================
 * Purpose of this object to have all component section specific properties like 
 * holds the answer, feedback for this component
 * ======================================================================== */

var StudentEntry = function(options){ 
	this.id=null;
	this.idPrefix = "SE";
	this.answerIdPrefix = "A";
	this.feedbackIdPrefix = "F";
	this.orientation=1;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.sectionId=null;
	this.sectionIdPrefix="G";
	this.type="";
	this.isCndtnTrue = false;
	this.contentFormat=new ContentFormatEnum().ALPHANUMERIC;
	$.extend(this, options);
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id});
	this.answer = new Editor({id:this.componentIdPrefix+this.componentId+this.sectionIdPrefix+this.sectionId+this.answerIdPrefix+this.id});
	this.feedback = new Editor({id:this.componentIdPrefix+this.componentId+this.sectionIdPrefix+this.sectionId+this.feedbackIdPrefix+this.id});
	this._populateEditorProperties = StudentEntry.BindAsEventListener( this, this.populateEditorProperties );
	this._validateAnswer=StudentEntry.BindAsEventListener( this, this.validateAnswer);
	this._validateStudentResponse=StudentEntry.BindAsEventListener( this, this.validateStudentResponse);
	this._changeFormatter=StudentEntry.BindAsEventListener( this, this.changeFormatter );
	this._updateEditor= StudentEntry.BindAsEventListener( this, this.updateEditor );
	this._openHelpModalForCharLimit = StudentEntry.BindAsEventListener(this,this.openHelpModalForCharLimit);
	this._toggleFeedback = StudentEntry.BindAsEventListener(this,this.toggleFeedback);
	this._addStudentEntry= StudentEntry.BindAsEventListener( this, this.addStudentEntry );
	this._removeStudentEntry= StudentEntry.BindAsEventListener( this, this.removeStudentEntry);
	this._changeCurrency = StudentEntry.BindAsEventListener(this,this.changeCurrency);
	this._changeDateFormat = StudentEntry.BindAsEventListener(this,this.changeDateFormat);
	this._changeYearFormat = StudentEntry.BindAsEventListener(this,this.changeYearFormat);
	this._changePercentSymbol = StudentEntry.BindAsEventListener(this,this.changePercentSymbol);
	this._showSeparator = StudentEntry.BindAsEventListener(this,this.showSeparator);
	this._changeOrientation=StudentEntry.BindAsEventListener( this, this.changeOrientation );
	this._update =StudentEntry.BindAsEventListener( this, this.update );
	this._restrictEvent=StudentEntry.BindAsEventListener( this, this.restrictEvent);
	this._updateStudentResponse= StudentEntry.BindAsEventListener( this, this.updateStudentResponse );
	this._filter =StudentEntry.BindAsEventListener( this, this.filter );
	this._updateCharacterCount =StudentEntry.BindAsEventListener( this, this.updateCharacterCount );
	this._populateFeedbackEditorProperties = StudentEntry.BindAsEventListener( this, this.populateFeedbackEditorProperties );
	this._updateFeedbackEditor= StudentEntry.BindAsEventListener( this, this.updateFeedbackEditor );
	this._openHelpModalForInsertHyperlink= StudentEntry.BindAsEventListener( this, this.openHelpModalForInsertHyperlink );
};
//add event helper method
StudentEntry.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
StudentEntry.removeEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
};
//use call to borrow context
StudentEntry.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
StudentEntry.prototype = {
		/**
		* gets orientation of InputField component
		* @returns  orientation
		*/
		getOrientation : function(){
			return this.orientation;
		},
		/**
		 * set orientation of InputField component
		 * @param orientation
		 */
		setOrientation : function(orientation){
			this.orientation = orientation;
		},
		/**
	* gets id of InputField component
	* @returns  id
	*/
	getId : function() {
		return this.id;
	},
	/**
	 * set id of InputField component
	 * @param id
	 */
	setId : function(id) {
		this.id = id;
	},
	/**
	 * gets componentId of InputField component
	 * @returns componentId
	 */
	getComponentId: function( ){
        return this.componentId;  
    },
    /**
     * set componentId of InputField component
     * @param componentId
     */
    setComponentId: function( componentId){
         this.componentId =  componentId;
    },
    /**
     * gets componentIdPrefix of InputField component
     * @returns
     */
	getComponentIdPrefix : function() {
		return this.componentIdPrefix;
	},
	/**
	 * set componentIdPrefix of InputField component
	 * @param componentIdPrefix
	 */
	setComponentIdPrefix : function(componentIdPrefix) {
		this.componentIdPrefix = idPrefix;
	},
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
     * gets component answer
     */
     getAnswer:function(){
    	 this.answer;
     },
     /**
      * sets component answer
      * @param editor
      */
     setAnswer:function(answer){
    	 this.answer=answer;
     },
     /**
      * gets component feedback
      */
      getFeedback:function(){
     	 this.feedback;
      },
      /**
       * sets component feedback
       * @param editor
       */
      setFeedback:function(feedback){
     	 this.feedback=feedback;
      },
      /**
       * gets studentEntry contentFormat
       */
       getContentFormat:function(){
      	 this.contentFormat;
       },
       /**
        * sets studentEntry contentFormat
        * @param editor
        */
       setContentFormat:function(contentFormat){
      	 this.contentFormat=contentFormat;
       },
      /**
       * layouts in design mode
       * @param isLast is the last option
       * @returns {String}
       */
      layout:function(isLast,type,showMinus){
    	  var sectionType = ( type == 'fillInTheBlank' ) ? 'fill-in-the-blank' : 'input field';
    	  this.type=type;
    	  var linkText = ( this.orientation == 3 ) ? '+ Feedback' : 'Expand '+sectionType+' feedback';
     	  var htmlelement='';
    	  htmlelement+='<div id="rowPagesection'+this.editor.id+'" class="rowPagesection firstRowPageSection  column-'+this.orientation+'">';
    	  htmlelement+='	<div class="colPageSection" style="display:none;">';
    	  htmlelement+='		<div class="eachCol">';
    	  htmlelement+='			<a class="invisible">';
    	  htmlelement+='				<img src="img/getPicture.png">';
    	  htmlelement+='			</a>';
    	  htmlelement+='		</div>';
    	  htmlelement+='	</div>';
    	  htmlelement+='	<div class="colPageSection column-'+this.orientation+'">';
    	  htmlelement+='		<div class="idhead feed-exapnd-text-'+this.orientation+'">';
    	  htmlelement+='			<h6 class="pull-right font10 tagtext"><a id="expandLink_'+this.editor.id+'">| '+linkText+' </a></h6>';
    	  htmlelement+='			<h6 class="pull-right font10 inputhead">ID# '+this.editor.id+'</h6>';
    	  htmlelement+='		</div>';
    	  htmlelement+=this.layoutEditor(isLast,type,showMinus);
    	  htmlelement+='    <div class="clear"></div>';
    	  htmlelement+=this.layoutAnswer();
    	  htmlelement+='	</div>';
    	  htmlelement+='</div>';
    	 return htmlelement;
      },
      /**
       * layouts studentEntry editor in design mode
       * @returns {String}
       */
      layoutEditor:function(isLast,type,showMinus){
      	var css ="";//= showMinus?(isLast && !showMinus )?'style="display: block;"':'style="display: none;"':' style="display: none;"';
      	if(showMinus==false){
      	css='style="display: none;"';	
      	}else{
      		if(isLast && (showMinus==true)){
      			css='style="display: block;"';
      		}
      	}
      	var css2 = isLast ?'style="display: block;"':' style="display: none;"';
      	var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
       	var htmlelement='';
       	htmlelement+='<div>';
      	htmlelement+='    <div id="'+this.editor.id+'" class="inputDummy studentEntryInput-'+this.orientation+'" '+dataDivAttr+' data-placeholder="Student entry"></div>';
      	if(isLast!=null){
      	htmlelement+='<div class="pull-left studentEntrybtn-'+this.orientation+'">';
      	 htmlelement+='	<div class="plusBtn" '+css2+'>';
      	 htmlelement+='		<a id="plus_'+this.editor.id+'" title="Add StudentEntry">';
      	 htmlelement+='			<img src="img/plus.png">';
      	 htmlelement+='		</a>';
      	 htmlelement+='	</div>';
      	 htmlelement+='	<div class="minusBtn"'+css+'>';
      	 htmlelement+='		<a id="minus_'+this.editor.id+'" title="Delete StudentEntry">';
      	 htmlelement+='			<img src="img/minus.png">';
      	 htmlelement+='		</a>';
      	 htmlelement+='	</div>';
      	 htmlelement+='</div>';
      	 }

      	if( type != 'fillInTheBlank' ) {
      		htmlelement+=this.layoutFeedbackEditor(type);
      	}

  	  	htmlelement+='</div>';
  	    return htmlelement;
        },
        /**
         * layouts studentEntryFeedback editor in design mode
         * @returns {String}
         */
        layoutFeedbackEditor:function(type){
        	var css = ( type == 'fillInTheBlank' ) ? 'style="max-width: 674px;"' : '';
        	var css2 = ( type == 'fillInTheBlank' ) ? 'padding: 3px 6px; ' : '';
        	
        	var sectionType = ( type == 'fillInTheBlank' ) ? 'fill-in-the-blank' : 'input field';        	
        	var linkText = ( this.orientation == 3 ) ? '- Feedback' : 'Collapse '+sectionType+' feedback';
        	var dataDivAttr = this.feedback.text !='' ? 'data-div-placeholder-content' : '';
        	var htmlelement='';
         	htmlelement+='<div id="feedbackDiv_'+this.feedback.id+'" class="column-'+this.orientation+' sub-col-'+this.orientation+'" style="display:none; '+css2+'">';
       	  	htmlelement+='		<div class="idHead feed-text-'+this.orientation+'">';
       	  	htmlelement+='			<h6 class="pull-right  font10 mnwid  tagtext"><a id="collapseLink_'+this.feedback.id+'">| '+linkText+' </a></h6>';
    	  	htmlelement+='			<h6 class="pull-right  font10  inputhead">ID# '+this.feedback.id+' </h6>';
    	  	htmlelement+='		</div>';
    	  	htmlelement+='    <div id="'+this.feedback.id+'"  '+dataDivAttr+' contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-maxlength="'+this.feedback.maxLength+'" data-placeholder="Enter feedback" class="inputDummy textinput" '+css+'>'+this.feedback.text+'</div>';
    	  	htmlelement+='</div>';
    	    return htmlelement;
          },
      /**
       * layouts Answer editor in design mode
       * @returns {String}
       */
      layoutAnswer:function(){
    	var dataDivAttr = this.answer.text !='' ? 'data-div-placeholder-content' : ''; 
    	if(this.contentFormat.showThousandSeparator && (this.contentFormat.type== "number" || this.contentFormat.type== "percentage" )){
    		var commaText = (this.answer.text).toString().split(".");
			commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			var answerText=commaText.join(".");	
    	}else{
    		var answerText=	this.answer.text;
    	}
    	//var answerText=(this.contentFormat.type== "number" || this.contentFormat.type== "percentage" )? this.answer.text.replace(/\B(?=(\d{3})+(?!\d))/g, ","):this.answer.text;
     	var htmlelement='';
     	htmlelement+='<div id="answerDiv_'+this.answer.id+'" class="column-'+this.orientation+' sub-col-'+this.orientation+'" '+dataDivAttr+' style="display:none;"> ';
     	htmlelement+=' 		<div class="editableDivTitle  width-93">';
     	htmlelement+=' 			<h6 class="pull-right font10">ID# '+this.answer.id+' </h6>';
     	htmlelement+='		</div> ';
     	htmlelement+='		<div> ';
     	htmlelement+='			<div id="'+this.answer.id+'" class="inputDummy " data-maxlength="'+this.answer.maxLength+'" contenteditable="true" rows="3" data-placeholder="Enter answer" '+dataDivAttr+'>'+answerText+'</div> ';
     	htmlelement+=' 		</div>';
     	htmlelement+=' </div>';
	    return htmlelement;
      },
      /**
       * show/hide answer field
       */
      updateAnswerLayout:function(acceptAnyAnswer){
    	  if(acceptAnyAnswer){
    		  $("#answerDiv_"+this.answer.id).hide();
    		  this.answer.text="";
    	  }else{
    		  $("#answerDiv_"+this.answer.id).show();
    	  }
    		  
      },
      /**
       * populate option text editor properties
       */
      populateEditorProperties:function(){	    
    	  $("#elementProperties").html(this.editorPropertyLayout());
       	  $("#elementProperties").show();
       	  $("#properties").hide();
       	  this.afterEditorPropertyLayout();
       	  $("#activeHyperlink").text("");
      },
      /**
       * layouts the editor property pane
       */
      editorPropertyLayout:function(){
      	var htmlelement="";
  	   	 htmlelement+='    <div class="tabContent tabProContent">';
  	   	 htmlelement+='        <p>Component: Input and Labels</p>';
  	   	 htmlelement+='        <p id="elementid">ID# '+this.editor.id+'</p>';
  	   	 htmlelement+='    </div>';
  	   	 htmlelement+='    <div class="clear"></div>';
  	   	 htmlelement+='    <div id="entryType" style="height:350px;">';
  	  // if(this.type!="fillInTheBlank"){
  		   	 htmlelement+='        <div class="head-info typeInput">';
  		   	 htmlelement+='            <a id="contentFormat'+this.editor.id+'" class="info-icon"></a>Content format:';
      	 	 htmlelement+='        </div>';  
      		 htmlelement+='       <div class="tabContent tabProContent">';
          	 htmlelement+='           <div class="btn-group customDropdown">';
          	 htmlelement+='                <button data-toggle="dropdown" id="formatter" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
          	 htmlelement+='                    Alphanumeric<span class="caret caretDrop"></span>';
          	 htmlelement+='                </button>';
          	 htmlelement+='                <ul class="dropdown-menu">';
          	 htmlelement+='                    <li id="alphanumeric'+this.editor.id+'"><a>Alphanumeric</a>';
          	 htmlelement+='                    </li>';
          	 htmlelement+='                    <li class="divider"></li>';
          	 htmlelement+='                    <li id="number'+this.editor.id+'"><a>Number</a>';
          	 htmlelement+='                    </li>';
          	 htmlelement+='                    <li class="divider"></li>';
          	 htmlelement+='                    <li id="currency'+this.editor.id+'"><a>Currency</a>';
          	 htmlelement+='                    </li>';
          	 htmlelement+='                    <li class="divider"></li>';
          	 htmlelement+='                    <li id="percentage'+this.editor.id+'"><a>Percentage</a>';
          	 htmlelement+='                    </li>';
          	 htmlelement+='                    <li class="divider"></li>';
          	 htmlelement+='                    <li id="date'+this.editor.id+'"><a>Date</a>';
          	 htmlelement+='                    </li>';
          	 htmlelement+='                    <li class="divider"></li>';
          	 htmlelement+='                    <li id="time'+this.editor.id+'"><a>Time hh:mm:ss</a>';
          	 htmlelement+='                    </li>';
          	 htmlelement+='                </ul>';
          	 htmlelement+='            </div>';
          	 htmlelement+='        </div>';
      	// }
      	 htmlelement+='        <div class="head-info typeInput">';
      	 htmlelement+='            <a id="fieldOrientation'+this.editor.id+'" class="info-icon"></a>Field orientation:';
      	 htmlelement+='        </div>'; 
      	 
      	 htmlelement+='       <div class="tabContent tabProContent">';
      	 htmlelement+='           <div class="btn-group customDropdown">';
      	 htmlelement+='                <button data-toggle="dropdown" id="camponentFieldOrientationId_" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
      	 htmlelement+='                    1 column<span class="caret caretDrop"></span>';
      	 htmlelement+='                </button>';
      	 htmlelement+='                <ul class="dropdown-menu">';
      	 htmlelement+='                    <li id="1column'+this.editor.id+'"><a>One column</a>';
      	 htmlelement+='                    </li>';
      	 htmlelement+='                    <li class="divider"></li>';
      	 htmlelement+='                    <li id="2column'+this.editor.id+'"><a>Two columns</a>';
      	 htmlelement+='                    </li>';
      	 htmlelement+='                    <li class="divider"></li>';
      	 htmlelement+='                    <li id="3column'+this.editor.id+'"><a>Three columns</a>';
      	 htmlelement+='                    </li>';
      	 htmlelement+='                </ul>';
      	 htmlelement+='            </div>';
      	 htmlelement+='        </div>';
	   	 htmlelement+=' <div id="contentFormatSpecific">';
     	 htmlelement+=' </div>';     	 
      	 htmlelement+='    <div class="clear"></div>';
      	 htmlelement+='<div class="gap10"></div>';
     	return htmlelement;

      },
      feedbackEditorPropertyLayout:function(){      	      	
      	var htmlelement="";
      	
      	 var elementType = this.type=="label" ? "Element: Label" : this.type=="inputField" ? "Element: Input field":"Element: Fill in the blank";
      	 htmlelement+='    <div class="tabContent tabProContent">';
  	   	 htmlelement+='        <p>Component: Input and Labels</p>';
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
  	   	 //htmlelement+='    <div id="linkAddress_'+this.editor.id+'" contenteditable="true"  data-placeholder="Enter Display Text" class="inputDummy"></div>';
  	   	 htmlelement+='        </div>';
  	   	 htmlelement+='        <button id="insert_'+this.feedback.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
  	   	 htmlelement+='        <div class="clear"></div>';
  	   	 htmlelement+='    </div>';
  	   	 htmlelement+='    <div class="clear"></div>';

      	return htmlelement;
      },
      populateFeedbackEditorProperties:function(){	    
      	$("#elementProperties").html(this.feedbackEditorPropertyLayout());
		$("#elementProperties").show();
		$("#properties").hide();
		
		this.afterFeedbackEditorPropertyLayout();
        $("#activeHyperlink").text("");

       /* Media object creates here for that component */
        
        var newMedia = new Media({id:this.feedback.id});
        $("#mediaProperties").html(newMedia.layout());
        $("#mediaProperties").show();
        newMedia.afterLayout();
        util.checkMediaInEditMode();
      },
      
      updateFeedbackEditor:function(event){    	
			var linkText=$("#linkText_"+this.feedback.id).val();
			var linkAddress=$("#linkAddress_"+this.feedback.id).val();
			var url=$("#linkAddress_"+this.feedback.id).val();	
			
			//validate URL with format like: "http://www.google.com/";
			if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
				if(linkText != ""){
					if(url.slice(-1)==="/"){
			 			url=url.substring(0,url.length-1);
			 		} 
			 		linkAddress=url;
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
      afterFeedbackEditorPropertyLayout:function(){
    	  	StudentEntry.addEvent( "insertHelp"+this.feedback.id,"click",this._openHelpModalForInsertHyperlink);
  	 		StudentEntry.addEvent( "insert_"+this.feedback.id, "click", this._updateFeedbackEditor);
      },
      /**
 	  * adds events for html elements of current option editor property pane
 	  */
 	 afterEditorPropertyLayout:function(){
 		if(this.contentFormat.type== "alphanumeric"){
 			 $("#formatter").html("Alphanumeric <span class='caret caretDrop'></span>");
 		}else if(this.contentFormat.type== "number"){
 			 $("#formatter").html("Number <span class='caret caretDrop'></span>");
 		}else if(this.contentFormat.type== "currency"){
 			 $("#formatter").html("Currency <span class='caret caretDrop'></span>");
 		}else if(this.contentFormat.type== "percentage"){
 			 $("#formatter").html("Percentage <span class='caret caretDrop'></span>");
 		}else if(this.contentFormat.type== "date"){
 			 $("#formatter").html("Date <span class='caret caretDrop'></span>");
 		}else if(this.contentFormat.type== "time"){
 			 $("#formatter").html("Time hh:mm:ss <span class='caret caretDrop'></span>");
 		} 		
 		if(this.orientation == 1){
 			$("#camponentFieldOrientationId_").html("One column <span class='caret caretDrop'></span>");
 		}else if(this.orientation == 2){
 			$("#camponentFieldOrientationId_").html("Two column <span class='caret caretDrop'></span>");
 		}else if(this.orientation == 3){
 			$("#camponentFieldOrientationId_").html("Three column <span class='caret caretDrop'></span>");
 		}
 		this.contentFormatSpecificLayout();
 		this.afterContentFormatSpecificLayout();
 		StudentEntry.addEvent( "alphanumeric"+this.editor.id, "click", this._changeFormatter,{"type":"alphanumeric"});
 		StudentEntry.addEvent( "number"+this.editor.id, "click", this._changeFormatter,{"type":"number"});
 		StudentEntry.addEvent( "currency"+this.editor.id, "click", this._changeFormatter,{"type":"currency"});
 		StudentEntry.addEvent( "percentage"+this.editor.id, "click", this._changeFormatter,{"type":"percentage"});
 		StudentEntry.addEvent( "date"+this.editor.id, "click", this._changeFormatter,{"type":"date"});
 		StudentEntry.addEvent( "time"+this.editor.id, "click", this._changeFormatter,{"type":"time"});
 		StudentEntry.addEvent( "charLimitHelp" + this.editor.id, "click", this._openHelpModalForCharLimit);
 		StudentEntry.addEvent( "1column"+this.editor.id, "click", this._changeOrientation,{"type":1});
	 	StudentEntry.addEvent( "2column"+this.editor.id, "click", this._changeOrientation,{"type":2});
	 	StudentEntry.addEvent( "3column"+this.editor.id, "click", this._changeOrientation,{"type":3});
	 	StudentEntry.addEvent("txtmaxLenght_"+this.editor.id,"keypress",this._restrictEvent);
	 	if (this.contentFormat.type != "alphanumeric") {
	 	    StudentEntry.removeEvent("1column" + this.editor.id, "click", this._changeOrientation, {"type": 1});
	 	    // code to changed color of disabled anchor tag(i.e 1 column tag)
	 	    $("#1column" + this.editor.id).find("a").hover(function () {
	 	        $(this).attr('style', 'background-color:#E4E4E6 !important');
	 	    }, function () {
	 	        $(this).attr('style', 'background-color:#E4E4E6 !important');
	 	    });
	 	}
 	 },
 	/**
 	 * updates field orientation
 	 */
 	changeOrientation: function (event) {
 	    if (typeof event.data === 'undefined') {
 	        this.orientation = '1';
 	    } else {
 	        this.orientation = event.data.type;
 	        if (event.data.type == 1) {
 	            this.orientation = 1;
 	            $("#camponentFieldOrientationId_").html("One column <span class='caret caretDrop'></span>");
 	        } else if (event.data.type == 2) {
 	            this.orientation = 2;
 	            $("#camponentFieldOrientationId_").html("Two column <span class='caret caretDrop'></span>");
 	        } else if (event.data.type == 3) {
 	            this.orientation = 3;
 	            $("#camponentFieldOrientationId_").html("Three column <span class='caret caretDrop'></span>");
 	        }
 	        question.activePage.doLayout();
 	        var i=0;
		    for( i in question.activePage.components){
		    	if(question.activePage.components[i].getId()==this.componentId){
		    		question.activePage.components[i].populateComp(); 
		    	}
		    }
		    $("#"+this.editor.id).focus();
 	    }
 	},
 	 /**
      * changeFormatter student entry
      */
 	  changeFormatter:function(event){
 		 if (event.data != undefined) {
  			var formatterEnum =new ContentFormatEnum();
	 		if(event.data.type== "alphanumeric"){
	 			this.contentFormat=formatterEnum.ALPHANUMERIC;
	 			 $("#formatter").html("Alphanumeric <span class='caret caretDrop'></span>");
	 		}else if(event.data.type== "number"){
	 			 this.contentFormat=formatterEnum.NUMBER;
	 			 $("#formatter").html("Number <span class='caret caretDrop'></span>");
	 		}else if(event.data.type== "currency"){
	 			this.contentFormat=formatterEnum.CURRENCY;
	 			 $("#formatter").html("Currency <span class='caret caretDrop'></span>");
	 		}else if(event.data.type== "percentage"){
	 			this.contentFormat=formatterEnum.PERCENTAGE;
	 			 $("#formatter").html("Percentage <span class='caret caretDrop'></span>");
	 			 if(this.contentFormat.showSymbol){
	 				 $("#"+this.editor.id).addClass("percentSymbol");
	 				 $("#"+this.answer.id).addClass("percentSymbol");
	 			 }
	 			 this.contentFormat.showThousandSeparator = false;
	 			
	 		}else if(event.data.type== "date"){
	 			this.contentFormat=formatterEnum.DATE;
	 			 $("#formatter").html("Date <span class='caret caretDrop'></span>");
	 		}else if(event.data.type== "time"){
	 			this.contentFormat=formatterEnum.TIME;
	 			 $("#formatter").html("Time <span class='caret caretDrop'></span>");
	 		}
	 		
	 		if(event.data.type== "currency"){
	 			 $("#"+this.editor.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
	 			 $("#"+this.answer.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
	 		}else{
	 			$("#"+this.editor.id).removeClass();
	 			$("#"+this.editor.id).addClass("inputDummy studentEntryInput-"+this.orientation);
	 			$("#"+this.answer.id).removeClass();
	 			$("#"+this.answer.id).addClass("inputDummy");
	 		}
	 		if($("#formatter").parent().hasClass("open")){
	 			$("#formatter").parent().removeClass("open");
	 		}
	 		//Removed zero state layout while adding new student entry
	 		if(event.data.type != 'alphanumeric' && this.orientation == 1)
	 			this.orientation = 2;
	 		//else
	 		//	this.orientation = 1;
	 		$("#camponentFieldOrientationId_").val(this.orientation);
 			question.activePage.doLayout();
 			this.populateEditorProperties();
 			this.contentFormatSpecificLayout();
 			this.afterContentFormatSpecificLayout();
      
      var questionFormulas = JSON.stringify(question.formulas);
      if(questionFormulas.indexOf(this.editor.id) != -1){
        var showCautionIconFlg = false;
        for(var i=0 ; i < question.formulas.length ; i++){
          var formulaString = JSON.stringify(question.formulas[i]);         
          if(formulaString.indexOf(this.editor.id) != -1){
            var showCautionIconFlg = question.formulas[i].isValidCurrency(question.formulas[i].equation);
            if(!showCautionIconFlg){
              this.showCautionIcon(this.editor.id,"changeFormat", showCautionIconFlg);
            } else{
              this.hideCautionIcon(this.editor.id);
            }
          }
        }
      }

      if(event.data.type== "alphanumeric"||event.data.type== "date"||event.data.type== "time"){
 			 this.showCautionIcon(this.editor.id,"changeFormat");
 		}else{
 			this.hideCautionIcon(this.editor.id);
 		}
 			return false;
 		 }             
      },
      /**
	      *  updates text of content editable divs to the object's editor text
	      */
      update:function(){
		  var selectedText = window.getSelection().toString() ;
     	 if(selectedText.length <=0 ){
     	 	this.editor.update();
     	 	this.updateAnswer();
     	 	this.feedback.update();
     	 	question.updateFormulaDestinations(this.feedback.id,util.getFormulas(this.feedback.textWithoutFormatting));
     	 	util.updateFormula(this.feedback);
     	 }
      },
      /**
	      * form comma  seperated number 
	      */
      updateAnswer:function(){
    	  if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
			  this.answer.text=$("#"+this.answer.id).text().replace(/,/g,'');
    		  var answerText = this.answer.text;
	       		if( this.answer.text != '' ) {
	       			answerText = this.roundOff(parseFloat(answerText),this.contentFormat.decimalPlaces);	
	       			answerText = (isNaN(answerText))?"":answerText;
	       			if(this.contentFormat.showThousandSeparator){
	       				var commaText = answerText.toString().split(".");
	       				commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	       				answerText=commaText.join(".");
	       			}
	       			/*update answer text*/
	       			this.answer.text = answerText;
	       		}
	       		$("#" + this.answer.id).text(answerText);
		  }else{
			  this.answer.update(); 
		  }  
      },
     
      validateAnswer:function(e){
    	  if(e.data.id==this.answer.id){
	    	  var text=$('#'+this.answer.id).text().trim(); 
			   if(text==""){
				   text=$('#'+this.answer.id).val().trim();
			   }else{
				   if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
					   text=text.replace(/,/g,'');
		    		  }
			   }
	    	  var valid=this.isValidAnswerOrStudentResponse(text);
	    	  if(!valid){
	    		  var editorId =e.data.id;
	    		  new Modal({
		   			    	  id : 1,
		   			    	  headingText : "Validation Error",
		   			    	  containtText : "Content is in wrong format",
		   			    	  closeActionEvent:function(){
		   			    		 $('#'+editorId).trigger("focus");
		   			    	  }
		  	  	    		}).getWarningModal();
	    	  }
	    	  else
	    		  this.updateAnswer(); 
    	  }
      },
      roundOff:function(number,decimal)
      {
    	  if(number.toString().indexOf('.') == -1) {
    		  number = number.toFixed(decimal);
		  }else{
			 var strEvaluatedValue =  number.toString().split(".");
			 if(strEvaluatedValue[1].length < decimal){
				 number = number.toFixed(decimal);
			 }else{
				 var multiplier = Math.pow(10, decimal);
				 number = (Math.round(number * multiplier) / multiplier);
				 if(number.toString().indexOf('.') == -1) {
		    		number = number.toFixed(decimal);
				 }else{
					 var str =  number.toString().split(".");
					 if(str[1].length < decimal){
						 number = number.toFixed(decimal);
					 }
				 }
			 }
		  }
    	  return number;
      },
      /**
       * validate student entry
       */
      validateStudentResponse:function(e){
    	  try{
    		  e.explicitOriginalTarget.click();
    	  }catch(err){}
    	  
    	  var text=$('#'+this.editor.id).text().trim(); 
    	      	 
		   if(text==""){
			   text=$('#'+this.editor.id).val().trim();
		   }
		   if(this.type=='fillInTheBlank'){
 			  if(text !=""){
     			  $("#"+this.editor.id).attr('data-div-placeholder-content','');
     		  }else{
     			  $("#"+this.editor.id).removeAttr('data-div-placeholder-content');
     		  } 
 		  }
		   var fullCmpId=null;
		   if(text != ""){
			   
			   var valid=this.isValidAnswerOrStudentResponse(text);
		    	  if(!valid){
		    		  var editorId =e.data.id;
		    		  var containtText ="Content is in wrong format";
		    		  if(this.contentFormat.type=="date"){
							var dateFormat=this.contentFormat.dateFormat=="monthDayYear"?"MM/DD/":"DD/MM/";
							dateFormat +=this.contentFormat.yearFomat==4 ?"YYYY":"YY";
							containtText = "You have entered an invalid value for date. Use "+dateFormat+" format.";
					  }else if(this.contentFormat.type=="time"){
							containtText = "You have entered an invalid value for time. Use HH:MM:SS format.";
						}
					  if($(".reveal-modal").css('visibility') != 'visible'){
						new Modal(
				   			      {
				   			    	  id : 1,headingText : "Validation Error",
				   			    	  containtText : containtText,
				   			    	  closeActionEvent:function(){
				   			    		 if($('#'+editorId).hasClass("hasDatepicker")){
				   			    		   $.datepicker._clearDate('#'+editorId);
				   			    		 }				   			    		
				   			    		 $('#'+editorId).trigger("focus");
										 $(".close-reveal-modal").unbind("click");
				   			    	  }
				   			      }).getWarningModalForStudent();	
						
						setTimeout(function(){
							$(".reveal-modal").find(".close-reveal-modal").trigger("click");
							$("#modalDivId").hide();
						},3000);
						
					  }
		    	  }else{
		    		  if(question.mode==MODE_TEST && this.contentFormat.type=="alphanumeric"){
		    			  try{
		    				  var enteredTextLength = $("#"+this.editor.id).text().length;
		    				  var textLimit = parseInt($("#charLimit_" + this.editor.id ).text());
		    				  if(enteredTextLength > textLimit){
		    						 var editor = this;
		    						 new Modal(
		    	    		   			    {
		    	    		   			      id : editorId,headingText : "Validation Error",
		    	    		   			      containtText : "Character Limit Exceeded",
		    	    		   			      closeActionEvent:function(){
		    	    		   			    	editor.highlightText(editor.editor.id);
		    	    		   			      }
		    	    		   			    }).getWarningModalForStudent();
		    					 }
		    			  }catch(err){console.log(err);}
		    		  }
		    		  else{
		   			   if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage' ){				  
		   				   text=text.replace(/,/g,'');				  
		   				   if( text != '' ) {			  
		   					   text = this.roundOff(parseFloat(text),this.contentFormat.decimalPlaces);
		   					   var displayText=text;
		   					   if(this.contentFormat.showThousandSeparator){
		   						   var commaText = text.toString().split(".");
		   						   commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		   						   displayText=commaText.join(".");
		   					   }
		   					$("#" + this.editor.id).text(displayText);
		   		       		}
		   			   }
		   			   else if(this.contentFormat.type=='currency'){
		   				    var displayText =text.replace(/,/g,'');
			   				displayText=parseFloat(displayText);
			   				$("#" + this.editor.id).text(displayText);
		   			   }
		   		   }
		    		  
		    		 
		    		 /*changes for branching based on responses*/
		             var currentComponent = null;
					 var i=0;
		     		 for (i in question.activePage.components) {
		     			if (question.activePage.components[i].id == this.componentId) {
		     				currentComponent = question.activePage.components[i];
		     			}
		     		 }
		     		 var isBranchedComp = false;
		     		 fullCmpId = currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix+currentComponent.id; 
		     		 if(currentComponent.sections.length > 1){
		     			var j = 0;
		     			for(j in currentComponent.sections){	    		
		      	    		if(currentComponent.sections[j].id==this.sectionId){
		      	    			if(currentComponent.sections[j].isBranched){
		      	    				isBranchedComp = true;
		      	    			}
		      	    		}
		    			}
		     		 }else{
		     			if(currentComponent.isBranched){
		     				isBranchedComp = true;
		     			}
		     		 }
		     		 
		     		 if(isBranchedComp){
		     			var stdEntry = null;
  	    				var j = 0;
  	    				var index = 0;
  	    				for (index in question.branches) {
	  	       				if (question.branches[index].cId == fullCmpId) {
	  	       					var branch = question.branches[index];
	  	       					this.setResetFlag(branch, false);
	  	       				}
  	    				}
  	    				for(j in currentComponent.sections){	    
	  	    				for(index in currentComponent.sections[j].studentEntries){
	  	    					stdEntry = currentComponent.sections[j].studentEntries[index];
	  	    					currentComponent.sections[j].studentEntries[index].isCndtnTrue = false;
	  	    					this.setMappedEntities(fullCmpId,stdEntry.editor.id,stdEntry.editor.text);
	  	    				}
  	    				}
  	    				var bId = 0;
  	    				 for(bId in question.branches){
  	    					 if(question.branches[bId].criteria == "multi" && (question.branches[bId].cId == fullCmpId || question.branches[bId].cId_2 == fullCmpId)){
  	    						 util.checkMultiCriteriaMapping(question.branches[bId]);
  	    					 }
  	    				 }
  	    				question.actvPageShowHide();
		     		 }
		     		 this.updateStudentResponse(e);
		  		  }
		    	  
		    	  
		    	 this.validateFormulas();
		    	 var studentResponse=this.editor.text.trim();  
			     studentResponse = studentResponse.replace("/&nbsp;/g","");
		    	 util.checkTableFormulaCell(studentResponse);
		    	 
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
					
					
					//var ht1 = $("#wrapper").height();
					
					if(ht>900)
					{
					 myHeight = ht+150;
					}				
					
					EZ.resize(1125,myHeight);
		    	 
		    	 
		  		 return valid;
		   }
		   else{
			   var authorEntries = $("h6 .formula");
			   for(var i=0; i<authorEntries.length;i++){
				   	if(authorEntries[i].innerHTML.indexOf(this.editor.id) != -1){
				   		authorEntries[i].nextSibling.innerHTML = "= _";
				   		authorEntries[i].nextSibling.nextSibling.innerHTML="_";
				   		for(var j = 0; j < authorEntries[i].childNodes.length; j++)
						{
							var childNode = authorEntries[i].childNodes[j];
							if(childNode.className == $('#'+this.editor.id).attr("id")){
								childNode.innerHTML="_";
							}
							
						}
				   	}
			   }
			   this.validateFormulas();
			   var bId = 0;
				 for(bId in question.branches){
					 if(question.branches[bId].criteria == "multi" && (question.branches[bId].cId == fullCmpId || question.branches[bId].cId_2 == fullCmpId)){
						 util.checkMultiCriteriaMapping(question.branches[bId]);
					 }
				 }
			   this.setMappedEntities(fullCmpId,this.editor.id,"");
			     var currentComponent = null;
				 var i=0;
	     		 for (i in question.activePage.components) {
	     			if (question.activePage.components[i].id == this.componentId) {
	     				currentComponent = question.activePage.components[i];
	     			}
	     		 }
	     		 var isBranchedComp = false;
	    		 fullCmpId = currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix+currentComponent.id; 
	     		 if(currentComponent.sections.length > 1){
	     			var j = 0;
	     			for(j in currentComponent.sections){	    		
	      	    		if(currentComponent.sections[j].id==this.sectionId){
	      	    			if(currentComponent.sections[j].isBranched){
	      	    				isBranchedComp = true;
	      	    			}
	      	    		}
	    			}
	     		 }else{
	     			if(currentComponent.isBranched){
	     				isBranchedComp = true;
	     			}
	     		 }
	     		 
	    		 if(isBranchedComp){
		     			var stdEntry = null;
	    				var j = 0;
	    				var index = 0;
	    				for (index in question.branches) {
	  	       				if (question.branches[index].cId == fullCmpId || question.branches[index].cId_2 == fullCmpId) {
	  	       					var branch = question.branches[index];
	  	       					this.setResetFlag(branch, false);
	  	       				}
	    				}
	    				for(j in currentComponent.sections){	    
	  	    				for(index in currentComponent.sections[j].studentEntries){
	  	    					stdEntry = currentComponent.sections[j].studentEntries[index];
	  	    					currentComponent.sections[j].studentEntries[index].isCndtnTrue = false;
	  	    					this.setMappedEntities(fullCmpId,stdEntry.editor.id,stdEntry.editor.text);
	  	    				}
	    				}
	    			
	    				question.actvPageShowHide();
		     	 }
			   //to solve performance issue
 			   //question.activePage.doStudentLayout();
 			   question.actvPageShowHide();
 			  var myHeight= 950;
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
					
					if(ht>950)
					{
					 myHeight = ht+150;
					}				
					
					EZ.resize(1125,myHeight);
		   }
      },
      /**
       * validate student entry
       */
      isValidAnswerOrStudentResponse:function(text){
    	  if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
    		  text=text.replace(/,/g,'');  
    	  }
        if(this.contentFormat.type=="date"){
          if (this.contentFormat.yearFomat == 4) {
                if (this.contentFormat.dateFormat=='monthDayYear') {
                    this.contentFormat.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{4})$/;
                  }
                  else{
                    this.contentFormat.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{4})$/;
                  }
              } else if (this.contentFormat.yearFomat == 2) {
                if (this.contentFormat.dateFormat=='monthDayYear') {
                    this.contentFormat.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{2})$/;
                  }
                  else{
                    this.contentFormat.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{2})$/;
                  }
              }
        }    	  	
  			var regExpression=this.contentFormat.regExp;
  			
  			var valid =true;
  			if (text.trim().length>0) {
  				if(regExpression.test(text)){
  					if(this.contentFormat.type=="date"){
  	  					var matcher = text.split(/[-\/.]/);
  	  					var month ="";
  	  					var day="";
  	  					var year="";
  	  						 year = matcher[2];
  	  						if(this.contentFormat.dateFormat=="monthDayYear"){
  	  	  						 month = matcher[0];
  	  	  						 day =matcher[1];
  	  	  					}else{
  	  	  						 month = matcher[1];
  	  	  						 day = matcher[0];
  	  	  					}
  	  						
  	  						 if(day >31 || month > 12){
  	  							valid =false;
  	  						 }else{
  	  						 if (day=="31" && 
  	  								  (month=="4" || month =="6" || month=="9" ||
  	  						                  month=="11" || month=="04" || month =="06" ||
  	  						                  month=="09")) {
  	  							 		valid= false; // only 1,3,5,7,8,10,12 has 31 days
  	  							     } else if (month=="2" || month=="02") {
  	  						                  //leap year
  	  							    	  if( year.length<4){
  	  							    		year = "20"+year;  
  	  							    	  }
  		  								  if(year % 4==0){
  		  									  if(day=="30" || day=="31"){
  		  										valid= false;
  		  									  }else{
  		  										valid= true;
  		  									  }
  		  								  }else{
  		  								         if(day=="29"||day=="30"||day=="31"){
  		  								        	valid= false;
  		  								         }else{
  		  								        	valid= true;
  		  								         }
  		  								  }
  	  							      }else{				 
  	  							    	valid= true;				 
  	  							      }
  	  						 }
  	  						   
  	  					}
  				}else{
  					valid=false;
  					}
  				}
  			
  			return valid;
      },
      /**
       * is filled
       * @returns {Boolean}
       */
	  	isStudentEntryFilled:function(){
	  		var isFilled = {status:true};
	  		if($("#answerDiv_"+this.answer.id).css('display') == 'block'){
	  			$("#htmlToTextConvertor").html(this.answer.text);	  			
		  		var studentEntryText = $("#htmlToTextConvertor").text();
		  		if(studentEntryText.trim().length !=0){
		  			var regExpression=this.contentFormat.regExp;
		  			if (studentEntryText.trim().length>0 && !regExpression.test(studentEntryText)) {
		  				isFilled.status=false;
		  				isFilled.message= "Content is in wrong format";
		  				isFilled.field = this.answer.id;
		  			}
		  		}else{
		  			isFilled.status=false;
		  		}
		  		
	  		}
	  		return isFilled;
	  		 	   
	  	},
      /**
       * after layout bind events
       */
      afterLayout:function(){
    	  console.log("after layout");
    	  StudentEntry.addEvent(this.editor.id, "click", this._populateEditorProperties ); 
    	  StudentEntry.addEvent(this.feedback.id, "click", this._populateFeedbackEditorProperties ); 
    	  StudentEntry.addEvent( "plus_"+this.editor.id, "click", this._addStudentEntry );
    	  StudentEntry.addEvent( "minus_"+this.editor.id, "click", this._removeStudentEntry );
    	  StudentEntry.addEvent("expandLink_"+this.editor.id, "click", this._toggleFeedback);
          StudentEntry.addEvent("collapseLink_"+this.feedback.id, "click", this._toggleFeedback);
          if(this.contentFormat.type=='number'){
        	  this.contentFormat.updateFormatter();
          }
          if(this.contentFormat.type=='currency'){
        	  $("#"+this.editor.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
        	  $("#"+this.answer.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
          }
          if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
        	  if(this.contentFormat.showSymbol){
	 				 $("#"+this.editor.id).addClass("percentSymbol");
	 				 $("#"+this.answer.id).addClass("percentSymbol");
	 			 }
        	  this.contentFormat.updateFormatter();
          }
          if(this.contentFormat.type=='time'){
			 $('#'+this.editor.id).attr('data-placeholder', 'Student entry hh:mm:ss');
          }
          if(this.contentFormat.type=='date'){
        	  if(this.contentFormat.dateFormat=="monthDayYear"){
        		  $('#'+this.editor.id).attr('data-placeholder', 'Student entry mm/dd/yy');
        	  }else{
        		  $('#'+this.editor.id).attr('data-placeholder', 'Student entry dd/mm/yy');
        	  }
        	  this.contentFormat.updateFormatter();
          }
          StudentEntry.addEvent(this.answer.id, "blur", this._validateAnswer,{id:this.answer.id} );
          StudentEntry.addEvent(this.feedback.id, "blur", this._update );
          StudentEntry.addEvent(this.answer.id, "paste", this._filter );
          StudentEntry.addEvent(this.feedback.id, "paste", this._filter );
          this.feedback.afterEditorlayout();
      },
      /**
       * after studentlayout bind events
       */
      afterStudentLayout:function(){
    	 this.validateFormulas();
    	 StudentEntry.addEvent(this.editor.id, "blur", this._validateStudentResponse,{id:this.editor.id} );
         StudentEntry.addEvent(this.editor.id, "paste", this._filter );
         StudentEntry.addEvent(this.editor.id, "paste", this._updateStudentResponse );
     	var elem = $("#"+this.editor.id+"_chars");
     	
      	if(this.contentFormat.type=='date'){
      		var dateFormat=this.contentFormat.dateFormat=="monthDayYear"?"mm/dd/":"dd/mm/";
    		dateFormat +=this.contentFormat.yearFomat==4 ?"yy":"y";
    		var currentEditor=this.editor;
    		var object=this;
    		$("#"+this.editor.id).datepicker({
  			dateFormat: dateFormat,
  			onSelect: function(dateText, inst) {
  				inst.dateFormat=dateFormat;
  				$("#"+currentEditor.id).val( dateText );
  				object.updateStudentResponse();
  			},
  			beforeShow: function(input) {
  				$("#"+currentEditor.id).unbind('blur');
			},
			onClose: function(dateText, inst) {
				StudentEntry.addEvent(object.editor.id, "blur", object._validateStudentResponse,{id:object.editor.id} );
			}
    		});
    		StudentEntry.addEvent(object.editor.id, "keyup", object._updateStudentResponse,{id:object.editor.id} );
      	}else{
      		 StudentEntry.addEvent(this.editor.id, "keyup", this._updateStudentResponse );
      	}
      	if(this.contentFormat.type=='alphanumeric'){
     		this.updateCharacterCount();
     		StudentEntry.addEvent(this.editor.id, "focus keyup keypress blur input", this._updateCharacterCount );
     		 StudentEntry.addEvent(this.editor.id, "keyup", this._updateStudentResponse );
     	}
      	if(this.contentFormat.type=='number'|| this.contentFormat.type=='percentage'||this.contentFormat.type=='date'){
      		this.contentFormat.updateFormatter();
      	}
      	$('.stdQueLabel').each(function (){
			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
        });
      },
      /**
       * update char count after layout
       */
      updateCount:function(){
              var chars = $("#"+this.editor.id).text().length;
              var limit= this.editor.maxLength;
              if (chars > limit) {
                var  beforeSpan = $("#"+this.editor.id).text().substr(0, limit);
                var afterSpan=$("#"+this.editor.id).text().substr(limit, $("#"+this.editor.id).text().length);
                $("#"+this.editor.id).html(beforeSpan+"<span>"+afterSpan+"</span>");
              }
              var count= limit - chars ;
              var text="/"+limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              $("#"+this.editor.id+"_chars").html(  count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" "+ text);
      },
      filter:function(event){
        util.removePasteImage(event.originalEvent.clipboardData,event);
    	  /*if(question.mode==MODE_TEST){
    		  util.cleanHtml(event.originalEvent.clipboardData,event);
    	  }else{
    		  util.removePasteImage(event.originalEvent.clipboardData,event);
    	  }*/
  		
  	  },
      /**
       * updates student Response
       */
      updateStudentResponse: function(e){
    	  var isDelete=false;
    	  /*check for delete key pressed */
  		  if(typeof e != "undefined"){
  			if(e.keyCode == 46){ /*check for delete */
  				isDelete=true; 
  			}
  		  }
    	  if(this.contentFormat.type=='date'){
    		/*erase val when delete key pressed */
    		if(isDelete){
    		   $("#"+this.editor.id).val(''); 
    		}    		
         	this.editor.text=$("#"+this.editor.id).val();
    	  }else{
    		 /*erase html when delete key pressed */
      		 if(isDelete){
      			if($("#"+this.editor.id).html()=="<br>"){
      				$("#"+this.editor.id).html('');
      			}
      		 }
    		  var responseText = $("#"+this.editor.id).html();
    		  responseText = responseText.substring(0, this.editor.maxLength);
    		  this.editor.text = responseText;
    		  if(this.type=='fillInTheBlank'){
    			  if(responseText !=""){
        			  $("#"+this.editor.id).attr('data-div-placeholder-content','');
        		  }else{
        			  $("#"+this.editor.id).removeAttr('data-div-placeholder-content');
        		  } 
    		  }
    		 
    	  }
 		  question.updateProgressBar();
      },
      setMappedEntities:function(cId, studentEntryId, studentResponse){
    	 studentResponse = (isNaN(studentResponse))?"":studentResponse.replace(/,/g , "");
     	 for(var index in question.branches){
     		 if(question.branches[index].cId == cId || question.branches[index].cId_2 == cId){
 	    	   var branch = question.branches[index];
 	    	   if(branch.mappingIndicator == "answerOption"){
 	    		   for(var i in branch.pathMaps){
 	  	  	    	 if(branch.pathMaps[i].compOptionId == studentEntryId || branch.pathMaps[i].drpDwnEditorId == studentEntryId){
 	  	  	    	    var satisfiedConditionIds = [];
						if(studentResponse==""){
							this.setResetFlag(branch, false);
							satisfiedConditionIds = [];
 	  	  	    		}
						for ( var index in branch.pathMaps[i].condition) {
							var conditionIdVal = branch.pathMaps[i].condition[index].selectConditionVal;
							var conditionId = branch.pathMaps[i].condition[index].id;
							studentReponse = parseInt(studentResponse);
							var autherEntryVal = parseInt(branch.pathMaps[i].condition[index].authorEntryVal);
							switch (conditionIdVal) {
								case "1":
									if (studentResponse == autherEntryVal) {
										satisfiedConditionIds.push(conditionId);
									}
									break;
								case "2":
									if (studentResponse < autherEntryVal) {
										satisfiedConditionIds.push(conditionId);
									}
									break;
								case "3":
									if (studentResponse > autherEntryVal) {
										satisfiedConditionIds.push(conditionId);
									}
									break;
								case "4":
									if (studentResponse >= autherEntryVal) {
										satisfiedConditionIds.push(conditionId);
									}
									break;
								case "5":
									if (studentResponse <= autherEntryVal) {
										satisfiedConditionIds.push(conditionId);
									}
									break;
							}
						}
						for ( var j in branch.pathMaps[i].paths) {
							if(satisfiedConditionIds.length != 0){
								var idIndex = 0;
								for(idIndex = 0; idIndex < satisfiedConditionIds.length; idIndex++){
									if(branch.pathMaps[i].paths[j].conditionId == satisfiedConditionIds[idIndex] && studentResponse != ""){
										 this.setResetFlag(branch, true, i, j);
										 this.isCndtnTrue = true;
			  						}
								}
	  						}
						}
 	  	  	    	 }
 	  			   } 
 	  	       }
     	     }
 	  	 }
//     	$("#"+this.editor.id).trigger("focus");
      },
      setResetFlag : function(branch, flag, pathmapIndex, pathIndex){
    	  for ( var i in branch.pathMaps) {
    		  for(var j in branch.pathMaps[i].paths){
    			  var loopCondition  =  (!flag) ? true : (flag && pathmapIndex == i && pathIndex == j)? true : false; 
  				  if(loopCondition){
  					var partId, compId, secId;
					partId =  branch.pathMaps[i].paths[j].partId;
					compId =  branch.pathMaps[i].paths[j].compId;
					secId  =  branch.pathMaps[i].paths[j].sectionId;
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
											} else{
												if(comp.sections != undefined && !isSubCategory){
													for(var index3 in comp.sections){
														if(comp.sections[index3].id == secId){
															if(comp.sections[index3].isBranchDest){
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
      /**
       * opens modal popup for character limit
       */
      openHelpModalForCharLimit: function (event) {
          new Modal({
              id: 1,
              headingText: message.getcharLimitHeader(),
              containtText: message.getcharLimitHeader()
          }).openHelpModal();
      },
      /**
       * updates editor properties
       */
      updateEditor: function (event) {
			if (this.contentFormat.type == "alphanumeric") {
				var maxLengthValue = $("#txtmaxLenght_" + this.editor.id).val();
				if( maxLengthValue != '' ) {
					maxLengthValue = parseInt(maxLengthValue.replace(/[^0-9]+/g, ""));
				}
				
				this.editor.maxLength = maxLengthValue;
				if(this.editor.maxLength>15000){
					var editor ="#txtmaxLenght_" +this.editor.id;
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Max Length should be less or equal to 15,000",
		  	   			    	  closeActionEvent:function(){
		  	   			    		 $(editor).trigger("focus");
		  	   			    	  }
		  	   			      }).getWarningModal();
		  	  			 $("#warningModalId").css('top','300px');
				}
				
				var displayMaxLengthValue = this.editor.maxLength;
				if( this.editor.maxLength != '' ) {
					displayMaxLengthValue = this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				$("#txtmaxLenght_" + this.editor.id).val(displayMaxLengthValue);
			} else if (this.contentFormat.type == "number") {
				var decimalPlaces =$("#txtdecimal_"+this.editor.id).val();
				
				this.contentFormat.decimalPlaces = decimalPlaces.trim().length>0?parseInt(decimalPlaces.trim()):2;
				if(this.contentFormat.decimalPlaces<0 && this.contentFormat.decimalPlaces>6){
					var editor ="#txtdecimal_" +this.editor.id;
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Decimal places should be in between 0 -6",
		  	   			    	  closeActionEvent:function(){
		  	   			    		 $(editor).trigger("focus");
		  	   			    	  }
		  	   			      }).getWarningModal();
		  	  			 $("#warningModalId").css('top','300px');
				}
				this.contentFormat.updateFormatter();
				
				var answerText = this.answer.text;
				answerText = this.roundOff(parseFloat(answerText),this.contentFormat.decimalPlaces);
				answerText = (isNaN(answerText))?"":answerText;
				$("#" + this.answer.id).text(answerText);
				
				this.contentFormat.showThousandSeparator = $('#showSeparatorLabelBtnId'+this.editor.id).prop('checked');
			} else if (this.contentFormat.type == "currency") {
			} else if (this.contentFormat.type == "percentage") {
				var decimalPlaces =$("#txtdecimal_"+this.editor.id).val();
				
				this.contentFormat.decimalPlaces = decimalPlaces.trim().length>0?parseInt(decimalPlaces.trim()):2;
				if(this.contentFormat.decimalPlaces<0 && this.contentFormat.decimalPlaces>6){
					var editor ="#txtdecimal_" +this.editor.id;
					new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Decimal places should be in between 0 -6",
		  	   			    	  closeActionEvent:function(){
		  	   			    		 $(editor).trigger("focus");
		  	   			    	  }
		  	   			      }).getWarningModal();
		  	  			 $("#warningModalId").css('top','300px');
				}
				this.contentFormat.updateFormatter();
				this.contentFormat.showSymbol = $('#showPercentLabelBtnId'+this.editor.id).prop('checked');
			} else if (this.contentFormat.type == "date") {
				this.contentFormat.yearFomat = $("#4"+this.editor.id).prop("checked");
				this.contentFormat.yearFomat = $("#2"+this.editor.id).prop("checked");
			} else if (this.contentFormat.type == "time") {
			}       
      },
  	 toggleFeedback : function(){
  		if($("#feedbackDiv_"+this.feedback.id).css("display")=='none'){
  			$("#feedbackDiv_"+this.feedback.id).show("slow");
  			$("#expandLink_"+this.editor.id).hide("slow");
  		}else{
  			$("#feedbackDiv_"+this.feedback.id).hide("slow");
  			$("#expandLink_"+this.editor.id).show("slow");
  		}
  	 },
  	 addStudentEntry:function(){
  	  var i = 0;
		for (i in page.components) {
			if (page.components[i].getId() == this.componentId) {
				var j = 0;
				for (j in page.components[i].sections) {
					if (page.components[i].sections[j].id == this.sectionId) {
						var newId = page.components[i].sections[j].studentEntries[page.components[i].sections[j].studentEntries.length - 1].getId() + 1;
						var conentFormatter= page.components[i].sections[j].studentEntries[page.components[i].sections[j].studentEntries.length - 1].contentFormat;
						var orientationPrevious = page.components[i].sections[j].studentEntries[page.components[i].sections[j].studentEntries.length - 1].orientation;
						var contentFormat = null;
						if (conentFormatter.type == "alphanumeric") {
							contentFormat= new ContentFormatEnum(conentFormatter).ALPHANUMERIC;
						} else if (conentFormatter.type == "number") {
							contentFormat= new ContentFormatEnum(conentFormatter).NUMBER;
							contentFormat.updateFormatter();
						} else if (conentFormatter.type == "currency") {
							contentFormat= new ContentFormatEnum(conentFormatter).CURRENCY;
						} else if (conentFormatter.type == "percentage") {
							contentFormat= new ContentFormatEnum(conentFormatter).PERCENTAGE;
							contentFormat.updateFormatter();
						} else if (conentFormatter.type == "date") {
							contentFormat= new ContentFormatEnum(conentFormatter).DATE;
							contentFormat.updateFormatter();
						} else if (conentFormatter.type == "time") {
							contentFormat= new ContentFormatEnum(conentFormatter).TIME;
						}
						if(contentFormat == "alphanumeric" && orientationPrevious==1)
						{
							orientationPrevious = 2;
						}
						var studentEntryConfig = {
							id : newId,
							componentId : this.componentId,
							componentIdPrefix : this.componentIdPrefix,
							sectionId : this.sectionId,
							orientation : orientationPrevious,
							contentFormat : contentFormat
						};
						var option = new StudentEntry(studentEntryConfig);
						page.components[i].sections[j].addStudentEntry(option);
						var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id);
						var $lastAuthorEntry = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find("#rowPagesection"+id).last();
						if ($lastAuthorEntry.find(".colPageSection").find(".plusBtn").is(":visible"))
							$lastAuthorEntry.find(".colPageSection").find(".plusBtn").hide();
						$lastAuthorEntry.after(option.layout(true));
						option.updateAnswerLayout( page.components[i].acceptAnyAnswer);
						$lastAuthorEntry.find(".colPageSection").find(".minusBtn").show();
						option.afterLayout();
						this.hideCautionIcon(id);
					}
				}
			}
		}
  	},
  	removeStudentEntry:function(){
  		 var i = 0;
  		var formulaName="";
	  		for (i in page.components) {
	  			if (page.components[i].getId() == this.componentId) {
	  				var j = 0;
	  				for (j in page.components[i].sections) {
	  					if (page.components[i].sections[j].id == this.sectionId) {
	  						var k=0;
	  						
	  						for(k in page.components[i].sections[j].studentEntries){
	  		  	    			if(page.components[i].sections[j].studentEntries[k].id==this.id){
	  		  	    				this.showCautionIcon(this.editor.id,"removeEntry");
	  		  		    				page.components[i].sections[j].removeStudentEntry(page.components[i].sections[j].studentEntries[k]);
	  		  		    				var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id);
		    							$("#rowPagesection"+id).remove();
		    							var lastOption=$("#rowPagesection"+page.components[i].sections[j].studentEntries[page.components[i].sections[j].studentEntries.length-1].editor.id);
  		    							lastOption.find(".colPageSection").find(".plusBtn").show();
		    							if(page.components[i].sections[j].studentEntries.length<=1){
		    							lastOption.find(".colPageSection").find(".minusBtn").hide();
		    							}
	  		  	    				}		
	  		  	    			}
	  					}
	  				}
	  			}
	  		}
	  		
  	},
  	/**
  	 * update property layout as per content format
  	 */
  	contentFormatSpecificLayout: function () {
  	    var htmlelement = "";
  	    var contentFormat = this.contentFormat.type;
  	    if (contentFormat == "alphanumeric") {
  	        htmlelement += this.alphanumericPropertyLayout();
  	    } else if (contentFormat == "number") {
  	        htmlelement += this.numberPropertyLayout();
  	    } else if (contentFormat == "currency") {
  	        htmlelement += this.currencyPropertyLayout();
  	    } else if (contentFormat == "percentage") {
  	        htmlelement += this.percentagePropertyLayout();
  	    } else if (contentFormat == "date") {
  	        htmlelement += this.datePropertyLayout();
  	    } else if (contentFormat == "time") {
  	        htmlelement += this.timePropertyLayout();
  	    }
  	    $('#contentFormatSpecific').html(htmlelement);
  	    this.afterContentFormatSpecificLayout();
  	},
  	/**
  	 * binds event for content format specific layout
  	 */
  	afterContentFormatSpecificLayout: function () {
  	    if (this.contentFormat.type == "alphanumeric") {
  	        StudentEntry.addEvent("txtmaxLenght_" + this.editor.id, "blur", this._updateEditor);
  	        StudentEntry.addEvent("txtmaxLenght_"+this.editor.id,"keypress",this._restrictEvent);
  	    } else if (this.contentFormat.type == "number") {
  	        StudentEntry.addEvent("showSeparatorLabelBtnId" + this.editor.id, "click", this._showSeparator);
  	        if (this.contentFormat.showThousandSeparator) {
  	            $('#showSeparatorLabelBtnId' + this.editor.id).prop('checked', true);
  	        } else {
  	            $('#showSeparatorLabelBtnId' + this.editor.id).prop('checked', false);
  	        }
  	        StudentEntry.addEvent("txtdecimal_" + this.editor.id, "blur", this._updateEditor);
  	        StudentEntry.addEvent("txtdecimal_"+this.editor.id,"keypress",this._restrictEvent);
  	        $("#txtdecimal_"+this.editor.id).jStepper({minValue:0, maxValue:6});
  	    } else if (this.contentFormat.type == "currency") {
  	        if (this.contentFormat.currencyType == "dollar") {
  	            $("#currencySelector" + this.editor.id).html("US, Dollar ($) <span class='caret caretDrop'></span>");
  	        } else if (this.contentFormat.currencyType == "euro") {
  	            $("#currencySelector" + this.editor.id).html("EU, Euro (&#8364;) <span class='caret caretDrop'></span>");
  	        } else if (this.contentFormat.currencyType == "yen") {
  	            $("#currencySelector" + this.editor.id).html("Japan, Yen (&#165;) <span class='caret caretDrop'></span>");
  	        } else if (this.contentFormat.currencyType == "pound") {
  	            $("#currencySelector" + this.editor.id).html("UK, Pound (&#163;) <span class='caret caretDrop'></span>");
  	        }
  	        $("#currencySymbol" + this.editor.id).html(this.contentFormat.symbol);
  	        StudentEntry.addEvent("dollar" + this.editor.id, "click", this._changeCurrency, {
  	            "type": "dollar"
  	        });
  	        StudentEntry.addEvent("euro" + this.editor.id, "click", this._changeCurrency, {
  	            "type": "euro"
  	        });
  	        StudentEntry.addEvent("yen" + this.editor.id, "click", this._changeCurrency, {
  	            "type": "yen"
  	        });
  	        StudentEntry.addEvent("pound" + this.editor.id, "click", this._changeCurrency, {
  	            "type": "pound"
  	        });
  	    } else if (this.contentFormat.type == "percentage") {
  	        StudentEntry.addEvent("txtdecimal_" + this.editor.id, "blur", this._updateEditor);
  	        StudentEntry.addEvent("txtdecimal_"+this.editor.id,"keypress",this._restrictEvent);
  	        StudentEntry.addEvent("showPercentLabelBtnId" + this.editor.id, "click", this._changePercentSymbol);
  	        if (this.contentFormat.showSymbol) {
  	            $('#showPercentLabelBtnId' + this.editor.id).prop('checked', true);
  	            $("#"+this.editor.id).addClass("percentSymbol");
				$("#"+this.answer.id).addClass("percentSymbol");
  	        } else {
  	            $('#showPercentLabelBtnId' + this.editor.id).prop('checked', false);
  	        }
  	      $("#txtdecimal_"+this.editor.id).jStepper({minValue:0, maxValue:6});
  	    } else if (this.contentFormat.type == "date") {
  	        if (this.contentFormat.dateFormat == "monthDayYear") {
  	            $("#dateType" + this.editor.id).html("Month/day/year <span class='caret caretDrop'></span>");
  	        } else if (this.contentFormat.dateFormat == "dayMonthYear") {
  	            $("#dateType" + this.editor.id).html("Day/month/year <span class='caret caretDrop'></span>");
  	        }

  	        if (this.contentFormat.yearFomat == 4) {
  	            $("#4" + this.editor.id).prop("checked", true);
  	        } else if (this.contentFormat.yearFomat == 2) {
  	            $("#2" + this.editor.id).prop("checked", true);
  	        }

  	        StudentEntry.addEvent("monthDayYear" + this.editor.id, "click", this._changeDateFormat, {
  	            "type": "monthDayYear"
  	        });
  	        StudentEntry.addEvent("dayMonthYear" + this.editor.id, "click", this._changeDateFormat, {
  	            "type": "dayMonthYear"
  	        });
  	        StudentEntry.addEvent("4" + this.editor.id, "click", this._changeYearFormat, {
  	            "type": 4
  	        });
  	        StudentEntry.addEvent("2" + this.editor.id, "click", this._changeYearFormat, {
  	            "type": 2
  	        });

  	    } else if (this.contentFormat.type == "time") {

  	    }
  	},
  	/**
  	 * property layout for alphanumeric content format
  	 */
  	alphanumericPropertyLayout: function () {
  		var maxLengthval = this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  	    var htmlelement = "";
  	    htmlelement += '<div class="clear"></div>';
  	    htmlelement += '    <div class="tabContent tabProContent customInput charLimit">';
  	    /*htmlelement += '        <form role="form">';*/
  	    htmlelement += '            <div class="form-group">';
  	    htmlelement += '                <a id="charLimitHelp' + this.editor.id + '" class="info-icon"></a>';
  	    htmlelement += '                <label class="font11" for="exampleInputEmail1">Character limit:</label>';
  	    htmlelement += '                <input type="Text" placeholder="15,000" value="' + maxLengthval + '" id="txtmaxLenght_' + this.editor.id + '">';
  	    htmlelement += '            </div>';
  	    htmlelement += '            <div class="clear"></div>';
  	    /*htmlelement += '        </form>';*/
  	    htmlelement += '    </div>';
  	    return htmlelement;
  	},
  	/**
  	 * property layout for number content format
  	 */
  	numberPropertyLayout: function () {
  	    var htmlelement = "";
  	    htmlelement += '<div class="tabContent tabProContent tabProContent-2" style="height:15px">';
  	    htmlelement += '	<div class="data_component">';
  	    htmlelement += '		<div class="grid grid-2">';
  	    htmlelement += '			<span>';
  	    htmlelement += '			<input type="checkbox" id="showSeparatorLabelBtnId' + this.editor.id + '">';
  	    htmlelement += '			<label for="showSeparatorLabelBtnId' + this.editor.id+ '"><span></span>Show 1000s separator (,)</label>';
  	    htmlelement += '			</span>';
  	    htmlelement += ' 		</div>';
  	    htmlelement += ' 	</div>';
  	    htmlelement += '</div>';
  	    htmlelement += '  <div class="tabContent tabProContent customInput charLimit">';
  	    /*htmlelement += '        <form role="form">';*/
  	    htmlelement += '            <div class="form-group">';
  	    htmlelement += '                <a id="decimalPlacesHelp' + this.editor.id + '" class="info-icon"></a>';
  	    htmlelement += '                <label class="font11" for="exampleInputEmail1">Decimal places</label>';
  	    htmlelement += '                <input type="Text" placeholder="2" value="' + this.contentFormat.decimalPlaces + '" id="txtdecimal_' + this.editor.id + '">';
  	    htmlelement += '                <label class="font11" style="margin-left:18px;" for="exampleInputEmail1">Enter 0 to 6 decimal places</label>';
  	    htmlelement += '            </div>';
  	    htmlelement += '            <div class="clear"></div>';
  	    /*htmlelement += '        </form>';*/
  	    htmlelement += '  </div>';
  	    return htmlelement;
  	},
  	/**
  	 * property layout for currency content format
  	 */
  	currencyPropertyLayout: function () {
  	    var htmlelement = "";
  	    htmlelement += '    <div id="entryType" style="height:300px;">';
  	    htmlelement += '        <div class="head-info typeInput">';
  	    htmlelement += '            <a id="currencyType' + this.editor.id + '" class="info-icon"></a>Currency type:';
  	    htmlelement += '        </div>';
  	    htmlelement += '       <div class="tabContent tabProContent">';
  	    htmlelement += '           <div class="btn-group customDropdown">';
  	    htmlelement += '                <button data-toggle="dropdown" id="currencySelector'+this.editor.id+'" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
  	    htmlelement += '                    US, Dollar ($)<span class="caret caretDrop"></span>';
  	    htmlelement += '                </button>';
  	    htmlelement += '                <ul class="dropdown-menu">';
  	    htmlelement += '                    <li id="dollar' + this.editor.id + '"><a>US, Dollar ($)</a>';
  	    htmlelement += '                    </li>';
  	    htmlelement += '                    <li class="divider"></li>';
  	    htmlelement += '                    <li id="euro' + this.editor.id + '"><a>EU, Euro (&#8364;)</a>';
  	    htmlelement += '                    </li>';
  	    htmlelement += '                    <li class="divider"></li>';
  	    htmlelement += '                    <li id="yen' + this.editor.id + '"><a>Japan, Yen (&#165;)</a>';
  	    htmlelement += '                    </li>';
  	    htmlelement += '                    <li class="divider"></li>';
  	    htmlelement += '                    <li id="pound' + this.editor.id + '"><a>UK, Pound (&#163;)</a>';
  	    htmlelement += '                    </li>';
  	    htmlelement += '                </ul>';
  	    htmlelement += '            </div>';
  	    htmlelement += '        </div>';
  	    return htmlelement;
  	},
  	/**
  	 * property layout for percentage content format
  	 */
  	percentagePropertyLayout: function () {
  	    var htmlelement = "";
  	    htmlelement += '<div class="clear"></div>';
  	    htmlelement += '    <div class="tabContent tabProContent customInput charLimit">';
  	    /*htmlelement += '        <form role="form">';*/
  	    htmlelement += '            <div class="form-group">';
  	    htmlelement += '                <a id="decimalPlacesHelp' + this.editor.id + '" class="info-icon"></a>';
  	    htmlelement += '                <label class="font11" for="exampleInputEmail1">Decimal places</label>';
  	    htmlelement += '                <input type="Text" placeholder="2" value="' + this.contentFormat.decimalPlaces + '" id="txtdecimal_' + this.editor.id + '">';
  	    htmlelement += '                <label class="font11" style="margin-left:18px;" for="exampleInputEmail1">Enter 0 to 6 decimal places</label>';
  	    htmlelement += '            </div>';
  	    htmlelement += '            <div class="clear"></div>';
  	    /*htmlelement += '        </form>';*/
  	    htmlelement += '    </div>';
  	    htmlelement += '<div class="tabContent tabProContent tabProContent-2" style="height:150px">';
  	    htmlelement += '	<div class="data_component">';
  	    htmlelement += '		<div class="grid grid-2">';
  	    htmlelement += '			<span>';
  	    htmlelement += '			<input type="checkbox" id="showPercentLabelBtnId' + this.editor.id + '">';
  	    htmlelement += '			<label for="showPercentLabelBtnId' + this.editor.id  + '"><span></span>Show % sign</label>';
  	    htmlelement += '			</span>';
  	    htmlelement += ' 		</div>';
  	    htmlelement += ' 	</div>';
  	    htmlelement += '</div>';
  	    return htmlelement;
  	},
  	/**
  	 * property layout for date content format
  	 */
  	datePropertyLayout: function () {
  	    var htmlelement = "";
  	    htmlelement += '    <div id="dateFormat" style="height:300px;">';
  	    htmlelement += '        <div class="head-info typeInput">';
  	    htmlelement += '            <a id="dateFormat' + this.editor.id + '" class="info-icon"></a>Date format:';
  	    htmlelement += '        </div>';
  	    htmlelement += '       <div class="tabContent tabProContent">';
  	    htmlelement += '           <div class="btn-group customDropdown">';
  	    htmlelement += '                <button data-toggle="dropdown" id="dateType'+ this.editor.id+'" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
  	    htmlelement += '                    Month/day/year<span class="caret caretDrop"></span>';
  	    htmlelement += '                </button>';
  	    htmlelement += '                <ul class="dropdown-menu">';
  	    htmlelement += '                    <li id="monthDayYear' + this.editor.id + '"><a>Month/day/year</a>';
  	    htmlelement += '                    </li>';
  	    htmlelement += '                    <li class="divider"></li>';
  	    htmlelement += '                    <li id="dayMonthYear' + this.editor.id + '"><a>Day/month/year</a>';
  	    htmlelement += '                    </li>';
  	    htmlelement += '                </ul>';
  	    htmlelement += '            </div>';
  	    htmlelement += '        </div>';
  	    htmlelement += '    <div class="head-info">';
  	    htmlelement += '       <a  id="yearFormattingId' + this.editor.id + '" class="info-icon" ></a>Year formatting:';
  	    htmlelement += '   </div>';
  	    htmlelement += '   <div class="clear"></div>';
  	    htmlelement += '   <div class="tabContent tabProContent">';
  	    htmlelement += '      <div class="radio">';
  	    htmlelement += '              <input type="radio" value="4 digit year (2013)" id="4' + this.editor.id + '" name="yearRadios">';
  	    htmlelement += '           <label for="4' + this.editor.id + '"><span></span> Four-digit year (2013)</label>';
  	    htmlelement += '       </div>';
  	    htmlelement += '      <div class="radio">';
  	    htmlelement += '               <input type="radio" value="2 digit year (13)" id="2' + this.editor.id + '" name="yearRadios">';
  	    htmlelement += '           <label for="2' + this.editor.id + '"><span></span> Two-digit year (13)</label>';
  	    htmlelement += '       </div>';
  	    htmlelement += '   </div>';
  	    return htmlelement;
  	},
  	/**
  	 * property layout for time content format
  	 */
  	timePropertyLayout: function () {
  	    var htmlelement = "";

  	    return htmlelement;
  	},
  	/**
  	 * binds event for Content Format - Currency.
  	 */
  	changeCurrency: function(event){
  		if (event.data != undefined) {
  			$("#"+this.editor.id).removeClass("currency-"+this.contentFormat.currencyType+"-Symbol");
  			$("#"+this.answer.id).removeClass("currency-"+this.contentFormat.currencyType+"-Symbol");
	 		if(event.data.type== "dollar"){
	 			this.contentFormat.currencyType="dollar";
	 			this.contentFormat.symbol="$";
	 			$("#currencySelector"+this.editor.id).html("US, Dollar ($) <span class='caret caretDrop'></span>");
	 		}else if(event.data.type== "euro"){
	 			this.contentFormat.currencyType="euro";
	 			this.contentFormat.symbol="�";
	 			 $("#currencySelector"+this.editor.id).html("EU, Euro (&#8364;) <span class='caret caretDrop'></span>");
	 		}else if(event.data.type== "yen"){
	 			this.contentFormat.currencyType="yen";
	 			this.contentFormat.symbol="�";
	 			 $("#currencySelector"+this.editor.id).html("Japan, Yen (&#165;) <span class='caret caretDrop'></span>");
	 		}else if(event.data.type== "pound"){
	 			this.contentFormat.currencyType="pound";
	 			this.contentFormat.symbol="�";
	 			 $("#currencySelector"+this.editor.id).html("UK, Pound (&#163;) <span class='caret caretDrop'></span>");
	 		}
 			$("#"+this.editor.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
 			$("#"+this.answer.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
	 		if($("#currencySelector"+this.editor.id).parent().hasClass("open")){
	 			$("#currencySelector"+this.editor.id).parent().removeClass("open");
	 		}
      var questionFormulas = JSON.stringify(question.formulas);
      if(questionFormulas.indexOf(this.editor.id) != -1){
        var showCautionIconFlg = false;
        for(var i=0 ; i < question.formulas.length ; i++){
          var formulaString = JSON.stringify(question.formulas[i]);
          console.log(this.editor.id)
          if(formulaString.indexOf(this.editor.id) != -1){
            var showCautionIconFlg = question.formulas[i].isValidCurrency(question.formulas[i].equation);
            if(!showCautionIconFlg){
              this.showCautionIcon(this.editor.id,"changeFormat", showCautionIconFlg);
            } else{
              this.hideCautionIcon(this.editor.id);
            }
          }
        }
      }
	 		question.activePage.doLayout();
 		 } 
  	},
  	/**
  	 * changes date format in Content Format - Date.
  	 */
  	changeDateFormat: function (event) {
  	    if (event.data != undefined) {
  	        if (event.data.type == "monthDayYear") {
  	            this.contentFormat.dateFormat = "monthDayYear";  	            
  	            $("#dateType" + this.editor.id).html("Month/Day/Year <span class='caret caretDrop'></span>");
  	          $('#'+this.editor.id).attr('data-placeholder', 'Student entry mm/dd/yy');
  	        } else if (event.data.type == "dayMonthYear") {
  	            this.contentFormat.dateFormat = "dayMonthYear";
  	            $("#dateType" + this.editor.id).html("Day/Month/Year <span class='caret caretDrop'></span>");
  	          $('#'+this.editor.id).attr('data-placeholder', 'Student entry dd/mm/yy');
  	        }
  	      this.contentFormat.updateFormatter();
  	        if ($("#dateType" + this.editor.id).parent().hasClass("open")) {
  	            $("#dateType" + this.editor.id).parent().removeClass("open");
  	        }
  	    }
  	},
  	/**
  	 *changes year format in Content Format - Date.
  	 */
  	changeYearFormat: function (event) {
  	    if (event.data != undefined) {
  	        if (event.data.type == 4) {
  	            this.contentFormat.yearFomat = 4;
  	        } else if (event.data.type == 2) {
  	            this.contentFormat.yearFomat = 2;
  	        }
  	      this.contentFormat.updateFormatter();
  	    }
  	},
  	/**
  	 * check-uncheck show percent checkbox.
  	 */
  	changePercentSymbol: function () {
  	    if ($('#showPercentLabelBtnId' + this.editor.id).prop('checked')) {
  	        this.contentFormat.showSymbol = true;
  	        $("#"+this.editor.id).addClass("percentSymbol");
			$("#"+this.answer.id).addClass("percentSymbol");
  	    } else {
  	        this.contentFormat.showSymbol = false;
  	        $("#"+this.editor.id).removeClass("percentSymbol");
			$("#"+this.answer.id).removeClass("percentSymbol");
  	    }
  	},
  	/**
  	 * check-uncheck show separator checkbox.
  	 */
  	showSeparator: function () {
  	    if ($('#showSeparatorLabelBtnId' + this.editor.id).prop('checked')) {
  	        this.contentFormat.showThousandSeparator = true;
  	    } else {
  	        this.contentFormat.showThousandSeparator = false;
  	    }
  	},
  	restrictEvent:function(e){
  		if (e.which == "13"){ 
			e.preventDefault();
		}
  		var regexNumber = new RegExp("^[,0-9 ]+$");
  		if( !regexNumber.test(String.fromCharCode(e.which)) && ( e.which != 0 && e.which != 8 )) {
  			e.preventDefault();
  		}
  	},
  	 /**
     * layouts in instructor mode
     * @returns {String}
     */
    instructorLayout:function(acceptAnyAnswer,graded){
    	var htmlelement='';
		
		var asterisk=(graded)?"":"";//asteriskSymbol
		var pos="";
		var cssColumnLayout="column-"+this.orientation;
		if(this.orientation!='3'){
			cssColumnLayout+=" column-"+this.orientation+"-inputField";
		}
		var placeHolder=(this.type=='fillInTheBlank')?"Fill in the blank":"";
		var symbolClass= "";
		var symbol=null;
		var answerText=this.answer.text;
		if(answerText!=''){
			if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
				answerText = answerText.replace(/,/g , "");
				answerText = ((answerText!=null)&&(answerText!=''))?parseFloat(answerText).toFixed(this.contentFormat.decimalPlaces):"";
				
				if(this.contentFormat.showThousandSeparator){
					var commaText = answerText.toString().split(".");
					commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					answerText=commaText.join(".");
				}
			}
			if(this.contentFormat.symbol!=null){
				if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
					symbolClass="percentSymbol";
					pos="positionL";
					answerText=answerText+this.contentFormat.symbol;	
					symbol=null;
				}else if(this.contentFormat.type=='currency'){
					symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";
					//answerText=this.contentFormat.symbol+answerText;
					symbol=this.contentFormat.symbol;
				}
			}
		}
		else{
			if(this.contentFormat.symbol!=null){
				if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
					symbolClass="percentSymbol";
					pos="positionL";
				}else if(this.contentFormat.type=='currency'){
					symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";
				}
			}
		}
		
		var maxLengthval = this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		var markCompulsary=(graded)?"<span class='cumpulSaruIn starHide "+pos+"'>*</span>":"";
		htmlelement+='<div class="prevQuestOpts " style="padding-right:10px;">';
       	htmlelement+='<div class="inputfeildmargin inputFieldRowPagesection '+cssColumnLayout+'">';
        htmlelement+='	<div class="colPageSection">';

        var editorText = util.getImageLayout(this.editor.text);
            editorText = util.getVideoLayout(editorText);
        	if(question.mode==MODE_POST_TEST || question.mode==MODE_PREVIEW)
    		{
    			editorText="";
    			htmlelement+=' <div id="'+this.editor.id+'" class="inputFieldStudentEntry rowPagesectionStudentTbl divBorder '+cssColumnLayout+' '+symbolClass+' '+asterisk+'" >'+editorText+' '+markCompulsary+'</div>';   		
    		}else{
    		 htmlelement+=' <div id="'+this.editor.id+'" class="inputFieldStudentEntry rowPagesectionStudentTbl divBorder '+cssColumnLayout+' '+symbolClass+' '+asterisk+'" >'+editorText+' '+markCompulsary+'</div>';	
    		}

     //   htmlelement+=' <div id="'+this.editor.id+'" class="inputFieldStudentEntry rowPagesectionStudentTbl divBorder '+cssColumnLayout+' '+symbolClass+' '+asterisk+'" >'+editorText+' '+markCompulsary+'</div>';
        htmlelement+='    <div class="clear"></div>';
        if (this.contentFormat.type == "alphanumeric")
        	htmlelement+='		<div style="float:right;" id="'+this.editor.id+'_chars">'+maxLengthval+'</div>';
        htmlelement+='    <div class="clear"></div>';
        if(this.answer.text!="" && !acceptAnyAnswer){
        	if (this.contentFormat.type == "alphanumeric"){
        		htmlelement+='		<div class="'+cssColumnLayout+'" style="padding-bottom:10px;"><strong>Answer: </strong>'+answerText+'</div>';
            }else{
            	
            	if(symbol!=null){
                	switch (this.contentFormat.currencyType){
                	case "dollar":
                		symbol = "&#36;";
                		break;
                	case "euro":
                		symbol = "&#8364;";
                		break;
                	case "yen":
                		symbol = "&#165;";
                		break;
                	case "pound":
                		symbol = "&#163;";
                		break;
                	default:
                	}        		
                	answerText = symbol+answerText;
            	}
            	
            	htmlelement+='		<div class="'+cssColumnLayout+'" style="margin-top:14px;padding-bottom:10px;"><strong>Answer: </strong>'+answerText+'</div>';
            }
             htmlelement+='    <div class="clear"></div>';
        }
        this.feedback.text = this.feedback.text.replace("&nbsp;","").replace("&#160;","").replace(/\�/g,"");

        this.feedback.text = util.getImageLayout(this.feedback.text);
        this.feedback.text = util.getVideoLayout(this.feedback.text);

        if(this.feedback.text!=''){
        	 htmlelement +='</br>';
        	 htmlelement +='<label><a  class="feedClose">Feedback</a></label>';
    		 htmlelement +=' <div style="display: none;" class="feedBackOpen '+cssColumnLayout+'">';
             htmlelement+='	  <div><strong>Feedback: </strong>'+util.getFormulaLinksForStudent(this.feedback)+'</div>';
             htmlelement+='	</div>';
        }
       
        htmlelement+='    <div class="clear"></div>';
        htmlelement+='</div>';
        htmlelement+='</div>';
        htmlelement+='</div>';
		return htmlelement.replace(/\�/g,"");
    },
    /**
     * layouts in student test mode
     * @returns {String}
     */
    studentLayout:function(graded){
		console.log("studentEntry::"+graded)
    	var htmlelement='';
		var cssColumnLayout="column-"+this.orientation;
		if(this.orientation!='3'){
			cssColumnLayout+=" column-"+this.orientation+"-inputField";
		}
		var placeHolder="";
		if(this.contentFormat.type=='time'){
			placeHolder="HH:MM:SS";
          }
		else if(this.contentFormat.type=='date'){
        	  placeHolder=this.contentFormat.dateFormat=="monthDayYear"?"MM/DD/":"DD/MM/";
        	  placeHolder +=this.contentFormat.yearFomat==4 ?"YYYY":"YY";
 			
          }
		
        placeHolder=(placeHolder=="" && this.type=='fillInTheBlank')?"Fill in the blank":placeHolder;
		var symbolClass= "";
		if(this.contentFormat.symbol!=null){
			if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
				symbolClass="percentSymbol";
			}else if(this.contentFormat.type=='currency'){
				symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";
			}
		}
		var studentEditor="";
		var markCompulsary=(graded)?"":"";
		if(this.contentFormat.type=='date'){
			
			studentEditor='<input type="text" id="'+this.editor.id+'" placeholder="'+placeHolder+'" class="'+cssColumnLayout+'  '+symbolClass+'" value="'+this.editor.text+'" maxlength="'+this.editor.maxLength+'" '+markCompulsary+'/>';
		}else{
			var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
			studentEditor +='<div  contenteditable="true" id="'+this.editor.id+'" data-placeholder="'+placeHolder+'" class="inputFieldStudentEntry '+cssColumnLayout+'  '+symbolClass+'" '+dataDivAttr+' >'+this.editor.text+''+markCompulsary+'</div>';
		}
		var maxLengthval = this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		htmlelement+='<div class="prevQuestOpts " style="padding-right:10px;">';
       	htmlelement+='<div class="inputfeildmargin inputFieldRowPagesection '+cssColumnLayout+'">';
        htmlelement+='	<div class="colPageSection">';
        htmlelement+= studentEditor;
        htmlelement+='    <div class="clear"></div>';
        if(this.contentFormat.type=='alphanumeric'){
        	 htmlelement+='		<div style="float:right;" id="'+this.editor.id+'_chars">'+maxLengthval+'</div>';
             htmlelement+='    <div class="clear"></div>';
             htmlelement+='		<div id="isHighlighted_'+this.editor.id+'" style="display:none;">false</div>';
             htmlelement+='		<div id="charLimit_'+this.editor.id+'" style="display:none;">'+maxLengthval.replace(',','')+'</div>';
        }
       
        htmlelement+='    <div class="clear"></div>';
        htmlelement+='</div>';
        htmlelement+='</div>';
        htmlelement+='</div>';
		return htmlelement.replace(/\�/g," ");
		
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
    postSubmissionReviewLayout:function(acceptAnyAnswer,subType,graded){
    	var htmlelement='';
		
		var asterisk=(graded)?"":"";//asteriskSymbol
		var pos="";
		var cssColumnLayout="column-"+this.orientation;
		if(this.orientation!='3'){
			cssColumnLayout+=" column-"+this.orientation+"-inputField";
		}
		var symbolClass= "";
		var answerText=this.answer.text;
		var symbol=null;
		if(answerText!=''){
			if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
				answerText = answerText.replace(/,/g , "");
				answerText = ((answerText!=null)&&(answerText!=''))?parseFloat(answerText).toFixed(this.contentFormat.decimalPlaces):"";
				
				if(this.contentFormat.showThousandSeparator){
					var commaText = answerText.toString().split(".");
					commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					answerText=commaText.join(".");
				}
			}
			if(this.contentFormat.symbol!=null){
				if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
					symbolClass="percentSymbol";				
					symbol=this.contentFormat.symbol;
					//answerText=answerText+this.contentFormat.symbol;
				}else if(this.contentFormat.type=='currency'){
					symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";
					symbol=this.contentFormat.symbol;
					//answerText=this.contentFormat.symbol+answerText;
				}
			}
		}
		else
		{
			if(this.contentFormat.symbol!=null){
				if(this.contentFormat.type=='percentage' && this.contentFormat.showSymbol){
					symbolClass="percentSymbol";
					symbol=this.contentFormat.symbol;
				}else if(this.contentFormat.type=='currency'){
					symbolClass="currency-"+this.contentFormat.currencyType+"-Symbol";
					symbol=this.contentFormat.symbol;
				}
			}
		}
		var markCompulsary=(graded)?"<span class='cumpulSaruIn starHide"+pos+"'>*</span>":"";
		htmlelement+='<div class="prevQuestOpts " style="padding-right:10px;">';
       	htmlelement+='<div class="inputfeildmargin inputFieldRowPagesection '+cssColumnLayout+'">';
        htmlelement+='	<div class="colPageSection">';
        if( subType=='inputField'){
        	var css=this.isCorrectAnswerGiven(acceptAnyAnswer)?"correct":"wrong";
        	htmlelement+='	<div class="answerTick '+css+'" ></div>';
        }
        var studentResponse = this.editor.text;
       //URLs starting with http://, https://, or ftp://
        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        studentResponse = studentResponse.replace(replacePattern1, "<a href='$1' target='_blank'>$1</a>");
        studentResponse = studentResponse.replace(replacePattern2, "$1<a href=\"http://$2\" target=\"_blank\">$2</a>");
        
        if(this.contentFormat.type=='percentage' || this.contentFormat.type=='number')
        {  
        	
        	studentResponse = studentResponse.replace(/,/g , "");
        	var response = studentResponse;
        	if(!isNaN(studentResponse))
        		response =	((studentResponse!=null)&&(studentResponse!=''))?parseFloat(studentResponse).toFixed(this.contentFormat.decimalPlaces):"";
        	if(this.contentFormat.showThousandSeparator){
        		var commaText = response.toString().split(".");
        		commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        		response=commaText.join(".");
        	}
        	if(symbol!=null){
        		response = response+symbol;  
        		answerText = answerText+symbol;
        	}
        	htmlelement+='		<div id="'+this.editor.id+'" class="inputFieldStudentEntry  rowPagesectionStudentTbl divBorder '+cssColumnLayout+' '+asterisk+' " >'+ response +' '+markCompulsary+'</div>';
        }
        else{
        	if(symbol!=null){
        	switch (this.contentFormat.currencyType){
        	case "dollar":
        		symbol = "&#36;";
        		break;
        	case "euro":
        		symbol = "&#0128;";/* previous one: symbol = "&#8364;";*/
        		break;
        	case "yen":
        		symbol = "&yen;";
        		break;
        	case "pound":
        		symbol = "&#163;";
        		break;
        	default:
        	}        		
        		studentResponse = symbol+studentResponse;
        		answerText = symbol+answerText;
    		}
        	//htmlelement+='<div id="'+this.editor.id+'" class="inputFieldStudentEntry postSubmission divBorder tableCellComponent noBorder '+cssColumnLayout+'" ><span style="margin-left: '+marginPoint+'px; background-color: transparent;">'+studentResponse+'</span></div>';
        	htmlelement+='		<div id="'+this.editor.id+'" class="inputFieldStudentEntry  rowPagesectionStudentTbl divBorder '+cssColumnLayout+' '+asterisk+' " >'+studentResponse+' '+markCompulsary+'</div>';
        }
        	
        htmlelement+='    <div class="clear"></div>';
        if(this.answer.text!="" && !acceptAnyAnswer){
        	
        	answerText =answerText.replace(/\�/g," "); 
        	 htmlelement+='		<div class="'+cssColumnLayout+'" style="margin-top: 14px;padding-bottom:10px;"><strong>Answer: </strong>'+answerText+' '+markCompulsary+'</div>';
             htmlelement+='    <div class="clear"></div>';
        }
        this.feedback.text = this.feedback.text.replace("&nbsp;","").replace("&#160;","");
        if(this.feedback.text!='' && this.editor.text!=''){
        	var feedbackText=util.getFormulaLinkForPostSubmission(this.feedback);
        	feedbackText=feedbackText.replace(/\�/g," "); 

          feedbackText = util.getImageLayout(feedbackText);
          feedbackText = util.getVideoLayout(feedbackText);

        	htmlelement+='   </br>';
        	 htmlelement +='<label><a  class="feedClose">Feedback</a></label>';
    		 htmlelement +=' <div style="display: none;" class="feedBackOpen '+cssColumnLayout+'">';
             htmlelement+='	  <div><strong>Feedback: </strong>'+feedbackText+'</div>';
             htmlelement+='	</div>';
        }
       
        htmlelement+='    <div class="clear"></div>';
        htmlelement+='</div>';
        htmlelement+='</div>';
        htmlelement+='</div>';
		return htmlelement.replace(/\�/g," ");
    },
    /**
     * check if correct answer given by student
     */
    isCorrectAnswerGiven:function(acceptAnyAnswer){
    	var flag= false;
    	var studentResponse=this.editor.text.trim();  
    	studentResponse = studentResponse.replace("/&nbsp;/g","");
    
    	var substr=studentResponse.substring(studentResponse.length-4,studentResponse.length);    	
    	if(substr=="<br>")
    		studentResponse = studentResponse.substring(0,studentResponse.length-4);
    	studentResponse=studentResponse.trim();
    	if(studentResponse!="")
    	{
	    	var answer="";
	    	if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
	    		 answer= this.answer.text;
	    		 studentResponse = studentResponse.replace(/,/g , "");
	    	}else if(this.contentFormat.type=='date' || this.contentFormat.type=='time'){
	            answer= this.answer.text;
	         } else{
		    	 answer= this.answer.textWithoutFormatting;
		    	 studentResponse = studentResponse.replace(/&amp;/g, '&');
	        }
	    	var formatType=this.contentFormat.type;	    	
	    	var valid = this.isValidAnswerOrStudentResponse(studentResponse);
	    	if(acceptAnyAnswer && valid){
	    		 flag=true;
	    	}else{
	    		if(formatType=='alphanumeric'){
	    			var studentResponseString = $("<div/>").html(studentResponse).text();
	    			if((studentResponseString !="") && (new String(studentResponseString.toLowerCase())==(new
	        				String(answer)).toLowerCase())){
	        			flag=true;
	       		 	}
	    		} else if(formatType == "date" || formatType == "time"){
		            if(studentResponse == answer){
		              flag=true;
		            }
		        } else{
	    			if((studentResponse!="") && (parseFloat(studentResponse)==parseFloat(answer))){
	    				flag=true;
	    			}
	    		}
	    	} 
    	}
    	return flag;
    },
    /**
     * Function to highlight characters from student entry  
     * @param editorId = student entry editor id 		 
     */    
    highlightText : function(editorId){
  	  	 var editorElement =  $("#"+editorId);
		 var enteredText = editorElement.text();
		 var textLimit = parseInt($("#charLimit_" + editorId ).text());
		 var inRangeText = enteredText.substring(0,textLimit);
		 var outRangeText = enteredText.substring(textLimit,enteredText.length);
		 var outRangeSpan = "<span id='outRangeSpan_"+ editorId +"'>" + outRangeText + "</span>";
		 $("#isHighlighted_" +  editorId).text("true");
		 editorElement.empty();
		 editorElement.html(inRangeText+outRangeSpan);
    },
    /***
     * Function to update Count of charcters in student entry  
     * This function is called on "focus keyup keypress" events of editor       * 
     */
    updateCharacterCount:function(e){
  	  var src = $("#"+this.editor.id);
        var chars = src.text().length;                
        if(typeof e != "undefined"){
          if(typeof e.key != "undefined"){
        	  //var regex = new RegExp("^[a-zA-Z0-9]+$");
        	  var regex = new RegExp("^[a-zA-Z0-9~!@#$%^&*()_+=`-{}[]|\;:'<>?/]+$");
        	  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        	  if (regex.test(str)) {
        		  chars+=1;        		  
        	  }
        	  else if(e.keyCode == 46){ /*check for delete */
        		  var txtSelection = window.getSelection();
        		  if(typeof txtSelection != "undefined"){
        			  var textSel = "";
        			  textSel = window.getSelection().toString();
        			  if(textSel.length > 0){
        				  chars-=textSel.length;
        			  }
        		  }
        	  }
        	  else if(e.keyCode == 8){/*check for backspace */
        		  if(chars > 0){
        		    chars-=1; 
        		  }
        	  }
          }          
        }   
        
        var count= this.editor.maxLength - chars ;
        var textLimit =this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var textCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var textCountSpan = textCount; 
        if(count < 0){
        	textCountSpan = "<span style='color:red;'>" +textCount+ " </span>";
        }
	  var countElement = $("#"+this.editor.id+"_chars");
	  countElement.html(textCountSpan + " /" +  textLimit);
	  this.removeTextHighlight();
    },
    /***
     * Function to remove highlight of charcters in student entry
     */
    removeTextHighlight : function(){    	  
  	  var editorId = this.editor.id;
  	  if($("#isHighlighted_" + editorId).text() != "true"){
  		  return;
  	  }           	
  	  $("#isHighlighted_" + editorId).text("false");                	
  	  var src = $("#"+editorId);
  	  var enteredText =  src.text();
  	  src.empty(); 
  	  src.text(enteredText);   
    },
    /***
  	 * Function to show Caution Icon near Formula when Any Formula is affected 
  	 * @param studentEntryId{String} : studentEntryId
  	 * @param source {String} : Source for showing caution icon. It may be "removeEntry" or "changeFormat"
  	 */
	showCautionIcon : function(studentEntryId, source, showCautionIconFlgCurr){
		var questionFormulas = JSON.stringify(question.formulas);
		var messageContentText = "",messageHeader="";
		if(source == "removeEntry"){
			messageContentText = "Deleting " + studentEntryId + " has affected the following formulas: <br>";
			messageHeader = "Deletion Notice";
		}else if(source == "changeFormat"){
			messageContentText = "Updating Format of " + studentEntryId + " has affected the following formulas: <br>";
			messageHeader = "Updation Notice";
		}
		if(questionFormulas.indexOf(studentEntryId) != -1){
			var showCautionIconFlg = false;
			for(var i=0 ; i < question.formulas.length ; i++){
				var formulaString = JSON.stringify(question.formulas[i]);
        if(formulaString.indexOf(studentEntryId) != -1){
        	
					question.formulas[i].setCautionIconStyle("inline-block");
					messageContentText += "<br>" + question.formulas[i].getName();
					showCautionIconFlg = true;
					page.getAffectedDestinations(question.formulas[i].getId());
				}
			}
      if(showCautionIconFlgCurr){
        showCautionIconFlg = true;
      }
			question.displayMessageModal(messageHeader,messageContentText);
			if(showCautionIconFlg){
				question.layout();
			}
		}
	},
	/***
  	 * Function to hide Caution Icon near Formula  
  	 * Note : This function hides caution icon only if formula is validated successfully
  	 */
	hideCautionIcon : function(studentEntryId){
		var questionFormulas = JSON.stringify(question.formulas);
		if(questionFormulas.indexOf(studentEntryId) != -1){
			var showCautionIconFlg = false;
			for(var i=0 ; i < question.formulas.length ; i++){
				var formulaString = JSON.stringify(question.formulas[i]);
				if(formulaString.indexOf(studentEntryId) != -1 && question.formulas[i].validateFormula(question)=="success"){
						question.formulas[i].setCautionIconStyle("none");
						showCautionIconFlg = true;							
				}
			}		
			if(showCautionIconFlg){
				question.layout();
			}
		}
	},

	/***
  	 * Function to validate Formulas in author entry  
  	 */
	validateFormulas : function() {
		for(var i=0;i<question.pages.length;i++){
  			var components = question.pages[i].components;
  			for(var j=0;j<components.length;j++){
  				if(components[j].type=='inputField'){	
  					var sections = components[j].sections;
	  				for(var k=0;k<sections.length;k++){
	  					var authorEntries = sections[k].authorEntries;
		  				for(var l=0;l<authorEntries.length;l++){
		  					try{
		  						this.evaluateFormulas(authorEntries[l].editor);
		  					}catch(err){}
		  				}
	  				}
  				}		  				
  			}
  		}
	},
	/***
  	 * Function to evaluate Formulas in author entry  
  	 */
	evaluateFormulas : function(authorEntry) {
		var authorEntries = $("h6 .formula");
		for(var i=0; i<authorEntries.length;i++){
			var decimalPlaces= $(authorEntries[i]).attr("deci");			
			for(var j=0; j<authorEntries[i].children.length;j++){
				var studentEntryId = authorEntries[i].children[j].className.trim();
				var studentEntriesInFormula = $("."+studentEntryId);
				
				for(var k=0; k<studentEntriesInFormula.length;k++){
					var sEntry=question.getStudentEntry(studentEntryId);
					if(sEntry != null && sEntry.editor.text!=="" && sEntry.editor.text!=="&nbsp;")
					{	
						if(sEntry.contentFormat.type=="percentage"){
							studentEntriesInFormula[k].innerHTML = eval(question.getStudentEntry(studentEntryId).editor.text/100);
						}
						else						
							studentEntriesInFormula[k].innerHTML = question.getStudentEntry(studentEntryId).editor.text;
					}
				}
			}
			var studentResponse=this.editor.text.trim();  
	    	studentResponse = studentResponse.replace("/&nbsp;/g","");
	    	util.checkTableFormulaCell(studentResponse);
			this.showResult(authorEntries[i],decimalPlaces);
		}
	},
	/***
  	 * Function to show Dynamically Generated Result of Formula 
  	 */
	showResult : function(authorFormulaEntry,decimalPlaces) {
		var formulaValues = authorFormulaEntry.textContent.replace(/,/g,"");
		var flag= /\d/.test(formulaValues);
		var decimalPlaces= $(authorFormulaEntry).attr("deci");			
		var evaluatedValue="";
		try{
			if((formulaValues != "" && (formulaValues.indexOf("_")==-1)) || flag )
			{				
				formulaValues= (formulaValues.indexOf("_")==-1)? eval(formulaValues):formulaValues.replace(/_/g,0);
				evaluatedValue = eval(formulaValues);
				if(isNaN(evaluatedValue) || evaluatedValue=="Infinity")
					evaluatedValue=0;
				//evaluatedValue=evaluatedValue.replace(/,/g,"");
				if(decimalPlaces!='null'){
					if(evaluatedValue.toString().indexOf('.') == -1) {
						 evaluatedValue = evaluatedValue.toFixed(2);
					 }else{
						 evaluatedValue = this.roundOff(evaluatedValue,decimalPlaces);
					 }
				}else
					evaluatedValue = this.roundOff(evaluatedValue,0);
				
				if(evaluatedValue>1){
					var newvalues=evaluatedValue.toString().split(".");
					if(newvalues.length>1){
						newvalues[0]=newvalues[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");						
						evaluatedValue = newvalues[0]+"."+newvalues[1];//evaluatedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}
				}
				evaluatedValue=""+evaluatedValue;
				evaluatedValue=evaluatedValue.replace(/,/g,"");
				var text = this.roundOff(parseFloat(evaluatedValue),decimalPlaces);
				
				   var displayText=text;
				 //  if(this.contentFormat.showThousandSeparator){
					   var commaText = displayText.toString().split(".");
					   commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					   displayText=commaText.join(".");
				  // }
				authorFormulaEntry.nextSibling.innerHTML=" = " + displayText;
				authorFormulaEntry.nextSibling.nextSibling.innerHTML=displayText;
			}
			else
			{
			
					authorFormulaEntry.nextSibling.innerHTML="= _";
					authorFormulaEntry.nextSibling.nextSibling.innerHTML="_";	
			
			}
		}catch(err){
			console.log("err : "+JSON.stringify(err));
			authorFormulaEntry.nextSibling.innerHTML="= _";
			authorFormulaEntry.nextSibling.nextSibling.innerHTML="_";
		}		
	}
};

