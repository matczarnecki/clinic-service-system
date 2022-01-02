package com.polsl.clinicservicesystem.repository;

import com.polsl.clinicservicesystem.model.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Integer> {

  Optional<UserEntity> findByUsername(String username);

  List<UserEntity> findAll();

  List<UserEntity> findAllByRole_Code(String doc);

  boolean existsByUsername(String username);

  boolean existsByEmailAddress(String emailAddress);
}
