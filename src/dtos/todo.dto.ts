import { IsString, IsNumber } from "class-validator";

export class TodoDTO {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public status: string;

  @IsNumber()
  public priority: number;

  @IsString()
  public dueDate: string;
}
