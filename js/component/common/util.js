/* ========================================================================
 * Message: Object Declaration
 * @author: Irfan Tamboli
 * ========================================================================
 * Purpose of this object to act as an utility 
 * for form-tool application.
 * ======================================================================== */

var Util = function(options){
	this.env = 'local';
};

Util.prototype = {
		/**
		 * Function to load HTML template 
		 * using jquery AJAX.
		 * @param option.url
		 * @returns {String} HTML of template
		 * */
		 getTemplate : function(option){
			var g = $.ajax( {
				url : option.url, 
				async : false, 
				dataType : "html", 
				success : function(k) {
			}
			, error : function() {
				console.log("@Util.getTemplate Error:: url ::" + url); }
			}
			); 
			return(g.status === 200) ? g.responseText : "";
		},
		/**
		 * Function to get base URL of the application
		 * */
		getBaseURL : function (){
			var g = $("script[src*='jquery.js']:first"); 
			var f = (g.attr("src")).substring(0, 
					(g.attr("src")).indexOf("jquery.js")); 
			return f; 
		},
		/**
		 * Function to load js file dynamically.
		 * */
		addScript : function(path){
			$.getScript(path.src, function( data, textStatus, jqxhr ){console.log( jqxhr.status ); });
		},
		/**
		 * Function to call update editor
		 * for each editor to get updated text.
		 * */
		gatherData:function(){	
			    var j=0;    
			    for (j in question.activePage.components) {    
			    	question.activePage.components[j].update();
			    }
		},
		flatten : function(obj){
			for(var i in obj) {
		        if(!obj.hasOwnProperty(i)) {
		        	obj[i] = obj[i];
		        }
		    }
		    return obj;
		},
		
		/**
		 * Remove html tags and images from pastedata 
		 * 
		 * */
			removePasteImage:function(pasteData,event){
				var me = this;
				setTimeout(function(){
					var currentEditor=event.currentTarget.id;
					var textToSend = $("#"+currentEditor).html();
					var after = "";
					var newAfter="";

					if (textToSend.indexOf("mediaImageLink") >= 0 || textToSend.indexOf("mediaVideoLink") >= 0){
						if (textToSend.indexOf("mediaImageLink") >= 0){
							var dummyDiv = $("<div id='dummyDiv'>");
							dummyDiv.css("display", "none");
							dummyDiv.html(textToSend);
							dummyDiv.appendTo("body");
							
							var aTag = $("#dummyDiv > a.mediaImageLink");
							var imgUrl = "";
							
							if(me.env == "local"){
								imgUrl = "file:///C:/Users/Public/Pictures/Sample%20Pictures/";
							} else {
								imgUrl = EZ.mediaBase;
							}

							for(var i=0; i<aTag.length; i++){
								var aTagSingle = $(aTag[i]);
								
								var str = $("<div />").append(aTagSingle.clone()).html();
								var index = str.indexOf("class=\"mediaImageLink\"");
								if(index!=-1)
				        		{
					        		var newPart = str.substr(0,index);
					        		after = str.substr(index+22, str.length);				        		
					        		newAfter = newPart +"class=\"mediaImageLink\"" + "onclick='util.editImageLink(event)' href='"+imgUrl+aTagSingle.attr('data-name')+"'"+after+"&nbsp;";
					        	}
					        	aTagSingle.after(newAfter);
								aTagSingle.remove();
							}
							newAfter = $("#dummyDiv").html()+"</a>";
							$("#"+currentEditor).html(newAfter);
							$("#dummyDiv").remove();
						}
						if (textToSend.indexOf("mediaVideoLink") >= 0){
							var dummyDiv = $("<div id='dummyDiv'>");
							dummyDiv.css("display", "none");
							dummyDiv.html(textToSend);
							dummyDiv.appendTo("body");
							
							var aTag = $("#dummyDiv > a.mediaVideoLink");
							var imgUrl = "";
							
							for(var i=0; i<aTag.length; i++){
								var aTagSingle = $(aTag[i]);
								console.log(aTagSingle.attr('data-link'))
								aTagSingle.attr('href',aTagSingle.attr('data-link'));
								var str = $("<div />").append(aTagSingle.clone()).html();
								var index = str.indexOf("class=\"mediaVideoLink\"");
								if(index!=-1)
				        		{
					        		var newPart = str.substr(0,index);
					        		after = str.substr(index+22, str.length);				        		
					        		newAfter = newPart +"class=\"mediaVideoLink\"" + "onclick='util.editVideoLink(event)'"+after+"&nbsp;";
					        	}
					        	aTagSingle.after(newAfter);
								aTagSingle.remove();
							}
							newAfter = $("#dummyDiv").html()+"</a>";
							$("#"+currentEditor).html(newAfter);
							$("#dummyDiv").remove();
						}
					} else {
						// get content after paste by a 100ms delay
				        after = document.getElementById(currentEditor).innerHTML;
				        after= $.htmlClean('<div>'+after+'</div>', {removeTags:["img","tt"],allowedAttributes:[["target"],["color"],["style"],["id"],["href"],["onclick"]]});
				        
				        var anchors = after.split("link_");				      
				        if(anchors.length>0)
			        	{
				        	for(var i =0; i<anchors.length; i++)
			        		{
				        		var index = after.indexOf("link_");
				        		if(index!=-1)
				        		{
					        		var newPart = after.substr(0,index);
					        		var linkId = Math.floor((Math.random() * 10000) + 1);
					        		newAfter = newAfter + newPart + "link_"+linkId +"\" onclick = \"util.viewHyperlink(event);\"";
					        		after = after.substr(index+9,after.length);
				        		}
				        		else{
				        			newAfter = newAfter +after;	
				        		}
							}
				        }
		        	}
			       newAfter = newAfter.replace("<div>","").replace("</div>","");
			        
			        var textcount=$('<div>'+newAfter+'</div>').text().length;
			        if(textcount>parseInt($("#"+currentEditor).attr("data-maxlength"))){
			        
			        	new Modal(
			  	   			      {
			  	   			    	  id : 1,headingText : "Validation Error",
			  	   			    	  containtText : "Content length exceeds maxlength limit",
			  	   			    	  closeActionEvent:function(){
			  	   			    		 $('#'+currentEditor).trigger("focus");
			  	   			    	  }
			  	   			      }).getWarningModal();
			        }
			        document.getElementById(currentEditor).innerHTML = newAfter + "&nbsp;";
			       util.placeCaretAtEnd(document.getElementById(currentEditor)); // set cursor at end in editor during paste
		    	}, 10);		
			    $.each(pasteData.files,function(i,value){
					var type=value.type;
					var imageType=type.split("/")[0];
					if (imageType=="image") {
						event.preventDefault();
					}
			    });		
			},
			cleanHtml:function(pasteData,event){
			    var currentEditor=event.currentTarget.id;
		    	setTimeout(function(){
			        // get content after paste by a 100ms delay
			        var after =$("#"+currentEditor).text();//htmlText;//
			        var tmp = document.createElement("DIV");
			        tmp.innerHTML = after;
			        $("#"+currentEditor).html(tmp.textContent || tmp.innerText || "");
			       
		    	}, 10);				
			},
			evaluateUrl:function(linkAddress,linkText,id){
				if($("#activeHyperlink").text()!=""){
					var linkId = $("#activeHyperlink").text();console.log(linkId);
					var linkObj = $("#"+id).find("#"+linkId);
					$(linkObj).attr("title",linkAddress);
					$(linkObj).attr("href",linkAddress);
					$(linkObj).text(linkText);
					//$("#"+id).find("#activeHyperlink").text("");
					//$("#"+$("#activeHyperlink").text()).attr("title",linkAddress);
					//$("#"+$("#activeHyperlink").text()).attr("href",linkAddress);
					//$("#"+$("#activeHyperlink").text()).text(linkText);
					$("#activeHyperlink").text("");
					$("#" + id).focus();
					if(id.length>5){
						return $("#"+id).html();
					} else {
						return;
					}
				}
				var linkId = Math.floor((Math.random() * 10000) + 1);
				var linkhtml;
				var linkEncoded;
				var linkDecoded;

				if (linkAddress != "" && linkText != "") {
					if (linkAddress.indexOf("https://") != -1) {
						linkEncoded = encodeURIComponent("https://"
								+ linkAddress.replace("https://", ""));
						linkDecoded = decodeURIComponent(linkEncoded);
						linkhtml = "&nbsp;<a onclick='util.viewHyperlink(event);' target=_blank  id=link_" + linkId
								+ "  href=" + linkDecoded + ' title="'+linkDecoded+'">' + linkText
								+ "</a>&nbsp;";
					} else {
						if (linkAddress.indexOf("http://") != -1) {
							linkEncoded = encodeURIComponent("http://"
									+ linkAddress.replace("http://", ""));
							linkDecoded = decodeURIComponent(linkEncoded);
							linkhtml = "&nbsp;<a onclick='util.viewHyperlink(event);' target=_blank  id=link_" + linkId
							+ "  href=" + linkDecoded + ' title="'+linkDecoded+'">' + linkText
									+ "</a>&nbsp;";
						} else {
							linkhtml = "&nbsp;<a onclick='util.viewHyperlink(event);' target=_blank  id=link_" + linkId
									+ "  href=" + "https://"
									+ encodeURIComponent($("#linkAddress_" + id).val())
									+ ' title="'+encodeURIComponent($("#linkAddress_" + id).val())+'">' + linkText + "</a>&nbsp;";
						}
		
					}
					$("#" + id).attr('data-placeholder', '');
					$("#" + id).trigger('change');
					if ($("#" + id).has('ul').length || $("#" + id).has('ol').length) {
						$("#" + id).has('ul').find('li:last-child').append(linkhtml);
					} else {
						//$("#" + id).append(linkhtml);
						/* check for table's td */
						var isTD = $("#" + id).is("td");
						if(isTD){
							var divObj = $(document.createElement('div'));
							divObj.html(linkhtml);
							divObj.find('a').addClass("tblLink");
							
							//aObj.addClass("tblLink");
							
							linkhtml = divObj.html();
							var checkFortextWrapper = $("#" + id).find("div[data-hold]");   
							$("#" + id).html("");
							
	                        if(checkFortextWrapper.length > 0){
	                        	//checkFortextWrapper.append(linkhtml);
	                        	$("#" + id).html(linkhtml);
	                        }else{
	                        	$("#" + id).html(linkhtml);
	                        }
						}else{
						  $("#" + id).append(linkhtml);
						}
						
					}
					if ($("#link_" + linkId).prev().is('br')) {
						$("#link_" + linkId).prev().remove();
					}
					$("br[type='_moz']").remove();
					$("#" + id).focus();
					if(id.length>5){
						return linkhtml;
					}
				}
			},

			/**
			 * render hyperlink in edit mode
			 */
			viewHyperlink:function(e){
				if(EZ.mode==MODE_DESIGN){
					e.preventDefault();
				}
				var hyperlinkText = e.currentTarget.innerHTML;
				var hyperlinkHref = e.currentTarget.title;
				var id = null;
				
				var isTblCellTextLinkCombination = false;
				isTblCellTextLinkCombination = e.target.parentElement.hasAttribute("data-hold");
				
				if(isTblCellTextLinkCombination){
					id = e.currentTarget.parentNode.parentNode.id;
				}else{
				 if(e.target.parentNode.attributes.id.value == undefined){
					id = e.currentTarget.parentNode.parentNode.id;
				 } else {
					id = e.target.parentNode.attributes.id.value;
				 }
				}
				
				if(id=="" || id==undefined){
					id = e.target.parentNode.parentElement.id;
				}
				if(id!=""){
					var componentId = $("#"+id).parents(".pageSection").attr("id");
					 for( i in question.activePage.components){
						 var component = question.activePage.components[i]
						 var cmpId = component.pageIdPrefix + component.pageId + component.idPrefix + component.id;
		 			    	if(cmpId==componentId){
		 			    		if(component.type== 'table'){
		 			    			component.populateEditorProperties(id);
		 			    		}
		 			    	}
		 		       }
					
				}
				$("#linkText_"+id).val(hyperlinkText);
					$("#linkAddress_"+id).val(hyperlinkHref);
					$(".btn-Insert").text("Save");
					var editLabel = $(".insertHyperlinkText").html().replace("Insert","Edit"); 
					$(".insertHyperlinkText").html(editLabel);
					$("#activeHyperlink").text(e.currentTarget.id);
					e.stopImmediatePropagation();
				//}
			},

			/* check media url for video or image and append it to component */
			evaluateMediaUrl : function(mediaLink,elementId, elementType){

				//$("#" + elementId).attr('data-placeholder', '');
				
				var activeLink = false;
				if(elementType == "image"){
					 activeLink = $(".activeImageMediaLnik");
				} else if(elementType == "video"){
					activeLink = $(".activeMediaVideoLnik");
				}
				
				if(activeLink){
					activeLink.remove();
					$("#"+elementId).append(mediaLink);
				} else {
					$("#"+elementId).append(mediaLink);
				}
				$("#"+elementId).append('&nbsp;');

				if(mediaLink.prev().is('br')) {
					mediaLink.prev().remove();
				}
				if(mediaLink.next().is('br')) {
					mediaLink.next().remove();
				}
				$("#" + elementId).trigger('change');
				$("#" + elementId).trigger("blur");
			},
			/*
			* Image link click event - to edit image details
			*/
			editImageLink : function(e) {
				e.stopPropagation();
				
				var imageName = e.target.innerHTML;
				
				if(this.env == "local"){
					Media.imgUrl = "file:///C:/Users/Public/Pictures/Sample%20Pictures/"+imageName;
				} else {
					Media.imgUrl = EZ.mediaBase + imageName;
				}
				
			 	$("#imagePreview").attr('src',Media.imgUrl);

			 	//Get height and width
			    Media.imgWidth = $(e.target).attr('data-width');
			    Media.imgHeight = $(e.target).attr('data-height');

			    $("#imageWidth").val($(e.target).attr('data-width'));
			    $("#imageHeight").val($(e.target).attr('data-height'));

			    $("#imageAltText").val($(e.target).attr('rel'));
			    $("#mediaImageDescription").val($(e.target).attr('data-desc'));

			    $(".activeImageMediaLnik").removeClass("activeImageMediaLnik");
			    $(e.target).addClass("activeImageMediaLnik");

			    util.activaTab('componenetTab3');
				util.activaTab('imageWrapper');
			},

			/* Update media link after editing */
			updateMediaLink : function(e, source){
				if(source == "video"){
					var linkTag = $(".activeMediaVideoLnik");

					linkTag.attr('rel', $("#videoTitle").val());
					linkTag.text($("#videoTitle").val());
					//linkTag.attr('data-altText', $("#videoAltText").val());
					linkTag.attr('data-desc', $("#mediaVideoDescription").val());
					var linkHttp=($("#embedVideoDiv").text()).replace("http://","https://");
					linkTag.attr('data-link', linkHttp);
					//linkTag.attr('data-link', $("#embedVideoDiv").text());
					linkTag.attr('href', $("#embedVideoDiv").text());

					linkTag.removeClass('activeMediaVideoLnik');

					$("#videoTitle").val('');
					//$("#videoAltText").val('');
					$("#mediaVideoDescription").val('');
					$("#embedVideoDiv").text('');

				} else {
					var linkTag = $(".activeImageMediaLnik");
					
					linkTag.attr('data-width', $("#imageWidth").val());
					linkTag.attr('data-height', $("#imageHeight").val());
					linkTag.attr('rel', $("#imageAltText").val());
					linkTag.attr('data-desc', $("#mediaImageDescription").val());
					linkTag.removeClass("activeImageMediaLnik");

					$("#imagePreview").attr('src','');
					$("#imageAltText").val('');
					$("#mediaImageDescription").val('');
					$("#imageWidth").val('');
					$("#imageHeight").val('');
				}

			},

			/* Edit video link on click of video link anchor tag */
			editVideoLink : function(e) {
				e.stopPropagation();
				console.log("tempdivetext"+$("#tempDiv a").attr("data-link"));
				console.log('href : ', $(e.target).attr('href'));
				var parent= $(e.target).parent();
				var obj=parent.attr("id");
		    	var editorObj=this.getEditor(obj);
			
				util.activaTab('componenetTab3');
				util.activaTab('videoWrapper');

				$("#videoTitle").val( $(e.target).attr('rel') );
				//$("#videoAltText").val( $(e.target).attr('data-altText') );
				$("#mediaVideoDescription").val( $(e.target).attr('data-desc') );
				$("#embedVideoDiv").attr('data-placeholder','');
				$("#embedVideoDiv").text("");
				var editormText=(editorObj.text!=null && editorObj.text!=undefined)?editorObj.text:editorObj.editor.text;
				$("#tempDiv").html(editormText);
				var dataLink=$("#tempDiv a").attr("data-link");
				$("#embedVideoDiv").text(dataLink);
				
				$(e.target).addClass("activeMediaVideoLnik");
			},

			/* Check if media is in edit mode if user click on new component */
			checkMediaInEditMode: function() {
				if( $(".mediaImageLink").hasClass("activeImageMediaLnik") ){
			          $(".mediaImageLink").removeClass("activeImageMediaLnik");
			      }
			      if( $(".mediaVideoLink").hasClass("activeMediaVideoLnik") ){
			          $(".mediaVideoLink").removeClass("activeMediaVideoLnik");
			    }
			},

			/* Rendering image from anchor tag in student, preview or post submission */
			getImageLayout : function(editorText) {
				//if(question.mode==MODE_POST_TEST){
					try{
					  editorText = decodeURIComponent(escape(editorText));
					}catch(exp){
					  console.log(exp);
					}
				//}
				var textToSend = editorText;
				if (textToSend.indexOf("mediaImageLink") >= 0){
					var dummyDiv = $("<div id='dummyDiv'>");
					dummyDiv.css("display", "none");
					dummyDiv.html(textToSend);
					dummyDiv.appendTo("body");

					var textString = '';
					var aTag = $("#dummyDiv > a.mediaImageLink");
					
					for(var i=0; i<aTag.length; i++){
						var aTagSingle = $(aTag[i]);
						
						textString = '<div class="displayImageContainer"><img class="imageDisplay" title="'+aTagSingle.attr('rel')+'" src="'+aTagSingle.attr('href')+'" width="'+aTagSingle.attr('data-width')+'" height="'+aTagSingle.attr('data-height')
						+'"alt="'+aTagSingle.attr('rel')+'"></img>'+'<p class="imgDesc">'+aTagSingle.attr('data-desc')+'</p></div>';
						aTagSingle.after(textString);
						aTagSingle.remove();
					}
					textToSend = $("#dummyDiv").html();
					
					$("#dummyDiv").remove();
					return textToSend;
				} else {
					return editorText;
				}
				
			},

			/* Rendering video from anchor tag in student, preview or post submission */
			getVideoLayout : function(editorText) {				
				var textToSend = editorText;

				if (textToSend.indexOf("mediaVideoLink") >= 0){
					
					var dummyDiv = $("<div id='dummyDivVideo'>");
					dummyDiv.css("display", "none");
					dummyDiv.html(textToSend);
					dummyDiv.appendTo("body");
					var aTag = $("#dummyDivVideo > a.mediaVideoLink");
					
		
					for(var i=0; i<aTag.length; i++){
						var aTagSingle = $(aTag[i]);
						var newHref=aTagSingle.attr('href');
						
						/*	if(aTagSingle.attr('href').contains('player=full'))
							{
								newHref = newHref.replace('player=full','player=arpeggio&make_responsive=0');
								
							}*/
						
						newHref = newHref.replace('http://','https://');
						var htmlToAppend = '<div class="displayImageContainer"><p>'+aTagSingle.attr('rel')+'</p>'+newHref+'<p>'+aTagSingle.attr('data-desc')+'</p></div>';
						//var htmlToAppend = '<div class="displayImageContainer"><p>'+aTagSingle.attr('rel')+'</p>'+newHref+'<p>'+aTagSingle.attr('data-desc')+'</p></div>';
						aTagSingle.after(htmlToAppend);
						aTagSingle.remove();
					}
					textToSend = $("#dummyDivVideo").html();
					$("#dummyDivVideo").remove();
					return textToSend;
				} else {
					return textToSend;
				}
			},
			getEditor:function(objId){
				var str=objId+"";
				var page=0;
				var comp=0;
				for(var l=0;l<=str.length;l++){
					if(str[l]=="P"){
						page=parseInt(str[l+1]);
						//break;
					}
					if(str[l]=="C"){
						comp=parseInt(str[l+1]);
						//break;
					}
					
				}
				if(page!=0 && comp!=0){
					if(question.pages[page-1]==undefined){
						page=page-util.checkIfPageDelete(page);
						
					}
					if(question.pages[page-1].components[comp-1]==undefined){
						var diff=parseInt(comp)-question.pages[page-1].components.length;
						comp=comp-diff;
					}
					var compType=question.pages[page-1].components[comp-1].type;
					var comp=question.pages[page-1].components[comp-1];
					if(compType=="inputField"){
						var sections = comp.sections;
		  				for(var k=0;k<sections.length;k++){
		  					var authorEntries = sections[k].authorEntries;
			  				for(var l=0;l<authorEntries.length;l++){
			  					if(authorEntries[l].editor.id == objId){
			  						return authorEntries[l];
			  						break;
			  					}else if(comp.overallFeedback.id==objId){
			  						return comp.overallFeedback;
			  						break;
			  					}else if(comp.generalFeedback.id==objId){
			  						return comp.generalFeedback;
			  						break;
			  					}
			  				}
			  				var studentEntries=sections[k].studentEntries;
			  				for(var l=0;l<studentEntries.length;l++){
			  					if(studentEntries[l].feedback.id == objId){
			  						return studentEntries[l].feedback;
			  						break;
			  					}
			  				}
		  				}	
					}else if(compType=="checkbox"){
						var sections=comp.sections;
						var ranges= comp.ranges;
						var subCat=comp.subCategoryRanges;
						for(var k=0;k<sections.length;k++){
							if(sections[k].editor.id==objId){
	  							return sections[k].editor;
		  						break;	
	  						}
							for(var s=0;s<sections[k].sectionLabels.length;s++){
								if(sections[k].sectionLabels[s].editor.id==objId){
									return sections[k].sectionLabels[s].editor;
									break;
								}
							}
							for(var l=0;l<sections[k].options.length;l++){
								
								if(sections[k].options[l].editor.id==objId){
									return sections[k].options[l];
									break;
								}else if(sections[k].options[l].feedback.id==objId){
									return sections[k].options[l].feedback;
									break;
								}else if(comp.overallFeedback.id==objId){
			  						return comp.overallFeedback;
			  						break;
			  					}else if(comp.generalFeedback.id==objId){
			  						return comp.generalFeedback;
			  						break;
			  					}
							}
		  				
		  				}
						for(var k=0;k<ranges.length;k++){
							if(ranges[k].rangeFeedbackEditor.id==objId){
								return ranges[k].rangeFeedbackEditor;
		  						break;
							}
							
						}
						for(var k=0;k<subCat.length;k++){
							for(var l=0;l<subCat[k].ranges.length;l++){
								if(subCat[k].ranges[l].rangeFeedbackEditor.id==objId){
									return subCat[k].ranges[l].rangeFeedbackEditor;
			  						break;
								}
							}
						}
						
				
	  				}else if(compType=="multiplechoice"){
	  					var sections=comp.sections;
	  					var ranges=comp.ranges;
	  					var subCat=comp.subCategoryRanges;
	  					for(var k=0;k<sections.length;k++){
	  						if(sections[k].editor.id==objId){
	  							return sections[k].editor;
		  						break;	
	  						}
	  						for(var s=0;s<sections[k].sectionLabels.length;s++){
								if(sections[k].sectionLabels[s].editor.id==objId){
									return sections[k].sectionLabels[s].editor;
									break;
								}
							}
	  						for(var l=0;l<sections[k].options.length;l++){
	  							var answers=sections[k].options[l].answers;
	  							if(sections[k].options[l].editor.id==objId){
									return sections[k].options[l];
									break;
								}else if(comp.overallFeedback.id==objId){
			  						return comp.overallFeedback;
			  						break;
			  					}else if(comp.generalFeedback.id==objId){
			  						return comp.generalFeedback;
			  						break;
			  					}else {
			  						for(var a=0;a<answers.length;a++){
			  							if(answers[a].feedback.id==objId){
			  								return answers[a].feedback;
					  						break;
			  							}
			  						}
			  						
			  					}	
	  						}
	  						
	  					}
	  					for(var k=0;k<ranges.length;k++){
							if(ranges[k].rangeFeedbackEditor.id==objId){
								return ranges[k].rangeFeedbackEditor;
		  						break;
							}
							
						}
	  					for(var k=0;k<subCat.length;k++){
							for(var l=0;l<subCat[k].ranges.length;l++){
								if(subCat[k].ranges[l].rangeFeedbackEditor.id==objId){
									return subCat[k].ranges[l].rangeFeedbackEditor;
			  						break;
								}
							}
						}
	  				}else if(compType=="scale"){
	  					var statements=comp.statements;
	  					var scaleLabels =comp.scaleLabels;
	  					var subCategoryRanges=comp.subCategoryRanges;
	  					for(var k=0;k<scaleLabels.length;k++){
	  						if(scaleLabels[k].editor.id==objId){
	  							return scaleLabels[k].editor;
		  						break;
	  						}else if(comp.overallFeedback.id==objId){
		  						return comp.overallFeedback;
		  						break;
		  					}else if(comp.generalFeedback.id==objId){
		  						return comp.generalFeedback;
		  						break;
		  					}
	  					}
	  					for(var s=0;s<statements.length;s++){
	  						if(statements[s].editor.id==objId){
	  							return statements[s].editor;
		  						break;
	  						}
	  						
	  					}
	  					for(var k=0;k<subCategoryRanges.length;k++){
							for(var l=0;l<subCategoryRanges[k].ranges.length;l++){
								if(subCategoryRanges[k].ranges[l].rangeFeedbackEditor.id==objId){
									return subCategoryRanges[k].ranges[l].rangeFeedbackEditor;
			  						break;
								}
							}
						}
	  					
	  					
	  				}
					
				}
				
			},

			/**
			 * find current Component using componnetId
			 */
			getCurrentComp:function(componentId){
				var currentComp=null;
				 var i = 0;
			  		for (i in question.activePage.components) {
			  			if (question.activePage.components[i].getId() == componentId) {
			  				currentComp =question.activePage.components[i];
			  				break;
			  			}
			  		}
			  		return currentComp;
			  		
			},
			 /**
		     * Function to get All Formulas used in Author Entry
		     * @returns {Array} of Formula Ids
		     */
		    getFormulas : function (editorText) {
		    	var editorTextStr= "" + editorText;
		    	var formulaId="";
		    	var formulaIdNew="";
		    	var formulaIds =[];
		    	
		    	while(formulaId != null || formulaIdNew != null){
		    		var indexAngular=-1;
			    	var indexSquare=-1;
		    		formulaId = editorTextStr.match(/\<(.*?)\>/);		    			
		    		if(formulaId != null)
		    			indexAngular = editorTextStr.indexOf(formulaId[0]);
		    			
		    		formulaIdNew = editorTextStr.match(/\[(.*?)\]/);
		    		if(formulaIdNew != null)
		    			indexSquare = editorTextStr.indexOf(formulaIdNew[0]);
		    		
		    		if(indexAngular == -1)
	    			{
		    			editorTextStr = editorTextStr.replace(/\[(.*?)\]/, "");
		    			if(formulaIdNew != null){
			    			formulaIds.push(formulaIdNew[1]);
		    			}
	    			}
		    		else if(indexSquare==-1)
		    		{
		    			editorTextStr = editorTextStr.replace(/\<(.*?)\>/, "");
		    			if(formulaId != null){
			    			formulaIds.push(formulaId[1]);	
			    		} 
		    		}		    		
		    		else if(indexAngular < indexSquare)
		    		{
		    			editorTextStr = editorTextStr.replace(/\<(.*?)\>/, "");
		    			if(formulaId != null){
			    			formulaIds.push(formulaId[1]);	
			    		} 
		    		}
		    		else{
		    			editorTextStr = editorTextStr.replace(/\[(.*?)\]/, "");
		    			if(formulaIdNew != null){
			    			formulaIds.push(formulaIdNew[1]);	
			    		} 
		    		}  		
		    	}
		    	return formulaIds;
			},
			 /**
		     * check if user has entered formula from existed formulae list 
		     */
		    updateFormula:function(editor){
		    console.log("updateFormula");
		     this.removeHyperlink(editor);
		     var  editorText=editor.text;
		     var formulaIDs = this.getFormulas(editor.textWithoutFormatting);//this.getFormulas();
		     var link;	     
		     var newString="";
		     var bracketType="";
		     var isAffected=false;
		     for(var f = 0; f<= formulaIDs.length; f++)
		     {	if(formulaIDs[f]!= undefined){
		    	 isAffected=question.isFormulaAffected(formulaIDs[f]);	 
		    
		    	var isValid=question.IsFormulaExists(formulaIDs[f]);
		    	if(isValid && !isAffected){
		    	 var formula="\&lt;"+ formulaIDs[f] +"\&gt;";		    	
		    	 var fIndex = editorText.indexOf(formula);
		    	 
		    	 var formula1="["+ formulaIDs[f] +"]";		    	
		    	 var fIndex1 = editorText.indexOf(formula1);
		    	  
		    	 if(fIndex == -1)
	    		 {
		    		 bracketType = "square";
				     fIndex = fIndex1;
				     formula = formula1;
	    		 }
		    	 else if(fIndex1 == -1)
	    		 {
		    		 bracketType = "angular";
	    		 }
		    		 
		    	 else if(fIndex > fIndex1)
    			 { 
			    	bracketType = "square";
			    	fIndex = fIndex1;
			    	formula = formula1;
    			 }
		    	 else
		    		 bracketType = "angular";
		    	 if(fIndex != -1)
    			 {
		    		 link=question.getFormulaHyperlink(formulaIDs[f],editor.id,bracketType);
		    		 var anchorString = "";
		    		 if(bracketType == "angular")
		    			 anchorString = editorText.substr(fIndex+formulaIDs[f].length+8,4);
		    		 else if(bracketType == "square")
		    			 anchorString = editorText.substr(fIndex+formulaIDs[f].length+2,4);
		    		 
		    		 if(anchorString != "</a>")
		    		 {
		    			 var beforeString = "";
		    			 if(bracketType == "angular")
	    				 {
			    			 beforeString = editorText.substr(0,fIndex+formulaIDs[f].length+8);
			    			 editorText = editorText.substr(fIndex + formulaIDs[f].length+8, editorText.length);
			    			 
	    				 }
		    			 else if(bracketType == "square")
	    				 {
		    				 beforeString = editorText.substr(0,fIndex+formulaIDs[f].length+2);
			    			 editorText = editorText.substr(fIndex + formulaIDs[f].length+2, editorText.length);
	    				 }
		    			 
		    			 beforeString = beforeString.replace(formula, link);
		    			 newString = newString + beforeString;
		    		 }
		    		 else
	    			 {	
		    			 var checkTarget =$("<div/>").html(editorText).find('a').attr('href');
		    			 if(checkTarget != undefined)
		    			 {
		    				 newString = newString + editorText.substr(0,fIndex + formulaIDs[f].length+12);
			    			 editorText = editorText.substr(fIndex+formulaIDs[f].length+12, editorText.length);
			    			 f--;
		    			 }
		    			 else if(bracketType == "angular")
	    				 {
		    				 var anchorIndex = editorText.indexOf("<a");
		    				 newString = newString.replace(/&nbsp;/g, "") + editorText.substr(0,anchorIndex).replace(/&nbsp;/g, "");
		    				 var beforeString = editorText.substr(anchorIndex,fIndex + formulaIDs[f].length+12);
		    				 beforeString = beforeString.replace(beforeString,link);
			    			 newString = newString + beforeString;
			    			 editorText = editorText.substr(fIndex+formulaIDs[f].length+12, editorText.length);
	    				 }
		    			 else if(bracketType == "square")
	    				 {
		    				 var anchorIndex = editorText.indexOf("<a");
		    				 newString = newString.replace(/&nbsp;/g, "") + editorText.substr(0,anchorIndex).replace(/&nbsp;/g, "");
		    				 var beforeString = editorText.substr(anchorIndex,fIndex + formulaIDs[f].length+6);
		    				 beforeString = beforeString.replace(beforeString,link);
		    				 newString = newString + beforeString;
			    			 editorText = editorText.substr(fIndex+formulaIDs[f].length+6, editorText.length);
	    				 }
	    			 }		    			 
    			 }
		    	 	    	 
		    	} 
		     }
		     }
		     editorText = newString + editorText;		     
		     editor.text = editorText;
		     $("#tempDiv").html(editorText);
		     this.removeRedUnderline();
		     $("#"+editor.id).html($("#tempDiv").html());
		    },
		   updateMedia:function(editor){
		    	var newMedia = new Media({id:editor.id});
		    	newMedia.update();
		    },
		    /***
			 * Function to remove Red Underline from Formula Id
		     */
		    removeRedUnderline :function (){
		    	$( ".deletedFormula" ).find("a").parents(".deletedFormula").removeClass("deletedFormula");
		    },
		    /***
			 * Function to remove deleted Formula Hyperlinks from Editor (Author Entry , Feedback)
			 * @param editor {Object} 
		     */
		    removeHyperlink : function(editor) {
		    	 var  editorText=""+editor.text;
		    	 $("#tempDiv").html(editorText);
		    	 var allLinks =  $("#tempDiv a");
		    	 var link="";
		    	 var isValidFormula=false;
		    	 var isAffected=false;
		    	 for(var i=0;i<allLinks.length;i++){
		    		 link = allLinks[i];
		    		 linkOuterHTMLText = ""+link.outerHTML;
		    		 if(linkOuterHTMLText.indexOf("question.viewFormula(event)")!=-1 ){
		    			 var formulaId = link.text.substring(1,link.text.length-1);
		    			 if(formulaId != ""){
		    				 isAffected=question.isFormulaAffected(formulaId);
			    			 if(!question.IsFormulaExists(formulaId) || isAffected){
			    				 link.classList.add("deletedFormula");
			    			 }
		    			 }
		    		 }		    		 
		    	 }
		    	 $( "a.deletedFormula" ).replaceWith(function() {
		    		 var formulaID= ""+$( this ).html();
		    		 //formulaID = formulaID.replace("&lt;","<");
		    		 //formulaID = formulaID.replace("&gt;",">");
		    		 return "<span class='deletedFormula'>"+formulaID+ "</span>";
		    	 });
		    	 
		    	 editorText = $("#tempDiv").html();
		    	 if(editorText!= undefined)
		    	 {	 
		    		 editor.text = editorText;
		    	 }
			},
		    /**
		     * Converts Valid Formulas to links and returns layout for labels  
		     */
		    getFormulaLinksForStudent:function(editor){
	    	if(editor!=undefined)
	    	{
			     var  editorText=editor.text;
			    // this.hideDeletedFormulas(editor);		     
			     var formulaIDs = this.getFormulas(editor.textWithoutFormatting);
			     var formula,studentEntries,html;
			     var isAffected=false;
			     for(var i = 0; i<= formulaIDs.length; i++)
			     {	
			    	 if(formulaIDs[i]!= undefined){
				    	isAffected=question.isFormulaAffected(formulaIDs[i]);
				    	var isValid=question.IsFormulaExists(formulaIDs[i]);
				    	if(isValid && !isAffected){	
				    		 var titleText =$("<div/>").html(editorText).find('a').attr('title');		    	
					    	 var startIndex = editorText.indexOf("<a");
					    	 var endIndex = editorText.indexOf("</a>");
					    	 var editorLinkText = editorText.substr(startIndex,(endIndex-startIndex)+4);
					    	 formula = this.getFormula(formulaIDs[i]);
					    	 formula.equation=formula.equation.replace("&#160;","");
					    	 studentEntries = formula.getStudentEntryIds(formula.equation);
					    	 var decimalPlaces = formula.decimalVal;
					    	 var cssDisplay = (titleText.indexOf("Calculation") == -1)? "display:unset; max-width:155px !important;" : "display:none;" ;
					    	 html = "<span style='"+ cssDisplay +"' class='formula' deci='"+ decimalPlaces +"'>";
					    	 html += this.getFormulaComponentsLayout(titleText,studentEntries,decimalPlaces);			    	
					    	 editorText= editorText.replace(editorLinkText,html+" ");
				     	}else{
				     		editorText = editorText.replace("deletedFormula","");
				     	}
			    	 }
			     }
			     return editorText.replace(/\Â/g,'').replace(/\&#160;/g,'');
		    	}
		    },
		    
		    getFormulaLinkForPostSubmission:function(editor, compType){
		    	var  editorText = editor.text;
			     var finalText = "";
			     var isAffected=false;
			     var formulaIDs = this.getFormulas(editor.textWithoutFormatting);//this.getFormulas();		     
			     for(var f = 0; f<= formulaIDs.length; f++)
			     {	
			    	 if(formulaIDs[f]!= undefined){
			    	 isAffected=question.isFormulaAffected(formulaIDs[f]);     
			    	var isValid=question.IsFormulaExists(formulaIDs[f]);
			    	if(isValid && !isAffected){	
			    	 var formulaEquation = question.getFormulaEquation(formulaIDs[f],editor.id);	
			    	 var formula = this.getFormula(formulaIDs[f]);
			    	 var studentEntries = formula.getStudentEntryIds(formula.equation);
			    	 var checkTarget =$("<div/>").html(editorText).find('a').attr('href');
			    	 var bracketType = $("<div/>").html(editorText).find('a').attr('title');
			    	 var checkType = bracketType.indexOf("Formula");
			    	 
			    	 if(checkType == -1)
			    		 bracketType = "angular";
			    	 else
			    		 bracketType = "square";
			    	 var startIndex = editorText.indexOf("<a");
			    	 var endIndex = editorText.indexOf("</a>");
			    	 if(startIndex != -1 && endIndex != -1)
		    		 {
				    	if(checkTarget == undefined)
				    	{
					    	 var editorLinkText = editorText.substr(startIndex,(endIndex-startIndex)+4);
					    	 var beforeString = editorText.substr(0,endIndex+4);
					    	 var result = this.getResultOfFormula(formulaEquation,bracketType,formula.decimalVal,studentEntries);
					    	 beforeString = beforeString.replace(editorLinkText,result+" ");	
					    	 editorText= editorText.substr(endIndex+4,editorText.length);
					    	 finalText = finalText + beforeString;
				    	}
				    	else
				    	{
			    			finalText = finalText + editorText.substr(0,endIndex+4);
			    			editorText = editorText.substr(endIndex+4, editorText.length);
			    			f--;		    		
				    	}
		    		 }
			    	
			     	}else{
			     		editorText = editorText.replace("deletedFormula","");
			     	}
			     }
			     }
			     finalText = finalText+editorText;		    	 	    	 
				 return finalText.replace(/\Â/g,'').replace(/\&#160;/g,'');
		    },
		    getResultOfFormula:function(formulaEquation,bracketType,decimalVal,studentEntriesN)
		    {
		    	//console.log("get result of formula");
		    	var result = "";
		    	var stdNtryTxt = "";
		    	var oldEquation = formulaEquation;
		    	for(var i=0;i<question.pages.length;i++){
		   			var components = question.pages[i].components;
		   			for(var j=0;j<components.length;j++){
		   				if(components[j].type=='inputField'){	
		   					var sections = components[j].sections;
		 	  				for(var k=0;k<sections.length;k++){
		 	  					var studentEntries = sections[k].studentEntries;
		 	  					if(studentEntries != null)
		 	  					{
		 	  						var uniqueStudentEntriesArray = studentEntries.filter(function(elem, pos) {
			 	  			  		    return studentEntries.indexOf(elem) == pos;
			 	  			  		});
			 		  				for(var l=0;l<uniqueStudentEntriesArray.length;l++){
			 		  					var entryType=question.getStudentEntry(uniqueStudentEntriesArray[l].editor.id);
			 		  					stdNtryTxt = uniqueStudentEntriesArray[l].editor.text.replace(/,/g,"");;
			 							if(entryType && entryType.contentFormat.type=="percentage")	
			 								formulaEquation = formulaEquation.replace(eval("/"+"\\b"+uniqueStudentEntriesArray[l].editor.id+"\\b"+"/","gi"), stdNtryTxt==""?"_":(parseFloat(stdNtryTxt)/100));
			 							
		 								else
		 									formulaEquation = formulaEquation.replace(eval("/"+"\\b"+uniqueStudentEntriesArray[l].editor.id+"\\b"+"/","gi"), stdNtryTxt==""?"_":parseFloat(stdNtryTxt));
			 		  				}
		 	  					}
		 	  				}
		   				}	
		   				else{
		   					if(components[j].type=='table'){
		   		  				var studentEntries = studentEntriesN;//components[j].authorEntries;
			   		  			if(studentEntries != null)
		 	  					{
				   		  			var uniqueStudentEntriesArray = studentEntries.filter(function(elem, pos) {
			 	  			  		    return studentEntries.indexOf(elem) == pos;
			 	  			  		});
				   		  		 for(var i=0;i<uniqueStudentEntriesArray.length;i++){
						  			 var studObj = question.getStudentEntry(uniqueStudentEntriesArray[i].trim());
						  			 var entryType=question.getStudentEntry(uniqueStudentEntriesArray[i]);
						  			 if(studObj!= null && studObj.editor.text !== "" && studObj.editor.text !== "&nbsp;")
						  			 {
						  				 if(entryType.contentFormat.type=="percentage")
						  					 studentEntryText = eval(studObj.editor.text/100).toString();
						  				 else
						  					studentEntryText = studObj.editor.text;
						  			 }
						  			 else
						  				 studentEntryText = "<span style=\"display:unset;\"  class='"+uniqueStudentEntriesArray[i].trim()+"'>_</span>";	
						  			var uniqueStudentEntry=uniqueStudentEntriesArray[i];
						  			var a=(i<(uniqueStudentEntriesArray.length-1))?eval("/"+uniqueStudentEntry+"\\+"+"/g"):eval("/"+uniqueStudentEntry+"/g");
						  			 if(entryType=="percentage")	
						  				formulaEquation  = formulaEquation.replace(eval("/"+"\\b"+uniqueStudentEntry+"\\b"+"/","gi"),(studentEntryText));
						  			
						  				//formulaEquation  =(i<(uniqueStudentEntriesArray.length-1))? formulaEquation.replace(a,(studentEntryText+"+")): formulaEquation.replace(a,(studentEntryText));
						  			else
						  				formulaEquation  = formulaEquation.replace(eval("/"+"\\b"+uniqueStudentEntry+"\\b"+"/","gi"),(studentEntryText));
						  				
						  				//formulaEquation  =(i<(uniqueStudentEntriesArray.length-1))? formulaEquation.replace(a,(studentEntryText+"+")): formulaEquation.replace(a,(studentEntryText));
										if(studentEntryText.indexOf("<span") ==-1)
							  			{
							  				studentEntryText = "<span style=\"display:unset;\"  class='"+uniqueStudentEntriesArray[i].trim()+"'>"+studentEntryText+"</span>";
							  				oldEquation  = oldEquation.replace(eval("/"+"\\b"+uniqueStudentEntry+"\\b"+"/","gi"),(studentEntryText));
							  				
							  				//oldEquation =(i<(uniqueStudentEntriesArray.length-1))? oldEquation.replace(a,studentEntryText+"+"):oldEquation.replace(a,studentEntryText);
							  			}
							  			else
							  				oldEquation  = oldEquation.replace(eval("/"+"\\b"+uniqueStudentEntry+"\\b"+"/","gi"),(studentEntryText));
							  				//oldEquation =(i<(uniqueStudentEntriesArray.length-1))? oldEquation.replace(a,studentEntryText+"+"):oldEquation.replace(a,studentEntryText);
						  		 }
			 		  	/*			for(var l=0;l<uniqueStudentEntriesArray.length;l++){	
			 		  					var studentEntry = uniqueStudentEntriesArray[l];			 		  					
			 		  					if(formulaEquation.indexOf(uniqueStudentEntriesArray[l])!=-1)
			 		  					{
				 		  					if(studentEntry && (studentEntry.contentFormat.type=="number"||studentEntry.contentFormat.type=="percentage"||studentEntry.contentFormat.type=="currency")){
				 		  						if(studentEntry.editor.text==null||studentEntry.editor.text=="")
				 		  							studentEntry.editor.text="0";
				 		  					}
			 		  					}
			 		  					stdNtryTxt = studentEntry.editor.text.replace(/,/g,"");;
			 		  					var uniqueStudentEntry=uniqueStudentEntriesArray[l];
			 		  					//var isLast=(uniqueStudentEntry==1)?true:false;
			 				  			var a=(l<(uniqueStudentEntriesArray.length-1))?eval("/"+uniqueStudentEntry+"\\+"+"/g"):eval("/"+uniqueStudentEntry+"/g");
			 							if(studentEntry && studentEntry.contentFormat.type=="percentage")
			 								
			 								formulaEquation =(l<(uniqueStudentEntriesArray.length-1))?formulaEquation.replace(a, stdNtryTxt==""?"_":(parseFloat(stdNtryTxt)/100)+"+"): formulaEquation.replace(a, stdNtryTxt==""?"_":(parseFloat(stdNtryTxt)/100));
			 							else
			 								formulaEquation = (l<(uniqueStudentEntriesArray.length-1))?formulaEquation.replace(a, stdNtryTxt==""?"_":(parseFloat(stdNtryTxt))+"+"):formulaEquation.replace(a, stdNtryTxt==""?"_":(parseFloat(stdNtryTxt)));
			 		  				}*/
		   		  				}
		   	  				}
		   				}
		   			}
		   		}
		    	try
		    	{
			    	formulaEquation = formulaEquation.replace(/&nbsp;/gi,''); //remove all occurences of &nbsp;
			    	var flag= /\d/.test(formulaEquation);
			    	var tempResult;
			    	if(flag){
			    		formulaEquation=formulaEquation.replace(/_/g,0);
			    		formulaEquation=formulaEquation.replace(/<\/?span[^>]*>/g,"");
			    		tempResult = eval(formulaEquation);
			    	}else{
			    		tempResult = math.eval(formulaEquation.replace(/,/g,""));
			    	}
			    	 
			    	if(isNaN(tempResult) || tempResult=="Infinity" || tempResult=="infinity"){
			    		result=0;
		    		}else{
		    			tempResult = this.roundOff(tempResult,decimalVal);
		    			if(tempResult>1){
							var newvalues=tempResult.toString().split(".");
							if(newvalues.length>1){
								newvalues[0]=newvalues[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");						
								tempResult = newvalues[0]+"."+newvalues[1];//evaluatedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}
							else
								tempResult=tempResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");	
						}
		    			if(bracketType == 'square'){
				    		result = formulaEquation + " = <span class=\"resultF\">" + tempResult+"</span>";
				    	}
				    	else{
				    		result = tempResult;
				    	}
		    			
		    		}
		    	}
		    	catch(err)
		    	{	if(isNaN(result))
					result=0;
		    		if(bracketType == 'square'){
		    		
		    			result = formulaEquation + " =_ ";
		    		}
		    		else{
		    			result = "_";
		    		}
		    	}
		    	return result;
		    },
		    getFormulaLink:function(editor){
		    	var editorTextStr= "" + editorText;
		    	var formulaId="";
		    	var formulaLinks =[];
		    	while(formulaId != null){
		    		formulaId = editorTextStr.match(/(<[a|A][^>]*>|)/);	
		    		var TitleText =$("<div/>").html(formulaId[1]).find('a').text();
		    		var isValid=question.IsFormulaExists(TitleText);
		    		if(isValid){
		    			
		    		}
		    		editorTextStr = editorTextStr.replace(/(<[a|A][^>]*>|)/, "");
		    		if(formulaId != null){
		    			formulaLinks.push(formulaId[1]);	
		    		}    		
		    	}
		    	return formulaLinks;
		    },
		    /***
		  	 * Function to get Formula Object From Formula Id
		  	 * 
		  	 * @param Formula Id of Formula  
		  	 * @returns Formula Object of passed Id
		  	 */
		  	getFormula : function (formulaId){
		  		for(var i=0;i<question.formulas.length;i++){
		  			if(question.formulas[i].getId() == formulaId){
		  				return question.formulas[i];
		  			}
		  		}
		  		return null;
		  	},
		  	/***
		  	 * Function to get Formula Components Layout
		  	 * 
		  	 * @param formulaEquation Formula Equatiom  
		  	 * @param studentEntries Student Entries in Formula 
		  	 * @returns {String} inline template for student entries for first time   
		  	 */
		  	getFormulaComponentsLayout : function(formulaEquation,studentEntries,decimalPlaces) {
				var oldEquation = formulaEquation;
		  		var studentEntryText = "";
		  		var uniqueStudentEntriesArray = studentEntries.filter(function(elem, pos) {
		  		    return studentEntries.indexOf(elem) == pos;
		  		});
		  		 for(var i=0;i<uniqueStudentEntriesArray.length;i++){
		  			 var studObj = question.getStudentEntry(uniqueStudentEntriesArray[i].trim());
		  			 var entryType=question.getStudentEntry(uniqueStudentEntriesArray[i]);
		  			 if(studObj!= null && studObj.editor.text !== "" && studObj.editor.text !== "&nbsp;")
		  			 {
		  				 if(entryType.contentFormat.type=="percentage")
		  					 studentEntryText = eval(studObj.editor.text/100).toString();
		  				 else
		  					studentEntryText = studObj.editor.text;
		  			 }
		  			 else
		  				 studentEntryText = "<span style=\"display:unset;\"  class='"+uniqueStudentEntriesArray[i].trim()+"'>_</span>";	
		  			
		  			 if(entryType=="percentage")	
		  				//formulaEquation  = formulaEquation.replace(eval("/"+uniqueStudentEntriesArray[i]+"/g"),studentEntryText);
		  			 formulaEquation  = formulaEquation.replace(eval("/"+"\\b"+uniqueStudentEntriesArray[i]+"\\b"+"/","gi"),studentEntryText);
		  			
		  			else
		  				//formulaEquation  = formulaEquation.replace(eval("/"+uniqueStudentEntriesArray[i]+"/g"),studentEntryText);
		  			formulaEquation  = formulaEquation.replace(eval("/"+"\\b"+uniqueStudentEntriesArray[i]+"\\b"+"/","gi"),studentEntryText);
		  			
						if(studentEntryText.indexOf("<span") ==-1)
			  			{
			  				studentEntryText = "<span style=\"display:unset;\"  class='"+uniqueStudentEntriesArray[i].trim()+"'>"+studentEntryText+"</span>";
			  				
			  				//oldEquation = oldEquation.replace(eval("/"+uniqueStudentEntriesArray[i]+"/g"),studentEntryText);
			  				oldEquation  = oldEquation.replace(eval("/"+"\\b"+uniqueStudentEntriesArray[i]+"\\b"+"/","gi"),studentEntryText);
			  			}
			  			else
			  				//oldEquation  = oldEquation.replace(eval("/"+uniqueStudentEntriesArray[i]+"/g"),studentEntryText);
						oldEquation  = oldEquation.replace(eval("/"+"\\b"+uniqueStudentEntriesArray[i]+"\\b"+"/","gi"),studentEntryText);
		  		 }
		  		var titleText = formulaEquation;	  		
		  		var isFormula = false;
		  		if(formulaEquation.indexOf("Calculation") == -1)
		  			isFormula = true;
		  		
		  		formulaEquation = formulaEquation.replace("Calculation =","");
		  		formulaEquation = formulaEquation.replace("Formula = ","");
		  		
				oldEquation = oldEquation.replace("Calculation =","");
		  		oldEquation = oldEquation.replace("Formula = ","");
		  		var result = "";		  		
		  		var resultOnly="";		  		
	  			try
	  			{	  				
	  				result = eval(formulaEquation);
	  				resultOnly = this.roundOff(result,decimalPlaces);	  				
					result = oldEquation;
	  				if(isFormula)			  			
	  					result = oldEquation;		  					
	  			}
	  			catch(err){		  				
	  				result = oldEquation;
	  			}
	  			
	  			result += "</span>";
	  			
		    	if(titleText.indexOf("Calculation") == -1){
		    		 if(resultOnly!="")
		    			 result += "<span style=\"display:unset;\" class='formulaCalculation'>= "+resultOnly+"</span>";
		    		 else
		    			 result += "<span style=\"display:unset;\" class='formulaCalculation'>= _</span>";
		    		result += "<span class='formulaResult' style='display:none;'>_</span>";
		    	 }else{
		    		 result += "<span  class='formulaCalculation' style='display:none;'>_</span>";
		    		 if(resultOnly!="")
		    			 result += "<span style=\"display:unset;\" class='formulaResult'>"+resultOnly+"</span>";
		    		 else
		    			 result += "<span style=\"display:unset;\" class='formulaResult'>_</span>";
		    	 }
		  			
		  		return result;
			},
			roundOff:function(number,decimal)
		      {
		    	  if(number.toString().indexOf('.') == -1) {
		    		  number = number.toFixed(decimal);
				  }else{
					 var strEvaluatedValue =  number.toString().split(".");
					 if(strEvaluatedValue[1].length < decimal){
						 number = number.toFixed(decimal);
					 }else{
						 var multiplier = Math.pow(10, decimal);
						 number = (Math.round(number * multiplier) / multiplier);
						 if(number.toString().indexOf('.') == -1) {
					    		number = number.toFixed(decimal);
						 }else{
							 var str =  number.toString().split(".");
							 if(str[1].length < decimal){
								 number = number.toFixed(decimal);
							 }
						 }
					 }
				  }
		    	  return number;
		      },
			/***
		  	 * Function to hide deleted Formulas from editor
		  	 * @param editor {Object}   
		  	 */
			hideDeletedFormulas : function(editor){
				$("#tempDiv").html(editor.text);
				$( ".deletedFormula" ).replaceWith("");
				editor.text = $("#tempDiv").html();
			},
			/***
			 * Function to check passed parameter is number or not
			 **/
			isNumber : function (number)  {
				  return !isNaN(parseFloat(number)) && isFinite(number);
			},
			placeCaretAtEnd : function (el) {
			    el.focus();
			    if (typeof window.getSelection != "undefined"
			            && typeof document.createRange != "undefined") {
			        var range = document.createRange();
			        range.selectNodeContents(el);
			        range.collapse(false);
			        var sel = window.getSelection();
			        sel.removeAllRanges();
			        sel.addRange(range);
			    } else if (typeof document.body.createTextRange != "undefined") {
			        var textRange = document.body.createTextRange();
			        textRange.moveToElementText(el);
			        textRange.collapse(false);
			        textRange.select();
			    }
			},
			activaTab : function (tab){
			    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
			},
			reArrangeComponent : function(page){
				var compReOrederId = [],
				i, 
				j;
				var compCollection = $(".pageSection");
				
				for(i = 0; i < compCollection.length; i++){
					if(! $("#"+compCollection[i].id).hasClass("cellComponent") ){
						compReOrederId.push(compCollection[i].id);
					}
				}
				i=0;
				j=0;
				if(compReOrederId.length > 0){
					page.reCompArray = [];
					for(i=0; i<compReOrederId.length; i++){
						for(j=0; j<page.components.length; j++){
							var comp = page.components[j];
							var compId = comp.pageIdPrefix + comp.pageId+ comp.idPrefix + comp.id;
							if(compId == compReOrederId[i]){
								if(comp != null){
									page.reCompArray[i] = comp;
								}
							}
						}
					}
				} else{
					if(page.reCompArray != ""){
						page.reCompArray = page.reCompArray;	
					} else{
						page.reCompArray = page.components;
					}
				}
			},
			 checkTableFormulaCell:function(studentResponse){
		    	  for(var i=0 ; i < question.formulas.length ; i++){
		              var formula = question.formulas[i];
		              var destinations = formula.destinations;
		        	  var authorEntry;
		        	  if(destinations[i]==undefined){
		        		  authorEntry = question.getAuthorEntry(destinations[0]);   
		        	  }else{
		        		  authorEntry = question.getAuthorEntry(destinations[i]); 
		        	  }
		        	 
		        	  if(authorEntry != null){
		        		
		        		  if(authorEntry.cellId != undefined){
		        				for(var index=0;index<question.pages.length;index++){
						  			var components = question.pages[index].components;
						  			for(var j=0;j<components.length;j++){
						  				var cmpId = components[j].pageIdPrefix+components[j].pageId+components[j].idPrefix+components[j].id;
						  				var cmpIdAuthorEntry = authorEntry.pageIdPrefix+authorEntry.pageId+authorEntry.idPrefix+authorEntry.id;
						  				if(cmpId == cmpIdAuthorEntry){
						  					//var studentResponse=this.editor.text.trim();  
						  			    	//studentResponse = studentResponse.replace("/&nbsp;/g","");
						  					components[j].activateBranching(studentResponse);
						  				}
						  			}
				  				}
		        		  }
		        		  
		        	  }
		             
		            }
		    	  
		      },
		      //check mapping for multiCriteria
		      checkMultiCriteriaMapping : function(branch, score){
		     	var comp1 = null;
		     	var comp2 = null;
		     	var cId_1 = branch.cId;
		     	var cId_2 = branch.cId_2;
		     	 var i = 0;
				 for (i in question.activePage.components) {
					 var comp = question.activePage.components[i]
					 var fullCmpId = comp.pageIdPrefix + comp.pageId + comp.idPrefix + comp.id; 
						if(fullCmpId == cId_1){
							comp1 = comp;
						}
						if(fullCmpId == cId_2){
							comp2 = comp;
						}
				 }
		     	 //reset all paths
		     	 this.setResetFlag(branch, false);
	     		 this.checkConditions(comp1, comp2, branch, score);
		      },
		      //check conditions and set flag for satisfied conditions
		      checkConditions : function(comp1, comp2, branch, score){
		    	  if(branch.mappingIndicator == "answerOption" && branch.mappingIndicator_2 == "answerOption"){
		    		  isScoreRange = false;
		    	  }else{
		    		  isScoreRange = true;
		    	  }
		    	  switch (branch.firstCompType + "-" + branch.secCompType) {
						case "multiplechoice-multiplechoice":
							this.mCMcScoreRange(comp1, comp2, branch, isScoreRange);
							break;
						case "multiplechoice-scale":
						case "scale-multiplechoice":
							this.mCScaleScoreRange(comp1, comp2, branch, isScoreRange);
							break;
				
						case "multiplechoice-checkbox":
						case "checkbox-multiplechoice":
							this.mCCheckBoxScoreRange(comp1, comp2, branch, isScoreRange);
							break;
						case "checkbox-checkbox":
							this.checkBoxCheckBoxScoreRange(comp1, comp2, branch, isScoreRange);
							break;
						case "scale-checkbox":
						case "checkbox-scale":
							this.scaleCheckBoxScoreRange(comp1, comp2, branch, isScoreRange);
							break;
						case "multiplechoice-inputField":
						case "inputField-multiplechoice":
							this.mCInput(comp1, comp2, branch, isScoreRange);
							break;
						case "scale-inputField":
						case "inputField-scale":
							this.scaleInput(comp1, comp2, branch, isScoreRange);
							break;
						case "checkbox-inputField":
						case "inputField-checkbox":
							this.cataInput(comp1, comp2, branch, isScoreRange);
							break;
						case "inputField-inputField":
							this.inputInput(comp1, comp2, branch, isScoreRange);
							break;
						case "multiplechoice-table":
						case "table-multiplechoice":
							this.mCTable(comp1, comp2, branch, isScoreRange);
							break;
						case "scale-table":
						case "table-scale":
							this.scaleTable(comp1, comp2, branch, isScoreRange);
							break;
						case "checkbox-table":
						case "table-checkbox":
							this.cataTable(comp1, comp2, branch, isScoreRange);
							break;
						case "table-inputField":
						case "inputField-table":
							this.inputTable(comp1, comp2, branch, isScoreRange);
							break;
						case "table-table":
							this.tableTable(comp1, comp2, branch, isScoreRange);
							break;
					}		  
		      },
		      checkTableCellCondition : function(currentComponent, branch, cellId, pathMapIndx, type, rangeId, conditionId){
		    	  var isCndtnTrue = false;
		    	  for(cellIndex  in currentComponent.cellComponentCollection){
   	        		 var cellComponent = currentComponent.cellComponentCollection[cellIndex].component;
   	        		 if(cellComponent != ""){
   	        			if(cellComponent.cellId == cellId){
      	        			 if(cellComponent.type == "Label"){
      	        				//set path for updated formula values
      	                    	 for(var index = 0 ; index < question.formulas.length; index++){
      	                    		 var cellId = currentComponent.getFullComponentId() + cellComponent.cellId;
      	                    		 if($.inArray(cellId, question.formulas[index].destinations) != -1){
      	                    			 var result = $("#"+cellId).find(".formulaResult").text();
      	                    			 isCndtnTrue = this.checkInputCondition(cellComponent.cellId,result, branch, pathMapIndx,"table", rangeId, conditionId);
      	                    		 }
      	                    	 }
      	                     }else if(cellComponent.type == "Input field"){
      	                    	//set path for current inputField
      	                    	 var contentType = cellComponent.contentFormat.type;
      		                     if(contentType == "number" || contentType == "currency" || contentType == "percentage"){
      		                    	 var result = cellComponent.studentEntries[0].editor.text;
      		                    	isCndtnTrue = this.checkInputCondition(cellComponent.cellId,result, branch, pathMapIndx, "table", rangeId, conditionId);
      		                     }
      	                     }
   	        			}	 
	        		}
  				} 
		    	  return isCndtnTrue;
		      },
		      tableTable : function(comp1, comp2, branch, isScoreRange){
		      	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
	    		  var i = 0;
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
					  // check pathmap related option's student response
					 
					  var isCndtnTrue = this.checkTableCellCondition(comp1, branch, branch.pathMaps[i].compOptionId, i, "table");
				      if(isCndtnTrue){
				    	  flag1 = true;
				      }
				      var indx = 0;
				      var celId = null;
				      for(indx in branch.pathMaps[i].labelOptionsObject){
				    	  if((branch.pathMaps[i].idCriteria2) == (parseInt(indx)+1)){
				    		  celId = branch.pathMaps[i].labelOptionsObject[indx].cellId;
				    	  }
				      }
				      var cIndex = 0;
				      for(cIndex in branch.pathMaps[i].condition){
				    	  flag2 = false;
				    	  if(cIndex != 0){
				    		  var conditionId = branch.pathMaps[i].condition[cIndex].id;
							  oIndex = 0;
							  isCndtnTrue = this.checkTableCellCondition(comp2, branch, celId, i, "table","",conditionId);
							  if(isCndtnTrue){
						    	  flag2 = true;
						      }
				    	  }
						  if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
	    				  if(isCondTrue){
	    					  //find pathIndex respective to satisfied condition
	    					  var pIndex = 0;
	    					  for(pIndex in branch.pathMaps[i].paths){
	    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId || branch.pathMaps[i].paths[pIndex].secConditionId == conditionId){
	    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
	    						  }
	    					  }
						  }
					  }
	    		  }  
		      },

		      inputInput : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  //get sections involve in branching
	    		  var sections = comp1.sections;
				  for(sIndex in sections){
					  if(branch.sectionId == sections[sIndex].id){
						  section1 =  sections[sIndex];
					  }
				  }	
				  sIndex = 0;
				  sections = comp2.sections;
				  for(sIndex in sections){
					  if(branch.sectionId_2 == sections[sIndex].id){
						  section2 =  sections[sIndex];
					  }
				  }	
	    		  var i = 0;
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
					  // check pathmap related option's student response
					  var oIndex = 0;
					  for(oIndex in section1.studentEntries){
    					stdEntry = section1.studentEntries[oIndex];
    					var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField", "",1);
    				    if(isCndtnTrue){
    				       flag1 = true;
    				       break;
    				    }
  	    			  }
					  var cIndex = 0;
					  for(cIndex in branch.pathMaps[i].condition){
						  flag2 = false;
						  var conditionId = branch.pathMaps[i].condition[cIndex].id;
						  oIndex = 0;
						  for(oIndex in section2.studentEntries){
	    					stdEntry = section2.studentEntries[oIndex];
	    					if(cIndex != 0){
	    						var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField", "", conditionId);
		    				    if(isCndtnTrue){
		    				       flag2 = true;
		    				       break;
		    				    }
	    					}
	  	    			  }
						  if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
	    				  if(isCondTrue){
	    					  //find pathIndex respective to satisfied condition
	    					  var pIndex = 0;
	    					  for(pIndex in branch.pathMaps[i].paths){
	    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId || branch.pathMaps[i].paths[pIndex].secConditionId == conditionId){
	    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
	    						  }
	    					  }
						  }
					  }
					  
					  
	    		  }
		      },
		      inputTable : function(comp1, comp2, branch, isScoreRange){
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
	    		  var i = 0;
	    		  var inputSection = null;
	    		  var sections = null;
	    		  var compTable = null;
	    		  var sIndex = 0;
	    		  var isCondTrue = false;
	    		  if(comp1.type == "inputField"){
	    			  isInputFirst = true;
	    			  sections = comp1.sections;
	    			  for(sIndex in sections){
						  if(branch.sectionId == sections[sIndex].id){
							  inputSection =  sections[sIndex];
						  }
					  }	
	    			  compTable = comp2;
	    		  }else{
	    			  sections = comp2.sections;
	    			  for(sIndex in sections){
						  if(branch.sectionId_2 == sections[sIndex].id){
							  inputSection =  sections[sIndex];
						  }
					  }	
	    			  compTable = comp1;
	    		  }
	    		  
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
	    			 if(comp1.type=="table"){
	    				 var oIndex = 0;
						  for(oIndex in inputSection.studentEntries){
	    					stdEntry = inputSection.studentEntries[oIndex];
	    					var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField");
	    				    if(isCndtnTrue){
	    				       flag1 = true;
	    				       break;
	    				    }
	  	    			  }
						  var cellId = branch.pathMaps[i].compOptionId ;
						  isCndtnTrue = this.checkTableCellCondition(compTable, branch, cellId, i, "table");
						     if(isCndtnTrue){
						    	  flag2 = true;
						      }
							  if(branch.pathMaps[i].operators[0] == "and"){
		    					  isCondTrue = flag1 && flag2;
		    				  }else{
		    					  isCondTrue = flag1 || flag2;
		    				  }
		    				  if(isCondTrue){
								  this.setResetFlag(branch, isCondTrue, i);
							  }
	    			 }else{
	    				  // check pathmap related option's student response
						  var oIndex = 0;
						  for(oIndex in inputSection.studentEntries){
	    					stdEntry = inputSection.studentEntries[oIndex];
	    					var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField");
	    				    if(isCndtnTrue){
	    				       flag1 = true;
	    				       break;
	    				    }
	  	    			  }
						  var cellId = branch.pathMaps[i].labelOptionsObject[(branch.pathMaps[i].idCriteria2-1)].cellId ;
						  isCndtnTrue = this.checkTableCellCondition(compTable, branch, cellId, i, "table");
					      if(isCndtnTrue){
					    	  flag2 = true;
					      }
						  if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
	    				  if(isCondTrue){
							  this.setResetFlag(branch, isCondTrue, i);
						  } 
	    			 }
			
	    		  }  
		      },
		      mCTable : function(comp1, comp2, branch, isScoreRange){
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
	    		  var i = 0;
	    		  var isFrequency = false;
	    		  var mcSection = null;
	    		  var sections = null;
	    		  var section2=null;
	    		  var compTable = null;
	    		  var sIndex = 0;
	    		  var isCondTrue = false;
	    		  var isFirstTable = null;
	    		  var isBinary = false;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
	    		  if(comp1.type == "multiplechoice"){
	    			  sections = comp1.sections;
	    			  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  mcSection =  sections[sIndex];
						  }
					  }	
	    			  compTable = comp2;
	    			  isFirstTable = false;
	    			  if(isScoreRange){
	    				  if(comp1.feedbackScoringType == "frequency"){
	    					  isFrequency = true;
	    				  }
						  if(comp1.binaryAnswer){
							  isBinary = true;
						  }
					  }
	    		  }else{
	    			  
	    			  sIndex = 0;
					  sections = comp2.sections;
					  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  section2 =  sections[sIndex];
						  }
					  }	
					  
	    			  sections = comp2.sections;
	    			  for(sIndex in sections){
						  if(sectionId2 == sections[sIndex].id){
							  mcSection =  sections[sIndex];
						  }
					  }	
	    			  compTable = comp1;
	    			  isFirstTable = true;
	    			  if(isScoreRange){
	    				  if(comp2.feedbackScoringType == "frequency"){
	    					  isFrequency = true;
	    				  }
	    				  if(comp2.binaryAnswer){
							  isBinary = true;
						  }
					  }
	    		  }
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
	    			  var cellId = "";
	    			  if(isFirstTable || isScoreRange){
	    				  cellId = branch.pathMaps[i].compOptionId;
						  
	    			  }else{
	    				  cellId = branch.pathMaps[i].labelOptionsObject[(branch.pathMaps[i].idCriteria2-1)].cellId ;
	    			  }
	    			  
	    			  isCndtnTrue = this.checkTableCellCondition(compTable, branch, cellId, i, "table");
				      if(isCndtnTrue){
				    	  flag1 = true;
				      }
	    			  if(isScoreRange){
						  var score = "";
						  oIndex = 0;
						  if(!isBinary){
							  for(oIndex in mcSection.options){
								  if(mcSection.options[oIndex].answers[0].studentResponse){
									  if (!isFrequency){
										  score = parseFloat(mcSection.options[oIndex].answers[0].pointsValueEditor.text);
									  }else{
										  score = mcSection.options[oIndex].id;
									  }
								  }
							  }
						  }else{
							  if(mcSection.isStudentAnswered(true)){
								  score = mcSection.calculatePoints();  
							  }
						  }
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							 oIndex = 0;
							 flag1 = false;
	    					 isCndtnTrue = this.checkTableCellCondition(compTable, branch, cellId, i, "table",branch.pathMaps[i].range[rIndex].id);
	    				     if(isCndtnTrue){
	    				       flag1 = true;
	    				     }
	    				     var cIndex = 0;
	    				     var conditionId;
	    	/*			     var cIndex = 0;
	   					  	 for(cIndex in branch.pathMaps[i].condition){
	   						  flag1 = false;
	   						  var conditionId = branch.pathMaps[i].condition[cIndex].id;
	   						  oIndex = 0;
	   						  for(oIndex in section2.studentEntries){
	   	    					stdEntry = section2.studentEntries[oIndex];
	   	    					if(cIndex != 0){
	   	    						var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField", "", conditionId);
	   		    				    if(isCndtnTrue){
	   		    				       flag2 = true;
	   		    				       break;
	   		    				    }
	   	    					}
	   	  	    			  }
	   						  if(branch.pathMaps[i].operators[0] == "and"){
	   	    					  isCondTrue = flag1 && flag2;
	   	    				  }else{
	   	    					  isCondTrue = flag1 || flag2;
	   	    				  }
	   	    				  if(isCondTrue){
	   	    					  //find pathIndex respective to satisfied condition
	   	    					  var pIndex = 0;
	   	    					  for(pIndex in branch.pathMaps[i].paths){
	   	    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId || branch.pathMaps[i].paths[pIndex].secConditionId == conditionId){
	   	    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
	   	    						  }
	   	    					  }
	   						  }
	   					    }*/
	    					 // for(rIndex in branch.pathMaps[i].range){
	    				   
	   					  	 for(cIndex in branch.pathMaps[i].condition){
	   						 
	   					  	conditionId = branch.pathMaps[i].condition[cIndex].id;
	   					  	 }
	    							 flag2 = false;
	    					  	  	 if (!isFrequency){
	    								 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
	    					  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
	    					  	  	     if(score >= minVal && score <= maxVal){
	    					  	        	  flag2 = true;
	    					  	  	     }
	    							 }else{
	    								var idCriteriaFrq = branch.pathMaps[i].range[rIndex].idCriteriaFreq != null ? branch.pathMaps[i].range[rIndex].idCriteriaFreq : 1; 
	    							 	if (idCriteriaFrq == score) {
	    									flag2 = true; 
	    								}
	    							 }
	 				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
	 				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
	 			  	  	    		isCondTrue = flag1 && flag2;
	 			  	  	    	  }else{
	 			  	  	    		isCondTrue = flag1 || flag2;
	 			  	  	    	  }
	 				  	  	     var conditionId = branch.pathMaps[i].condition[cIndex].id;
	 				  	  	     //if any range satisfied then execute respective path
	 				  	  	     if(isCondTrue){
	 				  	  	    	var pIndex = 0;
	 					  	  		for(pIndex in branch.pathMaps[i].paths){
	 					  	  			if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId || branch.pathMaps[i].paths[pIndex].secConditionId == conditionId){
	 										this.setResetFlag(branch, isCondTrue, i, pIndex);
	 									}
	 	    					    }
	 				  	  	     }
	 						 // }
				
						  }
					  }else{
						  if(isFirstTable){
							  oIndex = 0;
							  for(oIndex in mcSection.options){
	    						  if(mcSection.options[oIndex].id == branch.pathMaps[i].idCriteria2){
	    							  flag2 = mcSection.options[oIndex].answers[0].studentResponse;
	    							  break;
	    						  }
	    					  }
	    					  if(branch.pathMaps[i].operators[0] == "and"){
		    					  isCondTrue = flag1 && flag2;
		    				  }else{
		    					  isCondTrue = flag1 || flag2;
		    				  }
		    				  if(isCondTrue){
								  this.setResetFlag(branch, isCondTrue, i);
							  }
						  }else{
							  //first comp is multipleChoice
							  oIndex = 0;
							  for(oIndex in mcSection.options){
	    						  if(mcSection.options[oIndex].id == branch.pathMaps[i].id){
	    							  flag2 = mcSection.options[oIndex].answers[0].studentResponse;
	    							  break;
	    						  }
	    					  }
							  var indx = 0;
						      var celId = null;
						      for(indx in branch.pathMaps[i].labelOptionsObject){
						    	  if((branch.pathMaps[i].idCriteria2) == (parseInt(indx)+1)){
						    		  celId = branch.pathMaps[i].labelOptionsObject[indx].cellId;
						    	  }
						      }
							  var cIndex = 0;
						      for(cIndex in branch.pathMaps[i].condition){
						    	  flag1 = false;
						    	  isCndtnTrue = false;
						    	  
					    		  var conditionId = branch.pathMaps[i].condition[cIndex].id;
								  oIndex = 0;
								  isCndtnTrue = this.checkTableCellCondition(compTable, branch, celId, i, "table","",conditionId);
								  if(isCndtnTrue){
							    	  flag1 = true;
							      }
						    	
								  if(branch.pathMaps[i].operators[0] == "and"){
			    					  isCondTrue = flag1 && flag2;
			    				  }else{
			    					  isCondTrue = flag1 || flag2;
			    				  }
			    				  if(isCondTrue){
			    					  //find pathIndex respective to satisfied condition
			    					  var pIndex = 0;
			    					  for(pIndex in branch.pathMaps[i].paths){
			    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId){
			    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
			    						  }
			    					  }
								  }
							  }
							  
						  }
					  }
	    		  }
		      },
		      mCInput : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  var isInputFirst = false;
				  var inputSection = null;
		    	  var mcSection = null;
		    	  var isFrequency = false;
		    	  var isBinary = false;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
				  //get sections involve in branching
				  //if first comp is ansOpt
		    	  if(branch.mappingIndicator == "answerOption"){
		    		  var sections = comp1.sections;
					  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  section1 =  sections[sIndex];
						  }
					  }	
					  sIndex = 0;
					  sections = comp2.sections;
					  for(sIndex in sections){
						  if(sectionId2 == sections[sIndex].id){
							  section2 =  sections[sIndex];
						  }
					  }	
					  if(comp1.type == "inputField"){
		    			  isInputFirst = true;
		    			  inputSection = section1;
		    			  mcSection = section2;
		    		  }else{
		    			  inputSection = section2;
		    			  mcSection = section1;
		    		  }
					  if(isScoreRange){
						  if(comp2.feedbackScoringType == "frequency"){
							  isFrequency = true;
						  }
						  if(comp2.binaryAnswer){
							  isBinary = true;
						  }
					  }
		    	  }else{
		    		 //if second comp is ansOpt
		    		  var sections = comp2.sections;
					  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  section1 =  sections[sIndex];
						  }
					  }	
					  sIndex = 0;
					  sections = comp1.sections;
					  for(sIndex in sections){
						  if(sectionId2 == sections[sIndex].id){
							  section2 =  sections[sIndex];
						  }
					  }	
					  inputSection = section1;
					  mcSection = section2;
					  if(isScoreRange){
						  if(comp1.feedbackScoringType == "frequency"){
							  isFrequency = true;
						  }
						  if(comp1.binaryAnswer){
							  isBinary = true;
						  }
					  }
		    	  }
		    	
	    		  var i = 0;
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
					  // check pathmap related option's student response
					  var oIndex = 0;
					  for(oIndex in inputSection.studentEntries){
    					stdEntry = inputSection.studentEntries[oIndex];
    					var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField");
    				    if(isCndtnTrue){
    				       flag1 = true;
    				       break;
    				    }
  	    			  }
					  if(isScoreRange){
						  var score = "";
						  oIndex = 0;
						  if(!isBinary){
							  for(oIndex in mcSection.options){
								  if(mcSection.options[oIndex].answers[0].studentResponse){
									  if (!isFrequency){
										  score = parseFloat(mcSection.options[oIndex].answers[0].pointsValueEditor.text);
									  }else{
										  score = mcSection.options[oIndex].id;
									  }
								  }
							  }
						  }else{
							  if(mcSection.isStudentAnswered(true)){
								  score = mcSection.calculatePoints();  
							  }
						  }
						  
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							  oIndex = 0;
							  flag1 = false;
							  for(oIndex in inputSection.studentEntries){
		    					stdEntry = inputSection.studentEntries[oIndex];
		    					isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField", branch.pathMaps[i].range[rIndex].id);
		    				    if(isCndtnTrue){
		    				       flag1 = true;
		    				       break;
		    				    }
		  	    			  }
							 flag2 = false;
					  	  	 if (!isFrequency){
								 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
					  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
					  	  	     if(score >= minVal && score <= maxVal){
					  	        	  flag2 = true;
					  	  	     }
							 }else{
								var idCriteriaFrq = branch.pathMaps[i].range[rIndex].idCriteriaFreq != null ? branch.pathMaps[i].range[rIndex].idCriteriaFreq : 1; 
							 	if (idCriteriaFrq == score) {
									flag2 = true; 
								}
							 }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
					  }else{
						  if(isInputFirst){
							  oIndex = 0;
							  for(oIndex in mcSection.options){
	    						  if(mcSection.options[oIndex].id == branch.pathMaps[i].idCriteria2){
	    							  flag2 = mcSection.options[oIndex].answers[0].studentResponse;
	    							  break;
	    						  }
	    					  }
						  }else{
							  oIndex = 0;
							  for(oIndex in mcSection.options){
	    						  if(mcSection.options[oIndex].id == branch.pathMaps[i].id){
	    							  flag2 = mcSection.options[oIndex].answers[0].studentResponse;
	    							  break;
	    						  }
	    					  }
						  }
						  
						  var cIndex = 0;
						  for(cIndex in branch.pathMaps[i].condition){
							  flag1 = false;
							  var conditionId = branch.pathMaps[i].condition[cIndex].id;
							  oIndex = 0;
							  for(oIndex in inputSection.studentEntries){
		    					stdEntry = inputSection.studentEntries[oIndex];
	    						var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField", "", conditionId);
		    				    if(isCndtnTrue){
		    				       flag1 = true;
		    				       break;
		    				    }
		  	    			  }
							  if(branch.pathMaps[i].operators[0] == "and"){
		    					  isCondTrue = flag1 && flag2;
		    				  }else{
		    					  isCondTrue = flag1 || flag2;
		    				  }
		    				  if(isCondTrue){
		    					  //find pathIndex respective to satisfied condition
		    					  var pIndex = 0;
		    					  for(pIndex in branch.pathMaps[i].paths){
		    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId){
		    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
		    						  }
		    					  }
							  }
						  }
						 
	    				  /*if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
	    				  if(isCondTrue){
							  this.setResetFlag(branch, isCondTrue, i);
						  }*/
					  }
	    		  }
		      },
		      cataTable : function(comp1, comp2, branch, isScoreRange){
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
	    		  var i = 0;
	    		  
	    		  var cataSection = null;
	    		  var sections = null;
	    		  var compTable = null;
	    		  var sIndex = 0;
	    		  var isCondTrue = false;
	    		  var isFirstTable = null;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
	    		  if(comp1.type == "checkbox"){
	    			  sections = comp1.sections;
	    			  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  cataSection =  sections[sIndex];
						  }
					  }	
	    			  compTable = comp2;
	    			  isFirstTable = false;
	    		  }else{
	    			  sections = comp2.sections;
	    			  for(sIndex in sections){
						  if(sectionId2 == sections[sIndex].id){
							  cataSection =  sections[sIndex];
						  }
					  }	
	    			  compTable = comp1;
	    			  isFirstTable = true;
	    		  }
	    		  var selectedOpts = [];
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
	    			  selectedOpts = [];
	    			  var cellId = "";
	    			  if(isFirstTable || isScoreRange){
	    				  cellId = branch.pathMaps[i].compOptionId;
						  
	    			  }else{
	    				  cellId = branch.pathMaps[i].labelOptionsObject[(branch.pathMaps[i].idCriteria2-1)].cellId ;
						  
	    			  }
	    			  isCndtnTrue = this.checkTableCellCondition(compTable, branch, cellId, i, "table");
				      if(isCndtnTrue){
				    	  flag1 = true;
				      }
				      if(isScoreRange){
						  var score = 0;
						  if(isFirstTable){
							  score = this.getScore(comp2, cataSection);
						  }else{
							  score = this.getScore(comp1, cataSection);
						  }
						 
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							 flag2 = false;
							 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
				  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
				  	  	     if(score >= minVal && score <= maxVal){
				  	  	    	 flag2 = true;
				  	  	     }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
					  }else{
						 if(isFirstTable){
							 oIndex = 0;
							  for(oIndex in cataSection.options){
								  if(cataSection.options[oIndex].studentResponse){
									  selectedOpts.push(cataSection.options[oIndex].id);
								  }
							  }
							  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
							 // pathMapOption.push(branch.pathMaps[i].id);
							  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
							  if (selectedOpts.length == pathMapOption.length) {
								  // if all options are checked related to pathmap
								  // then show all paths related to that pathmap
								  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
									  flag2 = true;
								  }
							  }
							  if(branch.pathMaps[i].operators[0] == "and"){
		    					  isCondTrue = flag1 && flag2;
		    				  }else{
		    					  isCondTrue = flag1 || flag2;
		    				  }
		    				  if(isCondTrue){
								  this.setResetFlag(branch, isCondTrue, i);
							  }
						 }else{
							 if(isFirstTable){
								 oIndex = 0;
								  for(oIndex in cataSection.options){
									  if(cataSection.options[oIndex].studentResponse){
										  selectedOpts.push(cataSection.options[oIndex].id);
									  }
								  }
								  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
									 // pathMapOption.push(branch.pathMaps[i].id);
									  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
									  if (selectedOpts.length == pathMapOption.length) {
										  // if all options are checked related to pathmap
										  // then show all paths related to that pathmap
										  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
											  flag2 = true;
										  }
									  }
									  if(branch.pathMaps[i].operators[0] == "and"){
				    					  isCondTrue = flag1 && flag2;
				    				  }else{
				    					  isCondTrue = flag1 || flag2;
				    				  }
				    				  if(isCondTrue){
				    					  //find pathIndex respective to satisfied condition
				    					  var pIndex = 0;
				    					  for(pIndex in branch.pathMaps[i].paths){
				    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId){
				    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
				    						  }
				    					  }
									  }
							 }else{
								 oIndex = 0;
								  for(oIndex in cataSection.options){
									  if(cataSection.options[oIndex].studentResponse){
										  selectedOpts.push(cataSection.options[oIndex].id);
									  }
								  }
								  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
								  // pathMapOption.push(branch.pathMaps[i].id);
								  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
								  if (selectedOpts.length == pathMapOption.length) {
									  // if all options are checked related to pathmap
									  // then show all paths related to that pathmap
									  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
										  flag2 = true;
									  }
								  }
								  var indx = 0;
							      var celId = null;
							      for(indx in branch.pathMaps[i].labelOptionsObject){
							    	  if((branch.pathMaps[i].idCriteria2) == (parseInt(indx)+1)){
							    		  celId = branch.pathMaps[i].labelOptionsObject[indx].cellId;
							    	  }
							      }
								  var cIndex = 0;
								  for(cIndex in branch.pathMaps[i].condition){
							    	  flag1 = false;
							    	  isCndtnTrue = false;
							    	  
						    		  var conditionId = branch.pathMaps[i].condition[cIndex].id;
									  oIndex = 0;
									  isCndtnTrue = this.checkTableCellCondition(compTable, branch, celId, i, "table","",conditionId);
									  if(isCndtnTrue){
								    	  flag1 = true;
								      }
							    	
									  if(branch.pathMaps[i].operators[0] == "and"){
				    					  isCondTrue = flag1 && flag2;
				    				  }else{
				    					  isCondTrue = flag1 || flag2;
				    				  }
				    				  if(isCondTrue){
				    					  //find pathIndex respective to satisfied condition
				    					  var pIndex = 0;
				    					  for(pIndex in branch.pathMaps[i].paths){
				    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId){
				    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
				    						  }
				    					  }
									  }
								  }
							 }
							 
						 } 
						 /* oIndex = 0;
						  for(oIndex in cataSection.options){
							  if(cataSection.options[oIndex].studentResponse){
								  selectedOpts.push(cataSection.options[oIndex].id);
							  }
						  }
						  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
						 // pathMapOption.push(branch.pathMaps[i].id);
						  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
						  if (selectedOpts.length == pathMapOption.length) {
							  // if all options are checked related to pathmap
							  // then show all paths related to that pathmap
							  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
								  flag2 = true;
							  }
						  }
						  var indx = 0;
					      var celId = null;
					      for(indx in branch.pathMaps[i].labelOptionsObject){
					    	  if((branch.pathMaps[i].idCriteria2) == (parseInt(indx)+1)){
					    		  celId = branch.pathMaps[i].labelOptionsObject[indx].cellId;
					    	  }
					      }
						  var cIndex = 0;
					      for(cIndex in branch.pathMaps[i].condition){
					    	  flag1 = false;
					    	  isCndtnTrue = false;
					    	  
				    		  var conditionId = branch.pathMaps[i].condition[cIndex].id;
							  oIndex = 0;
							  isCndtnTrue = this.checkTableCellCondition(compTable, branch, celId, i, "table","",conditionId);
							  if(isCndtnTrue){
						    	  flag1 = true;
						      }
					    	
							  if(branch.pathMaps[i].operators[0] == "and"){
		    					  isCondTrue = flag1 && flag2;
		    				  }else{
		    					  isCondTrue = flag1 || flag2;
		    				  }
		    				  if(isCondTrue){
		    					  //find pathIndex respective to satisfied condition
		    					  var pIndex = 0;
		    					  for(pIndex in branch.pathMaps[i].paths){
		    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId){
		    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
		    						  }
		    					  }
							  }
						  }*/
				
					  }
	    		  }
		      },
		      cataInput : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  var isInputFirst = false;
				  var inputSection = null;
		    	  var cataSection = null;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
				  //get sections involve in branching
				  //if first comp is ansOpt
		    	  if(branch.mappingIndicator == "answerOption"){
		    		  var sections = comp1.sections;
					  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  section1 =  sections[sIndex];
						  }
					  }	
					  sIndex = 0;
					  sections = comp2.sections;
					  for(sIndex in sections){
						  if(sectionId2 == sections[sIndex].id){
							  section2 =  sections[sIndex];
						  }
					  }	
					  if(comp1.type == "inputField"){
		    			  isInputFirst = true;
		    			  inputSection = section1;
		    			  cataSection = section2;
		    		  }else{
		    			  inputSection = section2;
		    			  cataSection = section1;
		    		  }
		    	  }else{
		    		  //when frst comp is score range ie CATA in ths case
		    		  var sections = comp2.sections;
					  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  section1 =  sections[sIndex];
						  }
					  }	
					  sIndex = 0;
					  sections = comp1.sections;
					  for(sIndex in sections){
						  if(sectionId2 == sections[sIndex].id){
							  section2 =  sections[sIndex];
						  }
					  }	
	    			  inputSection = section1;
	    			  cataSection = section2;
		    	  }
	    		  var i = 0;
	    		  var selectedOpts = [];
	    		  for (i in branch.pathMaps){
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
	    			  selectedOpts = [];
					  // check pathmap related option's student response
					  var oIndex = 0;
					  for(oIndex in inputSection.studentEntries){
    					stdEntry = inputSection.studentEntries[oIndex];
    					var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField");
    				    if(isCndtnTrue){
    				       flag1 = true;
    				       break;
    				    }
  	    			  }
					  if(isScoreRange){
						  var score = 0;
						  if(isInputFirst){
							  score = this.getScore(comp2, cataSection);
						  }else{
							  score = this.getScore(comp1, cataSection);
						  }
						 
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							 flag2 = false;
							 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
				  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
				  	  	     if(score >= minVal && score <= maxVal){
				  	  	    	 flag2 = true;
				  	  	     }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
					  }else{
						  oIndex = 0;
						  for(oIndex in cataSection.options){
							  if(cataSection.options[oIndex].studentResponse){
								  selectedOpts.push(cataSection.options[oIndex].id);
							  }
						  }
						  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
						 // pathMapOption.push(branch.pathMaps[i].id);
						  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
						  if (selectedOpts.length == pathMapOption.length) {
							  // if all options are checked related to pathmap
							  // then show all paths related to that pathmap
							  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
								  flag2 = true;
							  }
						  }
						  var cIndex = 0;
						  for(cIndex in branch.pathMaps[i].condition){
							  flag1 = false;
							  var conditionId = branch.pathMaps[i].condition[cIndex].id;
							  oIndex = 0;
							  for(oIndex in inputSection.studentEntries){
		    					stdEntry = inputSection.studentEntries[oIndex];
	    						var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField", "", conditionId);
		    				    if(isCndtnTrue){
		    				       flag1 = true;
		    				       break;
		    				    }
		  	    			  }
							  if(branch.pathMaps[i].operators[0] == "and"){
		    					  isCondTrue = flag1 && flag2;
		    				  }else{
		    					  isCondTrue = flag1 || flag2;
		    				  }
		    				  if(isCondTrue){
		    					  //find pathIndex respective to satisfied condition
		    					  var pIndex = 0;
		    					  for(pIndex in branch.pathMaps[i].paths){
		    						  if(branch.pathMaps[i].paths[pIndex].conditionId == conditionId){
		    							  this.setResetFlag(branch, isCondTrue, i, pIndex);
		    						  }
		    					  }
							  }
						  }
	    			/*	  if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
	    				  if(isCondTrue){
							  this.setResetFlag(branch, isCondTrue, i);
						  }*/
					  }
	    		  }
		      },
		      scaleTable : function(comp1, comp2, branch, isScoreRange){
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
	    		  var i = 0;
	    		  
	    		  var compScale = null;
	    		  var compTable = null;
	    		  var isCondTrue = false;
	    		  var isFirstTable = null;
	    		  if(comp1.type == "scale"){
	    			  compScale = comp1;
	    			  compTable = comp2;
	    			  isFirstTable = false;
	    		  }else{
	    			  compScale = comp2;
	    			  compTable = comp1;
	    			  isFirstTable = true;
	    		  }
	    		  
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
	    			  var cellId = "";
	    			  cellId = branch.pathMaps[i].compOptionId;
	    			  isCndtnTrue = this.checkTableCellCondition(compTable, branch, cellId, i, "table");
				      if(isCndtnTrue){
				    	  flag1 = true;
				      }
	    			  if(isScoreRange){
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  var score = this.getScore(compScale); 
						  for(rIndex in branch.pathMaps[i].range){
							  flag2 = false;
							 if (compScale.feedbackScoringType != "frequency") {
								 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
					  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
					  	  	     if(score >= minVal && score <= maxVal){
					  	        	  flag2 = true;
					  	  	     }
							 }else{
								 var idCriteriaFrq = branch.pathMaps[i].range[rIndex].idCriteriaFreq != null ? branch.pathMaps[i].range[rIndex].idCriteriaFreq : 1; 
								 
								 for(var len in score){
								 	if (branch.pathMaps[i].labelOptionsObject[idCriteriaFrq - 1] == score[len]) {
										flag2 = true; 
									}
								 }
							 }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
					  }
	    		  }
		      },
		      scaleInput : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  
		    	  var inputSection = null;
		    	  var scaleSection = null;
				  var sIndex = 0;
				  var isInputFirst = false;
				  //get sections involve in branching
				  //if first comp is ansOpt
		    	  if(branch.mappingIndicator == "answerOption"){
		    		  isInputFirst = true;
		    		  
		    		  var sections = comp1.sections;
					  for(sIndex in sections){
						  if(branch.sectionId == sections[sIndex].id){
							  inputSection =  sections[sIndex];
						  }
					  }	
					  scaleSection = comp2;
					 
		    	  }else{
		    		 
		    		 //if second comp is ansOpt
		    		  var sections = comp2.sections;
					  for(sIndex in sections){
						  if(branch.sectionId == sections[sIndex].id){
							  inputSection =  sections[sIndex];
						  }
					  }	
					  scaleSection = comp1;
		    	  }
	    		  var i = 0;
	    		  for (i in branch.pathMaps) {
	    			  isCondTrue = false;
	    			  flag1 = false;
	    			  flag2 = false;
					  // check pathmap related option's student response
					  var oIndex = 0;
					  for(oIndex in inputSection.studentEntries){
    					stdEntry = inputSection.studentEntries[oIndex];
    					var isCndtnTrue = this.checkInputCondition(stdEntry,stdEntry.editor.text, branch, i, "inputField");
    				    if(isCndtnTrue){
    				       flag1 = true;
    				       break;
    				    }
  	    			  }
					  
					//loop over ranges in pathMap
					  var rIndex = 0;
					  var score = this.getScore(scaleSection); 
					  for(rIndex in branch.pathMaps[i].range){
						  flag2 = false;
						 if (scaleSection.feedbackScoringType != "frequency") {
							 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
				  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
				  	  	     if(score >= minVal && score <= maxVal){
				  	        	  flag2 = true;
				  	  	     }
						 }else{
							 var idCriteriaFrq = branch.pathMaps[i].range[rIndex].idCriteriaFreq != null ? branch.pathMaps[i].range[rIndex].idCriteriaFreq : 1; 
							 for(var len in score){
							 	if (branch.pathMaps[i].labelOptionsObject[idCriteriaFrq-1] == score[len]) {
									flag2 = true; 
								}
							 }
						 }
			  	  	     //if operator related to range is AND then check condition flag of both component else only one 
			  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
		  	  	    		isCondTrue = flag1 && flag2;
		  	  	    	  }else{
		  	  	    		isCondTrue = flag1 || flag2;
		  	  	    	  }
			  	  	     //if any range satisfied then execute respective path
			  	  	     if(isCondTrue){
			  	  	    	var pIndex = 0;
				  	  		for(pIndex in branch.pathMaps[i].paths){
				  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
									this.setResetFlag(branch, isCondTrue, i, pIndex);
								}
    					    }
			  	  	     }
					  }
				  }
		      },
		      // check for satisfied conditions in multipleChoice -
			 // multipleChoice (ansOpt - scoreRange)
		      mCMcScoreRange : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  var isFrequency = false;
				  var isBinary = false;
				  //get sections involve in branching
				  //if first comp is ansOpt
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
				  if(branch.mappingIndicator == "answerOption"){
		    		  var sections = comp1.sections;
		    		
		    			  for(sIndex in sections){
							  if(branch.sectionId == sections[sIndex].id){
								  section1 =  sections[sIndex];
							  } 
		    			  }	 
		    		 
					  sIndex = 0;
					  sections = comp2.sections;
					  if(branch.sectionId_2 ==0){
						  section2=sections;
					  }else{
						  for(sIndex in sections){
							  if(branch.sectionId_2 == sections[sIndex].id){
								  section2 =  sections[sIndex];
							  }
						  } 
					  }
						
					  if(isScoreRange){
						  if(comp2.feedbackScoringType == "frequency"){
							  isFrequency = true;
						  }
						  if(comp2.binaryAnswer){
							  isBinary = true;
						  }
					  }
					 
		    	  }else{
		    		 //if second comp is ansOpt
		    		  if(comp1.id==comp2.id){
		    			  
		    		  }
		    		  var sections = comp2.sections;
		    		 
						  for(sIndex in sections){
							  if(branch.sectionId_2 == sections[sIndex].id){
								  section1 =  sections[sIndex];
							  }
						  } 
					 
					  sIndex = 0;
					  sections = comp1.sections;
					  
					  if(branch.sectionId==0){
						  section2=sections;
		    		  }else{
		    			  for(sIndex in sections){
							  if(branch.sectionId == sections[sIndex].id){
								  section2 =  sections[sIndex];
							  } 
		    			  }	 
		    		  }
				
					  if(isScoreRange){
						  if(comp1.feedbackScoringType == "frequency"){
							  isFrequency = true;
						  }
						  if(comp1.binaryAnswer){
							  isBinary = true;
						  }
					  }
		    	  }
		    	  if(isScoreRange){
		    		  var i = 0;
		    		  for (i in branch.pathMaps) {
		    			  isCondTrue = false;
		    			  flag1 = false;
						  // check pathmap related option's student response
		    			  if(section1.length>1){
		    				  for(s in section1){
		    					  if(section1[s].id==1){
		    						  section1=section1[s];
		    						  
		    					  }
		    				  }  
		    			  }
						  var oIndex = 0;
						  for(oIndex in section1.options){
							  if(section1.options[oIndex].id == branch.pathMaps[i].id){
								  flag1 = section1.options[oIndex].answers[0].studentResponse;
								  break;
							  }
						  }
						  var score = 0;
						  if(section2.length>1){
							  for(s in section2){
								 var  section22=section2[s];
								  oIndex = 0;
								  if(!isBinary){
									  for(oIndex in section22.options){
										  if(section22.options[oIndex].answers[0].studentResponse){
											  if(!isFrequency){
												  score += parseFloat(section22.options[oIndex].answers[0].pointsValueEditor.text);  
											  }else{
												  score += section22.options[oIndex].id;
											  }
										  }
									  }
								  }else{
									  if(section22.isStudentAnswered(true)){
										  score += section22.calculatePoints();  
									  }
								  }
							  }
							  
						  }else{
							  oIndex = 0;
							  if(!isBinary){
								  for(oIndex in section2.options){
									  if(section2.options[oIndex].answers[0].studentResponse){
										  if(!isFrequency){
											  score += parseFloat(section2.options[oIndex].answers[0].pointsValueEditor.text);  
										  }else{
											  score += section2.options[oIndex].id;
										  }
									  }
								  }
							  }else{
								  if(section2.isStudentAnswered(true)){
									  score += section2.calculatePoints();  
								  }
							  } 
						  }
						  //console.log("score"+score);
				
					  	  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							 flag2 = false;
							 if (!isFrequency){
								 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
					  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
					  	  	     if(score >= minVal && score <= maxVal){
					  	        	  flag2 = true;
					  	  	     }
							 }else{
								var idCriteriaFrq = branch.pathMaps[i].range[rIndex].idCriteriaFreq != null ? branch.pathMaps[i].range[rIndex].idCriteriaFreq : 1; 
							 	if (idCriteriaFrq == score) {
									flag2 = true; 
								}
							 }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
		    		  }
		    	  }else{
		    		  var i = 0;
		    		  for (i in branch.pathMaps){
		    			  isCondTrue = false;
		    			  flag1 = false;
		    			  flag2=  false;
		    			  //both components are multipleChoice
		    			 
    					  var oIndex = 0;
    					  for(oIndex in section1.options){
    						  if(section1.options[oIndex].id == branch.pathMaps[i].id){
    							  flag1 = section1.options[oIndex].answers[0].studentResponse;
    							  break;
    						  }
    					  }
	    					 
	    				  //if option related to pathmap is not checked for one comp then dont check options of other
						  oIndex = 0;
						  for(oIndex in section2.options){
    						  if(section2.options[oIndex].id == branch.pathMaps[i].idCriteria2){
    							  flag2 = section2.options[oIndex].answers[0].studentResponse;
    						  }
    					  }
	    				  if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
						  if(isCondTrue){
							  this.setResetFlag(branch, isCondTrue, i);
						  }
		    	  	   }
		    	  }
		      },
		      mCScaleScoreRange : function(comp1, comp2, branch, isScoreRange){
		     	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  //if first comp is ansOpt
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  var score = 0;
				  var isStudentRespo = false;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
				  //get sections involve in branching
		    	  //if scale is first comp which is score range always then put it into section 2 which is scorRange section
	    		  if(comp1.type == "scale"){
	    			 section2 = comp1;
	    			 isStudentRespo = comp1.isStudentAnswered();
    			  	 score = this.getScore(comp1); 
    			  	 sIndex = 0;
				  	 sections = comp2.sections;
				  	 for(sIndex in sections){
					  	if(sectionId2 == sections[sIndex].id){
						  section1 =  sections[sIndex];
					  	}
				  	 }	
	    			  
	    			  
	    		  }else{
	    			  section2 = comp2;
	    			  isStudentRespo = comp2.isStudentAnswered();
    				  score = this.getScore(comp2);
    				  var sections = comp1.sections;
					  for(sIndex in sections){
						  if(sectionId1 == sections[sIndex].id){
							  section1 =  sections[sIndex];
						  }
					  }	
	    		  }
				  if(isScoreRange){
					  var i = 0;
		    		  for (i in branch.pathMaps) {
		    			  isCondTrue = false;
		    			  flag1 = false;
						  // check pathmap related option's student response
						  var oIndex = 0;
						  for(oIndex in section1.options){
							  if(section1.options[oIndex].id == branch.pathMaps[i].id){
								  flag1 = section1.options[oIndex].answers[0].studentResponse;
								  break;
							  }
						  }
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							  flag2 = false;
							 if (section2.feedbackScoringType != "frequency") {
								 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
					  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
					  	  	     if(score >= minVal && score <= maxVal){
					  	        	  flag2 = true;
					  	  	     }
							 }else{
								 var idCriteriaFrq = branch.pathMaps[i].range[rIndex].idCriteriaFreq != null ? branch.pathMaps[i].range[rIndex].idCriteriaFreq : 1; 
								 for(var len in score){
								 	if (branch.pathMaps[i].labelOptionsObject[idCriteriaFrq - 1] == score[len]) {
										flag2 = true; 
									}
								 }
							 }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
		    		  }  
				  }
		      },
		      mCCheckBoxScoreRange : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  var isFirstCATA = false; //is firstComp ie ansOpt related comp is CATA
				  var score = 0;
				  var isFrequency = false;
				  var isBinary = false;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
				  //get sections involve in branching
				  //if first comp is ansOpt
		    	  if(branch.mappingIndicator == "answerOption"){
		    		  var sections = comp1.sections;
		    		  if(branch.sectionId==0){
		    			  section1= sections;
		    		  }else{
		    			  for(sIndex in sections){
							  if(sectionId1 == sections[sIndex].id){
								  section1 =  sections[sIndex];
							  }
						  } 
		    		  }
						
					  sIndex = 0;
					  sections = comp2.sections;
					  if(branch.sectionId_2==0){
						  section2=sections;
					  }else{
						  for(sIndex in sections){
							  if(sectionId2 == sections[sIndex].id){
								  section2 =  sections[sIndex];
							  }
						  }	  
					  }
			
					//is firstComp ie ansOpt related comp is CATA
					  if(comp1.type == "checkbox"){
		    			  isFirstCATA = true;
		    			  if(isScoreRange && comp2.binaryAnswer){
		    				  isBinary = true;
		    			  }
		    		  }else{
		    			  //if first comp is not CATA then 2nd is CATA which is score range
		    			  if(section2.length>1){
			    				for(s in section2){
			    					 score += this.getScore(comp2, section2[s]);
			    				}  
			    			  }else{
			    				  score = this.getScore(comp2, section2); 
			    			  }
		    		  }
					  //2nd comp is score range so check if it is frequency type
					  if(isScoreRange && comp2.feedbackScoringType =="frequency"){
						  isFrequency = true;
					  }
		    	  }else{
		    		 //if second comp is ansOpt
		    		  var sections = comp2.sections;
		    		  
		    		  if(branch.sectionId_2==0){
						  section1=sections;
					  }else{
						  for(sIndex in sections){
							  if(sectionId1 == sections[sIndex].id){
								  section1 =  sections[sIndex];
							  }
						  }	  
					  }
					 
					  sIndex = 0;
					  sections = comp1.sections;
					  if(branch.sectionId==0){
						  section2=sections;
					  }else{
						  for(sIndex in sections){
							  if(sectionId1 == sections[sIndex].id){
								  section2 =  sections[sIndex];
							  }
						  }	  
					  }
					 
					  //if comp2 which is ansOpt is CATA then dnt calculate score else calculate score of comp1 which is comp1
					  if(comp2.type == "checkbox"){
		    			  isFirstCATA = true;
		    			  if(isScoreRange && comp1.binaryAnswer){
		    				  isBinary = true;
		    			  }
		    		  }else{
		    			  
		    			  if(section2.length>1){
		    				for(s in section2){
		    					 score += this.getScore(comp1, section2[s]);
		    				}  
		    			  }else{
		    				  score = this.getScore(comp1, section2); 
		    			  }
		    			  
		    		  }
					  //1st comp is score range so check if it is frequency type
					  if(isScoreRange && comp1.feedbackScoringType =="frequency"){
						  isFrequency = true;
					  }
					  
		    	  }
		    	  if(isScoreRange){
		    		  var i = 0;
		    		  for (i in branch.pathMaps) {
		    			  var selectedOpts = [];
		    			  isCondTrue = false;
		    			  flag1 = false;
						  // check pathmap related option's student response
						  var oIndex = 0;
						//CATA - ansOpt and MC - scoreRange
						  if(isFirstCATA){
							  oIndex = 0;
							  for(oIndex in section1.options){
								  if(section1.options[oIndex].studentResponse){
									  selectedOpts.push(section1.options[oIndex].id);
								  }
							  }
							  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
							 // pathMapOption.push(branch.pathMaps[i].id);
							  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
							  if (selectedOpts.length == pathMapOption.length) {
								  // if all options are checked related to pathmap
								  // then show all paths related to that pathmap
								  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
									  flag1 = true;
								  }
							  }
							
							if(section2.length>1){
								  for(s in section2){
										 var  section22=section2[s];
										  oIndex = 0;
										  if(!isBinary){
											  for(oIndex in section22.options){
												  if(section22.options[oIndex].answers[0].studentResponse){
													  if(!isFrequency){
														  score += parseFloat(section22.options[oIndex].answers[0].pointsValueEditor.text);  
													  }else{
														  score += section22.options[oIndex].id;
													  }
												  }
											  }
										  }else{
											  if(section22.isStudentAnswered(true)){
												  score += section22.calculatePoints();  
											  }
										  }
									  }	
							}else{
								  oIndex = 0;
								  if(!isBinary){
									  for(oIndex in section2.options){
										  if(section2.options[oIndex].answers[0].studentResponse){
											  if(!isFrequency){
												  score = parseFloat(section2.options[oIndex].answers[0].pointsValueEditor.text);  
											  }else{
												  score = section2.options[oIndex].id;
											  }
										  }
									  }  
								  }
							}
							 
						  }else{
							  //MC - AnsOpt - CATA - scoreRange
							  for(oIndex in section1.options){
								  if(section1.options[oIndex].id == branch.pathMaps[i].id){
									  flag1 = section1.options[oIndex].answers[0].studentResponse;
									  break;
								  }
							  }
						  }
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							 flag2 = false;
					  	  	 if (!isFrequency){
								 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
					  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
					  	  	     if(score >= minVal && score <= maxVal){
					  	        	  flag2 = true;
					  	  	     }
							 }else{
								 var idCriteriaFrq = branch.pathMaps[i].range[rIndex].idCriteriaFreq != null ? branch.pathMaps[i].range[rIndex].idCriteriaFreq : 1; 
							 	 if (idCriteriaFrq == score) {
									flag2 = true; 
								 }
							 }
				  	  	     
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
		    		  }
		    		  
		    	  }else{
		    		  var i = 0;
		    		  for (i in branch.pathMaps){
		    			  isCondTrue = false;
		    			  flag1 = false;
		    			  flag2=  false;
		    			  var selectedOpts = [];
		    			  
		    			  if(isFirstCATA){
							  oIndex = 0;
							  for(oIndex in section1.options){
								  if(section1.options[oIndex].studentResponse){
									  selectedOpts.push(section1.options[oIndex].id);
								  }
							  }
							  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
							 // pathMapOption.push(branch.pathMaps[i].id);
							  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
							  if (selectedOpts.length == pathMapOption.length) {
								  // if all options are checked related to pathmap
								  // then show all paths related to that pathmap
								  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
									  flag1 = true;
								  }
							  }
							  oIndex = 0;
							  for(oIndex in section2.options){
	    						  if(section2.options[oIndex].id == branch.pathMaps[i].idCriteria2){
	    							  flag2 = section2.options[oIndex].answers[0].studentResponse;
	    							  break;
	    						  }
	    					  }
						  }else{
							  oIndex = 0;
							  for(oIndex in section1.options){
	    						  if(section1.options[oIndex].id == branch.pathMaps[i].id){
	    							  flag1 = section1.options[oIndex].answers[0].studentResponse;
	    							  break;
	    						  }
	    					  }
							  oIndex = 0;
							  for(oIndex in section2.options){
								  if(section2.options[oIndex].studentResponse){
									  selectedOpts.push(section2.options[oIndex].id);
								  }
							  }
							  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
							 // pathMapOption.push(branch.pathMaps[i].id);
							  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
							  if (selectedOpts.length == pathMapOption.length) {
								  // if all options are checked related to pathmap
								  // then show all paths related to that pathmap
								  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
									  flag2 = true;
								  }
							  }
							  
						  }
	    				  if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
						  if(isCondTrue){
							  this.setResetFlag(branch, isCondTrue, i);
						  }
		    	  	   }
		    	  }
	    	
		      },
		      checkBoxCheckBoxScoreRange : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  var score = 0;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=branch.sectionId; 
				  }
				  if(sectionId2==0){
					 sectionId2=branch.sectionId_2; 
				  }
				  
				  //get sections involve in branching
				  //if first comp is ansOpt
		    	  if(branch.mappingIndicator == "answerOption"){
		    		  
		    		  var sections = comp1.sections;
		    		  if(branch.sectionId==0){
		    			  section1=sections;
		    		  }else{
		    			  if(branch.sectionId_2!=0){
		    				  for(sIndex in sections){
								  if(sectionId1 == sections[sIndex].id){
									  section1 =  sections[sIndex];
								  }
							  }	   
		    			  }else{
		    				  for(sIndex in comp1.sections){
								  if(sectionId1 == comp1.sections[sIndex].id){
									  section1 =  comp1.sections[sIndex];
								  }
							  }	  
		    			  }
		    			 
		    		  }
					  
					  sIndex = 0;
					  sections = comp2.sections;
					  if(branch.sectionId_2==0){
						  section2= sections; 
					  }else{
						  if(branch.sectionId!=0){
							  for(sIndex in sections){
								  if(sectionId2 == sections[sIndex].id){
									  section2 =  sections[sIndex];
								  }
							  }	    
						  }
					  }
					  if(section2.length>1){
						  for(s in section2){
							 var  section22=section2[s];
							 score  += this.getScore(comp2, section22); 
						  }
						  
					  }else{
							  score  += this.getScore(comp2, section2); 
					  }
					  //get score for second comp which is score range
		    		 
		    	  }else{
		    		 //if second comp is ansOpt
		    		  var sections = comp2.sections;
		   
		    			  if(branch.sectionId_2!=0){
		    				  for(sIndex in comp2.sections){
								  if(sectionId2 == comp2.sections[sIndex].id){
									  section1 =  comp2.sections[sIndex];
								  }
							  }	  
		    			  }
		    		  
					 
					  sIndex = 0;
					  sections = comp1.sections;
					  if(branch.sectionId==0){
						  section2= comp1.sections;
					  }else{
						  if(branch.sectionId!=0){
							  for(sIndex in sections){
								  if(sectionId1 == sections[sIndex].id){
									  section2 =  sections[sIndex];
								  }
							  }	  
						  }else{
							  
						  }
					  }
					 
					  if(section2.length>1){
						  for(s in section2){
							 var  section22=section2[s];
							 score  += this.getScore(comp1, section22); 
						  }
						  
					  }else{
					
							  score  += this.getScore(comp1, section2);  
						   
					  }
		    		 
		    	  }
		    	  if(isScoreRange){
		    		  var i = 0;
		    		  for (i in branch.pathMaps) {
		    			  var selectedOpts = [];
		    			  isCondTrue = false;
		    			  flag1 = false;
						  // check pathmap related option's student response
						  var oIndex = 0;
						  oIndex = 0;
						  if(section1.length>1){
							  for(oIndex in section2.options){
								  if(section2.options[oIndex].studentResponse){
									  selectedOpts.push(section2.options[oIndex].id);
								  }
							  }  
						  }else{
							  for(oIndex in section1.options){
								  if(section1.options[oIndex].studentResponse){
									  selectedOpts.push(section1.options[oIndex].id);
								  }
							  }
						  }
						  
						  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
						 // pathMapOption.push(branch.pathMaps[i].id);
						  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
						  if (selectedOpts.length == pathMapOption.length) {
							  // if all options are checked related to pathmap
							  // then show all paths related to that pathmap
							  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
								  flag1 = true;
							  }
						  }
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							 flag2 = false;
							 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
				  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
				  	  	     if(score >= minVal && score <= maxVal){
				  	        	  flag2 = true;
				  	  	     }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
		    		  }
		    	  }else{
		    		  var i = 0;
		    		  for (i in branch.pathMaps){
		    			  isCondTrue = false;
		    			  flag1 = false;
		    			  flag2=  false;
		    			  var selectedOpts = [];
						  oIndex = 0;
						  for(oIndex in section1.options){
							  if(section1.options[oIndex].studentResponse){
								  selectedOpts.push(section1.options[oIndex].id);
							  }
						  }
						  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
						  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
						  if (selectedOpts.length == pathMapOption.length) {
							  // if all options are checked related to pathmap
							  // then show all paths related to that pathmap
							  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
								  flag1 = true;
							  }
						  }
						  
						  oIndex = 0;
						  selectedOpts = [];
						  for(oIndex in section2.options){
							  if(section2.options[oIndex].studentResponse){
								  selectedOpts.push(section2.options[oIndex].id);
							  }
						  }
						  if(selectedOpts.length == 1){ 
							  if(parseInt(selectedOpts.toString()) == branch.pathMaps[i].idCriteria2){
								  flag2 = true;
							  }
						  }
	    				  if(branch.pathMaps[i].operators[0] == "and"){
	    					  isCondTrue = flag1 && flag2;
	    				  }else{
	    					  isCondTrue = flag1 || flag2;
	    				  }
						  if(isCondTrue){
							  this.setResetFlag(branch, isCondTrue, i);
						  }
		    	  	   }
		    	  }
	    		  
		      },
		      scaleCheckBoxScoreRange : function(comp1, comp2, branch, isScoreRange){
		    	  var isCondTrue = false;
		    	  var flag1 = false; //for comp1
		    	  var flag2 = false; //for comp2
		    	  //if first comp is ansOpt
		    	  var section1 = null;
				  var section2 = null;
				  var sIndex = 0;
				  var score = 0;
				  var isStudentRespo = false;
				  var sectionId1=branch.sectionId;
				  var sectionId2=branch.sectionId_2;
				  if(sectionId1==0){
					 sectionId1=1; 
				  }
				  if(sectionId2==0){
					 sectionId2=1; 
				  }
				  //get sections involve in branching
		    	  //if scale is first comp which is score range always then put it into section 2 which is scorRange section
	    		  if(comp1.type == "scale"){
	    			  section2 = comp1;
	    			  isStudentRespo = comp1.isStudentAnswered();
	    			  if(isStudentRespo){
	    			  	 score = this.getScore(comp1); 
	    			  	 sIndex = 0;
					  	 sections = comp2.sections;
					  	 for(sIndex in sections){
						  	if(sectionId2== sections[sIndex].id){
							  section1 =  sections[sIndex];
						  	}
					  	 }	
	    			  }
	    		  }else{
	    			  section2 = comp2;
	    			  isStudentRespo = comp2.isStudentAnswered();
	    			  if(isStudentRespo){
	    				  score = this.getScore(comp2);
	    				  var sections = comp1.sections;
						  for(sIndex in sections){
							  if(sectionId1 == sections[sIndex].id){
								  section1 =  sections[sIndex];
							  }
						  }	
	    			  }
	    		  }
				  if(isStudentRespo){
					  var i = 0;
		    		  for (i in branch.pathMaps) {
						  var selectedOpts = [];
		    			  isCondTrue = false;
		    			  flag1 = false;
						  // check pathmap related option's student response
						  var oIndex = 0;
						  oIndex = 0;
						  for(oIndex in section1.options){
							  if(section1.options[oIndex].studentResponse){
								  selectedOpts.push(section1.options[oIndex].id);
							  }
						  }
						  var pathMapOption = branch.pathMaps[i].idRange.slice(0);
						 // pathMapOption.push(branch.pathMaps[i].id);
						  pathMapOption = pathMapOption.filter(function(val) { return val !== null; });
						  if (selectedOpts.length == pathMapOption.length) {
							  // if all options are checked related to pathmap
							  // then show all paths related to that pathmap
							  if (JSON.stringify(selectedOpts.sort()) == JSON.stringify(pathMapOption.sort())) {
								  flag1 = true;
							  }
						  }
						  //loop over ranges in pathMap
						  var rIndex = 0;
						  for(rIndex in branch.pathMaps[i].range){
							  flag2 = false;
							 if (section2.feedbackScoringType != "frequency") {
								 var minVal = parseFloat(branch.pathMaps[i].range[rIndex].minRangeEditor.text);
					  	    	 var maxVal = parseFloat(branch.pathMaps[i].range[rIndex].maxRangeEditor.text);
					  	  	     if(score >= minVal && score <= maxVal){
					  	        	  flag2 = true;
					  	  	     }
							 }else{
								 for(var len in score){
								 	if (branch.pathMaps[i].labelOptionsObject[branch.pathMaps[i].range[rIndex].idCriteriaFreq - 1] == score[len]) {
										flag2 = true; 
									}
								 }
							 }
				  	  	     //if operator related to range is AND then check condition flag of both component else only one 
				  	  	     if(branch.pathMaps[i].operators[rIndex] == "and"){
			  	  	    		isCondTrue = flag1 && flag2;
			  	  	    	  }else{
			  	  	    		isCondTrue = flag1 || flag2;
			  	  	    	  }
				  	  	     //if any range satisfied then execute respective path
				  	  	     if(isCondTrue){
				  	  	    	var pIndex = 0;
					  	  		for(pIndex in branch.pathMaps[i].paths){
					  	  			if(branch.pathMaps[i].range[rIndex].id == branch.pathMaps[i].paths[pIndex].rangeId){
										this.setResetFlag(branch, isCondTrue, i, pIndex);
									}
	    					    }
				  	  	     }
						  }
		    		  }
				  } 
		      },
		      checkInputCondition:function(studentEntry, studentResponse, branch, pathMapIndex, type, rangeId, conditionToCheck){
			    	 var isCndtnTrue = false;
			     	 studentResponse = studentResponse.replace(/,/g , "");
			     	studentResponse = (studentEntry.contentFormat!=undefined)?this.roundOff(parseFloat(studentResponse),studentEntry.contentFormat.decimalPlaces):studentResponse;
	  	    		   for(var i in branch.pathMaps){
	  	    			   var loopCndtn = false;
	  	  	  	    	 	if(type == "inputField"){
	  	  	  	    	 		loopCndtn = pathMapIndex == i && (branch.pathMaps[i].compOptionId == studentEntry.editor.id || branch.pathMaps[i].drpDwnEditorId == studentEntry.editor.id || branch.pathMaps[i].labelEditorId == studentEntry.editor.id) ? true : false;
	  	  	  	    	 	}else{
	  	  	  	    	 		loopCndtn = (pathMapIndex == i)? true : false;
	  	  	  	    	 		//loopCndtn = (pathMapIndex == i && (branch.pathMaps[i].compOptionId == studentEntry || branch.pathMaps[i].drpDwnEditorId == studentEntry || branch.pathMaps[i].labelEditorId == studentEntry)) ? true : false;
	  	  	  	    	 	}
	  	    			   
	  	    			   if(loopCndtn){
	  	  	  	    	    var satisfiedConditionIds = [];
	 						if(studentResponse==""){
	 							satisfiedConditionIds = [];
	  	  	  	    		}
	 						for ( var index in branch.pathMaps[i].condition) {
	 							var conditionIdVal = branch.pathMaps[i].condition[index].selectConditionVal;
	 							var conditionId = branch.pathMaps[i].condition[index].id;
	 							//used parseFloat as result may come in decimal ,so should not round up to 0
	 							studentReponse = parseFloat(studentResponse);
	 							var autherEntryVal = parseFloat(branch.pathMaps[i].condition[index].authorEntryVal);
	 							switch (conditionIdVal) {
	 								case "1":
	 									if (studentResponse == autherEntryVal) {
	 										satisfiedConditionIds.push(conditionId);
	 									}
	 									break;
	 								case "2":
	 									if (studentResponse < autherEntryVal) {
	 										satisfiedConditionIds.push(conditionId);
	 									}
	 									break;
	 								case "3":
	 									if (studentResponse > autherEntryVal) {
	 										satisfiedConditionIds.push(conditionId);
	 									}
	 									break;
	 								case "4":
	 									if (studentResponse >= autherEntryVal) {
	 										satisfiedConditionIds.push(conditionId);
	 									}
	 									break;
	 								case "5":
	 									if (studentResponse <= autherEntryVal) {
	 										satisfiedConditionIds.push(conditionId);
	 									}
	 									break;
	 							}
	 						}
	 						for ( var j in branch.pathMaps[i].paths) {
	 							if(satisfiedConditionIds.length != 0){
	 								var idIndex = 0;
	 								for(idIndex = 0; idIndex < satisfiedConditionIds.length; idIndex++){
	 									//secConditionId check for input - input combination
	 									//var scoreRangeCheck = rangeId != undefined  ? (branch.pathMaps[i].paths[j].rangeId == rangeId)? true : false : true;  
	 									if(conditionToCheck != undefined){
	 											if(((branch.pathMaps[i].paths[j].conditionId == satisfiedConditionIds[idIndex] || branch.pathMaps[i].paths[j].secConditionId == satisfiedConditionIds[idIndex]) && (satisfiedConditionIds[idIndex] == conditionToCheck)  && studentResponse != "")){
	 		 										 isCndtnTrue = true;
	 		 			  						}
	 									}else{
	 										//if((branch.pathMaps[i].paths[j].conditionId == satisfiedConditionIds[idIndex]) && studentResponse != "" && scoreRangeCheck){
	 										if((branch.pathMaps[i].paths[j].conditionId == satisfiedConditionIds[idIndex] || branch.pathMaps[i].paths[j].secConditionId == satisfiedConditionIds[idIndex]) && studentResponse != ""){
		 										 isCndtnTrue = true;
		 			  						}
	 									}
 										
	 								}
	 	  						}
	 						}
	  	  	  	    	 }
	  	  			   } 
	  	    		   return isCndtnTrue;
			      },
		      //get score of component for score range calculations
		      getScore : function(currentComponent, currenrtSection){
		    	  var score = 0;
		    	  if(currentComponent.type == "scale"){
		    	  	  var totalPointsVal = 0;
		   		 		if(currentComponent.scaleType =="M"){ /*for multicategory */
		   		 		  var x=0;
		   		 		  for(x in currentComponent.subCategories){
		   		 			var subCatScore = currentComponent.calculateScoreForFeedback(currentComponent.subCategories[x]);
		   		 			totalPointsVal = totalPointsVal + subCatScore;
		   		 		  }
		   		 		}else{ /*for singlecategory */
		   		 		  totalPointsVal = currentComponent.calculateScoreForFeedback(null);
		   		 		}
		   		 	    if(!currentComponent.notApplicableStudentResponse){
		   		 	        /* for average score case*/
		   	   		 		if(currentComponent.feedbackScoringType == "average"){
		   	   		 		   totalPointsVal = totalPointsVal/currentComponent.statements.length;
		   	   		 		   var multiplier = Math.pow(10, 2);
		   	   		 		   totalPointsVal = Math.round(totalPointsVal * multiplier) / multiplier;
		   	   		 		}
		   		 		}
		   		 	    score = totalPointsVal;
		   		 	    var mostSelectedIds=[];
		   		 		if(currentComponent.feedbackScoringType == "frequency"){
		   		 			isFrequency = true;
		   		 			/*get mostly selected criteria*/
		   		 			for(var len in totalPointsVal){
		   		 				for (var l in currentComponent.criterias){
		   		 					if(currentComponent.criterias[l].id == totalPointsVal[len].mostlySelectedCriteria){
		   		 						mostSelectedIds.push(currentComponent.markers[l]); //mostly selected criteria markers
		   		 					}
		   		 				}
		   		 			}
		   		 			score = mostSelectedIds;
		   		 		}
		    	  }else if(currentComponent.type == "checkbox"){
						if(currentComponent.notApplicableStudentResponse){
							score = currentComponent.awardMaximum?currentComponent.maxPoint :currentComponent.minPoint;
						}else{
							score = currenrtSection
								.calculatePoints(currentComponent.feedBackScoringSelectionType);
						}
		    	  }
		    	  return score;
		      },
		      setResetFlag : function(branch, flag, index, pIndex){
		     	 for ( var i in branch.pathMaps) {
		 			var loopCondition  =  (!flag) ? true : (flag && i == index)? true : false; 
		 			if(loopCondition){
		 				for(var j in branch.pathMaps[i].paths){
		 					var scoreRangeLoopCondition = (pIndex != undefined) ? pIndex == j ? true : false : true; 
		 					if(scoreRangeLoopCondition){
		 						var partId, compId, secId;
			 					partId = branch.pathMaps[i].paths[j].partId;
			 					compId = branch.pathMaps[i].paths[j].compId;
			 					secId  = branch.pathMaps[i].paths[j].sectionId;
								isSubCategory=(secId!=null)?(secId.split("_")[0]=="s")?true:false:false;
			 					/*loop from pages to compoenents to sections */
			 					if(partId != null){
			 						for(var index1 in question.pages){
			 							if(partId == question.pages[index1].id){
			 								if(question.pages[index1].isBranchDest){
			 									question.pages[index1].showToStud = flag;										
			 								} else{
			 									for(var index2 in question.pages[index1].components){
			 										var comp = question.pages[index1].components[index2];
			 										if(compId == comp.id){
			 											if(comp.isBranchDest){
			 												comp.showToStud = flag;													
			 											} else{
			 												if(comp.sections != undefined && !isSubCategory){
			 													for(var index3 in comp.sections){
			 														if(comp.sections[index3].id == secId){
			 															if(comp.sections[index3].isBranchDest){
			 																comp.sections[index3].showToStud = flag;
			 															}
			 														}
			 													}
			 												}else{
																		if(comp.sections != undefined){
																		for(var index3 in comp.sections){
																			var subCat=secId.split("_")[1]
																		if(comp.sections[index3].subCategoryId == subCat){
																			
																			if(comp.sections[index3].isBranchDest){
																				//console.log("subcat"+flag+"i"+i+"ind"+index)
																				comp.sections[index3].showToStud = flag;
																			}
																		}
																	}
																}
															}
			 											}
			 										}
			 									}
			 								}
			 								
			 							}
			 						}
			 					}
		 					}
		 					
		 				}
		 			}
		     	 }
		      },
		      checkIfPageDelete:function(pageId){
		    	var diff=parseInt(pageId)-question.pages.length;
		    	return diff;  
		      }
};