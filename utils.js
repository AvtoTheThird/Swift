interface RootObject {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at?: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Sponsorship;
  topic_submissions: Topicsubmissions;
  user: Sponsor;
}
interface Topicsubmissions {}
interface Sponsorship {
  impression_urls: any[];
  tagline: string;
  tagline_url: string;
  sponsor: Sponsor;
}
interface Sponsor {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name?: any;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: Links2;
  profile_image: Profileimage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}
interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email?: any;
}
interface Profileimage {
  small: string;
  medium: string;
  large: string;
}
interface Links2 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}
interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
