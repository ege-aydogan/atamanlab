import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: { message: 'Yetkisiz erişim', code: 'UNAUTHORIZED' } },
      { status: 401 },
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: { message: 'Dosya bulunamadı', code: 'VALIDATION_ERROR' } },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: { message: 'Dosya boyutu 10 MB\'ı aşamaz', code: 'FILE_TOO_LARGE' } },
        { status: 413 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Desteklenmeyen dosya formatı. İzin verilen: JPEG, PNG, WebP, SVG, PDF',
            code: 'UNSUPPORTED_FORMAT',
          },
        },
        { status: 415 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const ext = path.extname(file.name) || '.bin';
    const safeName = file.name
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .substring(0, 50);
    const filename = `${safeName}-${timestamp}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const url = `/uploads/${filename}`;
    return NextResponse.json({ success: true, data: { url, filename } }, { status: 201 });
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    return NextResponse.json(
      { success: false, error: { message: 'Dosya yüklenirken bir hata oluştu', code: 'INTERNAL_ERROR' } },
      { status: 500 },
    );
  }
}
