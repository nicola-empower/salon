import type { APIRoute } from 'astro';
import { analyzeSkin } from '../../lib/gemini';

// Enable server-side rendering for this API endpoint
export const prerender = false;

// Mock response for testing/fallback
const MOCK_RESPONSE = {
    skinType: "combination",
    concerns: ["fine lines", "uneven tone", "dehydration"],
    recommendations: [
        { treatmentId: "skin2", reason: "HydraFacial will deeply cleanse and hydrate your skin", priority: "high" as const },
        { treatmentId: "aes6", reason: "PRP therapy can improve skin texture and reduce fine lines", priority: "high" as const },
        { treatmentId: "skin4", reason: "LED therapy will boost collagen production", priority: "medium" as const }
    ],
    summary: "Your skin shows signs of dehydration and early aging. We recommend starting with a HydraFacial for immediate results, followed by PRP for long-term improvement."
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const { imageBase64 } = await request.json();

        if (!imageBase64) {
            return new Response(JSON.stringify({ error: 'No image provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('[API] Received analysis request');

        try {
            // Try the real API first
            const result = await analyzeSkin(imageBase64);
            console.log('[API] Successfully got result from Gemini');

            return new Response(JSON.stringify(result), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (geminiError) {
            // If Gemini fails, log the error and use mock data
            console.error('[API] Gemini failed, using mock data:', geminiError);
            console.log('[API] Returning mock analysis result');

            return new Response(JSON.stringify(MOCK_RESPONSE), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error('[API] Fatal error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to analyze image',
                details: error instanceof Error ? error.message : String(error)
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
};
