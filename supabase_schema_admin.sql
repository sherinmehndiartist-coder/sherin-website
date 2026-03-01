-- Products Table
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  offer_price numeric,
  stock integer DEFAULT 0,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Packages Table
CREATE TABLE packages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text,
  highlight boolean DEFAULT false,
  status text DEFAULT 'Active',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- About Content Table
CREATE TABLE about_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  about_text text,
  experience_text text,
  journey_text text,
  image_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Hero Images Table
CREATE TABLE hero_images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Testimonials Table
CREATE TABLE testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  image_url text,
  video_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Gallery Table
CREATE TABLE gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) policies for all tables
-- Admin only for all modifications, public read mapping

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access for packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read access for about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read access for hero_images" ON hero_images FOR SELECT USING (true);
CREATE POLICY "Public read access for testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery" ON gallery FOR SELECT USING (true);

-- Allow authenticated (admin) full access
CREATE POLICY "Admin full access for products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for packages" ON packages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for hero_images" ON hero_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');

-- Inquiries Table
CREATE TABLE inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  contact_info text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bookings Table
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  wedding_date date NOT NULL,
  package text NOT NULL,
  address text NOT NULL,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders Table
CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  product_name text NOT NULL,
  quantity integer NOT NULL,
  address text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Security for new tables
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert access for inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for orders" ON orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access for inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
