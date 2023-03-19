import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

import { connectSupabase as supabase } from "../utils/supabase";

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

export const authRoutes: ProxyHandler = async (event, context) => {
  try {
    const { data, error } = await supabase().auth.signUp({
      email: "example@email.com",
      password: "example-password",
      options: {
        data: {
          first_name: "John",
          age: 27,
        },
      },
    });

    if (error) {
      throw {
        statusCode: 400,
        message: "Error in Creating Account!!",
      };
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: data,
      }),
    };
  } catch (err: any) {
    console.log("Internal Server Error: ", err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        message: err.message || "Internal Server Error",
      }),
    };
  }
};
