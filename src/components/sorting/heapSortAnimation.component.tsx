import { Slider } from '@mui/material';
import * as React from 'react';
import { useRef, useState } from 'react';
import { wait } from '../../utils/promise.utils.ts';
import { AlgorithmSection, Button } from '../../styles/general/generic.style.ts';
import { ButtonPanel, ControlPanel, KeyIndexContainer, SliderPanel } from '../../styles/sorting/insertionSort.style.ts';
import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTranslation } from 'react-i18next';

import TextUpdaterNode from '../general/textUpdater.component.tsx';
import {
  HeapSortAnimationVisualsContainer,
  NodeChartIndex,
  NodeChartValue,
  NodeTreeContainer,
  NodeValueIndexChart,
  SingleNodeValueIndexContainer,
} from '../../styles/sorting/heapSort.style.ts';
import { heapSortAnimationEdges, initialHeapSortAnimationNodes } from '../../static/initialData/heapSort.static.tsx';

const connectionLineStyle = { stroke: '#fff' };

const nodeTypes = { textUpdater: TextUpdaterNode };

const HeapSortAnimation = () => {
  const { t } = useTranslation();
  const delay = 1000;

  const [nodes, setNodes] = useState(initialHeapSortAnimationNodes);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isShuffling, setIsShuffeling] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [infoText, setInfoText] = useState<string>(t('sorting.heap.animation.initialMessage'));

  const exitRequestRef = useRef<boolean>(false);
  const pauseRequestRef = useRef<boolean>(false);
  const speedRequestRef = useRef<number>(1);
  const stepRequestRef = useRef<boolean>(false);

  async function shuffleNodes() {
    let shuffledNodes = [...initialHeapSortAnimationNodes];
    const length = shuffledNodes.length;

    for (let i = 0; i < length; i++) {
      const randomIndex1 = Math.floor(Math.random() * length);
      const randomIndex2 = Math.floor(Math.random() * length);
      const randomIndex3 = Math.floor(Math.random() * length);

      shuffledNodes = shuffledNodes.map((node, index) => {
        if (index === randomIndex1) {
          return { ...node, data: { ...node.data, isFocused: true, isRed: true, isYellow: false, isBlue: false } };
        } else if (index === randomIndex2) {
          return { ...node, data: { ...node.data, isFocused: true, isRed: false, isYellow: true, isBlue: false } };
        } else if (index === randomIndex3) {
          return { ...node, data: { ...node.data, isFocused: true, isRed: false, isYellow: false, isBlue: true } };
        } else {
          return { ...node, data: { ...node.data, isFocused: false, isYellow: false, isRed: false, isBlue: false } };
        }
      });

      setNodes([...shuffledNodes]);
      await wait(250);

      const temp = shuffledNodes[randomIndex1].data.value;
      shuffledNodes[randomIndex1].data.value = shuffledNodes[randomIndex2].data.value;
      shuffledNodes[randomIndex2].data.value = shuffledNodes[randomIndex3].data.value;
      shuffledNodes[randomIndex3].data.value = temp;

      shuffledNodes = shuffledNodes.map((node) => ({
        ...node,
        data: { ...node.data, isRed: false, isBlue: false, isYellow: false, isFocused: false },
      }));
      setNodes([...shuffledNodes]);
    }

    setNodes([...shuffledNodes]);
    setInfoText(t('sorting.heap.animation.shufflingFinished'));
  }

  const performShuffle = async () => {
    setIsShuffeling(true);
    setInfoText(t('sorting.heap.animation.shuffling'));

    await shuffleNodes();

    setIsShuffeling(false);
    setIsSorted(false);
    setInfoText(t('sorting.heap.animation.shufflingFinished'));
  };

  const heapSort = async () => {
    let tempNodes = [...nodes];
    const n = tempNodes.length;

    for (let i = Math.floor(n / 2); i > 0; i--) {
      tempNodes = [...(await heapify([...tempNodes], n, i))];
    }

    for (let i = n; i > 0; i--) {
      setInfoText(t('sorting.heap.animation.extractingMax'));
      tempNodes = tempNodes.map((node, index) => {
        if (i - 1 == index) {
          return {
            ...node,
            data: {
              ...node.data,
              isFocused: true,
              isRed: true,
              isYellow: false,
              isBlue: false,
            },
          };
        }

        if (index == 0) {
          return {
            ...node,
            data: {
              ...node.data,
              isFocused: true,
              isYellow: true,
              isRed: false,
              isBlue: false,
            },
          };
        }

        return node;
      });
      setNodes([...tempNodes]);
      await stepPauseWaitRequest();

      setInfoText(t('sorting.heap.animation.swappingNodes', { 
        value1: tempNodes[0].data.value, 
        value2: tempNodes[i - 1].data.value 
      }));
      [tempNodes[0].data.value, tempNodes[i - 1].data.value] = [tempNodes[i - 1].data.value, tempNodes[0].data.value];

      await stepPauseWaitRequest();

      setInfoText(t('sorting.heap.animation.placingExtracted', { value: tempNodes[i - 1].data.value }));
      tempNodes = tempNodes.map((node, index) => {
        if (index + 1 == i / 2 || index + 1 == (i + 1) / 2) {
          return {
            ...node,
            data: {
              ...node.data,
              isConnectableEnd: false,
              isFocused: false,
              isYellow: false,
              isRed: false,
            },
          };
        }

        if (index == i - 1) {
          return {
            ...node,
            data: {
              ...node.data,
              isSorted: true,
              isFocused: false,
              isYellow: false,
              isRed: false,
            },
          };
        }

        return {
          ...node,
          data: {
            ...node.data,
            isFocused: false,
            isYellow: false,
            isRed: false,
          },
        };
      });

      setNodes([...tempNodes]);
      await stepPauseWaitRequest();

      tempNodes = [...(await heapify([...tempNodes], i - 1, 1))];
    }

    tempNodes[0].data.isSorted = true;
    setNodes([...tempNodes]);
    setIsSorted(true);
  };

  async function heapify(tempNodes, n, i) {
    let largest = i;
    const left = 2 * i;
    const right = 2 * i + 1;

    if (n <= i) {
      setInfoText(t('sorting.heap.animation.outOfBounds'));
    }

    if (!tempNodes[left - 1] && !tempNodes[right - 1]) {
      setInfoText(t('sorting.heap.animation.noChildren'));
    }

    if (tempNodes[largest - 1]) {
      setInfoText(t('sorting.heap.animation.lookingAtNode', { value: tempNodes[largest - 1].data.value }));
      tempNodes = tempNodes.map((node) => {
        const id = Number.parseInt(node.id);

        if (id == largest) {
          return {
            ...node,
            data: {
              ...node.data,
              isFocused: true,
              isYellow: true,
              isRed: false,
              isBlue: false,
            },
          };
        }

        return node;
      });

      setNodes([...tempNodes]);
      await stepPauseWaitRequest();
    }

    setInfoText(t('sorting.heap.animation.comparingWithChildren', { parentValue: tempNodes[largest - 1].data.value }));
    tempNodes = tempNodes.map((node) => {
      const id = Number.parseInt(node.id);
      if (id == largest) {
        return node;
      }

      if (id == left || id == right) {
        return {
          ...node,
          data: {
            ...node.data,
            isFocused: true,
            isYellow: false,
            isRed: false,
            isBlue: true,
          },
        };
      }

      return {
        ...node,
        data: {
          ...node.data,
          isFocused: false,
          isYellow: false,
          isRed: false,
          isBlue: false,
        },
      };
    });

    setNodes([...tempNodes]);
    await stepPauseWaitRequest();

    if (left <= n && tempNodes[left - 1].data.value > tempNodes[largest - 1].data.value) {
      largest = left;
      setNodes([...tempNodes]);
      await stepPauseWaitRequest();
    }

    if (right <= n && tempNodes[right - 1].data.value > tempNodes[largest - 1].data.value) {
      largest = right;
      setNodes([...tempNodes]);
      await stepPauseWaitRequest();
    }

    tempNodes = tempNodes.map((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          isFocused: false,
          isYellow: false,
          isRed: false,
          isBlue: false,
        },
      };
    });

    if (largest !== i) {
      setInfoText(t('sorting.heap.animation.swappingNodes', { 
        value1: tempNodes[i - 1].data.value, 
        value2: tempNodes[largest - 1].data.value 
      }));
      tempNodes[largest - 1].data.isRed = true;
      tempNodes[largest - 1].data.isFocused = true;
      tempNodes[i - 1].data.isYellow = true;
      tempNodes[i - 1].data.isFocused = true;

      setNodes([...tempNodes]);
      await stepPauseWaitRequest();

      const tempVal = tempNodes[i - 1].data.value;
      tempNodes[i - 1].data.value = tempNodes[largest - 1].data.value;
      tempNodes[largest - 1].data.value = tempVal;

      tempNodes = tempNodes.map((node) => {
        return {
          ...node,
          data: {
            ...node.data,
            isFocused: false,
            isYellow: false,
            isRed: false,
            isBlue: false,
          },
        };
      });

      tempNodes[largest - 1].data.isRed = true;
      tempNodes[largest - 1].data.isFocused = true;
      tempNodes[i - 1].data.isYellow = true;
      tempNodes[i - 1].data.isFocused = true;

      setNodes([...tempNodes]);
      await stepPauseWaitRequest();

      tempNodes = tempNodes.map((node) => {
        return {
          ...node,
          data: {
            ...node.data,
            isFocused: false,
            isYellow: false,
            isRed: false,
            isBlue: false,
          },
        };
      });

      setNodes([...tempNodes]);
      await stepPauseWaitRequest();

      setInfoText(t('sorting.heap.animation.heapified', { value: tempNodes[largest - 1].data.value }));
      tempNodes = [...(await heapify([...tempNodes], n, largest))];
    }

    setNodes([...tempNodes]);
    return [...tempNodes];
  }

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
    setInfoText(t('sorting.heap.animation.sortingComplete'));
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
            edges={heapSortAnimationEdges}
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
            <Controls showZoom={false} showInteractive={false} position={'bottom-right'} />
          </ReactFlow>
        </NodeTreeContainer>
        <NodeValueIndexChart>
          {nodes.map((node) => {
            const data = node.data;
            const id = Number.parseInt(node.id);

            return (
              <SingleNodeValueIndexContainer key={`node-${id}`}>
                <NodeChartValue
                  style={{
                    filter: data.isSorted && 'brightness(0.9)',
                    borderLeft: id > 1 && 'none',
                    borderRight: id < 10 && 'dashed',
                    borderTopLeftRadius: id == 1 && 5,
                    borderBottomLeftRadius: id == 1 && 5,
                    borderBottomRightRadius: id == 10 && 5,
                    borderTopRightRadius: id == 10 && 5,
                    backgroundColor: data.isSorted
                      ? 'white'
                      : data.isYellow
                        ? 'rgba(255, 171, 41, 0.8)'
                        : data.isBlue
                          ? 'lightsteelblue'
                          : data.isRed
                            ? 'palevioletred'
                            : 'white',
                    color: data.isSorted ? 'dimgray' : data.isYellow || data.isRed || data.isBlue ? 'white' : 'black',
                    borderColor: data.isSorted
                      ? 'black'
                      : data.isYellow || data.isRed || data.isBlue
                        ? 'black'
                        : 'black', //TODO: Fraglich ob das was bringt
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
            aria-label={t('sorting.animation.common.speedSlider')}
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
            {t('sorting.heap.animation.buttons.shuffle')}
          </Button>
          <Button onClick={performMakeChoice} disabled={isShuffling || isSorted || isSorting}>
            {t('sorting.heap.animation.buttons.sort')}
          </Button>

          {isManual || isPaused ? (
            <Button
              onClick={performMakeAStep}
              disabled={isShuffling || isSorted || !isSorting || (isAnimated && !isPaused)}
            >
              {t('sorting.heap.animation.buttons.step')}
            </Button>
          ) : (
            <Button
              onClick={performStartManual}
              disabled={isManual || isShuffling || isSorted || !isSorting || isAnimated}
            >
              {t('sorting.heap.animation.buttons.manual')}
            </Button>
          )}
          {isAnimated ? (
            isPaused ? (
              <Button onClick={performContinueSorting} disabled={isShuffling || isSorted || !isSorting}>
                {t('sorting.heap.animation.buttons.continue')}
              </Button>
            ) : (
              <Button onClick={performPauseSorting} disabled={isShuffling || isSorted || !isSorting}>
                {t('sorting.heap.animation.buttons.pause')}
              </Button>
            )
          ) : (
            <Button onClick={performStartAnimating} disabled={isSorted || !isSorting || isAnimated}>
              {t('sorting.heap.animation.buttons.animate')}
            </Button>
          )}
        </ButtonPanel>
      </ControlPanel>
    </AlgorithmSection>
  );
};

export default HeapSortAnimation;
