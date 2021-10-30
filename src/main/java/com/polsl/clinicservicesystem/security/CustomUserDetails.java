package com.polsl.clinicservicesystem.security;

import com.polsl.clinicservicesystem.model.RoleEntity;
import com.polsl.clinicservicesystem.model.UserEntity;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {

  private Integer id;
  private String username;
  private String password;
  private String emailAddress;
  private boolean isActive;
  private Collection<? extends GrantedAuthority> authorities;

  public CustomUserDetails(UserEntity user) {

    final Set<GrantedAuthority> userAuthorities = user.getRoles()
        .stream()
        .map(RoleEntity::getAuthorities)
        .flatMap(Collection::stream)
        .map(authority -> new SimpleGrantedAuthority(authority.getName()))
        .collect(Collectors.toSet());

    id = user.getId();
    username = user.getUsername();
    password = user.getPassword();
    emailAddress = user.getEmailAddress();
    isActive = user.isActive();
    authorities = userAuthorities;
  }

  public Integer getId() {
    return id;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public String getEmailAddress() {
    return emailAddress;
  }

  public boolean isActive() {
    return isActive;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
