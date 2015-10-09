/* ========================================================================
 * NumericEditor: Object Declaration
 * @author: Debasmita Sahoo
 * ========================================================================
 * Purpose of this object to accept only numeric input
 * ======================================================================== */
var NumericEditor = function(options){ 
	this.type='numeric';
	this.placeholder='';
	this.allowNegative=false;
	this.contenteditable=true;
	this.toValidateEditorId='';
	this.extraClasses="";
	$.extend(NumericEditor.prototype, new Editor(options));
	$.extend(this, options);
	this._checkNumeric=NumericEditor.BindAsEventListener( this, this.checkNumeric );
	this._validate=NumericEditor.BindAsEventListener( this, this.validate );
};

//add event helper method
NumericEditor.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
NumericEditor.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
NumericEditor.prototype = { 
		layout:function(){	
			 var dataDivAttr = this.text !='' ? 'data-div-placeholder-content' : '';
			return '<div contenteditable="'+this.contenteditable + '" onFocus="focusHandler(this)" onkeypress="keyPressHandler(this)" onmouseup="mouseupKeyupHandler(this)" onkeyup="mouseupKeyupHandler(this)" data-placeholder="'+this.placeholder+'" data-maxlength="'+this.maxLength+'" id="'+this.id+'" class="inputDummy '+ this.extraClasses +' "'+dataDivAttr+'>'+this.text+'</div>';
		},
        afterNumericEditorlayout:function(){
        	NumericEditor.addEvent(this.id, "focusout", this._checkNumeric );
        	NumericEditor.addEvent(this.id, "keypress", this._validate);
        },
        updateVal:function(){
       	 this.text=$('#'+this.id).text(); 
        },
        validate:function(e){
        	if($(".reveal-modal").css('visibility') == 'visible'){
        		if (e.keyCode == 27){
        			$("#modalDivId").hide();
        			$(".close-reveal-modal").trigger('click');
        		}else{
        			e.preventDefault();
        		}
        		
        	}
        },
        checkNumeric:function(e){ 
        	if($(".reveal-modal").css('visibility') == 'visible'){
        		if (e.keyCode == 27){
        			$("#modalDivId").hide();
        			$(".close-reveal-modal").trigger('click');
           		}else{
           			e.preventDefault();
           		}
        	}
			var text=$('#'+this.id).text();
			var trimmedText = text.trim();
			if( trimmedText == ""){
				$('#'+this.id).html("");
				return;
			}			
			if(text != trimmedText){
				text = trimmedText;
				$('#'+this.id).html(text);				
			}			
			//var regExpression=this.allowNegative?/^[-]?\d*$/: /^\d*$/;
			
			var regeNeg =  /^[-]?\d*$/;
			var regePos = /^\d*$/;
			var containtMsg = "Only numeric data allowed";
			
			var itsId = this.id;
			/* check for point field editor for scale or multiple choice and check all that apply */
			/* W for weight field editor in scales and G for multiple choice and check all that apply */
			if(itsId.indexOf("RL") != -1 || itsId.indexOf("RH") != -1){ 
				regeNeg = /^[-]?\d+(\.\d{1,2})?$/;
				regePos = /^\d+(\.\d{1,2})?$/;
				containtMsg+=" and upto 2 decimal";
				
			}
			/* check for range based min-max field editor for scale, multiple choice, check all that apply and Table's formula based label */
			else if(itsId.indexOf("W") != -1 || itsId.indexOf("G") != -1){
				regeNeg = /^[-]?\d+(\.\d{1,1})?$/;
				regePos = /^\d+(\.\d{1,1})?$/;
				containtMsg+=" and upto 1 decimal";
			}
			/* check for scale criteria's point field editor */
			else if(itsId.indexOf("CP") != -1){
				containtMsg+=" and without decimal";
			}
			
			var regExpression=this.allowNegative? regeNeg : regePos;
			
			if (!regExpression.test(text)) {
				//var editorId =this.id;
				NumericEditor.toValidateEditorId = this.id; /* to avoid stacking of ids - causing previous validated editors text clearing */
				if($(".reveal-modal").css('visibility') != 'visible'){
				new Modal(
	  	   			      {
	  	   			    	  id : 1,headingText : "Validation Error",
	  	   			    	  containtText : containtMsg,
	  	   			    	  closeActionEvent:function(){
	  	   			    		 $('#'+NumericEditor.toValidateEditorId).trigger("focus");
	  	   			    	     $('#'+NumericEditor.toValidateEditorId).text(""); /* removes characters other than numeric*/
	  	   			    	     NumericEditor.toValidateEditorId='';/*reset numeric editor id*/
	  	   			    	  }
	  	   			      }).getWarningModal();
	  	  			 $("#warningModalId").css('top','300px');
				}else{
					this.text="";
				}
			}else{
				this.text=$('#'+this.id).text();
			}
			return;
        }
	};
