import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function TransporterDashboard() {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <div className="absolute top-4 left-4 text-xl font-bold text-gray-800 dark:text-gray-200">
          Logga ut
        </div>

        <Tabs defaultValue="waiting">
          <TabsList>
            <TabsTrigger value="waiting">Ohanterade transporter</TabsTrigger>
            <TabsTrigger value="my-transports">Mina transporter</TabsTrigger>
            <TabsTrigger value="view-all">Alla transporter</TabsTrigger>
          </TabsList>

          <TabsContent value="waiting">
            <div className="grid gap-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Job ID: 001</CardTitle>
                  <CardDescription>test</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Status: Waiting</p>
                </CardContent>
                <CardFooter>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        Details
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <p>Job ID: 001</p>
                        <p>Details about the job...</p>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                    Ta emot transporten
                  </button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Job ID: 001</CardTitle>
                  <CardDescription>test</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Status: Waiting</p>
                </CardContent>
                <CardFooter>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        Details
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <p>Job ID: 001</p>
                        <p>Details about the job...</p>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                    Ta emot transporten
                  </button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Job ID: 001</CardTitle>
                  <CardDescription>test</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Status: Waiting</p>
                </CardContent>
                <CardFooter>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        Details
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <p>Job ID: 001</p>
                        <p>Details about the job...</p>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                    Ta emot transporten
                  </button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Job ID: 001</CardTitle>
                  <CardDescription>test</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Status: Waiting</p>
                </CardContent>
                <CardFooter>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        Details
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <p>Job ID: 001</p>
                        <p>Details about the job...</p>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                    Ta emot transporten
                  </button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Job ID: 001</CardTitle>
                  <CardDescription>test</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Status: Waiting</p>
                </CardContent>
                <CardFooter>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        Details
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <p>Job ID: 001</p>
                        <p>Details about the job...</p>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                    Ta emot transporten
                  </button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
