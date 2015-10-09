/* ========================================================================
 * SectionLabel: Object Declaration * 
 * ========================================================================
 * Purpose of this object to have all option specific properties like 
 * componentId (to which component it belongs),
 * student response. holds  text editor  
 * ======================================================================== */
var SectionLabel  = function(options){
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.sectionId=null;
	this.sectionIdPrefix=null;
	this.editor=null;
	this.idPrefix='SL';
	this.isDisabled=false;
	$.extend(this, options);
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id});
	this._update = SectionLabel.BindAsEventListener( this, this.update );
	this._addSectionLabel= SectionLabel.BindAsEventListener( this, this.addSectionLabel );
	this._removeSectionLabel= SectionLabel.BindAsEventListener( this, this.removeSectionLabel );
	this._filter =SectionLabel.BindAsEventListener( this, this.filter );
  this._populateEditorProperties = SectionLabel.BindAsEventListener( this, this.populateEditorProperties );
  this._openHelpModalForInsertHyperlink = SectionLabel.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
  this._updateEditor = SectionLabel.BindAsEventListener(this,this.updateEditor);
};

//add event helper method
SectionLabel.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
SectionLabel.BindAsEventListener = function(object, fun) {
    return function(event) {
	    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
SectionLabel.prototype = {  
	/**
	 * gets id of   SectionLabel
	 * @returns  id
	 */
		getId : function(){
		return this.id;
	},
	/**
     * sets id of SectionLabel
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
    	 htmlelement+='	<div class="colPageSection sectLabel_colpagesection">';    	 
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
    	htmlelement+='    <div id="'+this.editor.id+'" contenteditable="'+!this.isDisabled+'" data-maxlength="'+this.editor.maxLength+'" data-placeholder="Enter Content" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" class=" inputDummy inputDummyMaxWidth inputDummyQuestionStem '+disabledCss+'"  '+dataDivAttr+'>'+this.editor.text+'</div>';
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
		 * adds new SectionLabel for component
		 */
      addSectionLabel:function(){  
    	  var i=0;
       	  for(i in question.activePage.components){
       		if(question.activePage.components[i].id==this.componentId){
       		  var j=0;
    		  for(j in question.activePage.components[i].sections){
    		   if(question.activePage.components[i].sections[j].id == this.sectionId){		
       			var newId = question.activePage.components[i].sections[j].sectionLabels[question.activePage.components[i].sections[j].sectionLabels.length-1].getId()+1;
           		var sectionLabelConfig = {
    				id : newId,
    				componentId : this.componentId,
    				componentIdPrefix : this.componentIdPrefix,
    				sectionId : question.activePage.components[i].sections[j].id,
					sectionIdPrefix : question.activePage.components[i].sections[j].idPrefix
    			};
    			var option = new SectionLabel(sectionLabelConfig);
    			var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id);
    			var minusBtnClass=$("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find("#rowPagesection"+id);
    			var $lastSectionLabel = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find("#rowPagesection"+id).last();
    			this.isDisabled=false;
    			
    			
    				if(question.activePage.components[i].sections[j].sectionLabels.length==1 && $("#"+id).attr('contenteditable')=="false"){
        				$("#"+id).attr('contenteditable','true');
        				$("#"+id).removeClass("disableEntryInput");
        				minusBtnClass.find(".colPageSection").find(".lebelField").find(".minusBtn").removeClass("disableMinusBtn");
        			}
        			else{
        				question.activePage.components[i].sections[j].addSectionLabel(option);
        				minusBtnClass.find(".colPageSection").find(".lebelField").find(".minusBtn").removeClass("disableMinusBtn");
        				if ($lastSectionLabel.find(".colPageSection").find(".lebelField").find(".plusBtn").is(":visible"))
        					$lastSectionLabel.find(".colPageSection").find(".lebelField").find(".plusBtn").hide();
        				$lastSectionLabel.after(option.layout(true));
        				$lastSectionLabel.find(".colPageSection").find(
        						".lebelField").find(".minusBtn").show();
        				option.afterLayout();
        			}
    		   }
    		  }	
       		}
       	 }
      },
      /**
       * removes current SectionLabel from component 
       */
      removeSectionLabel:function(event){
    	  var i=0;
	   	  for(i in question.activePage.components){
	   			if(question.activePage.components[i].id==this.componentId){
	   			 var kk=0;
	    		  for(kk in question.activePage.components[i].sections){
	    		   if(question.activePage.components[i].sections[kk].id == this.sectionId){
	   				for(j in question.activePage.components[i].sections[kk].sectionLabels){
	   					if(question.activePage.components[i].sections[kk].sectionLabels[j].id==this.id){
	   						if(question.activePage.components[i].sections[kk].sectionLabels.length==1){	   							
	  							var parentId = this.componentIdPrefix+this.componentId+question.activePage.components[i].sections[kk].idPrefix+question.activePage.components[i].sections[kk].id;
	   							var itsParent = $("#sectionLabelCollection_"+parentId);
	   							var outerPlus = $("#seclabelPlus_"+parentId);
	   							if(!itsParent.hasClass("hideIt")){
	   							  this.editor.text="";
	   							  $("#"+this.editor.id).html("");
	   							  itsParent.addClass("hideIt");
	   							  outerPlus.removeClass("hideIt");
	   							  question.activePage.components[i].sections[kk].showSectionLabels = false;
	   							}
	  							//this.isDisabled=true;
	   						} else {
	  	    					question.activePage.components[i].sections[kk].removeSectionLabel(question.activePage.components[i].sections[kk].sectionLabels[j]);
	  		    				var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id);
    							$("#rowPagesection"+id).remove();
    							var $lastOption = $("#sectionLabelCollection_"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId+this.sectionIdPrefix+this.sectionId).find(".authorSec").last();
    							$lastOption.find(".colPageSection").find(".lebelField").find(".plusBtn").show();
    							this.isDisabled=false;
	   						}
	   					}
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
		SectionLabel.addEvent( this.editor.id, "blur", this._update );
		SectionLabel.addEvent( this.editor.id, "paste", this._filter);
		SectionLabel.addEvent( "plus_"+this.editor.id, "click", this._addSectionLabel );
		SectionLabel.addEvent( "minus_"+this.editor.id, "click", this._removeSectionLabel );

    SectionLabel.addEvent( this.editor.id, "click", this._populateEditorProperties );

     	this.editor.afterEditorlayout();
	 },
	  editorPropertyLayout:function(){
     	/*var htmlelement="";
 	   	 htmlelement+='<p style="" id="elementid">ID# '+this.editor.id+'</p>';
 	   	 return htmlelement;*/
       var editorId = this.componentIdPrefix+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id;
       var editor=this.editor;
         var htmlelement="";
         htmlelement+='    <div class="tabContent tabProContent">';
         htmlelement+='        <p>Component: Checkbox</p>';
         
         htmlelement+='        <p id="elementid">ID# '+editorId+'</p>';
         htmlelement+='    </div>';
         htmlelement+='    <div class="clear"></div>';
         htmlelement+='    <div class="gap10"></div>';
         htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
         htmlelement+='        <a id="insertHelp'+this.editor.id+'"  class="info-icon" ></a>Insert a hyperlink:';
         htmlelement+='    </div>';
         htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
         htmlelement+='        <div class="form-group">';
         htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
         htmlelement+='            <input type="Text" placeholder="Enter Display Text"  id="linkText_'+this.editor.id+'">';
         htmlelement+='        </div>';
         htmlelement+='        <div class="form-group">';
         htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
         htmlelement+='            <input type="Text" placeholder="Enter Link"  id="linkAddress_'+this.editor.id+'">';
         htmlelement+='        </div>';
         htmlelement+='        <button id="insert_'+this.editor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
         htmlelement+='        <div class="clear"></div>';
         htmlelement+='    </div>';
         htmlelement+='    <div class="clear"></div>';

          return htmlelement;
    },
    
    afterEditorPropertyLayout:function(){
      SectionLabel.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
      SectionLabel.addEvent( "insert_"+this.editor.id, "click", this._updateEditor); 
    },
    populateEditorProperties:function(){
      $("#elementProperties").html(this.editorPropertyLayout());
      $("#activeHyperlink").text("");
      $("#elementProperties").show();
      $("#properties").hide();
      this.afterEditorPropertyLayout();
      /* Media object creates here for that component */
      $("#entryType").show();
      $("#activeHyperlink").text("");
      var newMedia = new Media({id:this.editor.id});
      $("#mediaProperties").html(newMedia.layout());
      $("#mediaProperties").show();
      newMedia.afterLayout();
      util.checkMediaInEditMode();
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
	
	isSectionLabelFilled:function(){
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

}; 
