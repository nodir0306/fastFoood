// import { getModelToken } from "@nestjs/sequelize"
// import { CategoryService } from "./category.service"
// import { Category } from "./models"
// import {Test, TestingModule} from '@nestjs/testing'

// describe('CategoryService', ()=>{
//     let categoryService: CategoryService
//     let mockCategoryMOdel: Partial<typeof Category>

//     beforeEach(async ()=> {
//         mockCategoryMOdel = {
//             findAll: jest.fn().mockResolvedValue([{id: 1,name: "Burgers"}])
//         }

//         const module: TestingModule = await Test.createTestingModule({
//             providers: [CategoryService, {provide: getModelToken(Category), useValue: mockCategoryMOdel}]
//         }).compile()

//         categoryService = module.get<CategoryService>(CategoryService)

//     })


//     if("category service should be defined", ()=>{

//     })


// })