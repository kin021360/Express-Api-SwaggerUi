#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CreateEcrStack } from '../lib/create-ecr-stack';

const app = new cdk.App();
new CreateEcrStack(app, 'CreateEcrStack');
