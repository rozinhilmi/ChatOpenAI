import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { ChakraProvider } from '@chakra-ui/react'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
  
)
