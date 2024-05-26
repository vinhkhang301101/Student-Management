import { useSelector } from "react-redux";

export const useAuthRedux = () => useSelector((store) => store.auth);