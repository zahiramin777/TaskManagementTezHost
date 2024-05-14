import Sidebar from './Components/Sidebar';
import "./App.css";
import Header from './Components/Header';
import {useRecoilValue} from "recoil";
import userAtom from './Atoms/userAtom';
import {Navigate, Route,Routes} from "react-router-dom";
import Homepage from './Pages/Homepage';
import AuthPage from './Pages/Authpage';
import { Toast } from '@chakra-ui/react';
import { useToast, Box } from "@chakra-ui/react";
import AddTask from './Pages/AddTask';
import { useEffect } from 'react';

const App = () => {
  const user=useRecoilValue(userAtom);
  const toast = useToast();
  const showNotification = (title) => {
    toast({
      title: title,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
  if (user) {
    showNotification("logged in successfully");
  }
  else{
    showNotification("logged out successfully")
  }
  

 

  console.log(user);
  return (
    <div className='flex'>
    <Sidebar/>
    <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path='/Add' element={<AddTask/>}/>
    <Route path="/Add" element={!user ? <AuthPage/> : <AddTask/>} />
    <Route path="/Auth" element={!user? <AuthPage/>: <Navigate to ="/Add"/>}/>
     
    </Routes>
    </div>
   
  );
};

export default App
