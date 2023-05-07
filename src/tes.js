import { Configuration,OpenAIApi } from 'openai'
const conf = new Configuration(
  {
    apiKey:'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'
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