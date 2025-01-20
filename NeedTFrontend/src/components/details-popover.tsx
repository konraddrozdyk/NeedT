import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";

interface JobDetailsPopoverProps {
  job: {
    id: number;
    description?: string;
    origin: string;
    destination: string;
    name: string;
    date: string | Date;
    precaution: boolean;
    transporterId?: number;
    ordererId: number;
  };
}

const JobDetailsPopover: React.FC<JobDetailsPopoverProps> = ({ job }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Se detaljerad info</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white p-6 rounded-md shadow-lg border w-72">
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-gray-800">Transportdetaljer</h4>
          <div className="grid gap-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Jobb ID:</span>
              <span>{job.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Beskrivning:</span>
              <span>{job.description || "Ingen beskrivning tillgänglig"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Från:</span>
              <span>{job.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Till:</span>
              <span>{job.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Patientens namn:</span>
              <span>{job.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Datum:</span>
              <span>{new Date(job.date).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Smittrisk:</span>
              <span
                className={
                  job.precaution ? "text-red-600 font-bold" : "text-green-600"
                }
              >
                {job.precaution ? "Ja" : "Nej"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Transportör:</span>
              <span>
                {job.transporterId ? job.transporterId : "Ej tilldelad"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Beställare:</span>
              <span>{job.ordererId}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JobDetailsPopover;
