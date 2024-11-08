import * as React from 'react';
import { useState } from 'react';
import { Button, CodeContainer, Fader } from '../../styles/general/generic.style.ts';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CodeBlockElement = ({ code, isFaderOn, height }) => {
  const containerHeight = 500;

  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    });
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <CodeContainer
      style={{
        maxHeight: isExpanded ? '100%' : height ? height : containerHeight,
        height: isExpanded ? '100%' : height ? height : containerHeight,
        transition: 'ease 1s',
      }}
    >
      {isFaderOn && (
        <Fader
          onClick={handleToggle}
          style={{
            background: isExpanded
              ? 'transparent'
              : ' linear-gradient(to bottom, transparent 78%, color-mix(in srgb, #39576f, black 48%) 97%)',
          }}
        />
      )}
      <CodeBlock code={code} language={'js'} theme={themes.oneDark}>
        <div
          style={{
            position: 'relative',
            maxHeight: isExpanded ? '100%' : containerHeight,
            height: isExpanded ? '100%' : containerHeight,
            transition: 'ease 1s',
            overflow: 'hidden',
          }}
          className="relative"
        >
          <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg">
            <div className="table-row">
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              <CodeBlock.LineContent className="table-cell">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          </CodeBlock.Code>
        </div>
      </CodeBlock>
      {isFaderOn && (
        <Button
          disabled={false}
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 15,
            right: 65,
            width: 40,
            height: 40,
            minWidth: 40,
            borderRadius: 12,
          }}
          onClick={handleToggle}
        >
          {isExpanded ? <ExpandLessIcon style={{ color: 'black' }} /> : <ExpandMoreIcon style={{ color: 'black' }} />}
        </Button>
      )}
      <Button
        style={{
          position: 'absolute',
          zIndex: 2,
          top: 15,
          right: 15,
          width: 40,
          height: 40,
          minWidth: 40,
          borderRadius: 12,
        }}
        onClick={copyCode}
      >
        {isCopied ? <CheckIcon style={{ color: 'black' }} /> : <ContentCopyIcon style={{ color: 'black' }} />}
      </Button>
    </CodeContainer>
  );
};

export default CodeBlockElement;
