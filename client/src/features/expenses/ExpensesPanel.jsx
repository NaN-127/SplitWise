import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined"
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"



function getExpenseIcon(description) {
    const desc = description.toLowerCase()
    if (desc.includes("dinner") || desc.includes("food") || desc.includes("lunch") || desc.includes("restaurant")) {
        return <RestaurantOutlinedIcon style={{ fontSize: "20px", color: "#64748b" }} />
    }
    if (desc.includes("grocer") || desc.includes("shop") || desc.includes("market")) {
        return <ShoppingCartOutlinedIcon style={{ fontSize: "20px", color: "#64748b" }} />
    }
    if (desc.includes("electric") || desc.includes("bill") || desc.includes("utility") || desc.includes("water") || desc.includes("gas")) {
        return <BoltOutlinedIcon style={{ fontSize: "20px", color: "#64748b" }} />
    }
    if (desc.includes("taxi") || desc.includes("cab") || desc.includes("uber") || desc.includes("travel")) {
        return <LocalTaxiOutlinedIcon style={{ fontSize: "20px", color: "#64748b" }} />
    }
    return <ReceiptLongOutlinedIcon style={{ fontSize: "20px", color: "#64748b" }} />
}


function formatDate(dateString) {
    const date = new Date(dateString)
    const options = { month: "short", day: "numeric", year: "numeric" }
    return date.toLocaleDateString("en-US", options)
}

export function ExpensesPanel({ expenses, filterMember }) {

    const sortedExpenses = [...expenses].reverse()

    return (
        <div
            className="expenses-container"
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                padding: "24px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "24px"
            }}
        >
            <div
                className="expenses-header"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <h2
                    className="expenses-title"
                    style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}
                >
                    {filterMember ? `${filterMember}'s Expenses` : "Recent Expenses"}
                </h2>
                <span
                    className="expenses-timeline-link"
                    style={{ fontSize: "13px", color: "#94a3b8", cursor: "pointer" }}
                >
                    View Timeline
                </span>
            </div>

            <div
                className="expenses-list"
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
                {sortedExpenses.length === 0 && (
                    <div
                        className="expenses-empty"
                        style={{
                            textAlign: "center",
                            padding: "40px 0",
                            color: "#94a3b8",
                            fontSize: "14px"
                        }}
                    >
                        No expenses yet. Add one using the + button below.
                    </div>
                )}

                {sortedExpenses.map((expense) => (
                    <div
                        key={expense.id}
                        className="expense-card"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px"
                        }}
                    >
                        <div
                            className="expense-icon-wrapper"
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "14px",
                                backgroundColor: "#f1f5f9",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                            }}
                        >
                            {getExpenseIcon(expense.description)}
                        </div>

                        <div className="expense-details" style={{ flex: 1 }}>
                            <div
                                className="expense-title"
                                style={{
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    color: "#1e293b",
                                    marginBottom: "4px"
                                }}
                            >
                                {expense.description}
                            </div>
                            <div
                                className="expense-meta"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    fontSize: "12px",
                                    color: "#94a3b8"
                                }}
                            >
                                <span>Paid by</span>
                                <span
                                    className="expense-paidby-tag"
                                    style={{
                                        backgroundColor: "#f1f5f9",
                                        padding: "2px 8px",
                                        borderRadius: "4px",
                                        fontSize: "11px",
                                        fontWeight: "700",
                                        color: "#475569"
                                    }}
                                >
                                    {expense.paidBy.toUpperCase()}
                                </span>
                                <span>•</span>
                                <span>{formatDate(expense.date)}</span>
                            </div>
                        </div>

                        <div
                            className="expense-amount-area"
                            style={{ textAlign: "right", flexShrink: 0 }}
                        >
                            <div
                                className="expense-amount"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    color: "#0f172a",
                                    marginBottom: "4px"
                                }}
                            >
                                ₹{expense.amount.toFixed(2)}
                            </div>
                            <div
                                className="expense-split-label"
                                style={{
                                    fontSize: "10px",
                                    fontWeight: "700",
                                    color: "#94a3b8",
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase"
                                }}
                            >
                                SPLIT EQUALLY
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
