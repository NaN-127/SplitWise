import { useState } from "react"



export function MembersSidebar({ members, onAddMember, debts, filterMember, onFilterMember }) {
    const [inputValue, setInputValue] = useState("")


    function handleAdd() {
        if (inputValue.trim() !== "") {
            onAddMember(inputValue.trim())
            setInputValue("")
        }
    }


    function handleKeyPress(e) {
        if (e.key === "Enter") {
            handleAdd()
        }
    }

    return (
        <div
            className="members-sidebar"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
            }}
        >

            <div
                className="members-card"
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
            >
                <div
                    className="members-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px"
                    }}
                >
                    <h2
                        className="members-title"
                        style={{ margin: 0, fontSize: "16px", color: "#0f172a", fontWeight: "600" }}
                    >
                        Members
                    </h2>

                    <span
                        className="members-count"
                        style={{
                            backgroundColor: "#eef2ff",
                            color: "#4f46e5",
                            fontWeight: "600",
                            fontSize: "12px",
                            padding: "4px 10px",
                            borderRadius: "999px"
                        }}
                    >
                        {members.length}
                    </span>
                </div>

                <div
                    className="members-list"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    {members.map((member, index) => (
                        <div
                            key={member.id}
                            className="member-row"
                            onClick={() => {
                                if (filterMember === member.name) {
                                    onFilterMember("")
                                } else {
                                    onFilterMember(member.name)
                                }
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "6px 8px",
                                borderRadius: "12px",
                                cursor: "pointer",
                                backgroundColor:
                                    filterMember === member.name ? "#eef2ff" : "transparent",
                                transition: "background-color 0.2s"
                            }}
                        >
                            <div
                                className="member-avatar"
                                style={{
                                    width: "34px",
                                    height: "34px",
                                    borderRadius: "50%",
                                    backgroundColor: [
                                        "#E8F0FF",
                                        "#E6FCF5",
                                        "#FFF3BF",
                                        "#FFE3E3",
                                        "#F3E8FF"
                                    ][index % 5],
                                    color: [
                                        "#3B5BDB",
                                        "#0CA678",
                                        "#F59F00",
                                        "#E03131",
                                        "#9C36B5"
                                    ][index % 5],
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                    fontSize: "13px"
                                }}
                            >
                                {member.name[0].toUpperCase()}
                            </div>

                            <span
                                className="member-name"
                                style={{
                                    fontSize: "14px",
                                    color: "#334155",
                                    fontWeight: "500"
                                }}
                            >
                                {member.name}
                            </span>
                            
                            {debts && debts.length > 0 && (() => {
                                const balance = debts.reduce((acc, d) => {
                                    if (d.from === member.name) return acc - d.amount
                                    if (d.to === member.name) return acc + d.amount
                                    return acc
                                }, 0)
                                
                                if (Math.abs(balance) < 0.01) return null;

                                return (
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: balance > 0 ? "#10b981" : "#ef4444",
                                            marginLeft: "auto"
                                        }}
                                    >
                                        {balance > 0 ? "+" : "-"}₹{Math.abs(balance).toFixed(2)}
                                    </span>
                                )
                            })()}
                        </div>
                    ))}
                </div>


                <div
                    className="quick-add-section"
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                    }}
                >
                    <span
                        className="quick-add-label"
                        style={{
                            fontSize: "11px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#94a3b8",
                            fontWeight: "600"
                        }}
                    >
                        QUICK ADD
                    </span>

                    <div
                        className="quick-add-row"
                        style={{
                            display: "flex",
                            gap: "8px"
                        }}
                    >
                        <input
                            className="quick-add-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Member name"
                            style={{
                                flex: 1,
                                padding: "10px 14px",
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                fontSize: "13px",
                                outline: "none",
                                color: "#334155"
                            }}
                        />

                        <button
                            className="quick-add-button"
                            onClick={handleAdd}
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                backgroundColor: "#4f46e5",
                                color: "#ffffff",
                                border: "none",
                                fontWeight: "700",
                                fontSize: "18px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
