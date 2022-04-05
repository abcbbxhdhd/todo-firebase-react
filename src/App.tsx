import React, { useState } from 'react';
import AuthMiddleware from './middlewares/AuthMiddleware';
import { Navigate, Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView/LoginView';
import RegisterView from './views/RegisterView/RegisterView';
import TodoListView from './views/TodoListView/TodoListView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<RegisterView />} />
      <Route path="/todos" element={<AuthMiddleware><TodoListView /></AuthMiddleware>} />
    </Routes>
  );
}

export default App;
