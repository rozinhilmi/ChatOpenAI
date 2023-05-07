import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../store'
import { Input,InputGroup,InputLeftElement,InputRightElement,IconButton, Spinner} from '@chakra-ui/react'
import { ChatIcon,ArrowForwardIcon } from '@chakra-ui/icons'
import { Configuration,OpenAIApi } from 'openai'


const ChatInput = ()=>{
  let inputValue = useSelector((state)=>state.inputValue) 
  let executeOnProgress = useSelector((state)=>state.executeOnProgress)
  const dispatch = useDispatch();
  const conf = new Configuration(
    {
      apiKey:'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'
    }
  )
  const openai = new OpenAIApi(conf)
  const askOpenAi = async () => {
    event.preventDefault()
    dispatch(actions.editInputValue({inputValue:''}))
    dispatch(actions.toggleExecuteProgress({value:true}))
    dispatch(actions.setLoadingInput({value:inputValue}))
    dispatch(actions.appendOpenAIChats({
      role:'user',
      content:inputValue
    }))
    document.getElementsByClassName('chat-box')[0].style.marginBottom = '300px'
    window.scrollTo(0, document.body.scrollHeight)

    
    await openai.createChatCompletion(
      {
        model:"gpt-3.5-turbo",
        messages:[
          {
            role:'user',
            content: inputValue
          }
        ]
      }
    ).then((res)=>{
      // console.log(res.data.status);
          let answer = res.data.choices[0]
          console.log(answer.message.role)
          console.log(answer.message.content)
          dispatch(actions.appendOpenAIChats({
            role:answer.message.role,
            content:answer.message.content
          }))
          dispatch(actions.toggleExecuteProgress({value:false}))
          document.getElementsByClassName('chat-box')[0].style.marginBottom = '100px'
          window.scrollTo(0,document.body.scrollHeight)
          
        
        }
      ).catch((e) => {
          alert(e)
          dispatch(actions.shiftOpenAIChat())
          dispatch(actions.toggleExecuteProgress({value:false}))
          document.getElementsByClassName('chat-box')[0].style.marginBottom = '100px'
          window.scrollTo(0,document.body.scrollHeight) 

        });
  }
  return(
    <form  action="" style={{ marginLeft:'15%'}} onSubmit={ ()=>{
        askOpenAi() }}>
      <InputGroup sx={{ zIndex:3,width:'70%',position:'fixed',bottom:5,backgroundColor:'white',boxShadow:'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
        <InputLeftElement
          pointerEvents='none'
          children={<ChatIcon color='blue.500' />}
        />
        <Input id='chatInput' type='text' value={inputValue} placeholder='ask everythings here' onChange={(e)=>{ dispatch(actions.editInputValue({inputValue:e.target.value})) }} />
        <InputRightElement
          children={
            <IconButton
              colorScheme='blue'
              aria-label='Search database'
              icon={
                executeOnProgress === true?
                <Spinner size='sm' />
                : <ArrowForwardIcon color='white' />
              }
              onClick={
                ()=>{
                  askOpenAi()
                }
              }
            />
          }
        />
      </InputGroup>
    </form>
  )
}

export default ChatInput