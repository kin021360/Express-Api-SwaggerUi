import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import CreateEcr = require('../lib/create-ecr-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CreateEcr.CreateEcrStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});