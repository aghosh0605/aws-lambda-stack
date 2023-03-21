declare module "aws-lambda/trigger/api-gateway-proxy" {
  interface APIGatewayProxyEventBase<TAuthorizerContext> {
    user: Object;

    // Hack so TAuthorizerContext is used, cannot prefix with _
    // as it must match the interface exactly for interface merging
    ___: TAuthorizerContext;
  }
}
