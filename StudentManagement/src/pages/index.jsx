import { useNavigate } from "react-router-dom";
import { useAuthRedux } from "../hooks/useAuthRedux";
import { PATH } from "../config/path";
import { TeacherDashboard } from "./teacher-dashboard";
import { StudentDashboard } from "./student-dashboard";

export const HomePage = () => {
  const { user } = useAuthRedux();
  const navigate = useNavigate()

  console.log(user);

  if (user?.role == "Teacher") {
    return <TeacherDashboard />;
  } else if (user?.role == "Student") {
    return <StudentDashboard />;
  }

  if (!user) {
    navigate(PATH.Login)
  }
}
