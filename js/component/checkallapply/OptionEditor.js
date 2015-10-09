var OptionEditor = function(options){ 
	this.type='auth';
	$.extend(OptionEditor.prototype, new Editor(options));
	$.extend(this, options);
	this._checkChars=OptionEditor.BindAsEventListener( this, this.checkChars );

};

//add event helper method
OptionEditor.addEvent = function(oTarget, sEventType, fnHandler,args) {
	$("#"+oTarget).unbind(sEventType);
	$("#"+oTarget).bind(sEventType,args,fnHandler);
};
//use call to borrow context
OptionEditor.BindAsEventListener = function(object, fun) {
    return function(event) {
    	event.stopImmediatePropagation();
        return fun.call(object, (event || window.event));
    }; 
};
OptionEditor.prototype = { 
		 getId: function( ){
             return this.id;  
	     },
	     setId: function(id){
	         this.id =  id;
	     }, 
	     getType: function( ){
             return this.type;  
	     },
	     setType: function(type){
	         this.type =  type;
	     },
         getText:function(){
        	 this.text;
         },
         setText:function(text){
        	 this.text=text;
         },
         update:function(){
        	 this.text=$('#'+this.id).html();
         },
	     checkChars:function(e){   
	    	   if (e.which == "0" || e.which == "8" || e.ctrlKey || e.altKey){ 
					return;
	    	   }
	           if( $('#'+this.id).text().length >= this.maxLength)
	           {
	        	   $('#'+this.id).text($('#'+this.id).text().substring(0, this.maxLength));
	               e.preventDefault();
	           }
	     },
	     afterOptionEditorlayout:function(){
	    	 OptionEditor.addEvent(this.id, "keypress", this._checkChars );
	     }

	};  