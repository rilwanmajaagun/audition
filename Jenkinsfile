pipeline {
  agent {
        docker {
            image 'node:18.17.1-alpine3.18'
             args '-u 0:0'
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
                sh 'npm install -g npm@latest'
                sh 'npm install'
                sh 'npm run test'
      }
    }
  }
}
