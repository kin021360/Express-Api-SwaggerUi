#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import {SetupInfraStack} from '../lib/setup-infra-stack';

const app = new cdk.App();
new SetupInfraStack(app, 'SetupInfraStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    }
});
