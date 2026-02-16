package Backend.asssignment.Backend.Assignment.controller;


import Backend.asssignment.Backend.Assignment.dto.ProductDTO;
import Backend.asssignment.Backend.Assignment.repository.ProductRepository;
import Backend.asssignment.Backend.Assignment.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(
        name = "Product REST API CRUD Operations",
        description = "CREATE READ UPDATE DELETE Operations for Product"
)

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    private ProductService productService;
    private ProductRepository productRepository;


    @Operation(
            summary = "Fetch all Products",
            description = "Rest API to fetch all products"
    )
    @GetMapping
    public List<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }



    @Operation(
            summary = "Create a new Product",
            description = "Rest API to create a new product"
    )
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO){
        ProductDTO createdProduct = productService.createProduct(productDTO);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }



    @Operation(
            summary = "fetch product by productId",
            description = "Rest API to fetch product by productId"
    )
    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable Long id){
        return productService.getProductById(id);
    }


    @Operation(
            summary = "Delete Product",
            description = "Rest API to delete a product by productId"
    )
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteProductById(@PathVariable Long id){
        return productService.deleteProductById(id);
    }



    @Operation(
            summary = "Update Product Information fully",
            description = "Rest API to update full product information by productId"
    )
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ProductDTO updateProduct(@RequestBody ProductDTO productDTO, @PathVariable Long id){
        return productService.updateProduct(productDTO, id);
    }



    @Operation(
            summary = "Update Product Information partially.",
            description = "Rest API to update partial product information by productId"
    )
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PatchMapping("/{id}")
    public ProductDTO updatePartialDetails(@RequestBody ProductDTO productDTO, @PathVariable Long id){
        return productService.updatePartialDetails(productDTO, id);
    }
}
