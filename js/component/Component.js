var Component = function(options){ 
	this.id=null;
	this.pageIdPrefix=null;
	this.pageId=null;
	this.idPrefix='C';
	this.textBoxIdPrefix= 'E';
	this.generalFeedbackPrefix= 'GF';
	this.overallFeedbackPrefix= 'OF';
	this.totalScore=0;
	this.type='checkbox';
	this.acceptAnyAnswer=false;
	this.graded = false;
	this.mandatory=true;
	this.state="expand";
	this.isBranched = false;		//Set to true if this used as source
	this.isBranchDest = false;		//set true if this used as destination for path mapping
    this.isSectionBranchDest = false;     //Set true if section is maaped as destn
    this.isSectionBranch = false;     //Set true if section is maaped as source
	this.destBranchId = null;		// set branch id into destination
	$.extend(this, options);
	this.generalFeedback = new Editor({id:this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.generalFeedbackPrefix});
	this.overallFeedback = new Editor({id:this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.overallFeedbackPrefix});
	this._openHelpModalForInsertHyperlink = Range.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
	this.showToStud=true;//check for student/postsubmission layout
};
Component.prototype = {  
		/**
		 * gets type of component
		 * @returns {String} type
		 */
		getType:function(){
			return this.type;
        },
        /**
         * sets type of component
         * @param type
         */
        setType:function(type){
       	 this.setType(type);
        },
        /**
         * gets accept Any answer boolean value
         * @returns {Boolean}  acceptAnyAnswer
         */
        isAcceptAnyAnswer:function(){
        	return this.acceptanyanswer;
        },
        /**
         * sets  accept Any answer boolean value
         * @param acceptAnyAnswer
         */
        setAcceptAnyAnswer:function(acceptAnyAnswer){
        	   this.acceptAnyAnswer =acceptAnyAnswer;
        },
        /**
         * gets Graded boolean value
         * @returns {Boolean}
         */
        isGraded:function(){
    	   return this.graded;
        },
        /**
         * sets graded boolean value
         * @param graded
         */
        setGraded:function(graded){
       	   this.graded =graded;
        },
         isMandatory:function(){
         	 return this.mandatory;
         },
         setMandatory:function(mandatory){
         	 this.mandatory=mandatory;
         },
         getPageIdPrefix: function( ){
             return this.pageIdPrefix;  
	     },
	     setPageIdPrefix: function( pageIdPrefix){
	         this.pageIdPrefix =  pageIdPrefix;
	     },
	     getPageId: function( ){
             return this.pageId;  
	     },
	     setPageId: function( pageId){
	         this.pageId =  pageId;
	     },
         getIdPrefix: function( ){
             return this.idPrefix;  
	     },
	     setIdPrefix: function( idPrefix){
	         this.idPrefix =  idPrefix;
	     },
         getId: function( ){
             return this.id;  
	     },
	     setId: function(id){
	         this.id =  id;
	     },
	     getTotalScore: function( ){
             return this.totalScore;  
	     },
	     setTotalScore: function(totalScore){
	         this.totalScore =  totalScore;
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
        /* for branch id in destination */
    	getDestBranchId:function(){
            	return this.destBranchId;
        },
        setDestBranchId:function(destBranchId){
        	this.destBranchId = destBranchId;
        },
        /* for showToStud flag*/
    	getShowToStud:function(){
            return this.showToStud;
        },
        setShowToStud:function(showToStud){
        	this.showToStud = showToStud;
        },

        /**
	      * hides/shows feedback for component
	      */
        toggleFeedback:function(){
       	 var elmentId = this.idPrefix+this.id;       	
       	 if($('#genFb'+elmentId).css("display")=='none'){
       			$('#genFb'+elmentId).show("slow"); 
       			$("#genFbTxt"+elmentId).html(" Collapse general feedback");
       		}else{
       			$('#genFb'+elmentId).hide("slow");
       			$("#genFbTxt"+elmentId).html(" Expand general feedback");       			      			
       		}
        },
        /**
         * Layouts general feedback editor in design mode
         * @returns {String} html element
         */
        generalfeedbackLayout:function(){
       	 var dataDivAttr = this.overallFeedback.text !='' ? 'data-div-placeholder-content' : '';
       	 var htmlelement="";
       	 htmlelement+='       <div class="colPageSection secondColPic">';
        	 htmlelement+='           <div>';
        	 htmlelement+='               <div class="editableDivTitle">';
        	 htmlelement+='                    <h6 class="pull-left font10">Overall feedback:</h6> ';
        	 htmlelement+='                   <h6 class="pull-right font10">ID# '+this.overallFeedback.id+'</h6>';
        	 htmlelement+='               </div>';
        	 htmlelement+='               <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter overall feedback" id="'+this.overallFeedback.id+'" data-maxlength="'+this.overallFeedback.maxLength+'" class="inputDummy" '+dataDivAttr+'>'+this.overallFeedback.text+'</div>';
        	 htmlelement+='           </div>';
        	 htmlelement+='       </div>';
        	 htmlelement+='       <div class="colPageSection  invisible">';
        	 htmlelement+='           <div class="eachCol">';
        	 htmlelement+='               <a>';
        	 htmlelement+='                   <img src="img/getPicture.png">';
        	 htmlelement+='               </a>';
        	 htmlelement+='           </div>';
        	 htmlelement+='           <div></div>';
        	 htmlelement+='       </div>';
        	return htmlelement;
        },
        /**
         * layouts overall feedback editor in design mode 
         * @returns {String} html element
         */
        overallfeedbackLayout:function(){
       	 var dataDivAttr = this.generalFeedback.text !='' ? 'data-div-placeholder-content' : '';
       	 var htmlelement="";
       	 htmlelement+='       <div class="colPageSection secondColPic">';
        	 htmlelement+='           <div>';
        	 htmlelement+='               <div class="editableDivTitle">';
        	 htmlelement+='                  <h6 class="pull-left font10">General solution:</h6> ';
        	 htmlelement+='                  <h6 class="pull-right font10">ID# '+this.generalFeedback.id+'</h6>';
        	 htmlelement+='               </div>';
        	 htmlelement+='               <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter general solution"  id="'+this.generalFeedback.id+'"  data-maxlength="'+this.generalFeedback.maxLength+'" class="inputDummy" '+dataDivAttr+'>'+this.generalFeedback.text+'</div>';
        	 htmlelement+='           </div>';
        	 htmlelement+='       </div>';
        	 htmlelement+='       <div class="colPageSection  invisible">';
        	 htmlelement+='           <div class="eachCol">';
        	 htmlelement+='               <a>';
        	 htmlelement+='                  <img src="img/getPicture.png">';
        	 htmlelement+='              </a>';
        	 htmlelement+='          </div>';
        	 htmlelement+='           <div></div>';
        	 htmlelement+='      </div>';
        	return htmlelement;
        },
        /**
	      * adds event hadlers for elements present in component general feedback editor property pane
	      */
	     afterGFEditorPropertyLayout:function(){	   
	    	 CheckBoxComponent.addEvent( "insertHelp"+this.generalFeedback.id,"click",this._openHelpModalForInsertHyperlink);
	    	 CheckBoxComponent.addEvent( "insert_"+this.generalFeedback.id, "click", this._updateGeneralFeedbackEditor );
	    	 this.generalFeedback.afterEditorlayout();
	     },
	    /**
	      * adds event hadlers for elements present in component overall feedback editor property pane
	      */
	     afterOFEditorPropertyLayout:function(){
	    	// CheckBoxComponent.addEvent( "charLimitHelp"+this.overallFeedback.id, "click", this._openHelpModalForCharLimit);
	    	 CheckBoxComponent.addEvent( "insertHelp"+this.overallFeedback.id,"click",this._openHelpModalForInsertHyperlink);
	    	 CheckBoxComponent.addEvent( "insert_"+this.overallFeedback.id, "click", this._updateOverallFeedBackEditor);
	    	 this.overallFeedback.afterEditorlayout();
	     },
	     /**
	      * layouts the editor property pane
	      */
	     feedbackPropertyLayout:function(prefix){
	    	
	    	 var editor = null;
	    	 switch(prefix){
	    		 case "GF":
	    			 editor=this.generalFeedback ;
	    			
	    			break;
	    		 case "OF":
	    			 editor= this.overallFeedback;
	    			
	    	 }
	    	 var htmlelement="";
	    	 htmlelement+='    <div class="tabContent tabProContent">';
	    	 var compType=this.type=='checkbox'?"Checkbox":this.type=='multiplechoice'?"Multiple Choice":this.type=='scale'?"Scales":this.type=='table'?"Table":"Input and Labels";
	    	 htmlelement+='        <p>Component: '+compType+'</p>';
	    	 htmlelement+='        <p>Element: Feedback</p>';
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
	    	 htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+editor.id+'">';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='        <div class="form-group">';
	    	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
	    	 htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+editor.id+'">';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='        <button id="insert_'+editor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
	    	 htmlelement+='        <div class="clear"></div>';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="clear"></div>';

         	return htmlelement;

	     },
	     /**
         * populate component general feedback editor properties
         */
        populateGFEditorProperties:function(){	        	
        	$("#elementProperties").html(this.feedbackPropertyLayout(this.generalFeedbackPrefix));        	 
        	this.afterGFEditorPropertyLayout();
			$("#elementProperties").show();
			$("#properties").hide();
			$("#activeHyperlink").text("");

			/* Media object creates here for that component */
			var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.generalFeedbackPrefix;
    		var newMedia = new Media({id:compId});
	      	$("#mediaProperties").html(newMedia.layout());
	      	$("#mediaProperties").show();
	      	newMedia.afterLayout();
	      	util.checkMediaInEditMode();
        },
        /**
         * populate component overall feedback editor properties
         */
        populateOFEditorProperties:function(){
        	$("#elementProperties").html(this.feedbackPropertyLayout(this.overallFeedbackPrefix));
    	 	this.afterOFEditorPropertyLayout();
			$("#elementProperties").show();
			$("#properties").hide();
			$("#activeHyperlink").text("");

			/* Media object creates here for that component */
    		var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.overallFeedbackPrefix;
    		var newMedia = new Media({id:compId});
	      	$("#mediaProperties").html(newMedia.layout());
	      	$("#mediaProperties").show();
	      	newMedia.afterLayout();
	      	util.checkMediaInEditMode();
        },
        /**
         * opens modal popup for Insert a hyperlink
         */
        openHelpModalForInsertHyperlink:function(event){
       	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
        },
        /**
	      * updates general feedback editor properties
	      */
		 updateGeneralFeedBackEditor:function(){			
			    var linkText=$("#linkText_"+this.generalFeedback.id).val();
		 		this.generalFeedback.linkText=$("#linkText_"+this.generalFeedback.id).val();
		 		var url=$("#linkAddress_"+this.generalFeedback.id).val();	 		
		 		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
					if(linkText != ""){
						if(url.slice(-1)==="/")
			 			{
			 			url=url.substring(0,url.length-1);
			 			}
						this.generalFeedback.linkAddress=url;
						util.evaluateUrl(this.generalFeedback.linkAddress, this.generalFeedback.linkText, this.generalFeedback.id);
						this.generalFeedback.update();
					}
					else{
						var currentEditor = ("linkText_"+this.generalFeedback.id);
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
					var currentEditor = ("linkAddress_"+this.generalFeedback.id);
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
	      * updates overall feedback editor properties
	      */
		 updateOverallFeedBackEditor:function(){
			 var linkText=$("#linkText_"+this.overallFeedback.id).val();
	 		this.overallFeedback.linkText=$("#linkText_"+this.overallFeedback.id).val();
	 		var url=$("#linkAddress_"+this.overallFeedback.id).val();	 		
	 		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
				if(linkText != ""){
					if(url.slice(-1)==="/")
		 			{
		 			url=url.substring(0,url.length-1);
		 			}
		 		this.overallFeedback.linkAddress=url;	
		 		util.evaluateUrl(this.overallFeedback.linkAddress, this.overallFeedback.linkText, this.overallFeedback.id);
		 		this.overallFeedback.update();
				}
				else{
					var currentEditor = ("linkText_"+this.overallFeedback.id);
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
				var currentEditor = ("linkAddress_"+this.overallFeedback.id);
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
		  * Marks current checkbox component as graded
		  * @param event
		  */
	     markGraded:function(){
	    	    var btnId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
	    	    
	    	    /* for table cell components */
	    	    if(typeof this.cellId != "undefined" && this.cellId != null){	    	    	
	    	    	btnId = btnId + this.cellId;	    	    	
	    	    }
	    	    
	    	 	if($("#gradadedObjectBtnId"+btnId).prop("checked")){
	    		 	this.graded =true;
	    		 	question.gradedCount = question.gradedCount+1;	    	    	
	    		}else{
	    			this.graded =false;
	    			question.gradedCount = question.gradedCount-1;	  	 	  	  
	    		}
	    	 	$("#gdObjetPcHolder").text(question.gradedCount);
	    		
	     },
	     /**
		  * Marks current checkbox component as mandatory
		  * @param event
		  */
	     markMandatory:function(){
	         var selectedOption =$('input[name=optionsRadios]:checked').val();
	         if(selectedOption=='Required'){
	        	 this.mandatory =true;
	         }
	         else if(selectedOption=='Optional'){
	        	 this.mandatory =false;
	         }	   	 
	     },
	     /**
	      * opens help modal popup for required question selector
	      * @param event
	      */
	     openHelpModalForRequiredQuestionSelector : function(event){
	    	 new Modal({id : 1,headingText : message.getrequiredQuetionHeader(),containtText : message.getrequiredQuetionMsg()}).openHelpModal(); 
	     },
	     /**
	      * opens help modal popup for Insert hyperlink
	      * @param event
	      */
	     openHelpModalForInsertHyperlink:function(event){
	    	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
	     }
	};  