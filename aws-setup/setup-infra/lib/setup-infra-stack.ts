import cdk = require('@aws-cdk/core');
import {CfnOutput, Tag} from "@aws-cdk/core";
import ecs = require('@aws-cdk/aws-ecs');
import ec2 = require('@aws-cdk/aws-ec2');
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');

export class SetupInfraStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // The code that defines your stack goes here

        // Use existing VPC by VPC id
        const existingVPC = ec2.Vpc.fromLookup(this, "VPC", {vpcId: 'vpc-33113654'});

        // Create an ECS cluster
        const cluster = new ecs.Cluster(this, 'Cluster', {
            clusterName: 'ecs-clusterX',
            vpc: existingVPC
        });

        // Create an ECS TaskDefinition
        const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {});

        // Create an ECS container specs to TaskDefinition
        const container = taskDefinition.addContainer('web', {
            image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
            memoryLimitMiB: 256,
        });
        container.addPortMappings({
            containerPort: 80,
            hostPort: 80,
            protocol: ecs.Protocol.TCP
        });

        // Use Existing subnet by subnet id
        const targetSubnet1 = ec2.Subnet.fromSubnetAttributes(this, 's1', {
            availabilityZone: 'ap-northeast-1d', subnetId: 'subnet-0056be2b'
        });

        // Create ECS Service
        const ecsService = new ecs.FargateService(this, 'FargateService', {
            cluster,
            taskDefinition,
            desiredCount: 0,
            vpcSubnets: {
                subnets: [targetSubnet1]
            }
        });

        // Create ALB
        const alb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
            vpc: existingVPC,
            internetFacing: true,
            // securityGroup: sg
        });

        // Create ALB listener & addTargets
        const listener = alb.addListener('PublicListener', {port: 80, open: true});
        // Attach ALB to ECS Service
        listener.addTargets('ECS', {
            port: 80,
            targets: [ecsService.loadBalancerTarget({
                containerName: 'web',
                containerPort: 80
            })],
            // include health check (default is none)
            healthCheck: {
                interval: cdk.Duration.seconds(60),
                path: "/health",
                timeout: cdk.Duration.seconds(5),
            }
        });

        // Create SecurityGroup
        // const sg = new ec2.SecurityGroup(this, 'sg-all', {
        //     vpc: existingVPC
        // });
        // sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));
    }

    addCfnOutput(id: string, description: string, value: string) {
        new CfnOutput(this, id, {
            description: description,
            value: value
        });
    };
}
