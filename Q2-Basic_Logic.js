function createTriangle(x) {
  for (var i = 1; i <= x; i++) {
    var spaces = "";
    var hashes = "";
    for (var j = 0; j < x - i; j++) {
      spaces += " ";
    }
    for (var k = 0; k < i; k++) {
      hashes += "#";
    }
    console.log(spaces + hashes);
  }
}

createTriangle(3);
