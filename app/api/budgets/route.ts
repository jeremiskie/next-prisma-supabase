import { NextResponse } from "next/server";
import { BudgetService } from "@/services/user.service";

const budgetService = new BudgetService();

// 1. READ ALL (GET /api/budgets)
export async function GET() {
  try {
    const budgets = await budgetService.getAllBudgets();
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

// 2. CREATE (POST /api/budgets)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBudget = await budgetService.createBudget(body);
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create budget" }, { status: 400 });
  }
}