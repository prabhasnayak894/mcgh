/* ========================================================================
 * MultipleChoiceComponent: Object Declaration
 * ========================================================================
 * Purpose of this object to have all MultipleChoice Sub-Category specific properties like 
 * subCategoryIdPrefix,minPoint, maxPoint, textIdPrefix, editor
 * ======================================================================== */
var MultipleChoiceSubCategory = function(options){ 
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;	
	this.subCategoryIdPrefix='SC';
	this.textIdPrefix='E';	
	this.minPoint=0;
	this.maxPoint=0;
	this.awardMaximum=true;
	this.awardMinimum=false;
	this.notApplicable=false;
	this.studentResponses=[];
	this.notApplicableStudentResponse = false;
	this.sectionIds=[];
	this.optionIds=[];
	$.extend(this, options);
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.subCategoryIdPrefix+this.id});
	this._addSubCategory = MultipleChoiceSubCategory.BindAsEventListener( this, this.addSubCategory );	
	this._removeSubCategory = MultipleChoiceSubCategory.BindAsEventListener( this, this.removeSubCategory );
	this._update = MultipleChoiceSubCategory.BindAsEventListener( this, this.update );
	this._populateSubCategoryProperties = MultipleChoiceSubCategory.BindAsEventListener( this, this.populateSubCategoryProperties );
	this._setAwardPoint = MultipleChoiceSubCategory.BindAsEventListener( this, this.setAwardPoint );
	this._filter = MultipleChoiceSubCategory.BindAsEventListener( this, this.filter );
	this._notApplicableSubcategory = MultipleChoiceSubCategory.BindAsEventListener(this, this.notApplicableSubcategory);
};

//add event helper method on element id
MultipleChoiceSubCategory.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
MultipleChoiceSubCategory.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
MultipleChoiceSubCategory.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};

MultipleChoiceSubCategory.prototype = { 
		/**
		 * gets id of Sub-Category 
		 * @returns  id
		 */
		getId : function(){
			return this.id;
		},
		/**
	     * sets id of Sub-Category 
	     * @param id
	     */
		setId : function(id){
			this.id = id;
		},
		 /**
	     * gets categoryIdPrefix
	     * @returns {String}
	     */
        getSubCategoryIdPrefix: function( ){
            return this.subCategoryIdPrefix;  
	    },
	    /**
	     * sets categoryIdPrefix
	     * @param idPrefix
	     */
	    setSubCategoryIdPrefix: function( categoryIdPrefix){
	         this.subCategoryIdPrefix =  categoryIdPrefix;
	    },
	    /**
	     * gets componentId
	     * @returns {Int}
	     */
	    getComponentId: function( ){
            return this.componentId;  
	     },
	     /**
	     * sets componentId
	     * @returns {Int}
	     */
	     setComponentId: function( componentId){
	         this.componentId =  componentId;
	     },
	     
	     /**
	     * gets componentIdPrefix
	     * @returns {String}
	     */
	     getComponentIdPrefix: function( ){
	            return this.componentIdPrefix;  
	     },
	     /**
	     * sets componentIdPrefix
	     * @returns {String}
	     */
	     setComponentIdPrefix: function( componentIdPrefix){
	         this.componentIdPrefix =  idPrefix;
	     },
	     
	     /**
		 * gets textIdPrefix
		 * @returns  textIdPrefix
		 */
		getTextIdPrefix : function(){
			return this.textIdPrefix;
		},
		/**
	     * sets textIdPrefix
	     * @param textIdPrefix
	     */
		setTextIdPrefix : function(textIdPrefix){
			this.textIdPrefix = textIdPrefix;
		},
		/**
         * gets SubCategory text editor
         */
         getEditor:function(){
        	 this.editor;
         },
         /**
          * sets SubCategory text editor
          * @param editor
          */
         setEditor:function(editor){
        	 this.editor=editor;
         },
         /**
         * updates text of content editable divs to the object's editor text
         */
        update:function(e){
        	this.editor.update();
        	for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       			question.activePage.components[i].updateSubCategoryDropDown();
	       			//question.activePage.doLayout();
				    //question.activePage.components[i].populateComp();
	       		}
        	}
        },
         /**
		 * adds new SubCategory for component
		 */
		 addSubCategory:function(){
			 var i=0;
	       	  for(i in question.activePage.components){
	       		if(question.activePage.components[i].id==this.componentId){
	       		var newId = question.activePage.components[i].subCategories[question.activePage.components[i].subCategories.length-1].getId()+1;
	       		var config = {
						id:newId,
						componentId : this.componentId,
						componentIdPrefix : this.componentIdPrefix
				};
	       		var newSubCategory = new MultipleChoiceSubCategory(config);
	       		question.activePage.components[i].addSubCategory(newSubCategory);
				    question.activePage.doLayout();
				    question.activePage.components[i].populateComp();
	       		}
	       	 } 
	       	  return false;
		 },
		 
		 /**
		  * removes current criteria from component
		  */
		 removeSubCategory:function(){
			 
				 for(i in question.activePage.components){
			   			if(question.activePage.components[i].id==this.componentId){
			   				var j=0;
	   						for(j in question.activePage.components[i].subCategoryRanges){
	   							if(question.activePage.components[i].subCategoryRanges[j].subCategoryId==this.id){
	   								var subCategory = this;
		   							 new Modal({id : 1,
		   				  	    		headingText : "Are you sure?",
		   				  				containtText : "Are you sure you want to delete this subcategory? Doing so will delete all subcategory feedback associated with it.",
		   				  	    		 okActionEvent : function(){
		   				  	    		 subCategory.deleteSubCategory(true);
		   						    	 }}).getConfirmationModal();
	   								
	   								break;
	   							}else{
	   								this.deleteSubCategory(false);
	   							}
	   						}
	   						
			   			}
				 }
	     },
        /**
         * delete subcategory and refresh layout
         */
       deleteSubCategory:function(removeRange){
    	  var i=0;
	   	  for(i in question.activePage.components){
	   			if(question.activePage.components[i].id==this.componentId){
	   				if(removeRange){
	   					var j = 0;
						for(j in question.activePage.components[i].subCategoryRanges){
							if(question.activePage.components[i].subCategoryRanges[j].subCategoryId==this.id){
								question.activePage.components[i].subCategoryRanges.splice(parseInt(j),1);
								break;
							}
						}
	   				}
		    	    var k = 0;
					for(k in question.activePage.components[i].subCategories){
						if(question.activePage.components[i].subCategories[k].id==this.id){
							question.activePage.components[i].subCategories.splice(parseInt(k),1);
							break;
						}
					}
					var m = 0;
					for(m in question.activePage.components[i].sections){
						var n = 0;
						for(n in question.activePage.components[i].sections[m].subCategoryId){
							if(question.activePage.components[i].sections[m].subCategoryId[n]==this.id){
								question.activePage.components[i].sections[m].subCategoryId=null;
								break;
							}
						}
					}
					question.activePage.components[i].updateSubCategoryDropDown();
					question.activePage.doLayout();
					question.activePage.components[i].populateComp();
					if(question.activePage.components[i].subCategories.length==1){
						$("#minus_"+question.activePage.components[i].subCategories[0].editor.id).hide();
					}
	   			}
	   	  }
       },
        /**'
	      * is subCategory filled
	      */
	     isSubCategoryComplete:function(){
	    	 
			 var editorText =  $("<div>"+this.editor.text+"</div>").text();
			 if(editorText.length<=0){
				return false; 
			 }else{
				return true;
			}		 
	     },
        layout:function(isLast){
        	var hidden =isLast?'':'hidden';
        	 var htmlelement="";
        	 htmlelement+='<div class="multipleChoiceSubcategoryDiv">';  
        	 htmlelement+='                <div class="editableDivTitleSubCat">';
	       	 htmlelement+='                    <h6 class="pull-right font10">ID# '+this.editor.id+'</h6> ';
	       	 htmlelement+='                </div>';
        	 htmlelement+='<div style="margin-left:5px;" class="form-group enterText">';
        	 htmlelement+=this.editorLayout();

        	 htmlelement+=' </div>';
        	 htmlelement+='<div class="minusBtn pull-left '+hidden+'" style="margin-right:0px;>';
        	 htmlelement+='    <a href="#">';
        	 htmlelement+='        <img src="img/plus.png" id="plus_'+this.editor.id+'" title="Add Subcategory">';
        	 htmlelement+='    </a>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="minusBtn">';
        	 htmlelement+='    <img src="img/minus.png" id="minus_'+this.editor.id+'" title="Delete Subcategory">';
        	 htmlelement+=' </div>';
        	
        	 htmlelement+=' </div>';
        	 return htmlelement;
        },
        editorLayout:function(){
        	var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
        	var htmlelement="";
        	htmlelement+='<div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" class="inputDummySubCategory" data-maxlength="'+this.editor.maxLength+'" '+dataDivAttr+' id="'+this.editor.id+'" data-placeholder="Enter text">'+this.editor.text+'</div>';
        	return htmlelement;
        },
        /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
       afterLayout:function(){
    	   MultipleChoiceSubCategory.addEvent( "plus_"+this.editor.id, "click", this._addSubCategory );
    	   MultipleChoiceSubCategory.addEvent( "minus_"+this.editor.id, "click", this._removeSubCategory );
    	   MultipleChoiceSubCategory.addEvent( this.editor.id, "blur", this._update );
    	   MultipleChoiceSubCategory.addEvent( this.editor.id, "click", this._populateSubCategoryProperties);
    	   MultipleChoiceSubCategory.addEvent( this.editor.id, "paste", this._filter );
    	   this.editor.afterEditorlayout();
       },
       
       /**
        * populate statement text editor properties
        */
       populateSubCategoryProperties:function(){
       		$("#elementProperties").html(this.subCategoryPropertyLayout());
			$("#elementProperties").show();
			$("#properties").hide();        			
			this.afterSubCategoryPropertyLayout();
			$('#awardMinMaxDiv'+this.editor.id).hide();
			if(this.notApplicable){
				$('#notApplicableOption'+this.editor.id).prop('checked', true);
				$('#awardMinMaxDiv'+this.editor.id).show();
			}
			
			if(this.awardMaximum){
				$("input[name=optionsRadios][value='maxAwardPionts']").prop('checked', true);
			}else{
				$("input[name=optionsRadios][value='minAwardPoints']").prop('checked', true);
			}
			for(i in question.activePage.components){
		      	if(question.activePage.components[i].id==this.componentId)
		      		{
		      		if((question.activePage.components[i].feedbackScoringType=="frequency")){
		      			$('#notApplicableOption'+this.editor.id).prop("disabled", true);
		      			$("#notApplicableOptionId").addClass("disabledText");
		      			this.notApplicable=false;
		      		}
		      		
		      		}
			}
       },
       /**
        * layouts the editor property pane
        */
       subCategoryPropertyLayout:function(){
      	 var htmlelement="";
      	 htmlelement+='<div class="tabContent tabProContent">';
      	 htmlelement+='<a id="" class="info-icon"></a>';
      	 htmlelement+='<p>Component: Scales</p>';
      	 htmlelement+=' <p id="elementid">ID# '+this.editor.id+'</p>';
      	 htmlelement+='</div>';  
      	 
      	for(i in question.activePage.components){
	      	if(question.activePage.components[i].id==this.componentId)
	      		{	
	      		//var opacityCss = (question.activePage.components[i].notApplicable) ? '' : 'style="opacity:0.3;"'; 
	      		//var disabledRadio = (question.activePage.components[i].notApplicable) ? '' : 'disabled';
		         htmlelement+='    <div class="head-info">';
		      	 htmlelement+='      <p>N/A-option settings:</p>';
		      	htmlelement+='  	 <span id="notApplicableOptionId">';
	        	 htmlelement+=' 		<input type="checkbox" id="notApplicableOption'+this.editor.id+'">';           
	        	 htmlelement+='			<label for="notApplicableOption'+this.editor.id+'"><span></span>Not applicable option<br><i style="font-size: 11px; margin-left: 15px;">Exempts remainder of subcategory</i></label>'; 
	        	 htmlelement+='		 </span>';
		      	 htmlelement+='   </div>';
		      	 htmlelement+='   <div class="clear"></div>';
		      	 htmlelement+='   <div class="tabContent tabProContent" id="awardMinMaxDiv'+this.editor.id+'">'; 
		      	 htmlelement+='      <div class="radio">';
		      	 htmlelement+='           <input type="radio"  value="maxAwardPionts" checked id="optionsRadios1'+this.editor.id+'" name="optionsRadios">';
		      	 htmlelement+='           <label for="optionsRadios1'+this.editor.id+'"><span></span> Award max. points for subcategory</label>';		      	 
		      	 htmlelement+='       </div>';
		      	 htmlelement+='      <div class="radio">';
		      	 htmlelement+='           <input type="radio" value="minAwardPoints" id="optionsRadios2'+this.editor.id+'" name="optionsRadios">';
		      	 htmlelement+='           <label for="optionsRadios2'+this.editor.id+'"><span></span> Award min. points for subcategory</label>';
		      	 htmlelement+='       </div>';
		      	 htmlelement+='   </div>';
	      		}
	      	}
      	return htmlelement;
      },
      notApplicableSubcategory:function(){  
        	//var naflag=null;
    	 if($("#notApplicableOption"+this.editor.id).prop("checked")){	        		 
    		  $('#awardMinMaxDiv'+this.editor.id).show();
    		  this.notApplicable=true;  
    		  $("#awardMax"+this.editor.id).prop("checked",true);
      	 }else{
      		 $('#awardMinMaxDiv'+this.editor.id).hide();
      		 this.notApplicable=false;	  
      	  }
    	 this.awardMaximum=true;
      },
      setAwardPoint:function(){
    	  var selectedOption =$('input[name=optionsRadios]:checked').val();
	         if(selectedOption=='maxAwardPionts'){
	        	 this.awardMaximum=true;
	        	 this.awardMinimum=false;
	         }
	         else if(selectedOption=='minAwardPoints'){
	        	 this.awardMinimum=true;
	        	 this.awardMaximum=false;
	         }		        
	  },
	  
      afterSubCategoryPropertyLayout:function(){
    	  ScaleSubCategory.addEvent( "notApplicableOption"+this.editor.id, "click", this._notApplicableSubcategory );
    	  ScaleSubCategory.addEvent("optionsRadios1"+this.editor.id, "click", this._setAwardPoint);
    	  ScaleSubCategory.addEvent("optionsRadios2"+this.editor.id, "click", this._setAwardPoint);
    	  
      },
     /**
      * update applicability on student Response
      */
       updateStudentResponse:function(flag){
    	   this.notApplicableStudentResponse=flag;
       },
       /**
        * filter copied text
        * @param event
        */
    	filter:function(event){
    		util.removePasteImage(event.originalEvent.clipboardData,event);
    	}
	
};
