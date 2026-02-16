package Backend.asssignment.Backend.Assignment.mapper;

import Backend.asssignment.Backend.Assignment.dto.CategoryDTO;
import Backend.asssignment.Backend.Assignment.entity.Category;

public class CategoryMapper {

    public static Category toCategoryEntity(CategoryDTO categoryDTO){
        Category category = new Category();
        category.setName(categoryDTO.getName());
        return category;
    }

    public static CategoryDTO toCategoryDTO(Category category){
        if (category == null){
            return null;
        }
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setProducts(category.getProducts().stream().map(ProductMapper::toProductDTO).toList());

        return categoryDTO;
    }
}
