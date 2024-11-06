import * as React from 'react';
import { useRef, useState } from 'react';
import {
  ArrayInput,
  Cell,
  DivideAndConquerContainer,
  EmptySpacer,
  Row,
} from '../../../styles/sorting/quicksort.style.ts';
import { wait } from '../../../utils/promise.utils.ts';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

const stringToArray = (s) => {
  if (s.length > 0) {
    return s
      .split(/[, ]+/)
      .map(Number)
      .filter((n) => !isNaN(n));
  }
};

const removeZerosFromArray = (a: number[]) => {
  if (a.length > 0) {
    return a.filter((item) => item != 0);
  }
  return a;
};

const QuickSortEmptySpaceRecursion = ({
  partitions,
  level,
  showPivots,
  setSolvedList,
  solvedList,
  solvedLevelsArray,
}) => {
  const [tempStore, setTempStore] = useState<string>('');
  const [currentTempType, setCurrentTempType] = useState<string>('');
  const [isWrongAnswer, setIsWrongAnswer] = useState<string>('');
  const [isCorrectAnswer, setCorrectArray] = useState<string>('');
  const [isRowCorrect, setIsRowCorrect] = useState<boolean>(false);

  const leftID = `level-${level}-left`;
  const pivotID = `level-${level}-pivot`;
  const rightID = `level-${level}-right`;

  const leftArray = useRef<number[]>([]);
  const pivotArray = useRef<number[]>([]);
  const rightArray = useRef<number[]>([]);

  const handleAbort = (arrayType, expectedArray, event, part) => {
    if (event.type == 'blur' || event.key == 'Enter') {
      if (tempStore.length <= 0) return;

      const tempArr = removeZerosFromArray(stringToArray(tempStore));
      const emptyString = '';

      switch (arrayType) {
        case leftID:
          handleCheck(arrayType, expectedArray, removeZerosFromArray(stringToArray(tempStore)), part);

          leftArray.current = tempArr;
          setTempStore(emptyString);
          setCurrentTempType(emptyString);

          checkRow(part);
          break;
        case pivotID:
          handleCheck(arrayType, expectedArray, removeZerosFromArray(stringToArray(tempStore)), part);

          pivotArray.current = tempArr;
          setTempStore('');
          setCurrentTempType('');

          checkRow(part);
          break;
        case rightID:
          handleCheck(arrayType, expectedArray, removeZerosFromArray(stringToArray(tempStore)), part);

          rightArray.current = tempArr;
          setTempStore('');
          setCurrentTempType('');
          checkRow(part);
          break;
      }
    }
    checkRow(part);
  };

  const checkRow = (part) => {
    if (partitions.length == 0) return false;

    if (
      (partitions[0].left.length <= 0 || JSON.stringify(partitions[0].left) == JSON.stringify(leftArray.current)) &&
      (partitions[0].pivot.length <= 0 || JSON.stringify(partitions[0].pivot) == JSON.stringify(pivotArray.current)) &&
      (partitions[0].right.length <= 0 || JSON.stringify(partitions[0].right) == JSON.stringify(rightArray.current))
    ) {
      updateSolvedLevelsArray(part);
      setIsRowCorrect(true);
      return true;
    }
    return false;
  };

  const handleCheck = async (arrayType, expectedArray, workingArray, part) => {
    if (isCorrectAnswer || isWrongAnswer) return null;

    if (JSON.stringify(expectedArray) == JSON.stringify(workingArray)) {
      setCorrectArray(arrayType);
      checkRow(part);
    } else {
      setIsWrongAnswer(arrayType);
    }
    await wait(2000);
    setCorrectArray('');
    setIsWrongAnswer('');
  };

  const updateSolvedLevelsArray = (part) => {
    const thisOb = solvedList.find((item) => item.uuid == part.uuid);
    console.log('finding...', thisOb);

    const tempSolved = [...solvedList.filter((item) => item.uuid !== part.uuid)];
    console.log('filtering...', tempSolved);

    tempSolved.push({ uuid: thisOb.uuid, isSolved: true });
    console.log('pushing...', tempSolved);

    console.log('setting...');
    setSolvedList(tempSolved);
    // solvedLevelsArray.current = tempSolvedLevelsArr;
  };

  const handleSelect = (arrayType, array) => {
    if (tempStore.length == 0 && currentTempType.length == 0 && array.length > 0) {
      setTempStore(array.join(', '));
      setCurrentTempType(arrayType);
    }
  };

  const handleChange = (arrayType, event) => {
    setTempStore(event.target.value);
    setCurrentTempType(arrayType);
  };

  const calcWidth = (n, p) => {
    return (n / (p.left.length + p.pivot.length + p.right.length)) * 100;
  };

  if (!partitions || partitions.length === 0) return <></>;

  return (
    <DivideAndConquerContainer>
      {partitions.map((part) => {
        const leftSpacer = ((part.rightPartitions[0] && part.rightPartitions[0].leftPartitions) ||
          (part.rightPartitions[0] && part.rightPartitions[0].rightPartitions)) != undefined && <EmptySpacer />;
        const rightSpacer = ((part.leftPartitions[0] && part.leftPartitions[0].leftPartitions) ||
          (part.leftPartitions[0] && part.leftPartitions[0].rightPartitions)) != undefined && <EmptySpacer />;

        return (
          <Row level={level} style={{ position: 'relative' }}>
            {isRowCorrect && (
              <CheckCircleTwoToneIcon
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  color: 'green',
                  background: 'white',
                  borderRadius: 20,
                }}
              />
            )}
            <Cell
              style={{
                background: part.left.length == 0 && 'gray',
                width: `${calcWidth(part.left.length, part)}%`,
              }}
            >
              {part.left.length > 0 && (
                <ArrayInput
                  disabled={isRowCorrect}
                  value={currentTempType == leftID ? tempStore : leftArray.current.join(', ')}
                  onBlur={(e) => handleAbort(leftID, part.left, e, part)}
                  onAbort={(e) => handleAbort(leftID, part.left, e, part)}
                  onKeyDown={(e) => handleAbort(leftID, part.left, e, part)}
                  onChange={(e) => handleChange(leftID, e)}
                  onSelect={() => handleSelect(leftID, leftArray)}
                  style={{
                    animation:
                      isWrongAnswer == leftID
                        ? 'wrong 2s ease-in-out'
                        : isCorrectAnswer == leftID
                          ? 'correct 2s ease-in-out'
                          : null,
                  }}
                />
              )}
              {rightSpacer == undefined && leftSpacer}
              {part.leftPartitions && (
                <QuickSortEmptySpaceRecursion
                  showPivots={showPivots}
                  partitions={part.leftPartitions}
                  level={level + 1}
                  setSolvedList={setSolvedList}
                  solvedList={solvedList}
                  solvedLevelsArray={solvedLevelsArray}
                />
              )}
            </Cell>

            <Cell
              style={{
                background: part.pivot.length == 0 && 'gray',
                width: `${calcWidth(1, part)}%`,
              }}
            >
              {part.pivot.length > 0 && (
                <ArrayInput
                  disabled={isRowCorrect}
                  value={currentTempType == pivotID ? tempStore : pivotArray.current.join(', ')}
                  onBlur={(e) => handleAbort(pivotID, part.pivot, e, part)}
                  onAbort={(e) => handleAbort(pivotID, part.pivot, e, part)}
                  onKeyDown={(e) => handleAbort(pivotID, part.pivot, e, part)}
                  onChange={(e) => handleChange(pivotID, e)}
                  onSelect={() => handleSelect(pivotID, pivotArray)}
                  style={{
                    borderColor: showPivots && '#e2001a',
                    animation:
                      isWrongAnswer == pivotID
                        ? 'wrong 2s ease-in-out'
                        : isCorrectAnswer == pivotID
                          ? 'correct 2s ease-in-out'
                          : null,
                  }}
                />
              )}
            </Cell>

            <Cell
              style={{
                background: part.right.length == 0 && 'gray',
                width: `${calcWidth(part.right.length, part)}%`,
              }}
            >
              {part.right.length > 0 && (
                <ArrayInput
                  disabled={isRowCorrect}
                  value={currentTempType == rightID ? tempStore : rightArray.current.join(', ')}
                  onBlur={(e) => handleAbort(rightID, part.right, e, part)}
                  onAbort={(e) => handleAbort(rightID, part.right, e, part)}
                  onKeyDown={(e) => handleAbort(rightID, part.right, e, part)}
                  onChange={(e) => handleChange(rightID, e)}
                  onSelect={() => handleSelect(rightID, rightArray)}
                  style={{
                    animation:
                      isWrongAnswer == rightID
                        ? 'wrong 2s ease-in-out'
                        : isCorrectAnswer == rightID
                          ? 'correct 2s ease-in-out'
                          : null,
                  }}
                />
              )}
              {rightSpacer}
              {part.rightPartitions && (
                <QuickSortEmptySpaceRecursion
                  showPivots={showPivots}
                  partitions={part.rightPartitions}
                  level={level + 1}
                  setSolvedList={setSolvedList}
                  solvedList={solvedList}
                  solvedLevelsArray={solvedLevelsArray}
                />
              )}
            </Cell>
          </Row>
        );
      })}
    </DivideAndConquerContainer>
  );
};

export default QuickSortEmptySpaceRecursion;
