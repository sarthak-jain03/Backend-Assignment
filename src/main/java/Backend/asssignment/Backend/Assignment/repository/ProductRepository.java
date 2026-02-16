package Backend.asssignment.Backend.Assignment.repository;


import Backend.asssignment.Backend.Assignment.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
