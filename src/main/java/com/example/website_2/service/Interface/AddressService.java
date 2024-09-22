package com.example.website_2.service.Interface;

import com.example.website_2.DTO.AddressDto;
import com.example.website_2.DTO.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}