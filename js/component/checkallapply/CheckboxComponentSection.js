/* ========================================================================
 * CheckboxComponentSection: Object Declaration
 * @author: Mazahar Shaikh
 * ========================================================================
 * Purpose of this object to have all component section specific properties like 
 * holds the options, editor question text for this component
 * ======================================================================== */

var CheckboxComponentSection = function(options){ 
	this.id=null;
	this.idPrefix="G";
	this.componentId=null;
	this.componentIdPrefix=null;	
	this.options=[];
	this.subCategoryId;
	this.sectionScore = 0;
	this.score = 0;
	$.extend(this, options);
	this.markers=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'SL1'});
	this._update = CheckboxComponentSection.BindAsEventListener( this, this.update );
	this._filter = CheckboxComponentSection.BindAsEventListener( this, this.filter );
	this._addSection = CheckboxComponentSection.BindAsEventListener( this, this.addSection);
	this._removeSection = CheckboxComponentSection.BindAsEventListener( this, this.removeSection);
	this._populateEditorProperties = CheckboxComponentSection.BindAsEventListener( this, this.populateEditorProperties );
	this._selectSubCategories= CheckboxComponentSection.BindAsEventListener( this, this.selectSubCategories );
	this._updateStudentResponse = CheckboxComponentSection.BindAsEventListener( this, this.updateStudentResponse );
	this._updateEditor= CheckboxComponentSection.BindAsEventListener( this, this.updateEditor );
	
	this.showSectionLabels=false;
	this.sectionLabels =[];
	//this._addSectionLabel = CheckboxComponentSection.BindAsEventListener( this, this.addSectionLabel);
	this._addSectionLabelLayout = CheckboxComponentSection.BindAsEventListener( this, this.addSectionLabelLayout);
	this.isBranched = false;   //Set to true if this used as source
	this.isBranchDest = false;    //set true if this used as destination for path mapping
	this.destBranchId = null;		// set branch id into destination
	this.showToStud=true;//check for student/postsubmission layout
};
//add event helper method
CheckboxComponentSection.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
CheckboxComponentSection.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
CheckboxComponentSection.prototype = { 
        getIdPrefix: function( ){
            return this.idPrefix;  
	     },
	     setIdPrefix: function( idPrefix){
	         this.idPrefix =  idPrefix;
	     },
         getId: function( ){
            return this.id;  
	     },
	     setId: function(id){
	         this.id =  id;
	     },
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
         * gets section text editor
         */
         getEditor:function(){
        	 this.editor;
         },
         /**
          * sets section text editor
          * @param editor
          */
         setEditor:function(editor){
        	 this.editor=editor;
         },
         /**
          * gets subCategoryId of section
          */
         getSubCategoryId:function(){
 			return this.subCategoryId;
         },
         /**
          * sets subCategoryId of section
          * @param subCategoryId
          */
         setSubCategoryId:function(subCategoryId){
        	 this.subCategoryId=subCategoryId;
         },
         /**
          * gets section labels for MultipleChoice component's Sections
          * @returns section labels
          */
          getSectionLabels: function( ){
                  return this.sectionLabels;  
          },
          /**
           * sets section labels for MultipleChoice component's Sections
           * @param sectionlabels
           */
          setSectionLabels: function(  sectionLabels ){
              this.sectionLabels =  sectionLabels;
          },
          /*
           * set showSectionLabels
           * */
          setShowSectionLabels:function(isShow){
        	  this.showSectionLabels = isShow;
          },
         
         /**
          * gets options for section
          * @returns options
          */
          getOptions: function( ){
                  return this.options;  
          },
          /**
           * sets options for section
           * @param options
           */
          setOptions: function(  options ){
              this.options =  options;
          },
          /**
           * adds option for check box component
           * @param option
           */
          addOption:function(option ){
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

         /* branch options */
         getIsBranched:function(){
          return this.isBranched;
         },
         setIsBranched:function(isBranched){
           this.isBranched = isBranched;
         },
         getIsBranchDest:function(){
           return this.isBranchDest;
         },
         setIsBranchDest:function(isBranchDest){
           this.isBranchDest = isBranchDest;
         },
         /* for branch id in destination */
     	   getDestBranchId:function(){
             	return this.destBranchId;
         },
         setDestBranchId:function(destBranchId){
         	this.destBranchId = destBranchId;
         },
         /* for showToStud flag*/
     	   getShowToStud:function(){
             	return this.showToStud;
         },
         setShowToStud:function(showToStud){
         	this.showToStud = showToStud;
         },
          
          /**
           * updates editor text
           */
          update: function(e){
        	  this.editor.update();
        	  var i=0;
        	  for( i in this.options){
        		  this.options[i].update();
        	  }
        	  for (i in question.activePage.components) {
	  				if (question.activePage.components[i].id == this.componentId) {
	  					if(question.activePage.components[i].feedbackType == 'rangedBasedSubcategories'){
	  						$.each(question.activePage.components[i].subCategoryRanges ,function(index,subCategoryRange){
		  						  subCategoryRange.update();	
		  					});
	  					}
	  				}
	  		  }
        	  
        	  $.each(this.sectionLabels ,function(index,sectionLabel){
 				 sectionLabel.update();
 			  });
          },
          /*
           * update choice component text for rangebasedsubcateories binary answer
           * */
          updateChoiceText:function(chval1, chval2){
        	  $("#choice1Val"+this.editor.id).text(chval1);
        	  $("#choice2Val"+this.editor.id).text(chval2);        	  
          },
          /**
           * layouts  editor in design mode
           * @returns {String}
           */
          layout:function(flag,feedbackType,feedbackScoringType, isSectionMore){
        	 var htmlelement="";
        	 if(!flag){
              	htmlelement+='<div class="section-devider"></div>';
             }
          	 htmlelement+= this.editorLayout(flag,feedbackType,feedbackScoringType, isSectionMore);
          	 var lastOption=this.options[this.options.length-1];
        	 var i=0;
         	 for( i in this.options){
     			if(this.options[i].id==lastOption.id){
        			 htmlelement+=  this.options[i].layout(true,feedbackType,feedbackScoringType,this.markers[i]);
        		 }
        		 else{
        			 htmlelement+=  this.options[i].layout(false,feedbackType,feedbackScoringType,this.markers[i]); 
        		 }
         	 }
         	htmlelement+='<div class="clear"></div>';
        	 return htmlelement;
          },
          /**
           * layouts section editor in design mode
           * @returns {String}
           */
          editorLayout:function(isFirst,feedbackType,feedbackScoringType, isSectionMore){   
	    	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
	    	 var htmlelement="";
	    	 htmlelement+='<div class="rowPagesection-1">';
	       
	          if(!isFirst){
	            htmlelement+='<div class="colPageSectionidMchoice">'; 
	          } else{
	            var fSectionClass = (!isSectionMore)?'hideIt':'';
	            htmlelement+='<div class="colPageSectionidMchoice '+fSectionClass+'">';
	          }
	          var secId = this.componentIdPrefix+this.componentId+this.idPrefix+this.id;
	          htmlelement+=' <h6 style="float:right;" class="font10">ID # '+secId+'</h6>';
	          htmlelement+='</div>';

	    	 htmlelement+=' <div class="eachCol-3">';
	    	 var minusCss = !isFirst?' style="display: block;"':' style="display: none;"';
	    	 htmlelement+=' <div class="minusBtn" '+minusCss+'><a title="Remove Section" id="sec_minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/minus.png"></a></div>';
             
        	 htmlelement+='<div class="pull-right"><a title="Add Section" id="sec_plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/plus.png"></a></div>';
             
             //htmlelement+='<a href="#"><img src="img/getPicture.png"></a>' ;
	    	 htmlelement+='</div>'	;
	    	 htmlelement+='   <div class="colPageSection secondColPic">';
	    	 /* check for chrome browser */
			 var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
			 var divSty = '';
			 if(is_chrome){
				 divSty='style="min-width: 430px;"';
			 }
	    	 htmlelement+='     <div '+divSty+'>';
	    	 htmlelement+='<div class="editableDivTitle">';
        	 htmlelement+=' <h6 class="pull-right font10 tagtext"></h6> ';
        	 htmlelement+=' <h6 class="pull-right font10 inputhead"></h6></div>';
        	 htmlelement+='<div class="inputDummy inputDummyMaxWidth inputDummyQuestionStem "'+dataDivAttr+' data-placeholder="Enter text" contentEditable=true onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" id="'+(this.editor.id)+'"  data-maxlength="'+this.editor.maxLength+'" >'+this.editor.text+'</div>';
        	 if(feedbackType == 'rangedBasedSubcategories'){        	 
        		 htmlelement+='			<div class="colPageSection fourthColPic" id="'+this.editor.id+'_subCategories">';
        		 htmlelement += '			<div >';
        		 htmlelement+=					this.layoutSubCategory();
        		 htmlelement += '			</div>';
    	       	 htmlelement+='			</div>';            	 
    	         //add plus option for label
    	       	 /*var plusOptClass="";
    	       	 var labelCollectionClass="";
    	       	 
    	       	 if(!this.showSectionLabels){
    	       		labelCollectionClass = "hideIt";
    	       	 }else{
    	       		plusOptClass = "hideIt"; 
    	       	 }*/
    	    
   	       	     
        	 }
        	 
        	 var plusOptClass="";
        	 var labelCollectionClass="";
        	 if(!this.showSectionLabels){
 	       		labelCollectionClass = "hideIt";
 	       	 }else{
 	       		plusOptClass = "hideIt"; 
 	       	 }
        	 
           	 htmlelement +='		<div class="colPageSection fourthColPic">';
	       	 htmlelement += '			<a title="Add Section Label" id="seclabelPlus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" class="'+plusOptClass+'">';
   		     htmlelement +=					'<img src="img/plus.png">';
   		     htmlelement += '			</a>';
	       	 htmlelement+='			</div>';
	       	     
	       	//Section Label
	       	 htmlelement+='<div id="sectionLabelCollection_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" class="'+labelCollectionClass+'">';
        	 htmlelement+= this.sectionLabelLayout();
	       	 htmlelement+='</div>';
	       	 
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="colPageSection ">';
        	 htmlelement+='<div class="eachCol">';        	
        	 htmlelement+='</div>';	
        	 htmlelement+='<div>';
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
             htmlelement+='</div>';
         	 return htmlelement;
          },
          layoutSubCategory :function(){
        	    var i = 0;
	  			var currentComponent = null;
	  			for (i in question.activePage.components) {
	  				if (question.activePage.components[i].id == this.componentId) {
	  					currentComponent = question.activePage.components[i];
	  				}
	  			}
	  			var htmlelement = "";			
  				htmlelement += '<select name="subCategories" id="categories'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" style="width: 160px; text-overflow: ellipsis;" class="subcategories_statement_'+this.componentIdPrefix+this.componentId+'">';
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
  				
	  			return htmlelement;
          },          
          /**
           * section label layout
           */
          sectionLabelLayout:function(){
  			var htmlelement="";
  			//htmlelement+='<h2 class="tophead2">Section Label</h2>';
  			htmlelement+='<div  class="rowPagesection1">';
  			var firstSectionLabel=this.sectionLabels[this.sectionLabels.length-1];
  			var isfirstSectionLabel=false;
  			$.each(this.sectionLabels ,function(index,sectionLabel){
  				if(firstSectionLabel.id==sectionLabel.id){
  					isfirstSectionLabel=true;
  				}
  				htmlelement+=sectionLabel.layout(isfirstSectionLabel);
  			});
  			htmlelement+='</div>';
  			htmlelement+='<div class="clear"></div>';
  			return htmlelement;
          },
          selectSubCategories:function(){
        	  if($("#categories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).val()!="Select a Subcategory"){
        		  this.subCategoryId=($("#categories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).val());
        	      this.updateSubCategoryRangeFeedbacks(this.subCategoryId,true);
        	  }
        	  else{
        		  this.subCategoryId = null;
        		  this.updateSubCategoryRangeFeedbacks(this.subCategoryId,true);
        	  }
        	  var currentComponent = null;
	  			for (i in question.activePage.components) {
	  				if (question.activePage.components[i].id == this.componentId) {
	  					currentComponent = question.activePage.components[i];
	  				}
	  			}
        	  this.update();
        	  for (k in currentComponent.subCategories){
        		  var selectedStatements = this.getSectionIdsForSubcategory(currentComponent.subCategories[k]);
        		  currentComponent.subCategories[k].sectionIds=selectedStatements;
        	  }
          },
          /**
           * get Selected sections for sub category
           * @param subCategory
           * @returns {Array}
           */
          getSectionIdsForSubcategory:function(subCategory){
       	    var k=0;
   	   		var sectionIds=[];
   	   		var currentComponent = null;
			for (i in question.activePage.components) {
				if (question.activePage.components[i].id == this.componentId) {
					currentComponent = question.activePage.components[i];
				}
			}
   	   		for(k in currentComponent.sections){
   	   			//var result = this.statements[k].subCategoryIds.indexOf(subCategory.id.toString());	
   	   			if(currentComponent.sections[k].subCategoryId==subCategory.id)
   	   			//if(result!=-1)
      				{
   	   					sectionIds.push(currentComponent.sections[k].id);
      				} 
   	   		}
   	   		return sectionIds;
          },
          
          editorPropertyLayout:function(){
    	     	
            	var htmlelement="";
            	//htmlelement+='<p style="display:none;" id="elementid">ID# '+this.editor.id+'</p>';
            	 var elementType ="Element: Input field";
            	 htmlelement+='    <div class="tabContent tabProContent">';
        	   	 htmlelement+='        <p>Component: Checkbox</p>';
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
            
            populateEditorProperties:function(){
              $("#elementProperties").html(this.editorPropertyLayout());
              $("#elementProperties").show();
              $("#properties").hide();
              this.afterEditorPropertyLayout();
              $("#activeHyperlink").text("");

              /* Media object creates here for that component */
              var i =0;
              var subType=null;
              for( i in question.activePage.components){
                if(question.activePage.components[i].id==this.componentId){
                  subType = question.activePage.components[i].subType;
                }
              }
                
                //if(subType=="radio")
                //{
                  var newMedia = new Media({id:this.editor.id});
                  $("#mediaProperties").html(newMedia.layout());
                  $("#mediaProperties").show();
                  newMedia.afterLayout();
                  util.checkMediaInEditMode();
                //} else {
                  //$("#mediaProperties").hide();
                //}
            },
         
         /**
      	  * adds events for html elements of current option editor property pane
      	  */
      	 afterEditorPropertyLayout:function(){
      		CheckboxComponentSection.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
      		CheckboxComponentSection.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
      		 
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
 	      * adds event handlers for html  elements after the layout done in design mode
 	      */
          afterLayout:function(){ 
        	  var i=0;
     		  for( i in this.options){
          		 this.options[i].afterLayout();
          	 } 
     		CheckboxComponentSection.addEvent( this.editor.id, "blur", this._update );	
     		CheckboxComponentSection.addEvent( this.editor.id, "paste", this._filter );
     		CheckboxComponentSection.addEvent( this.editor.id, "click", this._populateEditorProperties );
     		CheckboxComponentSection.addEvent("sec_plus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._addSection );	
     		CheckboxComponentSection.addEvent("sec_minus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._removeSection);
     		if(this.options.length==1){
     			$("#ans_"+this.options[0].editor.id).find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
     		}
     		CheckboxComponentSection.addEvent("categories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id,"change", this._selectSubCategories);
     		if (this.subCategoryId != null)		
 				$("#categories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).val(this.subCategoryId);
     		
     		$.each(this.sectionLabels ,function(index,sectionLabel){
				 sectionLabel.afterLayout();
			});
     		
     		CheckboxComponentSection.addEvent("seclabelPlus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._addSectionLabelLayout );
          },
          /**
           * hide and show point base layout
           */
          togglePonits:function(pointflag){        	  
        	  $.each(this.options,function(i,optionObj){
    			  optionObj.togglePonits(pointflag);
    		  });
          },
          /**
  	      * Validate if section is complete
  	      */
          isSectionComplete:function(feedbackType, feedbackScoringType){
		        var isFilled = true;
				var i = 0;
				var isQuestionTextFilled = true;
				var isSubCategorySelected = true;
				$("#htmlToTextConvertor").html(this.editor.text);
				var questionText = $("#htmlToTextConvertor").text();
				if (questionText.length <= 0) {
					isQuestionTextFilled = false;
				}
				
				if (feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') {
					if (feedbackType == 'rangedBasedSubcategories') {
						if(this.subCategoryId == null){
							isSubCategorySelected = false;	
						}
					}
					for (i in this.options) {
						isFilled = isQuestionTextFilled && isSubCategorySelected && isFilled
								&& this.options[i].isOptionFilled()
								&& this.options[i].isPointValueFilled();
					}
				} else {
					for (i in this.options) {
						isFilled = isQuestionTextFilled && isFilled
								&& this.options[i].isOptionFilled();
					}
				}
				return isFilled;  
          },
          /**
   	      * Validate if right answer is not selected
   	      */
          isRightAnswerSelected:function(binaryAnswer){
        	  var rightAnswerSelected=true;
        	  var i=0;
        	  if(binaryAnswer){
        		  for (i in this.options) {
            		  rightAnswerSelected = rightAnswerSelected && this.options[i].isRightAnswerSelected();
    				} 
        	  }else{
        		  var cnt=0;
        		  for (i in this.options) {
            		  if(this.options[i].answers[0].right){
            			  cnt++;
            		  }
    				} 
        		  rightAnswerSelected=(cnt==0)?false:true;
        	  }
        	  return rightAnswerSelected;
          },
          /**
			 * Function to add new section to multiple choice question
			 */
          addSection : function(){        
        	var i=0;
        	  for(i in question.activePage.components){
        		if(question.activePage.components[i].id==this.componentId){
        			var newId = question.activePage.components[i].sections[question.activePage.components[i].sections.length-1].getId()+1;
        			var config = {
        					id:newId,
        					componentId : this.componentId,
        					componentIdPrefix : this.componentIdPrefix
        			};
        			var newSection = new CheckboxComponentSection(config);
        			var secOptions = new Array();
        			
        			$.each(this.options,function(index,option){
        				var optAnswers= new Array();
        				var optConfig = {
        						 id : option.id,
        						 sectionId : newSection.id,
        						 sectionIdPrefix : newSection.componentIdPrefix+newSection.componentId+newSection.idPrefix,
        						 componentId : newSection.componentId,
             					componentIdPrefix : newSection.componentIdPrefix
        				};	
        				var optionObj = new Option(optConfig);
        				secOptions.push(optionObj);
        			});
        			newSection.options = secOptions;
        			
        			var sectionLabels = [];

        			var configSectionLabel = {
        				id : 2,
        				componentId : newSection.componentId,
        				componentIdPrefix : newSection.componentIdPrefix,
        				sectionId : newSection.id,
    					sectionIdPrefix : newSection.idPrefix
        			};
        			
        			sectionLabels.push(new SectionLabel(configSectionLabel));	
        			
        			newSection.setSectionLabels(sectionLabels);
        			if(question.activePage.components[i].isBranched && question.activePage.components[i].sections.length == 1){
        				question.activePage.components[i].isBranched = false;
        				question.activePage.components[i].sections[0].isBranched = true;
        			}
        			question.activePage.components[i].addSection(newSection);
        			question.activePage.doLayout(); 
        			question.activePage.components[i].populateComp();
        			//this.selectSubCategories();
        		    break;
        		}
        	}
          },
          removeSection : function(){
        	  var i=0;
        	  for(i in question.activePage.components){
        			if(question.activePage.components[i].id==this.componentId){
        				for(j in question.activePage.components[i].sections){
        					if(question.activePage.components[i].sections[j].id==this.id){
        						if(question.activePage.isBranchDest 
        								|| question.activePage.components[i].isBranchDest
        								|| question.activePage.components[i].isBranched
        								|| question.activePage.components[i].sections[j].isBranchDest 
        								|| question.activePage.components[i].sections[j].isBranched){
    								new Modal({
    									id : 1,
    									headingText : "Warning ! ",
    									containtText : "This Section is a part of path mapping logic and cannot be deleted.",
    								}).getWarningModal();
    								return false;
    							}
        						else{
        							question.activePage.components[i].sections.splice(parseInt(j),1);
            						question.activePage.components[i].updateMinMaxPoint();
            						question.activePage.doLayout();
            						question.activePage.components[i].showSolutionIndicator();
            	        		    break;
        						}
        					}
        				}
        				if( question.activePage.components[i].sections.length == 1 && question.activePage.components[i].sections[0].isBranched){
	        				question.activePage.components[i].isBranched = true;
	        				question.activePage.components[i].sections[0].isBranched = false;
	        			}
        			}
        	  }
        	  
         },
         /**
          * filter out html
          * @param event
          */
        filter:function(event){
      		util.removePasteImage(event.originalEvent.clipboardData,event);
      	},
      	/**
         * layouts in instructor mode
         * @returns {String}
         */
        instructorLayout:function(graded,orientation,acceptAnyAnswer,feedbackType,feedbackScoringType,showPointsToStudents){
	       	var htmlelement='';
	        var editorText = util.getImageLayout(this.editor.text);
			var markCompulsary=(graded)?"<span class='starHide'>*</span>":"";
            editorText = util.getVideoLayout(editorText);
	   		htmlelement +='<div class="prevQuest prevQuestInstructor">';
	   		htmlelement +='	<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent"> '+markCompulsary+' '+editorText+' </div>';
	   		htmlelement+='	<div class="clear"></div>';
	   		
	   		//display sub labels if authored
  			if(this.showSectionLabels){
  				var x=0;
  				for(x in this.sectionLabels){
  					var edtTxt = this.sectionLabels[x].editor.text;

                    var edtTxt = util.getImageLayout(edtTxt);
                    edtTxt = util.getVideoLayout(edtTxt);

  					if(edtTxt!="" && edtTxt!=null){
  						htmlelement +='<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent">'+edtTxt+' '+markCompulsary+'</div>';
  						htmlelement+='	<div class="clear"></div>';
  					}
  				}
  			}
	   		
	   		htmlelement+='	<div class="clear"></div>';
	   		htmlelement +='	<div class="prevQuestOpt">';
			
	   		var i=0;
	   		for( i in this.options){
		   		htmlelement +=this.options[i].instructorLayout(orientation,acceptAnyAnswer,showPointsToStudents,feedbackType,feedbackScoringType);
	   		}
		   	htmlelement +='	</div>';
		   	htmlelement +='</div>';
	   		return htmlelement.replace(/&nbsp;/gi,'');
        },
        /**
         * layouts in student test mode
         * @returns {String}
         */
        studentLayout:function(graded,orientation,acceptAnyAnswer,feedbackType,showPointsToStudents, feedbackScoringType, hideSubCategoriesfromStudents,notApplicable){
        	var htmlelement='';
        	var k = 0, flag = false;
        	if(notApplicable){
        		flag = true;
        	}
        	else{
        		for (k in this.options) {
    				if(this.options[k].studentResponse){
    					flag = true;
    					break;
    				}
    			}
        	}
        	/* check for branching to show/hide */
			var attachClass = ''; 			
			if(!this.showToStud && this.showToStud!=undefined ){ /* section related check */
        		attachClass = 'hideElement';
        	}
        	var css = flag?"correct":"wrong";
			var hideanswer = acceptAnyAnswer || flag==false?"style='display:block'":"style='display:none'";
			var markCompulsary=(graded && EZ.mode == MODE_POST_TEST )?"<span class='starHide'>*</span>":"";
			
			htmlelement +=' <div class="col-lg-10" >';
			htmlelement +=' 	<div class="table-responsive tbl_scroll tbl-style">';
			htmlelement +=' 		<div id = "sectionDiv_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" class="prevQuest '+attachClass+'" >';
			
			 var editorText = util.getImageLayout(this.editor.text);
			     editorText = util.getVideoLayout(editorText);
			 if(EZ.mode == MODE_POST_TEST){
				 htmlelement +='<div '+hideanswer+' id="showCorrect_'+this.editor.id+'" class="answerTick wid '+css+'" ></div>';
			}
			htmlelement +='	<div class="stdQueLabel inputDummyQuestionStemStudent lblMargin">'+markCompulsary+' '+editorText+' </div>';
			if(!flag && EZ.mode == MODE_POST_TEST){
				htmlelement+='    <div class="inCompleteAnswerBanner">You did not complete this question.';
	     		htmlelement+='    </div>';
			}
			htmlelement+='	<div class="clear"></div>';
			//display sub labels if authored
			if(this.showSectionLabels){
			   var sectionLabelCss = EZ.mode == MODE_POST_TEST ? "sectionLabel" :"style='display:none'";
			   var x=0;
			   for(x in this.sectionLabels){
			     var edtTxt = this.sectionLabels[x].editor.text;
			      edtTxt = util.getImageLayout(edtTxt);
			      edtTxt = util.getVideoLayout(edtTxt);
			
			     if(edtTxt!="" && edtTxt!=null){
			    	 htmlelement +='<div class="stdQueLabel lblMargin inputDummyQuestionStemStudent '+sectionLabelCss+'">'+edtTxt+' '+markCompulsary+'</div>';
			    	 htmlelement+='	<div class="clear"></div>';
			     }
			   }
			}
			htmlelement +=' 			<div class="clear"></div>';
			htmlelement +='<div class="prevQuestOpt">';
			
			var j = 0;
			 if(EZ.mode==MODE_TEST){
				for(j in this.options){
					htmlelement += this.options[j].studentLayout(orientation,acceptAnyAnswer,feedbackType,showPointsToStudents, feedbackScoringType, hideSubCategoriesfromStudents, notApplicable);
				}
			 }
			 else{
				for(j in this.options){
					htmlelement += this.options[j].postSubmissionReviewLayout(orientation,acceptAnyAnswer,feedbackType,showPointsToStudents, feedbackScoringType, hideSubCategoriesfromStudents, notApplicable);
				}
			 }
			
			htmlelement +='			</div>';
			htmlelement +='		</div>';
			htmlelement +='<div class="secScore" id="sectionDivScore_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"></div>';
			htmlelement +='	</div>';
			htmlelement +='</div>';
			htmlelement +='<div class="clear"></div>';			   		
	   		return htmlelement;
        },
        /**
         * add event handers to html elements after the layout done in student test mode
         * @returns {String}
         */
        afterStudentLayout:function(notApplicableStudentResponse){
        	var j=0;
			for (j in this.options) {
				this.options[j].afterStudentLayout();
			}	
        	if (notApplicableStudentResponse) {
				this.disableStudentSelection(true);
			} 
        	$('.stdQueLabel').each(function (){
    			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
            });
	   	},
	    updateStudentResponse : function(){
	      if($("#option_"+this.editor.id).val() != "-1"){
	    	 var j=0;
  	   		 for(j in this.options){
  	   			if( this.options[j].id==$("#option_"+this.editor.id).val()){
	  	   			this.options[j].answers[0].resetStudentResponse();
	  		    	this.options[j].answers[0].studentResponse = true;
	  		    	question.updateProgressBar();
  	   			}
  	   		 }
	      }else{
	    	  var j=0;
	  	   	  for(j in this.options){
	  	   			this.options[j].answers[0].resetStudentResponse();
		  		   	this.options[j].answers[0].studentResponse = null;		  		
	  	   	  } 
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
        postSubmissionReviewLayout:function(graded,orientation,acceptAnyAnswer,feedbackType,showPointsToStudents,feedbackScoringType,hideSubCategoriesfromStudents){
        	var htmlelement='';
   			htmlelement +='<div class="prevQuestOpt ">';
	   		var i=0;
	   		for( i in this.options){
		   		htmlelement +=this.options[i].postSubmissionReviewLayout(orientation, acceptAnyAnswer,feedbackType,showPointsToStudents,feedbackScoringType,hideSubCategoriesfromStudents);
   				if(orientation==1){
   	   			 htmlelement+='<div class="clear"></div>';
   	   			}else if(orientation==3){
   	   				if((parseInt(i)+1)%2==0){
   	   				 htmlelement+='<div class="clear"></div>';
   	   				}
   	   			}
	       	}
   			htmlelement +='</div">';
	   		return htmlelement;
        },
        /**
		 * check if question is answered
		 */

        isStudentAnswered:function(binaryAnswer){
             var i=0;
             var validflag=false;
             for( i in this.options){
   				 if(this.options[i].studentResponse){
   					 if(this.options[i].getType()=="stud"){
   						validflag= this.options[i].isStudentOptionFilled();
   					 }else{
   						validflag= true;
   					 }
   					 if(validflag){
   						 break;
   					 }
   				 }
   				 else{
   					 validflag= false; 
   				 }
			}
			return validflag;
	},
	/**
	 * calculate points for student
	 */
	/*calculatePoints:function(){
		var points=0;
		 var i=0;
		 for( i in this.options){
			 points += this.options[i].calculatePoints();
			
		 }
		return points;
	},*/
	/**
	 * calculate Correct Answers
	 */
	calTotalCrctAnswersGivenByStudent:function(binaryAnswer){
		var count=0;
		 if(binaryAnswer){
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if((this.options[i].answers[0].right && this.options[i].answers[0].studentResponse) || (this.options[i].answers[1].right && this.options[i].answers[1].studentResponse)){
					 correctFlag=true;
				 }else{
					 correctFlag=false;
				 }
				 count +=(correctFlag)?1:0;
			 }
		 }else{
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if(this.options[i].answers[0].right && this.options[i].answers[0].studentResponse){
					 correctFlag=true;
				 }
			 }
			 count=(correctFlag)?1:0;
		}
		return count;
	},
	/**
	 * calculate Wrong Answers
	 */
	calTotalWrngAnswersGivenByStudent:function(binaryAnswer){
		
		var count=0;
		 if(binaryAnswer){
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if(this.options[i].answers[0].studentResponse!=null || this.options[i].answers[1].studentResponse!=null){
					 if((this.options[i].answers[0].right && this.options[i].answers[0].studentResponse) || (this.options[i].answers[1].right && this.options[i].answers[1].studentResponse)){
						 correctFlag=true;
					 }else{
						 correctFlag=false;
					 } 
				 }else{
					 correctFlag=true;
				 }
				 
				 count +=(correctFlag)?0:1;
			 }
		 }else{
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if(this.options[i].answers[0].right && this.options[i].answers[0].studentResponse){
					 correctFlag=true;
				 }
			 }
			 count=(correctFlag)?0:1;
		}
		 
		
		return count;
	},
	/*
	 * update sub category range feedbacks, on selected category in section dropdown
	 * when feedbackScoringType = frequency
	 * */
	updateSubCategoryRangeFeedbacks : function(subCatId, isInner){
		var i=0;
		for (i in question.activePage.components) {
				if (question.activePage.components[i].id == this.componentId) {
					$.each(question.activePage.components[i].subCategoryRanges ,function(index,subCategoryRange){
						//subCategoryRange.update();	
					 if(question.activePage.components[i].feedbackScoringType ==="frequency"){
						if(subCategoryRange.subCategoryId == subCatId){
							var obj = [];
							 try{
				                  obj = question.activePage.components[i].sections.filter(function(e){
				                     return e.subCategoryId == subCatId;
				                  });				              
				                  
				              }catch(err){
				                 obj = [];
				              }
				              
				              if(obj.length > 0 ){				            	  	
				            	  var range=new Array();
				            	  var rangeConfig = {
				    						componentId : this.componentId,
				    						componentIdPrefix :  this.componentIdPrefix+this.componentId+subCategoryRange.idPrefix,
				    						parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
				    						allowNegative:true
				    					};
				            	  var maxCounter = 0;
				    			  for(key in obj){  
					    		   	  if(maxCounter < obj[key].options.length){
					    		   	   	maxCounter = obj[key].options.length; 
					    		   	  }
					    		  }
				    					    			  
				    			  for (var x=1;x<=maxCounter;x++){
					    			rangeConfig.id=x;
					    			range.push(new Range(rangeConfig));	
					    		  }
				    			  subCategoryRange.setRanges(range);
					    		  subCategoryRange.update();				    		     
				              }
						}
					 }
					});
				}
		  }
		  if(isInner){
		   	question.activePage.doLayout();
		  }			 
	},
	/*
	 * add section label layouts
	 * */
	addSectionLabelLayout : function(){
		var itsId = this.componentIdPrefix+this.componentId+this.idPrefix+this.id;		
		if($("#sectionLabelCollection_"+itsId).hasClass('hideIt')){
			$("#sectionLabelCollection_"+itsId).removeClass('hideIt');
			$("#seclabelPlus_"+itsId).addClass('hideIt');
			this.showSectionLabels = true;
		}
		//$("#sectionLabelCollection_"+itsId).removeClass('hideIt');
		//$("#seclabelPlus_"+itsId).hide();
	},
    /**
     * adds new label to section in multiple choice question
     * @param section labels
     */
    addSectionLabel:function(sectionLabel){
    	this.sectionLabels.push(sectionLabel);
    },
    /**
     * removes section labels for sections in Multiplechoice component
     * @param sectionlables
     */
    removeSectionLabel:function(sectionLabel){
    	 var i=0;
    	 for(i in this.sectionLabels){
    			if(this.sectionLabels[i].getId()==sectionLabel.getId()){
    				this.sectionLabels.splice(i, 1);
    			}
    	 }
    },
    disableStudentSelection : function(flag){
    	var i = 0;
		for( i in this.options){
			this.options[i].disableStudentSelection(flag);
	     }
    },
    calculatePoints : function(selectionType){
    	this.score = 0;
    	var totalPoints = "";
    	if(selectionType == "allSelection"){
    		for( i in this.options){
    			if(this.options[i].studentResponse == true){
    				if(totalPoints==""){
    					totalPoints = this.options[i].pointsValueEditor.text!=""?parseFloat(this.options[i].pointsValueEditor.text):0;
		    		}else{
		    			totalPoints += this.options[i].pointsValueEditor.text!=""?parseFloat(this.options[i].pointsValueEditor.text):0;
		    		}
    			}
    	     }
    	}
    	else{
    		for( i in this.options){
    			if(this.options[i].studentResponse == true){
		    		var pts = this.options[i].pointsValueEditor.text!=""?parseFloat(this.options[i].pointsValueEditor.text):0;
		    		if(totalPoints==""){
		    			totalPoints=pts;
		    		}
		    		if(totalPoints < pts){
		    			totalPoints = pts;
		    		}
    			}
    		}
    	}
    	this.score = totalPoints;
    	return totalPoints;
    }
};  