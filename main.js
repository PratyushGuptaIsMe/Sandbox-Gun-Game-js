import { Player } from "./player.js";
import { YellowSkeleton, WhiteSkeleton } from "./enemies.js";
import { Grass } from "./backgrounds.js";
window.addEventListener("load", function(){
    const CANVAS = document.getElementById("mainCanvas");
    const ctx = CANVAS.getContext("2d");
    CANVAS.width = 500;
    CANVAS.height = 500;

    class GAME{
        constructor(width, height){
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.fps = 20;
            this.keysArray = [];
            this.groundArea = 200;
            this.debugMode = false;
            this.season = "autumn";

            this.allCurrentEnemies = [new WhiteSkeleton(this)];
            this.backgrounds = new Grass(this);
            this.Player = new Player(this);

            this.enemyTimer = 0;
            this.enemyInterval = 1000;
        }

        #spawnWhiteSkeleton(){
            this.allCurrentEnemies.push(new WhiteSkeleton(this));
        }
        #spawnYellowSkeleton(){
            this.allCurrentEnemies.push(new YellowSkeleton(this));
        }
        spawnEnemy(){
            let rand = Math.random();
            if(rand <= 0.20){
                this.#spawnYellowSkeleton();
            }else if(rand > 0.20 && rand < 1){
                this.#spawnWhiteSkeleton();
            }
        }

        #enemyCollisionChecks(){
            this.allCurrentEnemies.forEach((enemy) => {

                if( enemy.hitbox.x < this.Player.hitbox.x + this.Player.hitbox.w &&
                    enemy.hitbox.x + enemy.hitbox.w > this.Player.hitbox.x &&
                    enemy.hitbox.y < this.Player.hitbox.y + this.Player.hitbox.h &&
                    enemy.hitbox.y + enemy.hitbox.h > this.Player.hitbox.y
                ){
                    enemy.markedForDeletion = true;
                }

            })
        }
        #enemyOperations(){
            for(let i = this.allCurrentEnemies.length - 1; i > -1; i--){
                if(this.allCurrentEnemies[i].markedForDeletion === true){
                    this.allCurrentEnemies.splice(i, 1);
                }
            }
        }

        update(dt){
            this.backgrounds.update(dt);
            this.Player.update(dt);
            this.allCurrentEnemies.forEach((enemy) => {
                enemy.update(dt);
            });
            this.#enemyCollisionChecks();
            this.#enemyOperations();

            if(this.enemyTimer < this.enemyInterval){
                this.enemyTimer = this.enemyTimer + dt;
            }else if(this.enemyTimer >= this.enemyInterval){
                this.spawnEnemy();
                this.enemyTimer = 0;
            }
        }
        draw(ctx){
            this.backgrounds.draw(ctx);
            this.Player.draw(ctx);
            this.allCurrentEnemies.forEach((enemy) => {
                enemy.draw(ctx);
            });
        }
    }

    window.game = new GAME(CANVAS.width, CANVAS.height);

    let l = 0;

    function animationLoop(t){
        let deltaTime = t-l;
        l = t;

        ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animationLoop);
    }
    animationLoop(l);
    window.addEventListener("keydown", (event) => {
        if(!game.keysArray.includes(event.key)){
            game.keysArray.push(event.key);
        }

        if(event.key === "d"){
            game.debugMode = !game.debugMode;
        }
    });
    window.addEventListener("keyup", (event) => {
        if(game.keysArray.includes(event.key)){
            game.keysArray.splice(game.keysArray.indexOf(event.key), 1);
        }
    });
});
