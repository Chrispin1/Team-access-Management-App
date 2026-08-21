import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = async () => {
  const user = false;
  return (
    <>
      <div className="w-full md:max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl capitalize font-bold font-inter text-center text-primary">
            team access control demo{" "}
          </h1>
          <p className="pt-2 text-lg md:text-xl text-muted-foreground capitalize font-jost ">
            this demo showcases nextJs 16 access control features with role
            based permissions
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8 pt-4 md:pt-12">
          <div className="bg-primary-foreground p-6 border border-primary rounded-lg text-primary">
            <h3 className="capitalize text-xl font-jost font-semibold">
              features demonstrated
            </h3>
            <ul className=" list-disc list-inside space-y-1 text-sm md:text-lg capitalize text-muted-foreground flex-star font-jost pt-0.5">
              <li>Role-based access control (RBAC)</li>
              <li>route protection with middleware</li>
              <li>server side permission checks</li>
              <li>client-side permission hooks</li>
              <li>dynamic route access</li>
            </ul>
          </div>
          <div className="bg-primary-foreground p-6 border border-primary rounded-lg">
            <h3 className="capitalize text-xl font-jost text-primary font-semibold">
              users roles
            </h3>
            <ul className=" list-disc list-inside space-y-1 text-sm md:text-lg capitalize text-muted-foreground flex-star font-jost pt-0.5">
              <li>
                <strong className="text-primary">super admin: </strong>full
                system access
              </li>
              <li>
                <strong className="text-green-600">admin: </strong>user & team
                management
              </li>
              <li>
                <strong className="text-yellow-600">manager: </strong>team
                specific management
              </li>
              <li>
                <strong className="text-blue-600">user: </strong>basic dashboard
              </li>
            </ul>
          </div>
        </div>
        {user ? (
          <div className="bg-green-500/30 border border-green-600 px-4 py-4 rounded-lg font-inter">
            <p className="text-green-700 ">
              Welcome back, <strong>Chris </strong> You are logged in as{" "}
              <strong>USER</strong>
            </p>
            <Link href="/dashboard">
              <Button
                className="border border-green-900 capitalize mt-2 hover:cursor-pointer"
                size="lg"
                variant="default">
                go to dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-green-500/30 border border-green-600 px-4 py-4 rounded-lg font-inter">
            <p className="text-green-700 ">You are logged in </p>
            <div className="flex items-center justify-start gap-4">
              <Link href="/login">
                <Button
                  className="capitalize px-8 mt-2 hover:cursor-pointer"
                  size="lg"
                  variant="default">
                  login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  className=" hover:bg-primary hover:text-white text-primary border-primary capitalize px-8 mt-2 hover:cursor-pointer"
                  size="lg"
                  variant="ghost">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
