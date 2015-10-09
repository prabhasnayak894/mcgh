/* ========================================================================
 * Statement: Object Declaration
 * @author: Smita Pawar
 * ========================================================================
 * Purpose of this object to have all Scale Sub-Category specific properties like 
 * weightEditor, editor
 * ======================================================================== */
var Statement = function(options){ 
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.statementIdPrefix="E";
	this.weightIdPrefix="W";
	this.subCategoryIds;
	this.graded=true;
	this.mandatory=true;
	$.extend(this, options);
	this.weightEditor= new NumericEditor({id:this.componentIdPrefix+this.componentId+this.weightIdPrefix+this.id,placeholder:'Weight',allowNegative:true,text:1});
	this.editor=new Editor({id:this.componentIdPrefix+this.componentId+this.statementIdPrefix+this.id});
	
	this._addStatement=Statement.BindAsEventListener( this, this.addStatement );	
	this._removeStatement =Statement.BindAsEventListener( this, this.removeStatement );
	this._update = Statement.BindAsEventListener( this, this.update );
	this._filter = Statement.BindAsEventListener( this, this.filter );
	this._populateStatementProperties = Statement.BindAsEventListener( this, this.populateStatementProperties );
	this._markGraded=Statement.BindAsEventListener( this, this.markGraded );
	this._markMandatory = Statement.BindAsEventListener( this, this.markMandatory );
	this._selectSubCategories= Statement.BindAsEventListener( this, this.selectSubCategories );
	this._updateStudentResponse = Statement.BindAsEventListener( this, this.updateStudentResponse );
	this._updateEditor= Statement.BindAsEventListener( this, this.updateEditor );
	this._openHelpModalForInsertHyperlink = Statement.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
};
//add event helper method
Statement.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
Statement.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
Statement.prototype = { 
		/**
		 * gets id of statement
		 * @returns {Integer} id
		 */
		getId:function(){
			return this.id;
        },
        /**
         * sets id of statement
         * @param id
         */
        setId:function(id){
       	 this.id=id;
        },
        /**
		 * gets componentId of statement
		 * @returns {Integer} componentId
		 */
		getComponentId:function(){
			return this.componentId;
        },
        /**
         * sets componentId of statement
         * @param componentId
         */
        setComponentId:function(componentId){
       	 this.componentId=componentId;
        },
        
        
        
        getSubCategoryIds:function(){
			return this.subCategoryIds;
        },
        /**
         * sets componentId of statement
         * @param componentId
         */
        setSubCategoryIds:function(subCategoryIds){
       	 this.subCategoryIds=subCategoryIds;
        },
        
        
        /**
		 * gets componentIdPrefix of statement
		 * @returns {String} componentIdPrefix
		 */
		getComponentIdPrefix:function(){
			return this.componentIdPrefix;
        },
        /**
         * sets componentIdPrefix of statement
         * @param componentIdPrefix
         */
        setComponentIdPrefix:function(componentIdPrefix){
       	 this.componentIdPrefix=componentIdPrefix;
        },
        /**
		 * gets weight of statement
		 * @returns {Editor} weight
		 */
		getWeightEditor:function(){
			return this.weightEditor;
        },
        /**
         * sets weight of statement
         * @param weight
         */
        setWeightEditor:function(weightEditor){
       	 this.weightEditor=weightEditor;
        },
        /**
		 * gets text of statement
		 * @returns {Editor} statement
		 */
		getEditor:function(){
			return this.editor;
        },
        /**
         * sets text of statement
         * @param text
         */
        setEditor:function(editor){
       	 this.editor=editor;
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
        /**
         * updates text of content editable divs to the object's editor text
         */
        isMandatory:function(){
        	 return this.mandatory;
        },
        setMandatory:function(mandatory){
        	 this.mandatory=mandatory;
        },
        
        update:function(e){
        	this.editor.update();
        	var i = 0;
        	this.weightEditor.updateVal();
        	for (i in question.activePage.components) {
        		if (question.activePage.components[i].id == this.componentId) {
        			question.activePage.components[i].updateMinMaxPoint();
        			question.activePage.components[i].updateMinMaxForSubCat();
        			break;
        		}
        	}
        	question.resetGradeCount();
        	/*
        	Commented As per request from client
        	if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
        		if(e.currentTarget.id.indexOf("W")> -1){
        			return;
        		}
        		question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
        	}*/
        },
        /**
         * filter copied text
         * @param event
         */
     	filter:function(event){
     		util.removePasteImage(event.originalEvent.clipboardData,event);
     	},
        /**
		 * adds new Statement for component
		 */
		 addStatement:function(){
		     var i=0;
		     var currentComponent = null;
	 			for (i in question.activePage.components) {
	 				if (question.activePage.components[i].id == this.componentId) {
	 					currentComponent = question.activePage.components[i];
	 				}
	 			}
	       	  for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
		       		var newId = question.activePage.components[i].statements[question.activePage.components[i].statements.length-1].getId()+1;
		       		var config = {
							id:newId,
							componentId : this.componentId,
							componentIdPrefix : this.componentIdPrefix
					};
		       		var newSatement = new Statement(config);
		       		question.activePage.components[i].addStatement(newSatement);
			       	 var $lastStatement = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find(".type-col-2").last();
		    		 if( $lastStatement.find(".colPageSection").last().find(".eachCol").find(".plusBtn").is(":visible"))
		    			 $lastStatement.find(".colPageSection").last().find(".eachCol").find(".plusBtn").hide();
		    		 $lastStatement.find(".colPageSection").last().find(".eachCol").find(".minusBtn").show(); 
		    		 if(currentComponent.feedbackScoringType==="frequency"){
		    			 $lastStatement.after(newSatement.layout(true,true, true));
		    		 }
		    		 else{
		    			 $lastStatement.after(newSatement.layout(true,true, false));
		    		 }
		    					    	   
		    		 newSatement.afterLayout();
		    		 question.resetGradeCount();
		    		 this.selectSubCategories();
			        return false;
	       		}
	       	 }
		 },
		 /**
		  * removes current Statement from component
		  */
		 removeStatement:function(){
			 var i=0;
		   	  for(i in question.activePage.components){
		   			if(question.activePage.components[i].id==this.componentId){
		   				for(j in question.activePage.components[i].statements){
		   					if(question.activePage.components[i].statements[j].id==this.id){
		   						
		   						question.activePage.components[i].statements.splice(parseInt(j),1);
		   						question.activePage.doLayout();
		   						question.activePage.components[i].populateComp();
		   						if(question.activePage.components[i].statements.length==1){
		   						 var $lastStatement = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find(".type-col-2").last();
		   						 $lastStatement.find(".colPageSection").last().find(".eachCol").find(".minusBtn").hide();
		   						}
		   						
		   						break;
		   					}
		   				}
		   			}
		   	  }	 
	     },
	     /**'
	      * is statement filled
	      */
	     isStatementComplete:function(){
			 var editorText =  $("<div>"+this.editor.text+"</div>").text();
			 var weightValue= $("<div>"+this.weightEditor.text+"</div>").text();
			 if(editorText.length<=0 ||weightValue.length<=0){
				return false; 
			 }else{
				return true;
			}		 
	     },
	    
	     /**
		  * Marks current statement as graded
		  * @param event
		  */
	     markGraded:function(){		    	
	    	 	if($("#gradadedObjectBtnId"+this.editor.id).prop("checked")){
	    		 	this.graded =true;
	    		 	question.gradedCount = question.gradedCount+1;	
	    		}else{
	    			this.graded =false;
	    			question.gradedCount = question.gradedCount-1;	
	    		}
	    	 	$("#gdObjetPcHolder").text(question.gradedCount);
	     },
	     /**
		  * Marks current statement as mandatory
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
         * layouts statement  in design mode
         * @returns {String}
         */
   
        layout:function(isLast,showMinus,isFrequncyFeedback){
        	
        	var css ="";
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
        	htmlelement+='    <div class="type-col-2">';
	       	 htmlelement+='        <div class="colPageSection secondColPic">';
	       	 htmlelement+='            <div>';
	       	 htmlelement+='                <div class="editableDivTitle">';
	       	 htmlelement+='                    <h6 class="pull-right font10">ID# '+this.editor.id+'</h6> ';
	       	 htmlelement+='                </div>';
	       	 htmlelement+='                <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" class="inputDummy inputDummyMaxWidth" data-maxlength="'+this.editor.maxLength+'" '+dataDivAttr+' id="'+this.editor.id+'" data-placeholder="Enter text">'+this.editor.text+'</div>';
	       	 htmlelement+='            </div>';
	       	 htmlelement+='       </div>';
	       	 htmlelement+='        <div class="colPageSection ">';
	       	 htmlelement+='            <div class="form-group ptsValue">';
	       	 if(isFrequncyFeedback === true){
	       		this.weightEditor.contenteditable = false;
	       		this.weightEditor.text="1";
	       		this.weightEditor.extraClasses="disabledField";
	       	 }else{
	       		this.weightEditor.contenteditable = true;
	       		this.weightEditor.extraClasses="";
	       	 }
	       	 htmlelement+=this.weightEditor.layout();
	       	 htmlelement+='            </div>';
	       	 htmlelement+='        </div>';
	       	
	       	 htmlelement+='			<div class="colPageSection fourthColPic" id="'+this.editor.id+'_subCategories">';
	       	 htmlelement+= 				this.layoutStatementSubCategory();
	       	 htmlelement+='			</div>';
	       	
	       	 htmlelement+='        <div class="colPageSection ">';
	       	 htmlelement+='            <div class="eachCol">';
	       	 htmlelement+='               <div class="plusBtn"'+css2+'">';
	       	 htmlelement+='                    <a href="#">';
	       	 htmlelement+='                        <img src="img/plus.png" id="plus_'+this.editor.id+'" title="Add Statement">';
	       	 htmlelement+='                    </a>';
	       	 htmlelement+='                </div>';
	       	 htmlelement+='                <div class="minusBtn"'+css+'>';
	       	 htmlelement+='                   <img src="img/minus.png" id="minus_'+this.editor.id+'" title="Delete Statement">';
	       	 htmlelement+='               </div>';
	       	
	       	 htmlelement+='            </div>';
	       	 htmlelement+='        </div>';
	       	 
	       	 htmlelement+='    </div>';
	       	 return htmlelement;
        },
        /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
       afterLayout:function(){
    	   Statement.addEvent( "plus_"+this.editor.id, "click", this._addStatement );
    	   Statement.addEvent( "minus_"+this.editor.id, "click", this._removeStatement );
    	   Statement.addEvent( this.editor.id, "blur", this._update );
    	   Statement.addEvent(this.weightEditor.id, "blur", this._update );
    	   Statement.addEvent( this.editor.id, "paste", this._filter );
    	   Statement.addEvent( this.weightEditor.id, "paste", this._filter );
    	   Statement.addEvent(  this.editor.id, "click", this._populateStatementProperties);
    	   this.weightEditor.afterNumericEditorlayout();
    	   this.editor.afterEditorlayout();
    	   $("#"+this.weightEditor.id).removeAttr("data-placeholder");
    	   $("#"+this.weightEditor.id).blur();    	   
    	   Statement.addEvent("categories"+this.componentIdPrefix+this.componentId+this.statementIdPrefix+this.id,"change", this._selectSubCategories);
    	   if (this.subCategoryIds != null)		
				$("#categories"+this.componentIdPrefix+this.componentId+this.statementIdPrefix+this.id).val(this.subCategoryIds);
       },      
       /**
        * populate statement text editor properties
        */
       populateStatementProperties:function(){	

			$("#elementProperties").html(this.statementPropertyLayout());
			this.afterStatementPropertyLayout();
			$("#elementProperties").show();
			$("#properties").hide();
			if (this.graded == true) {
				$('#gradadedObjectBtnId' + this.editor.id).prop('checked', true);
			} else {
				$('#gradadedObjectBtnId' + this.editor.id).prop('checked', false);
			}
			if (this.mandatory == true) {
				$('#optionsRadios1'+this.editor.id).prop('checked',
						true);
			} else {
				$('#optionsRadios2'+this.editor.id).prop('checked',
						true);
			}

			/* Code for media*/
            /* Media object creates here for that component */
            $("#mediaProperties").hide(); 
       },
       /**
		 * layouts the editor property pane
		 */
       statementPropertyLayout:function(){
      	 var htmlelement="";
      	 
      	 htmlelement+='   <div class="head-info">';
    	 htmlelement+='       <a id="checkBoxComponentHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon" ></a>Component: Scales';
    	 htmlelement+='   </div>';
    	 htmlelement+='   <div class="clear"></div>';
    	 htmlelement+='   <div class="tabContent tabProContent">';
    	 htmlelement+='<label id="staementID"> ID# '+this.editor.id+'</label>';
    	 htmlelement+='       <div class="grid">';

    	 htmlelement+='           <input type="checkbox" id="gradadedObjectBtnId'+this.editor.id+'">';
    	 htmlelement+='           <label for="gradadedObjectBtnId'+this.editor.id+'"><span></span>Graded object</label>';

    	 htmlelement+='       </div>';

    	 htmlelement+='   </div>';
    	
    	 htmlelement+='   <div class="clear"></div>';//    	
    	 htmlelement+='    <div class="head-info">';
    	 htmlelement+='       <a  id="requiredQuestionId'+this.editor.id+'" class="info-icon" ></a>Pre-requisite';
    	 htmlelement+='   </div>';
    	 htmlelement+='   <div class="clear"></div>';  
    	 htmlelement+='   <div class="tabContent tabProContent">';
    	 htmlelement+='       <p>In order to move forward,student responses are:</p>';
    	 htmlelement+='      <div class="radio">';
    	 htmlelement+='              <input type="radio" value="Required" id="optionsRadios1'+this.editor.id+'" name="optionsRadios">';
    	 htmlelement+='           <label for="optionsRadios1'+this.editor.id+'"><span></span> Required</label>';
    	 htmlelement+='       </div>';
    	 htmlelement+='      <div class="radio">';
    	 htmlelement+='               <input type="radio" value="Optional" id="optionsRadios2'+this.editor.id+'" name="optionsRadios">';
    	 htmlelement+='           <label for="optionsRadios2'+this.editor.id+'"><span></span> Optional</label>';
    	 htmlelement+='       </div>';
    	 htmlelement+='   </div>';
    	 
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
       * layouts for multipleSelect subCategories //ToDo
       */
      layoutSubCategory:function(){
		    var i = 0;
			var currentComponent = null;
			for (i in question.activePage.components) {
				if (question.activePage.components[i].id == this.componentId) {
					currentComponent = question.activePage.components[i];
				}
			}
			var htmlelement = "";			
			if (currentComponent.scaleType == "M") {
				htmlelement += '<select name="subCategories" id="categories'+this.componentIdPrefix+this.componentId+this.statementIdPrefix+this.id+'" style="width: 160px;  text-overflow: ellipsis;" class="subcategories_statement_'+this.componentIdPrefix+this.componentId+'">';
				htmlelement += ' <option  id="0" "value="Select a Subcategory">Select a Subcategory</option>';
				$.each(currentComponent.subCategories,function(index, subCategory) {
						if ($("<div>" + subCategory.editor.text+"</div>").text().length > 0) {
							htmlelement += ' <option  id="'+subCategory.id+'"value="'
									+ subCategory.id + '">'
									+ subCategory.editor.text
									+ '</option>';
						}
				});
				htmlelement += '</select>';
			}						
			return htmlelement;
      },
      selectSubCategories:function(){
    	  if($("#categories"+this.componentIdPrefix+this.componentId+this.statementIdPrefix+this.id).val()!="Select a Subcategory")
    		  this.subCategoryIds=($("#categories"+this.componentIdPrefix+this.componentId+this.statementIdPrefix+this.id).val());
    	this.update();    	
      },
      
      afterStatementPropertyLayout:function(){    	  
    	  Statement.addEvent("gradadedObjectBtnId"+this.editor.id, "click", this._markGraded);
    	  Statement.addEvent("optionsRadios1"+this.editor.id, "click", this._markMandatory);
    	  Statement.addEvent("optionsRadios2"+this.editor.id, "click", this._markMandatory);
    	  Statement.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
    	  Statement.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
    	  
    	  
      },
      /**
       * updates editor properties
       */
   	 updateEditor:function(event){    	
  			var linkText=$("#linkText_"+this.editor.id).val();
  			var linkAddress=$("#linkAddress_"+this.editor.id).val();
  			var url=$("#linkAddress_"+this.editor.id).val();
  			
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
  	    

  		/**
  	     * opens modal popup for Insert a hyperlink
  	     */
  	    openHelpModalForInsertHyperlink:function(event){
  	   	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
  	    },
  	    
      layoutStatementSubCategory : function(){
    	  var i = 0;
    	  var currentComponent = null;
    	  for( i in question.activePage.components ) {
    		  if( question.activePage.components[i].id == this.componentId ) {
    			  currentComponent = question.activePage.components[i];
    		  }
    	  }
    	  var htmlelement = '';
    	  if( currentComponent != null && currentComponent.scaleType == "M" ) {
    		  htmlelement += '		<div class="statementSubCategoryWrapper">';
    		  htmlelement+=this.layoutSubCategory();
    		  htmlelement += '		</div>';
    	  }    	  
    	  return htmlelement;
      },
      /**
       * layouts in instructor mode
       * @returns {String}
       */
      instructorLayout:function(criterias,subCategory){
         	var htmlelement='';
			var markCompulsary=(this.graded && question.mode== MODE_PREVIEW)?"<span class='starHide'>*</span>":"";
         	var displayWeight = question.mode== MODE_PREVIEW ? '<span class="wtColor">('+this.weightEditor.text+'wt.)</span>' : "" ;

         	var stmtText = util.getImageLayout(this.editor.text);
         		stmtText = util.getVideoLayout(stmtText);

     		htmlelement+='<td valign="middle"  class="tr-first"><div class="stmtInnerDiv"> '+markCompulsary+' '+stmtText+' '+ displayWeight +' </div> </td>';
     		var radioName=(subCategory==null)?'criteria_'+this.editor.id:'criteria_'+this.editor.id+'_'+subCategory.editor.id;
     		var disableCss= question.mode== MODE_TEST?"":'disabled';
     		var isChecked = '';
     		
     		var j=0;
	   		var currentComp=null;
   		    for(j in question.activePage.components){
   	       		if(question.activePage.components[j].id==this.componentId){
   	       			currentComp=question.activePage.components[j];
   	       		}
   	        }
	     		if(currentComp!=null){
	     			for(i in criterias){
	         			if(question.mode== MODE_TEST ||question.mode== MODE_POST_TEST){
	    	     			if(subCategory==null){
	    	     				if(currentComp.notApplicableStudentResponse){
	    	     					disableCss='disabled';
	    	     				}
	    	         			var k=0;
	    	         			for(k in currentComp.studentResponses){
	    	         				if(currentComp.studentResponses[k].statementId==this.id){
	    	         					if(currentComp.studentResponses[k].criteriaId!=null && currentComp.studentResponses[k].criteriaId== criterias[i].id){
	    	         						isChecked='checked';
	    	         					}else{
	    	         						isChecked='';
	    	         					}
	    	         					break;
	    	         				}
	    	         			}
	    	         		}else{
	    	         			var k=0;
	    	         			if(subCategory.notApplicableStudentResponse){
	    	     					disableCss='disabled';
	    	     				}
	    	         			for (k in subCategory.studentResponses){
	    	         				if(subCategory.studentResponses[k].statementId==this.id){
	    	         					if(subCategory.studentResponses[k].criteriaId!=null && subCategory.studentResponses[k].criteriaId== criterias[i].id){
	    	         						isChecked='checked';
	    	         					}else{
	    	         						isChecked='';
	    	         					}
	    	         					break;
	    	         				}
	    	         			}
	    	         		}
	         			}
	    	 			htmlelement+='<td valign="middle" align="center" class="tr-nthfirst">';     		
	    	     		htmlelement+='        <input type="radio" id="'+radioName+'_'+criterias[i].id+'"  name="'+radioName+'" class="checkbox_scale" '+disableCss+' '+isChecked+' >';
	    	     		htmlelement+='        <label for="'+radioName+criterias[i].id+'"></label>';
	    	     		htmlelement+=' </td>';
	         		}	
	     		}
     	
     		return htmlelement;
      },
      postSubmissionLayout:function(criterias,subCategory){
    	  var i=0;
    	  var selectedStatementCriteriaId = null;
		  var markCompulsary=(this.graded && question.mode== MODE_POST_TEST)?"<span class='starHide'>*</span>":"";
      	var currentCompIndex=0;
	       	 for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			currentCompIndex=i;
	       		}
	       	  }
      	if(subCategory==null){
      		var j=0;
      		for(j in question.activePage.components[currentCompIndex].studentResponses){
      			if(question.activePage.components[currentCompIndex].studentResponses[j].statementId==this.id){
      				selectedStatementCriteriaId = question.activePage.components[currentCompIndex].studentResponses[j].criteriaId;
      			}
      		}
      	}else{
      		var j=0;
      		for(j in subCategory.studentResponses){
      			if(subCategory.studentResponses[j].statementId==this.id){
      				selectedStatementCriteriaId = subCategory.studentResponses[j].criteriaId;
      			}
      		}
      	}
    	  
    	  
       	var htmlelement='';

       	var stmtText = util.getImageLayout(this.editor.text);
         stmtText = util.getVideoLayout(stmtText);

 		htmlelement+='<td class="tr-first"><div class="stmtInnerDiv">'+markCompulsary+' '+stmtText+' </div></td>';
 		var cnt =criterias.length;
 		var radioName=(subCategory==null)?'criteria_'+this.editor.id:'criteria_'+this.editor.id+'_'+subCategory.editor.id;
 		var disableCss= question.mode== MODE_TEST?"":'disabled'; 		
 		for(var i=0;i<cnt;i++){
 			var checked = (criterias[i].id==selectedStatementCriteriaId)? 'checked' : "" ;
 			htmlelement+='<td class="tr-nthfirst">';
     		htmlelement+='    <div style="padding-left:20px;">';
     		htmlelement+='        <input type="radio" id="'+radioName+'_'+(parseInt(i)+1)+'"   name="'+radioName+'" '+checked+' class="css-checkbox" '+disableCss+' >';
     		htmlelement+='        <label for="'+radioName+(parseInt(i)+1)+'"></label>';
     		htmlelement+='    </div>';
     		htmlelement+=' </td>';
 		}
 		var notApplicableFlag=null;
 		if(subCategory==null){
 			notApplicableFlag=question.activePage.components[currentCompIndex].notApplicableStudentResponse;
 		}else{
 			notApplicableFlag=subCategory.notApplicable;
 		}
 		if(notApplicableFlag==null && selectedStatementCriteriaId==null){
 			htmlelement+='<td class="tdLast">';
     		htmlelement+='    <div class="inCompleteAnswerBanner">You did not complete this question.';
     		htmlelement+='    </div>';
     		htmlelement+=' </td>';
 		}else{
 			htmlelement+='<td class="tdLast">';
     		htmlelement+='    <div> ';
     		htmlelement+='    </div>';
     		htmlelement+=' </td>';
 		}
 			
 		
 		return htmlelement;
      }, 
      /**
       * add event handers to html elements after the layout done in student test mode
       * @returns {String}
       */
      afterStudentLayout:function(criterias,subCategory){  
    	  var radioName=(subCategory==null)?'criteria_'+this.editor.id:'criteria_'+this.editor.id+'_'+subCategory.editor.id;
    	  var cnt =criterias.length;
    	  for(var i=0;i<cnt;i++){
    		  Statement.addEvent( radioName+'_'+criterias[i].id, "change", this._updateStudentResponse,{criteriaId:criterias[i].id,subCategoryId:subCategory==null?null:subCategory.id} );
    	  }
    	  $('.stdQueLabel').each(function (){
  			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
          });
      },
      /**
       * disable/enable student selection
       */
      disableStudentSelection:function(criterias,subCategory,flag){
    		var radioName=(subCategory==null)?'criteria_'+this.editor.id:'criteria_'+this.editor.id+'_'+subCategory.editor.id;
    		//var cnt =criterias.length;
    		var i = 0; 
    		for(i in criterias){
    			$("#"+radioName+'_'+(criterias[i].id)).attr('disabled', flag);
    		}
      },
      /**
       * update  student Response
       */
        updateStudentResponse:function(event){
        	var i=0;
        	var currentComponent = null;
  	       	for(i in question.activePage.components){
  	       		if(question.activePage.components[i].id==this.componentId){
  	       		    currentComponent = question.activePage.components[i];
  	       		}
  	       	}
  	        if(event.data.subCategoryId==null){
	       		var j=0;
	       		for(j in currentComponent.studentResponses){
	       			if(currentComponent.studentResponses[j].statementId==this.id){
	       				currentComponent.studentResponses[j].criteriaId=event.data.criteriaId;
	       			}
	       		}
	       	}else{
	       		var j=0;
	       		for(j in currentComponent.subCategories){
	       			if(currentComponent.subCategories[j].id==event.data.subCategoryId){
	       				var k=0;
	       				for(k in currentComponent.subCategories[j].studentResponses){
	       					if(currentComponent.subCategories[j].studentResponses[k].statementId==this.id){
	       						currentComponent.subCategories[j].studentResponses[k].criteriaId=event.data.criteriaId;
	               			}
	       				}
	       			}else{
	       				var k=0;
	       				for(k in currentComponent.subCategories[j].studentResponses){
	       					if(currentComponent.subCategories[j].studentResponses[k].statementId==this.id){
	       						if(currentComponentcurrentComponent.subCategories[j].studentResponses[k].criteriaId==null){
	       							currentComponent.subCategories[j].studentResponses[k].criteriaId=event.data.criteriaId;
	       							var radioName='criteria_'+this.editor.id+'_'+currentComponent.subCategories[j].editor.id;
	       							var m =0;
	       					    	  for(m in currentComponent.criterias){
	       					    		  if(event.data.criteriaId == currentComponent.criterias[m].id){
	       					    			  $("#"+radioName+'_'+currentComponent.criterias[m].id).prop("checked",true);  
	       					    		  }
	       					    		 
	       					    	  }
	       						}
	       							
	               			}
	       				}
	       			}
	       		}
	       	}
  	       /*go for component branching check */
  	        
   		 	if(currentComponent.isBranched){
   		 		var isChecked = $(event.target).prop("checked");
   		 		this.checkMapping(currentComponent, isChecked);
   		 		/*to display score in student side if component is branched */
   	   		 	this.displayTotalScoreStudentSide(currentComponent);
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
			
			
			//var ht1 = $("#wrapper").height();
			
			if(ht>900)
			{
			 myHeight = ht+150;
			}				
			
			EZ.resize(1125,myHeight);
        },
        displayTotalScoreStudentSide:function(currentComponent){
        	console.log("display score");
        	/*Calculate scores single/multi category wise*/
   		 	var score = 0;
   		 	var x=0;
			var totalScore=0;
			var subCount=0;
			var stmntCnt = 0;
			var totalFreqency=[];
   		 	if(currentComponent.scaleType =="M"){ /*for multicategory */
	   		 	
	   		 	for(x in currentComponent.subCategories){
	   				if(currentComponent.subCategories[x].statementIds.length>0){
		   				var subCatScore = currentComponent.calculateScoreForFeedback(currentComponent.subCategories[x]);	
		   				totalScore = totalScore + subCatScore;
		   				stmntCnt = stmntCnt + currentComponent.subCategories[x].statementIds.length;
		   				if(currentComponent.feedbackScoringType!="frequency"){
			   				if(!currentComponent.subCategories[x].notApplicableStudentResponse)
				   			{
				   				if(currentComponent.feedbackScoringType=="average")
					   			{
				   					subCatScore = subCatScore/currentComponent.subCategories[x].statementIds.length;
					   				
					   			}
				   				var multiplier = Math.pow(10, 2);
				   				subCatScore = Math.round(subCatScore * multiplier) / multiplier;
				   			}
			   				subCount++;
	   					}
		   				else{
		   					//calculation for frequency
		   					if(totalFreqency.length == 0){
		   						totalFreqency = subCatScore;
		   					}
		   					else{
		   						if(subCatScore.length > 1){
		   							for(lenSubCatScore in subCatScore){
		   								var isExist = false;
			   							for(var len in totalFreqency){
				   							if(totalFreqency[len].mostlySelectedCriteria == subCatScore[lenSubCatScore].mostlySelectedCriteria){
				   								isExist = true;
				   								break;
				   							}
				   						}
			   							if(isExist){
			   								totalFreqency[len].frequency = totalFreqency[len].frequency + subCatScore[lenSubCatScore].frequency;
			   							}
			   							else{
			   								totalFreqency.push(subCatScore[lenSubCatScore]);
			   							}
		   							}
		   						}
		   						else{
		   							var isExist = false;
		   							if(typeof subCatScore[0] != "undefined"){
		   								for(var len in totalFreqency){
				   							if(totalFreqency[len].mostlySelectedCriteria == subCatScore[0].mostlySelectedCriteria){
				   								isExist = true;
				   								break;
				   							}
				   						}
			   							if(isExist){
			   								totalFreqency[len].frequency = totalFreqency[len].frequency + subCatScore[0].frequency;
			   							}
			   							else{
			   								totalFreqency.push(subCatScore[0]);
			   							}
		   							}			   							
		   						}
		   					}
		   				}//calculation end
	   				}
	   			}// subcategory loop end
	   		 	if(currentComponent.feedbackScoringType=="average"){
		   			totalScore = totalScore/stmntCnt;
	   			}
	   			var multiplier = Math.pow(10, 2);
	   			totalScore = Math.round(totalScore * multiplier) / multiplier;
	   			if(currentComponent.feedbackScoringType == "frequency"){
	   				var max = 0;
	   				var mostFrequentOverall = [];
	   				for(var len in totalFreqency){
						 if (totalFreqency[len].frequency > max) {
							 mostFrequentOverall=[];
							 max = totalFreqency[len].frequency;
							 mostFrequentOverall.push(totalFreqency[len].mostlySelectedCriteria);
							 
						 }
						 else if(totalFreqency[len].frequency == max){
							 mostFrequentOverall.push(totalFreqency[len].mostlySelectedCriteria);
						 }
					 }
		        	totalScore = mostFrequentOverall;
	        	}
   		 	}else{ /*for singlecategory */
   		 		
	   		 	score = currentComponent.calculateScoreForFeedback(null);
   		 		
	   		 	if(!currentComponent.notApplicableStudentResponse)
	   			{
		   			if(currentComponent.feedbackScoringType=="average")
		   			{
		   				score = score/currentComponent.statements.length;
		   			}
		   			var multiplier = Math.pow(10, 2);
		   			/*avoid score calculation for frequency*/
		   			if(currentComponent.feedbackScoringType != "frequency"){
		   				score = Math.round(score * multiplier) / multiplier;
		   			}
	   			}
   		 	}
   		 	
   		 	/*display total points accordingly*/
   		 	var stdScoreTypeTextElem = $("#stdSideScore_"+currentComponent.id).find('.stdScoreTypeText');
   		 	var stdScorePointTextElem = $("#stdSideScore_"+currentComponent.id).find('.stdScorePointText');
     	
   		 	
   		 	if(stdScoreTypeTextElem.length>0 && stdScorePointTextElem.length>0){
   		 		var stdScoreTypeText = "";
   		 		var stdScorePointText = "";
		 		if(currentComponent.feedbackScoringType != "frequency"){
		 			
		 			stdScoreTypeText = " Total Score: ";
		 			if(currentComponent.scaleType =="M"){
		 				stdScorePointText = totalScore +" pts.";
		 			}else{
		 				stdScorePointText = score +" pts.";
		 			}		 			
		 			
	   		    }else{
	   		    	
	   		    	stdScoreTypeText = " Frequency Score: ";
	   		    	var mostSelectedIds=[];
	   		    	if(currentComponent.scaleType =="M"){
	   		    		mostSelectedIds = totalScore;
		 			}else{
		 				for(var len in score){
		 		   			for (var l in currentComponent.criterias){
		 		        		if(currentComponent.criterias[l].id == score[len].mostlySelectedCriteria){
		 		        			mostSelectedIds.push(currentComponent.criterias[l].id); //mostly selected criteria id
		 		        		}
		 		        	}
		 		   		 }
		 			}
	   		    	
	   		    	var oCriteria = [];
	  	   		  	var totalScoreLen=0;
 	   		
	  	   		  	if(mostSelectedIds.length > 1){
	  	   		  		
	  	   		  		for(totalScoreLen in mostSelectedIds){
	  	   				  try{
	      	                  var obj = currentComponent.criterias.filter(function(e){
	      	                	        return e.id == mostSelectedIds[totalScoreLen];
	      	                  });
	      	              }catch(err){
	      	                 obj = {};
	      	              }
	      	              oCriteria.push(obj[0].editor.text);
	  	   		  		}
	  	   		  		stdScorePointText = "You selected "+ oCriteria +" an equal number of times.";
	  	   		  	}
	  	   		  	else{
	  	   		  		
	  	   		  		if(mostSelectedIds.length != 0){
	  		   				try{
	          	                  var obj = currentComponent.criterias.filter(function(e){
	          	                	        return e.id == mostSelectedIds;
	          	                  });
	          	            }catch(err){
	          	                 obj = {};
	          	            }
	      	            oCriteria = obj[0].editor.text;
	      	            stdScorePointText ='You selected mostly "'+ oCriteria+'"';
	  	   			}
	  	   		  }
	  	   		  	
	   		    	
	   		    }
				if(currentComponent.isStudentAnswered() && (currentComponent.showToStud ||currentComponent.showToStud==undefined )){
		  			stdScoreTypeTextElem.text(stdScoreTypeText);
			 		stdScorePointTextElem.text(stdScorePointText);

		  		 }else{
		  			stdScoreTypeTextElem.text("");
		  			stdScorePointTextElem.text("");
		  			
		  		 }
		 	} 		    
        },
        checkMapping : function(currentComponent, isChecked){
        	
        	
        	/*changes for branching based on responses*/
        	var fullCmpId = currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix+currentComponent.id;
        	var isFrequency = false;
   		 		var totalPointsVal = 0;
   		 		if(currentComponent.scaleType =="M"){ /*for multicategory */
   		 		  var x=0;
   		 		  for(x in currentComponent.subCategories){
   		 			var subCatScore = currentComponent.calculateScoreForFeedback(currentComponent.subCategories[x]);
   		 			totalPointsVal = totalPointsVal + subCatScore;
   		 		  }
   		 		}else{ /*for singlecategory */
   		 		  totalPointsVal = currentComponent.calculateScoreForFeedback(null);
   		 		}
   		 	    if(!currentComponent.notApplicableStudentResponse){
   		 	        /* for average score case*/
   	   		 		if(currentComponent.feedbackScoringType == "average"){
   	   		 		   totalPointsVal = totalPointsVal/currentComponent.statements.length;
   	   		 		   var multiplier = Math.pow(10, 2);
   	   		 		   totalPointsVal = Math.round(totalPointsVal * multiplier) / multiplier;
   	   		 		}
   		 		}
   		 	    var isStudentRespo = currentComponent.isStudentAnswered();
   		 	    var mostSelectedIds=[];
   		 		if(currentComponent.feedbackScoringType == "frequency"){
   		 			isFrequency = true;
   		 			/*get mostly selected criteria*/
   		 			for(var len in totalPointsVal){
   		 				for (var l in currentComponent.criterias){
   		 					if(currentComponent.criterias[l].id == totalPointsVal[len].mostlySelectedCriteria){
   		 						mostSelectedIds.push(currentComponent.markers[l]); //mostly selected criteria markers
   		 					}
   		 				}
   		 			}
   		 			//pass array of mostlySelected ids to set flag
   		 			this.setMappedEntities(fullCmpId, isChecked, mostSelectedIds, isFrequency, isStudentRespo);
   		 		}else{
   		 		  this.setMappedEntities(fullCmpId, isChecked, totalPointsVal, isFrequency, isStudentRespo);
   		 		}
	   		 	var bId = 0;
	         	for(bId in question.branches){
	 				if(question.branches[bId].criteria == "multi" && (question.branches[bId].cId == fullCmpId || question.branches[bId].cId_2 == fullCmpId)){
	 					if(isStudentRespo){
	 						if(currentComponent.feedbackScoringType == "frequency"){
	 							util.checkMultiCriteriaMapping(question.branches[bId]);
	 						}else{
	 							util.checkMultiCriteriaMapping(question.branches[bId]);
	 						}
	 						isCompBranched = true;
	 					}
	 				}
	 			}
	         	question.actvPageShowHide();
	         	question.updatePages();
	        },
			setMappedEntities : function(cId, flag, pointVal, isFrequency, isStudentRespo) {
				for ( var index in question.branches) {
					if (question.branches[index].cId == cId) {
						var branch = question.branches[index];
						if(pointVal === ""){
							this.setResetFlag(branch,false);
						}else{
							/*for score range*/
							//first reset all flags and then set flags of comp related to satisfied condition
							this.setResetFlag(branch,false);
							for ( var i in branch.pathMaps) {
								/* for score or average*/
								if (!isFrequency) {
									var minVal = parseFloat(branch.pathMaps[i].range[0].minRangeEditor.text);
									var maxVal = parseFloat(branch.pathMaps[i].range[0].maxRangeEditor.text);
									if (pointVal >= minVal && pointVal <= maxVal && isStudentRespo) {
										this.setResetFlag(branch,true,i);
									}
								} else { /* for frequency */
									//loop for most frequently selected options array
									for(var len in pointVal){
										//if (branch.pathMaps[i].compOptionId == pointVal[len] && isStudentRespo) {
										if (branch.pathMaps[i].optionLabel == pointVal[len] && isStudentRespo) {
											this.setResetFlag(branch,true,i);
										}
									}
								}
							}
						}
						
					}
				}
			},
			//set/reset flag 
			setResetFlag : function(branch, flag, index){
				
				for ( var i in branch.pathMaps) {
					
					var loopCondition  =  (!flag) ? true : (flag && i == index)? true : false; 
					
					if(loopCondition){
						for ( var j in branch.pathMaps[i].paths) {
							var partId, compId, secId;
							partId = branch.pathMaps[i].paths[j].partId;
							compId = branch.pathMaps[i].paths[j].compId;
							secId = branch.pathMaps[i].paths[j].sectionId;
							isSubCategory=(secId!=null)?(secId.split("_")[0]=="s")?true:false:false;

							/* loop from pages to compoenents to sections */
								
							
							if (partId != null) {
								for ( var index1 in question.pages) {
	
									if (partId == question.pages[index1].id) {
										if (question.pages[index1].isBranchDest) {
											question.pages[index1].showToStud = flag;
										} else {
											for ( var index2 in question.pages[index1].components) {
												var comp = question.pages[index1].components[index2];
												if (compId == comp.id) {
													if (comp.isBranchDest) {
														comp.showToStud = flag;		
														
													} else {
														
														if (comp.sections != undefined && !isSubCategory ) {
															for ( var index3 in comp.sections) {
																if (comp.sections[index3].id == secId) {
																	if (comp.sections[index3].isBranchDest) {
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
						if(flag){
							break;
						}	
							
					}
					
				}
			}
	};  