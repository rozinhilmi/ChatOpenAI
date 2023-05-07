import { createSlice, configureStore } from '@reduxjs/toolkit';
const states = createSlice({
  name: 'states',
  initialState: {
    inputValue : '',
    loadingInput:'',
    openAIChats:[
      
    ],
    executeOnProgress : false,
    marginBottomChatBox:'100px'
  },
  reducers: {
    editInputValue: (state,action)=>{
      state.inputValue = action.payload.inputValue
    },
    appendOpenAIChats: (state,action)=>{
      state.openAIChats.unshift(
        {
          role:action.payload.role,
          content:action.payload.content
        }
      )
    },
    shiftOpenAIChat:(state)=>{
      state.openAIChats.shift()
    },
    setLoadingInput:(state,action) =>{
      state.loadingInput = action.payload.value
    },
    toggleExecuteProgress: (state,action) =>{
      state.executeOnProgress = action.payload.value
      state.marginBottomChatBox = '300px'
      
    },
    resetMarginBottomChatBoxValue:(state)=>{
      state.marginBottomChatBox = '100px'
    }

  }
})

export const actions = states.actions;
const store = configureStore({
  reducer : states.reducer
})

export default store;