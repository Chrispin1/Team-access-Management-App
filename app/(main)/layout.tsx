import Header from "@/components/layouts/Header";
import React from "react";
import { apiClient } from "@/lib/apiClient";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await apiClient.getCurrentUser();
  console.log("current user", user);
  return (
    <>
      <Header user={user} />
      <main className="container mx-auto px-2 md:px-4 py-8 mt-16 md:mt-20">
        {children}
      </main>
    </>
  );
}
