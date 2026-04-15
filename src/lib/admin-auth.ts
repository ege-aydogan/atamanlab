import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { PrismaClientKnownRequestError } from '../../generated/prisma/internal/prismaNamespace';

function formatZodErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join('.');
    if (path && !fields[path]) {
      fields[path] = issue.message;
    }
  }
  return fields;
}

export async function withAdminAuth(
  handler: (req: Request) => Promise<Response>,
  req: Request,
): Promise<Response> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: { message: 'Yetkisiz erişim', code: 'UNAUTHORIZED' } },
      { status: 401 },
    );
  }

  try {
    return await handler(req);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Doğrulama hatası',
            code: 'VALIDATION_ERROR',
            fields: formatZodErrors(error),
          },
        },
        { status: 400 },
      );
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: 'Bu kayıt başka kayıtlarla ilişkili, silinemez',
              code: 'CONFLICT',
            },
          },
          { status: 409 },
        );
      }
    }

    console.error('Sunucu hatası:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Beklenmeyen bir hata oluştu', code: 'INTERNAL_ERROR' } },
      { status: 500 },
    );
  }
}
