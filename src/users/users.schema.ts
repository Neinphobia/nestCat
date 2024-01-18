import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserFavoriteCat, UserFavoriteCatSchema } from './user-favorite-cat.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [UserFavoriteCatSchema] })
  favoriteCats: UserFavoriteCat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
