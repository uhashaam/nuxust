/**
 * SEO Score Computation Utility (RankMath-style)
 * 
 * Computes a score 0-100 based on SEO best practices.
 * Used for both IndustrySite (site-level SEO) and NewsContent (article SEO).
 */

interface SeoInput {
    title?: string | null;
    seoTitle?: string | null;
    metaDescription?: string | null;
    focusKeyword?: string | null;
    content?: string | null;
    ogImage?: string | null;
    canonicalUrl?: string | null;
    robotsMeta?: string | null;
}

interface SeoCheckResult {
    id: string;
    label: string;
    status: 'pass' | 'warn' | 'fail';
    message: string;
    points: number;
    maxPoints: number;
}

export interface SeoAnalysis {
    score: number;
    maxScore: number;
    percentage: number;
    grade: 'excellent' | 'good' | 'needs-work' | 'poor';
    checks: SeoCheckResult[];
}

export function computeSeoScore(input: SeoInput): SeoAnalysis {
    const checks: SeoCheckResult[] = [];
    const effectiveTitle = input.seoTitle || input.title || '';
    const desc = input.metaDescription || '';
    const keyword = (input.focusKeyword || '').toLowerCase().trim();
    const content = input.content || '';
    const plainContent = content.replace(/<[^>]*>/g, '').trim();
    const wordCount = plainContent ? plainContent.split(/\s+/).length : 0;

    // 1. Title length (max 15 pts)
    const titleLen = effectiveTitle.length;
    if (titleLen >= 50 && titleLen <= 60) {
        checks.push({ id: 'title_length', label: 'SEO Title Length', status: 'pass', message: `Perfect length (${titleLen} chars)`, points: 15, maxPoints: 15 });
    } else if (titleLen >= 30 && titleLen <= 70) {
        checks.push({ id: 'title_length', label: 'SEO Title Length', status: 'warn', message: `Acceptable (${titleLen} chars), ideal is 50-60`, points: 10, maxPoints: 15 });
    } else if (titleLen > 0) {
        checks.push({ id: 'title_length', label: 'SEO Title Length', status: 'fail', message: `Too ${titleLen < 30 ? 'short' : 'long'} (${titleLen} chars)`, points: 5, maxPoints: 15 });
    } else {
        checks.push({ id: 'title_length', label: 'SEO Title Length', status: 'fail', message: 'No title set', points: 0, maxPoints: 15 });
    }

    // 2. Meta description length (max 15 pts)
    const descLen = desc.length;
    if (descLen >= 150 && descLen <= 160) {
        checks.push({ id: 'desc_length', label: 'Meta Description Length', status: 'pass', message: `Perfect length (${descLen} chars)`, points: 15, maxPoints: 15 });
    } else if (descLen >= 120 && descLen <= 200) {
        checks.push({ id: 'desc_length', label: 'Meta Description Length', status: 'warn', message: `Acceptable (${descLen} chars), ideal is 150-160`, points: 10, maxPoints: 15 });
    } else if (descLen > 0) {
        checks.push({ id: 'desc_length', label: 'Meta Description Length', status: 'fail', message: `Too ${descLen < 120 ? 'short' : 'long'} (${descLen} chars)`, points: 5, maxPoints: 15 });
    } else {
        checks.push({ id: 'desc_length', label: 'Meta Description Length', status: 'fail', message: 'No description set', points: 0, maxPoints: 15 });
    }

    // 3. Focus keyword in title (max 15 pts)
    if (keyword) {
        if (effectiveTitle.toLowerCase().includes(keyword)) {
            checks.push({ id: 'keyword_in_title', label: 'Keyword in Title', status: 'pass', message: `"${keyword}" found in title`, points: 15, maxPoints: 15 });
        } else {
            checks.push({ id: 'keyword_in_title', label: 'Keyword in Title', status: 'fail', message: `"${keyword}" not in title`, points: 0, maxPoints: 15 });
        }
    } else {
        checks.push({ id: 'keyword_in_title', label: 'Keyword in Title', status: 'fail', message: 'No focus keyword set', points: 0, maxPoints: 15 });
    }

    // 4. Focus keyword in description (max 10 pts)
    if (keyword && desc) {
        if (desc.toLowerCase().includes(keyword)) {
            checks.push({ id: 'keyword_in_desc', label: 'Keyword in Description', status: 'pass', message: `"${keyword}" found in description`, points: 10, maxPoints: 10 });
        } else {
            checks.push({ id: 'keyword_in_desc', label: 'Keyword in Description', status: 'fail', message: `"${keyword}" not in description`, points: 0, maxPoints: 10 });
        }
    } else {
        checks.push({ id: 'keyword_in_desc', label: 'Keyword in Description', status: 'fail', message: keyword ? 'No description' : 'No keyword set', points: 0, maxPoints: 10 });
    }

    // 5. Focus keyword in content (max 10 pts)
    if (keyword && plainContent) {
        const keywordCount = (plainContent.toLowerCase().match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        if (keywordCount >= 3) {
            checks.push({ id: 'keyword_in_content', label: 'Keyword in Content', status: 'pass', message: `Found ${keywordCount} times`, points: 10, maxPoints: 10 });
        } else if (keywordCount >= 1) {
            checks.push({ id: 'keyword_in_content', label: 'Keyword in Content', status: 'warn', message: `Found only ${keywordCount} time(s), use 3+`, points: 5, maxPoints: 10 });
        } else {
            checks.push({ id: 'keyword_in_content', label: 'Keyword in Content', status: 'fail', message: 'Keyword not found in content', points: 0, maxPoints: 10 });
        }
    } else {
        checks.push({ id: 'keyword_in_content', label: 'Keyword in Content', status: 'fail', message: keyword ? 'No content' : 'No keyword', points: 0, maxPoints: 10 });
    }

    // 6. Content length (max 10 pts)
    if (wordCount >= 600) {
        checks.push({ id: 'content_length', label: 'Content Length', status: 'pass', message: `${wordCount} words (600+ recommended)`, points: 10, maxPoints: 10 });
    } else if (wordCount >= 300) {
        checks.push({ id: 'content_length', label: 'Content Length', status: 'warn', message: `${wordCount} words, aim for 600+`, points: 5, maxPoints: 10 });
    } else if (wordCount > 0) {
        checks.push({ id: 'content_length', label: 'Content Length', status: 'fail', message: `Only ${wordCount} words`, points: 2, maxPoints: 10 });
    } else {
        checks.push({ id: 'content_length', label: 'Content Length', status: 'fail', message: 'No content', points: 0, maxPoints: 10 });
    }

    // 7. OG image (max 10 pts)
    if (input.ogImage) {
        checks.push({ id: 'og_image', label: 'OG Image', status: 'pass', message: 'Open Graph image set', points: 10, maxPoints: 10 });
    } else {
        checks.push({ id: 'og_image', label: 'OG Image', status: 'warn', message: 'No OG image configured', points: 0, maxPoints: 10 });
    }

    // 8. Canonical URL (max 10 pts)
    if (input.canonicalUrl) {
        checks.push({ id: 'canonical', label: 'Canonical URL', status: 'pass', message: 'Canonical URL set', points: 10, maxPoints: 10 });
    } else {
        checks.push({ id: 'canonical', label: 'Canonical URL', status: 'warn', message: 'No canonical URL (auto-generated)', points: 5, maxPoints: 10 });
    }

    // 9. Robots meta (max 5 pts)
    const robots = input.robotsMeta || 'index,follow';
    if (robots.includes('index') && robots.includes('follow')) {
        checks.push({ id: 'robots', label: 'Robots Meta', status: 'pass', message: 'Indexing enabled', points: 5, maxPoints: 5 });
    } else {
        checks.push({ id: 'robots', label: 'Robots Meta', status: 'warn', message: `Set to "${robots}"`, points: 3, maxPoints: 5 });
    }

    const totalPoints = checks.reduce((sum, c) => sum + c.points, 0);
    const maxPoints = checks.reduce((sum, c) => sum + c.maxPoints, 0);
    const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

    let grade: SeoAnalysis['grade'];
    if (percentage >= 80) grade = 'excellent';
    else if (percentage >= 60) grade = 'good';
    else if (percentage >= 40) grade = 'needs-work';
    else grade = 'poor';

    return { score: totalPoints, maxScore: maxPoints, percentage, grade, checks };
}
