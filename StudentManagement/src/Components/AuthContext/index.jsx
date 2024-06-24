import { PATH } from "../../config/path";
import { authService } from "../../services/auth";
import { userService } from "../../services/user";
import { handleError } from "../../utils/handleError";
import { clearToken, clearUser, getUser, setToken, setUser } from "../../utils/token";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, _setUser] = useState(getUser);

  useEffect(() => {
    setUser(user || null);
  }, [user]);

  const login = async (data) => {
    try {
      const res = await authService.login(data);
      if (res.accessToken) {
        setToken(res)
        const decoded = await jwt_decode(res.accessToken)
        _setUser({
          fullname: decoded.fullname,
          email: decoded.role,
          role: decoded.role,
        });
      }
      if (res.data) {
        setToken(res.data);
        const user = await userService.getUsers();
        _setUser(user.data);
        message.success("Login success!");
        navigate(PATH.Home);
      }
    } catch (err) {
      handleError(err)
    }
  };

  const logout = () => {
    clearToken();
    clearUser();
    setUser(null);
    message.success("Logout Success!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser: _setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
