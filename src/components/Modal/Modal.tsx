import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export const Modal = ({
  title,
  children,
  isOpen,
  trigger,
  onAction,
  actionLabel,
  description,
}: {
  title?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  trigger?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  description?: string;
}) => {
  return (
    <Dialog open={isOpen}>
      {isOpen === undefined && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={onAction} variant="outline">
              {actionLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
