import { ProductShoes } from "../models/shoes";
import shoesServices from "../services/shoesServices";
import { CreateShoesType} from "../types/shoesTypes";

jest.mock("../models/shoes");


it('should return the product if found', async () => {
    const shoeName = 'Nike Air Max';
    const mockProduct = {
      _id: 'some-id',
      name: shoeName,
      size: 42,
      price: 199.99
    };
  
    (ProductShoes.findOne as jest.Mock).mockResolvedValue(mockProduct);
  
    const result = await shoesServices.getProductsShoes(shoeName);
  
    expect(ProductShoes.findOne).toHaveBeenCalledWith({ name: shoeName });
    expect(result).toEqual(mockProduct);
  });

  it("should return product if created", async () => {
    const mockshoe = {
        name: "urinado",
        gender: "male",
        size: 42,
        brand: "Nike",
        productType: "running",
        price: 199.99,
        color: "blue",
        flavor: "none",
        url: "http://example.com/shoe",
        stock: 10
      };

    const mockedShoeSaved = {
        _id: 'some-id',
        ...mockshoe,
        save: jest.fn().mockResolvedValue(true),
      };

    (ProductShoes as any).mockImplementation(() => mockedShoeSaved);
    ProductShoes.prototype.save = jest.fn().mockImplementation(() => mockedShoeSaved);

    const result = await shoesServices.createProductShoes(mockshoe);
    expect(result).toEqual(mockedShoeSaved);
    expect(ProductShoes).toHaveBeenCalled();
    expect(mockedShoeSaved.save).toHaveBeenCalled();
  });

  describe('createProductShoes', () => {
    it('should throw an error if save fails', async () => {
      const mockShoe: CreateShoesType = {
        name: "urinado",
        gender: "male",
        size: 42,
        brand: "Nike",
        productType: "running",
        price: 199.99,
        color: "blue",
        flavor: "none",
        url: "http://example.com/shoe",
        stock: 10
      };
  
      const errorMessage = "Database error";
  
      const mockedShoe = {
        _id: 'some-id',
        ...mockShoe,
        save: jest.fn().mockRejectedValue(new Error(errorMessage)),
      };
  
      // Mockando o construtor para retornar mockedShoe
      (ProductShoes as any).mockImplementation(() => mockedShoe);
  
      // Verifica se a função lança um erro
      await expect(shoesServices.createProductShoes(mockShoe)).rejects.toThrow(errorMessage);
  
      // Verifica se o construtor foi chamado com os dados corretos
      expect(ProductShoes).toHaveBeenCalledWith(mockShoe);
  
      // Verifica se o método save foi chamado
      expect(mockedShoe.save).toHaveBeenCalled();
    });
  });