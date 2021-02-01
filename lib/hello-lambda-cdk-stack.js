const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');
const logs = require('@aws-cdk/aws-logs');

class HelloLambdaCdkStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    console.log(`these are the props to the cdk: `, props)
    
    let lambdaCode = lambda.Code.fromCfnParameters();
    const theFunctionName = `nwea-${props.environmentLabel}-function`;
    
    const theFunction = new lambda.Function(this,
      theFunctionName,
      {
        functionName: `${theFunctionName}`,
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: `src/hey/bundle.hello`,
        code: lambdaCode,
        timeout: cdk.Duration.seconds(3),
        reservedConcurrentExecutions: 1,
        environment: {
          LOG_LEVEL: `INFO`,
          APP_ENVIRONMENT: `DEV`
        }
      });

      const theLogsName = `nwea-${props.environmentLabel}-logs`;
      const theLogs = new logs.LogGroup(this,
        theLogsName,
        {
          logGroupName: `/aws/lambda/${theFunction.functionName}`,
          RemovalPolicy: cdk.RemovalPolicy.DESTROY
        });  }
}

module.exports = { HelloLambdaCdkStack }
