/** 
 * A list of all model APIs natively supported by ChainForge. 
 */
export enum LLM {
    // OpenAI Chat
    OpenAI_ChatGPT = "gpt-3.5-turbo",
    OpenAI_ChatGPT_16k = "gpt-3.5-turbo-16k",
    OpenAI_ChatGPT_16k_0613 = "gpt-3.5-turbo-16k-0613",
    OpenAI_ChatGPT_0301 = "gpt-3.5-turbo-0301",
    OpenAI_ChatGPT_0613 = "gpt-3.5-turbo-0613",
    OpenAI_GPT4 = "gpt-4",
    OpenAI_GPT4_0314 = "gpt-4-0314",
    OpenAI_GPT4_0613 = "gpt-4-0613",
    OpenAI_GPT4_32k = "gpt-4-32k",
    OpenAI_GPT4_32k_0314 = "gpt-4-32k-0314",
    OpenAI_GPT4_32k_0613 = "gpt-4-32k-0613",

    // OpenAI Text Completions
    OpenAI_Davinci003 = "text-davinci-003",
    OpenAI_Davinci002 = "text-davinci-002",

    // Azure OpenAI Endpoints
    Azure_OpenAI = "azure-openai",

    // Dalai-served models (Alpaca and Llama)
    Dalai_Alpaca_7B = "alpaca.7B",
    Dalai_Alpaca_13B = "alpaca.13B",
    Dalai_Llama_7B = "llama.7B",
    Dalai_Llama_13B = "llama.13B",
    Dalai_Llama_30B = "llama.30B",
    Dalai_Llama_65B = "llama.65B",

    // Anthropic
    Claude_v1 = "claude-v1",
    Claude_v1_0 = "claude-v1.0",
    Claude_v1_2 = "claude-v1.2",
    Claude_v1_3 = "claude-v1.3",
    Claude_v1_instant = "claude-instant-v1",

    // Google models
    PaLM2_Text_Bison = "text-bison-001",  // it's really models/text-bison-001, but that's confusing
    PaLM2_Chat_Bison = "chat-bison-001",
}


/** LLM APIs often have rate limits, which control number of requests. E.g., OpenAI: https://platform.openai.com/account/rate-limits
#   For a basic organization in OpenAI, GPT3.5 is currently 3500 and GPT4 is 200 RPM (requests per minute).
#   For Anthropic evaluaton preview of Claude, can only send 1 request at a time (synchronously).
#   This 'cheap' version of controlling for rate limits is to wait a few seconds between batches of requests being sent off.
#   If a model is missing from below, it means we must send and receive only 1 request at a time (synchronous).
#   The following is only a guideline, and a bit on the conservative side.  */
export const RATE_LIMITS: { [key in LLM]?: [number, number] } = {
  [LLM.OpenAI_ChatGPT]: [30, 10],  // max 30 requests a batch; wait 10 seconds between
  [LLM.OpenAI_ChatGPT_0301]: [30, 10],
  [LLM.OpenAI_GPT4]: [4, 15],  // max 4 requests a batch; wait 15 seconds between
  [LLM.OpenAI_GPT4_0314]: [4, 15],
  [LLM.OpenAI_GPT4_32k]: [4, 15],
  [LLM.OpenAI_GPT4_32k_0314]: [4, 15],
  [LLM.PaLM2_Text_Bison]: [4, 10],  // max 30 requests per minute; so do 4 per batch, 10 seconds between (conservative)
  [LLM.PaLM2_Chat_Bison]: [4, 10],
};