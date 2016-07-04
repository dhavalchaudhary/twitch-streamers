$(document).ready(function(){
    var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];
    var duplicatechannels = channels.slice(0,channels.length);
    var successfulchannels = [];
    var profileLink;
    var currentSession;
    var channelStatus;
    var channelName;
    function displayStreamers(name,link,status,content){
        $("#streamers-list").append('<tr class="' + status + '">\
<td><a href="'+link + '" target="_blank">' + name + '</a></td>\
<td><i>' + content + '</i></td>\
</tr>');
    };
    function getStatus(channels){
        for(var i=0;i<channels.length;i++){
            var sendRequest = "https://api.twitch.tv/kraken/streams/" + channels[i]+'?callback=?';

            $.getJSON(sendRequest,function(data){
                if(data.stream === null){
                    profileLink = "https://www.twitch.tv/" + channels[i];
                    currentSession = "";
                    channelStatus = false; 
                    var temp = data._links.self;
                    var tempArray = temp.split("/");
                    displayStreamers(tempArray[tempArray.length-1],"https://www.twitch.tv/" + tempArray[tempArray.length-1],"danger","The user is offline.");
                    duplicatechannels.splice(duplicatechannels.indexOf(tempArray[tempArray.length-1]),1);
                }
                else if(data.stream === undefined){
                    var temp = data.message;
                    var tempArray = temp.split("'");
                    displayStreamers(tempArray[1],"#","danger","This account does not exist.");
                    duplicatechannels.splice(duplicatechannels.indexOf(tempArray[1]),1);
                }
                else {
                    profileLink = "https://www.twitch.tv/" + channels[i];
                    currentSession = data.stream.channel.status;
                    channelStatus = true;
                    successfulchannels.push(data.stream.channel.display_name);
                    displayStreamers(data.stream.channel.display_name,"https://www.twitch.tv/" + data.stream.channel.name,"success",data.stream.channel.status);
                }
            });
        };
    };
    getStatus(channels);
});
