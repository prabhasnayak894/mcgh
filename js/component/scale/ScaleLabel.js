/* ========================================================================
 * ScaleLabel: Object Declaration
 * @author: Prabhas Nayak
 * ========================================================================
 * Purpose of this object to have all option specific properties like 
 * componentId (to which component it belongs),
 * student response. holds  text editor  
 * ======================================================================== */
var ScaleLabel  = function(options){
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.editor=null;
	this.idPrefix='SL';
	this.isDisabled=false;
	$.extend(this, options);
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.id});
	this._update = ScaleLabel.BindAsEventListener( this, this.update );
	this._addScaleLabel= ScaleLabel.BindAsEventListener( this, this.addScaleLabel );
	this._removeScaleLabel= ScaleLabel.BindAsEventListener( this, this.removeScaleLabel );
	this._filter =ScaleLabel.BindAsEventListener( this, this.filter );
	this._populateEditorProperties = ScaleLabel.BindAsEventListener( this, this.populateEditorProperties );
	this._updateEditor= ScaleLabel.BindAsEventListener( this, this.updateEditor );
	this._openHelpModalForInsertHyperlink = ScaleLabel.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
};

//add event helper method
ScaleLabel.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
ScaleLabel.BindAsEventListener = function(object, fun) {
    return function(event) {
	    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
ScaleLabel.prototype = {
	/**
	 * gets id of   ScaleLabel
	 * @returns  id
	 */
		getId : function(){
		return this.id;
	},
	/**
     * sets id of ScaleLabel
     * @param id
     */
	setId : function(id){
		this.id = id;
	},
		
     /**
      *  updates text of content editable divs to the object's editor text
      */
     update:function(e){
    	 	this.editor.update();
    	 	/*
    	 	Commented As per request from client
    	 	if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
    		 	question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
    	 	}*/
     },
     /**
      * gets the option text editor
      * @returns
      */
     getEditor: function(){
         return this.editor;
     },
     /**
      * sets the option text editor
      * @param editor
      */
     setEditor: function(editor){
         this.editor=editor;
     },
    
     /**
      * layouts in design mode
      * @param isLast is the last option
      * @returns {String}
      */
   
     layout:function(isLast){
    	 var htmlelement='';
    	 htmlelement+='<div id="rowPagesection'+this.editor.id+'"class="rowPagesection1 firstRowPageSection authorSec">';
    	 htmlelement+='	<div class="colPageSection">';    	 
    	 htmlelement+=			this.layoutEditor(isLast);
    	 htmlelement+='	</div>';
    	 htmlelement+='</div>';
    	 return htmlelement;
     },
     /**
      * layouts option editor in design mode
      * @returns {String}
      */
     layoutEditor:function(isLast){
    	var css = isLast==true?'style="display: block;"':' style="display: none;"';
    	var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';	
    	var disabledCss=(this.isDisabled) ? "disableEntryInput":"";
     	var minusCss=(this.isDisabled) ? "disableMinusBtn":"";
    	var htmlelement='';
    	htmlelement+='<div class="lebelField">';
    	htmlelement+='    <div id="'+this.editor.id+'" contenteditable="'+!this.isDisabled+'" data-maxlength="'+this.editor.maxLength+'" data-placeholder="Enter Content" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" class=" scalelabelEditField inputDummy inputDummyQuestionStem '+disabledCss+'"  '+dataDivAttr+'>'+this.editor.text+'</div>';
    	if(isLast!=null){
        	 htmlelement+='<div class="pull-left" style="margin-top: 4px;margin-left: 4px;">';
        	 htmlelement+='	<div class="plusBtn" '+css+'>';
        	 htmlelement+='		<a id="plus_'+this.editor.id+'" title="Add Entry">';
        	 htmlelement+='			<img id="plus_'+this.editor.id+'" src="img/plus.png">';
        	 htmlelement+='		</a>';
        	 htmlelement+='	</div>';
        	 htmlelement+='	<div class="minusBtn '+minusCss+'" title="Delete Entry">';
        	 htmlelement+='		<a id="minus_'+this.editor.id+'" >';
        	 htmlelement+='			<img id="minus_'+this.editor.id+'" src="img/minus.png">';
        	 htmlelement+='		</a>';
        	 htmlelement+='	</div>';
        	 htmlelement+='</div>';
    	}
    	htmlelement+='</div>';
    	return htmlelement;
     },        
      /**
		 * adds new ScaleLabel for component
		 */
      addScaleLabel:function(){  
    	  var i=0;
       	  for(i in question.activePage.components){
       		if(question.activePage.components[i].id==this.componentId){
       			var newId = question.activePage.components[i].scaleLabels[question.activePage.components[i].scaleLabels.length-1].getId()+1;
           		var scaleLabelConfig = {
    				id : newId,
    				componentId : this.componentId,
    				componentIdPrefix : this.componentIdPrefix
    			};
    			var option = new ScaleLabel(scaleLabelConfig);
    			var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.idPrefix+this.id);
    			var minusBtnClass=$("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find("#rowPagesection"+id);
    			var $lastScaleLabel = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find("#rowPagesection"+id).last();
    			this.isDisabled=false;
    			if(question.activePage.components[i].scaleLabels.length==1 && $("#"+id).attr('contenteditable')=="false"){
    				$("#"+id).attr('contenteditable','true');
    				$("#"+id).removeClass("disableEntryInput");
    				minusBtnClass.find(".colPageSection").find(".lebelField").find(".minusBtn").removeClass("disableMinusBtn");
    			}
    			else{
    				question.activePage.components[i].addScaleLabel(option);
    				minusBtnClass.find(".colPageSection").find(".lebelField").find(".minusBtn").removeClass("disableMinusBtn");
    				if ($lastScaleLabel.find(".colPageSection").find(".lebelField").find(".plusBtn").is(":visible"))
    					$lastScaleLabel.find(".colPageSection").find(".lebelField").find(".plusBtn").hide();
    				$lastScaleLabel.after(option.layout(true));
    				$lastScaleLabel.find(".colPageSection").find(
    						".lebelField").find(".minusBtn").show();
    				option.afterLayout();
    			}
       		}
       	 }
      },
      /**
       * removes current ScaleLabel from component 
       */
      removeScaleLabel:function(event){
    	  var i=0;
	   	  for(i in question.activePage.components){
	   			if(question.activePage.components[i].id==this.componentId){
	   				for(j in question.activePage.components[i].scaleLabels){
	   					if(question.activePage.components[i].scaleLabels[j].id==this.id){
	   						if(question.activePage.components[i].scaleLabels.length==1){
	   							var $lastOption = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find(".authorSec").last();
	  							$lastOption.find(".colPageSection").find(".lebelField").find(".minusBtn").attr('disabled',true);
	  							$lastOption.find(".colPageSection").find(".lebelField").find(".inputDummy ").attr('contenteditable','false');
	  							$lastOption.find(".colPageSection").find(".lebelField").find(".inputDummy ").addClass("disableEntryInput");//disableMinusBtn
	  							$lastOption.find(".colPageSection").find(".lebelField").find(".minusBtn").addClass('disableMinusBtn');
	  							//this.editor.text="";
	  							//$("#"+this.editor.id).html("");
	  							this.isDisabled=true;
	   						} else {
	  	    					question.activePage.components[i].removeScaleLabel(question.activePage.components[i].scaleLabels[j]);
	  		    				var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.idPrefix+this.id);
    							$("#rowPagesection"+id).remove();
    							var $lastOption = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find(".authorSec").last();
    							$lastOption.find(".colPageSection").find(".lebelField").find(".plusBtn").show();
    							this.isDisabled=false;
	   						}
	   					}
	   				}
	   			}
	   	  	}    	  
      },
	/**
	 * adds events for html elements related to current option
	 */
	afterLayout:function(){
		ScaleLabel.addEvent( this.editor.id, "blur", this._update );
		ScaleLabel.addEvent( this.editor.id, "paste", this._filter);
		ScaleLabel.addEvent( "plus_"+this.editor.id, "click", this._addScaleLabel );
		ScaleLabel.addEvent( "minus_"+this.editor.id, "click", this._removeScaleLabel );
		ScaleLabel.addEvent( this.editor.id, "click", this._populateEditorProperties );
     	this.editor.afterEditorlayout();
	 },
	
	 afterEditorPropertyLayout:function(){
		 ScaleLabel.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
		 ScaleLabel.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
  		 
  	 },
     populateEditorProperties:function(){
    	  $("#elementProperties").html(this.editorPropertyLayout());
    	  $("#activeHyperlink").text("");
    	  $("#elementProperties").show();
  		  $("#properties").hide();
    	  this.afterEditorPropertyLayout();
        /* Media object creates here for that component */
        $("#mediaProperties").hide();
        /*var newMedia = new Media({id:this.editor.id});
        $("#mediaProperties").html(newMedia.layout());
        $("#mediaProperties").show();
        newMedia.afterLayout();
        util.checkMediaInEditMode();*/
     },
	
     editorPropertyLayout:function(){
	     	
       	var htmlelement="";       
       	 var elementType ="Element: Scale Label";
       	 htmlelement+='    <div class="tabContent tabProContent">';
   	   	 htmlelement+='        <p>Component: Scale</p>';
   	   	 htmlelement+='        <p>'+elementType+'</p>';
   	   	 htmlelement+='        <p id="elementid">ID# '+this.editor.id+'</p>';
   	   	 htmlelement+='    </div>';
   	   	 htmlelement+='    <div class="clear"></div>';
   	   	 htmlelement+='    <div class="gap10"></div>';
   	   	
   	   	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
   	   	 htmlelement+='        <a id="insertHelp'+this.editor.id+'" class="info-icon"></a>Insert a hyperlink:';
   	   	 htmlelement+='    </div>';
   	   	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
   	   	 htmlelement+='        <div class="form-group">';
   	   	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
   	   	 htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+this.editor.id+'">';
   	   	 htmlelement+='        </div>';
   	   	 htmlelement+='        <div class="form-group">';
   	   	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
   	   	 htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+this.editor.id+'">';   	   	 
   	   	 htmlelement+='        </div>';
   	   	 htmlelement+='        <button id="insert_'+this.editor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
   	   	 htmlelement+='        <div class="clear"></div>';
   	   	 htmlelement+='    </div>';
   	   	 htmlelement+='    <div class="clear"></div>';

       	return htmlelement;
       },
     
       /**
        * updates editor properties
        */
    	 updateEditor:function(event){    	
   			var linkText=$("#linkText_"+this.editor.id).val();
   			var linkAddress=$("#linkAddress_"+this.editor.id).val();
   			var url=$("#linkAddress_"+this.editor.id).val();	 		
   	 		
   	 		//this.evaluateUrl(linkAddress, linkText, this.editor.id);
   	 		
   	 		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
  				if(linkText != ""){
  					if(url.slice(-1)==="/"){
  		 	 			url=url.substring(0,url.length-1);
  		 	 		} 
  		 	 		linkAddress=url;
  		 	 		util.evaluateUrl(linkAddress, linkText, this.editor.id);
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
     
	isScaleLabelFilled:function(){
		$("#htmlToTextConvertor").html(this.editor.text);
		var authorEntryText = $("#htmlToTextConvertor").text();
		 if(authorEntryText.length<=0 && !this.isDisabled) {
			    return false; 
			  }else{
			    return true;
		  }		   
	},
	filter:function(event){
		util.removePasteImage(event.originalEvent.clipboardData,event);
	},
	
	/**
     * opens modal popup for Insert a hyperlink
     */
    openHelpModalForInsertHyperlink:function(event){
   	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
    },
	 /**
     * layouts in instructor mode
     * @returns {String}
     */
    instructorLayout:function(){
   	 	var i=0;
     	 var currentCompIndex=0;
     	 var notApplicableFlag=null;
         var hideSubCategory = false; 
	       	 for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			currentCompIndex=i;
	       			if(question.activePage.components[i].hideSubCategoryToStudent)
	       				hideSubCategory = true;
	       		}
	       	  }
	       	var j=0;
	        var isCompleteFlag=false;
	        if(question.activePage.components[currentCompIndex].scaleType=="S"){
	        	for(j in question.activePage.components[currentCompIndex].studentResponses){
	     			if(question.activePage.components[currentCompIndex].studentResponses[j].criteriaId==null){
	     				isCompleteFlag=false;
	     				break;
	     			}
	     			else{
	     				isCompleteFlag = true;
	     			}
	     		}
	        }
	        else{
	        	for(x in question.activePage.components[currentCompIndex].subCategories){
		        	for(j in question.activePage.components[currentCompIndex].subCategories[x].studentResponses){
		      			if(question.activePage.components[currentCompIndex].subCategories[x].studentResponses[j].criteriaId == null){
		      				isCompleteFlag=false;
		     				break;
		     			}
		     			else{
		     				isCompleteFlag = true;
		     			}
		      		}
	        	}
	        }
	        	
	    notApplicableFlag=question.activePage.components[currentCompIndex].notApplicableStudentResponse;
	    var rightWrnCss="";
	    var htmlelement='';
	    var isFirst = false;
	    var headLblClass = "";
	    if(question.mode == "test"){
	    	headLblClass = "stdQueLabel";
	    }else if(question.mode == MODE_POST_TEST){
	    	headLblClass = "post-scale-row-head";
	    	/*check for first label to show/hide correct and incorrect flags for other than first label*/
	    	if(arguments[0]!=undefined){
	    		isFirst = arguments[0];
	    	}
	    }
	    
	    if(question.mode== MODE_POST_TEST && (question.activePage.components[currentCompIndex].scaleType=="S")){
	    	if(isFirst){
	    		rightWrnCss = ((notApplicableFlag==null && isCompleteFlag==false))?"wrong":"correct";
	    	}
	    	htmlelement+='<div class="container prevQuestInstructor"><div class="row stdQueLabel inputDummyQuestionStemStudent"><div style="margin-top: 10px;  width:100% !important;"  class="answerTick correct-2 '+rightWrnCss+'" action="#">';
	    }else{
	    	if(hideSubCategory && question.mode== MODE_POST_TEST){
	    		if(isFirst){
	    			rightWrnCss = ((notApplicableFlag==null && isCompleteFlag==false))?"answerTick wrong":"answerTick correct";
	    		}
	    	}
	    	htmlelement+='<div class="container prevQuestInstructor"><div class="row stdQueLabel inputDummyQuestionStemStudent"><div style="margin-top: 10px;  width:100% !important;"  class="correct-2 '+rightWrnCss+'" action="#">';
	    }       
	    var stmtText = util.getImageLayout(this.editor.text);
         stmtText = util.getVideoLayout(stmtText);
   		htmlelement+=((!this.isDisabled)?stmtText:" ");
   		htmlelement+='</div></div></div>';
   		return htmlelement;
    }
}; 
