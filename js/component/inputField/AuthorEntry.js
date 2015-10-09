/* ========================================================================
 * AuthorEntry: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all option specific properties like 
 * componentId (to which component it belongs),
 * student response. holds  text editor  
 * ======================================================================== */
var AuthorEntry  = function(options){
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.editor=null;
	this.idPrefix='E';
	this.orientation=1;
	this.sectionId=null;
	this.sectionIdPrefix="G";
	this.isDisabled=false;
	this.type="";
	$.extend(this, options);
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id});
	this._populateEditorProperties = AuthorEntry.BindAsEventListener( this, this.populateEditorProperties );
	this._update = AuthorEntry.BindAsEventListener( this, this.update );
	this._addAuthorEntry= AuthorEntry.BindAsEventListener( this, this.addAuthorEntry );
	this._removeAuthorEntry= AuthorEntry.BindAsEventListener( this, this.removeAuthorEntry );
	this._openHelpModalForInsertHyperlink = AuthorEntry.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
	this._filter =AuthorEntry.BindAsEventListener( this, this.filter );
	this._updateEditor= AuthorEntry.BindAsEventListener( this, this.updateEditor );
	this._changeOrientation=AuthorEntry.BindAsEventListener( this, this.changeOrientation );
};

//add event helper method
AuthorEntry.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
AuthorEntry.BindAsEventListener = function(object, fun) {
    return function(event) {
	    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
AuthorEntry.prototype = {  
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
		 * gets id of   authorEntry
		 * @returns  id
		 */
			getId : function(){
			return this.id;
		},
		/**
	     * sets id of authorEntry
	     * @param id
	     */
		setId : function(id){
			this.id = id;
		},
		/**
		 * gets idPrefix of Multiple Choice option
		 * @returns  idPrefix
		 */
		
	     /**
	      *  updates text of content editable divs to the object's editor text
	      */
         update:function(){
        	 console.log("update author entry");
        	 var selectedText = window.getSelection().toString() ;
        	 if(selectedText.length <=0 ){
        		 this.editor.update();        		
    			 question.updateFormulaDestinations(this.editor.id,util.getFormulas(this.editor.textWithoutFormatting));
    			 util.updateFormula(this.editor);  
        	 }        	 
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
       
         layout:function(isLast, pos,orientation){
        	 var cssColumnLayout=(orientation!=null)?"column-"+orientation:"column-"+this.orientation;
        	 var htmlelement='';
        	 htmlelement+='<div id="rowPagesection'+this.editor.id+'"class="rowPagesection firstRowPageSection authorSec  '+cssColumnLayout+'">';
        	
        	 htmlelement+='	<div class="colPageSection">';
        	 htmlelement+='			<div class="editableDivTitlelabel width-93">';
        	 htmlelement+='				<h6 class="pull-right font10">ID#'+this.editor.id+' </h6>';
        	 htmlelement+='			</div>';
        	 htmlelement+=			this.layoutEditor(isLast, pos);
        	 htmlelement+='	</div>';
        	 htmlelement+='</div>';
        	 return htmlelement;
         },
         /**
          * layouts option editor in design mode
          * @returns {String}
          */
         layoutEditor:function(isLast, pos){
         	var css = isLast==true?'style="display: block;"':' style="display: none;"';
         	var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';	
         	var disabledCss=(this.isDisabled) ? "disableEntryInput":"";
         	var minusCss=(this.isDisabled) ? "disableMinusBtn":"";
         	var htmlelement='';
         	htmlelement+='<div>';
         	var text = this.editor.text;
    		text = text.replace(/\Â/g," ");
         	var inputPlaceholder = 'Enter content';
         	if( this.type  == 'fillInTheBlank' ) {
         		if( pos && pos == 'first') {
         			inputPlaceholder = "Enter statement half one";
         		} else if( pos && pos == 'second' ) {
         			inputPlaceholder = "Enter statement half two";
         		}
         	}
         	htmlelement+='    <div id="'+this.editor.id+'" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" contenteditable="'+!this.isDisabled+'" data-maxlength="'+this.editor.maxLength+'" data-placeholder="'+inputPlaceholder+'" class="inputDummy inputDummyQuestionStem '+disabledCss+'"  '+dataDivAttr+'>'+text+'</div>';
         	if(isLast!=null){
 	        	 htmlelement+='<div class="pull-left" style="margin-top: 4px;margin-left: 4px;">';
 	        	 htmlelement+='	<div class="plusBtn" '+css+'>';
 	        	 htmlelement+='		<a id="plus_'+this.editor.id+'" title="Add Entry">';
 	        	 htmlelement+='			<img id="plus_'+this.editor.id+'" src="img/plus.png">';
 	        	 htmlelement+='		</a>';
 	        	 htmlelement+='	</div>';
 	        	 htmlelement+='	<div class="minusBtn '+minusCss+'">';
 	        	 htmlelement+='		<a id="minus_'+this.editor.id+'" title="Delete Entry">';
 	        	 htmlelement+='			<img id="minus_'+this.editor.id+'" src="img/minus.png">';
 	        	 htmlelement+='		</a>';
 	        	 htmlelement+='	</div>';
 	        	 htmlelement+='</div>';
         	}
         	htmlelement+='</div>';
 	    	return htmlelement;
          },
         
      /**
		 * adds new authorEntry for component
		 */
      addAuthorEntry:function(){  
    	  var i = 0;
	  		for (i in page.components) {
	  			if (page.components[i].getId() == this.componentId) {
	  				var j = 0;
	  				for (j in page.components[i].sections) {
	  					if (page.components[i].sections[j].id == this.sectionId) {
	  						var newId = page.components[i].sections[j].authorEntries[page.components[i].sections[j].authorEntries.length - 1].getId() + 1;
	  						var authorEntryConfig = {
	  							id : newId,
	  							componentId : this.componentId,
	  							componentIdPrefix : this.componentIdPrefix,
	  							sectionId : this.sectionId,
	  							orientation : this.orientation,
	  							type:this.type
	  						};
	  						var option = new AuthorEntry(authorEntryConfig);
	  						var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id);
	  						var minusBtnClass=$("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find("#rowPagesection"+id);
	  						var $lastAuthorEntry = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find("#rowPagesection"+id).last();
	  						this.isDisabled=false;
	  						if(page.components[i].sections[j].authorEntries.length==1 && $("#"+id).attr('contenteditable')=="false"){
	  							$("#"+id).attr('contenteditable','true');
		  						$("#"+id).removeClass("disableEntryInput");
		  						minusBtnClass.find(".colPageSection").find(".minusBtn").removeClass("disableMinusBtn");
	  						}
	  						else{
	  							page.components[i].sections[j].addAuthorEntry(option);
		  						minusBtnClass.find(".colPageSection").find(".minusBtn").removeClass("disableMinusBtn");
		  						if ($lastAuthorEntry.find(".colPageSection").find(".plusBtn").is(":visible"))
		  							$lastAuthorEntry.find(".colPageSection").find(".plusBtn").hide();
		  						$lastAuthorEntry.after(option.layout(true));
		  						$lastAuthorEntry.find(".colPageSection").find(".minusBtn").show();
		  						option.afterLayout();
	  						}
	  						
	  					}
	
	  				}
	
	  			}
	  		}
      },
      /**
       * removes current authorEntry from component //ToDo
       */
      removeAuthorEntry:function(event){
    	  var i = 0;
	  		for (i in page.components) {
	  			if (page.components[i].getId() == this.componentId) {
	  				var j = 0;
	  				for (j in page.components[i].sections) {
	  					if (page.components[i].sections[j].id == this.sectionId) {
	  						var k=0;
	  							for(k in page.components[i].sections[j].authorEntries){
		  		  	    			if(page.components[i].sections[j].authorEntries[k].id==this.id){
		  		  	    				if(page.components[i].sections[j].authorEntries.length==1){
		  		  	    				var $lastOption=$("#rowPagesection"+page.components[i].sections[j].authorEntries[page.components[i].sections[j].authorEntries.length-1].editor.id);
  			  							$lastOption.find(".colPageSection").find(".minusBtn").attr('disabled',true);
  			  							$lastOption.find(".colPageSection").find(".inputDummy ").attr('contenteditable','false');
  			  							$lastOption.find(".colPageSection").find(".inputDummy ").addClass("disableEntryInput");//disableMinusBtn
  			  							$lastOption.find(".colPageSection").find(".minusBtn").addClass('disableMinusBtn');
  			  							this.isDisabled=true;
		  		  	    				}else{
		  		  	    				page.components[i].sections[j].removeAuthorEntry(page.components[i].sections[j].authorEntries[k]);
	  		  		    				var id=(page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id);
  		    							$("#rowPagesection"+id).remove();
  		    							var lastOption=$("#rowPagesection"+page.components[i].sections[j].authorEntries[page.components[i].sections[j].authorEntries.length-1].editor.id);
  		    							lastOption.find(".colPageSection").find(".plusBtn").show();
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
     * populate option text editor properties
     */
    populateEditorProperties:function(){	    
    	$("#elementProperties").html(this.editorPropertyLayout());
		$("#elementProperties").show();
		$("#properties").hide();
     	this.afterEditorPropertyLayout();
     	$("#activeHyperlink").text("");

     	/* Media object creates here for that component */
          
            var newMedia = new Media({id:this.editor.id});
          $("#mediaProperties").html(newMedia.layout());
          $("#mediaProperties").show();
          newMedia.afterLayout();
          util.checkMediaInEditMode();
    },
   
    /**
     * layouts the editor property pane
     */
    editorPropertyLayout:function(){
    	var currentComp=util.getCurrentComp(this.componentId);
    	
    	var htmlelement="";
    	
    	 var elementType = this.type=="label" ? "Element: Label" : this.type=="inputField" ? "Element: Input field":"Element: Fill in the blank";
    	 htmlelement+='    <div class="tabContent tabProContent">';
	   	 htmlelement+='        <p>Component: Input and Labels</p>';
	   	 htmlelement+='        <p>'+elementType+'</p>';
	   	 htmlelement+='        <p id="elementid">ID# '+this.editor.id+'</p>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
	   	 htmlelement+='    <div class="gap10"></div>';
	   	 if(currentComp.subType!='fillInTheBlank'){
	   		 
		   	 htmlelement+='        <div class="head-info typeInput">';
	     	 htmlelement+='            <a id="fieldOrientation'+this.editor.id+'" class="info-icon"></a>Field orientation:';
	     	 htmlelement+='        </div>'; 
	     	 htmlelement+='       <div class="tabContent tabProContent">';
	     	 htmlelement+='           <div class="btn-group customDropdown">';
	     	 htmlelement+='                <button data-toggle="dropdown" id="camponentFieldOrientationId_" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	     	 htmlelement+='                    One column<span class="caret caretDrop"></span>';
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
    	}
	   	 
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
	   	 //htmlelement+='    <div id="linkAddress_'+this.editor.id+'" contenteditable="true"  data-placeholder="Enter Display Text" class="inputDummy"></div>';
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
			//validate URL with format like: "http://www.google.com/";
			if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
				if(linkText != ""){
					if(url.slice(-1)==="/"){
			 			url=url.substring(0,url.length-1);
			 		} 
			 		linkAddress=url;
			 		if(this.isDisabled==false){
			 			util.evaluateUrl(linkAddress, linkText, this.editor.id);
			 		}
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
	afterLayout:function(){
		AuthorEntry.addEvent( this.editor.id, "click", this._populateEditorProperties );
		AuthorEntry.addEvent( this.editor.id, "blur", this._update );
		AuthorEntry.addEvent( this.editor.id, "paste", this._filter);
		AuthorEntry.addEvent( "plus_"+this.editor.id, "click", this._addAuthorEntry );
		AuthorEntry.addEvent( "minus_"+this.editor.id, "click", this._removeAuthorEntry );
     	this.editor.afterEditorlayout();
	 },
	 /**
	  * adds events for html elements of current option editor property pane
	  */
	 afterEditorPropertyLayout:function(){
		 var currentComp=util.getCurrentComp(this.componentId);
		 if(currentComp.subType!='fillInTheBlank'){
			 if(this.orientation == 1){
		 			$("#camponentFieldOrientationId_").html("One column <span class='caret caretDrop'></span>");
		 		}else if(this.orientation == 2){
		 			$("#camponentFieldOrientationId_").html("Two column <span class='caret caretDrop'></span>");
		 		}else if(this.orientation == 3){
		 			$("#camponentFieldOrientationId_").html("Three column <span class='caret caretDrop'></span>");
		 		}
			 AuthorEntry.addEvent( "1column"+this.editor.id, "click", this._changeOrientation,{"type":1});
			 AuthorEntry.addEvent( "2column"+this.editor.id, "click", this._changeOrientation,{"type":2});
			 AuthorEntry.addEvent( "3column"+this.editor.id, "click", this._changeOrientation,{"type":3});
		 }
		 
		 AuthorEntry.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
		 AuthorEntry.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
		
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
	             $("#camponentFieldOrientationId_").html("1 column <span class='caret caretDrop'></span>");
	         } else if (event.data.type == 2) {
	             this.orientation = 2;
	             $("#camponentFieldOrientationId_").html("2 column <span class='caret caretDrop'></span>");
	         } else if (event.data.type == 3) {
	             this.orientation = 3;
	             $("#camponentFieldOrientationId_").html("3 column <span class='caret caretDrop'></span>");
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
	 
	isAuthorEntryFilled:function(){
		$("#htmlToTextConvertor").html(this.editor.text);
		var authorEntryText = $("#htmlToTextConvertor").text();
		if(this.isDisabled){
			return true;	
		}else{
			if(authorEntryText.length<=0) {
			    return false; 
			  }else{
			    return true;
		  }	
		}
		 	   
	},
	filter:function(event){
		util.removePasteImage(event.originalEvent.clipboardData,event);
	},
	 /**
     * layouts in instructor mode
     * @returns {String}
     */
    instructorLayout:function(orientation){
    	var htmlelement='';
    	var cssColumnLayout=(orientation!=null)?"column-"+orientation:"column-"+this.orientation;
    	if(this.orientation!='3'){
			cssColumnLayout="column-"+this.orientation+"-inputField";
		}
    	var editorText="";    	
    	if(question.mode==MODE_TEST || question.mode==MODE_PREVIEW){
    		editorText = util.getFormulaLinksForStudent(this.editor);
    	}    	
    	else if(question.mode==MODE_POST_TEST)
		{
    		editorText = util.getFormulaLinkForPostSubmission(this.editor);    		
		} 
    	
    	editorText = editorText.replace(/\Â/g,"");
		editorText = ((!this.isDisabled)?editorText:"");
    	editorText = util.getImageLayout(editorText);
        editorText = util.getVideoLayout(editorText);
        if(editorText.indexOf('<b>') != -1){
        	editorText = editorText + '</b>';
        }
        if(editorText.indexOf('<i>') != -1){
        	editorText = editorText + '</i>';
        }
        if(editorText.indexOf('<u>') != -1){
        	editorText = editorText + '</u>';
        }
    	if(this.type=='fillInTheBlank'){
    		if(question.mode==MODE_POST_TEST)
    			htmlelement+='<h6 style="max-width: 110px !important;"><div class="inputDummyQuestionStemStudent">'+editorText+'</div></h6>';
    		else
    			htmlelement+='<h6 style="max-width: 110px !important;"><div class="inputDummyQuestionStemStudent">'+editorText+'</div></h6>';
    	}
    	else if(this.type=='label'){
    	  if(!this.isDisabled){
	    	if(orientation!=null){
	   			 htmlelement+='	<div style="padding-left:30px;" class="colPageSection '+cssColumnLayout+'">';
	   		        htmlelement+='<h6 class="inputDummyQuestionStemStudent">'+editorText+'</h6>';
	   		        htmlelement+='</div>';
	   		}else{	   			
	   	        if(question.mode==MODE_POST_TEST)
	   				htmlelement+='	<div  style="margin-right: 35px;"  class="colPageSection '+cssColumnLayout+'">';
	   			else
	   				htmlelement+='	<div style="padding-left:8px; margin-right: 35px;"  class="colPageSection '+cssColumnLayout+'">';
	   	        htmlelement+='<h6 class="inputDummyQuestionStemStudent">'+editorText+'</h6>';
	   	        htmlelement+='</div>';	   	       
	   		}
    	  }
    	}
    	else if(!this.isDisabled){
    		if(orientation!=null){
    			 htmlelement+='	<div style="margin-right: 35px;" class="colPageSection '+cssColumnLayout+'">';
    		        htmlelement+='<h6 class="inputDummyQuestionStemStudent">'+editorText+'</h6>';
    		        htmlelement+='</div>';
    		}else{
    			if(question.mode==MODE_POST_TEST)
    				{
    					htmlelement+='<div style="margin-right: 35px;"   class="inputFieldRowPagesection '+cssColumnLayout+'">';
    					htmlelement+='	<div   class="colPageSection '+cssColumnLayout+'">';
    				}
    			else
    				{
	    				htmlelement+='<div>';	    				
	    				htmlelement+='	<div style="margin-right: 35px;"  class="colPageSection '+cssColumnLayout+'">';
    				}
    	        htmlelement+='<h6 class="inputDummyQuestionStemStudent">'+editorText+'</h6>';
    	        htmlelement+='</div>';
    	        htmlelement+='</div>';
    		}
    	}
		return htmlelement;
    },
    /**
     * layouts in student test mode
     * @returns {String}
     */
    studentLayout:function(){
    },
    /**
     * add event handers to html elements after the layout done in student test mode
     * @returns {String}
     */
    afterStudentLayout:function(){    
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
    postSubmissionReviewLayout:function(){
    },
   
}; 
