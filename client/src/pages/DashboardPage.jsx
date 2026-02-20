import { useState, useEffect } from "react"
import { SettlementPanel } from "../features/balances/SettlementPanel"
import { ExpensesPanel } from "../features/expenses/ExpensesPanel"
import { MembersSidebar } from "../features/members/MembersSidebar"
import { AppLayout } from "../layout/AppLayout"
import { Header } from "../layout/Header"
import { FloatingAddButton } from "../layout/FloatingAddButton"
import { AddExpenseModal } from "../features/expenses/AddExpenseModal"

const API_URL = "http://localhost:4000"

export function DashBoardPage() {
    const [members, setMembers] = useState([])
    const [expenses, setExpenses] = useState([])
    const [debts, setDebts] = useState([])
    const [showAddExpense, setShowAddExpense] = useState(false)
    const [filterMember, setFilterMember] = useState("")


    function fetchMembers() {
        fetch(`${API_URL}/members`)
            .then((res) => res.json())
            .then((data) => setMembers(data))
            .catch((err) => console.log("Error fetching members:", err))
    }


    function fetchExpenses() {
        fetch(`${API_URL}/expenses`)
            .then((res) => res.json())
            .then((data) => setExpenses(data))
            .catch((err) => console.log("Error fetching expenses:", err))
    }


    function fetchDebts() {
        fetch(`${API_URL}/debts`)
            .then((res) => res.json())
            .then((data) => setDebts(data))
            .catch((err) => console.log("Error fetching debts:", err))
    }


    useEffect(() => {
        fetchMembers()
        fetchExpenses()
        fetchDebts()
    }, [])


    function handleAddMember(name) {
        fetch(`${API_URL}/members`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
            .then((res) => {
                if (!res.ok) return res.json().then((d) => { throw new Error(d.error) })
                return res.json()
            })
            .then(() => {
                fetchMembers()
                fetchDebts()
            })
            .catch((err) => alert(err.message))
    }


    function handleAddExpense(expenseData) {
        fetch(`${API_URL}/expenses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expenseData)
        })
            .then((res) => {
                if (!res.ok) return res.json().then((d) => { throw new Error(d.error) })
                return res.json()
            })
            .then(() => {
                fetchExpenses()
                fetchDebts()
                setShowAddExpense(false)
            })
            .catch((err) => alert(err.message))
    }


    const groupTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0)


    const filteredDebts = filterMember
        ? debts.filter((d) => d.from === filterMember || d.to === filterMember)
        : debts


    const filteredExpenses = filterMember
        ? expenses.filter(
              (e) =>
                  e.paidBy === filterMember ||
                  (e.splitAmong && e.splitAmong.includes(filterMember))
          )
        : expenses

    return (
        <>
            <Header groupTotal={groupTotal} />

            <AppLayout
                left={
                    <MembersSidebar
                        members={members}
                        onAddMember={handleAddMember}
                        debts={debts}
                        filterMember={filterMember}
                        onFilterMember={setFilterMember}
                    />
                }
                center={
                    <ExpensesPanel
                        expenses={filteredExpenses}
                        filterMember={filterMember}
                    />
                }
                right={
                    <SettlementPanel
                        debts={filteredDebts}
                        filterMember={filterMember}
                    />
                }
            />

            <FloatingAddButton onClick={() => setShowAddExpense(true)} />

            {showAddExpense && (
                <AddExpenseModal
                    members={members}
                    onAdd={handleAddExpense}
                    onClose={() => setShowAddExpense(false)}
                />
            )}
        </>
    )
}