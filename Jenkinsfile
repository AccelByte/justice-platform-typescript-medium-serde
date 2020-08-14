@Library("github.com/AccelByte/jenkins-pipeline-library@master") _
// required parameters:
// :: BRANCH_NAME

nodePod(name:"platform-typescript-medium-serde-build", type:"builder"){
  stage('Checkout SCM'){
    checkout scm
    bitbucketBuildStatus("INPROGRESS", "Bitbucket_Build_AccelByte", "accelbyte")
  }
  try{
    container("builder"){
      stage("Build"){
        sh """
          dockerd &
          sleep 5
          make clean
          make check-on-deployment-build-diff
        """
      }
    }
  }
  catch(err){
    echo "Exception thrown:\n ${err}"
    currentBuild.result = "FAILURE"
  }
  finally{
    bitbucketBuildStatus(currentBuild.currentResult.toString(),
                "Bitbucket_Build_AccelByte",
                "accelbyte")
  }
}
