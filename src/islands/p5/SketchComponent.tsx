import type p5Types from "p5";
import { useEffect, useState } from "react";
import Sketch from "react-p5";

export const SketchComponent = () => {
  const preload = (p5: p5Types) => {
    // 画像などのロードを行う
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    // p5でいうsetupの処理を書く
  };

  const draw = (p5: p5Types) => {
    // p5でいうdrawの処理を書く
  };

  const windowResized = (p5: p5Types) => {
    // コンポーネントのレスポンシブ化
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      windowResized={windowResized}
    />
  );
};

const Wrapper = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return <>{isMounted && <SketchComponent />}</>;
};

export default Wrapper;
