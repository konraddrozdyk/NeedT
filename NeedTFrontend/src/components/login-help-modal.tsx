import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4 p-6">
          <h3 className="text-lg font-semibold">Logga in med ditt HSA id</h3>
          <p>
            Kontakta admin om du inte har ett konto eller om du önskar ändra
            lösenord.
          </p>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="secondary" onClick={onClose}>
              Stäng
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
