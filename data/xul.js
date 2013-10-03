function buttonPressed(event){
  alert('Button was pressed!');
}

var btn = document.getElementById("foo-button");

btn.addEventListener('command', buttonPressed, true);
console.log("merp derp");
alert("fak");