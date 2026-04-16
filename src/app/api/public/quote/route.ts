import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/mail";

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
            message: "Validierungsfehler",
            code: "VALIDATION_ERROR",
            fields: fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    await sendContactEmail({
      fullName: result.data.fullName,
      email: result.data.email,
      company: result.data.company,
      message: result.data.message,
      productName: result.data.productName,
    });

    return NextResponse.json({
      success: true,
      data: { message: "Ihre Anfrage wurde erfolgreich gesendet" },
    });
  } catch (error) {
    console.error("POST /api/public/quote error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Nachricht konnte nicht gesendet werden", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}
