import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = quoteFormSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path.join(".");
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Form doğrulama hatası",
            code: "VALIDATION_ERROR",
            fields: fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    // For now, just validate and return success (no email sending)
    return NextResponse.json({
      success: true,
      data: { message: "Teklif talebiniz başarıyla alındı" },
    });
  } catch (error) {
    console.error("POST /api/public/quote error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Teklif gönderilemedi", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
