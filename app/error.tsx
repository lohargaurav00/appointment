"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-2 w-full h-full justify-center items-center">
      <h2>Something went wrong!</h2>
      <p>Error : {error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default Error;
