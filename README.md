# 🚀 CI/CD Pipeline Using Jenkins + Docker

A complete beginner-friendly project demonstrating how to build a Continuous Integration and Continuous Deployment (CI/CD) pipeline using **Jenkins**, **Docker**, **GitHub**, and **AWS EC2**.

---

# 📌 Project Overview

This project automates the deployment process by:

- Pulling source code from GitHub
- Building a Docker image
- Removing the old running container
- Deploying the latest application automatically

---

# 🏗️ Project Architecture

```
Developer
     │
     ▼
 GitHub Repository
     │
     ▼
 Jenkins Pipeline
     │
     ▼
 Docker Build
     │
     ▼
 Docker Container Deployment
```

---

# 🛠️ Technologies Used

- Jenkins
- Docker
- Git & GitHub
- Node.js
- Ubuntu Linux
- AWS EC2

---

# 📋 Prerequisites

Before starting, ensure you have:

- Ubuntu Server / AWS EC2
- Java 17
- Docker
- Git
- GitHub Account
- Internet Connection

---

# ☕ Install Java

```bash
sudo apt update
sudo apt install fontconfig openjdk-21-jre
```

Verify:

```bash
java -version
```

---

# ⚙️ Install Jenkins

Add Jenkins Repository

```bash
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins
```

Install Jenkins

```bash
sudo apt update
sudo apt install jenkins -y
```

Enable Jenkins

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

Check status

```bash
sudo systemctl status jenkins
```

---

# 🐳 Install Docker

```bash
sudo apt install docker.io -y
```

Enable Docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

Verify

```bash
docker --version
```

---

# 🔐 Allow Jenkins to Use Docker

```bash
sudo usermod -aG docker jenkins
```

Restart services

```bash
sudo systemctl restart docker
sudo systemctl restart jenkins
```

Test

```bash
sudo su - jenkins
docker ps
```

---

# 🌐 Access Jenkins

Open

```
http://YOUR_SERVER_IP:8080
```

Get the administrator password

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Install the suggested plugins.

---

# 📂 Create Node.js Application

Create project folder

```bash
mkdir myapp
cd myapp
```

Create

- app.js
- package.json

Install dependencies

```bash
npm install
```

Run application

```bash
node app.js
```

Open

```
http://YOUR_PUBLIC_IP:3000
```

---

# 🐳 Create Dockerfile

```dockerfile
FROM node:18

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["node","app.js"]
```

Build image

```bash
docker build -t myapp .
```

Run container

```bash
docker run -d -p 3000:3000 --name mycontainer myapp
```

---

# 📤 Push Project to GitHub

```bash
git init

git add .

git commit -m "Initial Commit"

git branch -M main

git remote add origin YOUR_GITHUB_REPOSITORY

git push -u origin main
```

---

# 🔧 Create Jenkins Pipeline

1. Open Jenkins
2. New Item
3. Pipeline
4. Pipeline Script from SCM
5. Select Git
6. Enter GitHub Repository URL
7. Branch → main
8. Save

---

# 📄 Sample Jenkinsfile

```groovy
pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-repository.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp:v1 .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f myapp-container || true'
            }
        }

        stage('Deploy Container') {
            steps {
                sh 'docker run -d --name myapp-container -p 3000:3000 myapp:v1'
            }
        }
    }
}
```

---

# 🔗 Configure GitHub Webhook

GitHub Repository

```
Settings
    ↓
Webhooks
    ↓
Add Webhook
```

Payload URL

```
http://YOUR_JENKINS_IP:8080/github-webhook/
```

Content Type

```
application/json
```

Events

```
Just the push event
```

Save.

---

# 🔓 AWS Security Group

Allow the following inbound ports:

| Port | Purpose |
|------|----------|
| 8080 | Jenkins |
| 3000 | Node.js App |
| 22 | SSH |

---

# ✅ Verify Deployment

Open

```
http://YOUR_PUBLIC_IP:3000
```

Expected Output

```
CI/CD Pipeline Working!
```

---

# 📦 Useful Docker Commands

List containers

```bash
docker ps
```

List images

```bash
docker images
```

View logs

```bash
docker logs myapp-container
```

Stop container

```bash
docker stop myapp-container
```

Remove container

```bash
docker rm myapp-container
```

---

# 🔄 CI/CD Workflow

```
Developer
     │
     ▼
Push Code
     │
     ▼
GitHub
     │
     ▼
Webhook
     │
     ▼
Jenkins Pipeline
     │
     ▼
Clone Repository
     │
     ▼
Build Docker Image
     │
     ▼
Remove Old Container
     │
     ▼
Deploy New Container
     │
     ▼
Application Updated
```

---

# 🚀 Future Improvements

- SonarQube Integration
- Trivy Security Scan
- DockerHub Push
- Kubernetes Deployment
- Helm Charts
- Terraform
- Ansible
- Prometheus Monitoring
- Grafana Dashboard
- GitHub Actions
- ArgoCD GitOps

---

# 👨‍💻 Author

**Pradeep Kumar C R**

---

# 📄 License

This project is created for educational and learning purposes.
