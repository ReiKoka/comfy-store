import { FormInput, SubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks";
import { type ReduxStore } from "@/store";
import { customFetch } from "@/utils";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { ActionFunction, Form, Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function action(store: ReduxStore): ActionFunction {
  return async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response: AxiosResponse = await customFetch.post("/auth/local", data);
      const username: string = response.data.user.username as string;
      const jwt: string = response.data.jwt as string;
      store.dispatch(loginUser({ username, jwt }));
      return redirect("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
      return null;
    }
  };
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isRedirected = location.state?._isRedirect;

  useEffect(() => {
    let toastOnLoad: ReturnType<typeof setTimeout>;
    if (isRedirected) {
      toastOnLoad = setTimeout(() => {
        toast.warning("Please login first");
      });
    }
    return () => clearTimeout(toastOnLoad);
  }, []);

  async function loginAsGuestUser(): Promise<void> {
    try {
      const response: AxiosResponse = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      const username = response.data.user.username;
      const jwt = response.data.jwt;
      dispatch(loginUser({ username, jwt }));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  }

  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST">
            <FormInput type="email" label="email" name="identifier" />
            <FormInput type="password" label="password" name="password" />
            <SubmitBtn text="Login" className="mt-4 w-full" />
            <Button
              type="button"
              variant="outline"
              onClick={loginAsGuestUser}
              className="mt-4 w-full"
            >
              Guest User
            </Button>
            <p className="mt-4 text-center text-sm">
              Not a member yet?
              <Button type="button" variant="link" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Login;
