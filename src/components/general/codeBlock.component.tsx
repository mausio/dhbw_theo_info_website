import * as React from 'react';
import { useState } from 'react';
import { Button, CodeContainer } from '../../styles/generic.style.ts';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const CodeBlockElement = ({ code: code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); // Reset after 2 seconds
    });
  };

  return (
    <CodeContainer>
      <CodeBlock code={code} language={'js'} theme={themes.oneDark}>
        <div style={{ position: 'relative' }} className="relative">
          <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg">
            <div className="table-row">
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              <CodeBlock.LineContent className="table-cell">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          </CodeBlock.Code>
        </div>

        <Button
          style={{
            position: 'absolute',
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
      </CodeBlock>
    </CodeContainer>
  );
};

export default CodeBlockElement;
