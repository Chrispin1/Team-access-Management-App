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

export default function LoginPage() {
  const { login, loginState, isLoginPending } = useAuth();
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
      login(formData);
    },
  });

  useEffect(() => {
    if (loginState?.success) {
      router.push("/dashboard");
    }
  }, [loginState, router]);
  return (
    <Card className="w-full max-w-lg mx-auto mb-32">
      <CardHeader className="text-center">
        <CardTitle className="font-inter text-primary capitalize font-semibold text-xl md:text-2xl mt-4">
          Login to your account
        </CardTitle>
        <CardDescription className="capitalize text-sm md:text-lg font-jost text-muted-foreground">
          Enter credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col max-w-md mx-auto gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
          <form.Field
            name="email"
            validators={{ onChange: registerSchema.shape.name }}>
            {(field) => (
              <div className="flex flex-col gap-1 font-jost ">
                <Label htmlFor="email" className="text-primary">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  autoComplete="email"
                  className="py-5"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: registerSchema.shape.password }}>
            {(field) => (
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
                  className="py-5"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.map((err) => err?.message)}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <Button type="submit" className="font-jost mb-4" size="lg">
            {isLoginPending ? "Logging In..." : "Log In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
