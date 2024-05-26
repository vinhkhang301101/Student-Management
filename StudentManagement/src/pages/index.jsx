import { useNavigate } from "react-router-dom";
import { useAuthRedux } from "../hooks/useAuthRedux";
import { PATH } from "../config/path";
import { TeacherDashboard } from "./teacher-dashboard";
import { StudentDashboard } from "./student-dashboard";

export const HomePage = () => {
  const { user } = useAuthRedux();

  console.log(user.data[0].role);

  if (user.data[0].role == "teacher") {
    return <TeacherDashboard />;
  } else if (user.data[0].role == "student") {
    return <StudentDashboard />;
  }
}
