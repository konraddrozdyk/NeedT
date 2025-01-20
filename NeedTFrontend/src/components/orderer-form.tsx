import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useUser } from "../context/user-context";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { LogoutModal } from "./logout-confirm-window";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

interface FormValues {
  location: string;
  destination: string;
  name: string;
  warning: string;
  additional: string;
}

export default function OrderForm() {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: {
      location: "",
      destination: "",
      name: "",
      warning: "",
      additional: "",
    },
  });

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setUser(null);
    navigate({ to: "/" });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const jobPayload = {
      title: "Transport Job",
      origin: data.location,
      destination: data.destination,
      name: data.name,
      precaution: data.warning === "option1",
      description: data.additional,
      ordererId: user?.id,
    };

    try {
      const response = await fetch("http://localhost:5013/api/Jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobPayload),
      });

      if (response.ok) {
        toast({
          title: "Din transportförfrågan har skickats",
          description: "Vi kontaktar en transportör åt dig",
          variant: "default",
        });
        form.reset();
      } else {
        const errorText = await response.text();
        toast({
          title: "Något gick fel",
          description: `Kontakta support: ${errorText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Något gick fel",
        description: `Ett fel har inträffat: ${error instanceof Error ? error.message : "Kontakta support"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <Button
        className="absolute top-6 left-6 bg-black text-white p-3 rounded-lg text-sm opacity-70 hover:opacity-100 transition-opacity z-10"
        onClick={handleLogout}
      >
        Logga ut
      </Button>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmLogout}
      />
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Beställ transport</CardTitle>
          <CardDescription>Fyll i transportinformation nedan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Från vårdplats*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Var finns patienten?"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="destination"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Var ska patienten transporteras?"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Namn*</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Vad heter patienten?"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="warning"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Smittorisk*</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            {...field}
                            value="option1"
                            className="border-gray-300 focus:ring-black"
                          />
                          <span>Ja</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            {...field}
                            value="option2"
                            className="border-gray-300 focus:ring-black"
                          />
                          <span>Nej</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="additional"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kommentar</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Något annat som transportören bör veta?"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
              >
                Hitta transportör
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
