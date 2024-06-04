import { useState } from "react";

export const useReload = () => {
  const [reload, setReload] = useState(false);

  const ForceReload = () => {
    setReload(!reload);
  };

  return { reload, ForceReload };
};
