import {
    GraphQLServer,
    LoggerConfig,
    POLARIS_TYPES,
    polarisContainer,
    PolarisMiddleware,
    PolarisServerConfig,
} from '@enigmatis/polaris';
import { Container } from 'inversify';
import { ExampleLogConfig } from './config/example-log-config';
import { ExampleServerConfig } from './config/example-server-config';
import { ExampleMiddleware } from './middleware/example-middleware';
import { schemaContainer } from './schema/schema';

polarisContainer.bind<LoggerConfig>(POLARIS_TYPES.LoggerConfig).to(ExampleLogConfig);
polarisContainer
    .bind<PolarisServerConfig>(POLARIS_TYPES.PolarisServerConfig)
    .to(ExampleServerConfig);
polarisContainer.bind<PolarisMiddleware>(POLARIS_TYPES.PolarisMiddleware).to(ExampleMiddleware);
const mergedContainer = Container.merge(polarisContainer, schemaContainer);
const server: GraphQLServer = mergedContainer.get<GraphQLServer>(POLARIS_TYPES.GraphQLServer);

server.start();