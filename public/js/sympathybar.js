export default class SympathyBar {
    robustHealthLevel = 100;

    constructor(scene, x, y)
    {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;
        this.draw();

        scene.add.existing(this.bar);
    }
    
    increaseForWhite (amount)
    {
        this.value -= amount;
        if (this.value < 0)
        {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    }

    increaseForBlack (amount) {
      this.value += amount;    
      if (this.value > this.robustHealthLevel)
        {
            this.value = this.robustHealthLevel;
        }
        this.draw();
        return (this.value === 0);  
    }

    draw ()
    {
        this.bar.clear();
        //border
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 32, 6);
        //  Health bar
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 28, 2);
        switch (Math.floor(this.value/20)) {
            case 0:
            {
                this.bar.fillStyle(0x000000);
            }
            
            case 1:
            {
                this.bar.fillStyle(0x0f0f0f);
            }

            case 2:
            {
                this.bar.fillStyle(0x6f6f6f);
            }

            case 3: 
            {
                this.bar.fillStyle(0xafafaf)
            }

            case 4:
            {
                this.bar.fillStyle(0xffffff);
            }    
        }
        var d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    }
}