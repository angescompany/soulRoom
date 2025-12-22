// OpenRouter AI Service for generating reflections
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const generateReflection = async (verseText, verseReference) => {
    if (!OPENROUTER_API_KEY) {
        throw new Error('API Key de OpenRouter no configurada. Agrega VITE_OPENROUTER_API_KEY en tu archivo .env');
    }

    const prompt = `Eres un pastor cristiano sabio y amoroso. Genera una reflexión espiritual corta (máximo 150 palabras) sobre el siguiente versículo bíblico. La reflexión debe ser:
- Profunda pero fácil de entender
- Aplicable a la vida diaria
- Inspiradora y edificante
- En español

Versículo: "${verseText}" — ${verseReference}

Genera solo la reflexión, sin título ni encabezados. Habla directamente al lector usando "tú".`;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Soul Room App'
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.2-3b-instruct:free',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error al generar reflexión');
        }

        const data = await response.json();

        if (data.choices && data.choices[0]?.message?.content) {
            return data.choices[0].message.content.trim();
        } else {
            throw new Error('No se pudo generar la reflexión');
        }
    } catch (error) {
        console.error('Error generating reflection:', error);
        throw error;
    }
};
