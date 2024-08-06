import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";

const useRoleCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email) {
        try {
          const response = await userService.handleGetAll(user.email, user.name);
          const updatedUser = response.data.find((u) => u.email === user.email);
          if (updatedUser && updatedUser.role !== user.role) {
            localStorage.setItem("user", JSON.stringify({
              ...user,
              role: updatedUser.role,
            }));
            if (updatedUser.role !== 1) {
              localStorage.removeItem("user");
              navigate("/login");
            }
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };

    const id = setInterval(checkUserRole, 1000); 
    return () => clearInterval(id); 
  }, [navigate]);
};

export default useRoleCheck;
