import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { useUser } from "@/context/user-context";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5013/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const user = await response.json();
      setUser(user);
      navigate({
        to:
          user.userRole === "Orderer"
            ? "/orderer-dashboard"
            : "/transporter-dashboard",
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen",
        className
      )}
      {...props}
    >
      <h1 className="mb-8 text-5xl font-extrabold text-white tracking-tight">
        NeedT
      </h1>
      <Card className="w-full max-w-md shadow-xl rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Logga in</CardTitle>
          <CardDescription className="text-sm text-gray-200">
            Fyll i dina inloggningsuppgifter för att gå vidare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Användarnamn</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Användarnamn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Lösenord</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              >
                Logga in
              </Button>
              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
