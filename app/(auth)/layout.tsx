import React from "react";

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh md:min-h-screen flex justify-center items-center bg-primary-foreground ">
      <div className="w-full px-4 md:px-0 py-8">{children}</div>
    </div>
  );
};

export default RegisterLayout;
