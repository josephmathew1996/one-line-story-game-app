import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StoryList from './components/StoryList';
import CreateStory from './components/CreateStory';
import StoryDetails from './components/StoryDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StoryList />} />
  </Routes>
  );
}

export default App;
