pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Perform build steps (e.g., install dependencies)
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                // Perform tests if available
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy to Linux server in the cloud
                // Example: ssh into server and deploy using Docker
                sh 'ssh user@server "docker-compose up -d"'
            }
        }
    }
}
