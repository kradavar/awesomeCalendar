import React, { createContext, useState } from "react";
import { VIEW_MODES } from "../../constants/calendarConstants";

const context = {
  mode: VIEW_MODES.MONTH,
  currentDate: new Date(),
  setMode: () => ({})
};

export const calendarContext = createContext(context);

const CalendarContextProvider = ({ children }) => {
  const [mode, setMode] = useState(VIEW_MODES.MONTH);

  const value = {
    mode,
    setMode,
    currentDate: new Date()
  };

  return (
    <calendarContext.Provider value={value}>
      {children}
    </calendarContext.Provider>
  );
};

export default CalendarContextProvider;
