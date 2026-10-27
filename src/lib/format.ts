const vnd = new Intl.NumberFormat('vi-VN');

/** 22940000 -> "22.940.000đ" */
export function formatPrice(value: number): string {
  return `${vnd.format(value)}đ`;
}

export function discountPercent(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/** 1716000000000 -> "3 giờ trước" */
export function timeAgo(timestamp: number, now = Date.now()): string {
  const minutes = Math.max(1, Math.round((now - timestamp) / 60000));
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} tiếng trước`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return `${Math.round(days / 7)} tuần trước`;
  return `${Math.round(days / 30)} tháng trước`;
}

/** "Điện thoại 5G" -> "dien-thoai-5g" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Detail page URL of a product — always build product links with this. */
export function productPath(product: { slug: string }): string {
  return `/san-pham/${product.slug}`;
}

/** Category page URL, optionally with filter parameters: categoryPath(laptop, { hang: 'asus' }). */
export function categoryPath(category: { slug: string }, params?: Record<string, string>): string {
  const query = params ? new URLSearchParams(params).toString() : '';
  return `/danh-muc/${category.slug}${query ? `?${query}` : ''}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
