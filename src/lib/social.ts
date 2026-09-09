// Instagram is confirmed live (@apricot_tree_stationery, found via the shop's
// follow QR code in Drive). Pinterest, TikTok, and YouTube are placeholders —
// update these once those accounts actually exist.
export const socialLinks = {
  pinterest: import.meta.env.VITE_PINTEREST_URL || "https://pinterest.com/apricot_tree_stationery",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/apricot_tree_stationery",
  tiktok: import.meta.env.VITE_TIKTOK_URL || "https://tiktok.com/@apricot_tree_stationery",
  youtube: import.meta.env.VITE_YOUTUBE_URL || "https://youtube.com/@apricot_tree_stationery",
};
