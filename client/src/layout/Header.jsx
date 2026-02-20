import logo from "../assets/logo.png"


export function Header({ groupTotal }) {
    return (
        <header
            className="app-header"
            style={{
                padding: "16px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <div
                className="header-left"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        width: "32px",
                        height: "32px"
                    }}
                />
                <span
                    className="header-title"
                    style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0f172a"
                    }}
                >
                    SplitWise
                </span>
            </div>

            <div
                className="header-right"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px"
                }}
            >
                <div
                    className="header-group-total"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end"
                    }}
                >
                    <span
                        className="group-total-label"
                        style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "#94a3b8"
                        }}
                    >
                        GROUP TOTAL
                    </span>
                    <span
                        className="group-total-amount"
                        style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#1e293b"
                        }}
                    >
                        ₹{groupTotal ? groupTotal.toFixed(2) : "0.00"}
                    </span>
                </div>


            </div>
        </header>
    )
}