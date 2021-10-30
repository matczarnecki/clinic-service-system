package com.polsl.clinicservicesystem.repository;

import com.polsl.clinicservicesystem.model.RoleEntity;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<RoleEntity, Integer> {
  Optional<RoleEntity> findByName(String rolename);
}
