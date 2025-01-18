import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "../context/user-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      console.log("User:", user);
      setUser(user);
      navigate({
        to:
          user.userRole === "Orderer"
            ? "/orderer-dashboard"
            : "/transporter-dashboard",
      });
      console.log("Navigating to:", user.userRole);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Logga in</CardTitle>
          <CardDescription>
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
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Lösenord</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Har du glömt ditt lösenord?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Logga in
              </Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Inget konto?{" "}
              <a href="/register" className="underline underline-offset-4">
                Klicka här för att skapa
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
