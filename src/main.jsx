  import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { RecoilRoot } from 'recoil';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import {extendTheme} from "@chakra-ui/theme-utils";
import {mode} from "@chakra-ui/theme-tools";



// 1. import `ChakraProvider` component
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
const styles={
  global:(props)=>({
    body:{
      color:mode("gray.800", "whiteAlpha.900")(props),
      bg:mode("gray.100","#101010")(props),
    }
  })
}
const config={
  initialColorMode:"dark",
  useSystemColorMode:true
}
const colors={
  gray:{
    light:"#616161",
    dark:"#1e1e1e"
  }
}
const { Button } = chakraTheme.components

const theme=extendTheme({config,styles,colors});

ReactDOM.createRoot(document.getElementById('root')).render(

 <RecoilRoot>
<BrowserRouter>
<ChakraProvider theme={theme}>
    <App />
</ChakraProvider>
</BrowserRouter>
 </RecoilRoot>
  
)