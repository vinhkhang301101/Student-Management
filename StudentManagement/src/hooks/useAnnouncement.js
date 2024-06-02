import { useSelector } from "react-redux";

export const useAnnouncement = () => useSelector((store) => store.announcement);
