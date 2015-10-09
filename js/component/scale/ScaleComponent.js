/* ========================================================================
 * ScaleComponent: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to have all component specific properties like 
 * accepts scaleType, showPointsToStudents,notApplicable  
 * notApplicableExemptsScale, awardMaximum, awardMinimum,criterias,statements.
 * categories, ranges,minPoint, maxPoint
 * for this component
 * ======================================================================== */
var ScaleComponent = function(options){ 
	this.id=null;
	this.pageIdPrefix=null;
	this.pageId=null;
	this.idPrefix='C';
	this.type='scale';
	this.scaleType="S";
	this.feedbackScoringType="sum";
	this.showPointsToStudents=false;
	this.notApplicable=false;
	this.notApplicableExemptsScale=false;
	this.awardMaximum=true;
	this.awardMinimum=false;
	this.isBranched = false;		//Set to true if this used as source
	this.isBranchDest = false;		//set true if this used as destination for path mapping
	this.destBranchId = null;		// set branch id into destination
	this.showToStud=true;			//check for student/postsubmission layout
	this.criterias=[];
	this.statements=[];
	this.scaleLabels =[];
	this.subCategories=null;
	this.subCategoryRanges=null;
	this.ranges=[];
	this.minPoint=0;
	this.maxPoint=0;
	this.acceptAnyAnswer=true;
	this.state="expand";
	this.notApplicableStudentResponse=null;
	this.studentResponses=[];
	this.markers=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA","AB","AC","AD","AE","AF","AG","AH","AI","AJ","AK","AL","AM","AN","AO","AP","AQ","AR","AS","AT","AU","AV","AW","AX","AY","AZ"];
	this.hideSubCategoryToStudent = false;
	$.extend(this, options);
	this.mandatory=false;
	this._populateComp = ScaleComponent.BindAsEventListener( this, this.populateComp );
	this._collapseComponent = ScaleComponent.BindAsEventListener( this, this.collapseComponent );
	this._copyScaleComponent=ScaleComponent.BindAsEventListener( this, this.copyScaleComponent );
	this._removeComponent=ScaleComponent.BindAsEventListener( this, this.removeComponent );
	this._notApplicableOption=ScaleComponent.BindAsEventListener( this, this.notApplicableOption );
	this._clickSave=ScaleComponent.BindAsEventListener( this, this.clickSave );
	this._changeScaleType= ScaleComponent.BindAsEventListener( this, this.changeScaleType );
	this._showPointToStudent=ScaleComponent.BindAsEventListener( this, this.showPointToStudent );	
	this._showSubCatToStudent=ScaleComponent.BindAsEventListener( this, this.showSubCatToStudent );
	this._exemptsScale=ScaleComponent.BindAsEventListener( this, this.exemptsScale );
	this._notApplicableOptionValue=ScaleComponent.BindAsEventListener( this, this.notApplicableOptionValue );
	this._collapseRangedBasedFeedback = ScaleComponent.BindAsEventListener( this, this.toggleRangedBasedFeedback);
	this._openHelpModalForScaleComponent = ScaleComponent.BindAsEventListener(this,this.openHelpModalForScaleComponent);
	this._updateStudentResponse = ScaleComponent.BindAsEventListener( this, this.updateStudentResponse );
	this._changeFeedbackScoringType= ScaleComponent.BindAsEventListener( this, this.changeFeedbackScoringType );
	this._updateCriteriaFeedback  = ScaleComponent.BindAsEventListener( this, this.updateCriteriaFeedback  );	
};

//add event helper method on element id
ScaleComponent.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//add event helper method on element class
ScaleComponent.addEventOnClass = function(oTarget, sEventType, fnHandler,args) {
	$("."+oTarget).unbind(sEventType);
	$("."+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
ScaleComponent.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
ScaleComponent.prototype = { 
		/**
		 * gets id of Scale component
		 * @returns  id
		 */
		getId : function(){
			return this.id;
		},
		/**
	     * sets id of Scale component
	     * @param id
	     */
		setId : function(id){
			this.id = id;
		},
		/**
		 * get pageIdPrefix
		 * @returns
		 */
		getPageIdPrefix: function( ){
            return this.pageIdPrefix;  
	    },
	    /**
	     * sets pageIdPrefix
	     * @param pageIdPrefix
	     */
	    setPageIdPrefix: function( pageIdPrefix){
	         this.pageIdPrefix =  pageIdPrefix;
	    },
	    /**
	     * gets pageId
	     * @returns
	     */
	    getPageId: function( ){
            return this.pageId;  
	    },
	    /**
	     * sets pageId
	     * @param pageId
	     */
	    setPageId: function( pageId){
	         this.pageId =  pageId;
	    },
	    /**
	     * gets idPrefix
	     * @returns {String}
	     */
        getIdPrefix: function( ){
            return this.idPrefix;  
	    },
	    /**
	     * sets idPrefix
	     * @param idPrefix
	     */
	    setIdPrefix: function( idPrefix){
	         this.idPrefix =  idPrefix;
	    },
		/**
		 * gets type of component
		 * @returns {String} type
		 */
		getType:function(){
			return this.type;
        },
        /**
         * sets type of component
         * @param type
         */
        setType:function(type){
       	 this.setType(type);
        },
        /**
         * gets criteria for scale component
         * @returns criterias
         */
         getCriterias: function( ){
                 return this.criterias;  
         },
         /**
          * sets criterias for scale component
          * @param criterias
          */
         setCriterias: function(  criterias ){
             this.criterias =  criterias;
         },
         /**
          * gets statements for scale component
          * @returns statements
          */
          getStatements: function( ){
                  return this.statements;  
          },
          /**
           * sets statements for scale component
           * @param statements
           */
          setStatements: function(statements){
              this.statements =  statements;
          },
          /**
           * gets subCategories for scale component
           * @returns subCategories
           */
           getSubCategories: function( ){
                   return this.subCategories;  
           },
           /**
            * sets subCategories for scale component
            * @param subCategories
            */
           setSubCategories: function(subCategories){
               this.subCategories =  subCategories;
           },
           /**
            * gets subCategories for scale component
            * @returns subCategories
            */
           getSubCategoryRanges: function( ){
                    return this.subCategoryRanges;  
            },
            /**
             * sets subCategories for scale component
             * @param subCategories
             */
            setSubCategoryRanges: function(subCategoryRanges){
                this.subCategoryRanges =  subCategoryRanges;
            },
           /**
            * gets ranges for scale component
            * @returns ranges
            */
            getRanges: function( ){
                    return this.ranges;  
            },
            /**
             * sets ranges for scale component
             * @param ranges
             */
            setRanges: function(ranges){
                this.ranges =  ranges;
            },
            /**
             * gets scale labels for scale component
             * @returns criterias
             */
             getScaleLabels: function( ){
                     return this.scaleLabels;  
             },
             /**
              * sets scale labels for scale component
              * @param criterias
              */
             setScaleLabels: function(  scaleLabels ){
                 this.scaleLabels =  scaleLabels;
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
         * adds criteria for scale component
         * @param criteria
         */
        addCriteria:function(criteria){
        	this.criterias.push(criteria);
        },
        /**
         * removes criteria for scale component
         * @param criteria
         */
        removeCriteria:function(criteria){
        	 var i=0;
        	 for(i in this.criterias){
	    			if(this.criterias[j].getId()==criteria.getId()){
	    				this.criterias.splice(i, 1);
	    			}
	    	 }
        },
        /**
         * adds subCategory for scale component
         * @param subCategory
         */
        addSubCategory:function(subCategory){
        	this.subCategories.push(subCategory);
        },
        /**
         * removes subCategory for scale component
         * @param subCategory
         */
        removeSubCategory:function(subCategory){
        	 var i=0;
        	 for(i in this.subCategories){
	    			if(this.subCategories[j].getId()==subCategory.getId()){
	    				this.subCategories.splice(i, 1);
	    			}
	    	 }
        },
        /**
         * adds statement for scale component
         * @param statement
         */
        addStatement:function(statement){
        	this.statements.push(statement);
        },
        /**
         * removes statement for scale component
         * @param statement
         */
        removeStatement:function(statement){
        	 var i=0;
        	 for(i in this.statements){
	    			if(this.statements[j].getId()==statement.getId()){
	    				this.statements.splice(i, 1);
	    			}
	    	 }
        },
        /**
         * adds range for scale component
         * @param range
         */
        addRange:function(range){
        	this.ranges.push(range);
        },
        /**
         * removes statement for scale component
         * @param statement
         */
        removeRange:function(range){
        	 var i=0;
        	 for(i in this.ranges){
	    			if(this.ranges[j].getId()==range.getId()){
	    				this.ranges.splice(i, 1);
	    			}
	    	 }
        },
        /**
         * adds scale labels for scale component
         * @param criteria
         */
        addScaleLabel:function(scaleLabel){
        	this.scaleLabels.push(scaleLabel);
        },
        /**
         * removes scale labels for scale component
         * @param criteria
         */
        removeScaleLabel:function(scaleLabel){
        	 var i=0;
        	 for(i in this.scaleLabels){
	    			if(this.scaleLabels[i].getId()==scaleLabel.getId()){
	    				this.scaleLabels.splice(i, 1);
	    			}
	    	 }
        },
        /**
         * updates text of content editable divs to the object's editor text
         */
        update:function(){
        	$.each(this.criterias ,function(index,criteria){
				criteria.update();	
			});
			if (this.subCategories != null){
				var subCatList=[];
				$.each(this.subCategories ,function(index,subCategory){
					subCategory.update();	
					subCatList.push({subCategoryId:subCategory.id,subCategory:subCategory.editor.text});
				});
				$.each(this.subCategoryRanges ,function(index,subCategoryRange){
					subCategoryRange.setSubCategories(subCatList);
					subCategoryRange.update();	
				});
			}
			$.each(this.statements ,function(index,statement){
				statement.update();	
			});
			
			$.each(this.ranges ,function(index,range){
				range.update();	
			});
			
			$.each(this.scaleLabels ,function(index,scaleLabel){
				 scaleLabel.update();
			 });
			this.updateMinMaxPoint();
        },
        /**
         * update sub category drop down
         */
        updateSubCategoryDropDown:function(){
        	var subCatList=[];
			$.each(this.subCategories ,function(index,subCategory){
				if($("<div>"+subCategory.editor.text+"</div>").text()!=''){
					subCatList.push({subCategoryId:subCategory.id,subCategory:subCategory.editor.text});
				}
			});
			$.each(this.subCategoryRanges ,function(index,subCategoryRange){
				subCategoryRange.setSubCategories(subCatList);
				subCategoryRange.setdropDownOptions();
				//subCategoryRange.setStatementSubCategories();
			});
			$.each(this.statements ,function(index,statement){				
				statement.afterLayout();
				//subCategoryRange.setStatementSubCategories();
			});
		//	question.activePage.doLayout();
        },
        /**
         * creates copy of the current checkbox component
         * @param event
         */
        copyScaleComponent : function(event){
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
         * layouts html in design mode
         */
        layout:function(){
        	 var htmlelement="";
        	 htmlelement+='<div class="pageSection" id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" ><span class="compMove_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"></span>';
        	 htmlelement+='<div class="pageInnerSection">';
        	 htmlelement+='<div class="pageSectionHeader"><p></p> <span id="componetCollapseSpan_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> <img src="img/comp-minus.png" title="Collapse"> </span><span id="componentNameSpanId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="tophead invisible" style="padding-left: 260px"> Component: Scale  </span><h6 class="pull-right font10" >ID #'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'</h6><p></p></div>';
        	 htmlelement+='<h2 class="tophead">Component: Scales</h2>';
        	 htmlelement+='<div id="compBody_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"  class="pageSectionBody">';
        	 //Scale Label
        	 htmlelement+= this.scaleLabelLayout();
        	 //Sub category
        	 htmlelement+= this.subCategoryLayout();
        	 //Criteria
        	 htmlelement+= this.criteriaLayout();
        	 //statement
        	 htmlelement+= this.statementLayout();
        	 //subCategory Feedback
        	 htmlelement+=this.subCategoryFeedbackLayout();
        	 //range feedback
        	 if(this.feedbackScoringType==="frequency"){
        		 htmlelement+= this.getFrequencyFeedbackLayout();
        	 }else{
        		 htmlelement+= this.rangeFeedbackLayout();
        	 }
       	    
       	    htmlelement+='<div class="eachCol pull-right">';
       	    htmlelement+='   <div style="display:block" class="plusBtn">';
       	    htmlelement+='      <a title="Copy Component" id="quest_plus_'+this.id+'"><img src="img/plus.png"></a>';
       	    htmlelement+='   </div>';
       	    htmlelement+='  <div class="minusBtn">';
       	    htmlelement+='       <a title="Delete Component" id="quest_minus_'+this.id+'"><img src="img/minus.png"></a>';
       	    htmlelement+='   </div>';
       	    htmlelement+='   <div class="clear"></div>';
       	    htmlelement+='</div>';
	       	htmlelement+='</div>';
	     	htmlelement+='<div class="clear"></div>';	 
	       	htmlelement+='</div></div>';	 
       		return htmlelement;
        },
        resetComp : function(){
     		var fullCmpId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
     		var isFrequency=false;
     		if(this.feedbackScoringType == 'frequency'){
     			isFrequency=true;
     		}
     		var flag;
    		if(question.pages[parseInt(this.pageId)-1]==undefined){
    			flag=question.pages[parseInt(this.pageId)-util.checkIfPageDelete(this.pageId)-1].showToStud;
    		}else{
    			flag=question.pages[parseInt(this.pageId)-1].showToStud;
    		}
 			if((this.showToStud!=undefined && question.activePage.showToStud!=undefined && (!flag || !this.showToStud))){
 				this.resetStudentResponsesforBranching(fullCmpId,isFrequency);	
 			}
         },
         /*
          * resets each and every options responses 
          * along with corresponding showToStud flag of page, component and sections
          * */
         resetStudentResponsesforBranching : function(fullCmpId, isFrequency){
        	if(this.notApplicableStudentResponse){
 	    		$("#demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).trigger("click");
 	    		this.notApplicableStudentResponse = false;
 	    	}
        	var j=0;
       		for(j in this.studentResponses){
       				this.studentResponses[j].criteriaId=null;
       		}
       		var k=0;
       		for(k in this.subCategories){
       			var n=0;
   				for(n in this.subCategories[k].studentResponses){
   						this.subCategories[k].studentResponses[n].criteriaId=null;
   				}
       		}
			var compId = this.pageIdPrefix+this.pageId+this.idPrefix+this.id;
			$('#'+compId+' input[type="radio"]:checked').each(function(){
				$(this).prop('checked', false); 
			});
			if(this.isBranched){
		        this.statements[0].setMappedEntities(fullCmpId, false, "", isFrequency, true)
			}
         },
        /**
         * sub category layout
         */
        subCategoryLayout:function(){
        	 var htmlelement="";
        	 if(this.scaleType=='M'){
	        	 htmlelement+='<h2 class="tophead2">Subcategories</h2>';
	        	 htmlelement+='<div class="scaleComponent">';
	        	 htmlelement+='<div class="table" id="subcategory_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
	        	 var lastSubCategory=this.subCategories[this.subCategories.length-1];
	        	 var isLastSubCategory=false;
	        	 $.each(this.subCategories ,function(index,subCategory){
	        		 if(lastSubCategory.id==subCategory.id){
	        			 isLastSubCategory=true;
	        		 }
	        		 htmlelement+=subCategory.layout(isLastSubCategory);
	 			 });
	        	 htmlelement+='</div>';
	        	 htmlelement+='</div>';
        	 }
        	 return htmlelement;
        },
        /**
         * scale label layout
         */
        scaleLabelLayout:function(){
			var htmlelement="";
			htmlelement+='<h2 class="tophead2">Scale Label</h2>';
			htmlelement+='<div  class="rowPagesection1">';
			var firstScaleLabel=this.scaleLabels[this.scaleLabels.length-1];
			var isfirstScaleLabel=false;
			$.each(this.scaleLabels ,function(index,scaleLabel){
				if(firstScaleLabel.id==scaleLabel.id){
					isfirstScaleLabel=true;
				}
				htmlelement+=scaleLabel.layout(isfirstScaleLabel);
			});
			htmlelement+='</div>';
			htmlelement+='<div class="clear"></div>';
			return htmlelement;
        },
        /**
         * criteria layout
         */
        criteriaLayout:function(){
        	var htmlelement="";
        	 htmlelement+='<h2 class="tophead2">Criteria</h2>';
        	 htmlelement+='<div class="scaleComponent">';
        	 var lastCriteria=this.criterias[this.criterias.length-1];
        	 var isLast=false;
        	 var showMinus=true;
        	 if(this.criterias.length==1){
        		 showMinus=false; 
        	 }
        	 var currentScaleComponent=this;
        	 $.each(this.criterias ,function(index,criteria){
        		 
        		 if(lastCriteria.id==criteria.id){
        			 isLast=true;
        		 }
        		 if(currentScaleComponent.feedbackScoringType==="frequency"){
        			 htmlelement+=criteria.layout(isLast,showMinus,true,currentScaleComponent.markers[index]);
        		 }else{
        			 htmlelement+=criteria.layout(isLast,showMinus);
        		 }
 			 });
        	 htmlelement+='</div>';
        	 return htmlelement;
        },
        /**
         * statement layout
         */
        statementLayout:function(){
        	var htmlelement="";
        	 htmlelement+='<div class="rowPagesection">';
        	 htmlelement+=' <div class="colnInner"> ';
	       	 htmlelement+='  <div class="colnInner">  <h2 class="tophead2">Statements</h2></div>';
	       	htmlelement+='    <div class="tophead2" style="text-align:center; margin-left:420px;" >Weight</div>';
	        htmlelement+=' </div> ';
	       	 var isLastStatement=false;
	       	 var showMinus=true;
	       	 if(this.statements.length==1){
	       		 showMinus=false; 
	       	 }
	       	 var lastStatement=this.statements[this.statements.length-1];
	       	 var currentScaleComponent=this;
	       	 $.each(this.statements ,function(index,statement){
	       		 
	       		 if(lastStatement.id==statement.id){
	       			 isLastStatement=true;
	       		 }
	       		 if(currentScaleComponent.feedbackScoringType==="frequency"){
	       			htmlelement+=statement.layout(isLastStatement,showMinus,true);
	       		 }else{
	       			htmlelement+=statement.layout(isLastStatement,showMinus);
	       		 }
	       		 
				 });
	       	 
	       	 htmlelement+='</div>';
	       	 htmlelement+='    <div class="clear"></div>';
	       	 return htmlelement;
        },
        /**
         * subcategory feedback layout
         */
        subCategoryFeedbackLayout:function(){
        	var htmlelement = "";
			if (this.scaleType == 'M') {
				var currentComponent = this;
				if(this.subCategoryRanges.length==0){
					this.createSubCategoryRangeFeedback();
				}
				var isLastSubCatRangeFeedback = false;
				var lastSubCatRangeFeedback = this.subCategoryRanges[ this.subCategoryRanges.length-1];
				$.each(this.subCategoryRanges, function(index, subCategoryRange) {
					if (subCategoryRange.id == lastSubCatRangeFeedback.id) {
						isLastSubCatRangeFeedback = true;
					} else {
						isLastSubCatRangeFeedback = false;
					}
					if (currentComponent.feedbackScoringType === 'frequency') {
						htmlelement += subCategoryRange.frequencyLayout(isLastSubCatRangeFeedback,currentComponent.criterias, currentComponent.markers);
					}else{
						htmlelement += subCategoryRange.layout(isLastSubCatRangeFeedback);	
					}					
	
				});
				htmlelement += '    <div class="clear"></div>';
			}
			return htmlelement;
        },
        /**
		 * range feedback Layout
		 */
        rangeFeedbackLayout:function(){
        	var htmlelement="";
        	var minPoint=this.scaleType=="S"? "Total min. points:" : "Total min. points:";
        	var maxPoint=this.scaleType=="S"? "Total max. points:" : "Total max. points:";
        	htmlelement+='<div id="rangeFeedback'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
         	htmlelement+= '<div class="pageSectionBody range-feedback">'; 
         	htmlelement+= '<div class="headSection">';
       		htmlelement+= '<h6 class="pull-left font18 inputhead tophead">Feedback </h6>';
       		htmlelement+= '<h6 class="pull-left font14 tagtext" style="position:absolute; left:45%"><a id="rangeCollapse_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Collapse scale feedback</a></h6>';
       		htmlelement+= '<h6 class="clear pull-left font18 inputhead tophead">Scoring: '+ this.feedbackScoringType +  ' </h6>';
       		htmlelement+= '</div>';
       		htmlelement+='<div class="clear"></div>';
       		htmlelement+='<div id="rangeFeedback_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="display:block;">';
       		htmlelement+='<div  style="float: left; margin-top: -17px;"><span class="rangeFeedbackVales tophead"> '+minPoint+' </span><span id="min_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> '+this.minPoint+' </span> <span class="rangeFeedbackVales tophead"> '+maxPoint+' </span><span id="max_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"> '+this.maxPoint+' </span></div>';
	       	var showMinus=true;
	       	if(this.ranges.length==1){
	       		showMinus=false; 
	       	}
	       	if(this.feedbackScoringType==="frequency"){
	       		for( j in this.ranges){
          			 htmlelement+=  this.ranges[j].rangeBasedLayoutFrequencyFeedback(false,j,false,this.criterias,this.markers); 
	          	 }	
	       	}else{
	       		for( j in this.ranges){
	          		 if(j==this.ranges.length-1){
	          			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(true,j,showMinus);
	          		 }
	          		 else{
	          			 htmlelement+=  this.ranges[j].rangeBasedLayoutFeedback(false,j,showMinus); 
	          		 }
	          	 }
	       	}
       		htmlelement+= '</div></div></div>';
       	    htmlelement+='<div class="clear"></div>';
       	    return htmlelement;
        },
	     /**
	      * adds event handlers for html  elements after the layout done in design mode
	      */
        afterLayout:function(){
        	ScaleComponent.addEvent( this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._populateComp );
        	ScaleComponent.addEvent("componetCollapseSpan_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseComponent);
        	ScaleComponent.addEvent( "quest_plus_"+this.id, "click", this._copyScaleComponent,{id : this.id});
        	ScaleComponent.addEvent( "quest_minus_"+this.id, "click", this._removeComponent,{id:this.id} );
        	ScaleComponent.addEvent( "rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._collapseRangedBasedFeedback );
		    $("#properties").html(this.propertyLayout());
			this.populateComp();
			$.each(this.criterias ,function(index,criteria){
			//	ScaleComponent.addEvent( this.pageIdPrefix+this.pageId+this.idPrefix+this.id+"RF"+criteria.id, "blur", this._updateCriteriaFeedback );
				criteria.afterLayout();
			});
			if(this.subCategories != null){
				$.each(this.subCategories ,function(index,subCategory){
					subCategory.afterLayout();	
				});
				$.each(this.subCategoryRanges ,function(index,subCategoryRange){
					subCategoryRange.afterLayout();	
				});
				if(this.subCategories.length==1){
					$("#minus_"+this.subCategories[0].editor.id).hide();
				}
				if(this.subCategoryRanges.length==1){
					$("#minus_"+this.subCategoryRanges[0].componentIdPrefix+this.subCategoryRanges[0].componentId+this.subCategoryRanges[0].idPrefix+this.subCategoryRanges[0].id).hide();
				}
			}
			$.each(this.statements ,function(index,statement){
				statement.afterLayout();	
			});
			$.each(this.ranges ,function(index,range){
				range.afterLayout();	
			});
			 $.each(this.scaleLabels ,function(index,scaleLabel){
				 scaleLabel.afterLayout();
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
         * toggle hide/show feedback
         */
        toggleRangedBasedFeedback : function(){
       	 var $divObj = $("#rangeFeedback_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id);
       	 if($divObj.is(":visible")){
       		 $("#rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).html("Expand scale feedback");
       		 $divObj.hide("slow");
       	 }else{
       		 $("#rangeCollapse_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).html("Collapse scale feedback");
       		 $divObj.show("slow");
       	 }
        },
        /**
		 * populate component properties
		 */
        populateComp:function(){
        	
         	$("#properties").html(this.propertyLayout());
         	this.updateMinMaxForSubCat();
        	this.afterPropertyLayout();
        	$("#elementProperties").hide();
        	$("#properties").show();  
        	$("#optionsRadios1").hide();
        	$("#optionsRadios2").hide();
        	$('#exemptsScale').hide();
            $("#mediaProperties").hide();

        	if (this.scaleType === 'S') {
				$("#mode").html("Single category <span class='caret caretDrop'></span>");
				$("#showSubCHK").hide();
				$('#studentOpts').css("margin-bottom","90px");
				$("#notApplicableOptionId").show();
			} else if (this.scaleType === 'M') {
				$("#mode").html("Multicategory <span class='caret caretDrop'></span>");
				$("#notApplicableOptionId").hide();
			}
        	if (this.feedbackScoringType === 'sum') {
    			$("#feedbackMode").html("Sum  <span class='caret caretDrop'></span>");
    			if(this.hideSubCategoryToStudent)
				{
    				$('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", true);
	    			$('#notApplicableOptionId').addClass("disabledText");
				}
    		} else  if (this.feedbackScoringType === 'average') {
    			$("#feedbackMode").html("Average  <span class='caret caretDrop'></span>");
    			if(this.hideSubCategoryToStudent)
				{
    				$('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", true);
	    			$('#notApplicableOptionId').addClass("disabledText");
				}
    		}else  if (this.feedbackScoringType === 'frequency') {
    			$("#feedbackMode").html("Frequency  <span class='caret caretDrop'></span>");
    			$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", true);
    			$("#showPntToStud").addClass("disabledText");
    			//$('#showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", true);
			 	$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("disabledText");
			 	$("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", true);
			 	$('#notApplicableOptionId').addClass("disabledText");
			 	//$('#studentOpts').addClass("disabledText");
			 	
    		}
        	if(this.showPointsToStudents==true)
        		$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	else
        		$('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	
        	if(this.hideSubCategoryToStudent==true)
        		$('#showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	else
        		$('#showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	
        	if(this.awardMaximum){
        		$("#optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	}else{
        		$("#optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	}
        	if(this.awardMinimum){
        		$("#optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	}else{
        		$("#optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false);
        	}
        	if(this.notApplicable){	
	        	  $("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked", true);
	      		  $('#optionsRadios1').show();
	      		  $('#optionsRadios2').show();
	      		  $('#exemptsScale').show();
	    	}else{
	    		//  $("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked", false);
	    		  $('#optionsRadios1').hide();
	      		  $('#optionsRadios2').hide();
	      		  $('#exemptsScale').hide();
	    	}
        	if(this.notApplicableExemptsScale==true)
        		$('#exemptsScale'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
        	else
        		$('#exemptsScale'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",false); 
        	if (this.scaleType === 'M') {
        		this.selectMultiCategoryScaleType();
    	  }
	        if($("#optionDropDownId").is(":visible")){
	        	if($("#optionDropDownId").parent().hasClass("open")){
	        		$("#optionDropDownId").click();
	        	}
	        	$("#optionDropDownId").hide();
	        }
	        
	        if(this.scaleType=='M'){
	        	
	        }else{
	        	if (this.feedbackScoringType != 'frequency') {
	        	 $('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", false);
	    		 $('#notApplicableOptionId').removeClass("disabledText");
	        	} 
	        }
        },
        /**
	      * opens help modal popup for check box component
	      * @param event
	      */
	     openHelpModalForScaleComponent : function(event){
	    	 new Modal({id : 1,headingText : message.getScaleCompHeading(),containtText : message.getScaleCompMsg()}).openHelpModal();
	     },
        /**
	      * adds event hadlers for elements present in component editor property pane
	      */
        afterPropertyLayout:function(){
        	ScaleComponent.addEvent( "scaleComponentHelpId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._openHelpModalForScaleComponent);
        	ScaleComponent.addEvent( this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._populateComp );	    	
     		ScaleComponent.addEvent("notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOption); 
     		ScaleComponent.addEvent("save", "click", this._clickSave); 
     		ScaleComponent.addEvent( "singleCategory"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeScaleType,{"scaleType":"S"});
     		ScaleComponent.addEvent( "multiCategory"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeScaleType,{"scaleType":"M"});
     		ScaleComponent.addEvent("showPntToStud"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._showPointToStudent);
     		ScaleComponent.addEvent("showSubToStud"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._showSubCatToStudent);
     		ScaleComponent.addEvent("exemptsScale"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._exemptsScale);
     		ScaleComponent.addEvent("optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOptionValue);
     		ScaleComponent.addEvent("optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "click", this._notApplicableOptionValue);
     		ScaleComponent.addEvent( "sumFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"sum"});
     		ScaleComponent.addEvent( "averageFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"average"});
     		ScaleComponent.addEvent( "frequencyFeedbackScoring"+this.pageIdPrefix+this.pageId+this.idPrefix +this.id, "click", this._changeFeedbackScoringType,{"feedbackScoringType":"frequency"});     		
	     },
	     
	     /**
          * layouts component property pane in design mode
          * @returns {String}
          */
         propertyLayout:function(){
        	 var htmlelement='';
        	 var notApplicableText=this.scaleType=="S"? "" : "Exempts remainder of subcategory";
        	 htmlelement+='   <div class="head-info">';
	    	 htmlelement+='       <a id="scaleComponentHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon" ></a>Component: Scales';
	    	 htmlelement+='   </div>';
	    	 htmlelement+='   <div class="clear"></div>';
	    	 htmlelement+='   <div class="tabContent tabProContent">';
	    	 htmlelement+='		<label id="scaleID"> ID# '+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'</label>';
	    	 htmlelement+='   </div>';
	    	 htmlelement+='   <div class="clear"></div>';
	    	 var isBranchedLbl = "";
        	 /*check if component is used for branching*/
        	 if(this.isBranched){
        		 isBranchedLbl="This component is branched";
        	 }
        	 htmlelement+='   <div class="componentTytle" id="isBranchedLabel_'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">'+isBranchedLbl+'</div>';
	    	 htmlelement+='   <div id="scaleType">';
	    	 htmlelement+='        <div class="head-info typeInput">';
	    	 htmlelement+='            <a id="scaleTypeHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon"></a>Scale type:';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='       <div class="tabContent tabProContent">';
	    	 htmlelement+='           <div class="btn-group customDropdown" style="margin-bottom: 10px;">';
	    	 htmlelement+='                <button data-toggle="dropdown" id="mode" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	    	 htmlelement+='                    Single category<span class="caret caretDrop"></span>';
	    	 htmlelement+='                </button>';
	    	 htmlelement+='                <ul class="dropdown-menu">';
	    	 htmlelement+='                    <li id="singleCategory'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Single Category</a>';
	    	 htmlelement+='                    </li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="multiCategory'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Multicategory</a>';
	    	 htmlelement+='                    </li>';
	    	 htmlelement+='                </ul>';
	    	 htmlelement+='            </div>';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="clear"></div>';
	    	 htmlelement+='   <div id="feedbackScoringType">';
	    	 htmlelement+='        <div class="head-info typeInput">';
	    	 htmlelement+='            <a id="scaleFeedbackHelpId'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="info-icon"></a>Feedback scoring:';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='       <div class="tabContent tabProContent">';
	    	 htmlelement+='           <div class="btn-group customDropdown" style="margin-bottom: 10px;">';
	    	 htmlelement+='                <button data-toggle="dropdown" id="feedbackMode" class="btn btn-default btn-authorText dropdown-toggle" type="button">';
	    	 htmlelement+='                    Sum<span class="caret caretDrop"></span>';
	    	 htmlelement+='                </button>';
	    	 htmlelement+='                <ul class="dropdown-menu">';
	    	 htmlelement+='                    <li id="sumFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Sum</a></li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="averageFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Average</a></li>';
	    	 htmlelement+='                    <li class="divider"></li>';
	    	 htmlelement+='                    <li id="frequencyFeedbackScoring'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><a>Frequency</a></li>';
	    	 htmlelement+='                </ul>';
	    	 htmlelement+='            </div>';
	    	 htmlelement+='        </div>';
	    	 htmlelement+='    </div>';
	    	 htmlelement+='    <div class="clear"></div>';
	    	 htmlelement+='   <div id="studentOpts" class="studOptGrid">';
	    	 htmlelement+='  		<span id="showPntToStud">';
        	 htmlelement+=' 			<input type="checkbox" id="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+=' 			<label for="showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Show points to students</label>'; 
        	 htmlelement+='			</span>';
        	 
        	 htmlelement+='  		<span id="showSubCHK">';
        	 htmlelement+=' 			<input type="checkbox" id="showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 htmlelement+=' 			<label for="showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Hide subcategory properties from students</label>'; 
        	 htmlelement+='			</span>';
        	 
        	 if(this.feedbackScoringType==="frequency"){
	        	 htmlelement+='  		<span id="notApplicableOptionId" class="disabledText">';
	        	 htmlelement+=' 			<input type="checkbox"  disabled="disabled" id="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
	        	 htmlelement+='				<label for="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Not applicable option<br><i style="font-size: 11px; margin-left: 15px;">'+notApplicableText+'</i></label>'; 
	        	 htmlelement+='			</span>';
	        	 htmlelement+='  	<div style="padding-left:10px;" class="disabledText">';
	        	 htmlelement+='  		<span id="optionsRadios1">';
	        	 htmlelement+='   			<input type="radio" disabled="disabled" value="Optional" id="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
	        	 htmlelement+='   			<label for="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award maximum points</label> <input type="radio" id="Radio2" name="displayBranchingMode">';        	 
	        	 htmlelement+='			</span>';
	        	 htmlelement+='  		<span id="optionsRadios2">';
	        	 htmlelement+='   			<input type="radio" disabled="disabled" value="Optional" id="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
	        	 htmlelement+='     		<label for="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award minimum points</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
	        	 htmlelement+='			</span>';
        	 }else{
        		 htmlelement+='  		<span id="notApplicableOptionId">';
	        	 htmlelement+=' 			<input type="checkbox" id="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
	        	 htmlelement+='				<label for="notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Not applicable option<br><i style="font-size: 11px; margin-left: 15px;">'+notApplicableText+'</i></label>'; 
	        	 htmlelement+='			</span>';
	        	 htmlelement+='  		<div style="padding-left:10px;"><span id="optionsRadios1">';
	        	 htmlelement+='   			<input type="radio" value="Optional" id="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
	        	 htmlelement+='   			<label for="optionsRadios1'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award maximum points</label> <input type="radio" id="Radio2" name="displayBranchingMode">';        	 
	        	 htmlelement+='			</span>';
	        	 htmlelement+='  		<span id="optionsRadios2">';
	        	 htmlelement+='   			<input type="radio" value="Optional" id="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" name="optionsRadios">';
	        	 htmlelement+='     		<label for="optionsRadios2'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'"><span></span>Award minimum points</label> <input type="radio" id="Radio4" name="displayBranchingMode">';
	        	 htmlelement+='			</span>';
        	 }
        	 
        	 htmlelement+='   <div id="exemptsScale" class="studOptGrid">';
        	 htmlelement+='  		<span id="exemptsScale" class="studOptGrid">';
        	 //htmlelement+='   			<input type="checkbox" id="exemptsScale'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'">';           
        	 //htmlelement+=' 			<label for="exemptsScale'+this.pageIdPrefix+this.pageId+this.idPrefix +this.id+'"><span></span>Exempts scale</label>'; 
        	 htmlelement+='			</span>';
        	 htmlelement+='		</div></div>';
        	 htmlelement+='		</div>';
        	 htmlelement+='    <div class="clear"></div>';
        	
             htmlelement+='</div>';
        	
        	 return htmlelement;
	     },    
	     
	        notApplicableOption:function(){  
	        	//var naflag=null;
	        	  if($("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){	        		 
	        		  $('#optionsRadios1').show();
	        		  $('#optionsRadios2').show();
	        		   $('#exemptsScale').show();
	        		  this.notApplicable=true;  
	        		  this.notApplicableExemptsScale = true;
	        		  this.awardMaximum = true;
	        		  this.awardMinimum = false;
	        		  $("#optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);	        		  
	  	    	  }else{
	  	    		  $('#optionsRadios1').hide();
	        		  $('#optionsRadios2').hide();
	        		   $('#exemptsScale').hide();
	        		  this.notApplicable=false;	  
	        		  this.awardMaximum = false;
	        		  this.awardMinimum = false;
	        		  this.notApplicableExemptsScale = false;
	        		  //this.notApplicableStudentResponse = false;
	        	  }
	        	  if (this.scaleType === 'M') {
	        		  this.selectMultiCategoryScaleType();
	        	  }
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
        		this.state="collapse";
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).removeClass("invisible");
        		$comp.prev().hide();
                $(".compMove_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("dragComp");
        	}else{
        		$comp.show('slow');
        		$snap.find("img").attr("src","img/comp-minus.png");
        		tooltip.attr("title","Collapse");
        		$("#componentNameSpanId"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).addClass("invisible");
        		this.state="expand";
        		$comp.prev().show();
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
         * validate if component is filled
         */

        validateComponent:function(object){
            var isComplete=true;
            var validRange =true;
            var rangeError={};
            $.each(this.criterias ,function(index,criteria){
            	isComplete=isComplete && criteria.isCriteriaComplete();
			});
			if(this.scaleType=='M'){
				var x=0;
				for(x in this.subCategories){
					isComplete=isComplete && this.subCategories[x].isSubCategoryComplete();
					var selectedStatements = this.getStatementIdsForSubcategory(this.subCategories[x]);
					this.subCategories[x].statementIds=selectedStatements;
					this.subCategories[x].studentResponses=this.setDefaultStudentResponses(selectedStatements);
				}
				var i=0;
				for( i in this.subCategoryRanges){
					if(this.subCategoryRanges[i].subCategoryId==null){
						//commented to fix issue 33403
						//this.subCategoryRanges.splice(i,1);
					}
				}
				//validate sub category ranges
				var j=0;
				for( j in this.subCategoryRanges){
					//if valid then proceed for next sub category range else break
					if(validRange){
						var k=0;
			            for( k in this.subCategoryRanges[j].ranges){
			          	   var validatorObj=this.subCategoryRanges[j].ranges[k].validateRange();
			 					validRange=validRange && validatorObj.status;
			 					if(!validRange && validatorObj.message != undefined){
			 						rangeError.message=validatorObj.message;
			 	   					rangeError.field=validatorObj.field;	
			 	   					break;
			 					}
			 					
			            }
					}else{
						break;
					}
					
				}
				
			}else{
				this.studentResponses=this.setDefaultStudentResponses(null);
			}
			
			$.each(this.statements ,function(index,statement){
				isComplete=isComplete && statement.isStatementComplete();	
			});
			
			$.each(this.scaleLabels ,function(index,scaleLabel){
				isComplete=isComplete && scaleLabel.isScaleLabelFilled();
			 });
			//if valid then proceed for comp based range validation
			if(validRange){
				var l=0;
	            for( l in this.ranges){
	          	   var validatorObj=this.ranges[l].validateRange();
	 					validRange=validRange && validatorObj.status;
	 					if(!validRange && validatorObj.message != undefined){
	 						rangeError.message=validatorObj.message;
	 	   					rangeError.field=validatorObj.field;	
	 	   					break;
	 					}
	 					
	            }
			}
			
           
			 if(!isComplete){
		          object.flag = true;
		          object.completeFlag = true;
		          object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id; 
		       }
			 if(!validRange){
   				 object.flag = true;
   				 object.rangeflag = true;
   				 object.errorMsg+="<br> On Part : "+this.pageIdPrefix+this.pageId+ " Component : "+this.idPrefix +this.id;
   				 object.errorMsg+="<br> "+rangeError.message;
   				 object.field=rangeError.field;
   		   }
		  return object;
       },

       /**
		 * check if question is answered
		 */

       validateStudentQuestionLayout:function(){
			return this.isStudentAnswered();
       },
       /**
        * get Selected statements for sub category
        * @param subCategory
        * @returns {Array}
        */
       getStatementIdsForSubcategory:function(subCategory){
    	    var k=0;
	   		var statementIds=[];
	   		for(k in this.statements){
	   			//var result = this.statements[k].subCategoryIds.indexOf(subCategory.id.toString());	
	   			if(this.statements[k].subCategoryIds==subCategory.id)
	   			//if(result!=-1)
   				{
	   				statementIds.push(this.statements[k].id);
   				} 
	   		}
	   		return statementIds;
       },
       /**
        * 
        */
       setDefaultStudentResponses:function(selectedStatementIds){
    	   var studentResponses=[];
    	   if(selectedStatementIds==null){
	   	   		for(k in this.statements){
	   	   			studentResponses.push({statementId:this.statements[k].id,criteriaId:null}); 
	   	   		}
    	   }else{
    		   var k=0;
	   	   		for(k in selectedStatementIds){
	   	   			studentResponses.push({statementId:selectedStatementIds[k],criteriaId:null}); 
	   	   		}
	   	   		
    	   }
    	   return studentResponses;
       },
       /**
        * construct scale component using json obj
        */
       deserialize:function(jsonObj){
    	   var subCategories=null;
    	   var subCategoryRanges=null;
    	    if(jsonObj.scaleType=='M'){
    	    	subCategories=[];
    			var cnt = 0;
    			for (cnt in jsonObj.subCategories) {
    				var subCatObj = new ScaleSubCategory(jsonObj.subCategories[cnt]);
    				var editor = new Editor(jsonObj.subCategories[cnt].editor);
    				subCatObj.setEditor(editor);
    				subCategories.push(subCatObj);
    			}
    			subCategoryRanges=[];
    			var rcnt=0;
    			for(rcnt in jsonObj.subCategoryRanges){
    				var subCatRange = new SubCategoryRange(jsonObj.subCategoryRanges[rcnt]);
    				var m=0;
    				if (jsonObj.subCategoryRanges[rcnt].ranges != null) {
    					var ranges = [];
    					for (m in jsonObj.subCategoryRanges[rcnt].ranges) {
    						var rangeObj = new Range(jsonObj.subCategoryRanges[rcnt].ranges[m]);
    						var minRangeEditor = new NumericEditor(
    								jsonObj.subCategoryRanges[rcnt].ranges[m].minRangeEditor);
    						var maxRangeEditor = new NumericEditor(
    								jsonObj.subCategoryRanges[rcnt].ranges[m].maxRangeEditor);
    						var rangeFeedbackEditor = new Editor(
    								jsonObj.subCategoryRanges[rcnt].ranges[m].rangeFeedbackEditor);
    						rangeObj.setMinRangeEditor(minRangeEditor);
    						rangeObj.setMaxRangeEditor(maxRangeEditor);
    						rangeObj.setRangeFeedbackEditor(rangeFeedbackEditor);
    						ranges.push(rangeObj);
    					}
    					subCatRange.setRanges(ranges);
    				}
    				subCategoryRanges.push(subCatRange);
    			}
    			
    	    }
			var criterias = [];
			var i = 0;
			for (i in jsonObj.criterias) {
				var criteriaObj = new ScaleCriteria(jsonObj.criterias[i]);
				var editor = new Editor(jsonObj.criterias[i].editor);
				var pointEditor = new NumericEditor(jsonObj.criterias[i].pointEditor);
				var feedbackEditor = new Editor(jsonObj.criterias[i].feedbackEditor);
				criteriaObj.setEditor(editor);
				criteriaObj.setPointEditor(pointEditor);
				criteriaObj.setFeedbackEditor(feedbackEditor);
				criterias.push(criteriaObj);
			}
			
			var scaleLabels = [];
			var i = 0;
			for (i in jsonObj.scaleLabels) {
				var scaleLabelObj = new ScaleLabel(jsonObj.scaleLabels[i]);
				var editor = new Editor(jsonObj.scaleLabels[i].editor);
				scaleLabelObj.setEditor(editor);
				scaleLabels.push(scaleLabelObj);
			}
			
			var statements = [];
			var j = 0;
			for (j in jsonObj.statements) {
				var statementObj = new Statement(jsonObj.statements[j]);
				var editor = new Editor(jsonObj.statements[j].editor);
				var weightEditor = new NumericEditor(jsonObj.statements[j].weightEditor);
				statementObj.setEditor(editor);
				statementObj.setWeightEditor(weightEditor);
				statements.push(statementObj);
			}
			var compObj = new ScaleComponent(jsonObj);
			compObj.scaleType=jsonObj.scaleType;
			compObj.setCriterias(criterias);
			compObj.setStatements(statements);
			compObj.setSubCategories(subCategories);
			compObj.setSubCategoryRanges(subCategoryRanges);
			compObj.setScaleLabels(scaleLabels);
			if (jsonObj.ranges != null) {
				var ranges = [];
				for (l in jsonObj.ranges) {
					var rangeObj = new Range(jsonObj.ranges[l]);
					var minRangeEditor = new NumericEditor(
							jsonObj.ranges[l].minRangeEditor);
					var maxRangeEditor = new NumericEditor(
							jsonObj.ranges[l].maxRangeEditor);
					var rangeFeedbackEditor = new Editor(
							jsonObj.ranges[l].rangeFeedbackEditor);
					rangeObj.setMinRangeEditor(minRangeEditor);
					rangeObj.setMaxRangeEditor(maxRangeEditor);
					rangeObj.setRangeFeedbackEditor(rangeFeedbackEditor);
					ranges.push(rangeObj);
				}
				compObj.setRanges(ranges);
			}
			return compObj;
	      
       },
       /*
        * function to save scale type
        */ 

	    changeScaleType : function(event) {
	    	if(this.awardMaximum==false && this.awardMinimum==false){
				this.awardMaximum=true;
			}
			if (typeof event.data === 'undefined') {
				this.scaleType = 'S';
			} else {
				this.scaleType = event.data.scaleType;
				if (this.scaleType === 'S') {
					if(this.subCategories!=null){
						this.subCategories = null;
						this.subCategoryRanges = null;
					}					
					$("#mode").html("Single category  <span class='caret caretDrop'></span>");
					$("#showSubCHK").hide();
				} else  if (this.scaleType === 'M') {
					this.notApplicable = false;
					this.createSubcategories();
					this.selectMultiCategoryScaleType();
					$("#showSubCHK").show();
        	  }
				
				page.doLayout();
				this.populateComp();
			}
	    },
	    /*
	     * function to save multi-category scale type
	     */
	    selectMultiCategoryScaleType : function(){	    	
			$("#mode").html("Multicategory  <span class='caret caretDrop'></span>");
			$('#optionsRadios1').hide();
    		  $('#optionsRadios2').hide();
    		   $('#exemptsScale').hide();	        		    
    		  this.awardMaximum = false;
    		  this.awardMinimum = false;	        		  
    		  if($("#notApplicableOption"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
    			  this.notApplicable = true;
    			  this.notApplicableExemptsScale = true;
    		  }
    		  else{
    			  this.notApplicable=false; 
    			  this.notApplicableExemptsScale = false;
    		  }
	    },
	    /*
	     * creates subCategories;
	     */
	    createSubcategories : function(){
	    	var subCategories = [];
	    
			var categoryConfig = {
				componentId : this.id,
				componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix
			};
			for (var i=1;i<=4;i++){
				categoryConfig.id=i;
				subCategories.push(new ScaleSubCategory(categoryConfig));
			}
			
			this.setSubCategories(subCategories);
			this.subCategoryRanges=[];
			this.createSubCategoryRangeFeedback();
	    },
	    /***/
	    createSubCategoryRangeFeedback : function(){
	    	var subCatList=[];
	    	$.each(this.subCategories,function(index,value){
	    		subCatList.push({subCategoryId:value.id,subCategory:value.editor.text});
	    	});
			var subCatRangeConfig = {
					id : 1,
					componentId : this.id,
					componentIdPrefix : this.pageIdPrefix+this.pageId+this.idPrefix,
					subCategories:subCatList
				};
			var subCategoryRange = new SubCategoryRange(subCatRangeConfig);
			var range=new Array();
			var rangeConfig = {
					componentId : this.id,
					componentIdPrefix :  this.pageIdPrefix+this.pageId+this.idPrefix+this.id+subCategoryRange.idPrefix,
					parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
					allowNegative:true
				};
			var rangesLength = 3;
			if(this.feedbackScoringType==="frequency"){
				rangesLength = this.criterias.length;
			}
			for (var i=1;i<=rangesLength;i++){
				rangeConfig.id=i;
				range.push(new Range(rangeConfig));	
			}
			subCategoryRange.setRanges(range);
		
			this.subCategoryRanges.push(subCategoryRange);
	    },
	    /*
	     * function to save show points to student checkbox value
	     */
	    showPointToStudent:function(){	    	
	    	 if($('#showPntToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
	    		 this.showPointsToStudents=true;
	    	 }
	    	 else{
	    		this.showPointsToStudents=false; 	    	
	    	 }
	    },	  
	    /*
	     * function to save show Subcategory to student checkbox value
	     */
	    showSubCatToStudent:function(){	    	
	    	 if($('#showSubToStud'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
	    		 this.hideSubCategoryToStudent=true;	    	
	    		 $('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", true);
	    		 $('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked", false);
	    		 $('#notApplicableOptionId').addClass("disabledText");
	    		 //this.notApplicable = false; // commented to fix the issue CTST-2334 scenario
	    	 }
	    	 else{
	    		 this.hideSubCategoryToStudent=false; 
	    		 if(this.feedbackScoringType != 'frequency')
	    		 {
	    			 $('#notApplicableOption'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("disabled", false);
	    			 $('#notApplicableOptionId').removeClass("disabledText");
	    	 	}
	    	 }
	    },
	    /*
	     * function to save Exempts scale checkbox value
	     */
	    exemptsScale:function(){	    
	    	 if($('#exemptsScale'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop('checked')){
	    		 this.notApplicableExemptsScale=true;
	    	 }
	    	 else{
	    		this.notApplicableExemptsScale=false; 	    	
	    	 }
	    },
	    /*
	     * function to save Award maximum points or Award minimum points radio button value
	     */
	    notApplicableOptionValue:function(){
	    	if($("#optionsRadios1"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
	    		this.awardMaximum = true;
	    	}else {
	    		this.awardMaximum = false;
	    	}
	    	if($("#optionsRadios2"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked")){
	    		this.awardMinimum = true;
	    	}else {
	    		this.awardMinimum = false;
	    	}
	    },
	    /*
	     * calculate and update min max points for scale feedback
	     */
	    updateMinMaxPoint:function(){
			var minCriteriaPoint = 0;
			var maxCriteriaPoint = 0;
			var criteriaPoints = [];
			var i = 0;
	
			for (i in this.criterias) {
				if (this.criterias[i].pointEditor.text != '') {
					criteriaPoints.push(parseFloat(this.criterias[i].pointEditor.text));
				}
	
			}
			criteriaPoints = criteriaPoints.sort(function(a, b) {
				return a > b ? 1 : a < b ? -1 : 0;
			});
			minCriteriaPoint = criteriaPoints[0];
			this.minPoint = minCriteriaPoint != undefined ? minCriteriaPoint : 0;
			maxCriteriaPoint = criteriaPoints[criteriaPoints.length - 1] ;
			this.maxPoint = maxCriteriaPoint!= undefined ? maxCriteriaPoint : 0;
			if(this.scaleType=='S'){
				var j = 0;
				var minPoint = 0;
				var maxPoint = 0;
				for (j in this.statements) {
					if (this.statements[j].weightEditor.text != '') {
						if(parseFloat(this.statements[j].weightEditor.text)<0)
						{
							minPoint += maxCriteriaPoint* parseFloat(this.statements[j].weightEditor.text); 
							maxPoint += minCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
						}
						else
						{
							minPoint += minCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
							maxPoint += maxCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
						}
					}
				}
				this.minPoint = minPoint<=maxPoint?minPoint:maxPoint;
				this.maxPoint = maxPoint>=minPoint?maxPoint:minPoint;
			}else{
				var k=0;
				var minPoint = 0;
				var maxPoint = 0;
				for (k in this.subCategories){
					var minPointSubCat = 0;
					var maxPointSubCat = 0;
					var selectedStatements = this.getStatementIdsForSubcategory(this.subCategories[k]);
					this.subCategories[k].statementIds=selectedStatements;
					var x=0;
					for(x=0; x < selectedStatements.length;x++ )
					{
						var j = 0;
						for (j in this.statements) {
							if(this.statements[j].id==selectedStatements[x]){
								if (this.statements[j].weightEditor.text != '') {
									if(parseFloat(this.statements[j].weightEditor.text)<0)
									{
										minPoint += maxCriteriaPoint* parseFloat(this.statements[j].weightEditor.text); 
										minPointSubCat += maxCriteriaPoint* parseFloat(this.statements[j].weightEditor.text); 
										maxPoint += minCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
										maxPointSubCat += minCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
									}
									else
									{
										minPoint += minCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
										maxPoint += maxCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
										minPointSubCat += minCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
										maxPointSubCat += maxCriteriaPoint* parseFloat(this.statements[j].weightEditor.text);
									}
								}
							}
							
						}
						
					}
					this.subCategories[k].minPoint = minPointSubCat<=maxPointSubCat?minPointSubCat:maxPointSubCat;
					this.subCategories[k].maxPoint = maxPointSubCat>=minPointSubCat?maxPointSubCat:minPointSubCat;
				}
				this.minPoint = minPoint<=maxPoint?minPoint:maxPoint;
				this.maxPoint = maxPoint>=minPoint?maxPoint:minPoint;
			}
			this.minPoint = !isNaN(this.minPoint) ? this.minPoint : 0;
			this.maxPoint = !isNaN(this.maxPoint) ? this.maxPoint : 0;
			
			if(this.feedbackScoringType=="average"){
				this.minPoint = this.minPoint / this.statements.length; 
				this.maxPoint = this.maxPoint / this.statements.length;
				var minSign = false;
				var maxSign = false;
				
				if(this.minPoint<0)
					minSign=true;
				if(this.maxPoint<0)
					maxSign=true;
				//this.minPoint = Math.abs(this.minPoint);
				//this.maxPoint = Math.abs(this.maxPoint);
				
			}
			var multiplier = Math.pow(10, 2);
			this.minPoint = Math.round(this.minPoint * multiplier) / multiplier;
			this.maxPoint = Math.round(this.maxPoint * multiplier) / multiplier;
			
			$("#min_" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).text(this.minPoint);
			$("#max_" +this.pageIdPrefix + this.pageId + this.idPrefix + this.id).text(this.maxPoint);
			//$("#min_" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).text(minSign?this.minPoint*-1:this.minPoint);
			//$("#max_" + this.pageIdPrefix + this.pageId + this.idPrefix + this.id).text(maxSign?this.maxPoint*-1:this.maxPoint);
	    },
	    updateMinMaxForSubCat:function(){
	    	if(this.subCategoryRanges!=null){
	    		$.each(this.subCategoryRanges ,function(index,subCategoryRange){
					subCategoryRange.update();	
				});
	    	}
	    	
	    },
	    /**
         * layouts in instructor mode
         * @returns {String}
         */
        instructorLayout:function(){
	       	var htmlelement='';
	   		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection">';
	   		htmlelement+='<div  class="acceptAnyAnsBanner acceptAnyAnsBannerInstructor prevQuestInstructor" style="margin-left:50px;">This question accepts all answers.</div>';
	   		htmlelement +='<div class="clear" style="padding-top:10px;"></div>';
	   		var i=0;
	   		for(i in this.scaleLabels){
	   			htmlelement +=this.scaleLabels[i].instructorLayout();
	   		}
	   		htmlelement +='<div class="container scaleMargin prevQuestInstructor">';
	   		htmlelement +='<div class="row">';
	   		htmlelement +='<div id="hiddenDivForScale" style="display:none;"></div>';
	   		var criteriaLayout='';
	   		var showCriteriaPoints = true;
	   		var j=0;
	   		var isLast=false;
	   		var lastCriteria=this.criterias[this.criterias.length-1];
	   		for(j in this.criterias){
	   			if(lastCriteria.id==this.criterias[j].id){// Todo For last criteriya border style 
	   		   		isLast=true;
	   		   	}
	   			criteriaLayout+=this.criterias[j].instructorLayout(parseInt(j)+1, showCriteriaPoints,isLast,this.feedbackScoringType);
	   		}
	   		
	   		if(this.scaleType=="S"){
	   			htmlelement +='<div class="">';
	   			htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
	   			if(this.notApplicable){
	   				htmlelement +='<div class="prevQuestInstructor"><input type="checkbox" class="css-checkbox" disabled id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
	   			}
	   			htmlelement +='<div class="" style="clear:both;">';
	   			htmlelement +='<div class="col-sm-12 rotate-head">';
	   			htmlelement += criteriaLayout;
	   			htmlelement +='</div>';
	   			
	   			htmlelement += this.instructorStatementLayout(null,null);
	   			htmlelement +='</div>';
	   			htmlelement +='</div>';
	   			htmlelement +='</div>';
	   		}else{
	   			
	   			var k=0;
	   			for(k in this.subCategories){
	   				if(this.subCategories[k].statementIds.length>0){

	   					var subCatText = util.getImageLayout(this.subCategories[k].editor.text);
                            subCatText = util.getVideoLayout(subCatText);
	   					htmlelement +='<div action="#" class="headTxt answerTick"><b>'+subCatText+'</b> </div>';
 						   					 
	   					htmlelement +='<div class="col-lg-10 bottom-col scaleSubMargin" >';
		   				htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
			   			htmlelement += this.instructorStatementLayout(this.subCategories[k],criteriaLayout);
			   			htmlelement +='</div>';
			   			htmlelement +='</div>';
	   				}
	   			}
	   		}
	   		htmlelement +='</div>';
    		htmlelement +='</div>';
    		
    		var y=0;
	   		var subCategoryRangeLayout = '';
	   		for(y in this.subCategoryRanges){
	   			subCategoryRangeLayout +=this.subCategoryRanges[y].instructorLayout();
	   		}
	   		
	   		if( subCategoryRangeLayout != '' ){
	   			htmlelement += '<div class="container">';
	   			htmlelement += '	<div action="#" class="headTxt HeadingWidth"><b>Feedback: </b></div>';
	   			htmlelement +='<div class="clear"></div>';
	   			htmlelement += 		subCategoryRangeLayout;
	   			htmlelement += '</div>';
	   		}
    		
    		var x=0;
	   		var rangeBasedFeedback = '';
	   		var frequencyFeedbackHtml = '';	   		
	   		for(x in this.ranges){
	   			rangeBasedFeedback +=this.ranges[x].instructorLayout();
	   		}
	   		if(this.feedbackScoringType === "frequency"){
	   			var overallFeedback = '';
	   			var individualFeedbacks = '';
	   			for( j in this.criterias){
	   				overallFeedback +=  this.criterias[j].instructorFeedbackLayout(j,this.markers);
   	        	}
	   			
	   			if(overallFeedback !== ""){
	   				overallFeedback = '<div style="margin-left:50px;" action="#" class="headTxt"><b>Range-based feedback:</b></div>' + overallFeedback;	   				
	   			}
	   			
	   			if(this.scaleType==="S"){
	   				frequencyFeedbackHtml = overallFeedback;
	   			}else{	   					   				
	   				var outer, inner;	
	   				var subcategoryhtml = "";
	   				var obj = "";
	   				var subid = "";
	   				var itshtml = "";
	   				
	   				for(outer in this.subCategoryRanges){
	   					for(inner in this.subCategoryRanges[outer].ranges){
	   					//generate sub cateogry html
	   						if(subid !== this.subCategoryRanges[outer].ranges[inner].parent.id){
	   							subid = this.subCategoryRanges[outer].ranges[inner].parent.id;
	   							try{
				   			        obj = this.subCategories.filter(function(e){
				   			           return e.id == subid;
				   			        });
				   			        subcategoryhtml +='<div action="#" class="headTxt"><b>'+obj[0].editor.text+'</b> </div>';
				   			    }catch(err){
				   			       obj = {};
				   			    }
	   						}
	   						else{	   							
	   							subcategoryhtml = "";
	   						}  
	   					itshtml = subcategoryhtml + this.subCategoryRanges[outer].ranges[inner].instructorFrequencyFeedbackLayout(inner,this.markers);

                        itshtml = util.getImageLayout(itshtml);
                        itshtml = util.getVideoLayout(itshtml);

			   			individualFeedbacks += itshtml;
	   					//individualFeedbacks +=this.subCategoryRanges[outer].ranges[inner].instructorFrequencyFeedbackLayout(inner,this.markers);
	   					}	   		   			
	   		   		}
	   				
	   				if(individualFeedbacks !== ""){
	   					individualFeedbacks = '<div action="#"><b>Feedback: </b></div><br/>' + individualFeedbacks;
		   			}
	   				frequencyFeedbackHtml = individualFeedbacks + overallFeedback;
	   			}
	   				   			
	   			if(frequencyFeedbackHtml !== ""){
	   			   htmlelement += frequencyFeedbackHtml;
	   			}
	   		} 
	   		if( rangeBasedFeedback != '' ){
	   			htmlelement += '<div class="container">';
	   			htmlelement += '	<div action="#" class="headTxt"><b>Range-based feedback: </b></div>';
	   			htmlelement += 		rangeBasedFeedback;
	   			htmlelement += '</div>';
	   		}
	   		
	   		htmlelement +='</div>';
	   		
	   		return htmlelement;
        },
        instructorStatementLayout:function(subCategory,criteriaLayout,isRight){
        	var statementLayout='';
        	 var rightWrnCss ="";
        	 if(question.mode== MODE_POST_TEST){
        		 rightWrnCss=isRight?"wrong":"correct"; 
        	 }
        	 if(subCategory!=null){
        		statementLayout +='<div class="col-sm-12  rotate-head multiple">';
        		statementLayout +='<div class="col-sm-3 category-1">';
        		//statementLayout +='<div action="#" class="headTxt answerTick correct-2 '+rightWrnCss+'"><b>'+subCategory.editor.text+'</b> </div>';
        		if(subCategory.notApplicable){
        			var notApplicableFlag = subCategory.notApplicableStudentResponse?"checked":"";
        			var disableCss= question.mode== MODE_TEST?"":'disabled';
        			
        			statementLayout +='<input type="checkbox" '+disableCss+' class="css-checkbox" '+notApplicableFlag+' name="Checkbox3'+subCategory.editor.id+'" id="Checkbox3'+subCategory.editor.id+'">';
        			statementLayout +='<label class="css-label" for="Checkbox3'+subCategory.editor.id+'">Not Applicable</label>';
        		}
        		var isCriteria=false;
        		for(k in this.statements){
        			//var result = this.statements[k].subCategoryIds.indexOf(subCategory.id.toString());
        			if(this.statements[k].subCategoryIds!=null)
        				isCriteria=true;        			
        		}
        		if(isCriteria)
    			{
	        		statementLayout +='</div>';
	        		statementLayout +=criteriaLayout;
	            	statementLayout +='</div>';
    			}
        	}
        	statementLayout +='<table class="table  tablesorter sample2"><tbody>';
	   		var k=0;
	   		for(k in this.statements){
	   			var statementLayoutForMode = question.mode== MODE_POST_TEST? this.statements[k].postSubmissionLayout(this.criterias,subCategory) :this.statements[k].instructorLayout(this.criterias,subCategory);
	   			if(subCategory != null)
	   			{
		   			//var result = this.statements[k].subCategoryIds.indexOf(subCategory.id.toString());	
		   			if(this.statements[k].subCategoryIds==subCategory.id)
	   				{
		   				statementLayout+='<tr>';	   			
		   				statementLayout+= statementLayoutForMode;
			   			statementLayout+='</tr>';
	   				}
	   			}
	   			else
	   				{
		   				statementLayout+='<tr>';	   			
		   				statementLayout+= statementLayoutForMode;
			   			statementLayout+='</tr>';
	   				
	   				}
	   		}
	   		
	   		statementLayout+='</tbody></table>';
	   		
	   		return statementLayout;
        },
        /**
         * layouts in student test mode
         * @returns {String}
         */
        studentLayout:function(){
        	var htmlelement='';
        	/* check for branching to show/hide */
        	var attachClass = '';        	
        	if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
        		attachClass = 'hideElement';
        	}else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
        		attachClass = 'hideElement';
        	}
	   		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection '+attachClass+'">';
	   		var i=0;
	   		for(i in this.scaleLabels){
	   			htmlelement +=this.scaleLabels[i].instructorLayout(i==0?true:false);
	   		}
	   		htmlelement +='<div class="container scaleMargin">';
	   		htmlelement +='<div class="row">';
	   		var criteriaLayout='';
	   		var showCriteriaPoints = this.showPointsToStudents ? true:false;
	   		var j=0;
	   		var isLast=false;
	   		var lastCriteria=this.criterias[this.criterias.length-1];
	   		
	   		for(j in this.criterias){
	   			if(lastCriteria.id==this.criterias[j].id){// Todo For last criteriya border style 
	   		   		isLast=true;
	   		   	}
	   			criteriaLayout+=this.criterias[j].instructorLayout(parseInt(j)+1, showCriteriaPoints,isLast,this.feedbackScoringType);
	   		}
	   		
	   		if(this.scaleType=="S"){
	   			htmlelement +='<div class="">';
	   			htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
	   			if(this.notApplicable){
	   				htmlelement +='<div class=""><input type="checkbox" class="css-checkbox"   id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
	   			}
	   			htmlelement +='<div class="" style="clear:both;">';
	   			htmlelement +='<div class="col-sm-12 rotate-head">';
	   			htmlelement += criteriaLayout;
	   			htmlelement +='</div>';
	   			
	   			htmlelement += this.instructorStatementLayout(null,null,null);
	   			htmlelement +='</div>';
	   			htmlelement +='</div>';
	   			htmlelement +='</div>';
	   		}else{
	   			if(this.hideSubCategoryToStudent)
  				 {
	   				htmlelement +='<div class="col-lg-10 bottom-col scaleSubMargin" >';
	   				htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
	   				
	   				htmlelement +='<div class="" style="clear:both;">';
		   			htmlelement +='<div class="col-sm-12 rotate-head">';
		   			htmlelement += criteriaLayout;
		   			htmlelement +='</div>';
	        		
		   			htmlelement +='<table class="table  tablesorter sample2"><tbody>';
		   			var k=0;
		   			//for(k in this.subCategories){
	   			 	   				
	   		   		var x=0;
	   		   		for(x in this.statements){	   		   				
	   		   			//if(this.subCategories[k] != null)
	   		   			//{	   			   				
	   			   			//if(this.statements[x].subCategoryIds==this.subCategories[k].id)
	   		   				//{
	   		   			var newSubCat=null;
			   		   		for(k in this.subCategories){
			   		   			if(this.statements[x].subCategoryIds==this.subCategories[k].id)
			   		   			{
			   		   				newSubCat=this.subCategories[k];
			   		   			}
			   		   		}
	   			   				htmlelement+='<tr>';	   			
	   			   				htmlelement+= this.statements[x].instructorLayout(this.criterias,newSubCat);
	   			   				htmlelement+='</tr>';
	   		   				//}
	   		   			//}
	   		   			
	   		   		 }	   		   		
	   		   		
		   			//}
		   			htmlelement+='</tbody></table>';
		   			htmlelement +='</div>';
		   			htmlelement +='</div>';
		   			htmlelement +='</div>';
  				 }
	   			 else 
	   			 {
	   				var k=0;
		   			for(k in this.subCategories){
	   				 if(this.subCategories[k].statementIds.length>0){
	   					
                        var editorText = util.getImageLayout(this.subCategories[k].editor.text);
                            editorText = util.getVideoLayout(editorText);

	   					htmlelement +='<div action="#" class="headTxt" style="padding-left:15px;"><b>'+editorText+'</b> </div>';
	   					
		   				htmlelement +='<div class="col-lg-10 bottom-col scaleSubMargin" >';
		   				htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
			   			htmlelement += this.instructorStatementLayout(this.subCategories[k],criteriaLayout,null);
			   			htmlelement +='</div>';
			   			htmlelement +='</div>';
	   				}
	   			}
	   			
	   		}
	   		}
	   		//htmlelement +='<div class="row" style="padding-bottom:70px;"></div>';
	   		htmlelement +='</div>';
	   		htmlelement +='</div>';
	   		/*display total score in student side start */
	   		htmlelement +='<div id="stdSideScore_'+this.id+'" class="container">';
	   		htmlelement +='  <div class="row" style="padding-top:10px;">';
	   		htmlelement +='     <div><strong class="stdScoreTypeText"></strong></div>';
	   		htmlelement +='     <div class="clear"></div>';
	   		if(this.feedbackScoringType === "frequency")
 	   		{
 	   			htmlelement +='     <div class="stdScorePointText mcstdFreqScore"></div>';
 	   		}
 	   		else
 	   		{
 	   			htmlelement +='     <div class="stdScorePointText mcstdScore"></div>';
 	   		}
	   		htmlelement +='  </div>';	   		
	   		htmlelement +='</div>';
	   		/*display total score in student side end */
    		//htmlelement +='</div>';
	   		htmlelement +='<div class="row" style="padding-bottom:70px;"></div>';
	   		htmlelement +='</div>';
	   		return htmlelement;
        },
        /**
         * add event handers to html elements after the layout done in student test mode
         * @returns {String}
         */
        afterStudentLayout:function(){  
        	if(this.scaleType=="S"){
        		ScaleComponent.addEvent("demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id, "change", this._updateStudentResponse,{scaleType:'S',elementId:"demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id});
        		var i=0;
            	for(i in this.statements){
            		this.statements[i].afterStudentLayout(this.criterias,null);
            		if(this.studentResponses.length<this.statements.length){
            			this.studentResponses.push({statementId:this.statements[i].id,criteriaId:null});
            		}
       			}
            	if(this.notApplicableStudentResponse){
            		$("#demo_box_"+this.pageIdPrefix+this.pageId+this.idPrefix+this.id).prop("checked",true);
            	}
        	}else{
        		var k=0;
	   			for(k in this.subCategories){
	   				ScaleComponent.addEvent("Checkbox3"+this.subCategories[k].editor.id, "change", this._updateStudentResponse,{scaleType:'M',elementId:"Checkbox3"+this.subCategories[k].editor.id,subCategoryId:this.subCategories[k].id});
	   				if(this.subCategories[k].notApplicableStudentResponse){
	   					$("#Checkbox3"+this.subCategories[k].editor.id).prop("checked",true);	
	   				}
	   				var i=0;
		        	for(i in this.statements){
		        		this.statements[i].afterStudentLayout(this.criterias,this.subCategories[k]);
		   			}
	   			}
	   			
        	}
			$('.stdQueLabel').each(function (){
    			$(this).find('font').css('line-height', $(this).find('font').css('font-size'));
            });
			//Points are not displayed if student navigates to another part
			if(this.isBranched){
				this.statements[0].displayTotalScoreStudentSide(this);
   		 	}
        },
        /**
         * update student Response
         */
          updateStudentResponse:function(event){
        	   var checkBoxElement=$("#"+event.data.elementId);
        	   var flag=null;
	       	   if(event.data.scaleType=='S'){
       		   	if(checkBoxElement.prop("checked")==true || checkBoxElement.prop("checked")=="true"){
       			 flag=true;
       		    }else{
       			 flag=null;
       		    }
	       		this.notApplicableStudentResponse=flag;
       			var i=0;
	       		for(i in this.statements){
	        		this.statements[i].disableStudentSelection(this.criterias,null,flag);
	   			}
	       	   }else{
	       		   var subCatId=event.data.subCategoryId;
	       		   flag=null;
	       		   if(checkBoxElement.prop("checked")==true || checkBoxElement.prop("checked")=="true"){
	       			  flag=true;
	       		   }
	       		  var i=0;
     			   for(i in this.subCategories){
     				  if(this.subCategories[i].id==subCatId) {
     					this.subCategories[i].updateStudentResponse(flag);
 						var k=0;
     		       		for(k in this.statements){
     		        		this.statements[k].disableStudentSelection(this.criterias,this.subCategories[i],flag);
     		   			}
     					break;
     				  }
     			   }
	       	   }
	       	if(this.isBranched){
	       		this.statements[0].checkMapping(this, flag);
	       		/*display total score based on NA response*/
	       		this.statements[0].displayTotalScoreStudentSide(this);	       		
    			question.updateProgressBar();
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
        postSubmissionReviewLayout:function(){
        	var htmlelement='';
        	/* check for branching to show/hide */
        	var attachClass = '';        	
        	if(this.showToStud!=undefined && question.activePage.showToStud!=undefined && !question.activePage.showToStud){ /* page related check */
        		attachClass = 'hideElement';
        	}else if(this.showToStud!=undefined && !this.showToStud){ /* component related check */
        		attachClass = 'hideElement';
        	}
	   		htmlelement+='<div id="'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" class="rowPagesectionStudent mainQuestionSection '+attachClass+'">';
	   		var i=0;
	   		for(i in this.scaleLabels){
	   			htmlelement +=this.scaleLabels[i].instructorLayout(i==0?true:false);
	   		}
	   		htmlelement +='<div class="container scaleMargin">';
	   		htmlelement +='<div class="row">';
	   		var criteriaLayout='';
	   		var showCriteriaPoints = this.showPointsToStudents ? true:false;
	   		var j=0;
	   		var isLast=false;
	   		var lastCriteria=this.criterias[this.criterias.length-1];
	   		
	   		for(j in this.criterias){
	   			if(lastCriteria.id==this.criterias[j].id){// Todo For last criteriya border style 
		   	        isLast=true;
		   	     }
	   			criteriaLayout+=this.criterias[j].instructorLayout(parseInt(j)+1, showCriteriaPoints,isLast,this.feedbackScoringType);
	   		}
	   		criteriaLayout = criteriaLayout.replace(/Â/gi,''); /*remove unwanted Â */
	   		if(this.scaleType=="S"){
	   			var notApplicableFlag = this.notApplicableStudentResponse?"checked":"";
	   			htmlelement +='<div class="">';
	   			htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
	   			if(this.notApplicable){
	   				htmlelement +='<div class=""><input type="checkbox" class="css-checkbox" disabled '+notApplicableFlag+'  id="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
		   			htmlelement +='<label  name="demo_lbl_1" class="css-label" for="demo_box_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Not Applicable</label></div>';
	   			}
	   			htmlelement +='<div class="" style="clear:both;">';
	   			htmlelement +='<div class="col-sm-12 rotate-head">';
	   			htmlelement += criteriaLayout;
	   			htmlelement +='</div>';
	   			htmlelement += this.instructorStatementLayout(null,null,null);
	   			htmlelement +='</div>';
	   			htmlelement +='</div>';
	   			htmlelement +='</div>';
	   		}else{
	   			if(this.hideSubCategoryToStudent)
  				{
   					htmlelement +='<div class="col-lg-10 bottom-col scaleSubMargin" >';
	   				htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
	   				htmlelement +='<div class="col-sm-12  rotate-head">';
	   				htmlelement +='<div class="" style="clear:both;">';
		   			htmlelement +='<div class="col-sm-12 rotate-head">';
		   			htmlelement += criteriaLayout;
		   			htmlelement +='</div>';
	        		
		   			htmlelement +='<table class="table  tablesorter sample2"><tbody>';
		   			var j=0;
		   			//for(j in this.subCategories){			   			 	   				
		   		   		var x=0;
		   		   		for(x in this.statements){	
		   		   			
		   		   		var newSubCat=null;
		   		   		for(j in this.subCategories){
		   		   			if(this.subCategories[j] != null)
		   		   			{
			   		   			if(this.statements[x].subCategoryIds==this.subCategories[j].id)
			   		   			{
			   		   				newSubCat=this.subCategories[j];
			   		   			}
		   		   			}
		   		   		}
		   		   				//if(this.subCategories[j] != null)
		   		   				//{			   			   				
		   			   				//if(this.statements[x].subCategoryIds==this.subCategories[j].id)
		   		   					//{
			   			   				htmlelement+='<tr>';	   			
			   			   				htmlelement+= this.statements[x].postSubmissionLayout(this.criterias,newSubCat);
			   			   				htmlelement+='</tr>';
		   		   					//}
		   		   				//}
		   		   			}			   		   		
		   				//}
			   			htmlelement+='</tbody></table>';
			   			htmlelement +='</div>';
			   			htmlelement +='</div>';
			   			htmlelement +='</div>';
  				}else{
  					var k=0;
  					for(k in this.subCategories){
  						if(this.subCategories[k].statementIds.length>0){
	  						var l=0;
	  						var incompleteBanner=false;
				   			if(!this.subCategories[k].notApplicableStudentResponse)
			   				{
					   		   	for(l in this.subCategories[k].studentResponses){
					   		   		if(this.subCategories[k].studentResponses[l].criteriaId==null){
						   		   		incompleteBanner=true;
					   		   		}
					   		   	}
			   				}
  						}
	   			
	  					var rightWrnCss=incompleteBanner?"wrong":"correct"; 
		   				if(this.subCategories[k].statementIds.length>0){

                            var editorText = util.getImageLayout(this.subCategories[k].editor.text);
                                editorText = util.getVideoLayout(editorText);
                            
                            htmlelement +='<div action="#" style="padding-top:0px !important;" class="headTxt answerTick correct-2 '+rightWrnCss+'"><b>'+editorText+'</b> </div>';
			   				
			   				htmlelement +='<div class="col-lg-10 bottom-col scaleSubMargin" >';
			   				htmlelement +='<div class="table-responsive tbl_scroll tbl-style">';
				   			htmlelement += this.instructorStatementLayout(this.subCategories[k],criteriaLayout,incompleteBanner);
				   			htmlelement +='</div>';
				   			htmlelement +='</div>';
		   				}	
   					}	   				
	   			}
	   		}
	   		
	   		htmlelement +='</div>';
	   		htmlelement +='</div>';
	   		
	   		if(this.scaleType=="S"){
	   			var score = this.calculateScoreForFeedback(null);
	   			if(!this.notApplicableStudentResponse)
	   			{
		   			if(this.feedbackScoringType=="average")
		   			{
		   				score = score/this.statements.length;
		   			}
		   			var multiplier = Math.pow(10, 2);
		   			/*avoid score calculation for frequency*/
		   			if(this.feedbackScoringType != "frequency"){
	   				  score = Math.round(score * multiplier) / multiplier;
		   			}
	   			}
	   			
		   		htmlelement +='<div class="clear"></div>'; 
		   		htmlelement +='<div class="container">';
		   		if(this.feedbackScoringType != "frequency"){
		   			var z=0;
		   			var scoreDisplay=false;
		   			for( z in this.ranges){
		     			if( this.ranges[z].minRangeEditor.text != '' && this.ranges[z].maxRangeEditor.text != '' && this.ranges[z].rangeFeedbackEditor.text != '' ) {
		     				this.scoreDisplay = true;
		     			}
		   			}		   			
		   			if(this.scoreDisplay)
		   			{
			   			htmlelement +='<div class="row" style="padding-top:10px;">';
				   		htmlelement +='<div><strong> Feedback score: </strong></div>';
				   		htmlelement +='<div class="clear"></div>';
				   		htmlelement +='<div> Score : '+ score +' pts.</div>';
				   		htmlelement +='</div>';
				   		htmlelement +='</div>';
		   			}
		   		}
		   		else{
		   		// if more than one criteria are selected equally
		   			
			   			if(score.length != 0){
			   				htmlelement +='<div style="margin:10px; line-height:2;">';
				   			htmlelement +='<div><strong> Feedback: </strong></div>';
				   			htmlelement +='<div style=" font-style:italic; font-size:10px;">Feedback is calculated by frequency</strong></div>';
				   			htmlelement +='<div >Your responses were assessed as follows: </div>';
				   			if(score.length > 1){
			   		   			var criteria = [];
					   			var feedback = null;
					   			var feedbackHtml = "";
					   			for(var len in score){
					   				for (l in this.criterias){
					        			if(this.criterias[l].id == score[len].mostlySelectedCriteria){

                                            var criText = util.getImageLayout(this.criterias[l].editor.text);
                                                criText = util.getVideoLayout(criText);

					        				criteria.push(criText);

                                            feedback = this.criterias[l].feedbackEditor.text;

                                            feedback = util.getImageLayout(feedback);
                                            feedback = util.getVideoLayout(feedback);

					        				if(feedback !=""){
					        				  feedbackHtml += '<div style="padding-left:10px; margin-bottom:10px;"><strong>'+criText +'</strong><label style="padding-left:20px;"> <strong>Feedback : </strong>'+ feedback +' </label></div>';
					        				}
					        			}
					        		}
					   			}
					   			
					   			htmlelement +='<div class="row" style=" padding-top:10px; padding-bottom:20px;">';
						   		htmlelement +='<div style="padding :10px;  " ><strong>You selected '+ criteria +' an equal number of times.</strong></div>';
						   		htmlelement +='<div class="clear"></div>';
						   		
						   		htmlelement += feedbackHtml;
						   		htmlelement +='</div>';
						   		htmlelement +='</div>';
						   		htmlelement +='</div>';
		   		   			}
		   		   			else{
					   			var criteria = null;
					   			var feedback = null;
					   			if(score[0] != undefined){
					   			  for (l in this.criterias){
				        			if(this.criterias[l].id == score[0].mostlySelectedCriteria){
				        				criteria = this.criterias[l].editor.text;

                                        criteria = util.getImageLayout(criteria);
                                        criteria = util.getVideoLayout(criteria);

				        				feedback = this.criterias[l].feedbackEditor.text;
                                        
                                        feedback = util.getImageLayout(feedback);
                                        feedback = util.getVideoLayout(feedback);
				        			}
				        		  }
		   		   			    }
					   			criteria = (criteria==null)?'':criteria; /*avoid null to display*/
					   			htmlelement +='<div class="row" style=" padding-top:10px; padding-bottom:20px;">';
						   	    htmlelement +='<div style="padding :10px; display:inline-block; "><strong>Frequency: You selected mostly "'+ criteria +'"</strong></div>';
						   		htmlelement +='<div class="clear"></div>';
						   		if(feedback !== "" ){
						   			feedback = (feedback==null)?'':feedback;/*avoid null to display*/
						   			htmlelement +='<div style="padding-left:100px;"><strong>'+ criteria +' Feedback : </strong>'+ feedback +' </div>';
						   		}				   		
		
						   		htmlelement +='</div>';
						   		htmlelement +='</div>';
		   		   			}				   			
			   			}
			   		}
		   		
			   		//generates rangebased feedbacks
			   		var rangeFeedbackHtml = '';
		 			rangeFeedbackHtml +='<div class="clear"></div>';
		 			rangeFeedbackHtml +='<div class="container">';
		 			rangeFeedbackHtml +='<div class="row">';
		 			rangeFeedbackHtml +='<div class="rangeFeedOpen rangeFeedScalePost">';
		 			rangeFeedbackHtml +='	</br><div><strong>Range-based feedback: </strong></div>';
		     		var j=0;
		     		var rangeCount = 0;
		     		for( j in this.ranges){
		     			if( this.ranges[j].minRangeEditor.text != '' && this.ranges[j].maxRangeEditor.text != '' && this.ranges[j].rangeFeedbackEditor.text != '' ) {
		     				var showFlag=(score>=parseFloat(this.ranges[j].minRangeEditor.text) && score <=this.ranges[j].maxRangeEditor.text);
		     				if(showFlag){
		     					rangeFeedbackHtml +='<div>';
			     				rangeFeedbackHtml +='	<div class="colPageSection minColPic1">'+this.ranges[j].minRangeEditor.text+ '  -  ' +this.ranges[j].maxRangeEditor.text+' pts.</div>';

                                var rangeFeedbackText = util.getImageLayout(this.ranges[j].rangeFeedbackEditor.text);
                                    rangeFeedbackText = util.getVideoLayout(rangeFeedbackText);

			     				rangeFeedbackHtml +='	<div class="colPageSection secondColPic feedbackTxt"><strong>Feedback: </strong>'+rangeFeedbackText+'</div>';
			     				rangeFeedbackHtml +='</div>';
			     				rangeFeedbackHtml +='<div class="clear"></div>';
		     					rangeCount++;
		     				}
		     			}
		         	}
		     		rangeFeedbackHtml +='</div>';
		     		rangeFeedbackHtml +='</div>';
		     		rangeFeedbackHtml +='</div>';
		     		if( rangeCount > 0 ) {
		     			htmlelement += rangeFeedbackHtml; 
		     		}
		   		}//single category end
	   			else{
		   			var x=0;
		   			var incompleteBanner=false;
		   			var subCatFeedback='';
		   			var totalScore=0;
		   			var subCount=0;
		   			var stmntCnt = 0;
		   			var totalFreqency=[];
		   			if(this.feedbackScoringType=="frequency"){
			   			htmlelement +='<div style="margin:10px; line-height:2;">';
			   			htmlelement +='<div><strong> Feedback: </strong></div>';
			   			htmlelement +='<div style=" font-style:italic; font-size:10px;">Feedback is calculated by frequency</strong></div>';
			   			htmlelement +='<div >Your responses were assessed as follows: </div>';
		   			}
		   			for(x in this.subCategories){
		   				if(this.subCategories[x].statementIds.length>0){
			   				var subCatScore = this.calculateScoreForFeedback(this.subCategories[x]);	
			   				totalScore = totalScore + subCatScore;
			   				stmntCnt = stmntCnt + this.subCategories[x].statementIds.length;
			   				if(this.feedbackScoringType!="frequency"){
				   				if(!this.subCategories[x].notApplicableStudentResponse)
					   			{
					   				if(this.feedbackScoringType=="average")
						   			{
					   					subCatScore = subCatScore/this.subCategories[x].statementIds.length;
						   				
						   			}
					   				var multiplier = Math.pow(10, 2);
					   				subCatScore = Math.round(subCatScore * multiplier) / multiplier;
					   			}
				   				subCount++;
		   					}
			   				else{
			   					//calculation for frequency
			   					if(totalFreqency.length == 0){
			   						totalFreqency = subCatScore;
			   					}
			   					else{
			   						if(subCatScore.length > 1){
			   							for(lenSubCatScore in subCatScore){
			   								var isExist = false;
				   							for(var len in totalFreqency){
					   							if(totalFreqency[len].mostlySelectedCriteria == subCatScore[lenSubCatScore].mostlySelectedCriteria){
					   								isExist = true;
					   								break;
					   							}
					   						}
				   							if(isExist){
				   								totalFreqency[len].frequency = totalFreqency[len].frequency + subCatScore[lenSubCatScore].frequency;
				   							}
				   							else{
				   								totalFreqency.push(subCatScore[lenSubCatScore]);
				   							}
			   							}
			   						}
			   						else{
			   							var isExist = false;
			   							if(typeof subCatScore[0] != "undefined"){
			   								for(var len in totalFreqency){
					   							if(totalFreqency[len].mostlySelectedCriteria == subCatScore[0].mostlySelectedCriteria){
					   								isExist = true;
					   								break;
					   							}
					   						}
				   							if(isExist){
				   								totalFreqency[len].frequency = totalFreqency[len].frequency + subCatScore[0].frequency;
				   							}
				   							else{
				   								totalFreqency.push(subCatScore[0]);
				   							}
			   							}			   							
			   						}
			   					}
			   				}//calculation end
			   				
			   				var z=0;
				   		   	if(!this.subCategories[x].notApplicableStudentResponse)
		   					{
				   		   		for(z in this.subCategories[x].studentResponses){
				   		   			if(this.subCategories[x].studentResponses[z].criteriaId==null){
					   		   			incompleteBanner=true;
					   		   			break;
				   		   			}
				   		   		}
		   					}
			   		   		subCatFeedback +='<div class="clear"></div>'; 
			   		   		subCatFeedback +='<div class="container">';
			   		   		if(this.feedbackScoringType != "frequency"){
				   		   		subCatFeedback +='<div class="row" style="padding-top:10px;">';

                                var subCatFbText = util.getImageLayout(this.subCategories[x].editor.text);
                                subCatFbText = util.getVideoLayout(subCatFbText);

				   		   		subCatFeedback +='<div class="feedbackTxt"><strong> '+subCatFbText+' </strong></div>';
				   		   		subCatFeedback +='<div class="clear"></div>';
				   		   		subCatFeedback +='<div>Score : '+ subCatScore +' pts.</div>';
				   		   		subCatFeedback +='</div>';
				   		   		subCatFeedback +='</div>';
			   		   		}
			   		   		else{
			   		   			if(subCatScore.length != 0){
					   		   			if(subCatScore.length > 1){
						   		   			var criteria = [];
								   			var feedback = null;
								   			var feedbackHtml = "";
								   			for(var len in subCatScore){
									   			if(subCatScore[len].mostlySelectedCriteria){
									   				try{
							        	                  obj = this.criterias.filter(function(e){
							        	                     return e.id == subCatScore[len].mostlySelectedCriteria;
							        	                  });
							        	              
							        	                  
							        	              }catch(err){
							        	                 obj = {};
							        	              }
							        	            criteria.push(obj[0].editor.text);
									   				for (l in this.subCategoryRanges){
									   					if (this.subCategories[x].id == this.subCategoryRanges[l].subCategoryId){
										   					for (k in this.subCategoryRanges[l].ranges){
										   						if(this.subCategoryRanges[l].ranges[k].id == subCatScore[len].mostlySelectedCriteria){

                                                                    
                                                                    var rangeFbText = util.getImageLayout(this.subCategoryRanges[l].ranges[k].rangeFeedbackEditor.text);
                                                                        rangeFbText = util.getVideoLayout(rangeFbText);

											        				feedback = rangeFbText;
											        				if(feedback != ""){
											        				  feedbackHtml += '<div style="padding-left:100px; margin-bottom:10px;"><strong>'+obj[0].editor.text +'</strong><label style="padding-left:20px;"> <strong>Feedback : </strong>'+ feedback +' </label></div>';
											        				}
										        				}
										   					}
									   					}
									   				}
									   			}
								   			}
								   			
								   			subCatFeedback +='<div class="row" style=" padding-top:10px; padding-bottom:20px;">';

                                            var subCatFbText = util.getImageLayout(this.subCategories[x].editor.text);
                                                subCatFbText = util.getVideoLayout(subCatFbText);

									   		subCatFeedback +='<div class="feedbackTxt"><strong> '+subCatFbText+' </strong></div>';
								   			subCatFeedback +='<div style="padding :10px; display:inline-block; " ><strong>You selected '+ criteria +' an equal number of times.</strong></div>';
								   			subCatFeedback +='<div class="clear"></div>';
								   			subCatFeedback += feedbackHtml;
								   			subCatFeedback +='</div>';
								   			subCatFeedback +='</div>';
					   		   			}
					   		   			else{
							        		if(subCatScore[0].mostlySelectedCriteria){
							        			
							        			var criteria = null;
									   			var feedback = "";
									   			try{
						        	                  var obj = this.criterias.filter(function(e){
						        	                	        return e.id == subCatScore[0].mostlySelectedCriteria;
						        	                  });
						        	              
						        	                  
						        	            }catch(err){
						        	                 obj = {};
						        	            }
						        	            
						        	            criteria = obj[0].editor.text;
									   			for (var l in this.subCategoryRanges){
									   				if (this.subCategories[x].id == this.subCategoryRanges[l].subCategoryId){	
									   					for (var k in this.subCategoryRanges[l].ranges){	
										        			if(this.subCategoryRanges[l].ranges[k].id == subCatScore[0].mostlySelectedCriteria){
										        				feedback = this.subCategoryRanges[l].ranges[k].rangeFeedbackEditor.text;
                                                                
                                                                feedback = util.getImageLayout(feedback);
                                                                feedback = util.getVideoLayout(feedback);
										        			}
									   					}
									   				}
									   			}
									   			subCatFeedback +='<div class="row" style=" padding-top:10px; padding-bottom:20px;">';

                                                var subCatFbText = util.getImageLayout(this.subCategories[x].editor.text);
                                                    subCatFbText = util.getVideoLayout(subCatFbText);

											   	subCatFeedback +='<div class="feedbackTxt"><strong> '+subCatFbText+' </strong></div>';
								   		   		
									   			subCatFeedback +='<div style="padding :10px; display:inline-block; ">Frequency: You selected mostly "'+ criteria +'"</div>';
									   			subCatFeedback +='<div class="clear"></div>';
									   			if(feedback != ""){
									   				subCatFeedback +='<div style="padding-left:100px; margin-bottom:10px;"> <strong> '+ criteria +'</strong><label style="padding-left:20px;"> <strong>Feedback : </strong>"'+ feedback +'"';
									   			}
									   			subCatFeedback +='</label></div>';
									   			subCatFeedback +='</div>';
									   			subCatFeedback +='</div>';
						   		   			}
					        		}
			   		   			}
			   		   		}//frequency multicategory display for subcategory end
			   		   		
		   				
			   		   		//overall feedback display start
				   		   	var rangeFeedbackHtml = '';
				 			rangeFeedbackHtml +='<div class="clear"></div>';
				 			rangeFeedbackHtml +='<div class="container">';
				 			rangeFeedbackHtml +='<div class="row">';
				 			rangeFeedbackHtml +='<div class="rangeFeedOpen">';
				 			//rangeFeedbackHtml +='	<div><strong>Your feedback: </strong></div>';
				     		var j=0;
				     		var rangeCount = 0;
				     		for( j in this.subCategoryRanges){
				     			if(this.subCategoryRanges[j].subCategoryId==this.subCategories[x].id){
				     				if(this.subCategoryRanges[j].ranges!=null){
				     					var y=0;
				     					for(y in this.subCategoryRanges[j].ranges){
				     						if( this.subCategoryRanges[j].ranges[y].minRangeEditor.text != '' && this.subCategoryRanges[j].ranges[y].maxRangeEditor.text != '' && this.subCategoryRanges[j].ranges[y].rangeFeedbackEditor.text != '' ) {
				    		     				var showFlag=(subCatScore>=parseFloat(this.subCategoryRanges[j].ranges[y].minRangeEditor.text) && subCatScore <=this.subCategoryRanges[j].ranges[y].maxRangeEditor.text);
				    		     				if(showFlag){
				    		     					rangeFeedbackHtml +='<div>';
					    		     				rangeFeedbackHtml +='	<div class="colPageSection minWidScale">'+this.subCategoryRanges[j].ranges[y].minRangeEditor.text+'  -  '+this.subCategoryRanges[j].ranges[y].maxRangeEditor.text+' pts.</div>';

                                                    var rangeFbText = util.getImageLayout(this.subCategoryRanges[j].ranges[y].rangeFeedbackEditor.text );
                                                        rangeFbText = util.getVideoLayout(rangeFbText);

					    		     				rangeFeedbackHtml +='	<div class="colPageSection secondColPic feedbackTxt"><strong>Feedback: </strong>'+rangeFbText+'</div>';
					    		     				rangeFeedbackHtml +='</div>';
					    		     				rangeFeedbackHtml +='<div class="clear"></div>';
				    		     					rangeCount++;
				    		     				}
				    		     			}
				     					}
				     				}
				     			}
				         	}
				     		rangeFeedbackHtml +='</div>';
				     		rangeFeedbackHtml +='</div>';
				     		rangeFeedbackHtml +='</div>';
				     		if( rangeCount > 0 ) {
				     			subCatFeedback += rangeFeedbackHtml; 
				     		}
		   				}
		   			}// subcategory loop end
		   			
		   			if(this.feedbackScoringType=="average")
		   			{
			   			totalScore = totalScore/stmntCnt;
			   			
		   			}
		   			var multiplier = Math.pow(10, 2);
		   			totalScore = Math.round(totalScore * multiplier) / multiplier;
		   			
		   			
		   			if(this.feedbackScoringType == "frequency"){
		   				var max = 0;
		   				var mostFrequentOverall = [];
		   				for(var len in totalFreqency){
							 if (totalFreqency[len].frequency > max) {
								 mostFrequentOverall=[];
								 max = totalFreqency[len].frequency;
								 mostFrequentOverall.push(totalFreqency[len].mostlySelectedCriteria);
								 
							 }
							 else if(totalFreqency[len].frequency == max){
								 mostFrequentOverall.push(totalFreqency[len].mostlySelectedCriteria);
							 }
						 }
			        	totalScore = mostFrequentOverall;
		        	}
   				
		   			var incompleteBannerHtml='';
	   		   		if(incompleteBanner){
	   		   			incompleteBannerHtml +='<div class="clear"></div>'; 
	   		   			incompleteBannerHtml +='<div class="container">';
	   		   			incompleteBannerHtml +='<div class="row" style="padding-top:10px;">';
	   		   			incompleteBannerHtml +='<div ><STRONG>Feedback: </STRONG> </div>';
	   		   			incompleteBannerHtml +='<div class="inCompleteAnswerBanner-2">You did not complete all of the questions. This will affect your feedback. </div>';
	   		   			incompleteBannerHtml +='</div>';
	   		   			incompleteBannerHtml +='</div>';
	   		   			
	   		   		}
	   		   		htmlelement +=incompleteBannerHtml;
	   		   		htmlelement +=subCatFeedback;
		   		   	htmlelement +='<div class="clear"></div>'; 
			   		htmlelement +='<div class="container">';
			   		if(this.feedbackScoringType != "frequency"){
			   			var y=0;
			   			for( y in this.ranges){
			     			if(this.ranges[y].minRangeEditor.text != '' && this.ranges[y].maxRangeEditor.text != '' && this.ranges[y].rangeFeedbackEditor.text != '' ) {
			     				if(totalScore>=parseFloat(this.ranges[y].minRangeEditor.text) && totalScore <=parseFloat(this.ranges[y].maxRangeEditor.text)){
			     					htmlelement +='<div class="row" style="padding-top:10px;">';
							   		htmlelement +='<div><strong> Feedback score: </strong></div>';
							   		htmlelement +='<div class="clear"></div>';
							   		htmlelement +='<div> Score : '+ totalScore +' pts.</div>';
							   		htmlelement +='</div>';
			     				}
			     			}
			   			}
			   		}
			   		else{
			   			htmlelement +='<div class="row" style="padding-top:10px;">';
			   			if(totalScore.length != 0){
				   		  htmlelement +='<div><strong> Total frequency: </strong></div>';
			   			}
				   		htmlelement +='<div class="clear"></div>';
				   		var oCriteria = [];
				   		var oFeedHtmlelement="";
				   		if(totalScore.length > 1){
				   			for(totalScoreLen in totalScore){
				   				try{
		        	                  var obj = this.criterias.filter(function(e){
		        	                	        return e.id == totalScore[totalScoreLen];
		        	                  });
		        	            }catch(err){
		        	                 obj = {};
		        	            }
		        	            oCriteria.push(obj[0].editor.text);
		        	            if(obj[0].feedbackEditor.text != ""){
		        	             oFeedHtmlelement += '<div style="padding-left:100px; margin-bottom:10px;"><strong>'+ obj[0].editor.text+'</strong><label style="padding-left:20px;"> <strong>Feedback : </strong>'+ obj[0].feedbackEditor.text +' </label></div>';
		        	            } 
				   			}
				   			htmlelement +='<div style="padding :10px; display:inline-block; " ><strong>You selected '+ oCriteria +' an equal number of times.</strong></div>';
				   			if(oFeedHtmlelement != ""){
				   			 htmlelement +='<div style="padding :10px; "><strong>Range-based feedback: </strong></div>';
				   			 htmlelement +=oFeedHtmlelement;
				   			}
				   		}
				   		else{
				   			if(totalScore.length != 0){
					   				try{
			        	                  var obj = this.criterias.filter(function(e){
			        	                	        return e.id == totalScore;
			        	                  });
			        	            }catch(err){
			        	                 obj = {};
			        	            }
		        	            oCriteria = obj[0].editor.text;
		        	            htmlelement +='<div style="padding :10px; display:inline-block; "><strong>You selected mostly "'+ oCriteria +'"<strong></div>';
		        	            
		        	            if(obj[0].feedbackEditor.text != ""){
					   			 htmlelement +='<div style="padding :10px;  "><strong>Range-based feedback: </strong></div>';
					   			 htmlelement +='<div style="padding-left:100px; margin-bottom:10px;"><strong>'+ obj[0].editor.text+'</strong><label style="padding-left:20px;"> <strong>Feedback : </strong>'+ obj[0].feedbackEditor.text +' </label></div>';;
		        	            }
				   			}
				   		}
				   		
				   		
				   		htmlelement +='</div>';
			   		}
			   		htmlelement +='</div>';
		   		
		   		   	var totalRangeFeedbackHtml = '';
		   		   	totalRangeFeedbackHtml +='<div class="clear" style="padding-top:10px;"></div>';
		 			totalRangeFeedbackHtml +='<div class="container">';
		 			totalRangeFeedbackHtml +='<div class="row">';
		 			totalRangeFeedbackHtml +='<div >';
		 			totalRangeFeedbackHtml +='	<div><strong>Range-based Feedback: </strong></div>';
		 			totalRangeFeedbackHtml +='<div class="clear"></div>'; 
		 			if(incompleteBanner){
		 				totalRangeFeedbackHtml +='<div class="clear"></div>'; 
		 				totalRangeFeedbackHtml +='<div class="inCompleteAnswerBanner-2 ">You did not complete all of the questions. This will affect your feedback. </div>';
		 				totalRangeFeedbackHtml +='<div class="clear"></div>';
	   		   		}
		     		var j=0;
		     		var totalRangeCount = 0;
		     		for( j in this.ranges){
		     			if( this.ranges[j].minRangeEditor.text != '' && this.ranges[j].maxRangeEditor.text != '' && this.ranges[j].rangeFeedbackEditor.text != '' ) {
		     				var showFlag=(totalScore>=parseFloat(this.ranges[j].minRangeEditor.text) && totalScore <=this.ranges[j].maxRangeEditor.text);
		     				if(showFlag){
		     					totalRangeFeedbackHtml +='<div>';
			     				totalRangeFeedbackHtml +='	<div class="colPageSection minWidScale" style="padding-left:10px;">'+this.ranges[j].minRangeEditor.text+'  -  '+this.ranges[j].maxRangeEditor.text+' pts.</div>';

                                var rangeFbText = util.getImageLayout(this.ranges[j].rangeFeedbackEditor.text);
                                    rangeFbText = util.getVideoLayout(rangeFbText);
                                    
			     				totalRangeFeedbackHtml +='	<div class="colPageSection secondColPic feedbackTxt" style="margin-left: -18px;"><strong>Feedback: </strong>'+rangeFbText+'</div>';
			     				totalRangeFeedbackHtml +='</div>';
			     				totalRangeFeedbackHtml +='<div class="clear"></div>';
		     					totalRangeCount++;
		     				}
		     			}
		         	}
		     		totalRangeFeedbackHtml +='</div>';
		     		totalRangeFeedbackHtml +='</div>';
		     		totalRangeFeedbackHtml +='</div>';
		     		if( totalRangeCount > 0 ) {
		     			htmlelement += totalRangeFeedbackHtml; 
		     		}
	   			}
		   		htmlelement +='</div>';
		   		htmlelement +='</div>';
		   		return htmlelement;
        },
        /**
		 * calculate the score for feedback 
		 */
        calculateScoreForFeedback:function(subCategory){
        	var totalScore=0;
        	var arrResponceFreq = [];
        	if(subCategory==null){
        		var k =0;
            	if(this.notApplicableStudentResponse){
            		totalScore =(this.awardMaximum)? this.maxPoint: this.minPoint;            		
        		}else{
    	        	for(k in this.statements){
    	        		var pointValue = null;
    	        		var criteriaId = 0;
    	        		var weightValue = this.statements[k].weightEditor.text;  
    	        		var m=0;
    	        		for(m in this.studentResponses){
    	        			if(this.studentResponses[m].criteriaId != null && this.studentResponses[m].statementId==this.statements[k].id){
        		        		var l = 0;
        		        		for (l in this.criterias){
        		        			if(this.criterias[l].id == this.studentResponses[m].criteriaId){
        		        				pointValue = this.criterias[l].pointEditor.text;
        		        				criteriaId = this.criterias[l].id;
        	        				}	    			
        		    			}
        		        		if(this.feedbackScoringType != "frequency"){
        		        			totalScore = totalScore + (pointValue!=null?(parseFloat(weightValue) * parseFloat(pointValue)):0); 
        		        		}
        		        		else{
        		        			arrResponceFreq[criteriaId] = arrResponceFreq[criteriaId] ? arrResponceFreq[criteriaId] + 1 : 1;
        		        		}
        	    			} 
    	        		}
    	        	}
        		}
        	}else{
        		
        		if(subCategory.notApplicableStudentResponse){        			
        				totalScore =(subCategory.awardPoints=="Max")? subCategory.maxPoint: subCategory.minPoint;
        				
        		}else{
	        		var m=0;
	        		for(m in subCategory.studentResponses){
	        			if(subCategory.studentResponses[m].criteriaId != null){
	        				var weightValue = null;
	        				var pointValue = null;
	        				var criteriaId = 0;
	        				var k=0;
	        				for(k in this.statements){
	        					if(this.statements[k].id==subCategory.studentResponses[m].statementId){
	        						weightValue=this.statements[k].weightEditor.text;
	        					}
	        				}
    		        		var l = 0;
    		        		for (l in this.criterias){
    		        			if(this.criterias[l].id == subCategory.studentResponses[m].criteriaId){
    		        				pointValue = this.criterias[l].pointEditor.text;
    		        				criteriaId = this.criterias[l].id;
    	        				}	    			
    		    			}
    		        		if(this.feedbackScoringType != "frequency"){
    		        			totalScore = totalScore + (pointValue!=null?(parseFloat(weightValue) * parseFloat(pointValue)):0); 
    		        		}
    		        		else{
    		        			arrResponceFreq[criteriaId] = arrResponceFreq[criteriaId] ? arrResponceFreq[criteriaId] + 1 : 1;
    		        		}
    	    			} 
	        		}
    	        }
        	}
        	if(this.feedbackScoringType == "frequency"){
	        	var mostFrequentAns = [];
	        	var max = 0;
	        	for(key in arrResponceFreq){
					 if (arrResponceFreq[key] > max) {
						 mostFrequentAns = [];
						 max = arrResponceFreq[key];
						 var score = {};
						 score.mostlySelectedCriteria = key;
						 score.frequency = arrResponceFreq[key];
						 mostFrequentAns.push(score);
						 
					 }
					 else if(arrResponceFreq[key] == max){
						 var score = {};
						 score.mostlySelectedCriteria = key;
						 score.frequency = arrResponceFreq[key];
						 mostFrequentAns.push(score);
					 }
				 }
	        	totalScore = mostFrequentAns;
        	}
        	return totalScore;        	
        },

	    /**
		 * check if question is answered
		 */

        isStudentAnswered:function(){
             var validflag=true;
             if(this.showToStud || this.showToStud == undefined){
        		 if(this.scaleType=='S'){
    	   			 if(this.notApplicableStudentResponse){
    	   				validflag=true;
    	   			 }else{
    	   				var i=0;
    		       		for(i in this.studentResponses){
    		       			var j=0;
    		       			for(j in this.statements){
    		       				if(this.statements[j].id==this.studentResponses[i].statementId){
    		       					if(this.statements[j].mandatory && this.studentResponses[i].criteriaId==null){
    		       						validflag=false;
    		       						break;
    		       					}
    		       				}
    		       			}
    		       			if(!validflag){
    		       				break;
    		       			}
    		   			}
    	   			 }
    	   		 }else{
    	   			 var i=0;
    	   			 for(i in this.subCategories){
    	   				 if(!this.subCategories[i].notApplicableStudentResponse){
    	   					var j=0;
    	   					for(j in this.subCategories[i].studentResponses){
    	   						var k=0;
    			       			for(k in this.statements){
    			       				if(this.statements[k].id==this.subCategories[i].studentResponses[j].statementId){
    			       					if(this.statements[k].mandatory && this.subCategories[i].studentResponses[j].criteriaId==null){
    			       						validflag=false;
    			       						break;
    			       					}
    			       				}
    			       			}
    			       			if(!validflag){
    			       				break;
    			       			}
    	   					}
    	 	   			 }
    	   				if(!validflag){
    	       				break;
    	       			}
    	   			 }
    	   		 }
             }
			return validflag;
        },
        /**
         * calculates Total Score
         */
        calculateScore:function(){
        	
        	 var totalScore=0;
        	 if(this.scaleType=='S'){
        		
        		 if(this.notApplicableStudentResponse){
        			 totalScore= this.getGradedCount(null);
        		 }else{
            		 var i=0;
    	       		 for(i in this.studentResponses){
    	       			if(this.isGradedStatementAnswered(this.studentResponses[i])){
    	       				totalScore++;
    	       			}
    	   			 }
    	       		
        		 }
        	 }else{
        		 var i=0;
        		 for(i in this.subCategories){
        			 if(this.subCategories[i].notApplicableStudentResponse){
        				 totalScore= totalScore+this.getGradedCount(this.subCategories[i]);
        			 }else{
        				 var j=0;
            			 for (j in this.subCategories[i].studentResponses){
            				 if( this.isGradedStatementAnswered(this.subCategories[i].studentResponses[j])){
            					 totalScore++;
          	       			}
            			 }
        			 }
        			 
 	       			
 	   			 }
        	 }
        	return totalScore;
        },
        getComponentLabelGradeCount:function(){
        	var gradeCount=0;
        	if(this.scaleType=='S'){
        		gradeCount = this.getGradedCount(null);
        	}else{
        		var i=0;
	       		 for(i in this.subCategories){
	       			gradeCount +=this.getGradedCount(this.subCategories[i]);
	       		 }
        	}
        	return gradeCount;
        },
       /**
        * get Graded Count
        */
        getGradedCount:function(subCategory){
        	var totalGadedCount=0;
        	 if(subCategory==null){
        		 var x=0;
        		 for(x in this.studentResponses){
        			 var n=0;
        			 for(n in this.statements){
        				 if( this.studentResponses[x].statementId==this.statements[n].id){
      	       				if(this.statements[n].graded){
      	       					totalGadedCount++;
      	       				}
      	       				break;
      	       			} 
        			 }
 	       			
 	   			 }
        	 }else{
        			 var x=0;
            		 for(x in subCategory.studentResponses){
            			 var n=0;
            			 for(n in this.statements){
            				 if( subCategory.studentResponses[x].statementId==this.statements[n].id){
          	       				if(this.statements[n].graded){
          	       					totalGadedCount++;
          	       				}
          	       				break;
          	       			} 
            			 }
     	       			
     	   			 }
 	       			
 	   			 }
        	 return totalGadedCount;
        },
        /**
         * is Graded Statement answered
         * 
         */
        isGradedStatementAnswered:function(studentResponse){
        	var flag=false;
        	 var n=0;
			 for(n in this.statements){
				if(studentResponse.criteriaId!=null && studentResponse.statementId==this.statements[n].id && this.statements[n].graded){
					 flag=true;
	       			 break;
	       		} 
			 }
			 return flag;
        },
        /***
         * Function to change current Feedback Scoring Type
         * @param event{Object} : event object 
         */
        changeFeedbackScoringType : function(event) {
        	if (typeof event.data === 'undefined') {
        		this.feedbackScoringType = 'sum';
        		question.setActiveScaleType("sum");
        	} else {
        		//this.subCategoryRanges=[];
        		this.feedbackScoringType = event.data.feedbackScoringType;
        		if (this.feedbackScoringType === 'sum') {
        			$("#feedbackMode").html("Sum  <span class='caret caretDrop'></span>");
        			question.setActiveScaleType("sum");
        		} else  if (this.feedbackScoringType === 'average') {
        			$("#feedbackMode").html("Average  <span class='caret caretDrop'></span>");
        			question.setActiveScaleType("average");
        		}else  if (this.feedbackScoringType === 'frequency') {
        			$("#feedbackMode").html("Frequency  <span class='caret caretDrop'></span>");
        			question.setActiveScaleType("frequency");
        			this.notApplicable = false;
        			this.showPointsToStudents=false;     
        			
        		}
        		page.doLayout();
        		this.populateComp();     

        	}
        },
        /***
         * Function to get Frequency Feedback Layout 
         */
        getFrequencyFeedbackLayout : function (){
        	var htmlelement="";
        	htmlelement+='<div id="frequencyFeedback'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">';
         	htmlelement+= '	<div class="pageSectionBody range-feedback">'; 
         	htmlelement+= '		<div class="headSection">';
       		htmlelement+= '			<h6 class="pull-left font18 inputhead tophead">Feedback  </h6>';
       		htmlelement+= '			<h6 class="pull-left  font14 tagtext" style="left: 45%;position: absolute;"><a id="rangeCollapse_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'">Collapse scale feedback</a></h6>';
       		htmlelement+='			<div class="clear"></div>';
       		htmlelement+= '			<h6 class="pull-left font18 inputhead tophead">Scoring: Frequency  </h6>';
       		htmlelement+= '		</div>';
       		htmlelement+='	<div class="clear"></div>';
       		htmlelement+='	<div id="rangeFeedback_'+this.pageIdPrefix+this.pageId+this.idPrefix+this.id+'" style="display:block;">';
       		for( j in this.criterias){
          		htmlelement+=  this.criterias[j].feedbackLayout(j,this.markers);
        	}
       		htmlelement+= '	</div></div>';
       	    htmlelement+='<div class="clear"></div>';
       	    return htmlelement;
        } ,
        updateCriteriaFeedback : function(e){
            var criteriaId = 0,criteriaFeedback="" ;
            try{            	
            	criteriaId = parseInt(e.currentTarget.id.substr(e.currentTarget.id.indexOf("RF")+2,e.currentTarget.id.length));
            	if(isNaN(criteriaId)){
            		return;
            	}
            	criteriaFeedback = e.currentTarget.innerHTML;
            	this.criterias[criteriaId].setFeedback(""+criteriaFeedback);
            }catch(err){console.error(err);}           	  
        }
};  