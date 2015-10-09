/* ========================================================================
 * TableCheckboxComponent: Object Declaration
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * accepts any answer, graded, mandatory. holds the componnet text editor
 * general feed back editor, overall feedback editor.and all options for
 * this component
 * ======================================================================== */
var TableCheckboxComponent = function(options){
	this.options=null;
	this.type='Checkbox';
	this.answerOptionOrientation=1;
	this.acceptAnyAnswer = true;
	//this.graded=true;
	$.extend(TableCheckboxComponent.prototype, new Component(options));
	$.extend(this, options);
	this.editor = new Editor({id:this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.textBoxIdPrefix});
	this._toggleFeedback = TableCheckboxComponent.BindAsEventListener( this, this.toggleFeedback );
	this._populateEditorProperties = TableCheckboxComponent.BindAsEventListener( this, this.populateEditorProperties );
	this._populateGFEditorProperties = TableCheckboxComponent.BindAsEventListener( this, this.populateGFEditorProperties );
	this._populateOFEditorProperties = TableCheckboxComponent.BindAsEventListener( this, this.populateOFEditorProperties );
	this._update = TableCheckboxComponent.BindAsEventListener( this, this.update );
	this._populateComp = TableCheckboxComponent.BindAsEventListener( this, this.populateComp );
	//this._addTableCheckboxComponent=TableCheckboxComponent.BindAsEventListener( this, this.addTableCheckboxComponent );
	//this._copyTableCheckboxComponent=TableCheckboxComponent.BindAsEventListener( this, this.copyTableCheckboxComponent );
	//this._removeComponent=TableCheckboxComponent.BindAsEventListener( this, this.removeComponent );
	this._acceptAnyAnswer = TableCheckboxComponent.BindAsEventListener( this, this.acptAnyAnswer );
	this._markGraded = TableCheckboxComponent.BindAsEventListener( this, this.markGraded );
	this._markMandatory = TableCheckboxComponent.BindAsEventListener( this, this.markMandatory);
	
	this._openHelpModalForTableCheckboxComponent = TableCheckboxComponent.BindAsEventListener(this,this.openHelpModalForTableCheckboxComponent);
	this._openHelpModalForCharLimit = TableCheckboxComponent.BindAsEventListener(this,this.openHelpModalForCharLimit);
	this._openHelpModalForInsertHyperlink = TableCheckboxComponent.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);

	this._updateEditor = TableCheckboxComponent.BindAsEventListener( this, this.updateEditor );
	this._updateGeneralFeedbackEditor= TableCheckboxComponent.BindAsEventListener( this, this.updateGeneralFeedBackEditor );
	this._updateOverallFeedBackEditor= TableCheckboxComponent.BindAsEventListener( this, this.updateOverallFeedBackEditor );
	this._openHelpModalForRequiredQuestionSelector = TableCheckboxComponent.BindAsEventListener(this,this.openHelpModalForRequiredQuestionSelector);
	this._filter =TableCheckboxComponent.BindAsEventListener( this, this.filter );
	this._collapseComponent = TableCheckboxComponent.BindAsEventListener( this, this.collapseComponent );
	this._changeOptionOrientation = TableCheckboxComponent.BindAsEventListener(this, this.changeOptionOrientation);
	
	this._saveCheckboxVal = TableCheckboxComponent.BindAsEventListener( this, this.saveCheckboxVal );
};

//add event helper method
TableCheckboxComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};

//add event helper method on element class
TableCheckboxComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
TableCheckboxComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableCheckboxComponent.prototype = { 
		
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
         * gets options for check box component
         * @returns options
         */
         getOptions: function( ){
                 return this.options;  
         },
         /**
          * sets options for check box component
          * @param options
          */
         setOptions: function(  options ){
             this.options =  options;
         },
         /**
          * adds option for check box component
          * @param option
          */
         addOption:function(  option ){
             this.options.push(option);
         },
         /**
          * removes option from check box component
          * @param option
          */
         removeOption:function(option){
        	 var j=0;
        	 for(j in this.options){
	    			if(this.options[j].getId()==option.getId()){
	    				this.options.splice(j, 1);
	    			}
	    		}
 		    
         },
         /**
          * updates text of content editable divs to the object's editor text
          */
         update:function(e){
        	 	this.generalFeedback.update();
        		this.overallFeedback.update();
        		this.editor.update();
        		var i=0;
        		for( i in this.options){
        			this.options[i].update();
        	    }
        		/*
        		Commented As per request from client
        		if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
           		 	question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
           	 	}*/
         },
         /**
          * layouts in design mode
          * @returns {String}
          */
         layout:function(){
             var htmlelement="";
        	 htmlelement+='<div class="pageSection cellComponent" id="cellComponent_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" >';
        	 htmlelement+='<div class="pageInnerSection">';
        	 htmlelement+='<div class="pageSectionHeader"><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="tophead invisible" style="padding-left: 260px">Cell : Checkbox</span><h6 class="pull-right font10" >Checkbox ID #'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'</h6><p></p></div>';        	 
        	 htmlelement+='<div id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="pageSectionBody">';  	 
        	 htmlelement+='<h2  class="tophead"> Cell Id: '+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'</h2>';
         	 //htmlelement+= this.editorLayout();
        	 
        	 var lastOption=this.options[this.options.length-1];
        	 
        	 var i=0;
         	 for( i in this.options){
         		 if(this.options[i].getId()==lastOption.getId()){
         			 htmlelement+=  this.options[i].layout(true);
         		 }
         		 else{
         			 htmlelement+=  this.options[i].layout(false); 
         		 }
         	 }
         	 
         	 
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='<div class="pageSectionFooter">';
         	 
         	 htmlelement+='<div class="eachCol">';
        	 htmlelement+='  <div style="width:446px;">';
        	 htmlelement+='    <button id="checkboxValSave_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="button">Save</button>';
        	 htmlelement+='    <div class="clear"></div>';
        	 htmlelement+='  </div>';
        	 htmlelement+='</div>';
         	 
         	 htmlelement+='<div class="clear"></div>';
         	// htmlelement+=' <div class="editGenFeed"><a id="genFbTxt'+this.idPrefix+this.id+'">Expand general feedback</a>';
         	// htmlelement+=' </div>';
         	 //htmlelement+='<div class="generalFeedback" id="genFb'+this.idPrefix+this.id+'" style="display: none;">';
         	 //htmlelement+='   <div class="rowPagesection">';
         	 
         	 //htmlelement+= this.generalfeedbackLayout();
         	 
         	 //htmlelement+='   </div>';
         	 //htmlelement+='   <div class="rowPagesection">';
         	 
         	 //htmlelement+= this.overallfeedbackLayout();
         	
         	 //htmlelement+='   </div>';
         	 //htmlelement+='</div>';
         	 htmlelement+='<div class="clear"></div>';
         	 /*htmlelement+='<div class="eachCol pull-right">';
         	 htmlelement+='   <div style="display:block" class="plusBtn">';
         	 htmlelement+='      <a title="Copy Question" id="quest_plus_'+this.id+'"><img src="img/plus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='  <div class="minusBtn">';
         	 htmlelement+='       <a title="Delete Question" id="quest_minus_'+this.id+'"><img src="img/minus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='   <div class="clear"></div>';
         	 htmlelement+='</div>';*/
         	 htmlelement+='</div>';
         	 htmlelement+='<div class="clear"></div>';	 
	       	 htmlelement+='</div></div>';
	       
         	 return htmlelement;
         	 
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
        	 htmlelement+='           <div contenteditable="true" data-placeholder="Enter text" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" id="'+(this.editor.id)+'"  data-maxlength="'+this.editor.maxLength+'" class="inputDummy" '+dataDivAttr+'>'+this.editor.text+'</div>';
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
            if(this.type == ""){
                return false;
            }
	    	 var htmlelement="";
	    	// htmlelement+='   Check Box Section';
	    	 //htmlelement+='   <div class="head-info">';
	    	 //htmlelement+='       <a id="checkBoxComponentHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon" ></a>Component: Checkbox';
	    	 //htmlelement+='   </div>';
	    	 //htmlelement+='   <div class="head-info">';
	    	 //htmlelement+='       <a id="checkBoxComponentElementId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="padding-left: 18px"></a>Element: Input field';
	    	 //htmlelement+='   </div>';
	    	 //htmlelement+='   <div class="clear"></div>';
	    	 htmlelement+='<div class="head-info">';
	    	 htmlelement+='<a class="info-icon" id="answerTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+this.cellId+'" ></a>Answer type:';
	    	 htmlelement+='</div>';
	    	 htmlelement+='<div class="clear"></div>';
	    	 htmlelement+='<div class="tabContent tabProContent">';
	    	 //htmlelement+='<label id="checkboxID"> ID# '+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'</label>';
	    	 htmlelement+='       <div class="grid">';

	    	 htmlelement+='           <input type="checkbox" id="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'">';
	    	 htmlelement+='           <label for="acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span>Accept any answer</label>';

	    	 htmlelement+='           <input type="checkbox" id="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'">';
	    	 htmlelement+='           <label for="gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span>Graded object</label>';


	    	 htmlelement+='       </div>';	    	 

	    	 htmlelement+='</div>';
	    	 htmlelement+='    <div class="head-info">';
	    	 htmlelement+='       <a  id="requiredQuestionId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="info-icon" ></a>Pre-requisite';
	    	 htmlelement+='   </div>';
	    	 htmlelement+='   <div class="clear"></div>';
	    	 htmlelement+='   <div class="tabContent tabProContent">';
	    	 htmlelement+='       <p>In order to move forward,\n student responses are:</p>';
	    	 htmlelement+='      <div class="radio">';
	    	 htmlelement+='              <input type="radio" value="Required" id="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" name="optionsRadios">';
	    	 htmlelement+='           <label for="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span> Required</label>';
	    	 htmlelement+='       </div>';
	    	 htmlelement+='      <div class="radio">';
	    	 htmlelement+='               <input type="radio" value="Optional" id="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" name="optionsRadios">';
	    	 htmlelement+='           <label for="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"><span></span> Optional</label>';
	    	 htmlelement+='       </div>';
	    	 htmlelement+='   </div>';

         	return htmlelement;
	     },
	     /**
	      * adds event hadlers for elements present in component property pane
	      */
	     afterPropertyLayout:function(){
	    	 TableCheckboxComponent.addEvent( this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._populateComp );
	    	 TableCheckboxComponent.addEvent( "checkBoxComponentHelpId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._openHelpModalForTableCheckboxComponent);
	    	 TableCheckboxComponent.addEvent( "requiredQuestionId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId,"click",this._openHelpModalForRequiredQuestionSelector);
	    	 TableCheckboxComponent.addEvent("acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._acceptAnyAnswer);
     		 TableCheckboxComponent.addEvent("gradadedObjectBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markGraded);
     		 TableCheckboxComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory);
     		 TableCheckboxComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory);
	     },
	     /**
	      * adds event hadlers for elements present in component editor property pane
	      */
	     afterEditorPropertyLayout:function(){
	    	 TableCheckboxComponent.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
	    	 TableCheckboxComponent.addEvent("insert_"+this.editor.id, "click", this._updateEditor );
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
	    	 var htmlelement="";
	    	 htmlelement+='    <div class="tabContent tabProContent">';
	    	 htmlelement+='        <p>Component: Checkbox</p>';
	    	 htmlelement+='       <p>Element: Input field</p>';
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
	    	 htmlelement+='            <input type="Text" placeholder=""  id="linkText_'+editor.id+'">';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='        <div class="form-group">';
	    	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
	    	 htmlelement+='            <input type="Text" placeholder=""  id="linkAddress_'+editor.id+'">';
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
           // var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'E';
           // var newMedia = new Media({id:compId});
            //$("#mediaProperties").html(newMedia.layout());
            //$("#mediaProperties").show();
           // newMedia.afterLayout();
            //util.checkMediaInEditMode();
        },
       
        /**
         * populate component properties
         */
        populateComp:function(){
            if(this.type != ""){
            	var htmlProp = this.propertyLayout();
                if(htmlProp != ""){
                    $("#CellComponentSpecificProperties").html(htmlProp);
                    this.afterPropertyLayout();
                }
            }
         	//$("#elementProperties").hide();
        	//$("#properties").show();
            $("#mediaProperties").hide();

			if(this.graded==true)
				{//$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger('click');
				$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);}
			else
				{$('#gradadedObjectBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', false);}
			if(this.acceptAnyAnswer==true)
				{$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).trigger('click');
				$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);				
				}
			else{$('#acptAnyAnsBtnId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', false);}
			if(this.mandatory==true){
				$('#optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);
				}
			else{
				$('#optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);
			}
        	
			$("#optionDropDownId").show();
        	if($("#optionDropDownId").parent().hasClass("open")){
        		$("#optionDropDownId").trigger("click");
        	}	
        	
			//if($("#optionDropDownId").is(":visible")){
			//	if($("#optionDropDownId").parent().hasClass("open")){
			//		$("#optionDropDownId").trigger("click");
			//	}
			//	$("#optionDropDownId").hide();
			//}
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
        addTableCheckboxComponent:function(){
        	page.addTableCheckboxComponent();
        },
        /**
         * creates copy of the current checkbox component
         * @param event
         */
        copyTableCheckboxComponent : function(event){
            var	id = event.data.id;
            //page.copyComponent(id);
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
         * @returns {TableCheckboxComponent}
         */
        deserialize:function(jsonObj){
        	var options =[];
        	var i=0;
        	 for( i in jsonObj.options){
 	  	    	var optionObj =new TableOption(jsonObj.options[i]);
 	  	    		var editor = new TableOptionEditor(jsonObj.options[i].editor);
 	  	    		if(optionObj.type=='stud'){
 	  	    			var studentEditor = new Editor(jsonObj.options[i].studentEditor);
 	  	    			optionObj.setStudentEditor(studentEditor);
 	  	    		}
 	  	    		var feedback = new Editor(jsonObj.options[i].feedback);
 	  	    		optionObj.setEditor(editor);
 	  	    		optionObj.setFeedback(feedback);
 	  	    		options.push(optionObj);
 	  	    	}
 	  	  
        	var compObj= new TableCheckboxComponent(jsonObj);
        	compObj.setOptions(options);
        	var compEditor = new Editor(jsonObj.editor);
        	var generalFeedback = new Editor(jsonObj.generalFeedback);
        	var overallFeedback = new Editor(jsonObj.overallFeedback);
        	compObj.setEditor(compEditor);
        	compObj.setGeneralFeedback(generalFeedback);
        	compObj.setOverallFeedback(overallFeedback);
        	return compObj;
        },
        /**
         * marks component to accept any answer
         * @param event
         */
	       acptAnyAnswer:function(){	   
	    	var selectordiv=$('#cellComponent_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).find('.tickCheck');
    		var  length = selectordiv.length;
	    	 if($("#acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop("checked")){	    		    		    		
	    		  for( var i=0;i<=length;i++){
	   			   $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','hidden');
	   			   }
	    	    this.acceptAnyAnswer =true;
	    		}else{
	    			 for( var i=0;i<=length;i++){
	  	   			   $("#"+$(selectordiv[i]).attr('id')).find('.eachCol').first().css('visibility','visible');
	  	   			   }
	    			this.acceptAnyAnswer =false;
	    		}
	    	 var j=0;
	    	 for(j in this.options){
	    			this.options[j].setRight(true);
	    			$("#wrong_"+this.options[j].componentId+this.options[j].id).removeClass("active");
	    			$("#right_"+this.options[j].componentId+this.options[j].id).addClass("active");
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
	     openHelpModalForTableCheckboxComponent : function(event){
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
        	    //$("#CellComponentSpecificProperties").html(this.propertyLayout());
        		this.populateComp();    
        		TableCheckboxComponent.addEvent( "genFbTxt"+this.idPrefix+this.id, "click", this._toggleFeedback );
        		TableCheckboxComponent.addEvent( this.editor.id, "click", this._populateEditorProperties );
        		this.editor.afterEditorlayout();
        		TableCheckboxComponent.addEvent( this.generalFeedback.id, "click", this._populateGFEditorProperties );
        		TableCheckboxComponent.addEvent( this.overallFeedback.id, "click", this._populateOFEditorProperties );
        		TableCheckboxComponent.addEvent( this.editor.id, "blur", this._update );
        		TableCheckboxComponent.addEvent( this.generalFeedback.id, "blur", this._update );
        		TableCheckboxComponent.addEvent( this.overallFeedback.id, "blur", this._update );
        		
        		//TableCheckboxComponent.addEvent( "quest_plus_"+this.id, "click", this._addTableCheckboxComponent);
        		//TableCheckboxComponent.addEvent( "quest_plus_"+this.id, "click", this._copyTableCheckboxComponent,{id : this.id});
        		//TableCheckboxComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        		
        		//TableCheckboxComponent.addEvent("acptAnyAnsBtnId", "click", this._acceptAnyAnswer);
        		//TableCheckboxComponent.addEvent("gradadedObjectBtnId", "click", this._markGraded);
        		TableCheckboxComponent.addEvent("optionsRadios1", "click", this._markMandatory);
        		TableCheckboxComponent.addEvent("optionsRadios2", "click", this._markMandatory);
        		TableCheckboxComponent.addEvent( this.editor.id, "paste", this._filter);
        		TableCheckboxComponent.addEvent( this.generalFeedback.id, "paste", this._filter );
        		TableCheckboxComponent.addEvent( this.overallFeedback.id, "paste", this._filter );
        		TableCheckboxComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseComponent);
        		var i=0;
        		 for( i in this.options){
             		 this.options[i].afterLayout();
             	 } 
        		 if(this.state=="collapse"){
            		 this.collapseComponent();
            	 }
        		 if(this.options.length==1){
        			 var $options = $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).find(".pageInnerSection").find(".pageSectionBody").find(".tickCheck").last();
        			 $options.find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
        		 }
        		 
        		 TableCheckboxComponent.addEvent("checkboxValSave_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._saveCheckboxVal);
         },
         /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLayout:function(){
        	var htmlelement='';
            var markCompulsary=(this.graded)?"<span class='compulsary starHide'>*</span>":"";
            var overallFeedback = util.getImageLayout(this.overallFeedback.text);
            overallFeedback = util.getVideoLayout(overallFeedback);

            var generalFeedback = util.getImageLayout(this.generalFeedback.text);
            generalFeedback = util.getVideoLayout(generalFeedback);

       		var hidden = (overallFeedback =='' || overallFeedback =='&nbsp;') && (generalFeedback=='' || generalFeedback=='&nbsp;') ?'invisible' : '';
       		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="mainQuestionSection stdmainQuestionSection rowPagesectionStudentTbl" >';
       		
            var editorText = util.getImageLayout(this.editor.text);
                editorText = util.getVideoLayout(editorText);
       		htmlelement +=' <div class=""><div class=""> '+editorText+'</div>';
       		htmlelement +='<div class="prevQuestOpt stdprevQuestOpt">';
       		var i=0;
       		for( i in this.options){
       			htmlelement +=this.options[i].instructorLayout(this.answerOptionOrientation,this.graded);
           	}
       		htmlelement +='</div>';
       		htmlelement +='</div>';
       		//TODO:[debasmita] Media ?
       		return htmlelement;
         },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterInstructorLayout:function(){    
        	 var i=0;
        		for( i in this.options){
              		this.options[i].afterStudentLayout();
              	 } 
         },
         /**
          * layouts in student test mode
          * @returns {String}
          */
         studentLayout:function(){
        	 var htmlelement="";
        	 
        	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="mainQuestionSection stdmainQuestionSection">';

             var studentText = util.getImageLayout(this.editor.text);
                 studentText = util.getVideoLayout(studentText);
        	 htmlelement+='<div id="question_'+this.idPrefix+this.id+'" class="prevQuest stdprevQuest "><span  id ="validation_'+this.idPrefix+this.id+'" style="display:none" class="compulsry">Please fill all Fields</span><div class="stdQueLabel stdQueLabelTableCheckbox">'+studentText+'</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="prevQuestOpt stdprevQuestOpt">';
        	 var i=0;
        	 for( i in this.options){
         			 htmlelement+=  this.options[i].studentLayout(this.answerOptionOrientation);      		 
             }
        	 htmlelement+='</div></div></div>';
        	 return htmlelement;
         },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterStudentLayout:function(){    
        	 var i=0;
        		for( i in this.options){
              		this.options[i].afterStudentLayout();
              	 } 
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
         postSubmissionReviewLayout:function(showNotApplicable){
				var htmlelement = '';
				var text = this.editor.text;
				text = text.replace(/\Â/g, " ");
				var css = "wrong";
				if(!showNotApplicable)
				{
                    if(this.acceptAnyAnswer){
    					if(this.options[0].right &&  this.options[0].studentResponse){
    						 css = "correct";
    					}
    					else if(!this.options[0].studentResponse){
    						css = "incompleteCell";
    					}
    					else{
    						css = "inCorrectCell";
    					}
    				}
                    else{
                        if( this.options[0].isRight() && this.options[0].isStudentResponse() ){
                            css = "correct"
                         } else if(!this.options[0].isRight() && !this.options[0].isStudentResponse()){
                            css = "correct"
                         } else{
                            css = "inCorrectCell"
                         }
                    }
                }
				htmlelement += '<div id="' + this.pageIdPrefix + this.pageId
				+ this.idPrefix + this.id + '" class="mainQuestionSection rowPagesectionStudentTbl">';

                var postSubText = util.getImageLayout(text);
                    postSubText = util.getVideoLayout(postSubText);
				htmlelement += ' <div class="prevQuest stdprevQuest ">';
				$("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).addClass(css);
				//htmlelement += '<div class="stdQueLabel">' + postSubText + '</div>';
				htmlelement += '<div class="clear"></div>';
				htmlelement += '<div class="prevQuestOpt stdprevQuestOpt">';
				var i = 0;
				
				for (var i in this.options) {
					htmlelement += this.options[i].postSubmissionReviewLayout(this.answerOptionOrientation,this.graded);
				}
				htmlelement += '</div>';
				htmlelement += '</div>';
				/*if(POLICY_FEEDBACK == 'feedback')
				{
					var feedback = '<div>'+this.overallFeedback.text+this.generalFeedback.text+'</div>';
					var hidden = $(feedback).text().trim().length==0 ?'invisible' : '';
					htmlelement += '<div class="overallFeedOpen '+hidden+'">';

					var overallFeedback = this.overallFeedback.text;
                    var overallFeedback = util.getImageLayout(this.overallFeedback.text);
                        overallFeedback = util.getVideoLayout(overallFeedback);
                        overallFeedback = overallFeedback.replace(/\Â/g, " ");

                    var generalFeedback = this.generalFeedback.text;
                    var generalFeedback = util.getImageLayout(this.generalFeedback.text);
                        generalFeedback = util.getVideoLayout(generalFeedback);
					    generalFeedback = generalFeedback.replace(/\Â/g, " ");

					htmlelement += ' <strong>Overall feedback:</strong>'
							+ overallFeedback + '\n' + generalFeedback + '</div>';
					htmlelement += '</div>';
				}*/
				// TODO:[debasmita] Media ?
				return htmlelement;
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
         calculateScore:function(){
        	 var totalCorrectAnswers=0;
    		 /*for( i in this.options){    		
    			 totalCorrectAnswers +=this.options[i].isRight()?1:0;
           	 };*/
           	 var weightage = 1;
           	 if(this.acceptAnyAnswer){
           		if(this.options[0].isRight() && this.options[0].isStudentResponse()){
           			totalCorrectAnswers = 1;
          	    }
             } else if(this.options[0].isRight() && this.options[0].isStudentResponse()){
                totalCorrectAnswers = 1;
             } else if(!this.options[0].isRight() && !this.options[0].isStudentResponse()){
                totalCorrectAnswers =1;
             }
          	 /*var totalWrngAnsrGvnByStdnt=0;
          	
          	if(!this.options[0].isRight() && this.options[0].isStudentResponse()){
      			totalWrngAnsrGvnByStdnt++;
            } else if(this.options[0].isRight() && !this.options[0].isStudentResponse()){
                totalWrngAnsrGvnByStdnt++;
            }*/
     	 
        	 if(this.graded){
        		 if(totalCorrectAnswers>0){
        			 return 1;
        		 }else{
        			 return 0;
        		 }
        	 }/* else if(!this.acceptAnyAnswer && !this.graded){
        	 	 //No scoring
        	 } else if(this.acceptAnyAnswer && !this.graded){
        		 // No Scoring
        	 } else if(!this.acceptAnyAnswer && this.graded){
        		
              	 var totalScore=(totalCrctAnsrGvnByStdnt*weightage) -(totalWrngAnsrGvnByStdnt*weightage);
              	 if(isNaN(totalScore) || totalScore<0 ){
          			totalScore=0;
          		 }
        		return totalScore;
        	 }*/
         },
         /**
          * validate if component is filled
          */

         validateComponent:function(object){
		        var i = 0;
				var isFilled = true;
				var isQuestionTextFilled = true;
                var questionText = "";
				/*$("#htmlToTextConvertor").html(this.editor.text);
				var questionText = $("#htmlToTextConvertor").text();
		
				if (questionText.length <= 0) {
					isQuestionTextFilled = false;
				}*/
				for (i in this.options) {
					$("#htmlToTextConvertor").html(this.options[i].editor.text);
                    questionText += $("#htmlToTextConvertor").text();
        		}
                if (questionText.length <= 0) {
                    isFilled = false;
                }
				if (!isFilled) {
					object.flag = true;
					 object.completeFlag = true;
					object.errorMsg += "<br> On Part : " + this.pageIdPrefix
							+ this.pageId + " Component : " + this.idPrefix + this.id
                            + " Cell : "+this.cellId;
				}
				return object;
            },
            /**
			 * check if question is answered
			 */

            validateStudentQuestionLayout:function(){
	             var i=0;
	             var validflag=false;
	             if(this.isMandatory()){
                    if(this.acceptAnyAnswer){
		   			    if(this.options[0].studentResponse){
		   					 if(this.options[0].getType()=="stud"){
		   						validflag= this.options[0].isStudentOptionFilled();
		   					 }else{
		   						validflag= true;
		   					 }
                        }
                    } else{
                            validflag= true;       
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
	        	}else{
	        		$comp.show('slow');
	        		$comp.prev().show();
	        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
	        		$snap.find("img").attr("src","img/comp-minus.png");
	        		this.state="expand";
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
        	TableCheckboxComponent.addEventOnClass("radioclick","click",this._changeOptionOrientation);
        },
        changeOptionOrientation : function(e){
        	var selected = $("input[type='radio'][name='optionOrientation"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+"']:checked");
        	var selectedVal = selected.val();
        	this.answerOptionOrientation = parseInt(selectedVal);
        	 e.stopPropagation();
        },
        saveCheckboxVal : function(){
        	var checkboxText = "";
        	var checkboxHtml = "";
        	var itsCellId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId;
        	var x=0;
        	for(x in this.options){
        	    var optn = this.options[x];
                if(optn.editor.text == ""){
                     var optEditorId = optn.editor.id;
                    new Modal(
                          {
                              id : 1,headingText : "Validation Error",
                              containtText : "Please fill all fields",
                              closeActionEvent:function(){
                                   $("#"+optEditorId).focus();
                              }
                          }).getWarningModal();
                    return false;
                }
    		    else if(optn.editor.text != ""){
    		      checkboxText += optn.editor.text;
    		    	
    		      //$("#"+optn.editor.id).trigger("blur");
    			  
                }
        	}
        	//if(checkboxText != ""){
        	    checkboxHtml += '<div id="CellCheckboxField_'+itsCellId+'">';
        		checkboxHtml += '<input type="checkbox"/>';
        		checkboxHtml += '<span class="checkboxText">'+checkboxText+'</span>';
        		checkboxHtml += '</div>';
        	//}
        		$("#CellCheckboxField_"+itsCellId).find("span.checkboxText").html(checkboxText);
            //display check box updated text
        	
        	//set checkbox text value
        	var componentTable = this.getItemById(question.getActivePage().getComponents(), this.id);
        	componentTable.changeValById(componentTable.cellHTMLCollection, itsCellId, "itsHtml", checkboxHtml);        	
        },
        getItemById : function(source, id){
        	for (var i = 0; i < source.length; i++) {
        	  if (source[i].id === id) {
        		 return source[i];
        	  }
            }
        	throw "Couldn't find object with id: " + id;
         }
	};  