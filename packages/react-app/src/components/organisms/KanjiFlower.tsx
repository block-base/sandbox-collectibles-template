import React from "react";
import { ReactP5Wrapper } from "./P5Wrapper";
import sketch from "./sketch";

interface KanjiFlowerProps {
  index: string;
}

export const KanjiFlower: React.FC<KanjiFlowerProps> = ({ index }) => {
  const [rotation, setRottation] = React.useState(0);

  return (
    <>
      <div id="p5-canvas"></div>
      <input
        type="number"
        onChange={(event) => {
          console.log(rotation);

          setRottation(Number(event.target.value));
        }}
      ></input>
      <ReactP5Wrapper sketch={sketch} tokenId={Number(index)} />
    </>
  );
};
