var uuu = new URL(window.location.href);
var meetingid = uuu.searchParams.get("meetingid");
var role = uuu.searchParams.get("role");

//Show the error message if either are null

if (meetingid == null || role == null)
{
    document.getElementById("ErrorMsg").classList.remove("hidden");
    document.getElementById("ErrorMsg").innerText = "Parameters meetingid and/or role were null.";
    document.getElementById("display").remove();
}
else //Normal course of action
{
    Refresh();
}


function Refresh()
{
    //Create the req
    var req = new XMLHttpRequest();
    req.open("get", "https://timhchatroom.azurewebsites.net/api/GetMeetingChat?meetingid=" + meetingid);
    req.onreadystatechange = function()
    {
        if (req.readyState == 4 && req.status == 200)
        {
            //Clear the list of chat items
            document.getElementById("chatpane").innerHTML = "";

            //Parse it
            var obj = JSON.parse(req.responseText);
            obj.forEach(AddMsgToChatPane);
        }
    }
    req.send();
}

function AddMsgToChatPane(msg)
{
    var entry = document.createElement("p");
    entry.innerText = "<" + msg.Person + ">" + " " + msg.Message;
    
    if (msg.Person == "plaintiff")
    {
        entry.className = "plaintiffmsg chatmsg";
    }
    else if(msg.Person == "defendant")
    {
        entry.className = "defendantmsg chatmsg";
    }
    else if (msg.Person = "moderator")
    {
        entry.className = "mediatormsg chatmsg";
    }

    document.getElementById("chatpane").appendChild(entry);
}

function SendMsg()
{
    var msg = document.getElementById("txt").value;
    if (msg != null && msg != "")
    {
        //Clear the input
        document.getElementById("txt").value = "";

        var req = new XMLHttpRequest();
        req.open("post", "https://timhchatroom.azurewebsites.net/api/SendMessage?meetingid=" + meetingid + "&person=" + role);
        req.onreadystatechange = function()
        {
            if (req.readyState == 4 && req.status == 200)
            {
                Refresh();
            }
        }
        req.send(msg);
    }
}
