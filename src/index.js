
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App-Pinterest/pinterest.css';
import reportWebVitals from './reportWebVitals';
import AppPinerest from './App-Pinterest/pinterest';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <AppPinerest/> 
  </React.StrictMode>
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 

