package csd230.repositories;


import csd230.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    void removeById(Long id);
    CartItem findById(long id);
}
