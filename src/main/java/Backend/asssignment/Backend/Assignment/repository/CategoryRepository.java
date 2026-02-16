package Backend.asssignment.Backend.Assignment.repository;


import Backend.asssignment.Backend.Assignment.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
