package com.example.website_2.DTO;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long productId;
    private int quantity;
}