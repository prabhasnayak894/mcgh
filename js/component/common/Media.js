/* ========================================================================
 * Media: Media tab
 * ========================================================================
 * Purpose of this object to have media pan
 * ======================================================================== */
var Media = function(options) {
	this.id = null;
	this.imgWidth = null;
	this.imgHeight = null;
	this.imgUrl = null;
	this.imageName = null;
	this.env = 'local';
	
	$.extend(this, options);
	this.editor = new Editor({id:this.id});
	this._previewImage = Media.BindAsEventListener( this, this.previewImage );
	this._onWidthBlur = Media.BindAsEventListener( this, this.onWidthBlur );
	this._onHeightBlur = Media.BindAsEventListener( this, this.onHeightBlur );
	this._onSaveImageMedia = Media.BindAsEventListener( this, this.onSaveImageMedia );
	this._onSaveVideoMedia = Media.BindAsEventListener( this, this.onSaveVideoMedia );
	this._onKeyUpVideo = Media.BindAsEventListener( this, this.onKeyUpVideo);
	
	
};
// add event helper method
Media.addEvent = function(oTarget, sEventType, fnHandler, args) {
	$("#" + oTarget).unbind(sEventType);
	$("#" + oTarget).bind(sEventType, args, fnHandler);
};
// use call to borrow context
Media.BindAsEventListener = function(object, fun) {
	return function(event) {
		if(object.enabled==false){
			return;
		}else{
			event.stopImmediatePropagation();
			return fun.call(object, (event || window.event));
		}
		
	};
};
Media.prototype = {
	layout:function(){
		var htmlElement = "";
	    htmlElement = '<div class="tabbable MedSubTab" id="mediaWrapper">\
		 	<ul class="nav nav-tabs">\
		    	<li class="active"><a href="#imageWrapper" data-toggle="tab">Images</a></li>\
		    	<li><a href="#videoWrapper" data-toggle="tab">Video</a></li>\
		  	</ul>\
		  	<div class="tab-content">\
			    <div class="tab-pane active" id="imageWrapper">\
			      	<div class="mediaTitle"> Insert an Image:</div>\
			      	<div id="imageListId" class="imageList list-group">'
			      		+ this.addImageListItems()+
			      	'</div>\
			      	<div class="imagePreviewWrapper">\
			        	<div class="mediaTitle"> Image preview:\
			        		<img id="imagePreview" width="200"/>\
			        	</div>\
			        	<div class="ImgPreDim">\
			        		<span class="mediaSizeText">Size:</span>\
				        	<input type="text" class="imageSize" id="imageWidth" />\
				        	<span>W</span>\
				        	<input type="text" class="imageSize" id="imageHeight" />\
				        	<span>H</span>\
			        	</div>\
			        	<div class="ImgInputfield">\
					        <span>*Alt text:</span>\
					        <input type="text" id="imageAltText" placeholder="Alt text"/>\
					     </div>\
					     <div class="ImgTxtArea">\
					        <span>Description:</span>\
					        <textarea id="mediaImageDescription" placeholder="Description"></textarea>\
			    		</div>\
			    	</div>\
			    	<button id="saveImageMediaButton" class="btn btn-primary btn-xs btn-Insert pull-right">Save</button>\
		    	</div>\
		    	<div class="tab-pane" id="videoWrapper">\
		      		<div class="mediaTitle"> <span class="EmbTxt">Embed video:</span>\
		      			<div id="embedVideoDiv" class="embedVideoDiv" contenteditable="true" data-placeholder="Paste Embed Code Here"></div>\
		      		</div>\
					<div class="ImgInputfield">\
					        <span>*Title</span>\
					        <input type="text" id="videoTitle" />\
					</div>\
					<div class="ImgTxtArea">\
					        <span>Description:</span>\
					        <textarea id="mediaVideoDescription"></textarea>\
			    	</div>\
			    	<button id="saveVideoMediaButton" class="btn btn-primary btn-xs btn-Insert pull-right">Save</button>\
		    	</div>\
		    	<div class="clear"></div>\
			</div>\
		</div>';
		return htmlElement;
	},
	  /**
     *  updates text of content editable divs to the object's editor text
     */
 /*   update:function(){
   		 this.editor.update();        		
    },
    *//**
     * gets the option text editor
     * @returns
     *//*
    getEditor: function(){
        return this.editor;
    },*/
    /**
     * sets the option text editor
     * @param editor
     */
    setEditor: function(editor){
        this.editor=editor;
    },
	addImageListItems : function() {
		/* code for local images */
		if(this.env == 'local'){
			var imageList = ['diamond1.jpg', 'diamond.jpg', 'images.jpg', 'Koala.jpg', 'Lighthouse.jpg', 'Tulips.jpg'];
		} else {
	    	var imageList = EZ.mediaUrls;
	    }
	    var liItems = '';
	    for(var i=0; i<imageList.length; i++){
	        liItems += '<a href="#" class="imageListItem list-group-item">'+imageList[i]+'</a>';
	    }
	    return liItems;
	},
	afterLayout : function() {
		$("#imagePreview").attr('src','');
		Media.addEvent( "imageListId.imageList", "click", this._previewImage);
		Media.addEvent( "imageWidth", "blur", this._onWidthBlur);
		Media.addEvent( "imageHeight", "blur", this._onHeightBlur);
		Media.addEvent( "saveImageMediaButton", "click", this._onSaveImageMedia);
		Media.addEvent( "saveVideoMediaButton", "click", this._onSaveVideoMedia);
		Media.addEvent( "videoTitle", "keyup", this._onKeyUpVideo);
	},
	previewImage : function(e) {
	 	
	 	Media.imageName = e.target.innerHTML;
	 	
	 	//$("#imagePreview").attr('alt','Image preview');

	 	if( $(".mediaImageLink").hasClass("activeImageMediaLnik") ){
	 		var linkTag = $(".activeImageMediaLnik");
	 			linkTag.attr("data-name",Media.imageName);
	 			linkTag.attr("href",Media.imgUrl);
	 	}
		if(this.env == 'local'){
			Media.imgUrl = "file:///C:/Users/Public/Pictures/Sample%20Pictures/"+Media.imageName;
		} else {
			Media.imgUrl = EZ.mediaBase + Media.imageName;
		}
		
		$("#imagePreview").attr('src',Media.imgUrl);
		var newimage = new Image();
		newimage.src = Media.imgUrl;
		newimage.onload = function() {
		    Media.imgWidth = newimage.width;
		    Media.imgHeight = newimage.height;
		      
		    /* Get extension //var type = newimage.src.split('.').pop(); */
		      
		    $("#imageWidth").val(Media.imgWidth);
		    $("#imageHeight").val(Media.imgHeight);

		    $("#imageAltText").val(Media.imageName);
	    };
	},
	
	onWidthBlur : function(e) {
		
		var aspectRation = Media.imgHeight/Media.imgWidth;
		
		if(isNaN(parseInt(aspectRation))){
			return false;
		}
		var newHeight = (aspectRation) * e.target.value;
		//var newWidth = Width/Aspect Ratio;

		if( isNaN(parseInt($("#imageWidth").val())) || $("#imageWidth").val() == ""){
			var validSize = "Please Enter Valid Size";
			this.showAlertBox(validSize, "imageWidth");
			return false;
		}

		$("#imageHeight").val(parseInt(newHeight));
	},

	onHeightBlur : function(e) {
		
		var aspectRation = Media.imgWidth/Media.imgHeight;
		if(isNaN(parseInt(aspectRation))){
			return false;
		}
		if( isNaN(parseInt($("#imageHeight").val())) || $("#imageHeight").val() == ""){			
			var validSize = "Please enter Valid Size";
			this.showAlertBox(validSize, "imageHeight");
			return false;
		}
		var newWidth = (aspectRation) * e.target.value;

		$("#imageWidth").val(parseInt(newWidth));
	},
	onSaveImageMedia : function(e)  {

		var altText = $("#imageAltText").val();
		
		if(altText == ''){
			//alert("Please enter Alt text");
			var altText = "Please enter Alt text";
			this.showAlertBox(altText, "imageAltText");
			return false;
		}
		if( isNaN(parseInt($("#imageWidth").val())) || $("#imageWidth").val() == ""){
			//alert("Please Enter Valid Size");
			var validSize = "Please Enter Valid Size";
			this.showAlertBox(validSize, "imageWidth");
			return false;
		}
		if( isNaN(parseInt($("#imageHeight").val())) || $("#imageHeight").val() == ""){
			var validSize = "Please Enter Valid Size";
			this.showAlertBox(validSize, "imageHeight");
			return false;
		}
		var desc = $("#mediaImageDescription").val();

		if($("#imagePreview").attr('src') == ""){
			//alert("Please Select Image");
			var selImg = "Please Select Image";
			this.showAlertBox(selImg, "");
			return false;
		}

		if( $(".mediaImageLink").hasClass("activeImageMediaLnik") ){
			var linkTag = $(".activeImageMediaLnik");
			if(this.env == 'local'){
			Media.imgUrl = "file:///C:/Users/Public/Pictures/Sample%20Pictures/";
			} else {
				Media.imgUrl = EZ.mediaBase;
			}
			linkTag.attr("href",Media.imgUrl + linkTag.attr('data-name'));
			linkTag.text(linkTag.attr('data-name'));
			util.updateMediaLink(e);
			return false;
		}

		/* creating link to append*/
		var width = $("#imageWidth").val();
		var height = $("#imageHeight").val();
		var mediaImgLink = $( '<a class="mediaImageLink" onclick="util.editImageLink(event);" href="' + Media.imgUrl + '" rel="' + altText +
		'"data-width="' + width + '" data-height="' + height + '" data-desc="' + desc + '" data-name="'+Media.imageName+'">' + Media.imageName + '</a>' );
		util.evaluateMediaUrl(mediaImgLink, this.id, 'image');

		$("#imagePreview").attr('src','');
		$("#imageAltText").val('');
		$("#imageAltText").attr('data-placeholder', '');
		$("#mediaImageDescription").val('');
		$("#imageWidth").val('');
		$("#imageHeight").val('');

	},
	onSaveVideoMedia : function() {
		var videoTitleText = $("#videoTitle").val();
		
		
		if(videoTitleText == ''){
			//alert("Please enter Title");
			var titleAlert = "Please enter Title";
			this.showAlertBox(titleAlert, "videoTitle");
			return false;
		}
		//var videoAltText = $("#videoAltText").val();
		var videoAltText = '';
		
		/*if(videoAltText == ''){
			//alert("Please enter Alt text");
			var vAlert = "Please enter Alt text";
			this.showAlertBox(vAlert, "videoAltText");
			return false;
		}*/
		var videoDesc = $("#mediaVideoDescription").val();
		var embedVideoDivText = $("#embedVideoDiv").text();
		var linkHttp=embedVideoDivText.replace("http://", "https://");
		embedVideoDivText=linkHttp;
		if(embedVideoDivText == ""){
			//alert("Please enter Embed Code");
			var embAlert = "Please enter Embed Code";
			this.showAlertBox(embAlert, "embedVideoDiv");
			return false;
		}
		
		if($(".mediaVideoLink").hasClass('activeMediaVideoLnik')){
			util.updateMediaLink('', 'video');
			var editorObj=util.getEditor(this.id);
			var editorId=(editorObj.text!=null && editorObj.text!=undefined)?editorObj.id:editorObj.editor.id;
			 $("#"+editorId).trigger("blur");
			return false;
		}

		//var mediaVideoLink = '<a class="mediaVideoLink" onclick="util.editVideoLink(event);" rel="'+videoTitleText+'" data-altText="'+videoAltText
		//+'" data-desc="'+videoDesc+'">'+videoTitleText+'</a>'

		var mediaVideoLink = $('<a class="mediaVideoLink" onclick="util.editVideoLink(event);" rel="'+videoTitleText
			+'" data-altText="'+videoAltText+'" data-desc="'+videoDesc+'" data-link="'+embedVideoDivText.replace(/"/g, "'")+'">'+videoTitleText+'</a>' );

		//console.log('video before href : ', mediaVideoLink);

		mediaVideoLink.attr('href',embedVideoDivText.replace(/"/g, "'"));
		$("#embedVideoDiv").text('');
		$("#videoTitle").val('');
		//$("#videoAltText").val('');
		$("#mediaVideoDescription").val('');
	
		util.evaluateMediaUrl(mediaVideoLink, this.id, 'video');
		var editorObj=util.getEditor(this.id);
		var editorId=(editorObj.text!=null && editorObj.text!=undefined)?editorObj.id:editorObj.editor.id;
		 $("#"+editorId).trigger("blur");
	},

	onKeyUpVideo : function(e) {
		//$("#videoAltText").val( $(e.target).val() );
	},

	showAlertBox : function(alertText, compId){
		new Modal({
			id : compId,
			headingText : "Validation Error",
			containtText : alertText,
			closeActionEvent:function(){
				$('#'+compId).trigger("focus");
			}
		}).getWarningModal();
	}
};