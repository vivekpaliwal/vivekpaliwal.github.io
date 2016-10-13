var countInLocal = JSON.parse(localStorage.getItem("countNum"));
var count;

if (countInLocal) {
    count = countInLocal;
    $("#count").html(count);
} else {
    count = 0;
}

var itemsInLocalStorage = JSON.parse(localStorage.getItem("issueData"));
	
if (itemsInLocalStorage) {
    for (var i = 0; i < itemsInLocalStorage.length; i++) {
        var item = itemsInLocalStorage[i];
        renderIssueList(item.result, item.repoName);
    }
}

function renderIssueList(data, repoName) {
    if ($("#" + repoName).length == 0) {
        var sourse = $("#template-repo").html();
        var template = Handlebars.compile(sourse);
        var html = template({
            repositaryName: repoName
        });
        $(".cover").prepend(html);
    }

    var sourse = $("#template").html();
    var template = Handlebars.compile(sourse);

    var html = template({
        result: data,
        repositaryName: repoName,
        resultsFound: data.length > 0
    });

    $("#" + repoName).html(html);
}

function processData(data, status) {
    var repoName = $("#search").val().replace('.', '-');

    renderIssueList(data, repoName);

    var issueDataInLocalStorage = localStorage.getItem('issueData');

    if (issueDataInLocalStorage) {
        var oldItems = JSON.parse(localStorage.getItem('issueData'));
        oldItems.push({
            result: data,
            repoName: repoName
        })
        localStorage.setItem('issueData', JSON.stringify(oldItems));
    } else {
        localStorage.setItem('issueData', JSON.stringify([{
            result: data,
            repoName: repoName
        }]));
    }
    if ($("#" + repoName).length == 0) {
        var sourse = $("#template-repo").html();
        var template = Handlebars.compile(sourse);
        var html = template({
            repositaryName: repoName
        });
        $(".cover").prepend(html);
    }

    var sourse = $("#template").html();
    var template = Handlebars.compile(sourse);

    var html = template({
        result: data,
        repositaryName: repoName,
        resultsFound: data.length > 0
    });

    $("#" + repoName).html(html);

}

var repoSearch = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        url: "https://api.github.com/search/repositories?q=%QUERY&sort=stars&order=desc",
        wildcard: '%QUERY',
        filter: function(list) {
            return list.items;
        }
    }
});

$('#search').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
}, {
    name: 'name',
    displayKey: 'name',
    limit: 10,
    source: repoSearch,
}).on('typeahead:selected typeahead:autocompleted', function(e, datum) {
    var issue = datum.issues_url;
    var date = new Date();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var newdate = year + "/" + month + "/" + day;
    var url = issue.split("{/number}").join("?since=" + newdate);

    $.ajax({
        type: "Get",
        url: url,
        datatype: "text",
        success: processData
    });
});


$('body').on('click', '.issue', function() {
    $("#count").html(++count);
    localStorage.setItem("countNum", count);
});	

