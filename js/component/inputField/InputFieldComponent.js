/* ========================================================================
 * InputFieldComponent: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * accepts any answer, graded, mandatory. holds the componnet text editor
 * general feed back editor, overall feedback editor.and all sections 
 * for this component
 * ======================================================================== */
var InputFieldComponent = function(options){ 
	this.subType='label';
	this.sections=[];
	$.extend(InputFieldComponent.prototype, new Component(options));
	//this.mandatory=false;
	//this.graded=true;
	$.extend(this, options);
	this.type='inputField';

	this._toggleFeedback = InputFieldComponent.BindAsEventListener( this, this.toggleFeedback );
	this._populateGFEditorProperties = InputFieldComponent.BindAsEventListener( this, this.populateGFEditorProperties );
	this._populateOFEditorProperties = InputFieldComponent.BindAsEventListener( this, this.populateOFEditorProperties );
	this._update = InputFieldComponent.BindAsEventListener( this, this.update );
	this._populateComp = InputFieldComponent.BindAsEventListener( this, this.populateComp );
	this._addInputFieldComponent=InputFieldComponent.BindAsEventListener( this, this.addInputFieldComponent );
	this._copyInputFieldComponent=InputFieldComponent.BindAsEventListener( this, this.copyInputFieldComponent );
	this._removeComponent=InputFieldComponent.BindAsEventListener( this, this.removeComponent );
	this._acceptAnyAnswer = InputFieldComponent.BindAsEventListener( this, this.acptAnyAnswer );
	this._markGraded = InputFieldComponent.BindAsEventListener( this, this.markGraded );
	this._markMandatory = InputFieldComponent.BindAsEventListener( this, this.markMandatory );
	this._openHelpModalForInputFieldComponent = InputFieldComponent.BindAsEventListener(this,this.openHelpModalForInputFieldComponent);
	this._updateGeneralFeedbackEditor= InputFieldComponent.BindAsEventListener( this, this.updateGeneralFeedBackEditor );
	this._updateOverallFeedBackEditor= InputFieldComponent.BindAsEventListener( this, this.updateOverallFeedBackEditor );
	this._openHelpModalForRequiredQuestionSelector = InputFieldComponent.BindAsEventListener(this,this.openHelpModalForRequiredQuestionSelector);
	this._changeOrientation = InputFieldComponent.BindAsEventListener(this,this.changeOrientation);
	this._addSection = InputFieldComponent.BindAsEventListener( this, this.addSection);
	this._changeSubType = InputFieldComponent.BindAsEventListener( this, this.changeSubType);
	this._filter =InputFieldComponent.BindAsEventListener( this, this.filter );
	this._collapseComponent = InputFieldComponent.BindAsEventListener( this, this.collapseComponent );
};

//add event helper method on element id
InputFieldComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
InputFieldComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
InputFieldComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
InputFieldComponent.prototype = { 
		
        /**
		 * gets subType of component
		 * @returns {String} subType
		 */
		getSubType:function(){
			return this.subType;
        },
        /**
         * sets subType of component
         * @param subType
         */
        setSubType:function(subType){
       	 this.subType=subType;
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
        /**
         * gets sections for input field component
         * @returns sections
         */
         getSections: function(){
                 return this.sections;  
         },
         /**
          * sets sections for input field component
          * @returns sections
          */
          setSections: function(sections ){
                 this.sections=sections;  
          },
    
         /**
          * updates text of content editable divs to the object's editor text
          */
         update:function(event){
        	 var selectedText = window.getSelection().toString() ;
        	 
        	 if(this.subType!="label" ){
        		if(selectedText.length <=0 ){
	        		this.generalFeedback.update();
	         		this.overallFeedback.update();
	         		
	         		if(event!=undefined){
	         			question.updateFormulaDestinations(event.data.editor.id,util.getFormulas(event.data.editor.textWithoutFormatting));
	         			util.updateFormula(event.data.editor);
	         			util.getEditor(event.data.editor.id);
	         		}
        		 }	
        	 }
        	 $.each(this.sections ,function(index,section){
        		 section.update();	
 			 });
         },
        
         /**
          * layouts in design mode
          * @returns {String}
          */
         layout:function(){
        	 var elementType = this.subType=="label" ? "Element: Label" : this.subType=="inputField" ? "Element: Input field":"Element: Fill in the blank";
        	 
             var htmlelement="";
        	 htmlelement+='<div class="pageSection" id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" ><span class="compMove_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"></span>';
        	 htmlelement+='<div class="pageInnerSection">';
        	 htmlelement+='<div class="pageSectionHeader"><p></p> <span id="componetCollapseSpan_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> <img src="img/comp-minus.png" title="Collapse"> </span><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead invisible" style="padding-left: 260px"> Component: Input and Labels </span><h6 class="pull-right font10" >ID #'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'</h6><p></p></div>';        	
        	 htmlelement+='<h2 id="componentHeaderid'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead"></a>Component: Input and Labels'+'</h2>';
        	 htmlelement+='<h2 class="tophead">'+elementType+'</h2>';
        	 htmlelement+='<div id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"  class="pageSectionBody">';
        	 htmlelement+='<div  class="rowPagesection ">';
        	 /* check for show/hide first section id */
        	 var isSectionMore = (this.sections.length > 1)?true:false;
        	 var i=0;
         	 for( i in this.sections){
         		 if(i==0){
         			 htmlelement+=  this.sections[i].layout(true,this.subType,i, isSectionMore);
         		 }
         		 else{
         			 htmlelement+=  this.sections[i].layout(false,this.subType,i, isSectionMore); 
         		 }
         	 }
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='</div>';
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='<div class="pageSectionFooter">';
         	 
         	 if(this.subType!='label'){
         		 htmlelement+= this.feedbackLayout();
         	 }
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='<div class="eachCol pull-right">';
         	 htmlelement+='   <div style="display:block" class="plusBtn">';
         	 htmlelement+='      <a title="Copy Question" id="quest_plus_'+this.id+'"><img src="img/plus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='  <div class="minusBtn">';
         	 htmlelement+='       <a title="Delete Question" id="quest_minus_'+this.id+'"><img src="img/minus.png"></a>';
         	 htmlelement+='   </div>';
         	 htmlelement+='   <div class="clear"></div>';
         	 htmlelement+='</div>';
         	 htmlelement+='</div>';
         	 htmlelement+='</div>';
         	 htmlelement+='<div class="clear"></div>';	 
	       	 htmlelement+='</div></div>';	       
         	 return htmlelement;
         	 
         },
        
         /**
          * feedback layout
          * @returns {String}
          */
         feedbackLayout:function(){
        	 var css='';
        	 if(this.ranges!=null){
        		 css='style="display:none;"';
        	 }
        	 var htmlelement='<div id="componentFeedback'+this.idPrefix+this.id+'" '+css+'>';
        	 htmlelement+=' <div class="editGenFeed">Feedback: <a id="genFbTxt'+this.idPrefix+this.id+'">Expand general feedback</a>';
         	 htmlelement+=' </div>';
         	 htmlelement+='<div class="generalFeedback" id="genFb'+this.idPrefix+this.id+'" style="display: none;">';
         	 htmlelement+='   <div class="rowPagesection">';         	 
         	 htmlelement+= this.generalfeedbackLayout();         	 
         	 htmlelement+='   </div>';
         	 htmlelement+='   <div class="rowPagesection">';         	 
         	 htmlelement+= this.overallfeedbackLayout();
         	 htmlelement+='   </div>';
         	 htmlelement+='</div></div>';
         	return htmlelement;
         },
         /**
          * layouts component property pane in design mode
          * @returns {String}
          */
         propertyLayout: function () {
             var elementType = this.subType == "label" ? "Element: Label" : this.subType == "inputField" ? "Element: Input field" : "Element: Fill in the blank";
             var htmlelement = '';
             htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
             htmlelement += '	<div class="componentTytle">';
             htmlelement += '		<a class="info-icon" id="InputFieldComponentHelpId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '" ></a>Component: Input and Labels';
             htmlelement += '	</div>';
             htmlelement += '<div class="componentTytle">';
             htmlelement += '	<a id="InputFieldComponentElementId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '" style="padding-left: 18px"></a>' + elementType + '';
             htmlelement += '</div>';
             if (this.subType == 'label') {
            	 htmlelement += ' <div class="data_component" style="height:200px">';
             }else{
            	 htmlelement += ' <div class="data_component">';
             }
             htmlelement += '		<p style="margin-top : 5px;" class="txtediting">ID# ' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '</p>';
             var isBranchedLbl = "";
        	 /*check if component is used for branching*/
        	 if(this.isBranched){
        		 isBranchedLbl="This component is branched";
        	 }
        	 htmlelement+='         <div class="componentTytle" id="isBranchedLabel_'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">'+isBranchedLbl+'</div>';
             htmlelement += '       <div class="tabContent">';
             htmlelement += '           <div class="btn-group customDropdown">';
             htmlelement += '                <button data-toggle="dropdown" id="mode" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
             htmlelement += '                    Label<span class="caret caretDrop"></span>';
             htmlelement += '                </button>';
             htmlelement += '                <ul class="dropdown-menu">';
             htmlelement += '                    <li id="label' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"><a>Label</a>';
             htmlelement += '                    </li>';
             htmlelement += '                    <li class="divider"></li>';
             htmlelement += '                    <li id="inputField' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"><a>Input field</a>';
             htmlelement += '                    </li>';
             htmlelement += '                    <li class="divider"></li>';
             htmlelement += '                    <li id="fillInTheBlank' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"><a>Fill in the blank</a>';
             htmlelement += '                    </li>';
             htmlelement += '                </ul>';
             htmlelement += '           </div>';
             htmlelement += '      </div>';
             htmlelement += ' </div>';
             if (this.subType != 'label') {
                 htmlelement += '<div class="grid grid-2">';
                 htmlelement += '	<input type="checkbox" id="gradadedObjectBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '">';
                 htmlelement += '	<label for="gradadedObjectBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"><span></span>Graded object</label>';
                 htmlelement += '</div>';
                 htmlelement += '<div class="clear"></div>';
                 htmlelement += '<div class="tabContent tabProContent tabProContent-2">';                 
                 htmlelement += '		<div class="grid grid-2">';
                 htmlelement += '			<span>';
                 htmlelement += '			<input type="checkbox" id="acptAnyAnsBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '">';
                 htmlelement += '			<label for="acptAnyAnsBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"><span></span>Accept any answer</label>';
                 htmlelement += '			</span>';
                 htmlelement += ' 		</div>';
                 htmlelement += '</div>';
                 htmlelement += '<div class="clear"></div>';
                 htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
                 htmlelement += '	<div class="componentTytle">';
                 htmlelement += '		<a class="info-icon" id="requiredQuestionId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"></a>Prerequisite:';
                 htmlelement += '	</div>';
                 htmlelement += ' <div class="data_component">';
                 htmlelement += '   <p style="margin-top : 5px" class="txtediting boldclass">In order to move forward,\n student responses are:</p>';
                 htmlelement += '	<div> <input type="radio" value="Required" id="optionsRadios1' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '" name="optionsRadios">';
                 htmlelement += '   <label for="optionsRadios1' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"><span></span>Required</label> <input type="radio" id="Radio2" name="displayBranchingMode">';
                 htmlelement += '   <input type="radio" value="Optional" id="optionsRadios2' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '" name="optionsRadios">';
                 htmlelement += '     <label for="optionsRadios2' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '"><span></span>Optional</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
                 htmlelement += '  </div>';
                 htmlelement += ' </div>';
                 htmlelement += '</div>';
             } 
             htmlelement += '<div class="clear"></div>';
             htmlelement += '<div class="gap10"></div>';
             htmlelement += '<div class="clear"></div>';
             htmlelement += '</div>';
             return htmlelement;
         },
	     /**
	      * adds event hadlers for elements present in component property pane
	      */
	     afterPropertyLayout: function () {
	         InputFieldComponent.addEvent(this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._populateComp);
	         InputFieldComponent.addEvent("InputFieldComponentHelpId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._openHelpModalForInputFieldComponent);
	         InputFieldComponent.addEvent("requiredQuestionId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._openHelpModalForRequiredQuestionSelector);
	         InputFieldComponent.addEvent("answerTypeHelpId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._openHelpModalForAnswerType);
	         InputFieldComponent.addEvent("acptAnyAnsBtnId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._acceptAnyAnswer);
	         InputFieldComponent.addEvent("gradadedObjectBtnId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._markGraded);
	         InputFieldComponent.addEvent("optionsRadios1" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._markMandatory);
	         InputFieldComponent.addEvent("optionsRadios2" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._markMandatory);
	         InputFieldComponent.addEvent("label" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._changeSubType, {
	             "subType": "label"
	         });
	         InputFieldComponent.addEvent("inputField" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._changeSubType, {
	             "subType": "inputField"
	         });
	         InputFieldComponent.addEvent("fillInTheBlank" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._changeSubType, {
	             "subType": "fillInTheBlank"
	         });
	     },
             	    
        /**
         * populate component properties
         */
	     populateComp: function () {
	         $("#properties").html(this.propertyLayout());
	         this.afterPropertyLayout();
	         //TODO: do conditional check obj population for subType
	         $("#elementProperties").hide();
	         $("#properties").show();

	         if (this.subType === 'label') {
	             $("#mode").html("Label<span class='caret caretDrop'></span>");
	         } else if (this.subType === 'inputField') {
	             $("#mode").html("Input field <span class='caret caretDrop'></span>");
	         } else if (this.subType === 'fillInTheBlank') {
	             $("#mode").html("Fill in the blank <span class='caret caretDrop'></span>");
	         }

	         if (this.graded == true) {
	             $('#gradadedObjectBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', true);
	         } else {
	             $('#gradadedObjectBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', false);
	         }

	         if (this.acceptAnyAnswer == true) {
	             $('#acptAnyAnsBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).trigger('click');
	             $('#acptAnyAnsBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', true);
	         } else {
	             $('#acptAnyAnsBtnId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', false);
	         }
	         if (this.mandatory == true) {
	             $('#optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
	         } else {
	             $('#optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked', true);
	         }

	         if($("#optionDropDownId").is(":visible")){
					if($("#optionDropDownId").parent().hasClass("open")){
						$("#optionDropDownId").trigger("click");
					}
					$("#optionDropDownId").hide();
				}
              $("#mediaProperties").hide();
	     },
       
        
        /**
         * add input field component to page
         */
        addInputFieldComponent:function(){
        	page.addInputFieldComponent();
        },
        /**
         * creates copy of the current checkbox component
         * @param event
         */
        copyInputFieldComponent : function(event){
            var	id = event.data.id;
        	page.copyComponent(id);
        },
        /**
         * remove the checkbox component
         * @param event
         */
        removeComponent:function(event){
        	page.deleteComponent(event.data.id);
        },
        /**
         * constructs the InputFieldComponnet from json object
         * @param jsonObj
         * @returns {InputFieldComponent}
         */
        deserialize:function(jsonObj){
        	var sections =new Array();
        	var i=0;
        	 for( i in jsonObj.sections){
 	  	    		var sectionObj =new InputFieldSection(jsonObj.sections[i]);
 	  	    		var authorEntries=new Array();
 	  	    		var j=0;
 	  	    		for(j in jsonObj.sections[i].authorEntries){
 	  	    			var authorEntry =new AuthorEntry(jsonObj.sections[i].authorEntries[j]);
 	  	    			var editor=new Editor(jsonObj.sections[i].authorEntries[j].editor);
 	  	    			authorEntry.setEditor(editor);
 	  	    			authorEntries.push(authorEntry);
 	  	    		}
 	  	    		sectionObj.setAuthorEntries(authorEntries);
 	  	    		if(jsonObj.subType!='label'){
 	  	    			var studentEntries=new Array();
 	 	  	    		var k=0;
 	 	  	    		for(k in jsonObj.sections[i].studentEntries){
 	 	  	    			var studentEntry =new StudentEntry(jsonObj.sections[i].studentEntries[k]);
 	 	  	    			var editor=new Editor(jsonObj.sections[i].studentEntries[k].editor);
 	 	  	    			var contentFormat = null;
 	 	  	    			var conentFormatter =jsonObj.sections[i].studentEntries[k].contentFormat;
							if (conentFormatter.type == "alphanumeric") {
								contentFormat= new ContentFormatEnum(conentFormatter).ALPHANUMERIC;
							} else if (conentFormatter.type == "number") {
								contentFormat= new ContentFormatEnum(conentFormatter).NUMBER;
							} else if (conentFormatter.type == "currency") {
								contentFormat= new ContentFormatEnum(conentFormatter).CURRENCY;
							} else if (conentFormatter.type == "percentage") {
								contentFormat= new ContentFormatEnum(conentFormatter).PERCENTAGE;
		
							} else if (conentFormatter.type == "date") {
								contentFormat= new ContentFormatEnum(conentFormatter).DATE;
								contentFormat.updateFormatter();
							} else if (conentFormatter.type == "time") {
								contentFormat= new ContentFormatEnum(conentFormatter).TIME;
							}
							studentEntry.setContentFormat(contentFormat);
 	 	  	    			studentEntry.setEditor(editor);
 	 	  	    			var answer=new Editor(jsonObj.sections[i].studentEntries[k].answer);
 	 	  	    			studentEntry.setAnswer(answer);
	 	  	    			var feedback=new Editor(jsonObj.sections[i].studentEntries[k].feedback);
	 	  	    			studentEntry.setFeedback(feedback);
	 	  	    			studentEntries.push(studentEntry);
 	 	  	    		}
 	 	  	    		sectionObj.setStudentEntries(studentEntries);
 	  	    		}
 	  	    		sectionObj.isBranched = jsonObj.sections[i].isBranched;
 	  	    		sectionObj.isBranchDest = jsonObj.sections[i].isBranchDest;
 	  	    		sectionObj.destBranchId = jsonObj.sections[i].destBranchId;
 	  	    		sectionObj.showToStud = jsonObj.sections[i].showToStud;
 	  	    		sections.push(sectionObj);
 	  	    	}
        	var compObj= new InputFieldComponent(jsonObj);
         	compObj.setSections(sections);
         	if(jsonObj.subType!='label'){
         		var generalFeedback = new Editor(jsonObj.generalFeedback);
            	var overallFeedback = new Editor(jsonObj.overallFeedback);
            	compObj.setGeneralFeedback(generalFeedback);
            	compObj.setOverallFeedback(overallFeedback);
         	}
        	
        	return compObj;
        },
       
	     /**
	      * opens help modal popup for input field component
	      * @param event
	      */
	     openHelpModalForInputFieldComponent : function(event){
	    	 new Modal({id : 1,headingText : message.getInputFieldCompHeading(),containtText : message.getInputFieldCompMsg()}).openHelpModal();
	     },
	    
	     /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
         afterLayout:function(){
        	    $("#properties").html(this.propertyLayout());
        		this.populateComp();
        		InputFieldComponent.addEvent( "genFbTxt"+this.idPrefix+this.id, "click", this._toggleFeedback );
        		 if(this.subType!='label'){
        			InputFieldComponent.addEvent( this.generalFeedback.id, "click", this._populateGFEditorProperties );
             		InputFieldComponent.addEvent( this.overallFeedback.id, "click", this._populateOFEditorProperties );
             		InputFieldComponent.addEvent( this.generalFeedback.id, "blur", this._update,{editor: this.generalFeedback} );
             		InputFieldComponent.addEvent( this.generalFeedback.id, "paste", this._filter);
             		InputFieldComponent.addEvent( this.overallFeedback.id, "paste", this._filter);
             		InputFieldComponent.addEvent( this.overallFeedback.id, "blur", this._update,{editor:this.overallFeedback} );
             	 }
             	
        		InputFieldComponent.addEvent( "quest_plus_"+this.id, "click", this._copyInputFieldComponent,{id : this.id});
        		InputFieldComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        		InputFieldComponent.addEvent("acptAnyAnsBtnId", "click", this._acceptAnyAnswer);
        		InputFieldComponent.addEvent("gradadedObjectBtnId", "click", this._markGraded);
        		InputFieldComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
        		InputFieldComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._markMandatory);
        		InputFieldComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseComponent);
        		var subType=this.subType;
        		var acceptAnyAnswer=this.acceptAnyAnswer;
            	 $.each(this.sections ,function(index,section){
            		 section.afterLayout(subType);	
            		 if(subType!='label'){
            			 section.updateAnswerLayout(acceptAnyAnswer);
            		 }
            		
     			 });
            	 if(this.state=="collapse"){
            		 this.collapseComponent();
            	 }

                 $('#formToolCanvasId').sortable({
                    items: '.pageSection',
                    handle: '.dragComp'
                 });
        		 
         },
         /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLayout:function(){
        	 var htmlelement="";
        	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection" style="padding-left:0px;" >';
        	 if(this.acceptAnyAnswer){
      			htmlelement+='<div  class="acceptAnyAnsBanner acceptAnyAnsBannerInstructor">This question accepts all answers.</div>';
      		 }
     		
     		 var i=0;
     		 for( i in this.sections){
     			htmlelement+='<div class="inputFieldRowPagesection">';
     			htmlelement +=this.sections[i].instructorLayout(this.subType, this.acceptAnyAnswer,this.graded);
     			htmlelement+='</div>';
         	}
     		
     		if(this.subType!='label'){     			
     			var overallFeedback = util.getFormulaLinksForStudent(this.overallFeedback);
     		    overallFeedback = overallFeedback.replace(/\Â/g," ").replace("&#160;","");      
     		    var generalFeedback =  util.getFormulaLinksForStudent(this.generalFeedback);
     		    generalFeedback = generalFeedback.replace(/\Â/g," ").replace("&#160;","");

                overallFeedback = util.getImageLayout(overallFeedback);
                overallFeedback = util.getVideoLayout(overallFeedback);

                generalFeedback = util.getVideoLayout(generalFeedback);
                generalFeedback = util.getImageLayout(generalFeedback);

     			var hidden = (overallFeedback =='' || overallFeedback == '&nbsp;') && (generalFeedback =='' || generalFeedback == '&nbsp;') ?'invisible' : '';
     			htmlelement +='<div class="overallFeedOpen '+hidden+'  ">';
        		htmlelement +=' <strong>Overall feedback: </strong>'+overallFeedback+'<br>'+generalFeedback+'</div>';
     		}
     		htmlelement+='</div>';
     		return htmlelement;
         },
         /**
          * layouts in student test mode
          * @returns {String}
          */
         studentLayout:function(){
        	 var htmlelement="";
        	 /* check for branching to show/hide */
	         var attachClass = '';
	         if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
	        	attachClass = 'hideElement';
	         }else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
	        	attachClass = 'hideElement';
	        	
	         }
        	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection '+attachClass+'" style="padding-left:50px;" >';
     		 var i=0;
     		 for( i in this.sections){
     			attachClass = '';
     			if(!this.sections[i].showToStud && this.sections[i].showToStud!=undefined ){ /* section related check */
            		attachClass = 'hideElement';
            	}
     			var sectionId = this.sections[i].componentIdPrefix+this.sections[i].componentId+this.sections[i].idPrefix+this.sections[i].id;
     			htmlelement+='<div id = "sectionDiv_'+sectionId+'" class=" inputFieldRowPagesection '+attachClass+'" >';
     			htmlelement +=this.sections[i].studentLayout(this.subType,this.graded);
     			htmlelement+='</div>';
         	}
     		htmlelement+='</div>';
     		return htmlelement;
         },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterStudentLayout:function(){ 
        	 var j=0;
	   		 for(j in this.sections){
	   			 this.sections[j].afterStudentLayout();
	   		 }
			$('.stdQueLabel').each(function (){
				$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
	        });
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
        	 var htmlelement="";
        	 /* check for branching to show/hide */
	         var attachClass = '';        	
	         if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
	        	attachClass = 'hideElement';
	         }else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
	        	attachClass = 'hideElement';
	         }
        	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection '+attachClass+'" style="padding-left:50px;" >';
     		 var i=0;
     		 for( i in this.sections){
     			htmlelement+='<div class="inputFieldRowPagesection" style="padding-left:0px;">';
     			htmlelement +=this.sections[i].postSubmissionReviewLayout(this.subType,this.acceptAnyAnswer,this.graded);
     			htmlelement+='</div>';
         	}
     		
     		if(this.subType!='label'){
     			
     			var overallFeedback = util.getFormulaLinkForPostSubmission(this.overallFeedback);
     		    overallFeedback = overallFeedback.replace(/\Â/g,'').replace("&#160;",'');         
     		    var generalFeedback =  util.getFormulaLinkForPostSubmission(this.generalFeedback);
     		    generalFeedback = generalFeedback.replace(/\Â/g,'').replace("&#160;",'');

                overallFeedback = util.getImageLayout(overallFeedback);
                overallFeedback = util.getVideoLayout(overallFeedback);

                generalFeedback = util.getImageLayout(generalFeedback);
                generalFeedback = util.getVideoLayout(generalFeedback);

 				var hidden = (overallFeedback =='' || overallFeedback == '&nbsp;') && (generalFeedback =='' || generalFeedback == '&nbsp;') ?'invisible' : '';
     			htmlelement +='<div class="overallFeedOpen '+hidden+'  ">';
        		htmlelement +=' <strong>Feedback: </strong>'+overallFeedback+'</br>'+generalFeedback+'</div>';
     		}
     		htmlelement+='</div>';
     		return htmlelement.replace(/\Â/g,'').replace(/\&#160;/g,'');
         },
          /**
           * show correct/wrong answers marked by author in design mode
           */
         showCorrectAnswers:function(){
         },
         /**
          * show correct/wrong answers marked by student in test mode
          */
         showAnswers:function(){
         },
         /**
          * calculates Total Score
          */
         calculateScore:function(){
         },
         /**
          * mark as accept any answer
          */
         acptAnyAnswer:function(){	
        	 var flag=false;
		 	if ($("#acptAnyAnsBtnId" + this.pageIdPrefix + this.pageId+ this.idPrefix + this.id).prop("checked")) {
		 		flag = true;
			} else {
				flag = false;
			}
		 	this.acceptAnyAnswer = flag;
		 	 $.each(this.sections ,function(index,section){
             	section.updateAnswerLayout(flag);
 			 });
 	     },
         /**
          * validate if component is filled
          */

         validateComponent:function(object){
        	 var i=0;
             var isComplete=true;
             var contentFormatError={};
             var validFormat=true;
               for( i in this.sections){
            	   var validatorObj = this.sections[i].isSectionComplete(this.subType);
            	   if(validatorObj.message !=undefined){
            		   validFormat=false;
            		   contentFormatError.message=validatorObj.message;
            		   contentFormatError.field=validatorObj.field;
  	   				 break;
            	   }else{
            		  isComplete=isComplete && validatorObj.status; 
            	   }
               }
               if(!isComplete){
	               object.flag = true;
	               object.completeFlag = true;
	               object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id; 
               }
               if(!validFormat){
            	   object.flag = true;
	   				 object.rangeflag = true;
	   				 if(isComplete){
	   					object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id;
	   				}
	   				 object.errorMsg+="<br> "+contentFormatError.message;
	   				 object.field=contentFormatError.field;
               }
			return object;
        },
       
        /**
         * Function to add new section to input field question
         * */
        addSection : function(newSection){
      	  this.sections.push(newSection);
        },
       /**
        * change subtype selection
        */
        changeSubType : function(event){
        	var graded=false;
        	 if (typeof event.data === 'undefined') {
        		 graded=false;
        		 this.graded=graded;
                 this.subType = 'label';
             } else if(this.subType != event.data.subType){
                 this.subType = event.data.subType;
                 this.resetToLabel();
                 if (this.subType === 'label') {
                	 graded=false;
                     $("#mode").html("Label <span class='caret caretDrop'></span>");
                 } else if (this.subType === 'inputField') {
                	 graded=true;
                	 this.initStudentEntry();
                	 this.initFeedbackEditor();
                     $("#mode").html("Input field <span class='caret caretDrop'></span>");
                 } else if (this.subType === 'fillInTheBlank') {
                	 graded=true;
                	 this.initAuthorEntry();
                	 this.initStudentEntry();
                	 this.initFeedbackEditor();
                     $("#mode").html("Fill in the blank <span class='caret caretDrop'></span>");
                 }
                 this.graded=graded;
                 page.doLayout();
                 var i=0;
	 			 for( i in question.activePage.components){
	 			    	if(question.activePage.components[i].getId()==this.componentId){
	 			    		question.activePage.components[i].populateComp(); 
	 			    		break;
	 			    	}
	 		       }
                
             }
        	 if($("#mode").parent().hasClass("open")){
 	 			$("#mode").parent().removeClass("open");
 	 		}
        },
        /**
         * reset to label
         */
        resetToLabel:function(){
        	this.generalFeedback = null;
    		this.overallFeedback = null;
    		var sections = [];
    		
    		var config = {
    			id:1,
    			componentId : this.id,
    			componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix
    		};
    		sections[0]= new InputFieldSection(config);
    		var editors=[];
    		var authorEntryConfig = {
    				id:1,
    				componentId : this.id,
    				componentIdPrefix : config.componentIdPrefix,
    				sectionId:sections[0].id,
    				type:this.subType
    			};
    		editors[0] =new AuthorEntry(authorEntryConfig);
    		sections[0].setAuthorEntries(editors);
    		
    		this.setSections(sections);
        },
        /**
         * Init Author Entry
         */
        initAuthorEntry:function(){
         var type=this.subType;
        	 $.each(this.sections ,function(index,section){
        		 var authorEntry = new AuthorEntry({
         			id : 2,
         			componentId:section.componentId,
         			componentIdPrefix:section.componentIdPrefix,
         			sectionId:section.id,
         			type:type
         		});
             	section.getAuthorEntries().push(authorEntry);
 			 });
        	
        },
        /**
         * Init Student Entry
         */
        initStudentEntry:function(){
        	 $.each(this.sections ,function(index,section){
        		 var studEntry = new StudentEntry({
         			id : 1,
         			componentId:section.componentId,
         			componentIdPrefix:section.componentIdPrefix,
         			sectionId:section.id
         		});
             	var studEntries=[];
             	studEntries[0]=studEntry;
             	section.setStudentEntries(studEntries);
 			 });
        	
        	 this.acceptAnyAnswer=true;
        	 
        },
        /**
         * sets the feedback editors
         */
        initFeedbackEditor:function(){
        	var gfEditor = new Editor({
    			id : this.pageIdPrefix+this.pageId+this.idPrefix + this.id
    					+ this.generalFeedbackPrefix
    		});
    		
    		var ofFeedback = new Editor({
    			id : this.pageIdPrefix+this.pageId+this.idPrefix + this.id
    					+ this.overallFeedbackPrefix
    		});
    		
    		this.generalFeedback = gfEditor;
    		this.overallFeedback = ofFeedback;
        },
       /**
        * filter copied text
        * @param event
        */
    	filter:function(event){
    		util.removePasteImage(event.originalEvent.clipboardData,event);
    	},
        /**
         * collapse component
         */
        collapseComponent : function(){
        	var $snap = $("#componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);   	
        	var $comp = $("#compBody_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);
        	var tooltip=$snap.find("img");
        	if($comp.is(":visible")){
        		$comp.hide('slow');
        		$snap.find("img").attr("src","img/comp-plus.png");
        		// added tooltip to image comp-plus.png        		
        		tooltip.attr("title","Expand");
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("invisible");
        		$comp.prev().hide();
        		$("#componentHeaderid"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
        		this.state="collapse";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("dragComp");
        	}else{
        		$comp.show('slow');
        		$snap.find("img").attr("src","img/comp-minus.png");
        		tooltip.attr("title","Collapse");
        		$("#componentHeaderid"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
        		$comp.prev().show();
        		this.state="expand";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("dragComp");
        	}
        },

        /**
         * collapse expand all component
         */
        expandcollapseComponent : function(flag) {
            var $snap = $("#componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);    
            var $comp = $("#compBody_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);
            var tooltip=$snap.find("img");
            if(!flag){
                $comp.hide('slow');
                $snap.find("img").attr("src","img/comp-plus.png");
                // added tooltip to image comp-plus.png             
                tooltip.attr("title","Expand");
                $("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("invisible");
                $comp.prev().hide();
                $("#componentHeaderid"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).hide();
                this.state="collapse";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("dragComp");
            }else{
                $comp.show('slow');
                $snap.find("img").attr("src","img/comp-minus.png");
                tooltip.attr("title","Collapse");
                $("#componentHeaderid"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).show();
                $("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
                $comp.prev().show();
                this.state="expand";
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("dragComp");
            }
        },
               
       
       /**
        * add Input Field component to page
        */
       addInputFieldComponent:function(){
       	page.addInputFieldComponent();
       },
       /**
        * creates copy of the current input Field component
        * @param event
        */
       copyInputFieldComponent : function(event){
           var	id = event.data.id;
       	page.copyComponent(id);
       },
       /**
        * remove the input Field component
        * @param event
        */
       removeComponent:function(event){
       	page.deleteComponent(event.data.id);
       },
       /**
		 * check if question is answered
		 */

       isStudentAnswered:function(){
    	   var i=0;
           var validflag=true;
           if(this.subType=='label'){
        	   validflag=true;
           }else{
        	   for( i in this.sections){
        		   if(this.sections[i].showToStud || this.sections[i].showToStud==undefined){
        			   validflag= validflag && this.sections[i].isStudentAnswered();
	   				 }else{
	   					validflag=true; 
	   				 }
        		     if(!validflag){
        		    	 break;
        		     }
    			 }
           }
 			 
			return validflag;
       },
        
       /**
		 * check if question is answered
		 */

       validateStudentQuestionLayout:function(){
            var validflag=true;
            if(this.subType=='label'){
            	validflag= true;
            }else if(this.mandatory){
            	for( i in this.sections){
            		 if(this.sections[i].showToStud || this.sections[i].showToStud==undefined){
            			 validflag = validflag && this.sections[i].isStudentAnswered();
            		 }
            		 if(!validflag){
      					break;
      				 }
    			 }
            }else{
            	validflag= true;
            }
			return validflag;
       },
       /**
        * calculates Total Score
        */
       calculateScore:function(){
    	   //TODO: verify once
      	 var totalCorrectAnswers=0;
  		 var i=0;
  		 for( i in this.sections){  
  			 if(this.sections[i].showToStud || this.sections[i].showToStud==undefined){
  				totalCorrectAnswers +=this.sections[i].studentEntries.length;
  			 }
         }
         var weightage = 1/totalCorrectAnswers;
         var totalCrctAnsrGvnByStdnt =0;
         var totalWrngAnsrGvnByStdnt=0;
         var j=0;
         for( j in this.sections){    		
         		totalCrctAnsrGvnByStdnt +=this.sections[j].calTotalCrctAnswersGivenByStudent(this.acceptAnyAnswer);
         		totalWrngAnsrGvnByStdnt +=this.sections[j].calTotalWrngAnswersGivenByStudent(this.acceptAnyAnswer);
         }
      	 if(this.graded){
      		
            	 var totalScore=(totalCrctAnsrGvnByStdnt*weightage) ;
            	 if(isNaN(totalScore) || totalScore<0 ){
        			totalScore=0;
        		 }
            	 return totalScore;
      	 }
       },
       resetComp : function(){
	    	var eSec=0;
	   		for(eSec in this.sections){
	   			
	       		var fullCmpId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
	       		if(question.pages[parseInt(this.pageId)-1]==undefined){
	       			var flag;
        			flag=question.pages[parseInt(this.pageId)-util.checkIfPageDelete(this.pageId)-1].showToStud;
        		}else{
        			flag=question.pages[parseInt(this.pageId)-1].showToStud;
        		}
	   			if((this.showToStud!=undefined && question.activePage.showToStud!=undefined && (!flag || !this.showToStud))){
	   				this.resetStudentResponsesforBranching(fullCmpId, this.sections[eSec]);	
	   			}else{
	   				if(!this.sections[eSec].showToStud && this.sections[eSec].showToStud!=undefined){
	   					this.resetStudentResponsesforBranching(fullCmpId, this.sections[eSec]);
	   				}
	   			}
	   			
	   		}
        },
	    /*
         * resets each and every options responses 
         * along with corresponding showToStud flag of page, component and sections
         * */
        resetStudentResponsesforBranching : function(fullCmpId, currentSection){
       	 	var key=0;
   			var sectionId = currentSection.componentIdPrefix+currentSection.componentId+currentSection.idPrefix+currentSection.id;
   			$('#sectionDiv_'+sectionId+' .inputFieldStudentEntry ').each(function(){
   				$(this).text(""); 
   			});
   			for(j in currentSection.studentEntries){
   				currentSection.studentEntries[j].editor.text = "";
    		}
   			if(currentSection.isBranched){
   				currentSection.studentEntries[j].setMappedEntities(fullCmpId,currentSection.studentEntries[j].editor.id, parseFloat(currentSection.studentEntries[j].editor.text));
   			}
        },
	};  