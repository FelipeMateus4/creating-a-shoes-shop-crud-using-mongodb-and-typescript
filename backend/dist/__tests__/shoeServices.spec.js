"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shoes_1 = require("../models/shoes");
const shoesServices_1 = __importDefault(require("../services/shoesServices"));
jest.mock("../models/shoes");
it('should return the product if found', () => __awaiter(void 0, void 0, void 0, function* () {
    const shoeName = 'Nike Air Max';
    const mockProduct = {
        _id: 'some-id',
        name: shoeName,
        size: 42,
        price: 199.99
    };
    shoes_1.ProductShoes.findOne.mockResolvedValue(mockProduct);
    const result = yield shoesServices_1.default.getProductsShoes(shoeName);
    expect(shoes_1.ProductShoes.findOne).toHaveBeenCalledWith({ name: shoeName });
    expect(result).toEqual(mockProduct);
}));
it("should return product if created", () => __awaiter(void 0, void 0, void 0, function* () {
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
    const mockedShoeSaved = Object.assign(Object.assign({ _id: 'some-id' }, mockshoe), { save: jest.fn().mockResolvedValue(true) });
    shoes_1.ProductShoes.mockImplementation(() => mockedShoeSaved);
    shoes_1.ProductShoes.prototype.save = jest.fn().mockImplementation(() => mockedShoeSaved);
    const result = yield shoesServices_1.default.createProductShoes(mockshoe);
    expect(result).toEqual(mockedShoeSaved);
    expect(shoes_1.ProductShoes).toHaveBeenCalled();
    expect(mockedShoeSaved.save).toHaveBeenCalled();
}));
describe('createProductShoes', () => {
    it('should throw an error if save fails', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockShoe = {
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
        const mockedShoe = Object.assign(Object.assign({ _id: 'some-id' }, mockShoe), { save: jest.fn().mockRejectedValue(new Error(errorMessage)) });
        // Mockando o construtor para retornar mockedShoe
        shoes_1.ProductShoes.mockImplementation(() => mockedShoe);
        // Verifica se a função lança um erro
        yield expect(shoesServices_1.default.createProductShoes(mockShoe)).rejects.toThrow(errorMessage);
        // Verifica se o construtor foi chamado com os dados corretos
        expect(shoes_1.ProductShoes).toHaveBeenCalledWith(mockShoe);
        // Verifica se o método save foi chamado
        expect(mockedShoe.save).toHaveBeenCalled();
    }));
});
