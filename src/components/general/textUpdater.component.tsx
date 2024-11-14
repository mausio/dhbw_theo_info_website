import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  if (!data || !data.value) {
    return <></>;
  }

  return (
    <div
      className="text-updater-node"
      style={{
        width: 32,
        height: 31,
        transition: '0.3s ease-out',
        transform: data.isYellow || data.isRed || data.isBlue ? 'scale(1.05)' : 'scale(1)',
        border: data.isYellow
          ? '1px solid rgba(255, 171, 41, 1)'
          : data.isBlue
            ? '1px solid lightsteelblue'
            : data.isRed
              ? '1px solid palevioletred'
              : '1px solid black',
        boxShadow: data.isYellow
          ? 'rgba(255, 171, 41, 0.8) 0 0 8px 4px'
          : data.isBlue
            ? 'lightsteelblue 0 0 8px 4px'
            : data.isRed
              ? 'palevioletred 0 0 8px 4px'
              : 'transparent 0 0 0 0',
        borderRadius: 25,
      }}
    >
      {data.isConnectableStart && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={false}
          draggable={false}
          style={{
            borderColor: data.isYellow && 'rgba(255, 171, 41, 0.8)',
          }}
        />
      )}
      <div>
        <input
          disabled={data.isDisabled}
          value={data.value}
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          style={{
            width: 24,
            height: 25,
            textAlign: 'center',
            fontWeight: 'bolder',
            color: data.isYellow && 'rgba(255, 171, 41, 1)',
            borderRadius: 25,
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            fontSize: '1rem',
          }}
        />
      </div>
      {data.isConnectableEnd && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={false}
          style={{
            borderColor: data.isYellow && 'blue',
          }}
        />
      )}
    </div>
  );
}

export default TextUpdaterNode;
