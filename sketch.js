//Create variables here
var database;

var dog;
var dogImage, happyDogImage;

var foodS, foodStock;

var feed, add;

var fedTime, currentTime, differnceTime;

var foodObject;

var gameState, readState;

var bedroomImage, gardenImage, washroomImage;

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happyDogImage = loadImage("images/dogImg1.png");

  //loading in dog scene images
  bedroomImage = loadImage("images/bed-room.png");
  gardenImage = loadImage("images/garden.png");
  washroomImage = loadImage("images/wash-room.png");
}

function setup() {
  createCanvas(400, 500);

  database = firebase.database();
  
  dog = createSprite(600, 325, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  fedTime = database.ref("fedTime");
  fedTime.on("value", function(data){
    fedTime = data.val();
  });

  //read game state from database
  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState = data.val();
  });
  
  foodObject = new Food();

  feed = createButton("Feed the Dog");
  feed.position(800, 175);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(900, 175);
  add.mousePressed(addFood);
}


function draw() {  
  // background(46, 139, 87);

  foodObject.display();

  textSize(24);
  fill("snow");
  text("Press the Button to Feed the Dog!",  30, 90);

  textSize(20);
  text("Food Left: " + foodS, 30, 40);

  if(fedTime >= 12) {
    text("Last Fed: " + fedTime%12 + " PM", 350, 30);
  }
  else if(fedTime == 0) {
    text("Last Fed: 12 AM", 350, 30);
  }
  else{
    text("Last Fed: " + fedTime + " AM", 350, 30);
  }

  if(gameState == "hungry") {
    feed.show();
    add.show();
    dog.addImage(happyDogImage);
  }
  else {
    feed.hide();
    add.hide();
    dog.remove();
  }

  currentTime = hour();
  if(currentTime == fedTime+1) {
    foodObject.garden();
    update("playing");
  }
  else if(currentTime == (fedTime + 2)) {
    foodObject.bedroom();
    update("sleeping");
  }
  else if(currentTime>(fedTime+2) && currentTime<=(fedTime+4)) {
    foodObject.washroom();
    update("bathing");
  }
  else {
    update("hungry");
    foodObject.display();
  }


  drawSprites();
}

//Function to read the values from DB and assign to variable foodS
function readStock(data) {
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

//Function to feed to dog and subtract from food stock in DB
function feedDog() {
  dog.addImage(happyDogImage);

  foodS--;
  database.ref('/').update ({
    food: foodS,
    fedTime: hour()
  })
}

//Function to add food to food stock and in DB
function addFood() {
  dog.addImage(dogImage);

  foodS++;
  database.ref('/').update({
    food: foodS
  });
}

//Function to update game states in DB
function update(state) {
  database.ref('/').update({
    gameState: state
  });
}