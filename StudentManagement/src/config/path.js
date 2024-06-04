const PROFILE = "/profile"
const STUDENT = "/students";
const TEACHER = "/teachers";
const CLASS = "/classes";
const FEE = "/fees";
const ANNOUNCEMENT = "/announcement"

export const PATH = {
  Home: "/",
  Students: {
    index: STUDENT,
    StudentDetails: STUDENT + "/details",
    AddStudents: STUDENT + "/add",
    EditStudents: STUDENT + "/edit",
  },
  Teachers: {
    index: TEACHER,
    AddTeachers: TEACHER + "/add",
    EditTeachers: TEACHER + "/edit",
    TeacherDetails: TEACHER + "/details",
  },
  Classes: {
    index: CLASS,
    AddClasses: CLASS + "/add",
    EditClasses: CLASS + "/edit",
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
  NewMail: "/new-mail",
  Fees: {
    index: FEE,
    AddFees: FEE + "/add",
    EditFees: FEE + "/edit",
  },
  Announcement: {
    index: ANNOUNCEMENT,
    AddAnnouncements: ANNOUNCEMENT + "/add",
    EditAnnouncements: ANNOUNCEMENT + "/edit",
    announcementDetails: ANNOUNCEMENT + "/details",
  },
};