package Backend.asssignment.Backend.Assignment.mapper;


import Backend.asssignment.Backend.Assignment.dto.ProductDTO;
import Backend.asssignment.Backend.Assignment.entity.Category;
import Backend.asssignment.Backend.Assignment.entity.Product;

public class ProductMapper {


    public static ProductDTO toProductDTO(Product product){
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory().getId()
        );
    }

    public static Product toProductEntity(ProductDTO productDTO, Category category){
        Product product = new Product();

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategory(category);

        return product;


    }
}

