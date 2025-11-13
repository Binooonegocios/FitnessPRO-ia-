import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    // Definir preços e IDs dos produtos
    const prices = {
      monthly: {
        amount: 5990, // R$ 59,90 em centavos
        interval: 'month' as const,
      },
      annual: {
        amount: 24990, // R$ 249,90 em centavos
        interval: 'year' as const,
      },
    };

    const selectedPrice = prices[plan as keyof typeof prices];

    if (!selectedPrice) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // Criar sessão de checkout do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `FitnessPro Premium - ${plan === 'monthly' ? 'Mensal' : 'Anual'}`,
              description: 'Acesso completo a todos os recursos do FitnessPro',
              images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop'],
            },
            unit_amount: selectedPrice.amount,
            recurring: {
              interval: selectedPrice.interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/?canceled=true`,
      metadata: {
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
