import Header from "@/components/layouts/Header";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-2 md:px-4 py-8">{children}</main>
    </>
  );
}
