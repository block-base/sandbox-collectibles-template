import p5Types from "p5"; //Import this for typechecking and intellisense
import data from "../data.json";

import Sawarabi from "../fonts/SawarabiMincho-Regular.ttf";
export default function sketch(p5: any) {
  let frameRate = 60;
  let scale = 1.25; // Scale of drawings on canvas
  let flowers: any[] = []; // Array of all flowers
  let myFont: any;
  let index = 0;
  let color = [p5.random(255), p5.random(255), p5.random(255)];

  p5.updateWithProps = (props: any) => {
    index = props.tokenId;
  };

  p5.preload = () => {
    p5.loadFont(Sawarabi, (font: any) => {
      myFont = font;
    });
  };

  p5.setup = () => {
    if (p5.windowWidth > 720) {
      p5.createCanvas(720, 720);
    } else {
      p5.createCanvas(p5.windowWidth, p5.windowWidth).parent("p5-canvas");
    }
    flowers.push(new Flower(p5.width / 2, p5.height / 2, 0.19, p5));
    p5.frameRate(frameRate);
    p5.angleMode(p5.DEGREES);
    console.log(myFont);
    if (index != 23) {
      p5.textFont(myFont);
    }
    p5.textStyle(p5.NORMAL);
  };
  p5.draw = () => {
    p5.background(245);
    if (flowers.length) {
      if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height)
        flowers[0].update(
          p5.map(p5.mouseX, 200, p5.width - 200, -4, 4, true),
          p5.map(p5.mouseY, 200, p5.height - 200, -4, 4, true),
          p5
        );
      flowers[0].bloom(true, p5);
    }
  };
  class Flower {
    x;
    y;
    t;
    bloomTime;
    progress;
    offsetX;
    offsetY;
    angle;
    height;
    radiusScale;
    startColor;
    baseColorSet: number[][] = [];
    constructor(x: number, y: number, sentiment: number, p5: p5Types) {
      this.x = x;
      this.y = y;

      this.t = 0; // For bloom animation
      this.bloomTime = p5.int(0.3 * frameRate * p5.map(sentiment, 0, 1, 1.2, 0.8)); // Total bloom time 1 sec
      this.progress = 0.5;

      this.offsetX = 1; // Offset of char in flower
      this.offsetY = 1.3;
      this.angle = 10; // How many times rotated!
      this.height = 10; // Height in standard size
      this.radiusScale = scale * p5.map(p5.abs(sentiment - 0.5), 0, 0.5, 9, 18); // Size of flower

      this.startColor = p5.random(color);
    }

    bloom(mainFlower: any, p5: p5Types) {
      if (this.progress < 1) {
        this.t++;
      }
      p5.push();
      this.progress = this.t / this.bloomTime;
      p5.textSize(this.radiusScale * this.height * p5.map(this.progress, 0, 1, 0.9, 1));
      p5.translate(this.x, this.y);
      for (let i = p5.floor(this.angle * this.progress) - 1; i >= 0; i--) {
        p5.push();
        p5.fill(0, 0, 0, 225 - 7 * i);
        if (i == 0 && mainFlower) p5.fill(color[0], color[1], color[2], 225);
        p5.rotate((i * 360) / this.angle);
        p5.translate(this.radiusScale * this.offsetX, this.radiusScale * this.offsetY);

        p5.text(data["kanji"][index], 0, 0);
        p5.pop();
      }
      p5.pop();
    }

    update(newOffsetX: number, newOffsetY: number, p5: p5Types) {
      this.offsetX = p5.lerp(this.offsetX, newOffsetX, 0.4);
      this.offsetY = p5.lerp(this.offsetY, newOffsetY, 0.4);
    }

    reset(newX: number, newY: number, newSentiment: number, p5: p5Types) {
      this.x = newX;
      this.y = newY;

      this.t = 0;
      this.bloomTime = p5.int(
        0.3 * frameRate * p5.map(newSentiment, 0, 1, 1.2, 0.8) + p5.random(-frameRate / 6, frameRate / 6)
      );
      this.progress = 0;

      this.radiusScale = scale * p5.map(p5.abs(newSentiment - 0.5), 0, 0.5, 9, 18); // Size of flower
    }
  }
}
