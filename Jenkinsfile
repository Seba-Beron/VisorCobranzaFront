pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                bat 'npm install'
                bat 'node --version'
                bat 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'npm run testCI'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
