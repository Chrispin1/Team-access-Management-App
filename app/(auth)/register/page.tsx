"use client";

import { useAuth } from "@/app/provider/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { registerSchema } from "@/app/(auth)/register/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Files, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

export default function RegisterPage() {
  const { register, registerState, isRegisterPending } = useAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      teamCode: "",
    },

    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.set("name", value.name);
      formData.set("email", value.email);
      formData.set("password", value.password);

      if (value.teamCode.trim()) {
        formData.set("teamCode", value.teamCode);
      }
      register(formData);
    },
  });

  useEffect(() => {
    if (registerState?.success) {
      router.push("/dashboard");
    }
  }, [registerState, router]);
  return (
    <Card className="w-full max-w-xl mx-auto mb-32 ">
      <CardHeader className="text-center">
        <CardTitle className="font-inter text-primary capitalize font-semibold text-xl md:text-2xl mt-4">
          Create an account
        </CardTitle>
        <CardDescription className="capitalize text-sm md:text-lg font-jost text-muted-foreground">
          sign up to get access to your team dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col max-w-md mx-auto gap-4 "
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
          <form.Field
            name="name"
            validators={{ onChange: registerSchema.shape.name }}>
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="flex flex-col gap-1 font-jost">
                  <Label htmlFor="name" className="text-primary">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="name"
                    className={`py-5 ${hasError ? "border border-destructive" : ""}`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-destructive text-sm">
                      {field.state.meta.errors.map((err) => err?.message)}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="email"
            validators={{ onChange: registerSchema.shape.email }}>
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="flex flex-col gap-1 font-jost ">
                  <Label htmlFor="email" className="text-primary">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="email"
                    className={`py-5 ${hasError ? "border border-destructive" : ""}`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: registerSchema.shape.password }}>
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="flex flex-col gap-1 font-jost">
                  <Label htmlFor="password" className="text-primary">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="·············"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`py-5 ${hasError ? "border border-destructive" : ""}`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.map((err) => err?.message)}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="teamCode"
            validators={{ onChange: registerSchema.shape.teamCode }}>
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <div className="flex flex-col gap-1 font-jost">
                  <Label htmlFor="teamCode" className="text-primary">
                    Team Code
                  </Label>
                  <Input
                    id="teamCode"
                    name="teamCode"
                    placeholder="Enter your team code"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`py-5 ${hasError ? "border border-destructive" : ""}`}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.map((err) => err?.message)}
                    </p>
                  )}
                </div>
              );
            }}
          </form.Field>

          <Button type="submit" className="font-jost" size="lg">
            {isRegisterPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
