/* table related global variables */
var selectedTableRange = "";
var selectedTableCells = "";
var isMultipleCellsMerge = false;

/* ========================================================================
 * TableComponent: Object Declaration
 * ========================================================================
 * Purpose of this object to have all table component specific properties like 
 * labels, fields and table features such as merge, unmerge, add / delete rows/ columns
 * general feed back editor, overall feedback editor
 * for this component
 * ======================================================================== */
var TableComponent = function(options){ 	
	$.extend(TableComponent.prototype, new Component(options));	
	this.type='table';
	this.subType='label';
	this.RowReadOnly = true;
    this.isCellReadonly=false;
    this.cellId = null;
	this.tableData = [];
    this.tableCellData = [];
    this.cellHTMLCollection = [];
    this.cellComponentCollection = [];
    this.colWidth = [];
	this.itsTableInstance = null;
	this.rowCount = 5;
	this.colCount = 7;
	this.studentRowCount = 5;
	this.studentColCount = 7;
	this.authorEntries = [];
	this.showNotApplicable = false;
	this.notApplicableFlag = false;
	this.isUnlockRows = false;
	this.mergedCellInfoCollection = [];
	this.oldMergedCellInfoCollection = [];	
	this.showTableId = false;
	this.CustomBorders = [];
	$.extend(this, options);
	this._toggleFeedback = TableComponent.BindAsEventListener( this, this.toggleFeedback );
	this._populateGFEditorProperties = TableComponent.BindAsEventListener( this, this.populateGFEditorProperties );
	this._populateOFEditorProperties = TableComponent.BindAsEventListener( this, this.populateOFEditorProperties );
	this._update = TableComponent.BindAsEventListener( this, this.update );
	this._populateComp = TableComponent.BindAsEventListener( this, this.populateComp );
	this._preventPopulateComp = TableComponent.BindAsEventListener( this, this.preventPopulateComp );
	this._addTableComponent=TableComponent.BindAsEventListener( this, this.addTableComponent );
	this._copyTableComponent=TableComponent.BindAsEventListener( this, this.copyTableComponent );
	this._removeComponent=TableComponent.BindAsEventListener( this, this.removeComponent );
	this._updateGeneralFeedbackEditor= TableComponent.BindAsEventListener( this, this.updateGeneralFeedBackEditor );
	this._updateOverallFeedBackEditor= TableComponent.BindAsEventListener( this, this.updateOverallFeedBackEditor );
	this._splitCells = TableComponent.BindAsEventListener( this, this.splitCells );
	this._mergeCells = TableComponent.BindAsEventListener( this, this.mergeCells );
	this._changeSubType = TableComponent.BindAsEventListener( this, this.changeSubType);
	this._filter =TableComponent.BindAsEventListener( this, this.filter );
	this._collapseComponent = TableComponent.BindAsEventListener( this, this.collapseComponent);
	this._updateTableDimensions= TableComponent.BindAsEventListener( this, this.updateTableDimensions );
    this._onTableClik= TableComponent.BindAsEventListener( this, this.onTableClik );
    this._showCellId = TableComponent.BindAsEventListener( this, this.showCellId );
	this._changeFormatter=TableComponent.BindAsEventListener( this, this.changeFormatter );
	this._notApplicableOptionValue=TableComponent.BindAsEventListener( this, this.notApplicableOptionValue );
	this._unlockRows=TableComponent.BindAsEventListener( this, this.unlockRows );
	this._markTableNotApplicable = TableComponent.BindAsEventListener( this, this.markTableNotApplicable);
	this._addRowStudent = TableComponent.BindAsEventListener(this, this.addRowStudentLayout);   
	this._removeRowStudent = TableComponent.BindAsEventListener(this, this.removeRowStudentLayout);
};

//add event helper method on element id
TableComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
TableComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
TableComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableComponent.prototype = { 
		/**
		 * gets type of Table component
		 * @returns  id
		 */
		getType : function(){
			return this.type;
		},
		/**
	     * sets type of Table component
	     * @param id
	     */
		setType : function(type){
			this.type = type;
		},
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
        getFullComponentId: function(){
        	return this.pageIdPrefix + this.pageId+ this.idPrefix + this.id;
        },
    
         /**
          * updates text of content editable divs to the object's editor text
          */
         update:function(event){
        
        	var compId = this.pageIdPrefix + this.pageId+ this.idPrefix + this.id;
        	var nrows = this.rowCount;
        	var ncols = this.colCount;
        	var i,j;
        	for (i = 0; i < nrows; i++) {   		     
   		     for (j = 0; j < ncols; j++) {
   		    	var selectCell = this.itsTableInstance.getCell(i,j); 
   		    	$(selectCell).data("change",true);
   			}   		     
   		   }
        	$("#SpreadsheetTable_"+compId).handsontable('render');
        	
        	if(typeof arguments[0] != "undefined" && arguments[0]){
        		this.instructorCellsComponentsUpdates();
        	}
        	
        	this.generalFeedback.update();
     		this.overallFeedback.update();
     		if(event!=undefined){
     			question.updateFormulaDestinations(event.data.editor.id,util.getFormulas(event.data.editor.textWithoutFormatting));
     			util.updateFormula(event.data.editor);
     		}
     		/*if(this.CustomBorders.length > 0){
          	   this.applyBordersOnRender(); 
             }*/
         	
         },
        
         /**
          * layouts in design mode
          * @returns {String}
          */
         layout:function(){        	 
             var htmlelement="";
        	 htmlelement+='<div class="pageSection" style="" id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" ><span class="compMove_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"></span>';
        	 htmlelement+='<div class="pageInnerSection">';
        	 htmlelement+='<div class="pageSectionHeader"><p></p> <span id="componetCollapseSpan_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> <img src="img/comp-minus.png" title="Collapse"> </span><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead invisible" style="padding-left: 260px"> Component: Table </span><h6 class="pull-right font10" >ID #'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'</h6><p></p></div>';
             htmlelement+='<h2 id="componentHeaderid'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead"></a>Component: Table'+'</h2>';        	
             
        	 htmlelement+='<div style="display: table-cell;" id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"  class="pageSectionBody">';
        	 htmlelement+='<div  class=" ">';
             htmlelement+='<div class="btn-group btn-toggle" id="toggle_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
             htmlelement+='   <button id="btnOn_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="btn btn-xs btn-default">ON</button>';
             htmlelement+='   <button id="btnOff_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"  class="btn btn-xs btn-primary active">OFF</button>';
             htmlelement+='</div>';
             htmlelement+='<div id="hideIdText_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="display:inline-block; margin-left:15px;">View IDs</div>';
             
        	 htmlelement += '<div style="display: table-cell; width:786px; "  id="SpreadsheetTable_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="spreadsheettableWrapper" data-compid="'+this.id+'"></div>';
         	 htmlelement+='<div class="clear"></div>';
         	 htmlelement+='</div>';
         	 htmlelement+='<div class="clear"></div>';
         	 
         	 htmlelement+='<div id="CellComponenetsWrapper_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"></div>';
         	 
         	 htmlelement+='<div class="pageSectionFooter">';        	 
         	
         		 htmlelement+= this.feedbackLayout();
         	
         	 htmlelement+='<div class="clear"></div>';
         	 
         	 htmlelement+='</div>';
         	 
         	 htmlelement+='<div class="eachCol pull-right" style="margin-right:15px;">';
        	 htmlelement+='   <div style="display:block" class="plusBtn">';
        	 htmlelement+='      <a title="Copy Question" id="quest_plus_'+this.id+'"><img src="img/plus.png"></a>';
        	 htmlelement+='   </div>';
        	 htmlelement+='  <div class="minusBtn">';
        	 htmlelement+='       <a title="Delete Question" id="quest_minus_'+this.id+'"><img src="img/minus.png"></a>';
        	 htmlelement+='   </div>';
        	 htmlelement+='   <div class="clear"></div>';
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
        	 var notApplicableText="Exempts remainder for table";
             var htmlelement = '';
             htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
             htmlelement += '	<div class="componentTytle">';
             htmlelement += '		<a class="info-icon" id="TableComponentId' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '" ></a>Component Table:';
             htmlelement += '		<span id="TableRepresentId_' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + '" >ID '+this.pageIdPrefix + this.pageId + this.idPrefix + this.id+'</span>';
             htmlelement += '	</div>';
             var isBranchedLbl = "";
        	 /*check if component is used for branching*/
        	 if(this.isBranched){
        		 isBranchedLbl="This component is branched";
        	 }
        	 htmlelement+='     <div class="componentTytle" id="isBranchedLabel_'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">'+isBranchedLbl+'</div>';
             
             htmlelement+=' <div id="rbtnLabel" class="grid grid-3"> ';                                  
        	
        	 htmlelement+='<div class="form-group form-input">';
        	 htmlelement+='<span>Rows: </span>';
	       	 htmlelement+='<input type="Text" id="RowVal'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" value="'+this.rowCount+'" placeholder="5">';
        	 htmlelement+='</div>';  
        	 htmlelement+='<div class="form-group form-input" style="margin-left:5px;">';
        	 htmlelement+='<span>Columns: </span>';
			 htmlelement+='<input type="Text" id="ColVal'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" value="'+this.colCount+'" placeholder="7">';
        	 htmlelement+='</div>';
        	 
        	 htmlelement+='<button id="UpdateTable_'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="button">Update</button>';
        	 htmlelement+='<div>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
        	 htmlelement+='   <div id="studentOpts" class="studOptGrid">';
        	 htmlelement+='  		<span id="unlockRows">';
        	 htmlelement+=' 			<input type="checkbox" id="unlockRowsInput'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+=' 			<label for="unlockRowsInput'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Unlock rows to allow student editing</label>'; 
        	 htmlelement+='			</span>';
        	 htmlelement+='  		<span id="notApplicableOptionId">';
        	 htmlelement+=' 			<input type="checkbox" id="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+='				<label for="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Not applicable option<br><i style="font-size: 11px; margin-left: 15px;">'+notApplicableText+'</i></label>'; 
        	 htmlelement+='			</span>';
        	 htmlelement+='	  </div>';
             return htmlelement;
         },
         cellPropertyLayout : function(cellId){
        	 var componentId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id;
             var htmlelement = '';
             htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
             htmlelement += '	<div class="componentTytle">';
             htmlelement += '		<a class="info-icon" id="TableComponentHelpId' + componentId + '" ></a>Table Cell:';
             htmlelement += '		<span id="CellDisplayRange_' + componentId + '" class="dispCellRange"></span>';
             htmlelement += '		<span id="CellRepresentId_' + componentId + '" style="visibility:hidden"></span>';
             htmlelement += '	</div>';
             
             if (this.subType == 'label') {
            	 htmlelement += ' <div class="data_component" style="height:100px">';
             }else{
            	 htmlelement += ' <div class="data_component">';
             }
             
             htmlelement += '<div class="grid grid-2">';
             htmlelement += '	<input type="checkbox" id="MergeCellsBtnId_' + componentId + '">';
             htmlelement += '	<label for="MergeCellsBtnId_' + componentId + '"><span></span>Merge Cells</label>';
             htmlelement += '</div>';
             htmlelement += '<div class="clear"></div>';
             htmlelement += '<div class="tabContent tabProContent tabProContent-2">';                 
             htmlelement += '		<div class="grid grid-2">';
             htmlelement += '			<span>';
             htmlelement += '			<input type="checkbox" id="SplitCellsBtnId_' + componentId + '">';
             htmlelement += '			<label for="SplitCellsBtnId_' + componentId + '"><span></span>Split Cells</label>';
             htmlelement += '			</span>';
             htmlelement += ' 		</div>';
             htmlelement += '</div>';
             htmlelement += '<div class="clear"></div>';
             
             
             htmlelement += '	<div class="componentTytle">';
             htmlelement += '		<a class="info-icon" id="TableCellComponentHelpId' + componentId + '" ></a>Cell component: ';
             htmlelement += '	</div>';
             
             htmlelement += '       <div class="tabContent">';
             htmlelement += '           <div class="btn-group customDropdown">';
             htmlelement += '                <button data-toggle="dropdown" id="mode_'+componentId+'" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
             htmlelement += '                    Label<span class="caret caretDrop"></span>';
             htmlelement += '                </button>';
             htmlelement += '                <ul class="dropdown-menu">';
             htmlelement += '                    <li id="label' + componentId + '"><a>Label</a>';
             htmlelement += '                    </li>';
             htmlelement += '                    <li class="divider"></li>';
             htmlelement += '                    <li id="inputField' + componentId + '"><a>Input field</a>';
             htmlelement += '                    </li>';           
             
             htmlelement += '                    <li class="divider"></li>';
             htmlelement += '                    <li id="CheckBox' + componentId + '"><a>Checkbox</a>';
             htmlelement += '                    </li>';
             
             htmlelement += '                    <li class="divider"></li>';
             htmlelement += '                    <li id="dropDown' + componentId + '"><a>Dropdown menu</a>';
             htmlelement += '                    </li>';
             
             htmlelement += '                </ul>';
             htmlelement += '           </div>';
             htmlelement += '      </div>';
             
             htmlelement += ' </div>';
             htmlelement += '</div>';
             htmlelement += '<div class="tabContent tabProContent tabProContent-2">';
             
             htmlelement += '	<div class="componentTytle">';
             htmlelement += '		<span id="TableCellComponenType_' + componentId + '" ></span>';
             htmlelement += '		<span id="TableCellComponenTypeId_' + componentId + '" ></span>';
             htmlelement += '	</div>';
             htmlelement += '</div>';
             
             htmlelement += '<div class="tabContent tabProContent tabProContent-2" id="CellComponentSpecificProperties">';
             htmlelement += '</div>';
             
             htmlelement += '</div>';
             return htmlelement;
         },
	     /**
	      * adds event hadlers for elements present in component property pane
	      */
	     afterPropertyLayout: function () {
	         TableComponent.addEvent(this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._populateComp);
	         TableComponent.addEvent("CellComponenetsWrapper_" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._preventPopulateComp);
	         TableComponent.addEvent("TableComponentHelpId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._openHelpModalForTableComponent);
	         TableComponent.addEvent("requiredQuestionId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._openHelpModalForRequiredQuestionSelector);
	         TableComponent.addEvent("answerTypeHelpId" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._openHelpModalForAnswerType);
	        
	         TableComponent.addEvent("optionsRadios1" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._markMandatory);
	         TableComponent.addEvent("optionsRadios2" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id, "click", this._markMandatory);	         
	         
	         TableComponent.addEvent("UpdateTable_"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._updateTableDimensions);

             TableComponent.addEvent("SpreadsheetTable_"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._onTableClik);
             TableComponent.addEvent("notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOptionValue);
             TableComponent.addEvent("unlockRowsInput"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._unlockRows);
      		
	     },
            	    
        /**
         * populate component properties
         */
	     populateComp: function (event) {
	    	
	    	$("#CellComponenetsWrapper_" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).html("");
	         $("#properties").html(this.propertyLayout());
	         this.afterPropertyLayout();
	         $("#elementProperties").hide();
	         $("#properties").show();
	         
	        // $("#properties").css("height","450px");// this line is causing the height issue for properties panel of option 

	         if (this.subType === 'label') {
	             $("#mode").html("Label<span class='caret caretDrop'></span>");
	         } else if (this.subType === 'inputField') {
	             $("#mode").html("Input field <span class='caret caretDrop'></span>");
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
	         if (this.mandatory == false) {
	             $("input[name=optionsRadios][value='Optional']").prop('checked', true);
	         } else {
	             $("input[name=optionsRadios][value='Required']").prop('checked', true);
	         }
	         
	         if (this.showNotApplicable == true) {
	        	 $('#notApplicableOption' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', true);
	         } else {
	        	 $('#notApplicableOption' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', false);
	         }
	         
	         if (this.isUnlockRows == true) {
	        	 $('#unlockRowsInput' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', true);
	         } else {
	        	 $('#unlockRowsInput' + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).prop('checked', false);
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
	     * prevent populate properties event
	     */
	     preventPopulateComp: function (event) {
	    	 if(event.target.tagName  != 'SPAN' || $( event.target ).parents()[1].className != 'radioOption')
    		 	event.preventDefault();
	    	 return true;
	     },
        /**
         * add input field component to page
         */
        addTableComponent:function(){
        	page.addTableComponent();
        },
        /**
         * creates copy of the current checkbox component
         * @param event
         */
        copyTableComponent : function(event){
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
         * constructs the TableComponent from json object
         * @param jsonObj
         * @returns {TableComponent}
         */
        deserialize:function(jsonObj){
        	//alert();
        	var compObj= new TableComponent(jsonObj);
        	compObj.authorEntries = [];
         	if(jsonObj.subType!='label'){
         		var generalFeedback = new Editor(jsonObj.generalFeedback);
            	var overallFeedback = new Editor(jsonObj.overallFeedback);
            	compObj.setGeneralFeedback(generalFeedback);
            	compObj.setOverallFeedback(overallFeedback);
         	}
         	compObj.tableCellData = jsonObj.tableCellData;
         	compObj.CustomBorders = jsonObj.CustomBorders;
         	
         	var compArr = compObj.cellComponentCollection;
         	for (i in compArr) {
    			var element = compArr[i];
    			var cellCompObj = null;
    			var cmpId = null;
    			if(element.component != ""){
    				var cmpType = element.component.type;
    				cmpId = element.id;
    				if (cmpType == "Checkbox") {
    					cellCompObj = new TableCheckboxComponent(element.component);
        			}else if (cmpType == "Dropdown menu") {
        				cellCompObj = new TableDropDownComponent(element.component);
        			}else if (cmpType == "Input field") {
        				cellCompObj = new TableInputFieldComponent(element.component);
        				var conentFormatter=element.component.contentFormat;
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
        				cellCompObj.contentFormat = contentFormat;	
                        var editor = new Editor(element.component.editor);
                        cellCompObj.setEditor(editor);
        				var answer=new Editor(element.component.answer);
        				cellCompObj.setAnswer(answer);
        				compObj.authorEntries.push(cellCompObj);
        			}
        			else if (cmpType == "Label") {
        				cellCompObj = new TableLabel(element.component);
        				var editor=new Editor(element.component.editor);
        				cellCompObj.setEditor(editor);
        			}
    				cellCompObj = cellCompObj.deserialize(cellCompObj);
    			}    			
    			if(cellCompObj != null && cmpId != null){
    				compObj.changeValById(compObj.cellComponentCollection, cmpId, "component", cellCompObj);
    			}
    		}
         	return compObj;
        },
       
	     /**
	      * opens help modal popup for input field component
	      * @param event
	      */
	     openHelpModalForTableComponent : function(event){
	    	 new Modal({id : 1,headingText : message.getInputFieldCompHeading(),containtText : message.getInputFieldCompMsg()}).openHelpModal();
	     },
	    
	     /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
         afterLayout:function(){
        	    this.initFeedbackEditor();
        	    $("#properties").html(this.propertyLayout());
        		this.populateComp();
        		TableComponent.addEvent( "genFbTxt"+this.idPrefix+this.id, "click", this._toggleFeedback );
        		 
             	TableComponent.addEvent( this.generalFeedback.id, "click", this._populateGFEditorProperties );
         		TableComponent.addEvent( this.overallFeedback.id, "click", this._populateOFEditorProperties );
        		TableComponent.addEvent( this.generalFeedback.id, "blur", this._update,{editor: this.generalFeedback} );
         		TableComponent.addEvent( this.generalFeedback.id, "paste", this._filter);
         		TableComponent.addEvent( this.overallFeedback.id, "blur", this._update,{editor:this.overallFeedback} );
         		TableComponent.addEvent( this.overallFeedback.id, "paste", this._filter);         		
        		
        		TableComponent.addEvent( "quest_plus_"+this.id, "click", this._copyTableComponent,{id : this.id});
        		TableComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        		TableComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseComponent);
                TableComponent.addEvent( "toggle_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._showCellId );
             
                var oldTableCellData = [];
                if(this.tableCellData.length > 0){
                	oldTableCellData = this.tableCellData;
                }
            	this.tableData = this.createSpreadsheetData(this.rowCount, this.colCount);
            	this.createSpreadsheetTable();
            	
            	 
            	if(oldTableCellData.length > 0){
            		this.itsTableInstance.loadData(oldTableCellData);
    			}
            	this.update();
            	
                if(this.state=="collapse"){
                     this.collapseComponent();
                }

                $('#formToolCanvasId').sortable({
                    items: '.pageSection',
                    handle: '.dragComp'
                });
                if(!this.RowReadOnly){
              	  $("#btnOn_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
                }
         },
         /**
          * layouts in instructor mode
          * @returns {String}
          */
         instructorLayout:function(){
        	 var htmlelement="";
        	 this.studentRowCount = this.studentRowCount > this.rowCount ? this.studentRowCount : this.rowCount;
        	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'_instructorTable" style=" margin-left: 75px;" class=" mainQuestionSection" >';
        	 if(this.showNotApplicable){
        		var notApplicableFlag = this.notApplicableFlag?"checked":"";
     			var disableCss= question.mode== MODE_TEST?"":'disabled';
     			htmlelement +='<div class="notApplicableDivPreview">';
     			htmlelement +='		<input type="checkbox" '+disableCss+' class="css-checkbox" '+notApplicableFlag+' name="notApplicableCheckBox'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" id="notApplicableCheckBox'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
     			htmlelement +='		<label class="css-label" for="notApplicableCheckBox'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label>';
     			htmlelement +='</div>';
        	 }
             var tableHtml = this.renderTableforStudent();
             htmlelement+=tableHtml;
             htmlelement+='<div class="legendIcon">';
       	     htmlelement+=' <div id="legendStudentEntry'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="display:none;">';
        	 htmlelement+=' 	<div class="studentEntry"></div>';
        	 htmlelement+=' 	<span>Student Entry</span>';
        	 htmlelement+=' </div>';
        	 htmlelement+=' <div id="legendAutheredFeedBack'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="display:none;">';
        	 htmlelement+=' 	<div class="autheredFeedback"></div>';
         	 htmlelement+=' 	<span>This cell has authored feedback</span>';
         	 htmlelement+=' </div>';
     		 htmlelement+='</div>';
     		  /*cell level feedback code */
    		  htmlelement +='<div class="cellFeedbacks">';
    		  htmlelement += this.instructorFormulaCellsFeedbackLayout();
    		  htmlelement +='</div>';
     		/*table feedback code */
       	     var overallFeedback = util.getFormulaLinksForStudent(this.overallFeedback);
 		     overallFeedback = overallFeedback.replace(/\Â/g," ").replace("&#160;","");      
 		     var generalFeedback =  util.getFormulaLinksForStudent(this.generalFeedback);
 		     generalFeedback = generalFeedback.replace(/\Â/g," ").replace("&#160;","");

             overallFeedback = util.getImageLayout(overallFeedback);
             overallFeedback = util.getVideoLayout(overallFeedback);

             generalFeedback = util.getVideoLayout(generalFeedback);
             generalFeedback = util.getImageLayout(generalFeedback);

 			  var hidden = (overallFeedback =='' || overallFeedback == '&nbsp;') && (generalFeedback =='' || generalFeedback == '&nbsp;') ?'invisible' : '';
 			  htmlelement +='<div class="overallFeedOpen '+hidden+'  tblCompOvFeedAlign">';
    		  htmlelement +=' <strong>Overall feedback: </strong>'+overallFeedback+'<br>'+generalFeedback+'</div>';
    		 
     		  htmlelement+='</div>';
     		
     		return htmlelement;
         },
         afterInstructorLayout: function(){
        	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	 this.addTableCellDataInstructor();
        	 setTimeout(function(){
        		 $("#studentLayoutTable"+compId).css("display","inline-table");
        	 },300);
        	 TableComponent.addEvent("notApplicableCheckBox"+compId, "change", this._markTableNotApplicable);
        	
        	 for(cellIndex  in this.cellComponentCollection){
        		 var cellComponent = this.cellComponentCollection[cellIndex].component;
        		 if(cellComponent != ""){
                     cellComponent.afterInstructorLayout();
                     if(cellComponent.type == "Input field"){
                        if(question.mode != "preview")
                    	   $("#"+cellComponent.studentEntries[0].editor.id).trigger("blur");
                     }
        		 }
        	 }
        	 if(this.notApplicableFlag){ 
        		 this.markTableNotApplicable();
        	 } 
        	 var charCode = 65;
             for(var len = 0; len < this.mergedCellInfoCollection.length; len++){
             	var obj = this.mergedCellInfoCollection[len];
             	var cellId = compId + String.fromCharCode(charCode + obj.col) + obj.row;
             	$("#" + cellId).attr("colspasn", obj.colspan);
             	$("#" + cellId).attr("rowspan", obj.rowspan);
             	//remove extra cells
             	for(var rowIndex = 0; rowIndex < (obj.rowspan); rowIndex++){
             		var colCode = charCode + obj.col;
             		for(var colIndex = 0; colIndex < obj.colspan; colIndex++){
             			if(rowIndex != 0 || colIndex != 0){
             				cellId = compId + String.fromCharCode(colCode+colIndex) + (obj.row + rowIndex);
                 			$("#" + cellId).remove();
             			}
                 	}
             	}
             }
             if(this.CustomBorders){
	             if(this.CustomBorders.length > 0){
	            	 this.applyBordersOnRender();
	             }
             }
             if($("#"+compId+"_instructorTable").find(".studentEntryLayout").length > 0){
          		 $("#legendStudentEntry"+compId).show();
          	   }
          	   if($("#"+compId+"_instructorTable").find(".autheredFeedbackCell").length > 0){
          		 $("#legendAutheredFeedBack"+compId).show();
          	   }
        	 
         },
         addTableCellDataInstructor:function(){
        	
        	 for(cellIndex  in this.cellComponentCollection){
        		 var cellComponent = this.cellComponentCollection[cellIndex].component;
        		 var itsHtml = this.cellHTMLCollection[cellIndex].itsHtml;
        		 var cellId = this.cellComponentCollection[cellIndex].id;
        		 if(cellComponent != ""){
        			 var cellHtml = cellComponent.instructorLayout(itsHtml);
                     $("#" + cellId).html(cellHtml);
                     /*adjust td width having orientation text*/
                     var orientDiv = $("#" + cellId).find("div[class^='text-rotate']");
                     if(orientDiv.length>0){
                    	 var orientDivWidth = orientDiv.width();
                    	 if(orientDiv.hasClass("text-rotate-deg45")){
                    		 var orientDivHeight = orientDiv.height();
                    		 if(typeof orientDivHeight!="undefined"){
                    	       orientDiv.parents("h6").height(orientDivHeight);
                    		 }                    		 
                    	 }
                    	                     	 
                    	 var itsParentTDWidth = orientDivWidth+65;
                    	 /*remove max width*/
                    	 $("#" + cellId).css("min-width",itsParentTDWidth);
                    	 /*add new width*/
                    	 $("#" + cellId).width(itsParentTDWidth);
                     }   
                     if(cellComponent.type == "Input field"){
                        $("#"+cellId).addClass("studentEntryLayout");
                        if(question.mode==MODE_POST_TEST)
                        	{
                        		$("#"+cellId).addClass("showTostudClass");
                        	}
                        
                     }
                     if(cellComponent.type == "Label"){
                    	 for(var i=0 ; i < question.formulas.length ; i++){
 	                		if($.inArray(cellId, question.formulas[i].destinations) != -1){
 	                			for( j in cellComponent.ranges){
 	                				if(cellComponent.ranges[j].rangeFeedbackEditor.text != ''){
 	                					$("#"+cellId).addClass("autheredFeedbackCell");
 	                				}
 	                			}
 	                		}
                    	 }
                      }
        		 }
        	 }
         },
         tableInstructorLayout:function(){
        	 var tblHtml = "";
        	 var nrow = this.rowCount;
        	 var ncol = this.colCount;
        	 if(nrow>0 && ncol>0){
        		 var data = this.createSpreadsheetData(nrow, ncol);
        		 var tblWrapper = $('<div>');
        		 var tbl = $('<div>');
        		 tbl.handsontable({data:data});
        		 tbl.appendTo(tblWrapper);
        		 tblHtml+=tblWrapper.html();
        	 }
        	 return tblHtml;
         },
         instructorFormulaCellsFeedbackLayout : function(){
        	 var itsHtml = "";
        	 var rangeFeedbackOuterHtml = '';
 			 rangeFeedbackOuterHtml +='<div class="clear"></div>';
 			 rangeFeedbackOuterHtml +='<div class="rangeFeedOpen">';
 			
 			 rangeFeedbackOuterHtml +='	<div><strong>Range-based feedback: </strong></div><br/>';
 			 
 			 var rangeFeedbackHtml = '';
 			 
 			 var rangeCount = 0;
 			 
        	 for(ckey in this.cellComponentCollection){
        		 var compnt = this.cellComponentCollection[ckey].component;
        		 var cellId = this.cellComponentCollection[ckey].id;
        		 if(compnt != ""){
        		   var ctype = compnt.type;
            	   if(ctype == "Label"){    
            		   for(var i=0 ; i < question.formulas.length ; i++){
                     		if($.inArray(cellId, question.formulas[i].destinations) != -1){
                     			var rangeFeedbackHtmlHeading ='	<div><strong>Feedback (in cell '+compnt.cellId+') </strong></div>';
                     			 var j=0;
                     			 var isRangeExist=false;
                     			 var rangeFeedbackHtmlNew="";
                         		 for( j in compnt.ranges){        
                         			if(compnt.ranges[j].rangeFeedbackEditor.text != ""){
                         				rangeFeedbackHtmlNew += compnt.ranges[j].instructorLayout();
                             			rangeCount++;
                             			isRangeExist=true;
                         			}
                         		 }
                         		 if(isRangeExist)
                         			 rangeFeedbackHtml+=rangeFeedbackHtmlHeading+rangeFeedbackHtmlNew;
                     		}
                     	}
                        rangeFeedbackHtml = util.getImageLayout(rangeFeedbackHtml);
                        rangeFeedbackHtml = util.getVideoLayout(rangeFeedbackHtml);               
            	   }
        		 }
        	 }
        	 if( rangeCount > 0 ) {
     			if(rangeFeedbackHtml != ''){
     				itsHtml += rangeFeedbackOuterHtml + rangeFeedbackHtml;
     			}         			 
     		 }
        	 itsHtml+='</div>';
        	 return itsHtml;
         },
         instructorCellsComponentsUpdates : function(){        	 
        	 for(ckey in this.cellComponentCollection){
        		 var compnt = this.cellComponentCollection[ckey].component;
        		 var cellId = this.cellComponentCollection[ckey].id;
        		 if(compnt != ""){
        		   var ctype = compnt.type;
            	   if(ctype == "Checkbox"){
            		   if(compnt.options[0].right){            			  
            			   var spanHtml = $(this.getItemValById(this.cellHTMLCollection, cellId, "itsHtml")).find("span").html(); 
            			   var cellDispHtml = "";
            			   cellDispHtml += '<div id="CellCheckboxField_'+cellId+'" class="test">';
                		   cellDispHtml += '<input type="checkbox" checked="checked"/>';
                		   cellDispHtml += '<span class="checkboxText">'+spanHtml+'</span>';
                		   cellDispHtml += '</div>';
                		   this.changeValById(this.cellHTMLCollection, cellId, "itsHtml", cellDispHtml);
            		   }
                			 
            	   }else if(ctype == "Dropdown menu"){            		  
            		 var cellHtmlObj = $(this.getItemValById(this.cellHTMLCollection, cellId, "itsHtml"));
            		 var options = cellHtmlObj.find("option");
            		 for(var i=0; i<options.length; i++){
            			 $(options[i]).attr("disabled", true);
            		 }
            		 var st =0 ;
            		 for(st in compnt.sections[0].options){            			 
            			 if(!compnt.acceptAnyAnswer && compnt.sections[0].options[st].answers[0].right){
            				 cellHtmlObj.find("option[value="+compnt.sections[0].options[st].editor.id+"]").attr({'selected':'selected', 'disabled':false});
            			 }
            		 }
            		 var cellDispHtml = "";
    				 cellDispHtml += '<select id="CellDropDownField_'+cellId+'">';
    				 cellDispHtml +=   cellHtmlObj.html();
    				 cellDispHtml += '</select>';
    				 this.changeValById(this.cellHTMLCollection, cellId, "itsHtml", cellDispHtml);
            	   }	 
        		 }
        	 }
        	 this.itsTableInstance.render();
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
        	 this.studentRowCount = this.studentRowCount > this.rowCount ? this.studentRowCount : this.rowCount;
        	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="margin-left: 75px;" class="rowPagesectionStudentForTable mainQuestionSection '+attachClass+'" >';
        	 if(this.showNotApplicable){
        		var notApplicableFlag = this.notApplicableFlag?"checked":"";
     			var disableCss= question.mode== MODE_TEST?"":'disabled';
     			htmlelement +='<div class="notApplicableDiv">';
     			htmlelement +='		<input type="checkbox" '+disableCss+' class="css-checkbox" '+notApplicableFlag+' name="notApplicableCheckBox'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" id="notApplicableCheckBox'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
     			htmlelement +='		<label class="css-label" for="notApplicableCheckBox'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label>';
     			htmlelement +='</div>';
        	 }
     	      
             var tableHtml ='<div  id="notApplicableDivStudent'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">'; 
             tableHtml += this.renderTableforStudent();
             htmlelement +=tableHtml;
             var  trWidth=trWidth+45+"px";
             
             if (this.isUnlockRows == true) {
      			htmlelement +='<div id="addRemoveRow_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="display:inline-block; padding-bottom:10px;float:right; margin-left:'+trWidth+';width:117px;position:absolute; vertical-align: bottom;"><a id="addRow'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> + Row</a> | <a id="removeRow'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> - Row</a></div>';
      		}
     		 htmlelement +='</div>';
             htmlelement +='</div>';
     		
            /*fixes to show right-side Tds border*/
            var comptId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
            setTimeout(function(){
            	$("#studentLayoutTable"+comptId).css("display","table");
            }, 10);
     		return htmlelement;
         },
         
         addTableCellData:function(){ 
        	 for(cellIndex  in this.cellComponentCollection){
        		 var cellComponent = this.cellComponentCollection[cellIndex].component;
        		 var cellId = this.cellComponentCollection[cellIndex].id;
        		 var itsHtml = this.cellHTMLCollection[cellIndex].itsHtml;
        		 if(cellComponent != ""){
        			 var cellHtml = cellComponent.studentLayout(itsHtml);
                     $("#" + cellId).html(cellHtml);
                     /*adjust td width having orientation text*/
                     var orientDiv = $("#" + cellId).find("div[class^='text-rotate']");
                     if(orientDiv.length>0){
                    	 var orientDivWidth = orientDiv.width();
                    	 if(orientDiv.hasClass("text-rotate-deg45")){
                    		 var orientDivHeight = orientDiv.height();
                    		 if(typeof orientDivHeight!="undefined"){
                    	       orientDiv.parents("h6").height(orientDivHeight+25);
                    		 }                    		 
                    	 }
                    	                     	 
                    	 var itsParentTDWidth = orientDivWidth+40;
                    	 /*remove max width*/
                    	 $("#" + cellId).css("min-width",itsParentTDWidth);
                    	 /*add new width*/
                    	 $("#" + cellId).width(itsParentTDWidth);
                     }                     
                     if(cellComponent.acceptAnyAnswer){
                    	 isAccptAnyAns = true;
                     }
                     if(cellComponent.type == "Input field"){
                        $("#"+cellId).addClass("studentEntryLayout");
                        if(question.mode==MODE_POST_TEST)
                    	{
                    		$("#"+cellId).addClass("showTostudClass");
                    	}
                     }
        		 }        		 
        	 }
         },
         addRowStudentLayout : function(event){
             if($(event.currentTarget).hasClass("aa")){
                 return false;
             }
         	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;        	 
         	 var rowHtml = '';
         	 rowHtml+='<tr class="studentRow" style="height: 21px;">';
         	 charCode = 65;
         	 var isMergedCellInRow = false;
              for(var col = 0; col < this.colCount; col++){
             		
             	 var maxWidth =  parseInt(this.colWidth[col]);
             	 var cellId = String.fromCharCode(charCode) + this.studentRowCount;
             	 var prevRowcellId =  String.fromCharCode(charCode) + (this.studentRowCount - 1);
             	 var colSpan = "";
             	 var addCell = false;
             	 if($("#" + compId + prevRowcellId).length > 0){
             		 colSpan=$("#" + compId + prevRowcellId).attr("colspan");
             		 addCell = true;
             		 
             	 }else{
             		 //marged col have more than 1 rowspan
             		 if(!isMergedCellInRow){
             			 var rIndex = 0;
             			 for(rIndex = this.studentRowCount - 2;rIndex >= 0; rIndex--){
             				 prevRowCell =  String.fromCharCode(charCode) + rIndex;
             				 if($("#" + compId + prevRowCell).length > 0){
             					 colSpan = $("#" + compId + prevRowCell).attr("colspan");
             					 break;
             					 addCell = true;
             				 }
             			 }
             		 }
             	 }
             	 if(addCell){
             		 if(colSpan != "" && colSpan != undefined){
 	   	       			  isMergedCellInRow = true;
 	   	       			  var mergeParent = {};
 	   	       			  mergeParent.row = this.studentRowCount;
 	   	       			  mergeParent.col = col;
 	   	       			  mergeParent.rowspan = 1; //TD has rowspan == 1 by default. rowspan == 2 means spread over 2 cells
 	   	       			  mergeParent.colspan = colSpan;
 	   	       			  this.mergedCellInfoCollection.push(mergeParent);
 	   	       			  rowHtml+='<td style="min-height:21px; min-width: '+maxWidth+'px !important;" height:auto;" colspan = "'+colSpan+'" id="'+ compId + cellId +'">'+""+ '</td>';
 	   	       		 }else{
 	   	       			 isMergedCellInRow = false;
 	   	       			  rowHtml+='<td style="min-height:21px; min-width: '+maxWidth+'px !important;" height:auto;" id="'+ compId + cellId +'">'+""+ '</td>';
 	   	       		 }
             	 }
             	 this.cellHTMLCollection.push({"id":compId + cellId, "itsHtml": ""});
                 this.cellComponentCollection.push({"id":compId + cellId, "component": ""});                 
                 charCode++;
              }
              rowHtml+='</tr>';
              $("#studentLayoutTable"+compId).find('tbody').append(rowHtml);
              this.addLabelToNewRow(this.studentRowCount);
         	 this.studentRowCount++;
         	 question.updateProgressBar();
         },
         removeRowStudentLayout : function(event){
            if($(event.currentTarget).hasClass("aa")){
                return false;
            }
        	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	 if($("#studentLayoutTable"+compId+" tr[class=studentRow]:last").length > 0){
        		 var rowCellIds = $("#studentLayoutTable"+compId+" tr[class=studentRow]:last").find("td");
        		 var cellIds = [];
        		 for(var i=0; i<rowCellIds.length; i++){
        			 cellIds.push($(rowCellIds[i]).attr("id"));
        		 }
        		 updateHtmlCollection(compId, cellIds);
        		 $("#studentLayoutTable"+compId+" tr[class=studentRow]:last").remove(); 
        		 this.studentRowCount--;
        	 }
        	 question.updateProgressBar();
         },
         addLabelToNewRow : function(studentRowCount){
        	 var charCode = 65;
        	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	 for(var col = 0; col < this.colCount; col++){
        		 var cellId = String.fromCharCode(charCode) + studentRowCount;
        		 var prevRowcellId = String.fromCharCode(charCode) + (studentRowCount-1);
        		 var component = this.getItemValById(this.cellComponentCollection, compId+prevRowcellId, "component");
            	 
        		 this.changeValById(this.cellComponentCollection, compId+cellId, "component", "");
            	 var html="";
            	 var newHtml="";
            	 if(component != ""){
            		 if(component.type == "Input field")            		 
             		 	html = this.getInputFieldComponentStudentLayout(cellId,component.contentFormat, component.mandatory); 
	             	 else if(component.type == "Dropdown menu"){
	             		 html = this.getDropDownComponentStudentLayout(cellId,component);
	             	 }
	             	 else if(component.type == "Checkbox"){
	             		 html = this.getCheckboxComponentStudentLayout(cellId,component);
	             	 }
	             	 else if(component.type == "Label"){
	             		var prevHtml = this.getItemValById(this.cellHTMLCollection, compId+prevRowcellId, "itsHtml");		             		
	             		if(prevHtml.indexOf("question.viewFormula(event)")!=-1)
             			{
	             			var oldHtml=$(prevHtml);
							
							var oldValue=$(prevHtml).html();
							var firstIndex=prevHtml.indexOf("<a");
							var startText = prevHtml.substr(0,firstIndex);
							var secondIndex=prevHtml.indexOf("</a>")
							var endText = prevHtml.substr(secondIndex+4,oldValue.length);
	             			
							var anchor=oldHtml.find("a");
	             			var equation=anchor.attr("title");
	             			var prevequation=anchor.attr("title");
	             			equation=equation.substr(equation.indexOf("=")+1,equation.length);
	             			equation=equation.trim();
	             			var oldformula = util.getFormula(anchor.attr("name"));
	             			
	             			var studentEntries = oldformula.getStudentEntryIds(equation);
	             			
	             			for(var x=0;x<studentEntries.length;x++)
             				{	var lastId=null;
	             				lastId=studentEntries[x].toString().substr(studentEntries[x].length-2,studentEntries[x].length);
	             				
	             					lastId=parseInt(lastId);
	             					if(isNaN(lastId))
	             						lastId=studentEntries[x].toString().substr(studentEntries[x].length-1,studentEntries[x].length);
	             				
	             				
	             				var column=studentEntries[x].toString().substr(compId.length,1);
	             				if(lastId==studentRowCount-1)
	             				{
	             					equation=equation.replace(studentEntries[x],compId+column+(parseInt(lastId)+1));
	             				}
             				}	             			
	             			var formulaId = question.getNewFormulaId();
	        				var formulaName = "studentSideF";
	        				var formulaEquation = equation;	        				
	        				
	        				var formulaDecimal = oldformula.decimalVal;
	        				
	        				var formula  =  new Formula({id:formulaId,name:formulaName,equation:formulaEquation,decimalVal:formulaDecimal});
	        				question.formulas.push(formula);
	        				
	        				newHtml= startText +'<a onclick="question.viewFormula(event);"';
	        				newHtml+=' name="'+ formulaId +'"';
	        				var anchorText="";
	             			if(prevequation.indexOf("Calculation")!=-1){             				
	             				newHtml+=' title="Calculation = '+ formulaEquation +'';
	             				anchorText='&lt;'+formulaId+'&gt;</a> '+ endText;
	             			}
	             			else{
	             				newHtml+=' title="'+ formulaEquation +'';
	             				anchorText='['+formulaId+']</a>'+ endText ;
	             			}
	             			
	             			newHtml+='">';
	             			newHtml+=anchorText;
	             			
	             			this.changeValById(this.cellHTMLCollection, compId+cellId, "itsHtml", newHtml);
	             			
		             		html = this.getLabelFieldComponentStudentLayout(cellId,component);
		             		var newComponent = this.getItemValById(this.cellComponentCollection, compId+cellId, "component");
		             		newComponent.editor.text=newHtml;
		             		newComponent.editor.textWithoutFormatting='<'+formulaId+'>';
		             		html = newComponent.studentLayout(newHtml);
             			}
	             		else
	             		{
	             			//prevHtml="";
		           		    this.changeValById(this.cellHTMLCollection, compId+cellId, "itsHtml", prevHtml);
		             		html = this.getLabelFieldComponentStudentLayout(cellId,component);
	             		}	             		
             			for(var i=0 ; i < question.formulas.length; i++){
                      		if($.inArray(compId+prevRowcellId, question.formulas[i].destinations) != -1){
                      			question.formulas[i].addDestination(compId+cellId);
                      		}
             			}
	             	 }
	         		 $("#" + compId + cellId).html(html);
	         		 var newComp = this.getItemValById(this.cellComponentCollection, compId+cellId, "component");
	         		 newComp.afterStudentLayout();
            	 }
        		 charCode++;
        	 }
        	 this.afterStudentLayout();
         },
         getInputFieldComponentStudentLayout : function(cellId,contentFormat, isRequired){            	 
        	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	 var selectedCellId = cmpntId + cellId;        	 
        	 
        	 var component = new TableInputFieldComponent({
     			id : this.id,
     			pageIdPrefix:this.pageIdPrefix,
     			pageId:this.pageId,
     			cellId:cellId     			
     		 }); 
        	 component.mandatory = isRequired;
        	 var newContentFormat = null;
				if (contentFormat.type == "alphanumeric") {
					newContentFormat= new ContentFormatEnum(contentFormat).ALPHANUMERIC;
				} else if (contentFormat.type == "number") {
					newContentFormat= new ContentFormatEnum(contentFormat).NUMBER;
					newContentFormat.updateFormatter();
				} else if (contentFormat.type == "currency") {
					newContentFormat= new ContentFormatEnum(contentFormat).CURRENCY;
				} else if (contentFormat.type == "percentage") {
					newContentFormat= new ContentFormatEnum(contentFormat).PERCENTAGE;
					newContentFormat.updateFormatter();
				} else if (contentFormat.type == "date") {
					newContentFormat= new ContentFormatEnum(contentFormat).DATE;
					newContentFormat.updateFormatter();
				} else if (contentFormat.type == "time") {
					newContentFormat= new ContentFormatEnum(contentFormat).TIME;
				}   
			 component.contentFormat=newContentFormat;
        	 
        	 var studEntry = new TableStudentEntry({
        			id : component.id,
        			componentId:this.id,
        			componentIdPrefix:component.pageIdPrefix+component.pageId+component.idPrefix,
        			cellId:component.cellId
        		});
             var studEntries=[];
             studEntries[0]=studEntry;
             component.setStudentEntries(studEntries);
             this.changeValById(this.cellComponentCollection, selectedCellId, "component", component); 
        	 var htmlelement = component.studentLayout();  
        	 $("#"+selectedCellId).addClass("studentEntryLayout");
        	   if(question.mode==MODE_POST_TEST)
           	{
           		$("#"+selectedCellId).addClass("showTostudClass");
           	}
      		 return htmlelement;    	 
         },
         getCheckboxComponentStudentLayout : function(cellId,comp){            	 
        	var maxId = 0;
        	var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	var selectedCellId = cmpntId + cellId;
     		var newId = maxId + 1;		 
     		var component = new TableCheckboxComponent({
     			id : this.id,
     			pageIdPrefix:this.pageIdPrefix,
     			pageId:this.pageId,
     			cellId:cellId
     		});
     		component.mandatory = comp.mandatory;
     		var gfEditor = new Editor({
     			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
     					+ component.generalFeedbackPrefix,
     		});
     		
     		var ofFeedback = new Editor({
     			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
     					+ component.overallFeedbackPrefix,
     		});
     		
     		component.generalFeedback = gfEditor;
     		component.overallFeedback = ofFeedback;
     		var options = [];
     		var config = {
     			componentId : component.id+cellId,
     			componentIdPrefix : this.pageIdPrefix+this.pageId+component.idPrefix
     		};
     		config.id = 1;
     		options[0] = new TableOption(config);
     		options[0].editor.text = comp.options[0].editor.text,	
     		component.setOptions(options);
     		var htmlelement = component.studentLayout();     		
     		
     		this.changeValById(this.cellComponentCollection, selectedCellId, "component", component); 
     		return htmlelement;
         },
         getDropDownComponentStudentLayout : function(cellId,comp){
        	var maxId = 0;
        	var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	var selectedCellId = cmpntId + cellId;
    		var newId = maxId + 1;
    		  
    		var component = new TableDropDownComponent({
    			id : this.id,
    			pageIdPrefix:this.pageIdPrefix,
    			pageId:this.pageId,
    			cellId:cellId
    		});
    		component.mandatory = comp.mandatory;
    		var gfEditor = new Editor({
    			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
    					+ component.generalFeedbackPrefix,
    		});
    		
    		var ofFeedback = new Editor({
    			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
    					+ component.overallFeedbackPrefix,
    		});
    		
    		component.generalFeedback = gfEditor;
    		component.overallFeedback = ofFeedback;
    		var sections = [];
    		
    		var config = {
    			id:1,
    			componentId : component.id,
    			componentIdPrefix : this.pageIdPrefix+this.pageId+component.idPrefix,
    			cellId:cellId
    		};
    		sections[0]= new TableDropDownSection(config);
    		sections[0].editor.text = comp.sections[0].editor.text;
    		var options = [];
    		for (var i=1; i<=comp.sections[0].options.length; i++){
    			var optionConfig = {
    					id:i,
    					sectionId : config.id,
    					sectionIdPrefix : config.componentIdPrefix+config.componentId+config.cellId+sections[0].idPrefix,
    					componentId : config.componentId,
    					componentIdPrefix : config.componentIdPrefix
    				};
    			var option =new TableDropDownOption(optionConfig);
    			var optionAnswers = [];
    			var optionAnswersConfig = {
    					id:1,
    					optionId : option.id,
    					optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
    					componentId : option.componentId,
     					componentIdPrefix : option.componentIdPrefix,
     					sectionId : option.sectionId,
    					sectionIdPrefix : option.sectionIdPrefix,
    					right : false
    				};
    			optionAnswers[0]=new TableDropDownOptionAnswer(optionAnswersConfig);
    			option.setAnswers(optionAnswers);
    			option.editor.text = comp.sections[0].options[i-1].editor.text;
    			options.push(option);
    		}
    		
    		
    		sections[0].setOptions(options);
    		
    		component.setSections(sections);
    		var htmlelement = component.studentLayout();
    		
    		this.changeValById(this.cellComponentCollection, selectedCellId, "component", component);
    		  
    		return htmlelement;
         },
         /**
          * add event handers to html elements after the layout done in student test mode
          * @returns {String}
          */
         afterStudentLayout:function(){ 
        	var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	 this.addTableCellData();
        	 var trWidth=0;
    
        	 
        	 TableComponent.addEvent("notApplicableCheckBox"+compId, "change", this._markTableNotApplicable);
        	 TableComponent.addEvent("addRow"+compId, "click", this._addRowStudent);
        	 TableComponent.addEvent("removeRow"+compId, "click", this._removeRowStudent);
        	 for(cellIndex  in this.cellComponentCollection){
        		 var cellComponent = this.cellComponentCollection[cellIndex].component;
        		 if(cellComponent != ""){
        		     cellComponent.afterStudentLayout();
                     if(cellComponent.type == "Input field"){
                    	 if(cellComponent.contentFormat.type=="date"){
                    		 $("#"+compId).css("min-width",80);
                    	 }
                    	// $("#"+cellComponent.studentEntries[0].editor.id).trigger("blur");
                     }
        		 }
        	 }
        	 if(this.notApplicableFlag){ 
            	 if($("#notApplicableCheckBox"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
        	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .inputFieldStudentEntry").each(function () { 
        	    		 $(this).attr('contenteditable',"false");
        	    	 });
        	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .studentViewCheckbox").each(function () { 
        	    		 $(this).prop("disabled", true);
        	    	 });
        	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .dropDownOption").each(function () { 
        	    		 $(this).prop("disabled", true);
        	    	 });
        	    	 this.notApplicableFlag = true;
                    
                     $("#notApplicableDivStudent"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("notapplicable");
                     $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .hasDatepicker").css("visibility","hidden");
                     
                     $("#addRemoveRow_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+ " a").addClass("aa");
            	 }
            	 else{
            		 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .inputFieldStudentEntry").each(function () { 
        	    		 $(this).attr('contenteditable',"true");
        	    	 });
        	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .studentViewCheckbox").each(function () { 
        	    		 $(this).prop("disabled", false);
        	    	 });
        	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .dropDownOption").each(function () { 
        	    		 $(this).prop("disabled", false);
        	    	 });
        	    	 this.notApplicableFlag = false;
                     $("#notApplicableDivStudent"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("notapplicable");
                     $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .hasDatepicker").css("visibility","");
                     
                     $("#addRemoveRow_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+ " a").removeClass("aa");
            	 }  
        	 } 
        	 var charCode = 65;
             for(var len = 0; len < this.mergedCellInfoCollection.length; len++){
             	var obj = this.mergedCellInfoCollection[len];
             	var cellId = compId + String.fromCharCode(charCode + obj.col) + obj.row;
             	$("#" + cellId).attr("colspan", obj.colspan);
             	$("#" + cellId).attr("rowspan", obj.rowspan);
             	//remove extra cells
             	for(var rowIndex = 0; rowIndex < (obj.rowspan); rowIndex++){
             		var colCode = charCode + obj.col;
             		for(var colIndex = 0; colIndex < obj.colspan; colIndex++){
             			cellId = compId + String.fromCharCode(colCode +colIndex) + (obj.row + rowIndex);
             			if(colIndex == 0){
             				$("#"+cellId).find(".tableColWidth").css("width",parseInt(this.colWidth[colIndex])+'px !important');
             			}
             			if(rowIndex != 0 || colIndex != 0){
             				$("#" + cellId).remove();
             			}
                 	}
             	}
             }
             charCode = 65;
             var rowIndex = 0; 
      		for(var colIndex = 0; colIndex < this.colCount; colIndex++){
      			//var colCode = charCode + colIndex;
      			//console.log("colIndex : "+colIndex);
      			cellId = compId + this.getColLabel(colIndex) + rowIndex;
      			
      			$("#"+cellId).find(".tableColWidth").css("width",parseInt(this.colWidth[colIndex])+'px !important');
          	}
      		if(this.CustomBorders!=null){
      		if(this.CustomBorders.length > 0){
         	   this.applyBordersOnRender(); 
            }
      		}
      	  if (this.isUnlockRows == true) {
    		  trWidth = $("#studentLayoutTable"+compId).find('tr').width();
               trWidth=trWidth+45+"px";	
               $("#addRemoveRow_"+compId).css("margin-left",trWidth);
        	}
         },

         /**
          * function to render html table for student layout
          *
          */
        renderTableforStudent : function() {
            var ht = '';
            var compd = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
                var charCode = 65;
                ht+='<table class="gridtable stdgridtable" id="studentLayoutTable'+compd+'">';
                ht+='<colgroup>';
                for(var col = 0; col < this.colCount; col++){
                        ht+='<col style="width: '+parseInt(this.colWidth[col])+'px !important;">';
                }
                ht+='</colgroup>';              
                for(var col = 0; col < this.colCount; col++){                   
                    charCode++;
                    if(charCode >90){
                        charCode = 65;
                    }
                }
                var rowCnt = 0;
                if(question.mode== MODE_TEST){
                	rowCnt = this.studentRowCount;
                }
                else{
                	rowCnt = this.rowCount;
                }
                
                for(var row = 0; row < rowCnt;row++){
                    charCode = 65;
                    var rowClass = "";
                    if(row >= this.rowCount){
                    	rowClass = "studentRow";
                    }
                    ht+='<tr class="'+rowClass+'">';
                    for(var col = 0; col < this.colCount; col++){
                    	var rowspan = 0;
                    	var colspan = 0;
                        for(var len = 0; len < this.mergedCellInfoCollection.length; len++){
                        	var obj = this.mergedCellInfoCollection[len];
	                        if(obj.row == row && obj.col == col){
	                        	rowspan = obj.rowspan;
	                        	colspan = obj.colspan;
	                        }
                        }
                        if(rowspan != 0 || colspan != 0){
                        	ht+='<td id="'+ compd + String.fromCharCode(charCode) + row +'" rowspan="'+rowspan+'" colspan="'+colspan+'">'+"&nbsp;"+ '</td>';
                        }
                        else{         
                        	/* check for chrome browser */
                            var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
                        	/*var maxWidth = 90;
                        	if(parseInt(this.colWidth[col]) > 90){
             z           		maxWidth = parseInt(this.colWidth[col]);
                        	}*/
                            var maxWidth = parseInt(this.colWidth[col]);
                            if(isNaN(maxWidth))
                            	maxWidth=75;
                        	ht+='<td style="min-width: '+maxWidth+'px !important;" id="'+ compd + String.fromCharCode(charCode) + row +'">'+"&nbsp;"+ '</td>';
                          
                        }
                        charCode++;
                    }
                    ht+='</tr>';
                }
                ht+='</table>';
                return ht;
          },
          renderTableforPostSubmission : function(){
        	  var ht = '';
              var compd = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
                  var charCode = 65;
                  var postSubTableClass = "postSubmissionGridtable";
                  if(isChrome){
                	  postSubTableClass = ""; 
                  }
                  ht+='<table class="gridtable stdgridtable '+postSubTableClass+' " id="postSubmissionLayoutTable'+compd+'">';
                  ht+='<colgroup>';
                  for(var col = 0; col < this.colCount; col++){
                          ht+='<col style="width: '+parseInt(this.colWidth[col])+'px !important;">';
                  }
                  ht+='</colgroup>';
                 
                  for(var col = 0; col < this.colCount; col++){                      
                      charCode++;
                      if(charCode >90){
                          charCode = 65;
                      }
                  }
                  for(var row = 0; row < this.studentRowCount; row++){
                      charCode = 65;
                      ht+='<tr>';
                      for(var col = 0; col <= this.colCount; col++){
                      	var rowspan = 0;
                      	var colspan = 0;
                          for(var len = 0; len < this.mergedCellInfoCollection.length; len++){
                          	var obj = this.mergedCellInfoCollection[len];
  	                        if(obj.row == row && obj.col == col){
  	                        	rowspan = obj.rowspan;
  	                        	colspan = obj.colspan;
  	                        }
                          }
                          if(col == this.colCount){
                        	  ht+='<td class="noBorder" id="'+ compd + String.fromCharCode(charCode) + row +'"></td>';
                          }
                          else{
                        	  if(rowspan != 0 || colspan != 0){
                                	ht+='<td id="'+ compd + String.fromCharCode(charCode) + row +'" rowspan="'+rowspan+'" colspan="'+colspan+'">'+"&nbsp;"+ '</td>';
                                }
                                else{
                                	var maxWidth = parseInt(this.colWidth[col]);
                                    if(isNaN(maxWidth))
                                    	maxWidth=75;
                                	ht+='<td style="min-width: '+maxWidth+'px !important;" id="'+ compd + String.fromCharCode(charCode) + row +'">'+"&nbsp;"+ '</td>';
                                }
                          }
                          
                          charCode++;
                      }
                      ht+='</tr>';
                  }
                  ht+='</table>';
                  return ht;
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
         	 this.studentRowCount = this.studentRowCount > this.rowCount ? this.studentRowCount : this.rowCount;
         	 htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="margin-left: 75px; margin-top:73px;" class="mainQuestionSection  rowPagesectionStudentTbl  '+attachClass+'" >';
         	 if(this.showNotApplicable){
         		var notApplicableFlag = this.notApplicableFlag?"checked":"";
	   			if(this.showNotApplicable){
	   				htmlelement +='<div class="notApplicableDiv">';
	   				htmlelement +='	<div class="ntApplicableIE"><input type="checkbox" class="css-checkbox" disabled '+notApplicableFlag+'  id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
		   			htmlelement +='	<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
		   			htmlelement +='</div>';
	   			}
         	 }
      	
              var tableHtml = this.renderTableforPostSubmission();
              
              htmlelement+=tableHtml;
              htmlelement+='<div class="tableFeedback" id="feedback_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
              htmlelement+='<div id="inCompleteAnswerBannerTable'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="display:none;" class="inCompleteAnswerBanner" >You did not complete all of the questions.</div>';
              htmlelement+='</div>';
              /*table feedback code */
        	  var overallFeedback = util.getFormulaLinksForStudent(this.overallFeedback);
  		      overallFeedback = overallFeedback.replace(/\Â/g," ").replace("&#160;","");      
  		      var generalFeedback =  util.getFormulaLinksForStudent(this.generalFeedback);
  		      generalFeedback = generalFeedback.replace(/\Â/g," ").replace("&#160;","");

              overallFeedback = util.getImageLayout(overallFeedback);
              overallFeedback = util.getVideoLayout(overallFeedback);

              generalFeedback = util.getVideoLayout(generalFeedback);
              generalFeedback = util.getImageLayout(generalFeedback);

  			  var hidden = (overallFeedback =='' || overallFeedback == '&nbsp;') && (generalFeedback =='' || generalFeedback == '&nbsp;') ?'invisible' : '';
  			  htmlelement +='<div class="overallFeedOpen '+hidden+'  tblCompOvFeedAlign">';
     		  htmlelement +=' <strong>Overall feedback: </strong>'+overallFeedback+'<br>'+generalFeedback+'</div>';
     		 
      		  htmlelement+='</div>';      		  
      		  return htmlelement;
         },
         afterPostSubmissionLayout : function(){
        	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
        	 this.addTableCellDataPostSubmission();        	 
        	 var charCode = 65;
             for(var len = 0; len < this.mergedCellInfoCollection.length; len++){
             	var obj = this.mergedCellInfoCollection[len];
             	var cellId = compId + String.fromCharCode(charCode + obj.col) + obj.row;
             	$("#" + cellId).attr("colspan", obj.colspan);
             	$("#" + cellId).attr("rowspan", obj.rowspan);
             	//remove extra cells
             	for(var rowIndex = 0; rowIndex < (obj.rowspan); rowIndex++){
             		var colCode = charCode + obj.col;
             		for(var colIndex = 0; colIndex < obj.colspan; colIndex++){
             			if(rowIndex != 0 || colIndex != 0){
             				cellId = compId + String.fromCharCode(colCode+colIndex) + (obj.row + rowIndex);
                 			$("#" + cellId).remove();
             			}
                 	}
             	}
             }
             if(this.CustomBorders!=null){
	            if(this.CustomBorders.length > 0){
	           	  this.applyBordersOnRender(); 
	            }
             }
            if(!this.notApplicableFlag)
            {
             $('#postSubmissionLayoutTable'+compId+' tr').each(function() {
            	 if($(this).find('.inCorrectCell').length > 0 || $(this).find('.incompleteCell').length > 0){
            		 $(this).find("td:last").addClass("answerTick wrong");
            		 if($(this).find('.incompleteCell').length > 0){
            			 $(this).find("td:last").append('<div class="inCompleteAnswerBannerTable" >Incomplete </div>');
            			 $("#inCompleteAnswerBannerTable"+compId).show();
            		 }
             	 }
            	 else{
            		 if($(this).find('.correct').length > 0){
            			 $(this).find("td:last").addClass("answerTick correct");
            		 }
            	 }
             });             
            }
            else{
            	$('#postSubmissionLayoutTable'+compId).addClass("notapplicable");
            }
         },
         addTableCellDataPostSubmission:function(){ 
        	 for(cellIndex  in this.cellComponentCollection){
        		 var cellComponent = this.cellComponentCollection[cellIndex].component;
        		 var itsHtml = this.cellHTMLCollection[cellIndex].itsHtml;
        		 var cellId = this.cellComponentCollection[cellIndex].id;
        		 var minTdWidth=$("#" + cellId).css("min-width");
        		 if(cellComponent != ""){
        			 var cellHtml = cellComponent.postSubmissionReviewLayout(this.notApplicableFlag,itsHtml,minTdWidth);
        			 
                     $("#" + cellId).html(cellHtml);
                     /*adjust td width having orientation text*/
                     var orientDiv = $("#" + cellId).find("div[class^='text-rotate']");
                     if(orientDiv.length>0){
                    	 var orientDivWidth = orientDiv.width();
                    	 if(orientDiv.hasClass("text-rotate-deg45")){
                    		 var orientDivHeight = orientDiv.height();
                    		 if(typeof orientDivHeight!="undefined"){
                    	       orientDiv.parents("h6").height(orientDivHeight+18);
                    		 }                    		 
                    	 }
                    	                     	 
                    	 var itsParentTDWidth = orientDivWidth+80;
                    	 /*remove max width*/
                    	 $("#" + cellId).css("min-width",itsParentTDWidth);
                    	 /*add new width*/
                    	 $("#" + cellId).width(itsParentTDWidth);
                     }   
                     if(cellComponent.acceptAnyAnswer){
                    	 isAccptAnyAns = true;
                     }
                     if(cellComponent.type == "Label"){
                    	 for(var i=0 ; i < question.formulas.length; i++){
                       		if($.inArray(cellId, question.formulas[i].destinations) != -1){
                       			$("#"+cellId).addClass("studentEntryLayout");
                       		 if(question.mode==MODE_POST_TEST)
                            	{
                            		$("#"+cellId).addClass("showTostudClass");
                            	}
                       			/*to display comma seperated formula result values*/
                       			var formText = "";
                       			var resultSpan    = $("#"+cellId).find('.resultF');
                       			var isresultSpan = false;
                       			if(resultSpan.length == 1){
                       				formText = resultSpan.text();
                       				isresultSpan = true;
                       			}else{
                       				formText = $("#"+cellId).find('div[data-hold]').text();
                       			}
                       			if(formText!=""){
                       				var newvalues = [];
                       				var evaluatedValue = "";
                       				newvalues=formText.split(".");
    								if(newvalues.length>1){
    									newvalues[0]=newvalues[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");						
    									evaluatedValue = newvalues[0]+"."+newvalues[1];
    								}
    								else
    									evaluatedValue=newvalues[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    								
    								if(isresultSpan){
    									resultSpan.text(evaluatedValue);
    								}else{
    									//$("#"+cellId).find('div[data-hold]').text(evaluatedValue);
    									$("#"+cellId).find('div[data-hold]').find(':only-child:last').text(evaluatedValue);
    								}
                       			}
                       		}
                    	 }
                     }
        		 }
        	
        	 }
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
 	    /*
 	     * function to save Award maximum points or Award minimum points radio button value
 	     */
 	    notApplicableOptionValue:function(){
 	    	if($("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
 	    		this.showNotApplicable = true;
 	    	}else {
 	    		this.showNotApplicable = false;
 	    	}
 	    	
 	    },
 	    /*
 	     * function to enable add and remove row functionality in studentLayout
 	     */
 	   unlockRows:function(){
 	    	if($("#unlockRowsInput"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
 	    		this.isUnlockRows = true;
 	    	}else {
 	    		this.isUnlockRows = false;
 	    	}
 	    	
 	    },
         /**
          * marks show id as true
          * @param event
          */
 	    showCellId:function(e){
 	    	
            var compId = this.pageIdPrefix + this.pageId+ this.idPrefix + this.id;
            $("#SpreadsheetTable_"+compId).trigger("click");
            var rows = this.rowCount;
            var cols = this.colCount;
            $("#toggle_" +compId).find('.btn').removeClass('btn-primary');
            $("#toggle_" +compId).find('.btn').removeClass('btn-default');
            if(this.RowReadOnly){
                this.tableCellData = this.itsTableInstance.getData();
            }
            $(e.target).addClass('btn-primary');
            $(e.target).addClass('btn-default');
            if(e.target.textContent == "ON"){
                this.tableData = this.createSpreadsheetData(rows, cols);
                this.itsTableInstance.loadData(this.tableData);
                this.RowReadOnly = false;
                $("#hideIdText_"+compId).text("Hide IDs");
            } else{
                this.itsTableInstance.loadData(this.tableCellData);
                
                this.RowReadOnly = true;
                $("#hideIdText_"+compId).text("View IDs");
                this.updateTableDimensions();
            }
            if(this.CustomBorders!=null){
	            if(this.CustomBorders.length > 0){
	          	   this.applyBordersOnRender(); 
	             }
            }
            $("#SpreadsheetTable_"+compId).handsontable('render');
         },
         /**
          * * marks show id as wrong
          * @param event
          */
         hideId:function(){
        	 if (this.showTableId && $("#show_" +this.pageIdPrefix + this.pageId+ this.idPrefix + this.id).hasClass("active")) {
        		 $("#show_" + this.pageIdPrefix + this.pageId+ this.idPrefix + this.id).removeClass("active");
				 $("#hide_" + this.pageIdPrefix + this.pageId+ this.idPrefix + this.id).addClass("active");
				 this.showTableId = false;			 
			 } 
         },
         /**
          * validate if component is filled
          */

         validateComponent:function(object){

            var compArr = this.cellComponentCollection;
            for (i in compArr) {
                var element = compArr[i];
                if(element.component != ""){
                	if(element.component.type != 'Label'){
                		object = element.component.validateComponent(object);
                	}else if (element.component.type == 'Label') {
                        object = element.component.validateComponent(object);
                    }
                    
                }
            }
            return object;
        },
       /**
        * change subtype selection
        */
        changeSubType : function(event){
        	var graded=false;
        	var componentId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id;
        	 if (typeof event.data === 'undefined') {
        		 graded=false;
        		 this.graded=graded;
                 this.subType = 'label';
             } else if(this.subType != event.data.subType){
                 this.subType = event.data.subType;
                 var selectedCellId = this.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]).id;
                 var displayDropdownVal = "";
                 var selectedCell = this.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
                 var selectedMeta = this.itsTableInstance.getCellMeta(selectedTableCells[0],selectedTableCells[1]);
                 
                 $("#CellComponenetsWrapper_"+componentId).html("");
                 $("#CellComponentSpecificProperties").html(""); //reset cell component specific properties
                 $("#CellLabelTextOrientationProperties").hide();//hide cell text orientation dropdown
                 var component = this.getItemValById(this.cellComponentCollection, selectedCellId, "component");
                 if(component != ""){
                   if(component.type == "Input field"){
                     var contFor = component.contentFormat.type;
                     if(contFor == "number" || contFor == "percentage" || contFor == "currency"){
                        for(var i=0 ; i < question.formulas.length ; i++){
                           var formula = question.formulas[i];
                           if($.inArray(selectedCellId, formula.getStudentEntryIds(question.formulas[i].equation)) != -1){
                          	 showCautionIcon(selectedCellId, 'removeEntry');
                           }
                         }
                     } 
                   }
                 }
                 if (this.subType === 'label') {                	  
                	 var LabelFieldHtml = this.addCellComponent('Label'); //by default it will be "" only
                	 selectedMeta.readOnly = false;
                	 $(selectedCell).css("background-color","");
                	 displayDropdownVal = "Label";
                	 $("#CellComponentHyperLinkProperties").show();
                	 $("#CellLabelTextOrientationProperties").show();
                	 $(selectedCell).html("");
                	 this.changeValById(this.cellHTMLCollection, selectedCellId, "itsHtml", LabelFieldHtml);
                	 $(selectedCell).data("change",true);
                	 $("#CellComponenetsWrapper_"+componentId).hide();
                 } else if (this.subType === 'inputField') {
                	 var inputFieldHtml = this.addCellComponent('inputField');                	 
                	 selectedMeta.readOnly = true;
                	 $(selectedCell).html(inputFieldHtml);
                	 $(selectedCell).data("change",true);
                	 this.changeValById(this.cellHTMLCollection, selectedCellId, "itsHtml", inputFieldHtml);
                	 displayDropdownVal = "Input field";
                	 $("#CellComponentHyperLinkProperties").hide();
                } else if (this.subType === 'CheckBox') {                	
                	 var checkBoxHtml = this.addCellComponent('CheckBox');
                	 $(selectedCell).html(checkBoxHtml);
                	
                	 $(selectedCell).data("change",true);
                	 selectedMeta.readOnly = true;
                	 
                	 this.changeValById(this.cellHTMLCollection, selectedCellId, "itsHtml", checkBoxHtml);
                	 displayDropdownVal = "Checkbox";
                	 
                	 $("#CellComponentHyperLinkProperties").hide();
                 }else if (this.subType === 'dropDown') {
                	 var dropDownHtml = this.addCellComponent('dropDown');
                	 
                	 $(selectedCell).html(dropDownHtml);                	
                	 $(selectedCell).data("change",true);
                	 selectedMeta.readOnly = true;
                	 
                	 this.changeValById(this.cellHTMLCollection, selectedCellId, "itsHtml", dropDownHtml);
                	 displayDropdownVal = "Dropdown menu";
                	 
                	 $("#CellComponentHyperLinkProperties").hide();
                 }
                 var data = this.itsTableInstance.getData();
             	 data[selectedTableCells[0]][selectedTableCells[1]] = "";
             	 this.itsTableInstance.loadData(data);
                 var i=0;
	 			 for( i in question.activePage.components){
 			    	if(question.activePage.components[i].getId()==this.componentId){
 			    		question.activePage.components[i].populateComp(); 
 			    		break;
 			    	}
	 		     }
                
	 			 if(displayDropdownVal != ""){
	 			   //update dropdown values
	 			   $("#mode_"+componentId).text(displayDropdownVal);
	 			   //update cell type values to display
	 			   $("#TableCellComponenType_"+componentId).text(displayDropdownVal+" : ");
	 			   $("#TableCellComponenTypeId_"+componentId).text("ID "+selectedCellId);
	 			 }
             }
        	 if($("#mode_"+componentId).parent().hasClass("open")){
 	 			$("#mode_"+componentId).parent().removeClass("open");
        	 }
        	 this.subType = undefined;
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
		 * check if question is answered
		 */

       validateStudentQuestionLayout:function(){
    	  
            var validflag=false;
            if(this.subType=='label'){
            	validflag= true;
            	 for(ckey in this.cellComponentCollection){
                     var component = this.cellComponentCollection[ckey].component;
                     if(component != "" && component.type != "Label" && component.type != undefined){
                    	 validflag= component.isStudentAnswered();
                    	 if(!validflag){
         					break;
         				}
                     }
                }
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
      	 var componentScoreSum = 0;
      	 if(this.notApplicableFlag){
      		componentScoreSum = this.getComponentGradeCount();
      	 }
      	 else{
      		for(ckey in this.cellComponentCollection){
                var component = this.cellComponentCollection[ckey].component;
                if(component != "" && component.type != "Label" && component.type != undefined){
                    if(component.graded){
                    	componentScoreSum += component.calculateScore();
                    }
                }
             }
      	 }
         return componentScoreSum;
       },

       getComponentGradeCount:function(){
            var totalGradedCnt = 0;
            for(ckey in this.cellComponentCollection){
                 var component = this.cellComponentCollection[ckey].component;
                 //var cellId = this.cellComponentCollection[ckey].id;
                 if(component != "" && component.type != "Label" && component.type != undefined){
                    if(component.graded){
                        totalGradedCnt++;
                    }
                 }
            }
            return totalGradedCnt;
       },
       createSpreadsheetData : function(rowCount, colCount){
    	   rowCount = typeof rowCount === 'number' ? rowCount : 100;
		   colCount = typeof colCount === 'number' ? colCount : 4;
		  
		  var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id,
              rows = []
		      , i
		      , j
              , cellHtml = []
              , cellComp = [];
		  
          cellHtml = this.cellHTMLCollection;
          cellComp = this.cellComponentCollection;

        if(this.cellHTMLCollection == ""){
            for (i = 0; i < rowCount; i++) {
                var row = [];
                for (j = 0; j < colCount; j++) {
                   row.push(compId+Handsontable.helper.spreadsheetColumnLabel(j) + i);
                   //row.push("");
                    this.cellHTMLCollection.push({"id":compId+Handsontable.helper.spreadsheetColumnLabel(j) + i, row:i, col:j, "itsHtml": ""});
                    this.cellComponentCollection.push({"id":compId+Handsontable.helper.spreadsheetColumnLabel(j) + i, row:i, col:j, "component": ""});
                }
                rows.push(row);
            }
            
        } else{
            for (i = 0; i < rowCount; i++) {
                
                var row = [];
                for (j = 0; j < colCount; j++) {
                    result = $.grep(this.cellHTMLCollection, function(e){ return e.id == compId+Handsontable.helper.spreadsheetColumnLabel(j) + i; });
                    row.push(compId+Handsontable.helper.spreadsheetColumnLabel(j) + i);
                   if(result.length == 0){
                        this.cellHTMLCollection.push({"id":compId+Handsontable.helper.spreadsheetColumnLabel(j) + i, "itsHtml": ""});
                        this.cellComponentCollection.push({"id":compId+Handsontable.helper.spreadsheetColumnLabel(j) + i, "component": ""});
                   }
                }
                rows.push(row);
            }
        }
        return rows;
       },
       
       createSpreadsheetTable : function(){
    	   var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	   var that = this;
    	   var beforeChangeHtml = "";
    	   
           var myRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            
    		   Handsontable.TextCell.renderer.apply(this, arguments);
               td.id = compId+Handsontable.helper.spreadsheetColumnLabel(col) + row;
               if(that.RowReadOnly){
            	   if($(td).data("change")){
        		       $(td).addClass('tableCell');
        		        var tdHtml = that.getItemValById(that.cellHTMLCollection, td.id, "itsHtml");
                        if(tdHtml != ""){
                            $(td).html(tdHtml);
                       }
        		    }
                    if(question.newFormulaFlag == true){
                    	var comp = that.getItemValById(that.cellComponentCollection, td.id, "component");
                        if(comp.type == "Input field"){
                            if(comp.contentFormat.type == "percentage" || comp.contentFormat.type == "currency" || comp.contentFormat.type == "number"){
                                $("#"+td.id + " div").addClass("cellBorder clickableUi");
                                /* check for non chrome browser */
                                if(!isChrome){
                                	$("#"+td.id).addClass("formulaTD");
                                }
                                //temporary fix for  CTST-2374
                                if($("#formulaName").val() != ""){
                                	var formulaId = $("#formulaId").text();
                                	var formulaEquation = question.getFormulaEquation(formulaId);
                                	var studentEntryIds = [];
                                	for( j in question.formulas){	        		 
                   	        		 	if(question.formulas[j].id == formulaId){
                   	        		 		studentEntryIds = question.formulas[j].getStudentEntryIds(formulaEquation);
                   	        		 	}
                                	}
                            		for(var i=0;i<studentEntryIds.length;i++){
                            			if(td.id == studentEntryIds[i]){
                            				 $("#"+td.id + " div").addClass("greenBorder");
                            			}
                            		}
                                }
                            }
                        }
                    }  
                    else{
                        $("#"+td.id + " div").removeClass("clickableUi cellBorder greenBorder");
                        $("#"+td.id).removeClass("formulaTD");
                    }   
                    if($("#"+td.id).find(".deletedFormula").length > 0){
                		 $("#"+td.id).addClass("redBorderCell");
                	 }
                                    
                	
               }
               that.colWidth[col] = instance.getColWidth(col);
               that.colCount = instance.countCols();
               that.rowCount = instance.countRows();
               that.studentColCount = instance.countCols();
               that.studentRowCount = instance.countRows();
               
    		};
    		var greenRenderer = function (instance, td, row, col, prop, value, cellProperties) {
                var comp = that.getItemValById(that.cellComponentCollection, td.id, "component");
                if(comp.type == "Input field"){
                    if(comp.contentFormat.type == "percentage" || comp.contentFormat.type == "currency"){
                        $(td).addClass("cellBorder clickableUi");
                    }
                } 
            };

            $("#SpreadsheetTable_"+compId).handsontable({ 			  
    		  startRows:  that.rowCount,
    		  startCols:  that.colCount,
              colWidths:  that.colWidth,
              colHeaders: true,
 			  rowHeaders: true,
 			  contextMenu: ['row_above', 'row_below','hsep1', 'col_left','col_right','hsep2','remove_row','remove_col','borders'],
 			  customBorders: [],
              manualColumnResize: true,
              stretchH: 'none',
 			  mergeCells: that.mergedCellInfoCollection,
 			  
 			  cells: function (row, col, prop) {//set the new renderer for every cell
 			    
                  this.renderer = myRenderer;
                  
                  if(!that.isCellReadonly){
                   return {
                    readOnly: !that.RowReadOnly
                   };
                  }else{
                   return {
                    readOnly: that.isCellReadonly
                   }; 
                  }
                },
                onSelection: function(row, col, row2, col2){
                    if(that.cellHTMLCollection.length < (that.colCount * that.rowCount) ){
                        that.createSpreadsheetData(that.rowCount, that.colCount);
                    }
                	var cellId = compId + Handsontable.helper.spreadsheetColumnLabel(col) + row;
                    var cellComponent = that.getItemValById(that.cellComponentCollection, cellId, "component");
                    that.cellId = cellId;
                    
                        setTimeout(function(){
                            //hold current table instance
                            var instance = that.itsTableInstance;
                            
                            //Return index of the currently selected cells as an array [startRow, startCol, endRow, endCol]
                          	var sel = instance.getSelected();
                          	selectedInstance = instance;
                          	//check for row and col vals for selection
                          	if(sel[0]!= row || sel[1]!=col){
                          		row = sel[0];
                          		col = sel[1];
                          		
                          		cellId = compId + Handsontable.helper.spreadsheetColumnLabel(col) + row;
                          	}
                          	
                            //set selected cell id
                            var itscellId = Handsontable.helper.spreadsheetColumnLabel(col) + row;
                            if(typeof itscellId != "undefined" && itscellId != ""){
                            	$("span#CellRepresentId_"+compId).text(itscellId);
                            }  
                            
                            cellComponent = that.getItemValById(that.cellComponentCollection, cellId, "component");
                           //add by default label components for blank cells
                            if(cellComponent == ""){
                            	var cmpType = cellComponent.isTableCellLabel;
                            	if(typeof cmpType == "undefined"){
                            		that.addCellComponent('Label');
                            	}
                            }
                                
                            
                            /* to avoid editor property layout to reload incase of hyperlink */
                            if($("td#"+cellId).find("a.tblLink").length == 0){
                                that.populateEditorProperties(cellId);
                            }                            
                            
                            //reset selected cell value
                            if(typeof itscellId != "undefined" && itscellId != ""){
                            	$("span#CellRepresentId_"+compId).text(itscellId);
                            } 
                            
                            //display selected cell range
                            var startCell = "", endCell = "";
                            startCell = Handsontable.helper.spreadsheetColumnLabel(sel[1]) + sel[0];
                            endCell = Handsontable.helper.spreadsheetColumnLabel(sel[3]) + sel[2];
                            
                            var dispCell = "";
                            if(startCell != endCell){
                            	dispCell = startCell + ':' + endCell;
                            }else{
                            	dispCell = startCell;
                            }
                                                        
                            $("span#CellDisplayRange_"+compId).text(dispCell);
                            
                            isMultipleCellsMerge = true;
                            
                            //check for multiple selection and then go for merge and split cells                    
                            if(instance.selection.isMultiple()){
                              var info = instance.mergeCells.mergedCellInfoCollection.getInfo(sel[0], sel[1]);
                              if (info) {
                            	  if(typeof compId != "undefined" && compId != null){
                            		 
                            		  if(that.isAllSelectedMerge(instance.getSelectedRange(), info)){
                            			  isMultipleCellsMerge = false;
                            			  $("#SplitCellsBtnId_"+compId).removeAttr("disabled");
                            			  $("#SplitCellsBtnId_"+compId).removeClass("checkBoxclick");                      
                            			  $("#MergeCellsBtnId_"+compId).addClass("checkBoxclick");
                            			  $("#MergeCellsBtnId_"+compId).trigger("click");                                  
                            			  $("#MergeCellsBtnId_"+compId).attr({"disabled":true});
                            		  }
                            		  else{
                            			  isMultipleCellsMerge = true;
                            			  $("#MergeCellsBtnId_"+compId).removeAttr("disabled");
                            			  $("#MergeCellsBtnId_"+compId).removeClass("checkBoxclick");
                            			  $("#SplitCellsBtnId_"+compId).attr({"disabled":true});
                            		  }
                            	  }
                              }
                              else {
                                 if(typeof compId != "undefined" && compId != null){
	                                 $("#SplitCellsBtnId_"+compId).attr({"disabled":true, "checked":false});
	                                 $("#SplitCellsBtnId_"+compId).addClass("checkBoxclick");
	                                 $("#MergeCellsBtnId_"+compId).removeAttr("disabled");
	                                 $("#MergeCellsBtnId_"+compId).removeClass("checkBoxclick");
                                }
                              }
                            }
                            else{
                            	$("#MergeCellsBtnId_"+compId).addClass("checkBoxclick");
                            	$("#MergeCellsBtnId_"+compId).attr({"disabled":true, "checked":false});
                            	$("#SplitCellsBtnId_"+compId).addClass("checkBoxclick");
                            	$("#SplitCellsBtnId_"+compId).attr({"disabled":true, "checked":false});
                            	
                            }
                            
                        },200);
                    //}
                    
                    //check for cell component to make it editable or not
                    
                    //var cellComponent = that.getItemValById(that.cellComponentCollection, cellId, "component");
                    if(cellComponent != ""){
                    	var cmpType = cellComponent.isTableCellLabel;
                    	if(typeof cmpType != "undefined" && cmpType != null && cmpType){
                    		var haveLinkA = $("td#"+cellId).find("a.tblLink");
                    		if(cmpType && haveLinkA.length > 0){
                    			that.isCellReadonly = true;
                    		}
                    		else{
                    			that.isCellReadonly = false;
                    		}
                    		
                    	}else{
                    	    that.isCellReadonly = true;
                    	}
                    	
                    }else{
                    	that.isCellReadonly = false;
                    }
                    
                },/* below code for handling text orientation of labels */
                onBeforeChange: function (changes, source) {
                	if (source === 'loadData') {
                        return; //don't show this change in console
                    }
                    
                	//changes is multidimesional array
                    if(changes.length >0){                    	
                    	var selectedCell = that.itsTableInstance.getCell(changes[0][0], changes[0][1]);
                        var checkFortextWrapper = $(selectedCell).find("div[data-hold]");                         
                        if(checkFortextWrapper.length > 0){
                        	var innerDivClass = checkFortextWrapper.attr("class");
                        	if(typeof innerDivClass == "undefined"){
                        		innerDivClass = "";
                        	}
                        	
                        	var catchCellHtml = checkFortextWrapper.html();
                        	var deepChild = that.findDeepestChild(checkFortextWrapper);                        	
                        	
                        	var haveLinkA = checkFortextWrapper.find('a.tblLink');
                        	if(!haveLinkA.length > 0){
                        		if(catchCellHtml == "" || checkFortextWrapper.text() != changes[0][3]){
                        			if(deepChild.depth > 0 && deepChild.element.prop("tagName") != "A"){
                        				deepChild.element.text(changes[0][3]);
                            			catchCellHtml = checkFortextWrapper.html();
                        			}else{
                        				catchCellHtml = changes[0][3];
                        				catchCellHtml = catchCellHtml.replace("<", "&lt;");
                                		catchCellHtml = catchCellHtml.replace(">", "&gt;");
                        			}
                            		//catchCellHtml = changes[0][3];                        			
                            		//catchCellHtml = catchCellHtml.replace("<", "&lt;");
                            		//catchCellHtml = catchCellHtml.replace(">", "&gt;");
                            	}
                        	}else{
                        		catchCellHtml = changes[0][3];
                        	}
                        	
                            var updatedCellHtml = '<div data-hold="textWrapper" class="'+innerDivClass+'">';
                            updatedCellHtml += catchCellHtml;
                            updatedCellHtml += '</div>';                            
                            beforeChangeHtml = updatedCellHtml;
                        }else{
                        	beforeChangeHtml = "";
                        }	
                    }
                    
                },
                onChange: function (changes, source) {
                    if (source === 'loadData') {
                      return; //don't show this change in console
                    }
                    //changes is multidimesional array
                  
                    if(changes.length >0){            
                    	var selectedCell = that.itsTableInstance.getCell(changes[0][0], changes[0][1]);
                        if(beforeChangeHtml != ""){                        	              
                            $(selectedCell).html(beforeChangeHtml);
                        }	
                        that.changeValById(that.cellHTMLCollection, selectedCell.id, "itsHtml", $("#"+selectedCell.id).html());
                    }
                },
                afterChange : function(changes, source){
                	//var checkFortextWrapper = $(selectedCell).find("div[data-hold]");
                	if (source === 'loadData') {
                        return; //don't show this change in console
                    }
                	var selectedCell = that.itsTableInstance.getCell(changes[0][0], changes[0][1]);
                	var component = that.getItemValById(that.cellComponentCollection, selectedCell.id, "component");
                    if(component.type == 'Label'){
                	  var newChangeHtml = "";
       			      var checkFortextWrapper = $(selectedCell).find("div[data-hold]");                         
                      if(checkFortextWrapper.length > 0){                        	                           
                    	newChangeHtml = checkFortextWrapper.html();                    	
                    	if(newChangeHtml == ""){
                    		newChangeHtml = changes[0][3];
                    	}
                      }else{                        	
                    	newChangeHtml = $(selectedCell).html();                           
                      }
					  if(newChangeHtml !=""){
						$("#"+component.editor.id).html(newChangeHtml);
                	    $("#"+component.editor.id).trigger("change");
                	    $("#"+component.editor.id).trigger("blur");
					  }           
                    }
                    that.tableCellData = that.itsTableInstance.getData();
                    /*if(that.CustomBorders.length > 0){
                 	   that.applyBordersOnRender(); 
                    }*/
                },
                afterRenderer : function(){
                	if(that.CustomBorders!=null){
                	 if(that.CustomBorders.length > 0 && that.itsTableInstance != null){
                   	   that.applyBordersOnRender(); 
                      }
                	}
                }
                
 			});
    	  this.itsTableInstance = $("#SpreadsheetTable_"+compId).handsontable('getInstance');
    	  this.mergedCellInfoCollection = this.itsTableInstance.mergeCells.mergedCellInfoCollection;           
       },
       
       updateTableDimensions : function(){
            if(!this.RowReadOnly){
                this.itsTableInstance.loadData(this.tableCellData);
            }

           var filed;
    	   var rows = $("#RowVal"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val();
 		   var cols = $("#ColVal"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).val();
 		   rows = (rows!="" && rows != null) ? Math.round(parseFloat(rows)) : 0;
 		   cols = (cols!="" && cols != null) ? Math.round(parseFloat(cols)) : 0;
           
           if(rows <= 0 || isNaN(rows)){
                filed = $("#RowVal"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id);
           } else if(cols <= 0 || isNaN(cols)) {
                filed = $("#ColVal"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id);
           }
           if( isNaN(rows) || isNaN(cols)){
              new Modal(
              {
                  id : 1,headingText : "Validation Error",
                  containtText : "Table rows, column should be number",
                  closeActionEvent:function(){
                      $(filed).trigger("focus");
                      $(filed).val("");
                  }
              }).getWarningModal();
              return false;
           }
           if(rows<=0 || cols<= 0){
                 new Modal(
                      {
                          id : 1,headingText : "Validation Error",
                          containtText : "Table rows, column can not be zero or less than 0",
                          closeActionEvent:function(){
                              $(filed).trigger("focus");
                              $(filed).val("");
                          }
                      }).getWarningModal();
                return false;
            }
           //while removing row or col check if componet is branched and if yes then check while 
           //removing row or col is cell containing inputField or formula is getting deleted
           if(this.isBranched){
	    	   var startCol = 0;
	    	   var delCellsArr = [];
	           if(rows < this.rowCount && cols < this.colCount){
	        	 
	        	   for(var rowIndex = 0; rowIndex < this.rowCount; rowIndex++){
	        		  
	        		   if(rowIndex == rows || rowIndex > rows){
	        			   startCol = 0;
	        		   }else{
	        			   startCol = cols;
	        		   }
		    			for(var colIndex = startCol; colIndex < this.colCount; colIndex++){
		    				var cell = this.itsTableInstance.getCell(rowIndex, colIndex);
		    				if(cell != null){
		    					delCellsArr.push(cell.id);
		    				}
		    			}
	        	   }
	           }else if(rows < this.rowCount){
	        	   for(var rowIndex = rows; rowIndex < this.rowCount; rowIndex++){
		    			for(var colIndex = 0; colIndex < this.colCount; colIndex++){
		    				var cell = this.itsTableInstance.getCell(rowIndex, colIndex);
		    				if(cell != null){
		    					delCellsArr.push(cell.id);
		    				}
		    			}
	        	   }
	           }else if(cols < this.colCount){
	        	   for(var rowIndex = 0; rowIndex < this.rowCount; rowIndex++){
		    			for(var colIndex = cols; colIndex < this.colCount; colIndex++){
		    				var cell = this.itsTableInstance.getCell(rowIndex, colIndex);
		    				if(cell != null){
		    					delCellsArr.push(cell.id);
		    				}
		    			}
	        	   }
	           }
	           
    	   //cells to remove from table
    	  
    	   var deleCellIndex = 0;
    	   var isFormulaDest = false;
    	   var isInputField = false;
		   var cellId = "";
		   var component = null;
		  
			   for(deleCellIndex in delCellsArr){
	    		   cellId = delCellsArr[deleCellIndex];
	    		   component = this.getItemValById(this.cellComponentCollection, cellId, "component");
	    		   if(component.type == "Label"){
	    			   for(var i=0 ; i < question.formulas.length ; i++){
			 				var formula = question.formulas[i];
			          		if($.inArray(cellId, formula.destinations) != -1){
			          			isFormulaDest = true;
			          			break;
			          		}
	    	           } 
	    		   }else if(component.type == 'Input field'){
	    			    var contFor = component.contentFormat.type;
		               	if(contFor == "number" || contFor == "percentage" || contFor == "currency"){
		               		isInputField = true;
		               		break;
		               	}
	    		   }
	    	   }
			   if(isFormulaDest || isInputField){
				   new Modal({
						id : 1,
						headingText : "Warning ! ",
						containtText : "This component is a part of path mapping logic and cannot be deleted.",
					}).getWarningModal();
					return false;
			   }
		   }
    	
            var mergeRow = [];
            var mergeCol = [];
            var mergeCollection = this.itsTableInstance.mergeCells.mergedCellInfoCollection;
            
            var i = 0;
            for(; i<mergeCollection.length; i++){

                mergeRow.push(mergeCollection[i].row + mergeCollection[i].rowspan);
                mergeCol.push(mergeCollection[i].col + mergeCollection[i].rowspan);
               	if(cols <= mergeCollection[i].col || cols <= mergeCol[i]){
                    //this.itsTableInstance.mergeCells.mergedCellInfoCollection.splice(i,1);
               		this.itsTableInstance.mergeCells.mergedCellInfoCollection.removeInfo( mergeCollection[i].row, mergeCollection[i].col);
               		mergeCollection = this.itsTableInstance.mergeCells.mergedCellInfoCollection;
               		i = -1;
                }
            }
            this.createSpreadsheetData(rows, cols);
           if(rows < this.rowCount){
                this.itsTableInstance.alter('remove_row', null, this.rowCount-rows);
           } else if(rows > this.rowCount){
                this.itsTableInstance.alter('insert_row', null, rows-this.rowCount);
           }
           if(cols < this.colCount){
                this.itsTableInstance.alter('remove_col', null, this.colCount-cols);
           } else if(cols > this.colCount){
                this.itsTableInstance.alter('insert_col', null, cols-this.colCount);
           }
           this.update();
 		   this.rowCount = rows;
 		   this.colCount = cols;
           this.studentRowCount = rows;
           this.studentColCount = cols;
           if(!this.RowReadOnly){
                this.tableCellData = this.itsTableInstance.getData();
                this.tableData = this.createSpreadsheetData(rows, cols);
                this.itsTableInstance.loadData(this.tableData);
            }
            var that = this;
            setTimeout(function(){
                that.updateTblCellCollections();    
                //that.itsTableInstance.selectCell(0,0);
            },200);
            if(this.CustomBorders!=null){
	            if(this.CustomBorders.length > 0){
	          	   this.applyBordersOnRender(); 
	             }
            }
            this.itsTableInstance.selectCell(this.rowCount,this.colCount);
            var tableWidth = 50;
            var i = 0;
            for(i = 0; i < this.colCount; i++){
            	if(this.colWidth[i] == undefined){
            		tableWidth += 75;
            	}else{
            		tableWidth += this.colWidth[i];
            	}
            }
            tableWidth = tableWidth + 50;
            if(tableWidth < 768){
            	$("#"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).css("width","800px");
            }else{
                $("#"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).css("width",tableWidth+"px");
            }
        
            $("#formToolCanvasId").css("overflow-x","scroll");
            //$("#SpreadsheetTable_"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).css("width","786px");
           //$("#SpreadsheetTable_"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id).css("overflow","scroll");
            //this.itsTableInstance.render();
       },
       /*
        * update Cell's HtmlCollection and ComponentCollection array
        */
       updateTblCellCollections : function(){
    	   var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	   var updatedTdIds = [];
    	   //get current td id's from updated table
    	   $("#SpreadsheetTable_"+compId+" td").each(function() {
    		   updatedTdIds.push($(this).attr("id"));    
    	   });
			
    	   //update collection array based on matched td id's
    	   this.cellComponentCollection = $.grep(this.cellComponentCollection, function(element) { 
    		   								return $.inArray(element.id, updatedTdIds ) !== -1;
    		   	  						  });
    	   this.cellHTMLCollection = $.grep(this.cellHTMLCollection, function(element) { 
										return $.inArray(element.id, updatedTdIds ) !== -1;
				  					 });    
    	   
    	   
    	   for(var i=0 ; i < question.formulas.length ; i++){
				var formula = question.formulas[i];
       			formula.destinations = $.grep(formula.destinations, function(element) { 
									   		return $.inArray(element, updatedTdIds ) !== -1;
									   });
       	   }
       },

       onTableClik : function(event){
            var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
            if(is_chrome){
                try{
                    if(this.itsTableInstance.selection.isMultiple()){
                        return false;
                    }
                } catch(e){

                }
            }
            
            var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;            
            if( event.currentTarget.id == "SpreadsheetTable_"+compId && event.target.classList[0]!="tableCell" && !event.target.hasAttribute("data-hold")
                && event.target.classList[0] != "handsontableInput" ){
            	/* code to update ranges for formual */
            	var rangeParentId = $(document.activeElement).parents("div[id^=rangeFeedback_]").attr("id");
            	if(typeof rangeParentId != "undefined"){
            		var cellCompId = rangeParentId.split("_")[1]; //get cell Id
            		var cellComp = this.getItemValById(this.cellComponentCollection,cellCompId,"component");
            		if(cellComp != "" && cellComp.type == "Label"){
            			var c=0;
            			for(c in cellComp.ranges){
            				cellComp.ranges[c].update(); // update ranges
            			}
            		}
            	}
            	this.populateComp();
            }
            $("#compBody_"+compId+".spreadsheettableWrapper").width($("#compBody_"+compId+".spreadsheettableWrapper.ht_clone_top").width());
            event.stopImmediatePropagation();
        },
       
       /**
        * populate option text editor properties
        */
        populateEditorProperties:function(cellId){
            
            var html = this.cellPropertyLayout(cellId);
        	$("#elementProperties").html("");
        	$("#elementProperties").html(html);
            $("#elementProperties").show();
            $("#properties").hide();
            this.afterEditorPropertyLayout();
            $("#activeHyperlink").text("");
            var component = this.getItemValById(this.cellComponentCollection, cellId, "component");
            var componentId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id;
            var displayDropdownVal = '';

            $("#MergeCellsBtnId_"+componentId).addClass("checkBoxclick");
            $("#MergeCellsBtnId_"+componentId).attr({"disabled":true, "checked":false});
            $("#SplitCellsBtnId_"+componentId).addClass("checkBoxclick");
            $("#SplitCellsBtnId_"+componentId).attr({"disabled":true, "checked":false});
            
            if(component != ''){
            	 displayDropdownVal = component.type;
            	var layoutHtml = component.layout();
            	$("#CellComponenetsWrapper_"+componentId).hide();
            	$("#CellComponenetsWrapper_"+componentId).html(layoutHtml);
            	component.populateComp();
            	component.afterLayout();
            	if(displayDropdownVal != "Label"){
              	  $("#CellLabelTextOrientationProperties").hide();//hide cell text orientation dropdown
              	  $("#CellComponenetsWrapper_"+componentId).show();
            	}else{
              	  $("#CellLabelTextOrientationProperties").show();//show cell text orientation dropdown
              	  $("#CellComponenetsWrapper_"+componentId).hide();
              	  for(var i=0 ; i < question.formulas.length; i++){
              		if($.inArray(cellId, question.formulas[i].destinations) != -1){
              			$("#CellComponenetsWrapper_"+componentId).show();
              			//update height of overlay after showing CellComponenetsWrapper div
                    	$(".overlayNewFormula").height($("#formToolCanvasId").height()+50);
                    	
              		}
              	  }
            	}
            }
            else{
            	 displayDropdownVal = 'Label';
            	 $("#CellComponenetsWrapper_"+componentId).html("");
            	 $("#CellLabelTextOrientationProperties").show();
            }
       
            if(displayDropdownVal != ""){
	 			   //update dropdown values
	 			   $("#mode_"+componentId).text(displayDropdownVal);
	 			   //update cell type values to display
	 			   $("#TableCellComponenType_"+componentId).text(displayDropdownVal+" : ");
	 			   $("#TableCellComponenTypeId_"+componentId).text("ID "+cellId);
 			  }
              if($("#mode_"+componentId).parent().hasClass("open")){
            	 $("#mode_"+componentId).parent().removeClass("open");
    	      }
        	
        },
       /**
   	  * adds events for html elements of current option editor property pane
   	  */
   	 afterEditorPropertyLayout:function(cellId){
   		var componentId = this.pageIdPrefix+this.pageId+this.idPrefix +this.id;   		
  	 	
  	 	TableComponent.addEvent("SplitCellsBtnId_" + componentId, "click", this._splitCells);
  	 	TableComponent.addEvent("MergeCellsBtnId_" + componentId, "click", this._mergeCells);
  	 	
  	 	TableComponent.addEvent("label" + componentId, "click", this._changeSubType, {
            "subType": "label"
        });
        TableComponent.addEvent("inputField" + componentId, "click", this._changeSubType, {
            "subType": "inputField"
        });
        	         
        TableComponent.addEvent("CheckBox" + componentId, "click", this._changeSubType, {
            "subType": "CheckBox"
        });
        
        TableComponent.addEvent("dropDown" + componentId, "click", this._changeSubType, {
            "subType": "dropDown"
        });
     },
     addCellComponent : function(correspondingComponent){
    	 var cellDispHtml = "";
    	 var  cellCompHtml = "";
    	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var itsCellId = $("span#CellRepresentId_"+cmpntId).text();
    	 
    	 switch(correspondingComponent){
    	   case "Label" :
    		 cellCompHtml = this.getLabelFieldComponent();    		 
    	   break;
    	   case "inputField":
    		 cellCompHtml = this.getInputFieldComponent();
    		 cellDispHtml += '<div style="position: absolute; background-color:#ccc; width:100%; height:100%; margin-left:-3px; padding-right:4px;border: 1px solid white;"></div>'; 
           break;
    	   case "CheckBox":
    		   cellCompHtml = this.getCheckboxComponent(); 
    		   cellDispHtml += '<div id="CellCheckboxField_'+cmpntId+itsCellId+'">';
    		   cellDispHtml += '<input type="checkbox" disabled="disabled" />';
    		   cellDispHtml += '<span class="checkboxText"></span>';
    		   cellDispHtml += '</div>';
    	   break;
    	   case "dropDown":
    		 cellCompHtml = this.getDropDownComponent();
    		 cellDispHtml += '<select id="CellDropDownField_'+cmpntId+itsCellId+'">';
    		 cellDispHtml += '<option value="0">&nbsp;&nbsp;&nbsp;</option>';    		 
    		 cellDispHtml += '</select>';
           break;
           default:
    	 }
    	 
    	 if(cellCompHtml != ""){    	  
    	 
    	  $("#CellComponenetsWrapper_"+cmpntId+" div.cellComponent").hide();    	  
    	  $("#CellComponenetsWrapper_"+cmpntId+" div#cellComponent_"+cmpntId+itsCellId).show();
    	  var moreCellComponents = $("#CellComponenetsWrapper_"+cmpntId+" div#cellComponent_"+cmpntId+itsCellId);
    	  if(moreCellComponents.length >1){
    		  var cnt=0;
    		  for(; cnt < moreCellComponents.length-1; cnt++){
    			  moreCellComponents[cnt].remove(); //remove previously added same id components
    		  }
    	  }
    	  
    	  /* update graded counts */
    	  $("#gradadedObjectBtnId"+cmpntId+itsCellId).trigger("click");
    	 }
    	 
    	 return cellDispHtml;
     },
     getLabelFieldComponent : function(){    	 
    	 var itsCellId = Handsontable.helper.spreadsheetColumnLabel(selectedTableCells[1]) + selectedTableCells[0];
    	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var selectedCellId = this.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]).id;
    	 
    	 var component = new TableLabel({
			id : this.id,
			pageIdPrefix:this.pageIdPrefix,
			pageId:this.pageId,
			cellId:itsCellId
		 });
    	 
    	 var rangeConfig = {
    	    id : this.id,
    	    componentId :component.id+itsCellId,
    	    componentIdPrefix :this.pageIdPrefix+this.pageId+this.idPrefix    		
    	 }; 
    	 component.addRange(new Range(rangeConfig));
    	 
    	 var htmlelement = component.layout();
  		 $("#CellComponenetsWrapper_"+cmpntId).append(htmlelement);
  		 component.afterLayout();
         //this.changeValById(this.cellComponentCollection, selectedCellId, "component", ''); 
         var cellComp = this.getItemValById(this.cellComponentCollection, selectedCellId, "component");
         cellComp.type = "";
         cellComp.subType = "";
         cellComp.contentFormat = "";
         this.changeValById(this.cellComponentCollection, selectedCellId, "component", component);
         return htmlelement;    	 
     },
     getLabelFieldComponentStudentLayout : function(cellId, comp){    	 
    	 
    	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var selectedCellId = cmpntId + cellId;
    	 
    	 var component = new TableLabel({
			id : this.id,
			pageIdPrefix:this.pageIdPrefix,
			pageId:this.pageId,
			cellId:cellId,
			cellTextOrientation:comp.cellTextOrientation
		 });
    	 var eConfig = {
					id : component.pageIdPrefix + component.pageId
							+ component.idPrefix + component.id + component.cellId + component.textBoxIdPrefix + component.id,
					text : comp.editor.text,
					textWithoutFormatting : comp.editor.textWithoutFormatting
				};
				
    	 component.editor = new Editor(eConfig);
    	
    	 var rangeConfig = {
    	    id : this.id,
    	    componentId :component.id+cellId,
    	    componentIdPrefix :this.pageIdPrefix+this.pageId+this.idPrefix    		
    	 }; 
    	 component.addRange(new Range(rangeConfig));
    	 var cellHtml = this.getItemValById(this.cellHTMLCollection, selectedCellId, "itsHtml");
    	 this.changeValById(this.cellHTMLCollection, selectedCellId, "itsHtml", cellHtml);
    	 var htmlelement = component.studentLayout(cellHtml);
  		 component.afterStudentLayout();
  		 component.isStudentLabel = true;
         this.changeValById(this.cellComponentCollection, selectedCellId, "component", component); 
  		 return htmlelement;    	 
     },
     getCheckboxComponent: function(){
    	 var maxId = 0;
    	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var selectedCellId = this.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]).id;
    	 var itsCellId = Handsontable.helper.spreadsheetColumnLabel(selectedTableCells[1]) + selectedTableCells[0];;
		 
 		 var newId = maxId + 1;		 
 		var component = new TableCheckboxComponent({
 			id : this.id,
 			pageIdPrefix:this.pageIdPrefix,
 			pageId:this.pageId,
 			cellId:itsCellId
 		});
 		var gfEditor = new Editor({
 			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
 					+ component.generalFeedbackPrefix,
 		});
 		
 		var ofFeedback = new Editor({
 			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
 					+ component.overallFeedbackPrefix,
 		});
 		
 		component.generalFeedback = gfEditor;
 		component.overallFeedback = ofFeedback;
 		
 		var options = [];

 		var config = {
 			componentId : component.id+itsCellId,
 			componentIdPrefix : this.pageIdPrefix+this.pageId+component.idPrefix
 		};
 		config.id = 1;
 		options[0] = new TableOption(config);
 		
 		component.setOptions(options);
 		
 		var htmlelement = component.layout();
 		
 		$("#CellComponenetsWrapper_"+cmpntId).append(htmlelement);
 		component.afterLayout();
 	   
 		this.changeValById(this.cellComponentCollection, selectedCellId, "component", component); 
 		return htmlelement;
     },
     getDropDownComponent : function(){
    	 var maxId = 0;
    	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
		  
    	 var selectedCellId = this.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]).id;
 		
    	  var itsCellId = Handsontable.helper.spreadsheetColumnLabel(selectedTableCells[1]) + selectedTableCells[0];;
		  var newId = maxId + 1;
		  
		var component = new TableDropDownComponent({
			id : this.id,
			pageIdPrefix:this.pageIdPrefix,
			pageId:this.pageId,
			cellId:itsCellId
		});
		var gfEditor = new Editor({
			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
					+ component.generalFeedbackPrefix,
		});
		
		var ofFeedback = new Editor({
			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
					+ component.overallFeedbackPrefix,
		});
		
		component.generalFeedback = gfEditor;
		component.overallFeedback = ofFeedback;
		var sections = [];
		
		var config = {
			id:1,
			componentId : component.id,
			componentIdPrefix : this.pageIdPrefix+this.pageId+component.idPrefix,
			cellId:itsCellId
		};
		sections[0]= new TableDropDownSection(config);
		var options = [];
		for (var i=1;i<=2;i++){
			var optionConfig = {
					id:i,
					sectionId : config.id,
					sectionIdPrefix : config.componentIdPrefix+config.componentId+config.cellId+sections[0].idPrefix,
					componentId : config.componentId,
					componentIdPrefix : config.componentIdPrefix
				};
			var option =new TableDropDownOption(optionConfig);
			var optionAnswers = [];
			var optionAnswersConfig = {
					id:1,
					optionId : option.id,
					optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
					componentId : option.componentId,
 					componentIdPrefix : option.componentIdPrefix,
 					sectionId : option.sectionId,
					sectionIdPrefix : option.sectionIdPrefix,
					right : false
				};
			optionAnswers[0]=new TableDropDownOptionAnswer(optionAnswersConfig);
			option.setAnswers(optionAnswers);
			options.push(option);
		}		
		sections[0].setOptions(options);		
		component.setSections(sections);
		
		var htmlelement = component.layout();
		
		$("#CellComponenetsWrapper_"+cmpntId).append(htmlelement);
		component.afterLayout();
		this.changeValById(this.cellComponentCollection, selectedCellId, "component", component);
		  
		return htmlelement;
     },
     getItemValById : function(source, id, key){
    	for (var i = 0; i < source.length; i++) {
    	  if (source[i].id === id) {
    		 return source[i][key];
    	  }
        }
    	throw "Couldn't find object with id: " + id;
     },
     changeValById: function(source, id, key, newVal){
    	 for (var i = 0; i < source.length; i++) {
    	   if (source[i].id === id) { 
    		 source[i][key] = newVal; 
    		 return;
    	   }
    	 }
     },   
     getInputFieldComponent  : function(){    	 
    	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var selectedCellId = this.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]).id;
    	 var itsCellId = Handsontable.helper.spreadsheetColumnLabel(selectedTableCells[1]) + selectedTableCells[0];;
		 
		  var newId = 1;
		  
		var component = new TableInputFieldComponent({
			id : this.id,
			pageIdPrefix:this.pageIdPrefix,
			pageId:this.pageId,
			cellId:itsCellId
		});
		 var studEntry = new TableStudentEntry({
   			id : component.id,
   			componentId:this.id,
   			componentIdPrefix:component.pageIdPrefix+component.pageId+component.idPrefix,
   			cellId:component.cellId
   		});
       	var studEntries=[];
       	studEntries[0]=studEntry;
       	component.setStudentEntries(studEntries);
		var gfEditor = new Editor({
			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
					+ component.generalFeedbackPrefix,
		});
		
		var ofFeedback = new Editor({
			id : component.pageIdPrefix+component.pageId+component.idPrefix + newId
					+ component.overallFeedbackPrefix,
		});
		
		component.generalFeedback = gfEditor;
		component.overallFeedback = ofFeedback;		
		var htmlelement = component.layout();
		
		$("#CellComponenetsWrapper_"+cmpntId).append(htmlelement);
		component.afterLayout();
		this.changeValById(this.cellComponentCollection, selectedCellId, "component", component);
		this.authorEntries.push(component);
		return htmlelement;
     },
    
     isAllSelectedMerge : function(selection, info){
    	 var topLeftSelected = '';
    	 var topLeftMerged = '';
    	 var bottomRightSelected = '';
    	 var bottomRightMerged = '';
    	
    	 var topLeftCellRowIndex = selection.from.row < selection.to.row ? selection.from.row : selection.to.row;
    	 var topLeftCellColIndex = selection.from.col < selection.to.col ? selection.from.col : selection.to.col;
    	 var bottomRightCellRowIndex = selection.from.row > selection.to.row ? selection.from.row : selection.to.row;
    	 var bottomRightCellColIndex = selection.from.col > selection.to.col ? selection.from.col : selection.to.col;
    	
    	 topLeftSelected = this.itsTableInstance.getCell(topLeftCellRowIndex, topLeftCellColIndex);
    	 bottomRightSelected = this.itsTableInstance.getCell(bottomRightCellRowIndex, bottomRightCellColIndex);
    	 topLeftMerged = this.itsTableInstance.getCell(info.row, info.col);
    	 bottomRightMerged = this.itsTableInstance.getCell(info.row + (info.rowspan - 1), info.col +  (info.colspan - 1));
    	
    	 if(topLeftSelected.id == topLeftMerged.id && bottomRightSelected.id == bottomRightMerged.id){
    		 return true;
    	 }
    	 return false;
     },
     markTableNotApplicable : function(){
    	 if($("#notApplicableCheckBox"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .inputFieldStudentEntry").each(function () { 
	    		 $(this).attr('contenteditable',"false");
	    	 });
	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .studentViewCheckbox").each(function () { 
	    		 $(this).prop("disabled", true);
	    	 });
	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .dropDownOption").each(function () { 
	    		 $(this).prop("disabled", true);
	    	 });
	    	 this.notApplicableFlag = true;
            
             $("#notApplicableDivStudent"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("notapplicable");
             $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .hasDatepicker").css("visibility","hidden");
             
             $("#addRemoveRow_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+ " a").addClass("aa");
    	 }
    	 else{
    		 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .inputFieldStudentEntry").each(function () { 
	    		 $(this).attr('contenteditable',"true");
	    	 });
	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .studentViewCheckbox").each(function () { 
	    		 $(this).prop("disabled", false);
	    	 });
	    	 $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .dropDownOption").each(function () { 
	    		 $(this).prop("disabled", false);
	    	 });
	    	 this.notApplicableFlag = false;
             $("#notApplicableDivStudent"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("notapplicable");
             $("#"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id + " .hasDatepicker").css("visibility","");
             
             $("#addRemoveRow_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+ " a").removeClass("aa");
    	 }
    	 if(this.isBranched){
    		 for(ckey in this.cellComponentCollection){
   				 var compnt = this.cellComponentCollection[ckey].component;
    			 if(compnt.type == "Input field"){
    				 compnt.studentEntries[0].activateBranching("");
    				 break;
    			 }
		    }
    	 }else{
    		 question.updateProgressBar();
    	 }
     },
     /**
	 * check if question is answered
	 */
     isStudentAnswered:function(){
		 var validflag=true;
			 
		 if(this.notApplicableFlag){
			validflag=true;
		 }else{
		    for(ckey in this.cellComponentCollection){
   				 var compnt = this.cellComponentCollection[ckey].component;
    			 if(compnt != "" && (compnt.mandatory || compnt.isBranched) && compnt.type != "Label"){
					 validflag = compnt.isStudentAnswered();
					 if(!validflag){
						 break;
					 }
    			 }
		    }
		 }
		 return validflag;
     },	     
	 /**
	  * Merge current selected Cells
	  * @param event
	  */
     mergeCells:function(){
    	 	if($("#MergeCellsBtnId_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){	    		 	
    	 		//this.itsTableInstance.mergeCells.mergeSelection(selectedTableRange);
    	 		var tblInstance = this.itsTableInstance;
    	 		var startRow = selectedTableRange.from.row;
    	 	    var endRow = selectedTableRange.to.row;
    	 	    var startCol = selectedTableRange.from.col;
    	 	    var endCol = selectedTableRange.to.col;
	    	 	var i,j;
    	 		if(isMultipleCellsMerge){
    	 		  	var isExistFormula = checkRangeData(selectedTableRange.getTopLeftCorner(), selectedTableRange.getBottomRightCorner(), tblInstance, "merge");
    	 		  	if(isExistFormula){ /* if formula present */
    	 				var that = this;
    			     	new Modal({id : 1,
    			         	headingText : "Are you sure?",
    			         	containtText : "You will loose formulas contained in these cells if you merge them. Are you sure you want to merge cells? This can't be undone.",
    			         	okActionEvent : function(){
    			        	  	//tblInstance.mergeCells.mergeSelection(selectedTableRange);
    			    	 	   	if(startRow > endRow){
    			    	 		  	var temp = startRow;
    			    	 		 	startRow = endRow;
    			    	 		 	endRow = temp;
    			    	 	   	}
    			    	 	  	if(startCol > endCol){
    			    	 			var temp = startCol;
    			    	 		 	startCol = endCol;
    			    	 		 	endCol = temp;
    			    	 	   	}
    			    	 	   tmpData = tblInstance.getData();
    			    	 	   for(i = startCol; i<= endCol; i++){
    			    	 	   		for(j=startRow; j<= endRow; j++){
    			    	 	   			if(i == startCol && j ==  startRow){
    			    	 	   				
    			    	 	   			} else{
    			    	 	   				var charCode = 65;
    			    	 	   				var cellId = that.pageIdPrefix+that.pageId+that.idPrefix+that.id+String.fromCharCode(charCode+i)+j;
    			    	 	   				tmpData[j][i] = '';
	    			    	 	   			/*for(var i=0 ; i < question.formulas.length ; i++){
	    			  						  var formula = question.formulas[i];
		    			  		          		if($.inArray(cellId, formula.destinations) != -1){
		    			  		          			formula.removeDestination(cellId);
		    			  		          		}
	    			    	 	   			}*/
	    			    	 	   			that.removeFormulaDestination(cellId);
    			    	 	   				that.changeValById(that.cellHTMLCollection, cellId, "itsHtml", '');
    			    	 	   				that.changeValById(that.cellComponentCollection, cellId, "component", '');
    			    	 	   				
    			    	 	   			}
    			    	 	   		}
    			    	 	  	}
    			    	 	  	tblInstance.mergeCells.mergeSelection(selectedTableRange);
    			    	 	  	that.removeBordersMerge(startRow, startCol, endRow, endCol);
    			    	 	  	var custBorder = {
    			    					'border' : 'removeBorderMerge',
    			    					'range' : selectedTableRange
    			    			};
    			    			that.CustomBorders.push(custBorder);
    			    	 	   	tblInstance.loadData(tmpData);
    			    	 	   	tblInstance.render();
    			    	 	   if(that.CustomBorders!=null){
	    			    	 	    if(that.CustomBorders.length > 0){
	    			             	   that.applyBordersOnRender(); 
	    			                }
    			    	 	   }
    			        	},
    			        	cancelActionEvent : function(){
    			         		$("#MergeCellsBtnId_"+that.pageIdPrefix+that.pageId+that.idPrefix+that.id).prop("checked", false);
    			         		return false;
    			        	}
    			     	}).getConfirmationModalMerge();
    			  		return;
    		     	} else {
    		     		if(startRow > endRow){
			    	 		  var temp = startRow;
			    	 		 startRow = endRow;
			    	 		 endRow = temp;
			    	 	   }
			    	 	  if(startCol > endCol){
			    	 		  var temp = startCol;
			    	 		 startCol = endCol;
			    	 		 endCol = temp;
			    	 	   }
			    	 	   tblInstance.mergeCells.mergeSelection(selectedTableRange);
			    	 	   this.removeBordersMerge(startRow, startCol, endRow, endCol);
			    	 	   var custBorder = {
			    					'border' : 'removeBorderMerge',
			    					'range' : selectedTableRange
			    		   };
			    		   this.CustomBorders.push(custBorder);
			    	 	   tmpData = tblInstance.getData();
			    	 	   for(i = startCol; i<= endCol; i++){
			    	 	   		for(j=startRow; j<= endRow; j++){
			    	 	   			if(i == startCol && j ==  startRow){
			    	 	   				
			    	 	   			} else{
			    	 	   				var charCode = 65;
			    	 	   				var cellId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+String.fromCharCode(charCode+i)+j;

			    	 	   				tmpData[j][i] = '';
				    	 	   			var cellComp = this.getItemValById(this.cellComponentCollection, cellId, "component");
					    	 	   		if(cellComp.type == 'Input field'){
			    							var contFor = cellComp.contentFormat.type;
						                	if(contFor == "number" || contFor == "percentage" || contFor == "currency"){
						                		showCautionIcon(cellId, 'removeEntry');
						                	}
			    						}
			    	 	   				if(cellComp.contentFormat){
			    	 	   					cellComp.contentFormat.type = "";
			    	 	   				}
			    	 	   				if(cellComp.type){
			    	 	   					cellComp.type="";
			    	 	   				}
			    	 	   				this.changeValById(this.cellHTMLCollection, cellId, "itsHtml", '');
			    	 	   			    this.changeValById(this.cellComponentCollection, cellId, "component", '');
			    	 	   			}
			    	 	   		}
			    	 	   }
			    	 	   tblInstance.loadData(tmpData);
			    	 	   tblInstance.render();
			    	 	  if(this.CustomBorders!=null){
			    	 	   if(this.CustomBorders.length > 0){
			             	   this.applyBordersOnRender(); 
			               }
			    	 	  }
    		     	}
    	 	   	}
    		}
    	 	question.resetGradeCount();
     },
     applyBordersOnRender : function(){  
    	 var range = "";
    	 var border = "";
    	 if(this.CustomBorders!=null){
			 for (var i = 0; i < this.CustomBorders.length; i++) {
				range = this.CustomBorders[i].range;
				border = this.CustomBorders[i].border;
				var startRow = range.from.row;
				var endRow = range.to.row;
				var startCol = range.from.col;
				var endCol = range.to.col;
				if(startRow > endRow){
					var tempStartRow = startRow;
					startRow = endRow;
					endRow = tempStartRow;
				}
				if(startCol > endCol){
					var tempStartCol = startCol;
					startCol = endCol;
					endCol = tempStartCol;
				}
				
				if (border == "inside") {
					this.applyInsideBorder(startRow, startCol, endRow, endCol);
				} else if (border == "all") {
					this.applyInsideBorder(startRow, startCol, endRow, endCol);
					this.applyOutsideBorder(startRow, startCol, endRow, endCol);
				} else if (border == "outside") {
					this.applyOutsideBorder(startRow, startCol, endRow, endCol);
				} else if (border == "top") {
					this.applyTopBorders(startRow, startCol, endRow, endCol);
				} else if (border == "bottom") {
					this.applyBottomBorders(startRow, startCol, endRow, endCol);
				} else if (border == "left") {
					this.applyLeftBorders(startRow, startCol, endRow, endCol);
				} else if (border == "right") {
					this.applyRightBorders(startRow, startCol, endRow, endCol);
				} else if (border == "none") {
					this.removeBorders(startRow, startCol, endRow, endCol);
				}else if (border == 'removeBorderMerge'){
					this.removeBordersMerge(startRow, startCol, endRow, endCol);
				}
				this.applyBordersToMergedCells(border,startRow,startCol,endRow,endCol);
			}
    	 }
		 
      },
     applyBorders : function(border){
		var startRow = selectedTableRange.from.row;
		var endRow = selectedTableRange.to.row;
		var startCol = selectedTableRange.from.col;
		var endCol = selectedTableRange.to.col;
		if(startRow > endRow){
			var tempStartRow = startRow;
			startRow = endRow;
			endRow = tempStartRow;
		}
		if(startCol > endCol){
			var tempStartCol = startCol;
			startCol = endCol;
			endCol = tempStartCol;
		}
		
		if(border == "inside"){
			this.applyInsideBorder(startRow,startCol,endRow,endCol);
		}
		else if(border=="all"){
			this.applyInsideBorder(startRow,startCol,endRow,endCol);
			this.applyOutsideBorder(startRow,startCol,endRow,endCol);
		}else if(border=="outside"){
			this.applyOutsideBorder(startRow,startCol,endRow,endCol);
		}
		else if(border=="top"){
			this.applyTopBorders(startRow,startCol,endRow,endCol);
		}
		else if(border=="bottom"){
			this.applyBottomBorders(startRow,startCol,endRow,endCol);
		}
		else if(border=="left"){
			this.applyLeftBorders(startRow,startCol,endRow,endCol);
		}
		else if(border=="right"){
			this.applyRightBorders(startRow,startCol,endRow,endCol);
		}else if(border=="none"){
			this.removeBorders(startRow,startCol,endRow,endCol);
		}
		this.applyBordersToMergedCells(border,startRow,startCol,endRow,endCol);
		var custBorder = {
				'border' : border,
				'range' : selectedTableRange
		};
		this.CustomBorders.push(custBorder);
     },
     removeBorders : function(startRow,startCol,endRow,endCol, operation){
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var charCode = 65;
		 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
  			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
  				
  				var cellId = compId + String.fromCharCode(charCode +colIndex) + rowIndex;
  				var topCell = compId + String.fromCharCode(charCode +colIndex) + (rowIndex-1);
  				var bottomCell = compId + String.fromCharCode(charCode +colIndex) + (rowIndex+1);
  				var leftCell = compId + String.fromCharCode(charCode + (colIndex-1)) + rowIndex;
  				var rightCell = compId + String.fromCharCode(charCode + (colIndex+1)) + rowIndex;
  				if($("#"+cellId).length != 0){
  					$("#"+cellId).removeClass("leftBorder rightBorder bottomBorder topBorder");
  				}
  				if(rowIndex !=0 && $("#"+topCell).length != 0){
  					$("#"+topCell).removeClass("bottomBorder");
  				}
  				if($("#"+bottomCell).length != 0){
  					$("#"+bottomCell).removeClass("topBorder");
  				}
  				if(colIndex !=0 && $("#"+leftCell).length != 0){
  					$("#"+leftCell).removeClass("rightBorder");
  				}
  				if($("#"+rightCell).length != 0){
  					$("#"+rightCell).removeClass("leftBorder");
  				}
  			}
  		}
     },
     removeBordersMerge : function(startRow,startCol,endRow,endCol, operation){
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var charCode = 65;
		for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
				var cellId = compId + String.fromCharCode(charCode +colIndex) + rowIndex;
				if($("#"+cellId).length != 0){
					$("#"+cellId).removeClass("leftBorder rightBorder bottomBorder topBorder");
				}
			}
  		}
     },
     applyTopBorders : function(startRow,startCol,endRow,endCol){
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var charCode = 65;
    	 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
 			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
 				var cellId = compId + String.fromCharCode(charCode +colIndex) + rowIndex;
 				if(rowIndex == startRow){
 					$("#"+cellId).addClass("topBorder");
 				}
 			}
 		}
     },
     applyBottomBorders : function(startRow,startCol,endRow,endCol){
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var charCode = 65;
    	 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
 			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
 				var cellId = compId + String.fromCharCode(charCode +colIndex) + rowIndex;
 				if(rowIndex == endRow){
 					$("#"+cellId).addClass("bottomBorder");
 				}
 			}
 		}
     },
     applyLeftBorders : function(startRow,startCol,endRow,endCol){
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var charCode = 65;
    	 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
 			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
 				var cellId = compId + String.fromCharCode(charCode +colIndex) + rowIndex;
 				if(colIndex == startCol){
 					$("#"+cellId).addClass("leftBorder");
 				}
 			}
 		}
     },
     applyRightBorders : function(startRow,startCol,endRow,endCol){
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var charCode = 65;
    	 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
 			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
 				var cellId = compId + String.fromCharCode(charCode +colIndex) + rowIndex;
 				if(colIndex == endCol){
 					$("#"+cellId).addClass("rightBorder");
 				}
 			}
 		}
     },
     applyInsideBorder : function(startRow,startCol,endRow,endCol){
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 var charCode = 65;
    	 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
 			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
 				var cellId = compId + String.fromCharCode(charCode +colIndex) + rowIndex;
 				if(rowIndex == endRow){
 					if(colIndex != endCol){
 						$("#"+cellId).addClass("rightBorder");
 					}
 				}else{
 					if(colIndex == endCol){
 						$("#"+cellId).addClass("bottomBorder");
 					}else{
 						$("#"+cellId).addClass("bottomBorder rightBorder");
 					}
 				}
 			}
 		}
     },
     applyOutsideBorder : function(startRow,startCol,endRow,endCol){
    	 var charCode = 65;
    	 var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
    	 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
 			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
 				
 	            var cellId = compId + String.fromCharCode(charCode + colIndex) + rowIndex;
 				if(rowIndex == startRow){
 					if(colIndex == startCol){
 						$("#"+cellId).addClass("leftBorder topBorder");
 					}
 					if(colIndex == endCol){
 						$("#"+cellId).addClass("rightBorder topBorder");
 					}
 					if((colIndex != startCol) && (colIndex != endCol)){
 	 					$("#"+cellId).addClass("topBorder");
 					}
 				}
 				if(rowIndex == endRow){
 					if(colIndex == startCol){
 						$("#"+cellId).addClass("leftBorder bottomBorder");
 					}
 					if(colIndex == endCol){
 						$("#"+cellId).addClass("rightBorder bottomBorder");
 					}
 					if((colIndex != startCol) && (colIndex != endCol)){
 	 					$("#"+cellId).addClass("bottomBorder");
 					}
 				}else{
 					if(colIndex == startCol){
 						$("#"+cellId).addClass("leftBorder");
 					}
 					if(colIndex == endCol){
 						$("#"+cellId).addClass("rightBorder");
 					}
 				}
 			}
 		}
     },
     
     applyBordersToMergedCells : function(border,startRow,startCol,endRow,endCol){
    	  var mergeCollection = this.mergedCellInfoCollection;
    	  var charCode = 65;
    	  var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
          var i = 0;
          //to solve problem occur in border outside when merge cells are on edge of selectedrange
          if(border == 'outside'|| border == 'top' || border == 'bottom' || border == 'left' || border == 'right' || border == 'inside'){
	          for(; i<mergeCollection.length; i++){
	        	  /*//check if it is into selected range
	             	if(mergeCollection[i].row >= startRow && mergeCollection[i].row <= endRow &&
	             			mergeCollection[i].col >= startCol && mergeCollection[i].col <= endCol){
	             		
	             	}*/
	        	  //check if merged celss are is on edge
	        	  var obj = mergeCollection[i];
				  if (obj.row == startRow 
				    	|| obj.row + (obj.rowspan-1) == endRow
						|| obj.col == startCol
						|| obj.col + (obj.colspan-1) == endCol) {
	                   	for(var index1 = obj.row; index1 < obj.row+obj.rowspan; index1++){
	                   		for(var index2 = obj.col; index2 < obj.col+obj.colspan; index2++){
	                   			if(index1 != obj.row || index2 != obj.col){
	                   				var cellId = compId + String.fromCharCode(charCode + index2) + index1;
	                   				cellObj = $("#"+cellId);
	                   				if(border != "inside"){
	                   					if(cellObj.hasClass("topBorder")
		                   						|| cellObj.hasClass("bottomBorder")
		                   						|| cellObj.hasClass("leftBorder")
		                   						|| cellObj.hasClass("rightBorder")){
		                   					var parentCellId = compId + String.fromCharCode(charCode + obj.col) + obj.row;
		                   					$("#"+parentCellId).addClass(cellObj.attr("class"));
		                   				}
	                   				}
	                   				else{
	                   					if(obj.row + (obj.rowspan-1) == endRow && obj.col + (obj.colspan-1) == endCol){
	                   						var cellId = compId + String.fromCharCode(charCode + (obj.col+obj.colspan-1)) + (obj.row+obj.rowspan-1);
			                   				cellObj = $("#"+cellId);
			                   				var parentCellId = compId + String.fromCharCode(charCode + obj.col) + obj.row;
			                   				$("#"+parentCellId).removeClass("rightBorder bottomBorder");
	                   					}
	                   					
	                   				}
	                   			}
	                       	}
	                   	}
	              }
	          }
          }
     },
     
     applyAllBorder : function(startRow,startCol,endRow,endCol){
    	 for(var rowIndex = startRow; rowIndex <= endRow; rowIndex++){
 			for(var colIndex = startCol; colIndex <= endCol; colIndex++){
 				var cellId = 0;
 				var cell = itsTableInstance.getCell(rowIndex, colIndex);
 				if(cell != null){
 					cellId = cell.id;
 				}
 				if(rowIndex == endRow){
 					if(colIndex != endCol){
 						$("#"+cellId).addClass("rightBorder");
 					}
 				}else{
 					if(colIndex == endCol){
 						$("#"+cellId).addClass("bottomBorder");
 					}else{
 						$("#"+cellId).addClass("bottomBorder rightBorder");
 					}
 				}
 				
 			}
 		}
     },
    
     /**
	 * Remove destinations from cell 	
     */
     removeFormulaDestination:function(cellId){
     	for(var i=0 ; i < question.formulas.length ; i++){
		    var formula = question.formulas[i];
      		if($.inArray(cellId, formula.destinations) != -1){
      			formula.removeDestination(cellId);
      		}
		}
     },
	 /**
	  * Split current selected Cells
	  * @param event
	  */
     splitCells:function(){		    	
    	 	if($("#SplitCellsBtnId_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
    		 	this.itsTableInstance.mergeCells.unmergeSelection(selectedTableRange);
    	 		this.itsTableInstance.render();
    	 		if($("#MergeCellsBtnId_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
    	 			$("#MergeCellsBtnId_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).attr({"checked":false});
    	 		}	    	 		
    		}
     },
     findDeepestChild: function(parent){
    	 var result = {depth: 0, element: parent};
    	 var that = this;
    	 parent.children().each(
    	      function(idx) {
    	          var child = $(this);
    	          var childResult = that.findDeepestChild(child);
    	          if (childResult.depth + 1 > result.depth) {
    	              result = {
    	                  depth: 1 + childResult.depth, 
    	                  element: childResult.element};
    	          }
    	      }
    	  );

    	  return result;
     },
     getColLabel : function(index){
    	
       	  var dividend = index + 1;
       	  var columnLabel = '';
       	  var modulo;
       	  while (dividend > 0) {
       	    modulo = (dividend - 1) % 26;
       	    columnLabel = String.fromCharCode(65 + modulo) + columnLabel;
       	    dividend = parseInt((dividend - modulo) / 26, 10);
       	  }
       	  return columnLabel;
       	
     },
     activateBranching:function(responseText){
   	  if(question.mode==MODE_TEST){
            /*changes for branching based on responses*/
            var currentComponent = null;
    		 for (i in question.activePage.components) {
    			 if(question.activePage.id==this.pageId){
    				 if (question.activePage.components[i].id == this.id) {
    	    				currentComponent = question.activePage.components[i];
    	    			} 
    			 }
    			
    		 }
    		 if(currentComponent!=null && currentComponent!=undefined){
        		 if(currentComponent.isBranched){
        			 var fullCmpId = currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix+currentComponent.id; 
        			 
        			//reset all paths
        			for ( var index in question.branches) {
        				if (question.branches[index].cId == fullCmpId) {
        					var branch = question.branches[index];
        					this.setRestFlag(branch, false);
        				}
        			}
        			if(currentComponent.notApplicableFlag){
        				this.setMappedEntities(fullCmpId,"","");
        			 }else{
        				for(cellIndex  in currentComponent.cellComponentCollection){
    	   	        		 var cellComponent = currentComponent.cellComponentCollection[cellIndex].component;
    	   	        		 if(cellComponent != ""){
    	   	        			 if(cellComponent.type == "Label"){
    	   	        				//set path for updated formula values
    	   	                    	 for(var index = 0 ; index < question.formulas.length; index++){
    	   	                    		 var cellId = currentComponent.getFullComponentId() + cellComponent.cellId;
    	   	                    		 if($.inArray(cellId, question.formulas[index].destinations) != -1){
    	   	                    			 var result = $("#"+cellId).find(".formulaResult").text();
    	   	                    			 this.setMappedEntities(fullCmpId,cellComponent.cellId,result);
    	   	                    		 }
    	   	                    	 }
    	   	                     }else if(cellComponent.type == "Input field"){
    	   	                    	//set path for current inputField
    	   	                    	 var contentType = cellComponent.contentFormat.type;
    	   		                      if(contentType == "number" || contentType == "currency" || contentType == "percentage"){
    	   		                    	  var result = cellComponent.studentEntries[0].editor.text;
    	   			                      this.setMappedEntities(fullCmpId,cellComponent.cellId,result);
    	   		                      }
    	   	                     }
    	   	        		 }
        				} 
        			 }
            		// question.updateProgressBar();
            		//to solve performance issue
      				//question.activePage.doStudentLayout();
      				question.actvPageShowHide();
        		 } 
    		 }

    		 question.updateProgressBar();
   	  }  
     }, 
     setMappedEntities:function(cId, studentEntryId, studentResponse){
   	  for ( var index in question.branches) {
			if (question.branches[index].cId == cId) {
				var branch = question.branches[index];
				if (branch.mappingIndicator == "answerOption") {
					for ( var i in branch.pathMaps) {
						if (branch.pathMaps[i].compOptionId == studentEntryId) {
							var satisfiedConditionIds = [];
							if(studentResponse==""){
								satisfiedConditionIds=[];
	 	  	  	    		}
							for ( var index in branch.pathMaps[i].condition) {
								var conditionIdVal = branch.pathMaps[i].condition[index].selectConditionVal;
								var conditionId = branch.pathMaps[i].condition[index].id;
								/*remove all non numeric characters except decimal */
								studentResponse = studentResponse.replace(/[^\/\d\.]/g,'');
								studentReponse = parseFloat(studentResponse);
								var autherEntryVal = parseFloat(branch.pathMaps[i].condition[index].authorEntryVal);
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
											 this.setRestFlag(branch, true, i, j);
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
     resetComp : function(){
   		var fullCmpId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
   		if(question.pages[parseInt(this.pageId)-1]==undefined){
   			var flag;
			flag=question.pages[parseInt(this.pageId)-util.checkIfPageDelete(this.pageId)-1].showToStud;
		}else{
			flag=question.pages[parseInt(this.pageId)-1].showToStud;
		}
			if((this.showToStud!=undefined && question.activePage.showToStud!=undefined && (!flag || !this.showToStud))){
			  	 for(cellIndex  in this.cellComponentCollection){
		    		 var cellComponent = this.cellComponentCollection[cellIndex].component;
		    		 if(cellComponent != ""){
		                 if(cellComponent.type == "Input field"){
		                	  var contFor = cellComponent.contentFormat.type;
				               	if(contFor == "number" || contFor == "percentage" || contFor == "currency"){
				               	// $("#"+cellComponent.studentEntries[0].editor.id).trigger("blur");
				               		for ( var index in question.branches) {
				         				if (question.branches[index].cId == fullCmpId || question.branches[index].cId_2 == fullCmpId) {
				         					var branch = question.branches[index];
				         					//this.setRestFlag(branch, false);
				         					cellComponent.studentEntries[0].setRestFlag(branch, false);
				         					cellComponent.studentEntries[0].editor.text="";
				         				}
				         			}
				               	
				               	}

		                 }
		    		 }
		    	
		    	 }
			}
   
     },
     setRestFlag : function(branch, flag, pathmapIndex, pathIndex){
   	  for ( var i in branch.pathMaps) {
   		  for(var j in branch.pathMaps[i].paths){
   			  var loopCondition  =  (!flag) ? true : (flag && pathmapIndex == i && pathIndex == j)? true : false; 
 				  if(loopCondition){
 					var partId, compId, secId;
					partId = branch.pathMaps[i].paths[j].partId;
					compId = branch.pathMaps[i].paths[j].compId;
					secId = branch.pathMaps[i].paths[j].sectionId;
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
												if (comp.sections != undefined) {
													for ( var index3 in comp.sections) {
														if (comp.sections[index3].id == secId) {
															if (comp.sections[index3].isBranchDest) {
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
     
};