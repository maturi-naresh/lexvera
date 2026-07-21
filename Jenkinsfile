pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/maturi-naresh/lexvera.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    cd frontend
                    docker build -t nextjs-frontend:latest .
                '''
            }
        }

        stage('Cleanup Old Container') {
            steps {
                sh '''
                    docker stop nextjs_app || true
                    docker rm nextjs_app || true
                    docker stop $(docker ps -q --filter "publish=3000") 2>/dev/null || true
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                    docker run -d --name nextjs_app --network lexavra-devops_app-network -p 3000:3000 nextjs-frontend:latest
                '''
            }
        }
    }
}
