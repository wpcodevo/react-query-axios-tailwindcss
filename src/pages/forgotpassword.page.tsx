import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import { LoadingButton } from "../components/LoadingButton";
import { toast } from "react-toastify";
import useStore from "../store";
import { forgotPasswordFn } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const forgotPasswordSchema = object({
  email: string()
    .min(1, "Email verifciation code is required")
    .email("Email address is invalid"),
});

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const store = useStore();

  const methods = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    mutate: forgotPassword,
    data,
    isSuccess,
  } = useMutation((email: string) => forgotPasswordFn(email), {
    onMutate(variables) {
      store.setRequestLoading(true);
    },
    onSuccess: (data) => {
      store.setRequestLoading(false);
      toast.success(data?.message);
    },
    onError(error: any) {
      store.setRequestLoading(false);
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = ({ email }) => {
    // 👇 Executing the forgotPassword Mutation
    forgotPassword(email);
  };

  return (
    <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
      {data && isSuccess ? (
        <Message>
          <p className="text-xl">{data.message}</p>
          <p className="mt-8">
            Didn't forget password{" "}
            <Link to="/login" className="text-blue-700 underline">
              Go back to the login
            </Link>
          </p>
        </Message>
      ) : (
        <div className="w-full">
          <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600 mb-14">
            Forgot Password
          </h1>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
            >
              <FormInput label="Email Address" name="email" type="email" />
              <LoadingButton
                loading={store.requestLoading}
                textColor="text-ct-blue-600"
              >
                Send Password Reset Link
              </LoadingButton>
            </form>
          </FormProvider>
        </div>
      )}
    </section>
  );
};

export default ForgotPasswordPage;
