import { ActionFunction, Form, Link, redirect } from "react-router-dom";

import { FormInput, SubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { customFetch } from "@/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({ request }): Promise<Response | null> => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/local/register", data);
    toast.success("Registered successfully!");
    return redirect("/login");
  } catch (error) {
    const errorMsg =
      error instanceof AxiosError ? error?.response?.data.error.message : "Registration failed";
    toast.error(errorMsg);
    return null;
  }
};

function Register() {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center tracking-wide">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST">
            <FormInput type="text" name="username" />
            <FormInput type="email" name="email" />
            <FormInput type="password" name="password" />

            <SubmitBtn text="Register" className="mt-4 w-full" />

            <p className="mt-4 text-center text-sm">
              Already a member?
              <Button type="button" variant="link" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </p>
            
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
export default Register;
