import { APIGatewayProxyResult, APIGatewayEvent, Handler } from "aws-lambda";
import { connectSupabase as supabase } from "../../utils/supabase";

export const session = async (): Promise<APIGatewayProxyResult> => {
  const { data, error } = await supabase().auth.getSession();

  if (error) {
    throw {
      statusCode: 400,
      message: "Error in getting Session!!",
      stack: error,
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Session Collection Successful",
      data: data,
    }),
  };
};
