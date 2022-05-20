import { useRef, useCallback } from "react";
// Instead of passing the node refObj outside, we only pass a function to get refer node from
// the user.
function useNodeRef(
  onChange?: (
    newElement: HTMLElement | null,
    previousElement: HTMLElement | null
  ) => void
) {
  const node = useRef<HTMLElement | null>(null);

  const setNodeRef = useCallback((element: HTMLElement | null) => {
    if (element !== node.current) {
      if (onChange) onChange(element, node.current);
    }

    node.current = element;
  }, []);

  return [node, setNodeRef] as const;
}

export { useNodeRef };
