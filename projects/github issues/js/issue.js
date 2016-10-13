var url = window.location.search.split("?api=")[1];

function processData(returnData, status) {
    $("#ajaxStatusMessage").append("status:" + status + "</br>)")

    var data = returnData;
    var source = $("#template").html();
    var template = Handlebars.compile(source);
    var html = template({
        result: data
    });
    $(".issueCover").append(html);
}

function reporterror(request, status, errorMsg) {
    $("#ajaxStatusMessage").append("Status: " + status + "<br>Error Message: " + errorMsg);
    $("#ajaxStatusMessage").addClass("errMsg");
}

$.ajax({
    type: "Get",
    url: url,
    datatype: "text",
    success: processData,
    error: reporterror
});

