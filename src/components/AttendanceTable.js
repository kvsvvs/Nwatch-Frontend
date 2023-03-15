import React, { useState, useContext } from "react";
import "../styles/AttendanceTable.css";
import { AttendanceContext } from "../context/AttendanceProvider";

function AttendanceTable() {
  const { currentUser, setCurrentUser } = useContext(AttendanceContext);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  const handleTabClick = (index) => {
    setSelectedMonth(index);
  };

  const handleYearClick = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const renderMonthTabs = () => {
    return months.map((month, index) => (
      <div
        key={index}
        className={`tab ${selectedMonth === index ? "active" : ""}`}
        onClick={() => handleTabClick(index)}
      >
        {month.name} {selectedYear}
      </div>
    ));
  };

  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const renderYearOptions = () => {
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const renderRows = () => {
    const rows = [];

    for (let i = 1; i <= months[selectedMonth].days; i++) {
      const date = new Date(selectedYear, selectedMonth, i);

      if (date.getFullYear() === selectedYear) {
        const isPresent = currentUser.attendance[i]?.isPresent;
        rows.push(
          <tr key={i}>
            <td>{i}</td>
            <td>
              <button disabled={isPresent} onClick={() => handleAbsentClick(i)}>
                Absent
              </button>
            </td>
            <td>
              <button
                disabled={!isPresent}
                onClick={() => handlePresentClick(i)}
              >
                Present
              </button>
            </td>
          </tr>
        );
      }
    }

    return rows;
  };

  const handleAbsentClick = (day) => {
    const newAttendance = [...currentUser.attendance];
    newAttendance[day] = { isPresent: false };
    setCurrentUser({ ...currentUser, attendance: newAttendance });
  };

  const handlePresentClick = (day) => {
    const newAttendance = [...currentUser.attendance];
    newAttendance[day] = { isPresent: true };
    setCurrentUser({ ...currentUser, attendance: newAttendance });
  };

  return (
    <div className="attendance-table">
      <div className="tab-header">
        {renderMonthTabs()}
        <select value={selectedYear} onChange={handleYearClick}>
          {renderYearOptions()}
        </select>
      </div>
      {currentUser ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Absent</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default AttendanceTable;
