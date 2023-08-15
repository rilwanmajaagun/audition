pipeline {
  agent {
        docker {
            image 'node:18.17.1-alpine3.18'
        }
    }

  stages {
    stage('checkout') {
      steps {
        checkout scm 
      }
    }

    stage('Build') {
      steps {   
                sh 'ls'
                sh 'npm install'
      }
    }
  }
}
