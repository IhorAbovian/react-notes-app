import Quill, { type Delta } from "quill";
import { useEffect, useLayoutEffect, useRef } from "react";

export const QuillEditor = ({
  className,
  onChange,
  value,
  readOnly = false,
}: {
  className?: string;
  onChange?: (value: Delta) => void;
  value?: Delta;
  readOnly?: boolean;
}) => {
  const quillRef = useRef<Quill | null>(null);

  useLayoutEffect(() => {
    const quill = new Quill("#editor", {
      readOnly,
      modules: {
        toolbar: !readOnly
          ? [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline"],
              ["link"],
              ["image", "code-block"],
            ]
          : null,
      },
      theme: "snow",
    });

    quill.on("text-change", () => {
      const delta = quill.getContents();

      onChange?.(delta);
    });

    quillRef.current = quill;
  }, [readOnly]);

  useEffect(() => {
    if (value && quillRef.current) {
      quillRef.current.setContents(value);
    }
  }, [value]);

  return (
    <div className={className}>
      <div id="editor"></div>
    </div>
  );
};
