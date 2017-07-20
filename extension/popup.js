var popupContent =
{
    elements: {
        startUploading: $("#start_uploading"),
        uploadingInProgress: $("#uploading_in_progress"),
        stopUploading: $("#stop_uploading"),
        stoppingUploading: $("#stopping_uploading")
    },

    show: function (name) {
        _.each(this.elements, function ($element, elementName) {
            $element.show(name === elementName);
        })
    }
};


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    switch (request.name)
    {
        case messages.UPLOADING_FINISHED: popupContent.show("startUploading"); break;
    }
});

function startAudioUploading() {
    chrome.runtime.sendMessage({ name: messages.START_UPLOADING});
    popupContent.show("uploadingInProgress");
}

function stopAudioUploading() {
    chrome.runtime.sendMessage({ name: messages.STOP_UPLOADING});
    popupContent.show("stoppingUploading");
}

popupContent.show("startUploading");