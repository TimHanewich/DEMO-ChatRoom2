var uuu = new URL(window.location.href);
var meetingid = uuu.searchParams.get("meetingid");
var role = uuu.searchParams.get("role").toLocaleLowerCase();

console.log(meetingid);
console.log(role);