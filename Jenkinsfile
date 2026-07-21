pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/maturi-naresh/lexvera.git'
            }
        }
        stage('Build & Deploy Frontend') {
            steps {
                sh '''
                    cd frontend
                    docker build -t nextjs-frontend:latest .
                    
                    # Stop and remove existing nextjs_app container
                    docker stop nextjs_app || true
                    docker rm nextjs_app || true

                    # Ensure port 3000 is freed up from any other container
                    docker stop $(docker ps -q --filter "publish=3000") 2>/dev/null || true
                    
                    # Run new container
                    docker run -d --name nextjs_app --network lexavra-devops_app-network -p 3000:3000 nextjs-frontend:latest
                '''
            }
        }
    }
}
