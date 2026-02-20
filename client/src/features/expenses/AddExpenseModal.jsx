import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"

export function AddExpenseModal({ members, onAdd, onClose }) {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [paidBy, setPaidBy] = useState("")

    function handleSubmit() {
        if (!description.trim()) {
            alert("Please enter a description")
            return
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("Please enter a valid amount")
            return
        }
        if (!paidBy) {
            alert("Please select who paid")
            return
        }

        onAdd({
            description: description.trim(),
            amount: Number(amount),
            paidBy: paidBy
        })
    }

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 200
            }}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "24px",
                    padding: "32px",
                    width: "420px",
                    maxWidth: "90vw",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
                }}
            >
                <div
                    className="modal-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px"
                    }}
                >
                    <h2
                        className="modal-title"
                        style={{
                            margin: 0,
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#0f172a"
                        }}
                    >
                        Add Expense
                    </h2>
                    <button
                        className="modal-close-button"
                        onClick={onClose}
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#f1f5f9",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <CloseIcon style={{ fontSize: "18px", color: "#64748b" }} />
                    </button>
                </div>

                <div
                    className="modal-form"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    }}
                >

                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label
                            className="form-label"
                            style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#475569"
                            }}
                        >
                            Description
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Team Dinner"
                            style={{
                                padding: "12px 16px",
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                fontSize: "14px",
                                outline: "none",
                                color: "#334155"
                            }}
                        />
                    </div>


                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label
                            className="form-label"
                            style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#475569"
                            }}
                        >
                            Amount (₹)
                        </label>
                        <input
                            className="form-input"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={{
                                padding: "12px 16px",
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                fontSize: "14px",
                                outline: "none",
                                color: "#334155"
                            }}
                        />
                    </div>


                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label
                            className="form-label"
                            style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#475569"
                            }}
                        >
                            Paid By
                        </label>
                        <select
                            className="form-select"
                            value={paidBy}
                            onChange={(e) => setPaidBy(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                fontSize: "14px",
                                outline: "none",
                                color: "#334155",
                                backgroundColor: "#ffffff",
                                cursor: "pointer"
                            }}
                        >
                            <option value="">Select member</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.name}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div
                        className="split-info-box"
                        style={{
                            padding: "12px 16px",
                            borderRadius: "12px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #f1f5f9",
                            fontSize: "12px",
                            color: "#64748b"
                        }}
                    >
                        💡 The expense will be <strong>split equally</strong> among all{" "}
                        {members.length} members.
                        {members.length > 0 && amount && Number(amount) > 0 && (
                            <span>
                                {" "}Each person pays{" "}
                                <strong>₹{(Number(amount) / members.length).toFixed(2)}</strong>
                            </span>
                        )}
                    </div>


                    <button
                        className="form-submit-button"
                        onClick={handleSubmit}
                        style={{
                            padding: "14px",
                            borderRadius: "14px",
                            border: "none",
                            backgroundColor: "#4f46e5",
                            color: "#ffffff",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer",
                            marginTop: "8px"
                        }}
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    )
}
