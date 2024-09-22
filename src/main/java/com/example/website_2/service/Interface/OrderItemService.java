package com.example.website_2.service.Interface;

import com.example.website_2.DTO.OrderRequest;
import com.example.website_2.DTO.Response;
import com.example.website_2.Enum.OrderStatus;

import org.springframework.data.domain.Pageable;


import java.time.LocalDateTime;

public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);
}