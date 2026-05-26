import { useRef, useEffect } from "react";

type MainContentProps = {
  isCreatingNote: boolean;
  onSave: (value: boolean) => void;
};

const MainContent = ({ isCreatingNote, onSave }: MainContentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreatingNote) {
      inputRef.current?.focus();
    }
  }, [isCreatingNote]);

  if (!isCreatingNote) return <main></main>;

  return (
    <main className="flex-1">
      <input
        ref={inputRef}
        type="text"
        placeholder="Введи название..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave(false);
          }
        }}
      />
    </main>
  );
};

export default MainContent;
