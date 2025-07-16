// Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'cd backend && npm run build'
            }
        }
    }
}
