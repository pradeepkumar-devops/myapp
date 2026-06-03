# CI/CD Pipeline Using Jenkins and Docker

## Project Overview

This project demonstrates a complete CI/CD (Continuous Integration and Continuous Deployment) pipeline using Jenkins, Docker, GitHub, and AWS EC2.

The pipeline automatically:

* Pulls source code from GitHub
* Builds a Docker image
* Stops the old container
* Deploys a new container
* Makes the latest version of the application available

---

## Architecture

```text
Developer
    ↓
GitHub
    ↓
GitHub Webhook
    ↓
Jenkins
    ↓
Docker Build
    ↓
Docker Container Deployment
    ↓
Application Live
```

---

## Technologies Used

* Jenkins
* Docker
* GitHub
* Node.js
* AWS EC2
* Ubuntu Linux
* Git

---

## Project Structure

```text
myapp/
├── app.js
├── package.json
├── Dockerfile
├── Jenkinsfile
└── README.md
```

---

## Application Code

### app.js

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.write("CI/CD Pipeline Working!");
    res.end();
});

server.listen(3000);

console.log("Server running on port 3000");
```

### package.json

```json
{
  "name": "myapp",
  "version": "1.0.0",
  "main": "app.js"
}
```

---

## Dockerfile

```dockerfile
FROM node:18

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

---

## Jenkins Pipeline

```groovy
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/your-username/myapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp:latest .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker stop myapp-container || true'
                sh 'docker rm myapp-container || true'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker run -d -p 3000:3000 --name myapp-container myapp:latest'
            }
        }
    }
}
```

---

## AWS Security Group Configuration

| Port | Purpose     |
| ---- | ----------- |
| 22   | SSH         |
| 8080 | Jenkins     |
| 3000 | Application |

---

## Useful Commands

### Check Containers

```bash
docker ps
```

### Check Images

```bash
docker images
```

### View Logs

```bash
docker logs myapp-container
```

### Stop Container

```bash
docker stop myapp-container
```

---

## CI/CD Workflow

1. Developer pushes code to GitHub
2. GitHub Webhook triggers Jenkins
3. Jenkins pulls latest source code
4. Docker image is built
5. Existing container is removed
6. New container is deployed
7. Application becomes available automatically

---

## Future Enhancements

* SonarQube Integration
* DockerHub Integration
* Terraform Infrastructure Automation
* Kubernetes Deployment
* Prometheus Monitoring
* Grafana Dashboards
* GitOps with ArgoCD

---

## Author

Pradeep Kumar

---

## License

This project is created for learning and educational purposes.
