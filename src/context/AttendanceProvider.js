import React, { createContext, useState, useEffect } from "react";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await response.json();
        setUserId(data.user.id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`/api/attendance/${userId}`);
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId !== null) {
      fetchAttendanceData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId !== null) {
      fetchUserData();
    }
  }, [userId]);

  const updateAttendanceData = async (date, status) => {
    try {
      const response = await fetch(`/api/attendance/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          status,
        }),
      });
      // Update the attendance data in the state
      const updatedAttendanceData = attendanceData.map((attendance) => {
        if (attendance.date === date) {
          return { ...attendance, status };
        } else {
          return attendance;
        }
      });
      setAttendanceData(updatedAttendanceData);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePresentClick = (date) => {
    updateAttendanceData(date, "present");
  };

  const handleAbsentClick = (date) => {
    updateAttendanceData(date, "absent");
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendanceData,
        currentUser,
        handlePresentClick,
        handleAbsentClick,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
