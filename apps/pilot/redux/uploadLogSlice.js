import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logList: [],
  isFinished: false,
};

const uploadLog = createSlice({
  name: "uploadLog",
  initialState,
  reducers: {
    updateList: (state, action) => {
      state.logList = action.payload;
    },
    addLog: (state, action) => {
      state.logList.push(action.payload);
    },
    updateProgress: (state, action) => {
      const currentLogIndex = state.logList.findIndex(
        (log) => log.fileName === action.payload.fileName
      );

      const updatedLog = Object.assign({}, state.logList[currentLogIndex]);
      updatedLog.progress = action.payload.progress;
      updatedLog.loadedSize = action.payload.loadedSize;

      const newLogs = state.logList.slice();
      newLogs[currentLogIndex] = updatedLog;

      state.logList = newLogs;
    },
    updateFileStatus: (state, action) => {
      const currentLogIndex = state.logList.findIndex(
        (log) => log.fileName === action.payload.fileName
      );

      const updatedLog = Object.assign({}, state.logList[currentLogIndex]);

      // Update value
      updatedLog.status = action.payload.status;

      const newLogs = state.logList.slice();
      newLogs[currentLogIndex] = updatedLog;

      state.logList = newLogs;
    },
    setIsFinished: (state, action) => {
      state.isFinished = action.payload;
    },
    updateLog: (state, action) => {
      const currentLogIndex = state.logList.findIndex(
        (log) => log.fileName === action.payload.fileName
      );

      const updatedLog = Object.assign({}, state.logList[currentLogIndex]);

      // Update value
      updatedLog = action.payload;

      const newLogs = state.logList.slice();
      newLogs[currentLogIndex] = updatedLog;

      state.logList = newLogs;
    },
  },
});

export const {
  addLog,
  updateProgress,
  setIsFinished,
  addFailedLog,
  updateFileStatus,
  updateLog,
} = uploadLog.actions;
export default uploadLog.reducer;
