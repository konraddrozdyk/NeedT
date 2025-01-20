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
      <PopoverContent className="bg-white p-4 rounded-md shadow-lg border">
        <div>
          <p>Jobb ID: {job.id}</p>
          <p>
            Beskrivning: {job.description || "Ingen beskrivning tillgänglig"}
          </p>
          <p>Från: {job.origin}</p>
          <p>Till: {job.destination}</p>
          <p>Datum: {new Date(job.date).toLocaleString()}</p>
          <p>Smittrisk: {job.precaution ? "Ja" : "Nej"}</p>
          <p>
            Transportör:{" "}
            {job.transporterId ? job.transporterId : "Ej tilldelad"}
          </p>
          <p>Beställare: {job.ordererId}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JobDetailsPopover;
