import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as fabric from "fabric";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createFilter = (value: string) => {
  let effect;
  switch (value) {
    case "greyscale":
      effect = new fabric.filters.Grayscale();
      break;
    case "polaroid":
      // @ts-ignore
      effect = new fabric.filters.Polaroid();
      break;
    case "sepia":
      effect = new fabric.filters.Sepia();
      break;
    case "kodachrome":
      // @ts-ignore
      effect = new fabric.filters.Kodachrome();
      break;
    case "contrast":
      effect = new fabric.filters.Contrast({ contrast: 0.3 });
      break;
    case "brightness":
      effect = new fabric.filters.Brightness({ brightness: 0.8 });
      break;
    case "brownie":
      // @ts-ignore
      effect = new fabric.filters.Brownie();
      break;
    case "vintage":
      // @ts-ignore
      effect = new fabric.filters.Vintage();
      break;
    case "technicolor":
      // @ts-ignore
      effect = new fabric.filters.Technicolor();
      break;
    case "pixelate":
      effect = new fabric.filters.Pixelate();
      break;
    case "invert":
      effect = new fabric.filters.Invert();
      break;
    case "blur":
      effect = new fabric.filters.Blur();
      break;
    case "sharpen":
      effect = new fabric.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "emboss":
      effect = new fabric.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case "removecolor":
      // @ts-ignore
      effect = new fabric.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case "blacknwhite":
      // @ts-ignore
      effect = new fabric.filters.BlackWhite();
      break;
    case "vibrance":
      // @ts-ignore
      effect = new fabric.filters.Vibrance({
        vibrance: 1,
      });
      break;
    case "blendcolor":
      effect = new fabric.filters.BlendColor({
        color: "#00ff00",
        mode: "multiply",
      });
      break;
    case "huerotate":
      effect = new fabric.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case "resize":
      effect = new fabric.filters.Resize();
      break;
    case "gamma":
      // @ts-ignore
      effect = new fabric.filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
    case "saturation":
      effect = new fabric.filters.Saturation({
        saturation: 0.7,
      });
      break;
    default:
      effect = null;
      return;
  }

  return effect;
};

export function downloadFile(
  file: string,
  type: "png" | "pdf" | "svg" | "json" | "jpeg" | "webp",
  name: string
) {
  const anchorElement = document.createElement("a");

  anchorElement.href = file;
  anchorElement.download = `${name}.${type}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
}

export function transformToText(objects: any) {
  if (!objects) return;

  objects.forEach((item: any) => {
    if (item.objects) {
      transformToText(item.objects);
    } else {
      item.type === "text" && item.type === "textbox";
    }
  });
}

export function parseLinearGradientString(
  gradient: string,
  canvas: fabric.Canvas
) {
  const angleMatch = gradient.match(/linear-gradient\((\d+)deg/);
  const angle = angleMatch ? parseInt(angleMatch[1]) : 0;

  const colorStopMatches = [
    ...gradient.matchAll(/(rgba?\([^)]+\)|#[0-9a-fA-F]+)\s+([\d.]+)%/g),
  ];

  const colorStops = colorStopMatches.map(([_, color, offset]) => ({
    color,
    offset: parseFloat(offset) / 100,
  }));

  // Convert angle to x2/y2 based on canvas dimensions
  const radians = (angle * Math.PI) / 180;
  const x2 = Math.cos(radians) * canvas.width!;
  const y2 = Math.sin(radians) * canvas.height!;

  return new fabric.Gradient({
    type: "linear",
    coords: {
      x1: 0,
      y1: 0,
      x2,
      y2,
    },
    colorStops,
  });
}