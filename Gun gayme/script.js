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

            this.allCurrentEnemies = [new YellowSkeleton(this), new WhiteSkeleton(this)];
            this.backgrounds = new Grass(this);
            this.Player = new Player(this);
        }
        update(dt){
            this.backgrounds.update(dt);
            this.Player.update(dt);
            this.allCurrentEnemies.forEach((enemy) => {
                enemy.update(dt);
            });
        }
        draw(ctx){
            this.backgrounds.draw(ctx);
            this.Player.draw(ctx);
            this.allCurrentEnemies.forEach((enemy) => {
                enemy.draw(ctx);
            });
        }
    }
    const game = new GAME(CANVAS.width, CANVAS.height);

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
