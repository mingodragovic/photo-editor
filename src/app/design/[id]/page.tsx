"use client";

import { useRef, useEffect } from "react";
import * as fabric from "fabric";
import { useQuery } from "convex/react";
import { redirect, useParams } from "next/navigation";

import { Tools } from "@/components/design/tools";
import { ImSpinner6 } from "react-icons/im";
import Header from "@/components/design/header/Index";
import Sidebar from "@/components/design/sidebar";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { api } from "../../../../convex/_generated/api";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { useCanvas } from "@/store/useCanvas";

const Design = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvas, setCanvas } = useCanvas();
  const { activeElement, setActiveElement, setActiveElements } =
    useActiveElementStore();
  const { isOnline } = useNetworkStatusStore();
  const { id } = useParams();
  const { data } = useCurrentUser();

  if (!data) {
    redirect("");
  }

  const design = useQuery(api.design.getDesign, { id: id as string });

  if (design === null) redirect("/dashboard");

  const width = design?.width;
  const height = design?.height;

  const handleStringChange = (
    property: keyof fabric.Object,
    value: string | boolean | number
  ) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set(property, value);
        if (property === "padding") activeObject.setCoords();
        canvas.requestRenderAll();
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const FabricCanvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
      width: width,
      height: height,
      backgroundColor: "#f0f0f0",
    });

    FabricCanvas.loadFromJSON(design?.json).then((canvas) =>
      canvas.requestRenderAll()
    );

    setCanvas(FabricCanvas);

    const updateSelectedObject = () => {
      const activeObject = FabricCanvas.getActiveObject();
      if (activeObject) {
        setActiveElement(activeObject as fabric.Object & fabric.ITextProps);
      } else {
        setActiveElement(null);
      }
    };

    const updateSelectedObjects = () => {
      const selectedObjects = FabricCanvas.getActiveObjects();
      if (!selectedObjects) {
        setActiveElements(null);
      } else {
        setActiveElements(
          selectedObjects as (fabric.Object & fabric.ITextProps)[]
        );
      }
    };

    FabricCanvas.on("selection:created", updateSelectedObjects);
    FabricCanvas.on("selection:updated", updateSelectedObjects);
    FabricCanvas.on("selection:cleared", () => setActiveElements(null));

    FabricCanvas.on("selection:created", updateSelectedObject);
    FabricCanvas.on("selection:updated", updateSelectedObject);
    FabricCanvas.on("selection:cleared", updateSelectedObject);

    return () => {
      FabricCanvas.dispose();
    };
  }, [width, height]);

  handleStringChange("cornerColor", "#8B3DFF");
  handleStringChange("cornerStyle", "circle");
  handleStringChange("borderColor", "#8B3DFF");
  handleStringChange("padding", 10);
  handleStringChange("transparentCorners", false);

  useEffect(() => {
    if (!canvas) return;
    canvas.selection = isOnline;
    canvas.getObjects().forEach((object) => {
      object.selectable = isOnline;
      object.evented = isOnline;
    });
  }, [isOnline]);

  return (
    <div className="h-full flex flex-col">
      <Header design={design} />
      <div className="relative h-[calc(100%-70px)] w-full top-[80px] flex">
        {isOnline && <Sidebar design={design} />}
        <main className="flex-1 overflow-auto relative flex flex-col">
          {activeElement && isOnline && <Tools />}
          {design === undefined ? (
            <div className="flex justify-center items-center h-[40vh]">
              <ImSpinner6 className="size-10 animate-spin" />
            </div>
          ) : (
            <div className="flex-1 h-[calc(100%-124px)] flex items-center justify-center bg-white ml-4 p-8">
              <div className="relative inline-block shadow-lg border border-gray-200 rounded-lg overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  height={height} 
                  width={width}
                  className="block"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default Design;