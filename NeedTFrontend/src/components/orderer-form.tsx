import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

interface FormValues {
  location: string;
  destination: string;
  name: string;
  warning: string;
  additional: string;
}

export default function OrderForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      location: "",
      destination: "",
      name: "",
      warning: "",
      additional: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 border border-gray-300 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-semibold text-center mb-6">Order Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter your location"
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
                      placeholder="Enter your destination"
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter your name"
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
                  <FormLabel>Choose an Option</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          value="option1"
                          className="border-gray-300 focus:ring-black"
                        />
                        <span>Option 1</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          {...field}
                          value="option2"
                          className="border-gray-300 focus:ring-black"
                        />
                        <span>Option 2</span>
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
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter additional notes"
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
              Submit
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
