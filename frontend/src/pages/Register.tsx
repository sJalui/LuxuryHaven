import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
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
        Create an Account
      </h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-medium flex-1">
          First Name
          <input
            className="border rounded-lg w-full py-2 px-3 mt-1 text-sm font-light focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-medium flex-1">
          Last Name
          <input
            className="border rounded-lg w-full py-2 px-3 mt-1 text-sm font-light focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

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

      <label className="text-gray-700 text-sm font-medium flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded-lg w-full py-2 px-3 mt-1 text-sm font-light focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold tracking-wide hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
