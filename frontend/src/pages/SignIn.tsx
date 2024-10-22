import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className="flex flex-col gap-6 px-8 py-6 max-w-md mx-auto bg-white rounded-lg shadow-lg"
      onSubmit={onSubmit}
    >
      <h2 className="text-4xl font-semibold text-gray-800 tracking-wide">
        Sign In
      </h2>

      <label className="text-gray-700 text-sm font-medium flex-1">
        Email
        <input
          type="email"
          className="border rounded-lg w-full py-2 px-3 mt-1 text-sm font-light focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-medium flex-1">
        Password
        <input
          type="password"
          className="border rounded-lg w-full py-2 px-3 mt-1 text-sm font-light focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </span>
        )}
      </label>

      <span className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">
          Not Registered?{" "}
          <Link className="underline text-blue-600" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold tracking-wide hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
