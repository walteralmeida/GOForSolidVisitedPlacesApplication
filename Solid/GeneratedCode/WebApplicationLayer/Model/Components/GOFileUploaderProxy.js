 

(function () {
	// GOFileUploader server Component proxy
	Solid.Web.Model.Components.GOFileUploaderProxy = function(rootObjectsDataSet) {
		var self = this;

		/// UploadImage Method
		/// Upload the given blob on the remote server
		this.UploadImageRequest = null;
		
		this.isUploadImageBusy = function() {
			return self.UploadImageRequest != null && self.UploadImageRequest.readyState != 4;
		};

		this.UploadImage = function (configuration) {
            if (self.isUploadImageBusy())
                UploadImageRequest.abort();
		
            UploadImageRequest = $.ajax({
                url: configuration.url,
                processData: false,
                contentType: false,
                type: "POST",
                data: configuration.formData,
				success: function (result) {
                    if (configuration.successHandler) {
						configuration.successHandler(result);
					}
				},
                error: function (jqXHR, textStatus, errorThrown) {
                  ApplicationController.errorHandler(jqXHR, errorThrown, configuration.errorHandler, Solid.Web.Messages.componentError.replace(/%OPERATION%/g, "GOFileUploader.UploadImage"));
				}
            });
		};	
	};

	if (window.ApplicationSourceHandler)
		window.ApplicationSourceHandler.onSourceLoaded("/Model/Components/GOFileUploaderProxy.js");
} ());
