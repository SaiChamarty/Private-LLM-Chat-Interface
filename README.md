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
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
- Install NVIDIA toolkit to the host server. So when we pass in the command `--gpus=all` command, apt understands to let the individual container to use the graphics card hardware.
```
# Add the package repositories
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# Install the toolkit
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```
- Run Gemma 4 on Ollama, specifically within a container with GPU access. We also map a volume so we don't have to re-download the Gemma model every time the container restarts. By mapping a volume, it essentially means when the container is deleted, the downloaded weights of the model stay in a safe folder. 
```
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

docker exec -it ollama ollama run gemma2:9b
```
Now the model is running on port 11434  

#### Architecture of the application:
```
React UI -> FastAPI Middleware -> Docker Ollama Run
```
