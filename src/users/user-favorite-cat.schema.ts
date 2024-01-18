import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './users.schema';
import { Cat } from '../cats/cats.schema';

@Schema()
export class UserFavoriteCat extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Cat', required: true })
  favoriteCat: Cat;
}

export const UserFavoriteCatSchema = SchemaFactory.createForClass(UserFavoriteCat);
