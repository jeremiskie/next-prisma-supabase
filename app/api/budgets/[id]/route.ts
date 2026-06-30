import { NextResponse } from "next/server";
import { BudgetService } from "@/services/user.service";

const budgetService = new BudgetService();

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 3. READ ONE (GET /api/budgets/[id])
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const budget = await budgetService.getBudgetById(id);
    
    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
    
    return NextResponse.json(budget);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 4. UPDATE (PATCH /api/budgets/[id])
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const updatedBudget = await budgetService.updateBudget(id, body);
    return NextResponse.json(updatedBudget);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update budget" }, { status: 400 });
  }
}

// 5. DELETE (DELETE /api/budgets/[id])
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await budgetService.deleteBudget(id);
    
    return NextResponse.json({ message: "Budget deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 400 });
  }
}