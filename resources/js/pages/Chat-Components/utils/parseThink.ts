export function parseThink(x: string) {
    const m = x.match(/<think[^>]*>([\s\S]*?)<\/think>/i);
    return {
        think: m?.[1]?.trim() || '',
        clean: x.replace(/<think[^>]*>[\s\S]*?<\/think>/gi, '').trim(),
    };
}
