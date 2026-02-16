package Backend.asssignment.Backend.Assignment.controller;


import Backend.asssignment.Backend.Assignment.dto.CategoryDTO;
import Backend.asssignment.Backend.Assignment.security.UserPrincipal;
import Backend.asssignment.Backend.Assignment.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(
        name = "Category REST API CRUD operations",
        description = "CREATE READ UPDATE DELETE operations for category"
)
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;



    @Operation(
            summary = "Fetch all Categories",
            description = "Rest API to fetch all categories"
    )

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories(
            @AuthenticationPrincipal UserPrincipal principal) {

        return ResponseEntity.ok(
                categoryService.getAllCategories(principal.getId())
        );
    }


    @Operation(
            summary = "Create a new Category",
            description = "Rest API to create a new category"
    )
    @ApiResponse(
            responseCode = "201",
            description = "CREATED"
    )
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(
            @RequestBody CategoryDTO categoryDTO
    ) {
        return new ResponseEntity<>(
                categoryService.createCategory(categoryDTO),
                HttpStatus.CREATED
        );
    }


    @Operation(
            summary = "Fetch category by categoryId",
            description = "Rest API to fetch category by categoryId"
    )
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                categoryService.getCategoryById(id)
        );
    }


    @Operation(
            summary = "Delete Category",
            description = "Rest API to delete a category by categoryId"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                categoryService.deleteCategoryById(id)
        );
    }


    @Operation(
            summary = "Update Category Information fully",
            description = "Rest API to update full category information by categoryId"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @RequestBody CategoryDTO categoryDTO,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                categoryService.updateCategory(categoryDTO, id)
        );
    }


    @Operation(
            summary = "Update Category Information partially",
            description = "Rest API to update partial category information by categoryId"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<CategoryDTO> updatePartialDetails(
            @RequestBody CategoryDTO categoryDTO,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                categoryService.updatePartialDetails(categoryDTO, id)
        );
    }





}
