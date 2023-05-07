
import { useDispatch, useSelector } from 'react-redux'

import { Card, CardBody, Text, Box,Heading,StackDivider,Skeleton,Spinner } from '@chakra-ui/react'

import "./assets/style.css"

import Navbar from "./Components/Navbar"
import ChatInput from './Components/ChatInput'
function App() {
  const openAIChats = useSelector((state)=>state.openAIChats)
  const executeOnProgress = useSelector((state)=>state.executeOnProgress)

  
  return(
    <div className='main'>
      <Navbar />
      
      <div className='chat-box'>
        
        {
          (openAIChats.length != 0) ?
            openAIChats.map(
              (chat)=>
                (chat.role == 'user') ?
                  <Card sx={{ marginBottom:'10px',minWidth:'200px',maxWidth:'80%',width:'auto',alignSelf:'flex-end'}}>
                    <CardBody divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' color='blue.500' textTransform='uppercase' sx={{ textAlign:'end' }}>
                          You
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                          {chat.content}
                        </Text>
                      </Box>
                    </CardBody>
                  </Card>
                :
                <Card sx={{ marginBottom:'10px',minWidth:'200px',maxWidth:'80%',width:'auto',alignSelf:'flex-start'}}>
                  <CardBody divider={<StackDivider />} spacing='4'>
                    <Box>
                      <Heading size='xs' color='blue.500' textTransform='uppercase'>
                        AI
                      </Heading>
                      <Text pt='2' fontSize='sm'>
                        {chat.content}
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              
                
            ).reverse()
            :null
        }
        {
          executeOnProgress === true?
            <Card sx={{ marginBottom:'10px',minWidth:'200px',width:'auto',alignSelf:'flex-start'}}>
              <CardBody divider={<StackDivider />} spacing='4'>
                <Box>
                  <Skeleton height='15px' sx={{ marginBottom:'10px',width:'50px' }} />
                  <Skeleton height='30px' />
                </Box>
              </CardBody>
            </Card>
          :
          null
        }
      </div>
      <ChatInput />
    </div>
  );
}

export default App

