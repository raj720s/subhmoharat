-- CreateIndex
CREATE FULLTEXT INDEX `products_name_desc_tags_idx` ON `products`(`name`, `desc`, `tags`);
