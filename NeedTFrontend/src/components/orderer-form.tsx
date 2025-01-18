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

interface FormValues {
  location: string;
  destination: string;
  name: string;
  warning: string;
  additional: string;
}

export default function OrderForm() {
  const { user } = useUser();
  const form = useForm<FormValues>({
    defaultValues: {
      location: "",
      destination: "",
      name: "",
      warning: "",
      additional: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const jobPayload = {
      title: "Transport Job",
      origin: data.location,
      destination: data.destination,
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
        alert("Job created successfully!");
      } else {
        alert("Failed to create job:");
      }
    } catch (error) {
      alert("Error creating job:");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Beställ transport
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Från vårdplats</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Var finns patienten?"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
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
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Var ska patienten transporteras?"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
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
                  <FormLabel>Namn</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Vad heter patienten?"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
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
                  <FormLabel>Smittorisk</FormLabel>
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
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full py-2 font-medium text-white bg-black rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Hitta transportör
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
