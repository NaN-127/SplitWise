

export function AppLayout({left, center, right}){
    return (
        <main style={{
            display: "flex",
            flexDirection: "row",
            padding: "16px 32px",
            gap: "16px"
        }}>

            <div className="left" style={{
                width: "280px"
            }}>
                {left}
            </div>

            <div className="center" style={{
                flex: 1
            }}>
                {center}
                
            </div>

            <div className="right" style={{
                width: "320px"
            }}>
                {right}
            </div>

        </main>
    )
}