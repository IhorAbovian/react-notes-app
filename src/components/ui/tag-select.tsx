import CreatableSelect from "react-select/creatable";

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: state.isFocused ? "var(--ring)" : "var(--input)",
    boxShadow: state.isFocused ? "0 0 0 3px color-mix(in srgb, var(--ring), transparent 50%)" : "none",
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
};

export const TagSelect = (props: any) => {
  return <CreatableSelect {...props} styles={selectStyles} />;
};
