import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrenciesService {
  private readonly currencies: Currency[] = [];

  create(createCurrencyDto: CreateCurrencyDto) {
    this.currencies.push(createCurrencyDto);
    return createCurrencyDto;
  }

  findAll() {
    return this.currencies;
  }

  findOne(id: string) {
    const currency = this.currencies.find(
      (currency) =>
        'id' + currency.currencyCode.toLowerCase() === id.toLowerCase(),
    );
    if (!currency) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }
    return currency;
  }

  update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    const currencyIndex = this.currencies.findIndex(
      (currency) =>
        'id' + currency.currencyCode.toLowerCase() === id.toLowerCase(),
    );

    if (currencyIndex === -1) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }

    const updatedCurrency = {
      ...this.currencies[currencyIndex],
      ...updateCurrencyDto,
    };
    this.currencies[currencyIndex] = updatedCurrency;
    return updatedCurrency;
  }

  remove(id: string) {
    const currencyIndex = this.currencies.findIndex(
      (currency) =>
        'id' + currency.currencyCode.toLowerCase() === id.toLowerCase(),
    );

    if (currencyIndex === -1) {
      throw new NotFoundException(`Currency with id ${id} not found`);
    }

    const removedCurrency = this.currencies[currencyIndex];
    this.currencies.splice(currencyIndex, 1);
    return removedCurrency;
  }
}
