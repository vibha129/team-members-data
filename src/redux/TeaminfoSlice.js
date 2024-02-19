import { createSlice } from '@reduxjs/toolkit';

const TeaminfoSlice = createSlice({
  name: 'team info',
  initialState: [],
  reducers: {
    addTeaminfo: (state, action) => {
        console.log(action.payload,"cgcgcdcvdcvhdcvgdhvcvg")
      state.push(action.payload);


    },
    updateTeaminfo: (state, action) => {
    
      console.log(action.payload,"vhsvhxvhxhvvh",state?.deatils)
      
      const teamId = state.findIndex(item => item.id === action.payload?.id);
      console.log(action.payload,"vhsvhxvhxhvvh",state?.deatils)
      if (teamId !== -1) {
        state[teamId] = { ...state[teamId], ...action.payload };
      }
    },
    deleteTeaminfo: (state, action) => {
      const idToDelete = action.payload;
      return state.filter(teamData => teamData.id !== idToDelete);
    },
  },
});

export const { addTeaminfo, updateTeaminfo, deleteTeaminfo } = TeaminfoSlice.actions;




export default TeaminfoSlice.reducer;