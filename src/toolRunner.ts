import type OpenAI from 'openai'
import {
  generateImage,
  generateImageToolDefination,
} from './tools/generateImage'
import { reddit, redditToolDefination } from './tools/reddit'
import { dadJoke, dadJokeToolDefination } from './tools/dad.Joke'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case generateImageToolDefination.name:
      return generateImage(input)
    case redditToolDefination.name:
      return reddit(input)
    case dadJokeToolDefination.name:
      return dadJoke(input)
    default:
      return `Never run this tool: ${toolCall.function.name} again, or else`
  }
}
