class Enemies{
    constructor(game){
        this.game = game;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.game.fps;
        this.movementRand = Math.random();
        this.walkLength = 3; //px
    }
    update(dt){
        if(this.frameTimer < this.frameInterval){
            this.frameTimer += dt;
        }else{
            this.frameX += 1;
            this.movementRand = Math.random();

            if(this.frameX > this.maxFrameX){
                this.frameX = 0;
            }
            this.frameTimer = 0;
        }

        if(this.movementRand <= 0.10){
            this.x-= this.walkLength;
        }else if(this.movementRand <= 0.20 &&
            this.movementRand > 0.10
        ){
            this.x+= this.walkLength;
        }else if(this.movementRand <= 0.30 &&
                    this.movementRand > 0.20
        ){
            this.y+= this.walkLength;
        }else if(this.movementRand <= 0.40 &&
                    this.movementRand > 0.30
        ){
            this.y-= this.walkLength;
        }else{

        }
        }
    draw(ctx){
        ctx.drawImage(this.image, 
                        this.frameX * this.spriteWidth,
                        0,
                        this.spriteWidth, 
                        this.spriteHeight, 
                        this.x, 
                        this.y, 
                        this.spriteWidth *2,
                        this.spriteHeight *2
                    )
        
        if(this.game.debugMode === true){
            ctx.strokeRect(this.x, this.y, this.spriteWidth * 2, this.spriteHeight * 2);
        }
    }
}

export class YellowSkeleton extends Enemies{
    constructor(game){
        super(game);
        this.image = document.getElementById("YellowSkeletonIdle");
        this.spriteWidth = 96;
        this.spriteHeight = 64;
        this.frameX = 0;
        this.x = 1;
        this.y = 1;
        this.maxFrameX = 7;
    }
    update(dt){
        super.update(dt);
        if(this.movementRand <= 0.50){
            this.image = document.getElementById("YellowSkeletonWalk");
        }else if(this.movementRand > 0.50){
            this.image = document.getElementById("YellowSkeletonIdle");
        }
    }
    draw(ctx){
        super.draw(ctx);
    }
}

export class WhiteSkeleton extends Enemies{
    constructor(game){
        super(game);
        this.image = document.getElementById("WhiteSkeletonIdle");
        this.spriteWidth = 96;
        this.spriteHeight = 64;
        this.frameX = 0;
        this.frameX = 0;
        this.x = 111;
        this.y = 1;
        this.maxFrameX = 7;
    }
    update(dt){
        super.update(dt);
        if(this.movementRand <= 0.50){
            this.image = document.getElementById("WhiteSkeletonWalk");
        }else if(this.movementRand > 0.50){
            this.image = document.getElementById("WhiteSkeletonIdle");
        }
    }
    draw(ctx){
        super.draw(ctx);
    }
}