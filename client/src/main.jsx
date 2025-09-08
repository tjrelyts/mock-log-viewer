// Tyler Santosuosso

import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LogViewer from './LogViewer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogViewer />
  </StrictMode>,
)
