import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined"

export function SettlementPanel({ debts, filterMember }) {
    return (
        <div
            className="settlement-container"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
            }}
        >

            <div
                className="settlement-card"
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                    padding: "24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                }}
            >
                <div
                    className="settlement-header"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px"
                    }}
                >
                    <AccountBalanceWalletOutlinedIcon
                        style={{ fontSize: "20px", color: "#4f46e5" }}
                    />
                    <h2
                        className="settlement-title"
                        style={{
                            margin: 0,
                            fontSize: "16px",
                            fontWeight: "700",
                            color: "#0f172a"
                        }}
                    >
                        Who Owes Whom
                    </h2>
                </div>

                <p
                    className="settlement-subtitle"
                    style={{
                        margin: "0 0 20px 0",
                        fontSize: "12px",
                        color: "#94a3b8"
                    }}
                >
                    {filterMember
                        ? `Showing debts for ${filterMember}`
                        : "Optimized pair wise settlements"}
                    
                    {filterMember && (() => {
                        const netBalance = debts.reduce((acc, debt) => {
                            if (debt.to === filterMember) return acc + debt.amount
                            if (debt.from === filterMember) return acc - debt.amount
                            return acc
                        }, 0)

                        if (Math.abs(netBalance) < 0.01) return null

                        return (
                            <span
                                style={{
                                    display: "block",
                                    marginTop: "4px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: netBalance > 0 ? "#10b981" : "#ef4444"
                                }}
                            >
                                {netBalance > 0 ? "Total to receive: " : "Total to pay: "}
                                ₹{Math.abs(netBalance).toFixed(2)}
                            </span>
                        )
                    })()}
                </p>

                <div
                    className="settlement-list"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px"
                    }}
                >
                    {debts.length === 0 && (
                        <div
                            className="settlement-empty"
                            style={{
                                textAlign: "center",
                                padding: "30px 0",
                                color: "#94a3b8",
                                fontSize: "13px"
                            }}
                        >
                            No debts to settle. All clear
                        </div>
                    )}

                    {debts.map((debt, index) => (
                        <div
                            key={index}
                            className="settlement-item"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "14px 16px",
                                borderRadius: "14px",
                                backgroundColor: "#f8fafc",
                                border: "1px solid #f1f5f9"
                            }}
                        >
                            <div
                                className="settlement-info"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px"
                                }}
                            >
                                <div
                                    className="settlement-names"
                                    style={{
                                        fontSize: "14px",
                                        color: "#334155"
                                    }}
                                >
                                    <span style={{ fontWeight: "700" }}>
                                        {filterMember && debt.to === filterMember ? debt.to : debt.from}
                                    </span>
                                    <span
                                        className="settlement-label-owes"
                                        style={{
                                            color: filterMember && debt.to === filterMember ? "#10b981" : "#ef4444",
                                            fontWeight: "500",
                                            margin: "0 6px",
                                            fontSize: "12px"
                                        }}
                                    >
                                        {filterMember && debt.to === filterMember ? "receives from" : "owes"}
                                    </span>
                                    <span style={{ fontWeight: "700" }}>
                                        {filterMember && debt.to === filterMember ? debt.from : debt.to}
                                    </span>
                                </div>
                                <span
                                    className="settlement-tag"
                                    style={{
                                        fontSize: "10px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        color: "#94a3b8",
                                        fontWeight: "600"
                                    }}
                                >
                                    NET SETTLEMENT
                                </span>
                            </div>

                            <span
                                className="settlement-amount"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    color: filterMember && debt.to === filterMember ? "#10b981" : "#ef4444"
                                }}
                            >
                                {filterMember && debt.to === filterMember ? "+" : "-"}₹{debt.amount.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    )
}