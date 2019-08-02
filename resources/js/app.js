///////////////////////////
/* Create the vrvToolkit */
///////////////////////////
var vrvToolkit = new verovio.toolkit();

var appSelection =[ './rdg[1]'];
var substSelection =[ './del'];
var meiData;
var image1index = 0;
var image2index = 1;

var images =[ {
  label: '2008', path: 'resources/pix/Autograph_Snippet1_2008.jpg'
}, {
  label: '1924', path: 'resources/pix/Autograph_Snippet1_1924.jpg'
}, {
  label: '1895', path: 'resources/pix/Autograph_Snippet1_1895.jpg'
}, {
  label: 'Copy', path: 'resources/pix/Hering_Snippet1.jpg'
}]



////////////////////////////////////
/* Load the file using a HTTP GET */
////////////////////////////////////
$.ajax({
  url: "./resources/data/mei.xml", dataType: "text", success: function (data) {
    meiData = data;
    renderMEI();
  }
});

function renderMEI() {
  options = {
    adjustPageHeight: true,
    scale: 25,
    noLayout: 1,
    appXPathQuery: appSelection,
    substXPathQuery: substSelection
  };
  vrvToolkit.setOptions(options);
  
  var svg = vrvToolkit.renderData(meiData, {
  });
  $("#rendering").html(svg);
}

document.getElementById('showAutograph').addEventListener('click', function (e) {
  document.getElementById('showAutograph').classList.add('btn-primary');
  document.getElementById('showHering').classList.remove('btn-primary');
  
  appSelection =[ './rdg[1]'];
  renderMEI();
});

document.getElementById('showHering').addEventListener('click', function (e) {
  document.getElementById('showAutograph').classList.remove('btn-primary');
  document.getElementById('showHering').classList.add('btn-primary');
  
  appSelection =[ './rdg[2]'];
  renderMEI();
});

document.getElementById('showDeletions').addEventListener('click', function (e) {
  document.getElementById('showDeletions').classList.add('btn-primary');
  document.getElementById('showAdditions').classList.remove('btn-primary');
  
  substSelection =[ './del'];
  renderMEI();
});

document.getElementById('showAdditions').addEventListener('click', function (e) {
  document.getElementById('showDeletions').classList.remove('btn-primary');
  document.getElementById('showAdditions').classList.add('btn-primary');
  
  substSelection =[ './add'];
  renderMEI();
});

//toggle highlighting of differences
document.getElementById('showHighlights').addEventListener('click', function (e) {
  document.getElementById('rendering').classList.toggle('highlighted');
});

//selecting images
$('input[type="radio"]').on('click', function (e) {
  if (e.target.name === 'leftImage') {
    image1index = e.target.value;
  } else {
    image2index = e.target.value
  }
  
  loadImages();
});

function loadImages() {
  var image1 = images[image1index];
  var image2 = images[image2index];
  
  document.getElementById('image1').src = image1.path;
  document.getElementById('image1label').innerHTML = image1.label;
  document.getElementById('image2').src = image2.path;
  document.getElementById('image2label').innerHTML = image2.label;
};