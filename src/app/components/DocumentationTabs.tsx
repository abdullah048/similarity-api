'use client';

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs';
import SimpleBar from 'simplebar-react';
import Code from '@/components/Code';
import { nodeJs, python } from '@src/constants/documentation-code';
import 'simplebar-react/dist/simplebar.min.css';

interface DocumentationTabsProps {}

const DocumentationTabs: FC<DocumentationTabsProps> = ({}) => {
  return (
    <Tabs defaultValue='node-js' className='max-w-2xl w-full md:mb-8'>
      <TabsList>
        <TabsTrigger value='node-js'>Node Js</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
      </TabsList>
      <TabsContent value='node-js'>
        <SimpleBar>
          <Code language='javascript' code={nodeJs} show animated />
        </SimpleBar>
      </TabsContent>
      <TabsContent value='python'>
        <SimpleBar>
          <Code language='python' code={python} show animated />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
