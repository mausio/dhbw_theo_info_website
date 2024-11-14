import { Slider } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import { wait } from '../../utils/promise.utils.ts';
import { AlgorithmSection, Button } from '../../styles/general/generic.style.ts';
import { ButtonPanel, ControlPanel, KeyIndexContainer, SliderPanel } from '../../styles/sorting/insertionSort.style.ts';
import { Background, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TextUpdaterNode from '../general/textUpdater.component.tsx';
import {
  HeapSortAnimationVisualsContainer,
  NodeChartIndex,
  NodeChartValue,
  NodeTreeContainer,
  NodeValueIndexChart,
  SingleNodeValueIndexContainer,
} from '../../styles/sorting/heapSort.style.ts';

const connectionLineStyle = { stroke: '#fff' };

const nodeTypes = { textUpdater: TextUpdaterNode };

const edges = [
  { id: '1-2', source: '1', target: '2', type: 'custom-edge' },
  { id: '1-3', source: '1', target: '3', type: 'custom-edge' },
  { id: '3-6', source: '3', target: '6', type: 'custom-edge' },
  { id: '3-7', source: '3', target: '7', type: 'custom-edge' },
  { id: '2-4', source: '2', target: '4', type: 'custom-edge' },
  { id: '2-5', source: '2', target: '5', type: 'custom-edge' },
  { id: '4-8', source: '4', target: '8', type: 'custom-edge' },
  { id: '4-9', source: '4', target: '9', type: 'custom-edge' },
  { id: '5-10', source: '5', target: '10', type: 'custom-edge' },
];

const initialNodes = [
  {
    id: '1',
    data: {
      value: 1,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableStart: false,
      isConnectableEnd: true,
    },
    position: { x: 160, y: 0 },
    type: 'textUpdater',
  },
  {
    id: '2',
    data: {
      value: 2,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: true,
      isConnectableStart: true,
    },
    position: { x: 80, y: 100 },
    type: 'textUpdater',
  },
  {
    id: '3',
    data: {
      value: 3,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: true,
      isConnectableStart: true,
    },
    position: { x: 240, y: 100 },
    type: 'textUpdater',
  },
  {
    id: '4',
    data: {
      value: 4,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: true,
      isConnectableStart: true,
    },
    position: { x: 40, y: 180 },
    type: 'textUpdater',
  },
  {
    id: '5',
    data: {
      value: 5,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: true,
      isConnectableStart: true,
    },
    position: { x: 120, y: 180 },
    type: 'textUpdater',
  },
  {
    id: '6',
    data: {
      value: 6,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: false,
      isConnectableStart: true,
    },
    position: { x: 200, y: 180 },
    type: 'textUpdater',
  },
  {
    id: '7',
    data: {
      value: 7,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: false,
      isConnectableStart: true,
    },
    position: { x: 280, y: 180 },
    type: 'textUpdater',
  },
  {
    id: '8',
    data: {
      value: 8,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: false,
      isConnectableStart: true,
    },
    position: { x: 0, y: 260 },
    type: 'textUpdater',
  },
  {
    id: '9',
    data: {
      value: 9,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: false,
      isConnectableStart: true,
    },
    position: { x: 80, y: 260 },
    type: 'textUpdater',
  },
  {
    id: '10',
    data: {
      value: 10,
      isYellow: false,
      isRed: false,
      isBlue: false,
      isFocused: false,
      isDisabled: true,
      isConnectableEnd: false,
      isConnectableStart: true,
    },
    position: { x: 160, y: 260 },
    type: 'textUpdater',
  },
];

const HeapSortAnimation = () => {
  const delay = 1000;

  const [nodes, setNodes] = useState<>(initialNodes);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffling, setIsShuffeling] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [infoText, setInfoText] = useState<string>('shuffle, then sort! :)');

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  async function shuffleNodes() {
    let shuffledNodes = [...nodes];

    for (let i = shuffledNodes.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      shuffledNodes = shuffledNodes.map((node) => {
        if (node.id === `${i + 1}`) {
          return { ...node, data: { ...node.data, isRed: false, isBlue: true } };
        } else if (node.id === `${j + 1}`) {
          return { ...node, data: { ...node.data, isRed: false, isBlue: true } };
        } else {
          return { ...node, data: { ...node.data, isRed: false, isBlue: false } };
        }
      });
      setNodes(shuffledNodes);
      await wait(300);

      const temp = shuffledNodes[i].data.value;
      shuffledNodes[i].data.value = shuffledNodes[j].data.value;
      shuffledNodes[j].data.value = temp;

      shuffledNodes = shuffledNodes.map((node) => ({
        ...node,
        data: { ...node.data, isRed: false, isBlue: false },
      }));
      setNodes([...shuffledNodes]);
    }

    setNodes([...shuffledNodes]);
    setInfoText('Shuffling finished. Start sorting!');
  }

  const performShuffle = async () => {
    setInfoText('Shuffling!');

    await shuffleNodes();

    setInfoText('Shuffling finished. Start sorting!');
  };

  const heapSort = async () => {};

  const performHeapSort = async () => {
    setIsSorting(true);
    setIsSorted(false);
    await stepPauseWaitRequest();

    await heapSort();

    setIsManual(false);
    setIsAnimated(false);
    setIsSorting(false);
    exitRequestRef.current = false;
    pauseRequestRef.current = false;
    setIsPaused(false);
    setInfoText('Sorting complete!');
  };

  const performPause = async () => {
    if (pauseRequestRef.current || !stepRequestRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      await performPause();
    }
  };

  const stepPauseWaitRequest = async () => {
    if (!stepRequestRef.current || pauseRequestRef.current) {
      await performPause();
    }
    if (!isManual) {
      await wait(delay / speedRequestRef.current);
    }
    await wait(10);
  };

  const performMakeChoice = async () => {
    setIsSorting(true);

    if (!isManual && isAnimated) {
      exitRequestRef.current = false;
      pauseRequestRef.current = false;
      await performHeapSort();
    }
  };

  const handleSliderChange = (event: Event, value: number) => {
    speedRequestRef.current = value;
  };

  const performStartManual = async () => {
    setIsShuffeling(false);
    setIsManual(true);
    setIsAnimated(false);
    stepRequestRef.current = false;
    pauseRequestRef.current = false;
    speedRequestRef.current = 5;
    await performHeapSort();
  };

  const performStartAnimating = async () => {
    if (isManual) {
      setIsManual(false);
      setIsShuffeling(false);
      setIsAnimated(true);
      stepRequestRef.current = true;
      pauseRequestRef.current = false;
      speedRequestRef.current = 1;
    } else {
      setIsShuffeling(false);
      setIsAnimated(true);
      stepRequestRef.current = true;
      pauseRequestRef.current = false;
      await performHeapSort();
    }
  };

  const performMakeAStep = async () => {
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    await wait(10);
    stepRequestRef.current = false;
  };

  const performPauseSorting = async () => {
    setIsPaused(true);
    pauseRequestRef.current = true;
    stepRequestRef.current = false;
  };

  const performContinueSorting = async () => {
    setIsShuffeling(false);
    setIsAnimated(true);
    setIsSorting(true);
    pauseRequestRef.current = false;
    stepRequestRef.current = true;
    setIsPaused(false);
  };

  return (
    <AlgorithmSection style={{ height: 600 }}>
      <KeyIndexContainer>
        <p>{infoText}</p>
      </KeyIndexContainer>
      <HeapSortAnimationVisualsContainer>
        <NodeTreeContainer>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            fitView={true}
            onlyRenderVisibleElements={true}
            preventScrolling={false}
            connectionLineStyle={connectionLineStyle}
            nodesDraggable={false}
            elementsSelectable={false}
            panOnScroll={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            panOnDrag={false}
            zoomOnDoubleClick={false}
          >
            <Background />
          </ReactFlow>
        </NodeTreeContainer>
        <NodeValueIndexChart>
          {nodes.map((node) => {
            const data = node.data;
            const id = Number.parseInt(node.id);

            return (
              <SingleNodeValueIndexContainer>
                <NodeChartValue
                  style={{
                    borderLeft: id > 1 && 'none',
                    borderRight: id < 10 && 'dashed',
                    borderTopLeftRadius: id == 1 && 5,
                    borderBottomLeftRadius: id == 1 && 5,
                    borderBottomRightRadius: id == 10 && 5,
                    borderTopRightRadius: id == 10 && 5,
                    backgroundColor: data.isYellow
                      ? 'rgba(255, 171, 41, 0.8)'
                      : data.isBlue
                        ? 'lightsteelblue'
                        : data.isRed
                          ? 'palevioletred'
                          : 'white',
                    color: data.isYellow || data.isRed || data.isBlue ? 'white' : 'black',
                    borderColor: data.isYellow || data.isRed || data.isBlue ? 'black' : 'black',
                  }}
                >
                  {data.value}
                </NodeChartValue>
                <NodeChartIndex style={{ borderLeft: id > 1 && 'none' }}>{id}</NodeChartIndex>
              </SingleNodeValueIndexContainer>
            );
          })}
        </NodeValueIndexChart>
      </HeapSortAnimationVisualsContainer>
      <ControlPanel>
        <SliderPanel>
          <Slider
            aria-label="Temperature"
            defaultValue={1}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            disabled={isManual}
            step={0.25}
            min={0.5}
            max={4}
            sx={{ color: '#39576f' }}
          />
        </SliderPanel>
        <ButtonPanel>
          <Button onClick={performShuffle} disabled={isShuffling || isSorting}>
            Shuffle
          </Button>
          <Button onClick={performMakeChoice} disabled={isShuffling || isSorted || isSorting}>
            Sort
          </Button>

          {isManual || isPaused ? (
            <Button
              onClick={performMakeAStep}
              disabled={isShuffling || isSorted || !isSorting || (isAnimated && !isPaused)}
            >
              Step
            </Button>
          ) : (
            <Button
              onClick={performStartManual}
              disabled={isManual || isShuffling || isSorted || !isSorting || isAnimated}
            >
              Manual
            </Button>
          )}
          {isAnimated ? (
            isPaused ? (
              <Button onClick={performContinueSorting} disabled={isShuffling || isSorted || !isSorting}>
                Continue
              </Button>
            ) : (
              <Button onClick={performPauseSorting} disabled={isShuffling || isSorted || !isSorting}>
                Pause
              </Button>
            )
          ) : (
            <Button onClick={performStartAnimating} disabled={isSorted || !isSorting || isAnimated}>
              Animate
            </Button>
          )}
        </ButtonPanel>
      </ControlPanel>
    </AlgorithmSection>
  );
};

export default HeapSortAnimation;
