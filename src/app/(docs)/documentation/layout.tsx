import { FC, ReactNode } from 'react';

interface DocumentationLayoutProps {
  children: ReactNode;
}

const DocumentationLayout: FC<DocumentationLayoutProps> = ({ children }) => {
  return <section className='pt-20'>{children}</section>;
};

export default DocumentationLayout;
