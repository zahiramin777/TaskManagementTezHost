import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authScreenAtom from '../Atoms/authAtom'
import userAtom from '../Atoms/userAtom'
  
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false)
    const setUser=useSetRecoilState(userAtom);
    const setAuthScreen=useSetRecoilState(authScreenAtom);
    const[inputs,setinputs]=useState({
        name:"",
        username:"",
        email:"",
        password:"",
    })
    const toast=useToast();
    const handleSignup=async()=>{
        console.log(inputs);
        try {
        
           const res=await fetch("/api/users/signup",{
            method:"POST",
            headers:{
                "content-Type":"application/json",
            },
            body:JSON.stringify(inputs),
           })
           const data=await res.json();
           if(data.error){
            toast({
                title:"Error",
                description: data.error,
                status:"error",
                duration: 3000
            });
            return;

           }
           localStorage.setItem("user-threads",JSON.stringify(data));
           setUser(data);
            }
            catch{
                toast({
                    title:"Error",
                    description: data.error,
                    status:"error",
                    duration: 3000
                });

            }
        }
    

  
    return (
        <div className='h-screen flex-1 p-7 mt-[70px] w-full'>
            <div className="max-w-[500px] bg-white mx-auto">


      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input type="text" onChange={(e)=>setinputs({...inputs,name:e.target.value})} value={inputs.name} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired >
                    <FormLabel>Username</FormLabel>
                    <Input type="text" onChange={(e)=>setinputs({...inputs,username:e.target.value})} value={inputs.username} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(e)=> setinputs({...inputs, email:e.target.value})} value={inputs.email} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={(e)=>setinputs({...inputs, password: e.target.value})} value={inputs.password} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue("gray.600","gray.700")}
                  color={'white'}
                  _hover={{
                      bg: useColorModeValue("gray.700","gray.800"),
                    }}
                  onClick={handleSignup}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link onClick={()=>setAuthScreen("login")} color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
                    </div>
             </div>
    )
  }