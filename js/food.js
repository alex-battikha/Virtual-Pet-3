class Food {
    constructor() {
        this.image = loadImage("images/milk.png");
        this.foodStock = 0;
        this.lastFed;
    }
    getFoodStock() {
        return this.foodStock;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    deductFood() {
        if(this.foodStock > 0) {
            this.foodStock-=1;
        }
    }

    getFedTime(fedTime){
        this.lastFed = fedTime;
    }

    bedroom() {
        background(bedroomImage, 550, 500);
    }

    garden() {
        background(gardenImage, 550, 500);
    }

    washroom() {
        background(washroomImage, 550, 500);
    }

    display() {
        var x = 80, y = 180;
        imageMode(CENTER);
        image(this.image, 500, 325, 70, 70);

        if(this.foodStock != 0) {
            for(var i = 0; i < this.foodStock; i++) {
                if(i % 10 == 0) {
                    x = 80;
                    y += 50;
                }
                image(this.image, x, y, 50, 50);
                x+=30;
            }
        }
    }
}