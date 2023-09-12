let canvas,
    ctx,
    nP;

const reSizeCV = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.addEventListener('load', () => {
    canvas = document.querySelector('.cv');
    ctx = canvas.getContext('2d');
    reSizeCV();
    nP = new NetworkParticle({
        ctx: ctx,
        width: canvas.width,
        height: canvas.height,
        particleAmount: 128,
        connectDistance: 120,
        targetFPS: 60,
    });
    nP.animate();
});

window.addEventListener('resize', () => {
    reSizeCV();
    nP.cancelAnimation();
    nP.setBound(canvas.width, canvas.height);
    nP.animate();
});

class NetworkParticle{
    #ctx;
    #width;
    #height;
    #particles;
    #particleAmount;
    #connectDistance;
    #timer;
    #interval;
    #lastTime;
    #mousePosition;
    #animation;
    
    constructor({
        ctx,
        width,
        height,
        particleAmount,
        connectDistance,
        targetFPS,
    }){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#particleAmount = particleAmount;
        this.#connectDistance = connectDistance;
        this.#timer = 0;
        this.#interval = 1000 / targetFPS;
        this.#lastTime = 0;
        this.#createParicles();
        this.#mousePosition = {x: 0, y: 0};
        window.addEventListener('mousemove', (e) => {
            this.#mousePosition = {x: e.pageX, y: e.pageY}; 
        });
    }

    #createParicles(){
        this.#particles = [];

        for (let i = 0; i < this.#particleAmount; i++){
            this.#particles.push(new Particle({
                ctx: this.#ctx,
                width: this.#width,
                height: this.#height,
                radius: 5,
                color: 'rgba(255, 255, 255, 1)',
                speed: 2,
            }));
        }
    }

    #connect(a, b, distance){
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = `rgba(255, 255, 255, ${(this.#connectDistance - distance) / this.#connectDistance})`;
        this.#ctx.moveTo(a.x, a.y);
        this.#ctx.lineTo(b.x, b.y);
        this.#ctx.stroke();
    }

    #update(){
        for (let i = 0; i < this.#particleAmount; i++){
            this.#particles[i].draw();
            this.#particles[i].update();

            const mDX = this.#mousePosition.x - this.#particles[i].x,
                mDY = this.#mousePosition.y - this.#particles[i].y,
                  mDistance = (mDX ** 2 + mDY ** 2) / 100;

            if (mDistance > this.#connectDistance * 0.5 && mDistance < this.#connectDistance * 1.3){
                this.#particles[i].force = {
                    x: mDX / 100,
                    y: mDY / 100
                };
            }else{
                this.#particles[i].force.x -= this.#particles[i].force.x * 0.1;
                this.#particles[i].force.y -= this.#particles[i].force.y * 0.1;
            }

            for (let j = this.#particleAmount - 1; j > i; j--){
                const dx = this.#particles[i].x - this.#particles[j].x,
                    dy = this.#particles[i].y - this.#particles[j].y,
                      distance = (dx ** 2 + dy ** 2) / 100;

                if (distance > this.#connectDistance){
                    continue;
                }

                this.#connect({
                    x: this.#particles[i].x,
                    y: this.#particles[i].y,
                }, {
                    x: this.#particles[j].x,
                    y: this.#particles[j].y,
                },
                    distance);
            }
        }
    }
    
    animate(timeStamp = 0){
        const deltaTime = timeStamp - this.#lastTime;
        this.#lastTime = timeStamp;

        if (this.#timer > this.#interval){
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.#update();
        }else{
            this.#timer += deltaTime;
        }

        this.#animation = requestAnimationFrame(this.animate.bind(this));
    }

    cancelAnimation(){
        cancelAnimationFrame(this.#animation);
    }

    setBound(width, height){
        this.#width = width;
        this.#height = height;
        this.#particles.forEach(x => x.setBound(width, height));
    }
}

class Particle{
    x;
    y;
    force;
    #ctx;
    #width;
    #height;
    #radius;
    #color;
    #velocity;
    
    constructor({
        ctx,
        width,
        height,
        radius,
        color,
        speed,
    }){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#radius = radius;
        this.#color = color;
        this.#velocity = {
            x: (Math.random() - 0.5) * speed,
            y: (Math.random() - 0.5) * speed,
        };
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.force = {x: 0, y: 0};
    }

    draw(){
        this.#ctx.beginPath();
        this.#ctx.fillStyle = this.#color;
        this.#ctx.arc(this.x, this.y, this.#radius, 0, 2 * Math.PI);
        this.#ctx.fill();
    }

    update(){
        const x = this.#radius * 2;
        
        if (this.x > this.#width + x || this.x < -x){
            this.#velocity.x *= -1;
        }

        if (this.y > this.#height + x || this.y < -x){
            this.#velocity.y *= -1;
        }
        
        this.x += this.#velocity.x + this.force.x;
        this.y += this.#velocity.y + this.force.y;
    }

    setBound(width, height){
        this.#width = width;
        this.#height = height;
    }
}