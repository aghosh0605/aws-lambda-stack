import { APIGatewayProxyResult, APIGatewayEvent, Handler } from "aws-lambda";
import { connectSupabase as supabase } from "../../utils/supabase";
import { yupSignup, SignupSchema } from "../../types/auth";
import yupValidator from "../../utils/yup-validator";

export const handleSignup = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  await yupValidator(event, "body", yupSignup);
  const input: SignupSchema = JSON.parse(event.body!);
  const { data, error } = await supabase().auth.signUp({
    email: input.email,
    password: input.password,
    // options: {
    //   data: {
    //     first_name: "John",
    //     age: 27,
    //   },
    // },
  });

  if (error) {
    throw {
      statusCode: 400,
      message: "Error in Creating Account!!",
      stack: error,
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Signup Successful",
      data: data,
    }),
  };
};
