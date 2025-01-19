import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className="h-screen flex items-center justify-center flex-col min-h-[320px]">
        <div className="mt-[-8vh] font-bold text-black text-[3.375rem]">
          4
          <span className="text-[3.125rem]" role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </div>
        <p className="text-base leading-normal text-black my-[0.625rem] mb-6">
          Page not found.
        </p>
      </div>
    </>
  );
}
