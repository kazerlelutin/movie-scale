import { SessionProvider } from "next-auth/react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {isMobile} from 'react-device-detect';

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  
  return (
    <SessionProvider session={session}>
      <DndProvider backend={isMobile ? TouchBackend: HTML5Backend} >
        <Component {...pageProps} />
      </DndProvider>
    </SessionProvider>
  );
}
