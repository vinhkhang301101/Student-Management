import { PATH } from "../config/path";
import { EditAnnouncements } from "../pages/edit-announcement";
import { Announcement } from "../pages/announcement";
import { AddAnnouncements } from "../pages/add-announcement";
import { AnnouncementDetails } from "../pages/announcement-details";

export const announcement = [
  {
    element: <Announcement />,
    index: true,
  },

  {
    element: <EditAnnouncements />,
    path: PATH.Announcement.EditAnnouncements,
  },

  {
    element: <AddAnnouncements />,
    path: PATH.Announcement.AddAnnouncements,
  },

  {
    element: <AnnouncementDetails />,
    path: PATH.Announcement.announcementDetails,
  },
];
