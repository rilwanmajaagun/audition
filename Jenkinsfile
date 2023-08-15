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
          image 'node:18.17.1-alpine3.18'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        npm cache clean --force
        sh 'npm install'
        sh 'npm run test'
      }
    }
  }
}
