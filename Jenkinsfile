// Jenkinsfile groovy file [Consumed by Jenkins Job]
pipeline {
    agent any
    
    stages {
        // CI
         stage('Checkout') {
            steps {
                // Checkout code from a Git repository
                checkout([$class: 'GitSCM', branches: [[name: 'main']], userRemoteConfigs: [[url: 'https://github.com/sagarrajkule/Moleculer-Demo-App.git']]])
            }
        }
        stage('Build') {
            steps {
                // Perform build steps (install dependencies)
                sh 'docker build -t moleculer-demo-app .'
            }
        }
        stage('Test') {
            steps {
                // Perform tests if available
                sh 'npm test'
            }
        }
        // End of CI

        // CD
        stage('Deploy') {
            steps {
                // Deploy to Linux/EC2 server in the cloud (ssh into server and deploy using Docker)
                sh 'docker run -d -p 3000:3000 moleculer-demo-app' // sh 'ssh -i server.pem user@server "docker run -p 3000:3000 moleculer-demo-app"' 
            }
        }
        // End of CD
    }
}
