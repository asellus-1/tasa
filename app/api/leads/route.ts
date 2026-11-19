import { NextResponse } from 'next/server';

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  type: 'vault_stone_inquiry' | 'consultation' | 'custom_jewelry' | 'contact_inquiry';
  stone?: {
    id?: string;
    shape?: string;
    carat?: number;
    color?: string;
    clarity?: string;
    cut?: string;
    price?: number;
    formattedPrice?: string;
  };
  notes?: string;
  sourceUrl?: string;
  timestamp?: string;
}

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const payload = {
      ...body,
      timestamp: body.timestamp || new Date().toISOString(),
      formattedDate: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    };

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error('[Google Sheet Webhook Error]', response.statusText);
        }
      } catch (webhookErr) {
        console.error('[Google Sheet Webhook Failed]', webhookErr);
      }
    } else {
      // In development or prior to setting GOOGLE_SHEET_WEBHOOK_URL in .env.local
      console.log('💎 [TASA INCOMING LEAD]:', JSON.stringify(payload, null, 2));
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. A TASA diamond concierge will reach out promptly.',
    });
  } catch (error) {
    console.error('[Lead API Route Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process lead.' },
      { status: 500 }
    );
  }
}
