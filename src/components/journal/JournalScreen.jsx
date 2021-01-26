import React from 'react';
import { NoteScreen } from '../notes/NoteScreen';
import { SideBar } from './SideBar';
// import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {
  return (
    <div className="journal__main-content">
      
      <SideBar />
      <main>
        {/* <NothingSelected /> */}
        <NoteScreen />
      </main>

    </div>
  )
}
