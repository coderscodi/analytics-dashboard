export interface SalesRecord {
  order_id: string;
  date: string;
  product_category: string;
  product_name: string;
  price: number;
  quantity: number;
  region: string;
  customer_id: string;
}

const productCategories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports', 'Beauty', 'Automotive'];
const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];

const products: Record<string, string[]> = {
  'Electronics': ['iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Pro', 'Dell XPS 13', 'Sony WH-1000XM5', 'iPad Air', 'Nintendo Switch'],
  'Clothing': ['Nike Air Max', 'Levi\'s Jeans', 'Adidas Hoodie', 'Zara Dress', 'H&M T-Shirt', 'Uniqlo Jacket', 'Ralph Lauren Polo'],
  'Home & Kitchen': ['KitchenAid Mixer', 'Dyson Vacuum', 'Instant Pot', 'Ninja Blender', 'Le Creuset Pan', 'Roomba Robot', 'Keurig Coffee Maker'],
  'Books': ['The Psychology of Money', 'Atomic Habits', 'Dune', '1984', 'The Great Gatsby', 'To Kill a Mockingbird', 'Harry Potter'],
  'Sports': ['Nike Running Shoes', 'Yoga Mat', 'Dumbbells Set', 'Tennis Racket', 'Golf Clubs', 'Basketball', 'Fitness Tracker'],
  'Beauty': ['Skincare Set', 'Makeup Palette', 'Hair Dryer', 'Perfume', 'Face Cream', 'Lipstick Set', 'Nail Polish'],
  'Automotive': ['Car Phone Mount', 'Dash Cam', 'Car Charger', 'Floor Mats', 'Air Freshener', 'Tire Pressure Gauge', 'Jump Starter']
};

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generateMockData(): SalesRecord[] {
  const data: SalesRecord[] = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  for (let i = 1; i <= 100; i++) {
    const category = productCategories[Math.floor(Math.random() * productCategories.length)];
    const productList = products[category];
    const product = productList[Math.floor(Math.random() * productList.length)];
    
    const basePrice = Math.random() * 500 + 10; // $10 to $510
    const quantity = Math.floor(Math.random() * 5) + 1; // 1 to 5 items
    
    data.push({
      order_id: `ORD-${String(i).padStart(4, '0')}`,
      date: generateRandomDate(startDate, endDate),
      product_category: category,
      product_name: product,
      price: Math.round(basePrice * 100) / 100,
      quantity,
      region: regions[Math.floor(Math.random() * regions.length)],
      customer_id: `CUST-${String(Math.floor(Math.random() * 500) + 1).padStart(4, '0')}`
    });
  }

  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const mockSalesData = generateMockData();