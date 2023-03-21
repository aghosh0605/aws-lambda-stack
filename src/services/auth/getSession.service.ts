import { APIGatewayProxyResult, APIGatewayEvent, Handler } from "aws-lambda";
import { connectSupabase as supabase } from "../../utils/supabase";

export const session = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const {
    data: { user },
    error,
  } = await supabase().auth.getUser("jwt-token-here");

  if (error) {
    throw {
      statusCode: 400,
      message: "Error in getting Session!!",
      stack: error,
    };
  }
  // Keep the response in main handler it's better.
  // For this commit I am keeping it here
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Session Collection Successful",
      data: user,
    }),
  };
};
