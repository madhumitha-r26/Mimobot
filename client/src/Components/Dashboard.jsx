import React from "react";
import SendIcon from "@mui/icons-material/Send";

function Dashboard() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="flex-1 overflow-hidden flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Type to chat"
              className="input input-bordered text-xl p-6 w-full h-10 min-h-full"
            />
            <button className="btn btn-accent h-10 p-6">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
