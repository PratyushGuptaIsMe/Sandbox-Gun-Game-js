export class Player{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.currentImage = document.getElementById("idle");
        this.maxFrameX = 3;
        this.frameX = 0;
        this.frameY = 0;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.game.fps;
        this.keysPressed = this.game.keysArray;
        this.groundMargin = this.game.groundArea;
        
        this.ammunition = 10;
        this.canShoot = true;
        this.canReload = true;
        this.shootingAnimationRunning = false;
        this.reloadAnimationRunning = false;
        this.howLongShouldShootingLast = 1000; //ms how long is animation
        this.howLongShouldReloadingLast = 1000; //ms how long is animation
        this.shootInterval = 1000;  //shooting cooldown
        this.shootTimer = 0;
        this.reloadInterval = 1000;  //shooting cooldown
        this.reloadTimer = 0;
        this.replenishThisValueOfAmmo = 2;
        this.projectileX = 200;
        this.projectileSpeed = 8.2;
        this.walkingSpeed = 5;
        
        this.gunHeight = this.y + 175 + this.groundMargin;

        this.flipImage = false;
    }
    update(dt){
        this.gunHeight = this.y + 175 + this.groundMargin;

        /*
        if(this.x + 100 < 0){
            this.x = -100;
        }
        if(this.x + 100 + this.spriteWidth/2 > this.game.canvasWidth){
            this.x = this.game.canvasWidth - this.spriteWidth/2 - 100;
        }
        if(this.y + 110 + this.groundMargin < 0){
            this.y = - this.groundMargin - 110;
        }
        if(this.y + this.groundMargin + 10 + this.spriteHeight + 22 > this.game.canvasHeight - this.spriteHeight/2 - 22){
            this.y = 55;
        }
            */

        if(this.ammunition > 10){
            this.ammunition = 10;
        }
        
        if(this.keysPressed.includes("ArrowLeft") &&
         !this.reloadAnimationRunning &&
         !this.shootingAnimationRunning){
            this.x -= this.walkingSpeed;
            this.currentImage = document.getElementById("walking");
            this.flipImage = true;
            this.maxFrameX = 11;
        }
        if(this.keysPressed.includes("ArrowRight") &&
            !this.reloadAnimationRunning &&
            !this.shootingAnimationRunning){
            this.x += this.walkingSpeed;
            this.currentImage = document.getElementById("walking");
            this.flipImage = false;
            this.maxFrameX = 11;
        }
        if(this.keysPressed.includes("ArrowUp") &&
            !this.reloadAnimationRunning &&
            !this.shootingAnimationRunning){
            this.y -= this.walkingSpeed;
            this.currentImage = document.getElementById("walking");
            this.maxFrameX = 11;
        }
        if(this.keysPressed.includes("ArrowDown") &&
            !this.reloadAnimationRunning &&
            !this.shootingAnimationRunning){
            this.y += this.walkingSpeed;
            this.currentImage = document.getElementById("walking");
        }
        if(!this.keysPressed.includes("ArrowLeft") &&
           !this.keysPressed.includes("ArrowRight") &&
           !this.keysPressed.includes("ArrowUp") &&
           !this.keysPressed.includes("ArrowDown")){

            this.currentImage = document.getElementById("idle");
            this.maxFrameX = 5;
        }
        if(this.keysPressed.includes(" ") && 
            this.canShoot === true &&
            !this.reloadAnimationRunning){
                this.frameX = 0;
                this.maxFrameX = 2;
                this.currentImage = document.getElementById("aimedshotpnd");
                this.ammunition--;
                //decrease ammo
                this.canShoot = false;
                //reset canShoot
                this.shootingAnimationRunning = true;
                setTimeout(() => {this.shootingAnimationRunning = false}, this.howLongShouldShootingLast);
        }

        if(this.shootingAnimationRunning){
            this.currentImage = document.getElementById("aimedshotpnd");
            this.canShoot = false;
            this.maxFrameX = 3;
            if(true /*condition for bulletcollision with enemy*/){
                //collision detected
            }else{
                //collision not detected
            }
        }
        if(this.ammunition <= 0){
            this.canShoot = false;
        } 
        if(this.canShoot === false &&
        !this.shootingAnimationRunning){
            if(this.shootTimer >= this.shootInterval){
                this.shootTimer = 0;
                if(this.ammunition > 0){
                    this.canShoot = true;
                }
            }else{
                this.shootTimer += dt;
            }
        }
        if(this.keysPressed.includes("r") &&
            this.canReload === true &&
            !this.shootingAnimationRunning){
            this.ammunition += this.replenishThisValueOfAmmo;
            this.reloadAnimationRunning = true;
            this.canReload = false;
            setTimeout(() => {this.reloadAnimationRunning = false}, this.howLongShouldReloadingLast);
        }
        if(this.reloadAnimationRunning === true){
            this.currentImage = document.getElementById("reloadingpng");
            this.maxFrameX = 11;
        }
        if(this.canReload === false &&
            !this.reloadAnimationRunning){
            if(this.reloadTimer > this.reloadInterval){
                this.reloadTimer = 0;
                if(this.ammunition < 10){
                    this.canReload = true;
                }
            }else{
                this.reloadTimer += dt;
            }
        }


        if(this.frameTimer < this.frameInterval){
            this.frameTimer += dt;
        }else{
            
            this.frameX += 1;
            if(this.frameX > this.maxFrameX){
                this.frameX = 0;
            }
            this.frameTimer = 0;
        }
    }
    draw(ctx){
        ctx.fillStyle = "yellow";

        if(this.flipImage === true){
            ctx.save();
            ctx.translate(this.game.canvasWidth, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.currentImage,
                        this.frameX * this.spriteWidth,
                        this.frameY * this.spriteHeight, 
                        this.spriteWidth,
                        this.spriteHeight,
                        this.game.canvasWidth - this.x - this.spriteWidth*2,
                        this.y + this.groundMargin,
                        this.spriteWidth*2,
                        this.spriteHeight*2
                );
            if(this.shootingAnimationRunning){
                ctx.fillRect(this.x + this.projectileX, this.gunHeight, 25, 10);
                this.projectileX += this.projectileSpeed;
            }else{
                this.projectileX = 175;
            }
            ctx.restore();

        }else{
            ctx.drawImage(this.currentImage,
                        this.frameX * this.spriteWidth,
                        this.frameY * this.spriteHeight, 
                        this.spriteWidth,
                        this.spriteHeight,
                        this.x, 
                        this.y + this.groundMargin,
                        this.spriteWidth*2,
                        this.spriteHeight*2
            );
            if(this.shootingAnimationRunning){
                ctx.fillRect(this.x + this.projectileX, this.gunHeight, 25, 10);
                this.projectileX += this.projectileSpeed;
            }else{
                this.projectileX = 175;
            }
        }

        if(this.game.debugMode === true){
            ctx.strokeRect(this.x + 100, this.y + this.groundMargin + 110, this.spriteWidth/2, this.spriteHeight + 22);
            ctx.strokeRect(this.x + 100, this.gunHeight, 1000, 1);
            ctx.save();
            ctx.strokeStyle = "grey";
            ctx.strokeRect(this.x + 100, this.gunHeight, -1000, 1);
            ctx.restore();
            if(this.shootingAnimationRunning){
                ctx.strokeRect(this.x + this.projectileX, this.gunHeight, 25, 10)
            }
        }
        ////////////227//////////////////////////////////////////////////////////
    }
}