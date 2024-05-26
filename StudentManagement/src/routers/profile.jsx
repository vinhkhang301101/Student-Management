import { PATH } from "../config/path";
import { EditProfile } from "../pages/edit-profile";
import { Profile } from "../pages/profile";

export const profile = [
  {
    element: <Profile />,
    index: true,
  },
  
  {
    element: <EditProfile />,
    path: PATH.Profile.EditProfile,
  },
];