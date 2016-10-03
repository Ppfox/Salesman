var cities = [];
var world = [];
var worldLabel = [];
var matchPool = [];

var totalCities = 9;
var tamCities = 16;
var popl = totalCities*5;
var generations = 0;
var fitness = [];

var recordDist = [];
var sayP;
var labeled = [];

function setup() {
  	createCanvas(800, 575);
  	reboot();
  	sayP = createP();
  	label();
}

function draw() {
	console.log("tique");
	for (var i = 0; i < popl; i++){
		recordDist[i] = calcDistance(world[i]);
	}

	background(20);
	sayP.html("Cidades (pontos):"+totalCities+" // Record: "+floor(worldRec())+"pixels. ID "+worldRecord());

	drawCities(world[worldRecord()]);
	drawPath(world[worldRecord()]);

	for (var i = 0; i < popl; i++){
		trying(world[i],i);
	}
	generations++;
}

function swap(a, i, j){
	var aux;
	aux = a[i];
	a[i] = a[j];
	a[j] = aux;
}

function matchingPool() {
	for (var i = 0; i < popl; i++){
  	fitness = pow(fitness[i], 4);
	}
	matingpool
}

function calcDistance(points){
	var sum = 0;
	var i = 0;
	while (i < points.length-1){
		var j = i+1;
		var d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
		sum += d;
		i++;
	}
	return sum;
}

function worldRec() {
	var record = recordDist[0];
	for (var i = 0; i < popl; i++){
		if (recordDist[i] < record) {
			record = recordDist[i];
		}
	}
	return record;
}

function worldRecord() {
	var record = 0;
	var aux = recordDist[0];
	for (var i = 0; i < popl; i++){
		if (recordDist[i] < aux) {
			aux = recordDist[i];
			record = i;
		}
	}
	return record;
}


function drawPath (a) {
	var l = floor(255*worldRecord()/popl);
	stroke([l, 0, 255-l*0.5]);
	strokeWeight(3);
	noFill();
	beginShape();
	for (var j = 0; j < a.length; j++){
		vertex(a[j].x, a[j].y);
	}
	endShape();
}

function drawCities(a) {
	for (var j = 0; j < a.length; j++){
		fill(floor(255*j/a.length) );
		ellipse(a[j].x, a[j].y, tamCities, tamCities);
	}
}

function trying (a,p) {
	var i = floor(random(a.length));
	var j = floor(random(a.length));

	swap(a, i, j);

	var d = calcDistance(a);

	if(d > recordDist[p]) {
		swap(a, j, i);
	}
}

function label() {
	for (var i = 0; i < popl; i++) {
		labeled[i][1] = recordDist[i];
		labeled[i][2] = i;
	}
	labeled = labeled.sort();

	for (var i = 0; i < popl; i++) {
		worldLabel[i] = world[labeled[i][2]];
	}
}
function selection() {
  var newWorld = [];
  for (var i = 0; i < popl; i++) {
    var parentA = random(this.matingpool).dna;
    var parentB = random(this.matingpool).dna;
    var child = parentA.crossover(parentB);
    child.mutation();
    newRockets[i] = new Rocket(child);
  }
  this.rockets = newRockets;
}
function DNA(genes) {
  this.crossover = function(partner) {
    var newCities = [];
    var mid = floor(random(totalCities));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newCities[i] = this.genes[i];
      } else {
        newCities[i] = partner.genes[i];
      }
    }
    return new DNA(newCities);
  }

  this.mutation = function() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.05) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }

}

function reboot() {
	world = new Array(popl);
	for (var index = 0; index < popl; index++) {
		world[index] = new Array(totalCities);
	}

	for (var index = 0; index < popl; index++) {
		labeled[index] = new Array(2);
	}

	for (var index = 0; index < popl; index++) {
		fitness[index] = new Array(2);
	}

  	for (var i = 0; i < totalCities; i++){
		var v = createVector(random(width), random(height));
		cities[i] = v;
	}

	for (var k = 0; k < popl; k++){
	  	for (var i = 0; i < cities.length; i++){
	  		world[k][i] = cities[i];
		}
	}

	for (var i = 0; i<popl; i++) {
		for (var k = 0; k <= floor(cities.length*10); k++){
			var l = floor(random(cities.length));
			var j = floor(random(cities.length));
			swap(world[i],l,j);
		}
	}
	for (var i = 0; i < popl; i++){
		recordDist[i] = calcDistance(world[i]);
	}
 }

window.onclick = onCluck;

function onCluck() {
    reboot();
}