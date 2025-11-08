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
    string(
      name: 'ORVAL_API_URL',
      defaultValue: 'http://192.168.0.254:4010',
      description: 'Adres API wstrzykiwany do builda (NEXT_PUBLIC_API_URL)'
    )
    choice(
      name: 'NEXT_PUBLIC_USE_PROXY',
      choices: ['true', 'false'],
      description: 'Czy frontend ma używać lokalnego proxy /api → backend (true=tak, false=bezpośrednie połączenie)'
    )
  }

  environment {
    IMAGE_NAME = 'event-link-app'
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
            url: 'https://github.com/ranji94/event-link-app.git',
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
              --build-arg ORVAL_API_URL="${ORVAL_API_URL}" \
              --build-arg NEXT_PUBLIC_USE_PROXY="${NEXT_PUBLIC_USE_PROXY}" \
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
