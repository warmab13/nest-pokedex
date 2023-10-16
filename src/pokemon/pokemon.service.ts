import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name ) 
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto ); 
      return pokemon;

    } catch (error) {
      if( error.code === 11000 ){
        throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue ) }`);
      }
      console.log(error);
      throw new InternalServerErrorException(` Can't create Pokemon - Check server logs `);
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    console.log("🚀 ~ file: pokemon.service.ts:38 ~ PokemonService ~ findOne ~ term:", term)
    let pokemon: Pokemon;


    if( !isNaN(+term) ){
      const query = { no: term };
      pokemon = await this.pokemonModel.findOne( query );
      console.log("🚀 ~ file: pokemon.service.ts:45 ~ PokemonService ~ findOne ~ query:", query)
    }

    //MongoID
    if( !pokemon && isValidObjectId( term ) ){
      pokemon = await this.pokemonModel.findById( term );
    }

    //Name
    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne( { name: term } )
    }


    if( !pokemon ) throw new NotFoundException( `Pokemon with id, name or no "${term}" not found` );

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
