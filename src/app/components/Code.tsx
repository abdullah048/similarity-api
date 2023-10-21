'use client';

import { FC, useEffect, useState } from 'react';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import darkTheme from 'prism-react-renderer/themes/vsDark';
import lightTheme from 'prism-react-renderer/themes/nightOwlLight';
interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}

const Code: FC<CodeProps> = ({
  code,
  animated,
  show,
  animationDelay,
  language,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState<string>(animated ? '' : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      let timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);
        return () => clearInterval(intervalId);
      }, animationDelay ?? 150);

      return () => clearTimeout(timeoutId);
    }
  }, [show, animated, code, animationDelay]);

  // calculate number of lines to determine height...
  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = applicationTheme === 'light' ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} theme={theme} language={language} code={text}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            'transition-all w-fit bg:transparent duration-100 py-0 no-scrollbar'
          }
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}>
          {tokens.map((line, index) => {
            const { key, ...rest } = getLineProps({ line, key: index });
            return (
              <div
                key={`line-${index}`}
                style={{
                  position: 'relative',
                }}
                {...rest}>
                {line.map((token, innerIndex) => {
                  const { key, ...props } = getTokenProps({
                    token,
                    key: innerIndex,
                  });
                  return <span key={innerIndex} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
