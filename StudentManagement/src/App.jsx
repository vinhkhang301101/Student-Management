// import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRoutes } from 'react-router-dom';
import { routers } from './routers';
import { message } from 'antd';

message.config({
  maxCount: 3
})

function App() {
  const element = useRoutes(routers());

  return (
    <>
      {element}
    </>
  );
}

export default App
