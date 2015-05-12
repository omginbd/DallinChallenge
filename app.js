$(document).ready(function(){
	//Init
	$("#submitForm").submit(getUserObject);
	$("#avatar").hide();
	$(".progress").hide();
});

var getUserObject = function(){
	//Remove old data, if any
	$("#repoList").empty();

	//Get new userObject
	var username = $("#usernameInput")[0].value;
	var xhrObject = $.get("https://api.github.com/users/" + username, function(data){
		getCrap(data);
		//Suspend input
		$(".progress").hide();
		$(".username").show();
	});
	//Clean Up
	$(".username").hide();
	$(".progress").show();
}

var getCrap = function(userObject){
	//Avatar
	$("#avatar")[0].src = userObject.avatar_url;
	$("#avatar").show();
	//Data
	$("#userRealName")[0].innerHTML = userObject.name;
	$("#loginName")[0].innerHTML = userObject.login;
	$("#loginNameLink")[0].href = userObject.html_url;
	//Repos
	$.get(userObject.repos_url, function(data){
		getRepos(data);
	});
}

var getRepos = function(repoObject){
	for (i = 0; i<repoObject.length; i++){
		$("#repoList").append($("<li></li>").text(repoObject[i].name));
	}
}