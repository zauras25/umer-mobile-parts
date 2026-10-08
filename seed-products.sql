INSERT INTO category
(id, name, slug, description, "parentId", "sortOrder", status, "createdAt", "updatedAt")
VALUES
(1, 'iPhone Parts', 'iphone-parts', 'iPhone spare parts', NULL, 1, 'active', NOW(), NOW()),
(2, 'Samsung Parts', 'samsung-parts', 'Samsung spare parts', NULL, 2, 'active', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO product
(id, name, slug, sku, "categoryId", brand, model, "partType", quality, version,
 description, warranty, "replacementInformation", price, "compareAtPrice",
 status, "seoTitle", "seoDescription", "createdAt", "updatedAt")
VALUES
(1, 'iPhone 13 LCD Display', 'iphone-13-lcd-display', 'IPH13-LCD-001', 1,
 'Apple', 'iPhone 13', 'Display', 'Premium', 'Original Quality',
 'Premium replacement LCD display for iPhone 13', '7 Days',
 'Test before installation', 8500, 9500, 'published',
 'iPhone 13 LCD Display', 'Premium iPhone 13 LCD replacement', NOW(), NOW()),

(2, 'iPhone 11 Battery', 'iphone-11-battery', 'IPH11-BAT-001', 1,
 'Apple', 'iPhone 11', 'Battery', 'Premium', 'High Quality',
 'Replacement battery for iPhone 11', '7 Days',
 'Test before installation', 3200, 3800, 'published',
 'iPhone 11 Battery', 'High quality iPhone 11 replacement battery', NOW(), NOW()),

(3, 'Samsung A52 LCD Display', 'samsung-a52-lcd-display', 'SAM-A52-LCD-001', 2,
 'Samsung', 'Galaxy A52', 'Display', 'Premium', 'Original Quality',
 'Premium replacement LCD display for Samsung Galaxy A52', '7 Days',
 'Test before installation', 7200, 8000, 'published',
 'Samsung A52 LCD Display', 'Premium Samsung Galaxy A52 LCD replacement', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
