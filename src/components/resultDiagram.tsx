import { Group } from "react-konva";
import { Result, ResultStore } from "../stores/resultStore";
import { useState } from "react";

const ResultDiagram = () => {
  const resultStore = ResultStore.useContainer();
  const [result, setResult] = useState<Result>();
  return (
    <Group>
      {
        // まずは各circle
        // 続いて、Line
      }
    </Group>
  );
};
export default ResultDiagram;
