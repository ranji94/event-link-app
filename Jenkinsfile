pipeline {
  agent any
  tools { git 'git' }
  options { skipDefaultCheckout(true) }

  parameters {
    string(
      name: 'IMAGE_TAG',
      defaultValue: 'latest',
      description: 'Docker image TAG (np. v1.0.0)'
    )
    string(
      name: 'NEXT_PUBLIC_API_URL',
      defaultValue: 'http://192.168.0.254:4010',
      description: 'Adres API wstrzykiwany do builda (NEXT_PUBLIC_API_URL)'
    )
  }

  environment {
    // nazwa obrazu frontendu
    IMAGE_NAME = 'event-link-frontend'
  }

  stages {
    stage('Prepare Git') {
      steps {
        sh '''
          set -eux
          id || true
          ls -ld "$WORKSPACE" || true
          git config --global --add safe.directory '*'
          git config --global --list | grep safe.directory || true
        '''
      }
    }

    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          userRemoteConfigs: [[
            // PODMIEŃ jeśli inny URL repo frontu:
            url: 'https://github.com/ranji94/event-link-frontend.git',
            credentialsId: 'github-token'
          ]],
          branches: [[name: '*/develop']],
          extensions: [
            [$class: 'WipeWorkspace'],
            [$class: 'PruneStaleBranch'],
            [$class: 'CloneOption', shallow: false]
          ]
        ])
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          sh '''
            set -eux
            docker version
            # Build obrazu produkcyjnego (target: runner) z wstrzykniętym NEXT_PUBLIC_API_URL
            docker build \
              --build-arg NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}" \
              --target runner \
              -t ${IMAGE_NAME}:${IMAGE_TAG} \
              .

            # Tag "latest" dodatkowo
            docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
          '''
        }
      }
    }

    stage('Remove old images') {
      steps {
        sh '''
          set -eux
          echo "Pruning dangling images..."
          docker image prune -f
        '''
      }
    }
  }
}
