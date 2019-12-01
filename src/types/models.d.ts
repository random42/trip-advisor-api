type ID = number;

interface User {
  id: ID;
  username: string;
  password: string;
}

interface RatingStats {
  avg: number;
  count: number;
}

interface Restaurant {
  id: ID;
  name: string;
  avgPrice: string;
  maxDiscount;
  images: string[];
  tags: string[];
  menu: Menu;
  foodNeeds: string[];
  setMenus: SetMenu[];
  ratings: RatingStats;
  feedbacks: RatingStats;
  opinions: RatingStats;
}

interface Menu {
  name: string;
  entries: MenuEntry[];
  lastModified: Date;
}

interface MenuEntry {
  id: ID;
  name: string;
  price: number;
}

interface SetMenu extends MenuEntry {
  description: string;
}

interface Rating {
  id: ID;
  user: User;
  rating: number;
}

interface Feedback extends Rating {}

interface Opinion extends Rating {
  opinion: string;
}
