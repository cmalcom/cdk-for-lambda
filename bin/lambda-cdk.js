#!/usr/bin/env node

const { CfnParameter } = require('@aws-cdk/core');
const { Fn } = require('@aws-cdk/core');
const cdk = require('@aws-cdk/core');
const { HelloLambdaCdkStack } = require('../lib/hello-lambda-cdk-stack');

const getJson = jsonString => {
    let json = {
        environmentLabel: 'Dev',
        env: { 
            region: 'us-west-2',
            account: '006684778752',
            supportEmail: 'devTeam@nwea.org' 
        } 
    };
    try{ json = JSON.parse(jsonString); }
    catch(error) {
        console.log (`Invalid json string:  `, jsonString);
    }
    return json;
}
const currentEnvironment= 'dev';
const envParamString = Fn.importValue(`parameter-${currentEnvironment}-environment-output`);
console.log(`retrieved this from output param:  `, envParamString);

const envParams = getJson(envParamString);
console.log(`retrieved from output and parsed:  `, envParams);


const app = new cdk.App();
new HelloLambdaCdkStack(app, 
    'hello-lambda-stack',
    {
        ...envParams
    });

    app.synth();