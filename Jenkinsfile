pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        checkout scm 
      }
    }

    stage('Test') {
      agent {
        docker {
          image 'node:18-alpine'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {   
                sh 'npm cache clean --force '
                sh 'rm -rf node_modules'
                sh 'npm install'
      }
    }
  }
}
