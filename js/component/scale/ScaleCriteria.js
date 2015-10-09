/* ========================================================================
 * ScaleCriteria: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * editor , pointEditor
 * for this component
 * ======================================================================== */
var ScaleCriteria = function(options){ 
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.idPrefix="C";
	this.pointIdPrefix="P";
	this.textIdPrefix="E";
	this.feedback="";
	this.feedbackIdPrefix="RF";
	$.extend(this, options);
	this.feedbackEditor = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.feedbackIdPrefix+this.id});
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.textIdPrefix+this.id});
	this.pointEditor = new NumericEditor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.pointIdPrefix+this.id,placeholder:'Pts.',allowNegative:true,text:""});
	this._addCriteria=MultipleChoiceOption.BindAsEventListener( this, this.addCriteria );	
	this._removeCriteria =MultipleChoiceOption.BindAsEventListener( this, this.removeCriteria );
	this._update = MultipleChoiceOption.BindAsEventListener( this, this.update );
	this._filter = MultipleChoiceOption.BindAsEventListener( this, this.filter );
	this._updateFeedback = MultipleChoiceOption.BindAsEventListener( this, this.updateFeedback );
	this._populateRangeEditorProperties = MultipleChoiceOption.BindAsEventListener( this, this.populateRangeEditorProperties );
	this._updateEditor= MultipleChoiceOption.BindAsEventListener( this, this.updateEditor );	
	this._openHelpModalForInsertHyperlink = MultipleChoiceOption.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
};

//add event helper method on element id
ScaleCriteria.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
ScaleCriteria.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
ScaleCriteria.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
ScaleCriteria.prototype = { 
		/**
		 * gets id of ScaleCriteria
		 * @returns  id
		 */
			getId : function(){
			return this.id;
		},
		/**
	     * sets id of ScaleCriteria
	     * @param id
	     */
		setId : function(id){
			this.id = id;
		},
		/**
		 * get editor
		 * @returns
		 */
		getEditor: function( ){
            return this.editor;  
	    },
	    /**
	     * sets editor
	     * @param editor
	     */
	    setEditor: function( editor){
	         this.editor =  editor;
	    },
	    /**
	     * gets pointEditor
	     * @returns
	     */
	    getPointEditor: function( ){
            return this.pointEditor;  
	    },
	    /**
	     * sets pointEditor
	     * @param pointEditor
	     */
	    setPointEditor: function( pointEditor){
	         this.pointEditor =  pointEditor;
	    },
	    
	    /**
	     * gets FeedbackEditor
	     * @returns
	     */
	    getFeedbackEditor: function( ){
            return this.feedbackEditor;  
	    },
	    /**
	     * sets FeedbackEditor
	     * @param feedbackEditor
	     */
	    setFeedbackEditor: function( feedbackEditor){
	         this.feedbackEditor =  feedbackEditor;
	    },
	    getFeedback: function( ){
            return this.feedback;  
	    },
	    setFeedback: function( feedback){
	         this.feedback =  feedback;
	    },
	    
	    /**
         * updates text of content editable divs to the object's editor text
         */
        update:function(e){
        	this.editor.update();
        	var i=0;
        	this.pointEditor.updateVal();
        	for(i in question.activePage.components){
    			if(question.activePage.components[i].id==this.componentId){
    				question.activePage.components[i].updateMinMaxPoint();
    				question.activePage.components[i].updateMinMaxForSubCat();
           			break;
    			}
        	}
        	/*
        	
        	if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
    		 	question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
        	}*/
        	
        },
        /**
		 * adds new criteria for component
		 */
		 addCriteria:function(){
		     var i=0;
	       	  for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			var newId = question.activePage.components[i].criterias[question.activePage.components[i].criterias.length-1].getId()+1;
	       			var config = {
						id:newId,
						componentId : this.componentId,
						componentIdPrefix : this.componentIdPrefix
					};
	       			var newCriteria = new ScaleCriteria(config);
	       			question.activePage.components[i].addCriteria(newCriteria);
	       			if(question.activePage.components[i].feedbackScoringType==="frequency"){
	       				var config = {
	       						id:newId,
	       						componentId : this.componentId,
	       				};	       		
	       				var subCategoryRanges = question.activePage.components[i].subCategoryRanges;
	       				var j=0;
	       				for(j in subCategoryRanges){
	       					var newRange = new Range(config);
		       				var newRangeFeedbackId =newRange.idPrefix+newRange.feedbackPrefix+newRange.id;
	       					var feedbackEditorId = subCategoryRanges[j].componentIdPrefix+subCategoryRanges[j].componentId+subCategoryRanges[j].idPrefix+subCategoryRanges[j].id; 
	       					newRange.rangeFeedbackEditor.setId(feedbackEditorId+newRangeFeedbackId);
	       					subCategoryRanges[j].addRange(newRange);	       			
	       				}
	       			}
					question.activePage.doLayout();
					question.activePage.components[i].populateComp();
	       		}
	       	 } 
		 },
		 /**
		  * removes current criteria from component
		  */
		 removeCriteria:function(){
			 var i=0;
		   	  for(i in question.activePage.components){
		   			if(question.activePage.components[i].id==this.componentId){
		   				var j=0;
		   				for(j in question.activePage.components[i].criterias){
		   					if(question.activePage.components[i].criterias[j].id==this.id){
		   						question.activePage.components[i].criterias.splice(parseInt(j),1);
		   						if(question.activePage.components[i].feedbackScoringType==="frequency"){
		   							var config = {
		   									id:this.id
		   							};					       		
		   							var newRange = new Range(config);
		   							var subCategoryRanges = question.activePage.components[i].subCategoryRanges;
		   							var i=0;
		   							for(i in subCategoryRanges){
		   								subCategoryRanges[i].removeRangeForFrequency(newRange);	       			
		   							}
		   						}		   						
		   						question.activePage.doLayout();
		   						question.activePage.components[i].populateComp();
		   						if(question.activePage.components[i].criterias.length==1){
		   							$("#minus_"+question.activePage.components[i].criterias[0].editor.id).hide();
		   						}
		   						break;
		   					}
		   				}
		   			}
		   	  }
		    	 
	     },
	     /**'
	      * is critera filled
	      */
	     isCriteriaComplete:function(){
	    	 
			 var editorText =  $("<div>"+this.editor.text+"</div>").text();
			 var pointValue= $("<div>"+this.pointEditor.text+"</div>").text();
			 if(editorText.length<=0 ||pointValue.length<=0){
				return false; 
			 }else{
				return true;
			}		 
	     },
	    /**
         * layouts html in design mode
         */
        layout:function(isLast,showMinus,isFrequncyFeedback,marker){
        	var css ;
          	if(showMinus==false){
          	css='style="display: none;"';	
          	}else{
          		if(isLast && (showMinus==true)){
          			css='style="display: block;"';
          		}
          	}
        	//var hidden =isLast?'':'hidden';
          	var css2 = isLast ?'style="display: block;"':' style="display: none;"';
        	 var htmlelement="";
        	 htmlelement+='<div class="scaleCriteriaDiv">';
        	 htmlelement+='<div style="margin-left:5px;" class="form-group ptsValue">';
        	 htmlelement+=this.editorLayout();
        	 htmlelement+=' </div>';
        	 htmlelement+=' <div style="margin-left:5px;" class="form-group ptsValue">';
        	 if(isFrequncyFeedback === true){
        		 this.pointEditor.contenteditable = false;
        		 this.pointEditor.text=marker;
        		 this.pointEditor.extraClasses="disabledField";
        	 }else{
        		 this.pointEditor.contenteditable = true;
        		 if(!util.isNumber(this.pointEditor.text)){
        			 this.pointEditor.text="";
        		 }
        		 this.pointEditor.extraClasses="";
        	 }
        	 htmlelement+=this.pointEditor.layout();
        	 htmlelement+='</div>';     	 
        	 htmlelement+='<div class="minusBtn" '+css2+'>';
        	 htmlelement+='    <a>';
        	 htmlelement+='        <img src="img/plus.png" id="plus_'+this.editor.id+'" title="Add Criteria">';
        	 htmlelement+='    </a>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="minusBtn"'+css+'>';
        	 htmlelement+='    <img src="img/minus.png" id="minus_'+this.editor.id+'" title="Delete Criteria">';
        	 htmlelement+=' </div>';
        	 htmlelement+=' </div>';
        	 return htmlelement;
        },
        editorLayout:function(){
        	var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
        	var htmlelement="";
        	htmlelement+='<div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" class="inputDummy" data-maxlength="'+this.editor.maxLength+'" '+dataDivAttr+' id="'+this.editor.id+'" data-placeholder="Enter text">'+this.editor.text+'</div>';
        	return htmlelement;
        },
        
	     /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
        afterLayout:function(){
        	ScaleCriteria.addEvent( "plus_"+this.editor.id, "click", this._addCriteria );
      	   ScaleCriteria.addEvent( "minus_"+this.editor.id, "click", this._removeCriteria );
      	   ScaleCriteria.addEvent( this.editor.id, "blur", this._update );
      	   ScaleCriteria.addEvent(this.pointEditor.id, "blur", this._update );
      	   ScaleCriteria.addEvent( this.editor.id, "paste", this._filter );
      	   ScaleCriteria.addEvent(this.pointEditor.id, "paste", this._filter );
      	   ScaleCriteria.addEvent(this.feedbackEditor.id, "blur", this._updateFeedback );
      	   ScaleCriteria.addEvent( this.feedbackEditor.id, "click", this._populateRangeEditorProperties);
      	   this.editor.afterEditorlayout();
      	   this.pointEditor.afterNumericEditorlayout();
      	},
      	
      	 afterRangeEditorPropertyLayout:function(){
      		ScaleCriteria.addEvent( "insertHelp"+this.feedbackEditor.id,"click",this._openHelpModalForInsertHyperlink);
      		ScaleCriteria.addEvent( "insert_"+this.feedbackEditor.id, "click", this._updateEditor);
      		 
      	 },
      	updateFeedback:function(){
      		this.feedbackEditor.update();
      	},
      	populateRangeEditorProperties:function(){     
      		$("#elementProperties").html(this.rangeEditorPropertyLayout());
	      	  $("#activeHyperlink").text("");
	      	  $("#elementProperties").show();
    		  $("#properties").hide();
            /* Media object creates here for that component */
            $("#mediaProperties").hide();
            /*var newMedia = new Media({id:this.feedbackEditor.id});
            $("#mediaProperties").html(newMedia.layout());
            $("#mediaProperties").show();
            newMedia.afterLayout();
            util.checkMediaInEditMode();*/
            this.afterRangeEditorPropertyLayout();
        },
        
        rangeEditorPropertyLayout:function(){
	     	
           	var htmlelement="";       
           	 var elementType ="Element: Feedback Label";
           	 htmlelement+='    <div class="tabContent tabProContent">';
       	   	 htmlelement+='        <p>Component: Scale</p>';
       	   	 htmlelement+='        <p>'+elementType+'</p>';
       	   	 htmlelement+='        <p id="elementid">ID# '+this.feedbackEditor.id+'</p>';
       	   	 htmlelement+='    </div>';
       	   	 htmlelement+='    <div class="clear"></div>';
       	   	 htmlelement+='    <div class="gap10"></div>';
       	   	
       	   	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
       	   	 htmlelement+='        <a id="insertHelp'+this.feedbackEditor.id+'" class="info-icon"></a>Insert a hyperlink:';
       	   	 htmlelement+='    </div>';
       	   	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
       	   	 htmlelement+='        <div class="form-group">';
       	   	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
       	   	 htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+this.feedbackEditor.id+'">';
       	   	 htmlelement+='        </div>';
       	   	 htmlelement+='        <div class="form-group">';
       	   	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
       	   	 htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+this.feedbackEditor.id+'">';   	   	 
       	   	 htmlelement+='        </div>';
       	   	 htmlelement+='        <button id="insert_'+this.feedbackEditor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
       	   	 htmlelement+='        <div class="clear"></div>';
       	   	 htmlelement+='    </div>';
       	   	 htmlelement+='    <div class="clear"></div>';

           	return htmlelement;
           },
           
           updateEditor:function(event){    	
      			var linkText=$("#linkText_"+this.feedbackEditor.id).val();
      			var linkAddress=$("#linkAddress_"+this.feedbackEditor.id).val();
      			var url=$("#linkAddress_"+this.feedbackEditor.id).val();	 		
      	 		
      	 		//this.evaluateUrl(linkAddress, linkText, this.editor.id);
      	 		
      	 		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
     				if(linkText != ""){
     					if(url.slice(-1)==="/"){
     		 	 			url=url.substring(0,url.length-1);
     		 	 		} 
     		 	 		linkAddress=url;
     		 	 		util.evaluateUrl(linkAddress, linkText, this.feedbackEditor.id);
     				}
     				else{
     					var currentEditor = ("linkText_"+this.feedbackEditor.id);
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
     				var currentEditor = ("linkAddress_"+this.feedbackEditor.id);
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
         * layouts in instructor mode
         * @returns {String}
         */
      	instructorLayout:function(index,showCriteriaPoints,isLast,feedbackScoringType){
           	var htmlelement='';
           	var shortText="";
           	var left="";
           	var css="";
           	var cssChar ="";
           	var cssLastChild="";
           	var isTextLong=false;           	
           	if((this.editor.textWithoutFormatting).length>=20){
           		left=index==1?419:(419+(51*(index-1)));
           		css='style=" left:'+left+'px;"';
           		cssLastChild='style=" left:'+(left+(55))+'px;width:263px;"';
           		cssChar = 'style="width: 185px;"';
           		shortString =((this.editor.textWithoutFormatting).replace(/<b>/g, '').substr(0,20)+'...');
           		
           		var criteriaText = util.getImageLayout(this.editor.text);
         		criteriaText = util.getVideoLayout(criteriaText);	

           		var index1 = criteriaText.indexOf(this.editor.textWithoutFormatting);
           		var beforeString = criteriaText.substr(0,index1);           		
           		var afterString = criteriaText.substr(index1+this.editor.textWithoutFormatting.length, criteriaText.length);
           		shortString = this.getCriteriaString(beforeString,afterString,shortString);
           		isTextLong=true;
           	}
           	else{
           		if((this.editor.textWithoutFormatting).length<=10 && !isTextLong){
           			shortString=(this.editor.text);	
          			 left=index==1?420:(422+((50)*(index-1)));
          			 css='style=" left:'+left+'px;"';
          			 cssLastChild='style=" left:'+(left+(55))+'px;width:263px;"';
          		     cssChar = 'style="width: 185px;"';
           		}else{
           			left=index==1?420:(424+(50*(index-1)));
              		 css='style=" left:'+left+'px;"';
              		 cssLastChild='style=" left:'+(left+(55))+'px; width:263px;"';
              		 cssChar = 'style="width: 185px;"';
              		shortString=(this.editor.text);	
           		}
           		shortString = this.getCriteriaString(null,null,shortString);  
           	}
            showCriteriaPoints = (feedbackScoringType!=="frequency" && showCriteriaPoints)?'  | '+this.pointEditor.text +' pts.' : "";
            var lstChild=isLast?'<div class="lastChild" '+cssLastChild+'></div>':"";
            var title=this.editor.textWithoutFormatting.replace(/"/g, '\\"').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
       		htmlelement+='<div title="'+title+'" class="rotate" '+css+'><b '+cssChar+'>'+shortString+'   <span class="pts-value"> '+showCriteriaPoints+' </span> </b></div>';
       		htmlelement+=lstChild;// ToDo
       		return htmlelement;
        },
        getCriteriaString:function(beforeString,afterString,shortString){
        	if(beforeString != null && afterString != null)
        	{
	        	var spanIndex = beforeString.indexOf("<span");
	       		var italicIndex = beforeString.indexOf("<i>");
	       		if(italicIndex!= -1)
	   			{
	       			beforeString = beforeString.replace("<i>","");
	       			afterString = afterString.replace("</i>","");
	       			if(spanIndex != -1)
	       			{
	       				beforeString = beforeString.replace("<span", "<i><span");
	       				afterString = afterString.replace("</span>", "</span></i>");
	       			}
	   			}
	       		var italicIndex=beforeString.indexOf("<b>");
	       		if(italicIndex!= -1)
	   			{
	       			beforeString = beforeString.replace("<b>","");
	       			afterString = afterString.replace("</b>","");
	       			if(spanIndex != -1)
	       			{
	       				beforeString = beforeString.replace("<span", "<b><span");
	       				afterString = afterString.replace("</span>", "</span></b>");
	       			}
	   			}
	       		var italicIndex=beforeString.indexOf("<u>");
	       		if(italicIndex!= -1)
	   			{
	       			beforeString = beforeString.replace("<u>","");
	       			afterString = afterString.replace("</u>","");
	       			if(spanIndex != -1)
	       			{
	       				beforeString = beforeString.replace("<span", "<u><span");
	       				afterString = afterString.replace("</span>", "</span></u>");
	       			}
	   			}
	       		shortString = beforeString + shortString + afterString;
        	}
        	else
        	{
        		var spanIndex = shortString.indexOf("<span");
	       		var italicIndex = shortString.indexOf("<i>");
	       		if(italicIndex!= -1)
	   			{
	       			shortString = shortString.replace("<i>","");
	       			shortString = shortString.replace("</i>","");
	       			if(spanIndex != -1)
	       			{
	       				shortString = shortString.replace("<span", "<i><span");
	       				shortString = shortString.replace("</span>", "</span></i>");
	       			}
	   			}
	       		var italicIndex=shortString.indexOf("<b>");
	       		if(italicIndex!= -1)
	   			{
	       			shortString = shortString.replace("<b>","");
	       			shortString = shortString.replace("</b>","");
	       			if(spanIndex != -1)
	       			{
	       				shortString = shortString.replace("<span", "<b><span");
	       				shortString = shortString.replace("</span>", "</span></b>");
	       			}
	   			}
	       		var italicIndex=shortString.indexOf("<u>");
	       		if(italicIndex!= -1)
	   			{
	       			shortString = shortString.replace("<u>","");
	       			shortString = shortString.replace("</u>","");
	       			if(spanIndex != -1)
	       			{
	       				shortString = shortString.replace("<span", "<u><span");
	       				shortString = shortString.replace("</span>", "</span></u>");
	       			}
	   			}
        		
        	}       		
       		return shortString;
        },
        filter:function(event){
    		util.removePasteImage(event.originalEvent.clipboardData,event);
    	},
    	feedbackLayout:function(criteriaIndex,markers){
    		var htmlelement="";
        	htmlelement+='<div class="midPageSection secondColPic">';
        	htmlelement+='   <div class="tag-row">';
        	if(criteriaIndex==0){
        		htmlelement+='<div style = "margin-left: 24px; padding-bottom:6px;" id="rangeFeedbackVales1">';
        		htmlelement+='    <span class="rangeFeedbackVales"> Range display is based on criteria students select most frequently. </span>';	        	
        		htmlelement+='</div>';
        		htmlelement+='<div class="clear"></div>';
        	}
        	htmlelement+='   </div><div style="margin-left:5px;" class="form-group ptsRangeValue boldFont">'+markers[criteriaIndex]+'</div>';        	
        	var dataDivAttr = this.feedbackEditor.text !='' ? 'data-div-placeholder-content' : '';
        	htmlelement+='  	<div contenteditable="true" name="'+ criteriaIndex +'"class="inputDummy textinput criteriaFeedback" '+dataDivAttr+' data-placeholder="Enter feedback" id="'+this.feedbackEditor.id+'">'+this.feedbackEditor.text+'</div>';
        	htmlelement+='	 </div>';
        	return htmlelement;
    	},
    	instructorFeedbackLayout:function(criteriaIndex,markers){
        	if( this.feedbackEditor.text != '' ) {
        		var htmlelement='';
               	htmlelement += '<div class="parent_div">';
               	htmlelement += '	<div class="frequency_child_div">' + markers[criteriaIndex] + '</div>';

               	var fbText = util.getImageLayout(this.feedbackEditor.text);
         			fbText = util.getVideoLayout(fbText);
         		htmlelement += '	<div class="feedbackTextDiv">';
         		htmlelement += '<div style="padding-top:0px;"><b>FEEDBACK:</b></div>';
         		htmlelement += fbText; 
               	htmlelement += '	</div>';
               	htmlelement += '</div>';
           		return htmlelement;
        	} else {
        		return '';
        	}
        }
};