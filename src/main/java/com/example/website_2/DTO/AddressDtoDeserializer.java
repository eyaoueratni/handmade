package com.example.website_2.DTO;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public class AddressDtoDeserializer extends JsonDeserializer<AddressDto> {
    @Override
    public AddressDto deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        JsonNode node = p.getCodec().readTree(p);
        AddressDto address = new AddressDto();
        address.setStreet(node.get("street").asText());
        address.setCity(node.get("city").asText());
        address.setState(node.get("state").asText());
        address.setZipCode(node.get("zip").asText());
        return address;
    }
}
