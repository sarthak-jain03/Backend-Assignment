package Backend.asssignment.Backend.Assignment.service;


import Backend.asssignment.Backend.Assignment.dto.ProductDTO;
import Backend.asssignment.Backend.Assignment.entity.Category;
import Backend.asssignment.Backend.Assignment.entity.Product;
import Backend.asssignment.Backend.Assignment.mapper.ProductMapper;
import Backend.asssignment.Backend.Assignment.repository.CategoryRepository;
import Backend.asssignment.Backend.Assignment.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    public ProductDTO createProduct(ProductDTO productDTO){
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found!"));


        Product product = ProductMapper.toProductEntity(productDTO, category);
        product = productRepository.save(product);


        return ProductMapper.toProductDTO(product);
    }


    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(ProductMapper::toProductDTO).toList();
    }


    public ProductDTO getProductById(Long id){
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not Found!"));
        return ProductMapper.toProductDTO(product);
    }



    public String deleteProductById(Long id){
        productRepository.deleteById(id);
        return "Product Deleted Successfully.";
    }


    public ProductDTO updateProduct(ProductDTO productDTO, Long id){
        Product product = productRepository.findById(id).orElseThrow(()-> new RuntimeException("Product Not Found!"));
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(()-> new RuntimeException("Category of the Product is not found!"));

        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);
        productRepository.save(product);
        return ProductMapper.toProductDTO(product);
    }



    public ProductDTO updatePartialDetails(ProductDTO productDTO, Long id){
        Product product = productRepository.findById(id).orElseThrow(()-> new RuntimeException(("Product Not Found!")));
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(()-> new RuntimeException("Category not found!"));

        if (productDTO.getName() != null){
            product.setName(productDTO.getName());
        }
        if (productDTO.getPrice() != null){
            product.setPrice(productDTO.getPrice());
        }
        if (productDTO.getDescription() != null){
            product.setDescription(productDTO.getDescription());
        }
        if (category != null){
            product.setCategory(category);
        }

        productRepository.save(product);
        return ProductMapper.toProductDTO(product);
    }
}
