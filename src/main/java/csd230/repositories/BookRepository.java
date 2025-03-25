package csd230.repositories;

import csd230.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByIsbn(String isbn);
    Book findById(long id);

}
