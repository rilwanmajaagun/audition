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
        }
      }
      steps {   
                sh 'npm cache clean --force '
                sh 'npm update'
                sh 'npm install'
      }
    }
  }
}
