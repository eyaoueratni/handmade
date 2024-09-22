package com.example.website_2.service.Interface;

import com.example.website_2.DTO.CategoryDto;
import com.example.website_2.DTO.Response;

public interface CategoryService {

    Response createCategory(CategoryDto categoryRequest);
    Response updateCategory(Long categoryId, CategoryDto categoryRequest);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);
    Response deleteCategory(Long categoryId);
}