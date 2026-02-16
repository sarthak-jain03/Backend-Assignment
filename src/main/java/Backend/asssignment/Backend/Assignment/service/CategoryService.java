package Backend.asssignment.Backend.Assignment.service;


import Backend.asssignment.Backend.Assignment.dto.CategoryDTO;
import Backend.asssignment.Backend.Assignment.entity.Category;
import Backend.asssignment.Backend.Assignment.entity.User;
import Backend.asssignment.Backend.Assignment.mapper.CategoryMapper;
import Backend.asssignment.Backend.Assignment.repository.CategoryRepository;
import Backend.asssignment.Backend.Assignment.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private CategoryRepository categoryRepository;
    private UserRepository userRepository;


    public CategoryDTO createCategory(CategoryDTO categoryDTO){
        Category category = CategoryMapper.toCategoryEntity(categoryDTO);
        category = categoryRepository.save(category);
        return CategoryMapper.toCategoryDTO(category);
    }


    public List<CategoryDTO> getAllCategories(Long userid){
        User user = userRepository.findById(userid).orElseThrow();
        return categoryRepository.findAll().stream().map(CategoryMapper::toCategoryDTO).toList();
    }


    public CategoryDTO getCategoryById(Long id){
        Category category = categoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Category Not Found!"));
        return CategoryMapper.toCategoryDTO(category);
    }



    public String deleteCategoryById(Long id){
        categoryRepository.deleteById(id);
        return "Category Deleted Successfully.";
    }


    public CategoryDTO updateCategory(CategoryDTO categoryDTO, Long id){
        Category category = categoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Category not Found!"));
        category.setName(categoryDTO.getName());
        return CategoryMapper.toCategoryDTO(category);
    }



    public CategoryDTO updatePartialDetails(CategoryDTO categoryDTO, Long id){
        Category category = categoryRepository.findById(id).orElseThrow(()->new RuntimeException("Category Not Found!"));
        if (categoryDTO.getName() != null){
            category.setName(categoryDTO.getName());
        }
        categoryRepository.save(category);
        return CategoryMapper.toCategoryDTO(category);
    }

}
