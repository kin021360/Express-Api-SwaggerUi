import cdk = require('@aws-cdk/core');
import ecr = require('@aws-cdk/aws-ecr');
import {CfnOutput, Tag} from "@aws-cdk/core";

export class CreateEcrStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here

        const repository = new ecr.Repository(this, 'docker-images', {repositoryName:'xxx12ddd'});
        Tag.add(repository, 'aaa', 'bbb');

        // You can set life cycle rules to automatically clean up old images from your repository
        // repository.addLifecycleRule({ tagPrefixList: ['prod'], maxImageCount: 9999 });
        // repository.addLifecycleRule({ maxImageAge: cdk.Duration.days(30) });

        this.addCfnOutput('ECRName', 'ECRRepository Name', repository.repositoryName);
        this.addCfnOutput('ECRArn', 'ECRRepository Arn', repository.repositoryArn);
        this.addCfnOutput('ECRUri', 'ECRRepository Uri', repository.repositoryUri);


    }

    addCfnOutput(id: string, description: string, value: string) {
        new CfnOutput(this, id, {
            description: description,
            value: value
        });
    };
}
