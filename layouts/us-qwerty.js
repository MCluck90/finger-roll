const lookup = {
  "0":  { key: "0",  adjacent: ["9", "O", "P", "-"],         alternate: ")" },
  "1":  { key: "1",  adjacent: ["`", "2"],                   alternate: "!" },
  "2":  { key: "2",  adjacent: ["1", "Q", "W", "3"],         alternate: "@" },
  "3":  { key: "3",  adjacent: ["2", "W", "E", "4"],         alternate: "#" },
  "4":  { key: "4",  adjacent: ["3", "E", "R", "5"],         alternate: "$" },
  "5":  { key: "5",  adjacent: ["4", "R", "T", "6"],         alternate: "%" },
  "6":  { key: "6",  adjacent: ["5", "T", "Y", "7"],         alternate: "^" },
  "7":  { key: "7",  adjacent: ["6", "Y", "U", "8"],         alternate: "&" },
  "8":  { key: "8",  adjacent: ["7", "U", "I", "9"],         alternate: "*" },
  "9":  { key: "9",  adjacent: ["8", "I", "O", "0"],         alternate: "(" },
  "`":  { key: "`",  adjacent: ["1"],                        alternate: "!" },
  "-":  { key: "-",  adjacent: ["0", "P", "[", "="],         alternate: "_" },
  "=":  { key: "=",  adjacent: ["-", "[", "]"],              alternate: "+" },
  "Q":  { key: "Q",  adjacent: ["1", "2", "W", "A"],         alternate: null },
  "W":  { key: "W",  adjacent: ["3", "2", "Q", "A","S","E"], alternate: null },
  "E":  { key: "E",  adjacent: ["4", "3", "W", "S","D","R"], alternate: null },
  "R":  { key: "R",  adjacent: ["5", "4", "E", "D","F","T"], alternate: null },
  "T":  { key: "T",  adjacent: ["6", "5", "R", "F","G","Y"], alternate: null },
  "Y":  { key: "Y",  adjacent: ["7", "6", "T", "G","H","U"], alternate: null },
  "U":  { key: "U",  adjacent: ["8", "7", "Y", "H","J","I"], alternate: null },
  "I":  { key: "I",  adjacent: ["9", "8", "U", "J","K","O"], alternate: null },
  "O":  { key: "O",  adjacent: ["0", "9", "I", "K","L","P"], alternate: null },
  "P":  { key: "P",  adjacent: ["-", "0", "O", "L",";","["], alternate: null },
  "[":  { key: "[",  adjacent: ["=", "-", "P", ";","'","]"], alternate: null },
  "]":  { key: "]",  adjacent: ["=", "[", "'", "\\"],        alternate: null },
  "\\": { key: "\\", adjacent: ["]"],                        alternate: null },
  "A":  { key: "A",  adjacent: ["W", "Q", "Z", "S"],         alternate: null },
  "S":  { key: "S",  adjacent: ["E", "W", "A", "Z","X","D"], alternate: null },
  "D":  { key: "D",  adjacent: ["R", "E", "S", "X","C","F"], alternate: null },
  "F":  { key: "F",  adjacent: ["T", "R", "D", "C","V","G"], alternate: null },
  "G":  { key: "G",  adjacent: ["Y", "T", "F", "V","B","H"], alternate: null },
  "H":  { key: "H",  adjacent: ["U", "Y", "G", "B","N","J"], alternate: null },
  "J":  { key: "J",  adjacent: ["I", "U", "H", "N","M","K"], alternate: null },
  "K":  { key: "K",  adjacent: ["O", "I", "J", "M",",","L"], alternate: null },
  "L":  { key: "L",  adjacent: ["P", "O", "K", ",",".",";"], alternate: null },
  ";":  { key: ";",  adjacent: ["[", "P", "L", ".","/","'"], alternate: null },
  "'":  { key: "'",  adjacent: ["]", "[", ";", "/"],         alternate: null },
  "Z":  { key: "Z",  adjacent: ["S", "A", "X"],              alternate: null },
  "X":  { key: "X",  adjacent: ["D", "S", "Z", "C"],         alternate: null },
  "C":  { key: "C",  adjacent: ["F", "D", "X", "V"],         alternate: null },
  "V":  { key: "V",  adjacent: ["G", "F", "C", "B"],         alternate: null },
  "B":  { key: "B",  adjacent: ["H", "G", "V", "N"],         alternate: null },
  "N":  { key: "N",  adjacent: ["J", "H", "B", "M"],         alternate: null },
  "M":  { key: "M",  adjacent: ["K", "J", "N", ","],         alternate: null },
  ",":  { key: ",",  adjacent: ["L", "K", "M", "."],         alternate: null },
  ".":  { key: ".",  adjacent: [";", "L", ",", "/"],         alternate: null },
  "/":  { key: "/",  adjacent: ["'", ";", "."],              alternate: null }
};

const alternateLookup = {
  "~": "`",
  "`": "~",

  ")": "0",
  "0": ")",

  "!": "1",
  "1": "!",

  "@": "2",
  "2": "@",

  "#": "3",
  "3": "#",

  "$": "4",
  "4": "$",

  "%": "5",
  "5": "%",

  "^": "6",
  "6": "^",

  "&": "7",
  "7": "&",

  "*": "8",
  "8": "*",

  "(": "9",
  "9": "(",

  "_": "-",
  "-": "_",

  "+": "=",
  "=": "+"
};

module.exports = {
	lookup,
	alternateLookup
};