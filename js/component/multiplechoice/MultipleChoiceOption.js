/* ========================================================================
 * MultipleChoiceOption: Object Declaration
 * @author: Irfan Tamboli
 * ========================================================================
 * Purpose of this object to have all multiple choice option specific properties like
 * idPrefix,sectionId,sectionIdPrefix,editor,pointsValueEditor,pointsValuePrefix
 * ======================================================================== */
var MultipleChoiceOption = function(options){
	this.id = null;
	this.idPrefix = "E";
	this.sectionId = null;
	this.sectionIdPrefix = null;
	this.componentId=null;
	this.componentIdPrefix=null;	
	this.editor = null;
	this.marker = null;
	this.subCategoryId = null;
	this.answers=new Array();
	this.notApplicableBinaryOption = false;
	$.extend(this, options);
	this.editor = new Editor({id:this.sectionIdPrefix+this.sectionId+this.idPrefix+this.id});
	this._showFeedback = MultipleChoiceOption.BindAsEventListener( this, this.showFeedback );
	this._update = MultipleChoiceOption.BindAsEventListener( this, this.update );
	this._addOption=MultipleChoiceOption.BindAsEventListener( this, this.addOption );	
	this._removeOption=MultipleChoiceOption.BindAsEventListener( this, this.removeOption );
	this._markRight = MultipleChoiceOption.BindAsEventListener( this, this.markRight );
	this._markWrong = MultipleChoiceOption.BindAsEventListener( this, this.markWrong );
	this._closeRangeFeedback = MultipleChoiceOption.BindAsEventListener( this, this.closeRangeFeedback );
	this._filter =MultipleChoiceOption.BindAsEventListener( this, this.filter );
	this._setRight = MultipleChoiceOption.BindAsEventListener( this, this.setRight );
	this._populateEditorProperties = MultipleChoiceOption.BindAsEventListener( this, this.populateEditorProperties );
	this._updateStudentResponse = MultipleChoiceOption.BindAsEventListener( this, this.updateStudentResponse );
	this._updateEditor= MultipleChoiceOption.BindAsEventListener( this, this.updateEditor );
	this._selectSubCategories= MultipleChoiceOption.BindAsEventListener( this, this.selectSubCategories );
	this._openHelpModalForInsertHyperlink = MultipleChoiceOption.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
};
//add event helper method on element id
MultipleChoiceOption.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
MultipleChoiceOption.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};

//use call to borrow context
MultipleChoiceOption.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
MultipleChoiceOption.prototype = { 
	  getComponentIdPrefix: function( ){
            return this.componentIdPrefix;  
	     },
	     setComponentIdPrefix: function( componentIdPrefix){
	         this.componentIdPrefix =  idPrefix;
	     },
	     getComponentId: function( ){
            return this.componentId;  
	     },
	     setComponentId: function( componentId){
	         this.componentId =  componentId;
	     },
		/**
	 * gets id of Multiple Choice option
	 * @returns  id
	 */
		getId : function(){
		return this.id;
	},
	/**
     * sets id of Multiple Choice Option
     * @param id
     */
	setId : function(id){
		this.id = id;
	},
	/**
	 * gets idPrefix of Multiple Choice option
	 * @returns  idPrefix
	 */
	getIdPrefix : function(){
		return this.idPrefix;
	},
	/**
     * sets idPrefix of Multiple Choice Option
     * @param idPrefix
     */
	setIdPrefix : function(idPrefix){
		this.idPrefix = idPrefix;
	},
	/**
	 * gets sectionId of Multiple Choice option
	 * @returns  sectionId
	 */
	getSectionId : function(){
		return this.sectionId;
	},
	/**
     * sets sectionId of Multiple Choice Option
     * @param sectionId
     */
	setSectionId : function(sectionId){
		this.sectionId = sectionId;
	},
	/**
	 * gets sectionIdPrefix of Multiple Choice option
	 * @returns  sectionIdPrefix
	 */
	getSectionIdPrefix : function(){
		return this.sectionIdPrefix;
	},
	/**
     * sets sectionIdPrefix of Multiple Choice Option
     * @param sectionIdPrefix
     */
	setSectionIdPrefix : function(sectionIdPrefix){
		this.sectionIdPrefix = sectionIdPrefix;
	},
	/**
	 * gets editor of Multiple Choice option
	 * @returns  editor
	 */
	getEditor : function(){
		return this.editor;
	},
	/**
     * sets editor of Multiple Choice Option
     * @param editor
     */
	setEditor : function(editor){
		this.editor = editor;
	},
	/**
	 * gets answers of Multiple Choice option
	 * @returns  answers
	 */
	getAnswers : function(){
		return this.answers;
	},
	/**
     * sets answers of Multiple Choice Option
     * @param answers
     */
	setAnswers : function(answers){
		this.answers = answers;
	},
	/**
     * updates editor text
     */
    update: function(e){
  	  this.editor.update();
  	  var i=0;
  	  for( i in this.answers){
  		  this.answers[i].update();
  	  }
  	  /*
  	   Commented As per request from client
  	   if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
		 	question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
	  }*/
  	  
  	  for (i in question.activePage.components) {
		if (question.activePage.components[i].id == this.componentId) {			
			question.activePage.components[i].updateMinMaxForSubCat();
			break;
		}
	  }
    },
	/**
     * layouts options  in design mode
     * @returns {String}
     */
	 layout: function(isLast,feedbackType,feedbackScoringType,marker, binaryAnswer){
		 var css = isLast?' style="display: block;"':' style="display: none;"';
		 this.marker = marker;
    	 var htmlelement='';
    	 var activeRightCss = "";
    	 var activeWrongCss = "";
    	 if( this.answers[0].right ){
    		 activeRightCss = 'active';
    		 activeWrongCss = '';
    	 } else {
    		 activeRightCss = '';
    		 activeWrongCss = 'active';
    	 }
    	 var groupName = this.editor.id;
    	 groupName = groupName.substring(0,6);
    	 htmlelement+='<div id="ans_'+this.editor.id+'" class="rowPagesection tickCheck">';
    	 htmlelement+='   <div class="colPageSection">';
    	 htmlelement+='       <div class="eachCol firstColPic" >';
    	 htmlelement+='           <div class="btn-group pull-left indt-mrgn">';
    	 htmlelement+='              <label class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick '+activeRightCss+'" id="right_'+this.editor.id+'" >';
    	 htmlelement+='                   <input type="checkbox" id="right_'+this.editor.id+'">';
    	 htmlelement+='                   <img src="img/tick1.png">';
    	 htmlelement+='               </label>';
    	 htmlelement+='               <label class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrongMul '+activeWrongCss+'" id="wrong_'+this.editor.id+'"  style="padding-bottom:0px;padding-top:0px;">';   
    	 htmlelement+='                   <input type="checkbox" id="wrong_'+this.editor.id+'">';
    	 htmlelement+='                   <img src="img/tick2.png">';
    	 htmlelement+='               </label>';
    	 htmlelement+='           </div>';
    	 
    	 htmlelement+=' 		<div class="radioOption" style="display:none;">';
    	 htmlelement+=' 				<input type="radio" name="'+groupName+'"  id="option_'+this.editor.id+'"  /><label for="option_'+this.editor.id+'"><span></span></label>';
    	 htmlelement+=' 		</div>';
    	 htmlelement+='       </div>';
    	 if(feedbackScoringType == 'frequency'){
    		 if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && binaryAnswer){
    			//don't insert markers 
    		 }else{
    			 htmlelement+=' 		<div class="optionMarkerAuthor boldFont" style="margin-left:5px;">'+marker+'</div>'; 
    		 }    		 
    	 }	
    	 htmlelement+='   </div>';
    	 htmlelement+=this.layoutEditor();   
    	 
    	 if(feedbackType == 'rangedBasedSubcategories' && binaryAnswer && feedbackScoringType == "frequency"){
    		//don't insert point editors 
    	 }else{
    		 $.each(this.answers,function(i,value){
    	   	   htmlelement += value.layoutPoint(feedbackType, feedbackScoringType);
    	   	 });	 
    	 }
    	 
    	 if(feedbackType == 'rangedBasedSubcategories' && binaryAnswer){
    		 if(feedbackScoringType == "frequency"){
   			  htmlelement+='			<div class="colPageSection fourthColPic subcategoryBinarybased" id="'+this.editor.id+'_subCategories" style="width: 165px;">'; 
    		 }else{
    		  htmlelement+='			<div class="colPageSection fourthColPic subcategoryBinarybased" id="'+this.editor.id+'_subCategories">';
    		 }
    		 
    		 htmlelement += '			<div >';
    		 htmlelement+=					this.layoutSubCategory(feedbackScoringType);
    		 htmlelement += '			</div>';
	       	 htmlelement+='			</div>';
    	 }
    	 
    	 htmlelement+='   <div class="colPageSection subCatplusrangebased">';
    	 htmlelement+='       <div class="eachCol">';
    	 htmlelement+='           <div class="plusBtn" '+css+' > ';
    	 htmlelement+='               <a  title="Add Option">';
    	 htmlelement+='                   <img  id="plus_'+this.editor.id+'" src="img/plus.png">';
    	 htmlelement+='               </a>';
    	 htmlelement+='           </div>';
    	 htmlelement+='       <div class="minusBtn">';
    	 htmlelement+='                <a title="Delete Option">';
    	 htmlelement+='                   <img id="minus_'+this.editor.id+'" src="img/minus.png">';
    	 htmlelement+='               </a>';
    	 htmlelement+='          </div>';
    	 htmlelement+='      </div>';
    	 htmlelement+='  </div>';
    	 htmlelement+=this.layoutFeedback();
    	 htmlelement+='</div>';
    	 return htmlelement;
     },
     /**
      * layouts option editor 
      * @returns {String}
      */
     layoutEditor:function(){
	 	 var htmlelement="";
	 	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';	    		
    		 htmlelement+='   <div id="author'+this.editor.id+'" class="colPageSection secondColPic">';
        	 htmlelement+='       <div>';
        	 htmlelement+='           <div class="editableDivTitle">';
        	 htmlelement+='				<h6 class="pull-right font10">ID# '+this.editor.id+'<a id="editfb_'+this.editor.id+'">| Expand feedback</a></h6>';
        	 htmlelement+='          </div>';
        	 htmlelement+='		<div id="htmlToText'+this.editor.id+'" style="display:none;"></div>';
        	 htmlelement+='          <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text" id="'+this.editor.id+'"  data-maxlength="'+this.editor.maxLength+'" class="inputDummy inputDummyMaxWidth " '+dataDivAttr+'>'+this.editor.text+'</div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='   </div>';
    	 return htmlelement;
      },
      /*
       * option wise sub categories layout for binary answered rangebasedsubcategories 
       * */
      layoutSubCategory :function(feedbackScoringType){
  	    var i = 0;
			var currentComponent = null;
			for (i in question.activePage.components) {
				if (question.activePage.components[i].id == this.componentId) {
					currentComponent = question.activePage.components[i];
				}
			}
			var htmlelement = "";
			htmlelement += '<select name="subCategories" id="categories'+this.editor.id+'" style="width: 160px" class="subcategories_options_'+this.componentIdPrefix+this.componentId+'">';
			
			if(feedbackScoringType == "frequency"){
			  htmlelement += ' <option  id="0" "value="Select a Subcategory">Select a Subcategory</option>';
			}else{
			  htmlelement += ' <option  id="0" "value="Select a Subcategory">Select</option>';
			}			
			$.each(currentComponent.subCategories,function(index, subCategory) {
					if ($("<div>" + subCategory.editor.text+"</div>").text().length > 0) {
						htmlelement += ' <option  id="'+subCategory.id+'"value="'
								+ subCategory.id + '">'
								+ subCategory.editor.text
								+ '</option>';
					}
			});
			htmlelement += '</select>';
			return htmlelement;
    },
    /*
     * options subcategories dropdown  
     * */
    selectSubCategories:function(){
    	var currentComponent = null;
		for (i in question.activePage.components) {
			if (question.activePage.components[i].id == this.componentId) {
				currentComponent = question.activePage.components[i];
			}
		}
  	  if($("#categories"+this.editor.id).val()!="Select a Subcategory")
  		  this.subCategoryId=($("#categories"+this.editor.id).val());  	      
  	  this.update();
  	  for (k in currentComponent.subCategories){
		  var selectedOptions = this.getOptionIdsForSubcategory(currentComponent.subCategories[k]);
		  currentComponent.subCategories[k].optionIds=selectedOptions;
	  }
    }, 
    getOptionIdsForSubcategory:function(subCategory){
   	    var k=0;
   		var optionIds=[];
   		var currentComponent = null;
		for (i in question.activePage.components) {
			if (question.activePage.components[i].id == this.componentId) {
				currentComponent = question.activePage.components[i];
			}
		}
   		for(k in currentComponent.sections){
   			for(j in currentComponent.sections[k].options){
   				if(currentComponent.sections[k].options[j].subCategoryId == subCategory.id)
   				{
   	   				optionIds.push(currentComponent.sections[k].options[j].id);
   				} 
   			}
   		}
   		return optionIds;
      },
    editorPropertyLayout:function(){
      	     	
      	var htmlelement="";
      	//htmlelement+='<p style="display:none;" id="elementid">ID# '+this.editor.id+'</p>';
      	 var elementType ="Element: Input field";
      	 htmlelement+='    <div class="tabContent tabProContent">';
  	   	 htmlelement+='        <p>Component: Multiple Choice</p>';
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
  	   	 //htmlelement+='    <div id="linkAddress_'+this.editor.id+'" contenteditable="true"  data-placeholder="Enter Display Text" class="inputDummy"></div>';
  	   	 htmlelement+='        </div>';
  	   	 htmlelement+='        <button id="insert_'+this.editor.id+'" class="btn btn-primary btn-xs btn-Insert pull-right" type="submit">Insert</button>';
  	   	 htmlelement+='        <div class="clear"></div>';
  	   	 htmlelement+='    </div>';
  	   	 htmlelement+='    <div class="clear"></div>';

      	return htmlelement;
      },
      /**
       * marks current option as right
       * @param event
       */
      markRight:function(){      	
    	  this.answers[1].right=false;
    	  this.answers[0].right=true;  
    	  if(this.answers[0].right&& $("#wrong_"+this.editor.id).hasClass("active")){
				$("#wrong_"+this.editor.id).removeClass("active");
				$("#right_"+this.editor.id).addClass("active");
		}	    	  	
      },
      
      populateEditorProperties:function(){
        $("#elementProperties").html(this.editorPropertyLayout());
        $("#elementProperties").show();
  		  $("#properties").hide();
  		  this.afterEditorPropertyLayout();
  		  $("#activeHyperlink").text("");
        var i =0;
        var subType=null;
        for( i in question.activePage.components){
            if(question.activePage.components[i].id==this.componentId)
              subType = question.activePage.components[i].subType;
          }
          
          if(subType=="radio")
          {
            /* Code for media*/
            /* Media object creates here for that component */
            var newMedia = new Media({id:this.editor.id});
            $("#mediaProperties").html(newMedia.layout());
            $("#mediaProperties").show();
            newMedia.afterLayout();
            util.checkMediaInEditMode();
          } else {
            $("#mediaProperties").hide();
          }
      },
       
       /**
  	  * adds events for html elements of current option editor property pane
  	  */
  	 afterEditorPropertyLayout:function(){
  		 Option.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
  		 Option.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
  		 
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
      /**
       * Function to set radio button right/wrong
       * ***/
      setRight : function(){
    	  var isChecked =$("#option_"+this.editor.id).prop("checked");
    	  var i=0;
	  	   for( i in page.components){
	  	    	if(this.componentId==page.components[i].id){
		  	    	var j=0;
		  	    	for(j in page.components[i].sections){	    		
		  	    		if(page.components[i].sections[j].id==this.sectionId){
		  	    			var currenrtSection  = page.components[i].sections[j];
		  	    			var binaryAnswer= page.components[i].binaryAnswer;
		  	    			var currentOptionId = this.id;
		  	    			$.each(currenrtSection.options,function(i,option){
		  	    				if(option.id!=currentOptionId){
		  	    					option.resetAnswer(false, binaryAnswer);
		  	    				}
		  	    				
		  	    			});
		  	    		}
		  	    	}
	  	    	}
	  	   }
    	  if(isChecked){
    		  this.answers[0].right=true;
    	  }
    	  else{
    		  this.answers[0].right=false;
    	  }
      },
      /**
       * marks current option as wrong
       * @param event
       */
      markWrong:function(){  
    	  this.answers[1].right=true;
    	  this.answers[0].right=false;
    	  if (this.answers[1].right && $("#right_" +this.editor.id).hasClass("active")) {
     		 $("#right_" +this.editor.id).removeClass("active");
				 $("#wrong_" +this.editor.id).addClass("active");
				} 
      },
      /**
       * opens modal popup for Insert a hyperlink
       */
      openHelpModalForInsertHyperlink:function(event){
     	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
      },
      /**
       * layouts option feedback editor 
       * @returns {String}
       */
      layoutFeedback:function(){
    	  htmlelement="<div id='feedback_"+this.editor.id+"' style='display : none;'>";
    	  $.each(this.answers,function(i,value){
    		  htmlelement += value.layoutFeedback();
    	  });
    	  htmlelement +='</div>';
    	  return htmlelement;
       },
       /**
        * adds event handlers to html element for feedback
        */
       afterLayout:function(){
    	   MultipleChoiceOption.addEvent( "editfb_"+this.editor.id, "click", this._showFeedback );
    	   MultipleChoiceOption.addEvent( this.editor.id, "blur", this._update );
    	   MultipleChoiceOption.addEvent( this.editor.id, "paste", this._filter );
    	   MultipleChoiceOption.addEvent( "right_"+this.editor.id, "click", this._markRight );
    	   MultipleChoiceOption.addEvent( "wrong_"+this.editor.id, "click", this._markWrong );
    	   MultipleChoiceOption.addEvent( "plus_"+this.editor.id, "click", this._addOption,{id:this.editor.id} );
    	   MultipleChoiceOption.addEvent( "minus_"+this.editor.id, "click", this._removeOption,{id:this.editor.id} );
    	   MultipleChoiceOption.addEvent( "option_"+this.editor.id, "click", this._setRight);
    	   MultipleChoiceOption.addEvent( this.editor.id, "click", this._populateEditorProperties );
    	   $.each(this.answers,function(i,value){
    		   value.afterFeedbackLayout();  
    		   value.afterPointLayout();
     	  });
   
    	   var i=0;
     	    for( i in question.activePage.components){
     	    	if(question.activePage.components[i].id==this.componentId && !question.activePage.components[i].binaryAnswer && !question.activePage.components[i].acceptAnyAnswer){
	     	    	var j=0;
	     	    	for(j in question.activePage.components[i].sections){	    		
	     	    		if(question.activePage.components[i].sections[j].id==this.sectionId){
	     	    			var currenrtSection  = question.activePage.components[i].sections[j];
	     	    			$.each(currenrtSection.options,function(i,option){
	     	    				$("#option_"+option.editor.id).prop("checked",option.answers[0].right);
	     	    			});
	     	    		}
	     	    	}
	     	    }
     		}
     	    
     	   MultipleChoiceSection.addEvent("categories"+this.editor.id,"change", this._selectSubCategories);
    	    if (this.subCategoryId != null)		
				$("#categories"+this.editor.id).val(this.subCategoryId);
		  
   	 },
   	/**
      * display option feedback
      */
   	 showFeedback:function(){
  		$("#editfb_"+this.editor.id).hide("slow");
  		$("#feedback_"+this.editor.id).show("slow");		
   	 },
   	 /**
      * hide and show point base layout
      */
     togglePonits:function(pointflag){
   	  $.each(this.answers,function(i,answerObj){
			  answerObj.togglePonits(pointflag);
		  });
     },
     /**
		 * check if option is filled
		 * 
		 */
	isOptionFilled:function(){
		$("#htmlToTextConvertor").html(this.editor.text);
		var optionText = $("#htmlToTextConvertor").text();
		 if(optionText.length<=0) {
			    return false; 
			  }else{
			    return true;
		  }		   
	},
	 /**
      * Validate if right answer is not selected
      */
     isRightAnswerSelected:function(){
	   	  var rightAnswerSelected=true;
	   	  rightAnswerSelected = (this.answers[0].right==true || this.answers[1].right==true)?true:false;
	   	  return rightAnswerSelected;
     },
	/**
	 * check if rangeBased values are entered 
	 * 
	 */
	isOptionAnswerPointValueFilled:function(){
		var isPointValueFilled=true;
		$.each(this.answers,function(i,answerObj){
			isPointValueFilled=isPointValueFilled && answerObj.isPointValueFilled();
		  });
		return isPointValueFilled;
	},
	/**
	 * adds new option for component
	 */
	addOption:function(event){
		var i=0;
	    for( i in page.components){
	    	if(page.components[i].id==this.componentId){
	    		var j=0;
		    	for(j in page.components[i].sections){	    		
		    		if(this.sectionId==page.components[i].sections[j].id){
		    		var newId = page.components[i].sections[j].options[page.components[i].sections[j].options.length-1].getId()+1;
		    		var option = new MultipleChoiceOption({id:newId,sectionId:this.sectionId, sectionIdPrefix:this.sectionIdPrefix,componentId : this.componentId,componentIdPrefix : this.componentIdPrefix	});		    			
		    		var optionAnswers = [];
		    		
					var optionAnswersConfig = {
							id:1,
							optionId : option.id,
							optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
							componentId : this.componentId,
							componentIdPrefix : this.componentIdPrefix,
							sectionId : option.sectionId,
	    					sectionIdPrefix : option.sectionIdPrefix,
	    					right:page.components[i].binaryAnswer?true:page.components[i].acceptAnyAnswer
						};				
					optionAnswers[0]=new MultipleChoiceOptionAnswer(optionAnswersConfig);
					if(page.components[i].binaryAnswer==true){
						optionAnswersConfig.id=2;
						optionAnswersConfig.right=false;
						optionAnswers[1]=new MultipleChoiceOptionAnswer(optionAnswersConfig);						
					}
					option.setAnswers(optionAnswers);
					page.components[i].sections[j].addOption(option);			
					var $lastOption=$("#"+event.data.id);
					if( $lastOption.find(".colPageSection").find(".eachCol").find(".plusBtn").is(":visible"))
		    			 $lastOption.find(".colPageSection").find(".eachCol").find(".plusBtn").hide();
					 $lastOption.after(option.layout(true,page.components[i].feedbackType, page.components[i].feedbackScoringType,page.components[i].sections[j].markers[newId-1]));
		    	    
					 if(page.components[i].feedbackScoringType == "frequency")
					 {
						 /*var rangeConfig = {
									componentId :this.componentId,
									componentIdPrefix :page.components[i].pageIdPrefix+page.components[i].pageId+page.components[i].idPrefix
								};
						 rangeConfig.id = option.id;
						 page.components[i].addRange(new Range(rangeConfig));*/
						 
						 /* update overall frequency ranges */
						 this.updateOverallRangeFeedbacks(page.components[i],option.id, true);
						 
						 /* update frequency subcategory ranges */						 
						 if(page.components[i].feedbackType === "rangedBasedSubcategories"){
							 var currentSection = page.components[i].sections[j];
							 var subCatid = currentSection.subCategoryId;
							 if(subCatid!=="" && subCatid !== null && typeof subCatid !== "undefined"){
								 currentSection.updateSubCategoryRangeFeedbacks(subCatid, false);
							 }							 
						 }
					 }
		    	     page.components[i].showSolutionIndicator();
		    	     $lastOption.find(".colPageSection").find(".eachCol").find(".minusBtn").show(); 			    	   
		    	     option.afterLayout();	
		    	     question.activePage.doLayout();
		    		}
		    	}
	    	}
       }
	},
	
	/**
	 * removes current option from component
	 */
	removeOption:function(event){	
		var i=0;
		    for( i in page.components){
		    	if(page.components[i].id==this.componentId){
		    	var j=0;
			    	for(j in page.components[i].sections){
			    			if(this.sectionId==page.components[i].sections[j].id){
			    			for(k in page.components[i].sections[j].options){
			    			if(page.components[i].sections[j].options[k].getId()==this.id){
				    				/*if(page.components[i].feedbackScoringType == "frequency")
					    			{
										page.components[i].removeRange(page.components[i].sections[j].options[k].getId());				    					
				    				}*/
			    				    var prevOptionId = page.components[i].sections[j].options[k].getId();
			    				    
				    				page.components[i].sections[j].removeOption(page.components[i].sections[j].options[k]);
				    				
				    				/* update overall frequency ranges */
				    				if(page.components[i].feedbackScoringType == "frequency"){
				    					this.updateOverallRangeFeedbacks(page.components[i], prevOptionId, false);
				    				}
				    				
				    				/* update frequency subcategory ranges */
				    				if(page.components[i].feedbackScoringType == "frequency" && page.components[i].feedbackType === "rangedBasedSubcategories"){
				    				  var currentSection = page.components[i].sections[j];
									  var subCatid = currentSection.subCategoryId;
									  if(subCatid!=="" && subCatid !== null && typeof subCatid !== "undefined"){
										 currentSection.updateSubCategoryRangeFeedbacks(subCatid, false);
									  }
				    				}
				    				
				    				var lastOption=("ans_"+page.components[i].sections[j].options[page.components[i].sections[j].options.length-1].editor.id);
				    				var id=event.data.id;
				    				var previous=$('#ans_'+id).prev('div').attr('id');
				    				$( "#ans_"+this.editor.id).remove();
					    			if(previous==lastOption){
				    					$("#"+previous).find(".colPageSection").find(".eachCol").find(".plusBtn").show();	    	    			
				    				}
					    			if(page.components[i].sections[j].options.length<=1){
				    					$('#'+lastOption).find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
				    				}
					    			page.components[i].updateMinMaxPoint();
					    			question.activePage.doLayout();
			    				}		
			    			}
			    		}
			    	}
		    	}
		    }
	},
	/**
	 * resets point value
	 */
	resetPointValue:function(){
		$.each(this.answers,function(i,answerObj){
			$('#'+answerObj.pointsValueEditor.id).html="";
			answerObj.pointsValueEditor.text="";
		  });
	},
	/**
	 * reset answers
	 * @param flag
	 * @param binaryAns
	 */
	resetAnswer:function(flag,binaryAns){
		var editor = this.editor;
		$.each(this.answers,function(i,answerObj){
			answerObj.right = flag;
			if(!binaryAns){
				$("#option_"+editor.id).prop("checked",flag);
			}
		  });
	},
	/**
	 * filters html to remove img tag and non compatible formatting
	 * @param event
	 */
	filter:function(event){
		util.removePasteImage(event.originalEvent.clipboardData,event);
	},
	/**
     * layouts in instructor mode
     * @returns {String}
     */
    instructorLayout:function(binaryAnswer,subType,firstOption,acceptAnyAnswer,feedbackType,orientation,feedbackScoringType){
		 var htmlelement='';
		 htmlelement +='<div class="prevQuestOpts">';
		 
		 //get marker and setflag to remove point text
		 var markerHtml = "";
		 var isremovePointText = 0;
		 if(feedbackScoringType === "frequency" && (!binaryAnswer)){
			 var markVal = this.marker;
			 if(typeof markVal !== "undefined" && markVal !== null ){
				 markerHtml = '<div class="colnInner optionMarker boldFont">' +markVal+ '.</div>';
			 }
			 isremovePointText = 1;
		 }
		 
		 if(binaryAnswer && feedbackType != 'rangedBasedSubcategories'){
			if(firstOption){
				 var i=0;
				 
				 for(i in this.answers){
					 if(this.answers[i].label!="" && this.answers[i].label!=null)
						 htmlelement +='<div class="colPageSection minColPic" >'+this.answers[i].label+'</div>';
				 }
				 htmlelement+='<div class="clear"></div>';
			 }
		 }
		
		 var points=[];
		 var j=0;
		 var feedbackText=""; 
		 feedbackText +='<label class="feedbackLinkPosition"><a class="feedClose">Feedback</a></label>';
		 var feedbackFlag=false;
		 for(j in this.answers){
			 var checkproperty=!acceptAnyAnswer && this.answers[j].right?"checked='checked'":"";
			 var binaryOptionGap=(binaryAnswer)?"minColPic":"";
			 htmlelement +='<div class="colPageSection '+binaryOptionGap+'" ><input id="option'+this.editor.id+'_'+j+'" name="mc'+this.editor.id+'" type="radio" '+checkproperty+' disabled></div>';
			 if(markerHtml !== ""){
				 htmlelement += markerHtml;
			 }
			 this.answers[j].feedback.text = this.answers[j].feedback.text.replace("&nbsp;","");

       var fbText = util.getImageLayout(this.answers[j].feedback.text);
           fbText = util.getVideoLayout(fbText);
           
			 if(this.answers[j].feedback.text!=''){
				 feedbackText +=' <div  style="height:10px;"> </div>';
				 feedbackText +=' <div style="display: none;" class="feedBackOpen">';
				 if(binaryAnswer){
					 feedbackText +=' <strong>Option '+(parseInt(j)+1)+' feedback: </strong>'+fbText;
				 }else{
					 feedbackText +=' <strong>feedback: </strong>'+fbText;
				 }
				 feedbackText +='</div>'; 
				 feedbackFlag = true;
			 }
			 if(feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories'){
				 points.push(parseFloat(this.answers[j].pointsValueEditor.text));
				 pointText +=this.answers[j].pointsValueEditor.text ;
				 pointText +=(parseFloat(this.answers[j].pointsValueEditor.text)>1)?" pts.":" pt.";
			 }
		 }
		 
		 if(!feedbackFlag)
			 feedbackText=""; 
		 
		 var pointText=" ";
		 if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && feedbackScoringType != "frequency"){
			 if(binaryAnswer){
				 	/*points =points.sort(function (a, b) {
	  				   return a > b ? 1 : a < b ? -1 : 0;
			  		 }); */
			      	 var  minPoint=points[0];
			         var  maxPoint=points[points.length-1];
			         pointText +=minPoint+" pts. | " ;
					 pointText +=maxPoint+" pts.";
			 }else{
				 pointText +=points[0] ;
				 pointText +=(points[0]>1)?" pts.":" pt.";
			 }
			 
		 }
		 feedbackText = feedbackText.replace(/\Â/g," ");
		//remove point text
		 if(isremovePointText){
			 pointText = " ";
		 }
    var editorText = this.editor.text;
		editorText = editorText.replace(/\Â/g," ");
        editorText = util.getImageLayout(editorText);
         editorText = util.getVideoLayout(editorText);

		if(orientation!=1 && !binaryAnswer ){
			var styleClass=(orientation==3)?"column-2":(orientation==2)?"defaultMCOptionPreview":"";
			 htmlelement +='<div class="colPageSection  '+styleClass+'" ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+editorText+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span></label></div>';
		}else{
			var bClass = (binaryAnswer)?"bigMCStates":"";
			 htmlelement +='<div class="colPageSection '+bClass+' " ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+editorText+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span></label></div>';
		}
		htmlelement +='</div>';
		 return htmlelement.replace(/&nbsp;/gi,'').replace(/&#160;/gi,'');
    },
    /**
     * layouts in student test mode
     * @returns {String}
     */
    studentLayout:function(binaryAnswer,subType,firstOption,orientation,acceptAnyAnswer,feedbackType,showPointsToStudents,feedbackScoringType, notApplicable){
    	var htmlelement='';
    	if(subType=='radio'){
			 htmlelement +='<div class="prevQuestOpts">';
			 var currentComponent = null;
  			 for (i in question.activePage.components) {
  				if (question.activePage.components[i].id == this.componentId) {
  					currentComponent = question.activePage.components[i];
  				}
  			 }
			 if(binaryAnswer && (feedbackType != 'rangedBasedSubcategories' || currentComponent.hideSubCategoriesfromStudents)){
					
				 if(firstOption){
					 var i=0;
					 for(i in this.answers){
						 if(this.answers[i].label!="" && this.answers[i].label!=null)
							 htmlelement +='<div class="colPageSection minColPic" >'+this.answers[i].label+'</div>';
					 }
					 htmlelement+='<div class="clear"></div>';
				 }
			 }
			 var optionText = this.editor.text +" ";

			 optionText = util.getImageLayout(optionText);
			 optionText = util.getVideoLayout(optionText);

			 var j=0;
			 for(j in this.answers){
				 htmlelement += this.answers[j].studentLayout(binaryAnswer,this.sectionId);
			 }
			 var pointText = "";
			  if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && showPointsToStudents){
				 if(binaryAnswer){
					 if(this.answers[1].pointsValueEditor.text > this.answers[0].pointsValueEditor.text){
						 pointText +=this.answers[0].pointsValueEditor.text+" | " ;
						 pointText +=this.answers[1].pointsValueEditor.text+" pts.";
					 }
					 else{
						 pointText +=this.answers[1].pointsValueEditor.text+" | " ;
						 pointText +=this.answers[0].pointsValueEditor.text+" pts.";
					 }
				}else{
					 pointText +=this.answers[0].pointsValueEditor.text+" pts.";
			    }
			 }
			 if(orientation!=1 && !binaryAnswer ){
				 var styleClass=(orientation==3)?"column-2":(orientation==2)?"defaultMCOptionPreview":"";
				 if(feedbackScoringType === "frequency"){
					 htmlelement+=' <div class="optionMarker boldFont colnInner">'+this.marker+'. </div>';
				 }
				 htmlelement +='<div class="colPageSection '+styleClass+'"><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+optionText+'<span class="boldclass">'+pointText+'</span></div></span></label></div>';
				// htmlelement +='<div class="colPageSection '+styleClass+'"><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+optionText+'</div></span><span class="boldclass">'+pointText+'</span></label></div>';
			 }else{
				 if(feedbackScoringType === "frequency" && !binaryAnswer){
					 htmlelement+=' <div class="optionMarker boldFont colnInner">'+this.marker+'. </div>';
				 }
				 var bClass = (binaryAnswer)?"bigMCStates":"";
				 htmlelement +='<div class="colPageSection '+bClass+' " ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+optionText+'<span class="boldclass">'+pointText+'</span></div></span></label></div>';
			}
			htmlelement+= '</div>';
    	} else {
    		var optionText = this.editor.text;
			
			var x = 0;
			var isSelected = '';
			for( x in this.answers ){
				if( this.answers[x].studentResponse){
					isSelected = notApplicable ? "" : 'selected';
				}
			}
			if(feedbackScoringType === "frequency" && !binaryAnswer){
				htmlelement +='<option '+isSelected+' value="'+this.id+'" id="opt_'+this.editor.id+'">'+this.marker+'. '+optionText+'</option>';
			}
			else{
				htmlelement +='<option '+isSelected+' value="'+this.id+'" id="opt_'+this.editor.id+'">'+optionText+'</option>';
			}
			
    	}
		 return htmlelement;
    },
    /**
     * add event handers to html elements after the layout done in student test mode
     * @returns {String}
     */
    afterStudentLayout:function(){   
    	var j=0;
		 for(j in this.answers){
			 this.answers[j].afterStudentLayout();
		 }
		 MultipleChoiceOption.addEvent( 'opt_'+this.editor.id, "change", this._updateStudentResponse );
		 $('.stdQueLabel').each(function (){
				$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
	     });
    },
    updateStudentResponse : function(){
    	this.answers[0].resetStudentResponse();
    	this.answers[0].studentResponse = true;
    	question.updateProgressBar();
    },
    disableStudentSelection:function(flag, awardMaxMin, binaryAnswer){
		if(flag){
			$("#option_"+this.answers[0].feedback.id).prop('disabled', true);
			$("#option_"+this.answers[0].feedback.id).prop("checked", false);
			this.answers[0].resetStudentResponse();
			if(binaryAnswer){
				$("#option_"+this.answers[1].feedback.id).prop('disabled', true);
				$("#option_"+this.answers[1].feedback.id).prop("checked", false);
				this.answers[1].resetStudentResponse();
				if(awardMaxMin == "Max"){
					if(this.answers[0].pointsValueEditor.text > this.answers[1].pointsValueEditor.text){
						this.answers[0].studentResponse = true;
					}
					else{
						this.answers[1].studentResponse = true;
					}
				}
				else{
					if(this.answers[0].pointsValueEditor.text > this.answers[1].pointsValueEditor.text){
						this.answers[1].studentResponse = true;
					}
					else{
						this.answers[0].studentResponse = true;
					}
				}
			}else{
				
				//if not binary then set studentResponse of option having max points and reset all others
				for( i in question.activePage.components){
			    	if(question.activePage.components[i].id==this.componentId){
			    	var j=0;
				    	for(j in question.activePage.components[i].sections){
				    			if(this.sectionId==question.activePage.components[i].sections[j].id){
				    				var maxPointOpt = question.activePage.components[i].sections[j].getMaxPointOption(awardMaxMin);
				    				maxPointOpt.answers[0].studentResponse = true;
				    			}
				    	}
			    	}
				}
			}
		}
		else{
			$("#option_"+this.answers[0].feedback.id).prop('disabled', false);
			this.answers[0].studentResponse = false;
			this.answers[0].resetStudentResponse();
	    	if(binaryAnswer){
	    		$("#option_"+this.answers[1].feedback.id).prop('disabled', false);
	    		this.answers[1].studentResponse = false;
				this.answers[1].resetStudentResponse();
	    	}
		}
		question.updateProgressBar();
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
    postSubmissionReviewLayout:function(binaryAnswer,subType,firstOption,acceptAnyAnswer,feedbackType,orientation,isStudentChecked,showPointsToStudents,feedbackScoringType, notApplicable){
    	var htmlelement='';
		 htmlelement +='<div class="prevQuestOpts">';
		 var currentComponent = null;
			 for (i in question.activePage.components) {
				if (question.activePage.components[i].id == this.componentId) {
					currentComponent = question.activePage.components[i];
				}
			 }
		 if(binaryAnswer && (feedbackType != 'rangedBasedSubcategories' || currentComponent.hideSubCategoriesfromStudents)){
			 if(firstOption){
				 var i=0;
				 if(!binaryAnswer)
					 htmlelement +='<div  class=" answerTick thirdColPic" ></div>';
				 for(i in this.answers){
					 if(this.answers[i].label!="")
						 htmlelement +='<div class="colPageSection minColPic" >'+((this.answers[i].label==null)?"":this.answers[i].label)+'</div>';
				 }
				 htmlelement+='<div class="clear"></div>';
			 }
		 }
		
		 var points=[];
		 var j=0;
		 var feedbackText=""; 
		 var css = (acceptAnyAnswer) ? '' : this.isCorrectAnswerGiven(binaryAnswer)?"correct":"wrong";
		if(binaryAnswer ){
			 var hidden= ( this.answers[0].studentResponse!=null || this.answers[1].studentResponse!=null )?"style='visibility:visible'":"style='visibility:hidden'";
			 //htmlelement +='<div '+hidden+'  class="answerTick '+css+' thirdColPic" ></div>';
		 }else {
			 var hidden= this.answers[j].studentResponse!=null?"style='visibility:visible'":"style='visibility:hidden'";
			// htmlelement +='<div '+hidden+'  class="answerTick '+css+'" ></div>';
		 }
		 
		 var isStudentAnswered = false;
		 
		 for(j in this.answers){
			 var checkproperty= this.answers[j].studentResponse && !notApplicable ?"checked='checked'":"";
			 var binaryOptionGap=(binaryAnswer)?"minColPic":"";
			 htmlelement +='<div class="colPageSection '+binaryOptionGap+'" >';
			 htmlelement +='<input id="option'+this.editor.id+'_'+j+'" name="mc'+this.editor.id+'" type="radio" '+checkproperty+' disabled></div>';
			 if(feedbackScoringType === "frequency" && (!binaryAnswer)){
				 htmlelement+=' <div class="optionMarker boldFont colnInner" >'+this.marker+'. </div>';
			 }
			 this.answers[j].feedback.text = this.answers[j].feedback.text.replace("\&nbsp;\gi",'');

             var fbText = util.getImageLayout(this.answers[j].feedback.text);
             fbText = util.getVideoLayout(fbText);

			 if( this.answers[j].feedback.text!='' && this.answers[j].studentResponse){
				 feedbackText +='<label  class="feedbackLinkPosition"><a  class="feedClose">Feedback</a></label>';
				 feedbackText +=' <div  style="height:10px;"> </div>';
				 feedbackText +=' <div style="display: none;" class="feedBackOpen">';
				 if(binaryAnswer){
					 feedbackText +=' <strong>Option '+(parseInt(j)+1)+' feedback: </strong>'+fbText;
				 }else{
					 feedbackText +=' <strong>Feedback: </strong>'+fbText;
				 }
				 feedbackText +='</div>'; 
			 }
			 
			 if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && showPointsToStudents && feedbackScoringType != 'frequency'){
				 points.push(parseFloat(this.answers[j].pointsValueEditor.text));
				 pointText +=this.answers[j].pointsValueEditor.text ;
				 pointText +=(parseFloat(this.answers[j].pointsValueEditor.text)>1)?" pts.":" pt.";
			 }
			 
			 if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && this.answers[j].studentResponse ) {
				 isStudentAnswered = true; 
			 }
		 }	
		 
		 var pointText=" ";
		 if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && showPointsToStudents && feedbackScoringType != 'frequency'){
			 if(binaryAnswer){
				 	/*points =points.sort(function (a, b) {
	  				   return a > b ? 1 : a < b ? -1 : 0;
			  		 });*/ 
			      	 var  minPoint=points[0];
			         var  maxPoint=points[points.length-1];
			         pointText +=minPoint+" | " ;
					 pointText +=maxPoint+" pts.";
			 }else{
				 pointText +=points[0] ;
				 pointText +=(points[0]>1)?" pts.":" pt.";
			 }
			 
		 }
		 
		 var inCompleteText = '';
		 if( !isStudentAnswered && isStudentChecked && (feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && binaryAnswer ){
			inCompleteText = '<span class="inCompleteAnswerBanner" >You did not complete this question.</span>';
		 }
		 feedbackText = feedbackText.replace(/\Â/gi,'').replace(/&nbsp;/gi,'');
		 var text = this.editor.text;
		 
		 text = text.replace(/\Â/gi,'').replace(/&nbsp;/gi,'').replace(/c3 83/gi,'');
		 
	     text = util.getImageLayout(text);
	     text = util.getVideoLayout(text);

		 if(orientation!=1 && !binaryAnswer ){
			 var styleClass=(orientation==3)?"column-2":(orientation==2)?"defaultMCOptionPostSubmission":"";
			 htmlelement +='<div class="colPageSection '+styleClass+' widthCol-2"><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+text+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span> ' +inCompleteText+ '</label></div>';
		 } else {
			 var bClass = (binaryAnswer)?"bigMCStates":"";
			 htmlelement +='<div class="colPageSection '+bClass+' " ><label for="option'+this.editor.id+'_1"><span class="pull-left lblLeft"><div class="stdQueLabel">'+text+'<span class="boldclass">'+pointText+'</span>'+feedbackText+'</div></span> '+inCompleteText+'</label></div>';
		 }
		 
		htmlelement +='</div>';
		 return htmlelement;
    },
    /**
     * check if correct answer given by student
     */
    isCorrectAnswerGiven:function(binaryAnswer){
    	var flag= false;
    	if(binaryAnswer){
    		 if((this.answers[0].right && this.answers[0].studentResponse) || (this.answers[1].right && this.answers[1].studentResponse)){
    			 flag=true;
			 }else{
				 flag=false;
			 }
    	}else{
    		if(this.answers[0].right && this.answers[0].studentResponse){
    			flag=true;
   		 }
    	} 
    	return flag;
    },
    /**
	 * check if question is answered
	 */

    isStudentAnswered:function(binaryAnswer){
         var validflag=false;
         if(binaryAnswer){
				if((this.answers[0].studentResponse!=null &&  this.answers[0].studentResponse!=false) || (this.answers[1].studentResponse!=null && this.answers[1].studentResponse!=false)){
					validflag=true;
				}
			}else if(this.answers[0].studentResponse!=null && this.answers[0].studentResponse!=false){
				validflag=true;
			}
		return validflag;
    },
    /**
	 * calculate points for student
	 */
	calculatePoints:function(){
		var points=0;
		 var i=0;
		 for( i in this.answers){
			 if(this.answers[i].studentResponse){
				 points+=this.answers[i].pointsValueEditor.text!=""?parseFloat(this.answers[i].pointsValueEditor.text):0;
			 }
		 }	
		 return points;
			
	},
	updateOverallRangeFeedbacks:function(currentComponent, currentOptionId, isAdd){	   
	   var rangeConfig = {
		  componentId :this.componentId,
		  componentIdPrefix :currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix
	   };	   
	   var maxCounter = 0;	   
       for(key in currentComponent.sections){  
      	 if(maxCounter < currentComponent.sections[key].options.length){
      	   	maxCounter = currentComponent.sections[key].options.length; 
      	  }
       }		       	    
      
       if(isAdd){
    	   if(currentComponent.ranges.length < maxCounter){
    		   var diff = maxCounter - currentComponent.ranges.length;
    		   for (var i=1; i<=diff; i++){
    			 rangeConfig.id=currentOptionId;
       			 currentComponent.addRange(new Range(rangeConfig));
    		   }
    	   }
       }else{
    	   if(currentComponent.ranges.length > maxCounter){
        	   var diff = currentComponent.ranges.length - maxCounter;        	   
        	   for (var i=1; i<=diff; i++){
        		   currentComponent.removeRange(currentOptionId);
       		   }
           }
       }
	},
    /**
     * populate drop Down options
     */
    setdropDownOptions:function(subCatlist){
      if(subCatlist.length > 0){
    	var currentOption = this;    	
    	var optionsAsString = '';
    	
		$.each(subCatlist,function(index, itsValue) {console.log(itsValue.subCategory);	
			  if ($("<div>" + itsValue.subCategory +"</div>").text().length > 0) {
					optionsAsString += ' <option id="'+itsValue.subCategoryId+'" value="'
						+ itsValue.subCategoryId + '">'
						+ itsValue.subCategory
						+ '</option>';
			  }
		   });
		$("#categories"+this.editor.id).find('option:not(:first)').remove().end().append(optionsAsString);
      }
    }
};