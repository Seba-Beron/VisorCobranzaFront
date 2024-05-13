pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                bat 'npm install'
                bat 'node --version'
                bat 'ng build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'ng test --no-watch --no-progress --browsers=ChromeHeadless'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
