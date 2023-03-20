import * as yup from "yup";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

type RequestLocations = "query" | "body" | "params" | "headers" | "files";

const yupValidator = async (
  event: APIGatewayEvent,
  location: RequestLocations,
  schema: yup.ObjectSchema<any>
) => {
  let _location: any;
  switch (location) {
    case "query":
      _location = event.queryStringParameters;
      break;
    case "body":
      _location = JSON.parse(event.body!);
      break;
    case "params":
      _location = event.pathParameters;
      break;
    case "headers":
      _location = event.headers;
      break;
  }
  //console.log(req.body);
  await schema.validate(_location, { abortEarly: false });
};
export default yupValidator;
