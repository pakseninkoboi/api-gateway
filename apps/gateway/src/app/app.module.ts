import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
// import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Ensure ConfigModule is global
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: async (configService: ConfigService) => ({
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'users',
                url: 'http://13.213.8.85:8080/graphql',
              },
              {
                name: 'proposals',
                url: 'http://13.229.64.124:8080/graphql',
              },
            ],
          }),
          buildService({ url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                const accessToken = context?.req?.headers['accesstoken'];
                const refreshToken = context?.req?.headers['refreshtoken'];

                if (accessToken) {
                  request.http.headers.set('accesstoken', accessToken);
                }
                if (refreshToken) {
                  request.http.headers.set('refreshtoken', refreshToken);
                }
              },
            });
          },
        },
        // server: {
        //   context: ({ req }) => ({ req }),
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [AppService, JwtService],
})
export class AppModule {}
