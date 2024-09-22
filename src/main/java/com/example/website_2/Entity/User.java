package com.example.website_2.Entity;

import com.example.website_2.Enum.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "email is required")
    private String email;
    private String name;
    @NotBlank(message = "password is required")
    private String password;
    @Column(name = "phone_number")
    @NotBlank(message = "phone number is required")
    private String phoneNumber;

    private UserRole role;
    @OneToMany(mappedBy="user",fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    private List<OrderItem> orderItemList;
    @OneToOne(fetch=FetchType.LAZY,cascade=CascadeType.ALL)
    private Address address;
    @Column(name="createdAt")
    private final LocalDateTime createdAt=LocalDateTime.now();



}