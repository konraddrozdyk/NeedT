import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { useNavigate } from "@tanstack/react-router";
import { LogoutModal } from "./logout-confirm-window";
import JobDetailsPopover from "./details-popover";

const API_URL = import.meta.env.VITE_API_URL;

export function TransporterDashboard() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [pendingJobs, setPendingJobs] = useState<any[]>([]);
  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("waiting");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (user) {
      fetchData();
    }
  }, [user]);

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

        setMyJobs((prevMyJobs) => [...prevMyJobs, data]);
        setPendingJobs((prevPendingJobs) =>
          prevPendingJobs.filter((job) => job.id !== jobId)
        );

        setActiveTab("my-transports");
        console.log("Job accepted:", data);
      } else {
        console.error(`Error accepting job: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };

  const handleCompleteJob = async (jobId: number) => {
    if (!user || !user.id) {
      console.error("User not logged in or missing ID");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/Jobs/${jobId}/complete`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transporterId: user.id }),
      });

      if (response.ok) {
        const updatedJob = await response.json();

        setMyJobs((prevMyJobs) => prevMyJobs.filter((job) => job.id !== jobId));
        setActiveTab("waiting");

        console.log("Job marked as completed:", updatedJob);
      } else {
        console.error(`Error completing job: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error completing job:", error);
    }
  };

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    setUser(null);
    navigate({ to: "/" });
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
            <p>Patientens namn: {job.name}</p>
            <p>Smittrisk: {job.precaution ? "Ja" : "Nej"}</p>
          </CardContent>
          <CardFooter>
            <JobDetailsPopover job={job} />
            <Button
              className="ml-4 bg-blue-500 text-white"
              onClick={() => handleAcceptJob(job.id)}
              style={{ display: activeTab === "waiting" ? "inline" : "none" }}
            >
              Ta emot transporten
            </Button>
            {activeTab === "my-transports" && job.status !== "completed" && (
              <Button
                className="ml-4 bg-green-500 text-white"
                onClick={() => handleCompleteJob(job.id)}
              >
                Sätt som färdigt
              </Button>
            )}
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

  if (!user) {
    return (
      <div>
        <div>Logga in för att komma åt din dashboard</div>
        <a href="/">Logga in</a>
      </div>
    );
  }

  return (
    <>
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
      <div className="flex justify-center items-center h-screen relative">
        <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg p-6 overflow-hidden">
          <Tabs
            defaultValue="waiting"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="waiting">Ohanterade transporter</TabsTrigger>
              <TabsTrigger value="my-transports">
                Mina pågående transporter
              </TabsTrigger>
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
    </>
  );
}
