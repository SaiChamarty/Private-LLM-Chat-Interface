# Private-LLM-Chat-Interface

## Structure of this Application
### UI of the Chat Interface
The UI of the chat interface is similar to other AI applications with chats on the left and the actual interface on the right. This UI is completely generated using AI assisted workflows.  

### LLM Inference
The LLM in this case is meant to be for emotional talk and conversation flow. I plan to use Gemma 4 for this as it has the best open source metrics and size for my hardware specs:  
- NVIDIA RTX 5070ti (16GB VRAM)
- Intel Ultra 7 with 64 GB RAM

#### Process of setting up inference
As this is a large model with 27B to 31B parameters, it will need quantization and hardware optimization.  
Before that, we will do the following:  
- Install Docker and create a container
- Run Gemma 4 on Ollama
