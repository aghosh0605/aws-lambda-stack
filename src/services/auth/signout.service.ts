import { APIGatewayProxyResult, APIGatewayEvent, Handler } from "aws-lambda";
import { connectSupabase as supabase } from "../../utils/supabase";

export const handleSignout = async (): Promise<APIGatewayProxyResult> => {
  const { error } = await supabase().auth.signOut();

  if (error) {
    throw {
      statusCode: 400,
      message: "Error in Signout!!",
      stack: error,
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Signout Successful",
      data: null,
    }),
  };
};
