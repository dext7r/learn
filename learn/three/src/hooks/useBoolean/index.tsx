import { useRef } from "react";

function useBoolean(defaultValue = false) {
  const booleanRef = useRef(defaultValue);

  const setTrue = () => {
    booleanRef.current = true;
  };

  const setFalse = () => {
    booleanRef.current = false;
  };

  const toggle = () => {
    booleanRef.current = !booleanRef.current;
  };

  return {
    boolean: booleanRef.current,
    setTrue,
    setFalse,
    toggle,
  };
}

export default useBoolean;
