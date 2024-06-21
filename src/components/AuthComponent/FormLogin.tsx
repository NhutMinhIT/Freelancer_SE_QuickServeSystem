import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useAppDispatch } from "../../services/store/store";
import { useForm } from "react-hook-form";
import { loginUser, setError } from "../../services/features/authSlice";
import { useEffect, useState } from "react";

type FormLoginValues = {
  email: string;
  password: string;
};

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormLoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormLoginValues) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((response) => {
        const roles = response.data.roles;
        if (roles === "Admin") {
          navigate("/account-management");
        } else if (roles === "Store_Manager") {
          navigate("/employee-management");
        } else if (roles === "Brand_Manager") {
          navigate("/dashboard");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [dispatch]);

  return (
    <div className="mt-10 flex flex-col items-center gap-8 px-4 sm:px-0">
      {/* header title form */}
      <div className="flex flex-col items-center text-center">
        <img src={Logo} alt="Logo" className="h-20 w-40 sm:h-64 sm:w-64" />
        <h3 className="mt-4 text-2xl font-bold sm:text-4xl">Login</h3>
      </div>
      <form
        autoComplete="off"
        className="w-full sm:w-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <div className="flex flex-row">
            <label htmlFor="email" className="text-base font-semibold">
              Email:{" "}
            </label>
            {errors.email && (
              <p className="text-sm text-red-500">* {errors.email.message}</p>
            )}
          </div>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            name="email"
            placeholder="Nhập Email...."
            className="mt-2 w-full rounded-md border-2 border-orange-400 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mt-4 flex flex-col">
          <div className="flex flex-row">
            <label htmlFor="password" className="text-base font-semibold">
              Mật khẩu:{" "}
            </label>
            {errors.password && (
              <p className="text-sm text-red-500">*{errors.password.message}</p>
            )}
          </div>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu...."
            className="mt-2 w-full rounded-md border-2 border-orange-400 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mt-4 flex w-full flex-col items-center gap-12 sm:w-80 sm:flex-row">
          <button
            type="submit"
            className="text-black w-full cursor-pointer rounded-xl bg-orange-500 p-3 font-bold hover:bg-orange-600 sm:w-48"
          >
            {isLoading ? "Loading..." : "Đăng nhập"}
          </button>
          <Link
            to="#"
            className="mt-2 w-full text-base font-normal text-red-600 underline sm:mt-0 sm:w-44"
          >
            Quên mật khẩu?
          </Link>
        </div>
      </form>
      <div className="mt-8 w-full sm:w-80">
        <h6 className="text-sm font-bold italic">
          Đây là hệ thống quản lý của dịch vụ QuickServe
        </h6>
        <h6 className="text-sm font-light italic">Copyright by QuickServe</h6>
      </div>
    </div>
  );
};

export default FormLogin;
