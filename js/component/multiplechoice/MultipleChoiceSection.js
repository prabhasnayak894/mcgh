/* ========================================================================
 * MultipleChoiceSection: Object Declaration
 * @author: Dinesh Gabhane
 * ========================================================================
 * Purpose of this object to have all component section specific properties like 
 * holds the options, editor question text for this component
 * ======================================================================== */

var MultipleChoiceSection = function(options){ 
	this.id=null;
	this.idPrefix="G";
	this.componentId=null;
	this.componentIdPrefix=null;	
	this.options=[];
	this.subCategoryId;
	this.isBranched = false;   //Set to true if this used as source
	this.isBranchDest = false;    //set true if this used as destination for path mapping
	this.destBranchId = null;		// set branch id into destination
	$.extend(this, options);
	this.markers=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.editor = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.id});
	this._update = MultipleChoiceSection.BindAsEventListener( this, this.update );
	this._filter = MultipleChoiceSection.BindAsEventListener( this, this.filter );
	this._addSection = MultipleChoiceSection.BindAsEventListener( this, this.addSection);
	this._removeSection = MultipleChoiceSection.BindAsEventListener( this, this.removeSection);
	this._populateEditorProperties = MultipleChoiceSection.BindAsEventListener( this, this.populateEditorProperties );
	this._selectSubCategories= MultipleChoiceSection.BindAsEventListener( this, this.selectSubCategories );
	this._updateStudentResponse = MultipleChoiceSection.BindAsEventListener( this, this.updateStudentResponse );
	this._updateEditor= MultipleChoiceSection.BindAsEventListener( this, this.updateEditor );
	this._propertyLayout = MultipleChoiceSection.BindAsEventListener( this, this.propertyLayout );
	this.showSectionLabels=false;
	this.sectionLabels =[];
	//this._addSectionLabel = MultipleChoiceSection.BindAsEventListener( this, this.addSectionLabel);
	this._addSectionLabelLayout = MultipleChoiceSection.BindAsEventListener( this, this.addSectionLabelLayout);
	this.showToStud=true;//check for student/postsubmission layout
};
//add event helper method
MultipleChoiceSection.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
MultipleChoiceSection.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
MultipleChoiceSection.prototype = { 
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
		  						if(question.activePage.components[i].feedbackScoringType !=="frequency"){
		  						  subCategoryRange.update();	
		  						}
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
          layout:function(flag,type,feedbackType,feedbackScoringType, binaryAnswer,isSectionMore){
        	 var htmlelement="";
        	 if(!flag){
              	htmlelement+='<div class="section-devider"></div>';
             }
        	 htmlelement+= '<div class="containerSection" id="section_'+this.editor.id+'">';
          	 htmlelement+= this.editorLayout(flag,type,feedbackType,feedbackScoringType, binaryAnswer,isSectionMore);
          	 var lastOption=this.options[this.options.length-1];
        	 var i=0;
         	 for( i in this.options){
     			if(this.options[i].id==lastOption.id){
        			 htmlelement+=  this.options[i].layout(true,feedbackType,feedbackScoringType,this.markers[i], binaryAnswer);
        		 }
        		 else{
        			 htmlelement+=  this.options[i].layout(false,feedbackType,feedbackScoringType,this.markers[i], binaryAnswer); 
        		 }
         	 }
         	htmlelement+='<div class="clear"></div>';
         	//htmlelement+='</div>';
         	
        	 return htmlelement;
          },
          /**
           * layouts section editor in design mode
           * @returns {String}
           */
          editorLayout:function(isFirst,type,feedbackType,feedbackScoringType, binaryAnswer,isSectionMore){   
	    	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
	    	 var htmlelement="";
	    	 var choice1="";
	    	 var choice2="";
	    	 htmlelement+='<div class="rowPagesection-1">';
          if(!isFirst){
            htmlelement+='<div class="colPageSectionidMchoice">'; 
          } else{
            var fSectionClass = (!isSectionMore)?'hideIt':'';
            htmlelement+='<div class="colPageSectionidMchoice '+fSectionClass+'">';
          }
          htmlelement+=' <h6 style="float:right;" class="font10">ID # '+this.editor.id+'</h6>';
          htmlelement+='</div>';
             /*if(!isFirst){
             htmlelement+='<div class="colPageSectionidMchoice">'; 
           }else{
             var fSectionClass = (!isSectionMore)?'hideIt':'';
             htmlelement+='<div class="colPageSectionidMchoice '+fSectionClass+'">';
           }
           htmlelement+='<div class="eachCol">';
           htmlelement+=' <h6 class="font10">ID # '+this.editor.id+'</h6>';
           htmlelement+='</div>'; 
           htmlelement+='</div>';
           htmlelement+='</div>';*/

	    	 htmlelement+=' <div class="eachCol-3">';
	    	 var minusCss = !isFirst?' style="display: block;"':' style="display: none;"';
        	 htmlelement+=' <div class="minusBtn" '+minusCss+'><a title="Remove Section" id="sec_minus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/minus.png"></a></div>';
             htmlelement+='<div class="pull-right"><a title="Add Section" id="sec_plus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'"><img src="img/plus.png"></a></div>';
             
             //htmlelement+='<a href="#"><img src="img/getPicture.png"></a>' ;
	    	 htmlelement+='</div>'	;
	    	 htmlelement+='   <div class="colPageSection secondColPic">';
	    	 htmlelement+='     <div>';
	    	 htmlelement+='<div class="editableDivTitle">';
        	 htmlelement+=' <h6 class="pull-right font10 tagtext"></h6> ';
        	 htmlelement+=' <h6 class="pull-right font10 inputhead"></h6></div>';
        	 htmlelement+='<div class="inputDummy inputDummyMaxWidth inputDummyQuestionStem "'+dataDivAttr+' data-placeholder="Enter text" contentEditable=true onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" id="'+(this.editor.id)+'"  data-maxlength="'+this.editor.maxLength+'" >'+this.editor.text+'</div>';
        	 if(feedbackType == 'rangedBasedSubcategories' && !binaryAnswer){        	 
        		 htmlelement+='			<div class="colPageSection fourthColPic" id="'+this.editor.id+'_subCategories">';
        		 htmlelement += '			<div >';
        		 htmlelement+=					this.layoutSubCategory();
        		 htmlelement += '			</div>';
    	       	 htmlelement+='			</div>';            	 
    	         //add plus option for label
    	       	 var plusOptClass="";
    	       	 var labelCollectionClass="";
    	       	 
    	       	 if(!this.showSectionLabels){
    	       		labelCollectionClass = "hideIt";
    	       	 }else{
    	       		plusOptClass = "hideIt"; 
    	       	 }
    	       	 htmlelement+='			<div class="colPageSection fourthColPic">';
    	       	 htmlelement += '			<a title="Add Section Label" id="seclabelPlus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" class="'+plusOptClass+'">';
       		     htmlelement+=					'<img src="img/plus.png">';
       		     htmlelement += '			</a>';
   	       	     htmlelement+='			</div>';
   	       	     
   	       	     //Section Label
   	       	     htmlelement+='<div id="sectionLabelCollection_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" class="'+labelCollectionClass+'">';
            	  htmlelement+= this.sectionLabelLayout();
   	       	     htmlelement+='</div>';
   	       	     
        	 }else{
        		 if(feedbackType != "standard"){
        			//add plus option for label
        			 var plusOptClass="";
        	       	 var labelCollectionClass="";
        	       	 
        	       	 if(!this.showSectionLabels){
        	       		labelCollectionClass = "hideIt";
        	       	 }else{
        	       		plusOptClass = "hideIt"; 
        	       	 }
        	       	 
         	       	 htmlelement+='			<div class="colPageSection fourthColPic">';
         	       	 htmlelement += '			<a title="Add Section Label" id="seclabelPlus_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" class="'+plusOptClass+'">';
            		     htmlelement+=					'<img src="img/plus.png">';
            		     htmlelement += '			</a>';
        	       	     htmlelement+='			</div>';
        	       	     
        	       	//Section Label
        	       	     htmlelement+='<div id="sectionLabelCollection_'+this.componentIdPrefix+this.componentId+this.idPrefix+this.id+'" class="'+labelCollectionClass+'">';
                 	       htmlelement+= this.sectionLabelLayout();
        	       	     htmlelement+='</div>'; 
        		 }
        		 if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && binaryAnswer && feedbackScoringType != "frequency"){          		  
             		//insert choice text
             		  choice1 = this.options[0].answers[0].label;
             		  choice2 = this.options[0].answers[1].label;
             		 
             		 choice1 = (choice1 == null)? "" : choice1;
             		 choice2 = (choice2 == null)? "" : choice2;
             		 
             		
              	 } 
        	 }        	 
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';
        	 htmlelement+='<div class="clear"></div>';
        	 if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && binaryAnswer && feedbackScoringType != "frequency"){
	        	 htmlelement += '<div class="rowPagesection-1 fully_partualy">';
	     		 htmlelement += '  <div class="colPageSection fourthColPic" id="choice1Val'+this.editor.id+'">' +choice1+ '</div>';
	     		 htmlelement += '  <div class="colPageSection fourthColPic" id="choice2Val'+this.editor.id+'">' +choice2+ '</div>';
	     		 if(feedbackType == 'rangedBasedSubcategories')
	     			 htmlelement+='<span style="position: absolute;right: 55px;}"><strong>Subcategory</strong></span>';
	     		 htmlelement += '</div>';
        	 }
        	 /* check for show/hide section ids */
        	 /*if(!isFirst){
        		 htmlelement+='<div class="colPageSectionidMchoice">'; 
        	 }else{
        		 var fSectionClass = (!isSectionMore)?'hideIt':'';
        		 htmlelement+='<div class="colPageSectionidMchoice '+fSectionClass+'">';
        	 }
        	 htmlelement+='<div class="eachCol">';
        	 htmlelement+=' <h6 class="font10">ID # '+this.editor.id+'</h6>';
        	 htmlelement+='</div>';	
        	 htmlelement+='</div>';
        	 htmlelement+='</div>';*/
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
        	  else
        		  this.subCategoryId=null;
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
          propertyLayout : function(){
	    		var currentComponent = null;
				for (i in question.activePage.components) {
					if (question.activePage.components[i].id == this.componentId) {
						currentComponent = question.activePage.components[i];
					}
				}
				currentComponent.populateComp();
				var html = "";
	        	if(currentComponent.sections.length > 1){
	        			$(".componentTytle .txtediting").text("ID#  "+ this.editor.id);  
	        			if(this.isBranched){
	        				$("#isBranchedLabel_"+this.componentIdPrefix+this.componentId).html("This section is branched.");  
	        			}
	        			else{
		        			$("#isBranchedLabel_"+this.componentIdPrefix+this.componentId).html("");
		        		}
	        	}
	        	else{
	        		if(this.isBranched){
	        			$("#isBranchedLabel_"+this.componentIdPrefix+this.componentId).html("This component is branched.");
	    			}
	        		else{
	        			$("#isBranchedLabel_"+this.componentIdPrefix+this.componentId).html("");
	        		}
	        	}
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
                
                if(subType=="radio")
                {
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
      		MultipleChoiceSection.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
      		MultipleChoiceSection.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
      		 
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
     		 
     		MultipleChoiceSection.addEvent( "section_"+this.editor.id, "click", this._propertyLayout );	
     		MultipleChoiceSection.addEvent( this.editor.id, "blur", this._update );		
     		MultipleChoiceSection.addEvent( this.editor.id, "paste", this._filter );
     		MultipleChoiceSection.addEvent( this.editor.id, "click", this._populateEditorProperties );
     		MultipleChoiceSection.addEvent("sec_plus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._addSection );	
     		MultipleChoiceSection.addEvent("sec_minus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._removeSection);
     		if(this.options.length==1){
     			$("#ans_"+this.options[0].editor.id).find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
     		}
     		MultipleChoiceSection.addEvent("categories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id,"change", this._selectSubCategories);
     		if (this.subCategoryId != null)		
 				$("#categories"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id).val(this.subCategoryId);
     		
     		$.each(this.sectionLabels ,function(index,sectionLabel){
				 sectionLabel.afterLayout();
			});
     		
     		MultipleChoiceSection.addEvent("seclabelPlus_"+this.componentIdPrefix+this.componentId+this.idPrefix+this.id, "click", this._addSectionLabelLayout );
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
				$("#htmlToTextConvertor").html(this.editor.text);
				var questionText = $("#htmlToTextConvertor").text();
				if (questionText.length <= 0) {
					isQuestionTextFilled = false;
				}
				if (feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') {
					// var isPointFilled=true;
					
					if(feedbackScoringType != 'frequency'){
						for (i in this.options) {
							isFilled = isQuestionTextFilled && isFilled
									&& this.options[i].isOptionAnswerPointValueFilled()
									&& this.options[i].isOptionFilled();
						}
					}
					else{
						for (i in this.options) {
							isFilled = isQuestionTextFilled && isFilled
									&& this.options[i].isOptionFilled();
						}
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
        			var newSection = new MultipleChoiceSection(config);
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
        				var j=0;
        				for(j in option.answers){
        					var rightFlag = false;
        					if( j == 0 ){
        						rightFlag = page.components[i].binaryAnswer?true:page.components[i].acceptAnyAnswer;
        					}
        					var optionAnswersConfig = {
        							id:option.answers[j].id,
        							optionId : option.id,
        							optionIdPrefix : option.sectionIdPrefix+optConfig.sectionId+option.idPrefix,
        							componentId : option.componentId,
                  					componentIdPrefix : option.componentIdPrefix,
                  					sectionId : newSection.id,
        	    					sectionIdPrefix : newSection.idPrefix,
        							label : option.answers[j].label,
        							right : rightFlag
        						};
        					optAnswers.push(new MultipleChoiceOptionAnswer(optionAnswersConfig));
        				}
        				var optionObj = new MultipleChoiceOption(optConfig);
        				optionObj.setAnswers(optAnswers);
        				secOptions.push(optionObj);
        			});
        			newSection.options = secOptions;
        			
        			var sectionLabels = [];

        			var configSectionLabel = {
        				id : 1,
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
        instructorLayout:function(binaryAnswer,subType,orientation,acceptAnyAnswer,feedbackType,feedbackScoringType){
	       	var htmlelement='';
	       	var bgcss=binaryAnswer?"binaryAnswerBg posMcStatements":"";
	   		if(subType=='radio'){
        	  	htmlelement +='<div class="prevQuestOpt '+bgcss+'">';
	   			if(feedbackType == 'rangedBasedSubcategories' && binaryAnswer){
	   					var currentComponent = null;
	   		  			for (i in question.activePage.components) {
	   		  				if (question.activePage.components[i].id == this.componentId) {
	   		  					currentComponent = question.activePage.components[i];
	   		  				}
	   		  			}
	   		  			var first=0;
	   					for(k in currentComponent.subCategories){
	   						var isBelongings = false;
	   						var x=0;
	   						for( x in this.options){
		   						if(currentComponent.subCategories[k].id == this.options[x].subCategoryId){
		   							isBelongings = true;
		   							break;
		   						}
	   						}
	   						if(isBelongings){
	   							if(currentComponent.subCategories[k].optionIds.length>0){
	   							  if(currentComponent.subCategories[k].notApplicable){
				     					htmlelement +='<div class="prevQuest  instructcheckNA" style="margin-left:-27px;"><input type="checkbox" disabled class="css-checkbox" >';
				     					htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box">Not Applicable</label></div>';
				     			   }
	   							   htmlelement +='<div action="#" class="headTxt answerTick correct-2"><b>'+currentComponent.subCategories[k].editor.text+'</b> </div>'; 
	   						 	   htmlelement +='<br><div class="prevQuestOpts" style="float:left;">';
	   						 	   if(currentComponent.choiceOptionVal1!=null && currentComponent.choiceOptionVal1!="" && currentComponent.choiceOptionVal2!=null&& currentComponent.choiceOptionVal2!="")
	   						 		{
	   						 		   	if(first==0)
	   						 		   	{
			   							    htmlelement +='<div class="colPageSection minColPic" >'+currentComponent.choiceOptionVal1+'</div>';
			   							    htmlelement +='<div class="colPageSection minColPic" >'+currentComponent.choiceOptionVal2+'</div>';
			   							    first++;
	   						 		   	}
	   							    
	   						 		}
	   						 	   htmlelement +='<div class="colPageSection secondColPic"></div>';
	   							    htmlelement += '</div>';
	   							}
	   							var i=0;
	   							for( i in this.options){
		   							if(currentComponent.subCategories[k].id == this.options[i].subCategoryId){
		   								htmlelement +=this.options[i].instructorLayout(binaryAnswer,subType,i==0?true:false,acceptAnyAnswer,feedbackType,orientation, feedbackScoringType);
		   							}
		   						}	
	   						}	   						
	   					}
	   			}
	   			else{
	   				var i=0;
			   		for( i in this.options){
			   			
				   		htmlelement +=this.options[i].instructorLayout(binaryAnswer,subType,i==0?true:false,acceptAnyAnswer,feedbackType,orientation, feedbackScoringType);
				   		
			   			if(binaryAnswer){
			   			 htmlelement+='<div class="clear"></div>';
			   			}else{
			   				if(orientation==1){
			   	   			 htmlelement+='<div class="clear"></div>';
			   	   			}else if(orientation==3){
			   	   				if((parseInt(i)+1)%2==0){
			   	   				 htmlelement+='<div class="clear"></div>';
			   	   				}
			   	   			}
			   			}
			       	}
	   			}
	   		
		   		htmlelement +='</div">';
		   		
	   		}else{
	   			
	   			 htmlelement+='<div class="rowPagesection prevQuestOpts dropdownPadding">';
  				 htmlelement+='<select id="option_'+this.editor.id+'" style="max-width: 280px; min-width:100px;" class="dropDownOption" name="options">';
  				 var opts="";
  				 if(acceptAnyAnswer){
  					opts +='<option "="" value="-1" id="opt_none" disabled ></option>';
  				 }
  				 
  				 var feedbackText = '';
  				 var j=0;
  				 for(j in this.options){
  					if( this.options[j].answers[0].feedback.text != '' ){

              var fbText = util.getImageLayout(this.options[j].answers[0].feedback.text);
                  fbText = util.getVideoLayout(fbText);
  						feedbackText += '<div class="feedOptiontext"><strong>Option ' + (parseInt(j)+1) + ' Feedback:</strong> ' + fbText + '</div>';
  					}
  					var selectedproperty= !acceptAnyAnswer && this.options[j].answers[0].right?"selected":""; 
  					var optionText = this.options[j].editor.text+"~";
  					if(feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories'){
  						optionText +=this.options[j].answers[0].pointsValueEditor.text ;
  						optionText +=(parseFloat(this.options[j].answers[0].pointsValueEditor.text)>1)?" pts":" pt";
  					}
  					opts +='<option "="" value="'+j+'" id="opt_'+j+'" '+selectedproperty+'  disabled>'+optionText+'</option>';
  				 }
  				 htmlelement+= opts;
  				 htmlelement+= '</select>';
  				 
  				 if( feedbackText != '' ) {
  					htmlelement +='<label><a class="feedClose">Feedback</a></label>';
  					htmlelement +='<div style="display:none;" class="feedBackOpen">';
  					htmlelement += feedbackText;
  					htmlelement +='</div>';
  				 }
  				 
  				 htmlelement+= '</div>';
  			}
  			
	   		return htmlelement.replace(/&nbsp;/gi,'');
        },
        /**
         * layouts in student test mode
         * @returns {String}
         */
        studentLayout:function(binaryAnswer,subType,orientation,acceptAnyAnswer,feedbackType,showPointsToStudents, feedbackScoringType, notApplicable){
        	var htmlelement='';
        	var bgcss=binaryAnswer?"binaryAnswerBg posMcStatements":"";
	   		if(subType=='radio'){
	   			
	   			htmlelement +='<div class="prevQuestOpt '+bgcss+'">';
		   		var i=0;
		   		if(feedbackType == 'rangedBasedSubcategories' && binaryAnswer){
		   			var currentComponent = null;
   		  			for (i in question.activePage.components) {
   		  				if (question.activePage.components[i].id == this.componentId) {
   		  					currentComponent = question.activePage.components[i];
   		  				}
   		  			}
   		  			var first=0;
   		  			var isFirst=0;
   					for(k in currentComponent.subCategories){
   						var isBelongings = false;
   						var x=0;
   						for( x in this.options){
	   						if(currentComponent.subCategories[k].id == this.options[x].subCategoryId){
	   							isBelongings = true;
	   							break;
	   						}
   						}
   						if(isBelongings){
   							var optionHtml = "";
   							if(currentComponent.subCategories[k].optionIds.length>0){
   								var id = this.editor.id + "_" + currentComponent.subCategories[k].subCategoryIdPrefix + currentComponent.subCategories[k].id; 
   								var isOptionsNa = false;
								for( n in this.options){
		   							if(currentComponent.subCategories[k].id == this.options[n].subCategoryId){
		   								isFirst++;
		   								isOptionsNa = this.options[n].notApplicableBinaryOption;
		   								optionHtml +=this.options[n].studentLayout(binaryAnswer,subType,isFirst==1?true:false,orientation,acceptAnyAnswer,feedbackType,showPointsToStudents, feedbackScoringType, isOptionsNa);
		   						   	}
	   							}
   								if(currentComponent.subCategories[k].notApplicable){
   										//check if options are NA
   										var checkproperty=isOptionsNa? "checked='checked'":"";
				     					htmlelement +='<div class="prevQuest instructcheckNA" style="margin-left: -27px !important;"><input type="checkbox" '+checkproperty+' class="css-checkbox"  id="notApplicableSubcategory_'+id+'">';
				     					htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+id+'">Not Applicable</label></div>';
				     			}
   								if(!currentComponent.hideSubCategoriesfromStudents){
   									htmlelement +='<div action="#" class="headTxt answerTick correct-2"><b>'+currentComponent.subCategories[k].editor.text+'</b> </div>'; 
	   								htmlelement +='<br><div class="prevQuestOpts" style="float:left;">';
	   								if(currentComponent.choiceOptionVal1!=null && currentComponent.choiceOptionVal1!="" && currentComponent.choiceOptionVal2!=null&& currentComponent.choiceOptionVal2!="")
	   						 		{
	   									if(first==0)
	   						 		   	{
			   						  	  	htmlelement +='<div class="colPageSection minColPic" >'+ currentComponent.choiceOptionVal1+'</div>';
			   						  	  	htmlelement +='<div class="colPageSection minColPic" >'+ currentComponent.choiceOptionVal2+'</div>';
			   						  	  	first++;
	   						 		   	}
	   						 		}
	   						  	  	htmlelement +='<div class="colPageSection secondColPic"></div>';
	   							    htmlelement += '</div>';
   								}
   							}
   							htmlelement += optionHtml;
   						}
   					}
	   			}
		   		else{
		   			for( i in this.options){
				   		htmlelement +=this.options[i].studentLayout(binaryAnswer,subType,i==0?true:false,orientation,acceptAnyAnswer,feedbackType,showPointsToStudents, feedbackScoringType, notApplicable);
				   		if(binaryAnswer){
			   			 htmlelement+='<div class="clear"></div>';
			   			}else{
			   				if(orientation==1){
			   	   			 htmlelement+='<div class="clear"></div>';
			   	   			}else if(orientation==3){
			   	   				if((parseInt(i)+1)%2==0){
			   	   				 htmlelement+='<div class="clear"></div>';
			   	   				}
			   	   			}
			   			}
			       	}
		   		}
		   		htmlelement +='</div">';
	   		}else{
  				 htmlelement+='<div class="rowPagesection dropdownPadding">';
  				 var disabled = notApplicable ? "disabled" : "";
  				 htmlelement+='<select '+disabled+' id="option_'+this.editor.id+'" style="max-width: 280px; min-width:100px;" class="dropDownOption" name="options">';
  				 var opts='<option value="-1" id="opt_none">Select a response.</option>';
  				 var j=0;
  				 for(j in this.options){
  					opts += this.options[j].studentLayout(binaryAnswer,subType,j==0?true:false,acceptAnyAnswer,feedbackType,orientation,showPointsToStudents, feedbackScoringType, notApplicable);
  				 }
  				 htmlelement+= opts;
  				 htmlelement+= '</select>';
  				 htmlelement+= '</div>';
  			}
  			
	   		return htmlelement;
        },
        /**
         * add event handers to html elements after the layout done in student test mode
         * @returns {String}
         */
        afterStudentLayout:function(subType,notApplicableStudentResponse,awardMaxMin,binaryAnswer, feedbackType){ 
        	
        	if(subType=='radio'){
        		var j=0;
	   	   		 for(j in this.options){
	   	   			 this.options[j].afterStudentLayout();
	   	   		 }
        	}else{
        		MultipleChoiceSection.addEvent( "option_"+this.editor.id, "change", this._updateStudentResponse,{subCategoryId:null});	
        	}	
        	
        	if(feedbackType == 'rangedBasedSubcategories' && binaryAnswer){
    			var currentComponent = null;
	  			for (i in question.activePage.components) {
	  				if (question.activePage.components[i].id == this.componentId) {
	  					currentComponent = question.activePage.components[i];
	  				}
	  			}
	  			
				for(k in currentComponent.subCategories){
					if(currentComponent.subCategories[k].optionIds.length>0){
						var id = this.editor.id + "_" + currentComponent.subCategories[k].subCategoryIdPrefix + currentComponent.subCategories[k].id; 
						MultipleChoiceSection.addEvent( "notApplicableSubcategory_"+id, "click", this._updateStudentResponse,{subCategoryId:currentComponent.subCategories[k].id, awardMaxMin: awardMaxMin, elementId:"notApplicableSubcategory_"+id} );	
					}
				}
				if (notApplicableStudentResponse) {
					var j=0;
	    			for(j in this.options){
						this.options[j].disableStudentSelection(this.options[j].notApplicableBinaryOption,awardMaxMin,true);
		   	   		 }
				}
				
    		}else{
    			if (notApplicableStudentResponse) {
        			var j=0;
        			for(j in this.options){
    					this.options[j].disableStudentSelection(true,awardMaxMin,binaryAnswer);
		   	   		 }
    			} 
    		}
        	
        	$('.stdQueLabel').each(function (){
    			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
            });
	   	},
	    updateStudentResponse : function(event){
	      var subCat = event.data.subCategoryId;
	      if(subCat != null){
	    	  	var awardMaxMin = event.data.awardMaxMin;
	    	 	var checkBoxElement=$("#"+event.data.elementId);
	    	 	var flag = false;
	    	 	if(checkBoxElement.prop("checked") == true || checkBoxElement.prop("checked") == 'true'){
	    	 		flag=true;
	   		   	}else{
	   		   		flag=false;
	   		   	}
	    	 	for( i in this.options){
	    	 		if(subCat == this.options[i].subCategoryId){
	    	 			this.options[i].notApplicableBinaryOption = flag;
	    	 			this.options[i].disableStudentSelection(flag,awardMaxMin,true);
	    	 		}
	    	 	}
	      }else{
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
	    		  		   	this.options[j].answers[0].studentResponse = false;		
	    		  		   	break;
	    	  	   	  }
	    	      } 
	      }
	      
	      /*changes for branching based on responses*/
	  		 var currentComponent = null;
			 for (i in question.activePage.components) {
				if (question.activePage.components[i].id == this.componentId) {
					currentComponent = question.activePage.components[i];
				}
			 }
			 
			 var fullCmpId = currentComponent.pageIdPrefix+currentComponent.pageId+currentComponent.idPrefix+currentComponent.id; 
			 /*go for compoenet branching check */
			 var isFrequency = false; 
			 if(currentComponent.feedbackScoringType == "frequency"){
				 isFrequency = true; 
			 }
			 var selectedOpt = null;
			
			 //check if component is branched
			 if(currentComponent.isBranched && currentComponent.sections.length==1){
				for(j in currentComponent.sections){	    		
	   			 var currenrtSection  = currentComponent.sections[0];
	   			 var x = 0; 
	   			 for( x in currenrtSection.options ) {
	   				var optAnswer = currenrtSection.options[x].answers[0];
	   				optAnswer.setMappedEntities(fullCmpId, optAnswer.studentResponse,currenrtSection.options[x].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency);
	   				if(optAnswer.studentResponse){
	    				selectedOpt = currenrtSection.options[x];
	    			}
	   			 }
				}
				if(selectedOpt!=null){
					selectedOpt.answers[0].setMappedEntities(fullCmpId, true,selectedOpt.id, parseFloat(selectedOpt.answers[0].pointsValueEditor.text), isFrequency);
				}
			 }
			 else{//else section is branched
				var j=0;
	 	    	for(j in currentComponent.sections){	    		
	 	    		if(currentComponent.sections[j].id==this.id){
	 	    			if(currentComponent.sections[j].isBranched){
	 	    				var currenrtSection  = currentComponent.sections[j];
	 	  	    			var x = 0; 
	 	  	    			for( x in currenrtSection.options ) {
	 	  	    				var optAnswer = currenrtSection.options[x].answers[0];
	 	  	    				optAnswer.setMappedEntities(fullCmpId, optAnswer.studentResponse,currenrtSection.options[x].id, parseFloat(optAnswer.pointsValueEditor.text), isFrequency, currenrtSection.id);
	 	  	    				if(optAnswer.studentResponse){
	 	  		    				selectedOpt = currenrtSection.options[x];
	 	  		    			}  	    				
	 	  	    			}
	 	  	    			if(selectedOpt!=null){
	 	  	    				selectedOpt.answers[0].setMappedEntities(fullCmpId, true,selectedOpt.id, parseFloat(selectedOpt.answers[0].pointsValueEditor.text), isFrequency, currenrtSection.id);
	 	  	    			}
	 	  	    		}
	 	    		}
	 	    	}
			 }
			 var bId = 0;
			 for(bId in question.branches){
				 if(question.branches[bId].criteria == "multi" && (question.branches[bId].cId == fullCmpId || question.branches[bId].cId_2 == fullCmpId)){
					 util.checkMultiCriteriaMapping(question.branches[bId]);
					 isCompBranched = true;
				 }
			 }
			 question.updatePages();
			//to solve performance issue
			//question.activePage.doStudentLayout();
			question.actvPageShowHide();
			 question.updateProgressBar();
	      
	    },
	    getMaxPointOption : function(awardMaxMin){
	    	var maxVal = 0;
	    	var maxPointOpt = 0;
	    	if(awardMaxMin == "Max"){
	    		for(var index in this.options){
		    		var pointVal = parseInt(this.options[index].answers[0].pointsValueEditor.text);
		    		if(pointVal > maxVal){
		    			maxVal = pointVal;
		    			maxPointOpt = this.options[index];
		    		}
		    	}
	    	}else{
	    		maxVal=parseInt(this.options[0].answers[0].pointsValueEditor.text);
	    		for(var index in this.options){
		    		var pointVal = parseInt(this.options[index].answers[0].pointsValueEditor.text);
		    		if(pointVal <= maxVal){
		    			maxVal = pointVal;
		    			maxPointOpt = this.options[index];
		    		}
		    	}
	    	}
	    	
	    	return maxPointOpt;
	    },
	    disableStudentSelection : function(flag,awardMaxMin,binaryAnswer){
			 for(var index in this.options){
				this.options[index].disableStudentSelection(flag,awardMaxMin,binaryAnswer);
	    	 }
			 if(flag && !binaryAnswer){
				//if not binary then set studentResponse of option having max points and reset all others
				 var maxPointOpt = this.getMaxPointOption(awardMaxMin);
				 maxPointOpt.answers[0].studentResponse = true;
			 }
			 var currentComponent = null;
			 var i = 0;
			 for (i in question.activePage.components) {
				if (question.activePage.components[i].id == this.componentId) {
					currentComponent = question.activePage.components[i];
				}
			 }
			 if (currentComponent.isBranched || this.isBranched) {
				var fullCmpId = currentComponent.pageIdPrefix
						+ currentComponent.pageId + currentComponent.idPrefix
						+ currentComponent.id;
				/* go for compoenet branching check */
				var isFrequency = false;
				if (currentComponent.feedbackScoringType == "frequency") {
					isFrequency = true;
				}
				var selectedOpt = null;
				var x = 0;
				for (x in this.options) {
					var optAnswer = this.options[x].answers[0];
					optAnswer.setMappedEntities(fullCmpId,
							optAnswer.studentResponse,
							this.options[x].id,
							parseFloat(optAnswer.pointsValueEditor.text),
							isFrequency);
					if (optAnswer.studentResponse) {
						selectedOpt = this.options[x];
					}
				}
				if(selectedOpt != null){
					selectedOpt.answers[0].setMappedEntities(fullCmpId, true,
							selectedOpt.id,
							parseFloat(selectedOpt.answers[0].pointsValueEditor.text),
							isFrequency);
				}
				//to solve performance issue
   				//question.activePage.doStudentLayout();
   				question.actvPageShowHide();
				question.updateProgressBar();
			}
	    },
        /**
		 * layouts in check my work status mode
		 * 
		 * @returns {String}
		 */
        checkMyWorkLayout:function(){        	
       	 
        },
        /**
         * builds the layout for post Submission Review mode
         * @returns {String} html element
         */
        postSubmissionReviewLayout:function(binaryAnswer,subType,orientation,acceptAnyAnswer,feedbackType,isStudentChecked,showPointsToStudents,feedbackScoringType, notApplicable){
        	var htmlelement='';
        	//var bgcss=binaryAnswer?"binaryAnswerBgPostSubView":"";
        	var bgcss=binaryAnswer?"binaryAnswerBg posMcStatements":"";
        	
	   		if(subType=='radio'){
	   			htmlelement +='<div class="prevQuestOpt '+bgcss+'">';
	   			if(feedbackType == 'rangedBasedSubcategories' && binaryAnswer){
		   			var currentComponent = null;
   		  			for (i in question.activePage.components) {
   		  				if (question.activePage.components[i].id == this.componentId) {
   		  					currentComponent = question.activePage.components[i];
   		  				}
   		  			}
   		  		    var first=0;
   					for(k in currentComponent.subCategories){
   						var isBelongings = false;
   						var x=0;
   						for( x in this.options){
	   						if(currentComponent.subCategories[k].id == this.options[x].subCategoryId){
	   							isBelongings = true;
	   							break;
	   						}
   						}
   						if(isBelongings){
   							var optionHtml = "";
   							if(currentComponent.subCategories[k].optionIds.length>0){
   								var id = this.editor.id + "_" + currentComponent.subCategories[k].subCategoryIdPrefix + currentComponent.subCategories[k].id; 
   								
   								var isOptionsNa = false;
								for( i in this.options){
		   							if(currentComponent.subCategories[k].id == this.options[i].subCategoryId){
		   								isOptionsNa = this.options[i].notApplicableBinaryOption;
		   								optionHtml +=this.options[i].postSubmissionReviewLayout(binaryAnswer,subType,i==0?true:false,acceptAnyAnswer,feedbackType,orientation,isStudentChecked,showPointsToStudents,feedbackScoringType,this.options[i].notApplicableBinaryOption);
		   						   	}
	   							}
   								if(currentComponent.subCategories[k].notApplicable){
   										//check if options are NA
   										var checkproperty=isOptionsNa? "checked='checked'":"";
				     					htmlelement +='<div class="prevQuest instructcheckNA" style="margin-left: -27px !important;"><input disabled type="checkbox" '+checkproperty+' class="css-checkbox"  id="notApplicableSubcategory_'+id+'">';
				     					htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+id+'">Not Applicable</label></div>';
				     			}
   								if(!currentComponent.hideSubCategoriesfromStudents){
   									htmlelement +='<div action="#" class="headTxt answerTick correct-2"><b>'+currentComponent.subCategories[k].editor.text+'</b> </div>';
   						   	 		htmlelement +='<br><div class="prevQuestOpts" style="float:left;">';
   						   	 		//htmlelement +='<div  class=" answerTick thirdColPic" ></div>';
   						   	 	    if(currentComponent.choiceOptionVal1!=null && currentComponent.choiceOptionVal1!="" && currentComponent.choiceOptionVal2!=null&& currentComponent.choiceOptionVal2!="")
	 						 		{
	   						   	 		if(first==0)
							 		   	{
		   						   	 		htmlelement +='<div class="colPageSection minColPic" >'+currentComponent.choiceOptionVal1+'</div>';
		   						   	 		htmlelement +='<div class="colPageSection minColPic" >'+currentComponent.choiceOptionVal2+'</div>';
		   						   	 		first++;
		 						 		}
	 						 		}
   						   	 		htmlelement +='<div class="colPageSection secondColPic"></div>';
   						   	 		htmlelement += '</div>';
   								}	
   							}
   							htmlelement += optionHtml;
   						}
	   				}
	   			}
	   			else{
	   			
			   		var i=0;
			   		for( i in this.options){
			   			
				   		htmlelement +=this.options[i].postSubmissionReviewLayout(binaryAnswer,subType,i==0?true:false,acceptAnyAnswer,feedbackType,orientation,isStudentChecked,showPointsToStudents,feedbackScoringType, notApplicable);
				   		
			   			if(binaryAnswer){
			   			 htmlelement+='<div class="clear"></div>';
			   			}else{
			   				if(orientation==1){
			   	   			 htmlelement+='<div class="clear"></div>';
			   	   			}else if(orientation==3){
			   	   				if((parseInt(i)+1)%2==0){
			   	   				 htmlelement+='<div class="clear"></div>';
			   	   				}
			   	   			}
			   			}
			       	}
			   		
	   			}
	   			htmlelement +='</div">';
	   		}else{
  				 htmlelement+='<div class="rowPagesection prevQuestOpts">';
  				 var correctAnsCnt= this.calTotalCrctAnswersGivenByStudent(binaryAnswer);
  				 var css= (acceptAnyAnswer) ? '' : correctAnsCnt==1?"correct":this.isStudentAnswered(binaryAnswer)?"wrong":"";
  				 css='';
  				 htmlelement+= '<div id="showCorrect_'+this.editor.id+'" class="answerTick '+css+'" ></div>';
  				 htmlelement+='<select id="option_'+this.editor.id+'" style="max-width: 280px; min-width:100px;" class="dropmargin dropDownOption" name="options">';
  				 var opts="";
  				 if(acceptAnyAnswer){
  					opts +='<option "="" value="-1" id="opt_none" disabled ></option>';
  				 }
  				 
  				 var feedbackText = '';
  				 var correctAnswer = '';
  				 var isOptionsNa = false;
  				 var j=0;
  				 for(j in this.options){
  					var selectedproperty = '';
  					if( !acceptAnyAnswer && this.options[j].answers[0].right ){
						correctAnswer = this.options[j].editor.text;  						
  					}
  					if( this.options[j].answers[0].studentResponse){
  						if(feedbackType == 'rangedBasedSubcategories'){
  							isOptionsNa = this.options[j].notApplicableBinaryOption;
  						}else{
  							isOptionsNa = notApplicable;
  						}
  						selectedproperty = isOptionsNa ?'':'selected';
  					}
  					var optionText = this.options[j].editor.text;

  					optionText = util.getImageLayout(optionText);
  					optionText = util.getVideoLayout(optionText);
            
  					if((feedbackType == 'rangedBased' || feedbackType == 'rangedBasedSubcategories') && showPointsToStudents){
  						optionText +="~"+this.options[j].answers[0].pointsValueEditor.text ;
  						optionText +=(parseFloat(this.options[j].answers[0].pointsValueEditor.text)>1)?" pts":" pt";
  					}
  					if(feedbackScoringType === "frequency"){
  						opts +='<option "="" value="'+j+'" id="opt_'+j+'" '+selectedproperty+'  disabled>'+this.markers[j]+'. '+optionText+'</option>';
  		  				
  					}
  					else{
  						opts +='<option "="" value="'+j+'" id="opt_'+j+'" '+selectedproperty+'  disabled>'+optionText+'</option>';
  					}
  					
  						
  					if( this.options[j].answers[0].studentResponse ){
  						feedbackText = this.options[j].answers[0].feedback.text;
  						feedbackText = util.getImageLayout(feedbackText);
  						feedbackText = util.getVideoLayout(feedbackText);
  					}
  				 }
  				 htmlelement+= opts;
  				 htmlelement+= '</select>';
  				 
  				if( feedbackText != '' ){
  					htmlelement +='<label><a class="feedClose">Feedback</a></label>';
  					htmlelement +='<div style="display:none;" class="feedBackOpen">';
  					htmlelement += ' <strong>Feedback:</strong>'+feedbackText;
  					htmlelement +='</div>';
  				 }
  				 if( !acceptAnyAnswer && this.isStudentAnswered(binaryAnswer) && correctAnsCnt!=1 ) {
  					htmlelement+= '<div class="correctAnswerText">Correct Answer: ' + correctAnswer + '</div>';
  				 }	
  				 htmlelement+= '</div>';
  			}
	   		return htmlelement;
        },
        /**
		 * check if question is answered
		 */

        isStudentAnswered:function(binaryAnswer){
             var i=0;
             var validflag=false;
   			 for( i in this.options){
   				validflag= this.options[i].isStudentAnswered(binaryAnswer);
   				if(binaryAnswer){
   					if(!validflag){
   	   					break;
   	   				}
   				} else {
   					if(validflag){
   	   					break;
   	   				}
   				}
   				
   			 }
			return validflag;
	},
	/**
	 * calculate points for student
	 */
	calculatePoints:function(){
		var points=0;
		 var i=0;
		 for( i in this.options){
			 points += this.options[i].calculatePoints();
			
		 }
		return points;
	},
	/**
	 * calculate Correct Answers
	 */
	calTotalCrctAnswersGivenByStudent:function(binaryAnswer,subCategories){
		var count=0;
		 if(binaryAnswer){
			 var i=0;
			 var correctFlag=false;
			 for( i in this.options){
				 if((this.options[i].answers[0].right && this.options[i].answers[0].studentResponse) || (this.options[i].answers[1].right && this.options[i].answers[1].studentResponse)||this.options[i].notApplicableBinaryOption){
					 correctFlag=true;
				 }else{
					 correctFlag=false;
				 }
				 count +=(correctFlag)?1:0;
			 }
		 }else{
			 var i=0;
			 var correctFlag=false;
			 var NAFlag=false;
			 if(subCategories!=null)
			 {
				 if(subCategories.length>0)
				 {
					 for(var z=0;z<subCategories.length;z++)
					 {
						 if(this.subCategoryId==subCategories[z].id && subCategories[z].notApplicableStudentResponse)
							 NAFlag=true;						 
					 }				 
				 }
			 }
			 if(!NAFlag)
			 {
				 for( i in this.options){					
						 if(this.options[i].answers[0].right && this.options[i].answers[0].studentResponse){
							 correctFlag=true;
						
					 }
				 }
			 }
			 else
				 correctFlag=true;
			 
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
			$("#seclabelPlus_"+itsId).addClass('hideIt')
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
    }
};  