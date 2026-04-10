package org.example.be.repository;

import org.example.be.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findByUserId(Long userId);
    List<Application> findByProjectId(Integer projectId);
    Application findByUserIdAndProjectId(Long userId, Integer projectId);
    long countByProjectIdAndStatus(Integer projectId, String status);
}
