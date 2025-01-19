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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";

const API_URL = import.meta.env.VITE_API_URL;

export function TransporterDashboard() {
  const { user } = useUser();
  const [pendingJobs, setPendingJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const pendingResponse = await fetch(`${API_URL}/api/Jobs/pending`);
        const pendingData = await pendingResponse.json();

        let myJobsData = [];
        if (user) {
          const myJobsResponse = await fetch(
            `${API_URL}/api/Jobs/transporter/${user.id}`
          );
          myJobsData = await myJobsResponse.json();
        }

        const allJobsResponse = await fetch(`${API_URL}/api/Jobs`);
        const allJobsData = await allJobsResponse.json();

        setPendingJobs(pendingData);
        setMyJobs(myJobsData);
        setAllJobs(allJobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAcceptJob = async (jobId: number) => {
    if (!user || !user.id) {
      console.error("User not logged in or missing ID");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/Jobs/${jobId}/accept`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.id),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Job accepted:", data);
      } else {
        console.error(`Error accepting job: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };

  const renderJobCards = (jobs: any[]) =>
    jobs.length > 0 ? (
      jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>Jobb: {job.title}</CardTitle>
            <CardDescription>{job.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Från: {job.origin}</p>
            <p>Till: {job.destination}</p>
            <p>Precaution: {job.precaution ? "Ja" : "Nej"}</p>
          </CardContent>
          <CardFooter>
            <Popover>
              <PopoverTrigger asChild>
                <Button>Se detaljerad info</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <p>Jobb ID: {job.id}</p>
                  <p>{job.details}</p>
                </div>
              </PopoverContent>
            </Popover>
            <Button className="ml-4" onClick={() => handleAcceptJob(job.id)}>
              Ta emot transporten
            </Button>
          </CardFooter>
        </Card>
      ))
    ) : (
      <div className="text-center text-gray-500">
        Inga jobb att visa just nu.
      </div>
    );

  if (loading) {
    return <div>Vänta medan vi laddar ditt innehåll...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <Tabs defaultValue="waiting">
          <TabsList>
            <TabsTrigger value="waiting">Ohanterade transporter</TabsTrigger>
            <TabsTrigger value="my-transports">Mina transporter</TabsTrigger>
            <TabsTrigger value="view-all">Alla transporter</TabsTrigger>
          </TabsList>

          <TabsContent value="waiting">
            <div className="grid gap-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {renderJobCards(pendingJobs)}
            </div>
          </TabsContent>

          <TabsContent value="my-transports">
            <div className="grid gap-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {renderJobCards(myJobs)}
            </div>
          </TabsContent>

          <TabsContent value="view-all">
            <div className="grid gap-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {renderJobCards(allJobs)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
