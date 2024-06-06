const PROFILE = "/profile";
const STUDENT = "/students";
const TEACHER = "/teachers";
const CLASS = "/classes";
const FEE = "/fees";
const ANNOUNCEMENT = "/announcement";

export const PATH = {
  Home: "/",
  Students: {
    index: STUDENT,
    StudentDetails: STUDENT + "/details/:id",
    AddStudents: STUDENT + "/add",
    EditStudents: STUDENT + "/edit/:id",
  },
  Teachers: {
    index: TEACHER,
    AddTeachers: TEACHER + "/add",
    EditTeachers: TEACHER + "/edit/:id",
    TeacherDetails: TEACHER + "/details/:id",
  },
  Classes: {
    index: CLASS,
    AddClasses: CLASS + "/add",
    EditClasses: CLASS + "/edit/:id",
  },
  Login: "/login",
  Register: "/register",
  ForgotPassword: "/forget-password",
  RecoverPassword: "/recover-password",
  Profile: {
    index: PROFILE,
    EditProfile: PROFILE + "/edit",
  },
  Inbox: "/inbox",
  Fees: {
    index: FEE,
    AddFees: FEE + "/add",
    EditFees: FEE + "/edit",
  },
  Announcement: {
    index: ANNOUNCEMENT,
    AddAnnouncements: ANNOUNCEMENT + "/add",
    EditAnnouncements: ANNOUNCEMENT + "/edit/:id",
    announcementDetails: ANNOUNCEMENT + "/details/:id",
  },
};
