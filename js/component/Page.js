var Page = function(options) {
	this.id = null;
	this.components = [];
	this.reCompArray = [];
	this.gradedCount = 0;
	this.idPrefix = 'P';
	this.name = null;
	this.expandAllFlag = false;
	this.displaySetting = true;
	this.isBranchDest = false;		//set true if this used as destination for path mapping
	this.destBranchId = null;		// set branch id into destination
	$.extend(this, options);
	this._setActivePage = CheckBoxComponent.BindAsEventListener(this,
			this.setActivePage);
	this._setActiveQuestionInStudentView = CheckBoxComponent
			.BindAsEventListener(this, this.setActiveQuestionInStudentView);
	this._markPageForDelete = Page.BindAsEventListener(this,this.markPageForDelete);
	this.showToStud=true;//check for student/postsubmission layout
};
// add event helper method
Page.addEvent = function(oTarget, sEventType, fnHandler, args) {
	$("#" + oTarget).unbind(sEventType);
	$("#" + oTarget).bind(sEventType, args, fnHandler);
};
// use call to borrow context
Page.BindAsEventListener = function(object, fun) {
	return function(event) {
		event.stopImmediatePropagation();
		return fun.call(object, (event || window.event));
	};
};
Page.prototype = {
	getComponents : function() {
		return this.components;
	},
	setComponents : function(components) {
		this.components = components;
	},
	getReComponents : function() {
		return this.reCompArray;
	},
	setReComponents : function(reCompArray) {
		this.reCompArray = reCompArray;
	},
	getGradedCount : function() {
		return this.gradedCount;
	},
	setGradedCount : function(count) {
		var count = 0;
		var i = 0;
		for (i in this.components) {
			if (this.components[i].graded) {
				count++;
			}
		}
		this.gradedCount = count;
		$("#gdObjetPcHolder").text(count);
	},
	getIdPrefix : function() {
		return this.idPrefix;
	},
	setPrefix : function(idPrefix) {
		this.idPrefix = idPrefix;
	},
	getName : function(){
		return this.name;
	},
	setName : function(name){
		this.name = name;
	},
	getExpandAllFlag : function(){
		return this.expandAllFlag;
	},
	setExpandAllFlag : function(flag){
		this.expandAllFlag = flag;
	},
	getDisplaySetting : function(){
		return this.displaySetting;
	},
	setDisplaySetting : function(setting){
		this.displaySetting = setting;
	},
	getId : function() {
		return this.id;
	},
	setId : function(id) {
		this.id = id;
	},
	/* for branch destination */
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
	 * Function called when author select delete 
	 * part check box.
	 * **/
	markPageForDelete : function(event){
		var pageId = event.data.id;
		if($("#pageDelete_"+pageId).prop("checked")){
			question.markForDelete.push(pageId);
			$("#deletePartsButtonId").attr("disabled",false);
		}else{
			$.each(question.markForDelete,function(index,value){
				if(value ==pageId)
					question.markForDelete.splice(index,1);
			});
			if(question.markForDelete.length==0)
				$("#deletePartsButtonId").attr("disabled",true);
		}
	},
	doLayout : function() {
		var htmlelement = '';
		if (this.reCompArray.length == 0) {
			$(".allComponent").css("visibility","hidden");
		}else{
			$(".allComponent").css("visibility","");
		}
		$(".allComponent").html('<a id="expandall_'+this.id+'" class="expandAll">Collpase All</a>');

		
		util.reArrangeComponent(this);
		if (this.components.length > 0 && this.reCompArray.length > 0) {
			if(this.expandAllFlag){
				$("#expandall_"+this.id).text('Expand All');
			} else{
				$("#expandall_"+this.id).text('Collapse All');
			}

			var i = 0,
				v = 0;

			for (i in this.reCompArray) {
				var divIdToRemove = this.reCompArray[i].getPageIdPrefix()+this.reCompArray[i].getPageId()+this.reCompArray[i].getIdPrefix()
						+ this.reCompArray[i].getId();
				$("#" + divIdToRemove).remove();
				htmlelement = this.reCompArray[i].layout();
				this.orientationLayout(this.reCompArray[i]);
				$("#formToolCanvasId").append(htmlelement);
			}
		} else {
			//$("#formToolCanvasId").html('');
		}
		var j = 0;
		for (j in this.reCompArray) {
			if(this.reCompArray[j].type == "table"){
				for(k in this.components){
					if(this.reCompArray[j].id == this.components[k].id){
						this.components[k].afterLayout();
						//this.reCompArray[j].itsTableInstance = this.components[k].itsTableInstance;
					}
				}
			} else {
				this.reCompArray[j].afterLayout();	
			}
		}
		question.resetGradeCount();
		this.afterPageLayout();
	},
	setActivePage : function(event) {
		 if(question.activePage !=null){
			util.reArrangeComponent(question.activePage);
			var cnt=0;
	    	for(cnt in question.activePage.components){
	    		var divIdToRemove = question.activePage.components[cnt].getPageIdPrefix()+question.activePage.components[cnt].getPageId()+question.activePage.components[cnt].getIdPrefix()+question.activePage.components[cnt].getId();
    			$( "#"+divIdToRemove ).remove();
	    	}
    	}
		question.setActivePage(event.data.page);
		page = question.activePage;
		if(page.components.length==0){
		    $("#properties").hide();
	  		    $("#elementProperties").hide();
		}

		
	},
	/**
	 * Function to create page/part layout for author in design mode.
	 * **/
	pageLayout : function() {
		var checked = jQuery.inArray( this.id, question.markForDelete ) != -1 ? "checked='ckecked'" : "";
		//var hidden = this.id==1 ? "visibility:hidden" : "";
		var hidden = "";
		var htmlelement = '';

		htmlelement += '<div class="pageOuterWrapper"><div class="pageWithCount" id="page_' + this.id + '">';
		htmlelement += this.id;
		htmlelement += '	</div><div style="'+hidden+'"  class="radioalignmnt">';
		htmlelement += '		<input type="checkbox" id="pageDelete_'+this.id+'"  '+checked+' >';
		htmlelement += '			<label for="pageDelete_'+this.id+'"><span></span></label>';
		htmlelement += '</div></div>';
		return htmlelement;
	},
	/**
	 * function to bind events after page layout is called.
	 * */
	afterPageLayout : function() {
		Page.addEvent("page_" + this.id, "click", this.setActivePage, {page : this});
		Page.addEvent("pageDelete_" + this.id, "click", this._markPageForDelete,{id : this.id});
		Page.addEvent("expandall_"+this.id, "click", this.expandall, {page : this});
	},
	/**
	 * 	function to expand collpase all the comp 
	**/
	expandall : function(event) {
			if(question.activePage.components.length>0){
				var i=0;

			if(!event.data.page.expandAllFlag){
				$("#"+this.id).text('Expand All');
			} else{
				$("#"+this.id).text('Collapse All');
			}
			for( i in question.activePage.components){
	    		question.activePage.components[i].expandcollapseComponent(event.data.page.expandAllFlag);
	    	}
	    	event.data.page.expandAllFlag = !event.data.page.expandAllFlag;
	    }
	},
	/**
	 * 	function to collpase all the comp 
	**/
	collapseall : function() {
		var i=0;
		if(question.activePage.components.length>0){
			for( i in question.activePage.components){
	    		question.activePage.components[i].collapseComponent();
	    	}
	    }
	},
	/**
	 * Function to add new check box component on to the page.
	 * **/
	addCheckBoxComponent : function() {
		/*var newId = this.components.length > 0 ? this.components[this.components.length - 1]
				.getId() + 1
				: this.components.length + 1;*/
		//var newId = this.components.length + 1;
		var maxId = 0;
		var cnt = 0;
		for(cnt in this.components){
			var itsId = this.components[cnt].id;
			if(maxId < itsId){
				maxId = itsId
			}
		}		
		var newId = maxId + 1;
		var component = new CheckBoxComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id
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
			componentIdPrefix : this.idPrefix+this.id+component.idPrefix
		};
		sections[0]= new CheckboxComponentSection(config);
		var options = [];
		for (var i=1;i<=4;i++){
			var optionConfig = {
					id:i,
					sectionId : config.id,
					sectionIdPrefix : config.componentIdPrefix+config.componentId+sections[0].idPrefix,
					componentId : config.componentId,
					componentIdPrefix : config.componentIdPrefix
				};
			var option =new Option(optionConfig);
			options.push(option);
		}
		sections[0].setOptions(options);
		
		var sectionLabels = [];

		var configSectionLabel = {
			id : 2,
			componentId : component.id,
			componentIdPrefix : this.idPrefix+this.id+component.idPrefix,
			sectionId : sections[0].id,
			sectionIdPrefix : sections[0].idPrefix 
		};
		
		sectionLabels.push(new SectionLabel(configSectionLabel));	
		
		sections[0].setSectionLabels(sectionLabels);
		component.setSections(sections);
		
		this.components.push(component);
		var htmlelement = component.layout();
		if( $('.selectedComp').length > 0 ){
			$(htmlelement).insertAfter('.selectedComp');
			$('.selectedComp').remove();
		} else{
			$("#formToolCanvasId").append(htmlelement);
		}
		component.afterLayout();
	    $("#acptAnyAnsBtnId"+component.pageIdPrefix+component.pageId+component.idPrefix+component.id).trigger("click");
		$("#gradadedObjectBtnId"+component.pageIdPrefix+component.pageId+component.idPrefix+component.id).trigger("click");
	},
	/**
	 * Function to copy check box components.
	 * */
	copyCheckBoxComponent : function(object,newId) {
		var sections = new Array();
		$.each(object.sections, function(index, secObject) {
			var eConfig = {
					id : secObject.componentIdPrefix + newId
							+ secObject.idPrefix + secObject.id,
					text : secObject.editor.text,
			};
			var newEitor = new Editor(eConfig);
			var secConfig = {
				id : secObject.id,
				componentId : newId,
				componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
			};
			var section = new CheckboxComponentSection(secConfig);
			section.editor = newEitor;
			section.showSectionLabels = secObject.showSectionLabels;
			var sectionLabels = [];
			$.each(secObject.sectionLabels, function(index, labelObject) {
				var eConfig = {
						id : section.componentIdPrefix + section.componentId
							+ section.idPrefix + section.id
							+ labelObject.idPrefix + labelObject.id,
						text : labelObject.editor.text,
					};
				var newEitor = new Editor(eConfig);
				var configSectionLabel = {
						id : labelObject.id,
						componentId : section.componentId,
						componentIdPrefix : section.componentIdPrefix,
						sectionId : section.id,
						sectionIdPrefix : section.idPrefix 
					};
				var sectionLabel = new SectionLabel(configSectionLabel);
				sectionLabel.editor = newEitor;
				sectionLabels.push(sectionLabel);	
			});
			section.setSectionLabels(sectionLabels);
			
			var options = new Array();
			$.each(secObject.options, function(index, oObject) {
				var eConfig = {
					id : oObject.componentIdPrefix + newId
						+ section.idPrefix + section.id
						+ oObject.idPrefix + oObject.id,
					maxLength : oObject.editor.maxLength,
					text : oObject.editor.text,
					type : oObject.type
				};
				var fConfig = {
					id : oObject.componentIdPrefix + newId
							+ section.idPrefix + section.id
							+ oObject.idPrefix + oObject.id
							+ oObject.feedbackIdPrefix,
					maxLength : oObject.feedback.maxLength,
					text : oObject.feedback.text,
				};
				var sConfig = {
					id : oObject.componentIdPrefix + newId
							+ oObject.idPrefix + oObject.id
							+ oObject.studentIdPrefix,
					type : oObject.studentEditor.type
				};
				var newEitor = new OptionEditor(eConfig);
				var fEditor = new Editor(fConfig);
				var sEditor = new Editor(sConfig);					
				var optConfig = {
						id:  oObject.id,
						sectionId : section.id,
						sectionIdPrefix : section.componentIdPrefix+section.componentId+section.idPrefix,
						componentId : section.componentId,
						componentIdPrefix :section.componentIdPrefix,
						right : oObject.right,
						type : oObject.type
					};
				var option = new Option(optConfig);
				var pointEditorConfig={
						id : option.sectionIdPrefix + option.sectionId
						+oObject.pointsValuePrefix +oObject.id,
						text :  oObject.pointsValueEditor.text,
						allowNegative:true
				};
				var pointEditor = new NumericEditor(pointEditorConfig);
				option.setPointsValueEditor(pointEditor);
				option.editor = newEitor;
				option.feedback = fEditor;
				option.studentEditor = sEditor;
				options.push(option);
			});
			section.setOptions(options);
			section.subCategoryId = secObject.subCategoryId;
			sections.push(section);
		});
		var ranges=[];
		var subCategories = new Array();
		var subCategoryRanges=new Array();
		if(object.ranges!=null){
			
			$.each(object.ranges, function(index, rangeObj) {
				var minEConfig = {
					id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
							+ rangeObj.minRangePrefix + rangeObj.id,
					text : rangeObj.minRangeEditor.text,
					allowNegative:true
				};
				var newMinRangeEditor = new NumericEditor(minEConfig);
				var maxEConfig = {
						id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
								+ rangeObj.maxRangePrefix + rangeObj.id,
						text : rangeObj.maxRangeEditor.text,
						allowNegative:true
					};
				var newMaxRangeEditor = new NumericEditor(maxEConfig);
				var rangeEConfig = {
							id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
									+ rangeObj.feedbackPrefix + rangeObj.id,
							text : rangeObj.rangeFeedbackEditor.text,
						};
				var rangeFeedbackEditor = new Editor(rangeEConfig);
				var rangeConfig = {
					id : rangeObj.id,
					componentId : newId,
					componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
				};
				var range = new Range(rangeConfig);
				range.minRangeEditor = newMinRangeEditor;
				range.maxRangeEditor = newMaxRangeEditor;
				range.rangeFeedbackEditor = rangeFeedbackEditor;
				ranges.push(range);
			});
		}
		if(object.feedbackType =="rangedBasedSubcategories"){
			$.each(object.subCategories, function(index, oObject) {
				var eConfig = {
						id : oObject.componentIdPrefix + newId
						+oObject.subCategoryIdPrefix+oObject.id,
					text : oObject.editor.text,
					};
				var newEitor = new Editor(eConfig);
				var subCatConfig = {
					id : oObject.id,
					componentId : newId,
					componentIdPrefix : oObject.componentIdPrefix,
				};
				var subCategory = new CheckBoxSubCategory(subCatConfig);
				subCategory.editor = newEitor;
				subCategory.minPoint=oObject.minPoint;
				subCategory.maxPoint=oObject.maxPoint;	
				subCategory.awardPoints = oObject.awardPoints;
				subCategory.sectionIds = oObject.sectionIds;
				subCategory.optionIds = oObject.optionIds;
				subCategory.notApplicable = oObject.notApplicable
				subCategories.push(subCategory);
			});	
			
			$.each(object.subCategoryRanges, function(index, oObject) {
				var subCatRangeConfig = {
					id : oObject.id,
					componentId : newId,
					componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
					minPoint:oObject.minPoint,
					maxPoint:oObject.maxPoint	
				};
				var subCategoryRange = new CheckBoxSubCategoryRange(subCatRangeConfig);
				subCategoryRange.subCategories=oObject.subCategories;
				subCategoryRange.subCategoryId=oObject.subCategoryId;
				var subCatRanges=[];
				var i=0;
				for( i in oObject.ranges) {
					var minEConfig = {
							id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
								+ oObject.ranges[i].idPrefix+ oObject.ranges[i].minRangePrefix + oObject.ranges[i].id,
							text : oObject.ranges[i].minRangeEditor.text,
							allowNegative:true
						};
					var newMinRangeEditor = new NumericEditor(minEConfig);
					newMinRangeEditor.allowNegative = true;
					var maxEConfig = {
							id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
								+ oObject.ranges[i].idPrefix	+ oObject.ranges[i].maxRangePrefix + oObject.ranges[i].id,
							text : oObject.ranges[i].maxRangeEditor.text,
							allowNegative:true
						};
					var newMaxRangeEditor = new NumericEditor(maxEConfig);
					newMaxRangeEditor.allowNegative = true;
				
					var newMaxRangeEditor = new NumericEditor(maxEConfig);
					newMaxRangeEditor.allowNegative = true;
					var rangeEConfig = {
									id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
										+ oObject.ranges[i].idPrefix	+ oObject.ranges[i].feedbackPrefix + oObject.ranges[i].id,
									text : oObject.ranges[i].rangeFeedbackEditor.text,
							};
					var rangeFeedbackEditor = new Editor(rangeEConfig);
					var rangeConfig = {
						id : oObject.ranges[i].id,
						componentId : newId,
						componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix+newId+subCategoryRange.idPrefix,
						parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
						allowNegative:true
					};
					var range = new Range(rangeConfig);
					range.minRangeEditor = newMinRangeEditor;
					range.maxRangeEditor = newMaxRangeEditor;
					range.rangeFeedbackEditor = rangeFeedbackEditor;
					range.allowNegative=true;
					subCatRanges.push(range);
				}
				subCategoryRange.setRanges(subCatRanges);
				subCategoryRanges.push(subCategoryRange);
				
			});
		}
		var gfEditor = new Editor({
			id : object.pageIdPrefix+object.pageId+object.idPrefix + newId
					+ object.generalFeedbackPrefix,
			text : object.generalFeedback.text,
			maxLength : object.generalFeedback.maxLength
		});
		
		var ofFeedback = new Editor({
			id : object.pageIdPrefix+object.pageId+object.idPrefix + newId
					+ object.overallFeedbackPrefix,
			text : object.overallFeedback.text,
			maxLength : object.overallFeedback.maxLength
		});
		var component = new CheckBoxComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id,
		});
		
		
		component.setSections(sections);
		component.generalFeedback = gfEditor;
		component.overallFeedback = ofFeedback;
		component.acceptAnyAnswer = object.acceptAnyAnswer;
		component.graded = object.graded;
		component.minPoint=object.minPoint;
		component.maxPoint=object.maxPoint;
		component.mandatory=object.mandatory;
		component.feedbackType=object.feedbackType;
		component.feedbackScoringType=object.feedbackScoringType;
		component.feedBackScoringSelectionType=object.feedBackScoringSelectionType;
		component.answerOptionOrientation=object.answerOptionOrientation;
		component.hideSubCategoriesfromStudents=object.hideSubCategoriesfromStudents;
		component.showPointsToStudents =object.showPointsToStudents;
		component.hideSubCategoryToStudent = object.hideSubCategoryToStudent;
		component.notApplicable=object.notApplicable;
		component.awardMaximum=object.awardMaximum;
		component.awardMinimum=object.awardMinimum;
		if(ranges.length>0){
			component.setRanges(ranges);
		}
		if(object.feedbackType =="rangedBasedSubcategories"){
			component.setSubCategories(subCategories);
			component.setSubCategoryRanges(subCategoryRanges);
		}
		return component;
	},
	addMultipleChoiceComponent:function(){
		/*var newId = this.components.length > 0 ? this.components[this.components.length - 1]
		.getId() + 1
		: this.components.length + 1;*/
		//var newId = this.components.length + 1;
		var maxId = 0;
		var cnt = 0;
		for(cnt in this.components){
			var itsId = this.components[cnt].id;
			if(maxId < itsId){
				maxId = itsId
			}
		}		
		var newId = maxId + 1;
		var component = new MultipleChoiceComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id
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
			componentIdPrefix : this.idPrefix+this.id+component.idPrefix
		};
		sections[0]= new MultipleChoiceSection(config);
		var options = [];
		for (var i=1;i<=4;i++){
			var optionConfig = {
					id:i,
					sectionId : config.id,
					sectionIdPrefix : config.componentIdPrefix+config.componentId+sections[0].idPrefix,
					componentId : config.componentId,
					componentIdPrefix : config.componentIdPrefix
				};
			var option =new MultipleChoiceOption(optionConfig);
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
			optionAnswers[0]=new MultipleChoiceOptionAnswer(optionAnswersConfig);
			option.setAnswers(optionAnswers);
			options.push(option);
		}
		sections[0].setOptions(options);
		
		var sectionLabels = [];

		var configSectionLabel = {
			id : 1,
			componentId : component.id,
			componentIdPrefix : this.idPrefix+this.id+component.idPrefix,
			sectionId : sections[0].id,
			sectionIdPrefix : sections[0].idPrefix 
		};
		
		sectionLabels.push(new SectionLabel(configSectionLabel));	
		
		sections[0].setSectionLabels(sectionLabels);
		
		
		component.setSections(sections);
		this.components.push(component);
		var htmlelement = component.layout();
		if( $('.selectedComp').length > 0 ){
			$(htmlelement).insertAfter('.selectedComp');
			$('.selectedComp').remove();
		} else{
			$("#formToolCanvasId").append(htmlelement);
		}
		
		component.afterLayout();
		this.orientationLayout(component);
		$("#acptAnyAnsBtnId"+component.pageIdPrefix+component.pageId+component.idPrefix+component.id).trigger("click");
		$("#gradadedObjectBtnId"+component.pageIdPrefix+component.pageId+component.idPrefix+component.id).trigger("click");

	},
	/**
	 * Function to copy Multiple Choice components.
	 * */
	copyMultipleChoiceComponent : function(object,newId) {
		var ranges=[];
		var subCategories = new Array();
		var subCategoryRanges=new Array();
		if(object.ranges!=null){
			
			$.each(object.ranges, function(index, rangeObj) {
				var minEConfig = {
					id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
							+ rangeObj.minRangePrefix + rangeObj.id,
					text : rangeObj.minRangeEditor.text,
					allowNegative:true
				};
				var newMinRangeEditor = new NumericEditor(minEConfig);
				var maxEConfig = {
						id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
								+ rangeObj.maxRangePrefix + rangeObj.id,
						text : rangeObj.maxRangeEditor.text,
						allowNegative:true
					};
				var newMaxRangeEditor = new NumericEditor(maxEConfig);
				var rangeEConfig = {
							id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
									+ rangeObj.feedbackPrefix + rangeObj.id,
							text : rangeObj.rangeFeedbackEditor.text,
						};
				var rangeFeedbackEditor = new Editor(rangeEConfig);
				var rangeConfig = {
					id : rangeObj.id,
					componentId : newId,
					componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
				};
				var range = new Range(rangeConfig);
				range.minRangeEditor = newMinRangeEditor;
				range.maxRangeEditor = newMaxRangeEditor;
				range.rangeFeedbackEditor = rangeFeedbackEditor;
				ranges.push(range);
			});
			
		}
		
			
			if(object.feedbackType =="rangedBasedSubcategories"){
				$.each(object.subCategories, function(index, oObject) {
					var eConfig = {
							id : oObject.componentIdPrefix + newId
							+oObject.subCategoryIdPrefix+oObject.id,
						text : oObject.editor.text,
						};
					var newEitor = new Editor(eConfig);
					var subCatConfig = {
						id : oObject.id,
						componentId : newId,
						componentIdPrefix : oObject.componentIdPrefix,
					};
					var subCategory = new MultipleChoiceSubCategory(subCatConfig);
					subCategory.editor = newEitor;
					subCategory.minPoint=oObject.minPoint;
					subCategory.maxPoint=oObject.maxPoint;	
					subCategory.awardPoints = oObject.awardPoints;
					subCategory.notApplicable=oObject.notApplicable;
					subCategory.sectionIds = oObject.sectionIds;
					subCategory.optionIds = oObject.optionIds;
					subCategories.push(subCategory);
				});	
				
				$.each(object.subCategoryRanges, function(index, oObject) {
					var subCatRangeConfig = {
						id : oObject.id,
						componentId : newId,
						componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
						minPoint:oObject.minPoint,
						maxPoint:oObject.maxPoint	
					};
					var subCategoryRange = new MultipleChoiceSubCategoryRange(subCatRangeConfig);
					subCategoryRange.subCategories=oObject.subCategories;
					subCategoryRange.subCategoryId=oObject.subCategoryId;
					var subCatRanges=[];
					var i=0;
					for( i in oObject.ranges) {
						var minEConfig = {
								id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
									+ oObject.ranges[i].idPrefix+ oObject.ranges[i].minRangePrefix + oObject.ranges[i].id,
								text : oObject.ranges[i].minRangeEditor.text,
							};
						var newMinRangeEditor = new NumericEditor(minEConfig);
						newMinRangeEditor.allowNegative = true;
						var maxEConfig = {
								id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
									+ oObject.ranges[i].idPrefix	+ oObject.ranges[i].maxRangePrefix + oObject.ranges[i].id,
								text : oObject.ranges[i].maxRangeEditor.text,
							};
						var newMaxRangeEditor = new NumericEditor(maxEConfig);
						newMaxRangeEditor.allowNegative = true;
					
						var newMaxRangeEditor = new NumericEditor(maxEConfig);
						newMaxRangeEditor.allowNegative = true;
						var rangeEConfig = {
										id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
											+ oObject.ranges[i].idPrefix	+ oObject.ranges[i].feedbackPrefix + oObject.ranges[i].id,
										text : oObject.ranges[i].rangeFeedbackEditor.text,
								};
						var rangeFeedbackEditor = new Editor(rangeEConfig);
						var rangeConfig = {
							id : oObject.ranges[i].id,
							componentId : newId,
							componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix+newId+subCategoryRange.idPrefix,
							parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
							allowNegative:true
						};
						var range = new Range(rangeConfig);
						range.minRangeEditor = newMinRangeEditor;
						range.maxRangeEditor = newMaxRangeEditor;
						range.rangeFeedbackEditor = rangeFeedbackEditor;
						range.allowNegative=true;
						subCatRanges.push(range);
					}
					subCategoryRange.setRanges(subCatRanges);
					subCategoryRanges.push(subCategoryRange);
					
				});
			}
			var sections = new Array();
			$.each(object.sections, function(index, oObject) {
			var eConfig = {
					id : oObject.componentIdPrefix + newId
							+ oObject.idPrefix + oObject.id,
					text : oObject.editor.text,
			};
			var newEitor = new Editor(eConfig);
			var secConfig = {
				id : oObject.id,
				componentId : newId,
				componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
			};
			var section = new MultipleChoiceSection(secConfig);
			section.subCategoryId=oObject.subCategoryId;
			section.editor = newEitor;
			var options=[];
			var i=0;
			for (i in oObject.options) {		
				var optionConfig = {
						id: oObject.options[i].id,
						sectionId : section.id,
						sectionIdPrefix : section.componentIdPrefix+section.componentId+section.idPrefix,
						componentId : section.componentId,
						componentIdPrefix :section.componentIdPrefix,
					};
				var option =new MultipleChoiceOption(optionConfig);
				var optionEditorConfig={
						id : optionConfig.sectionIdPrefix + optionConfig.sectionId
						+ oObject.options[i].idPrefix + oObject.options[i].id,
						text : oObject.options[i].editor.text,
				};
				var newOptionEitor = new Editor(optionEditorConfig);
				option.setEditor(newOptionEitor);
				
				var optionAnswers = [];
				var j=0;
				for (j in oObject.options[i].answers) {
					var optionAnswersConfig = {
							id:oObject.options[i].answers[j].id,
							optionId : option.id,
							optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
							componentId : option.componentId,
          					componentIdPrefix : option.componentIdPrefix,
          					sectionId : option.sectionId,
        					sectionIdPrefix : option.sectionIdPrefix,
							right:oObject.options[i].answers[j].right,
							label:oObject.options[i].answers[j].label
						};
					var optionAnswer = new MultipleChoiceOptionAnswer(optionAnswersConfig);
					var pointEditorConfig={
							id : optionAnswersConfig.optionIdPrefix + optionAnswersConfig.optionId
							+ oObject.options[i].answers[j].pointsValuePrefix + oObject.options[i].answers[j].id,
							text :  oObject.options[i].answers[j].pointsValueEditor.text,
							allowNegative:true
					};
					var pointEditor = new NumericEditor(pointEditorConfig);
					optionAnswer.setPointsValueEditor(pointEditor);
					
					var feedbackEditorConfig={
							id : optionAnswersConfig.optionIdPrefix + optionAnswersConfig.optionId
							+ oObject.options[i].answers[j].feedbackIdPrefix + oObject.options[i].answers[j].id,
							text :  oObject.options[i].answers[j].feedback.text,
					};
					var feedbackEditor = new Editor(feedbackEditorConfig);
					optionAnswer.setFeedback(feedbackEditor);
					optionAnswers.push(optionAnswer);
				}
				option.setAnswers(optionAnswers);
				option.subCategoryId  =oObject.options[i].subCategoryId;
				options.push(option);
			}
			section.setOptions(options);
			var z=0;
			for (z in oObject.sectionLabels) {
			var sectionLabelConfig = {
    				id : oObject.sectionLabels[z].id,
    				componentId : newId,
    				componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
    				sectionId : oObject.id,
					sectionIdPrefix : oObject.idPrefix,					
    			};
    			var sectionLabel = new SectionLabel(sectionLabelConfig);
    			sectionLabel.editor.text=oObject.sectionLabels[z].editor.text;
    			section.sectionLabels.push(sectionLabel);
    			section.showSectionLabels = oObject.showSectionLabels;
			
			
			}
			section.subCategoryId = oObject.subCategoryId;
			sections.push(section);
		});
		
		
		
		var gfEditor = new Editor({
			id : object.pageIdPrefix+object.pageId+object.idPrefix + newId
					+ object.generalFeedbackPrefix,
			text : object.generalFeedback.text,
		});
		
		var ofFeedback = new Editor({
			id : object.pageIdPrefix+object.pageId+object.idPrefix + newId
					+ object.overallFeedbackPrefix,
			text : object.overallFeedback.text,
		});
		var component = new MultipleChoiceComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id,
			feedbackScoringType : object.feedbackScoringType
		});
		if(ranges.length>0){
			component.setRanges(ranges);
		}
		component.generalFeedback = gfEditor;
		component.overallFeedback = ofFeedback;
		component.acceptAnyAnswer = object.acceptAnyAnswer;
		component.graded = object.graded;
		component.feedbackType=object.feedbackType;
		component.feedbackScoringType =object.feedbackScoringType;
		component.choiceOptionVal1= object.choiceOptionVal1;
		component.choiceOptionVal2= object.choiceOptionVal2;
		component.answerOptionOrientation=object.answerOptionOrientation;
		component.binaryAnswer=object.binaryAnswer;
		component.showPointsToStudents =object.showPointsToStudents;
		component.subType=object.subType;
		component.hideSubCategoriesfromStudents=object.hideSubCategoriesfromStudents;
		component.notApplicable=object.notApplicable;
		if(object.feedbackType =="rangedBasedSubcategories"){
			component.setSubCategories(subCategories);
			component.setSubCategoryRanges(subCategoryRanges);
		}
		component.setSections(sections);
		component.mandatory=object.mandatory;
		return component;
	},
	/**
	 * Function to add scale component on to the page.
	 * **/
	addScaleComponent : function() {
		/*var newId = this.components.length > 0 ? this.components[this.components.length - 1]
				.getId() + 1
				: this.components.length + 1;*/
		//var newId = this.components.length + 1;
		var maxId = 0;
		var cnt = 0;
		for(cnt in this.components){
			var itsId = this.components[cnt].id;
			if(maxId < itsId){
				maxId = itsId
			}
		}		
		var newId = maxId + 1;
		var component = new ScaleComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id
		});
		var criterias = [];

		var config = {
			componentId : component.id,
			componentIdPrefix : this.idPrefix+this.id+component.idPrefix
		};
		for (var i=1;i<=4;i++){
			config.id=i;
			criterias.push(new ScaleCriteria(config));	
		}
		
		component.setCriterias(criterias);
		
		var scaleLabels = [];

		var configScaleLabel = {
			id : 1,
			componentId : component.id,
			componentIdPrefix : this.idPrefix+this.id+component.idPrefix
		};
		
		scaleLabels.push(new ScaleLabel(configScaleLabel));	
		
		component.setScaleLabels(scaleLabels);
		
		var statements = [];

		var statementConfig = {
				componentId : component.id,
				componentIdPrefix : this.idPrefix+this.id+component.idPrefix
			};
		for (var i=1;i<=4;i++){
			statementConfig.id=i;
			statements.push(new Statement(statementConfig));	
			question.gradedCount = question.gradedCount+1;
		}
		
		component.setStatements(statements);
		var range=new Array();
		var rangeConfig = {
				componentId : component.id,
				componentIdPrefix : this.idPrefix+this.id+component.idPrefix,
				allowNegative:true
			};
		for (var i=1;i<=3;i++){
			rangeConfig.id=i;
			range.push(new Range(rangeConfig));	
		}
		component.setRanges(range);
		this.components.push(component);
		var htmlelement = component.layout();
		if( $('.selectedComp').length > 0 ){
			$(htmlelement).insertAfter('.selectedComp');
			$('.selectedComp').remove();
		} else{
			$("#formToolCanvasId").append(htmlelement);
		}
		component.afterLayout();
		$("#gdObjetPcHolder").text(question.gradedCount);
	},
	/**
	 * Function to copy check box components.
	 * */
	copyScaleComponent : function(object,newId) {
		
		var subCategories = new Array();
		var subCategoryRanges=new Array();
		if(object.scaleType =="M"){
			$.each(object.subCategories, function(index, oObject) {
				var eConfig = {
					id : oObject.componentIdPrefix + newId
						+oObject.subCategoryIdPrefix+oObject.id,
					text : oObject.editor.text,
				};
				var newEitor = new Editor(eConfig);
				var subCatConfig = {
					id : oObject.id,
					componentId : newId,
					componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
				};
				var subCategory = new ScaleSubCategory(subCatConfig);
				subCategory.editor = newEitor;
				subCategory.minPoint=oObject.minPoint;
				subCategory.maxPoint=oObject.maxPoint;
				subCategory.notApplicable=oObject.notApplicable;
				subCategory.awardPoints = oObject.awardPoints;
				subCategories.push(subCategory);
				
			});		
		
			$.each(object.subCategoryRanges, function(index, oObject) {
				var subCatRangeConfig = {
					id : oObject.id,
					componentId : newId,
					componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
					minPoint:oObject.minPoint,
					maxPoint:oObject.maxPoint	
				};
				var subCategoryRange = new SubCategoryRange(subCatRangeConfig);
				subCategoryRange.subCategories=oObject.subCategories;
				subCategoryRange.subCategoryId=oObject.subCategoryId;
				var subCatRanges=[];
				var i=0;
				for( i in oObject.ranges) {
					var minEConfig = {
						id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
							+ oObject.ranges[i].idPrefix+ oObject.ranges[i].minRangePrefix + oObject.ranges[i].id,
						text : oObject.ranges[i].minRangeEditor.text,
					};
					var newMinRangeEditor = new NumericEditor(minEConfig);
					newMinRangeEditor.allowNegative = true;
					var maxEConfig = {
							id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
								+ oObject.ranges[i].idPrefix	+ oObject.ranges[i].maxRangePrefix + oObject.ranges[i].id,
							text : oObject.ranges[i].maxRangeEditor.text,
						};
					var newMaxRangeEditor = new NumericEditor(maxEConfig);
					newMaxRangeEditor.allowNegative = true;
					var rangeEConfig = {
								id : subCatRangeConfig.componentIdPrefix+newId+subCategoryRange.idPrefix +subCategoryRange.id
									+ oObject.ranges[i].idPrefix	+ oObject.ranges[i].feedbackPrefix + oObject.ranges[i].id,
								text : oObject.ranges[i].rangeFeedbackEditor.text,
							};
					var rangeFeedbackEditor = new Editor(rangeEConfig);
					var rangeConfig = {
						id : oObject.ranges[i].id,
						componentId : newId,
						componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix+newId+subCategoryRange.idPrefix,
						parent:{type:'subCategoryFeedback',id:subCategoryRange.id},
						allowNegative:true
					};
					var range = new Range(rangeConfig);
					range.minRangeEditor = newMinRangeEditor;
					range.maxRangeEditor = newMaxRangeEditor;
					range.rangeFeedbackEditor = rangeFeedbackEditor;
					range.allowNegative=true;
					subCatRanges.push(range);
				}
				subCategoryRange.setRanges(subCatRanges);
				subCategoryRanges.push(subCategoryRange);
			});
		}
		
		var criterias = new Array();
		$.each(object.criterias, function(index, oObject) {
			var eConfig = {
				id : oObject.componentIdPrefix + newId
					+oObject.idPrefix+oObject.textIdPrefix+oObject.id,
				text : oObject.editor.text,
			};
			var newEitor = new Editor(eConfig);
			var pConfig = {
					id : oObject.componentIdPrefix + newId
							+ oObject.idPrefix+oObject.pointIdPrefix + oObject.id,
					text : oObject.pointEditor.text,
					placeholder:'Pts.',
					allowNegative:true
				};
			var newPointEitor = new NumericEditor(pConfig);
			var fConfig = {
					id : oObject.componentIdPrefix + newId
						+oObject.idPrefix + oObject.feedbackIdPrefix + oObject.id,
					text : oObject.feedbackEditor.text,
				};
				var fnewEitor = new Editor(fConfig);	
				
			var criteriaConfig = {
				id : oObject.id,
				componentId : newId,
				componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
			};
			var criteria = new ScaleCriteria(criteriaConfig);
			criteria.editor = newEitor;
			criteria.pointEditor=newPointEitor;
			criteria.feedbackEditor=fnewEitor;
			criterias.push(criteria);
		});
		
		var scaleLabels = new Array();
		$.each(object.scaleLabels, function(index, oObject) {
			var eConfig = {
				id : oObject.componentIdPrefix + newId
					+oObject.idPrefix+oObject.id,
				text : oObject.editor.text,
			};
			var newEitor = new Editor(eConfig);
			var scaleLabelConfig = {
				id : oObject.id,
				componentId : newId,
				componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
				isDisabled : oObject.isDisabled
			};
			var scaleLabel = new ScaleLabel(scaleLabelConfig);
			scaleLabel.editor = newEitor;
			scaleLabels.push(scaleLabel);
		});
		
		var statements = new Array();
		$.each(object.statements, function(index, oObject) {
			var eConfig = {
				id : oObject.componentIdPrefix + newId
					+oObject.statementIdPrefix+oObject.id,
				text : oObject.editor.text,
			};
			var newEitor = new Editor(eConfig);
			var wConfig = {
					id : oObject.componentIdPrefix + newId
							+oObject.weightIdPrefix + oObject.id,
					text : oObject.weightEditor.text,
					placeholder:'Weight',
					allowNegative:true
				};
				var newWeightEitor = new NumericEditor(wConfig);
			var statementConfig = {
				id : oObject.id,
				componentId : newId,
				componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
			};
			if(oObject.graded==true)
			{
				question.gradedCount = question.gradedCount+1;
			}
			var statement = new Statement(statementConfig);
			statement.editor = newEitor;
			statement.subCategoryIds=oObject.subCategoryIds;
			statement.graded=oObject.graded;
			statement.mandatory= oObject.mandatory;
			statement.weightEditor=newWeightEitor;
			statements.push(statement);
		});
		var ranges = new Array();
		$.each(object.ranges, function(index, rangeObj) {
			var minEConfig = {
				id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
						+ rangeObj.minRangePrefix + rangeObj.id,
				text : rangeObj.minRangeEditor.text,
				allowNegative:true
			};
			var newMinRangeEditor = new NumericEditor(minEConfig);
			var maxEConfig = {
					id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
							+ rangeObj.maxRangePrefix + rangeObj.id,
					text : rangeObj.maxRangeEditor.text,
					allowNegative:true
				};
			var newMaxRangeEditor = new NumericEditor(maxEConfig);
			var rangeEConfig = {
						id : rangeObj.componentIdPrefix + newId+rangeObj.idPrefix
								+ rangeObj.feedbackPrefix + rangeObj.id,
						text : rangeObj.rangeFeedbackEditor.text,
					};
			var rangeFeedbackEditor = new Editor(rangeEConfig);
			var rangeConfig = {
				id : rangeObj.id,
				componentId : newId,
				componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
				allowNegative:true
			};
			var range = new Range(rangeConfig);
			range.minRangeEditor = newMinRangeEditor;
			range.maxRangeEditor = newMaxRangeEditor;
			range.rangeFeedbackEditor = rangeFeedbackEditor;
			ranges.push(range);
		});
		var component = new ScaleComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id,
			feedbackScoringType : object.feedbackScoringType
		});		
		component.showPointsToStudents=object.showPointsToStudents;
		component.notApplicable=object.notApplicable;
		component.notApplicableExemptsScale=object.notApplicableExemptsScale;
		component.awardMaximum=object.awardMaximum;
		component.awardMinimum=object.awardMinimum;		
		component.minPoint=object.minPoint;
		component.maxPoint=object.maxPoint;
		component.scaleType=object.scaleType;
		component.setCriterias(criterias);
		component.setStatements(statements);
		component.setScaleLabels(scaleLabels);
		component.setRanges(ranges);
		component.hideSubCategoryToStudent=object.hideSubCategoryToStudent;
		if(object.scaleType=='M'){
			component.setSubCategories(subCategories);
			component.setSubCategoryRanges(subCategoryRanges);
		}
		component.mandatory=object.mandatory;
		return component;
	},
	addInputFieldComponent:function(){
		/*var newId = this.components.length > 0 ? this.components[this.components.length - 1]
		.getId() + 1
		: this.components.length + 1;*/
		//var newId = this.components.length + 1;
		var maxId = 0;
		var cnt = 0;
		for(cnt in this.components){
			var itsId = this.components[cnt].id;
			if(maxId < itsId){
				maxId = itsId
			}
		}		
		var newId = maxId + 1;
		var component = new InputFieldComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id
		});
		
		component.generalFeedback = null;
		component.overallFeedback = null;
		var sections = [];
		
		var config = {
			id:1,
			componentId : component.id,
			componentIdPrefix : this.idPrefix+this.id+component.idPrefix
		};
		sections[0]= new InputFieldSection(config);
		var editors=[];
		var authorEntryConfig = {
				id:1,
				componentId : component.id,
				componentIdPrefix : this.idPrefix+this.id+component.idPrefix,
				sectionId:sections[0].id,
				type:"label"
			};
		editors[0] =new AuthorEntry(authorEntryConfig);
		sections[0].setAuthorEntries(editors);
		
		component.setSections(sections);
		this.components.push(component);
		var htmlelement = component.layout();
		if( $('.selectedComp').length > 0 ){
			$(htmlelement).insertAfter('.selectedComp');
			$('.selectedComp').remove();
		} else{
			$("#formToolCanvasId").append(htmlelement);
		}
		component.afterLayout();
		$("#acptAnyAnsBtnId"+component.pageIdPrefix+component.pageId+component.idPrefix+component.id).trigger("click");
		$("#gradadedObjectBtnId"+component.pageIdPrefix+component.pageId+component.idPrefix+component.id).trigger("click");
		

	},
	/**
	 * Function to copy inputFiels component.
	 * */
	copyInputFieldComponent : function(object,newId) {
		var authorEntriesWithFormula=[],studentEntryFeedbacks=[];
		var sections = new Array();
		$.each(object.sections, function(index, sectionObj) {
			
			var authorEntries=[];
			var i=0;
			for (i in sectionObj.authorEntries) {
				var authorEntryConfig = {
						id:sectionObj.authorEntries[i].id,
						componentId : newId,
						componentIdPrefix : sectionObj.componentIdPrefix,
						sectionId:sectionObj.id,
						orientation : sectionObj.authorEntries[i].orientation,
						isDisabled : sectionObj.authorEntries[i].isDisabled,
						type:sectionObj.authorEntries[i].type
					};
				var authorEntry = new AuthorEntry(authorEntryConfig);
				var eConfig = {
						id : sectionObj.componentIdPrefix + newId
								+ sectionObj.idPrefix + sectionObj.id+authorEntry.idPrefix+authorEntry.id,
						text : sectionObj.authorEntries[i].editor.text						
					};
					
				authorEntry.editor = new Editor(eConfig);
				authorEntries.push(authorEntry);	
				if(authorEntry.editor.text.indexOf("F") != -1){
					authorEntriesWithFormula.push(authorEntry);	
				}
			}
			var studentEntries=null;
			if(object.subType!='label'){
				studentEntries=[];
				var j=0;
				for (j in sectionObj.studentEntries) {
					var conentFormatter=sectionObj.studentEntries[j].contentFormat;
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
					var studentEntryConfig = {
							id:sectionObj.studentEntries[j].id,
							componentId : newId,
							componentIdPrefix : sectionObj.componentIdPrefix,
							sectionId:sectionObj.id,
							orientation : sectionObj.studentEntries[j].orientation,
							contentFormat : contentFormat
						};
					var studentEntry = new StudentEntry(studentEntryConfig);
					var eConfig = {
							id : sectionObj.componentIdPrefix + newId
									+ sectionObj.idPrefix + sectionObj.id+studentEntry.idPrefix+studentEntry.id,
							text : sectionObj.studentEntries[j].editor.text,
							maxLength : sectionObj.studentEntries[j].editor.maxLength
						};
						
					studentEntry.editor = new Editor(eConfig);
					var aConfig = {
							id : sectionObj.componentIdPrefix + newId
									+ sectionObj.idPrefix + sectionObj.id+studentEntry.answerIdPrefix+studentEntry.id,
							text : sectionObj.studentEntries[j].answer.text,
						};
						
					studentEntry.answer = new Editor(aConfig);
					var fConfig = {
							id : sectionObj.componentIdPrefix + newId
									+ sectionObj.idPrefix + sectionObj.id+studentEntry.feedbackIdPrefix+studentEntry.id,
							text : sectionObj.studentEntries[j].feedback.text,
						};
						
					studentEntry.feedback = new Editor(fConfig);
					studentEntries.push(studentEntry);
					if(studentEntry.feedback.text.indexOf("F") != -1){
						studentEntryFeedbacks.push(studentEntry.feedback);	
					}
				}
			
			}
			var secConfig = {
					id : sectionObj.id,
					componentId : newId,
					componentIdPrefix : object.pageIdPrefix+object.pageId+object.idPrefix,
				};
			var section = new InputFieldSection(secConfig);
			section.setAuthorEntries(authorEntries);
			section.setStudentEntries(studentEntries);
			sections.push(section);
		});
		var component = new InputFieldComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id,
		});		
		component.subType=object.subType;
		component.setSections(sections);
		if(object.subType!='label'){
			component.generalFeedback = new Editor({
				id : object.pageIdPrefix + object.pageId + object.idPrefix
						+ newId + object.generalFeedbackPrefix,
				text : object.generalFeedback.text,
				maxLength : object.generalFeedback.maxLength
			});
			component.overallFeedback = ofEditor = new Editor({
				id : object.pageIdPrefix + object.pageId + object.idPrefix
						+ newId + object.overallFeedbackPrefix,
				text : object.overallFeedback.text,
				maxLength : object.overallFeedback.maxLength
			});
			component.acceptAnyAnswer = object.acceptAnyAnswer;
			component.graded = object.graded;
		}
		component.mandatory=object.mandatory;
		this.copyFormulaDestinations(component,studentEntryFeedbacks,authorEntriesWithFormula);
		return component;
	},
	addTableComponent:function(){
		
		var maxId = 0;
		var cnt = 0;
		for(cnt in this.components){
			var itsId = this.components[cnt].id;
			if(maxId < itsId){
				maxId = itsId
			}
		}		
		var newId = maxId + 1;
		var component = new TableComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id
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
	
		this.components.push(component);
		var htmlelement = component.layout();
		if( $('.selectedComp').length > 0 ){
			$(htmlelement).insertAfter('.selectedComp');
			$('.selectedComp').remove();
		} else{
			$("#formToolCanvasId").append(htmlelement);
		}
		component.afterLayout();
		
	},
	/**
	 * Function to copy Table component.
	 * */
	copyTableComponent : function(object,newId) {
		var authorEntriesWithFormula=[],studentEntryFeedbacks=[];
		var compId = this.pageIdPrefix+this.pageId+this.idPrefix+newId;
		var component = new TableComponent({
			id : newId,
			pageIdPrefix:this.idPrefix,
			pageId:this.id,
		});		
		component.subType=object.subType;
		component.type=object.type;
		component.RowReadOnly = object.RowReadOnly;
		component.rowCount = object.rowCount;
		component.colCount = object.colCount;
		component.showTableId = object.showTableId;
		component.tableData=object.tableData;
		console.log("object.tableData"+object.tableData);
		component.mergedCellInfoCollection = object.mergedCellInfoCollection;
		component.CustomBorders = object.CustomBorders;
		component.colWidth=object.colWidth.slice(0);
		component.colCount=object.colCount;
		component.rowCount=object.rowCount;
		component.showNotApplicable = object.showNotApplicable;
		component.notApplicableFlag = object.notApplicableFlag;
		component.isUnlockRows=object.isUnlockRows;
		component.generalFeedback = new Editor({
			id : object.pageIdPrefix + object.pageId + object.idPrefix
					+ newId + object.generalFeedbackPrefix,
			text : object.generalFeedback.text,
			maxLength : object.generalFeedback.maxLength
		});
		component.overallFeedback = ofEditor = new Editor({
			id : object.pageIdPrefix + object.pageId + object.idPrefix
					+ newId + object.overallFeedbackPrefix,
			text : object.overallFeedback.text,
			maxLength : object.overallFeedback.maxLength
		});
		component.mandatory=object.mandatory;
		this.copyFormulaDestinations(component,studentEntryFeedbacks,authorEntriesWithFormula);
		return component;
	},
	
	/**
	 * Function to create copy of component
	 * @param componentId
	 */
	copyComponent:function(componentId){
		util.gatherData();
		var componentToCopy=null;
		var compIndex = null;
		$.each(this.components, function(index, object) {
			if (object.id == componentId) {
				componentToCopy =object;
				compIndex = index;
			}
		});
		//var newId = this.components.length > 0 ? this.components.length +1 : this.components.length + 1;
		var maxId = 0;
		var cnt = 0;
		for(cnt in this.components){
			var itsId = this.components[cnt].id;
			if(maxId < itsId){
				maxId = itsId;
			}
		}		
		var newId = maxId + 1;
		
		var newComponent=null;
		if(componentToCopy.type=="checkbox"){
			newComponent = this.copyCheckBoxComponent(componentToCopy,newId);
		}else if(componentToCopy.type=="multiplechoice"){
			newComponent =  this.copyMultipleChoiceComponent(componentToCopy,newId);
		}else if(componentToCopy.type=="scale"){
			newComponent =  this.copyScaleComponent(componentToCopy,newId);
		}else if(componentToCopy.type=="inputField"){
			newComponent =  this.copyInputFieldComponent(componentToCopy,newId);
		}else if(componentToCopy.type=="table"){
			newComponent =  this.copyTableComponent(componentToCopy,newId);
		}
		
		this.components.splice(compIndex+1, 0, newComponent);
		//this.components.push(newComponent);
		var htmlelement = newComponent.layout();
		//$("#formToolCanvasId").append(htmlelement);
		$(htmlelement).insertAfter("#P"+this.id+"C"+componentId);
		newComponent.afterLayout();
		if(newComponent.type=="multiplechoice"){
			this.orientationLayout(newComponent);
		}
		else if(newComponent.type=="table"){
			this.updateCopiedTableCellData(componentToCopy, newComponent);
			question.resetGradeCount();
		}
		if(newComponent.graded==true){
			question.gradedCount = question.gradedCount+1;
		} 
		$("#gdObjetPcHolder").text(question.gradedCount);
		this.doLayout();
	},
	updateCopiedTableCellData : function(oldComponent, newComponent){
		var oldCompId = oldComponent.pageIdPrefix + oldComponent.pageId + oldComponent.idPrefix + oldComponent.id;
		var newCompId = newComponent.pageIdPrefix + newComponent.pageId + newComponent.idPrefix + newComponent.id;
		
		var compArr = oldComponent.cellComponentCollection;
		newComponent.cellComponentCollection = [];
		newComponent.cellHTMLCollection = [];
     	for (var i in compArr) {
			var element = compArr[i];
			var cmpType = "";
			//calculate cell row and column index
			var rowIndex = $("#"+element.id).parent().index();
            var colIndex = $("#"+element.id).index() - 1;
			var cellIndex = Handsontable.helper.spreadsheetColumnLabel(colIndex) + rowIndex;
			
			var cellId = newCompId + cellIndex;
			var oldCellId = oldCompId + cellIndex;
			newComponent.cellComponentCollection.push({"id":cellId, "component":""});
			newComponent.cellHTMLCollection.push({"id":cellId, "itsHtml":""});
			if(element.component != ""){
				var isFormula = false;
				cmpType = element.component.type;
				newComponent.populateEditorProperties(cellId);
				newComponent.itsTableInstance.selectCell(rowIndex,colIndex);
				var newCellCmp = null;
				if (cmpType == "Checkbox") {
					$("#CheckBox"+newCompId).trigger("click");
					newCellCmp = newComponent.getItemValById(newComponent.cellComponentCollection, cellId, "component");
					newCellCmp.graded = element.component.graded;
					newCellCmp.mandatory=element.component.mandatory;
					newCellCmp.acceptAnyAnswer = element.component.acceptAnyAnswer;
					newCellCmp.options[0].right = element.component.options[0].right;
					newCellCmp.options[0].editor.text = element.component.options[0].editor.text;
					$("#checkboxValSave_"+cellId).trigger("click");
				}else if (cmpType == "Dropdown menu") {
    				$("#dropDown"+newCompId).trigger("click");
    				newCellCmp = newComponent.getItemValById(newComponent.cellComponentCollection, cellId, "component");
    				newCellCmp.graded = element.component.graded;
    				newCellCmp.mandatory=element.component.mandatory;
    				newCellCmp.acceptAnyAnswer = element.component.acceptAnyAnswer;
    				newCellCmp.sections[0].editor.text = element.component.sections[0].editor.text;
    				$("#" + newCellCmp.sections[0].editor.id).html($("#"+element.component.sections[0].editor.id).html());
    				var i=0;
    				for (i in element.component.sections[0].options) {
    					var oldSection = element.component.sections[0];
    					var newSection = newCellCmp.sections[0];
    					
    					if(newCellCmp.sections[0].options[i]){
    						newCellCmp.sections[0].options[i].editor.text = oldSection.options[i].editor.text;
    						newCellCmp.sections[0].options[i].answers[0].right = oldSection.options[i].answers[0].right;
    					}
    					else{
    						
    						var optionConfig = {
    								id: parseInt(i)+1,
    								sectionId : newSection.id,
    								sectionIdPrefix : newSection.componentIdPrefix+newSection.componentId+cellIndex+newSection.idPrefix,
    								componentId : newSection.componentId,
    								componentIdPrefix :newSection.componentIdPrefix,
    							};
    						var option =new TableDropDownOption(optionConfig);
    						var optionEditorConfig={
    								id : optionConfig.sectionIdPrefix + optionConfig.sectionId
    								+ oldSection.options[i].idPrefix + oldSection.options[i].id,
    								text : oldSection.options[i].editor.text,
    						};
    						var newOptionEitor = new Editor(optionEditorConfig);
    						option.setEditor(newOptionEitor);
    						var j = 0;
    						var optionAnswers = [];
							var optionAnswersConfig = {
									id:oldSection.options[i].answers[j].id,
									optionId : option.id,
									optionIdPrefix : option.sectionIdPrefix+option.sectionId+option.idPrefix,
									componentId : option.componentId,
		          					componentIdPrefix : option.componentIdPrefix,
		          					sectionId : option.sectionId,
		        					sectionIdPrefix : option.sectionIdPrefix,
									right:oldSection.options[i].answers[j].right,
									label:oldSection.options[i].answers[j].label
								};
							optionAnswers[0] = new MultipleChoiceOptionAnswer(optionAnswersConfig);
    						option.setAnswers(optionAnswers);
    						newCellCmp.sections[0].addOption(option);
    					}
    				}
    				$("#dropDownSave_"+cellId).trigger("click");
    			}else if (cmpType == "Input field") {
    				$("#inputField"+newCompId).trigger("click");
    				newCellCmp = newComponent.getItemValById(newComponent.cellComponentCollection, cellId, "component");
    				newCellCmp.graded = element.component.graded;
    				newCellCmp.mandatory=element.component.mandatory;
    				newCellCmp.acceptAnyAnswer = element.component.acceptAnyAnswer;
    				newCellCmp.answer.text = element.component.answer.text;
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
					newCellCmp.contentFormat = contentFormat;			
    			}
    			else if (cmpType == "Label") {
    				$("#label"+newCompId).trigger("click");
    				newCellCmp = newComponent.getItemValById(newComponent.cellComponentCollection, cellId, "component");
    				if(newCellCmp == ""){
    					$("#label"+newCompId).trigger("click");
    					newCellCmp = newComponent.getItemValById(newComponent.cellComponentCollection, cellId, "component");
    				}
    				
    				newCellCmp.graded = element.component.graded;
    				newCellCmp.editor.text = element.component.editor.text;
    				newCellCmp.cellTextOrientation = element.component.cellTextOrientation;
    				
    				var cellHtml = newComponent.getItemValById(oldComponent.cellHTMLCollection, element.id, "itsHtml");
    				console.log("cellHtml : "+cellHtml);
    				newComponent.changeValById(newComponent.cellHTMLCollection, cellId, "itsHtml", cellHtml);
    				
    				for(var i=0 ; i < question.formulas.length; i++){
                  		if($.inArray(oldCellId, question.formulas[i].destinations) != -1){
                  			isFormula = true;
                  			question.formulas[i].addDestination(cellId);
                  			newCellCmp.ranges = [];
                  			var ranges = [];
                  			var oldRanges = element.component.ranges;
                  			var newId = newCellCmp.id;
                  			if(oldRanges != null){
                  				for(var index = 0; index < oldRanges.length; index++){
                  				  var rangeObj = oldRanges[index];
                  		          var minEConfig = {
                  		           id : rangeObj.componentIdPrefix + newId+cellIndex+rangeObj.idPrefix
                  		             + rangeObj.minRangePrefix + rangeObj.id,
                  		           text : rangeObj.minRangeEditor.text,
                  		           allowNegative:true
                  		          };
                  		          var newMinRangeEditor = new NumericEditor(minEConfig);
                  		          var maxEConfig = {
                  		            id : rangeObj.componentIdPrefix + newId+cellIndex+rangeObj.idPrefix
                  		              + rangeObj.maxRangePrefix + rangeObj.id,
                  		            text : rangeObj.maxRangeEditor.text,
                  		            allowNegative:true
                  		           };
                  		          var newMaxRangeEditor = new NumericEditor(maxEConfig);
                  		          var rangeEConfig = {
                  		             id : rangeObj.componentIdPrefix + newId+cellIndex+rangeObj.idPrefix
                  		               + rangeObj.feedbackPrefix + rangeObj.id,
                  		             text : rangeObj.rangeFeedbackEditor.text,
                  		            };
                  		          var rangeFeedbackEditor = new Editor(rangeEConfig);
                  		          var rangeConfig = {
                  		           id : rangeObj.id,
                  		           componentId : newId+cellIndex,
                  		           componentIdPrefix : newComponent.pageIdPrefix+newComponent.pageId+newComponent.idPrefix,
                  		          };
                  		          var range = new Range(rangeConfig);
                  		          range.minRangeEditor = newMinRangeEditor;
                  		          range.maxRangeEditor = newMaxRangeEditor;
                  		          range.rangeFeedbackEditor = rangeFeedbackEditor;
                  		          ranges.push(range);
                  		         }
                  		         newCellCmp.ranges = ranges;
                  			}
                  		}
         			}
    				
    			}
    			if(newCellCmp != ""){
					newCellCmp.layout();
					newCellCmp.afterLayout();
				}
    			if(isFormula) {
    				newComponent.populateEditorProperties(cellId);
    				$("#"+newCellCmp.editor.id).trigger("blur");
    			}
			}
		}
     	
     	var newTableCellData = [];
     	var tableCellData = oldComponent.tableCellData;
		for(var i = 0; i < tableCellData.length; i++) {
		    var tableRowCellData = tableCellData[i];
		    var newTableRowCellData = [];
		    for(var j = 0; j < tableRowCellData.length; j++) {
		    	newTableRowCellData.push(tableRowCellData[j]);
		    }
		    newTableCellData.push(newTableRowCellData);
		}
		newComponent.tableCellData=newTableCellData;
		newComponent.itsTableInstance.loadData(newTableCellData);
		newComponent.itsTableInstance.render();
	},
	/**
	 * Function to delete component from 
	 * canvas as well as from componets array.
	 * */
	deleteComponent : function(componentId) {
		var that = this;
		for (i in page.components) {					
			if (page.components[i].getId() == componentId) {
				if(page.isBranchDest == true
					|| page.components[i].isBranchDest == true 
					|| page.components[i].isBranched 
					|| page.components[i].isSectionBranchDest 
					|| page.components[i].isSectionBranch){
					new Modal({
						id : 1,
						headingText : "Warning ! ",
						containtText : "This component is a part of path mapping logic and cannot be deleted.",
					}).getWarningModal();
					return false;
				}
			}
		}
		new Modal({
			id : 1,
			headingText : "Warning ! ",
			containtText : "Are you sure ? This will erase your content and cannot be undone.",
			okActionEvent : function() {
				var isFormulaExist = false;
				var i = 0, questionFormulas = JSON.stringify(question.formulas);
				page=question.activePage;
				
				for (i in page.components) {					
					if (page.components[i].getId() == componentId) {
						var j = 0;
		  				for (j in page.components[i].sections) {
		  					var k=0;
	  						for(k in page.components[i].sections[j].studentEntries){
	  							var studentEntry = page.components[i].sections[j].studentEntries[k];
	  							var studentEntryId = page.components[i].sections[j].studentEntries[k].editor.id;
	  							if(questionFormulas.indexOf(studentEntryId) != -1){
	  								var component = page.components[i];
	  								var formulaName="";
	  								var componentPrefixId = "" + component.getPageIdPrefix() + component.getPageId() + component.getIdPrefix() + component.getId();
	  								var messageContentText = "Deleting component #"+ componentPrefixId + " has affected the following formulas: <br>";
	  								for(var l=0 ; l < question.formulas.length ; l++){
	  									var formulaString = JSON.stringify(question.formulas[l]);
	  									if(formulaString.indexOf(studentEntryId) != -1){
	  										question.formulas[l].setCautionIconStyle("inline-block");
	  										messageContentText += "<br>" + question.formulas[l].getName();
	  										formulaName=question.formulas[l].getId();
	  									}
	  								}
	  								that.getAffectedDestinations(formulaName);
	  								question.displayMessageModal("Deletion Notice",messageContentText);
	  								isFormulaExist = true;
	  							}
	  						}
		  				}
						$("#" + page.components[i].getPageIdPrefix()+page.components[i].getPageId()+page.components[i].getIdPrefix() + componentId).remove();
						page.components.splice(i, 1);
						if(page.components.length == 0){
							$(".allComponent").css("visibility","hidden");
						}
						if(page.components.length == 0){
							page.reCompArray = [];
						} else{
							util.reArrangeComponent(page);
						}
						if(page.components.length!=0){
	  		  	  	    	if(i==0)
	  		  	  	    	{
	  		  	  	    		page.components[0].populateComp();
	  		  	  	    	}
	  		  	  	    	else{page.components[i-1].populateComp();}
	  		  	  	    }
	  		  	  		else{
	  		  	  			$("#properties").hide();
	  		  	  			$("#elementProperties").hide();
	  		  	  		} 		  	  	      
						for(var l=0 ; l < question.formulas.length ; l++){
							question.refreshFormulaDestinations(question.formulas[l]);
						}
						break;
					}
				}
				if(isFormulaExist){
					question.layout();
				}
				question.resetGradeCount();
				util.reArrangeComponent(this.page);
			}
		}).getConfirmationModal();
		
	},
	serialize : function() {
		$.each(this.reCompArray,function(index,component){
			component =  util.flatten(component);
		});
	},
	/**
	 * Function to deserialize javascript object into 
	 * user defined object e.g- components and options
	 * */
	deserialize : function(jsonObj) {
		var components = [];
		var page = new Page({
			id : jsonObj.id,
			gradedCount : jsonObj.gradedCount,
			name : jsonObj.name,
			expandAllFlag : jsonObj.expandAllFlag,
			displaySetting : jsonObj.displaySetting
		});
		var compArr = jsonObj.components;
		var i = 0;
		/*for (i in compArr) {
			var component = compArr[i];
			var compObj = null;
			if (component.type == "checkbox") {
				compObj = new CheckBoxComponent();
			}else if (component.type == "multiplechoice") {
				compObj = new MultipleChoiceComponent();
			}else if (component.type == "scale") {
				compObj = new ScaleComponent();
			}else if (component.type == "inputField") {
				compObj = new InputFieldComponent();
			}else if (component.type == "table") {
				compObj = new TableComponent();
			}
			compObj = compObj.deserialize(component);
			compObj.pageIdPrefix=page.idPrefix;
			compObj.pageId = page.id;
			components.push(compObj);
		}
		page.setComponents(components);*/
		var reCompArray = [];
		var compArr1 = jsonObj.reCompArray!=null?jsonObj.reCompArray:jsonObj.components;
		var i = 0;
		for (i in compArr1) {
			var component = compArr1[i];
			var compObj = null;
			if (component.type == "checkbox") {
				compObj = new CheckBoxComponent();
			}else if (component.type == "multiplechoice") {
				compObj = new MultipleChoiceComponent();
			}else if (component.type == "scale") {
				compObj = new ScaleComponent();
			}else if (component.type == "inputField") {
				compObj = new InputFieldComponent();
			}else if (component.type == "table") {
				compObj = new TableComponent();
			}
			compObj = compObj.deserialize(component);
			compObj.pageIdPrefix=page.idPrefix;
			compObj.pageId = page.id;
			compObj.isBranched = component.isBranched;
			compObj.isBranchDest = component.isBranchDest;
			compObj.destBranchId = component.destBranchId;
			compObj.showToStud = component.showToStud;
			reCompArray.push(compObj);
		}
		page.setReComponents(reCompArray);
		page.setComponents(reCompArray);
		page.isBranched = jsonObj.isBranched;
		page.isBranchDest = jsonObj.isBranchDest;
		page.destBranchId = jsonObj.destBranchId;
		page.showToStud = jsonObj.showToStud;
		return page;
	},
	/**
	 * Function to create HTML layout for instructor
	 * by using object properties. (MODE='preview')
	 * */
	doInstructorLayout : function() {
		var tableComponents = [];
		var htmlelement = ''; 
		var i = 0;
		for (i in this.reCompArray) {
			htmlelement += this.reCompArray[i].instructorLayout();
			if(this.reCompArray[i].type == "table"){
				tableComponents.push(this.reCompArray[i]);
			}
		}
		$("#formToolInstructorId").html(htmlelement);
		
		if(tableComponents.length > 0){
			var k = 0;
			for (k in tableComponents) {
				tableComponents[k].afterInstructorLayout();
			}
		}
		
		this.afterEachLayout();
		doResize();
	},
	afterEachLayout : function(){
		$( ".prevQuestOpts a" ).click(function() {
			 $( this ).toggleClass( "feedOpen" );
			 var parentElementX = $(this).closest('.prevQuestOpts a');
			 $(parentElementX).closest('.prevQuestOpts').find(".feedBackOpen").not(parentElementX).slideToggle( "slow" );
			});
	},
	/**
	 * Function to create HTML layout for student
	 * by using object properties.(MODE='test')
	 * */
	doStudentLayout : function() {
		var htmlelement = '';
		var i = 0;
		for (i in this.reCompArray) {
			htmlelement += this.reCompArray[i].studentLayout();
		}
		try{
		  htmlelement = decodeURIComponent(escape(htmlelement));
		}catch(exp){
		  console.log(exp);
		}		
		$("#formToolStudentId").html(htmlelement);
		this.afterStudentLayout();
		doResize();
	},
	/**
	 * Function to create HTML layout for checkMyWork
	 * by using object properties.(MODE='sample')
	 * */
	doCheckMyWorkLayout : function() {
		var htmlelement = '';
		var i = 0;
		for (i in this.components) {
			htmlelement += this.components[i].checkMyWorkLayout();
		}
		$("#formToolCheckmyworkId").html(htmlelement);
		this.afterEachLayout();
	},
	/**
	 * Function to create HTML layout for student in postSubission view
	 * by using object properties.(MODE='review')
	 * */
	doPostSubmissionReviewLayout : function() {
		var htmlelement = '';
		var tableComponents = [];
		var i = 0;
		for (i in this.reCompArray) {
			htmlelement += this.reCompArray[i].postSubmissionReviewLayout();			
			if(this.reCompArray[i].type == "table"){
				tableComponents.push(this.reCompArray[i]);
			}
		}
		try{
		  htmlelement = decodeURIComponent(escape(htmlelement));
		}catch(exp){
		  console.log(exp);
		}
		$("#formToolPostSubmissionId").html(htmlelement);
		
		if(tableComponents.length > 0){
			var k = 0;
			for (k in tableComponents) {
				tableComponents[k].afterPostSubmissionLayout();
			}
		}
		
		this.afterEachLayout();
		doResize();
	},
	afterStudentLayout : function() {
		var i = 0;
		for (i in this.reCompArray) {			
			this.reCompArray[i].afterStudentLayout();			
		}
	},
	showCorrectAnswers : function() {
		var i = 0;
		for (i in this.components) {
			this.components[i].showCorrectAnswers();
		}
	},
	showAnswers : function() {
		var i = 0;
		for (i in this.components) {
			this.components[i].showAnswers();
		}
	},
	updateComponet : function(){
		if(page.components.length > 1)
			$.each(page.components,function(index,component){
				component.update();
			});
	},
	orientationLayout : function(component){
		if(component.type==='multiplechoice'){
			$("#componentOptionDropDownId").html(component.optionOrientationDropDownLayout());
			component.afterOptionOrientationDropDownLayout();
			component.populateAnswerOrientation();
		}
	},
	isRequiredToProgressMeet:function(){
		//console.log("isRequiredToProgressMeet");
		var i = 0;
		var flag=true;
		var hiddenCom=0;
		//undefined check for legacy content
		if(this.showToStud || this.showToStud == undefined){
			for (i in this.components) {
				if(this.components[i].type !='scale' && this.components[i].type !='table'){
					//check if mandatory or is used in branching
					var j = 0;
					var isAnySectionBranched = false;
					for(j in this.components[i].sections){
		  	    		if(this.components[i].sections[j].isBranched){
		  	    			isAnySectionBranched = true;
		  	    		}
					}
					if(this.components[i].mandatory || this.components[i].isBranched || this.components[i].isBranchDest || isAnySectionBranched){
						flag= flag && this.components[i].isStudentAnswered();
						if(this.components[i].showToStud!=undefined && !this.components[i].showToStud){
							hiddenCom++;
							flag = true;
							/*if(this.components.length==hiddenCom){
								flag = false;
							}else{
								flag = true;
							}*/
							
						}
						
					}
					
					if(!flag){
						break;
					}
				}else{
					flag= flag && this.components[i].isStudentAnswered();
					if(this.components[i].showToStud != undefined && !this.components[i].showToStud){
						hiddenCom++;
						flag = true;
						/*if(this.components.length==hiddenCom){
							flag = false;
						}else{
							flag = true;
						}*/
						
					}
					
						
					if(!flag){
						break;
					}
				}
			}	
			/*if(this.components.length==hiddenCom){
				flag = false;
			}*/
		}
		
		return flag;
	},
 	 getAffectedDestinations:function(formulaName){
	  		var formulaDestinations=[];
	  		for( i in question.formulas){	        		 
     		 if(question.formulas[i].id==formulaName){
     			 var tmpFormulaObject = JSON.parse(JSON.stringify(question.formulas[i]));
     			
     			 formulaDestinations = question.formulas[i].getDestinations();
     			 if(formulaDestinations.length>0){
     				 question.formulas[i].isAffected=true;
         			 question.isFormulaCompDeleted=true;
     			 }
     			
     			question.refreshFormulaDestinations(tmpFormulaObject);
 			 }
     	 }
	  		
	  		question.highlightFormulaDestinations(formulaDestinations,formulaName);
	  		 
	  	 },
	/***
	 * Function to copy/add Formula Destinations when input field is copied (new input field is generated from old) 
	 * @param {Object} : component = Object of newly Generated Input Component 
	 * @param {Array of Objects} : studentEntryFeedbacks = Arry of Objects of studentEntryFeedbacks
	 * @param {Array of Objects} : authorEntriesWithFormula = Arry of Objects of studentEntryFeedbacks
	 **/
	copyFormulaDestinations : function(component,studentEntryFeedbacks,authorEntriesWithFormula){
		var dummyTextDiv = document.createElement("div");		 
		var textWithoutFormatting = "";
		if(component.generalFeedback.text.indexOf("F") != -1){
			dummyTextDiv.innerHTML = component.generalFeedback.text;			
			textWithoutFormatting = dummyTextDiv.textContent;
			question.updateFormulaDestinations(component.generalFeedback.id,util.getFormulas(textWithoutFormatting));
		}
		if(component.overallFeedback.text.indexOf("F") != -1){
			dummyTextDiv.innerHTML = component.overallFeedback.text;			
			textWithoutFormatting = dummyTextDiv.textContent;
			question.updateFormulaDestinations(component.overallFeedback.id,util.getFormulas(textWithoutFormatting));
		}
		for(var i=0;i<studentEntryFeedbacks.length;i++){
			dummyTextDiv.innerHTML = studentEntryFeedbacks[i].text;			
			textWithoutFormatting = dummyTextDiv.textContent;			 
			question.updateFormulaDestinations(studentEntryFeedbacks[i].id,util.getFormulas(textWithoutFormatting));
		}
		for(var i=0;i<authorEntriesWithFormula.length;i++){
			dummyTextDiv.innerHTML = authorEntriesWithFormula[i].editor.text;			
			textWithoutFormatting = dummyTextDiv.textContent;			 
			question.updateFormulaDestinations(authorEntriesWithFormula[i].editor.id,util.getFormulas(textWithoutFormatting));
		}
	}
	
};

