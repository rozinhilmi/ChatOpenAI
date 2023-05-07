import { Configuration,OpenAIApi } from 'openai'
const conf = new Configuration(
  {
    apiKey:'secret key'
  }
)
const openai = new OpenAIApi(conf)
openai.createChatCompletion({
    model:'gpt-3.5-turbo',
    messages:[{
      role:'user',
      content:'Hello!'
    }]
  }
).then(
  (res) => {
    const answer = res.data.choices[0].message.content
    console.log(answer)
  }
)