/* ========================================================================
 * TableOption: Object Declaration
 * ========================================================================
 * Purpose of this object to have all option specific properties like 
 * componentId (to which component it belongs), right/wrong, type author/student,
 * student response. holds the option 
 * text editor , feedback editor 
 * ======================================================================== */
var TableOption  = function(options){
	this.id=null;
	this.componentId=null;
	this.componentIdPrefix=null;
	this.feedback=null;
	this.editor=null;
	this.idPrefix='E';
	this.feedbackIdPrefix='F';
	this.studentIdPrefix='S';
	this.right=true;
	this.studentResponse=false;
	this.type='auth';
	$.extend(this, options);
	this.editor = new TableOptionEditor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.id});
	this.studentEditor = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.id+this.studentIdPrefix});
	this.feedback = new Editor({id:this.componentIdPrefix+this.componentId+this.idPrefix+this.id+this.feedbackIdPrefix});
	
	this._markRight = TableOption.BindAsEventListener( this, this.markRight );
	this._markWrong = TableOption.BindAsEventListener( this, this.markWrong );
	this._showFeedback = TableOption.BindAsEventListener( this, this.showFeedback );
	this._hideFeedback = TableOption.BindAsEventListener( this, this.hideFeedback );
	this._populateEditorProperties = TableOption.BindAsEventListener( this, this.populateEditorProperties );
	this._populateFeedbackEditorProperties = TableOption.BindAsEventListener( this, this.populateFeedbackEditorProperties );
	this._populateStudentEditorProperties = TableOption.BindAsEventListener( this, this.populateStudentEditorProperties );
	this._update = TableOption.BindAsEventListener( this, this.update );
	this._addTableOption= TableOption.BindAsEventListener( this, this.addTableOption );
	this._removeTableOption= TableOption.BindAsEventListener( this, this.removeTableOption );
	this._updateEditor= TableOption.BindAsEventListener( this, this.updateEditor );
	this._changeMode= TableOption.BindAsEventListener( this, this.changeMode );
	
	this._updateStudentEditor= TableOption.BindAsEventListener( this, this.updateStudentEditor );
	this._updateFeedBackEditor= TableOption.BindAsEventListener( this, this.updateFeedbackEditor );
	this._openHelpModalForCharLimit = TableOption.BindAsEventListener(this,this.openHelpModalForCharLimit);
	this._openHelpModalForInsertHyperlink = TableOption.BindAsEventListener(this,this.openHelpModalForInsertHyperlink);
	this._openHelpModalForEntryType = TableOption.BindAsEventListener(this,this.openHelpModalForEntryType);
	
	this._selectTableOption= TableOption.BindAsEventListener( this, this.selectTableOption );
	this._updateStudentText = TableOption.BindAsEventListener( this, this.updateStudentText );
	this._filter =TableOption.BindAsEventListener( this, this.filter );
};

//add event helper method
TableOption.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
TableOption.BindAsEventListener = function(object, fun) {
    return function(event) {
    	//TODO:[Debasmita? why if condition]
	    //if(event.target.nodeName=='div'||event.target.nodeName=='DIV') {    
	    	event.stopImmediatePropagation();
	    //}
        return fun.call(object, (event || window.event));
    };
};
TableOption.prototype = {  
		/**
		 * gets feedback editor
		 * @returns
		 */
		 getFeedback: function(){
             return this.feedback;
         },
         /**
          * sets feedback editor
          * @returns
          */
         setFeedback: function(feedback){
              this.feedback=feedback;
         },
         /**
          * gets component Id to which this option belong
          * @returns
          */
         getComponentId: function(){
             return this.componentId;  
	     },
	     /**
	      * sets the componentId for this option
	      * @param componentId
	      */
	     setComponentId: function( componentId ){
	            this.componentId =  componentId;
	     },
	     /**
	      * gets id of option
	      * @returns
	      */
         getId: function(){
             return this.id;  
	     },
	     /**
	      * sets id of option
	      * @param id
	      */
	     setId: function(id){
	            this.id =  id;
	     },
	     /**
	      * gets type of option editor
	      * @returns {String}
	      */
	     getType: function(){
             return this.type;  
	     },
	     /**
	      * sets type of option editor
	      * @param type
	      */
	     setType: function(type){
	            this.type =type;
	     },
	     /**
	      *  updates text of content editable divs to the object's editor text
	      */
         update:function(e){
        	 	this.editor.update();
        		this.feedback.update();
        		/*
        		Commented As per request from client
        		if(e!=undefined && e.currentTarget.id.indexOf("F")==-1 && e.currentTarget.textContent==""){
           		 	question.displayMessageModal("Validation Error","" + e.currentTarget.id + " can not be empty");
           	 	} */       		
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
          * gets the option student editor
          * @returns
          */
         getStudentEditor: function(){
             return this.studentEditor;
         },
         /**
          * sets the option student editor
          * @param studentEditor
          */
         setStudentEditor: function(studentEditor){
             this.studentEditor=studentEditor;
         },
         /**
          * gets the option is right/ wrong 
          * @returns {Boolean}
          */
         isRight: function(){
             return this.right;
         },
         /**
          * set the option as right/wrong
          * @param right
          */
         setRight: function(right){
             this.right=right;
         },
         /**
          * gets the option is set right by student
          * @returns {Boolean}
          */
         isStudentResponse: function(){
             return this.studentResponse;
         },
         /**
          * sets the option as right for student
          * @param right
          */
         setStudentResponse: function(studentResponse){
             this.studentResponse=studentResponse;
         },
         /**
          * layouts in design mode
          * @param isLast is the last optio
          * @returns {String}
          */
         layout: function(isLast){
        	 var css = isLast?' style="display: block;"':' style="display: none;"';
        	 var currentComp=null;
        	 var i=0;
 		     for( i in question.activePage.components){
 		    	if(question.activePage.components[i].getId()==this.componentId){
 		    		currentComp=question.activePage.components[i];
 		    	}
 	        }
        	 //var hidden = currentComp.acceptAnyAnswer ? 'style="visibility: hidden;"' : "";
 		    var hidden = "";
        	 var htmlelement='';
        	 var activeRightCss= this.right ?"active":"";
        	 var activeWrongCss=  !this.right?"active":"";
        	 htmlelement+='<div id="ans_'+this.editor.id+'" class="rowPagesection tickCheck">';
        	 htmlelement+='   <div class="colPageSection">';
        	 htmlelement+='       <div class="eachCol" '+hidden+'>';
        	 htmlelement+='           <div class="btn-group pull-left indt-mrgn">';
        	 htmlelement+='              <label class="btn btn-grey  btn-xs btn-bullet btn-bullet1 btnTick '+activeRightCss+'" id="right_'+this.componentId+this.id+'" >';
        	 htmlelement+='                   <input type="checkbox" id="right'+this.componentId+this.id+'">';
        	 htmlelement+='                   <img src="img/tick.png">';
        	 htmlelement+='               </label>';
        	 htmlelement+='               <label class="btn btn-grey  btn-xs btn-bullet btn-bullet2 btnTickWrong '+activeWrongCss+'" id="wrong_'+this.componentId+this.id+'"  style="padding-bottom:0px;padding-top:0px;">';
        	 htmlelement+='                   <input type="checkbox" id="wrong'+this.componentId+this.id+'">';
        	 htmlelement+='                   <img src="img/tickwrong.png">';
        	 htmlelement+='               </label>';
        	 htmlelement+='           </div>';
        	 htmlelement+='       </div>';
        	 htmlelement+='   </div>';
        	 htmlelement+=this.layoutEditor();
        	 /*htmlelement+='   <div class="colPageSection">';
        	 htmlelement+='       <div class="eachCol">';
        	 htmlelement+='           <div class="plusBtn" '+css+' > ';
        	 htmlelement+='               <a title="Add TableOption">';
        	 htmlelement+='                   <img  id="plus_'+this.componentId+this.id+'" src="img/plus.png">';
        	 htmlelement+='               </a>';
        	 htmlelement+='           </div>';
        	 htmlelement+='       <div class="minusBtn">';
        	 htmlelement+='                <a  title="Delete TableOption">';
        	 htmlelement+='                   <img id="minus_'+this.componentId+this.id+'" src="img/minus.png">';
        	 htmlelement+='               </a>';
        	 htmlelement+='          </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';*/
        	 //htmlelement+=this.layoutFeedback();
        	 htmlelement+='</div>';
        	 return htmlelement;
         },
         /**
          * layouts option editor in design mode
          * @returns {String}
          */
         layoutEditor:function(){
        	// alert(this.editor.text);
        	 var htmlelement="";
        	 //var editFeedbackHtml = '<h6 class="pull-right font10">ID# '+this.editor.id+'<a id="editfb'+this.feedback.id+'">| Expand feedback</a></h6>';
        	 var editFeedbackHtml = '<h6 class="pull-right font10">ID# '+this.editor.id+'</h6>';
        	 var dataDivAttr = this.editor.text !='' ? 'data-div-placeholder-content' : '';
        	 if(this.type=='auth'){	    		
	    		 htmlelement+='   <div id="author'+this.editor.id+'" class="colPageSection secondColPic">';
	        	 htmlelement+='       <div>';
	        	 htmlelement+='           <div class="editableDivTitle">';
	        	 htmlelement+=	editFeedbackHtml;
	        	 htmlelement+='          </div>';
	        	 htmlelement+='          <div contenteditable="true"  onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text" id="'+this.editor.id+'"  data-maxlength="'+this.editor.maxLength+'" class="inputDummy" '+dataDivAttr+'>'+this.editor.text+'</div>';
	        	 htmlelement+='      </div>';
	        	 htmlelement+='   </div>';
	    	 }else{
	    		 htmlelement+='  <div  id="stud'+this.editor.id+'" class="colPageSection secondColPic">';
	        	 htmlelement+='       <div>';
	        	 htmlelement+='          <div class="editableDivTitle">';
	        	 htmlelement+= editFeedbackHtml;
	        	 htmlelement+='          </div>';
	        	 htmlelement+='           <div class="innerinputDummy">';
	        	 htmlelement+='               <div contenteditable="true"  onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text"  id="'+this.editor.id+'" data-maxlength="'+this.editor.maxLength+'" class="inputDummyFirst" '+dataDivAttr+'>'+this.editor.text+'</div>';
	        	 htmlelement+='              <div contenteditable="false" data-placeholder="Student entry"   id="'+this.studentEditor.id+'" data-maxlength="'+this.studentEditor.maxLength+'" class="inputDummySecond"></div>';
	        	 htmlelement+='           </div>';
	        	 htmlelement+='       </div>';
	        	 htmlelement+='   </div>';
	    	 }
        	 
	    	 return htmlelement;
         },
         /**
          * layouts option feedback editor in design mode
          * @returns {String}
          */
         layoutFeedback:function(){
        	 var htmlelement="";
        	 var dataDivAttr = this.feedback.text !='' ? 'data-div-placeholder-content' : '';
        	 htmlelement+='  <div class="rowPagesection " id="feedback'+this.feedback.id+'" style="display: none;">';
        	 htmlelement+='       <div class="colPageSection">';
        	 htmlelement+='         <div class="eachCol firstColPic"></div>';
        	 htmlelement+='     </div>';
        	 htmlelement+='     <div class="colPageSection secondColPic">';
        	 htmlelement+='     <div>';
        	 htmlelement+='            <div class="editableDivTitle">';
        	 htmlelement+='                 <h6 class="pull-right font10">ID# '+this.feedback.id+' | <a  id="hide'+this.feedback.id+'" >Collapse feedback</a></h6>';
        	 htmlelement+='            </div>';
        	 htmlelement+='             <div contenteditable="true" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="Enter text" data-maxlength="'+this.feedback.maxLength+'" id="'+this.feedback.id+'" class="inputDummy feedbackInputBaground" '+dataDivAttr+'>'+this.feedback.text+'</div>';
        	 htmlelement+='         </div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='     <div class="colPageSection invisible">';
        	 htmlelement+='         <div class="eachCol">';
        	 htmlelement+='             <a>';
        	 htmlelement+='                  <img src="img/getPicture.png">';
        	 htmlelement+='              </a>';
        	 htmlelement+='          </div>';
        	 htmlelement+='          <div></div>';
        	 htmlelement+='      </div>';
        	 htmlelement+='  </div>';
	    	 return htmlelement;
         },
         /**
          * marks current option as right
          * @param event
          */
         markRight:function(){
        		 if(!this.right && $("#wrong_"+this.componentId+this.id).hasClass("active")){
    				$("#wrong_"+this.componentId+this.id).removeClass("active");
    				$("#right_"+this.componentId+this.id).addClass("active");
    				this.setRight(true);
        		}
         },
         /**
          * marks current option as wrong
          * @param event
          */
         markWrong:function(){
        	 if (this.right && $("#right_" + this.componentId + this.id).hasClass("active")) {
        		 $("#right_" + this.componentId + this.id).removeClass("active");
				 $("#wrong_" + this.componentId + this.id).addClass("active");
					 this.right = false;					 
				} 
      },
      /**
		 * adds new option for component
		 */
      addTableOption:function(){   
    	  var i=0;
		    for( i in page.components){
		    	if(page.components[i].getId()==this.componentId){
		    		var newId = page.components[i].options[page.components[i].options.length-1].getId()+1;
		    		var option = new TableOption({id:newId,componentId:this.componentId,componentIdPrefix:page.idPrefix+page.id+page.components[i].idPrefix});
		    		page.components[i].addTableOption(option);
		    		
		    		 var $lastTableOption = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find(".tickCheck").last();
		    		 if( $lastTableOption.find(".colPageSection").find(".eachCol").find(".plusBtn").is(":visible"))
		    			 $lastTableOption.find(".colPageSection").find(".eachCol").find(".plusBtn").hide();
		    	     $lastTableOption.after(option.layout(true));
		    	     $lastTableOption.find(".colPageSection").find(".eachCol").find(".minusBtn").show(); 			    	   
		    	     option.afterLayout();
		    	      
		    	}
	       }
      },
      /**
       * removes current option from component
       */
      removeTableOption:function(){
    	  var i=0;
		    for( i in page.components){
		    	if(page.components[i].getId()==this.componentId){
		    		for(j in page.components[i].options){
		    			if(page.components[i].options[j].getId()==this.id){
		    				$( "#ans_"+page.getIdPrefix()+page.getId()+page.components[i].getIdPrefix()+this.componentId+this.idPrefix+this.id ).remove();
		    				page.components[i].removeTableOption(page.components[i].options[j]);
		    				var $lastTableOption = $("#"+page.getIdPrefix()+page.getId()+page.components[i].idPrefix+this.componentId).find(".pageInnerSection").find(".pageSectionBody").find(".tickCheck").last();
		    				$lastTableOption.find(".colPageSection").find(".eachCol").find(".plusBtn").show();
		    				if(page.components[i].options.length<=1){
		    					$lastTableOption.find(".colPageSection").find(".eachCol").find(".minusBtn").hide();
		    				}
		    					
		    			}
		    		}
		    		
		    	}
		    }
    },
    /**
     * populate option text editor properties
     */
    populateEditorProperties:function(){	    
    	$("#elementProperties").html(this.editorPropertyLayout());
      
      /* Media object creates here for that component */
      //var compId = this.componentIdPrefix+this.componentId+'E'+this.id;
    	//var newMedia = new Media({id:compId});
      //$("#mediaProperties").html(newMedia.layout());
     // $("#mediaProperties").show();
      //newMedia.afterLayout();
      //util.checkMediaInEditMode();

 			$("#elementProperties").show();     			
 			$("#properties").hide();
 			if(this.editor.type=='auth')
 				{$("#mode").html("Authored text  <span class='caret caretDrop'></span>");}
 			else{$("#mode").html("Student entry  <span class='caret caretDrop'></span>");}
 			
 			this.afterEditorPropertyLayout();
 			$("#activeHyperlink").text("");
    },
    /**
     * populate option student text editor properties
     */
    populateStudentEditorProperties:function(){	
    	$("#elementProperties").html(this.studentEditorPropertyLayout());
     			$("#elementProperties").show();
     			$("#properties").hide();
     			this.afterStudentEditorPropertyLayout();
    },
    /**
     * populate option feedback text editor properties
     */
    populateFeedbackEditorProperties:function(){	
    	$("#elementProperties").html(this.editorFeedbackPropertyLayout());
    			$("#elementProperties").show();
     			$("#properties").hide();

      /* Media object creates here for that component */
      var compId = this.componentIdPrefix+this.componentId+'E'+this.id+'F';
      var newMedia = new Media({id:compId});
      $("#mediaProperties").html(newMedia.layout());
      $("#mediaProperties").show();
      newMedia.afterLayout();
      util.checkMediaInEditMode();

     	this.afterEditorFeedbackPropertyLayout();
    },
    /**
     * layouts the editor property pane
     */
    editorPropertyLayout:function(){
    	var htmlelement="";
	   	 htmlelement+='    <div class="tabContent tabProContent">';
	   	 htmlelement+='        <p>Component: Checkbox</p>';//
	   	 htmlelement+='        <p>Element: Input field</p>';
	   	 htmlelement+='        <p id="elementid">ID# '+this.editor.id+'</p>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
	   	
	   	 
    	 htmlelement+='    <div class="gap10"></div>';
       htmlelement+='    <div class="gap10"></div>';
	   	 return htmlelement;
    },
   
    /**
     * layouts the student editor property pane
     */
    studentEditorPropertyLayout:function(){
    	var htmlelement="";
    	var maxLengthval = this.studentEditor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	   	 htmlelement+='    <div class="tabContent tabProContent">';
	   	 htmlelement+='        <p>Checkbox input field </p>';
	   	 htmlelement+='        <p id="elementid">ID# '+this.studentEditor.id+'</p>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
	   	 htmlelement+='    <div class="tabContent tabProContent customInput charLimit">';
	   	 htmlelement+='        <form role="form">';
	   	 htmlelement+='            <div class="form-group">';
	   	 htmlelement+='                <a id="charLimitHelp'+this.studentEditor.id+'" class="info-icon"></a>';
	   	 htmlelement+='                <label class="font11" for="exampleInputEmail1">Charector Limit</label>';
	   	 htmlelement+='                <input type="Text" placeholder="15,000" value="'+maxLengthval+'" id="txtmaxLenght_'+this.studentEditor.id+'">';
	   	 htmlelement+='            </div>';
	   	 htmlelement+='            <div class="clear"></div>';
	   	 htmlelement+='        </form>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';

   	return htmlelement;

    },

    /**
     * layouts the feedback editor property pane
     */
    editorFeedbackPropertyLayout:function(){
    	var htmlelement="";
	   	 htmlelement+='    <div class="tabContent tabProContent">';
	   	 htmlelement+='        <p>Checkbox feedback</p>';
	   	 htmlelement+='        <p id="elementid">ID# '+this.feedback.id+'</p>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
//	   	 htmlelement+='    <div class="tabContent tabProContent customInput charLimit">';
//	   	 htmlelement+='        <form role="form">';
//	   	 htmlelement+='            <div class="form-group">';
//	   	 htmlelement+='                <a id="charLimitHelp'+this.feedback.id+'" class="info-icon" href="#"></a>';
//	   	 htmlelement+='                <label class="font11" for="exampleInputEmail1">Charector Limit</label>';
//	   	 htmlelement+='                <input type="Text" placeholder="15,000" value="'+this.feedback.maxLength+'" id="txtmaxLenght_'+this.feedback.id+'">';
//	   	 htmlelement+='            </div>';
//	   	 htmlelement+='            <div class="clear"></div>';
//	   	 htmlelement+='        </form>';
//	   	 htmlelement+='    </div>';
//	   	 htmlelement+='    <div class="clear"></div>';
	   	 htmlelement+='    <div class="gap10"></div>';
	   	 htmlelement+='    <div class="head-info typeInput insertHyperlinkText">';
	   	 htmlelement+='        <a id="insertHelp'+this.feedback.id+'" class="info-icon"></a>Insert a hyperlink:';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="tabContent tabProContent customInput insertHyperlink">';
	   	 htmlelement+='        <div class="form-group">';
	   	 htmlelement+='            <label class="font11" for="exampleInputEmail1">Display text:</label>';
	   	 htmlelement+='            <input type="Text" placeholder="" id="linkText_'+this.feedback.id+'">';
	   	 htmlelement+='        </div>';
	   	 htmlelement+='        <div class="form-group">';
	   	 htmlelement+='            <label class="font11" for="exampleInputPassword1">Link address:</label>';
	   	 htmlelement+='            <input type="Text" placeholder="" id="linkAddress_'+this.feedback.id+'">';
	   	 htmlelement+='        </div>';
	   	 htmlelement+='        <button class="btn btn-primary btn-xs btn-Insert pull-right" id="insert_'+this.feedback.id+'" type="submit">Insert</button>';
	   	 htmlelement+='        <div class="clear"></div>';
	   	 htmlelement+='    </div>';
	   	 htmlelement+='    <div class="clear"></div>';
    	 return htmlelement;

    },
    /**
     * shows the option feedback
     */
    showFeedback:function(){
        		$("#editfb"+this.feedback.id).hide("slow");
        		$("#feedback"+this.feedback.id).show("slow");		
    },
    /**
     * hides the option feedback
     */
    hideFeedback:function(){
		$("#editfb"+this.feedback.id).show("slow");
		$("#feedback"+this.feedback.id).hide("slow");		
	},
	/**
     * updates editor properties
     */
	updateEditor:function(event){    	
			var linkText=$("#linkText_"+this.editor.id).val();
			var linkAddress=$("#linkAddress_"+this.editor.id).val();
			var url=$("#linkAddress_"+this.editor.id).val();	 		
	 	
	 		//validate URL with format like: "http://www.google.com/";
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
     * 
     * @param event
     */
	changeMode : function(event){
	    	if(typeof event.data ==='undefined'){
				this.type='auth';
			}else{
				this.type=event.data.type;			
				if(this.type=='auth'){				
					this.editor.type='auth';				
					page.doLayout();
					$("#"+this.editor.id).trigger('click');
					$("#mode").html("Authored text  <span class='caret caretDrop'></span>");
			    }else{		    	
			    	this.editor.type='stud';		    	
			    	page.doLayout();
			    	$("#"+this.editor.id).trigger('click');
					$("#mode").html("Student entry  <span class='caret caretDrop'></span>");					
				}
				 var i=0;
				    for( i in page.components){
				    	if(page.components[i].getId()==this.componentId){
				    		page.components[i].populateComp(); 
				    	}
			       }
				$("#"+this.editor.id).focus();			
			}
	    },
	/**
     * updates editor properties
     */
	updateStudentEditor:function(event){ 
		
		this.studentEditor.maxLength=$("#txtmaxLenght_"+this.studentEditor.id).val();
		if( this.studentEditor.maxLength != '' ) {
			this.studentEditor.maxLength = parseInt(this.studentEditor.maxLength.replace(/[^0-9]+/g, ""));
		}
		var displayMaxLengthValue = this.studentEditor.maxLength;
		if( this.studentEditor.maxLength != '' ) {
			displayMaxLengthValue = this.studentEditor.maxLength.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		$("#txtmaxLenght_" + this.studentEditor.id).val(displayMaxLengthValue);

	},	
	/**
     * opens modal popup for character limit
     */
    openHelpModalForCharLimit:function(event){
   	 new Modal({id : 1,headingText : message.getcharLimitHeader(),containtText : message.getcharLimitHeader()}).openHelpModal(); 
    },
    /**
     * opens modal popup for Insert a hyperlink
     */
    openHelpModalForInsertHyperlink:function(event){
   	 new Modal({id : 1,headingText : message.getinsertHyperlinkHeader(),containtText : message.getinsertHyperlinkMsg()}).openHelpModal(); 
    }, 
    /**
     * opens modal popup for EntryType
     */
    openHelpModalForEntryType:function(event){
    	 new Modal({id : 1,headingText : message.getentryTypeHeader(),containtText : message.getentryTypeMsg()}).openHelpModal();     
    },
    /**
     * updates feedback editor properties
     */
	updateFeedbackEditor:function(){
		
		var linkText=$("#linkText_"+this.feedback.id).val();
		var url=$("#linkAddress_"+this.feedback.id).val();	 		
 	
 		//validate URL with format like: "http://www.google.com/";
		if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
			if(linkText != ""){
				if(url.slice(-1)==="/")
	 			{
	 			url=url.substring(0,url.length-1);
	 			}
				var linkAddress=url;
				//this.evaluateUrl(linkAddress, linkText, this.feedback.id);
				util.evaluateUrl(linkAddress, linkText, this.feedback.id);
	 		
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
	 * adds events for html elements related to current option
	 */
	afterLayout:function(){
		
		TableOption.addEvent( "right_"+this.componentId+this.id, "click", this._markRight );
		TableOption.addEvent( "wrong_"+this.componentId+this.id, "click", this._markWrong );
		
		TableOption.addEvent( "editfb"+this.feedback.id, "click", this._showFeedback );
		TableOption.addEvent( "hide"+this.feedback.id, "click", this._hideFeedback );
		TableOption.addEvent( this.editor.id, "click", this._populateEditorProperties );
		TableOption.addEvent( this.studentEditor.id, "click", this._populateStudentEditorProperties );
		TableOption.addEvent( this.feedback.id, "click", this._populateFeedbackEditorProperties );
		TableOption.addEvent( this.editor.id, "blur", this._update );
		TableOption.addEvent( this.feedback.id, "blur", this._update );
		TableOption.addEvent( this.feedback.id, "paste", this._filter );
		TableOption.addEvent( this.editor.id, "paste", this._filter);
		TableOption.addEvent( "plus_"+this.componentId+this.id, "click", this._addTableOption );
		TableOption.addEvent( "minus_"+this.componentId+this.id, "click", this._removeTableOption );
		this.editor.afterTableOptionEditorlayout();
		this.feedback.afterEditorlayout();
	 },
	 /**
	  * adds events for html elements of current option student editor property pane
	  */
	 afterStudentEditorPropertyLayout:function(){
		 TableOption.addEvent( "charLimitHelp"+this.studentEditor.id, "click", this._openHelpModalForCharLimit);
		 TableOption.addEvent( "txtmaxLenght_"+this.studentEditor.id, "blur", this._updateStudentEditor);
	 },
	 /**
	  * adds events for html elements of current option editor property pane
	  */
	 afterEditorPropertyLayout:function(){
		 TableOption.addEvent( "insertHelp"+this.editor.id,"click",this._openHelpModalForInsertHyperlink);
		 TableOption.addEvent( "entryTypeHelp"+this.editor.id, "click", this._openHelpModalForEntryType);
		 TableOption.addEvent( "mode_stud_"+this.editor.id, "click", this._changeMode,{"type":"stud"});
		 TableOption.addEvent( "mode_author_"+this.editor.id, "click", this._changeMode,{"type":"auth"});
		 TableOption.addEvent( "insert_"+this.editor.id, "click", this._updateEditor);
		 
	 },
	 /**
	  * adds events for html elements of current option feedback editor property pane
	  */
	 afterEditorFeedbackPropertyLayout:function(){
		 TableOption.addEvent( "insertHelp"+this.feedback.id,"click",this._openHelpModalForInsertHyperlink);			
		 TableOption.addEvent( "insert_"+this.feedback.id, "click", this._updateFeedBackEditor);
	 },
	 /**
      * layouts in instructor mode
      * @returns {String}
      */
	 instructorLayout:function(answerTableOptionOrientation,graded){
		 var css = this.right?"correct":"wrong";
		 var checkproperty=this.right?"checked='checked'":"";
		 var htmlelement='';
		 var markCompulsary=(graded)?"<span class='compulsaryTbl starHide'>*</span>":"";
		 htmlelement +='<div class="prevQuestOpts stdprevQuestOpts">';
		 htmlelement+='<div class="colPageSection" style="white-space:pre-line; word-wrap:break-word;">';
		 htmlelement +='<input class="studentViewCheckbox" id="option'+this.editor.id+'" name="cc" type="checkbox" '+checkproperty+' disabled style="margin: 5px 7px 0 0 !important;">';
		 //htmlelement +='</div>';
		 var styleClass=(answerTableOptionOrientation==3)?"column-2":(answerTableOptionOrientation==2)?"defaultMCTableOptionPreview":"";
		 var stqLblClass = "";
		 if(answerTableOptionOrientation!=1){
			 //htmlelement+='<div class="colPageSection '+styleClass+'">';
			 stqLblClass = "stdQueLabel-column-2";
		 }
		 else
			 //htmlelement+='<div class="colPageSection secondColPic stdsecondColPic">';

      /* function to render images in layout */
      var editorText = util.getImageLayout(this.editor.text);
          editorText = util.getVideoLayout(editorText);

  		 //htmlelement +='<label for="option'+this.editor.id+'"><span class="pull-left lblLeft"></span></label><div class="tableColWidth stdQueLabel stdstdQueLabel '+stqLblClass+'">'+editorText+'';
           htmlelement +='<span class=" spnWid '+stqLblClass+'">'+editorText+' ';
		 if(this.feedback.text!='' && this.feedback.text!='&nbsp;'){
			 htmlelement +='<label class="feedbackLinkPosition"><a  class="feedClose">Feedback</a></label>';
			 htmlelement +=' <div style="display: none;" class="feedBackOpen">';

       var feedText = util.getImageLayout(this.feedback.text);
           feedText = util.getVideoLayout(feedText);
			 htmlelement +=' <strong>Feedback:</strong>'+feedText;
			 htmlelement +='</div>';
		 }
		 //htmlelement +='</div>';
		 htmlelement +='</span>'+markCompulsary;
		 //htmlelement +='</div>';
		 htmlelement +='</div>';
		 
		 
		 return htmlelement;
	 },
	 /**
      * layouts in student test mode
      * @returns {String}
      */
	 studentLayout:function(answerTableOptionOrientation){
		 var studentResponse = this.studentResponse ? "checked='checked'" : "";
    	 var htmlelement="";
    	 htmlelement+='<div class="prevQuestOpts stdprevQuestOpts">';	
    	 
    	 htmlelement+='<div class="colPageSection" style="padding:0; white-space:pre-line; word-wrap:break-word;">';
		 htmlelement +='<div class="answerTick wrong" style="display: none;"></div>';
		 htmlelement+='<input class="studentViewCheckbox" id="checkAnswer_'+this.editor.id+'"  type="checkbox"  '+studentResponse+' style="margin: 5px 7px 0 0 !important;"/>';
		 //htmlelement +='</div>';
		 
		 var styleClass=(answerTableOptionOrientation==3)?"column-2":(answerTableOptionOrientation==2)?"defaultMCTableOptionPreview":"";
		 var stqLblClass = "";
		 if(answerTableOptionOrientation!=1){
			 //htmlelement+='<div class="colPageSection '+styleClass+'">';
			 stqLblClass = "stdQueLabel-column-2";
		 }
		 else
			 //htmlelement+='<div class="colPageSection secondColPic stdsecondColPic">';
    	 
       /* function to render images in layout */
       var editorText = util.getImageLayout(this.editor.text);
           editorText = util.getVideoLayout(editorText);

    	 //htmlelement+='<label id="option_'+this.editor.id+'" for="checkAnswer_'+this.editor.id+'"></label><div class="stdQueLabel stdstdQueLabel '+stqLblClass+'">'+editorText+'</div>';
         htmlelement +='<span class=" '+stqLblClass+'">'+editorText+'';
    	 if(this.type=='stud'){
    		 htmlelement+='&nbsp;<input type="text" maxlength="'+this.studentEditor.maxLength+'" value="'+this.studentEditor.text+'" id="student_'+this.studentEditor.id+'"  disabled= "disabled" style="display:inline;border-color: #AFAFAF;border-radius: 3px;border-style: solid;border-width: 1px;box-shadow: 0 0 5px #CFCFCF inset;width: 250px;"/>';
    	 }
    	 //htmlelement+='</div>';
    	 htmlelement +='</span>';
    	 htmlelement+='</div>';
    	
    	 return htmlelement;
     },
     
     
     
     /**
      * adds event handlers to html element in student layout mode
      */
     afterStudentLayout:function(){    	
 		TableOption.addEvent( "checkAnswer_"+this.editor.id, "change", this._selectTableOption );
 		TableOption.addEvent( "student_"+this.studentEditor.id, "blur", this._updateStudentText );
 	 }, 
 	 /**
 	  * updates student entered text
 	  */
 	updateStudentText:function(){
 		this.studentEditor.text=$("#student_"+this.studentEditor.id).val();
	},
 	 /**
 	  * Selects the current option as student selected response
 	  */
 	 selectTableOption:function(){
 		if($("#checkAnswer_"+this.editor.id).prop("checked")==true|| $("#checkAnswer_"+this.editor.id).prop("checked")=="true"){
 			this.studentResponse=true;
 			
 			if(this.type=='stud'){
 				$("#student_"+this.studentEditor.id).show();
 				$("#student_"+this.studentEditor.id).prop('disabled', false);
 			}
 		}else{
 			this.studentResponse=null;
 			if(this.type=='stud'){
 				$("#student_"+this.studentEditor.id).prop('disabled', true);
 			}
 		}
 		question.updateProgressBar();
	},
	/**
	 * shows the option is selected by student or not
	 */
	showAnswers:function(){
		 if(EZ.mode==MODE_TEST){
			 if(this.studentResponse!=null){
				 $("#checkAnswer_"+this.editor.id).prop('checked', true);
			 }else{
				 $("#checkAnswer_"+this.editor.id).prop('checked', false);
			 }
			 
		 }else if(EZ.mode==MODE_PREVIEW){
			 $("#showCorrect_"+this.editor.id).fadeOut("slow");
			 if(this.studentResponse!=null){
				 $("#option"+this.editor.id).prop('checked', true);
			 }else{
				 $("#option"+this.editor.id).prop('checked', false);
			 }
			 
		 }
	},
	/**
	 * shows the current option is marked as right/wrong by author in design mode
	 */
	showCorrectAnswers:function(){
			$("#showCorrect_"+this.editor.id).fadeIn("slow");
			$("#showCorrect_"+this.editor.id).css("visibility","visible");
	},
	/**
	 * Layouts in Check my work mode
	 * @returns {String}
	 */
	CheckMyWorkLayout:function(){	
		 var css = this.right?"correct":"wrong";
		 var checkproperty=this.studentResponse?"checked='checked'":"";
		 var hideanswer=this.studentResponse?"style='visibility:visible'":"style='visibility:hidden'";
		 var htmlelement='';
		 htmlelement +='<div class="prevQuestOpts">';
		 htmlelement+='<div class="colPageSection">';
		 htmlelement +='<div '+hideanswer+' class="answerTick '+css+'"></div>';
		 htmlelement +='<input id="checkAnswer_'+this.editor.id+'"  name="cc" type="checkbox" '+checkproperty+' disabled>';
		 htmlelement +='</div>';
		 
		 htmlelement +='<div class=" colPageSection secondColPic">';
		
		 htmlelement +='<label for="checkAnswer_'+this.editor.id+'"><span class="pull-left lblLeft"></span></label><div class="stdQueLabel">'+this.editor.text+'</div>';
		 if(this.type=='stud' && this.studentResponse && this.studentEditor.text!=''){
    		 htmlelement+='&nbsp;<input type="text" maxlength="'+this.studentEditor.maxLength+'" value="'+this.studentEditor.text+'" id="student_'+this.studentEditor.id+'" readonly/>';
    	 }
		 htmlelement +='</div>';
		 htmlelement +='</div>';
		 htmlelement+='<div class="clear"></div>';
		 return htmlelement;
	},
	/**
	 * Layouts in Post submission review mode
	 * @returns {String}
	 */
	postSubmissionReviewLayout:function(answerTableOptionOrientation,graded){

		 var css = this.right?"correct":"wrong";
		 var checkproperty=this.studentResponse?"checked='checked'":"";
		 var hideanswer=this.studentResponse?"style='visibility:visible'":"style='visibility:hidden'";
		 var markCompulsary=(graded)?"<span class='compulsaryTbl starHide'>*</span>":"";

		 var htmlelement='';
		 var text = this.editor.text;
		 text = text.replace(/\Â/g," ");
		
		 htmlelement +='<div class="prevQuestOpts">';
		 htmlelement+='<div class="colPageSection" style="white-space:pre-line; word-wrap:break-word;">';
		
		 htmlelement +='<input id="option'+this.editor.id+'" name="cc" type="checkbox" disabled '+checkproperty+' style="margin: 5px 7px 0 0 !important;">';
		 //htmlelement +='</div>';
		 var styleClass=(answerTableOptionOrientation==3)?"column-2 column-2-postsubm":(answerTableOptionOrientation==2)?"defaultMCTableOptionPreview":"";
		 var stqLblClass = "";
		 if(answerTableOptionOrientation!=1){
			 //htmlelement+='<div class="colPageSection '+styleClass+'">';
			 stqLblClass = "stdQueLabel-column-2";
		 }
		 else
			 //htmlelement+='<div class="colPageSection secondColPic">';
		 
       /* function to render images and video in layout */
       var editorText = util.getImageLayout(this.editor.text);
           editorText = util.getVideoLayout(editorText);

		 //htmlelement +='<label for="option'+this.editor.id+'"><span class="pull-left lblLeft"></span></label><div class="stdQueLabel '+stqLblClass+'">'+editorText+'';
           htmlelement +='<span class="spanWid '+stqLblClass+'">'+editorText+' ';
		 if(this.type=='stud'&& this.studentResponse && this.studentEditor.text!=''){
    		 htmlelement+='&nbsp;<input type="text" maxlength="'+this.studentEditor.maxLength+'" value="'+this.studentEditor.text+'" id="student_'+this.studentEditor.id+'" readonly/>';
    	 }		 
		 if(this.studentResponse && this.feedback.text!='' && this.feedback.text!='&nbsp;'){
			 htmlelement += '<label class="feedbackLinkPosition"><a class="feedClose">Feedback</a></label>';
			 htmlelement +=' <div style="display: none;" class="feedBackOpen">';
			 var feedbackText = this.feedback.text;
			 feedbackText = feedbackText.replace(/\Â/g," ");
       var feedText = util.getImageLayout(feedbackText);
           feedText = util.getVideoLayout(feedText);
			 htmlelement +=' <strong>Feedback:</strong>'+feedText;
			 htmlelement +='</div>';
		 }else{
		 }
		 //htmlelement +='</div>';
		 htmlelement +='</span>'+markCompulsary;
		 //htmlelement +='</div>';
		 htmlelement +='</div>';
		 return htmlelement;
	 },
	 
	 /**
		 * check if option is filled
		 * 
		 */
	 isTableOptionFilled:function(){
		 $("#htmlToTextConvertor").html(this.editor.text);
		 var optionText =  $("#htmlToTextConvertor").text();
		 if(optionText.length<=0){
			return false; 
		 }else{
			return true;
		}		 
	},
	 /**
	 * check if studentTableOption is filled
	 * 
	 */
	 isStudentTableOptionFilled:function(){
			  if(this.type=='stud'){  
			  if((this.studentEditor.text).length>0){
				 return true;	
			}
		 }
		return false;  
	},
	
	filter:function(event){
		util.removePasteImage(event.originalEvent.clipboardData,event);
		}

};