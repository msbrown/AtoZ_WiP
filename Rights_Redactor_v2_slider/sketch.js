// Michelle Brown
// For A2Z F16 

// This example also includes a slider
var slider;
// Variable to keep track of slider value (a bit redundant)
var percent = 5;
// Many DOM elements
var output;
var dropZone, input, button, sample, clearButton;
// An array to keep track of all the new DOM elements being added
var paragraphs = [];

var inputText = '';
//var textfield;
var submit;
var headinglater; 
var plater;

function setup() {
  noCanvas();
  //Selecting the text field and button
  input = select("#input");
  submit = select("#submit");
  //Run it when the button is pressed (text submitted)
  submit.mousePressed(handleInput);

   // Slider
  slider = select("#percentslider");
  slider.input(changePercent);

  // Selected the div which will be the "drop zone"
  // for dragging and dropping files
  dropZone = select('#drop_zone');
  // Here are the events to handle
  dropZone.dragOver(highlight);
  dropZone.drop(gotFile, unHighlight);
 

  // This link allows quick testing with a file
  // that's ready to load instantly
  sample = select('#sample');
  sample.mousePressed(loadFile);
  //added Bill of Rights 
  sampleb = select('#sampleb');
  sampleb.mousePressed(loadFileb);

  samplec = select('#samplec');
  samplec.mousePressed(loadFilec);


  // This button clears the new paragraph elements
  // added
  clearButton = select('#clearText');
  clearButton.mousePressed(clearText);
 	headinglater = select('#unredact');
 	headinglater.hide();
	plater = select('#unredactp');
 	plater.hide();

  output = select('#output');
}

// Take  the text input field (which all ways dump into) and do the thing
function handleInput() {
  headinglater.show();
  plater.show();
  newText(input.value());
  //process(input.value());
    //at very end show text for unredact

}

function highlightText() {
  console.log(this.html());
  var c = color(255);
  this.style('background-color', c);  //turns white to un-redact
}

function newText(data) {
  var regex = /(\W+)/;
  //cut the string into an array of words & space using regex:
  var allwords = data.split(regex);
  console.log('Total allwords: ' + allwords.length);
  // console.log('allwords: ' + allwords);

  //Prep a different array for shuffle by taking out spaces
  var regex2 = /\W+/;
  var onlywords = data.split(regex2);
  console.log('Total onlywords: ' + onlywords.length);
  
  // Randomly Shuffle the array of only words
  shuffledarray = shuffle(onlywords);

 // Create a new sub array to store for matching later
  var subarray = '';
  // For every word 
  for (var i = 0; i < shuffledarray.length; i++) {
    // Randomly choose to include it based on
    // percentage
    if (random(100) < percent) {
      subarray += shuffledarray[i] + ' ';
    }
  }
  console.log('Total words in subarray: ' + subarray.length);
  //Now take out spaces from subarray so 
  // don't style/highlight space when matching back:
  var subsubarray = subarray.split(regex2);

 //make a span for all words (and spaces) so can style each 
  for (var j = 0; j < allwords.length; j++) {
    var span = createSpan(allwords[j]);
    span.parent(output);
		//Match subarray back to allwords and style those 
		for (k = 0; k < subsubarray.length; k++){
				if (subsubarray[k] == allwords[j]) {
					span.style('background-color', 0);  //blackout
				}
	      	
	     span.mousePressed(highlightText);
	    }	
  }

}


// A function to shuffle an array
// From: http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// Handle event when slider changes
function changePercent() {
  var span = select('#percent');
  // Set global variable for use
  percent = slider.value();
  // Update the span element to display in browser
  span.html(percent);
}


 // Load a file for quick testing
function loadFile() {
  loadStrings('files/UDHR.txt', fileLoaded);
}
function loadFileb() {
  loadStrings('files/USbillofrights.txt', fileLoaded);
}
function loadFilec() {
  loadStrings('files/helsinkiexcerpt.txt', fileLoaded);
}

// When the file is loaded put it in the textbox
function fileLoaded(data) {
  //line breaks for display
  var txt = data.join('\n');
  //console.log('number of characters: ' + txt.length + 'stuff:' + txt);
  input.html(txt);
  // Note the use of a function that will "process" the text
  // This is b/c the text might come in a number of different ways
  // process(txt);
}

function gotFile(file) {
  if (file.type === 'text') {
    // process(file.data);
    inputText += file.data + '\n\n';
    input.html(inputText);
  } else {
    // In case it's some weird other kind of file
    alert('this is not a text file.');
  }
}

// Handle dropzone events
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background','');
}

// Clear all the divs with remove()
function clearText() {
  input.html('');
  output.html('');
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
  headinglater.hide();
  plater.hide();

}