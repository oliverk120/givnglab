// types/gift.ts

// Define the type for the gift metadata
export type GiftMetadata = {
  start_url: string; // URL to the source article or website where the gift was recommended
  title: string;
  body_text: string; // Additional text or information about the gift (e.g., article text)
  article_date: string; // Date of the article or source where the gift was recommended
  gender?: string;
};

// Define the type for the enriched data
export type EnrichedData = {
  category: string; // Category of the gift (e.g., "Electronics", "Toys")
  gender: string; // Gender for which the gift is intended (e.g., "Male", "Female", "Unisex")
  vibe: string; // Vibe or mood associated with the gift (e.g., "Romantic", "Adventurous")
};

// Define the type for the gift object
export type Gift = {
  id: string; // Unique identifier for the gift
  name: string; // Name of the gift
  image_url: string; // URL of the image representing the gift
  brand: string; // Brand associated with the gift
  product_source_url: string; // URL to the source or product page for the gift
  description: string; // Scraped description of gift
  price: string; // Price of the gift (as a string to allow for currency symbols, etc.)
  giftsource_url: string; // URL to the source article or website where the gift was recommended
  metadata?: GiftMetadata | null; // Metadata related to the gift (optional, can be null)
  enrichedData?: EnrichedData | null; // Enriched data related to the gift (optional, can be null)
};
