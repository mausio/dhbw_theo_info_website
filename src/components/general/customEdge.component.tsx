import { BaseEdge, getBezierPath, getSmoothStepPath, getStraightPath, Position } from '@xyflow/react';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return <BaseEdge id={id} path={edgePath} />;
}
