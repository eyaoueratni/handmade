package com.example.website_2.Repository;

import com.example.website_2.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
    public Category findCategoryByName(String name);
}
