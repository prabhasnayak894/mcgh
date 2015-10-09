/* ========================================================================
 * Range: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all range specific properties like min value 
 * editor, max value editor, range feedback editor
 * ======================================================================== */
var Range = function(options){ 
	this.id=null;
	this.idPrefix='R';
	this.minRangePrefix ='L';
	this.maxRangePrefix ='H';
	this.feedbackPrefix='F';
	this.componentId = null;
	this.componentIdPrefix=null;
	this.parent={type:'component'};
	this.allowNegative=false;
	$.extend(this, options);
	this.minRangeEditor = new NumericEditor({id:this.componentIdPrefix+((this.parent.type=='component')?this.componentId:this.parent.id)+this.idPrefix+this.minRangePrefix+this.id,allowNegative:true,text:""});
	this.maxRangeEditor = new NumericEditor({id:this.componentIdPrefix+((this.parent.type=='component')?this.componentId:this.parent.id)+this.idPrefix+this.maxRangePrefix+this.id,allowNegative:true,text:""});
	this.rangeFeedbackEditor = new Editor({id:this.componentIdPrefix+((this.parent.type=='component')?this.componentId:this.parent.id)+this.idPrefix+this.feedbackPrefix+this.id});
	this._addRange=Range.BindAsEventListener( this, this.addRange );	
	this._removeRange=Range.BindAsEventListener( this, this.removeRange );
	this._update = Range.BindAsEventListener( this, this.update );
	this._filter = Range.BindAsEventListener( this, this.filter );
	this._populateRangeEditorProperties = Range.BindAsEventListener( this, this.populateRangeEditorProperties );
	this._addTableCellRange=Range.BindAsEventListener( this, this.addTableCellRange );	
	this._removeTableCellRange=Range.BindAsEventListener( this, this.removeTableCellRange );
	this._updateEditor= Range.BindAsEventListener( this, this.updateEditor );
	this._openHelpModalForInsertHyperlink = Range.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
};

//add event helper method
Range.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
Range.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
Range.prototype = { 
		/**
		 * gets id of range
		 * @returns {Integer} id
		 */
		getId:function(){
			return this.id;
        },
        /**
         * sets id of range
         * @param id
         */
        setId:function(id){
       	 this.id=id;
        },
        /**
		 * gets componentId of range
		 * @returns {Integer} componentId
		 */
		getComponentId:function(){
			return this.componentId;
        },
        /**
         * sets componentId of range
         * @param componentId
         */
        setComponentId:function(componentId){
       	 this.componentId=componentId;
        },
        /**
		 * gets componentIdPrefix of range
		 * @returns {String} componentIdPrefix
		 */
		getComponentIdPrefix:function(){
			return this.componentIdPrefix;
        },
        /**
         * sets componentIdPrefix of range
         * @param componentIdPrefix
         */
        setComponentIdPrefix:function(componentIdPrefix){
       	 this.componentIdPrefix=componentIdPrefix;
        },
        /**
		 * gets minRangeEditor of range
		 * @returns {Editor} minRangeEditor
		 */
		getMinRangeEditor:function(){
			return this.minRangeEditor;
        },
        /**
         * sets minRangeEditor of range
         * @param minRangeEditor
         */
        setMinRangeEditor:function(minRangeEditor){
       	 this.minRangeEditor=minRangeEditor;
        },
        /**
		 * gets rangeFeedbackEditor of range
		 * @returns {Editor} rangeFeedbackEditor
		 */
		getRangeFeedbackEditor:function(){
			return this.rangeFeedbackEditor;
        },
        /**
         * sets rangeFeedbackEditor of range
         * @param rangeFeedbackEditor
         */
        setRangeFeedbackEditor:function(rangeFeedbackEditor){
       	 this.rangeFeedbackEditor=rangeFeedbackEditor;
        },
        /**
		 * gets maxRangeEditor of range
		 * @returns {Editor} maxRangeEditor
		 */
		getMaxRangeEditor:function(){
			return this.maxRangeEditor;
        },
        /**
         * sets maxRangeEditor of range
         * @param maxRangeEditor
         */
        setMaxRangeEditor:function(maxRangeEditor){
       	 this.maxRangeEditor=maxRangeEditor;
        },
        /**
         * updates editor text
         */
        update: function(event){
      	 this.rangeFeedbackEditor.update();
      	 this.minRangeEditor.updateVal();
      	 this.maxRangeEditor.updateVal();  		 
        },
        /*
         * update choice component text for rangebasedsubcateories binary answer
         * */
        updateRangeChoiceText:function(chval1, chval2){
      	  $("div.optionVal_0").text(chval1);
      	  $("div.optionVal_1").text(chval2);        	  
        },
        rangeBasedLayoutFeedback:function(isLast,index,showMinus){
        	var htmlelement="";
        	 var dataDivAttr = this.rangeFeedbackEditor.text !='' ? 'data-div-placeholder-content' : '';
        	 //var css = isLast?' style="display: block;"':' style="display: none;"';
        	 var css ;
           	if(showMinus==false){
           	css='style="display: none;"';	
           	}else{
           		if(isLast && (showMinus==true)){
           			css='style="display: block;"';
           		}
           	}
           	var css2 = isLast ?'style="display: block;"':' style="display: none;"';
        	 
        	 htmlelement+='<div class="midPageSection secondColPic">';
        	 htmlelement+='   <div class="tag-row">';
        	 if(index==0){
        		 htmlelement+='  			<div style = "margin-left: 24px; padding-bottom:6px;" id="rangeFeedbackVales1">';
	        	 htmlelement+='  					<span class="rangeFeedbackVales"> Range </span>';	        	
	        	 htmlelement+='  			</div>';
	        	 htmlelement+='  			<div class="rageValueHeading" id="rangeFeedbackVales">';
	        	 htmlelement+='  					<span class="rangeFeedbackVales"> Min. </span>';
	        	 htmlelement+='  					<span class="rangeFeedbackVales"> Max. </span>';
	        	 htmlelement+='  			</div>';
        	 }
        	 htmlelement+='       <div class="colPageSection ">';

        	 htmlelement+='           <div class="form-group ptsRangeValue">';

        	 htmlelement+=this.minRangeEditor.layout();
        	 htmlelement+='            </div>';
        	 htmlelement+='          <div style="margin-left:5px;" class="form-group ptsRangeValue">';

        	 htmlelement+=this.maxRangeEditor.layout();
        	 htmlelement+='           </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='       <div class="editableDivTitle  editableDivTitle-radio">';

        	 htmlelement+='          <h6 class="pull-right font10 inputhead">ID#'+ this.rangeFeedbackEditor.id+'</h6>';
        	 htmlelement+='      </div>';

        	 htmlelement+='   </div>';
        	 htmlelement+='  <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" class="inputDummy textinput" data-maxlength="'+this.rangeFeedbackEditor.maxLength+'" '+dataDivAttr+' data-placeholder="Enter feedback"  id="'+(this.rangeFeedbackEditor.id)+'">'+this.rangeFeedbackEditor.text+'</div>';
        	 htmlelement+='   <div class="feedbackSection  invisible">';
        	 htmlelement+='      <div class="eachCol-2">';
        	 htmlelement+='          <a>';
        	 htmlelement+='              <img src="img/getPicture.png">';
        	 htmlelement+='           </a>';
        	 htmlelement+='      </div>';
        	 htmlelement+='      <div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';
         	 htmlelement+='   <div class="colPageSection">';
        	 htmlelement+='       <div class="eachCol" style="margin:4px 0 0 0;">';
        	 htmlelement+='           <div class="minusBtn" '+css2+' > ';
        	 htmlelement+='               <a  title="Add Range">';
        	 htmlelement+='                   <img  id="plus_'+this.rangeFeedbackEditor.id+'" src="img/plus.png">';
        	 htmlelement+='               </a>';
        	 htmlelement+='           </div>';
        	 htmlelement+='       <div class="minusBtn" '+css+'>';
        	 htmlelement+='                <a title="Delete Range">';
        	 htmlelement+='                   <img id="minus_'+this.rangeFeedbackEditor.id+'" src="img/minus.png">';
        	 htmlelement+='               </a>';
        	 htmlelement+='          </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';
        	 htmlelement+='</div>';
        	
        	return htmlelement;
        },
        /***
         * Function to get rangeBasedLayout only for Frequency score type 
         */        
        rangeBasedLayoutFrequencyFeedback:function(isLast,index,showMinus,criterias,markers){
        	var htmlelement="";
        	 var dataDivAttr = this.rangeFeedbackEditor.text !='' ? 'data-div-placeholder-content' : '';
           	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="midPageSection secondColPic">';
        	 htmlelement+='   <div class="tag-row">';        	 
        	 htmlelement+='       <div class="colPageSection ">';
        	 htmlelement+='           <div class="form-group ">';
        	 htmlelement+=' 				<div style="margin-left:5px;" class="form-group ptsRangeValue boldFont">'+markers[index]+'</div>';
        	 htmlelement+='            </div>';
        	 htmlelement+='          <div style="margin-left:5px;" class="form-group ptsRangeValue">';
        	 htmlelement+='           </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='       <div class="editableDivTitle  editableDivTitle-radio">';
        	 htmlelement+='          <h6 class="pull-right font10 inputhead">ID#'+ this.rangeFeedbackEditor.id+'</h6>';
        	 htmlelement+='      </div>';
        	 htmlelement+='   </div>';
        	 htmlelement+='  <div contenteditable="true" class="inputDummy textinput" data-maxlength="'+this.rangeFeedbackEditor.maxLength+'" '+dataDivAttr+' data-placeholder="Enter feedback"  id="'+(this.rangeFeedbackEditor.id)+'">'+this.rangeFeedbackEditor.text+'</div>';
        	 htmlelement+='   <div class="feedbackSection  invisible">';
        	 htmlelement+='      <div class="eachCol-2">';
        	 htmlelement+='          <a>';
        	 htmlelement+='              <img src="img/getPicture.png">';
        	 htmlelement+='           </a>';
        	 htmlelement+='      </div>';
        	 htmlelement+='      <div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';         	 
        	 htmlelement+='</div>';
        	return htmlelement;
        },
        /***
         * generate frequncy layout for binary answered rangebasedSubCategories 
         */        
        rangeBasedSubCategoriesBinaryLayoutFrequencyFeedback:function(choiceTxt, count){
        	choiceTxt = (typeof choiceTxt == "undefined") ? "" : choiceTxt;
        	var htmlelement="";
        	 var dataDivAttr = this.rangeFeedbackEditor.text !='' ? 'data-div-placeholder-content' : '';
           	 htmlelement+='<div class="clear"></div>';
        	 htmlelement+='<div class="midPageSection secondColPic">';
        	 htmlelement+='   <div class="tag-row">';        	 
        	 htmlelement+='       <div class="colPageSection ">';
        	 htmlelement+='           <div class="form-group ">';
        	 htmlelement+=' 				<div style="margin-left:5px;" class="form-group ptsRangeValue boldFont optionVal_'+count+'">'+choiceTxt+'</div>';
        	 htmlelement+='            </div>';
        	 htmlelement+='          <div style="margin-left:5px;" class="form-group ptsRangeValue">';
        	 htmlelement+='           </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='       <div class="editableDivTitle  editableDivTitle-radio">';
        	 htmlelement+='          <h6 class="pull-right font10 inputhead">ID#'+ this.rangeFeedbackEditor.id+'</h6>';
        	 htmlelement+='      </div>';
        	 htmlelement+='   </div>';
        	 htmlelement+='  <div contenteditable="true" class="inputDummy textinput" data-maxlength="'+this.rangeFeedbackEditor.maxLength+'" '+dataDivAttr+' data-placeholder="Enter feedback"  id="'+(this.rangeFeedbackEditor.id)+'">'+this.rangeFeedbackEditor.text+'</div>';
        	 htmlelement+='   <div class="feedbackSection  invisible">';
        	 htmlelement+='      <div class="eachCol-2">';
        	 htmlelement+='          <a>';
        	 htmlelement+='              <img src="img/getPicture.png">';
        	 htmlelement+='           </a>';
        	 htmlelement+='      </div>';
        	 htmlelement+='      <div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';         	 
        	 htmlelement+='</div>';
        	return htmlelement;
        },
        /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
        afterLayout:function(){
        	if(arguments.length > 0 && arguments[0] == "tableCellRange"){
        	  Range.addEvent( "plus_"+this.rangeFeedbackEditor.id, "click", this._addTableCellRange );
              Range.addEvent( "minus_"+this.rangeFeedbackEditor.id, "click", this._removeTableCellRange );        	  
        	}else{
        	  Range.addEvent( "plus_"+this.rangeFeedbackEditor.id, "click", this._addRange );
        	  Range.addEvent( "minus_"+this.rangeFeedbackEditor.id, "click", this._removeRange );
        	}
        	Range.addEvent( this.rangeFeedbackEditor.id, "click", this._populateRangeEditorProperties);
        	Range.addEvent( this.rangeFeedbackEditor.id, "blur", this._update );
        	//Range.addEvent( this.rangeFeedbackEditor.id, "blur", this._update );
        	Range.addEvent(this.minRangeEditor.id, "blur", this._update,{editor:'min'} );
        	Range.addEvent(this.maxRangeEditor.id, "blur", this._update,{editor:'max'} );
        	Range.addEvent( this.rangeFeedbackEditor.id, "paste", this._filter );
        	Range.addEvent( this.minRangeEditor.id, "paste", this._filter );
        	Range.addEvent( this.maxRangeEditor.id, "paste", this._filter );
   	       this.minRangeEditor.afterNumericEditorlayout();
   	       this.maxRangeEditor.afterNumericEditorlayout();
   	       this.rangeFeedbackEditor.afterEditorlayout();
        },
        
        editorPropertyLayout:function(){
	     	
           	var htmlelement="";       
           	 var elementType ="Element: Scale Feedback";
           	 htmlelement+='    <div class="tabContent tabProContent">';
       	   	 htmlelement+='        <p>Component: Scale</p>';
       	   	 htmlelement+='        <p>'+elementType+'</p>';
       	   	 htmlelement+='        <p id="elementid">ID# '+this.rangeFeedbackEditor.id+'</p>';
       	   	 htmlelement+='    </div>';
       	   	 htmlelement+='    <div class="clear"></div>';
       	   	 htmlelement+='    <div class="gap10"></div>';
       	   	
       	   	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
       	   	 htmlelement+='        <a id="insertHelp'+this.rangeFeedbackEditor.id+'" class="info-icon"></a>Insert a hyperlink:';
       	   	 htmlelement+='    </div>';
       	   	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
       	   	 htmlelement+='        <div class="form-group">';
       	   	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
       	   	 htmlelement+='            <input type="Text" placeholder="Enter Display Text" id="linkText_'+this.rangeFeedbackEditor.id+'">';
       	   	 htmlelement+='        </div>';
       	   	 htmlelement+='        <div class="form-group">';
       	   	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
       	   	 htmlelement+='            <input type="Text" placeholder="Enter Link" id="linkAddress_'+this.rangeFeedbackEditor.id+'">';   	   	 
       	   	 htmlelement+='        </div>';
       	   	 htmlelement+='        <button id="insert_'+this.rangeFeedbackEditor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
       	   	 htmlelement+='        <div class="clear"></div>';
       	   	 htmlelement+='    </div>';
       	   	 htmlelement+='    <div class="clear"></div>';

           	return htmlelement;
           },
        populateRangeEditorProperties:function(){
            $("#elementProperties").html(this.editorPropertyLayout());
            $("#elementProperties").show();
            
    		$("#properties").hide();
    		this.afterEditorPropertyLayout();
            /* Media object creates here for that component */
            var newMedia = new Media({id:this.rangeFeedbackEditor.id});
            $("#mediaProperties").html(newMedia.layout());
            $("#mediaProperties").show();
            newMedia.afterLayout();
            util.checkMediaInEditMode();
        },
        afterEditorPropertyLayout:function(){
        	Range.addEvent( "insertHelp"+this.rangeFeedbackEditor.id,"click",this._openHelpModalForInsertHyperlink);
        	Range.addEvent( "insert_"+this.rangeFeedbackEditor.id, "click", this._updateEditor);
     		 
     	 },
     	 
     	/**
          * opens modal popup for Insert a hyperlink
          */
         openHelpModalForInsertHyperlink:function(event){
        	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
         },
        
        /**
         * updates editor properties
         */
     	 updateEditor:function(event){    	
    			var linkText=$("#linkText_"+this.rangeFeedbackEditor.id).val();
    			var linkAddress=$("#linkAddress_"+this.rangeFeedbackEditor.id).val();
    			var url=$("#linkAddress_"+this.rangeFeedbackEditor.id).val();	 		
    	 		
    	 		//this.evaluateUrl(linkAddress, linkText, this.editor.id);
    	 		
    	 		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
   				if(linkText != ""){
   					if(url.slice(-1)==="/"){
   		 	 			url=url.substring(0,url.length-1);
   		 	 		} 
   		 	 		linkAddress=url;
   		 	 		util.evaluateUrl(linkAddress, linkText, this.rangeFeedbackEditor.id);
   				}
   				else{
   					var currentEditor = ("linkText_"+this.rangeFeedbackEditor.id);
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
   				var currentEditor = ("linkAddress_"+this.rangeFeedbackEditor.id);
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
    		 * adds new range for component
    		 */
    	 addRange:function(){
    	     var i=0;
	       	  for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			if(this.parent.type=='component'){
	       				var newId = question.activePage.components[i].ranges[question.activePage.components[i].ranges.length-1].getId()+1;
	    	       		var config = {
	    						id:newId,
	    						componentId : this.componentId,
	    						componentIdPrefix : this.componentIdPrefix,
	    						allowNegative:this.allowNegative
	    				};
	    	       		var newRange = new Range(config);
	    	       		question.activePage.components[i].addRange(newRange);
	       			}else if(this.parent.type=='subCategoryFeedback'){
	       				var j=0;
	       				for(j in question.activePage.components[i].subCategoryRanges){
	       					if(question.activePage.components[i].subCategoryRanges[j].id==this.parent.id){
	       						var newId = question.activePage.components[i].subCategoryRanges[j].ranges[question.activePage.components[i].subCategoryRanges[j].ranges.length-1].getId()+1;
	    	    	       		var config = {
	    	    						id:newId,
	    	    						componentId : question.activePage.components[i].id,
	    	    						componentIdPrefix : this.componentIdPrefix,
	    	    						parent:{type:'subCategoryFeedback',id:question.activePage.components[i].subCategoryRanges[j].id},
	    	    						allowNegative:this.allowNegative
	    	    				};
	    	    	       		var newRange = new Range(config);
	    	    	       		question.activePage.components[i].subCategoryRanges[j].addRange(newRange);
	       					}
	       				}
	       				
	       			}
	       		
   			    question.activePage.doLayout();
   			    question.activePage.components[i].populateComp();
   			    
	       		}
	       	 } 
	       	$("#"+this.minRangeEditor.id).focus();
    	 },
    	 /**
    	  * removes current range from component
    	  */
    	 removeRange:function(){
    	 var i=0;
       	  for(i in question.activePage.components){
       			if(question.activePage.components[i].id==this.componentId){
       				if(this.parent.type=='component'){
       					var j=0;
       					for(j in question.activePage.components[i].ranges){
           					if(question.activePage.components[i].ranges[j].id==this.id){
           						question.activePage.components[i].ranges.splice(parseInt(j),1);
           						question.activePage.doLayout();
           						
           						if(question.activePage.components[i].ranges.length==1){
           							$("#minus_"+question.activePage.components[i].ranges[0].rangeFeedbackEditor.id).hide();
           						}
           						
           						break;
           					}
           				}
       				}else if(this.parent.type=='subCategoryFeedback'){
	       				var j=0;
	       				for(j in question.activePage.components[i].subCategoryRanges){
	       					if(question.activePage.components[i].subCategoryRanges[j].id==this.parent.id){
	       						var k=0;
	           					for(k in question.activePage.components[i].subCategoryRanges[j].ranges){
	               					if(question.activePage.components[i].subCategoryRanges[j].ranges[k].id==this.id){
	               						question.activePage.components[i].subCategoryRanges[j].ranges.splice(parseInt(k),1);
	               						question.activePage.doLayout();
	               						if(question.activePage.components[i].subCategoryRanges[j].ranges.length==1){
	               							$("#minus_"+question.activePage.components[i].subCategoryRanges[j].ranges[0].rangeFeedbackEditor.id).hide();
	               						}
	               						
	               						break;
	               					}
	               				}
	       					}
	       				}
	       			}
       				question.activePage.components[i].populateComp();
       			}
       	  }
	    	 
	     },     
	     /**
    		 * adds new range for table component's cell
    		 */
	     addTableCellRange:function(){
	    	 var i=0;
	    	 var itsActualComponentId = (this.componentId).match(/(\d+|\D+)/g)[0];
	 	     for( i in page.components){
	 	    	if(page.components[i].id == itsActualComponentId){
	 	    			var currentCellComponent = page.components[i].getItemValById(page.components[i].cellComponentCollection, page.components[i].cellId, "component");
	 		    		var newId = currentCellComponent.ranges[currentCellComponent.ranges.length-1].getId()+1;
	 		    		var config = {
	    						id:newId,
	    						componentId : this.componentId,
	    						componentIdPrefix : this.componentIdPrefix,
	    						allowNegative:this.allowNegative
	    				};
	    	       		var newRange = new Range(config);
	    	       		currentCellComponent.addRange(newRange);			
	 					
	    	       		//add new range in layout
	    	       		var $lastRange = $("#rangeFeedback_"+this.componentIdPrefix + this.componentId).find(".midPageSection ").last();
	    	       		if($lastRange.length > 0){
	    	       			$lastRange.after(newRange.rangeBasedLayoutFeedback(true, newId, true));
	    	       			$lastRange.find('a[title="Add Range"]').parents("div.minusBtn").hide();
	    	       			$lastRange.find('a[title="Delete Range"]').parents("div.minusBtn").show();
	    	       			
	    	       			//check for minu img to display
	    	       			var minusBtnDisp = $lastRange.find('a[title="Delete Range"] img').css("display");
	    	       			if(minusBtnDisp == "none"){
	    	       				$lastRange.find('a[title="Delete Range"] img').show();
	    	       			}
	    	       			
	    	       			newRange.afterLayout("tableCellRange");
	    	       		}	    	       		
	 	    	}
	        }
    	 },
    	 /**
    	  * removes current range from table component's cell
    	  */
    	 removeTableCellRange:function(){
    		 var i=0;
    		 var itsActualComponentId = (this.componentId).match(/(\d+|\D+)/g)[0];
    		 for( i in page.components){
    		   	if(page.components[i].id == itsActualComponentId){
    		   		var currentCellComponent = page.components[i].getItemValById(page.components[i].cellComponentCollection, page.components[i].cellId, "component");
    				for(k in currentCellComponent.ranges){
    		   			if(currentCellComponent.ranges[k].getId()==this.id){
    		   				var $currentRange = $("#"+currentCellComponent.ranges[k].rangeFeedbackEditor.id).parents("div.midPageSection");
    		   				currentCellComponent.ranges.splice(parseInt(k),1);
       						
    		   				var $lastRange = $("#rangeFeedback_"+this.componentIdPrefix + this.componentId).find(".midPageSection ").last();
    		   				
    		   				if($currentRange.length > 0){
    		   					if ($currentRange.is($lastRange)) {
    		   						var $prevRange = $currentRange.prev();
    		   						if($prevRange.length > 0){
    		   						   $prevRange.find('a[title="Add Range"]').parents("div.minusBtn").show();    		   						   
    		   						}
    		   						
    		   					}
    		   					$currentRange.remove();
    		   				}
    		   				
       						if(currentCellComponent.ranges.length==1){
       							$("#minus_"+currentCellComponent.ranges[0].rangeFeedbackEditor.id).hide();
       						}
       						
       						break;			    
    						    			
    					}		
    				}
    		   	}
    		 }
	    	 
	     },	     
	     /**
	      * validate Range
	      */
	     validateRange:function(event){
	    	 var validMinMaxRange =this.validateMinMaxRange();
	    	 if(validMinMaxRange.status){
	    		 var validRange=this.validateRangeInput();
	    		 if(validRange.status){
		    		 var validObj;
		    		 if(arguments[0] == "tableCellRange"){
		    			 validObj = this.isValidTblCellRange(); 
		    		 }else{
		    			 validObj =this.isValidRange();
		    		 }
		          	  if(!validObj.status){
		          		validMinMaxRange.status=validObj.status;
		          		validMinMaxRange.field =validObj.field;
		          		validMinMaxRange.message = "Your ranges overlapped. Please enter a valid range.";
		      	       	
		          	  }
		     		}else{
		     			validMinMaxRange.status=validRange.status;
		          		validMinMaxRange.field =validRange.field;
		          		validMinMaxRange.message = "The minimum value cannot exceed or equal the maximum value.";
		     		}  
	    	 }
	     else{
	    		 validMinMaxRange.status=validMinMaxRange.status;
	          	 validMinMaxRange.field =validMinMaxRange.field;
	          	 validMinMaxRange.message = "Please enter a value inside the range of the minimum and maximum points.";
	    	 }
	    	
	    	return validMinMaxRange;
	     },
	     /**
    	  * validate range:toDo
    	  */
	     validateRangeInput:function(){
	    	 var minRange = this.minRangeEditor.text;
	    	 var maxRange = this.maxRangeEditor.text;
	    	 var isValid={status:true};
	    	 if(minRange!="" && maxRange!=""){
	    		 if(parseFloat(minRange)>parseFloat(maxRange)){
	    			 isValid.status=false;
	    			 isValid.field=this.minRangeEditor.id;
	    		 }
	    	 }
	       	return isValid;
	     },
	     validateMinMaxRange:function(){
	    	 var isValid={ status:true};
	       	return isValid;
	     },
	     /**
    	  * check if input range falls in already existing rangelimit
    	  */
    	isValidRange:function(){
    		 var ranges =null;
    		 var i=0;
    		 if(this.parent.type=='component'){
    			 for(i in question.activePage.components){
    				var activePageComponetPrefix = question.activePage.components[i].pageIdPrefix + question.activePage.components[i].pageId+ question.activePage.components[i].idPrefix;
   	       			if(question.activePage.components[i].id==this.componentId && activePageComponetPrefix == this.componentIdPrefix){
 	  	       			ranges= question.activePage.components[i].ranges;
 	  	       			break;
   	       			}
   	       	  }
 	    	  }else if(this.parent.type=='subCategoryFeedback'){
 	    		 for(i in question.activePage.components){
    	       			if(question.activePage.components[i].id==this.componentId){
    	       				var j=0;
    	       				for(j in question.activePage.components[i].subCategoryRanges){
    	       					if(question.activePage.components[i].subCategoryRanges[j].id==this.parent.id){
    	       						ranges= question.activePage.components[i].subCategoryRanges[j].ranges;
    	     	  	       			break;
    	       					}
    	       				}
    	       			}
 	    		 }
     				
       		  }
  	       	 
  	       
    		var isValid={status:true};
    		var currentRange =this;
    		if(ranges!=null){
    			 var j=0;
     	       	  for(j in ranges){
	    			 if(ranges[j].id !=currentRange.id && isValid){
		    			 var minRange=ranges[j].minRangeEditor.text;
		    			 var maxRange=ranges[j].maxRangeEditor.text;
		    			 if(minRange!="" && maxRange!=""){
		    				 
		    				 if(currentRange.minRangeEditor.text!=''){
		    					 var minRangeVal=parseFloat(currentRange.minRangeEditor.text);
			    				 if(minRangeVal>=parseFloat(minRange) && minRangeVal<= parseFloat(maxRange)){
		 							isValid.status=false;
		 							isValid.field=currentRange.minRangeEditor.id;
		 							break;
			    				 }	
		    				 }else if(currentRange.maxRangeEditor.text!=''){
		    					 var maxRangeVal=parseFloat(currentRange.maxRangeEditor.text);
			    				 if(maxRangeVal>=parseFloat(minRange) && maxRangeVal<= parseFloat(maxRange)){
			    					 isValid.status=false;
			 						 isValid.field=currentRange.maxRangeEditor.id;
			 						break;
			    				 }	
		    				 }
		    			 }
	    			 }
	    			
	   		  	}
    		}
    		return isValid;	
			
    	},
    	isValidTblCellRange : function(){
    		var ranges =null;
   		 	var a=0,
            tablecomp;
 	      var cellId = this.componentIdPrefix + this.componentId;
          for(a=0; a<question.pages.length; a++){
              var i=0;
              for(i=0; i<question.pages[a].components.length; i++){
            	var comp = question.pages[a].components[i];
            	var compIdPrefix = comp.pageIdPrefix + comp.pageId + comp.idPrefix + comp.id;
            	var rangeComponentIdPrefix = this.componentIdPrefix + (this.componentId).match(/(\d+|\D+)/g)[0];
                if(question.pages[a].components[i].type == "table" && rangeComponentIdPrefix == compIdPrefix){
                    tablecomp = question.pages[a].components[i];

                  var currentCellComponent = tablecomp.getItemValById(tablecomp.cellComponentCollection, cellId, "component");
                  ranges= currentCellComponent.ranges;
                  var isValid={status:true};
                  var currentRange =this;

                  if(ranges!=null){
                     var j=0;
                      for(j in ranges){
                       if(ranges[j].id !=currentRange.id && isValid){
                         var minRange=ranges[j].minRangeEditor.text;
                         var maxRange=ranges[j].maxRangeEditor.text;
                         if(minRange!="" && maxRange!=""){
                           
                           if(currentRange.minRangeEditor.text!=''){
                             var minRangeVal=parseFloat(currentRange.minRangeEditor.text);
                             if(minRangeVal>=parseFloat(minRange) && minRangeVal<= parseFloat(maxRange)){
                            isValid.status=false;
                            isValid.field=currentRange.minRangeEditor.id;
                            break;
                             }  
                           }else if(currentRange.maxRangeEditor.text!=''){
                             var maxRangeVal=parseFloat(currentRange.maxRangeEditor.text);
                             if(maxRangeVal>=parseFloat(minRange) && maxRangeVal<= parseFloat(maxRange)){
                               isValid.status=false;
                             isValid.field=currentRange.maxRangeEditor.id;
                            break;
                             }  
                           }
                         }
                       }
                      
                    }
                  }
                }
              }
            }
            return isValid;	
    	},
    	filter:function(event){
    		util.removePasteImage(event.originalEvent.clipboardData,event);
    	},
     	 /**
         * layouts in instructor mode
         * @returns {String}
         */
        instructorLayout:function(){
        	if( this.minRangeEditor.text != '' && this.maxRangeEditor.text != '' && this.rangeFeedbackEditor.text != '' ) {
        		var htmlelement='';
               	htmlelement += '<div class="parent_div">';
               	htmlelement += '	<div class="child_div">' + this.minRangeEditor.text + ' - ' + this.maxRangeEditor.text + ' pts.</div>';

                var rangFeedback = util.getImageLayout(this.rangeFeedbackEditor.text);
                    rangFeedback = util.getVideoLayout(rangFeedback);
                
                /* to prepend <b>FEEDBACK:</b> in rangFeedback for alignments */
                var rangFeedbackDOMObj = $('<div class="dumpHtml"></div>');   /*dump div created*/                  
                rangFeedbackDOMObj.html(rangFeedback);
                /* check for div[align]*/
                var isAlignDiv = rangFeedbackDOMObj.find("div[align]:first");
                if(isAlignDiv.length > 0){
                	rangFeedbackDOMObj.prepend("<div style='padding-top:0px;'><b>FEEDBACK:</b></div> ");
                	if(isAlignDiv.text() == rangFeedbackDOMObj.text()){
                		isAlignDiv.addClass("autoWidth");
                	}
                	
                }else{
                	rangFeedbackDOMObj.prepend("<div style='padding-top:0px;'><b>FEEDBACK:</b></div>");
                }                
                rangFeedback = rangFeedbackDOMObj.html();	  /*update rangFeedback*/
                
               	//htmlelement += '	<div><b>FEEDBACK:</b> ' + rangFeedback + '</div>';
                htmlelement += '	<div class="feedbackWrapper"> ' + rangFeedback + '</div>';
               	htmlelement += '</div>';
           		return htmlelement;
        	} else {
        		return '';
        	}
        },
        /**
         * layouts in instructor mode for frequency's feedbacks
         * @returns {String}
         */
        instructorFrequencyFeedbackLayout:function(criteriaIndex,markers,binaryAnswer,pointsVal){
        	if( this.rangeFeedbackEditor.text != '' ) {
        		var htmlelement='';
               	htmlelement += '<div class="parent_div">';
               	if(!binaryAnswer){
               	 htmlelement += '	<div class="frequency_child_div">' + markers[criteriaIndex] + '</div>';
        	    }else{
        	     htmlelement += '	<div class="frequency_child_div">' + pointsVal[criteriaIndex] + '</div>';	
        	    }
                var rangFeedback = util.getImageLayout(this.rangeFeedbackEditor.text);
                    rangFeedback = util.getVideoLayout(rangFeedback);
               	htmlelement += '	<div><b>FEEDBACK:</b> ' + rangFeedback + '</div>';
               	htmlelement += '</div>';
           		return htmlelement;
        	} else {
        		return '';
        	}
        }
	};  