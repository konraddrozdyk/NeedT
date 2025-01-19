import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <div />
      </DialogTrigger>
      <DialogContent>
        <div className="space-y-4 p-6">
          <h3 className="text-lg font-semibold">
            Är du säker på att du vill logga ut?{" "}
          </h3>
          <p>
            Du kommer att behöva logga in igen för att komma åt din dashboard.
          </p>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="secondary" onClick={onClose}>
              Avbryt
            </Button>
            <Button onClick={onConfirm}>Logga ut</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
