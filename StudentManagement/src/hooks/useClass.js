import { useSelector } from "react-redux";

export const useClass = () => useSelector((store) => store.class);
