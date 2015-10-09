var Editor = function(options){ 
	this.id=null;
	this.maxLength=15000;
	this.text="";
	this.textWithoutFormatting="";
	$.extend(this, options);
	this._checkChars=Editor.BindAsEventListener( this, this.checkChars );

};

//add event helper method
Editor.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
Editor.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    };
};
Editor.prototype = { 
		 getId: function( ){
             return this.id;  
	     },
	     setId: function(id){
	         this.id =  id;
	     },
         getText:function(){
        	 this.text;
         },
         setText:function(text){
        	 this.text=text;
         },
         getTextWithoutFormatting:function(){
        	 this.textWithoutFormatting;
         },
         setTextWithoutFormatting:function(text){
        	 this.textWithoutFormatting = text;
         },
         update:function(){
        	 var html = $('#'+this.id).html();        	 
        	 if(html=="<br>")
        	 {
        		 $('#'+this.id).html("");
        		 html = $('#'+this.id).html();  
        		 this.text="";
        	 }
        	 if(html === undefined || html==""){
        		 this.text="";
        		return; 
        	 }
        	 this.textWithoutFormatting = $('#'+this.id).text().trim();        	
        	 html = html.replace(/(<br>)+$/,"");
        	 html = html.replace(/^(?:<br\s*\/?>\s*)+/,"");
        	 var textcount=$('#'+this.id).text().length;
        	 var  currentEditor =this.id;
        	 if(textcount>parseInt($('#'+this.id).attr("data-maxlength"))){
			        
		        	new Modal(
		  	   			      {
		  	   			    	  id : 1,headingText : "Validation Error",
		  	   			    	  containtText : "Content length exceeds maxlength limit",
		  	   			    	  closeActionEvent:function(){
		  	   			    		 $('#'+currentEditor).trigger("focus");
		  	   			    	  }
		  	   			      }).getWarningModal();
		        }        	
        	 this.text=html.replace(/&nbsp;/gi,'');        	
         },
	     getMaxLength: function( ){
             return maxLength;  
	     },
	     setMaxLength: function(maxlength){
	    	this.maxLength = maxLength;
	     },

	     checkChars:function(e){   
		       if($(".reveal-modal").css('visibility') == 'visible'){
		    	   if (e.keyCode == 27){
	        			$("#modalDivId").hide();
	        			$(".close-reveal-modal").trigger('click');
	           		}else{
	           			e.preventDefault();
	           		}
		       }
	    	   if (e.which == "0" || e.which == "8" || e.ctrlKey || e.altKey){ 
					return;
	    	   }
	           if( $('#'+this.id).text().length >= this.maxLength)
	           {
	        	   $('#'+this.id).text($('#'+this.id).text().substring(0, this.maxLength));
	               e.preventDefault();
	           }
	     },
	     afterEditorlayout:function(){
	        	Editor.addEvent(this.id, "keypress", this._checkChars );
	        	if($('#'+this.id).find(".deletedFormula").length > 0){
	        		 $('#'+this.id).addClass("redBorderCell");
	        	}
	     }
	};  