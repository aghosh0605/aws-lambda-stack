import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { connectSupabase as supabase } from "../../utils/supabase";
import { yupSignup, SignupSchema } from "../../types/auth";
import yupValidator from "../../utils/yup-validator";

export const handleSignin = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  await yupValidator(event, "body", yupSignup);
  const input: SignupSchema = JSON.parse(event.body!);
  const { data, error } = await supabase().auth.signInWithPassword({
    email: input.email,
    password: input.password,
  } as SignupSchema);

  if (error) {
    throw {
      statusCode: 400,
      message: "Error in signin",
      stack: error,
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Signin Successful",
      data: data,
    }),
  };
};
