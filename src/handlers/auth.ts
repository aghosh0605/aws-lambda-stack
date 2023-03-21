import {
  APIGatewayProxyResult,
  Handler,
  APIGatewayProxyEvent,
} from "aws-lambda";
import { session } from "../services/auth/getSession.service";
import { handleSignin } from "../services/auth/signin.service";
import { handleSignout } from "../services/auth/signout.service";
import { handleSignup } from "../services/auth/signup.service";

type ProxyHandler = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>;

export const authRoutes: ProxyHandler = async (event, context) => {
  try {
    if (event.path === "/auth/signin" && event.httpMethod === "POST") {
      return await handleSignin(event);
    } else if (event.path === "/auth/signup" && event.httpMethod === "POST") {
      return await handleSignup(event);
    } else if (event.path === "/auth/signout" && event.httpMethod === "GET") {
      return await handleSignout();
    } else if (event.path === "/auth/session" && event.httpMethod === "GET") {
      return await session(event);
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({
          message: "HTTP Request not allowded",
          data: null,
        }),
      };
    }
  } catch (err: any) {
    if (err.name === "ValidationError") {
      //Yup Errors will come here
      let message: string = "";
      err.errors.forEach((e: string) => {
        message += `${e}. `;
      });
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Input Validation Error",
          data: message,
        }),
      };
    } else {
      console.log("Internal Server Server: \n", err.stack || err);
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({
          message: err.message || "Internal Server Error",
          data: err.stack || null, //Supabase Error Comes in Stack
        }),
      };
    }
  }
};
