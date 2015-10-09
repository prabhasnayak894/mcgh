/* ========================================================================
 * TableLabel: Object Declaration
 * ========================================================================
 * Purpose of this object to have all option specific properties like 
 * componentId (to which component it belongs),
 * student response. holds  text editor  
 * ======================================================================== */
var TableLabel  = function(options){
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.cellId=null;
	this.editor=null;
	this.type='Label';
	this.subType='Label';
	this.idPrefix='C';
	this.isDisabled=false;
	this.isTableCellLabel=true;
	this.cellTextOrientation = 1;
	this.mandatory = false;
	this.ranges=[];
	this.isStudentLabel = false;
	$.extend(TableLabel.prototype, new Component(options));
	$.extend(this, options);
	this.editor = new Editor({id:this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId + this.textBoxIdPrefix + this.id});
	this._update = TableLabel.BindAsEventListener( this, this.update );	
	this._filter =TableLabel.BindAsEventListener( this, this.filter );
	this._populateEditorProperties = TableLabel.BindAsEventListener( this, this.populateEditorProperties );
	this._collapseRangedBasedFeedback = TableLabel.BindAsEventListener( this, this.toggleRangedBasedFeedback);
	this._changeCellTextOrientation = TableLabel.BindAsEventListener(this,this.changeCellTextOrientation);
	this._updateEditor= TableLabel.BindAsEventListener( this, this.updateEditor );
	this._updateStudentLabel= TableLabel.BindAsEventListener( this, this.updateStudentLabel );
};

//add event helper method
TableLabel.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
TableLabel.BindAsEventListener = function(object, fun) {
    return function(event) {
	    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
TableLabel.prototype = {
	/**
	 * gets id of   TableLabel
	 * @returns  id
	 */
		getId : function(){
		return this.id;
	},
	/**
     * sets id of TableLabel
     * @param id
     */
	setId : function(id){
		this.id = id;
	},
	/**
	 * gets ranges for multiple choice component
	 * 
	 * @returns ranges
	 */
	  getRanges: function(){
	           return this.ranges;  
	  },
	 /**
		 * sets ranges for TableLabel component
		 * 
		 * @returns ranges
		 */
	  setRanges: function(ranges ){
	           this.ranges=ranges;  
	  },
	  /**
		 * adds range for TableLabel component
		 * 
		 * @param range
		 */
	  addRange:function(range ){
	      this.ranges.push(range);
	  },
	  /**
		 * remove range for TableLabel component
		 * 
		 * @param range
		 */
	  removeRange:function(rangeId){
		  var j=0;
	  	 for(j in this.ranges){
	  			if(this.ranges[j].getId() == rangeId){
	  				this.ranges.splice(j, 1);
	  			}
	  		}
	  },
     /**
      *  updates text of content editable divs to the object's editor text
      */
     update:function(e){
    	    var cellId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
    	    for(i in question.activePage.components){
	            if(question.activePage.components[i].id == this.id){
	                TableComp =question.activePage.components[i];
	            }
	        }
    	 	this.editor.update();
    	 	 question.updateFormulaDestinations(cellId,util.getFormulas(this.editor.textWithoutFormatting));
			 util.updateFormula(this.editor);
			 //$("#"+cellId).html($(".labelEditField").html());
			 
			 var beforeChangeHtml = "";
			 var checkFortextWrapper = $("#"+cellId).find("div[data-hold]");                         
             if(checkFortextWrapper.length > 0){
	         	var innerDivClass = checkFortextWrapper.attr("class");
	         	if(typeof innerDivClass == "undefined"){
	         		innerDivClass = "";
	         	}
	         	 var catchCellHtml = $("#compBody_"+cellId).find(".labelEditField").html();   
	         	var updatedCellHtml = '<div data-hold="textWrapper" class="'+innerDivClass+'">';
	         	 if($("#compBody_"+cellId).find(".labelEditField").find("a.tblLink").length > 0){
	         		updatedCellHtml = catchCellHtml;
	         	 }
	         	 else{
	         		updatedCellHtml += catchCellHtml;
	         		updatedCellHtml += '</div>'; 
	         	 }
	             beforeChangeHtml = updatedCellHtml;
             }else{
	     		var catchCellHtml = $("#compBody_"+cellId).find(".labelEditField").html();                
	            var updatedCellHtml = '<div data-hold="textWrapper">';
	            updatedCellHtml += catchCellHtml;
	            updatedCellHtml += '</div>';                
	            beforeChangeHtml = updatedCellHtml;
             }
             $("#"+cellId).html(beforeChangeHtml);
             TableComp.changeValById(TableComp.cellHTMLCollection, cellId, "itsHtml", $("#"+cellId).html());
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
     addRange:function(newRange){
         this.ranges.push(newRange);	
     },
     /**
      * layouts in design mode
      * @param isLast is the last option
      * @returns {String}
      */
   
     layout:function(isLast){
    	 var componentType =  "Cell: ";
    	 var elementType = "Element: Label";
    	 var htmlelement='';
    	 //htmlelement+='<div id="rowPagesection'+this.editor.id+'"class="rowPagesection1 firstRowPageSection authorSec">';
    	 //htmlelement+='	<div class="colPageSection">';   
    	 htmlelement+='<div class="pageSection cellComponent" id="cellComponent_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" >';
    	 htmlelement+='<div class="pageInnerSection">';
    	 htmlelement+='<div class="pageSectionHeader"><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" class="tophead invisible" style="padding-left: 260px"> '+componentType+'</span><h6 class="pull-right font10" > '+elementType+' ID #'+this.editor.id+'</h6><p></p></div>';        	
    	 htmlelement+='<h2 id="componentType'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" style="display:none;" class="tophead">'+componentType+'</h2>';
    	 //htmlelement+='<h2 class="tophead">'+elementType+'</h2>';
    	 htmlelement+='<div id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'"  class="pageSectionBody">';
    	 
    	 htmlelement+=			this.layoutEditor(isLast);
    	 htmlelement+='<div class="clear"></div>';
    	 htmlelement+='<div class="pageSectionFooter">';
    	 //if(this.ranges!=null){
    	   htmlelement+= this.rangeFeedbackLayout();
    	 //}
    	 htmlelement+='	</div>';
    	 htmlelement+='<div class="clear"></div>';
    	 htmlelement+='	</div>';
    	 htmlelement+='</div>';
    	 htmlelement+='	</div>';
    	 //htmlelement+='	</div>';
    	 //htmlelement+='</div>';
    	 return htmlelement;
     },
     /**
      * layouts option editor in design mode
      * @returns {String}
      */
     layoutEditor:function(isLast){    	
    	var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';	
    	var disabledCss=(this.isDisabled) ? "disableEntryInput":"";     	
    	var htmlelement='';
    	htmlelement+='<div class="labelField" style="display:none;">';
    	htmlelement+='    <div id="'+this.editor.id+'" contenteditable="'+!this.isDisabled+'" data-maxlength="'+this.editor.maxLength+'" data-placeholder="Enter Content" onFocus="this.click()" class=" labelEditField inputDummy '+disabledCss+'"  '+dataDivAttr+'>'+this.editor.text+'</div>';    	
    	htmlelement+='</div>';
    	return htmlelement;
     },
      /**
	 * adds events for html elements related to current option
	 */
	afterLayout:function(){
		this.populateComp();
		TableLabel.addEvent( this.editor.id, "blur", this._update );
		TableLabel.addEvent( this.editor.id, "paste", this._filter);		
		TableLabel.addEvent( this.editor.id, "click", this._populateEditorProperties );
     	this.editor.afterEditorlayout();
     	var i=0;
		 for( i in this.ranges){
    		 this.ranges[i].afterLayout("tableCellRange");
    	 }
		 
		 this.afterRangeFeedbackLayout();
	 },
	 instructorLayout:function(itsHtml){
	    	var htmlelement='';
	    	htmlelement += this.studentLayout(itsHtml);
			return htmlelement;
	 },
     afterInstructorLayout : function(){
    	 this.afterStudentLayout();
     },
     studentLayout : function(itsHtml,minWidthTd){
    	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';	
    	 var htmlelement='';
     	 var cssColumnLayout='3';    	
     	 var editorText="";    
     	 var oldEditorText=this.editor.text;
     	// this.editor.text=itsHtml;
     	if(question.mode==MODE_POST_TEST){     		
     		if(minWidthTd=="0px"){
     			minWidthTd = "auto";
     		}
     	}else {
         	if(minWidthTd==undefined){
         		minWidthTd = "auto";
         	}
     	}
     	var str='<div data-hold="textWrapper" style="max-width:'+minWidthTd+';padding:0 4px;"';
     	
    	 this.editor.text=itsHtml.replace('<div data-hold="textWrapper"',str);
     	 var widthTd=0;
     	 if(question.mode==MODE_TEST || question.mode==MODE_PREVIEW){
     		editorText = util.getFormulaLinksForStudent(this.editor);
     		
     	 }    	
     	 else if(question.mode==MODE_POST_TEST)
 		 {
     		editorText = util.getFormulaLinkForPostSubmission(this.editor, 'table');
 		 }    	
     	 editorText = editorText.replace(/\Â/g," ");
 		 editorText = ((!this.isDisabled)?editorText:"");
     	 editorText = util.getImageLayout(editorText);
         editorText = util.getVideoLayout(editorText);
         if(oldEditorText.length<70)
            widthTd = 100;
         else
            widthTd = oldEditorText.length;
        
	 	  if(!this.isDisabled){	 		 
	 		 var mrgStyle = '';
	 		 if(this.cellTextOrientation != '1' && oldEditorText.length > 0){
	 			 var mrgnTop=0, mrgnRight=0;
	 			 mrgnTop = oldEditorText.length * 4.3;
	 			 mrgnRight = oldEditorText.length + 10;
	 			 //mrgStyle = 'style="margin:'+mrgnTop+'px 0 0 '+mrgnRight+'px "';
	 		 }
	 		 var  orientaionClass ='';
			 if (this.cellTextOrientation == '2') {
				 orientaionClass ='text-rotate-deg45';
                 
                 mrgnLeft = widthTd * 0.2;
                 paddingBottom = widthTd * 0.2;
                 paddingTop = widthTd * 0.2;
                 mrgStyle = 'style="';
                 mrgStyle += 'padding-bottom:'+paddingBottom+'px;';
                 mrgStyle += 'padding-top:'+paddingTop+'px;"';
                 //mrgStyle += 'width:'+widthTd*2+'px;"';

	         } else if (this.cellTextOrientation == '3') {
	        	 orientaionClass ='text-rotate-deg90';
                 var wH = oldEditorText.length*0.7;
                 var mH = widthTd*0.15;
                 if(wH> 300){
                    wH = (widthTd*0.35)+50;
                 }
                 if(wH < 65){
                    wH = 100;
                 }
                 if(mH>40){
                    mH = 40;
                 }
                 if(oldEditorText.length<70)
                	 mrgStyle = 'style="margin-left: '+(mH)+'px; margin-right: '+(mH)+'px; margin-bottom: '+(mH+25)+'px; margin-top: '+(mH)+'px; "';
                 else
                	 mrgStyle = 'style="width:'+(mH*8)+'px; padding-bottom:'+(mH)+'px; margin-top: '+(mH*2)+'px; margin-left: '+(mH)+'px; margin-right: '+(mH)+'px; margin-bottom: '+(mH*2)+'px; "';
	         }
	 		  
	 		  if(question.mode==MODE_POST_TEST){
	 			  var stdpostchromeClass = "";
	 			  if(isChrome){
	 				 stdpostchromeClass="stdlabelEditFieldPostChrome";
	 			  }
				 htmlelement+='	<div id="'+this.editor.id+'" style="padding: 4px 5px;" class="colPageSection'+cssColumnLayout+' '+stdpostchromeClass+' postSubMinHtLbl ">';
				 var compId =this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
				 var cellId = compId + this.cellId;
				 var rangeFeedbackOuterHtml = '';
				 rangeFeedbackOuterHtml +='<div class="clear"></div>';
				 rangeFeedbackOuterHtml +='<div class="rangeFeedOpen">';
				 var rangeFeedbackHtml = '';
				 var rangeCount = 0;
				 for(var i=0 ; i < question.formulas.length ; i++){
					if($.inArray(cellId, question.formulas[i].destinations) != -1){
						var j=0;
						var result = editorText.trim();
						result =   parseFloat($(result).text());
						var checkResult= editorText.indexOf("resultF");
						if(checkResult != -1)
						{
							var htmlString = "<div>"+editorText+"</div>";
							var obj      = $(htmlString);
							var resultSpan    = $(obj).find('.resultF');
							result = parseFloat($(resultSpan).text());
						}
						
				 		
				     	for( j in this.ranges){        
				     		if(this.ranges[j].rangeFeedbackEditor.text != ""){
				     			if(result >= this.ranges[j].minRangeEditor.text && result <= this.ranges[j].maxRangeEditor.text){
				     					rangeFeedbackHtml +=  '<div>';
				     					rangeFeedbackHtml +=  '	<strong>Your response for cell '+this.cellId+':</br>';
				     					rangeFeedbackHtml +=  ' 	<label class="cellResult">'+result+'</label></br>';
				         				rangeFeedbackHtml +=  '		Range-based feedback: </strong></div><br/>';
				     					rangeFeedbackHtml += this.ranges[j].instructorLayout();
				     					rangeCount++;
				     			 }
				     		 }
				     	 }
				 	  }
				 }
				 rangeFeedbackHtml = util.getImageLayout(rangeFeedbackHtml);
				 rangeFeedbackHtml = util.getVideoLayout(rangeFeedbackHtml);               
	        	 if( rangeCount > 0) {
	     			if(rangeFeedbackHtml != ''){
	     				rangeFeedbackOuterHtml += rangeFeedbackHtml;
	     			}         			 
	     		 }
	        	 rangeFeedbackOuterHtml+='</div>';
	        	 $("#feedback_"+compId).append(rangeFeedbackOuterHtml);
	 		  }
	 		  else
	 			  
	 			  htmlelement+='    <div id="'+this.editor.id+'" data-maxlength="'+this.editor.maxLength+'"  onFocus="this.click()" class="tableColWidth labelEditField stdlabelEditField inputDummy noBorder" '+dataDivAttr+'>';
	 		      htmlelement+='<h6  '+mrgStyle+'>'+editorText+'</h6>';	 		      
	 		      htmlelement+='</div>';	 
	 		      htmlelement+='</div>';
	 		  
	 	  }
 		return htmlelement;
     },
     afterStudentLayout : function(){
    	 TableLabel.addEvent( this.editor.id, "blur", this._updateStudentLabel );
    	
    	 this.populateComp();
    	 var result=parseFloat($("#"+this.editor.id).find(".formulaResult").text());
    	 util.checkTableFormulaCell(result);
     },
     postSubmissionReviewLayout : function(notApplicableFlag,itsHtml,minWidthTd){
    	 var htmlelement="";
    	 htmlelement += this.studentLayout(itsHtml,minWidthTd);
    	 return htmlelement;
     },
     updateStudentLabel : function(){
    	
    	 this.editor.update();
     },
	 editorPropertyLayout:function(){
		 var htmlelement="";
 	   	// htmlelement+='<p style="display:none;" id="elementid">ID# '+this.editor.id+'</p>';
		 var componentId = this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId;
     	 htmlelement += '<div id="CellLabelTextOrientationProperties">';
         htmlelement+='        <div class="head-info typeInput">';
	  	 htmlelement+='            <a id="fieldOrientation'+componentId+'" class="info-icon"></a>Text orientation:';
	  	 htmlelement+='        </div>'; 
	  	 
	  	 htmlelement+='       <div class="tabContent tabProContent">';
	  	 htmlelement+='           <div class="btn-group customDropdown">';
	  	 htmlelement+='                <button data-toggle="dropdown" id="camponentFieldOrientationId_'+componentId+'" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	  	 htmlelement+='                    0 degrees<span class="caret caretDrop"></span>';
	  	 htmlelement+='                </button>';
	  	 htmlelement+='                <ul class="dropdown-menu">';
	  	 htmlelement+='                    <li id="degree0'+componentId+'"><a>0 degrees</a>';
	  	 htmlelement+='                    </li>';
	  	 htmlelement+='                    <li class="divider"></li>';
	  	 htmlelement+='                    <li id="degree45'+componentId+'"><a>45 degrees</a>';
	  	 htmlelement+='                    </li>';
	  	 htmlelement+='                    <li class="divider"></li>';
	  	 htmlelement+='                    <li id="degree90'+componentId+'"><a>90 degrees</a>';
	  	 htmlelement+='                    </li>';
	  	 htmlelement+='                </ul>';
	  	 htmlelement+='            </div>';
	  	 htmlelement+='        </div>';
         htmlelement += '</div>';
         htmlelement += '<div id="CellComponentHyperLinkProperties">';
	     htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
         htmlelement+='        <a id="insertHelp'+this.cellId+'" class="info-icon"></a>Insert a hyperlink:';
         htmlelement+='   </div>';
         htmlelement+='   <div class="tabContent tabProContent customInput insertHyperlink">';
         htmlelement+='        <div class="form-group">';
         htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
         htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+componentId+'">';
         htmlelement+='        </div>';
         htmlelement+='        <div class="form-group">';
         htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
         htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+componentId+'">';
         htmlelement+='        </div>';
         htmlelement+='        <button id="insert_'+componentId+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
         htmlelement+='        <div class="clear"></div>';
         htmlelement+='    </div>';
         htmlelement+='    <div class="clear"></div>';
 	
 	   	 return htmlelement;
     },
     rangeFeedbackLayout:function(){
    	var htmlelement='<div id="rangeFeedback'+this.idPrefix+this.id+'">';
    	htmlelement+= '<div class="tblCellFeedHead">';
  		htmlelement+= '<h6 class="pull-left font14 inputhead">Feedback | </h6>';
  		htmlelement+= '<h6 class="font14 tagtext"><a id="rangeCollapse_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'">Collapse range feedback</a></h6>';  		
  		htmlelement+= '</div>';
  		htmlelement+='<div class="clear"></div>';
     	htmlelement+= '<div class="pageSectionBody range-feedback">';      	
   		htmlelement+='<div id="rangeFeedback_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'">';
   		htmlelement+='<div  style="float: left; margin-top: -17px;"><span class="rangeFeedbackValues"> Cell Id: </span><span id="minMaxRangeCellId_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+'" style="display: inline-block;min-width: 125px !important;"> '+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId+' </span> </div>';

   		var showMinus=true;
	       	if(this.ranges.length==1){
	       		showMinus=false; 
	       	}
   		for( j in this.ranges){
      		 if(j==this.ranges.length-1){
      			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(true,j,showMinus);
      		 }
      		 else{
      			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(false,j,showMinus); 
      		 }
      	 }
   		htmlelement+= '</div></div></div>';
   		return htmlelement;
     },
     afterRangeFeedbackLayout : function(){
		 TableLabel.addEvent( "rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId, "click", this._collapseRangedBasedFeedback );
     },
     populateEditorProperties:function(){
    	 $("#activeHyperlink").text("");

        /* Media object creates here for that component */
        var newMedia = new Media({id:this.editor.id});
        $("#mediaProperties").html(newMedia.layout());
        $("#mediaProperties").show();
        newMedia.afterLayout();
        util.checkMediaInEditMode();
     },
     toggleRangedBasedFeedback : function(){
    	 var rangeFbId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId;
    	 var $divObj = $("#rangeFeedback_"+rangeFbId);
    	 if($divObj.is(":visible")){
    		 $("#rangeCollapse_"+rangeFbId).html("Expand range feedback");
    		 $divObj.hide("slow");
    	 }else{
    		 $("#rangeCollapse_"+rangeFbId).html("Collapse range feedback");
    		 $divObj.show("slow");
    	 }
     },
	isTableLabelFilled:function(){
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
	populateComp : function(){
		$("#CellComponentSpecificProperties").html(this.editorPropertyLayout());
		var  displayDropdownVal ='0 degrees';
		 if(this.cellTextOrientation == '1') {
			 displayDropdownVal ='0 degrees';
         } else if (this.cellTextOrientation == '2') {
        	 displayDropdownVal ='45 degrees';
         } else if (this.cellTextOrientation == '3') {
        	 displayDropdownVal ='90 degrees';
         }
		 var parentTd= $("#"+this.editor.id).parent();
		 var colSpan=$(parentTd).attr("colspan");
		 var tdWidth="";
		 tdWidth=$(parentTd).css("min-width"); 
		 if(colSpan!=0 && colSpan!=undefined){
			 
		 }else{
			 $("#"+this.editor.id).find("h6").find("div").css("max-width",tdWidth);	  
		 }
		 $("#"+this.editor.id).find("h6").find("div").css("padding","0 4px");
		 $("#camponentFieldOrientationId_"+this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId).text(displayDropdownVal);
	    this.afterEditorPropertyLayout();
	},
	 /**
     * adds event hadlers for elements present in component property pane
     */
	afterEditorPropertyLayout: function () {
		TableLabel.addEvent("degree0" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId, "click", this._changeCellTextOrientation, {"type":1});
		TableLabel.addEvent("degree45" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId, "click", this._changeCellTextOrientation, {"type":2});
		TableLabel.addEvent("degree90" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id + this.cellId, "click", this._changeCellTextOrientation, {"type":3});
        
		TableLabel.addEvent("insert_"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id + this.cellId, "click", this._updateEditor);
    },
    colWidthUpdate:function(){
    	 var parentTd= $("#"+this.editor.id).parent();
		 var tdWidth=$(parentTd).css("min-width");
		 $("#"+this.editor.id).find("h6").find("div").css("max-width",tdWidth);
		 $("#"+this.editor.id).find("h6").find("div").css("padding","0 4px");
    },

    updateEditor:function(event){
        var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId;
        var linkText=$("#linkText_"+compId).val();
        var linkAddress=$("#linkAddress_"+compId).val();
        var url=$("#linkAddress_"+compId).val();
        var TableComp = null;
        for( i in page.components){
           if(page.components[i].id == this.id){
               TableComp = page.components[i];
           }
        }
        var selectedCell = TableComp.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
        //validate URL with format like: "http://www.google.com/";
        if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
            if(linkText != ""){
                if(url.slice(-1)==="/"){
                    url=url.substring(0,url.length-1);
                } 
                linkAddress=url;
                //if(this.isDisabled==false){
                    
                    var cellText = $("#"+TableComp.cellId).text();
                    var linkHtml = util.evaluateUrl(linkAddress, linkText, TableComp.cellId);
                    if($("#activeHyperlink").text() == ""){
                        //linkHtml = cellText+linkHtml;
                    	//linkHtml = linkHtml;
                        TableComp.changeValById(TableComp.cellHTMLCollection, TableComp.cellId, "itsHtml", "");
                    }
                    TableComp.changeValById(TableComp.cellHTMLCollection, TableComp.cellId, "itsHtml", linkHtml);
                    
                    $("#linkText_"+compId).val('');
                    $("#linkAddress_"+compId).val('');
                    $(".btn-Insert").text("Insert");
                    
                    if(linkHtml != ""){
                    	//TableComp.itsTableInstance('setDataAtCell', selectedTableCells[0], selectedTableCells[1], linkText, null);
                    	var data = TableComp.itsTableInstance.getData();
                    	data[selectedTableCells[0]][selectedTableCells[1]] = linkText;
                    	TableComp.itsTableInstance.loadData(data);
                    	$("#"+TableComp.cellId).data("change",true);
                    	
                    	$("#"+this.editor.id).html(linkHtml);
                    	$("#"+this.editor.id).trigger("blur");
                    }
                //}
            }
            else{
                var currentEditor = ("linkText_"+compId);
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
            var currentEditor = ("linkAddress_"+compId);
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
    changeCellTextOrientation : function(event){
   	 var cmpntId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id+this.cellId;
   	 var TableComp = null;
     for( i in page.components){
        if(page.components[i].id == this.id){
            TableComp = page.components[i];
        }
     }
   	 var displayDropdownVal = '0 degrees';
   	 if (typeof event.data === 'undefined') {
   		displayDropdownVal = '0 degrees';
 	        this.cellTextOrientation = '1';
 	    } else {
 	        this.cellTextOrientation = event.data.type;
 	        
 	        var selectedCell = TableComp.itsTableInstance.getCell(selectedTableCells[0], selectedTableCells[1]);
           //var selectedMeta = this.itsTableInstance.getCellMeta(selectedTableCells[0],selectedTableCells[1]);
           
           var checkFortextWrapper = $(selectedCell).find("div[data-hold]");
           if(!checkFortextWrapper.length > 0){
           	var catchCellHtml = $(selectedCell).html();                
               var updatedCellHtml = '<div data-hold="textWrapper">';
               updatedCellHtml += catchCellHtml;
               updatedCellHtml += '</div>';                
               $(selectedCell).html(updatedCellHtml);
           }            
           
           $(selectedCell).find("div[data-hold]").removeAttr('class');
 	        if (event.data.type == 1) {
 	            this.cellTextOrientation = 1;
 	            displayDropdownVal = '0 degrees';
 	        } else if (event.data.type == 2) {
 	            this.cellTextOrientation = 2;
 	            displayDropdownVal = '45 degrees';
 	            $(selectedCell).find("div[data-hold]").addClass('text-rotate-deg45');
 	        } else if (event.data.type == 3) {
 	            this.cellTextOrientation = 3;
 	            displayDropdownVal = '90 degrees';
 	            $(selectedCell).find("div[data-hold]").addClass('text-rotate-deg90');
 	        }  	        
 	    }
   	 	$("#camponentFieldOrientationId_"+cmpntId).text(displayDropdownVal);
		$("#camponentFieldOrientationId_"+cmpntId).parents("div.customDropdown").find("ul").css("display","none");
		//update values in html array
		var TableComp = null;
        for( i in page.components){
           if(page.components[i].id == this.id){
               TableComp = page.components[i];
           }
        }
        TableComp.changeValById(TableComp.cellHTMLCollection, cmpntId, "itsHtml", $("#"+cmpntId).html());
    },
	deserialize:function(jsonObj){
		var compObj= new TableLabel(jsonObj);
		var editor=new Editor(jsonObj.editor);
		compObj.setEditor(editor);
     	if(jsonObj.ranges!=null){
	  	  	 var ranges=[];
	  	  	 for( l in jsonObj.ranges){
	  	  		var rangeObj =new Range(jsonObj.ranges[l]);
	    		var minRangeEditor = new NumericEditor(jsonObj.ranges[l].minRangeEditor);
	    		var maxRangeEditor = new NumericEditor(jsonObj.ranges[l].maxRangeEditor);
	    		var rangeFeedbackEditor = new Editor(jsonObj.ranges[l].rangeFeedbackEditor);
	    		rangeObj.setMinRangeEditor(minRangeEditor);
	    		rangeObj.setMaxRangeEditor(maxRangeEditor);
	    		rangeObj.setRangeFeedbackEditor(rangeFeedbackEditor);
	    		ranges.push(rangeObj);
	  	  	 }
	  	  	compObj.setRanges(ranges);
  	  	}
     	return compObj;
     },
     validateComponent:function(object){
    	 var i=0;         
         var validRange =true;
           
         var rangeError={};
         var j=0;
         for( j in this.ranges){
        	 var validatorObj=this.ranges[j].validateRange("tableCellRange");
				validRange=validRange && validatorObj.status;
				if(!validRange && validatorObj.message != undefined){
					rangeError.message=validatorObj.message;
   					rangeError.field=validatorObj.field;	
   					break;
				}	
         }
         
         if(!validRange){
   			 object.flag = true;
   			 object.rangeflag = true;
   			 object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id;
   			 object.errorMsg+="<br> "+rangeError.message;
   			 object.field=rangeError.field;
   		 }
		 return object;
    }
}; 
