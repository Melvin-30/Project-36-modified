var dog,dogimg, happyDog, database, foodS, foodStock,lastFed,Food,foodObj;

function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800,600);
  database = firebase.database();
  foodObj=new food();
  dog=createSprite(650,400,50,50)  
  dog.scale=0.25;
  getfoodStock()
  dog.addImage(dogimg);
  Feed=createButton("Feed the dog");
  Feed.position(700,95);
  Feed.mousePressed(feedDog())
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods())
}


function draw() {  
  background(46,139,87)
  
  fill("black");
  textSize(15);
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  if(lastFed>=12){
    text("Last Feed : "+lastFed+"PM",350,30)
  }else if(lastFed===0){
    text("Last Feed : 12AM ",350,30)
  }else{
    text("Last Feed : "+lastFed+"AM",350,30)
  }
  drawSprites();
  //add styles here
  
}
function feedDog(){
  dog.addImage(happyDog)
  updateFoodStock(getfoodStock()-1);
  deductStock(foodS);
  database.ref('/').update({
      Food:getFoodStock(),
      FeedTime: hour()
  })
  }
  function addFoods(){  
    foodS++
    database.ref('/').update({
        Food:foodS
    })
}
function getfoodStock(){
  foodStock=database.ref('Food');
  foodStock.on("value",function(data){
  foodS=data.val();
  updateFoodStock(foodS)
 });
    }
    function deductStock(x1){
      if(x1<=0){
        x1=0;
      }else{
        x1=x1-1
      }
      database.ref('/').update({
        Food:x1
      })
}
function updateFoodStock(foodStock1){
  foodStock=foodStock1
}

