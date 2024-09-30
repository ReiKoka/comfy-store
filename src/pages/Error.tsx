import { Button } from "@/components/ui/button";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="grid min-h-dvh place-items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-semibold text-primary">404</h1>
          <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page Not Found
          </h3>
          <p className="mt-6 text-lg leading-7">
            Sorry, we could not find the page you are looking for.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="secondary">
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="grid min-h-dvh place-items-center px-8">
      <h4 className="text-center text-4xl font-bold">There was an error...</h4>
    </main>
  );
}
export default Error;
