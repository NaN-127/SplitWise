import AddIcon from "@mui/icons-material/Add"

export function FloatingAddButton({ onClick }) {
    return (
        <button
            className="floating-add-button"
            onClick={onClick}
            style={{
                position: "fixed",
                bottom: "32px",
                right: "32px",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#1e293b",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(30,41,59,0.35)",
                zIndex: 100
            }}
        >
            <AddIcon style={{ fontSize: "28px" }} />
        </button>
    )
}
