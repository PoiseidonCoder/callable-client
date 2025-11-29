/**
 * 
 *  https://www.youtube.com/@poiseidoncoder ->true
 *  htpps://localhost:3000 -> false
 *  https://subdomain.localhost:3000 -> false
 *  /page
 *  @param url input url
 *  @param domain current domain
 *  @returns boolean
 */

export function isExternalUrl(url: string, domain: string): boolean {
    try {
        const link = new URL(url);
        return link.hostname !== domain && !link.hostname.endsWith(`.${domain}`);
    } catch {
        return false; // Return false for invalid URLs
    }
}