function uniCharCode(event) {
    var char = event.which || event.keyCode;
    document.getElementById("demo").innerHTML = "The Unicode CHARACTER code is: " + char;
  }