/* ========================================================================
 * TableInputFieldComponent: Object Declaration
 *
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * accepts any answer, graded, mandatory. holds the componnet text editor
 * general feed back editor, overall feedback editor.and all sections 
 * for this component
 * ======================================================================== */
var TableInputFieldComponent = function(options){ 
	this.cellId=null;
	this.type='Input field';
	this.sections=[];
	$.extend(TableInputFieldComponent.prototype, new Component(options));
	//this.mandatory=false;
	//this.graded=true;
	this.studentEntries=[];
	this.textBoxIdPrefix='E';
	this.acceptAnyAnswer = true;
	$.extend(this, options);
	this.subType='inputField';
	this.contentFormat=new ContentFormatEnum().ALPHANUMERIC;
	this.editor = new Editor({id:this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId});
	this.answer = new Editor({id:this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId+this.textBoxIdPrefix});
	
	this._toggleFeedback = TableInputFieldComponent.BindAsEventListener( this, this.toggleFeedback );
	this._populateGFEditorProperties = TableInputFieldComponent.BindAsEventListener( this, this.populateGFEditorProperties );
	this._populateOFEditorProperties = TableInputFieldComponent.BindAsEventListener( this, this.populateOFEditorProperties );
	this._update = TableInputFieldComponent.BindAsEventListener( this, this.update );
	this._populateComp = TableInputFieldComponent.BindAsEventListener( this, this.populateComp );
	this._addTableInputFieldComponent=TableInputFieldComponent.BindAsEventListener( this, this.addTableInputFieldComponent );
	//this._copyTableInputFieldComponent=TableInputFieldComponent.BindAsEventListener( this, this.copyTableInputFieldComponent );
	//this._removeComponent=TableInputFieldComponent.BindAsEventListener( this, this.removeComponent );
	this._acceptAnyAnswer = TableInputFieldComponent.BindAsEventListener( this, this.acptAnyAnswer );
	this._markGraded = TableInputFieldComponent.BindAsEventListener( this, this.markGraded );
	this._markMandatory = TableInputFieldComponent.BindAsEventListener( this, this.markMandatory);
	this._openHelpModalForTableInputFieldComponent = TableInputFieldComponent.BindAsEventListener(this,this.openHelpModalForTableInputFieldComponent);
	this._updateGeneralFeedbackEditor= TableInputFieldComponent.BindAsEventListener( this, this.updateGeneralFeedBackEditor );
	this._updateOverallFeedBackEditor= TableInputFieldComponent.BindAsEventListener( this, this.updateOverallFeedBackEditor );
	this._updateEditor = TableInputFieldComponent.BindAsEventListener( this, this.updateEditor );
	this._openHelpModalForRequiredQuestionSelector = TableInputFieldComponent.BindAsEventListener(this,this.openHelpModalForRequiredQuestionSelector);
	this._changeOrientation = TableInputFieldComponent.BindAsEventListener(this,this.changeOrientation);
	this._addSection = TableInputFieldComponent.BindAsEventListener( this, this.addSection);
	this._changeSubType = TableInputFieldComponent.BindAsEventListener( this, this.changeSubType);
	this._filter =TableInputFieldComponent.BindAsEventListener( this, this.filter );
	this._collapseComponent = TableInputFieldComponent.BindAsEventListener( this, this.collapseComponent );
	
	this._changeFormatter=TableInputFieldComponent.BindAsEventListener( this, this.changeFormatter );
	this._changeCurrency = TableInputFieldComponent.BindAsEventListener(this,this.changeCurrency);
	this._changeDateFormat = TableInputFieldComponent.BindAsEventListener(this,this.changeDateFormat);
	this._changeYearFormat = TableInputFieldComponent.BindAsEventListener(this,this.changeYearFormat);
	this._changePercentSymbol = TableInputFieldComponent.BindAsEventListener(this,this.changePercentSymbol);
	this._showSeparator = TableInputFieldComponent.BindAsEventListener(this,this.showSeparator);
	this._validateAnswer = TableInputFieldComponent.BindAsEventListener( this, this.validateAnswer);
	
};

//add event helper method on element id
TableInputFieldComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
TableInputFieldComponent.removeEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
};
//add event helper method on element class
TableInputFieldComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
TableInputFieldComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableInputFieldComponent.prototype = { 
		
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
            * gets contentFormat
            */
            getContentFormat:function(){
           	 this.contentFormat;
            },
            /**
             * sets contentFormat
             * @param editor
             */
            setContentFormat:function(contentFormat){
           	 this.contentFormat=contentFormat;
            },
            /**
    	      * get studentEntries
    	      * @returns {Array}
    	      */
              getStudentEntries: function( ){
                  return this.studentEntries;  
              },
              /**
               * sets studentEntries for section
               * @param studentEntries
               */
              setStudentEntries: function(  studentEntries ){
                  this.studentEntries =  studentEntries;
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
	         		}
        		 }	
        	 }
        	 $.each(this.sections ,function(index,section){
        		 section.update();	
 			 });
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
		       			if(this.contentFormat.showThousandSeparator){
		       				var commaText = answerText.toString().split(".");
		       				commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		       				answerText=commaText.join(".");
		       			}
		       		}
		       		this.answer.text = answerText;
		       		$("#" + this.answer.id).text(answerText);
			  }else{
				  this.answer.update(); 
			  }  
	      },
	      roundOff:function(number,decimal)
	      {
	    	  var multiplier = Math.pow(10, decimal);
	    	  return (Math.round(number * multiplier) / multiplier);
	      },
         /**
          * layouts in design mode
          * @returns {String}
          */
         layout:function(){
        	 var htmlelement="";
        	 htmlelement += this.layoutAnswer();
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
        	 var htmlelement='<div id="componentFeedback'+this.idPrefix+this.id+this.cellId+'" '+css+'>';
        	 htmlelement+=' <div class="editGenFeed">Feedback: <a id="genFbTxt'+this.idPrefix+this.id+this.cellId+'">Expand general feedback</a>';
         	 htmlelement+=' </div>';
         	 htmlelement+='<div class="generalFeedback" id="genFb'+this.idPrefix+this.id+this.cellId+'" style="display: none;">';
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
          * layouts Answer editor in design mode
          * @returns {String}
          */
         layoutAnswer:function(){
	       	var dataDivAttr = this.answer.text !='' ? 'data-div-placeholder-content' : ''; 
	       	var answerText = "";
	       	if(this.contentFormat.showThousandSeparator && (this.contentFormat.type== "number" || this.contentFormat.type== "percentage" )){
	       		var commaText = (this.answer.text).toString().split(".");
	   			commaText [0] = commaText [0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	   			answerText=commaText.join(".");	
	       	}else{
	       		answerText=	this.answer.text;
	       	}
	       	//var answerText=(this.contentFormat.type== "number" || this.contentFormat.type== "percentage" )? this.answer.text.replace(/\B(?=(\d{3})+(?!\d))/g, ","):this.answer.text;
	        	var htmlelement = "";
	        	//htmlelement+='<div class="pageSection cellComponent" id="cellComponent_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" >';
	        	//htmlelement+='	<div class="pageInnerSection">';
	        	htmlelement+='		<div id="answerDiv_'+this.answer.id+'" class="column-1 sub-col-1'+'" '+dataDivAttr+' style="display:inline-block;"> ';
	        	htmlelement+='			<div class="componentLabel"><span> Cell Id: '+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+' </span> </div>';
	        	htmlelement+=' 			<div class="editableDivTitletTable">';
	        	htmlelement+=' 				<h6 class="pull-right font10">ID# '+this.answer.id+' </h6>';
	        	htmlelement+='			</div> ';
	        	htmlelement+='			<div> ';
	        	htmlelement+='				<div id="'+this.answer.id+'" class="inputDummy " data-maxlength="'+this.answer.maxLength+'" contenteditable="true" rows="3" data-placeholder="Enter answer" '+dataDivAttr+'>'+answerText+'</div> ';
	        	htmlelement+=' 			</div>';
	         	 htmlelement+='    		<div class="clear"></div>';
	        	htmlelement+='			<div class="eachCol">';
	         	 htmlelement+='  			<div style="width:430px;">';
	         	 htmlelement+='   				<button id="saveBtn_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="button">Save</button>';
	         	 htmlelement+='    				<div class="clear"></div>';
	         	 htmlelement+='  			</div>';
	         	 htmlelement+='			</div>';
	        	htmlelement+=' 		</div>';
	        	//htmlelement+=' 	</div>';
	        	//htmlelement+='</div>';
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
          * layouts component property pane in design mode
          * @returns {String}
          */
         propertyLayout: function () {
        	 var htmlelement = "";
             htmlelement += ' <div class="data_component">';
        
             htmlelement += '		<p style="margin-top : 5px;" class="txtediting">ID# ' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '</p>';
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
            
             htmlelement += '<div class="clear"></div>';
             htmlelement += '<div class="gap10"></div>';
             htmlelement += '<div class="clear"></div>';
             
             return htmlelement;
         },
	     /**
	      * adds event hadlers for elements present in component property pane
	      */
	     afterPropertyLayout: function () {
	    	 var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	         TableInputFieldComponent.addEvent(cellId, "click", this._populateComp);
	         TableInputFieldComponent.addEvent("TableInputFieldComponentHelpId" + cellId, "click", this._openHelpModalForTableInputFieldComponent);
	         TableInputFieldComponent.addEvent("requiredQuestionId" + cellId, "click", this._openHelpModalForRequiredQuestionSelector);
	         TableInputFieldComponent.addEvent("answerTypeHelpId" + cellId, "click", this._openHelpModalForAnswerType);
	         TableInputFieldComponent.addEvent("acptAnyAnsBtnId" + cellId, "click", this._acceptAnyAnswer);
	         TableInputFieldComponent.addEvent("gradadedObjectBtnId" + cellId, "click", this._markGraded);
	         TableInputFieldComponent.addEvent("optionsRadios1" + cellId, "click", this._markMandatory);
	         TableInputFieldComponent.addEvent("optionsRadios2" + cellId, "click", this._markMandatory);
	         TableInputFieldComponent.addEvent("inputField" + cellId, "click", this._changeSubType, {
	             "subType": "inputField"
	         });
	     },    
	      
	       /**
	        * layouts the editor property pane
	        */
	       editorPropertyLayout:function(){
           if(this.type=="" || this.type != "Input field"){
             return false;
           }
	    	   var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	       	 var htmlelement="";
	   	   	 htmlelement+='    <div id="entryType" style="height:auto;">';
   		   	 htmlelement+='        <div class="head-info typeInput">';
   		   	 htmlelement+='            <a id="contentFormat'+cellId+'" class="info-icon"></a>Content format:';
       	 	 htmlelement+='        </div>';  
       		 htmlelement+='       <div class="tabContent tabProContent">';
           	 htmlelement+='           <div class="btn-group customDropdown">';
           	 htmlelement+='                <button data-toggle="dropdown" id="formatter" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
           	 htmlelement+='                    Alphanumeric<span class="caret caretDrop"></span>';
           	 htmlelement+='                </button>';
           	 htmlelement+='                <ul class="dropdown-menu">';
           	 htmlelement+='                    <li id="alphanumeric'+cellId+'"><a>Alphanumeric</a>';
           	 htmlelement+='                    </li>';
           	 htmlelement+='                    <li class="divider"></li>';
           	 htmlelement+='                    <li id="number'+cellId+'"><a>Number</a>';
           	 htmlelement+='                    </li>';
           	 htmlelement+='                    <li class="divider"></li>';
           	 htmlelement+='                    <li id="currency'+cellId+'"><a>Currency</a>';
           	 htmlelement+='                    </li>';
           	 htmlelement+='                    <li class="divider"></li>';
           	 htmlelement+='                    <li id="percentage'+cellId+'"><a>Percentage</a>';
           	 htmlelement+='                    </li>';
           	 htmlelement+='                    <li class="divider"></li>';
           	 htmlelement+='                    <li id="date'+cellId+'"><a>Date</a>';
           	 htmlelement+='                    </li>';
           	 htmlelement+='                    <li class="divider"></li>';
           	 htmlelement+='                    <li id="time'+cellId+'"><a>Time hh:mm:ss</a>';
           	 htmlelement+='                    </li>';
           	 htmlelement+='                </ul>';
           	 htmlelement+='            </div>';
           	 htmlelement+='        </div>';
		       htmlelement+=' </div>';
           htmlelement+=' <div id="contentFormatSpecific">';
           htmlelement+=' </div>';
	       	 htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
             htmlelement += '	<div class="grid grid-2">';
             htmlelement += '		<span>';
             htmlelement += '			<input type="checkbox" id="acptAnyAnsBtnId'+cellId+ '">';
             htmlelement += '			<label for="acptAnyAnsBtnId' +cellId+ '"><span></span>Accept any answer</label>';
             htmlelement += '		</span>';
             htmlelement += ' 	</div>';
             htmlelement += '	<div class="clear"></div>';
             htmlelement += '	<div class="grid grid-2">';
             htmlelement += '		<input type="checkbox" id="gradadedObjectBtnId' +cellId+ '">';
             htmlelement += '		<label for="gradadedObjectBtnId' +cellId+ '"><span></span>Graded object</label>';
             htmlelement += '	</div>';
             htmlelement += '	<div class="clear"></div>';
             htmlelement += '</div>';
             htmlelement += '<div class="clear"></div>';
             htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
             htmlelement += '	<div class="componentTytle">';
             htmlelement += '		<a class="info-icon" id="requiredQuestionId' + cellId + '"></a>Prerequisite:';
             htmlelement += '	</div>';
             htmlelement += ' <div class="data_component">';
             htmlelement += '   <p style="margin-top : 5px" class="txtediting boldclass">In order to move forward,\n student responses are:</p>';
             htmlelement += '	<div> <input type="radio" value="Required" id="optionsRadios1' + cellId+ '" name="optionsRadios">';
             htmlelement += '   <label for="optionsRadios1' + cellId + '"><span></span>Required</label> <input type="radio" id="Radio2" name="displayBranchingMode">';
             htmlelement += '   <input type="radio" value="Optional" id="optionsRadios2' + cellId + '" name="optionsRadios">';
             htmlelement += '     <label for="optionsRadios2' + cellId + '"><span></span>Optional</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
             htmlelement += '  </div>';
             htmlelement += ' </div>';
	       	 htmlelement+='    <div class="clear"></div>';
	       	 htmlelement+='<div class="gap10"></div>';
	      	 return htmlelement;
	       },
	       /**
	   	  * adds events for html elements of current option editor property pane
	   	  */
	   	 afterEditorPropertyLayout:function(){
	   		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
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
	        if(this.contentFormat.type != ""){
	   		  this.contentFormatSpecificLayout();
    	    }
        	this.afterContentFormatSpecificLayout();
        
	   		TableInputFieldComponent.addEvent( "alphanumeric"+cellId, "click", this._changeFormatter,{"type":"alphanumeric"});
	   		TableInputFieldComponent.addEvent( "number"+cellId, "click", this._changeFormatter,{"type":"number"});
	   		TableInputFieldComponent.addEvent( "currency"+cellId, "click", this._changeFormatter,{"type":"currency"});
	   		TableInputFieldComponent.addEvent( "percentage"+cellId, "click", this._changeFormatter,{"type":"percentage"});
	   		TableInputFieldComponent.addEvent( "date"+cellId, "click", this._changeFormatter,{"type":"date"});
	   		TableInputFieldComponent.addEvent( "time"+cellId, "click", this._changeFormatter,{"type":"time"});
	   		TableInputFieldComponent.addEvent( "charLimitHelp" + cellId, "click", this._openHelpModalForCharLimit);
	   		TableInputFieldComponent.addEvent( "1column"+cellId, "click", this._changeOrientation,{"type":1});
	  	 	TableInputFieldComponent.addEvent( "2column"+cellId, "click", this._changeOrientation,{"type":2});
	  	 	TableInputFieldComponent.addEvent( "3column"+cellId, "click", this._changeOrientation,{"type":3});
	  	 	//TableInputFieldComponent.addEvent("txtmaxLenght_"+cellId,"keypress",this._restrictEvent);
	  	 	TableInputFieldComponent.addEvent("txtmaxLenght_" + cellId, "blur", this._updateEditor,{"cellId":cellId});
	  	 	TableInputFieldComponent.addEvent("txtdecimal_" + cellId, "blur",this._updateEditor,{"cellId":cellId});
	   	 },
	   	/**
	   	 * update property layout as per content format
	   	 */
	   	contentFormatSpecificLayout: function () {
          if(this.contentFormat.type == ""){
            return false;
          } else{
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
          }
	   	},
		/**
	  	 * binds event for content format specific layout
	  	 */
	   	afterContentFormatSpecificLayout: function () {
	   		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	   	 for( i in question.activePage.components){
	            if(question.activePage.components[i].id == this.id){
	                TableComp = question.activePage.components[i];
	            }
	        }
	  	   var selectedCell = TableComp.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
	  	   var selectedMeta = TableComp.itsTableInstance.getCellMeta(selectedTableCells[0],selectedTableCells[1]);
	       
	  	    if (this.contentFormat.type == "alphanumeric") {
	  	    	TableInputFieldComponent.addEvent("txtmaxLenght_" + cellId, "blur", this._updateEditor,{"cellId":cellId});
	  	    	TableInputFieldComponent.addEvent("txtmaxLenght_"+cellId,"keypress",this._restrictEvent);
	  	    } else if (this.contentFormat.type == "number") {
	  	    	TableInputFieldComponent.addEvent("showSeparatorLabelBtnId" + cellId, "click", this._showSeparator);
	  	        if (this.contentFormat.showThousandSeparator) {
	  	            $('#showSeparatorLabelBtnId' + cellId).prop('checked', true);
	  	        } else {
	  	            $('#showSeparatorLabelBtnId' + cellId).prop('checked', false);
	  	        }
	  	        TableInputFieldComponent.addEvent("txtdecimal_" + cellId, "blur", this._updateEditor,{"cellId":cellId});
	  	        TableInputFieldComponent.addEvent("txtdecimal_"+cellId,"keypress",this._restrictEvent);
	  	        $("#txtdecimal_"+cellId).jStepper({minValue:0, maxValue:6});
	  	    } else if (this.contentFormat.type == "currency") {
	  	        if (this.contentFormat.currencyType == "dollar") {
	  	            $("#currencySelector" + cellId).html("US, Dollar ($) <span class='caret caretDrop'></span>");
	  	        } else if (this.contentFormat.currencyType == "euro") {
	  	            $("#currencySelector" + cellId).html("EU, Euro (&#8364;) <span class='caret caretDrop'></span>");
	  	        } else if (this.contentFormat.currencyType == "yen") {
	  	            $("#currencySelector" + cellId).html("Japan, Yen (&#165;) <span class='caret caretDrop'></span>");
	  	        } else if (this.contentFormat.currencyType == "pound") {
	  	            $("#currencySelector" + cellId).html("UK, Pound (&#163;) <span class='caret caretDrop'></span>");
	  	        }
	  	        $("#"+cellId+" div").html("");
                $("#"+cellId+" div").addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
                //$("#"+cellId+" div").html("$");
                TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html());
                $(selectedCell).data("change",true);
                selectedMeta.readOnly = true;
 	 		  
	  	        $("#currencySymbol" + cellId).html(this.contentFormat.symbol);
	  	        TableInputFieldComponent.addEvent("dollar" + cellId, "click", this._changeCurrency, {
	  	            "type": "dollar"
	  	        });
	  	        TableInputFieldComponent.addEvent("euro" + cellId, "click", this._changeCurrency, {
	  	            "type": "euro"
	  	        });
	  	        TableInputFieldComponent.addEvent("yen" + cellId, "click", this._changeCurrency, {
	  	            "type": "yen"
	  	        });
	  	        TableInputFieldComponent.addEvent("pound" + cellId, "click", this._changeCurrency, {
	  	            "type": "pound"
	  	        });
	  	    } else if (this.contentFormat.type == "percentage") {
	  	    	TableInputFieldComponent.addEvent("txtdecimal_" + cellId, "blur", this._updateEditor,{"cellId":cellId});
	  	    	TableInputFieldComponent.addEvent("txtdecimal_"+cellId,"keypress",this._restrictEvent);
	  	    	TableInputFieldComponent.addEvent("showPercentLabelBtnId" + cellId, "click", this._changePercentSymbol);
	  	        if (this.contentFormat.showSymbol) {
	  	            $('#showPercentLabelBtnId' + cellId).prop('checked', true);
	  	            $("#"+cellId + " div").addClass("percentSymbol");
					$("#"+this.answer.id).addClass("percentSymbol");
					 TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html());
		                $(selectedCell).data("change",true);
		                selectedMeta.readOnly = true;
		 	 		  
	  	        } else {
	  	            $('#showPercentLabelBtnId' + cellId).prop('checked', false);
	  	        }
	  	      $("#txtdecimal_"+cellId).jStepper({minValue:0, maxValue:6});
	  	    } else if (this.contentFormat.type == "date") {
	  	      $("#"+cellId+" div").removeClass();
              $("#"+cellId+" div").html("");
             
              
              selectedMeta.readOnly = true;
	  	        if (this.contentFormat.dateFormat == "monthDayYear") {
	  	            $("#dateType" + cellId).html("Month/day/year <span class='caret caretDrop'></span>");
	  	            $("#"+cellId+" div").html("mm/dd/yy");
	  	        } else if (this.contentFormat.dateFormat == "dayMonthYear") {
	  	            $("#dateType" + cellId).html("Day/month/year <span class='caret caretDrop'></span>");
	  	            $("#"+cellId+" div").html("dd/mm/yy");
	  	        }
	  	        TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html() );
	  	        $(selectedCell).data("change",true);
	  	        if (this.contentFormat.yearFomat == 4) {
	  	            $("#4" + cellId).prop("checked", true);
	  	        } else if (this.contentFormat.yearFomat == 2) {
	  	            $("#2" + cellId).prop("checked", true);
	  	        }

	  	        TableInputFieldComponent.addEvent("monthDayYear" + cellId, "click", this._changeDateFormat, {
	  	            "type": "monthDayYear"
	  	        });
	  	        TableInputFieldComponent.addEvent("dayMonthYear" + cellId, "click", this._changeDateFormat, {
	  	            "type": "dayMonthYear"
	  	        });
	  	        TableInputFieldComponent.addEvent("4" + cellId, "click", this._changeYearFormat, {
	  	            "type": 4
	  	        });
	  	        TableInputFieldComponent.addEvent("2" + cellId, "click", this._changeYearFormat, {
	  	            "type": 2
	  	        });

	  	    } else if (this.contentFormat.type == "time") {
	  	    	$("#"+cellId +" div").removeClass();
	  	    	$("#"+cellId+" div").html("");
                $("#"+cellId+" div").html("hh:mm:ss");
                TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html() );
                $(selectedCell).data("change",true);
                selectedMeta.readOnly = true;
	  	    }
	  	 
	  	},
	  	/**
	  	 * property layout for alphanumeric content format
	  	 */
	  	alphanumericPropertyLayout: function () {
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  		var maxLengthval = this.editor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	  		//var maxLengthval = 0;
	  	    var htmlelement = "";
	  	    /*htmlelement += '<div class="clear"></div>';
	  	    htmlelement += '    <div class="tabContent tabProContent customInput charLimit">';
	  	    htmlelement += '        <form role="form">';
	  	    htmlelement += '            <div class="form-group">';
	  	    htmlelement += '                <a id="charLimitHelp' + cellId + '" class="info-icon"></a>';
	  	    htmlelement += '                <label class="font11" for="exampleInputEmail1">Character limit:</label>';
	  	    htmlelement += '                <input type="Text" placeholder="15,000" value="' + maxLengthval + '" id="txtmaxLenght_' + cellId + '">';
	  	    htmlelement += '            </div>';
	  	    htmlelement += '            <div class="clear"></div>';
	  	    htmlelement += '        </form>';
	  	    htmlelement += '    </div>';*/
	  	    return htmlelement;
	  	},
	  	/**
	  	 * property layout for number content format
	  	 */
	  	numberPropertyLayout: function () {
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	    var htmlelement = "";
	  	    htmlelement += '<div class="tabContent tabProContent tabProContent-2" style="height:15px">';
	  	    htmlelement += '	<div class="data_component">';
	  	    htmlelement += '		<div class="grid grid-2">';
	  	    htmlelement += '			<span>';
	  	    htmlelement += '			<input type="checkbox" id="showSeparatorLabelBtnId' + cellId + '">';
	  	    htmlelement += '			<label for="showSeparatorLabelBtnId' + cellId+ '"><span></span>Show 1000s separator (,)</label>';
	  	    htmlelement += '			</span>';
	  	    htmlelement += ' 		</div>';
	  	    htmlelement += ' 	</div>';
	  	    htmlelement += '</div>';
	  	    htmlelement += '  <div class="tabContent tabProContent customInput charLimit">';
	  	    /*htmlelement += '        <form role="form">';*/
	  	    htmlelement += '            <div class="form-group">';
	  	    htmlelement += '                <a id="decimalPlacesHelp' + cellId + '" class="info-icon"></a>';
	  	    htmlelement += '                <label class="font11" for="exampleInputEmail1">Decimal places</label>';
	  	    htmlelement += '                <input type="Text" placeholder="2" value="' + this.contentFormat.decimalPlaces + '" id="txtdecimal_' + cellId + '">';
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
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	    var htmlelement = "";
	  	    htmlelement += '    <div id="entryType">';
	  	    htmlelement += '        <div class="head-info typeInput">';
	  	    htmlelement += '            <a id="currencyType' + cellId + '" class="info-icon"></a>Currency type:';
	  	    htmlelement += '        </div>';
	  	    htmlelement += '       <div class="tabContent tabProContent">';
	  	    htmlelement += '           <div class="btn-group customDropdown">';
	  	    htmlelement += '                <button data-toggle="dropdown" id="currencySelector'+cellId+'" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	  	    htmlelement += '                    US, Dollar ($)<span class="caret caretDrop"></span>';
	  	    htmlelement += '                </button>';
	  	    htmlelement += '                <ul class="dropdown-menu">';
	  	    htmlelement += '                    <li id="dollar' + cellId + '"><a>US, Dollar ($)</a>';
	  	    htmlelement += '                    </li>';
	  	    htmlelement += '                    <li class="divider"></li>';
	  	    htmlelement += '                    <li id="euro' + cellId + '"><a>EU, Euro (&#8364;)</a>';
	  	    htmlelement += '                    </li>';
	  	    htmlelement += '                    <li class="divider"></li>';
	  	    htmlelement += '                    <li id="yen' + cellId + '"><a>Japan, Yen (&#165;)</a>';
	  	    htmlelement += '                    </li>';
	  	    htmlelement += '                    <li class="divider"></li>';
	  	    htmlelement += '                    <li id="pound' + cellId + '"><a>UK, Pound (&#163;)</a>';
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
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	    var htmlelement = "";
	  	    htmlelement += '<div class="clear"></div>';
	  	    htmlelement += '    <div class="tabContent tabProContent customInput charLimit">';
	  	    /*htmlelement += '        <form role="form">';*/
	  	    htmlelement += '            <div class="form-group">';
	  	    htmlelement += '                <a id="decimalPlacesHelp' + cellId + '" class="info-icon"></a>';
	  	    htmlelement += '                <label class="font11" for="exampleInputEmail1">Decimal places</label>';
	  	    htmlelement += '                <input type="Text" placeholder="2" value="' + this.contentFormat.decimalPlaces + '" id="txtdecimal_' + cellId + '">';
	  	    htmlelement += '                <label class="font11" style="margin-left:18px;" for="exampleInputEmail1">Enter 0 to 6 decimal places</label>';
	  	    htmlelement += '            </div>';
	  	    htmlelement += '            <div class="clear"></div>';
	  	    /*htmlelement += '        </form>';*/
	  	    htmlelement += '    </div>';
	  	    //htmlelement += '<div class="tabContent tabProContent tabProContent-2" style="height:150px">';
	  	    htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
	  	    htmlelement += '	<div class="data_component">';
	  	    htmlelement += '		<div class="grid grid-2">';
	  	    htmlelement += '			<span>';
	  	    htmlelement += '			<input type="checkbox" id="showPercentLabelBtnId' + cellId + '">';
	  	    htmlelement += '			<label for="showPercentLabelBtnId' + cellId  + '"><span></span>Show % sign</label>';
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
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	    var htmlelement = "";
	  	    //htmlelement += '    <div id="dateFormat" style="height:300px;">';
	  	    htmlelement += '    <div id="dateFormat">';
	  	    htmlelement += '        <div class="head-info typeInput">';
	  	    htmlelement += '            <a id="dateFormat' + cellId + '" class="info-icon"></a>Date format:';
	  	    htmlelement += '        </div>';
	  	    htmlelement += '       <div class="tabContent tabProContent">';
	  	    htmlelement += '           <div class="btn-group customDropdown">';
	  	    htmlelement += '                <button data-toggle="dropdown" id="dateType'+ cellId+'" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	  	    htmlelement += '                    Month/day/year<span class="caret caretDrop"></span>';
	  	    htmlelement += '                </button>';
	  	    htmlelement += '                <ul class="dropdown-menu">';
	  	    htmlelement += '                    <li id="monthDayYear' + cellId + '"><a>Month/day/year</a>';
	  	    htmlelement += '                    </li>';
	  	    htmlelement += '                    <li class="divider"></li>';
	  	    htmlelement += '                    <li id="dayMonthYear' + cellId + '"><a>Day/month/year</a>';
	  	    htmlelement += '                    </li>';
	  	    htmlelement += '                </ul>';
	  	    htmlelement += '            </div>';
	  	    htmlelement += '        </div>';
	  	    htmlelement += '    <div class="head-info">';
	  	    htmlelement += '       <a  id="yearFormattingId' + cellId + '" class="info-icon" ></a>Year formatting:';
	  	    htmlelement += '   </div>';
	  	    htmlelement += '   <div class="clear"></div>';
	  	    htmlelement += '   <div class="tabContent tabProContent">';
	  	    htmlelement += '      <div class="radio">';
	  	    htmlelement += '              <input type="radio" value="4 digit year (2013)" id="4' + cellId + '" name="yearRadios">';
	  	    htmlelement += '           <label for="4' + cellId + '"><span></span> Four-digit year (2013)</label>';
	  	    htmlelement += '       </div>';
	  	    htmlelement += '      <div class="radio">';
	  	    htmlelement += '               <input type="radio" value="2 digit year (13)" id="2' + cellId + '" name="yearRadios">';
	  	    htmlelement += '           <label for="2' + cellId + '"><span></span> Two-digit year (13)</label>';
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
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	 	for( i in page.components){
	            if(page.components[i].id == this.id){
	                TableComp = page.components[i];
	            }
	        }
	  	   var selectedCell = TableComp.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
	  	    
		  	
	  		if (event.data != undefined) {
	  			//$("#"+this.editor.id).removeClass("currency-"+this.contentFormat.currencyType+"-Symbol");
	  			//$("#"+this.answer.id).removeClass("currency-"+this.contentFormat.currencyType+"-Symbol");
		 		if(event.data.type== "dollar"){
		 			this.contentFormat.currencyType="dollar";
		 			this.contentFormat.symbol="$";
		 			$("#currencySelector"+cellId).html("US, Dollar ($) <span class='caret caretDrop'></span>");
		 		}else if(event.data.type== "euro"){
		 			this.contentFormat.currencyType="euro";
		 			this.contentFormat.symbol="€";
		 			 $("#currencySelector"+cellId).html("EU, Euro (&#8364;) <span class='caret caretDrop'></span>");
		 		}else if(event.data.type== "yen"){
		 			this.contentFormat.currencyType="yen";
		 			this.contentFormat.symbol="¥";
		 			 $("#currencySelector"+cellId).html("Japan, Yen (&#165;) <span class='caret caretDrop'></span>");
		 		}else if(event.data.type== "pound"){
		 			this.contentFormat.currencyType="pound";
		 			this.contentFormat.symbol="£";
		 			 $("#currencySelector"+cellId).html("UK, Pound (&#163;) <span class='caret caretDrop'></span>");
		 		}
		 		$("#"+cellId+" div").removeClass();
	 			
		 		$("#"+cellId+" div").addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
	 			TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html());
	             $(selectedCell).data("change",true);
	            
	 		//	$("#"+this.answer.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
		 		if($("#currencySelector"+cellId).parent().hasClass("open")){
		 			$("#currencySelector"+cellId).parent().removeClass("open");
		 		}
		 		//question.activePage.doLayout();
	 		 } 
	  	},
	  	/**
	  	 * changes date format in Content Format - Date.
	  	 */
	  	changeDateFormat: function (event) {
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	 	for( i in page.components){
	            if(page.components[i].id == this.id){
	                TableComp = page.components[i];
	            }
	        }
	  	   var selectedCell = TableComp.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
	  	    
	  	    if (event.data != undefined) {
	  	    	 $("#"+cellId+" div").removeClass();
	  	    	$("#"+cellId+" div").html("");
               
	  	        if (event.data.type == "monthDayYear") {
	  	            this.contentFormat.dateFormat = "monthDayYear";  	            
	  	            $("#dateType" + cellId).html("Month/Day/Year <span class='caret caretDrop'></span>");
	  	            $("#"+cellId+" div").html("mm/dd/yy");
	  	          //$('#'+cellId).attr('data-placeholder', 'Student entry mm/dd/yy');
	  	        } else if (event.data.type == "dayMonthYear") {
	  	            this.contentFormat.dateFormat = "dayMonthYear";
	  	            $("#dateType" + cellId).html("Day/Month/Year <span class='caret caretDrop'></span>");
	  	            $("#"+cellId+" div").html("dd/mm/yy");
	  	         // $('#'+cellId).attr('data-placeholder', 'Student entry dd/mm/yy');
	  	        }
	  	      this.contentFormat.updateFormatter();
	  	        if ($("#dateType" + cellId).parent().hasClass("open")) {
	  	            $("#dateType" + cellId).parent().removeClass("open");
	  	        }
	  	      TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html());
	             $(selectedCell).data("change",true);
	  	    }
	  	},
	  	/**
	  	 *changes year format in Content Format - Date.
	  	 */
	  	changeYearFormat: function (event) {
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	    if (event.data != undefined) {
	  	        if (event.data.type == 4) {
	  	            this.contentFormat.yearFomat = 4;
                  if (this.contentFormat.dateFormat=='monthDayYear') {
                    this.contentFormat.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{4})$/;
                  }
                  else{
                    this.contentFormat.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{4})$/;
                  }
	  	        } else if (event.data.type == 2) {
	  	            this.contentFormat.yearFomat = 2;
                  if (this.contentFormat.dateFormat=='monthDayYear') {
                    this.contentFormat.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{2})$/;
                  }
                  else{
                    this.contentFormat.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{2})$/;
                  }
	  	        }
	  	      //this.contentFormat.updateFormatter();
	  	    }
	  	},
	  	/**
	  	 * check-uncheck show percent checkbox.
	  	 */
	  	changePercentSymbol: function () {
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	    if ($('#showPercentLabelBtnId' + cellId).prop('checked')) {
	  	        this.contentFormat.showSymbol = true;
	  	        $("#"+cellId + " div").addClass("percentSymbol");
				$("#"+this.answer.id).addClass("percentSymbol");
	  	    } else {
	  	        this.contentFormat.showSymbol = false;
	  	        $("#"+cellId + " div").removeClass("percentSymbol");
				$("#"+this.answer.id).removeClass("percentSymbol");
	  	    }


        for( i in page.components){
          if(page.components[i].id == this.id){
            TableComp = page.components[i];
          }
        }
        var selectedCell = TableComp.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
          
        TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html());
        $(selectedCell).data("change",true);
	  	},
	  	/**
	  	 * check-uncheck show separator checkbox.
	  	 */
	  	showSeparator: function () {
	  		var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
	  	    if ($('#showSeparatorLabelBtnId' + cellId).prop('checked')) {
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
         * populate component properties
         */
	     populateComp: function () {
	    	 if(this.contentFormat.type == ""){
	    		 return false;
	    	 }
	    	  var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
          var htmlProp = this.editorPropertyLayout();
           if(htmlProp != ""){
	           $("#CellComponentSpecificProperties").html(htmlProp);
             this.afterPropertyLayout();
           }
	         //TODO: do conditional check obj population for subType
	         //$("#elementProperties").hide();
	         //$("#properties").show();

	         if (this.subType === 'label') {
	             $("#mode").html("Label<span class='caret caretDrop'></span>");
	         } else if (this.subType === 'inputField') {
	             $("#mode").html("Input field <span class='caret caretDrop'></span>");
	         } else if (this.subType === 'fillInTheBlank') {
	             $("#mode").html("Fill in the blank <span class='caret caretDrop'></span>");
	         }

	         if (this.graded == true) {
	             $('#gradadedObjectBtnId' + cellId).prop('checked', true);
	         } else {
	             $('#gradadedObjectBtnId' + cellId).prop('checked', false);
	         }

	         if (this.acceptAnyAnswer == true) {
	             $('#acptAnyAnsBtnId' + cellId).trigger('click');
	             $('#acptAnyAnsBtnId' + cellId).prop('checked', true);
	         } else {
	             $('#acptAnyAnsBtnId' + cellId).prop('checked', false);
	         }
	         if (this.mandatory == true) {
	             $('#optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);
	         } else {
	             $('#optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).prop('checked', true);
	         }

	         if($("#optionDropDownId").is(":visible")){
					if($("#optionDropDownId").parent().hasClass("open")){
						$("#optionDropDownId").trigger("click");
					}
					$("#optionDropDownId").hide();
				}
              $("#mediaProperties").hide();
              
             this.afterEditorPropertyLayout();
	     },
       
        
       /* *//**
         * add input field component to page
         *//*
        addTableInputFieldComponent:function(){
        	page.addTableInputFieldComponent();
        },
        *//**
         * creates copy of the current checkbox component
         * @param event
         *//*
        copyTableInputFieldComponent : function(event){
            var	id = event.data.id;
        	//page.copyComponent(id);
        },
        *//**
         * remove the checkbox component
         * @param event
         *//*
        removeComponent:function(event){
        	page.deleteComponent(event.data.id);
        },*/
        /**
         * constructs the InputFieldComponnet from json object
         * @param jsonObj
         * @returns {TableInputFieldComponent}
         */
        deserialize:function(jsonObj){
        	var compObj= new TableInputFieldComponent(jsonObj);
        	var editor=new Editor(jsonObj.editor);
        	compObj.setEditor(editor);
        	var studentEntryArr = new Array();
        	var studentEntry =new TableStudentEntry(jsonObj.studentEntries[0]);
    		var studentEntryEditor=new Editor(jsonObj.studentEntries[0].editor);
    		studentEntryArr.push(studentEntry);
			var contentFormat = null;
			var conentFormatter =jsonObj.contentFormat;
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
        if (conentFormatter.yearFomat == 4) {
            conentFormatter.yearFomat = 4;
            if (conentFormatter.dateFormat=='monthDayYear') {
              conentFormatter.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{4})$/;
            }
            else{
              conentFormatter.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{4})$/;
            }
        } else if (conentFormatter.yearFomat == 2) {
            conentFormatter.yearFomat = 2;
            if (conentFormatter.dateFormat=='monthDayYear') {
              conentFormatter.regExp = /^(0[1-9]|1[012])[-\/.](0[1-9]|[12][0-9]|3[01])[- \/.]([0-9]{2})$/;
            }
            else{
              conentFormatter.regExp = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.]([0-9]{2})$/;
            }
        }
				//contentFormat.updateFormatter();
			} else if (conentFormatter.type == "time") {
				contentFormat= new ContentFormatEnum(conentFormatter).TIME;
			}
			compObj.setContentFormat(contentFormat);
			studentEntry.setContentFormat(contentFormat);
			studentEntry.setEditor(studentEntryEditor);
			compObj.setStudentEntries(studentEntryArr);
			var answer=new Editor(jsonObj.answer);
			compObj.setAnswer(answer);
     		var generalFeedback = new Editor(jsonObj.generalFeedback);
        	var overallFeedback = new Editor(jsonObj.overallFeedback);
        	compObj.setGeneralFeedback(generalFeedback);
        	compObj.setOverallFeedback(overallFeedback);
        	return compObj;
        },
       
	     /**
	      * opens help modal popup for input field component
	      * @param event
	      */
	     openHelpModalForTableInputFieldComponent : function(event){
	    	 new Modal({id : 1,headingText : message.getInputFieldCompHeading(),containtText : message.getInputFieldCompMsg()}).openHelpModal();
	     },
	     /**
	       * updates editor properties
	       */
	     updateEditor: function (event) {
	    	 	var cellId = event.data.cellId;
				if (this.contentFormat.type == "alphanumeric") {
					var maxLength = $("#txtmaxLenght_" + cellId).val();
					if( maxLength != '' ) {
						maxLength = parseInt(maxLength.replace(/[^0-9]+/g, ""));
					}
					this.editor.maxLength = maxLength;
					this.studentEntries[0].editor.maxLength = maxLength;
					if(this.editor.maxLength>15000){
						var editor ="#txtmaxLenght_" +cellId;
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
					$("#txtmaxLenght_" + cellId).val(displayMaxLengthValue);
				} else if (this.contentFormat.type == "number") {
					var decimalPlaces =$("#txtdecimal_"+cellId).val();
					
					this.contentFormat.decimalPlaces = decimalPlaces.trim().length>0?parseFloat(decimalPlaces.trim()):2;
					if(this.contentFormat.decimalPlaces<0 && this.contentFormat.decimalPlaces>6){
						var editor ="#txtdecimal_" +cellId;
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
					
					/*var answerText = this.answer.text;
					answerText = this.roundOff(parseFloat(answerText),this.contentFormat.decimalPlaces);
					$("#" + cellId).text(answerText);*/
					
					this.contentFormat.showThousandSeparator = $('#showSeparatorLabelBtnId'+cellId).prop('checked');
				} else if (this.contentFormat.type == "currency") {
				} else if (this.contentFormat.type == "percentage") {
					var decimalPlaces =$("#txtdecimal_"+cellId).val();
					
					this.contentFormat.decimalPlaces = decimalPlaces.trim().length>0?parseFloat(decimalPlaces.trim()):2;
					if(this.contentFormat.decimalPlaces<0 && this.contentFormat.decimalPlaces>6){
						var editor ="#txtdecimal_" +cellId;
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
					this.contentFormat.showSymbol = $('#showPercentLabelBtnId'+cellId).prop('checked');
				} else if (this.contentFormat.type == "date") {
					this.contentFormat.yearFomat = $("#4"+cellId).prop("checked");
					this.contentFormat.yearFomat = $("#2"+cellId).prop("checked");
				} else if (this.contentFormat.type == "time") {
				}       
	      },
	     /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
         afterLayout:function(){
        	    //$("#CellComponentSpecificProperties").html(this.editorPropertyLayout());
        		this.populateComp();
        		TableInputFieldComponent.addEvent( "genFbTxt"+this.idPrefix+this.id+this.cellId, "click", this._toggleFeedback );
        		 if(this.subType!='label'){
        			TableInputFieldComponent.addEvent( this.generalFeedback.id, "click", this._populateGFEditorProperties );
             		TableInputFieldComponent.addEvent( this.overallFeedback.id, "click", this._populateOFEditorProperties );
             		TableInputFieldComponent.addEvent( this.generalFeedback.id, "blur", this._update,{editor: this.generalFeedback} );
             		TableInputFieldComponent.addEvent( this.generalFeedback.id, "paste", this._filter);
             		TableInputFieldComponent.addEvent( this.overallFeedback.id, "paste", this._filter);
             		TableInputFieldComponent.addEvent( this.overallFeedback.id, "blur", this._update,{editor:this.overallFeedback} );
             	 }
             	
        		//TableInputFieldComponent.addEvent( "quest_plus_"+this.id, "click", this._copyTableInputFieldComponent,{id : this.id});
        		//TableInputFieldComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        		//TableInputFieldComponent.addEvent("acptAnyAnsBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._acceptAnyAnswer);
        		//TableInputFieldComponent.addEvent("gradadedObjectBtnId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markGraded);
        		TableInputFieldComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory,{id : this.id});
        		TableInputFieldComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._markMandatory, {id : this.id});
        		TableInputFieldComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._collapseComponent);
            	this.updateAnswerLayout(this.acceptAnyAnswer);
            	 if(this.state=="collapse"){
            		 this.collapseComponent();
            	 }
            	 TableInputFieldComponent.addEvent("saveBtn_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._validateAnswer,{id:this.answer.id} );
            	 
         },
         /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLayout:function(){
        	 console.log("instructor");
        	 var htmlelement="";
        	 htmlelement+= this.studentLayout(this.acceptAnyAnswer,this.graded);
     		 return htmlelement;
         },
         /**
          * add event handlers to html elements after the layout done in Preview
          * @returns {String}
          */
         afterInstructorLayout:function(){ 
        	 this.afterStudentLayout();
         },
         /**
          * layouts in student test mode
          * @returns {String}
          */
         studentLayout:function(accept,graded){
        	 var htmlelement="";
        	
        	 htmlelement+='<div  class="rowPagesectionStudent mainQuestionSection stdmainQuestionSection rowPagesectionStudentTbl" >';
     		 var i=0;
     		 for( i in this.studentEntries){
     			 this.studentEntries[i].contentFormat = this.contentFormat;
          htmlelement +=this.studentEntries[i].studentLayout(accept,graded);
         	 }
     		 htmlelement+='</div>';
     		 return htmlelement;
         },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterStudentLayout:function(){ 
        	 var i=0;
     		 for( i in this.studentEntries){ 
     			this.studentEntries[i].afterStudentLayout();
	   		 }
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
         postSubmissionReviewLayout:function(showNotApplicable){
        	var htmlelement="";
        	htmlelement+='<div class="mainQuestionSection rowPagesectionStudentTbl" >';
     		var i=0;
 			for( i in this.studentEntries){ 
 				htmlelement+= this.studentEntries[i].postSubmissionReviewLayout(this.acceptAnyAnswer,showNotApplicable,this.graded);
 	   		}
     		htmlelement+='</div>';
     		return htmlelement;
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
         /*calculateScore:function(){
         },*/
         /**
          * mark as accept any answer
          */
         acptAnyAnswer:function(){	
        	var cellId = this.pageIdPrefix + this.pageId+ this.idPrefix + this.id + this.cellId;
        	var flag=false;
		 	if ($("#acptAnyAnsBtnId" + cellId).prop("checked")) {
		 		flag = true;
			} else {
				flag = false;
			}
		 	this.acceptAnyAnswer = flag;
		 	this.updateAnswerLayout(this.acceptAnyAnswer);
 	     },
         /**
          * validate if component is filled
          */

         validateComponent:function(object){
        	 $(".clickableUi").removeClass("clickableUi cellBorder greenBorder");
	    	 var i=0;
	         var isComplete=true;
	         var contentFormatError={};
	         var validFormat=true;
	           
	         if(this.acceptAnyAnswer == false){
	        	 var validatorObj = this.isAnswerFilled();
	        	  if(validatorObj.message !=undefined){
					  validFormat=false;
					  contentFormatError.message=validatorObj.message;
					  contentFormatError.field=validatorObj.field;
	        	  }else{
	        		  isComplete=isComplete && validatorObj.status; 
	        	  }
				  if(this.answer.text == ""){
				    isComplete = false;
				  }
	              if(!isComplete){
	            	  object.flag = true;
	            	  object.completeFlag = true;
	            	  object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id 
	                                                   + " Cell : "+this.cellId; 
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
	           }
			return object;
        },
        isAnswerFilled:function(){
	  		var isFilled = {status:true};
	  	
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
	  		return isFilled;	   
	  	},
        validateAnswer:function(e){
        	if (e.data.id == this.answer.id) {
				var ansId = this.answer.id;
				var text = $('#' + this.answer.id).text().trim();
				if (text == "") {
					text = $('#' + this.answer.id).val().trim();
					if (text == "") {
						new Modal({
							id : 1,
							headingText : "Validation Error",
							containtText : "Please fill all fields",
							closeActionEvent : function() {
								$("#" + ansId).focus();
							}
						}).getWarningModal();
						return false;
					}
				} else {
					if (this.contentFormat.type == 'number'
							|| this.contentFormat.type == 'percentage') {
						text = text.replace(/,/g, '');
					}
				}
				var valid = this.isValidAnswerOrStudentResponse(text);
				if (!valid || valid == "") {
					var editorId = e.data.id;
					new Modal({
						id : 1,
						headingText : "Validation Error",
						containtText : "Content is in wrong format",
						closeActionEvent : function() {
							$('#' + editorId).trigger("focus");
						}
					}).getWarningModal();
				} else
					this.updateAnswer();
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
        /*isValidAnswerOrStudentResponse:function(text){
      	  if(this.contentFormat.type=='number' || this.contentFormat.type=='percentage'){
      		  text=text.replace(/,/g,'');  
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
        },*/
       
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
        	var $snap = $("#componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId);   	
        	var $comp = $("#compBody_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId);
        	var tooltip=$snap.find("img");
        	if($comp.is(":visible")){
        		$comp.hide('slow');
        		$snap.find("img").attr("src","img/comp-plus.png");
        		// added tooltip to image comp-plus.png        		
        		tooltip.attr("title","Expand");
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).removeClass("invisible");
        		$comp.prev().hide();
        		$("#componentHeaderid"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).hide();
        		this.state="collapse";
        	}else{
        		$comp.show('slow');
        		$snap.find("img").attr("src","img/comp-minus.png");
        		tooltip.attr("title","Collapse");
        		$("#componentHeaderid"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).show();
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId).addClass("invisible");
        		$comp.prev().show();
        		this.state="expand";
        	}
        },  
               
       
       /**
        * add Input Field component to page
        */
       addTableInputFieldComponent:function(){
      // 	page.addTableInputFieldComponent();
       },
       /**
        * creates copy of the current input Field component
        * @param event
        */
       copyTableInputFieldComponent : function(event){
           var	id = event.data.id;
       	//page.copyComponent(id);
       },
       /**
        * remove the input Field component
        * @param event
        */
       removeComponent:function(event){
       	//page.deleteComponent(event.data.id);
       },
       /**
		 * check if question is answered
		 */

       isStudentAnswered:function(){
           var i=0;
           var validflag=true;
           if(this.isMandatory()){
               if(this.acceptAnyAnswer){
            	   for( i in this.studentEntries){
        	    	   var txt=this.studentEntries[i].editor.text.replace(/<\/?span[^>]*>/g,"");
        	       		validflag=validflag && txt.length>0;
        	       		if(validflag){
        	       		   var text=txt; 
        	       		   if(text!=""){
        						   if(this.studentEntries[i].contentFormat.type=='number' || this.studentEntries[i].contentFormat.type=='percentage'){
        							   text=text.replace(/,/g,'');
        				    	   }
        						   text=text.trim();
        					   }
        	       			validflag= this.studentEntries[i].isValidAnswerOrStudentResponse(text);
        	       			
        	       			if(!validflag){
        	       				//this.studentEntries[i].validateStudentResponse({data:{id:this.studentEntries[i].editor.id}});
        	       				break;
        	       			}
        	       		}
        	 		} 
               }
           }
	      
			return validflag;
       },
        
       /**
		 * check if question is answered
		 */

       validateStudentQuestionLayout:function(){
            var validflag=false;
            if(this.subType=='label'){
            	validflag= true;
            }else if(this.mandatory){
            	for( i in this.sections){
    				validflag= this.sections[i].isStudentAnswered();
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
  		   totalCorrectAnswers +=this.studentEntries.length;
        
         var weightage = 1/totalCorrectAnswers;
         var totalCrctAnsrGvnByStdnt =0;
         var totalWrngAnsrGvnByStdnt=0;
         var j=0;
        	
         totalCrctAnsrGvnByStdnt +=this.calTotalCrctAnswersGivenByStudent();
         totalWrngAnsrGvnByStdnt +=this.calTotalWrngAnswersGivenByStudent();
         if(this.graded){
      		  var totalScore=(totalCrctAnsrGvnByStdnt*weightage) ;
            if(isNaN(totalScore) || totalScore<0 ){
        			totalScore=0;
        		}
            return totalScore;
      	 }
       },
       calTotalCrctAnswersGivenByStudent:function(){
          var count=0;
             var i=0;
             var correctFlag=false;
             for( i in this.studentEntries){
               if(this.studentEntries[i].isCorrectAnswerGiven(this.acceptAnyAnswer,this.answer)){
                 correctFlag=true;
               }else{
                 correctFlag=false;
               }
               count +=(correctFlag)?1:0;
             }
          return count;
        }, 
         /**
         * calculate Correct Answers
         */
         calTotalWrngAnswersGivenByStudent:function(){
          var count=0;
             var i=0;
             var correctFlag=false;
             for( i in this.studentEntries){
               if(this.studentEntries[i].isCorrectAnswerGiven(this.acceptAnyAnswer, this.answer)){
                 correctFlag=true;
               }else{
                 correctFlag=false;
               }
               count +=(!correctFlag)?1:0;
             }
          return count;
        },

  	 /**
        * changeFormatter student entry
        */
   	  changeFormatter:function(event){
        //var compId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id;
        var i=0;
        var TableComp = null;
        for( i in page.components){
            if(page.components[i].id == this.id){
                TableComp = page.components[i];
            }
        }
        
        var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
        var selectedCell = TableComp.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
        var selectedMeta = TableComp.itsTableInstance.getCellMeta(selectedTableCells[0],selectedTableCells[1]);
        
   		 if (event.data != undefined) {
    			var formatterEnum =new ContentFormatEnum();    			
    			$("#CellComponentHyperLinkProperties").hide();
    		if(event.data.type== "alphanumeric"){
   	 			this.contentFormat=formatterEnum.ALPHANUMERIC;
   	 			 $("#formatter").html("Alphanumeric <span class='caret caretDrop'></span>");
   	 			 $("#CellComponentHyperLinkProperties").show();
   	 			 //$("#entryType").css("height","");
   	 		}else if(event.data.type== "number"){
   	 			 this.contentFormat=formatterEnum.NUMBER;
   	 			 $("#formatter").html("Number <span class='caret caretDrop'></span>");
   	 		}else if(event.data.type== "currency"){
   	 			this.contentFormat=formatterEnum.CURRENCY;
   	 			 $("#formatter").html("Currency <span class='caret caretDrop'></span>");
   	 		}else if(event.data.type== "percentage"){
   	 			this.contentFormat=formatterEnum.PERCENTAGE;
   	 			 $("#formatter").html("Percentage <span class='caret caretDrop'></span>");
   	 			
   	 		}else if(event.data.type== "date"){
   	 			this.contentFormat=formatterEnum.DATE;
   	 			 $("#formatter").html("Date <span class='caret caretDrop'></span>");
   	 		}else if(event.data.type== "time"){
   	 			this.contentFormat=formatterEnum.TIME;
   	 			 $("#formatter").html("Time <span class='caret caretDrop'></span>");
   	 		} 
        //this.contentFormat.updateFormatter();
    		 $("#"+cellId+" div").removeClass();
    		 $("#"+cellId+" div").html("");
   	 		if(event.data.type== "currency"){
               
                
                $("#"+cellId+" div").addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
                //$("#"+cellId+" div").html("$");
               
   	 			
                //$("#"+this.answer.id).addClass("currency-"+this.contentFormat.currencyType+"-Symbol");
   	 		}else if(event.data.type== "percentage"){ 
                if(this.contentFormat.showSymbol){
                	//$("#"+cellId+" div").removeClass();
                   // $("#"+cellId+" div").html("");
                    $("#"+cellId+" div").addClass("percentSymbol");
                    //$("#"+cellId+" div").html("%");
                    
                 }
            }else if(event.data.type== "date"){
                if(this.contentFormat.showSymbol){
                    // $("#"+cellId).removeClass();
                    // $("#"+cellId+" div").html("");
                     $("#"+cellId+" div").html("dd:mm:yy");
                     
                 }
            }else if(event.data.type== "time"){ 
                if(this.contentFormat.showSymbol){
                  //   $("#"+cellId).removeClass();
                     $("#"+cellId+" div").html("hh:mm:ss");
                     
                 }
            }
            else{
   	 			//$("#"+cellId).removeClass();
   	 			//$("#"+cellId).addClass("inputDummy studentEntryInput-1");
   	 			//$("#"+this.answer.id).removeClass();
   	 			//$("#"+this.answer.id).addClass("inputDummy");
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
   	 	    TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html());
         	$(selectedCell).data("change",true);
         	selectedMeta.readOnly = true;
   			//question.activePage.doLayout();
   	 		this.populateComp();
   			//this.populateEditorProperties();
   			//this.contentFormatSpecificLayout();
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
   	 			 this.showCautionIcon(cellId,"changeFormat");
   	 		}else{
   	 			this.hideCautionIcon(cellId);
   	 		}
   			return false;
   		 }             
        },
        /***
      	 * Function to show Caution Icon near Formula when Any Formula is affected 
      	 * @param studentEntryId{String} : studentEntryId
      	 * @param source {String} : Source for showing caution icon. It may be "removeEntry" or "changeFormat"
      	 */
    	showCautionIcon : function(studentEntryId, source){
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
    				}
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
    	}
	};  
