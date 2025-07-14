import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { LoginContext } from "./LoginContext";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function PersonaCard({ persona, highlight }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: highlight ? "default" : "pointer",
        padding: 12,
        borderRadius: 8,
        boxShadow: highlight ? "0 2px 12px #b3e5fc" : "0 2px 8px #eee",
        background: highlight ? "#e3f2fd" : "#fff",
        border: highlight ? "2px solid #1976d2" : "1px solid #eee",
        marginBottom: highlight ? 16 : 0,
        opacity: highlight ? 1 : 0.95,
        minWidth: 180,
      }}
    >
      <img
        src={persona.personaimage}
        alt={persona.personaname}
        style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 8, objectFit: "cover" }}
      />
      <div style={{ fontWeight: 600 }}>{persona.personaname}</div>
      <div style={{ fontSize: 13, color: "#555" }}>{persona.personaemail}</div>
      <div style={{ fontSize: 13 }}>Role: {persona.personarole}</div>
      <div style={{ fontSize: 13 }}>{capitalizeFirstLetter(persona.personatier)} Tier</div>
      {highlight && <div style={{ marginTop: 6, color: '#1976d2', fontWeight: 500, fontSize: 13 }}>Currently Logged In</div>}
    </div>
  );
}

export default function QuickLoginDialog() {
  const { loginUser, isLoggedIn, userObject, allUsers } = useContext(LoginContext);
  const [open, setOpen] = React.useState(false);

  const personaClicked = (persona) => {
    loginUser(persona.personaemail);
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={() => setOpen(true)} sx={{ ml: 2 }}>
        {isLoggedIn ? "Quick Login" : "Switch SSO User"}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isLoggedIn ? "Quick Login SSO User" : "Switch SSO User"}</DialogTitle>
        <DialogContent dividers>
          {/* Show current user at the top */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 500, marginBottom: 8, color: '#1976d2' }}>Current User</div>
            <PersonaCard persona={userObject} highlight />
          </div>
          <Divider sx={{ my: 2 }} />
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Switch to another user:</div>
          <div style={{ overflowY: "auto", maxHeight: 300 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, padding: 8 }}>
              {allUsers
                .filter((persona) => persona.personaname !== userObject.personaname)
                .map((persona, idx) => (
                  <div key={idx} onClick={() => personaClicked(persona)}>
                    <PersonaCard persona={persona} />
                  </div>
                ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 