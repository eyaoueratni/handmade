package com.example.website_2.DTO;

import com.example.website_2.Entity.Category;
import lombok.Data;

import java.math.BigDecimal;
@Data
public class CreateProductRequest {
    private Long id;
    private String name;
    private  String description;
    private BigDecimal price;
    private String imageUrl;
    private Long categoryId;
}
