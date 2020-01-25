import React, { createContext, useState } from "react";
import { VIEW_MODES } from "../../constants/calendarConstants";

const context = {
  mode: VIEW_MODES.MONTH,
  currentDate: new Date(),
  setMode: () => ({}),
  setCurrentDate: () => ({})
};

export const calendarContext = createContext(context);

const CalendarContextProvider = ({ children }) => {
  const [mode, setMode] = useState(VIEW_MODES.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  const value = {
    mode,
    setMode,
    currentDate,
    setCurrentDate
  };

  return (
    <calendarContext.Provider value={value}>
      {children}
    </calendarContext.Provider>
  );
};

export default CalendarContextProvider;
