import CreatableSelect from "react-select/creatable";

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: state.isFocused ? "var(--ring)" : "var(--input)",
    boxShadow: state.isFocused
      ? "0 0 0 3px color-mix(in srgb, var(--ring), transparent 50%)"
      : "none",
    borderRadius: "0.5rem",
    "&:hover": {
      borderColor: state.isFocused ? "var(--ring)" : "var(--input)",
    },
    minHeight: "32px",
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0 8px",
  }),
  input: (base: any) => ({
    ...base,
    color: "var(--foreground)",
  }),
  multiValue: (base: any) => ({
    ...base,
    maxWidth: "200px",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
};

export const TagSelect = (props: any) => {
  const formatCreateLabel = (inputValue: string) => {
    const trimmed = inputValue.trim().slice(0, 30);
    return `Create "${trimmed}${inputValue.length > 30 ? "..." : ""}"`;
  };

  return (
    <CreatableSelect
      {...props}
      styles={selectStyles}
      formatCreateLabel={formatCreateLabel}
    />
  );
};
